import { describe, expect, it } from 'vitest';
import {
  containsH265ConfigNal,
  containsH265RandomAccessNal,
  getH265ChunkType,
  getH265CodecCandidates,
  parseH265SpsCodecSuffix,
  scanH265NalTypes,
} from './h265';

const start = [0, 0, 0, 1];

function nal(type: number, payload: number[] = []): number[] {
  return [...start, type << 1, 1, ...payload];
}

describe('H.265 Annex-B parsing', () => {
  it('recognizes parameter sets, IDR, CRA, and delta access units', () => {
    const idr = new Uint8Array([
      ...nal(32, [1]),
      ...nal(33, [1]),
      ...nal(34, [1]),
      ...nal(19, [0x80]),
    ]);
    const cra = new Uint8Array(nal(21, [0x80]));
    const delta = new Uint8Array(nal(1, [0x80]));

    expect(scanH265NalTypes(idr)).toEqual([32, 33, 34, 19]);
    expect(containsH265ConfigNal(idr)).toBe(true);
    expect(containsH265RandomAccessNal(idr)).toBe(true);
    expect(getH265ChunkType(idr)).toBe('key');
    expect(containsH265RandomAccessNal(cra)).toBe(true);
    expect(getH265ChunkType(delta)).toBe('delta');
  });

  it('derives an RFC 6381 Main-profile suffix from SPS profile-tier-level', () => {
    const sps = new Uint8Array(
      nal(33, [
        0x01,
        0x01,
        0x60, 0x00, 0x00, 0x00,
        0xb0, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x5d,
      ]),
    );

    expect(parseH265SpsCodecSuffix(sps)).toBe('1.6.L93.B0');
    expect(getH265CodecCandidates(sps).slice(0, 2)).toEqual([
      'hev1.1.6.L93.B0',
      'hvc1.1.6.L93.B0',
    ]);
  });
});
