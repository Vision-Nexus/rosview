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
  it('reads tiny header and footer ranges without block amplification', async () => {
    const reader = new TestFileReader(64);
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 64 });

    const header = filelike.read(0, 2);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(1);
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 2 });
    reader.streams[0].emitData([1, 2]);
    await expect(header).resolves.toEqual(new Uint8Array([1, 2]));

    const footer = filelike.read(62, 2);
    await flushAsyncWork();
    expect(reader.streams).toHaveLength(2);
    expect(reader.streams[1]).toMatchObject({ offset: 62, length: 2 });
    reader.streams[1].emitData([3, 4]);
    await expect(footer).resolves.toEqual(new Uint8Array([3, 4]));
    expect(filelike.getDownloadedRanges()).toEqual([
      { start: 0, end: 2 },
      { start: 62, end: 64 },
    ]);
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
    expect(reader.streams[0]).toMatchObject({ offset: 4, length: 8 });
    reader.streams[0].emitData([4, 5, 6, 7, 8, 9, 10, 11]);

    await flushAsyncWork();
    expect(reader.streams).toHaveLength(2);
    expect(reader.streams[1]).toMatchObject({ offset: 12, length: 8 });
    reader.streams[1].emitData([12, 13, 14, 15, 16, 17, 18, 19]);

    await expect(read).resolves.toEqual(new Uint8Array([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]));
    expect(reader.streams.every((stream) => stream.length <= 8)).toBe(true);
  });

  it('serves a repeat read from the exact downloaded range', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    const initial = filelike.read(3, 1);
    await flushAsyncWork();
    expect(reader.streams[0]).toMatchObject({ offset: 3, length: 1 });
    reader.streams[0].emitData([7]);
    await expect(initial).resolves.toEqual(new Uint8Array([7]));

    await expect(filelike.read(3, 1)).resolves.toEqual(new Uint8Array([7]));
    expect(reader.streams).toHaveLength(1);
    expect(filelike.getDownloadedRanges()).toEqual([{ start: 3, end: 4 }]);
  });

  it('retains a completed child range when a stale prefetch is cancelled', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({
      fileReader: reader,
      cacheSizeInBytes: 32,
      fetchBlockSizeInBytes: 8,
      maxRequestSizeInBytes: 8,
    });

    filelike.prefetch(0, 8, { replace: true });
    await flushAsyncWork();
    expect(reader.streams[0]).toMatchObject({ offset: 0, length: 8 });
    reader.streams[0].emitData([4, 5, 6, 7], 4);

    filelike.prefetch(16, 4, { replace: true });
    await flushAsyncWork();
    expect(reader.streams[0].destroyed).toBe(true);
    expect(reader.streams[1]).toMatchObject({ offset: 16, length: 4 });
    expect(filelike.getDownloadedRanges()).toEqual([{ start: 4, end: 8 }]);

    await expect(filelike.read(4, 4)).resolves.toEqual(new Uint8Array([4, 5, 6, 7]));
    expect(reader.streams).toHaveLength(2);
  });

  it('lets a foreground read interrupt an unrelated prefetch', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    filelike.prefetch(16, 4);
    await flushAsyncWork();
    const read = filelike.read(0, 4);
    await flushAsyncWork();

    expect(reader.streams[0].destroyed).toBe(true);
    expect(reader.streams[1]).toMatchObject({ offset: 0, length: 4 });
    reader.streams[1].emitData([5, 6, 7, 8]);
    await expect(read).resolves.toEqual(new Uint8Array([5, 6, 7, 8]));
  });

  it('accepts sequential file streams that do not report offsets', async () => {
    const reader = new TestFileReader();
    const filelike = new CachedFilelike({ fileReader: reader, cacheSizeInBytes: 32 });

    const read = filelike.read(3, 2);
    await flushAsyncWork();
    reader.streams[0].emit('data', new Uint8Array([8, 9]));

    await expect(read).resolves.toEqual(new Uint8Array([8, 9]));
  });
});
