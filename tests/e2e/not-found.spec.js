/**
 * T016 not-found.spec.js
 * Assertions: invalid slug -> not-found page guidance.
 */
import { test, expect } from '@playwright/test';

test.describe('Not Found Page (T016)', () => {
  test('navigating to invalid article shows helpful not-found', async ({ page }) => {
    await page.goto('/guides/__definitely_missing__');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/not found/i);
  const homeLink = page.locator('[data-test="return-home"]');
    await expect(homeLink).toBeVisible();
  });
});
