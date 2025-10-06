# Tasks: Site Shell & Content Architecture

**Input**: Design documents from `specs/001-site-shell-content/`
**Prerequisites**: plan.md (present). research.md, data-model.md, contracts/ pending creation in Phase 0/1 tasks below.

## Execution Flow (main)
```
1. Confirm plan.md present (PASS)
2. Generate research + design artifacts first (Phase 0 & 1) per plan
3. Write failing tests (unit + e2e) mapped to FR/NFR before implementing code
4. Implement minimal code to satisfy tests incrementally
5. Add polish (perf, a11y, docs) and validation enforcement
6. Final verification (all tests green, performance budgets met)
```

## Legend
- `[P]` Parallel-capable (different file / no dependency)
- IDs: T001, T002 ... sequential, grouped by phase/dependency

## Phase 0: Research & Foundational Docs (TDD Preparation)
- [x] T001 Create `specs/001-site-shell-content/research.md` with decisions (chains enum, tags enum, secret regexes, Lighthouse thresholds, glossary ordering, query param canonicalization, heading hierarchy) — derive from plan bullet list.
- [x] T002 Create `specs/001-site-shell-content/data-model.md` (entities: ContentItem, GlossaryTerm, FilterState, ValidationReport; include field tables & validation rules) depends:T001
- [x] T003 Create `specs/001-site-shell-content/contracts/routes.md` (route patterns, query params, canonical lowercase rules, sitemap inclusion logic) depends:T001
- [x] T004 Create `specs/001-site-shell-content/contracts/metadata.md` (frontmatter schema, enums, invalid handling states) depends:T001
- [x] T005 Create `specs/001-site-shell-content/contracts/a11y.md` (skip link behavior, focus order, heading semantics, contrast criteria) depends:T001
- [x] T006 Create `specs/001-site-shell-content/contracts/perf.md` (Lighthouse config, budgets: LCP<2.5s, FMP+hydrate<1.0s listing, interaction<150ms, thresholds) depends:T001
- [x] T007 Create `specs/001-site-shell-content/quickstart.md` (dev setup, add content, run validation script, run tests) depends:T002,T003,T004,T005,T006
- [x] T008 Run `.specify/scripts/bash/update-agent-context.sh copilot` to append new context summary (record changes section) depends:T007

## Phase 1: Test Scaffolding (Unit + E2E) — MUST FAIL INITIALLY
### Unit Test Scaffolds
- [x] T009 [P] Create `tests/unit/filters.spec.js` (tests: normalizeChain, normalizeTag, query serialization order) depends:T002,T003
- [x] T010 [P] Create `tests/unit/contentlayer-helpers.spec.js` (tests: getAllBySection excludes invalid, glossary ordering deterministic) depends:T002,T004
- [x] T011 [P] Create `tests/unit/metadata.spec.js` (tests: canonical URL builder, open graph meta field presence) depends:T003,T004
- [x] T012 [P] Create `tests/unit/secret-scan.spec.js` (tests: detect private key pattern, mnemonic phrase, ignore false positives) depends:T001

### E2E Test Scaffolds (Playwright)
- [x] T013 [P] Create `tests/e2e/homepage.spec.js` (assert 8 section cards, skip link focus, theme toggle exists) depends:T003
- [x] T014 [P] Create `tests/e2e/section-listing.spec.js` (chain filter single-select, tag filter, empty state, query param persistence) depends:T003,T004
- [x] T015 [P] Create `tests/e2e/article.spec.js` (renders metadata panel, last-updated conditional, glossary cross-link) depends:T002,T004
- [x] T016 [P] Create `tests/e2e/not-found.spec.js` (invalid slug → not-found page guidance) depends:T003
- [x] T017 [P] Create `tests/e2e/glossary.spec.js` (alphabetical index, anchor linking, duplicate term warning hidden from UI) depends:T002,T004
- [x] T018 [P] Create `tests/e2e/accessibility.spec.js` (axe smoke: landmarks, headings, contrast stub) depends:T005
- [x] T019 [P] Create `tests/e2e/performance.spec.js` (Lighthouse scripted assertions on LCP & a11y score placeholders) depends:T006

### Validation Script Tests
- [x] T020 Create `tests/unit/validation-report.spec.js` (counts correct for invalid metadata, secret hits) depends:T002,T004,T012

