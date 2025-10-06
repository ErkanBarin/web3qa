/**
 * T010 contentlayer-helpers.spec.js
 * Tests: getAllBySection excludes invalid, glossary ordering deterministic.
 * Will fail until helpers and contentlayer config implemented.
 */
import { describe, it, expect } from 'vitest';

// Placeholder (module to be implemented later)
import * as CL from '../../lib/contentlayer-helpers.js';

describe('contentlayer helpers (T010)', () => {
  it('getAllBySection excludes draft and error items', () => {
    const items = CL.getAllBySection('guides');
    // Expect only published valid items
    const hasDraft = items.some(i => i.draft === true);
    expect(hasDraft).toBe(false);
  });

  it('glossaryIndex returns sorted unique primary terms', () => {
    const terms = CL.glossaryIndex();
    const sorted = [...terms].sort((a,b) => a.term.localeCompare(b.term));
    expect(terms.map(t=>t.term)).toEqual(sorted.map(t=>t.term));
    // No duplicate slugs
    const slugs = terms.map(t=>t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
