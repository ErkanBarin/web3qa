/**
 * T019 performance.spec.js
 * Placeholder: Lighthouse scripted assertions (LCP & a11y score) will be integrated later.
 */
import { test, expect } from '@playwright/test';

test.describe('Performance Placeholder (T019)', () => {
  test('listing page loads (placeholder assertions)', async ({ page }) => {
    await page.goto('/guides');
    // Placeholder hydration marker later: data-hydrated
    // For now just ensure page reaches a state with at least a main element
    await expect(page.locator('main')).toBeVisible();
  });
});
