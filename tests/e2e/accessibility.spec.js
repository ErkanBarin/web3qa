/**
 * T018 accessibility.spec.js
 * Assertions: axe smoke (landmarks, headings), contrast stub.
 */
import { test, expect } from '@playwright/test';

// Placeholder axe integration; will be wired once axe is configured.

test.describe('Accessibility Smoke (T018)', () => {
  test('landmarks and single H1 on homepage', async ({ page }) => {
    await page.goto('/');
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
  });
});
