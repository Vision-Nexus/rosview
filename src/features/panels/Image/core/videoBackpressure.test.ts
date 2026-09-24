import { describe, expect, it } from 'vitest';
import {
  VIDEO_MAX_PENDING_FRAMES,
  VIDEO_MAX_PENDING_SPAN_MS,
  decodedFrameLatenessMs,
  initialVideoPressureState,
  isRetrogradeMediaFrame,
  isSupersededVideoOutput,
  isVideoHardLimitExceeded,
  isVideoStreamDiscontinuity,
  type VideoPressureState,
  updateDecodeDurationEwma,
  updateVideoPressure,
} from './videoBackpressure';

const healthy = {
  queueFrames: 2,
  queueSpanMs: 20,
  decodeMs: 10,
  decodeQueueSize: 1,
  mediaLagMs: 20,
};

describe('video adaptive backpressure', () => {
  it('treats frame count and queue span as strict hard bounds', () => {
    expect(isVideoHardLimitExceeded(VIDEO_MAX_PENDING_FRAMES, VIDEO_MAX_PENDING_SPAN_MS)).toBe(false);
    expect(isVideoHardLimitExceeded(VIDEO_MAX_PENDING_FRAMES + 1, 0)).toBe(true);
    expect(isVideoHardLimitExceeded(1, VIDEO_MAX_PENDING_SPAN_MS + 1)).toBe(true);
  });

  it('enters degraded mode from queue time span even below the frame bound', () => {
    const next = updateVideoPressure(initialVideoPressureState(), {
      queueFrames: 20,
      queueSpanMs: 400,
      decodeMs: 10,
      decodeQueueSize: 1,
      mediaLagMs: 20,
    });
    expect(next.mode).toBe('degraded');
  });

  it('uses hysteresis before returning to normal', () => {
    let state = updateVideoPressure(initialVideoPressureState(), {
      queueFrames: 80,
      queueSpanMs: 500,
      decodeMs: 60,
      decodeQueueSize: 8,
      mediaLagMs: 500,
    });
    state = updateVideoPressure(state, healthy);
    expect(state.mode).toBe('recovery');

    for (let i = 0; i < 10; i++) {
      state = updateVideoPressure(state, healthy);
    }
    expect(state.mode).toBe('recovery');
    state = updateVideoPressure(state, healthy);
    expect(state.mode).toBe('normal');
  });

  it('relapses quickly when recovery pressure rises again', () => {
    let state = { mode: 'degraded' as const, healthySamples: 0 };
    state = updateVideoPressure(state, {
      queueFrames: 0,
      queueSpanMs: 0,
      decodeMs: 5,
      decodeQueueSize: 0,
      mediaLagMs: 0,
    });
    expect(state.mode).toBe('recovery');
    state = updateVideoPressure(state, {
      queueFrames: 45,
      queueSpanMs: 300,
      decodeMs: 20,
      decodeQueueSize: 6,
      mediaLagMs: 300,
    });
    expect(state.mode).toBe('degraded');
  });

  it('smooths decode duration samples', () => {
    expect(updateDecodeDurationEwma(20, 40)).toBe(24);
    expect(updateDecodeDurationEwma(0, 15)).toBe(15);
  });

  it('uses actual media lag instead of playback speed', () => {
    const overloaded = updateVideoPressure(initialVideoPressureState(), {
      ...healthy,
      mediaLagMs: 2_000,
    });
    const capable = updateVideoPressure(initialVideoPressureState(), healthy);

    expect(overloaded.mode).toBe('degraded');
    expect(capable.mode).toBe('normal');
  });

  it('ignores steady transport latency so a bounded pipeline stays normal', () => {
    // Six 720p streams decode with a few hundred ms of constant transport
    // latency while the queues stay empty. That is not overload.
    const transportLatency = { ...healthy, mediaLagMs: 260 };
    let state = initialVideoPressureState();
    for (let i = 0; i < 30; i += 1) {
      state = updateVideoPressure(state, transportLatency);
    }
    expect(state.mode).toBe('normal');
  });

  it('recovers from degraded while transport latency stays high', () => {
    // Regression: gating recovery on media lag pinned the panel in degraded
    // mode for the whole session, permanently halving the render rate.
    let state: VideoPressureState = {
      mode: 'degraded',
      healthySamples: 0,
    };
    const laggyButIdle = { ...healthy, mediaLagMs: 260 };
    for (let i = 0; i < 20; i += 1) {
      state = updateVideoPressure(state, laggyButIdle);
    }
    expect(state.mode).toBe('normal');
  });

  it('never discards a decoded frame that nothing newer supersedes', () => {
    const playback = 1_000_000_000n;
    expect(decodedFrameLatenessMs(playback, 950_000_000n)).toBe(50);
    expect(decodedFrameLatenessMs(playback, 700_000_000n)).toBe(300);
    expect(isSupersededVideoOutput(700_000_000n, null)).toBe(false);
    expect(isSupersededVideoOutput(0n, null)).toBe(false);
  });

  it('discards a decoded frame only for an equal-or-newer pending frame', () => {
    expect(isSupersededVideoOutput(900_000_000n, 950_000_000n)).toBe(true);
    expect(isSupersededVideoOutput(900_000_000n, 900_000_000n)).toBe(true);
    expect(isSupersededVideoOutput(950_000_000n, 900_000_000n)).toBe(false);
  });

  it('rejects backward frame paints only during playback', () => {
    expect(isRetrogradeMediaFrame(true, 1_000n, 999n)).toBe(true);
    expect(isRetrogradeMediaFrame(true, 1_000n, 1_000n)).toBe(false);
    expect(isRetrogradeMediaFrame(true, 1_000n, 1_001n)).toBe(false);
    expect(isRetrogradeMediaFrame(false, 1_000n, 999n)).toBe(false);
    expect(isRetrogradeMediaFrame(true, null, 999n)).toBe(false);
  });

  it('detects stream discontinuities from the observed frame cadence', () => {
    expect(isVideoStreamDiscontinuity(33, 33)).toBe(false);
    expect(isVideoStreamDiscontinuity(66, 33)).toBe(false);
    expect(isVideoStreamDiscontinuity(5_000, 33)).toBe(true);
    expect(isVideoStreamDiscontinuity(500, 500)).toBe(false);
    expect(isVideoStreamDiscontinuity(2_100, 500)).toBe(true);
    expect(isVideoStreamDiscontinuity(5_000, 0)).toBe(false);
    expect(isVideoStreamDiscontinuity(0, 33)).toBe(false);
  });
});
