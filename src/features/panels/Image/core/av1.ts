/** AV1 low-overhead OBU framing (AV1 sections 5.2, 5.5 and 6.8.2).
 * This is a bounded header parser, not a replacement for the browser's decoder.
 */
interface Obu {
  type: number;
  payload: Uint8Array;
}

export interface Av1SequenceHeader {
  codec: string;
  identity: string;
  reducedStillPicture: boolean;
  width: number;
  height: number;
}

export interface Av1Chunk {
  sequence: Av1SequenceHeader | null;
  hasFrame: boolean;
  isKey: boolean;
}

class Bits {
  #offset = 0;
  private readonly data: Uint8Array;
  constructor(data: Uint8Array) { this.data = data; }

  read(count: number): number {
    if (count < 0 || count > 32 || this.#offset + count > this.data.length * 8) {
      throw new Error('Truncated AV1 header');
    }
    let value = 0;
    for (let bit = 0; bit < count; bit++) {
      value = value * 2 + ((this.data[this.#offset >> 3] >> (7 - (this.#offset & 7))) & 1);
      this.#offset++;
    }
    return value;
  }

  flag(): boolean { return this.read(1) !== 0; }

  uvlc(): number {
    let zeros = 0;
    while (!this.flag()) {
      if (++zeros >= 32) throw new Error('Invalid AV1 timing interval');
    }
    return 2 ** zeros - 1 + this.read(zeros);
  }

  trailingBits(): void {
    if (!this.flag()) throw new Error('Missing AV1 trailing bit');
    while (this.#offset < this.data.length * 8) {
      if (this.flag()) throw new Error('Invalid AV1 trailing bits');
    }
  }
}

function scanObus(data: Uint8Array): Obu[] {
  const units: Obu[] = [];
  let offset = 0;
  while (offset < data.length) {
    if (units.length >= 1024) throw new Error('Too many AV1 OBUs');
    const header = data[offset++];
    // Low-overhead OBUs must carry a length. IVF/Annex-B are not accepted here.
    if ((header & 0x81) !== 0 || (header & 2) === 0) throw new Error('Invalid AV1 OBU header');
    const type = (header >> 3) & 15;
    if (type === 0 || (type >= 9 && type <= 14)) throw new Error('Reserved AV1 OBU type');
    if ((header & 4) !== 0) {
      const extension = data[offset++];
      if (extension === undefined || (extension & 7) !== 0) throw new Error('Invalid AV1 OBU extension');
    }
    let size = 0;
    let factor = 1;
    let complete = false;
    for (let index = 0; index < 8; index++) {
      const byte = data[offset++];
      if (byte === undefined) throw new Error('Truncated AV1 OBU size');
      size += (byte & 127) * factor;
      if (!Number.isSafeInteger(size) || size > 0xffff_ffff) throw new Error('AV1 OBU size overflow');
      if (byte < 128) { complete = true; break; }
      factor *= 128;
    }
    if (!complete || size > data.length - offset) throw new Error('Truncated AV1 OBU');
    if (type === 2 && (units.length !== 0 || size !== 0)) throw new Error('Multiple AV1 temporal units');
    units.push({ type, payload: data.subarray(offset, offset + size) });
    offset += size;
  }
  if (units.length === 0) throw new Error('Empty AV1 chunk');
  return units;
}

function parseSequence(payload: Uint8Array): Av1SequenceHeader {
  // All sequence fields are bounded (at most 32 operating points). Do not spend
  // unbounded time checking attacker-controlled trailing zero padding.
  if (payload.length > 4096) throw new Error('AV1 sequence header exceeds its parser bound');
  const bits = new Bits(payload);
  const profile = bits.read(3);
  if (profile > 2) throw new Error('Reserved AV1 profile');
  const stillPicture = bits.flag();
  const reducedStillPicture = bits.flag();
  if (reducedStillPicture && !stillPicture) throw new Error('Invalid AV1 still-picture header');
  let level = 0;
  let tier = false;
  if (reducedStillPicture) {
    level = bits.read(5);
  } else {
    let bufferDelayLength = 0;
    if (bits.flag()) {
      if (bits.read(32) === 0 || bits.read(32) === 0) throw new Error('Invalid AV1 timing');
      if (bits.flag()) bits.uvlc();
      if (bits.flag()) {
        bufferDelayLength = bits.read(5) + 1;
        if (bits.read(32) === 0) throw new Error('Invalid AV1 decoder timing');
        bits.read(5);
        bits.read(5);
      }
    }
    const initialDisplayDelay = bits.flag();
    const operatingPoints = bits.read(5) + 1;
    for (let op = 0; op < operatingPoints; op++) {
      bits.read(12);
      const opLevel = bits.read(5);
      const opTier = opLevel > 7 && bits.flag();
      if (op === 0) { level = opLevel; tier = opTier; }
      if (bufferDelayLength && bits.flag()) {
        bits.read(bufferDelayLength);
        bits.read(bufferDelayLength);
        bits.read(1);
      }
      if (initialDisplayDelay && bits.flag()) bits.read(4);
    }
  }
  const widthBits = bits.read(4) + 1;
  const heightBits = bits.read(4) + 1;
  const width = bits.read(widthBits) + 1;
  const height = bits.read(heightBits) + 1;
  if (!reducedStillPicture && bits.flag()) {
    bits.read(4);
    bits.read(3);
  }
  bits.read(3); // superblock, filter-intra, intra-edge filter
  if (!reducedStillPicture) {
    bits.read(4); // inter-intra, masked compound, warped motion, dual filter
    const orderHint = bits.flag();
    if (orderHint) bits.read(2);
    const screenContentTools = bits.flag() ? 2 : bits.read(1);
    if (screenContentTools > 0 && !bits.flag()) bits.read(1);
    if (orderHint) bits.read(3);
  }
  bits.read(3); // superres, CDEF, restoration
  const highBitdepth = bits.flag();
  const depth = profile === 2 && highBitdepth ? (bits.flag() ? 12 : 10) : highBitdepth ? 10 : 8;
  const monochrome = profile !== 1 && bits.flag();
  let primaries = 2;
  let transfer = 2;
  let matrix = 2;
  if (bits.flag()) {
    primaries = bits.read(8);
    transfer = bits.read(8);
    matrix = bits.read(8);
  }
  let fullRange: boolean;
  let subsamplingX = 1;
  let subsamplingY = 1;
  let chromaPosition = 0;
  if (monochrome) {
    fullRange = bits.flag();
  } else if (primaries === 1 && transfer === 13 && matrix === 0) {
    fullRange = true;
    subsamplingX = subsamplingY = 0;
    bits.read(1); // separate_uv_delta_q
  } else {
    fullRange = bits.flag();
    if (profile === 1) {
      subsamplingX = subsamplingY = 0;
    } else if (profile === 2) {
      subsamplingX = depth === 12 ? bits.read(1) : 1;
      subsamplingY = depth === 12 && subsamplingX ? bits.read(1) : 0;
    }
    if (subsamplingX && subsamplingY) {
      chromaPosition = bits.read(2);
      if (chromaPosition === 3) throw new Error('Reserved AV1 chroma position');
    }
    bits.read(1); // separate_uv_delta_q
  }
  bits.read(1); // film_grain_params_present
  bits.trailingBits();
  const pad = (value: number) => String(value).padStart(2, '0');
  const codec = `av01.${profile}.${pad(level)}${tier ? 'H' : 'M'}.${pad(depth)}.${Number(monochrome)}.${subsamplingX}${subsamplingY}${chromaPosition}.${pad(primaries)}.${pad(transfer)}.${pad(matrix)}.${Number(fullRange)}`;
  // Exact sequence bytes distinguish configuration changes even at the same profile/level.
  const identity = `${codec}:${Array.from(payload, (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
  return { codec, identity, reducedStillPicture, width, height };
}

/** A WebCodecs key chunk contains its own sequence header BEFORE its first displayed KEY_FRAME.
 * A header-only chunk, intra-only frame, switch frame, or show-existing frame is never a key.
 */
export function parseAv1Chunk(data: Uint8Array): Av1Chunk | null {
  try {
    let sequence: Av1SequenceHeader | null = null;
    let hasFrame = false;
    let isKey = false;
    let sawFrameHeader = false;
    let needsTiles = false;
    let acceptsTileGroups = false;
    for (const unit of scanObus(data)) {
      if (unit.type === 1) {
        if (sawFrameHeader) throw new Error('AV1 sequence header follows a frame');
        sequence = parseSequence(unit.payload);
      } else if (unit.type === 3 || unit.type === 6) {
        if (unit.payload.length === 0) throw new Error('Empty AV1 frame');
        if (needsTiles) throw new Error('AV1 frame header is missing tile data');
        const showExisting = !sequence?.reducedStillPicture && (unit.payload[0] & 0x80) !== 0;
        if (!sawFrameHeader && sequence) {
          if (sequence.reducedStillPicture) {
            isKey = true;
          } else {
            const bits = new Bits(unit.payload);
            if (!bits.flag()) {
              const frameType = bits.read(2);
              const showFrame = bits.flag();
              isKey = frameType === 0 && showFrame;
            }
          }
        }
        sawFrameHeader = true;
        acceptsTileGroups = unit.type === 3 && !showExisting;
        needsTiles = acceptsTileGroups;
        hasFrame ||= !needsTiles;
      } else if (unit.type === 4) {
        if (!acceptsTileGroups || unit.payload.length === 0) throw new Error('AV1 tile group lacks its frame header');
        needsTiles = false;
        hasFrame = true;
      }
    }
    if (needsTiles) throw new Error('AV1 frame header is missing tile data');
    return { sequence, hasFrame, isKey };
  } catch {
    return null;
  }
}
