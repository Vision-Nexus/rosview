import { describe, expect, it, vi } from 'vitest';
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

  it('pairs bootstrap frames by exact MCAP log time', async () => {
    const annotationTopic = '/camera/annotations';
    const annotations = messages.map((message) => ({
      ...event(message.receiveTime.sec, 'annotation', new Uint8Array()),
      topic: annotationTopic,
      message: {
        timestamp: { sec: message.receiveTime.sec - 1, nsec: 0 },
        points: [],
      },
      schemaName: 'foxglove.ImageAnnotations',
    }));
    const posts: Array<{ frames?: Array<{ annotation?: { timestampNs: bigint } | null }> }> = [];
    const getMessagesInTimeRange = vi.fn(async () => [...messages, ...annotations]);
    const worker = {
      postMessage: (message: { frames?: Array<{ annotation?: { timestampNs: bigint } | null }> }) =>
        posts.push(message),
    } as Worker;
    const player = { getMessagesInTimeRange } as unknown as Player;

    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        annotationTopic,
        targetTime: { sec: 3, nsec: 0 },
        codec,
      }),
    ).resolves.toBe(true);
    expect(getMessagesInTimeRange).toHaveBeenCalledWith(
      expect.objectContaining({ topics: ['/camera/video', annotationTopic] }),
    );
    expect(posts[0]?.frames?.map((frame) => frame.annotation?.timestampNs)).toEqual([
      1_000_000_000n,
      2_000_000_000n,
      3_000_000_000n,
    ]);
  });

  it('does not merge live frames that arrive after the bootstrap query starts', async () => {
    const liveEvents = [event(2, codec, delta)];
    const lateFrame = event(4, codec, delta);
    const posts: Array<{ frames?: Array<{ receiveTime: { sec: number } }> }> = [];
    const worker = {
      postMessage: (message: { frames?: Array<{ receiveTime: { sec: number } }> }) =>
        posts.push(message),
    } as Worker;
    const player = {
      getMessagesInTimeRange: async () => {
        liveEvents.push(lateFrame);
        return messages;
      },
    } as unknown as Player;

    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        targetTime: { sec: 3, nsec: 0 },
        codec,
        liveEvents,
      }),
    ).resolves.toBe(true);
    expect(posts[0]?.frames?.map((frame) => frame.receiveTime.sec)).toEqual([1, 2, 3]);
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

  it('marks a missing exact bootstrap annotation as a data gap', async () => {
    const onAnnotationGap = vi.fn();
    const posts: Array<{ frames?: Array<{ annotation?: unknown }> }> = [];
    const worker = {
      postMessage: (message: { frames?: Array<{ annotation?: unknown }> }) => posts.push(message),
    } as Worker;
    const player = {
      getMessagesInTimeRange: async () => [event(1, 'h264', h264Key)],
    } as unknown as Player;

    await expect(
      executeVideoBootstrap({
        player,
        worker,
        topic: '/camera/video',
        annotationTopic: '/camera/annotations',
        targetTime: { sec: 1, nsec: 0 },
        codec: 'h264',
        onAnnotationGap,
      }),
    ).resolves.toBe(true);
    expect(posts[0]?.frames?.[0]?.annotation).toBeNull();
    expect(onAnnotationGap).toHaveBeenCalledOnce();
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
