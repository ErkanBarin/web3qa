
# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context
**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->
```
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
# Implementation Plan: Site Shell & Content Architecture

**Branch**: `001-site-shell-content` | **Date**: 2025-10-06 | **Spec**: `specs/001-site-shell-content/spec.md`
**Input**: Feature specification from `specs/001-site-shell-content/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from repository (web application, frontend-only static + dynamic routing)
   → Set Structure Decision accordingly
3. Fill Constitution Check based on constitution principles (simplicity, test-first, security, a11y/performance)
4. Evaluate Constitution Check
   → If violations: document in Complexity Tracking or simplify
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md (enumerate research tasks; resolve unknowns)
6. Execute Phase 1 → data-model.md, contracts/, quickstart.md, agent context update (no runtime code yet)
7. Re-evaluate Constitution Check (post-design)
   → Adjust if new complexity introduced
8. Plan Phase 2 approach (task generation strategy only; no tasks.md file yet)
9. STOP – handoff to /tasks command
```

**IMPORTANT**: This /plan output stops before creating `tasks.md`. Subsequent commands generate tasks and code.

## Summary
We will implement the foundational site shell for Web3QA: homepage with eight section cards, content routing for section listings and MDX article pages, single-select chain and tag filtering via query parameters, deterministic metadata extraction and validation (including secret scanning and enum checks), glossary index generation, theme toggle with accessibility baseline, and performance-conscious static generation. This establishes a reproducible, accessible, and secure content architecture enabling future expansions (search, community interactions) while enforcing constitutional gates (simplicity, test-first, security, performance, a11y) from the outset.

## Technical Context
**Language/Version**: JavaScript (ES2022)  
**Primary Dependencies**: next@14, react, tailwindcss, @tailwindcss/typography, contentlayer, next-contentlayer, lucide-react (icons)  
**Storage**: N/A (static content files only)  
**Testing**: Vitest (unit), Playwright (e2e), Lighthouse CI (perf/a11y smoke)  
**Target Platform**: Vercel (static + incremental routing)  
**Project Type**: Web application (frontend-only)  
**Performance Goals**: LCP < 2.5 s homepage/article; listing (≤200 items) FMP+hydrate < 1.0 s lab baseline; interaction latency <150 ms  
**Constraints**: JS only (no TypeScript); no runtime analytics; no secrets; deterministic lowercase routing; WCAG 2.1 AA baseline; build fails on invalid metadata  
**Scale/Scope**: Up to 1,000 indexed content items; per-section initial listing ≤200 items; single region deploy; glossary scale ~500 terms (headroom).

## Constitution Check
Principle Mapping:
- Simplicity: Single Next.js 14 App Router project; minimal shared lib functions (`contentlayer-helpers.js`, `filters.js`). No microservices, no search index in MVP.
- Test-First & Reproducibility: Plan introduces validation + failing tests before UI wiring (filters, glossary ordering, secret scan). Deterministic build outputs via content hashes.
- Security: No secrets, secret scanning regex at build, only testnet references, path canonicalization to prevent traversal.
- Accessibility & Performance: Skip link, semantic headings, focus-visible rings, dark mode contrast, performance budgets codified (LCP, FMP/hydration), filtered minimal client scripts.

Potential Violations & Mitigations: None presently. Complexity controlled by deferring multi-select filtering, analytics, and full-text search.

Gate Result: PASS (initial).

## Project Structure

### Documentation (this feature)
```
specs/001-site-shell-content/
├── plan.md              # This file (/plan output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created here)
```

### Source Code (feature-relevant tree to be created)
```
app/
  layout.jsx
  page.jsx                           # homepage (hero + 8 section cards)
  (content)/
    [section]/page.jsx               # section landing lists with filters (?chain=&tag=&q=)
    [section]/[...slug]/page.jsx     # article renderer
  not-found.jsx
  globals.css
components/
  Header.jsx
  Footer.jsx
  SectionCard.jsx
  ArticleMeta.jsx                    # chain/tags/updated panel
  ChainFilter.jsx                    # single-select chain filter
  TagFilter.jsx                      # tag filter (single for MVP)
  SkipLink.jsx
  ThemeToggle.jsx
  EmptyState.jsx
lib/
  contentlayer-helpers.js            # getAllBySection, getArticleBySlug, filters
  filters.js                         # normalize query, enums
  metadata.js                        # open graph, canonical helpers
