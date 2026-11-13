import { afterEach, describe, expect, it, vi } from 'vitest';
import fixtures from '../../../../../test-fixtures/media/av1-frames.json';
import type { ImageWorkerFrameEnvelope } from './imageWorkerProtocol';
import { WorkerVideoDecoder } from './workerVideoDecoder';

afterEach(() => vi.unstubAllGlobals());

describe('AV1 native decoder recovery', () => {
  it('switches after a real decoder error and requires a fresh key replay after reset', async () => {
    const configurations: VideoDecoderConfig[] = [];
    const decoders: FakeDecoder[] = [];
    class FakeDecoder {
      state: CodecState = 'unconfigured';
      decodeQueueSize = 0;
      config: VideoDecoderConfig | null = null;
      init: VideoDecoderInit;
      constructor(init: VideoDecoderInit) { this.init = init; decoders.push(this); }
      static async isConfigSupported(config: VideoDecoderConfig) { return { supported: true, config }; }
      configure(config: VideoDecoderConfig) { this.config = config; this.state = 'configured'; configurations.push(config); }
      addEventListener() {}
      close() { this.state = 'closed'; }
      decode(chunk: EncodedVideoChunk) {
        if (this.config?.hardwareAcceleration !== 'prefer-software') {
          this.state = 'closed';
          queueMicrotask(() => this.init.error(new DOMException('Hardware failed', 'EncodingError')));
        } else {
          this.init.output({ timestamp: chunk.timestamp, close: vi.fn() } as unknown as VideoFrame);
        }
      }
    }
    vi.stubGlobal('VideoDecoder', FakeDecoder);
    vi.stubGlobal('EncodedVideoChunk', class {
      timestamp: number;
      constructor(init: EncodedVideoChunkInit) { this.timestamp = init.timestamp; }
    });
    const callbacks = { output: vi.fn(), error: vi.fn(), dequeue: vi.fn() };
    const decoder = new WorkerVideoDecoder(callbacks);
    const data = Uint8Array.from(Buffer.from(fixtures.tracks[0].key, 'base64'));
    const frame: ImageWorkerFrameEnvelope = {
      kind: 'compressed', format: 'av1', data,
      receiveTime: { sec: 1, nsec: 0 }, publishTime: { sec: 1, nsec: 0 },
    };
    await decoder.submitFrame(frame, data, 1_000_000_000n);
    await Promise.resolve();
    expect(callbacks.error).toHaveBeenCalledOnce();
    expect(callbacks.output).not.toHaveBeenCalled();
    // The renderer's existing recovery resets and replays a complete GOP/key.
    decoder.reset();
    await decoder.submitFrame(frame, data, 1_000_000_000n);
    expect(configurations.map((config) => config.hardwareAcceleration)).toEqual([
      'prefer-hardware', 'prefer-software',
    ]);
    expect(callbacks.output).toHaveBeenCalledOnce();
    expect(callbacks.output).toHaveBeenCalledWith(expect.objectContaining({ sourceFrame: frame }));
    // An asynchronous callback from the closed hardware generation is ignored.
    decoders[0].init.error(new DOMException('Late stale error', 'EncodingError'));
    expect(callbacks.error).toHaveBeenCalledOnce();
    decoder.dispose();
  });
});
