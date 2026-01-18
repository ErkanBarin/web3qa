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
    const severeConsoleMessages = [];

    page.on('pageerror', (err) => {
      throw err;
    });

    page.on('console', (msg) => {
      // Ignore noisy categories that are often non-actionable
      if (msg.type() === 'warning' || msg.type() === 'info' || msg.type() === 'debug') return;

      // Treat console errors as failures (keeps demo strict and CI-friendly)
      if (msg.type() === 'error') {
        severeConsoleMessages.push(msg.text());
      }
    });

    await page.goto('/about');

    // Stable, user-visible assertion
    await expect(page.getByRole('heading', { level: 1, name: 'Meet Erkan' })).toBeVisible();

    // Ensure the page reached an interactive state
    await expect(page.locator('body')).toBeVisible();

    expect(severeConsoleMessages, `Console errors:\n${severeConsoleMessages.join('\n')}`).toEqual([]);
  });
});
