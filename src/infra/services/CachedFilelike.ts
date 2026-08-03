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

  #currentConnection: { stream: FileStream; range: Range; nextOffset: number; kind: "read" | "prefetch" } | undefined;

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
          const currentPrefetch = this.#currentConnection?.kind === "prefetch" ? this.#currentConnection : undefined;
          const currentPrefetchMatches =
            currentPrefetch != undefined &&
            this.#rangeOverlaps(range, currentPrefetch.range);
          this.#prefetchRequests = [];
          if (currentPrefetch && !currentPrefetchMatches) {
            currentPrefetch.stream.destroy();
            this.#currentConnection = undefined;
          }
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
    if (
      firstReadRange &&
      this.#currentConnection?.kind === "prefetch" &&
      !this.#rangeOverlaps(firstReadRange, this.#currentConnection.range)
    ) {
      this.#currentConnection.stream.destroy();
      this.#currentConnection = undefined;
    }

    if (!this.#currentConnection && firstReadRange) {
      const readFetchRange = this.#getNextFetchRange(firstReadRange, size);
      if (readFetchRange) {
        this.#setConnection(readFetchRange, "read");
        return;
      }
    }

    if (!this.#currentConnection && this.#readRequests.length === 0) {
      const prefetchRange = this.#prefetchRequests[0];
      if (prefetchRange) {
        const prefetchFetchRange = this.#getNextFetchRange(prefetchRange, size);
        if (prefetchFetchRange) {
          this.#setConnection(prefetchFetchRange, "prefetch");
          return;
        }
      }
    }
  }

  #getNextFetchRange(queryRange: Range, fileSize: number): Range | undefined {
    if (queryRange.start >= fileSize) {
      return undefined;
    }
    const bounded = { start: queryRange.start, end: Math.min(queryRange.end, fileSize) };
    const missing = missingRanges(bounded, this.#coveredOrInFlightRanges())[0];
    if (!missing) {
      return undefined;
    }
    const requestSize = Math.min(this.#fetchBlockSizeInBytes, this.#maxRequestSizeInBytes);
    return { start: missing.start, end: Math.min(missing.end, missing.start + requestSize) };
  }

  #coveredOrInFlightRanges(): Range[] {
    const ranges = this.#virtualBuffer.getRangesWithData().map((range) => ({ ...range }));
    if (this.#currentConnection) {
      ranges.push({ ...this.#currentConnection.range });
    }
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
    if (this.#currentConnection) {
      const currentConnection = this.#currentConnection;
      currentConnection.stream.destroy();
    }

    const stream = this.#fileReader.fetch(range.start, range.end - range.start);
    this.#currentConnection = { stream, range, nextOffset: range.start, kind };

    stream.on("error", (error: Error) => {
      console.error(`Connection error @ ${range.start}-${range.end}:`, error);
      const currentConnection = this.#currentConnection;
      if (!currentConnection || stream !== currentConnection.stream) {
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
      currentConnection.stream.destroy();
      this.#currentConnection = undefined;
      this.#updateState();
    });

    stream.on("data", (chunk: Uint8Array, chunkOffset?: number) => {
      const currentConnection = this.#currentConnection;
      if (!currentConnection || stream !== currentConnection.stream) {
        return;
      }

      if (this.#lastErrorTime != undefined) {
        this.#lastErrorTime = undefined;
        if (this.#keepReconnectingCallback) {
          this.#keepReconnectingCallback(false);
        }
      }

      const offset = chunkOffset ?? currentConnection.nextOffset;
      currentConnection.nextOffset = Math.max(currentConnection.nextOffset, offset + chunk.byteLength);
      this.#virtualBuffer.copyFrom(chunk, offset);

      if (this.#virtualBuffer.hasData(range.start, range.end)) {
        stream.destroy();
        this.#currentConnection = undefined;
      }

      this.#updateState();
    });
  }
}
