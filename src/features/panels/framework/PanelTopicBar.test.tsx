/**
 * @vitest-environment happy-dom
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PanelTopicBar, PanelTopicBarVisibilityProvider } from './PanelTopicBar';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('PanelTopicBar', () => {
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

  function getBar(): HTMLDivElement {
    const el = container.firstElementChild;
    if (!(el instanceof HTMLDivElement)) throw new Error('bar div not found');
    return el;
  }

  it('renders children inside a compact, horizontally-padded row', () => {
    act(() => {
      root.render(
        <PanelTopicBar>
          <button type="button">picker</button>
        </PanelTopicBar>,
      );
    });
    const bar = getBar();
    expect(bar.textContent).toBe('picker');
    // No vertical padding: height should come purely from content, matching
    // the Image panel's compact reference experience (RawMessages used to
    // add `py-1`, which made its bar taller than Image's).
    expect(bar.className).not.toMatch(/(^|\s)py-\d/);
    expect(bar.className).toContain('items-center');
    expect(bar.className).toContain('px-2');
  });

  it('merges className overrides without losing the shared layout classes', () => {
    act(() => {
      root.render(
        <PanelTopicBar className="border-zinc-800 bg-zinc-950">
          <span>content</span>
        </PanelTopicBar>,
      );
    });
    const bar = getBar();
    expect(bar.className).toContain('border-zinc-800');
    expect(bar.className).toContain('bg-zinc-950');
    // The override replaces the default border/background color utilities
    // rather than doubling up on conflicting classes.
    expect(bar.className).not.toContain('border-border');
    expect(bar.className).not.toContain('bg-muted');
    expect(bar.className).toContain('items-center');
  });

  it('omits the bar and its children when viewer-level visibility is disabled', () => {
    act(() => {
      root.render(
        <PanelTopicBarVisibilityProvider visible={false}>
          <PanelTopicBar>
            <button type="button">picker</button>
          </PanelTopicBar>
          <button type="button" data-testid="panel-tab-close-button">
            close
          </button>
        </PanelTopicBarVisibilityProvider>,
      );
    });

    expect(container.querySelector('[data-testid="panel-topic-bar"]')).toBeNull();
    expect(container.textContent).not.toContain('picker');
    expect(container.querySelector('[data-testid="panel-tab-close-button"]')).not.toBeNull();
  });

  it('responds to viewer-level visibility changes', () => {
    const renderWithVisibility = (visible: boolean) => (
      <PanelTopicBarVisibilityProvider visible={visible}>
        <PanelTopicBar>
          <button type="button">picker</button>
        </PanelTopicBar>
      </PanelTopicBarVisibilityProvider>
    );

    act(() => root.render(renderWithVisibility(false)));
    expect(container.querySelector('[data-testid="panel-topic-bar"]')).toBeNull();

    act(() => root.render(renderWithVisibility(true)));
    expect(container.querySelector('[data-testid="panel-topic-bar"]')).not.toBeNull();
  });
});
