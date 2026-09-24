import { describe, expect, it } from 'vitest';
import type { MessageEvent } from '@/core/types/ros';
import { capVideoLiveEvents, snapshotVideoLiveEvent } from './videoLiveBuffer';
import { VIDEO_MAX_PENDING_FRAMES } from './videoBackpressure';

function makeEvent(ms: number, data: Uint8Array, codec = 'h264'): MessageEvent {
  return {
    topic: '/camera/h264',
    schemaName: 'foxglove.CompressedVideo',
    receiveTime: { sec: Math.floor(ms / 1000), nsec: (ms % 1000) * 1_000_000 },
    message: {
      format: codec,
      data,
    },
  };
}

describe('videoLiveBuffer', () => {
  it.each(['h264', 'h265'])('snapshots %s payload views so later mutation is not visible', (codec) => {
    const backing = new Uint8Array([1, 2, 3, 4]);
    const view = backing.subarray(0);
    const snapshot = snapshotVideoLiveEvent(makeEvent(0, view, codec));
    backing.set([9, 9, 9, 9]);
    expect((snapshot.message as { data: Uint8Array }).data).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it('caps an unbounded live buffer to the pending-frame limit', () => {
    const events = Array.from({ length: VIDEO_MAX_PENDING_FRAMES + 25 }, (_, index) =>
      makeEvent(index * 10, new Uint8Array([index])),
    );
    const capped = capVideoLiveEvents(events);
    expect(capped.length).toBe(VIDEO_MAX_PENDING_FRAMES);
    expect(capped[0]?.receiveTime).toEqual(events[25]?.receiveTime);
  });
});
