/**
 * @vitest-environment happy-dom
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HighFrequencyConsumer, Player, RenderHealthReport } from '@/core/types/player';
import type { Time } from '@/core/types/ros';
import { useMessagePipelineStore } from '@/core/pipeline/store';
import { getRosViewMessages } from '@/shared/intl/loadRosViewMessages';
import { defaultImageConfig } from './defaults';

const { workers, MockImageWorker } = vi.hoisted(() => {
  const instances: Array<{
    onmessage: ((event: MessageEvent) => void) | null;
    postMessage: ReturnType<typeof vi.fn>;
    terminate: ReturnType<typeof vi.fn>;
  }> = [];
  class WorkerMock {
    public onmessage: ((event: MessageEvent) => void) | null = null;
    public postMessage = vi.fn();
    public terminate = vi.fn();

    public constructor() {
      instances.push(this);
    }
  }
  return { workers: instances, MockImageWorker: WorkerMock };
});

vi.mock('./core/ImageRender.worker.ts?worker&inline', () => ({ default: MockImageWorker }));
vi.mock('../framework/TopicQuickPicker', () => ({
  TopicQuickPicker: () => <div data-testid="topic-picker" />,
}));

import { ImagePanel } from './ImagePanel';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function makePlayer() {
  let imageConsumer: HighFrequencyConsumer | undefined;
  const reports: RenderHealthReport[] = [];
  const player = {
    registerHighFrequencyConsumer: vi.fn((_id: string, consumer: HighFrequencyConsumer) => {
      imageConsumer = consumer;
    }),
    unregisterHighFrequencyConsumer: vi.fn(),
    updateRenderHealth: vi.fn((_id: string, report: RenderHealthReport) => reports.push(report)),
    unregisterRenderHealth: vi.fn(),
    subscribeCurrentTime: vi.fn((callback: (time: Time) => void) => {
      callback({ sec: 0, nsec: 0 });
      return () => undefined;
    }),
    subscribeSeek: vi.fn(() => () => undefined),
    getCurrentTime: vi.fn(() => ({ sec: 0, nsec: 0 })),
  } as unknown as Player;
  return { player, reports, getImageConsumer: () => imageConsumer };
}

describe('ImagePanel render health', () => {
  let container: HTMLDivElement;
  let root: Root;
  let unmounted: boolean;

  beforeEach(() => {
    workers.length = 0;
    vi.useFakeTimers();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    unmounted = false;
    Object.defineProperty(HTMLCanvasElement.prototype, 'transferControlToOffscreen', {
      configurable: true,
      value: () => ({}),
    });
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    useMessagePipelineStore.getState().setPlayerState({
      presence: 'ready',
      progress: {},
      activeData: {
        topics: [{
          name: '/camera',
          type: 'sensor_msgs/msg/Image',
          messageCount: 10,
          durationSec: 9,
        }],
        datatypes: {},
        publishersByTopic: new Map(),
        startTime: { sec: 0, nsec: 0 },
        endTime: { sec: 10, nsec: 0 },
        currentTime: { sec: 0, nsec: 0 },
        isPlaying: true,
        isLooping: false,
        speed: 1,
        problems: [],
      },
    });
  });

  afterEach(() => {
    if (!unmounted) act(() => root.unmount());
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
    container.remove();
    useMessagePipelineStore.setState({
      playerState: { presence: 'preinit', progress: {} },
    });
  });

  it('reports cadence, pending work, rendered media time, visibility, and disposal', () => {
    const { player, reports, getImageConsumer } = makePlayer();
    const render = (visible: boolean, topic = '/camera') => (
      <IntlProvider locale="en" messages={getRosViewMessages('en')}>
        <ImagePanel
          {...defaultImageConfig()}
          player={player}
          panelId="Image!test"
          visible={visible}
          topic={topic}
          setConfig={vi.fn()}
        />
      </IntlProvider>
    );

    act(() => root.render(render(true)));
    expect(reports.at(-1)).toMatchObject({
      topic: '/camera',
      visible: true,
      pending: false,
      averageFrameIntervalMs: 1_000,
    });

    act(() => {
      getImageConsumer()?.onLatestMessage?.({
        topic: '/camera',
        schemaName: 'sensor_msgs/msg/Image',
        receiveTime: { sec: 2, nsec: 0 },
        publishTime: { sec: 2, nsec: 0 },
        message: {
          width: 1,
          height: 1,
          encoding: 'rgba8',
          step: 4,
          is_bigendian: false,
          data: new Uint8Array([0, 0, 0, 255]),
        },
      });
    });
    expect(reports.at(-1)?.pending).toBe(true);

    const worker = workers[0];
    const reset = worker?.postMessage.mock.calls
      .map((call) => call[0] as { type?: string; generation?: number })
      .find((message) => message.type === 'reset');
    expect(reset?.generation).toBeTypeOf('number');
    act(() => {
      worker?.onmessage?.({
        data: {
          type: 'rendered',
          generation: reset?.generation,
          timestampNs: 2_000_000_000n,
          width: 1,
          height: 1,
          annotationState: 'disabled',
        },
      } as MessageEvent);
      worker?.onmessage?.({
        data: { type: 'renderHealth', generation: reset?.generation, pending: false },
      } as MessageEvent);
    });
    expect(reports.at(-1)).toMatchObject({
      pending: false,
      renderedTime: { sec: 2, nsec: 0 },
    });

    act(() => root.render(render(false)));
    expect(reports.at(-1)?.visible).toBe(false);

    act(() => root.render(render(false, '')));
    expect(player.unregisterRenderHealth).toHaveBeenCalledWith('Image!test');
    const reportCountAfterTopicReset = reports.length;
    act(() => {
      worker?.onmessage?.({
        data: { type: 'renderHealth', generation: reset?.generation, pending: true },
      } as MessageEvent);
    });
    expect(reports).toHaveLength(reportCountAfterTopicReset);

    act(() => root.unmount());
    unmounted = true;
    expect(player.unregisterRenderHealth).toHaveBeenCalledWith('Image!test');
  });
});
