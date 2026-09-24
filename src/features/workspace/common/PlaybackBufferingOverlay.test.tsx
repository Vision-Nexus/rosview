/**
 * @vitest-environment happy-dom
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { IntlProvider } from 'react-intl';
import { getRosViewMessages } from '@/shared/intl/loadRosViewMessages';
import { PlaybackBufferingOverlay } from './PlaybackBufferingOverlay';
import { MinimalPlayer } from '@/core/players/MinimalPlayer';
import { useMessagePipelineStore } from '@/core/pipeline/store';
import type { PlayerState } from '@/core/types/player';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('PlaybackBufferingOverlay', () => {
  let container: HTMLDivElement;
  let root: Root;
  let player: MinimalPlayer;
  let previousState: PlayerState;

  beforeEach(() => {
    previousState = useMessagePipelineStore.getState().playerState;
    player = new MinimalPlayer();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    player.close();
    useMessagePipelineStore.getState().setPlayerState(previousState);
  });

  it('hides completed loading and gives playback errors precedence over buffering', () => {
    act(() => {
      root.render(
        <IntlProvider locale="en" messages={getRosViewMessages('en')}>
          <PlaybackBufferingOverlay player={player} />
        </IntlProvider>,
      );
    });
    expect(container.querySelector('[role="status"]')).toBeNull();

    act(() => {
      useMessagePipelineStore.getState().setPlayerState({
        presence: 'ready', progress: { buffering: true },
      });
    });
    expect(container.querySelector('[role="status"][aria-busy="true"]')).not.toBeNull();

    act(() => {
      useMessagePipelineStore.getState().setPlayerState({
        presence: 'ready', progress: { buffering: false },
      });
    });
    expect(container.querySelector('[role="status"]')).toBeNull();

    act(() => {
      useMessagePipelineStore.getState().setPlayerState({
        presence: 'ready', progress: { buffering: true, playbackError: 'Source read timed out' },
      });
    });
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });
});
