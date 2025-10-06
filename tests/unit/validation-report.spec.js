/**
 * T020 validation-report.spec.js
 * Tests: counts correct for invalid metadata & secret hits.
 * Placeholder until validation script & data models are implemented.
 */
import { describe, it, expect } from 'vitest';

// This module will be implemented later.
import { generateValidationReport } from '../../scripts/validate-content.mjs';

describe('Validation Report (T020)', () => {
  it('aggregates errors, warnings, excluded items, and secrets', async () => {
    // Placeholder synthetic input once generator exists
    const mock = {
      items: [
        { slug: 'good-article', draft: false, errors: [], warnings: [] },
        { slug: 'bad-article', draft: false, errors: ['FM_MISSING_FIELD'], warnings: [] },
        { slug: 'draft-article', draft: true, errors: [], warnings: [] },
        { slug: 'secret-article', draft: false, errors: ['SECRET_DETECTED'], warnings: [] }
      ],
      secrets: [{ slug: 'secret-article', pattern: 'Ethereum Private Key' }]
    };

    // When implemented, generateValidationReport will produce a summary object.
    const report = await generateValidationReport(mock.items, mock.secrets);

    expect(report.totals.items).toBe(4);
    expect(report.totals.published).toBe(1); // only good-article
    expect(report.totals.excluded).toBe(3); // others have errors or draft
    expect(report.errors.length).toBeGreaterThanOrEqual(2); // FM + SECRET
    expect(report.warnings.length).toBeGreaterThanOrEqual(0);
  });
});
