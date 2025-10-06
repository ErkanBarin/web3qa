// lib/metadata.js
// Utilities for constructing canonical URLs and Open Graph metadata arrays.

export function canonicalUrl({ base, section, slug }) {
  const root = base?.replace(/\/$/, '') || '';
  const parts = [root];
  if (section) parts.push(section.replace(/^\/+|\/+$/g, ''));
  if (slug) parts.push(slug.replace(/^\/+|\/+$/g, ''));
  return parts.filter(Boolean).join('/');
}

export function buildOpenGraph({ title, description, canonicalUrl: url, section, tags = [], lastUpdated }) {
  const meta = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'web3qa' }
  ];
  if (section) meta.push({ property: 'article:section', content: section });
  tags.slice(0, 6).forEach(t => meta.push({ property: 'article:tag', content: t }));
  if (lastUpdated) meta.push({ property: 'article:modified_time', content: new Date(lastUpdated).toISOString() });
  return meta;
}

export function buildTwitterCard({ title, description, url }) {
  return [
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:url', content: url }
  ];
}

export default {
  canonicalUrl,
  buildOpenGraph,
  buildTwitterCard
};
