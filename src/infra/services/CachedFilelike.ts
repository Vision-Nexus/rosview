import VirtualLRUBuffer from '@/shared/utils/VirtualLRUBuffer';
import { missingRanges, type Range } from '@/shared/utils/ranges';
import type { Readable } from '@/core/types/player';
import EventEmitter from "eventemitter3";

export type FileStreamEvents = {
  data: (chunk: Uint8Array, offset?: number) => void;
  error: (err: Error) => void;
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

  #currentReadConnection: { stream: FileStream; range: Range; nextOffset: number } | undefined;
  #currentPrefetchConnection: { stream: FileStream; range: Range; nextOffset: number } | undefined;

  #readRequests: {
    range: Range;
    resolve: (_: Uint8Array) => void;
    reject: (_: Error) => void;
    requestTime: number;
  }[] = [];
  #prefetchRequests: Range[] = [];

  #lastErrorTime?: number;

  public constructor(options: {
    fileReader: FileReader;
    cacheSizeInBytes?: number;
    fetchBlockSizeInBytes?: number;
    maxRequestSizeInBytes?: number;
    preferCacheViews?: boolean;
    keepReconnectingCallback?: (reconnecting: boolean) => void;
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

    const range = { start: offset, end: offset + length };

    if (offset < 0 || length < 0) {
      throw new Error("CachedFilelike#read invalid input");
    }
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

    const range = { start: offset, end: offset + length };
    if (offset < 0 || length < 0 || length > this.#cacheSizeInBytes) {
      return;
    }

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

    this.#readRequests = this.#readRequests.filter(({ range, resolve }) => {
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

    // Keep one speculative block alive beside a foreground read. The ranges are disjoint because
    // #getNextFetchRange treats both active ranges as covered. That avoids aborting a useful CDN
    // transfer whenever an MCAP index read arrives.
    if (!this.#currentPrefetchConnection) {
      const prefetchRange = this.#prefetchRequests[0];
      if (prefetchRange) {
        const prefetchFetchRange = this.#getNextFetchRange(prefetchRange, size);
        if (prefetchFetchRange) {
          this.#setConnection(prefetchFetchRange, "prefetch");
        }
      }
    }
  }

  #getNextFetchRange(queryRange: Range, fileSize: number): Range | undefined {
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
    const readAhead = { start: blockStart, end: Math.min(fileSize, blockStart + requestSize) };
    // A partial existing block must be completed exactly; fetching the whole aligned block would
    // duplicate retained bytes and defeat the cache's range identity.
    return coveredOrInFlight.some((range) => this.#rangeOverlaps(range, readAhead))
      ? missing
      : readAhead;
  }

  #coveredOrInFlightRanges(): Range[] {
    const ranges = this.#virtualBuffer.getRangesWithData().map((range) => ({ ...range }));
    if (this.#currentReadConnection) ranges.push({ ...this.#currentReadConnection.range });
    if (this.#currentPrefetchConnection) ranges.push({ ...this.#currentPrefetchConnection.range });
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
    const currentConnection =
      kind === "read" ? this.#currentReadConnection : this.#currentPrefetchConnection;
    if (currentConnection) return;

    const stream = this.#fileReader.fetch(range.start, range.end - range.start);
    const connection = { stream, range, nextOffset: range.start };
    if (kind === "read") this.#currentReadConnection = connection;
    else this.#currentPrefetchConnection = connection;

    stream.on("error", (error: Error) => {
      const activeConnection =
        kind === "read" ? this.#currentReadConnection : this.#currentPrefetchConnection;
      if (!activeConnection || activeConnection.stream !== stream) return;
      console.error(`Connection error @ ${range.start}-${range.end}:`, error);
      if (kind === "read") this.#currentReadConnection = undefined;
      else this.#currentPrefetchConnection = undefined;
      if (kind === "prefetch") {
        this.#prefetchRequests = this.#prefetchRequests.filter(
          (queued) => queued.start !== range.start || queued.end !== range.end,
        );
        this.#updateState();
        return;
      }

      if (this.#keepReconnectingCallback) {
        if (this.#lastErrorTime == undefined) {
          this.#keepReconnectingCallback(true);
        }
      } else {
        const lastErrorTime = this.#lastErrorTime;
        if (lastErrorTime != undefined && Date.now() - lastErrorTime < 100) {
          this.#closed = true;
          for (const request of this.#readRequests) {
            request.reject(error);
          }
          return;
        }
      }

      this.#lastErrorTime = Date.now();
      stream.destroy();
      this.#updateState();
    });

    stream.on("data", (chunk: Uint8Array, chunkOffset?: number) => {
      const activeConnection =
        kind === "read" ? this.#currentReadConnection : this.#currentPrefetchConnection;
      if (!activeConnection || activeConnection.stream !== stream) return;

      if (kind === "read" && this.#lastErrorTime != undefined) {
        this.#lastErrorTime = undefined;
        if (this.#keepReconnectingCallback) {
          this.#keepReconnectingCallback(false);
        }
      }

      const offset = chunkOffset ?? activeConnection.nextOffset;
      activeConnection.nextOffset = Math.max(activeConnection.nextOffset, offset + chunk.byteLength);
      this.#virtualBuffer.copyFrom(chunk, offset);

      if (this.#virtualBuffer.hasData(range.start, range.end)) {
        stream.destroy();
        if (kind === "read") this.#currentReadConnection = undefined;
        else this.#currentPrefetchConnection = undefined;
      }

      this.#updateState();
    });
  }
}
