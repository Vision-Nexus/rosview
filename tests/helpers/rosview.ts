import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, type Page } from '@playwright/test';

export type BrowserDiagnostics = {
  pageErrors: string[];
  consoleErrors: string[];
};

export function attachBrowserDiagnostics(page: Page): BrowserDiagnostics {
  const diagnostics: BrowserDiagnostics = {
    pageErrors: [],
    consoleErrors: [],
  };

  page.on('pageerror', (error) => {
    diagnostics.pageErrors.push(error.message);
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      diagnostics.consoleErrors.push(message.text());
    }
  });

  return diagnostics;
}

function formatDiagnostics(diagnostics: BrowserDiagnostics): string {
  const lines: string[] = [];
  if (diagnostics.pageErrors.length > 0) {
    lines.push(`page errors:\n${diagnostics.pageErrors.map((e) => `  - ${e}`).join('\n')}`);
  }
  if (diagnostics.consoleErrors.length > 0) {
    lines.push(`console errors:\n${diagnostics.consoleErrors.map((e) => `  - ${e}`).join('\n')}`);
  }
  return lines.join('\n');
}

export type OpenFixtureOptions = {
  timeoutMs?: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  diagnostics?: BrowserDiagnostics;
  /** Extra query params merged with `url=`. */
  query?: Record<string, string>;
};

/** Serve committed examples with strict single-range semantics independent of Vite preview quirks. */
async function routeExampleWithRange(page: Page, url: string): Promise<void> {
  if (!url.startsWith('/examples/')) return;
  const filename = path.basename(new URL(url, 'http://127.0.0.1').pathname);
  const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../public/examples', filename);
  const bytes = await readFile(filePath);
  await page.route(`**${url}`, async (route) => {
    const range = route.request().headers().range;
    const match = /^bytes=(\d+)-(\d+)$/.exec(range ?? '');
    if (!match) {
      await route.fulfill({
        status: 200,
        headers: {
          'Accept-Ranges': 'bytes',
          'Content-Length': String(bytes.byteLength),
          'Content-Type': 'application/octet-stream',
        },
        body: bytes,
      });
      return;
    }
    const start = Number(match[1]);
    const end = Math.min(Number(match[2]), bytes.byteLength - 1);
    const body = bytes.subarray(start, end + 1);
    await route.fulfill({
      status: 206,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Length': String(body.byteLength),
        'Content-Range': `bytes ${start}-${end}/${bytes.byteLength}`,
        'Content-Type': 'application/octet-stream',
      },
      body,
    });
  });
}

export async function openFixtureByUrl(
  page: Page,
  url: string,
  options: OpenFixtureOptions = {},
): Promise<void> {
  const { waitUntil = 'domcontentloaded', query = {} } = options;
  await routeExampleWithRange(page, url);
  const params = new URLSearchParams({ url, ...query });
  await page.goto(`/?${params.toString()}`, { waitUntil });
  await waitForRosviewReady(page, options);
}

export async function waitForRosviewReady(
  page: Page,
  options: OpenFixtureOptions = {},
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 60_000;
  const diagnostics = options.diagnostics;

  try {
    await expect(page.locator('#rosview-root')).toHaveAttribute('data-player-presence', 'ready', {
      timeout: timeoutMs,
    });
    await expect(page.getByTestId('rosview-dockview')).toBeVisible({ timeout: timeoutMs });
    await expect(page.getByRole('button', { name: 'Play playback' })).toBeVisible({
      timeout: timeoutMs,
    });
  } catch (error) {
    if (diagnostics && (diagnostics.pageErrors.length > 0 || diagnostics.consoleErrors.length > 0)) {
      throw new Error(
        `${error instanceof Error ? error.message : String(error)}\n${formatDiagnostics(diagnostics)}`,
        { cause: error },
      );
    }
    throw error;
  }
}

export async function expectDockviewTopic(
  page: Page,
  substring: string,
  timeoutMs = 30_000,
): Promise<void> {
  await expect(page.getByTestId('rosview-dockview')).toContainText(substring, {
    timeout: timeoutMs,
  });
}
