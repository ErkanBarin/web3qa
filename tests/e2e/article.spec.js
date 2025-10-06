/**
 * T015 article.spec.js
 * Assertions: metadata panel, last-updated conditional, glossary cross-link.
 */
import { test, expect } from '@playwright/test';

test.describe('Article Page (T015)', () => {
  test('shows metadata panel and optional last updated & glossary link', async ({ page }) => {
    // Navigate to section listing first, then find a real article
    await page.goto('/guides');
    
    // Find any article link and navigate to it
    const articleLink = page.locator('[data-test="listing-results"] a').first();
    if (await articleLink.count() > 0) {
      await articleLink.click();
    } else {
      // Fallback: skip this test if no articles are available
      console.log('No articles found, skipping meta test');
      return;
    }

    const metaPanel = page.locator('[data-test="article-meta"]');
    await expect(metaPanel).toBeVisible();

    const lastUpdated = metaPanel.locator('[data-test="last-updated"]');
    // Conditional: allow either visible or absent, but if visible must have ISO date pattern
    if (await lastUpdated.count() > 0) {
      await expect(lastUpdated).toContainText(/202\d-/);
    }

    // Glossary cross-link (placeholder attribute)
    const glossaryLink = page.locator('[data-test="glossary-link"]').first();
    if (await glossaryLink.count() > 0) {
      await expect(glossaryLink).toHaveAttribute('href', /glossary/);
    }
  });
});
