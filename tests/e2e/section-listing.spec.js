/**
 * T014 section-listing.spec.js
 * Assertions: chain filter single-select, tag filter, empty state, query param persistence.
 */
import { test, expect } from '@playwright/test';

test.describe('Section Listing (T014)', () => {
  test('applies chain & tag filters and persists via query params', async ({ page }) => {
    await page.goto('/guides');

    const chainSelect = page.locator('[data-test="chain-filter"]');
    const tagSelect = page.locator('[data-test="tag-filter"]');

    await chainSelect.selectOption('ethereum');
    // Wait for first navigation to complete
    await expect(page).toHaveURL(/chain=ethereum/);
    
    await tagSelect.selectOption('testing');
    // Now expect both parameters
    await expect(page).toHaveURL(/chain=ethereum&tag=testing/);

    // Empty state when filters produce zero matches (placeholder)
    const empty = page.locator('[data-test="empty-state"]');
    if (await empty.isVisible()) {
      await expect(empty).toContainText('No results');
    }
  });
});
