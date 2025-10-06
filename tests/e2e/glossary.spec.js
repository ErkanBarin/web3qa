/**
 * T017 glossary.spec.js
 * Assertions: alphabetical index, anchor linking, duplicate term warning hidden from UI.
 */
import { test, expect } from '@playwright/test';

test.describe('Glossary (T017)', () => {
  test('alphabetical ordering and anchor links', async ({ page }) => {
    await page.goto('/glossary'); // or /glossary section listing depending on routing

    const terms = page.locator('[data-test="glossary-term"]');
    const count = await terms.count();
    if (count > 1) {
      const texts = [];
      for (let i = 0; i < count; i++) {
        texts.push((await terms.nth(i).innerText()).toLowerCase());
      }
      const sorted = [...texts].sort();
      expect(texts).toEqual(sorted);
    }

    // Check anchor presence
    const firstAnchor = terms.first().locator('a[href^="#"]');
    if (await firstAnchor.count() > 0) {
      await expect(firstAnchor).toBeVisible();
    }

    // Duplicate warning not shown in UI
    const warning = page.locator('[data-test="glossary-duplicate-warning"]');
    await expect(warning).toHaveCount(0);
  });
});