styles/
  prose.css                          # prose tweaks for MDX
content/                             # seed content (added later)
specs/001-site-shell-content/
  spec.md
  plan.md
```

**Structure Decision**: Web application (single Next.js project with App Router + supporting lib modules; no backend service layer yet).

## Phase 0: Outline & Research
Planned Research Tasks (to populate `research.md`):
1. Enumerate final chain enum + tag enum (confirm no additions required): {ethereum, bitcoin, hyperledger, corda, multi}; {rpc, wallet, smart-contract, infrastructure, security, performance}.
2. URL normalization approach in App Router (middleware vs direct param transform) – choose simplest (lowercase enforcement in route segment handling or middleware).
3. Secret scanning regex set: patterns for (a) 0x[64 hex] private key, (b) mnemonic word list (>=12 bip39 words), (c) common env var markers (ignored but flagged).
4. Accessibility baseline: confirm heading order patterns for dynamic MDX injection; ensure first h1 mapping.
5. Performance budget enforcement: decide Lighthouse CI config (Fast 3G; throttling) thresholds (LCP < 2.5, Accessibility score ≥ 90, Best Practices ≥ 90, SEO ≥ 90).
6. Filtering complexity: justify single-select chain and single tag for MVP; document multi-select expansion considerations.
7. Glossary index construction: alphabetical grouping strategy (localeCompare en-US, case-insensitive) and collision handling (duplicate term warns; first wins).
8. Query param canonical ordering: stable serialization ordering keys alphabetically.
9. Minimal MDX content sample structure and naming (kebab-case filenames; nested directories allowed).
10. Strategy to minimize client bundle: ensure heavy logic resides in build (Contentlayer) not runtime; small hydration footprint for filters.

`research.md` will record: Decision, Rationale, Alternatives.

## Phase 1: Design & Contracts
Artifacts to create:
1. `data-model.md` – Entities: ContentItem, GlossaryTerm, FilterState, ValidationReport; fields + validation rules.
2. `contracts/routes.md` – Route patterns, parameters, query parameters, canonicalization rules.
3. `contracts/metadata.md` – Required frontmatter schema, enums, validation failure handling.
4. `contracts/a11y.md` – Skip link, heading structure, color contrast, focus management, keyboard nav expectations.
5. `contracts/perf.md` – Metrics, measurement strategy (Lighthouse CI config snapshot), test device profile.
6. `quickstart.md` – Steps: install deps, run dev, add new article, run validation, run tests (unit + e2e scaffold), interpret build report.
7. Agent Context Update: Run `.specify/scripts/bash/update-agent-context.sh copilot` to append new tech references (Next.js 14 App Router, Contentlayer JS config, Tailwind typography, Playwright+Vitest, secret scan patterns).

Design Considerations:
- No API endpoints: contracts focus on routing + content model, not network services.
- Test-first: Provide test naming conventions in quickstart (e.g., `filters.spec.js`, `homepage.e2e.spec.js`).
- Validation pipeline: executed at build; failure surfaces as non-zero exit.

## Phase 2: Task Planning Approach
The /tasks command will:
- Parse `data-model.md`, `contracts/*.md`, `quickstart.md` to enumerate discrete tasks.
- Generate tasks in TDD order: validation & unit test scaffolds → component skeletons → listing & article rendering → filters → glossary index → not-found → accessibility utilities → performance config.
- Tag parallelizable tasks with [P] (e.g., independent component stubs, unit test files).
- Provide FR/NFR mapping matrix for traceability.
- Estimate 25–30 tasks.

Ordering Rationale:
1. Validation + data model ensures early detection of schema errors.
2. Routing files before component detail ensures stable path mapping.
3. Filters after basic listing to keep complexity incremental.
4. Theme & a11y utilities before broad UI polishing.
5. Secret scanning & sitemap generation near the end (depend on content set).

## Phase 3+: Future Implementation
Beyond /plan: tasks generation (/tasks), code implementation, test execution, performance + a11y audits, CI pipeline integration.

## Complexity Tracking
No constitutional violations; table intentionally left empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|

## Progress Tracking
**Phase Status**:
- [x] Phase 0: Research complete (/plan command) *planned & enumerated*
- [x] Phase 1: Design complete (/plan command) *artifacts defined*
- [x] Phase 2: Task planning complete (/plan command - approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
