import { describe, expect, it } from 'vitest';
import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import { FrameAnnotationPairer, parseExactImageAnnotations } from './frameAnnotationPairer';

function event(topic: string, timestampNs: number, message: unknown = {}): RosMessageEvent {
  return {
    topic,
    schemaName: '',
    receiveTime: { sec: 0, nsec: timestampNs },
    publishTime: { sec: 0, nsec: timestampNs },
    message,
  };
}

function annotation(camera: number, frameKeyNs: number, payloadTimestampNs = frameKeyNs) {
  return event(`/annotations/${camera}`, frameKeyNs, {
    timestamp: { sec: 0, nsec: payloadTimestampNs },
    points: [],
  });
}

describe('exact image annotation pairing', () => {
  it('uses MCAP log time instead of the annotation payload timestamp', () => {
    expect(parseExactImageAnnotations(annotation(0, 100, 95))?.timestampNs).toBe(100n);
  });

  it('treats timestamp-free empty annotations as an explicit no-hand match', () => {
    const empty = event('/annotations/0', 100, { points: [] });

    expect(parseExactImageAnnotations(empty)).toEqual({ timestampNs: 100n, points: [] });
  });

  it('buffers a video frame until its exact annotation arrives', () => {
    const pairer = new FrameAnnotationPairer();
    const frame = event('/camera/0', 100);

    expect(pairer.pushFrame(frame)).toEqual([]);
    expect(pairer.pushAnnotation(annotation(0, 100, 95))).toEqual([
      {
        frame,
        annotation: { timestampNs: 100n, points: [] },
      },
    ]);
  });

  it('keeps annotations that arrive ahead of video', () => {
    const pairer = new FrameAnnotationPairer();
    pairer.pushAnnotation(annotation(0, 100));
    pairer.pushAnnotation(annotation(0, 200));

    expect(pairer.pushFrame(event('/camera/0', 100))).toMatchObject([
      { annotation: { timestampNs: 100n } },
    ]);
  });

  it('reuses one exact annotation for same-key codec packets', () => {
    const pairer = new FrameAnnotationPairer();
    pairer.pushAnnotation(annotation(0, 100));

    expect(pairer.pushFrame(event('/camera/0', 100))).toMatchObject([
      { annotation: { timestampNs: 100n } },
    ]);
    expect(pairer.pushFrame(event('/camera/0', 100))).toMatchObject([
      { annotation: { timestampNs: 100n } },
    ]);
  });

  it('distinguishes an explicit empty annotation from a confirmed data gap', () => {
    const pairer = new FrameAnnotationPairer();
    const exactFrame = event('/camera/0', 100);
    const missingFrame = event('/camera/0', 150);

    expect(pairer.pushFrame(exactFrame)).toEqual([]);
    expect(pairer.pushFrame(missingFrame)).toEqual([]);
    expect(pairer.pushAnnotation(annotation(0, 100))).toMatchObject([
      { frame: exactFrame, annotation: { points: [] } },
    ]);
    expect(pairer.pushAnnotation(annotation(0, 200))).toEqual([
      { frame: missingFrame, annotation: null },
    ]);
  });

  it('bounds encoded frames while annotation transport is stalled', () => {
    const pairer = new FrameAnnotationPairer(2);
    const frames = [100, 200, 300].map((key) => event('/camera/0', key));
    for (const frame of frames) pairer.pushFrame(frame);

    expect(pairer.pendingFrameCount).toBe(2);
    expect(pairer.droppedFrameCount).toBe(1);
    expect(pairer.confirmThrough(300n).map((pair) => pair.frame)).toEqual(frames.slice(1));
  });

  it('bounds buffered encoded payload bytes', () => {
    const pairer = new FrameAnnotationPairer(10, 5);
    const frames = [100, 200, 300].map((key) =>
      event('/camera/0', key, { data: new Uint8Array(3) }),
    );
    for (const frame of frames) pairer.pushFrame(frame);

    expect(pairer.pendingFrameCount).toBe(1);
    expect(pairer.pendingFrameBytes).toBe(3);
    expect(pairer.droppedFrameCount).toBe(2);
    expect(pairer.confirmThrough(300n).map((pair) => pair.frame)).toEqual(frames.slice(2));
  });

  it('copies borrowed frame bytes before buffering', () => {
    const source = new Uint8Array([9, 1, 2, 3, 9]);
    const frame = event('/camera/0', 100, { data: source.subarray(1, 4) });
    const pairer = new FrameAnnotationPairer();
    pairer.pushFrame(frame);
    source.fill(0);

    const buffered = pairer.confirmThrough(100n)[0]?.frame.message as { data: Uint8Array };
    expect(Array.from(buffered.data)).toEqual([1, 2, 3]);
  });

  it('bounds annotations while the video stream is stalled without inventing a gap', () => {
    const pairer = new FrameAnnotationPairer(10, 1024, 2);
    pairer.pushAnnotation(annotation(0, 100));
    pairer.pushAnnotation(annotation(0, 200));
    pairer.pushAnnotation(annotation(0, 300));

    expect(pairer.pushFrame(event('/camera/0', 100))).toEqual([]);
    expect(pairer.droppedFrameCount).toBe(1);
    expect(pairer.pushFrame(event('/camera/0', 200))).toMatchObject([
      { annotation: { timestampNs: 200n } },
    ]);
  });

  it('drops stale pairing state on reset', () => {
    const pairer = new FrameAnnotationPairer();
    pairer.pushAnnotation(annotation(0, 100));
    pairer.reset();

    expect(pairer.pushFrame(event('/camera/0', 100))).toEqual([]);
  });

  it('confirms a missing range and clears frontiers on reset', () => {
    const pairer = new FrameAnnotationPairer();
    const missing = event('/camera/0', 150);
    pairer.pushFrame(missing);

    expect(pairer.pendingRange()).toEqual({ startNs: 150n, endNs: 150n });
    expect(pairer.confirmThrough(150n)).toEqual([{ frame: missing, annotation: null }]);
    pairer.reset();
    expect(pairer.pushFrame(event('/camera/0', 200))).toEqual([]);
  });


  it.each([1, 3, 5])('keeps exact frame identity with %i camera panels', (cameraCount) => {
    const pairers = Array.from({ length: cameraCount }, () => new FrameAnnotationPairer());
    const frames = Array.from({ length: cameraCount }, (_, camera) =>
      [100, 200, 300].map((key) => event(`/camera/${camera}`, key)),
    );

    for (let camera = 0; camera < cameraCount; camera += 1) {
      for (const frame of frames[camera]) expect(pairers[camera].pushFrame(frame)).toEqual([]);
    }

    const emitted = Array.from({ length: cameraCount }, () => [] as bigint[]);
    for (const key of [100, 200, 300]) {
      for (let camera = 0; camera < cameraCount; camera += 1) {
        const pairs = pairers[camera].pushAnnotation(annotation(camera, key, key - camera - 1));
        emitted[camera].push(...pairs.map((pair) => pair.annotation?.timestampNs ?? -1n));
      }
    }

    for (const cameraFrames of emitted) expect(cameraFrames).toEqual([100n, 200n, 300n]);
  });
});
