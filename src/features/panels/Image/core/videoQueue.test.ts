import { describe, expect, it } from 'vitest';
import {
  applyVideoHardLimit,
  selectLatestCompleteVideoGop,
  updateVideoConfigPackets,
} from './videoQueue';

const h264Sps = new Uint8Array([0, 0, 1, 0x67, 0x42, 0, 0x1e]);
const h264Pps = new Uint8Array([0, 0, 1, 0x68, 0xce, 0x3c]);
const h264Idr = new Uint8Array([0, 0, 1, 0x65, 1]);
const h264Delta = new Uint8Array([0, 0, 1, 0x41, 2]);
const h265Vps = new Uint8Array([0, 0, 1, 32 << 1, 1, 1]);
const h265Sps = new Uint8Array([0, 0, 1, 33 << 1, 1, 1]);
const h265Pps = new Uint8Array([0, 0, 1, 34 << 1, 1, 1]);
const h265Idr = new Uint8Array([0, 0, 1, 19 << 1, 1, 0x80]);
const h265Delta = new Uint8Array([0, 0, 1, 1 << 1, 1, 0x80]);

type Frame = { id: string; data: Uint8Array };

function frame(id: string, data: Uint8Array): Frame {
  return { id, data };
}

describe.each([
  {
    codec: 'h264' as const,
    config: [frame('sps', h264Sps), frame('pps', h264Pps)],
    randomAccess: h264Idr,
    delta: h264Delta,
  },
  {
    codec: 'h265' as const,
    config: [frame('vps', h265Vps), frame('sps', h265Sps), frame('pps', h265Pps)],
    randomAccess: h265Idr,
    delta: h265Delta,
  },
])('$codec GOP queue selection', ({ codec, config, randomAccess, delta }) => {
  it('retains ordered parameter sets and resets at a new generation', () => {
    let packets: Frame[] = [];
    for (const packet of config) packets = updateVideoConfigPackets(codec, packets, packet);
    expect(packets.map(({ id }) => id)).toEqual(config.map(({ id }) => id));
  });

  it('jumps to the latest random-access point without truncating its deltas', () => {
    const frames = [
      ...config,
      frame('key-1', randomAccess),
      frame('delta-1', delta),
      frame('key-2', randomAccess),
      frame('delta-2', delta),
    ];
    const selected = selectLatestCompleteVideoGop(codec, frames);
    expect(selected.resync).toBe(true);
    expect(selected.frames.map(({ id }) => id)).toEqual([
      ...config.map(({ id }) => id),
      'key-2',
      'delta-2',
    ]);
  });

  it('prepends consumed config when forced to reset at a bare key frame', () => {
    const frames = [frame('key', randomAccess), frame('delta', delta)];
    const selected = selectLatestCompleteVideoGop(codec, frames, config, true);
    expect(selected.resync).toBe(true);
    expect(selected.frames.map(({ id }) => id)).toEqual([
      ...config.map(({ id }) => id),
      'key',
      'delta',
    ]);
  });
});

describe('video hard limit', () => {
  it('drops the complete backlog instead of returning truncated dependencies', () => {
    const frames = Array.from({ length: 200 }, (_, index) => frame(String(index), h265Delta));
    const plan = applyVideoHardLimit(frames, true);
    expect(plan.waitForRandomAccess).toBe(true);
    expect(plan.droppedFrames).toBe(frames.length);
    expect(plan.frames).toEqual([]);
  });
});
