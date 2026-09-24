import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import { toNano } from '@/shared/utils/time';
import { VIDEO_MAX_PENDING_FRAMES, VIDEO_MAX_PENDING_SPAN_MS } from './videoBackpressure';
import { getVideoMessagePayload, isVideoMessageEvent } from './messageFrameAdapter';

export function snapshotVideoLiveEvent(event: RosMessageEvent): RosMessageEvent {
  const data = getVideoMessagePayload(event);
  if (!data) return event;
  return {
    ...event,
    message: {
      ...(event.message as Record<string, unknown>),
      data: new Uint8Array(data),
    },
  };
}

export function capVideoLiveEvents(events: RosMessageEvent[]): RosMessageEvent[] {
  if (events.length === 0) {
    return events;
  }
  let next = events.length > VIDEO_MAX_PENDING_FRAMES
    ? events.slice(events.length - VIDEO_MAX_PENDING_FRAMES)
    : events;
  const newest = next.at(-1);
  if (!newest) {
    return next;
  }
  const newestNs = toNano(newest.receiveTime);
  const minNs = newestNs - BigInt(VIDEO_MAX_PENDING_SPAN_MS) * 1_000_000n;
  const firstKept = next.findIndex((event) => toNano(event.receiveTime) >= minNs);
  if (firstKept > 0) {
    next = next.slice(firstKept);
  }
  return next;
}

export function pushVideoLiveEvent(
  events: RosMessageEvent[],
  event: RosMessageEvent,
): RosMessageEvent[] {
  const next = isVideoMessageEvent(event) ? snapshotVideoLiveEvent(event) : event;
  events.push(next);
  const capped = capVideoLiveEvents(events);
  if (capped !== events) {
    events.length = 0;
    events.push(...capped);
  }
  return events;
}
