import type { MessageEvent, Time } from '@/core/types/ros';
import { toNano } from '@/shared/utils/time';
import type { IMessageCursor } from './types';

const SOURCE_INDEX = Symbol('rosviewCombinedSourceIndex');

type TaggedMessageEvent = MessageEvent & { [SOURCE_INDEX]?: number };

/**
 * Stamp a message with the index of the member source (into
 * `CombinedSourceProxy`'s member list) that produced it. This is a
 * main-thread-only marker (never serialized across a Worker boundary) used
 * to route `resolveMessageBatch`/`resolveMessageForHighFrequencyLane` calls
 * back to the correct member — required because SharedArrayBuffer payload
 * rings are per-Worker.
 */
export function tagMessageSourceIndex<T extends MessageEvent>(message: T, sourceIndex: number): T {
  (message as TaggedMessageEvent)[SOURCE_INDEX] = sourceIndex;
  return message;
}

export function getMessageSourceIndex(message: MessageEvent): number | undefined {
  return (message as TaggedMessageEvent)[SOURCE_INDEX];
}

function receiveTimeNs(message: MessageEvent): bigint {
  return toNano(message.receiveTime);
}

function compareByReceiveTime(a: MessageEvent, b: MessageEvent): number {
  const diff = receiveTimeNs(a) - receiveTimeNs(b);
  if (diff < 0n) return -1;
  if (diff > 0n) return 1;
  return 0;
}

export interface CombinedCursorChild {
  cursor: IMessageCursor<unknown>;
  /** Index into `CombinedSourceProxy`'s member list. */
  sourceIndex: number;
}

type BufferedCursorChild = CombinedCursorChild & {
  buffered: MessageEvent[];
  done: boolean;
};

function lastBufferedMessage(child: BufferedCursorChild): MessageEvent {
  const message = child.buffered.at(-1);
  if (!message) throw new Error('combined_cursor_missing_lookahead');
  return message;
}

/**
 * Merges N child cursors (one per member file/source) into a single time-ordered stream.
 *
 * Each child retains one lookahead timestamp. Messages strictly before the minimum lookahead are
 * therefore complete across every source and can be released without allowing a faster source to
 * outrun a slower one. Child batch quotas share the caller's global message budget; only the
 * lookahead needed to close the last timestamp group is read beyond those quotas.
 */
export class CombinedMessageCursor implements IMessageCursor<unknown> {
  private _children: BufferedCursorChild[];

  constructor(children: CombinedCursorChild[]) {
    this._children = children.map((child) => ({ ...child, buffered: [], done: false }));
  }

  async next(): Promise<IteratorResult<MessageEvent>> {
    await Promise.all(
      this._children.map(async (child) => {
        if (child.done || child.buffered.length > 0) return;
        const result = await child.cursor.next();
        if (result.done) {
          child.done = true;
        } else {
          child.buffered.push(tagMessageSourceIndex(result.value, child.sourceIndex));
        }
      }),
    );

    let minChild: BufferedCursorChild | undefined;
    let minTimeNs: bigint | undefined;
    for (const child of this._children) {
      const message = child.buffered[0];
      if (!message) continue;
      const timeNs = receiveTimeNs(message);
      if (minTimeNs === undefined || timeNs < minTimeNs) {
        minTimeNs = timeNs;
        minChild = child;
      }
    }
    const value = minChild?.buffered.shift();
    return value ? { done: false, value } : { done: true, value: undefined };
  }

  async nextBatch(
    durationMs: number,
    options?: { maxMessages?: number; maxWallTimeMs?: number; endTime?: Time },
  ): Promise<MessageEvent[]> {
    if (this._children.length === 0) return [];
    const maxMessages = Math.max(1, Math.floor(options?.maxMessages ?? 256));

    for (let attempt = 0; attempt <= this._children.length; attempt += 1) {
      const childrenToAdvance = this._childrenToAdvance(options?.endTime);
      if (childrenToAdvance.length === 0) return this._takeReadyMessages(maxMessages, options?.endTime);

      const baseQuota = Math.floor(maxMessages / childrenToAdvance.length);
      const remainder = maxMessages % childrenToAdvance.length;
      await Promise.all(
        childrenToAdvance.map((child, index) =>
          this._advanceChild(
            child,
            durationMs,
            {
              ...options,
              maxMessages: Math.max(1, baseQuota + (index < remainder ? 1 : 0)),
            },
          ),
        ),
      );

      const ready = this._takeReadyMessages(maxMessages, options?.endTime);
      if (ready.length > 0 || this._children.every((child) => child.done)) return ready;
    }
    return [];
  }

