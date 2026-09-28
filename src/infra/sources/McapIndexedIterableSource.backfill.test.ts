import { McapIndexedReader, McapWriter } from '@mcap/core';
import { beforeAll, describe, expect, it } from 'vitest';
import { McapIndexedIterableSource } from './McapIndexedIterableSource';

async function sparseSource(): Promise<McapIndexedIterableSource> {
  const chunks: Uint8Array[] = [];
  let position = 0n;
  const writer = new McapWriter({
    writable: {
      position: () => position,
      write: async (bytes) => {
        chunks.push(bytes.slice());
        position += BigInt(bytes.byteLength);
      },
    },
    useChunks: true,
    useChunkIndex: true,
    useStatistics: true,
  });
  await writer.start({ profile: '', library: 'rosview-backfill-test' });
  const schemaId = await writer.registerSchema({
    name: 'sample',
    encoding: 'jsonschema',
    data: new TextEncoder().encode('{"type":"object"}'),
  });
  for (const [topic, times] of [['/calibration', [1]], ['/camera', [10, 20]]] as const) {
    const channelId = await writer.registerChannel({
      topic, schemaId, messageEncoding: 'json', metadata: new Map(),
    });
    for (const sec of times) {
      const time = BigInt(sec) * 1_000_000_000n;
      await writer.addMessage({
        channelId, sequence: sec, logTime: time, publishTime: time,
        data: new TextEncoder().encode(JSON.stringify({ sec })),
      });
    }
  }
  await writer.end();
  const bytes = Buffer.concat(chunks);
  const reader = await McapIndexedReader.Initialize({
    readable: {
      size: async () => BigInt(bytes.byteLength),
      read: async (offset, length) => bytes.subarray(Number(offset), Number(offset + length)),
    },
  });
  const source = new McapIndexedIterableSource(reader);
  await source.initialize();
  return source;
}

describe('McapIndexedIterableSource backfill', () => {
  let source: McapIndexedIterableSource;
  beforeAll(async () => { source = await sparseSource(); });

  it.each([
    [9, []],
    [10, [10]],
    [19, [10]],
    [20, [20]],
  ])('at %i seconds returns only the latest camera message at or before the playhead', async (sec, expected) => {
    const messages = await source.getBackfillMessages({
      time: { sec, nsec: 0 }, topics: ['/camera'],
    });
    expect(messages.map((message) => message.receiveTime.sec)).toEqual(expected);
  });

  it('keeps existing calibration data without filling a later camera gap with a future frame', async () => {
    const messages = await source.getBackfillMessages({
      time: { sec: 2, nsec: 0 }, topics: ['/calibration', '/camera'],
    });
    expect(messages.map((message) => ({ topic: message.topic, data: message.message }))).toEqual([
      { topic: '/calibration', data: { sec: 1 } },
    ]);
  });
});
