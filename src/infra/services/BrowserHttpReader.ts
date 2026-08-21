export type HttpReadProgress = (received: number, expected: number) => void;

export interface HttpReader {
  size(): number;
  read(offset: number, length: number, signal?: AbortSignal, onProgress?: HttpReadProgress): Promise<Uint8Array>;
}

export type BrowserHttpReaderOptions = {
  /**
   * Optional hint from a dataset manifest (`sizeBytes`). When set, skips the
   * initial Range probe. For presigned S3 URLs, prefer fixing bucket CORS so
   * `Content-Range` / `Content-Length` are exposed and this can stay unset.
   */
  knownTotalBytes?: number;
  /** Upper bound for an individual HTTP Range request. */
  maxRangeRequestSizeInBytes?: number;
};

type RangeChunkCallback = (chunk: Uint8Array, offset: number) => void;

/** Keeps a single HTTP Range request within a reasonable browser cache unit. */
const DEFAULT_MAX_RANGE_REQUEST_SIZE = 8 * 1024 * 1024;

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const MAX_FETCH_ATTEMPTS = 4;
const RETRY_BASE_MS = 300;

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason instanceof Error ? signal.reason : new Error('Aborted'));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t);
        reject(signal.reason instanceof Error ? signal.reason : new Error('Aborted'));
      },
      { once: true },
    );
  });
}

function parseContentRange(value: string | null): { start: number; end: number; size: number } | undefined {
  const match = /^bytes\s+(\d+)-(\d+)\/(\d+)$/i.exec(value ?? '');
  if (!match) {
    return undefined;
  }

  const start = Number(match[1]);
  const end = Number(match[2]);
  const size = Number(match[3]);
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    !Number.isSafeInteger(size) ||
    start < 0 ||
    end < start ||
    size <= end
  ) {
    return undefined;
  }
  return { start, end, size };
}

export class BrowserHttpReader implements HttpReader {
  private _url: string;
  private _knownTotalBytes?: number;
  private _maxRangeRequestSizeInBytes: number;
  private _size: number = -1;

  constructor(url: string, options?: BrowserHttpReaderOptions) {
    this._url = url;
    this._knownTotalBytes = options?.knownTotalBytes;
    const configuredMaxRangeRequestSize = options?.maxRangeRequestSizeInBytes;
    this._maxRangeRequestSizeInBytes =
      typeof configuredMaxRangeRequestSize === 'number' &&
      Number.isFinite(configuredMaxRangeRequestSize) &&
      configuredMaxRangeRequestSize > 0
        ? Math.max(1, Math.floor(configuredMaxRangeRequestSize))
        : DEFAULT_MAX_RANGE_REQUEST_SIZE;
  }

  async initialize(): Promise<void> {
    if (
      typeof this._knownTotalBytes === 'number' &&
      Number.isFinite(this._knownTotalBytes) &&
      this._knownTotalBytes > 0
    ) {
      this._size = Math.floor(this._knownTotalBytes);
      return;
    }

    // Range GET (bytes=0-0): works with presigned GET URLs (HEAD uses a different signature).
    // Requires bucket CORS ExposeHeaders to include Content-Range and/or Content-Length.
    const probe = await this.#fetchWithRetry(this._url, { headers: { Range: 'bytes=0-0' } });
    if (!probe.ok && probe.status !== 206) {
      throw new Error(`Failed to fetch ${this._url}: ${probe.status} ${probe.statusText}`);
    }
    if (probe.status === 206) {
      const contentRange = parseContentRange(probe.headers.get('Content-Range'));
      if (!contentRange || contentRange.start !== 0 || contentRange.end !== 0) {
        throw new Error(`Invalid Content-Range for size probe from ${this._url}`);
      }
      this.#assertContentLength(probe, 1);
      const body = new Uint8Array(await probe.arrayBuffer());
      if (body.byteLength !== 1) {
        throw new Error(`Invalid size probe length from ${this._url}: expected 1 byte, got ${body.byteLength}`);
      }
      this._size = contentRange.size;
    } else if (probe.ok) {
      const cl = probe.headers.get('Content-Length');
      if (cl) {
        this._size = parseInt(cl, 10);
      } else {
        const buf = await probe.arrayBuffer();
        this._size = buf.byteLength;
      }
    }
    if (this._size <= 0) {
      throw new Error(
        `Could not determine file size for ${this._url} (no Content-Range or Content-Length). ` +
          `Ensure the S3 bucket CORS rule exposes Content-Range, Content-Length, and Accept-Ranges for your app origin.`,
      );
    }
    if (import.meta.env.DEV) {
      const acceptRanges = probe.headers.get('Accept-Ranges');
      if (!acceptRanges || acceptRanges === 'none') {
        console.debug(
          `Accept-Ranges header not explicitly found or set to none, but proceeding with Range requests: ${this._url}`,
        );
      }
    }
  }

  size(): number {
    return this._size;
  }

