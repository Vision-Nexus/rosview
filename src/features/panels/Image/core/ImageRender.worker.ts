/// <reference lib="webworker" />

import type { Time } from '@/core/types/ros';
import { decodeCompressedDepth } from './compressedDepthDecoder';
import { decodeRawImage } from './rawDecoders';
import {
  type VideoCodec,
  containsVideoRandomAccessNal,
  containsVideoVclNal,
  isVideoConfigOnly,
  monotonicVideoTimestampUs,
  streamCodecIdentity,
  videoChunkType,
  videoCodecCandidates,
  videoCodecFromFormat,
} from './videoCodec';
import {
  VIDEO_DECODE_QUEUE_HIGH_WATER,
  VIDEO_PRESSURED_RENDER_INTERVAL_MS,
  VIDEO_RENDER_INTERVAL_MS,
  decodedFrameLatenessMs,
  initialVideoPressureState,
  isVideoHardLimitExceeded,
  isRetrogradeMediaFrame,
  shouldDropDecodedVideoFrame,
  updateDecodeDurationEwma,
  updateVideoPressure,
  type VideoPressureState,
} from './videoBackpressure';
import {
  applyVideoHardLimit,
  selectLatestCompleteVideoGop,
  updateVideoConfigPackets,
} from './videoQueue';
import { withTimeout } from './asyncTimeout';
import {
  getCompressedKind,
  isCompressedDepthFormat,
  normalizeCompressedMime,
  type ImageSurfaceStatus,
} from './imageTypes';
import { drawImageAnnotations, type ImageAnnotationsFrame } from './imageAnnotations';
import { discardStaleAsyncResult } from './asyncEpoch';
import type {
  ImageRenderOptions,
  ImageRenderMetrics,
  ImageRenderWorkerEvent,
  ImageRenderWorkerRequest,
  ImageViewport,
  ImageWorkerFrameEnvelope,
} from './imageWorkerProtocol';
import type { RawImageDecodeOptions } from './imageColorMode';
import { VIDEO_SEEK_MAX_FRAMES } from './videoSeekRepair';

const DEFAULT_RENDER_OPTIONS: ImageRenderOptions = {
  backgroundColor: '#000000',
  flipHorizontal: false,
  flipVertical: false,
  rotationDeg: 0,
  smoothing: true,
  fitMode: 'contain',
};

function normalizeRotationDeg(deg: number): number {
  const d = ((deg % 360) + 360) % 360;
  return d;
}

/** Axis-aligned bounding size of a `sourceW × sourceH` rectangle rotated by `rotationDeg` (degrees). */
function rotatedAabbSize(sourceWidth: number, sourceHeight: number, rotationDeg: number): { w: number; h: number } {
  const rad = (normalizeRotationDeg(rotationDeg) * Math.PI) / 180;
  const absCos = Math.abs(Math.cos(rad));
  const absSin = Math.abs(Math.sin(rad));
  return {
    w: sourceWidth * absCos + sourceHeight * absSin,
    h: sourceWidth * absSin + sourceHeight * absCos,
  };
}

const DEFAULT_VIEWPORT: ImageViewport = {
  cssWidth: 0,
  cssHeight: 0,
  devicePixelRatio: 1,
};

const OUTPUT_TIMEOUT_MS = 5000;
const METRICS_INTERVAL_MS = 1000;
const VIDEO_RESYNC_COOLDOWN_MS = 200;

// ---------- H.264 / H.265 decoder ----------

