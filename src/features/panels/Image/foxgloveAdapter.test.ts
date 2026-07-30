import { describe, expect, it } from 'vitest';
import { imageFoxgloveAdapter } from './foxgloveAdapter';

describe('imageFoxgloveAdapter', () => {
  it('keeps ImageAnnotations and drops retired scene mesh config', () => {
    const decoded = imageFoxgloveAdapter.fromConfig({
      topic: '/warehouse/front_camera/image',
      annotationTopic: '/warehouse/front_camera/annotations',
      meshTopic: '/robot0/perception/mano/scene',
      meshVisible: true,
    });

    const exported = imageFoxgloveAdapter.toConfig({
      config: decoded.config,
      extras: decoded.extras,
      title: decoded.title,
    });

    expect(exported.annotationTopic).toBe('/warehouse/front_camera/annotations');
    expect(exported).not.toHaveProperty('meshTopic');
    expect(exported).not.toHaveProperty('meshVisible');
  });
});
