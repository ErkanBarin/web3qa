# Research & Design Decisions: Site Shell & Content Architecture

Status: Draft (initial creation) — to be refined as implementation uncovers new facts. Update log appended at bottom.

## Purpose
Consolidate canonical enumerations, validation heuristics, performance & accessibility baselines, and rationale choices extracted from `spec.md` and `plan.md`. This document feeds data-model, contracts, validation scripts, and test scaffolds.

## 1. Enumerations & Controlled Vocabularies
### 1.1 Supported Chains (testnet-only per security posture)
| ID | Label | Notes |
|----|-------|-------|
| ethereum | Ethereum | References limited to main concepts; test references use Sepolia where examples needed |
| arbitrum | Arbitrum | Rollup L2 |
| optimism | Optimism | Rollup L2 |
| polygon | Polygon PoS | Sidechain/L2 hybrid |
| base | Base | Coinbase L2 |
| avalanche | Avalanche | C-Chain; treat as EVM-compatible |
| xrpl | XRP Ledger | Includes native XRPL (Hooks) and EVM Sidechain; testnet references only |

Rationale: Focus on widely-used EVM ecosystems minimizing fragmentation while maintaining breadth for tooling examples. XRPL added 2025-10-29 to support dual-universe testing content (native + EVM sidechain).

### 1.2 Allowed Tags (initial scope – single-select UI for chain, single tag filter)
| Tag | Category | Notes |
|-----|----------|-------|
| testing | topic | Testing methodologies and frameworks |
| security | topic | Auditing, threat modeling |
| tooling | topic | Development & debugging tools |
| guides | content-type | Step-by-step instructions |
| glossary | content-type | Terms and definitions (applied automatically to glossary items) |
| architecture | topic | System & protocol design |
| best-practices | topic | Prescriptive recommendations |
| performance | topic | Gas optimization, runtime efficiency |
| xrpl | chain-specific | XRP Ledger related content |
| hooks | chain-specific | XRPL Hooks (native smart contracts) |
| evm | chain-specific | EVM-compatible chains and tools |
| xahau | chain-specific | Xahau Ledger (XRPL Hooks implementation) |
| jest | tooling-specific | Jest testing framework |
| xaman | tooling-specific | Xaman wallet (formerly XUMM) |

Normalization Rule: lowercase kebab-case; on ingest, trim, lowercase, collapse internal whitespace to single hyphen. Unknown tags → invalid content (excluded from published listing but logged in validation report).

### 1.3 Section Identifiers
Top-level content sections displayed on homepage grid (8 slots placeholder):
`guides`, `tools`, `concepts`, `patterns`, `tutorials`, `glossary`, `references`, `faq`

(Sections with no content may still render a card with count=0.)

### 1.4 Frontmatter Required Fields (summary reference)
- `title` (string, 3–120 chars)
- `description` (string, 30–300 chars; used for meta description)
- `section` (enum Section Identifiers)
- `chain` (enum Supported Chains OR omitted meaning "chain-agnostic")
- `tags` (array of Allowed Tags; may be empty; duplicates removed)
- `lastUpdated` (ISO date; optional; if missing omit UI field)
- `draft` (boolean; default false)

## 2. URL & Slug Canonicalization
### 2.1 Slug Generation
- Base: relative path under `content/<section>/` minus extension.
- Transform: lowercase → replace spaces/underscores with `-` → collapse multiple `-` → strip leading/trailing `-`.
- Glossary Terms: slug = normalized term (same transform). Provide anchor `#term` for intra-page navigation (future multi-term pages).

### 2.2 Query Parameters (filters)
| Param | Meaning | Rules |
|-------|---------|-------|
| `chain` | chain filter | must match chain enum; else removed |
| `tag` | tag filter | must match tag enum; else removed |
| `q` | search query | trimmed; if <2 chars after trim drop |

Canonical Ordering: `?chain=<value>&tag=<value>&q=<value>` (omit empty). Serialize deterministically for shareable URLs.

### 2.3 Case & Encoding
All slugs and query param values forced to lowercase; percent-encoding applied only where necessary by standard library; reject paths containing encoded `/` or `..` sequences.

## 3. Glossary Indexing
- Source: All content with section `glossary` OR location under `content/glossary/`.
- Ordering: Primary alphabetical by term (locale-insensitive a→z), stable secondary by original filename to break ties.
- Duplicate Term Handling: Only first encountered becomes canonical; duplicates flagged in ValidationReport with severity=warning; subsequent duplicates excluded from index.
- Anchor Format: `#<slug>`.

