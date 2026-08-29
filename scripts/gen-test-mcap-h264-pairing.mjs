import { McapWriter } from '@mcap/core';
import {
  BufferWritable,
  createIndexedMcapWriter,
  encodeCompressedImageCdr,
  readFixture,
  registerCompressedImageChannel,
  writeExample,
} from './mcap-fixture-utils.mjs';

const keyBytes = readFixture('media/h264-key.bin');
const deltaBytes = readFixture('media/h264-delta.bin');
const frameTimes = [
  1_000_000_000n,
  1_100_000_000n,
  1_200_000_000n,
  3_000_000_000n,
  3_100_000_000n,
  5_000_000_000n,
];

for (let camera = 0; camera < 5; camera += 1) {
  const { writer, writable } = await createIndexedMcapWriter();
  const channelId = await registerCompressedImageChannel(
    `/robot0/sensor/camera${camera}/compressed`,
    writer,
  );
  for (const [index, timestamp] of frameTimes.entries()) {
    const stamp = {
      sec: Number(timestamp / 1_000_000_000n),
      nsec: Number(timestamp % 1_000_000_000n),
    };
    await writer.addMessage({
      channelId,
      sequence: index + 1,
      logTime: timestamp,
      publishTime: timestamp,
      data: encodeCompressedImageCdr(stamp, 'h264', index % 3 === 0 ? keyBytes : deltaBytes),
    });
  }
  await writer.end();
  writeExample(`test_h264_pair_camera${camera}.mcap`, writable.getBuffer());
}

const annotationWritable = new BufferWritable();
const annotationWriter = new McapWriter({ writable: annotationWritable });
await annotationWriter.start({ library: 'rosview-fixture', profile: '' });
const annotationSchemaId = await annotationWriter.registerSchema({
  name: 'foxglove.ImageAnnotations',
  encoding: 'jsonschema',
  data: new TextEncoder().encode(JSON.stringify({ type: 'object' })),
});
const annotationChannels = [];
for (let camera = 0; camera < 5; camera += 1) {
  annotationChannels.push(
    await annotationWriter.registerChannel({
      schemaId: annotationSchemaId,
      topic: `/robot0/perception/handpose/camera${camera}/image_annotations`,
      messageEncoding: 'json',
      metadata: new Map(),
    }),
  );
}
for (const [index, timestamp] of frameTimes.entries()) {
  for (let camera = 0; camera < 5; camera += 1) {
    const stamp = {
      seconds: Number(timestamp / 1_000_000_000n),
      nanos: Number(timestamp % 1_000_000_000n) + camera + 1,
    };
    await annotationWriter.addMessage({
      channelId: annotationChannels[camera],
      sequence: index + 1,
      logTime: timestamp,
      publishTime: timestamp,
      data: new TextEncoder().encode(
        JSON.stringify({
          points: [
            {
              timestamp: stamp,
              type: 'POINTS',
              points: [{ x: 8 + camera * 2, y: 8 + camera * 2 }],
              outline_color: { r: 1, g: 0.3, b: 0.1, a: 1 },
              fill_color: { r: 1, g: 0.3, b: 0.1, a: 1 },
              thickness: 4,
            },
          ],
        }),
      ),
    });
  }
}
await annotationWriter.end();
writeExample('test_h264_pair_annotations.mcap', annotationWritable.getBuffer());
