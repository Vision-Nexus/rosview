import { describe, expect, it } from 'vitest';
import { RenderBackpressure } from './RenderBackpressure';
import type { RenderHealthReport } from '@/core/types/player';
import type { Time } from '@/core/types/ros';

function atMs(ms: number): Time {
  return {
    sec: Math.floor(ms / 1000),
    nsec: (ms % 1000) * 1_000_000,
  };
}

function health(overrides: Partial<RenderHealthReport> = {}): RenderHealthReport {
  return {
    topic: '/camera',
    visible: true,
    pending: false,
    averageFrameIntervalMs: 100,
    ...overrides,
  };
}

describe('RenderBackpressure', () => {
  it('blocks only after pending media lag exceeds the cadence-aware threshold', () => {
    const state = new RenderBackpressure();
    state.update('image', health({ pending: true }), atMs(0));

    expect(state.evaluate(atMs(1_500), 10)).toBe(false);
    expect(state.evaluate(atMs(1_501), 11)).toBe(true);

    const sparse = new RenderBackpressure();
    sparse.update('image', health({ pending: true, averageFrameIntervalMs: 2_000 }), atMs(0));
    expect(sparse.evaluate(atMs(6_000), 10)).toBe(false);
    expect(sparse.evaluate(atMs(6_001), 11)).toBe(true);
  });

  it('does not count a sparse idle gap before work becomes pending', () => {
    const state = new RenderBackpressure();
    state.update('image', health({ renderedTime: atMs(0) }), atMs(0));
    expect(state.evaluate(atMs(20_000), 1)).toBe(false);

    state.update('image', health({ pending: true, renderedTime: atMs(0) }), atMs(20_000));
    expect(state.evaluate(atMs(21_500), 2)).toBe(false);
    expect(state.evaluate(atMs(21_501), 3)).toBe(true);
  });

  it('starts a fresh media-time baseline when the panel topic changes', () => {
    const state = new RenderBackpressure();
    state.update('image', health({ pending: true }), atMs(0));
    expect(state.evaluate(atMs(1_000), 1)).toBe(false);

    state.update('image', health({ topic: '/camera/new', pending: true }), atMs(1_000));
    expect(state.evaluate(atMs(2_500), 2)).toBe(false);
    expect(state.evaluate(atMs(2_501), 3)).toBe(true);
  });

  it('uses strictly newer rendered media time as progress while work remains pending', () => {
    const state = new RenderBackpressure();
    state.update('image', health({ pending: true, renderedTime: atMs(100) }), atMs(0));
    state.update('image', health({ pending: true, renderedTime: atMs(1_400) }), atMs(1_400));

    expect(state.evaluate(atMs(2_800), 10)).toBe(false);
    expect(state.evaluate(atMs(3_001), 11)).toBe(true);

    state.update('image', health({ pending: true, renderedTime: atMs(1_400) }), atMs(3_001));
    expect(state.evaluate(atMs(3_002), 12)).toBe(true);
  });

  it('aggregates panels and requires 500 ms with every visible panel drained', () => {
    const state = new RenderBackpressure();
    state.update('a', health({ pending: true }), atMs(0));
    state.update('b', health({ pending: false }), atMs(0));
    expect(state.evaluate(atMs(1_501), 0)).toBe(true);

    state.update('a', health({ pending: false }), atMs(1_501));
    expect(state.evaluate(atMs(1_501), 100)).toBe(true);
    expect(state.evaluate(atMs(1_501), 599)).toBe(true);

    state.update('b', health({ pending: true }), atMs(1_501));
    expect(state.evaluate(atMs(1_501), 600)).toBe(true);
    state.update('b', health({ pending: false }), atMs(1_501));
    expect(state.evaluate(atMs(1_501), 700)).toBe(true);
    expect(state.evaluate(atMs(1_501), 1_200)).toBe(false);
  });

  it('keeps hidden panels non-blocking and applies recovery after disposal', () => {
    const state = new RenderBackpressure();
    state.update('hidden', health({ visible: false, pending: true }), atMs(0));
    expect(state.evaluate(atMs(10_000), 0)).toBe(false);

    state.update('visible', health({ pending: true }), atMs(0));
    expect(state.evaluate(atMs(1_501), 10)).toBe(true);
    state.unregister('visible');
    expect(state.evaluate(atMs(1_501), 20)).toBe(true);
    expect(state.evaluate(atMs(1_501), 520)).toBe(false);
  });

  it('cancels recovery and resets pending media baselines on manual pause', () => {
    const state = new RenderBackpressure();
    state.update('image', health({ pending: true }), atMs(0));
    expect(state.evaluate(atMs(1_501), 0)).toBe(true);

    state.cancelBuffering(atMs(1_501));
    expect(state.evaluate(atMs(3_001), 1_000)).toBe(false);
    expect(state.evaluate(atMs(3_002), 1_001)).toBe(true);

    state.reset();
    expect(state.evaluate(atMs(100_000), 2_000)).toBe(false);
  });
});
