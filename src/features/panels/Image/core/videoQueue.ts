import {
  type VideoCodec,
  containsVideoRandomAccessNal,
  isVideoConfigOnly,
  scanVideoNalTypes,
  videoConfigStartsGeneration,
} from './videoCodec';

export interface VideoQueueEntry {
  data: Uint8Array;
}

export interface VideoGopSelection<T> {
  frames: T[];
  droppedFrames: number;
  resync: boolean;
}

export interface VideoHardLimitPlan<T> {
  frames: T[];
  droppedFrames: number;
  waitForRandomAccess: boolean;
}

/** Hard overflow never returns a truncated dependency chain for decoding. */
export function applyVideoHardLimit<T>(
  frames: readonly T[],
  hardLimitExceeded: boolean,
): VideoHardLimitPlan<T> {
  return hardLimitExceeded
    ? { frames: [], droppedFrames: frames.length, waitForRandomAccess: true }
    : { frames: [...frames], droppedFrames: 0, waitForRandomAccess: false };
}

/** Track the latest ordered parameter-set generation without collapsing split packets. */
export function updateVideoConfigPackets<T extends VideoQueueEntry>(
  codec: VideoCodec,
  packets: readonly T[],
  frame: T,
): T[] {
  if (!isVideoConfigOnly(codec, frame.data)) return [...packets];
  if (codec === 'h264' || scanVideoNalTypes(codec, frame.data).includes(32)) {
    return videoConfigStartsGeneration(codec, frame.data) ? [frame] : [...packets, frame];
  }
  if (scanVideoNalTypes(codec, frame.data).includes(33)) {
    const latestVps = [...packets]
      .reverse()
      .find((packet) => scanVideoNalTypes(codec, packet.data).includes(32));
    return latestVps ? [latestVps, frame] : [frame];
  }
  return [...packets, frame];
}

/** Select the newest complete random-access suffix without truncating its deltas. */
export function selectLatestCompleteVideoGop<T extends VideoQueueEntry>(
  codec: VideoCodec,
  frames: readonly T[],
  fallbackConfig: readonly T[] = [],
  forceResync = false,
): VideoGopSelection<T> {
  const latestRandomAccessIndex = findLatestRandomAccessIndex(codec, frames);
  if (latestRandomAccessIndex < 0) {
    return { frames: [...frames], droppedFrames: 0, resync: false };
  }
  if (latestRandomAccessIndex === 0) {
    if (!forceResync) return { frames: [...frames], droppedFrames: 0, resync: false };
    const randomAccessHasConfig = videoConfigStartsGeneration(codec, frames[0].data);
    return {
      frames: randomAccessHasConfig ? [...frames] : [...fallbackConfig, ...frames],
      droppedFrames: 0,
      resync: true,
    };
  }

  const randomAccessNalTypes = scanVideoNalTypes(codec, frames[latestRandomAccessIndex].data);
  const randomAccessHasConfig =
    codec === 'h264'
      ? randomAccessNalTypes.includes(7)
      : randomAccessNalTypes.includes(32) || randomAccessNalTypes.includes(33);
  const inQueueConfig = randomAccessHasConfig
    ? []
    : findLatestCompleteConfig(codec, frames, latestRandomAccessIndex);
  const configFrames = randomAccessHasConfig || inQueueConfig.length > 0
    ? inQueueConfig
    : [...fallbackConfig];
  const selected = [...configFrames, ...frames.slice(latestRandomAccessIndex)];
  const droppedFrames = latestRandomAccessIndex - inQueueConfig.length;
  if (droppedFrames === 0) {
    return { frames: [...frames], droppedFrames: 0, resync: false };
  }
  return { frames: selected, droppedFrames, resync: true };
}

function findLatestRandomAccessIndex<T extends VideoQueueEntry>(
  codec: VideoCodec,
  frames: readonly T[],
): number {
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    if (containsVideoRandomAccessNal(codec, frames[index].data)) return index;
  }
  return -1;
}

function findLatestCompleteConfig<T extends VideoQueueEntry>(
  codec: VideoCodec,
  frames: readonly T[],
  endIndex: number,
): T[] {
  let startIndex = -1;
  for (let index = endIndex - 1; index >= 0; index -= 1) {
    const frame = frames[index];
    if (!isVideoConfigOnly(codec, frame.data)) continue;
    const nalTypes = scanVideoNalTypes(codec, frame.data);
    if (codec === 'h264' && nalTypes.includes(7)) {
      startIndex = index;
      break;
    }
    if (codec === 'h265' && nalTypes.includes(32)) {
      startIndex = index;
      break;
    }
    if (codec === 'h265' && startIndex < 0 && nalTypes.includes(33)) startIndex = index;
  }
  return startIndex < 0
    ? []
    : frames
        .slice(startIndex, endIndex)
        .filter((candidate) => isVideoConfigOnly(codec, candidate.data));
}
