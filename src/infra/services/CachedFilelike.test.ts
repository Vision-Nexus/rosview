import EventEmitter from 'eventemitter3';
import { describe, expect, it, vi } from 'vitest';

import CachedFilelike, { type FileStream, type FileStreamEvents } from './CachedFilelike';

class TestStream extends EventEmitter<FileStreamEvents> implements FileStream {
  public destroyed = false;
  public destroy = vi.fn(() => {
    this.destroyed = true;
  });

  public emitData(data: number[], offset: number = this.offset): void {
    this.emit('data', new Uint8Array(data), offset);
  }

  public offset = 0;
  public length = 0;

  public emitProgress(received: number, total: number): void {
    this.emit('progress', received, total);
  }
}

class TestFileReader {
  public streams: TestStream[] = [];

  public constructor(private readonly _size = 32) {}

  public async open(): Promise<{ size: number }> {
    return { size: this._size };
  }

  public fetch(offset: number, length: number): FileStream {
    const stream = new TestStream();
    stream.offset = offset;
    stream.length = length;
    this.streams.push(stream);
    return stream;
  }
}

async function flushAsyncWork(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('CachedFilelike range caching', () => {
  it('reads ahead through the bounded block after a tiny indexed read', async () => {
    const reader = new TestFileReader(64);
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 64,
      fetchBlockSizeInBytes: 8,
      maxRequestSizeInBytes: 8,
    });

    const header = filelike.read(0, 2);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(1);
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 8 });
    reader.streams[0].emitData([1, 2, 3, 4, 5, 6, 7, 8]);
    await expect(header).resolves.toEqual(new Uint8Array([1, 2]));

    await expect(filelike.read(2, 6)).resolves.toEqual(new Uint8Array([3, 4, 5, 6, 7, 8]));
    expect(reader.streams).toHaveLength(1);

    const footer = filelike.read(62, 2);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(2);
    expect(reader.streams[1]).toMatchObject({ offset: 56, length: 8 });
    reader.streams[1].emitData([3, 4, 5, 6, 7, 8, 9, 10]);
    await expect(footer).resolves.toEqual(new Uint8Array([9, 10]));
  });

  it('honors an explicit block size above the internal cache storage block', async () => {
    const blockSize = 2 * 1024 * 1024;
    const reader = new TestFileReader(3 * blockSize);
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 4 * blockSize,
      fetchBlockSizeInBytes: blockSize,
      maxRequestSizeInBytes: blockSize,
    });

    const read = filelike.read(blockSize + 1, 1);
    await flushAsyncWork();
    expect(reader.streams[0]).toMatchObject({ offset: blockSize, length: blockSize });
    const block = new Uint8Array(blockSize);
    block[1] = 9;
    reader.streams[0].emit('data', block);
    await expect(read).resolves.toEqual(new Uint8Array([9]));
  });

  it('splits a chunk-sized read into bounded sequential requests', async () => {
    const reader = new TestFileReader(32);
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 32,
      fetchBlockSizeInBytes: 8,
      maxRequestSizeInBytes: 8,
    });

    const read = filelike.read(4, 16);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(1);
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 8 });
    reader.streams[0].emitData([0, 1, 2, 3, 4, 5, 6, 7]);

    await flushAsyncWork();
    expect(reader.streams).toHaveLength(2);
    expect(reader.streams[1]).toMatchObject({ offset: 8, length: 8 });
    reader.streams[1].emitData([8, 9, 10, 11, 12, 13, 14, 15]);

    await flushAsyncWork();
    expect(reader.streams).toHaveLength(3);
    expect(reader.streams[2]).toMatchObject({ offset: 16, length: 8 });
    reader.streams[2].emitData([16, 17, 18, 19, 20, 21, 22, 23]);

    await expect(read).resolves.toEqual(
      new Uint8Array([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
    );
    expect(reader.streams.every((stream) => stream.length <= 8)).toBe(true);
  });

  it('serves a repeat read from the downloaded read-ahead block', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    const initial = filelike.read(3, 1);
    await flushAsyncWork();
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 32 });
    reader.streams[0].emitData(Array.from({ length: 32 }, (_, index) => index + 4));
    await expect(initial).resolves.toEqual(new Uint8Array([7]));

    await expect(filelike.read(3, 1)).resolves.toEqual(new Uint8Array([7]));
    expect(reader.streams).toHaveLength(1);
    expect(filelike.getDownloadedRanges()).toEqual([{ start: 0, end: 32 }]);
  });

  it('keeps two speculative blocks in flight and advances the queue as either completes', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 32,
      fetchBlockSizeInBytes: 8,
      maxRequestSizeInBytes: 8,
    });

    filelike.prefetch(0, 24, { replace: true });
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(2);
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 8 });
    expect(reader.streams[1]).toMatchObject({ offset: 8, length: 8 });

    reader.streams[0].emitData([0, 1, 2, 3, 4, 5, 6, 7]);
    await flushAsyncWork();
    expect(reader.streams[1].destroyed).toBe(false);
    expect(reader.streams[2]).toMatchObject({ offset: 16, length: 8 });
  });

  it('keeps an unrelated prefetch alive beside a foreground read', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 32,
      fetchBlockSizeInBytes: 8,
      maxRequestSizeInBytes: 8,
    });

    filelike.prefetch(16, 4);
    await flushAsyncWork();
    const read = filelike.read(0, 4);
    await flushAsyncWork();

    expect(reader.streams[0]).toMatchObject({ offset: 16, length: 8 });
    expect(reader.streams[0].destroyed).toBe(false);
    expect(reader.streams[1]).toMatchObject({ offset: 0, length: 8 });
    reader.streams[1].emitData([5, 6, 7, 8, 9, 10, 11, 12]);
    await expect(read).resolves.toEqual(new Uint8Array([5, 6, 7, 8]));
  });

  it('accepts sequential file streams that do not report offsets', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    const read = filelike.read(3, 2);
    await flushAsyncWork();
    reader.streams[0].emit('data', new Uint8Array(Array.from({ length: 32 }, (_, index) => index + 5)));

    await expect(read).resolves.toEqual(new Uint8Array([8, 9]));
  });
});

