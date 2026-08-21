import { afterEach, describe, expect, it, vi } from 'vitest';

import { BrowserHttpReader } from './BrowserHttpReader';

function rangeResponse(start: number, end: number, total: number, body?: Uint8Array): Response {
  const bytes = body ?? Uint8Array.from({ length: end - start + 1 }, (_, index) => start + index);
  return new Response(bytes, {
    status: 206,
    headers: {
      'Content-Length': String(bytes.byteLength),
      'Content-Range': `bytes ${start}-${end}/${total}`,
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('BrowserHttpReader', () => {
  it('splits wide reads into bounded HTTP ranges and preserves byte order', async () => {
    const requestedRanges: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const range = new Headers(init?.headers).get('Range');
        if (!range) {
          throw new Error('expected a Range request');
        }
        requestedRanges.push(range);
        const match = /^bytes=(\d+)-(\d+)$/.exec(range);
        if (!match) {
          throw new Error(`invalid Range ${range}`);
        }
        return rangeResponse(Number(match[1]), Number(match[2]), 16);
      }),
    );

    const reader = new BrowserHttpReader('https://example.test/data', {
      knownTotalBytes: 16,
      maxRangeRequestSizeInBytes: 4,
    });

    await expect(reader.read(2, 10)).resolves.toEqual(new Uint8Array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
    expect(requestedRanges).toEqual(['bytes=2-5', 'bytes=6-9', 'bytes=10-11']);
  });

  it('keeps full-object responses compatible for URLs without Range support', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]))));
    const reader = new BrowserHttpReader('https://example.test/data', { knownTotalBytes: 8 });

    await expect(reader.read(2, 3)).resolves.toEqual(new Uint8Array([2, 3, 4]));
  });

  it('rejects a partial response with a mismatched Content-Range', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(rangeResponse(0, 3, 16)));
    const reader = new BrowserHttpReader('https://example.test/data', { knownTotalBytes: 16 });

    await expect(reader.read(1, 4)).rejects.toThrow('Invalid Content-Range');
  });

  it('rejects a partial response with a short body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(new Uint8Array([1, 2, 3]), {
          status: 206,
          headers: { 'Content-Range': 'bytes 1-4/16' },
        }),
      ),
    );
    const reader = new BrowserHttpReader('https://example.test/data', { knownTotalBytes: 16 });

    await expect(reader.read(1, 4)).rejects.toThrow('Unexpected response length');
  });

  it('rejects a 416 response instead of yielding an empty range', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 416, statusText: 'Range Not Satisfiable' })),
    );
    const reader = new BrowserHttpReader('https://example.test/data', { knownTotalBytes: 8 });
    const chunks: Uint8Array[] = [];

    await expect(reader.readRanges(4, 4, (chunk) => chunks.push(chunk))).rejects.toThrow('416');
    expect(chunks).toEqual([]);
  });

  it('rejects when one bounded child response is short', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const range = new Headers(init?.headers).get('Range');
        if (range === 'bytes=0-1') return rangeResponse(0, 1, 4);
        if (range === 'bytes=2-3') {
          return new Response(new Uint8Array([2]), {
            status: 206,
            headers: { 'Content-Range': 'bytes 2-3/4' },
          });
        }
        throw new Error(`unexpected range ${range}`);
      }),
    );
    const reader = new BrowserHttpReader('https://example.test/data', {
      knownTotalBytes: 4,
      maxRangeRequestSizeInBytes: 2,
    });

    await expect(reader.read(0, 4)).rejects.toThrow('Unexpected response length 1 for range length 2');
  });
});
