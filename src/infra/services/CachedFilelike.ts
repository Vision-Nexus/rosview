import VirtualLRUBuffer from '@/shared/utils/VirtualLRUBuffer';
import { missingRanges, type Range } from '@/shared/utils/ranges';
import type { Readable } from '@/core/types/player';
import EventEmitter from "eventemitter3";

export type FileStreamEvents = {
  data: (chunk: Uint8Array, offset?: number) => void;
  progress: (received: number, total: number) => void;
  error: (err: Error) => void;
};

export type DownloadProgressInfo = {
  loadedBytes: number;
  totalBytes: number;
  transferredBytes: number;
};

export interface FileStream extends EventEmitter<FileStreamEvents> {
  destroy: () => void;
}

export interface FileReader {
  open(): Promise<{ size: number }>;
  fetch(offset: number, length: number): FileStream;
}

const CACHE_STORAGE_BLOCK_SIZE = 1024 * 1024;
const DEFAULT_MAX_REQUEST_SIZE = 8 * 1024 * 1024;
const DEFAULT_FETCH_BLOCK_SIZE = DEFAULT_MAX_REQUEST_SIZE;
const MAX_PARALLEL_PREFETCH_CONNECTIONS = 2;
const PREFETCH_RETRY_DELAY_MS = 500;

/**
 * Max consecutive fetch failures for the *same* logical block before giving up and rejecting
 * pending reads. Previously the only give-up condition was "two errors within 100ms of each
 * other", which never triggers against a server/network that fails slowly-but-persistently
 * (RTT > 100ms) — that failure mode retried forever. This bound guarantees termination
 * regardless of error timing.
 */
const MAX_CONSECUTIVE_BLOCK_ERRORS = 6;

function isFiniteNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

export default class CachedFilelike implements Readable {
  #fileReader: FileReader;
  #cacheSizeInBytes: number = Infinity;
  #maxRequestSizeInBytes: number = DEFAULT_MAX_REQUEST_SIZE;
  #fetchBlockSizeInBytes: number = DEFAULT_FETCH_BLOCK_SIZE;
  #preferCacheViews = false;
  #fileSize?: number;
  #virtualBuffer: VirtualLRUBuffer;
  #closed: boolean = false;
  #keepReconnectingCallback?: (reconnecting: boolean) => void;
  #onDownloadProgress?: (info: DownloadProgressInfo) => void;
  #transferredBytes = 0;

  #currentReadConnection: { stream: FileStream; range: Range; nextOffset: number } | undefined;
  #currentPrefetchConnections: { stream: FileStream; range: Range; nextOffset: number }[] = [];

