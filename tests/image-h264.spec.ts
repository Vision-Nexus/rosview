import { test, expect } from '@playwright/test';
import {
  MCAP_H264,
  MCAP_H264_PAIR_ANNOTATIONS,
  MCAP_H264_PAIR_CAMERAS,
  MCAP_H264_URL,
  requireFixture,
} from './fixturePaths';
import { attachBrowserDiagnostics, openFixtureByUrl, waitForRosviewReady } from './helpers/rosview';

test.describe.configure({ timeout: 120_000 });

test.beforeAll(() => {
  requireFixture(MCAP_H264);
});

test('H.264 CompressedImage decodes without error', async ({ page }) => {
  await openFixtureByUrl(page, MCAP_H264_URL);

  const play = page.getByRole('button', { name: 'Play playback' });
  if (await play.isVisible().catch(() => false)) {
    await play.click();
  }

  const progressFill = page.getByTestId('playback-progress-fill');
  const progressWidths: number[] = [];
  for (let sample = 0; sample < 6; sample += 1) {
    const width = await progressFill.evaluate((element) =>
      Number.parseFloat((element as HTMLElement).style.width),
    );
    expect(Number.isFinite(width)).toBe(true);
    progressWidths.push(width);
    await page.waitForTimeout(200);
  }
  const meaningfulAdvances = progressWidths
    .slice(1)
    .filter((width, index) => width - progressWidths[index] >= 0.1);
  expect(meaningfulAdvances.length).toBeGreaterThanOrEqual(2);
  expect(Math.max(...progressWidths) - Math.min(...progressWidths)).toBeGreaterThanOrEqual(1);

  await expect(page.locator('canvas')).not.toHaveCount(0, { timeout: 90_000 });

  const imagePanel = page.getByTestId('image-panel');
  if (await imagePanel.isVisible().catch(() => false)) {
    await expect
      .poll(
        async () => Number(await imagePanel.getAttribute('data-video-rendered-frames')),
        { timeout: 5_000 },
      )
      .toBeGreaterThan(0);
  }

  const hasDecodeFailure = await page.getByText(/decode failed|could not be decoded/i).count();
  expect(hasDecodeFailure).toBe(0);


  const imageStatus = page.getByTestId('image-panel-status');
  if (await imagePanel.isVisible().catch(() => false)) {
    await expect(imageStatus).toBeVisible({ timeout: 90_000 });
    await expect(imageStatus).toHaveText(/\d+x\d+/);

    await expect(imagePanel).toHaveAttribute('data-video-pressure', /^(normal|degraded|recovery)$/, {
      timeout: 90_000,
    });
    const metrics = await imagePanel.evaluate((element) => ({
      queueFrames: Number(element.getAttribute('data-video-queue-frames')),
      droppedFrames: Number(element.getAttribute('data-video-dropped-frames')),
      decodeQueueSize: Number(element.getAttribute('data-video-decode-queue')),
      mediaLagMs: Number(element.getAttribute('data-video-media-lag-ms')),
      resyncCount: Number(element.getAttribute('data-video-resync-count')),
      renderedFrames: Number(element.getAttribute('data-video-rendered-frames')),
    }));
    expect(Number.isInteger(metrics.queueFrames)).toBe(true);
    expect(metrics.queueFrames).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(metrics.droppedFrames)).toBe(true);
    expect(metrics.droppedFrames).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(metrics.decodeQueueSize)).toBe(true);
    expect(metrics.decodeQueueSize).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(metrics.mediaLagMs)).toBe(true);
    expect(metrics.mediaLagMs).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(metrics.resyncCount)).toBe(true);
    expect(metrics.resyncCount).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(metrics.renderedFrames)).toBe(true);
    expect(metrics.renderedFrames).toBeGreaterThanOrEqual(0);

    await page.getByTestId('playback-speed-trigger').click();
    await page.getByRole('menuitem', { name: '8x', exact: true }).click();
    const resume = page.getByRole('button', { name: 'Play playback' });
    if (await resume.isVisible().catch(() => false)) {
      await resume.click();
    }
    await page.waitForTimeout(1_000);
    await expect(imageStatus).toBeVisible();
    await expect(imagePanel).toHaveAttribute('data-video-pressure', /^(normal|degraded|recovery)$/);
    expect(await page.getByText(/decode failed|could not be decoded/i).count()).toBe(0);
  }
});
test('five H.264 panels render only exact paired annotations', async ({ page }) => {
  const diagnostics = attachBrowserDiagnostics(page);
  for (const fixture of [...MCAP_H264_PAIR_CAMERAS, MCAP_H264_PAIR_ANNOTATIONS]) {
    requireFixture(fixture);
  }
  await page.goto('/');
  await page
    .locator('#rosview-landing-file')
    .setInputFiles([...MCAP_H264_PAIR_CAMERAS, MCAP_H264_PAIR_ANNOTATIONS]);
  await waitForRosviewReady(page, { diagnostics, timeoutMs: 90_000 });

  const panels = page.getByTestId('image-panel');
  await expect(panels).toHaveCount(5);
  const play = page.getByRole('button', { name: 'Play playback' });
  if (await play.isVisible().catch(() => false)) await play.click();

  await expect
    .poll(
      () => panels.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-annotation-state'))),
      { timeout: 90_000 },
    )
    .toEqual(Array.from({ length: 5 }, () => 'matched'));
  await expect(page.getByTestId('image-annotation-gap-warning')).toHaveCount(0);

  const track = page.getByTestId('playback-track');
  const trackBox = await track.boundingBox();
  expect(trackBox).not.toBeNull();
  await page.mouse.click(trackBox!.x + trackBox!.width * 0.7, trackBox!.y + trackBox!.height / 2);
  await page.waitForTimeout(300);
  await expect
    .poll(
      () => panels.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-annotation-state'))),
      { timeout: 30_000 },
    )
    .toEqual(Array.from({ length: 5 }, () => 'matched'));
  await expect(page.getByTestId('image-annotation-gap-warning')).toHaveCount(0);

  await page.getByTestId('playback-loop-trigger').click();
  await page.getByTestId('playback-loop-option-loop').click();
  await page.getByTestId('playback-speed-trigger').click();
  await page.getByRole('menuitem', { name: '8x', exact: true }).click();
  const resume = page.getByRole('button', { name: 'Play playback' });
  if (await resume.isVisible().catch(() => false)) await resume.click();
  // The fixture spans five seconds; at 8x this crosses at least one loop boundary.
  await page.waitForTimeout(1_500);
  await expect
    .poll(
      () => panels.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-annotation-state'))),
      { timeout: 30_000 },
    )
    .toEqual(Array.from({ length: 5 }, () => 'matched'));
  await expect(page.getByTestId('image-annotation-gap-warning')).toHaveCount(0);
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
});
