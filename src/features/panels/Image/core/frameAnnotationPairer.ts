import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import { toNano } from '@/shared/utils/time';
import { parseImageAnnotations, type ImageAnnotationsFrame } from './imageAnnotations';

export interface ImageFrameAnnotationPair {
  frame: RosMessageEvent;
  /** `null` is a confirmed gap; an empty `points` array is an explicit no-hand observation. */
  annotation: ImageAnnotationsFrame | null;
}

/** Parse an annotation payload and bind it to the authoritative MCAP log-time key. */
export function parseExactImageAnnotations(event: RosMessageEvent): ImageAnnotationsFrame | null {
  const timestampNs = toNano(event.receiveTime);
  const annotation = parseImageAnnotations(event.message, timestampNs);
  return annotation ? { ...annotation, timestampNs } : null;
}

const DEFAULT_MAX_PENDING_FRAMES = 120;
const DEFAULT_MAX_PENDING_BYTES = 64 * 1024 * 1024;
const DEFAULT_MAX_PENDING_ANNOTATIONS = 512;

/**
 * Joins one camera's encoded frames with its ImageAnnotations topic by exact MCAP log time.
 * A video frame cannot leave this coordinator until an exact annotation arrives or a later
 * annotation proves that its key is absent. Reset it for every seek, loop, or source change.
 */
export class FrameAnnotationPairer {
  #annotations = new Map<bigint, ImageAnnotationsFrame | null>();
  #pendingFrames = new Map<bigint, RosMessageEvent[]>();
  #annotationFrontier: bigint | null = null;
  #frameFrontier: bigint | null = null;
  #pendingFrameCount = 0;
  #pendingFrameBytes = 0;
  #droppedFrameCount = 0;
  #droppedAnnotationFrontier: bigint | null = null;
  readonly #maxPendingFrames: number;
  readonly #maxPendingBytes: number;
  readonly #maxPendingAnnotations: number;

  public constructor(
    maxPendingFrames = DEFAULT_MAX_PENDING_FRAMES,
    maxPendingBytes = DEFAULT_MAX_PENDING_BYTES,
    maxPendingAnnotations = DEFAULT_MAX_PENDING_ANNOTATIONS,
  ) {
    if (!Number.isInteger(maxPendingFrames) || maxPendingFrames < 1) {
      throw new Error('maxPendingFrames must be a positive integer');
    }
    if (!Number.isInteger(maxPendingBytes) || maxPendingBytes < 1) {
      throw new Error('maxPendingBytes must be a positive integer');
    }
    if (!Number.isInteger(maxPendingAnnotations) || maxPendingAnnotations < 1) {
      throw new Error('maxPendingAnnotations must be a positive integer');
    }
    this.#maxPendingFrames = maxPendingFrames;
    this.#maxPendingBytes = maxPendingBytes;
    this.#maxPendingAnnotations = maxPendingAnnotations;
  }

  public pushFrame(frame: RosMessageEvent): ImageFrameAnnotationPair[] {
    const key = toNano(frame.receiveTime);
    if (this.#frameFrontier === null || key > this.#frameFrontier) {
      this.#frameFrontier = key;
      for (const annotationKey of this.#annotations.keys()) {
        if (annotationKey < key) this.#annotations.delete(annotationKey);
      }
    }
    if (
      this.#droppedAnnotationFrontier !== null &&
      key <= this.#droppedAnnotationFrontier
    ) {
      this.#droppedFrameCount += 1;
      return [];
    }
    if (this.#annotations.has(key)) {
      const annotation = this.#annotations.get(key) ?? null;
      return [{ frame, annotation }];
    }
    if (this.#annotationFrontier !== null && key <= this.#annotationFrontier) {
      return [{ frame, annotation: null }];
    }
    const pending = this.#pendingFrames.get(key) ?? [];
    const bufferedFrame = retainFramePayload(frame);
    pending.push(bufferedFrame);
    this.#pendingFrames.set(key, pending);
    this.#pendingFrameCount += 1;
    this.#pendingFrameBytes += framePayloadByteLength(bufferedFrame);
    this.#trimPendingFrames();
    return [];
  }

