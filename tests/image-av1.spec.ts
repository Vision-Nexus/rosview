import { test, expect, type Page } from '@playwright/test';
import { MCAP_AV1_8BIT, MCAP_AV1_10BIT, MCAP_AV1_MIXED, requireFixture } from './fixturePaths';
import { attachBrowserDiagnostics, openFixtureByUrl, waitForRosviewReady } from './helpers/rosview';

test.describe.configure({ timeout: 120_000 });

async function requireAv1(page: Page, depth: string): Promise<void> {
  await page.goto('/');
  const supported = await page.evaluate(async (bits) => {
    if (typeof VideoDecoder === 'undefined') return false;
    for (const hardwareAcceleration of ['prefer-software', 'no-preference'] as const) {
      if ((await VideoDecoder.isConfigSupported({ codec: `av01.0.00M.${bits}`, hardwareAcceleration })).supported) return true;
    }
    return false;
  }, depth);
  test.skip(!supported, `Browser has no ${depth}-bit AV1 WebCodecs decoder`);
}

for (const [depth, file] of [['08', MCAP_AV1_8BIT], ['10', MCAP_AV1_10BIT]] as const) {
  test(`AV1 ${depth}-bit local playback recovers after forward and reverse seeks`, async ({ page }) => {
    requireFixture(file);
    await requireAv1(page, depth);
    const diagnostics = attachBrowserDiagnostics(page);
    await page.locator('#rosview-landing-file').setInputFiles(file);
    await waitForRosviewReady(page, { diagnostics });
    const panel = page.getByTestId('image-panel');
    const canvas = page.getByTestId('image-panel-canvas');
    await expect(page.getByTestId('image-panel-status')).toHaveText('160x96 av1', { timeout: 30_000 });
    await expect(canvas).toHaveAttribute('data-frame-time-ns', '1000000000');
    const track = page.getByTestId('playback-track');
    for (const [position, expectedTime] of [[0.85, '5000000000'], [0.3, '2000000000'], [0.65, '4000000000']] as const) {
      const box = await track.boundingBox();
      expect(box).not.toBeNull();
      await page.mouse.click(box!.x + box!.width * position, box!.y + box!.height / 2);
      await expect(canvas).toHaveAttribute('data-frame-time-ns', expectedTime, { timeout: 30_000 });
      await expect(page.getByTestId('image-panel-status')).toHaveText('160x96 av1');
    }
    await page.getByRole('button', { name: 'Play playback', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Pause playback', exact: true })).toBeVisible();
    await expect(panel).toHaveAttribute('data-video-codec', /^av01\./, { timeout: 30_000 });
    await page.getByRole('button', { name: 'Pause playback', exact: true }).click();
    expect(diagnostics.pageErrors).toEqual([]);
    expect(diagnostics.consoleErrors).toEqual([]);
  });
}

test('AV1 8/10-bit and H.264 render together through remote MCAP Range reads', async ({ page }) => {
  requireFixture(MCAP_AV1_MIXED);
  await requireAv1(page, '10');
  const diagnostics = attachBrowserDiagnostics(page);
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('test_av1_mixed.mcap') && request.headers().range) requests.push(request.headers().range);
  });
  await openFixtureByUrl(page, '/examples/test_av1_mixed.mcap', { diagnostics });
  const panels = page.getByTestId('image-panel');
  await expect(panels).toHaveCount(3);
  await expect.poll(() => page.getByTestId('image-panel-canvas').evaluateAll((elements) => elements.every((element) =>
    element.getAttribute('data-frame-time-ns') === '1000000000')), { timeout: 45_000 }).toBe(true);
  await page.getByRole('button', { name: 'Play playback', exact: true }).click();
  await expect.poll(() => panels.evaluateAll((elements) => elements.map((element) =>
    element.getAttribute('data-video-codec')?.split('.')[0]).sort()), { timeout: 30_000 })
    .toEqual(['av01', 'av01', 'avc1']);
  expect(requests.length).toBeGreaterThan(0);
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
});

test('AV1 runtime decoder failure bootstraps a native software decoder and still seeks', async ({ page }) => {
  requireFixture(MCAP_AV1_8BIT);
  // Exercise the complete real renderer recovery, not only isConfigSupported.
  // Fail advertised hardware/default AV1 decode once per decoder, then delegate
  // the software path to the actual browser VideoDecoder and paint real frames.
  await page.addInitScript(() => {
    const observations: string[] = [];
    (window as unknown as { av1DecoderModes: string[] }).av1DecoderModes = observations;
    const NativeBlob = window.Blob;
    const NativeWorker = window.Worker;
    const prefix = `
      const __av1NativeDecoder = self.VideoDecoder;
      if (__av1NativeDecoder) self.VideoDecoder = class extends __av1NativeDecoder {
        constructor(init) { super(init); this.testInit = init; }
        configure(config) {
          this.testConfig = config;
          super.configure(config);
          if (config.codec.startsWith('av01.')) self.postMessage({
            type: 'av1TestConfig', mode: config.hardwareAcceleration
          });
        }
        decode(chunk) {
          if (this.testConfig.codec.startsWith('av01.') && this.testConfig.hardwareAcceleration !== 'prefer-software') {
            this.close();
            queueMicrotask(() => this.testInit.error(new DOMException('Injected AV1 hardware failure', 'EncodingError')));
            return;
          }
          super.decode(chunk);
        }
      };
    `;
    window.Blob = class extends NativeBlob {
      constructor(parts: BlobPart[] = [], options: BlobPropertyBag = {}) {
        super(options.type?.includes('javascript') ? [prefix, ...parts] : parts, options);
      }
    };
    window.Worker = class extends NativeWorker {
      constructor(url: string | URL, options?: WorkerOptions) {
        super(url, options);
        this.addEventListener('message', (event: MessageEvent<{ type?: string; mode?: string }>) => {
          if (event.data.type === 'av1TestConfig' && event.data.mode) observations.push(event.data.mode);
        });
      }
    };
  });
  await requireAv1(page, '08');
  const diagnostics = attachBrowserDiagnostics(page);
  await page.locator('#rosview-landing-file').setInputFiles(MCAP_AV1_8BIT);
  await waitForRosviewReady(page, { diagnostics });
  const canvas = page.getByTestId('image-panel-canvas');
  await expect(canvas).toHaveAttribute('data-frame-time-ns', '1000000000', { timeout: 30_000 });
  const modes = await page.evaluate(() => (window as unknown as { av1DecoderModes: string[] }).av1DecoderModes);
  expect(modes[0]).not.toBe('prefer-software');
  expect(modes.at(-1)).toBe('prefer-software');
  const box = await page.getByTestId('playback-track').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + box!.width * 0.85, box!.y + box!.height / 2);
  await expect(canvas).toHaveAttribute('data-frame-time-ns', '5000000000', { timeout: 30_000 });
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
});
