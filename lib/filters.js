// lib/filters.js
// Utilities for normalizing and serializing filter query parameters.
// Mirrors enumerations defined in research/data-model specs.

const VALID_CHAINS = [
  'ethereum',
  'arbitrum',
  'optimism',
  'polygon',
  'base',
  'avalanche'
];

// Accept internal tags enumeration from spec (lowercased, kebab-case)
// Note: not all tags may appear yet in content; normalization should still allow them.
const TAG_PATTERN = /[a-z0-9]+(?:-[a-z0-9]+)*/; // simple validation after transform

export function normalizeChain(input) {
  if (!input || typeof input !== 'string') return null;
  const v = input.trim().toLowerCase();
  return VALID_CHAINS.includes(v) ? v : null;
}

export function normalizeTag(input) {
  if (!input || typeof input !== 'string') return null;
  const v = input.trim().toLowerCase().replace(/\s+/g, '-');
  if (!v || !TAG_PATTERN.test(v)) return null;
  return v;
}

// parseFilters can accept an object or URLSearchParams and returns normalized state
export function parseFilters(src) {
  let obj = {};
  if (src instanceof URLSearchParams) {
    src.forEach((value, key) => {
      obj[key] = value;
    });
  } else if (src && typeof src === 'object') {
    obj = { ...src };
  }
  const chain = normalizeChain(obj.chain);
  const tag = normalizeTag(obj.tag);
  const q = typeof obj.q === 'string' ? obj.q.trim() : '';
  return { chain, tag, q: q || '' };
}

// serializeQuery orders keys: chain, tag, q and returns '' if no valid params
export function serializeQuery(state) {
  if (!state || typeof state !== 'object') return '';
  const params = [];
  const chain = normalizeChain(state.chain);
  if (chain) params.push(['chain', chain]);
  const tag = normalizeTag(state.tag);
  if (tag) params.push(['tag', tag]);
  const q = typeof state.q === 'string' ? state.q.trim() : '';
  // Include search query only if length >= 2 (avoid noisy 1-char filters)
  if (q.length >= 2) params.push(['q', q]);
  if (!params.length) return '';
  const qs = params
    .sort((a, b) => {
      const order = ['chain', 'tag', 'q'];
      return order.indexOf(a[0]) - order.indexOf(b[0]);
    })
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return `?${qs}`;
}

export default {
  normalizeChain,
  normalizeTag,
  parseFilters,
  serializeQuery
};
