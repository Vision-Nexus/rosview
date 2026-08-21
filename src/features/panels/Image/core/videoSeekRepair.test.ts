import { describe, expect, it } from 'vitest';
import type { Player } from '@/core/types/player';
import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import {
  executeVideoBootstrap,
  selectVideoBootstrapFrames,
  selectVideoSeekRepairFrames,
} from './videoSeekRepair';

const h264Key = new Uint8Array([
  0, 0, 1, 0x67, 0x42, 0, 0x1e,
  0, 0, 1, 0x68, 1,
  0, 0, 1, 0x65, 1,
]);
const h264Delta = new Uint8Array([0, 0, 1, 0x41, 1]);
const h265Key = new Uint8Array([
  0, 0, 1, 32 << 1, 1, 1,
  0, 0, 1, 33 << 1, 1, 1,
  0, 0, 1, 34 << 1, 1, 1,
  0, 0, 1, 19 << 1, 1, 0x80,
]);
const h265Delta = new Uint8Array([0, 0, 1, 1 << 1, 1, 0x80]);
const h265Vps = new Uint8Array([0, 0, 1, 32 << 1, 1, 1]);
const h265Sps = new Uint8Array([0, 0, 1, 33 << 1, 1, 1]);
const h265Pps = new Uint8Array([0, 0, 1, 34 << 1, 1, 1]);
const h265Idr = new Uint8Array([0, 0, 1, 19 << 1, 1, 0x80]);

function event(sec: number, format: string, data: Uint8Array, nsec = 0): RosMessageEvent {
  const time = { sec, nsec };
  return {
    topic: '/camera/video',
    receiveTime: time,
    publishTime: time,
    message: { timestamp: time, frame_id: 'camera', format, data },
    schemaName: 'foxglove_msgs/msg/CompressedVideo',
  };
}

describe.each([
  { codec: 'h264' as const, key: h264Key, delta: h264Delta },
  { codec: 'h265' as const, key: h265Key, delta: h265Delta },
])('$codec seek repair', ({ codec, key, delta }) => {
  const messages = [event(1, codec, key), event(2, codec, delta), event(3, codec, delta)];

  it('selects a complete random-access prefix through the target', () => {
    expect(selectVideoSeekRepairFrames(messages, { sec: 3, nsec: 0 }, codec)).toEqual(messages);
  });

  it('falls forward to the first random-access frame before playback starts', () => {
    expect(selectVideoBootstrapFrames(messages, { sec: 0, nsec: 0 }, codec)).toEqual([
      messages[0],
    ]);
  });

  it('posts one codec-bound atomic bootstrap', async () => {
    const posts: unknown[] = [];
    const worker = { postMessage: (message: unknown) => posts.push(message) } as Worker;
    const player = {
      getMessagesInTimeRange: async () => messages,
    } as unknown as Player;

    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        targetTime: { sec: 3, nsec: 0 },
        codec,
      }),
    ).resolves.toBe(true);
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({ type: 'bootstrapVideo', codec });
  });
});

describe('video bootstrap admission', () => {
  it('rejects H.265 delta-only history', async () => {
    const worker = { postMessage: () => undefined } as unknown as Worker;
    const player = {
      getMessagesInTimeRange: async () => [event(1, 'h265', h265Delta)],
    } as unknown as Player;
    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        targetTime: { sec: 1, nsec: 0 },
        codec: 'h265',
      }),
    ).resolves.toBe(false);
  });

  it('retains same-timestamp H.265 VPS/SPS/PPS packets in the bootstrap', async () => {
    const packets = [
      event(1, 'h265', h265Vps),
      event(1, 'h265', h265Sps),
      event(1, 'h265', h265Pps),
      event(1, 'h265', h265Idr),
    ];
    const posts: Array<{ frames?: unknown[] }> = [];
    const worker = { postMessage: (message: { frames?: unknown[] }) => posts.push(message) } as Worker;
    const player = { getMessagesInTimeRange: async () => packets } as unknown as Player;

    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        targetTime: { sec: 1, nsec: 0 },
        codec: 'h265',
      }),
    ).resolves.toBe(true);
    expect(posts[0]?.frames).toHaveLength(4);
  });
});