// Regression tests for a bug where a remote `Filelike` adapter with a mismatched (async/bigint)
// `size()` caused `read(offset, NaN)` calls to hang forever while `CachedFilelike` kept
// re-fetching an already-downloaded ~50MiB block on a loop, with no error ever surfacing. See
// `remoteBagReadable.test.ts` for the corresponding regression test at the adapter boundary.
describe('CachedFilelike input validation', () => {
  it('rejects non-finite read lengths synchronously instead of enqueueing an unsatisfiable request', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32, fetchBlockSizeInBytes: 8 });

    expect(() => filelike.read(4, NaN)).toThrow(/invalid input/);
    expect(() => filelike.read(NaN, 4)).toThrow(/invalid input/);
    expect(() => filelike.read(0, Infinity)).toThrow(/invalid input/);
    await flushAsyncWork();

    // No fetch should ever be scheduled for an unsatisfiable range.
    expect(reader.streams).toHaveLength(0);
  });

  it('rejects negative or non-integer offsets/lengths', () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    expect(() => filelike.read(-1, 4)).toThrow(/invalid input/);
    expect(() => filelike.read(0, -4)).toThrow(/invalid input/);
    expect(() => filelike.read(1.5, 4)).toThrow(/invalid input/);
  });

  it('silently drops malformed prefetch requests instead of scheduling a fetch', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32, fetchBlockSizeInBytes: 8 });

    filelike.prefetch(4, NaN);
    filelike.prefetch(-1, 4);
    filelike.prefetch(1.5, 4);
    await flushAsyncWork();

    expect(reader.streams).toHaveLength(0);
  });
});

describe('CachedFilelike download progress', () => {
  it('forwards stream progress to onDownloadProgress', async () => {
    const reader = new TestFileReader();
    const updates: Array<{ loadedBytes: number; totalBytes: number; transferredBytes: number }> = [];
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 32,
      fetchBlockSizeInBytes: 8,
      onDownloadProgress: (info) => updates.push({ ...info }),
    });

    const readPromise = filelike.read(0, 8);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(1);

    reader.streams[0].emitProgress(4, 8);
    reader.streams[0].emitData([0, 1, 2, 3, 4, 5, 6, 7]);
    await readPromise;

    expect(updates.some((update) => update.loadedBytes === 4 && update.totalBytes === 8)).toBe(true);
    expect(updates[0].transferredBytes).toBeGreaterThan(0);
  });
});

describe('CachedFilelike avoids re-fetching already-satisfied ranges', () => {
  it('does not issue a second fetch for a block that is already fully downloaded', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32, fetchBlockSizeInBytes: 8 });

    const firstRead = filelike.read(0, 8);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(1);

    reader.streams[0].emitData([0, 1, 2, 3, 4, 5, 6, 7]);
    await expect(firstRead).resolves.toEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]));

    // Requesting the exact same already-downloaded range again must be served from cache,
    // not trigger a new HTTP-equivalent fetch.
    const secondRead = await filelike.read(0, 8);
    expect(secondRead).toEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]));
    expect(reader.streams).toHaveLength(1);
  });
});

describe('CachedFilelike bounded error retries', () => {
  it('gives up after a bounded number of consecutive errors, even when failures are spaced beyond the 100ms rapid-fault window', async () => {
    let now = 0;
    const dateNowSpy = vi.spyOn(Date, 'now').mockImplementation(() => now);
    try {
      const reader = new TestFileReader();
      const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32, fetchBlockSizeInBytes: 8 });

      const readPromise = filelike.read(0, 8);
      await flushAsyncWork();

      let settled = false;
      void readPromise.catch(() => {
        settled = true;
      });

      for (let i = 0; i < 20 && !settled; i++) {
        const stream = reader.streams[reader.streams.length - 1];
        now += 200; // well beyond the old 100ms rapid-double-fault window
        stream.emit('error', new Error(`boom ${i}`));
        await flushAsyncWork();
      }

      await expect(readPromise).rejects.toThrow(/giving up/);
      // The retry budget must be small and bounded — not "keep retrying forever".
      expect(reader.streams.length).toBeLessThan(20);
    } finally {
      dateNowSpy.mockRestore();
    }
  });
});