  async end(): Promise<void> {
    for (const child of this._children) child.buffered.length = 0;
    await Promise.all(this._children.map((child) => child.cursor.end()));
  }

  private _childrenToAdvance(endTime?: Time): BufferedCursorChild[] {
    const active = this._children.filter((child) => !child.done);
    const empty = active.filter((child) => child.buffered.length === 0);
    if (empty.length > 0) return empty;
    if (active.length === 0) return [];

    const frontierNs = active.reduce((minimum, child) => {
      const childFrontier = receiveTimeNs(lastBufferedMessage(child));
      return childFrontier < minimum ? childFrontier : minimum;
    }, receiveTimeNs(lastBufferedMessage(active[0])));
    if (endTime && frontierNs > toNano(endTime)) return [];
    return active.filter((child) => receiveTimeNs(lastBufferedMessage(child)) === frontierNs);
  }

  private async _advanceChild(
    child: BufferedCursorChild,
    durationMs: number,
    options: { maxMessages: number; maxWallTimeMs?: number; endTime?: Time },
  ): Promise<void> {
    const batch = await child.cursor.nextBatch(durationMs, options);
    for (const message of batch) {
      child.buffered.push(tagMessageSourceIndex(message, child.sourceIndex));
    }

    const boundaryMessage = batch.at(-1) ?? child.buffered.at(-1);
    if (!boundaryMessage) {
      const result = await child.cursor.next();
      if (result.done) child.done = true;
      else child.buffered.push(tagMessageSourceIndex(result.value, child.sourceIndex));
      return;
    }
    const boundaryNs = receiveTimeNs(boundaryMessage);
    const endTimeNs = options.endTime ? toNano(options.endTime) : undefined;
    if (endTimeNs !== undefined && boundaryNs > endTimeNs) return;

    for (;;) {
      const result = await child.cursor.next();
      if (result.done) {
        child.done = true;
        return;
      }
      const message = tagMessageSourceIndex(result.value, child.sourceIndex);
      child.buffered.push(message);
      if (endTimeNs !== undefined && receiveTimeNs(message) > endTimeNs) return;
      if (receiveTimeNs(message) > boundaryNs) return;
    }
  }

  private _takeReadyMessages(maxMessages: number, endTime?: Time): MessageEvent[] {
    const active = this._children.filter((child) => !child.done);
    if (active.some((child) => child.buffered.length === 0)) return [];
    const firstActive = active[0];
    const frontierNs = firstActive
      ? active.reduce((minimum, child) => {
          const childFrontier = receiveTimeNs(lastBufferedMessage(child));
          return childFrontier < minimum ? childFrontier : minimum;
        }, receiveTimeNs(lastBufferedMessage(firstActive)))
      : undefined;
    const endTimeNs = endTime ? toNano(endTime) : undefined;
    const ready: Array<{ child: BufferedCursorChild; message: MessageEvent }> = [];
    for (const child of this._children) {
      for (const message of child.buffered) {
        const timeNs = receiveTimeNs(message);
        if (endTimeNs !== undefined && timeNs > endTimeNs) break;
        if (frontierNs !== undefined && timeNs >= frontierNs) break;
        ready.push({ child, message });
      }
    }
    ready.sort((left, right) => compareByReceiveTime(left.message, right.message));
    if (ready.length === 0) return [];

    let takeCount = Math.min(maxMessages, ready.length);
    if (takeCount < ready.length) {
      const boundaryNs = receiveTimeNs(ready[takeCount - 1].message);
      if (receiveTimeNs(ready[takeCount].message) === boundaryNs) {
        while (takeCount > 0 && receiveTimeNs(ready[takeCount - 1].message) === boundaryNs) {
          takeCount -= 1;
        }
        if (takeCount === 0) {
          while (
            takeCount < ready.length &&
            receiveTimeNs(ready[takeCount].message) === boundaryNs
          ) {
            takeCount += 1;
          }
        }
      }
    }

    const selected = ready.slice(0, takeCount);
    const countByChild = new Map<BufferedCursorChild, number>();
    for (const entry of selected) {
      countByChild.set(entry.child, (countByChild.get(entry.child) ?? 0) + 1);
    }
    for (const [child, count] of countByChild) child.buffered.splice(0, count);
    return selected.map((entry) => entry.message);
  }
}
