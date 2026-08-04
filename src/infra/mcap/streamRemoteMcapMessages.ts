import type { MessageEvent, Time } from '@/core/types/ros';
import { toNano } from '@/shared/utils/time';
import { WorkerSerializedSource } from '@/infra/workers/WorkerSerializedSource';
import type { IMessageCursor } from '@/infra/workers/types';
import { loadZstdWasmBinary } from '@/infra/workers/preloadWorkerWasm';

/**
 * Parameters for an independent, full-range MCAP read.
 *
 * `url` is the same-origin virtual MCAP URL registered with the host service
 * worker. It must remain mapped to one immutable object while this iterator
 * runs; do not pass a direct signed or leased storage URL.
 * `totalBytes` is that immutable object's frozen byte size and lets the reader
 * open it without a separate size probe.
 */
export interface StreamRemoteMcapMessagesOptions {
  /** Service-worker virtual URL for one immutable remote MCAP object. */
  url: string;
  /** Frozen byte size of the immutable remote MCAP object. */
  totalBytes: number;
  topics: readonly string[];
  /** Inclusive lower receive-time bound. */
  start: Time;
  /** Inclusive upper receive-time bound. */
  end: Time;
  /** Cancels the reader and terminates its dedicated worker. */
  signal?: AbortSignal;
}

function abortError(): Error {
  const error = new Error('Remote MCAP stream aborted');
  error.name = 'AbortError';
  return error;
}

function throwIfAborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted) {
    throw abortError();
  }
}

function raceWithAbort<T>(operation: Promise<T>, signal: AbortSignal | undefined): Promise<T> {
  if (!signal) {
    return operation;
  }
  if (signal.aborted) {
    return Promise.reject(abortError());
  }
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      cleanup();
      reject(abortError());
    };
    const cleanup = () => signal.removeEventListener('abort', onAbort);
    signal.addEventListener('abort', onAbort, { once: true });
    operation.then(
      (value) => {
        cleanup();
        resolve(value);
      },
      (error: unknown) => {
        cleanup();
        reject(error instanceof Error ? error : new Error('Remote MCAP reader failed'));
      },
    );
  });
}


function validateOptions(options: StreamRemoteMcapMessagesOptions): void {
  if (typeof options.url !== 'string' || options.url.length === 0) {
    throw new Error('A remote MCAP URL is required');
  }
  if (typeof window !== 'undefined') {
    const virtualUrl = new URL(options.url, window.location.href);
    if (virtualUrl.origin !== window.location.origin) {
      throw new Error('url must be a same-origin service-worker virtual MCAP URL');
    }
  }
  if (!Number.isSafeInteger(options.totalBytes) || options.totalBytes <= 0) {
    throw new Error('totalBytes must be a positive safe integer');
  }
  if (toNano(options.end) < toNano(options.start)) {
    throw new Error('end must not be earlier than start');
  }
}

/**
 * Open a dedicated MCAP worker and yield decoded messages for `topics` in the
 * inclusive `[start, end]` receive-time range. The worker, reader, cache, and
 * cursor are never shared with a visible player and are terminated when this
 * iterator finishes, is cancelled, or fails.
 */
export async function* streamRemoteMcapMessages<T = unknown>(
  options: StreamRemoteMcapMessagesOptions,
): AsyncIterableIterator<MessageEvent<T>> {
  validateOptions(options);
  const topicSet = new Set(options.topics);
  const topics = [...topicSet];
  if (topics.length === 0) {
    return;
  }

  const startNs = toNano(options.start);
  const endNs = toNano(options.end);
  let source: WorkerSerializedSource | undefined;
  let cursor: IMessageCursor<unknown> | undefined;
  let terminated = false;
  const terminate = () => {
    if (!terminated && source) {
      terminated = true;
      source.terminate();
    }
  };
  const terminateOnAbort = () => terminate();

  try {
    throwIfAborted(options.signal);
    const zstdWasmBinary = await raceWithAbort(loadZstdWasmBinary(), options.signal);
    throwIfAborted(options.signal);

    const { default: McapWorkerClass } = await raceWithAbort(
      import('@/infra/workers/mcap.worker.ts?worker&inline'),
      options.signal,
    );
    source = new WorkerSerializedSource(new McapWorkerClass());
    options.signal?.addEventListener('abort', terminateOnAbort, { once: true });
    await raceWithAbort(
      source.initialize({
        url: options.url,
        knownTotalBytes: options.totalBytes,
        zstdWasmBinary,
        autoDataQualityScan: false,
      }),
      options.signal,
    );
    throwIfAborted(options.signal);

    cursor = await raceWithAbort(
      source.getMessageCursor({
        startTime: options.start,
        endTime: options.end,
        topics,
      }),
      options.signal,
    );

    for (;;) {
      const result = await raceWithAbort(cursor.next(), options.signal);
      if (result.done) {
        return;
      }
      const event = source.resolveMessageForHighFrequencyLane(result.value, { copyPayload: true });
      const receiveTimeNs = toNano(event.receiveTime);
      if (topicSet.has(event.topic) && receiveTimeNs >= startNs && receiveTimeNs <= endNs) {
        yield event as MessageEvent<T>;
      }
    }
  } finally {
    options.signal?.removeEventListener('abort', terminateOnAbort);
    if (cursor) {
      void cursor.end().catch(() => undefined);
    }
    terminate();
  }
}