  #readRequests: {
    range: Range;
    resolve: (_: Uint8Array) => void;
    reject: (_: Error) => void;
    requestTime: number;
  }[] = [];
  #prefetchRequests: Range[] = [];

  #lastErrorTime?: number;
  #nextPrefetchAttemptAtMs = 0;
  #consecutiveBlockErrorCount = 0;

  public constructor(options: {
    fileReader: FileReader;
    cacheSizeInBytes?: number;
    fetchBlockSizeInBytes?: number;
    maxRequestSizeInBytes?: number;
    preferCacheViews?: boolean;
    keepReconnectingCallback?: (reconnecting: boolean) => void;
    onDownloadProgress?: (info: DownloadProgressInfo) => void;
  }) {
    this.#fileReader = options.fileReader;
    this.#cacheSizeInBytes = options.cacheSizeInBytes ?? this.#cacheSizeInBytes;
    this.#maxRequestSizeInBytes = Math.max(
      1,
      Math.min(
        options.maxRequestSizeInBytes ?? DEFAULT_MAX_REQUEST_SIZE,
        Number.isFinite(this.#cacheSizeInBytes) ? this.#cacheSizeInBytes : DEFAULT_MAX_REQUEST_SIZE,
      ),
    );
    this.#fetchBlockSizeInBytes = Math.max(
      1,
      Math.min(options.fetchBlockSizeInBytes ?? DEFAULT_FETCH_BLOCK_SIZE, this.#maxRequestSizeInBytes),
    );
    this.#preferCacheViews = options.preferCacheViews ?? false;
    this.#keepReconnectingCallback = options.keepReconnectingCallback;
    this.#onDownloadProgress = options.onDownloadProgress;
    this.#virtualBuffer = new VirtualLRUBuffer({ size: 0 });
  }

  public async open(): Promise<void> {
    if (this.#fileSize != undefined) {
      return;
    }
    const { size } = await this.#fileReader.open();
    this.#fileSize = size;
    const cacheBlockSize = Math.min(CACHE_STORAGE_BLOCK_SIZE, size);
    if (this.#cacheSizeInBytes >= size) {
      this.#virtualBuffer = new VirtualLRUBuffer({ size, blockSize: cacheBlockSize });
    } else {
      this.#virtualBuffer = new VirtualLRUBuffer({
        size,
        blockSize: cacheBlockSize,
        numberOfBlocks: Math.ceil(this.#cacheSizeInBytes / cacheBlockSize) + 2,
      });
    }
  }

  public async size(): Promise<number> {
    await this.open();
    if (this.#fileSize == undefined) {
      throw new Error("CachedFilelike failed to get file size");
    }
    return this.#fileSize;
  }

  public getDownloadedRanges(): Range[] {
    return this.#virtualBuffer.getRangesWithData().map((range) => ({ ...range }));
  }

  public hasData(offset: number, length: number): boolean {
    return length <= 0 || this.#virtualBuffer.hasData(offset, offset + length);
  }

  public read(offset: number, length: number): Promise<Uint8Array> {
    if (length === 0) {
      return Promise.resolve(new Uint8Array());
    }

    // Fail fast on non-finite / negative / non-integer offsets or lengths (e.g. `NaN` from a
    // caller doing arithmetic on an un-awaited `Promise`). Without this guard, a `NaN` `end`
    // silently turns into a `read()` that can never be satisfied — `hasData()` is never true
    // for a `NaN` bound — while the block-alignment logic keeps computing a plausible-looking,
    // finite fetch range from the (valid) `start` and re-requesting it forever. See
    // `bag.worker.ts`'s remote `Filelike.size()` adapter for the real-world case this fixes.
    if (
      !isFiniteNonNegativeInteger(offset) ||
      !isFiniteNonNegativeInteger(length)
    ) {
      throw new Error(
        `CachedFilelike#read invalid input: offset=${offset}, length=${length} (must be finite non-negative integers)`,
      );
    }

    const range = { start: offset, end: offset + length };

    if (length > this.#cacheSizeInBytes) {
      throw new Error(`Requested more data than cache size: ${length} > ${this.#cacheSizeInBytes}`);
    }

    return new Promise((resolve, reject) => {
      this.open()
        .then(async () => {
          const size = await this.size();
          if (range.end > size) {
            reject(new Error(`CachedFilelike#read past size`));
            return;
          }

          this.#readRequests.push({ range, resolve, reject, requestTime: Date.now() });
          this.#updateState();
        })
        .catch((err: unknown) => {
          reject(err instanceof Error ? err : new Error(String(err)));
        });
    });
  }

  public prefetch(offset: number, length: number, options?: { replace?: boolean }): void {
    if (length <= 0 || this.#closed) {
      return;
    }
    // Best-effort: silently drop malformed prefetch requests rather than let a `NaN`/negative
    // bound reach the same range-alignment code path that `read()` guards against above.
    if (
      !isFiniteNonNegativeInteger(offset) ||
      !isFiniteNonNegativeInteger(length) ||
      length > this.#cacheSizeInBytes
    ) {
      return;
    }

    const range = { start: offset, end: offset + length };

    void this.open()
      .then(async () => {
        const size = await this.size();
        if (range.end > size || this.#virtualBuffer.hasData(range.start, range.end)) {
          return;
        }
        if (options?.replace === true) {
          // A new playhead plan replaces queued speculation, not an already-started request. The
          // service worker can cache only completed ranges, so aborting an in-flight prefetch
          // discards every byte it has received and forces the next seek to redownload it.
          this.#prefetchRequests = [];
        }
        if (this.#prefetchRequests.some((queued) => queued.start === range.start && queued.end === range.end)) {
          return;
        }
        this.#prefetchRequests.push(range);
        this.#updateState();
      })
      .catch((err) => {
        console.warn("CachedFilelike: prefetch skipped", err);
      });
  }

  #updateState(): void {
    if (this.#closed) {
      return;
    }

    this.#readRequests = this.#readRequests.filter(({ range, resolve, reject }) => {
      // Second line of defense: `read()` already rejects non-finite ranges synchronously, but
      // reject here too in case a request ever reaches the queue some other way — an
      // unsatisfiable range must never sit in the queue silently forever.
      if (!Number.isFinite(range.start) || !Number.isFinite(range.end)) {
        reject(new Error(`CachedFilelike: unsatisfiable range [${range.start}, ${range.end})`));
        return false;
      }
      if (!this.#virtualBuffer.hasData(range.start, range.end)) {
        return true;
      }

      const buffer = this.#preferCacheViews
        ? this.#virtualBuffer.viewOrSlice(range.start, range.end)
        : this.#virtualBuffer.slice(range.start, range.end);

      resolve(buffer);
      return false;
    });

    if (this.#fileSize === undefined) return;
    const size = this.#fileSize;

    this.#prefetchRequests = this.#prefetchRequests.filter(
      (range) => !this.#virtualBuffer.hasData(range.start, range.end),
    );
    const firstReadRange = this.#readRequests[0]?.range;
    if (!this.#currentReadConnection && firstReadRange) {
      const readFetchRange = this.#getNextFetchRange(firstReadRange, size);
      if (readFetchRange) {
        this.#setConnection(readFetchRange, "read");
      }
    }

    // A smooth remote stream keeps two disjoint speculative blocks moving behind the playhead.
    // Active prefetches count as covered, so foreground reads cannot duplicate or abort either one.
    while (
      this.#currentPrefetchConnections.length < MAX_PARALLEL_PREFETCH_CONNECTIONS &&
      Date.now() >= this.#nextPrefetchAttemptAtMs
    ) {
      const prefetchRange = this.#prefetchRequests[0];
      if (!prefetchRange) break;
      const prefetchFetchRange = this.#getNextFetchRange(prefetchRange, size);
      if (!prefetchFetchRange) break;
      this.#setConnection(prefetchFetchRange, "prefetch");
    }
  }

  #getNextFetchRange(queryRange: Range, fileSize: number): Range | undefined {
    if (!Number.isFinite(queryRange.start) || !Number.isFinite(queryRange.end)) {
      return undefined;
    }
    if (queryRange.start >= fileSize) {
      return undefined;
    }
    const bounded = { start: queryRange.start, end: Math.min(queryRange.end, fileSize) };
    const coveredOrInFlight = this.#coveredOrInFlightRanges();
    const missing = missingRanges(bounded, coveredOrInFlight)[0];
    if (!missing) {
      return undefined;
    }
    // The virtual service worker caches only exact completed ranges. Align requests to the caller's
    // configured block size so adjacent MCAP index and chunk reads share reusable cache keys.
    const requestSize = Math.min(this.#fetchBlockSizeInBytes, this.#maxRequestSizeInBytes);
    const blockStart = Math.floor(missing.start / requestSize) * requestSize;
    const blockEnd = Math.min(fileSize, blockStart + requestSize);
    const readAhead = { start: blockStart, end: blockEnd };
    // A partial existing block must be completed exactly; fetching the whole aligned block would
    // duplicate retained bytes and defeat the cache's range identity. Keep that completion bounded
    // to its one configured block rather than letting a large queued plan bypass the transport cap.
    return coveredOrInFlight.some((range) => this.#rangeOverlaps(range, readAhead))
      ? { start: missing.start, end: Math.min(missing.end, blockEnd) }
      : readAhead;
  }
  #coveredOrInFlightRanges(): Range[] {
    const ranges = this.#virtualBuffer.getRangesWithData().map((range) => ({ ...range }));
    if (this.#currentReadConnection) ranges.push({ ...this.#currentReadConnection.range });
    ranges.push(...this.#currentPrefetchConnections.map((connection) => ({ ...connection.range })));
    return this.#mergeRanges(ranges);
  }

  #mergeRanges(ranges: Range[]): Range[] {
    const sorted = ranges
      .filter((range) => range.end > range.start)
      .sort((a, b) => a.start - b.start || a.end - b.end);
    const merged: Range[] = [];
    for (const range of sorted) {
      const previous = merged[merged.length - 1];
      if (!previous || range.start > previous.end) {
        merged.push({ ...range });
      } else {
        previous.end = Math.max(previous.end, range.end);
      }
    }
    return merged;
  }

  #rangeOverlaps(a: Range, b: Range): boolean {
    return a.start < b.end && b.start < a.end;
  }

  #setConnection(range: Range, kind: "read" | "prefetch"): void {
    if (
      (kind === "read" && this.#currentReadConnection) ||
      (kind === "prefetch" && this.#currentPrefetchConnections.length >= MAX_PARALLEL_PREFETCH_CONNECTIONS)
    ) {
      return;
    }

    const stream = this.#fileReader.fetch(range.start, range.end - range.start);
    const connection = { stream, range, nextOffset: range.start };
    if (kind === "read") this.#currentReadConnection = connection;
    else this.#currentPrefetchConnections.push(connection);
    const requestTotal = range.end - range.start;
    let requestReceived = 0;

    stream.on("progress", (received: number, total: number) => {
      const active =
        kind === "read"
          ? this.#currentReadConnection === connection
          : this.#currentPrefetchConnections.includes(connection);
      if (!active) return;
      const safeReceived = Math.max(0, received);
      const delta = safeReceived - requestReceived;
      if (delta > 0) {
        this.#transferredBytes += delta;
        requestReceived = safeReceived;
      }
      this.#reportDownloadProgress(safeReceived, total > 0 ? total : requestTotal);
    });

    stream.on("error", (error: Error) => {
      const active =
        kind === "read"
          ? this.#currentReadConnection === connection
          : this.#currentPrefetchConnections.includes(connection);
      if (!active) return;
      console.error(`Connection error @ ${range.start}-${range.end}:`, error);
      if (kind === "read") this.#currentReadConnection = undefined;
      else this.#currentPrefetchConnections = this.#currentPrefetchConnections.filter((item) => item !== connection);
      if (kind === "prefetch") {
        this.#nextPrefetchAttemptAtMs = Date.now() + PREFETCH_RETRY_DELAY_MS;
        this.#prefetchRequests = this.#prefetchRequests.filter(
          (queued) => !this.#rangeOverlaps(queued, range),
        );
        this.#updateState();
        return;
      }

      // Bounded regardless of `keepReconnectingCallback` and independent of the "two errors
      // within 100ms" heuristic below, which never trips against a slowly-but-persistently
      // failing server/network (RTT > 100ms) — that combination used to retry forever.
      this.#consecutiveBlockErrorCount += 1;
      const exhaustedRetryBudget = this.#consecutiveBlockErrorCount >= MAX_CONSECUTIVE_BLOCK_ERRORS;
      const rapidDoubleFault =
        !this.#keepReconnectingCallback &&
        this.#lastErrorTime != undefined &&
        Date.now() - this.#lastErrorTime < 100;

      if (exhaustedRetryBudget || rapidDoubleFault) {
        this.#closed = true;
        const failure = exhaustedRetryBudget
          ? new Error(
              `CachedFilelike: giving up on ${range.start}-${range.end} after ${this.#consecutiveBlockErrorCount} consecutive errors: ${error.message}`,
            )
          : error;
        for (const request of this.#readRequests) {
          request.reject(failure);
        }
        return;
      }

      if (this.#keepReconnectingCallback && this.#lastErrorTime == undefined) {
        this.#keepReconnectingCallback(true);
      }

      this.#lastErrorTime = Date.now();
      stream.destroy();
      this.#updateState();
    });

    stream.on("data", (chunk: Uint8Array, chunkOffset?: number) => {
      const activeConnection =
        kind === "read"
          ? this.#currentReadConnection === connection
          : this.#currentPrefetchConnections.includes(connection);
      if (!activeConnection) return;

      this.#consecutiveBlockErrorCount = 0;
      if (this.#lastErrorTime != undefined) {
        this.#lastErrorTime = undefined;
        if (this.#keepReconnectingCallback) {
          this.#keepReconnectingCallback(false);
        }
      }

      const offset = chunkOffset ?? connection.nextOffset;
      connection.nextOffset = Math.max(connection.nextOffset, offset + chunk.byteLength);
      this.#virtualBuffer.copyFrom(chunk, offset);
      if (requestReceived === 0 && chunk.byteLength > 0) {
        this.#transferredBytes += chunk.byteLength;
        this.#reportDownloadProgress(connection.nextOffset - range.start, requestTotal);
      }

      if (this.#virtualBuffer.hasData(range.start, range.end)) {
        stream.destroy();
        if (kind === "read") this.#currentReadConnection = undefined;
        else {
          this.#currentPrefetchConnections = this.#currentPrefetchConnections.filter((item) => item !== connection);
          this.#nextPrefetchAttemptAtMs = 0;
        }
      }

      this.#updateState();
    });
  }

  #reportDownloadProgress(loadedBytes: number, totalBytes: number): void {
    this.#onDownloadProgress?.({
      loadedBytes,
      totalBytes,
      transferredBytes: this.#transferredBytes,
    });
  }
}