  public pushAnnotation(event: RosMessageEvent): ImageFrameAnnotationPair[] {
    const key = toNano(event.receiveTime);
    const annotation = parseExactImageAnnotations(event);
    this.#annotations.set(key, annotation);
    if (this.#annotationFrontier === null || key > this.#annotationFrontier) {
      this.#annotationFrontier = key;
    }
    this.#trimAnnotations();
    const matches = this.#takePending(key, annotation);
    return [...matches, ...this.#flushConfirmedGaps()].sort(compareFrameTime);
  }

  public get pendingFrameCount(): number {
    return this.#pendingFrameCount;
  }

  public get pendingFrameBytes(): number {
    return this.#pendingFrameBytes;
  }

  public get droppedFrameCount(): number {
    return this.#droppedFrameCount;
  }


  public pendingRange(): { startNs: bigint; endNs: bigint } | null {
    let startNs: bigint | null = null;
    let endNs: bigint | null = null;
    for (const key of this.#pendingFrames.keys()) {
      if (startNs === null || key < startNs) startNs = key;
      if (endNs === null || key > endNs) endNs = key;
    }
    return startNs === null || endNs === null ? null : { startNs, endNs };
  }

  /** A completed annotation range read proves that unmatched keys through `frameKeyNs` are gaps. */
  public confirmThrough(frameKeyNs: bigint): ImageFrameAnnotationPair[] {
    if (this.#annotationFrontier === null || frameKeyNs > this.#annotationFrontier) {
      this.#annotationFrontier = frameKeyNs;
    }
    return this.#flushConfirmedGaps();
  }

  #takePending(key: bigint, annotation: ImageAnnotationsFrame | null): ImageFrameAnnotationPair[] {
    const frames = this.#pendingFrames.get(key);
    if (!frames) return [];
    this.#pendingFrames.delete(key);
    this.#pendingFrameCount -= frames.length;
    this.#pendingFrameBytes -= frames.reduce(
      (total, pendingFrame) => total + framePayloadByteLength(pendingFrame),
      0,
    );
    return frames.map((frame) => ({ frame, annotation }));
  }

  public reset(): void {
    this.#annotations.clear();
    this.#pendingFrames.clear();
    this.#annotationFrontier = null;
    this.#frameFrontier = null;
    this.#pendingFrameCount = 0;
    this.#pendingFrameBytes = 0;
    this.#droppedFrameCount = 0;
    this.#droppedAnnotationFrontier = null;
  }

  #flushConfirmedGaps(): ImageFrameAnnotationPair[] {
    const frontier = this.#annotationFrontier;
    if (frontier === null) return [];
    const pairs: ImageFrameAnnotationPair[] = [];
    for (const [key, frames] of this.#pendingFrames) {
      if (key > frontier) continue;
      this.#pendingFrames.delete(key);
      this.#pendingFrameCount -= frames.length;
      this.#pendingFrameBytes -= frames.reduce(
        (total, pendingFrame) => total + framePayloadByteLength(pendingFrame),
        0,
      );
      for (const frame of frames) pairs.push({ frame, annotation: null });
    }
    return pairs.sort(compareFrameTime);
  }

  #trimPendingFrames(): void {
    while (
      this.#pendingFrameCount > this.#maxPendingFrames ||
      this.#pendingFrameBytes > this.#maxPendingBytes
    ) {
      const oldest = this.#pendingFrames.entries().next().value;
      if (!oldest) return;
      const [key, frames] = oldest;
      const oldestFrame = frames.shift();
      if (!oldestFrame) {
        this.#pendingFrames.delete(key);
        continue;
      }
      this.#pendingFrameCount -= 1;
      this.#pendingFrameBytes -= framePayloadByteLength(oldestFrame);
      this.#droppedFrameCount += 1;
      if (frames.length === 0) this.#pendingFrames.delete(key);
    }
  }
  #trimAnnotations(): void {
    while (this.#annotations.size > this.#maxPendingAnnotations) {
      const oldestKey = this.#annotations.keys().next().value;
      if (oldestKey === undefined) return;
      this.#annotations.delete(oldestKey);
      const pendingFrames = this.#pendingFrames.get(oldestKey);
      if (pendingFrames) {
        this.#pendingFrames.delete(oldestKey);
        this.#pendingFrameCount -= pendingFrames.length;
        this.#pendingFrameBytes -= pendingFrames.reduce(
          (total, pendingFrame) => total + framePayloadByteLength(pendingFrame),
          0,
        );
        this.#droppedFrameCount += pendingFrames.length;
      }
      if (
        this.#droppedAnnotationFrontier === null ||
        oldestKey > this.#droppedAnnotationFrontier
      ) {
        this.#droppedAnnotationFrontier = oldestKey;
      }
    }
  }
}

function retainFramePayload(event: RosMessageEvent): RosMessageEvent {
  const message = event.message;
  if (typeof message !== 'object' || message === null || !('data' in message)) return event;
  const data = message.data;
  if (!(data instanceof Uint8Array)) return event;
  if (
    data.buffer instanceof ArrayBuffer &&
    data.byteOffset === 0 &&
    data.byteLength === data.buffer.byteLength
  ) {
    return event;
  }
  const ownedData = new Uint8Array(data.byteLength);
  ownedData.set(data);
  return { ...event, message: { ...message, data: ownedData } };
}

function framePayloadByteLength(event: RosMessageEvent): number {
  const message = event.message;
  if (typeof message !== 'object' || message === null || !('data' in message)) return 0;
  const data = message.data;
  return ArrayBuffer.isView(data) || data instanceof ArrayBuffer ? data.byteLength : 0;
}

function compareFrameTime(left: ImageFrameAnnotationPair, right: ImageFrameAnnotationPair): number {
  const difference = toNano(left.frame.receiveTime) - toNano(right.frame.receiveTime);
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}
