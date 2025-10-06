/**
 * T013 homepage.spec.js
 * Assertions: 8 section cards, skip link focus, theme toggle exists.
 * Placeholder using Playwright test API (not yet installed/configured).
 */
import { test, expect } from '@playwright/test';

test.describe('Homepage (T013)', () => {
  test('renders section cards and theme toggle & skip link', async ({ page }) => {
    await page.goto('/');
    // Skip link should be the first focusable element
    await page.keyboard.press('Tab');
    const skip = await page.locator('a[href="#main"]');
    await expect(skip).toBeFocused();

    // 8 section cards (placeholder selector)
    const cards = page.locator('[data-test="section-card"]');
    await expect(cards).toHaveCount(8);

    // Theme toggle
    const toggle = page.locator('[data-test="theme-toggle"]');
    await expect(toggle).toBeVisible();
  });
});
