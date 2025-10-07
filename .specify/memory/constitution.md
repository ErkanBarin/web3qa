# [PROJECT_NAME] Constitution
# Web3QA Constitution

## Core Principles

### I. Test-First Content & Code (Non-Negotiable)
All features and articles include reproducible steps and checks. Content has “Verification” blocks. Code follows TDD: write failing tests before implementation.

### II. Simplicity > Cleverness
Prefer static MDX content + typed loaders (Contentlayer) and minimal client JS. No framework changes without a written rationale.

### III. Traceable Decisions
Every design or editorial choice that changes behavior requires: Decision, Rationale, Alternatives. Capture in `research.md`.

### IV. Consistent Information Architecture
Sections are fixed: guides, tools, checklists, cases, templates, news, community, glossary. Each item MUST tag `chain` (ethereum|bitcoin|hyperledger|corda|multi) and `scenarios[]`.

### V. Security & Secrets
No private keys or secrets in repo. Only testnet RPCs. All env in `.env.local` and never committed. Link to faucets, never embed keys.

### VI. Accessibility & Performance
WCAG AA as baseline. CLS < 0.1, LCP < 2.5s on median device. Prefer server components and static generation with ISR.

### VII. Versioning & Review
Content uses front-matter `updated` and changelog. All PRs run Spec-Guard, typecheck, lint, build, and link-checker.

## Workflow
1) **/clarify → /specify → /plan → /tasks → /implement → /guard**
2) All features live under `specs/[###-feature-name]/`
3) “Complexity Tracking” must justify any deviation from the stack.

## Governance
Constitution supersedes ad-hoc practices. Amendments require PR with migration notes. Version: 1.0.0 | Ratified: today