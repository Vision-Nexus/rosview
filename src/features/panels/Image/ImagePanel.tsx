import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import type { Player } from '@/core/types/player';
import { useMessagePipeline } from '@/core/pipeline/useMessagePipeline';
import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import { scheduleFrame } from '@/shared/utils/rafScheduler';
import { addMs, toNano } from '@/shared/utils/time';
import type { RawImageDecodeOptions } from './core/imageColorMode';
import type {
  ImageRenderMetrics,
  ImageRenderOptions,
  ImageRenderWorkerEvent,
  ImageRenderWorkerRequest,
} from './core/imageWorkerProtocol';
import {
  IMAGE_PANEL_TOPIC_INCLUDES,
  topicNeedsOrderedVideoFrames,
  type ImageSurfaceStatus,
} from './core/imageTypes';
import { executeVideoBootstrap } from './core/videoSeekRepair';
import { isVideoMessageEvent, toWorkerFrame, videoCodecForMessageEvent } from './core/messageFrameAdapter';
import { applyDepthTopicPreset } from './core/depthColorDefaults';
import { parseImageAnnotations } from './core/imageAnnotations';
import type { ImageConfig } from './defaults';
import { TopicQuickPicker } from '../framework/TopicQuickPicker';
import { PanelTopicBar } from '../framework/PanelTopicBar';
import ImageRenderWorkerClass from './core/ImageRender.worker.ts?worker&inline';

type ColorOptions = Pick<ImageConfig, 'colorMode' | 'flatColor' | 'gradient' | 'colorMap' | 'explicitAlpha' | 'minValue' | 'maxValue'>;

function configToRawDecodeOptions(opts: ColorOptions): Partial<RawImageDecodeOptions> {
  return {
    colorMode: opts.colorMode,
    flatColor: opts.flatColor,
    gradient: opts.gradient,
    colorMap: opts.colorMap,
    explicitAlpha: opts.explicitAlpha,
    minValue: opts.minValue,
    maxValue: opts.maxValue,
  };
}

export type ImagePanelProps = ImageConfig & {
  player: Player;
  panelId: string;
  setConfig: (next: ImageConfig | ((prev: ImageConfig) => ImageConfig)) => void;
};

