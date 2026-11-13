import { parseAv1Chunk } from './av1';
import { withTimeout } from './asyncTimeout';
import type { ImageWorkerFrameEnvelope } from './imageWorkerProtocol';
import {
  type VideoCodec,
  containsVideoFrame,
  monotonicVideoTimestampUs,
  streamCodecIdentity,
  videoChunkType,
  videoCodecCandidates,
  videoCodecFromFormat,
} from './videoCodec';

const OUTPUT_TIMEOUT_MS = 5000;
const WECODECS_CONFIG_TIMEOUT_MS = 3000;

// ---------- Compressed video decoder ----------

export class WorkerVideoDecoder {
  #decoder: VideoDecoder | null = null;
  #lastTimestampUs = -1;
  #configuredCodec: string | null = null;
  #streamCodec: string | null = null;
  #codecKind: VideoCodec | null = null;
  // Some browsers advertise AV1 hardware support but fail the first real decode.
  // Keep the fallback across seek/reset: replay is owned by the worker's GOP recovery.
  #preferAv1Software = false;
  #acceleration: VideoDecoderConfig['hardwareAcceleration'];
  #generation = 0;
  #submitted = new Map<number, {
    frame: ImageWorkerFrameEnvelope;
    startedAt: number;
    queueDepth: number;
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
    this.#preferAv1Software = false;
    this.#lastTimestampUs = -1;
  }

  public reset(): void {
    this.#generation += 1;
    if (this.#decoder && this.#decoder.state !== 'closed') this.#decoder.close();
    this.#decoder = null;
    this.#configuredCodec = null;
    this.#streamCodec = null;
    this.#codecKind = null;
    this.#acceleration = undefined;
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

  public sweepPending(): void {
    this.#sweepSubmitted();
  }

  public async submitFrame(
    frame: ImageWorkerFrameEnvelope,
    data: Uint8Array<ArrayBuffer>,
    sortTimeKey: bigint,
  ): Promise<void> {
    if (typeof VideoDecoder === 'undefined') throw new Error('WebCodecs VideoDecoder is not supported');
    const codec = frame.kind === 'compressed' ? videoCodecFromFormat(frame.format) : null;
    if (!codec) throw new Error('Compressed frame does not declare a supported video codec');
    if (codec === 'av1') {
      const chunk = parseAv1Chunk(data);
      if (!chunk) throw new Error('Invalid AV1 low-overhead OBU chunk');
      // Configuration-only OBUs do not produce an image. The next key chunk
      // contains its own configuration and is the only supported restart point.
      if (!chunk.hasFrame) return;
    }

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
    if (containsVideoFrame(codec, data)) {
      this.#submitted.set(timestamp, {
        frame,
        startedAt: performance.now(),
        queueDepth: decoder.decodeQueueSize,
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
      this.#observeDecodeFailure();
      throw error;
    }
    this.#sweepSubmitted();
  }

  #sweepSubmitted(now = performance.now()): void {
    for (const [timestamp, submitted] of this.#submitted) {
      if (now - submitted.startedAt <= OUTPUT_TIMEOUT_MS) {
        continue;
      }
      this.#submitted.delete(timestamp);
      this.#observeDecodeFailure();
      this.#callbacks.error(new Error('Video decode timed out'));
      return;
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
      const acceleration: NonNullable<VideoDecoderConfig['hardwareAcceleration']>[] =
        codec === 'av1' && this.#preferAv1Software
          ? ['prefer-software']
          : codec === 'av1'
            ? ['prefer-hardware', 'no-preference', 'prefer-software']
            : ['prefer-hardware', 'no-preference'];
      const candidates: VideoDecoderConfig[] = acceleration.map((hardwareAcceleration) => ({
        codec: codecString, hardwareAcceleration, optimizeForLatency: true,
      }));
      for (const candidate of candidates) {
        try {
          const support = await withTimeout(
            VideoDecoder.isConfigSupported(candidate),
            WECODECS_CONFIG_TIMEOUT_MS,
            'VideoDecoder.isConfigSupported timed out',
          );
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
      const label = { h264: 'H.264', h265: 'H.265', av1: 'AV1' }[codec];
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
          // Elapsed time also covers the wait behind frames already queued in
          // the decoder, so amortise it to approximate per-frame decode cost.
          // Without this the sample tracks pipeline latency and permanently
          // reports overload on healthy multi-stream playback.
          decodeMs: (performance.now() - submitted.startedAt) / (submitted.queueDepth + 1),
        });
      },
      error: (error) => {
        if (generation !== this.#generation) return;
        this.#observeDecodeFailure();
        this.#callbacks.error(new Error(String(error)));
      },
    });
    this.#decoder.addEventListener('dequeue', this.#callbacks.dequeue);
    try {
      this.#decoder.configure(supportedConfig);
      this.#configuredCodec = supportedConfig.codec;
      this.#streamCodec = parsedCodec;
      this.#codecKind = codec;
      this.#acceleration = supportedConfig.hardwareAcceleration;
    } catch (error) {
      if (codec === 'av1' && supportedConfig.hardwareAcceleration !== 'prefer-software') {
        this.#preferAv1Software = true;
      }
      this.#decoder.close();
      this.#decoder = null;
      this.#configuredCodec = null;
      this.#codecKind = null;
      throw error;
    }
    return true;
  }

  #observeDecodeFailure(): void {
    if (this.#codecKind === 'av1' && this.#acceleration !== 'prefer-software') {
      this.#preferAv1Software = true;
    }
  }
}
