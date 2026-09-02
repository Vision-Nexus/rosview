/**
 * @vitest-environment happy-dom
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { IntlProvider } from 'react-intl';
import { getRosViewMessages } from '@/shared/intl/loadRosViewMessages';
import { PlaybackBufferingOverlay } from './PlaybackBufferingOverlay';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('PlaybackBufferingOverlay', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('renders one centered, non-intercepting accessible status indicator', () => {
    act(() => {
      root.render(
        <IntlProvider locale="en" messages={getRosViewMessages('en')}>
          <PlaybackBufferingOverlay />
        </IntlProvider>,
      );
    });

    const overlays = container.querySelectorAll('[data-testid="rosview-playback-buffering-overlay"]');
    expect(overlays).toHaveLength(1);
    expect(overlays[0]?.getAttribute('role')).toBe('status');
    expect(overlays[0]?.getAttribute('aria-live')).toBe('polite');
    expect(overlays[0]?.getAttribute('aria-busy')).toBe('true');
    expect(overlays[0]?.className).toContain('pointer-events-none');
    expect(overlays[0]?.textContent).toContain('Buffering playback');
  });
});
