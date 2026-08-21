import type { TimeRange } from '@/core/types/ros';
import type { Range } from '@/shared/utils/ranges';
import { fromNano, toNano } from '@/shared/utils/time';

export type ChunkCoverage = {
  byteRange: Range;
  timeRange: TimeRange;
  startNs: bigint;
  endNs: bigint;
};

function rangeAtTime(
  segmentStart: TimeRange['start'] | undefined,
  segmentEndNs: bigint | undefined,
  timeNs: bigint,
): TimeRange | undefined {
  if (segmentStart == undefined || segmentEndNs == undefined || toNano(segmentStart) > timeNs || timeNs > segmentEndNs) {
    return undefined;
  }
  return { start: { ...segmentStart }, end: fromNano(segmentEndNs) };
}

export function isByteRangeCovered(query: Range, downloaded: readonly Range[]): boolean {
  return downloaded.some((range) => range.start <= query.start && range.end >= query.end);
}

/**
 * Map currently-downloaded byte ranges onto chunk time coverage.
 * Returns every contiguous playable segment (not only a prefix from file start),
 * so LRU eviction of early chunks does not collapse the buffer bar to empty.
 */
export function getPlayableTimeRanges(
  chunkCoverage: readonly ChunkCoverage[],
  downloadedByteRanges: readonly Range[],
  maxContiguousGapNs: bigint,
): TimeRange[] {
  if (chunkCoverage.length === 0) {
    return [];
  }

  const ranges: TimeRange[] = [];
  let segmentStart: TimeRange['start'] | undefined;
  let segmentEndNs: bigint | undefined;

  const flush = () => {
    if (segmentStart == undefined || segmentEndNs == undefined) {
      return;
    }
    ranges.push({
      start: { ...segmentStart },
      end: fromNano(segmentEndNs),
    });
    segmentStart = undefined;
    segmentEndNs = undefined;
  };

  for (const chunk of chunkCoverage) {
    const covered = isByteRangeCovered(chunk.byteRange, downloadedByteRanges);
    if (!covered) {
      flush();
      continue;
    }

    if (segmentStart == undefined || segmentEndNs == undefined) {
      segmentStart = chunk.timeRange.start;
      segmentEndNs = chunk.endNs;
      continue;
    }

    if (chunk.startNs > segmentEndNs + maxContiguousGapNs) {
      flush();
      segmentStart = chunk.timeRange.start;
      segmentEndNs = chunk.endNs;
      continue;
    }

    if (chunk.endNs > segmentEndNs) {
      segmentEndNs = chunk.endNs;
    }
  }

  flush();
  return ranges;
}

/**
 * Returns the currently cached contiguous playable range containing `timeNs`.
 * A sparse recording can legitimately have gaps between messages, so the
 * configured chunk-gap limit determines whether adjacent chunks share a range.
 */
export function getPlayableTimeRangeAt(
  chunkCoverage: readonly ChunkCoverage[],
  downloadedByteRanges: readonly Range[],
  timeNs: bigint,
  maxContiguousGapNs: bigint,
): TimeRange | undefined {
  let segmentStart: TimeRange['start'] | undefined;
  let segmentEndNs: bigint | undefined;

  for (const chunk of chunkCoverage) {
    if (!isByteRangeCovered(chunk.byteRange, downloadedByteRanges)) {
      const range = rangeAtTime(segmentStart, segmentEndNs, timeNs);
      if (range) {
        return range;
      }
      segmentStart = undefined;
      segmentEndNs = undefined;
      continue;
    }

    if (segmentStart == undefined || segmentEndNs == undefined) {
      segmentStart = chunk.timeRange.start;
      segmentEndNs = chunk.endNs;
      continue;
    }

    if (chunk.startNs > segmentEndNs + maxContiguousGapNs) {
      const range = rangeAtTime(segmentStart, segmentEndNs, timeNs);
      if (range) {
        return range;
      }
      segmentStart = chunk.timeRange.start;
      segmentEndNs = chunk.endNs;
      continue;
    }

    if (chunk.endNs > segmentEndNs) {
      segmentEndNs = chunk.endNs;
    }
  }

  return rangeAtTime(segmentStart, segmentEndNs, timeNs);
}

/** Returns cached playable time after `timeNs`, or zero when the playhead is not cached. */
export function getPlayableAheadMs(
  chunkCoverage: readonly ChunkCoverage[],
  downloadedByteRanges: readonly Range[],
  timeNs: bigint,
  maxContiguousGapNs: bigint,
): number {
  const range = getPlayableTimeRangeAt(chunkCoverage, downloadedByteRanges, timeNs, maxContiguousGapNs);
  if (!range) {
    return 0;
  }
  const endNs = toNano(range.end);
  return Math.max(0, Number(endNs - timeNs) / 1_000_000);
}
