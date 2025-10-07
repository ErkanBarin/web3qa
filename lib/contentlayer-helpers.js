// lib/contentlayer-helpers.js
// Helper utilities wrapping Contentlayer collections. These functions are
// intentionally defensive so unit tests can run even before real content exists.

let contentlayer;
try {
  // Dynamically require generated contentlayer module if build has run.
  // eslint-disable-next-line n/no-missing-require
  contentlayer = await import('../.contentlayer/generated/index.mjs');
} catch (e) {
  contentlayer = {};
}

function safeArray(maybe) {
  return Array.isArray(maybe) ? maybe : [];
}

// Determine published validity (exclude draft or invalid articles)
function isPublished(item) {
  if (!item) return false;
  if (item.draft) {
    return false;
  }
  if (typeof item.isValid === 'boolean' && !item.isValid) {
    return false;
  }
  return true;
}

export function getAllBySection(section) {
  section = section?.toLowerCase();
  const all = safeArray(contentlayer.allArticles || []);
  
  return all.filter(a => a.section?.toLowerCase() === section && isPublished(a));
}

export function getArticleBySlug(section, slug) {
  section = section?.toLowerCase();
  slug = slug?.toLowerCase();
  const articles = safeArray(contentlayer.allArticles || []);
  return articles.find(a => a.slug === slug && a.section?.toLowerCase() === section && isPublished(a)) || null;
}

export function glossaryIndex() {
  const terms = safeArray(contentlayer.allArticles || [])
    .filter(t => t.section?.toLowerCase() === 'glossary' && isPublished(t))
    .map(t => ({ term: t.title, slug: t.slug }));
  // sort deterministically by term (case-insensitive)
  return terms.sort((a, b) => a.term.localeCompare(b.term));
}

export default {
  getAllBySection,
  getArticleBySlug,
  glossaryIndex
};
