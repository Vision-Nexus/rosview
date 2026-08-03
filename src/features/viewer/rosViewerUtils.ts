/** Small pure helpers shared across `RosViewerImpl` and its hooks. No React here. */
import { readPreferences } from '@/core/preferences/readWritePreferences';
import {
  mergeInitialUiPreferences,
  readUiPreferenceParamsFromSearch,
} from '@/core/preferences/mergeInitialUiPreferences';
import type { PreferencePersistence } from '@/core/preferences/types';
import {
  datasetItemIdentity,
  normalizeRemoteReaderTuning,
  type DatasetItem,
  type FileListItem,
} from '@/shared/utils/datasetSources';
import { resolveBrowserHttpUrl } from '@/shared/utils/resolveBrowserHttpUrl';
import type { SourceLocator } from '@/shared/utils/sourceLocator';
import type { RosViewerProps } from './RosViewer.types';

/**
 * Fingerprints every prop that identifies "what to load", so effects can
 * depend on this single string instead of unstable object/array/File
 * references (`files`/`urls`/`fileManifest` arrays are typically recreated
 * by the caller on every render).
 */
function fileManifestSignature(fileManifest: string | FileListItem[] | undefined): string {
  if (fileManifest == undefined) return '';
  if (typeof fileManifest === 'string') return fileManifest.trim();
  return JSON.stringify(
    fileManifest.map((row) => {
      const sourceId = typeof row.sourceId === 'string' && row.sourceId.trim() ? row.sourceId.trim() : undefined;
      if (sourceId == undefined) return row;
      const remoteReader = normalizeRemoteReaderTuning(row.remoteReader);
      return {
        sourceId,
        url: row.url.trim(),
        ...(typeof row.sizeBytes === 'number' ? { sizeBytes: row.sizeBytes } : {}),
        ...(remoteReader != undefined ? { remoteReader } : {}),
      };
    }),
  );
}

/**
 * Identifies the concrete reader configuration for an active group. A
 * `sourceId` remains the dataset identity, but an updated URL must rebuild
 * the worker-backed reader because it cannot be swapped in place.
 */
export function sourceLoadSignature(items: DatasetItem[]): string {
  return JSON.stringify(
    items.map((item) => {
      if (item.kind !== 'url') return { identity: datasetItemIdentity(item) };
      const remoteReader = normalizeRemoteReaderTuning(item.remoteReader);
      return {
        identity: datasetItemIdentity(item),
        url: item.url,
        ...(typeof item.sizeBytes === 'number' ? { sizeBytes: item.sizeBytes } : {}),
        ...(remoteReader != undefined ? { remoteReader } : {}),
      };
    }),
  );
}

export function propsSignature(props: RosViewerProps): string {
  const urlState = props.urlState ?? 'off';
  const urls = (props.urls ?? []).map((u) => u.trim()).join('\0');
  const url = props.url?.trim() ?? '';
  const files = (props.files ?? []).map((f) => `${f.name}:${f.size}:${f.lastModified}`).join('\0');
  const file = props.file ? `${props.file.name}:${props.file.size}:${props.file.lastModified}` : '';
  const fileListSig = fileManifestSignature(props.fileManifest);
  const mergeSources = props.mergeSources ? '1' : '0';
  return `${urlState}|${urls}|${url}|${files}|${file}|${fileListSig}|${mergeSources}`;
}

export function initialUiFromProps(p: RosViewerProps) {
  const persistence: PreferencePersistence = p.preferencePersistence ?? 'localStorage';
  const { urlTheme, urlLanguage } = readUiPreferenceParamsFromSearch(
    typeof window !== 'undefined' ? window.location.search : '',
  );
  return mergeInitialUiPreferences({
    persistence,
    propsTheme: p.theme,
    propsLanguage: p.language,
    urlTheme,
    urlLanguage,
    stored: persistence === 'localStorage' ? readPreferences() : null,
  });
}

export function errorMessageFromUnknown(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
}

export function resolveLayoutPersistence(
  layoutPersistence: PreferencePersistence | 'inherit' | undefined,
  preferencePersistence: PreferencePersistence,
): PreferencePersistence {
  if (layoutPersistence === undefined || layoutPersistence === 'inherit') {
    return preferencePersistence;
  }
  return layoutPersistence;
}

/** "first.mcap" or "first.mcap +N" for a batch of files, used in history/toast labels. */
export function fileBatchDisplayName(files: File[]): string {
  if (files.length === 0) return '';
  return files.length === 1 ? files[0].name : `${files[0].name} +${String(files.length - 1)}`;
}

export function datasetItemToSourceLocator(ds: DatasetItem): SourceLocator | null {
  if (ds.kind === 'url' && ds.url) {
    const resolvedUrl = resolveBrowserHttpUrl(ds.url);
    return { kind: 'remote', raw: ds.url.trim(), resolvedUrl };
  }
  if (ds.kind === 'file' && ds.file) {
    return { kind: 'local_file', displayName: ds.file.name };
  }
  return null;
}
