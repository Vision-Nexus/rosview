import {
  createIndexedMcapWriter,
  encodeCompressedVideoCdr,
  readFixture,
  registerCompressedVideoChannel,
  writeExample,
} from './mcap-fixture-utils.mjs';

const keyBytes = readFixture('media/h265-key.bin');
const deltaBytes = readFixture('media/h265-delta.bin');
const { writer, writable } = await createIndexedMcapWriter();
const channelId = await registerCompressedVideoChannel('/camera/robocap/video', writer);
const frames = [
  { ts: 1_000_000_000n, data: keyBytes },
  { ts: 1_500_000_000n, data: deltaBytes },
  { ts: 2_000_000_000n, data: keyBytes },
  { ts: 2_500_000_000n, data: deltaBytes },
  { ts: 3_000_000_000n, data: keyBytes },
];

for (const [index, { ts, data }] of frames.entries()) {
  const timestamp = {
    sec: Number(ts / 1_000_000_000n),
    nsec: Number(ts % 1_000_000_000n),
  };
  await writer.addMessage({
    channelId,
    sequence: index + 1,
    logTime: ts,
    publishTime: ts,
    data: encodeCompressedVideoCdr(timestamp, 'h265', data),
  });
}

await writer.end();
writeExample('test_h265.mcap', writable.getBuffer());
