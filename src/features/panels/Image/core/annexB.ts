export interface AnnexBNalUnit {
  offset: number;
  end: number;
}

/** Return NAL payload ranges without their three- or four-byte Annex-B start codes. */
export function scanAnnexBNalUnits(data: Uint8Array): AnnexBNalUnit[] {
  const starts: number[] = [];
  let cursor = 0;
  while (cursor < data.byteLength - 2) {
    const start = findAnnexBStartCode(data, cursor);
    if (start < 0) break;
    const prefixLength = data[start + 2] === 1 ? 3 : 4;
    const offset = start + prefixLength;
    if (offset < data.byteLength) starts.push(offset);
    cursor = offset + 1;
  }
  if (starts.length === 0) {
    return data.byteLength > 0 ? [{ offset: 0, end: data.byteLength }] : [];
  }
  return starts.map((offset, index) => ({
    offset,
    end: index + 1 < starts.length ? startCodeBefore(data, starts[index + 1]) : data.byteLength,
  }));
}

/** Remove H.26x emulation-prevention bytes from one NAL RBSP payload. */
export function removeEmulationPreventionBytes(data: Uint8Array): Uint8Array {
  const output = new Uint8Array(data.byteLength);
  let length = 0;
  let zeroCount = 0;
  for (const byte of data) {
    if (zeroCount >= 2 && byte === 0x03) {
      zeroCount = 0;
      continue;
    }
    output[length] = byte;
    length += 1;
    zeroCount = byte === 0 ? zeroCount + 1 : 0;
  }
  return output.subarray(0, length);
}

function startCodeBefore(data: Uint8Array, nalOffset: number): number {
  if (
    nalOffset >= 4 &&
    data[nalOffset - 4] === 0 &&
    data[nalOffset - 3] === 0 &&
    data[nalOffset - 2] === 0 &&
    data[nalOffset - 1] === 1
  ) {
    return nalOffset - 4;
  }
  return nalOffset - 3;
}

function findAnnexBStartCode(data: Uint8Array, offset: number): number {
  for (let index = offset; index < data.byteLength - 2; index += 1) {
    if (data[index] !== 0 || data[index + 1] !== 0) continue;
    if (data[index + 2] === 1) return index;
    if (index + 3 < data.byteLength && data[index + 2] === 0 && data[index + 3] === 1) {
      return index;
    }
  }
  return -1;
}
