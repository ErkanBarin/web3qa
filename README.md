# web3qa (Web3 QA / Quality Engineering site)

- **What it is:** Next.js + MDX knowledge base + QA toolchain (unit, e2e, validation, secret hygiene).
- **Proof:** `tests/e2e/golden-demo.spec.js` + `docs/agentic-playwright-mcp-workflow.md`.
- **Run it:** (below)

**60-second: run tests**

```bash
npm install
npx playwright install chromium
npm run test:unit
npm run validate
npm run test:e2e
```

## Why this repo exists

Web3 systems fail in “distributed” ways: async finality, bridges, relayers, MEV, multi-chain state, and complex threat models. This repo is my living knowledge base + demo project for how I approach **reliability-first QA**:

- Documentation that’s testable (frontmatter schema, enums, and validation)
- Deterministic UI checks (Playwright) and fast unit checks (Vitest)
- Secret hygiene (no committed secrets; env-driven config)

## Tech stack

- **App:** Next.js (App Router), React, Tailwind
- **Content:** MDX via Contentlayer
- **Testing:** Playwright (e2e), Vitest (unit)
- **Validation:** `npm run validate` runs schema checks + secret scan on content

## Repo map (high signal)

- `app/` — Next.js routes and pages
- `content/` — MDX articles (guides, concepts, glossary, etc.)
- `components/` — UI components used by MDX + pages
- `tests/unit/` — Vitest unit tests
- `tests/e2e/` — Playwright end-to-end tests
- `scripts/validate-content.mjs` — content validation entrypoint
- `lib/secret-scan.js` — secret scan patterns/helpers

## Golden demo (CI-ready Playwright style)

See `tests/e2e/golden-demo.spec.js` for a small, deterministic test that:

- Uses stable assertions (no timing hacks)
- Fails on page errors / severe console errors
- Produces actionable debugging signals (trace on failure is recommended)

Run just the golden demo:

```bash
npm run test:e2e -- tests/e2e/golden-demo.spec.js
```

## Agentic Playwright MCP workflow

I’m focused on AI-era Quality Engineering: faster test authoring, LLM-assisted debugging, and maintenance workflows.

- Workflow doc: `docs/agentic-playwright-mcp-workflow.md`

## Security / secret hygiene

- Real credentials must live in `.env.local` (ignored by git). Start from `.env.example`.
- Never commit: `test-results/`, traces, screenshots, `.env.local`, wallet keys, seed phrases.
- If you enable `/trading`: use a dummy password locally; don’t store real credentials in repo or Vercel.
- Recommended before sharing/CI: run a local secret scanner.

```bash
# Optional: local secret scanning before publishing
# gitleaks detect --source .
# trufflehog git file://. --since-commit HEAD
```

## GitHub security defaults

- Dependabot updates are configured in `.github/dependabot.yml`.
- In GitHub repo settings, enable Dependabot alerts + secret scanning if available.

## About me

Senior SDET with 8+ years building automation across UI + APIs in complex ecosystems (Playwright, Postman, contract testing).

Lately my focus is **AI-era Quality Engineering**:

- Agentic test workflows with Playwright MCP in VS Code (LLM-assisted debugging, maintenance, faster test authoring)
- Testing AI/GenAI behaviors (non-determinism, prompt risk, evaluation patterns, guardrails)
- MLOps platform validation (pipelines, datasets, training/eval flows, production checks)

I like problems where reliability matters: fintech, fraud-risk flows, Web3 integrations, and regulated-ish environments.

If your team is scaling automation or introducing AI into product/testing, I’m interested in SDET / Quality Engineering roles in the US or EU (no sponsorship friction: US citizen, Dutch resident).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Trading dashboard (optional)

There’s a password-protected `/trading` route for a small “QE meets product” demo. This is a UI demo only (no real trading keys, no exchange integrations in this repo). Setup notes:

- `docs/trading-setup.md`