## Phase 2: Core Implementation (Minimal to satisfy tests)
### Base Project & Config
- [x] T021 Initialize project manifest: `package.json` (scripts: dev, build, test:unit, test:e2e, lint, validate) and add dependencies (next@14, react, react-dom, tailwindcss, @tailwindcss/typography, contentlayer, next-contentlayer, lucide-react, playwright, vitest, axe-core) depends:T009-T020
- [x] T022 Add Tailwind config + `postcss.config.js` + `globals.css` with base, typography plugin integration depends:T021
- [x] T023 Add `contentlayer.config.js` defining Article & GlossaryTerm document types, computed slug, validation filters depends:T021,T002,T004
- [x] T024 Implement build validation script `scripts/validate-content.mjs` (frontmatter schema, enum checks, secret scan, summary report) depends:T021,T012,T004
- [x] T025 Add NPM script `validate` running contentlayer build + validate-content + link check placeholder depends:T024

### App Router Layout & Pages
- [x] T026 Create `app/layout.jsx` (html lang, theme class root wrapper, SkipLink insertion point) depends:T021,T005
- [x] T027 Create `app/page.jsx` (hero + 8 SectionCard components placeholder) depends:T026
- [x] T028 Create `app/(content)/[section]/page.jsx` (listing: filter chain/tag from query, render EmptyState) depends:T027,T023,T024
- [x] T029 Create `app/(content)/[section]/[...slug]/page.jsx` (article resolve by slug, metadata panel, glossary link rendering) depends:T028,T023
- [x] T030 Create `app/not-found.jsx` custom page referencing helpful navigation options depends:T026

### Components
- [ ] T031 [P] `components/SkipLink.jsx` (a11y skip to main) depends:T026
- [ ] T032 [P] `components/Header.jsx` (site nav + theme toggle host) depends:T026
- [ ] T033 [P] `components/Footer.jsx` (basic footer, sitemap link placeholder) depends:T026
- [ ] T034 [P] `components/SectionCard.jsx` (receives section id + label) depends:T027
- [ ] T035 [P] `components/ArticleMeta.jsx` (chain badge, tags, lastUpdated) depends:T029
- [ ] T036 [P] `components/ChainFilter.jsx` (single-select chain, emits query param update) depends:T028
- [ ] T037 [P] `components/TagFilter.jsx` (single tag selector) depends:T028
- [ ] T038 [P] `components/EmptyState.jsx` (shows message & suggestions) depends:T028
- [ ] T039 [P] `components/ThemeToggle.jsx` (dark/light toggle with localStorage persistence & reduced-motion respect) depends:T026

### Lib Utilities
- [ ] T040 `lib/filters.js` (normalizeChain, normalizeTag, serializeQuery canonical ordering) depends:T009
- [ ] T041 `lib/contentlayer-helpers.js` (getAllBySection, getArticleBySlug, glossaryIndex, exclude invalid) depends:T010,T023
- [ ] T042 `lib/metadata.js` (canonicalUrl, buildMetaTags, openGraph helpers) depends:T011
- [ ] T043 `lib/secret-scan.js` (regex detection exported for validation script) depends:T012

### Glossary & Content Samples
- [ ] T044 Add sample content: `content/guides/ethereum/intro-to-testing.mdx` with valid frontmatter depends:T023
- [ ] T045 Add glossary sample: `content/glossary/fuzzing.mdx` with frontmatter + term definition depends:T023
- [ ] T046 Add invalid sample (draft) to test exclusion: `content/tools/ethereum/experimental-tool.mdx` (missing required field) depends:T023

## Phase 3: Test Execution & Iterative Fixes
- [ ] T047 Run unit tests (expect failures for unimplemented code) depends:T009-T046
- [ ] T048 Run e2e tests (expect initial failures) depends:T047
- [ ] T049 Implement incremental fixes until unit tests pass (iterate) depends:T047
- [ ] T050 Implement incremental fixes until e2e tests pass (iterate) depends:T048,T049

## Phase 4: Performance & Accessibility Hardening
- [ ] T051 Add Lighthouse CI config file `lighthouserc.json` with thresholds (LCP, a11y≥90) depends:T025,T029
- [ ] T052 Optimize images / hero assets (ensure no layout shift) depends:T027,T051
- [ ] T053 Validate focus states & keyboard nav manually; adjust components (a11y audit notes) depends:T050
- [ ] T054 Verify dark mode contrast ratios (manual + optional tool) depends:T039

