# Metadata Contract

Status: Draft v1 (2025-10-06)

Defines how frontmatter fields map to HTML head metadata, Open Graph (OG), and structured data for the Site Shell & Content Architecture feature.

## 1. Inputs
Frontmatter fields (see `data-model.md`): `title`, `description`, `section`, `chain?`, `tags[]`, `lastUpdated?`, `draft?`.

## 2. Core Meta Tags
| Purpose | Tag / Attr | Source | Rule |
|---------|------------|--------|------|
| Document title | `<title>` | title | Append site name: `title | Web3 QA` |
| Charset | `<meta charset>` | static | `utf-8` |
| Viewport | `<meta name="viewport">` | static | `width=device-width,initial-scale=1` |
| Description | `<meta name="description">` | description | Trim to ≤155 chars for SERP; no hard cut if 300 internal |
| Theme color | `<meta name="theme-color">` | static | `#0d0d0d` (dark) (evaluate dynamic in future) |
| Robots (default) | `<meta name="robots">` | static | `index,follow` (override for not-found/drafts) |

## 3. Open Graph / Social
| Property | Tag | Source | Rule |
|----------|-----|--------|------|
| og:title | `<meta property="og:title">` | title | Same as page title minus site suffix |
| og:description | `<meta property="og:description">` | description | Same trimmed variant |
| og:type | `<meta property="og:type">` | static | `article` for content pages; `website` for home |
| og:url | `<meta property="og:url">` | canonicalUrl | Ensure absolute URL |
| og:site_name | `<meta property="og:site_name">` | static | `Web3 QA` |
| article:section | `<meta property="article:section">` | section | lowercase |
| article:tag (repeat) | `<meta property="article:tag">` | tags | Only first 5 tags to limit bloat |
| article:modified_time | `<meta property="article:modified_time">` | lastUpdated | ISO 8601 if present |

Image: Placeholder static social image until generation pipeline added. Tag: `<meta property="og:image">` constant `/social-default.png`.

## 4. Twitter Cards
| Tag | Source | Rule |
|-----|--------|------|
| `<meta name="twitter:card">` | static | `summary_large_image` |
| `<meta name="twitter:title">` | title | Same as og:title |
| `<meta name="twitter:description">` | description | Same truncated description |
| `<meta name="twitter:image">` | static | same as og:image |

## 5. Canonical URL
`<link rel="canonical" href="<canonicalUrl>" />` always present for article & section pages. Homepage canonical is root domain only.

Canonical generation: `https://<site-domain>/<section>/<nested/slug>` without trailing slash.

Redirect policy for mismatch handled at routing layer (see `routes.md`).

## 6. Draft / Excluded Content
Draft or excluded items never published; if accidentally accessed, not-found page served with meta robots `noindex,follow` and no canonical tag (avoid indexation confusion).

## 7. Structured Data (JSON-LD) — Minimal MVP
Article pages embed JSON-LD:
```
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<title>",
  "description": "<description>",
  "dateModified": "<lastUpdated || generatedAt>",
  "articleSection": "<section>",
  "keywords": "<comma-joined first 8 tags>",
  "inLanguage": "en"
}
```
Draft: structured data omitted.

## 8. Validation Rules
| Rule | Condition | Response |
|------|-----------|----------|
| Title length | <3 or >120 | FM_LENGTH_RANGE error (frontmatter) |
| Description length | <30 or >300 | FM_LENGTH_RANGE error |
| OG Required Fields | title or description missing | Already captured by frontmatter validation |
| Tag limit (OG) | >5 tags | Only first 5 emitted (no error) |
| JSON-LD keywords length | >8 tags | Truncate silently |

## 9. Security / Privacy
- No user PII embedded.
- No dynamic runtime user data in meta.
- Avoid injecting unescaped frontmatter: escape HTML entities in title/description.

## 10. Performance Considerations
- Inline JSON-LD kept minimal (<1.5KB typical).
- Defer heavy social image generation to later iteration.

## 11. Test Plan Seeds
| Scenario | Test ID | Notes |
|----------|---------|-------|
| canonical tag correct | TID-META-CANON | metadata.spec |
| OG tags present | TID-META-OG | metadata.spec |
| robots noindex on not-found | TID-META-NOINDEX | not-found.e2e |
| JSON-LD present article | TID-META-JSONLD | article.e2e |
| description truncated for SERP length | TID-META-DESC-TRUNC | metadata.spec |

## 12. Open / Deferred
| Item | Reason |
|------|--------|
| Dynamic OG image per article | Pipeline complexity |
| Multi-language hreflang | i18n deferral |
| Author attribution meta | Not captured in frontmatter yet |

## 13. Revision Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-06 | Initial draft | copilot |