class WorkerVideoDecoder {
  #decoder: VideoDecoder | null = null;
  #lastTimestampUs = -1;
  #configuredCodec: string | null = null;
  #streamCodec: string | null = null;
  #codecKind: VideoCodec | null = null;
  #generation = 0;
  #submitted = new Map<number, {
    frame: ImageWorkerFrameEnvelope;
    startedAt: number;
    generation: number;
  }>();
  #callbacks: {
    output: (output: {
      videoFrame: VideoFrame;
      sourceFrame: ImageWorkerFrameEnvelope;
      decodeMs: number;
    }) => void;
    error: (error: Error) => void;
    dequeue: () => void;
  };

  public constructor(callbacks: {
    output: (output: {
      videoFrame: VideoFrame;
      sourceFrame: ImageWorkerFrameEnvelope;
      decodeMs: number;
    }) => void;
    error: (error: Error) => void;
    dequeue: () => void;
  }) {
    this.#callbacks = callbacks;
  }

  public dispose(): void {
    this.reset();
    this.#lastTimestampUs = -1;
  }

  public reset(): void {
    this.#generation += 1;
    if (this.#decoder && this.#decoder.state !== 'closed') this.#decoder.close();
    this.#decoder = null;
    this.#configuredCodec = null;
    this.#streamCodec = null;
    this.#codecKind = null;
    this.#submitted.clear();
  }

  public get codec(): string | undefined {
    return this.#configuredCodec ?? undefined;
  }

  public get decodeQueueSize(): number {
    return this.#decoder?.state === 'configured' ? this.#decoder.decodeQueueSize : 0;
  }

  public get hasPendingWork(): boolean {
    return this.#submitted.size > 0 || this.decodeQueueSize > 0;
  }

  public async submitFrame(
    frame: ImageWorkerFrameEnvelope,
    data: Uint8Array<ArrayBuffer>,
    sortTimeKey: bigint,
  ): Promise<void> {
    if (typeof VideoDecoder === 'undefined') throw new Error('WebCodecs VideoDecoder is not supported');
    const codec = frame.kind === 'compressed' ? videoCodecFromFormat(frame.format) : null;
    if (!codec) throw new Error('Compressed frame does not declare H.264 or H.265');

    const parsedCodec = streamCodecIdentity(codec, data);
    if (
      this.#decoder &&
      this.#decoder.state !== 'closed' &&
      ((this.#codecKind !== null && codec !== this.#codecKind) ||
        (parsedCodec && parsedCodec !== this.#streamCodec))
    ) {
      this.reset();
    }
    const generation = this.#generation;
    if (!(await this.#ensureDecoder(codec, data, parsedCodec, generation))) return;
    const decoder = this.#decoder!;
    const timestamp = monotonicVideoTimestampUs(sortTimeKey, this.#lastTimestampUs);
    this.#lastTimestampUs = timestamp;
    if (containsVideoVclNal(codec, data)) {
      this.#submitted.set(timestamp, {
        frame,
        startedAt: performance.now(),
        generation,
      });
    }
    try {
      decoder.decode(new EncodedVideoChunk({
        type: videoChunkType(codec, data),
        timestamp,
        data,
      }));
    } catch (error) {
      this.#submitted.delete(timestamp);
      throw error;
    }
  }

  async #ensureDecoder(
    codec: VideoCodec,
    data: Uint8Array<ArrayBuffer>,
    parsedCodec: string | null,
    generation: number,
  ): Promise<boolean> {
    if (this.#decoder && this.#decoder.state !== 'closed') return true;

    let supportedConfig: VideoDecoderConfig | null = null;
    for (const codecString of videoCodecCandidates(codec, data)) {
      const candidates: VideoDecoderConfig[] = [
        { codec: codecString, hardwareAcceleration: 'prefer-hardware', optimizeForLatency: true },
        { codec: codecString, hardwareAcceleration: 'no-preference', optimizeForLatency: true },
      ];
      for (const candidate of candidates) {
        try {
          const support = await VideoDecoder.isConfigSupported(candidate);
          if (generation !== this.#generation) return false;
          if (support.supported) {
            supportedConfig = support.config ?? candidate;
            break;
          }
        } catch {
          // Some implementations throw for an unsupported codec or acceleration mode.
        }
      }
      if (supportedConfig) break;
    }
    if (!supportedConfig) {
      const label = codec === 'h264' ? 'H.264' : 'H.265';
      throw new Error(`${label} codec ${parsedCodec ?? 'fallback candidates'} is not supported`);
    }

    this.#decoder = new VideoDecoder({
      output: (frame) => {
        const submitted = this.#submitted.get(frame.timestamp);
        this.#submitted.delete(frame.timestamp);
        if (!submitted || submitted.generation !== this.#generation) {
          frame.close();
          return;
        }
        this.#callbacks.output({
          videoFrame: frame,
          sourceFrame: submitted.frame,
          decodeMs: performance.now() - submitted.startedAt,
        });
      },
      error: (error) => this.#callbacks.error(new Error(String(error))),
    });
    this.#decoder.addEventListener('dequeue', this.#callbacks.dequeue);
    try {
      this.#decoder.configure(supportedConfig);
      this.#configuredCodec = supportedConfig.codec;
      this.#streamCodec = parsedCodec;
      this.#codecKind = codec;
    } catch (error) {
      this.#decoder.close();
      this.#decoder = null;
      this.#configuredCodec = null;
      this.#codecKind = null;
      throw error;
    }
    return true;
  }
}

// ---------- Cached frame state ----------

/**
 * Cached state for the last successfully decoded frame.
 * - Raw frames retain the source pixel bytes so rawDecodeOptions changes
 *   can re-decode without a new incoming frame.
 * - Compressed / h264 frames retain an ImageBitmap so renderOptions /
 *   viewport changes can redraw without re-decoding.
 */
type CachedFrame =
  | {
      kind: 'raw';
      width: number;
      height: number;
      encoding: string;
      step: number;
      isBigEndian: boolean;
      data: Uint8Array<ArrayBuffer>;
      receiveTime: Time;
      annotation?: ImageAnnotationsFrame | null;
    }
  | {
      kind: 'bitmap';
      width: number;
      height: number;
      encoding: string;
      bitmap: ImageBitmap;
      receiveTime: Time;
      annotation?: ImageAnnotationsFrame | null;
    };

// ---------- Main runtime ----------

class ImageRenderWorkerRuntime {
  #canvas: OffscreenCanvas | null = null;
  #ctx: OffscreenCanvasRenderingContext2D | null = null;
  #bufferCanvas = new OffscreenCanvas(1, 1);
  #bufferCtx = this.#bufferCanvas.getContext('2d', { alpha: false });
  #renderOptions: ImageRenderOptions = { ...DEFAULT_RENDER_OPTIONS };
  #viewport: ImageViewport = { ...DEFAULT_VIEWPORT };
  #rawDecodeOptions: Partial<RawImageDecodeOptions> = {};
  #pendingFrame: ImageWorkerFrameEnvelope | null = null;
  #pendingVideoFrames: ImageWorkerFrameEnvelope[] = [];
  #isProcessing = false;
  #processingEpoch: number | null = null;
  #decoder: WorkerVideoDecoder;
  #pendingDecodedVideo: {
    videoFrame: VideoFrame;
    sourceFrame: ImageWorkerFrameEnvelope;
  } | null = null;
  #videoRenderTimer: number | null = null;
  #lastPostedUiPhase: ImageSurfaceStatus['phase'] = 'idle';
  #haltUntilReset = false;
  /** Reused RGBA buffer for raw frames; resized as needed. */
  #rawRgba: Uint8ClampedArray<ArrayBuffer> | null = null;
  #rawImageData: ImageData | null = null;
  /** MIME keys already probed with ImageDecoder.isTypeSupported. */
  #imageDecoderMimeSupported = new Map<string, boolean>();
  /** The last decoded frame retained for instant-redraw on option changes. */
  #cachedFrame: CachedFrame | null = null;
  #activeVideoCodec: VideoCodec | null = null;
  #videoPressure: VideoPressureState = initialVideoPressureState();
  #videoDecodeMs = 0;
  #videoWaitingForRandomAccess = false;
  #videoConfigBeforeRandomAccess: ImageWorkerFrameEnvelope[] = [];
  #videoRecentConfig: ImageWorkerFrameEnvelope[] = [];
  #videoNeedsResync = false;
  #lastVideoRenderAt = -Infinity;
  #lastVideoBitmapAt = -Infinity;
  #droppedVideoFrames = 0;
  #renderedVideoFrames = 0;
  #videoResyncCount = 0;
  #lastVideoResyncAt = -Infinity;
  #playbackTimeNs: bigint | null = null;
  #lastDecodedVideoTimeNs: bigint | null = null;
  #lastDrawnMediaTimeNs: bigint | null = null;
  #isPlaying = false;
  #lastMetricsAt = -Infinity;
  #epoch = 0;
  #healthGeneration = 0;
  #lastPostedRenderHealth: { generation: number; pending: boolean } | null = null;

  public constructor() {
    if (!this.#bufferCtx) {
      throw new Error('Buffer canvas context is unavailable in worker');
    }
    this.#decoder = new WorkerVideoDecoder({
      output: (output) => this.#handleVideoOutput(output),
      error: (error) => this.#handleVideoDecoderError(error),
      dequeue: () => {
        this.#updateVideoPressure();
        this.#emitRenderHealth();
        void this.#drainLatestFrame();
      },
    });
  }

  public handle(message: ImageRenderWorkerRequest): void {
    switch (message.type) {
      case 'init':
        this.#canvas = message.canvas;
        this.#ctx = message.canvas.getContext('2d', {
          alpha: false,
          desynchronized: true,
        });
        if (!this.#ctx) {
          throw new Error('Canvas 2D context is unavailable in worker');
        }
        this.#applyViewport();
        this.#clearCanvas();
        this.#emitStatus({ phase: 'idle' });
        this.#emitRenderHealth(true);
        return;

      case 'viewport':
        this.#viewport = message.viewport;
        this.#applyViewport();
        this.#redrawCachedFrame();
        return;

      case 'renderOptions':
        this.#renderOptions = message.options;
        this.#redrawCachedFrame();
        return;

      case 'rawDecodeOptions':
        this.#rawDecodeOptions = message.options;
        // Re-decode and redraw immediately if we have a cached raw frame.
        this.#redrawRawCached();
        return;

      case 'playback':
        this.#playbackTimeNs = timeToKey(message.currentTime);
        this.#isPlaying = message.isPlaying;
        this.#updateVideoPressure();
        this.#trimPendingVideoFramesIfNeeded();
        this.#emitMetricsIfDue();
        return;

      case 'frame':
        this.#healthGeneration = message.generation;
        if (this.#haltUntilReset) {
          this.#emitRenderHealth(true);
          return;
        }
        this.#enqueueFrame(message.frame);
        this.#emitRenderHealth();
        if (!this.#isProcessing) {
          void this.#drainLatestFrame();
        }
        return;


      case 'bootstrapVideo':
        this.#bootstrapVideo(
          message.codec,
          message.frames,
          message.preserveFrame === true,
          message.generation,
        );
        return;

      case 'reset':
        this.#healthGeneration = message.generation;
        this.#epoch += 1;
        this.#pendingFrame = null;
        this.#pendingVideoFrames = [];
        this.#disposePendingVideoOutput();
        this.#haltUntilReset = false;
        this.#resetVideoRuntimeState();
        this.#decoder.reset();
        this.#disposeAuxiliaryDecodeState();
        if (!message.preserveFrame) {
          this.#disposeCachedBitmap();
          this.#cachedFrame = null;
          this.#clearCanvas();
          this.#emitStatus({ phase: 'idle' });
        }
        this.#emitRenderHealth(true);
        return;

      case 'dispose':
        this.#epoch += 1;
        this.#pendingFrame = null;
        this.#pendingVideoFrames = [];
        this.#disposePendingVideoOutput();
        this.#haltUntilReset = false;
        this.#decoder.dispose();
        this.#disposeAuxiliaryDecodeState();
        this.#disposeCachedBitmap();
        this.#cachedFrame = null;
        self.close();
        return;
    }
  }

  #bootstrapVideo(
    codec: VideoCodec,
    frames: ImageWorkerFrameEnvelope[],
    preserveFrame: boolean,
    generation: number,
  ): void {
    this.#healthGeneration = generation;
    this.#epoch += 1;
    this.#pendingFrame = null;
    this.#pendingVideoFrames = [];
    this.#disposePendingVideoOutput();
    this.#haltUntilReset = false;
    this.#activeVideoCodec = codec;
    this.#resetVideoRuntimeState();
    this.#decoder.reset();
    if (!preserveFrame) {
      this.#disposeCachedBitmap();
      this.#cachedFrame = null;
      this.#clearCanvas();
      this.#emitStatus({ phase: 'idle' });
    }

    const videoFrames = frames
      .filter((frame) => videoCodecForFrame(frame) === codec)
      .slice(0, VIDEO_SEEK_MAX_FRAMES);
    if (
      videoFrames.length === 0 ||
      !videoFrames.some((frame) => containsVideoRandomAccessNal(codec, frame.data))
    ) {
      this.#videoWaitingForRandomAccess = true;
      this.#emitMetricsIfDue(true);
      this.#emitRenderHealth(true);
      return;
    }

    for (const frame of videoFrames) {
      this.#enqueueVideoFrame(frame, { applyBackpressure: false });
    }

    this.#emitMetricsIfDue(true);
    this.#emitRenderHealth(true);
    if (!this.#isProcessing) void this.#drainLatestFrame();
  }

  #enqueueVideoFrame(
    frame: ImageWorkerFrameEnvelope,
    options: { applyBackpressure?: boolean } = {},
  ): void {
    const codec = videoCodecForFrame(frame);
    if (!codec) return;
    if (this.#activeVideoCodec !== codec) {
      this.#activeVideoCodec = codec;
      this.#pendingVideoFrames = [];
      this.#videoRecentConfig = [];
      this.#videoConfigBeforeRandomAccess = [];
      this.#videoWaitingForRandomAccess = true;
      this.#resyncVideoDecoder();
    }
    this.#videoRecentConfig = updateVideoConfigPackets(
      codec,
      this.#videoRecentConfig,
      frame,
    );
    if (this.#videoWaitingForRandomAccess && !containsVideoRandomAccessNal(codec, frame.data)) {
      if (isVideoConfigOnly(codec, frame.data)) {
        this.#videoConfigBeforeRandomAccess = updateVideoConfigPackets(
          codec,
          this.#videoConfigBeforeRandomAccess,
          frame,
        );
        return;
      }
      this.#droppedVideoFrames += 1;
      if (options.applyBackpressure !== false) this.#emitMetricsIfDue();
      return;
    }
    if (containsVideoRandomAccessNal(codec, frame.data)) {
      this.#videoWaitingForRandomAccess = false;
      if (this.#videoConfigBeforeRandomAccess.length > 0) {
        this.#pendingVideoFrames.push(...this.#videoConfigBeforeRandomAccess);
        this.#videoConfigBeforeRandomAccess = [];
      }
    }
    this.#pendingVideoFrames.push(frame);
    if (options.applyBackpressure !== false) {
      this.#updateVideoPressure();
      this.#trimPendingVideoFramesIfNeeded();
      this.#emitMetricsIfDue();
    }
  }

  #enqueueFrame(frame: ImageWorkerFrameEnvelope): void {
    if (!isVideoFrame(frame)) {
      this.#pendingFrame = frame;
      return;
    }
    this.#enqueueVideoFrame(frame);
  }

  #trimPendingVideoFramesIfNeeded(): void {
    const queueSpanMs = videoQueueSpanMs(this.#pendingVideoFrames);
    const hardLimitExceeded = isVideoHardLimitExceeded(
      this.#pendingVideoFrames.length,
      queueSpanMs,
    );
    const pressureTrim =
      this.#videoPressure.mode === 'degraded' &&
      (this.#pendingVideoFrames.length > 36 || queueSpanMs > 250);
    if (!hardLimitExceeded && !pressureTrim) return;
    const codec = this.#activeVideoCodec;
    if (!codec) return;

    const selection = selectLatestCompleteVideoGop(
      codec,
      this.#pendingVideoFrames,
      this.#videoRecentConfig,
    );
    const resyncAllowed =
      hardLimitExceeded ||
      performance.now() - this.#lastVideoResyncAt >= VIDEO_RESYNC_COOLDOWN_MS;
    if (selection.resync && resyncAllowed) {
      this.#pendingVideoFrames = selection.frames;
      this.#resyncVideoDecoder();
      this.#droppedVideoFrames += selection.droppedFrames;
    }

    if (
      isVideoHardLimitExceeded(
        this.#pendingVideoFrames.length,
        videoQueueSpanMs(this.#pendingVideoFrames),
      )
    ) {
      this.#waitForNextRandomAccess();
      return;
    }

    if (!selection.resync) {
      // No newer complete GOP exists. Preserve every dependent delta in the
      // current GOP while pressure is soft. The hard-limit branch above drops
      // the complete backlog rather than decoding a truncated dependency chain.
      return;
    }
  }

  #waitForNextRandomAccess(): void {
    const plan = applyVideoHardLimit(this.#pendingVideoFrames, true);
    this.#droppedVideoFrames += plan.droppedFrames;
    this.#pendingVideoFrames = plan.frames;
    this.#videoWaitingForRandomAccess = true;
    this.#videoConfigBeforeRandomAccess = [...this.#videoRecentConfig];
    this.#resyncVideoDecoder();
    this.#updateVideoPressure();
    this.#emitMetricsIfDue(true);
  }

  #takeNextFrame(): ImageWorkerFrameEnvelope | null {
    const videoFrame = this.#pendingVideoFrames.shift();
    if (videoFrame) {
      return videoFrame;
    }
    const frame = this.#pendingFrame;
    this.#pendingFrame = null;
    return frame;
  }

  async #drainLatestFrame(): Promise<void> {
    if (this.#isProcessing) {
      return;
    }
    this.#isProcessing = true;
    const epoch = this.#epoch;
    this.#processingEpoch = epoch;
    try {
      let frame: ImageWorkerFrameEnvelope | null;
      while (true) {
        if (
          this.#pendingVideoFrames.length > 0 &&
          this.#decoder.decodeQueueSize >= VIDEO_DECODE_QUEUE_HIGH_WATER
        ) {
          break;
        }
        frame = this.#takeNextFrame();
        if (!frame) {
          break;
        }
        if (epoch !== this.#epoch) {
          break;
        }
        if (isVideoFrame(frame) && this.#videoNeedsResync) {
          this.#resyncVideoDecoder();
          this.#videoNeedsResync = false;
        }
        await this.#decodeAndRender(frame, epoch);
        if (this.#haltUntilReset) {
          this.#pendingFrame = null;
          this.#pendingVideoFrames = [];
          break;
        }
      }
    } finally {
      this.#isProcessing = false;
      this.#processingEpoch = null;
      this.#emitRenderHealth();
      if (
        this.#pendingFrame ||
        (this.#pendingVideoFrames.length > 0 &&
          this.#decoder.decodeQueueSize < VIDEO_DECODE_QUEUE_HIGH_WATER)
      ) {
        void this.#drainLatestFrame();
      }
    }
  }

  async #decodeAndRender(frame: ImageWorkerFrameEnvelope, epoch: number): Promise<void> {
    this.#emitStatus({ phase: 'decoding', receiveTime: frame.receiveTime });
    try {
      if (frame.kind === 'compressed') {
        const bytes = ensureOwnedBytes(frame.data);
        if (bytes.byteLength === 0) {
          throw new Error(`Compressed image payload is empty: ${frame.format}`);
        }

        // ROS compressedDepth: PNG → 16UC1/32FC1, then same colormap path as RawImage.
        if (isCompressedDepthFormat(frame.format)) {
          const decoded = await decodeCompressedDepth(bytes, frame.format);
          if (epoch !== this.#epoch) {
            return;
          }
          this.#renderRawFrame({
            receiveTime: frame.receiveTime,
            encoding: decoded.encoding,
            width: decoded.width,
            height: decoded.height,
            step: decoded.step,
            isBigEndian: decoded.isBigEndian,
            data: ensureOwnedBytes(decoded.data),
            annotation: frame.annotation,
          });
          return;
        }

        const kind = getCompressedKind(frame.format);
        const sortKey = timeToKey(frame.receiveTime);

        if (kind === 'h264' || kind === 'h265') {
          await this.#decoder.submitFrame(frame, bytes, sortKey);
          if (epoch !== this.#epoch) return;
          this.#updateVideoPressure();
          this.#emitMetricsIfDue();
          return;
        }

        const imageSource = await withTimeout(
          this.#decodeCompressed(bytes, frame.format),
          OUTPUT_TIMEOUT_MS,
          `Compressed image decode timed out: ${frame.format}`,
          closeCanvasImageSource,
        );
        if (discardStaleAsyncResult(imageSource, epoch, this.#epoch)) {
          return;
        }
        const width = 'displayWidth' in imageSource ? imageSource.displayWidth : imageSource.width;
        const height = 'displayHeight' in imageSource ? imageSource.displayHeight : imageSource.height;
        let bitmap: ImageBitmap;
        if (isImageBitmap(imageSource)) {
          bitmap = imageSource;
        } else {
          try {
            bitmap = await withTimeout(
              createImageBitmap(imageSource as ImageBitmapSource),
              OUTPUT_TIMEOUT_MS,
              `Compressed image bitmap creation timed out: ${frame.format}`,
              closeImageBitmap,
            );
          } finally {
            closeCanvasImageSource(imageSource);
          }
          if (discardStaleAsyncResult(bitmap, epoch, this.#epoch)) {
            return;
          }
        }
        this.#storeBitmap(
          bitmap,
          width,
          height,
          frame.format,
          frame.receiveTime,
          frame.annotation,
        );
        this.#drawBitmap(bitmap, width, height, frame.receiveTime, frame.annotation);
        this.#emitStatus({
          phase: 'ready',
          width,
          height,
          encoding: frame.format,
          receiveTime: frame.receiveTime,
        });
        return;
      }

      // Raw frame
      const bytes = ensureOwnedBytes(frame.data);
      this.#renderRawFrame({
        receiveTime: frame.receiveTime,
        encoding: frame.encoding,
        width: frame.width,
        height: frame.height,
        step: frame.step ?? (frame.width * bytesPerPixel(frame.encoding)),
        isBigEndian: frame.isBigEndian ?? false,
        data: bytes,
        annotation: frame.annotation,
      });
    } catch (error) {
      if (epoch !== this.#epoch) {
        return;
      }
      if (isVideoFrame(frame)) {
        this.#droppedVideoFrames += 1;
        this.#handleVideoDecoderError(
          error instanceof Error ? error : new Error(String(error)),
        );
        return;
      }
      this.#haltUntilReset = true;
      this.#emitStatus({
        phase: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  #handleVideoOutput(output: {
    videoFrame: VideoFrame;
    sourceFrame: ImageWorkerFrameEnvelope;
    decodeMs: number;
  }): void {
    const frameTimeNs = timeToKey(output.sourceFrame.receiveTime);
    this.#lastDecodedVideoTimeNs = frameTimeNs;
    this.#videoDecodeMs = updateDecodeDurationEwma(this.#videoDecodeMs, output.decodeMs);

    if (
      this.#isPlaying &&
      shouldDropDecodedVideoFrame(this.#playbackTimeNs, frameTimeNs)
    ) {
      output.videoFrame.close();
      this.#droppedVideoFrames += 1;
      this.#updateVideoPressure();
      this.#emitMetricsIfDue();
      this.#emitRenderHealth();
      return;
    }

    if (this.#pendingDecodedVideo) {
      this.#pendingDecodedVideo.videoFrame.close();
      this.#droppedVideoFrames += 1;
    }
    this.#pendingDecodedVideo = {
      videoFrame: output.videoFrame,
      sourceFrame: output.sourceFrame,
    };
    this.#emitRenderHealth();
    this.#scheduleVideoRender();
    this.#updateVideoPressure();
    this.#emitMetricsIfDue();
  }

  #scheduleVideoRender(): void {
    if (this.#videoRenderTimer != null || !this.#pendingDecodedVideo) {
      return;
    }
    const renderIntervalMs =
      this.#videoPressure.mode === 'normal'
        ? VIDEO_RENDER_INTERVAL_MS
        : VIDEO_PRESSURED_RENDER_INTERVAL_MS;
    const delayMs = Math.max(
      0,
      renderIntervalMs - (performance.now() - this.#lastVideoRenderAt),
    );
    if (delayMs <= 0) {
      void this.#renderPendingVideoOutput();
      return;
    }
    this.#videoRenderTimer = setTimeout(() => {
      this.#videoRenderTimer = null;
      void this.#renderPendingVideoOutput();
    }, delayMs);
  }

  async #renderPendingVideoOutput(): Promise<void> {
    const pending = this.#pendingDecodedVideo;
    this.#pendingDecodedVideo = null;
    if (!pending) {
      return;
    }
    const { videoFrame, sourceFrame } = pending;
    const epoch = this.#epoch;
    const now = performance.now();
    try {
      const frameTimeNs = timeToKey(sourceFrame.receiveTime);
      if (
        this.#isPlaying &&
        shouldDropDecodedVideoFrame(this.#playbackTimeNs, frameTimeNs)
      ) {
        this.#droppedVideoFrames += 1;
        return;
      }

      const width = videoFrame.displayWidth || videoFrame.codedWidth;
      const height = videoFrame.displayHeight || videoFrame.codedHeight;
      if (!this.#drawCanvasImageSource(
        videoFrame,
        width,
        height,
        sourceFrame.receiveTime,
        sourceFrame.annotation,
      )) {
        this.#droppedVideoFrames += 1;
        return;
      }
      this.#lastVideoRenderAt = now;
      this.#renderedVideoFrames += 1;
      this.#emitStatus({
        phase: 'ready',
        width,
        height,
        encoding: sourceFrame.kind === 'compressed' ? sourceFrame.format : (this.#activeVideoCodec ?? 'h264'),
        receiveTime: sourceFrame.receiveTime,
      });

      if (this.#videoPressure.mode === 'normal' && now - this.#lastVideoBitmapAt >= 500) {
        try {
          const bitmap = await createImageBitmap(videoFrame);
          if (discardStaleAsyncResult(bitmap, epoch, this.#epoch)) {
            return;
          }
          this.#storeBitmap(
            bitmap,
            width,
            height,
            sourceFrame.kind === 'compressed' ? sourceFrame.format : (this.#activeVideoCodec ?? 'h264'),
            sourceFrame.receiveTime,
            sourceFrame.annotation,
          );
          this.#lastVideoBitmapAt = now;
        } catch {
          // The frame is already visible; resize caching is optional.
        }
      }
    } finally {
      videoFrame.close();
      this.#emitMetricsIfDue();
      if (this.#pendingDecodedVideo) {
        this.#scheduleVideoRender();
      }
      this.#emitRenderHealth();
    }
  }

  #handleVideoDecoderError(error: Error): void {
    this.#resyncVideoDecoder();
    const codec = this.#activeVideoCodec;
    const recovery = codec
      ? selectLatestCompleteVideoGop(
          codec,
          this.#pendingVideoFrames,
          this.#videoRecentConfig,
          true,
        )
      : { frames: [], droppedFrames: this.#pendingVideoFrames.length, resync: false };
    if (recovery.resync) {
      this.#pendingVideoFrames = recovery.frames;
      this.#videoWaitingForRandomAccess = false;
      this.#droppedVideoFrames += recovery.droppedFrames;
      void this.#drainLatestFrame();
    } else {
      this.#droppedVideoFrames += this.#pendingVideoFrames.length;
      this.#pendingVideoFrames = [];
      this.#videoWaitingForRandomAccess = true;
      this.#videoConfigBeforeRandomAccess = [...this.#videoRecentConfig];
    }
    if (this.#renderedVideoFrames === 0 && !this.#cachedFrame) {
      this.#emitStatus({ phase: 'error', message: error.message });
    }
    this.#emitMetricsIfDue(true);
    this.#emitRenderHealth();
  }

  #resyncVideoDecoder(): void {
    this.#decoder.reset();
    this.#disposePendingVideoOutput();
    this.#videoNeedsResync = false;
    this.#videoResyncCount += 1;
    this.#lastVideoResyncAt = performance.now();
  }

  #disposePendingVideoOutput(): void {
    if (this.#videoRenderTimer != null) {
      clearTimeout(this.#videoRenderTimer);
      this.#videoRenderTimer = null;
    }
    this.#pendingDecodedVideo?.videoFrame.close();
    this.#pendingDecodedVideo = null;
  }

  #updateVideoPressure(): void {
    const previousMode = this.#videoPressure.mode;
    const mediaLagMs =
      !this.#isPlaying || this.#lastDecodedVideoTimeNs == null
        ? 0
        : decodedFrameLatenessMs(this.#playbackTimeNs, this.#lastDecodedVideoTimeNs);
    this.#videoPressure = updateVideoPressure(this.#videoPressure, {
      queueFrames: this.#pendingVideoFrames.length,
      queueSpanMs: videoQueueSpanMs(this.#pendingVideoFrames),
      decodeMs: this.#videoDecodeMs,
      decodeQueueSize: this.#decoder.decodeQueueSize,
      mediaLagMs,
    });
    if (previousMode !== this.#videoPressure.mode) {
      this.#emitMetricsIfDue(true);
    }
  }

  #resetVideoRuntimeState(): void {
    this.#videoPressure = initialVideoPressureState();
    this.#videoDecodeMs = 0;
    // After close()/configure(), WebCodecs requires a fresh random-access unit.
    // Keep recent VPS/SPS/PPS or SPS/PPS so a bare random-access frame can reconfigure.
    this.#videoWaitingForRandomAccess = true;
    this.#videoConfigBeforeRandomAccess = [...this.#videoRecentConfig];
    this.#videoNeedsResync = false;
    this.#lastVideoRenderAt = -Infinity;
    this.#lastVideoBitmapAt = -Infinity;
    this.#droppedVideoFrames = 0;
    this.#renderedVideoFrames = 0;
    this.#videoResyncCount = 0;
    this.#lastVideoResyncAt = -Infinity;
    this.#lastDecodedVideoTimeNs = null;
    this.#lastDrawnMediaTimeNs = null;
    this.#lastMetricsAt = -Infinity;
  }

  #emitMetricsIfDue(force = false): void {
    const now = performance.now();
    if (!force && now - this.#lastMetricsAt < METRICS_INTERVAL_MS) {
      return;
    }
    this.#lastMetricsAt = now;
    const mediaLagMs =
      this.#lastDecodedVideoTimeNs == null
        ? 0
        : decodedFrameLatenessMs(this.#playbackTimeNs, this.#lastDecodedVideoTimeNs);
    const metrics: ImageRenderMetrics = {
      pressureMode: this.#videoPressure.mode,
      queueFrames: this.#pendingVideoFrames.length,
      queueSpanMs: videoQueueSpanMs(this.#pendingVideoFrames),
      decodeMs: this.#videoDecodeMs,
      droppedFrames: this.#droppedVideoFrames,
      renderedFrames: this.#renderedVideoFrames,
      decodeQueueSize: this.#decoder.decodeQueueSize,
      mediaLagMs,
      resyncCount: this.#videoResyncCount,
      codec: this.#decoder.codec,
    };
    workerScope.postMessage({ type: 'metrics', metrics } satisfies ImageRenderWorkerEvent);
  }

  #emitRenderHealth(force = false): void {
    const pending =
      (this.#isProcessing && this.#processingEpoch === this.#epoch) ||
      this.#pendingFrame != null ||
      this.#pendingVideoFrames.length > 0 ||
      this.#decoder.hasPendingWork ||
      this.#pendingDecodedVideo != null ||
      this.#videoRenderTimer != null;
    if (
      !force &&
      this.#lastPostedRenderHealth?.generation === this.#healthGeneration &&
      this.#lastPostedRenderHealth.pending === pending
    ) {
      return;
    }
    this.#lastPostedRenderHealth = { generation: this.#healthGeneration, pending };
    workerScope.postMessage({
      type: 'renderHealth',
      generation: this.#healthGeneration,
      pending,
    } satisfies ImageRenderWorkerEvent);
  }

  #renderRawFrame(frame: {
    receiveTime: Time;
    encoding: string;
    width: number;
    height: number;
    step: number;
    isBigEndian: boolean;
    data: Uint8Array<ArrayBuffer>;
    annotation?: ImageAnnotationsFrame | null;
  }): void {
    const pixelBytes = frame.width * frame.height * 4;
    let rgba = this.#rawRgba;
    if (!rgba || rgba.length !== pixelBytes) {
      rgba = new Uint8ClampedArray(pixelBytes);
      this.#rawRgba = rgba;
    }
    if (!this.#rawImageData || this.#rawImageData.width !== frame.width || this.#rawImageData.height !== frame.height) {
      this.#rawImageData = new ImageData(rgba, frame.width, frame.height);
    }

    decodeRawImage(
      {
        encoding: frame.encoding,
        width: frame.width,
        height: frame.height,
        step: frame.step,
        is_bigendian: frame.isBigEndian,
        data: frame.data,
      },
      rgba,
      this.#rawDecodeOptions,
    );

    this.#disposeCachedBitmap();
    this.#cachedFrame = {
      kind: 'raw',
      width: frame.width,
      height: frame.height,
      encoding: frame.encoding,
      step: frame.step,
      isBigEndian: frame.isBigEndian,
      data: frame.data,
      receiveTime: frame.receiveTime,
      annotation: frame.annotation,
    };

    this.#drawRawImageData(frame.width, frame.height, frame.receiveTime, frame.annotation);
    this.#emitStatus({
      phase: 'ready',
      width: frame.width,
      height: frame.height,
      encoding: frame.encoding,
      receiveTime: frame.receiveTime,
    });
  }

  /** Re-decode the last raw frame with current rawDecodeOptions and redraw. */
  #redrawRawCached(): void {
    const cached = this.#cachedFrame;
    if (!cached || cached.kind !== 'raw') {
      return;
    }
    const pixelBytes = cached.width * cached.height * 4;
    let rgba = this.#rawRgba;
    if (!rgba || rgba.length !== pixelBytes) {
      rgba = new Uint8ClampedArray(pixelBytes);
      this.#rawRgba = rgba;
    }
    if (!this.#rawImageData || this.#rawImageData.width !== cached.width || this.#rawImageData.height !== cached.height) {
      this.#rawImageData = new ImageData(rgba, cached.width, cached.height);
    }
    try {
      decodeRawImage(
        {
          encoding: cached.encoding,
          width: cached.width,
          height: cached.height,
          step: cached.step,
          is_bigendian: cached.isBigEndian,
          data: cached.data,
        },
        rgba,
        this.#rawDecodeOptions,
      );
      this.#drawRawImageData(cached.width, cached.height, cached.receiveTime, cached.annotation);
      this.#emitStatus({
        phase: 'ready',
        width: cached.width,
        height: cached.height,
        encoding: cached.encoding,
        receiveTime: cached.receiveTime,
      });
    } catch {
      // Ignore re-decode errors; the last successful frame is still visible.
    }
  }


  /** Redraw the cached frame with current renderOptions / viewport. */
  #redrawCachedFrame(): void {
    const cached = this.#cachedFrame;
    if (!cached) {
      this.#clearCanvas();
      return;
    }
    if (cached.kind === 'raw') {
      this.#drawRawImageData(cached.width, cached.height, cached.receiveTime, cached.annotation);
      this.#emitStatus({
        phase: 'ready',
        width: cached.width,
        height: cached.height,
        encoding: cached.encoding,
        receiveTime: cached.receiveTime,
      });
    } else {
      this.#drawBitmap(cached.bitmap, cached.width, cached.height, cached.receiveTime, cached.annotation);
      this.#emitStatus({
        phase: 'ready',
        width: cached.width,
        height: cached.height,
        encoding: cached.encoding,
        receiveTime: cached.receiveTime,
      });
    }
  }

  #storeBitmap(
    bitmap: ImageBitmap,
    width: number,
    height: number,
    encoding: string,
    receiveTime: Time,
    annotation?: ImageAnnotationsFrame | null,
  ): void {
    this.#disposeCachedBitmap();
    this.#cachedFrame = {
      kind: 'bitmap',
      width,
      height,
      encoding,
      bitmap,
      receiveTime,
      annotation,
    };
  }

  #disposeCachedBitmap(): void {
    if (this.#cachedFrame?.kind === 'bitmap') {
      this.#cachedFrame.bitmap.close();
    }
  }

  async #decodeCompressed(
    data: Uint8Array<ArrayBuffer>,
    format: string,
  ): Promise<ImageBitmap | VideoFrame> {
    const mime = normalizeCompressedMime(format, data);
    if (typeof ImageDecoder !== 'undefined') {
      let supported = this.#imageDecoderMimeSupported.get(mime);
      if (supported === undefined) {
        supported = await ImageDecoder.isTypeSupported(mime);
        this.#imageDecoderMimeSupported.set(mime, supported);
      }
      if (supported) {
        const decoder = new ImageDecoder({ type: mime, data });
        try {
          const { image } = await decoder.decode({ frameIndex: 0 });
          return image;
        } finally {
          decoder.close();
        }
      }
    }
    return createImageBitmap(new Blob([data], { type: mime }));
  }

  #disposeAuxiliaryDecodeState(): void {
    this.#imageDecoderMimeSupported.clear();
    this.#rawRgba = null;
    this.#rawImageData = null;
  }

  #emitStatus(status: ImageSurfaceStatus): void {
    if (status.phase === 'decoding') {
      if (this.#lastPostedUiPhase !== 'idle' && this.#lastPostedUiPhase !== 'error') {
        return;
      }
    }
    this.#lastPostedUiPhase = status.phase;
    const event: ImageRenderWorkerEvent = { type: 'status', status };
    workerScope.postMessage(event);
  }

  #drawRawImageData(
    width: number,
    height: number,
    frameTime: Time,
    annotation?: ImageAnnotationsFrame | null,
  ): void {
    ensureBufferCanvas(this.#bufferCanvas, width, height);
    this.#bufferCtx!.putImageData(this.#rawImageData!, 0, 0);
    this.#drawCanvasImageSource(this.#bufferCanvas, width, height, frameTime, annotation);
  }

  #drawBitmap(
    bitmap: ImageBitmap,
    width: number,
    height: number,
    frameTime: Time,
    annotation?: ImageAnnotationsFrame | null,
  ): void {
    this.#drawCanvasImageSource(bitmap, width, height, frameTime, annotation);
  }

  #drawCanvasImageSource(
    source: CanvasImageSource,
    sourceWidth: number,
    sourceHeight: number,
    frameTime: Time,
    annotation?: ImageAnnotationsFrame | null,
  ): boolean {
    const imageTimestampNs = timeToKey(frameTime);
    if (isRetrogradeMediaFrame(this.#isPlaying, this.#lastDrawnMediaTimeNs, imageTimestampNs)) {
      return false;
    }
    this.#applyViewport();
    const ctx = this.#ctx;
    const canvas = this.#canvas;
    if (!ctx || !canvas) {
      return false;
    }
    const viewportWidth = this.#viewport.cssWidth || canvas.width / Math.max(1, this.#viewport.devicePixelRatio) || 1;
    const viewportHeight = this.#viewport.cssHeight || canvas.height / Math.max(1, this.#viewport.devicePixelRatio) || 1;
    const rotDeg = normalizeRotationDeg(this.#renderOptions.rotationDeg);
    const { w: logicalWidth, h: logicalHeight } = rotatedAabbSize(sourceWidth, sourceHeight, rotDeg);
    const scale =
      this.#renderOptions.fitMode === 'contain'
        ? Math.min(viewportWidth / logicalWidth, viewportHeight / logicalHeight)
        : Math.max(viewportWidth / logicalWidth, viewportHeight / logicalHeight);
    const drawWidth = Math.max(1, sourceWidth * scale);
    const drawHeight = Math.max(1, sourceHeight * scale);

    ctx.save();
    const renderDpr = this.#renderDevicePixelRatio();
    ctx.setTransform(renderDpr, 0, 0, renderDpr, 0, 0);
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    ctx.fillStyle = this.#renderOptions.backgroundColor;
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);
    ctx.imageSmoothingEnabled = this.#renderOptions.smoothing;
    ctx.imageSmoothingQuality =
      this.#renderOptions.smoothing && this.#videoPressure.mode === 'normal' ? 'high' : 'low';
    ctx.translate(viewportWidth / 2, viewportHeight / 2);
    ctx.rotate((rotDeg * Math.PI) / 180);
    ctx.scale(this.#renderOptions.flipHorizontal ? -1 : 1, this.#renderOptions.flipVertical ? -1 : 1);
    ctx.drawImage(source, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    if (annotation) {
      ctx.translate(-drawWidth / 2, -drawHeight / 2);
      ctx.scale(scale, scale);
      drawImageAnnotations(ctx, annotation);
    }
    ctx.restore();
    this.#lastDrawnMediaTimeNs = imageTimestampNs;
    workerScope.postMessage({
      type: 'rendered',
      generation: this.#healthGeneration,
      timestampNs: imageTimestampNs,
      width: sourceWidth,
      height: sourceHeight,
      annotationState: annotation === undefined ? 'disabled' : annotation === null ? 'gap' : 'matched',
    } satisfies ImageRenderWorkerEvent);
    return true;
  }

  #applyViewport(): void {
    if (!this.#canvas) {
      return;
    }
    const renderDpr = this.#renderDevicePixelRatio();
    const pixelWidth = Math.max(1, Math.round(Math.max(0, this.#viewport.cssWidth) * renderDpr));
    const pixelHeight = Math.max(1, Math.round(Math.max(0, this.#viewport.cssHeight) * renderDpr));
    if (this.#canvas.width !== pixelWidth) {
      this.#canvas.width = pixelWidth;
    }
    if (this.#canvas.height !== pixelHeight) {
      this.#canvas.height = pixelHeight;
    }
  }

  #renderDevicePixelRatio(): number {
    const dpr = Math.max(1, this.#viewport.devicePixelRatio);
    return this.#videoPressure.mode === 'normal' ? dpr : Math.min(dpr, 1);
  }

  #clearCanvas(): void {
    if (!this.#ctx || !this.#canvas) {
      return;
    }
    this.#ctx.save();
    this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fillStyle = this.#renderOptions.backgroundColor;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.restore();
  }
}

// ---------- Helpers ----------

function bytesPerPixel(encoding: string): number {
  const lower = encoding.trim().toLowerCase();
  switch (lower) {
    case 'rgb8':
    case 'bgr8':
    case '8uc3':
      return 3;
    case 'rgba8':
    case 'bgra8':
    case '32fc1':
      return 4;
    case 'mono16':
    case '16uc1':
    case 'uyvy':
    case 'yuyv':
    case 'yuv422':
    case 'yuv422_yuy2':
      return 2;
    default:
      return 1;
  }
}

function ensureBufferCanvas(canvas: OffscreenCanvas, width: number, height: number): void {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
}

function cloneBytes(data: Uint8Array): Uint8Array<ArrayBuffer> {
  const copy = new Uint8Array(new ArrayBuffer(data.byteLength));
  copy.set(data);
  return copy;
}

function ensureOwnedBytes(data: Uint8Array): Uint8Array<ArrayBuffer> {
  if (
    data.buffer instanceof ArrayBuffer &&
    data.byteOffset === 0 &&
    data.byteLength === data.buffer.byteLength
  ) {
    return data as Uint8Array<ArrayBuffer>;
  }
  return cloneBytes(data);
}

function videoCodecForFrame(frame: ImageWorkerFrameEnvelope): VideoCodec | null {
  return frame.kind === 'compressed' ? videoCodecFromFormat(frame.format) : null;
}

function isVideoFrame(frame: ImageWorkerFrameEnvelope): boolean {
  return videoCodecForFrame(frame) !== null;
}

function videoQueueSpanMs(frames: ImageWorkerFrameEnvelope[]): number {
  if (frames.length < 2) {
    return 0;
  }
  const first = frames.find((frame) => {
    const codec = videoCodecForFrame(frame);
    return !codec || !isVideoConfigOnly(codec, frame.data);
  });
  const last = frames.findLast((frame) => {
    const codec = videoCodecForFrame(frame);
    return !codec || !isVideoConfigOnly(codec, frame.data);
  });
  if (!first || !last) {
    return 0;
  }
  const spanNs = timeToKey(last.receiveTime) - timeToKey(first.receiveTime);
  return Math.max(0, Number(spanNs) / 1_000_000);
}

function timeToKey(time: Time): bigint {
  return BigInt(time.sec) * 1_000_000_000n + BigInt(time.nsec);
}

function closeCanvasImageSource(source: ImageBitmap | VideoFrame): void {
  source.close();
}

function closeImageBitmap(bitmap: ImageBitmap): void {
  bitmap.close();
}

function isImageBitmap(source: ImageBitmap | VideoFrame): source is ImageBitmap {
  return typeof ImageBitmap !== 'undefined' && source instanceof ImageBitmap;
}

// ---------- Bootstrap ----------

const runtime = new ImageRenderWorkerRuntime();
const workerScope = self as unknown as DedicatedWorkerGlobalScope;

workerScope.onmessage = (event: MessageEvent<ImageRenderWorkerRequest>) => {
  runtime.handle(event.data);
};
