import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { MessageEvent } from '@/core/types/ros';

const state = vi.hoisted(() => ({
  cursor: undefined as undefined | {
    next: ReturnType<typeof vi.fn>;
    end: ReturnType<typeof vi.fn>;
  },
  sources: [] as Array<{
    initialize: ReturnType<typeof vi.fn>;
    getMessageCursor: ReturnType<typeof vi.fn>;
    resolveMessageForHighFrequencyLane: ReturnType<typeof vi.fn>;
    terminate: ReturnType<typeof vi.fn>;
  }>,
  workers: [] as unknown[],
  loadZstdWasmBinary: vi.fn<() => Promise<ArrayBuffer>>(),
  zstdWasmBinary: new ArrayBuffer(8),
}));

vi.mock('@/infra/workers/preloadWorkerWasm', () => ({
  loadZstdWasmBinary: state.loadZstdWasmBinary,
}));

vi.mock('@/infra/workers/mcap.worker.ts?worker&inline', () => ({
  default: class MockMcapWorker {
    constructor() {
      state.workers.push(this);
    }
  },
}));

vi.mock('@/infra/workers/WorkerSerializedSource', () => ({
  WorkerSerializedSource: class MockWorkerSerializedSource {
    initialize = vi.fn(async () => undefined);
    getMessageCursor = vi.fn(async () => state.cursor);
    resolveMessageForHighFrequencyLane = vi.fn((event: MessageEvent) => event);
    terminate = vi.fn();

    constructor(_worker: Worker) {
      state.sources.push(this);
    }
  },
}));

import { streamRemoteMcapMessages } from './streamRemoteMcapMessages';
import type { StreamRemoteMcapMessagesOptions } from './streamRemoteMcapMessages';
import { streamRemoteMcapMessages as streamRemoteMcapMessagesFromPublicApi } from '@/entrypoints/index';

function message(topic: string, sec: number): MessageEvent<{ value: number }> {
  return {
    topic,
    receiveTime: { sec, nsec: 0 },
    publishTime: { sec, nsec: 0 },
    message: { value: sec },
    schemaName: 'example/Message',
  };
}

function cursorFor(messages: MessageEvent[]): { next: ReturnType<typeof vi.fn>; end: ReturnType<typeof vi.fn> } {
  const next = vi.fn<() => Promise<IteratorResult<MessageEvent>>>();
  for (const event of messages) {
    next.mockResolvedValueOnce({ done: false, value: event });
  }
  next.mockResolvedValue({ done: true, value: undefined });
  return { next, end: vi.fn(async () => undefined) };
}

function streamOptions(overrides: Partial<StreamRemoteMcapMessagesOptions> = {}) {
  return {
    url: '/virtual-mcap/immutable-recording',
    totalBytes: 4_096,
    topics: ['/selected'],
    start: { sec: 0, nsec: 0 },
    end: { sec: 900, nsec: 0 },
    ...overrides,
  };
}

describe('streamRemoteMcapMessages', () => {
  beforeEach(() => {
    state.cursor = undefined;
    state.sources.length = 0;
    state.workers.length = 0;
    state.loadZstdWasmBinary.mockReset();
    state.zstdWasmBinary = new ArrayBuffer(8);
    state.loadZstdWasmBinary.mockResolvedValue(state.zstdWasmBinary);
  });

  it('exports the stream helper from the package entrypoint', () => {
    expect(streamRemoteMcapMessagesFromPublicApi).toBe(streamRemoteMcapMessages);
  });

  it('rejects a direct cross-origin signed URL instead of bypassing the service-worker cache', async () => {
    vi.stubGlobal('window', {
      location: {
        href: 'https://app.example.test/analysis',
        origin: 'https://app.example.test',
      },
    });

    try {
      const iterator = streamRemoteMcapMessages(
        streamOptions({ url: 'https://storage.example.test/recording.mcap?signature=lease' }),
      );
      await expect(iterator.next()).rejects.toThrow('same-origin service-worker virtual MCAP URL');
      expect(state.sources).toHaveLength(0);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('streams the full explicit range beyond a playback-sized window and filters selected topics', async () => {
    state.cursor = cursorFor([
      message('/selected', 1),
      message('/other', 450),
      message('/selected', 900),
      message('/selected', 901),
    ]);

    const received: MessageEvent[] = [];
    for await (const event of streamRemoteMcapMessages(streamOptions())) {
      received.push(event);
    }

    expect(received.map((event) => [event.topic, event.receiveTime.sec])).toEqual([
      ['/selected', 1],
      ['/selected', 900],
    ]);
    const source = state.sources[0];
    expect(source.initialize).toHaveBeenCalledWith({
      url: '/virtual-mcap/immutable-recording',
      knownTotalBytes: 4_096,
      zstdWasmBinary: state.zstdWasmBinary,
      autoDataQualityScan: false,
    });
    expect(source.getMessageCursor).toHaveBeenCalledWith({
      startTime: { sec: 0, nsec: 0 },
      endTime: { sec: 900, nsec: 0 },
      topics: ['/selected'],
    });
    expect(source.resolveMessageForHighFrequencyLane).toHaveBeenCalledWith(expect.anything(), {
      copyPayload: true,
    });
    expect(state.cursor.end).toHaveBeenCalledTimes(1);
    expect(source.terminate).toHaveBeenCalledTimes(1);
  });

  it('closes its cursor and worker when the consumer cancels iteration', async () => {
    state.cursor = cursorFor([message('/selected', 1), message('/selected', 2)]);

    for await (const _event of streamRemoteMcapMessages(streamOptions())) {
      break;
    }

    expect(state.cursor.end).toHaveBeenCalledTimes(1);
    expect(state.sources[0].terminate).toHaveBeenCalledTimes(1);
  });

  it('terminates the dedicated reader immediately when an abort signal cancels a pending read', async () => {
    const pendingRead = new Promise<IteratorResult<MessageEvent>>(() => undefined);
    state.cursor = {
      next: vi.fn(() => pendingRead),
      end: vi.fn(async () => undefined),
    };
    const controller = new AbortController();
    const iterator = streamRemoteMcapMessages(streamOptions({ signal: controller.signal }));
    const pendingNext = iterator.next();

    await vi.waitFor(() => expect(state.cursor?.next).toHaveBeenCalledTimes(1));
    controller.abort();

    await expect(pendingNext).rejects.toMatchObject({ name: 'AbortError' });
    expect(state.cursor.end).toHaveBeenCalledTimes(1);
    expect(state.sources[0].terminate).toHaveBeenCalledTimes(1);
  });

  it('closes the cursor and worker when a reader error is raised', async () => {
    const readError = new Error('remote read failed');
    state.cursor = {
      next: vi.fn<() => Promise<IteratorResult<MessageEvent>>>().mockRejectedValue(readError),
      end: vi.fn(async () => undefined),
    };

    const iterator = streamRemoteMcapMessages(streamOptions());
    await expect(iterator.next()).rejects.toThrow('remote read failed');

    expect(state.cursor.end).toHaveBeenCalledTimes(1);
    expect(state.sources[0].terminate).toHaveBeenCalledTimes(1);
  });
});
