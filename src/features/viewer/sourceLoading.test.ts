import { describe, expect, it } from 'vitest';
import { buildInitArgsForDataset } from './sourceLoading';

describe('buildInitArgsForDataset', () => {
  it('forwards normalized remote reader policy for remote sources', async () => {
    const init = await buildInitArgsForDataset(
      {
        id: 'source:object:clip:7:hash:1024',
        kind: 'url',
        name: 'clip.bvh',
        url: 'https://storage.example/clip.bvh',
        sourceId: 'object:clip:7:hash:1024',
        remoteReader: {
          cacheSizeInBytes: 1024.9,
          fetchBlockSizeInBytes: 64.9,
          maxRequestSizeInBytes: 512.9,
        },
      },
      'bvh',
      false,
    );

    expect(init).toMatchObject({
      url: 'https://storage.example/clip.bvh',
      remoteReader: {
        cacheSizeInBytes: 1024,
        fetchBlockSizeInBytes: 64,
        maxRequestSizeInBytes: 512,
      },
    });
  });
});