export const ImagePanel: React.FC<ImagePanelProps> = (props) => {
  const { formatMessage } = useIntl();
  const isPlaying = useMessagePipeline(
    (state) => state.playerState.activeData?.isPlaying ?? false,
  );
  const {
    player,
    panelId,
    setConfig,
    topic,
    annotationTopic,
    annotationVisible,
    backgroundColor,
    showStatusText,
    fitMode,
    flipHorizontal,
    flipVertical,
    rotation,
    smoothing,
    colorMode,
    colorMap,
    gradient,
    flatColor,
    explicitAlpha,
    minValue,
    maxValue,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const workerDisposeTimerRef = useRef<number | null>(null);
  const transferredCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPlaybackTimeNsRef = useRef<bigint | null>(null);
  const seekRepairGenerationRef = useRef(0);
  const lastUiStatusRef = useRef<ImageSurfaceStatus>({ phase: 'idle' });
  const videoSeekRepairAbortRef = useRef<AbortController | null>(null);
  const videoOrderedModeRef = useRef(false);
  const videoBootstrapInFlightRef = useRef(false);
  const videoBootstrapGenerationRef = useRef(0);
  const videoBufferedLiveRef = useRef<RosMessageEvent[]>([]);
  const consumerModeRef = useRef<'latest' | 'all'>('latest');
  const [status, setStatus] = useState<ImageSurfaceStatus>({ phase: 'idle' });
  const [metrics, setMetrics] = useState<ImageRenderMetrics | null>(null);
  const imageConsumerId = `${panelId}:image-main`;
  const annotationConsumerId = `${panelId}:image-annotations`;
  const selectedAnnotationTopic = annotationVisible ? annotationTopic.trim() : '';
  const topicSchema = useMessagePipeline((state) =>
    state.playerState.activeData?.topics.find((entry) => entry.name === topic)?.type ?? '',
  );

  // Worker lifecycle: init on mount, dispose on unmount
  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) {
      return;
    }
    if (typeof canvas.transferControlToOffscreen !== 'function') {
      const nextStatus: ImageSurfaceStatus = {
        phase: 'error',
        message: formatMessage({ id: 'panels.image.error.offscreenUnsupported' }),
      };
      lastUiStatusRef.current = nextStatus;
      setStatus(nextStatus);
      return;
    }

    if (workerDisposeTimerRef.current != null) {
      window.clearTimeout(workerDisposeTimerRef.current);
      workerDisposeTimerRef.current = null;
    }

    // Reuse existing worker/offscreen binding across React StrictMode double-mount probe.
    if (workerRef.current && transferredCanvasRef.current && transferredCanvasRef.current !== canvas) {
      workerRef.current.postMessage({ type: 'dispose' } satisfies ImageRenderWorkerRequest);
      workerRef.current.terminate();
      workerRef.current = null;
      transferredCanvasRef.current = null;
    }

    let worker = workerRef.current;
    if (!worker) {
      worker = new ImageRenderWorkerClass();
      workerRef.current = worker;
      const offscreen = canvas.transferControlToOffscreen();
      transferredCanvasRef.current = canvas;
      worker.postMessage(
        {
          type: 'init',
          canvas: offscreen,
        } satisfies ImageRenderWorkerRequest,
        [offscreen],
      );
    }

    worker.onmessage = (event) => {
      const data = event.data as ImageRenderWorkerEvent;
      if (data.type === 'metrics') {
        setMetrics(data.metrics);
        return;
      }
      if (data.type !== 'status') {
        return;
      }
      const nextStatus = data.status;
      if (isUiStatusEqual(lastUiStatusRef.current, nextStatus)) {
        return;
      }
      lastUiStatusRef.current = nextStatus;
      setStatus(nextStatus);
    };

    let lastCssW = -1;
    let lastCssH = -1;
    let lastDpr = -1;
    let cancelScheduledViewport: (() => void) | null = null;

    const applyViewportNow = () => {
      const rect = viewport.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = rect.width;
      const cssHeight = rect.height;
      if (cssWidth === lastCssW && cssHeight === lastCssH && dpr === lastDpr) {
        return;
      }
      lastCssW = cssWidth;
      lastCssH = cssHeight;
      lastDpr = dpr;
      worker.postMessage({
        type: 'viewport',
        viewport: { cssWidth, cssHeight, devicePixelRatio: dpr },
      } satisfies ImageRenderWorkerRequest);
    };

    const scheduleViewport = () => {
      cancelScheduledViewport?.();
      cancelScheduledViewport = scheduleFrame(applyViewportNow);
    };

    applyViewportNow();
    const resizeObserver = new ResizeObserver(scheduleViewport);
    resizeObserver.observe(viewport);
    window.addEventListener('resize', scheduleViewport);

    return () => {
      cancelScheduledViewport?.();
      cancelScheduledViewport = null;
      window.removeEventListener('resize', scheduleViewport);
      resizeObserver.disconnect();
      workerDisposeTimerRef.current = window.setTimeout(() => {
        const activeWorker = workerRef.current;
        if (!activeWorker) return;
        activeWorker.postMessage({ type: 'dispose' } satisfies ImageRenderWorkerRequest);
        activeWorker.terminate();
        workerRef.current = null;
        transferredCanvasRef.current = null;
        lastUiStatusRef.current = { phase: 'idle' };
        setStatus({ phase: 'idle' });
        setMetrics(null);
        workerDisposeTimerRef.current = null;
      }, 0);
    };
  }, [formatMessage]);

  // High-frequency image frames bypass messageBus. Still images/raw frames use
  // latest-only; ordered video codecs use mode=all from registration and bootstrap
  // the nearest decodable GOP before accepting live delta frames.
  useEffect(() => {
    if (!topic) {
      return;
    }
    const worker = workerRef.current;
    if (!worker) {
      return;
    }

    videoOrderedModeRef.current = false;
    videoBootstrapInFlightRef.current = false;
    videoBootstrapGenerationRef.current += 1;
    videoBufferedLiveRef.current = [];
    consumerModeRef.current = 'latest';
    setMetrics(null);
    worker.postMessage({ type: 'reset' } satisfies ImageRenderWorkerRequest);

    const initialOrdered = topicNeedsOrderedVideoFrames(topicSchema);
    if (initialOrdered) {
      videoOrderedModeRef.current = true;
      consumerModeRef.current = 'all';
    }

    const handleVideoFrame = (event: RosMessageEvent) => {
      if (videoBootstrapInFlightRef.current) {
        videoBufferedLiveRef.current.push(event);
        return;
      }
      postImageFrame(worker, event);
    };

    const dispatchHighFrequencyBatch = (messages: RosMessageEvent[]) => {
      for (const event of messages) {
        if (isVideoMessageEvent(event)) {
          handleVideoFrame(event);
        } else {
          postImageFrame(worker, event);
        }
      }
    };

    const runBootstrap = async (
      targetTime: ReturnType<Player['getCurrentTime']>,
      preserveFrame: boolean,
    ) => {
      if (!targetTime) {
        return false;
      }
      const generation = videoBootstrapGenerationRef.current;
      videoBootstrapInFlightRef.current = true;
      videoSeekRepairAbortRef.current?.abort();
      const controller = new AbortController();
      videoSeekRepairAbortRef.current = controller;

      try {
        const success = await executeVideoBootstrap({
          player,
          worker,
          topic,
          targetTime,
          codec: videoBufferedLiveRef.current.map(videoCodecForMessageEvent).find(Boolean) ?? undefined,
          liveEvents: videoBufferedLiveRef.current,
          signal: controller.signal,
          preserveFrame,
        });
        if (controller.signal.aborted || generation !== videoBootstrapGenerationRef.current) {
          return false;
        }
        if (success) {
          videoBufferedLiveRef.current = [];
        }
        return success;
      } finally {
        if (generation === videoBootstrapGenerationRef.current) {
          videoBootstrapInFlightRef.current = false;
        }
        if (videoSeekRepairAbortRef.current === controller) {
          videoSeekRepairAbortRef.current = null;
        }
      }
    };

    const activateVideoOrderedMode = async (triggerMessage?: RosMessageEvent) => {
      if (videoOrderedModeRef.current) {
        if (triggerMessage) {
          handleVideoFrame(triggerMessage);
        }
        return;
      }

      videoOrderedModeRef.current = true;
      if (triggerMessage) {
        videoBufferedLiveRef.current.push(triggerMessage);
      }

      if (consumerModeRef.current !== 'all') {
        consumerModeRef.current = 'all';
        player.unregisterHighFrequencyConsumer(imageConsumerId);
        player.registerHighFrequencyConsumer(imageConsumerId, {
          topic,
          lane: 'video',
          mode: 'all',
          onMessageBatch: dispatchHighFrequencyBatch,
        });
      }

      const currentTime = player.getCurrentTime();
      if (currentTime) {
        await runBootstrap(currentTime, false);
      }
    };

    const handleMessage = (message: RosMessageEvent) => {
      if (isVideoMessageEvent(message)) {
        if (!videoOrderedModeRef.current) {
          void activateVideoOrderedMode(message);
          return;
        }
        handleVideoFrame(message);
        return;
      }
      postImageFrame(worker, message);
    };

    if (consumerModeRef.current === 'all') {
      player.registerHighFrequencyConsumer(imageConsumerId, {
        topic,
        lane: 'video',
        mode: 'all',
        onMessageBatch: dispatchHighFrequencyBatch,
      });
      const currentTime = player.getCurrentTime();
      if (currentTime) {
        void runBootstrap(currentTime, false);
      }
    } else {
      player.registerHighFrequencyConsumer(imageConsumerId, {
        topic,
        lane: 'video',
        mode: 'latest',
        onLatestMessage: handleMessage,
        onMessageBatch: (messages) => {
          if (videoOrderedModeRef.current) {
            return;
          }
          const latest = messages.at(-1);
          if (latest) {
            handleMessage(latest);
          }
        },
      });
    }

    return () => {
      videoBootstrapGenerationRef.current += 1;
      videoSeekRepairAbortRef.current?.abort();
      videoSeekRepairAbortRef.current = null;
      videoBufferedLiveRef.current = [];
      videoBootstrapInFlightRef.current = false;
      player.unregisterHighFrequencyConsumer(imageConsumerId);
      worker.postMessage({ type: 'reset' } satisfies ImageRenderWorkerRequest);
    };
  }, [imageConsumerId, player, topic, topicSchema]);

  useEffect(() => {
    return () => {
      videoSeekRepairAbortRef.current?.abort();
      videoSeekRepairAbortRef.current = null;
    };
  }, [player, topic]);

  // Keep annotation delivery on the video lane. The worker selects the
  // closest publish-time match before drawing over each image frame.
  useEffect(() => {
    const worker = workerRef.current;
    if (!selectedAnnotationTopic || !worker) return;

    player.registerHighFrequencyConsumer(annotationConsumerId, {
      topic: selectedAnnotationTopic,
      lane: 'video',
      mode: 'all',
      onMessageBatch: (messages) => {
        for (const event of messages) {
          const overlay = parseImageAnnotations(event.message);
          if (overlay) {
            worker.postMessage({ type: 'overlay', overlay } satisfies ImageRenderWorkerRequest);
          }
        }
      },
    });

    return () => {
      player.unregisterHighFrequencyConsumer(annotationConsumerId);
      worker.postMessage({ type: 'overlay', overlay: null } satisfies ImageRenderWorkerRequest);
    };
  }, [annotationConsumerId, player, selectedAnnotationTopic]);


  // Keep the worker's media deadline current. On rewind, rebuild H.264 state
  // from the nearest complete random-access point.
  useEffect(() => {
    return player.subscribeCurrentTime((time) => {
      workerRef.current?.postMessage({
        type: 'playback',
        currentTime: time,
        isPlaying,
      } satisfies ImageRenderWorkerRequest);
      const nowNs = toNano(time);
      const previousNs = lastPlaybackTimeNsRef.current;
      if (previousNs !== nowNs) {
        seekRepairGenerationRef.current += 1;
      }
      if (previousNs != null && nowNs + 5_000_000n < previousNs) {
        const repairGeneration = seekRepairGenerationRef.current;
        const worker = workerRef.current;
        const stillImageTopic = worker && topic && !videoOrderedModeRef.current ? topic : null;
        videoSeekRepairAbortRef.current?.abort();
        videoSeekRepairAbortRef.current = null;
        if (worker && topic && videoOrderedModeRef.current) {
          videoBootstrapInFlightRef.current = true;
          videoBufferedLiveRef.current = [];
          const generation = videoBootstrapGenerationRef.current;
          const controller = new AbortController();
          videoSeekRepairAbortRef.current = controller;
          void (async () => {
            try {
              const success = await executeVideoBootstrap({
                player,
                worker,
                topic,
                targetTime: time,
                codec: videoBufferedLiveRef.current.map(videoCodecForMessageEvent).find(Boolean) ?? undefined,
                liveEvents: videoBufferedLiveRef.current,
                signal: controller.signal,
                preserveFrame: true,
              });
              if (
                success &&
                !controller.signal.aborted &&
                generation === videoBootstrapGenerationRef.current
              ) {
                videoBufferedLiveRef.current = [];
              }
            } finally {
              if (generation === videoBootstrapGenerationRef.current) {
                videoBootstrapInFlightRef.current = false;
              }
              if (videoSeekRepairAbortRef.current === controller) {
                videoSeekRepairAbortRef.current = null;
              }
            }
          })();
        } else {
          worker?.postMessage({ type: 'reset' } satisfies ImageRenderWorkerRequest);
        }
        const repairTopics = new Set<string>();
        if (stillImageTopic) repairTopics.add(stillImageTopic);
        if (repairTopics.size > 0 && player.getMessagesInTimeRange) {
          void player.getMessagesInTimeRange({
            start: addMs(time, -2000),
            end: time,
            topics: [...repairTopics],
          }).then((messages) => {
            if (seekRepairGenerationRef.current !== repairGeneration) return;
            let latestImage: RosMessageEvent | undefined;
            for (const event of messages) {
              if (
                stillImageTopic &&
                event.topic === stillImageTopic &&
                toNano(event.receiveTime) <= nowNs &&
                (!latestImage || toNano(event.receiveTime) > toNano(latestImage.receiveTime))
              ) {
                latestImage = event;
              }
            }
            if (worker && latestImage) postImageFrame(worker, latestImage);
          });
        }
      }
      lastPlaybackTimeNsRef.current = nowNs;
    });
  }, [isPlaying, player, topic]);

  // Send color/depth decode options when they change — triggers immediate redraw in worker
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) {
      return;
    }
    worker.postMessage({
      type: 'rawDecodeOptions',
      options: configToRawDecodeOptions({
        colorMode,
        colorMap,
        gradient,
        flatColor,
        explicitAlpha,
        minValue,
        maxValue,
      }),
    } satisfies ImageRenderWorkerRequest);
  }, [colorMode, colorMap, gradient, flatColor, explicitAlpha, minValue, maxValue]);

  // Send render options (flip/rotation/smoothing/fitMode) — triggers immediate redraw
  useEffect(() => {
    const options: ImageRenderOptions = {
      backgroundColor,
      flipHorizontal,
      flipVertical,
      rotationDeg: rotation,
      smoothing,
      fitMode,
    };
    workerRef.current?.postMessage({
      type: 'renderOptions',
      options,
    } satisfies ImageRenderWorkerRequest);
  }, [backgroundColor, flipHorizontal, flipVertical, rotation, smoothing, fitMode]);

  const statusText = getStatusText(status);

  return (
    <div
      className="flex flex-col h-full overflow-hidden relative"
      style={{ background: backgroundColor }}
      data-testid="image-panel"
      data-video-codec={metrics?.codec}
      data-video-pressure={metrics?.pressureMode}
      data-video-queue-frames={metrics?.queueFrames}
      data-video-dropped-frames={metrics?.droppedFrames}
      data-video-decode-queue={metrics?.decodeQueueSize}
      data-video-media-lag-ms={metrics?.mediaLagMs}
      data-video-resync-count={metrics?.resyncCount}
      data-video-rendered-frames={metrics?.renderedFrames}
    >
      <PanelTopicBar className="border-zinc-800 bg-zinc-950">
        <TopicQuickPicker
          value={topic}
          onChange={(nextTopic) => setConfig((prev) => applyDepthTopicPreset(nextTopic, prev))}
          typeIncludes={[...IMAGE_PANEL_TOPIC_INCLUDES]}
          placeholder={formatMessage({ id: 'panels.framework.topicPicker.imagePlaceholder' })}
          className="min-w-0 flex-1"
          triggerClassName="border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50"
        />
      </PanelTopicBar>
      <div
        ref={viewportRef}
        className="flex-1 relative min-h-0 min-w-0 flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          data-testid="image-panel-canvas"
        />
        {showStatusText && statusText && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 italic text-xs">
            {statusText}
          </div>
        )}
        {showStatusText && status.phase === 'ready' && status.width && status.height && (
          <div
            className="absolute bottom-0 left-0 right-0 px-2 py-1 text-white/30 text-[10px] font-mono truncate pointer-events-none"
            data-testid="image-panel-status"
          >
            {status.width}x{status.height} {status.encoding ?? ''}
          </div>
        )}
      </div>
    </div>
  );
};

function getStatusText(status: ImageSurfaceStatus): string | null {
  if (status.phase === 'idle') {
    return 'Waiting for image data';
  }
  if (status.phase === 'error') {
    return status.message ?? 'Image decode failed';
  }
  if (status.phase === 'decoding' && !status.width && !status.height) {
    return 'Decoding latest frame...';
  }
  return null;
}

function isUiStatusEqual(a: ImageSurfaceStatus, b: ImageSurfaceStatus): boolean {
  return (
    a.phase === b.phase &&
    a.width === b.width &&
    a.height === b.height &&
    a.encoding === b.encoding &&
    a.message === b.message
  );
}

function postImageFrame(worker: Worker, messageEvent: RosMessageEvent): void {
  // High-frequency consumers receive a payload dedicated to this consumer, so
  // a full-span ArrayBuffer can be handed directly to the render worker.
  const next = toWorkerFrame(messageEvent, { transferOwnership: true });
  if (!next) {
    return;
  }
  worker.postMessage(
    { type: 'frame', frame: next.frame } satisfies ImageRenderWorkerRequest,
    next.transfer,
  );
}