  async read(
    offset: number,
    length: number,
    signal?: AbortSignal,
    onProgress?: HttpReadProgress,
  ): Promise<Uint8Array> {
    const result = new Uint8Array(length);
    await this.readRanges(
      offset,
      length,
      (chunk, chunkOffset) => {
        result.set(chunk, chunkOffset - offset);
      },
      signal,
      onProgress,
    );
    return result;
  }

  /**
   * Reads a range as independently completed HTTP subranges. Consumers that
   * cache data incrementally can retain finished children if the parent read
   * is later cancelled.
   */
  async readRanges(
    offset: number,
    length: number,
    onChunk: RangeChunkCallback,
    signal?: AbortSignal,
    onProgress?: HttpReadProgress,
  ): Promise<void> {
    if (
      !Number.isSafeInteger(offset) ||
      !Number.isSafeInteger(length) ||
      !Number.isSafeInteger(offset + length) ||
      offset < 0 ||
      length < 0
    ) {
      throw new Error(`Invalid range ${offset}-${offset + length}`);
    }
    if (length === 0) {
      return;
    }

    const end = offset + length;
    const parts: Array<{ start: number; length: number }> = [];
    for (let position = offset; position < end; position += this._maxRangeRequestSizeInBytes) {
      parts.push({
        start: position,
        length: Math.min(this._maxRangeRequestSizeInBytes, end - position),
      });
    }
    const receivedByPart = new Array<number>(parts.length).fill(0);
    await Promise.all(
      parts.map(async (part, index) => {
        const chunk = await this.#readOneRange(part.start, part.length, signal, (received) => {
          receivedByPart[index] = received;
          onProgress?.(receivedByPart.reduce((sum, value) => sum + value, 0), length);
        });
        if (chunk.byteLength !== part.length) {
          throw new Error(`Unexpected response length ${chunk.byteLength} for range length ${part.length}`);
        }
        onChunk(chunk, part.start);
      }),
    );
  }

  async #fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
    const signal = init.signal ?? undefined;
    let delay = RETRY_BASE_MS;
    for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt++) {
      const response = await fetch(url, init);
      if (RETRYABLE_STATUS.has(response.status) && attempt < MAX_FETCH_ATTEMPTS) {
        try {
          await response.body?.cancel();
        } catch {
          /* ignore */
        }
        await sleep(delay, signal);
        delay = Math.min(delay * 2, 4000);
        continue;
      }
      return response;
    }
    throw new Error(`fetchWithRetry exhausted for ${url}`);
  }

  #assertContentLength(response: Response, expectedLength: number): void {
    const value = response.headers.get('Content-Length');
    if (value == undefined) {
      return;
    }
    const length = Number(value);
    if (!Number.isSafeInteger(length) || length !== expectedLength) {
      throw new Error(`Invalid Content-Length: expected ${expectedLength} bytes, got ${value}`);
    }
  }

  async #readOneRange(
    offset: number,
    length: number,
    signal?: AbortSignal,
    onProgress?: HttpReadProgress,
  ): Promise<Uint8Array> {
    const end = offset + length - 1;
    const response = await this.#fetchWithRetry(this._url, {
      headers: { Range: `bytes=${offset}-${end}` },
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to read range ${offset}-${end} from ${this._url}: ${response.status} ${response.statusText}`,
      );
    }

    const headerLength = Number(response.headers.get('Content-Length') ?? '');
    const expected = Number.isFinite(headerLength) && headerLength > 0 ? headerLength : length;
    const buffer = await this.#readResponseBody(response, expected, onProgress);

    if (response.status === 206) {
      const contentRange = parseContentRange(response.headers.get('Content-Range'));
      if (!contentRange || contentRange.start !== offset || contentRange.end !== end) {
        throw new Error(`Invalid Content-Range for requested range ${offset}-${end}`);
      }
      if (this._size >= 0 && contentRange.size !== this._size) {
        throw new Error(`Unexpected total size in Content-Range: ${contentRange.size}`);
      }
      this.#assertContentLength(response, length);
      if (buffer.byteLength !== length) {
        throw new Error(`Unexpected response length ${buffer.byteLength} for range length ${length}`);
      }
      return buffer;
    }

    if (buffer.byteLength === length) {
      return buffer;
    }
    if (buffer.byteLength > length && buffer.byteLength >= offset + length) {
      return buffer.subarray(offset, offset + length);
    }
    if (buffer.byteLength > length) {
      return buffer.subarray(0, length);
    }
    throw new Error(`Unexpected response length ${buffer.byteLength} for range length ${length}`);
  }

  async #readResponseBody(
    response: Response,
    expected: number,
    onProgress?: HttpReadProgress,
  ): Promise<Uint8Array> {
    if (!response.body) {
      const buf = new Uint8Array(await response.arrayBuffer());
      onProgress?.(buf.byteLength, expected > 0 ? expected : buf.byteLength);
      return buf;
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        onProgress?.(received, expected > 0 ? expected : received);
      }
    }

    const out = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return out;
  }
}