## 4. Validation Heuristics & Pipeline
Order of operations (build-time script):
1. Load documents via Contentlayer.
2. Frontmatter schema validation (Zod or built-in object schema) → accumulate errors.
3. Tag & chain enum checks.
4. Slug collision detection (including glossary duplicates).
5. Secret scan (regex set below) on raw MDX content.
6. Exclusion filtering: any content with errors OR `draft: true` removed from published collections.
7. Generate ValidationReport JSON (fields: totals, errors[], warnings[], excluded[], hash).
8. Exit non-zero if errors > 0 OR secrets detected.

### 4.1 Secret Scan Patterns
| Purpose | Pattern (JS literal) | Notes |
|---------|----------------------|-------|
| Ethereum Private Key | `/0x[a-fA-F0-9]{64}/` | 64 hex chars prefixed 0x |
| Mnemonic (12 words) | `/\b([a-z]+\s){11}[a-z]+\b/` | Simple heuristic; may FP—bounded by wordlist length later |
| Alchemy API Key (hex) | `/\b[aA]lchemy[a-zA-Z0-9]{10,}\b/` | Placeholder pattern refine later |
| Infura Project ID | `/\b[0-9a-fA-F]{32}\b/` | Generic 32-hex catch; risk FP |

False Positive Strategy: Allow `<!-- allow-secret: <pattern-name> -->` annotation directly above offending line to whitelist (pattern name exact match to table Purpose column; logged as allowedSecret in report).

### 4.2 Error / Warning Taxonomy
| Code | Level | Trigger |
|------|-------|---------|
| FM_MISSING_FIELD | error | Required frontmatter absent |
| FM_INVALID_ENUM | error | chain / section / tag invalid |
| FM_LENGTH_RANGE | error | title/description length outside bounds |
| SLUG_DUPLICATE | error | Two non-glossary docs same slug |
| GLOSSARY_DUPLICATE | warning | Duplicate glossary term beyond first |
| SECRET_DETECTED | error | Unwhitelisted secret pattern match |
| TAG_UNKNOWN | error | Tag not in allowed set |
| CHAIN_UNKNOWN | error | Chain not in allowed set |

## 5. Performance Baselines
| Metric | Target | Rationale |
|--------|--------|-----------|
| LCP (initial content pages) | < 2.5s (mobile emu) | Core Web Vitals threshold |
| Listing FMP+hydrate | < 1.0s with ≤200 items | Fast scan/filter experience |
| First Interaction (filter click) | < 150ms | Perceived instant feedback |
| Bundle (initial) | Keep below 170KB gzip | Avoid early bloat; shell minimal |

Measurement Approach: Playwright + Lighthouse (PSI config) for LCP; custom timer in test harness for filter interaction latency (measure time to DOM update of filtered list container).

## 6. Accessibility Baselines
| Aspect | Requirement | Verification |
|--------|-------------|--------------|
| Skip Navigation | Present & focusable before main | e2e: homepage skip link test |
| Keyboard Navigation | All interactive elements reachable in logical order | axe + manual tab sweep |
| Headings | h1 unique per page; hierarchical h2/h3 | snapshot test + axe |
| Color Contrast | WCAG AA (>=4.5:1 text) | Tailwind theme tokens + axe |
| Focus Visible | Outline on all focus states (no removal) | visual regression spot |
| Reduced Motion | Honors `prefers-reduced-motion` for theme transitions | manual + CSS check |

## 7. Security & Privacy Considerations
- No mainnet private keys/examples; testnet addresses only.
- No analytics/telemetry scripts in MVP (explicit NFR assertion).
- Avoid user PII capture—forms not included in scope.
- Hard fail build on secret detection (no soft pass).

## 8. Open Questions (Deferred / Future Scope)
| Item | Deferral Reason | Future Consideration |
|------|-----------------|----------------------|
| Multi-tag filtering | Complexity vs. MVP speed | Could add intersection logic & UI chips |
| Full-text body search | Performance & infra (needs index) | Consider WASM-based mini search (FlexSearch) |
| Sitemap generation | Out of initial shell necessity | Add once publishing cadence established |
| Analytics instrumentation | Privacy-first baseline | Add with consent gating |

## 9. Traceability Mapping Seeds
Will be elaborated in `data-model.md` & tests: each FR/NFR maps to at least one test ID. Example seeds:
| FR/NFR | Preliminary Test IDs |
|--------|----------------------|
| FR-006 chain filter | filters.spec:chain-valid, section-listing.e2e:apply-chain |
| FR-010 theme toggle | homepage.e2e:theme-toggle-visible |
| NFR-001 performance budgets | performance.e2e:lcp-threshold, performance.e2e:interaction-latency |

## 10. Hashing Strategy (Content Integrity)
- Compute SHA-256 hash over concatenated sorted list of published content slugs + their lastUpdated (or file mtime if missing) to embed in ValidationReport `contentHash` (supports NFR-011 traceability).

## 11. Update Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-06 | Initial draft creation | copilot |

---
NEXT: Produce `data-model.md` and contracts docs referencing above enumerations.
