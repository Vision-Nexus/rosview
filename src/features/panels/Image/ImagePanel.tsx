import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import type { Player } from '@/core/types/player';
import { useMessagePipeline } from '@/core/pipeline/useMessagePipeline';
import type { MessageEvent as RosMessageEvent, Time } from '@/core/types/ros';
import { scheduleFrame } from '@/shared/utils/rafScheduler';
import { fromNano, toNano } from '@/shared/utils/time';
import type { ImageAnnotationsFrame } from './core/imageAnnotations';
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
import {
  FrameAnnotationPairer,
  type ImageFrameAnnotationPair,
} from './core/frameAnnotationPairer';
import { isVideoMessageEvent, toWorkerFrame, videoCodecForMessageEvent } from './core/messageFrameAdapter';
import { applyDepthTopicPreset } from './core/depthColorDefaults';
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
  const lastUiStatusRef = useRef<ImageSurfaceStatus>({ phase: 'idle' });
  const videoSeekRepairAbortRef = useRef<AbortController | null>(null);
  const videoOrderedModeRef = useRef(false);
  const videoBootstrapInFlightRef = useRef(false);
  const videoBootstrapGenerationRef = useRef(0);
  const videoBufferedLiveRef = useRef<RosMessageEvent[]>([]);
  const consumerModeRef = useRef<'latest' | 'all'>('latest');
  const frameAnnotationPairerRef = useRef<FrameAnnotationPairer | null>(null);
  const deliverAnnotationPairsRef = useRef<
    ((pairs: ImageFrameAnnotationPair[]) => void) | null
  >(null);
  const runVideoBootstrapRef = useRef<
    ((targetTime: Time | undefined, preserveFrame: boolean) => Promise<boolean>) | null
  >(null);
  const [status, setStatus] = useState<ImageSurfaceStatus>({ phase: 'idle' });
  const [metrics, setMetrics] = useState<ImageRenderMetrics | null>(null);
  const [annotationGap, setAnnotationGap] = useState(false);
  const annotationRangeAbortRef = useRef<AbortController | null>(null);
  const [annotationWaiting, setAnnotationWaiting] = useState(false);
  const [renderedAnnotationState, setRenderedAnnotationState] = useState<
    'disabled' | 'matched' | 'gap'
  >('disabled');
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
      if (data.type === 'rendered') {
        setRenderedAnnotationState(data.annotationState);
        if (data.annotationState === 'gap') setAnnotationGap(true);
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

  // Keep image and annotation delivery together. Frames wait for the exact annotation log-time
  // key, or for a later annotation to prove that the key is a real data gap.
  useEffect(() => {
    if (!topic) return;
    const worker = workerRef.current;
    if (!worker) return;

    videoOrderedModeRef.current = false;
    videoBootstrapInFlightRef.current = false;
    videoBootstrapGenerationRef.current += 1;
    videoBufferedLiveRef.current = [];
    consumerModeRef.current = 'latest';
    const pairer = selectedAnnotationTopic ? new FrameAnnotationPairer() : null;
    let active = true;

    let annotationRangeScheduled = false;
    const resolvePendingAnnotations = () => {
      if (
        !pairer ||
        !player.getMessagesInTimeRange ||
        annotationRangeScheduled ||
        annotationRangeAbortRef.current
      ) {
        return;
      }
      annotationRangeScheduled = true;
      queueMicrotask(() => {
        if (!active) return;
        annotationRangeScheduled = false;
        const range = pairer.pendingRange();
        if (!range || annotationRangeAbortRef.current) return;
        const controller = new AbortController();
        annotationRangeAbortRef.current = controller;
        let completed = false;
        void player
          .getMessagesInTimeRange!({
            start: fromNano(range.startNs),
            end: fromNano(range.endNs),
            topics: [selectedAnnotationTopic],
          })
          .then((messages) => {
            if (!active || controller.signal.aborted) return;
            for (const event of messages) deliverPairs(pairer.pushAnnotation(event));
            deliverPairs(pairer.confirmThrough(range.endNs));
            completed = true;
          })
          .catch((error: unknown) => {
            if (!controller.signal.aborted) {
              console.warn('ImagePanel: annotation range read failed', error);
            }
          })
          .finally(() => {
            if (annotationRangeAbortRef.current === controller) {
              annotationRangeAbortRef.current = null;
            }
            if (active && completed && pairer.pendingFrameCount > 0) {
              resolvePendingAnnotations();
            }
          });
      });
    };
    frameAnnotationPairerRef.current = pairer;
    setAnnotationGap(false);
    setAnnotationWaiting(false);
    setRenderedAnnotationState('disabled');
    setMetrics(null);
    worker.postMessage({ type: 'reset' } satisfies ImageRenderWorkerRequest);

    const deliverPairs = (pairs: ImageFrameAnnotationPair[]) => {
      if (pairs.some((pair) => pair.annotation === null)) setAnnotationGap(true);
      for (const pair of pairs) postImageFrame(worker, pair.frame, pair.annotation);
      setAnnotationWaiting((pairer?.pendingFrameCount ?? 0) > 0);
    };
    deliverAnnotationPairsRef.current = deliverPairs;

    const handleVideoFrame = (event: RosMessageEvent) => {
      if (videoBootstrapInFlightRef.current) {
        videoBufferedLiveRef.current.push(event);
        return;
      }
      if (pairer) {
        deliverPairs(pairer.pushFrame(event));
        resolvePendingAnnotations();
      } else {
        postImageFrame(worker, event);
      }
    };

    const dispatchHighFrequencyBatch = (messages: RosMessageEvent[]) => {
      for (const event of messages) {
        if (isVideoMessageEvent(event)) handleVideoFrame(event);
        else postImageFrame(worker, event);
      }
    };

    if (pairer) {
      player.registerHighFrequencyConsumer(annotationConsumerId, {
        topic: selectedAnnotationTopic,
        lane: 'video',
        mode: 'all',
        onMessageBatch: (messages) => {
          for (const event of messages) deliverPairs(pairer.pushAnnotation(event));
        },
      });
    }

    const initialOrdered = topicNeedsOrderedVideoFrames(topicSchema);
    if (initialOrdered) {
      videoOrderedModeRef.current = true;
      consumerModeRef.current = 'all';
    }

    const runBootstrap = async (targetTime: Time | undefined, preserveFrame: boolean) => {
      if (!targetTime) return false;
      const generation = videoBootstrapGenerationRef.current + 1;
      videoBootstrapGenerationRef.current = generation;
      const bootstrapLiveEvents = [...videoBufferedLiveRef.current];
      videoBootstrapInFlightRef.current = true;
      if (selectedAnnotationTopic) setAnnotationWaiting(true);
      videoSeekRepairAbortRef.current?.abort();
      const controller = new AbortController();
      videoSeekRepairAbortRef.current = controller;

      try {
        const success = await executeVideoBootstrap({
          player,
          worker,
          topic,
          targetTime,
          codec: bootstrapLiveEvents.map(videoCodecForMessageEvent).find(Boolean) ?? undefined,
          liveEvents: bootstrapLiveEvents,
          signal: controller.signal,
          preserveFrame,
          annotationTopic: selectedAnnotationTopic || undefined,
          onAnnotationGap: () => setAnnotationGap(true),
        });
        if (controller.signal.aborted || generation !== videoBootstrapGenerationRef.current) {
          return false;
        }
        if (!success) {
          setAnnotationWaiting(false);
          return false;
        }
        const targetNs = toNano(targetTime);
        const trailingLiveEvents = videoBufferedLiveRef.current
          .slice(bootstrapLiveEvents.length)
          .filter((event) => toNano(event.receiveTime) > targetNs);
        videoBufferedLiveRef.current = [];
        setAnnotationWaiting(false);
        for (const event of trailingLiveEvents) {
          if (pairer) deliverPairs(pairer.pushFrame(event));
          else postImageFrame(worker, event);
        }
        resolvePendingAnnotations();
        return true;
      } finally {
        if (
          generation === videoBootstrapGenerationRef.current &&
          videoSeekRepairAbortRef.current === controller
        ) {
          videoBootstrapInFlightRef.current = false;
          videoSeekRepairAbortRef.current = null;
        }
      }
    };
    runVideoBootstrapRef.current = runBootstrap;

    const activateVideoOrderedMode = async (triggerMessage?: RosMessageEvent) => {
      if (videoOrderedModeRef.current) {
        if (triggerMessage) handleVideoFrame(triggerMessage);
        return;
      }
      videoOrderedModeRef.current = true;
      if (triggerMessage) videoBufferedLiveRef.current.push(triggerMessage);
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
      if (currentTime) await runBootstrap(currentTime, false);
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
      handleVideoFrame(message);
    };

    if (consumerModeRef.current === 'all') {
      player.registerHighFrequencyConsumer(imageConsumerId, {
        topic,
        lane: 'video',
        mode: 'all',
        onMessageBatch: dispatchHighFrequencyBatch,
      });
      const currentTime = player.getCurrentTime();
      if (currentTime) void runBootstrap(currentTime, false);
    } else {
      player.registerHighFrequencyConsumer(imageConsumerId, {
        topic,
        lane: 'video',
        mode: 'latest',
        onLatestMessage: handleMessage,
        onMessageBatch: (messages) => {
          if (videoOrderedModeRef.current) return;
          const latest = messages.at(-1);
          if (latest) handleMessage(latest);
        },
      });
    }

    return () => {
      active = false;
      videoBootstrapGenerationRef.current += 1;
      videoSeekRepairAbortRef.current?.abort();
      videoSeekRepairAbortRef.current = null;
      videoBufferedLiveRef.current = [];
      videoBootstrapInFlightRef.current = false;
      frameAnnotationPairerRef.current = null;
      deliverAnnotationPairsRef.current = null;
      runVideoBootstrapRef.current = null;
      player.unregisterHighFrequencyConsumer(imageConsumerId);
      if (pairer) player.unregisterHighFrequencyConsumer(annotationConsumerId);
      annotationRangeAbortRef.current?.abort();
      annotationRangeAbortRef.current = null;
      worker.postMessage({ type: 'reset' } satisfies ImageRenderWorkerRequest);
    };
  }, [
    annotationConsumerId,
    imageConsumerId,
    player,
    selectedAnnotationTopic,
    topic,
    topicSchema,
  ]);

  useEffect(() => {
    return () => {
      videoSeekRepairAbortRef.current?.abort();
      videoSeekRepairAbortRef.current = null;
    };
  }, [player, topic]);

  useEffect(
    () =>
      player.subscribeSeek((time) => {
        frameAnnotationPairerRef.current?.reset();
        videoBufferedLiveRef.current = [];
        setAnnotationGap(false);
        annotationRangeAbortRef.current?.abort();
        annotationRangeAbortRef.current = null;
        setAnnotationWaiting(selectedAnnotationTopic.length > 0);
        const worker = workerRef.current;
        if (worker && topic && videoOrderedModeRef.current) {
          void runVideoBootstrapRef.current?.(time, true);
        } else {
          worker?.postMessage({
            type: 'reset',
            preserveFrame: true,
          } satisfies ImageRenderWorkerRequest);
        }
      }),
    [player, selectedAnnotationTopic, topic],
  );



  // Keep the worker's media deadline current without routing playback ticks through React state.
  useEffect(() => {
    return player.subscribeCurrentTime((time) => {
      workerRef.current?.postMessage({
        type: 'playback',
        currentTime: time,
        isPlaying,
      } satisfies ImageRenderWorkerRequest);
    });
  }, [isPlaying, player]);

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
      data-annotation-state={
        selectedAnnotationTopic && annotationWaiting ? 'buffering' : renderedAnnotationState
      }
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
        {annotationWaiting && (
          <div className="absolute top-1 left-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-muted-foreground">
            {formatMessage({ id: 'panels.image.status.waitingForAnnotation' })}
          </div>
        )}
        {annotationGap && (
          <div
            className="absolute top-1 right-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-amber-600"
            data-testid="image-annotation-gap-warning"
          >
            {formatMessage({ id: 'panels.image.warning.annotationGap' })}
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

function postImageFrame(
  worker: Worker,
  messageEvent: RosMessageEvent,
  annotation?: ImageAnnotationsFrame | null,
): void {
  // High-frequency consumers receive a payload dedicated to this consumer, so
  // a full-span ArrayBuffer can be handed directly to the render worker.
  const next = toWorkerFrame(messageEvent, { transferOwnership: true });
  if (!next) return;
  next.frame.annotation = annotation;
  worker.postMessage(
    { type: 'frame', frame: next.frame } satisfies ImageRenderWorkerRequest,
    next.transfer,
  );
}
