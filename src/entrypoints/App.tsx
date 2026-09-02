import { useCallback, useEffect, useReducer } from 'react';
import { RosViewer } from '@/features/viewer/RosViewer';

function useLocationSearchSync() {
  const [, bump] = useReducer((n: number) => n + 1, 0);
  const syncLocationSearch = useCallback(() => bump(), []);
  useEffect(() => {
    const onPopState = () => syncLocationSearch();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [syncLocationSearch]);
  return syncLocationSearch;
}

/** Single `?url=` locator (remote path / https, or `file://` / `folder://` for local replay). */
function readSpaUrlFromQuery(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const v = new URLSearchParams(window.location.search).get('url')?.trim();
  return v || undefined;
}

/** Optional standalone equivalent of the `RosViewer` panel topic bar setting. */
function readPanelTopicBarVisibilityFromQuery(): boolean | undefined {
  if (typeof window === 'undefined') return undefined;
  const value = new URLSearchParams(window.location.search).get('showPanelTopicBar');
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function App() {
  const syncLocationSearch = useLocationSearchSync();
  const url = readSpaUrlFromQuery();
  const showPanelTopicBar = readPanelTopicBarVisibilityFromQuery();
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <RosViewer
        url={url}
        urlState="spa"
        preferencePersistence="localStorage"
        showPanelTopicBar={showPanelTopicBar}
        onSpaUrlQuerySync={syncLocationSearch}
      />
    </div>
  );
}

export default App;
