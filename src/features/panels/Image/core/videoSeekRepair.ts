import type { Player } from '@/core/types/player';
import type { MessageEvent as RosMessageEvent, Time } from '@/core/types/ros';
import { addMs, toNano } from '@/shared/utils/time';
import type { ImageAnnotationsFrame } from './imageAnnotations';
import type { ImageRenderWorkerRequest, ImageWorkerFrameEnvelope } from './imageWorkerProtocol';
import {
  getVideoMessagePayload,
  toWorkerFrame,
  videoCodecForMessageEvent,
} from './messageFrameAdapter';
import { parseExactImageAnnotations } from './frameAnnotationPairer';
import {
  type VideoCodec,
  containsVideoRandomAccessNal,
  videoCodecFromFormat,
} from './videoCodec';
import { selectLatestCompleteVideoGop } from './videoQueue';

export const VIDEO_SEEK_WINDOWS_MS = [2000, 5000, 10_000, 30_000] as const;
export const VIDEO_SEEK_MAX_FRAMES = 180;
export const VIDEO_BOOTSTRAP_FORWARD_MS = 2_000;

function compareReceiveTime(left: RosMessageEvent, right: RosMessageEvent): number {
  const difference = toNano(left.receiveTime) - toNano(right.receiveTime);
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function sortByReceiveTime(messages: RosMessageEvent[]): RosMessageEvent[] {
  return [...messages].sort(compareReceiveTime);
}

export function maxVideoMessageReceiveTime(
  messages: RosMessageEvent[],
  codec?: VideoCodec,
): Time | undefined {
  let latest: Time | undefined;
  for (const event of messages) {
    const eventCodec = videoCodecForMessageEvent(event);
    if (!eventCodec || (codec && eventCodec !== codec)) continue;
    if (!latest || toNano(event.receiveTime) > toNano(latest)) latest = event.receiveTime;
  }
  return latest;
}

export function findFirstVideoRandomAccessReceiveTime(
  messages: RosMessageEvent[],
  codec: VideoCodec,
): Time | undefined {
  for (const event of sortByReceiveTime(messages)) {
    if (videoCodecForMessageEvent(event) !== codec) continue;
    const payload = getVideoMessagePayload(event);
    if (payload && containsVideoRandomAccessNal(codec, payload)) return event.receiveTime;
  }
  return undefined;
}

export function preparedBootstrapContainsRandomAccess(
  frames: readonly ImageWorkerFrameEnvelope[],
  codec: VideoCodec,
): boolean {
  return frames.some(
    (frame) =>
      frame.kind === 'compressed' &&
      videoCodecFromFormat(frame.format) === codec &&
      containsVideoRandomAccessNal(codec, frame.data),
  );
}

export function selectVideoSeekRepairFrames(
  messages: RosMessageEvent[],
  targetTime: Time,
  codec: VideoCodec,
): RosMessageEvent[] {
  const targetNs = toNano(targetTime);
  const videoMessages = sortByReceiveTime(
    messages.filter(
      (event) =>
        videoCodecForMessageEvent(event) === codec && toNano(event.receiveTime) <= targetNs,
    ),
  );
  const candidates = videoMessages.flatMap((event) => {
    const data = getVideoMessagePayload(event);
    return data ? [{ event, data }] : [];
  });
  if (!candidates.some(({ data }) => containsVideoRandomAccessNal(codec, data))) return [];
  return limitVideoSeekRepairFrames(
    codec,
    selectLatestCompleteVideoGop(codec, candidates).frames,
  ).map(({ event }) => event);
}

export function selectVideoBootstrapFrames(
  messages: RosMessageEvent[],
  targetTime: Time,
  codec: VideoCodec,
  options: { coverageEndTime?: Time } = {},
): RosMessageEvent[] {
  const seekRepair = selectVideoSeekRepairFrames(messages, targetTime, codec);
  if (seekRepair.length > 0) return seekRepair;
  const firstRandomAccess = findFirstVideoRandomAccessReceiveTime(messages, codec);
  if (!firstRandomAccess) return [];
  const coverageEnd = options.coverageEndTime ?? targetTime;
  const effectiveEndNs = [coverageEnd, targetTime, firstRandomAccess]
    .map(toNano)
    .reduce((latest, value) => (value > latest ? value : latest));
  return selectVideoSeekRepairFrames(
    messages,
    { sec: Number(effectiveEndNs / 1_000_000_000n), nsec: Number(effectiveEndNs % 1_000_000_000n) },
    codec,
  );
}

export function limitVideoSeekRepairFrames<T extends { data: Uint8Array }>(
  codec: VideoCodec,
  frames: readonly T[],
): T[] {
  const randomAccessIndex = frames.findIndex(({ data }) =>
    containsVideoRandomAccessNal(codec, data),
  );
  return randomAccessIndex < 0 || randomAccessIndex >= VIDEO_SEEK_MAX_FRAMES
    ? []
    : frames.slice(0, VIDEO_SEEK_MAX_FRAMES);
}

function dedupeVideoEvents(messages: RosMessageEvent[]): RosMessageEvent[] {
  const seen = new Set<string>();
  return messages.filter((event) => {
    const payload = getVideoMessagePayload(event);
    let payloadHash = 2_166_136_261;
    if (payload) {
      for (const byte of payload) {
        payloadHash = Math.imul(payloadHash ^ byte, 16_777_619) >>> 0;
      }
    }
    const key = `${event.receiveTime.sec}:${event.receiveTime.nsec}:${event.publishTime.sec}:${event.publishTime.nsec}:${payload?.byteLength ?? 0}:${payloadHash}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function toWorkerFramesFromEvents(
  events: RosMessageEvent[],
  transferOwnership: boolean,
  annotationsByFrameKey?: ReadonlyMap<bigint, ImageAnnotationsFrame | null>,
): { frames: ImageWorkerFrameEnvelope[]; transfer: Transferable[] } {
  const frames: ImageWorkerFrameEnvelope[] = [];
  const transfer: Transferable[] = [];
  for (const event of events) {
    const prepared = toWorkerFrame(event, { transferOwnership });
    if (!prepared) continue;
    if (annotationsByFrameKey) {
      prepared.frame.annotation = annotationsByFrameKey.get(toNano(event.receiveTime)) ?? null;
    }
    frames.push(prepared.frame);
    transfer.push(...prepared.transfer);
  }
  return { frames, transfer };
}

async function fetchVideoBootstrapFrames(
  player: Player,
  topic: string,
  targetTime: Time,
  options: {
    signal?: AbortSignal;
    coverageEndTime?: Time;
    codec?: VideoCodec;
    annotationTopic?: string;
  } = {},
): Promise<{
  codec: VideoCodec;
  events: RosMessageEvent[];
  annotationsByFrameKey: Map<bigint, ImageAnnotationsFrame | null> | undefined;
} | null> {
  if (!player.getMessagesInTimeRange || options.signal?.aborted) return null;
  const coverageEnd = options.coverageEndTime ?? targetTime;
  const queryEnd = addMs(coverageEnd, VIDEO_BOOTSTRAP_FORWARD_MS);
  const topics = options.annotationTopic ? [topic, options.annotationTopic] : [topic];
  for (const windowMs of VIDEO_SEEK_WINDOWS_MS) {
    const messages = await player.getMessagesInTimeRange({
      start: addMs(targetTime, -windowMs),
      end: queryEnd,
      topics,
    });
    if (options.signal?.aborted) return null;
    const videoMessages = messages.filter((event) => event.topic === topic);
    const codec = options.codec ?? videoMessages.map(videoCodecForMessageEvent).find(Boolean) ?? null;
    if (!codec) continue;
    const events = selectVideoBootstrapFrames(videoMessages, targetTime, codec, {
      coverageEndTime: coverageEnd,
    });
    if (events.length === 0) continue;
    const annotationsByFrameKey = options.annotationTopic
      ? new Map(
          messages
            .filter((event) => event.topic === options.annotationTopic)
            .map((event) => [toNano(event.receiveTime), parseExactImageAnnotations(event)]),
        )
      : undefined;
    return { codec, events, annotationsByFrameKey };
  }
  return null;
}

export interface ExecuteVideoBootstrapArgs {
  player: Player;
  worker: Worker;
  topic: string;
  targetTime: Time;
  codec?: VideoCodec;
  liveEvents?: RosMessageEvent[];
  signal?: AbortSignal;
  preserveFrame?: boolean;
  /** ImagePanel lifecycle generation used to reject stale worker events. */
  generation?: number;
  transferOwnership?: boolean;
  /** Optional ImageAnnotations topic paired by the authoritative MCAP log-time key. */
  annotationTopic?: string;
  /** Called when the visible bootstrap frame has no exact annotation record. */
  onAnnotationGap?: () => void;
}

/** Fetch, merge, validate, and post one atomic H.264 or H.265 bootstrap batch. */
export async function executeVideoBootstrap(args: ExecuteVideoBootstrapArgs): Promise<boolean> {
  const {
    player,
    worker,
    topic,
    targetTime,
    liveEvents = [],
    signal,
    preserveFrame = false,
    transferOwnership = false,
  } = args;
  if (signal?.aborted) return false;
  const bootstrapLiveEvents = [...liveEvents];
  const liveCodec =
    args.codec ?? bootstrapLiveEvents.map(videoCodecForMessageEvent).find(Boolean) ?? undefined;
  const coverageEnd = maxVideoMessageReceiveTime(bootstrapLiveEvents, liveCodec) ?? targetTime;
  const bootstrap = await fetchVideoBootstrapFrames(player, topic, targetTime, {
    signal,
    coverageEndTime: coverageEnd,
    codec: liveCodec,
    annotationTopic: args.annotationTopic,
  });
  if (!bootstrap || signal?.aborted) return false;
  const merged = dedupeVideoEvents(
    sortByReceiveTime([
      ...bootstrap.events,
      ...bootstrapLiveEvents.filter(
        (event) => videoCodecForMessageEvent(event) === bootstrap.codec,
      ),
    ]),
  );
  const prepared = toWorkerFramesFromEvents(
    merged,
    transferOwnership,
    bootstrap.annotationsByFrameKey,
  );
  if (!preparedBootstrapContainsRandomAccess(prepared.frames, bootstrap.codec)) return false;
  if (args.annotationTopic && prepared.frames.at(-1)?.annotation === null) {
    args.onAnnotationGap?.();
  }
  worker.postMessage(
    {
      type: 'bootstrapVideo',
      codec: bootstrap.codec,
      frames: prepared.frames,
      preserveFrame,
      generation: args.generation ?? 0,
    } satisfies ImageRenderWorkerRequest,
    prepared.transfer,
  );
  return true;
}
