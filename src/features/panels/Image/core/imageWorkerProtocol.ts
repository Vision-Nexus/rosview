import type { Time } from '@/core/types/ros';
import type { RawImageDecodeOptions } from './imageColorMode';
import type { ImageSurfaceStatus } from './imageTypes';
import type { VideoPressureMode } from './videoBackpressure';
import type { ImageAnnotationsFrame } from './imageAnnotations';

export interface ImageRenderOptions {
  /** CSS color string (e.g. `#ff0000`) used to fill letterbox/pillarbox and idle canvas. */
  backgroundColor: string;
  flipHorizontal: boolean;
  flipVertical: boolean;
  rotationDeg: number;
  smoothing: boolean;
  fitMode: 'contain' | 'cover';
}

export interface ImageViewport {
  cssWidth: number;
  cssHeight: number;
  devicePixelRatio: number;
}

/** An encoded frame plus the exact annotation decision for its MCAP log-time key. */
export type ImageWorkerFrameEnvelope =
  | {
      kind: 'compressed';
      receiveTime: Time;
      publishTime: Time;
      format: string;
      data: Uint8Array;
      /** Omitted without an annotation topic; `null` is a confirmed data gap. */
      annotation?: ImageAnnotationsFrame | null;
    }
  | {
      kind: 'raw';
      receiveTime: Time;
      encoding: string;
      publishTime: Time;
      width: number;
      height: number;
      step?: number;
      isBigEndian?: boolean;
      data: Uint8Array;
      /** Omitted without an annotation topic; `null` is a confirmed data gap. */
      annotation?: ImageAnnotationsFrame | null;
    };

export type ImageRenderWorkerRequest =
  | {
      type: 'init';
      canvas: OffscreenCanvas;
    }
  | {
      type: 'viewport';
      viewport: ImageViewport;
    }
  | {
      type: 'renderOptions';
      options: ImageRenderOptions;
    }
  | {
      type: 'rawDecodeOptions';
      options: Partial<RawImageDecodeOptions>;
    }
  | {
      type: 'playback';
      currentTime: Time;
      isPlaying: boolean;
    }
  | {
      type: 'frame';
      frame: ImageWorkerFrameEnvelope;
    }
  | {
      type: 'bootstrapVideo';
      codec: 'h264' | 'h265';
      frames: ImageWorkerFrameEnvelope[];
      preserveFrame?: boolean;
    }
  | {
      type: 'reset';
      preserveFrame?: boolean;
    }
  | {
      type: 'dispose';
    };

export interface ImageRenderMetrics {
  pressureMode: VideoPressureMode;
  queueFrames: number;
  queueSpanMs: number;
  decodeMs: number;
  droppedFrames: number;
  renderedFrames: number;
  decodeQueueSize: number;
  mediaLagMs: number;
  resyncCount: number;
  codec?: string;
}

export type ImageRenderWorkerEvent =
  | {
      type: 'status';
      status: ImageSurfaceStatus;
    }
  | {
      type: 'metrics';
      metrics: ImageRenderMetrics;
    }
  | {
      type: 'rendered';
      timestampNs: bigint;
      width: number;
      height: number;
      annotationState: 'disabled' | 'matched' | 'gap';
    };
