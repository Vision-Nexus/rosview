import { describe, expect, it } from 'vitest';
import fixtures from '../../../../../test-fixtures/media/av1-frames.json';
import { parseAv1Chunk } from './av1';
import { getCompressedKind } from './imageTypes';
import { containsVideoRandomAccess, videoChunkType, videoCodecCandidates } from './videoCodec';
import { selectLatestCompleteVideoGop, updateVideoConfigPackets } from './videoQueue';

// FFmpeg-emitted sequence header with independently probed Main/8-bit/160x96 metadata.
const sh = Uint8Array.from([0x0a, 11, 0x02, 0, 0, 0x04, 0x9d, 0xa7, 0xef, 0x89, 0x5f, 0x20, 0x08]);

function chunk(frameHeader: number): Uint8Array {
  // Header plus a tile group (unless show_existing_frame); tile content is decoder-owned.
  return new Uint8Array([...sh, 0x1a, 1, frameHeader, ...(frameHeader & 0x80 ? [] : [0x22, 1, 0])]);
}

describe('AV1 low-overhead chunks', () => {
  it.each(fixtures.tracks)('parses real $name key/delta packets and codec metadata', ({ key, delta, codec }) => {
    const keyData = Buffer.from(key, 'base64');
    expect(parseAv1Chunk(keyData)).toMatchObject({
      hasFrame: true, isKey: true,
      sequence: { codec, width: fixtures.width, height: fixtures.height },
    });
    expect(parseAv1Chunk(Buffer.from(delta, 'base64'))).toMatchObject({
      hasFrame: true, isKey: false, sequence: null,
    });
    expect(videoCodecCandidates('av1', keyData)).toEqual([codec]);
    expect(getCompressedKind('av1')).toBe('av1');
  });

  it('requires a complete same-chunk sequence header, not only a key-looking frame', () => {
    expect(parseAv1Chunk(sh)).toMatchObject({ hasFrame: false, isKey: false });
    expect(containsVideoRandomAccess('av1', new Uint8Array([0x1a, 1, 0x10, 0x22, 1, 0]))).toBe(false);
    expect(parseAv1Chunk(new Uint8Array([...sh, 0x1a, 1, 0x10]))).toBeNull();
    expect(videoChunkType('av1', sh)).toBe('delta');
    expect(parseAv1Chunk(chunk(0x10))?.isKey).toBe(true);
  });

  it.each([0x80, 0x30, 0x50, 0x70, 0x00])('does not mark frame-header byte %i as a displayed KEY_FRAME', (byte) => {
    expect(parseAv1Chunk(chunk(byte))?.isKey).toBe(false);
  });

  it('rejects invalid framing without throwing', () => {
    const invalid = [
      [], [0], [0x80, 0], [0x08, 0], [0x0a, 0x80],
      [0x0a, 0xff, 0xff, 0xff, 0xff, 0x1f],
      [0x0a, 100, 1], [0x0e, 7, 0], [0x12, 0, 0x12, 0],
      [0x1a, 1, 0x10, ...sh], [...sh, 0x32, 0],
    ];
    for (const value of invalid) expect(parseAv1Chunk(Uint8Array.from(value))).toBeNull();
  });

  it('keeps key chunks self-contained during GOP recovery and drops header-only fallback', () => {
    const key = { data: Buffer.from(fixtures.tracks[0].key, 'base64') };
    const delta = { data: Buffer.from(fixtures.tracks[0].delta, 'base64') };
    expect(updateVideoConfigPackets('av1', [], { data: sh })).toEqual([]);
    expect(selectLatestCompleteVideoGop('av1', [key, delta, key, delta])).toEqual({
      frames: [key, delta], droppedFrames: 2, resync: true,
    });
  });
});
