/**
 * Golden demo: deterministic, traceable, CI-ready.
 *
 * Goal:
 * - Verify a stable, user-facing page renders
 * - Fail fast on page errors or severe console errors
 */
import { test, expect } from '@playwright/test';

test.describe('Golden Demo', () => {
  test('About page loads without severe errors', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];
    const requestFailures = [];

    page.on('pageerror', (err) => pageErrors.push(String(err)));

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure();
      const errorText = failure?.errorText || 'request failed';
      if (errorText.includes('net::ERR_ABORTED')) return;

      requestFailures.push(`${req.method()} ${req.url()} -> ${errorText}`);
    });

    const configuredBaseURL = test.info().project.use?.baseURL;
    const baseURL = configuredBaseURL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
    const aboutUrl = new URL('/about', baseURL).toString();

    await page.goto(aboutUrl, { waitUntil: 'domcontentloaded' });

    // Stable, user-visible assertion
    await expect(page.getByRole('heading', { level: 1, name: 'Meet Erkan' })).toBeVisible();

    // Ensure the page reached an interactive state
    await expect(page.locator('body')).toBeVisible();

    expect(pageErrors, `Page errors:\n${pageErrors.join('\n')}`).toEqual([]);
    expect(consoleErrors, `Console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
    expect(requestFailures, `Request failures:\n${requestFailures.join('\n')}`).toEqual([]);
  });
});
