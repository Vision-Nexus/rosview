import {
  createIndexedMcapWriter,
  encodeCompressedVideoCdr,
  readFixture,
  registerCompressedVideoChannel,
  writeExample,
} from './mcap-fixture-utils.mjs';

const fixture = JSON.parse(readFixture('media/av1-frames.json').toString());

async function writeRecording(filename, tracks) {
  const { writer, writable } = await createIndexedMcapWriter();
  const channels = await Promise.all(tracks.map((track) =>
    registerCompressedVideoChannel(`/camera/${track.name}/video`, writer)));
  // Three independently restartable GOPs, each with a real dependent delta frame.
  for (let frame = 0; frame < 6; frame++) {
    const ts = 1_000_000_000n + BigInt(frame) * 1_000_000_000n;
    for (const [index, track] of tracks.entries()) {
      await writer.addMessage({
        channelId: channels[index], sequence: frame + 1, logTime: ts, publishTime: ts,
        data: encodeCompressedVideoCdr({ sec: Number(ts / 1_000_000_000n), nsec: 0 },
          track.format, track[frame % 2 === 0 ? 'key' : 'delta']),
      });
    }
  }
  await writer.end();
  writeExample(filename, writable.getBuffer());
}

const av1 = fixture.tracks.map((track) => ({
  name: track.name, format: 'av1', key: Buffer.from(track.key, 'base64'), delta: Buffer.from(track.delta, 'base64'),
}));
for (const track of av1) await writeRecording(`test_${track.name}.mcap`, [track]);
await writeRecording('test_av1_mixed.mcap', [...av1, {
  name: 'h264', format: 'h264', key: readFixture('media/h264-key.bin'), delta: readFixture('media/h264-delta.bin'),
}]);
