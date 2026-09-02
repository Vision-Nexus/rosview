/**
 * @vitest-environment happy-dom
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { closePanelMock } = vi.hoisted(() => ({ closePanelMock: vi.fn() }));

vi.mock('@/app/AppShell', async () => {
  const { PanelTopicBar } = await import('@/features/panels/framework/PanelTopicBar');
  return {
    AppShell: () => (
      <div>
        <PanelTopicBar>
          <button type="button">topic picker</button>
        </PanelTopicBar>
        <button type="button" data-testid="panel-tab-close-button" onClick={closePanelMock}>
          close panel
        </button>
      </div>
    ),
  };
});

import { RosViewer } from './RosViewer';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('RosViewer panel topic bar visibility', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    closePanelMock.mockReset();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  async function renderViewer(showPanelTopicBar?: boolean): Promise<void> {
    await act(async () => {
      root.render(
        <RosViewer
          mode="tool"
          theme="dark"
          preferencePersistence="off"
          layoutPersistence="off"
          showPanelTopicBar={showPanelTopicBar}
        />,
      );
    });
  }

  it('shows panel topic bars by default', async () => {
    await renderViewer();

    expect(container.querySelector('[data-testid="panel-topic-bar"]')).not.toBeNull();
  });

  it('hides panel topic bars without affecting tab close controls', async () => {
    await renderViewer(false);

    expect(container.querySelector('[data-testid="panel-topic-bar"]')).toBeNull();
    const closeButton = container.querySelector<HTMLButtonElement>('[data-testid="panel-tab-close-button"]');
    expect(closeButton).not.toBeNull();
    act(() => closeButton?.click());
    expect(closePanelMock).toHaveBeenCalledOnce();
  });
});
