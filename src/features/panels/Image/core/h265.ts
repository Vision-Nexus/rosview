import { removeEmulationPreventionBytes, scanAnnexBNalUnits } from './annexB';

const H265_VPS = 32;
const H265_SPS = 33;
const H265_PPS = 34;

export function scanH265NalTypes(data: Uint8Array): number[] {
  return scanAnnexBNalUnits(data).flatMap(({ offset }) =>
    offset + 1 < data.byteLength ? [(data[offset] >> 1) & 0x3f] : [],
  );
}

/** IDR and CRA pictures are independently decodable random-access points. */
export function containsH265RandomAccessNal(data: Uint8Array): boolean {
  return scanH265NalTypes(data).some((type) => type === 19 || type === 20 || type === 21);
}

export function containsH265ConfigNal(data: Uint8Array): boolean {
  return scanH265NalTypes(data).some(
    (type) => type === H265_VPS || type === H265_SPS || type === H265_PPS,
  );
}

export function containsH265VclNal(data: Uint8Array): boolean {
  return scanH265NalTypes(data).some((type) => type <= 31);
}

export function getH265ChunkType(data: Uint8Array): 'key' | 'delta' {
  return containsH265RandomAccessNal(data) || containsH265ConfigNal(data) ? 'key' : 'delta';
}

/**
 * Parse the general profile-tier-level fields from an HEVC SPS and return the
 * RFC 6381 codec suffix shared by `hev1` and `hvc1` sample entries.
 */
export function parseH265SpsCodecSuffix(data: Uint8Array): string | null {
  for (const unit of scanAnnexBNalUnits(data)) {
    if (unit.offset + 1 >= unit.end || ((data[unit.offset] >> 1) & 0x3f) !== H265_SPS) continue;
    const rbsp = removeEmulationPreventionBytes(data.subarray(unit.offset + 2, unit.end));
    // SPS byte 0 precedes the 12-byte general_profile_tier_level header.
    if (rbsp.byteLength < 13) continue;

    const profileTier = rbsp[1];
    const profileSpace = profileSpacePrefix(profileTier >> 6);
    const tier = profileTier & 0x20 ? 'H' : 'L';
    const profileIdc = profileTier & 0x1f;
    const compatibility = reverseBits32(
      ((rbsp[2] << 24) | (rbsp[3] << 16) | (rbsp[4] << 8) | rbsp[5]) >>> 0,
    );
    const levelIdc = rbsp[12];
    const constraintBytes = [...rbsp.subarray(6, 12)];
    while (constraintBytes.at(-1) === 0) constraintBytes.pop();
    const constraints = constraintBytes.length
      ? `.${constraintBytes.map(hexByte).join('')}`
      : '';
    return `${profileSpace}${profileIdc}.${compatibility.toString(16).toUpperCase()}.${tier}${levelIdc}${constraints}`;
  }
  return null;
}

/** Decoder candidates ordered from exact SPS metadata to common Main-profile fallbacks. */
export function getH265CodecCandidates(data: Uint8Array): string[] {
  const suffix = parseH265SpsCodecSuffix(data);
  const suffixes = [suffix, '1.6.L93.B0', '1.6.L120.B0', '1.6.L123.B0', '1.6.L150.B0'];
  const candidates = suffixes.flatMap((value) =>
    value ? [`hev1.${value}`, `hvc1.${value}`] : [],
  );
  return [...new Set(candidates)];
}

function profileSpacePrefix(value: number): string {
  return ['', 'A', 'B', 'C'][value & 0x03] ?? '';
}

function reverseBits32(value: number): number {
  let source = value >>> 0;
  let reversed = 0;
  for (let bit = 0; bit < 32; bit += 1) {
    reversed = ((reversed << 1) | (source & 1)) >>> 0;
    source >>>= 1;
  }
  return reversed;
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, '0').toUpperCase();
}
