# Agentic Playwright MCP workflow (VS Code)

This is the workflow I use to ship UI test changes quickly while keeping them deterministic, reviewable, and CI-friendly.

## The loop (diagram)

```mermaid
flowchart TD
  A[Pick a user-critical flow] --> B[Run Playwright test]
  B -->|fails| C[Capture signals: trace, screenshot, console]
  C --> D[Ask Copilot/LLM with concrete context]
  D --> E[Propose minimal change]
  E --> F[Implement change (code + selectors)]
  F --> G[Re-run target test]
  G -->|pass| H[Run nearby suite]
  H --> I[Commit with reproducible notes]
  B -->|passes| H
```

## What makes it “agentic”

The LLM isn’t just chatting: it can use Playwright MCP in VS Code to help you:

- Navigate the UI and propose stable selectors
- Update tests with fewer flaky waits
- Validate fixes by running the exact failing spec

The human still owns:

- Threat modeling / intent
- Review of diffs
- Deciding what is stable vs. brittle

## Concrete example: prompt → change → verification

### 1) Prompt (what you ask the agent)

> Add a deterministic “golden demo” Playwright test that verifies `/about` loads, asserts the main heading, and fails on page errors / severe console errors. Keep it CI-ready and avoid flaky timing.

### 2) Change (what gets implemented)

- Add `tests/e2e/golden-demo.spec.js`
- Use stable assertions (`expect(locator).toBeVisible()` etc.)
- Add a small console/pageerror trap to make failures diagnosable

### 3) Verification (what you run)

```bash
npm run test:e2e -- tests/e2e/golden-demo.spec.js
```

If it fails, open the Playwright trace (or rerun with trace retention) and iterate with another tight prompt.

## Tips for recruiter-grade signal

- Keep at least one small spec “always green” and easy to read (`golden-demo`).
- Prefer stable selectors (`data-test`), roles, and headings over deep CSS selectors.
- Make failures actionable: console errors, clear assertions, minimal branching.
