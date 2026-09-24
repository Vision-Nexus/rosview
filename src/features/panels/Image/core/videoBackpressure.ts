export type VideoPressureMode = 'normal' | 'degraded' | 'recovery';

export interface VideoPressureState {
  mode: VideoPressureMode;
  healthySamples: number;
}

export interface VideoPressureObservation {
  queueFrames: number;
  queueSpanMs: number;
  decodeMs: number;
  decodeQueueSize: number;
  mediaLagMs: number;
}

/**
 * Hard pending-queue bounds. Both bounds describe roughly the same backlog for a
 * 30fps stream (120 frames ≈ 4s), so neither fires long before the other.
 */
export const VIDEO_MAX_PENDING_FRAMES = 120;
export const VIDEO_MAX_PENDING_SPAN_MS = 4_000;
export const VIDEO_DECODE_QUEUE_HIGH_WATER = 4;
export const VIDEO_RENDER_INTERVAL_MS = 1000 / 60;
export const VIDEO_PRESSURED_RENDER_INTERVAL_MS = 1000 / 30;

/** Smallest inter-frame gap that can mark a broken reference chain. */
export const VIDEO_MIN_DISCONTINUITY_GAP_MS = 400;
/** Multiple of the observed frame cadence that still counts as continuous. */
export const VIDEO_DISCONTINUITY_CADENCE_FACTOR = 4;

const ENTER_DEGRADED = {
  frames: 72,
  spanMs: 350,
  decodeMs: 55,
  // A full bounded decode pipeline is healthy by itself. Only treat the
  // decoder queue as overload when it exceeds the configured feeder bound.
  decodeQueueSize: VIDEO_DECODE_QUEUE_HIGH_WATER * 2,
  // Media lag includes fixed transport latency, so only treat it as overload
  // well beyond the hundreds of milliseconds common in multi-stream playback.
  mediaLagMs: 1_500,
};
/**
 * Recovery deliberately omits `mediaLagMs`: it is dominated by constant
 * transport latency rather than by overload, so gating recovery on it pins the
 * panel in `degraded` for the whole session (halved render rate, DPR clamped
 * to 1) on any recording whose latency never drops below the bound.
 */
const ENTER_RECOVERY = {
  frames: 18,
  spanMs: 120,
  decodeMs: 32,
  decodeQueueSize: 1,
};
const RELAPSE = {
  frames: 40,
  spanMs: 250,
  decodeMs: 45,
  decodeQueueSize: VIDEO_DECODE_QUEUE_HIGH_WATER + 2,
  mediaLagMs: 1_000,
};
const RECOVERY_SAMPLES = 12;

export function initialVideoPressureState(): VideoPressureState {
  return { mode: 'normal', healthySamples: 0 };
}

export function isVideoHardLimitExceeded(queueFrames: number, queueSpanMs: number): boolean {
  return queueFrames > VIDEO_MAX_PENDING_FRAMES || queueSpanMs > VIDEO_MAX_PENDING_SPAN_MS;
}

/**
 * Hysteretic pressure controller. Queue age is the primary signal while the
 * decode EWMA catches expensive streams before the bounded queue overflows.
 */
export function updateVideoPressure(
  state: VideoPressureState,
  observation: VideoPressureObservation,
): VideoPressureState {
  const overloaded =
    observation.queueFrames >= ENTER_DEGRADED.frames ||
    observation.queueSpanMs >= ENTER_DEGRADED.spanMs ||
    observation.decodeMs >= ENTER_DEGRADED.decodeMs ||
    observation.decodeQueueSize >= ENTER_DEGRADED.decodeQueueSize ||
    observation.mediaLagMs >= ENTER_DEGRADED.mediaLagMs;
  const healthy =
    observation.queueFrames <= ENTER_RECOVERY.frames &&
    observation.queueSpanMs <= ENTER_RECOVERY.spanMs &&
    observation.decodeMs <= ENTER_RECOVERY.decodeMs &&
    observation.decodeQueueSize <= ENTER_RECOVERY.decodeQueueSize;
  const relapsed =
    observation.queueFrames >= RELAPSE.frames ||
    observation.queueSpanMs >= RELAPSE.spanMs ||
    observation.decodeMs >= RELAPSE.decodeMs ||
    observation.decodeQueueSize >= RELAPSE.decodeQueueSize ||
    observation.mediaLagMs >= RELAPSE.mediaLagMs;

  if (state.mode === 'normal') {
    return overloaded ? { mode: 'degraded', healthySamples: 0 } : state;
  }
  if (state.mode === 'degraded') {
    return healthy ? { mode: 'recovery', healthySamples: 1 } : state;
  }
  if (relapsed) {
    return { mode: 'degraded', healthySamples: 0 };
  }
  if (!healthy) {
    return { mode: 'recovery', healthySamples: 0 };
  }
  const healthySamples = state.healthySamples + 1;
  return healthySamples >= RECOVERY_SAMPLES
    ? { mode: 'normal', healthySamples: 0 }
    : { mode: 'recovery', healthySamples };
}

export function updateDecodeDurationEwma(previousMs: number, sampleMs: number): number {
  if (!Number.isFinite(sampleMs) || sampleMs < 0) {
    return previousMs;
  }
  return previousMs === 0 ? sampleMs : previousMs * 0.8 + sampleMs * 0.2;
}

export function decodedFrameLatenessMs(playbackTimeNs: bigint | null, frameTimeNs: bigint): number {
  if (playbackTimeNs == null) {
    return 0;
  }
  return Math.max(0, Number(playbackTimeNs - frameTimeNs) / 1_000_000);
}

/**
 * Newest-wins output policy. Pipeline latency alone is not a reason to discard
 * a frame; an output is disposable only when an equal-or-newer frame already
 * waits for paint.
 */
export function isSupersededVideoOutput(
  candidateTimeNs: bigint,
  pendingTimeNs: bigint | null,
): boolean {
  return pendingTimeNs != null && pendingTimeNs >= candidateTimeNs;
}

/**
 * True when a gap between consecutive frames is too large to be the stream's
 * natural cadence, meaning the reference chain a delta depends on was missed.
 * A cadence must be known before a gap can be judged.
 */
export function isVideoStreamDiscontinuity(
  gapMs: number,
  frameIntervalMs: number,
  minGapMs = VIDEO_MIN_DISCONTINUITY_GAP_MS,
): boolean {
  if (!Number.isFinite(gapMs) || gapMs <= 0) return false;
  if (!Number.isFinite(frameIntervalMs) || frameIntervalMs <= 0) return false;
  return gapMs > Math.max(minGapMs, frameIntervalMs * VIDEO_DISCONTINUITY_CADENCE_FACTOR);
}

export function isRetrogradeMediaFrame(
  isPlaying: boolean,
  lastDrawnTimeNs: bigint | null,
  frameTimeNs: bigint,
): boolean {
  return isPlaying && lastDrawnTimeNs !== null && frameTimeNs < lastDrawnTimeNs;
}
