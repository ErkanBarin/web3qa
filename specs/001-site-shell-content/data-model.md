# Data Model: Site Shell & Content Architecture

Status: Draft v1 (2025-10-06)

## Overview
Defines canonical entities used across content ingestion, filtering, validation, and UI rendering. Schemas will be implemented in `contentlayer.config.js` and supporting lib utilities. Test IDs (TID-*) referenced for forthcoming unit/e2e specs.

Entities:
1. ContentItem
2. GlossaryTerm (specialization / parallel model)
3. FilterState
4. ValidationReport
5. (Derived) SiteIndex / SectionSummary (aggregation helper)

---
## 1. ContentItem
Represents an MDX article (guide, tool entry, concept, etc.) excluding glossary terms (which may also map onto this shape but have additional glossary semantics).

| Field | Type | Required | Constraints / Notes | Derived | Validation Code | Test Seeds |
|-------|------|----------|---------------------|---------|-----------------|-----------|
| id | string | yes | UUID or slug-based unique (use slug) | yes (slug) | uniqueness | TID-CI-UNIQ-SLUG |
| slug | string | yes | canonical path segment; see slug rules | base for routes | SLUG_DUPLICATE | TID-CI-SLUG-RULE |
| section | enum Section | yes | one of enumerated sections | — | FM_INVALID_ENUM | TID-CI-SECTION-ENUM |
| title | string | yes | 3–120 chars | — | FM_LENGTH_RANGE | TID-CI-TITLE-LEN |
| description | string | yes | 30–300 chars | meta description | FM_LENGTH_RANGE | TID-CI-DESC-LEN |
| chain | enum Chain | no | if present must be allowed chain | chainBadge | CHAIN_UNKNOWN | TID-CI-CHAIN-ENUM |
| tags | string[] | yes | allowed tags only; duplicates removed | normalizedTags | TAG_UNKNOWN | TID-CI-TAG-ENUM |
| lastUpdated | date | no | ISO 8601; if invalid -> error | displayDate | FM_MISSING_FIELD(if required by type) | TID-CI-LASTUPDATED |
| draft | boolean | no | default false; if true excluded | — | — | TID-CI-DRAFT-EXCLUDE |
| body.raw | string | yes | original MDX source | hashed for integrity | SECRET_DETECTED | TID-CI-SECRET-SCAN |
| body.html | string | yes (after compile) | compiled HTML | excerpt | (compile errors) | TID-CI-BODY-COMPILE |
| wordCount | number | derived | count words of raw (\w+) | yes | — | TID-CI-WORDCOUNT |
| readingTimeMin | number | derived | ceil(wordCount / 200) | yes | — | TID-CI-READTIME |
| canonicalUrl | string | derived | siteBase + section + slug | yes | — | TID-CI-CANONICAL |
| openGraph | object | derived | built from frontmatter fields | yes | — | TID-CI-OG |

Normalization Steps:
1. Trim strings.
2. Lowercase slug, section, tags, chain.
3. Remove duplicate tags; stable sort tags lexicographically.

Exclusion Conditions: draft OR any error-level validation codes present.

---
## 2. GlossaryTerm
Represents a term definition. May originate from MDX under `content/glossary/` or section `glossary`.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| term | string | yes | Source of slug generation |
| slug | string | yes | normalized term (lowercase, hyphen) |
| definitionHtml | string | yes | Rendered HTML excerpt (body until first h2 or full) |
| fullContent | ContentItem ref | yes | Link back to underlying ContentItem fields |
| primary | boolean | derived | true if first occurrence of term encountered |

Duplicate Handling: If slug seen before → mark `primary=false`, exclude from user-facing index but log warning GLOSSARY_DUPLICATE.

Ordering: Sort by term (case-insensitive), then original file path.

---
## 3. FilterState
Ephemeral client-side representation (not persisted) used for query param synchronization.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| chain | enum Chain|null | no | null = all chains |
| tag | string|null | no | null = all tags |
| q | string|null | no | search query (>=2 chars) |

Derived Methods:
- `toQueryParams()` returns canonical ordered object { chain?, tag?, q? }.
- `fromURL(url)` parses & normalizes (invalid values dropped).

Deterministic Serialization: keys in order chain, tag, q.

---
## 4. ValidationReport
Aggregate diagnostics produced during build validation.

| Field | Type | Notes |
|-------|------|------|
| generatedAt | ISO date string | UTC timestamp |
| contentHash | string | SHA-256 over sorted (slug + lastUpdated) pairs |
| totals | object | { items, published, excluded, errors, warnings } |
| errors | ValidationIssue[] | array of error-level issues |
| warnings | ValidationIssue[] | array of warning-level issues |
| excluded | string[] | list of slugs excluded (draft or errors) |
| allowedSecrets | { pattern: string, slug: string }[] | whitelisted secret matches |

ValidationIssue:
| Field | Type | Notes |
|-------|------|------|
| code | string | e.g. FM_MISSING_FIELD |
| slug | string | affected content slug |
| field | string? | optional field name |
| message | string | human-friendly description |
| severity | 'error' | 'warning' | derived from code table |

Exit Criteria: Build step fails if `errors.length > 0` OR any SECRET_DETECTED present.

---
## 5. SiteIndex / SectionSummary (Derived)
Not a persisted file—constructed to render homepage and section counts.

| Field | Type | Notes |
|-------|------|------|
| sections | Array<{ id: string; count: number; label: string; }> | Count includes only published items |
| glossaryCount | number | count of primary glossary terms |

Computation: reduce over published ContentItems.

---
## 6. Validation Flow (Detailed State Transitions)
1. Raw MDX → parse frontmatter → provisional ContentItem.
2. Normalize & basic schema check (collect errors).
3. Glossary extraction (if section == glossary or path prefix) create GlossaryTerm candidate.
4. Deduplicate glossary (mark non-primary + warning).
5. Secret scan raw body (errors or allowed secret if annotated).
6. Derive computed fields (wordCount, readingTimeMin, canonicalUrl, openGraph).
7. Filter excluded items (draft || errors).
8. Compute contentHash over remaining.
9. Emit ValidationReport.

---
## 7. Traceability Seeds (Entity ↔ Test IDs)
| Entity Field / Aspect | Test ID | Description |
|-----------------------|---------|-------------|
| slug normalization | TID-CI-SLUG-RULE | ensures transformation rules applied |
| duplicate slug error | TID-CI-UNIQ-SLUG | ensures error triggers exclusion |
| glossary duplicate warning | TID-GLOSS-DUP | second term yields warning |
| filter serialization order | TID-FS-SERIAL | ensures canonical order |
| secret detection | TID-CI-SECRET-SCAN | pattern detection integrity |
| content hash stability | TID-VR-HASH-STABLE | stable across unrelated reorders |

---
## 8. Implementation Notes
- Schemas: likely Zod for concise validation; fallback to manual functions if bundle concerns.
- Contentlayer Computed Fields: implement inside `defineDocumentType` using `computedFields` for slug, wordCount, etc.
- Performance: Avoid expansive regex for mnemonic initially—heuristic acceptable; refine after false positive review.

---
## 9. Open Items / Future Enhancements
| Topic | Note |
|-------|------|
| Multi-locale support | Introduce locale field; would affect contentHash composition |
| Versioning | Potential `version` field to support historical docs |
| Extended Metadata | Social image generation pipeline placeholder |

---
## 10. Revision Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-06 | Initial draft | copilot |
