# Route Contracts

Status: Draft v1 (2025-10-06)

Defines public URL patterns, parameter semantics, canonicalization, and error handling for the Site Shell & Content Architecture feature.

## 1. Core Patterns (Next.js App Router)
| Route Pattern | Description | Params | Notes |
|---------------|-------------|--------|-------|
| `/` | Homepage grid of sections | — | 8 section cards placeholder; counts may be zero |
| `/(content)/[section]` | Section listing view | section (enum Section) | Query params for filters/search |
| `/(content)/[section]/[...slug]` | Article detail (nested path segments) | section, slug path segments | Last segment must match computed slug |
| `/glossary` (future) | Dedicated glossary index (optional alt) | — | Initial MVP may inline under `/references` or simply rely on section route |
| `/*` | Fallback for not-found | — | Custom not-found page rendered |

Note: Glossary initially leverages the standard section route (`/glossary` as section listing); a dedicated standalone layout may be added later.

## 2. Query Parameters (Filters & Search)
| Param | Applies To | Values | Canonicalization | Behavior |
|-------|-----------|--------|------------------|----------|
| `chain` | Section listing | chain enum | lowercase; drop if invalid | Filter to matching chain; single-select |
| `tag` | Section listing | tag enum | lowercase; drop if invalid | Filter to matching tag; single tag |
| `q` | Section listing | string >=2 chars | trim, drop if <2 chars | Partial match title/description search |

Canonical ordering enforced: `chain`, then `tag`, then `q` when serializing URLs.

## 3. Slug Rules
- Slug base derived from filename or frontmatter directive (if added later).
- Transform: lowercase → replace spaces/underscores with `-` → collapse consecutive `-` → strip leading/trailing `-`.
- Multi-segment slugs allowed via folder nesting under `content/<section>/`.
- Full article path = `/[section]/<nested/slug>`.

## 4. Canonical URL Policy
- All canonical URLs are lowercase.
- Requests with uppercase or alternative hyphen collapsing redirect (301) to canonical version.
- Remove trailing slash except root `/`.
- Query params normalized (invalid removed, ordering enforced). If modified, issue 302 redirect to canonical (or Next.js rewrite) before render to maintain single representation.

## 5. Error & Not-Found States
| Condition | Response | Notes |
|-----------|----------|-------|
| Invalid section enum | Not-found page | Do not leak internal list dynamically |
| Article slug not found in section | Not-found page | Provide link back to section & homepage |
| Query params entirely invalid | Redirect to base section URL | Cleans user-shared malformed URLs |
| Mixed valid/invalid query params | Redirect to canonical with only valid | Ensures single cache key |
| Access draft or excluded content | Not-found page | Avoid hinting existence |

## 6. SEO Considerations
- Only published (non-draft, no errors) content eligible for future sitemap.xml.
- `robots` meta: noindex for not-found and error pages.
- Unique `<title>` composed: `title | SiteName`.
- Avoid duplicate content via strict canonicalization (redirects early in request lifecycle).

## 7. Glossary Anchors
- Each glossary term anchor: `#<slug>` inside article page when referencing.
- Cross-link detection: parse inline code/links; replace recognized term occurrences with anchor links (first occurrence per paragraph) — may be deferred to future iteration (MVP placeholder: manual linking only).

## 8. Navigation & Linking Guarantees
- Homepage section cards link to `/[section]` without trailing slash.
- Listing entries link to their article canonical path.
- Filter state updates update pushState with canonical query ordering (no full page reload).

## 9. Security / Hardening
- Reject path traversal attempts (`..`, encoded `%2e%2e`).
- Reject encoded slashes in dynamic segments.
- Normalize Unicode to NFC before slug comparison (avoid homoglyph mismatch) — optional future enhancement.

## 10. Test Coverage Plan (Seeds)
| Scenario | Test ID (planned) | Notes |
|----------|-------------------|-------|
| Invalid section → not found | TID-ROUTE-INVALID-SECTION | e2e not-found.spec |
| Invalid slug → not found | TID-ROUTE-INVALID-SLUG | e2e not-found.spec |
| Canonical redirect (uppercase) | TID-ROUTE-CANON-CASE | integration/unit |
| Query param reorder canonicalization | TID-ROUTE-CANON-QUERY | filters.spec |
| Invalid chain param dropped | TID-ROUTE-DROP-CHAIN | filters.spec |
| Draft access blocked | TID-ROUTE-DRAFT-BLOCK | article.e2e |

## 11. Open Questions / Deferred
| Topic | Reason |
|-------|--------|
| Dedicated glossary index route | Determine UX priority later |
| Multi-tag query param expansion | Complexity not needed now |
| Server-side search query parsing security (ReDoS) | Simple substring search safe; revisit if regex added |

## 12. Revision Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-06 | Initial draft | copilot |
