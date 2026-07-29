import type { ImageColorMode } from './core/imageColorMode';

export interface ImageConfig {
  topic: string;
  /** Optional foxglove.ImageAnnotations topic drawn over the image. */
  annotationTopic: string;
  /** Whether the configured ImageAnnotations layer is visible. */
  annotationVisible: boolean;
  // Display
  backgroundColor: string;
  showStatusText: boolean;
  fitMode: 'contain' | 'cover';
  smoothing: boolean;
  // Transform
  flipHorizontal: boolean;
  flipVertical: boolean;
  /** Clockwise rotation in degrees, 0–360 (inclusive). */
  rotation: number;
  // Color (only effective for raw / depth)
  colorMode: ImageColorMode;
  flatColor: string;
  gradient: [string, string];
  colorMap: 'turbo' | 'rainbow';
  explicitAlpha: number;
  minValue?: number;
  maxValue?: number;
}

export const defaultImageConfig = (): ImageConfig => ({
  topic: '',
  annotationTopic: '',
  annotationVisible: true,
  backgroundColor: '#000000',
  showStatusText: true,
  fitMode: 'contain',
  smoothing: true,
  flipHorizontal: false,
  flipVertical: false,
  rotation: 0,
  colorMode: 'colormap',
  colorMap: 'turbo',
  gradient: ['#000000', '#ffffff'],
  flatColor: '#ffffff',
  explicitAlpha: 1,
});
