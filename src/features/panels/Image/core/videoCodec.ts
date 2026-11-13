import {
  containsH264IdrNal,
  getH264ChunkType,
  getH264CodecCandidates,
  parseH264SpsCodec,
  scanH264NalTypes,
} from './h264';
import {
  containsH265ConfigNal,
  containsH265RandomAccessNal,
  containsH265VclNal,
  getH265ChunkType,
  getH265CodecCandidates,
  parseH265SpsCodecSuffix,
  scanH265NalTypes,
} from './h265';
import { parseAv1Chunk } from './av1';

export type VideoCodec = 'h264' | 'h265' | 'av1';

export function videoCodecFromFormat(format: string): VideoCodec | null {
  const normalized = format.trim().toLowerCase();
  if (/\b(?:h264|avc)\b/.test(normalized)) return 'h264';
  if (/\b(?:h265|hevc)\b/.test(normalized)) return 'h265';
  if (/\bav1\b/.test(normalized)) return 'av1';
  return null;
}

export function scanVideoNalTypes(codec: Exclude<VideoCodec, 'av1'>, data: Uint8Array): number[] {
  return codec === 'h264' ? scanH264NalTypes(data) : scanH265NalTypes(data);
}

export function containsVideoRandomAccess(codec: VideoCodec, data: Uint8Array): boolean {
  if (codec === 'av1') return parseAv1Chunk(data)?.isKey ?? false;
  return codec === 'h264' ? containsH264IdrNal(data) : containsH265RandomAccessNal(data);
}

export function containsVideoConfig(codec: VideoCodec, data: Uint8Array): boolean {
  if (codec === 'av1') return parseAv1Chunk(data)?.sequence != null;
  if (codec === 'h264') {
    return scanH264NalTypes(data).some((type) => type === 7 || type === 8);
  }
  return containsH265ConfigNal(data);
}

export function containsVideoFrame(codec: VideoCodec, data: Uint8Array): boolean {
  if (codec === 'av1') return parseAv1Chunk(data)?.hasFrame ?? false;
  if (codec === 'h264') {
    return scanH264NalTypes(data).some((type) => type === 1 || type === 5);
  }
  return containsH265VclNal(data);
}

export function videoChunkType(codec: VideoCodec, data: Uint8Array): 'key' | 'delta' {
  if (codec === 'av1') return containsVideoRandomAccess(codec, data) ? 'key' : 'delta';
  return codec === 'h264' ? getH264ChunkType(data) : getH265ChunkType(data);
}

export function videoCodecCandidates(codec: VideoCodec, data: Uint8Array): string[] {
  if (codec === 'av1') {
    const sequence = parseAv1Chunk(data)?.sequence;
    return sequence ? [sequence.codec] : [];
  }
  return codec === 'h264' ? getH264CodecCandidates(data) : getH265CodecCandidates(data);
}

export function streamCodecIdentity(codec: VideoCodec, data: Uint8Array): string | null {
  if (codec === 'av1') return parseAv1Chunk(data)?.sequence?.identity ?? null;
  return codec === 'h264' ? parseH264SpsCodec(data) : parseH265SpsCodecSuffix(data);
}

export function videoConfigStartsGeneration(codec: VideoCodec, data: Uint8Array): boolean {
  if (codec === 'av1') return parseAv1Chunk(data)?.sequence != null;
  const nalTypes = scanVideoNalTypes(codec, data);
  return codec === 'h264' ? nalTypes.includes(7) : nalTypes.includes(32) || nalTypes.includes(33);
}

export function isVideoConfigOnly(codec: VideoCodec, data: Uint8Array): boolean {
  return containsVideoConfig(codec, data) && !containsVideoFrame(codec, data);
}

export function monotonicVideoTimestampUs(timeNs: bigint, previousUs: number): number {
  const sourceUs = Number(timeNs / 1_000n);
  return Math.max(sourceUs, previousUs + 1);
}
