/**
 * T009 filters.spec.js
 * Tests: normalizeChain, normalizeTag, serializeQuery canonical ordering
 * Initially failing placeholders (no implementation yet).
 */
import { describe, it, expect } from 'vitest';

// Placeholder imports (will exist later)
import * as Filters from '../../lib/filters.js';

describe('filters (T009)', () => {
  it('normalizes valid chain to lowercase enum', () => {
    // EXPECTED: 'Ethereum' -> 'ethereum'
    const result = Filters.normalizeChain('Ethereum');
    expect(result).toBe('ethereum');
  });

  it('returns null for unknown chain', () => {
    const result = Filters.normalizeChain('unknownnet');
    expect(result).toBeNull();
  });

  it('normalizes tag (trims, lowercases, hyphenates internal spaces)', () => {
    const result = Filters.normalizeTag('  Performance  Tips ');
    expect(result).toBe('performance-tips');
  });

  it('serializeQuery orders keys chain, tag, q', () => {
    const q = Filters.serializeQuery({ q: 'test', tag: 'testing', chain: 'ethereum' });
    expect(q).toBe('?chain=ethereum&tag=testing&q=test');
  });

  it('serializeQuery drops invalid/empty values', () => {
    const q = Filters.serializeQuery({ chain: 'invalid', tag: '', q: 'a' });
    expect(q).toBe('');
  });
});
