import { describe, expect, it } from 'vitest';
import { fileBatchDisplayName, propsSignature, sourceLoadSignature } from './rosViewerUtils';

function makeFile(name: string): File {
  return new File([new Uint8Array(4)], name, { lastModified: 1 });
}

describe('fileBatchDisplayName', () => {
  it('returns an empty string for an empty batch', () => {
    expect(fileBatchDisplayName([])).toBe('');
  });

  it('returns the file name for a single file', () => {
    expect(fileBatchDisplayName([makeFile('base.mcap')])).toBe('base.mcap');
  });

  it('appends a "+N" suffix for multiple files, based on the first one', () => {
    expect(fileBatchDisplayName([makeFile('base.mcap'), makeFile('incremental.mcap')])).toBe('base.mcap +1');
    expect(
      fileBatchDisplayName([makeFile('a.mcap'), makeFile('b.mcap'), makeFile('c.bag')]),
    ).toBe('a.mcap +2');
  });
});

describe('propsSignature remote manifests', () => {
  it('rebuilds a sourceId reader when its URL changes', () => {
    const first = propsSignature({
      fileManifest: [
        {
          url: 'https://storage.example/clip.mcap?Expires=100&Signature=first',
          sourceId: 'object:clip:7:hash:1024',
          remoteReader: { cacheSizeInBytes: 1024.9, fetchBlockSizeInBytes: 64, maxRequestSizeInBytes: 512 },
        },
      ],
    });
    const renewed = propsSignature({
      fileManifest: [
        {
          url: 'https://storage.example/clip.mcap?Expires=200&Signature=second',
          sourceId: 'object:clip:7:hash:1024',
          remoteReader: { cacheSizeInBytes: 1024, fetchBlockSizeInBytes: 64, maxRequestSizeInBytes: 512 },
        },
      ],
    });

    expect(renewed).not.toBe(first);
    expect(
      sourceLoadSignature([
        {
          id: 'source:object:clip:7:hash:1024',
          kind: 'url',
          name: 'clip.mcap',
          url: 'https://storage.example/clip.mcap?Expires=100&Signature=first',
          sourceId: 'object:clip:7:hash:1024',
        },
      ]),
    ).not.toBe(
      sourceLoadSignature([
        {
          id: 'source:object:clip:7:hash:1024',
          kind: 'url',
          name: 'clip.mcap',
          url: 'https://storage.example/clip.mcap?Expires=200&Signature=second',
          sourceId: 'object:clip:7:hash:1024',
        },
      ]),
    );
  });

  it('changes for an immutable source or reader policy change', () => {
    const base = {
      fileManifest: [
        {
          url: 'https://storage.example/clip.mcap?Expires=100',
          sourceId: 'object:clip:7:hash:1024',
          remoteReader: { cacheSizeInBytes: 1024 },
        },
      ],
    };

    expect(
      propsSignature({
        ...base,
        fileManifest: [{ ...base.fileManifest[0], sourceId: 'object:clip:8:hash:1024' }],
      }),
    ).not.toBe(propsSignature(base));
    expect(
      propsSignature({
        ...base,
        fileManifest: [{ ...base.fileManifest[0], remoteReader: { cacheSizeInBytes: 2048 } }],
      }),
    ).not.toBe(propsSignature(base));
  });

  it('keeps legacy URL and file signatures byte-for-byte compatible', () => {
    expect(propsSignature({ url: 'https://storage.example/clip.mcap' })).toBe(
      'off||https://storage.example/clip.mcap||||0',
    );
    expect(propsSignature({ file: makeFile('clip.mcap') })).toBe('off||||clip.mcap:4:1||0');
  });
});
