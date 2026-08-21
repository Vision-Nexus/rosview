import type { MessageEvent as RosMessageEvent } from '@/core/types/ros';
import type { ImageWorkerFrameEnvelope } from './imageWorkerProtocol';
import {
  getCompressedFrameFormat,
  isCompressedFrameMessage,
  isRawImageMessage,
  prepareImageWorkerBytes,
} from './imageTypes';
import { type VideoCodec, videoCodecFromFormat } from './videoCodec';

export type PreparedImageWorkerFrame = {
  frame: ImageWorkerFrameEnvelope;
  transfer: Transferable[];
};

export interface ToWorkerFrameOptions {
  transferOwnership?: boolean;
}

export function toWorkerFrame(
  messageEvent: RosMessageEvent,
  options: ToWorkerFrameOptions = {},
): PreparedImageWorkerFrame | null {
  const message = messageEvent.message;
  if (isCompressedFrameMessage(message)) {
    const payload = prepareImageWorkerBytes(message.data, options);
    if (!payload) {
      return null;
    }
    return {
      frame: {
        kind: 'compressed',
        receiveTime: messageEvent.receiveTime,
        publishTime: messageEvent.publishTime,
        format: getCompressedFrameFormat(message),
        data: payload.data,
      },
      transfer: payload.transfer,
    };
  }
  if (isRawImageMessage(message)) {
    const payload = prepareImageWorkerBytes(message.data, options);
    if (!payload) {
      return null;
    }
    return {
      frame: {
        kind: 'raw',
        receiveTime: messageEvent.receiveTime,
        publishTime: messageEvent.publishTime,
        encoding: message.encoding,
        width: message.width,
        height: message.height,
        step: message.step,
        isBigEndian: message.is_bigendian,
        data: payload.data,
      },
      transfer: payload.transfer,
    };
  }
  return null;
}

export function videoCodecForMessageEvent(messageEvent: RosMessageEvent): VideoCodec | null {
  const message = messageEvent.message;
  return isCompressedFrameMessage(message)
    ? videoCodecFromFormat(getCompressedFrameFormat(message))
    : null;
}

export function isVideoMessageEvent(messageEvent: RosMessageEvent): boolean {
  return videoCodecForMessageEvent(messageEvent) !== null;
}

export function getVideoMessagePayload(messageEvent: RosMessageEvent): Uint8Array | null {
  const message = messageEvent.message;
  return isCompressedFrameMessage(message) && videoCodecFromFormat(message.format)
    ? message.data
    : null;
}
