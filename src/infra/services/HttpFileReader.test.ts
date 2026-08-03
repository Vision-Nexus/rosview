import { afterEach, describe, expect, it, vi } from 'vitest';

import { HttpFileReader } from './HttpFileReader';

function rangeResponse(start: number, end: number, total: number): Response {
  const body = Uint8Array.from({ length: end - start + 1 }, (_, index) => start + index);
  return new Response(body, {
    status: 206,
    headers: {
      'Content-Length': String(body.byteLength),
      'Content-Range': `bytes ${start}-${end}/${total}`,
    },
  });
}

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('HttpFileReader', () => {
  it('emits a completed HTTP child before cancelling its unfinished siblings', async () => {
    const pending = new Map<string, { resolve: (response: Response) => void }>();
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const range = new Headers(init?.headers).get('Range');
        if (!range) {
          return Promise.reject(new Error('expected a Range request'));
        }
        return new Promise<Response>((resolve, reject) => {
          init?.signal?.addEventListener(
            'abort',
            () => {
              const error = new Error('Aborted');
              error.name = 'AbortError';
              reject(error);
            },
            { once: true },
          );
          pending.set(range, { resolve });
        });
      }),
    );

    const reader = new HttpFileReader('https://example.test/data', {
      knownTotalBytes: 8,
      maxRangeRequestSizeInBytes: 4,
    });
    const stream = reader.fetch(0, 8);
    const chunks: Array<{ data: Uint8Array; offset: number }> = [];
    stream.on('data', (data, offset) => {
      if (offset == undefined) {
        throw new Error('expected an absolute child offset');
      }
      chunks.push({ data, offset });
    });

    expect([...pending.keys()]).toEqual(['bytes=0-3', 'bytes=4-7']);
    pending.get('bytes=0-3')?.resolve(rangeResponse(0, 3, 8));
    await vi.waitFor(() => {
      expect(chunks).toEqual([{ data: new Uint8Array([0, 1, 2, 3]), offset: 0 }]);
    });

    stream.destroy();
    await flushMicrotasks();
    expect(chunks).toEqual([{ data: new Uint8Array([0, 1, 2, 3]), offset: 0 }]);
  });

  it('emits an error when an HTTP child range is rejected', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 416, statusText: 'Range Not Satisfiable' })),
    );
    const reader = new HttpFileReader('https://example.test/data', {
      knownTotalBytes: 8,
      maxRangeRequestSizeInBytes: 4,
    });
    const stream = reader.fetch(0, 4);

    await new Promise<void>((resolve, reject) => {
      stream.once('data', () => reject(new Error('expected no data from a rejected range')));
      stream.once('error', (error) => {
        expect(error.message).toContain('416');
        resolve();
      });
    });
  });
});
