/**
 * T011 metadata.spec.js
 * Tests: canonical URL builder, open graph meta field presence.
 */
import { describe, it, expect } from 'vitest';

import * as Meta from '../../lib/metadata.js';

describe('metadata (T011)', () => {
  it('builds canonical URL without trailing slash', () => {
    const url = Meta.canonicalUrl({ base: 'https://example.com', section: 'guides', slug: 'intro-to-testing' });
    expect(url).toBe('https://example.com/guides/intro-to-testing');
  });

  it('openGraph metadata contains required keys', () => {
    const og = Meta.buildOpenGraph({
      title: 'Intro',
      description: 'Short desc about intro to testing in EVM.',
      canonicalUrl: 'https://example.com/guides/intro',
      section: 'guides',
      tags: ['testing', 'security'],
      lastUpdated: '2025-10-01'
    });
    const required = ['og:title','og:description','og:type','og:url','og:site_name'];
    required.forEach(k => expect(og.some(m => m.property === k)).toBe(true));
  });
});
