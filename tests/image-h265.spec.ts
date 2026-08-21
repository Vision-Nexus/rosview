import { test, expect } from '@playwright/test';
import { MCAP_H265, requireFixture } from './fixturePaths';
import { waitForRosviewReady } from './helpers/rosview';

test.describe.configure({ timeout: 120_000 });

test.beforeAll(() => {
  requireFixture(MCAP_H265);
});

test('H.265 CompressedVideo decodes when the browser exposes HEVC WebCodecs', async ({ page }) => {
  await page.goto('/');
  const support = await page.evaluate(async () => {
    if (typeof VideoDecoder === 'undefined') return false;
    for (const codec of ['hev1.1.6.L93.B0', 'hvc1.1.6.L93.B0']) {
      try {
        if ((await VideoDecoder.isConfigSupported({ codec })).supported) return true;
      } catch {
        // Continue through the closed fallback list.
      }
    }
    return false;
  });
  test.skip(!support, 'Browser has no HEVC WebCodecs decoder');

  await page.locator('#rosview-landing-file').setInputFiles(MCAP_H265);
  await waitForRosviewReady(page);
  const play = page.getByRole('button', { name: 'Play playback' });
  if (await play.isVisible().catch(() => false)) await play.click();

  const imagePanel = page.getByTestId('image-panel');
  await expect(imagePanel).toBeVisible({ timeout: 90_000 });
  await expect(imagePanel).toHaveAttribute('data-video-codec', /^(hev1|hvc1)\./, {
    timeout: 90_000,
  });
  await expect
    .poll(
      async () => Number(await imagePanel.getAttribute('data-video-rendered-frames')),
      { timeout: 90_000 },
    )
    .toBeGreaterThan(0);
  await expect(page.getByTestId('image-panel-status')).toHaveText(/64x64 h265/);
  expect(await page.getByText(/decode failed|could not be decoded/i).count()).toBe(0);
});
