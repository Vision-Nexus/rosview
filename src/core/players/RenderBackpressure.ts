import type { RenderHealthReport } from '@/core/types/player';
import type { Time } from '@/core/types/ros';
import { toNano } from '@/shared/utils/time';

export const MIN_RENDER_STALL_MS = 1_500;
export const RENDER_STALL_CADENCE_MULTIPLIER = 3;
export const RENDER_RECOVERY_MS = 500;

interface RenderHealthEntry {
  report: RenderHealthReport;
  pendingStartedAtNs?: bigint;
  latestRenderedTimeNs?: bigint;
}

function validIntervalMs(value: number | undefined): number | undefined {
  return value != null && Number.isFinite(value) && value > 0 ? value : undefined;
}

function isEligible(report: RenderHealthReport): boolean {
  return report.visible && report.topic.trim().length > 0;
}

/**
 * Aggregates render progress in media time and applies a wall-clock recovery
 * debounce once every visible panel has completely drained its work.
 */
export class RenderBackpressure {
  private readonly entries = new Map<string, RenderHealthEntry>();
  private buffering = false;
  private recoveryStartedAtMs: number | undefined;

  public update(panelId: string, report: RenderHealthReport, playhead: Time): void {
    const previous = this.entries.get(panelId);
    const topicChanged = previous?.report.topic !== report.topic;
    const visibilityChanged = previous?.report.visible !== report.visible;
    const pendingChanged = previous?.report.pending !== report.pending;
    const becameEligible = previous != null && !isEligible(previous.report) && isEligible(report);
    const nextRenderedNs = report.renderedTime == null ? undefined : toNano(report.renderedTime);
    const renderedAdvanced =
      nextRenderedNs != null &&
      (previous?.latestRenderedTimeNs == null || nextRenderedNs > previous.latestRenderedTimeNs);
    const pendingStarted =
      report.pending &&
      (!previous?.report.pending || topicChanged || becameEligible)
        ? toNano(playhead)
        : previous?.pendingStartedAtNs;

    this.entries.set(panelId, {
      report,
      pendingStartedAtNs: report.pending ? pendingStarted : undefined,
      latestRenderedTimeNs:
        topicChanged || becameEligible
          ? nextRenderedNs
          : renderedAdvanced
            ? nextRenderedNs
            : previous?.latestRenderedTimeNs,
    });

    if (topicChanged || visibilityChanged || pendingChanged || (isEligible(report) && report.pending)) {
      this.recoveryStartedAtMs = undefined;
    }
  }

  public unregister(panelId: string): void {
    this.entries.delete(panelId);
    this.recoveryStartedAtMs = undefined;
  }

  public reset(): void {
    this.entries.clear();
    this.buffering = false;
    this.recoveryStartedAtMs = undefined;
  }

  /** Cancel an automatic recovery without discarding current panel reports. */
  public cancelBuffering(playhead: Time): void {
    const playheadNs = toNano(playhead);
    this.buffering = false;
    this.recoveryStartedAtMs = undefined;
    for (const entry of this.entries.values()) {
      entry.pendingStartedAtNs = entry.report.pending ? playheadNs : undefined;
    }
  }

  public evaluate(playhead: Time, nowMs: number): boolean {
    const eligibleEntries = Array.from(this.entries.values()).filter((entry) =>
      isEligible(entry.report),
    );

    if (!this.buffering) {
      const playheadNs = toNano(playhead);
      const hasBlockingPanel = eligibleEntries.some((entry) => {
        if (!entry.report.pending) return false;
        const baselineNs = maxBigInt(entry.pendingStartedAtNs, entry.latestRenderedTimeNs);
        if (baselineNs == null) return false;
        const lagMs = Math.max(0, Number(playheadNs - baselineNs) / 1e6);
        const thresholdMs = Math.max(
          MIN_RENDER_STALL_MS,
          RENDER_STALL_CADENCE_MULTIPLIER *
            (validIntervalMs(entry.report.averageFrameIntervalMs) ?? 0),
        );
        return lagMs > thresholdMs;
      });
      if (hasBlockingPanel) {
        this.buffering = true;
        this.recoveryStartedAtMs = undefined;
      }
      return this.buffering;
    }

    const allReady = eligibleEntries.every((entry) => !entry.report.pending);
    if (!allReady) {
      this.recoveryStartedAtMs = undefined;
      return true;
    }
    this.recoveryStartedAtMs ??= nowMs;
    if (nowMs - this.recoveryStartedAtMs >= RENDER_RECOVERY_MS) {
      this.buffering = false;
      this.recoveryStartedAtMs = undefined;
    }
    return this.buffering;
  }
}

function maxBigInt(a: bigint | undefined, b: bigint | undefined): bigint | undefined {
  if (a == null) return b;
  if (b == null) return a;
  return a > b ? a : b;
}