## Phase 5: Docs & Finalization
- [ ] T055 Update `quickstart.md` with any deviations discovered during implementation depends:T050
- [ ] T056 Generate final validation summary (rerun `validate` script) depends:T050
- [ ] T057 Prepare README excerpt (if needed) describing site shell feature and how to extend content depends:T056
- [ ] T058 Cleanup unused samples / ensure no TODO markers remain depends:T056
- [ ] T059 Final test run (unit + e2e + lighthouse) all green & budgets met depends:T051,T053,T054,T056

## Phase 6: Review Gate
- [ ] T060 Constitutional gate review: Simplicity, Test-First, Security, A11y/Perf checklists documented in `specs/001-site-shell-content/validation-log.md` depends:T059

## Dependencies Summary
- Documentation (T001-T008) precedes tests.
- All test scaffolds (T009-T020) precede implementation (T021+).
- Core components depend on base layout/pages & contentlayer config.
- Utilities precede pages/components that use them.
- Sample content required before running e2e article & glossary tests.
- Performance & a11y tasks after functional tests pass.

## Parallel Execution Examples
```
# Example 1: Run initial unit test scaffolds in parallel
T009 T010 T011 T012

# Example 2: Run component skeletons in parallel after pages in place
T031 T032 T033 T034 T035 T036 T037 T038 T039

# Example 3: After utilities ready, add sample content concurrently
T044 T045 T046
```

## FR / NFR Coverage Mapping (high-level)
- Navigation & Section Grid: FR-001 → T027, T034, T013
- Content Routing & Slugs: FR-002, FR-029 → T028, T029, T016
- Chain/Tag Filters: FR-006, FR-007, FR-033 → T028, T036, T037, T014, T040
- Glossary Index: FR-008, FR-009, FR-032 → T041, T017, T015
- Theme Toggle: FR-010, FR-011, NFR-013 → T039, T013
- Metadata & Canonical: FR-014, FR-034 → T042, T029, T011
- Validation & Exclusions: FR-015, FR-016 → T024, T041, T020
- Empty State: FR-017 → T038, T014
- Accessibility Core: FR-018, FR-019, FR-030, NFR-002 → T026, T031, T018, T053
- URL Canonicalization: FR-020 → T028, T040
- Sitemap / Published Only: FR-021 → (deferred to future task if sitemap generation needed; placeholder via validation) T024
- Templates Download Labeling: FR-022 → (Not directly implemented in shell; future) *Not in scope*
- Search Partial Match: FR-023 → T028, T040, T014
- Visual Distinction Chain/Multi: FR-024 → T035, T015
- Unsupported Chain Handling: FR-025 → T041, T020
- Cross-link Glossary: FR-026 → T029, T041, T015
- Tag normalization: FR-027 → T040, T020
- Timestamp Display: FR-028 → T029, T035, T015
- Heading Semantics & A11y: FR-030 → T026, T018, T053
- Error Handling (parsing): FR-031 → T029, T024
- Deterministic Ordering: FR-032 → T041, T017
- Filter Shareable URL: FR-033 → T028, T040, T014
- Metadata Panel Order: FR-034 → T029, T035, T015
- Cross-link Integrity: FR-035 → T041, T020, T016
- Performance Budgets: NFR-001, NFR-014 → T051, T052, T019
- Reliability (build fail invalid): NFR-003 → T024, T041, T020
- Security (no secrets & scan): NFR-004, NFR-005 → T024, T043, T012
- Maintainability: NFR-006 → T023, T024 docs in quickstart
- Observability (summary): NFR-008 → T024, T056
- SEO uniqueness: NFR-009 → T042, T020 validation expansion
- i18n readiness: NFR-010 → (naming conventions, no locale coupling) covered in T023/T024
- Traceability: NFR-011 → T024 generate content hash (add to validation report)
- Privacy: NFR-012 → No analytics code; asserted in T024 & tests
- Resilience (theme/filter degrade): NFR-013 → T039 tests in T013/T014
- Content Consistency (glossary pattern): NFR-015 → T041, T017, T020

## Validation Checklist
- [x] All tests precede implementation tasks
- [ ] All entities covered (ContentItem, GlossaryTerm, FilterState, ValidationReport)
- [ ] Parallel tasks mark distinct files
- [ ] FR/NFR mapping present
- [ ] No unresolved dependencies remain

SUCCESS: Tasks ready for execution.
