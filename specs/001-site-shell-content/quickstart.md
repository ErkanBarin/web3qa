# Quickstart: Site Shell & Content Architecture

Status: Draft v1 (2025-10-06)

## 1. Overview
This feature establishes the foundational Next.js site shell, content ingestion (Contentlayer + MDX), validation pipeline, accessibility/performance baselines, and filtering/glossary architecture.

## 2. Prerequisites
- Node.js 18+
- pnpm or npm (examples assume npm)
- Git branch: `001-site-shell-content`

## 3. Install
```
npm install
```
(Dependencies will include Next.js 14, React 18, Tailwind, Contentlayer, Playwright, Vitest, axe-core once `package.json` is added in implementation phase.)

## 4. Directory Layout (Planned)
```
app/
  layout.jsx
  page.jsx
  (content)/[section]/page.jsx
  (content)/[section]/[...slug]/page.jsx
components/
content/
  guides/...
  glossary/...
lib/
scripts/
  validate-content.mjs
specs/001-site-shell-content/
  spec.md
  plan.md
  tasks.md
  research.md
  data-model.md
  contracts/
    routes.md
    metadata.md
    a11y.md
    perf.md
  quickstart.md
```

## 5. Core Scripts (Planned)
| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Next dev server |
| `npm run build` | Production build + Contentlayer generation |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run validate` | Content validation (schema + secret scan) |
| `npm run perf` | Lighthouse + performance tests (future) |

## 6. Adding Content
1. Create MDX under `content/<section>/...`.
2. Add frontmatter:
```
---
title: "Intro to Fuzzing"
description: "Foundational overview of fuzz testing for EVM smart contracts."
section: guides
chain: ethereum
tags: [testing, security]
lastUpdated: 2025-10-05
draft: false
---
```
3. Run validation:
```
npm run validate
```
4. If errors: check `ValidationReport` output (location TBD: `./.cache/validation.json` planned).

## 7. Secret Scan Whitelisting
If a false positive occurs:
```
<!-- allow-secret: Ethereum Private Key -->
```
Place above the line triggering the detection. Re-run `npm run validate`.

## 8. Filtering Behavior
- Single-select chain and tag.
- Clean URL rewriting ensures `?chain=ethereum&tag=testing` ordering.
- Removing filter resets to all content.

## 9. Glossary Terms
- Place MDX in `content/glossary/` or section `glossary`.
- First occurrence of a term (slug) is primary; duplicates warned & excluded from index.

## 10. Performance Tips
- Avoid large code blocks or embedded media in initial MVP; link externally.
- Use headings for logical structure; improves a11y & indexing.

## 11. Testing Strategy Summary
| Layer | Tool | Focus |
|-------|------|-------|
| Unit | Vitest | Utilities (filters, metadata, validation) |
| E2E | Playwright | Routing, filters, a11y, performance |
| Audit | Lighthouse | LCP, bundle size, a11y score |

## 12. Troubleshooting
| Symptom | Possible Cause | Fix |
|---------|----------------|-----|
| Content missing in listing | Validation exclusion | Run `npm run validate` and inspect report |
| Tag filter not applied | Invalid tag or URL not canonical | Check normalized query params |
| Secret scan fails build | Legitimate secret in content | Remove or whitelist if false positive |

## 13. Next Steps (Implementation)
Follow `tasks.md` starting at Phase 1 test scaffolds (T009+). All design contracts now present for T002–T006 dependencies.

## 14. Interactive Quiz Feature (Added 2025-10-29)

### Overview
The Quiz component adds interactive knowledge testing capability to MDX content pages.

### Component Location
- **File**: `/Users/erkanbarin/web3qa/components/Quiz.jsx`
- **Type**: React client component ('use client')
- **Styling**: Tailwind CSS dark-mode theme

### Usage in MDX
```jsx
import Quiz from '@/components/Quiz.jsx'

export const myQuiz = [
  {
    question: "Your question text?",
    answers: ["Option A", "Option B", "Option C"],
    correctAnswer: 1  // 0-based index
  }
];

<Quiz questions={myQuiz} />
```

### Features
- **Interactive Selection**: Click to select answers
- **Immediate Feedback**: Correct (green) or Incorrect (red) shown instantly
- **Answer Reveal**: Correct answer highlighted if wrong answer selected
- **Accessibility**: Keyboard navigation, ARIA labels, focus states
- **Dark Mode**: Styled with dark backgrounds (bg-gray-900) and light text

### Example Implementation
See: `/Users/erkanbarin/web3qa/content/guides/ethereum/how-to-qa-a-smart-contract.mdx`

### Testing the Quiz
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/guides/ethereum/how-to-qa-a-smart-contract`
3. Scroll to "🧠 Test Your Knowledge" section
4. Verify:
   - Questions display correctly
   - Answer selection works
   - Feedback appears (green for correct, red for incorrect)
   - Correct answer is highlighted after selection
   - Keyboard navigation works (Tab, Enter)
   - Dark mode styling is consistent

### Constitutional Compliance
- ✅ **Simplicity**: Single component, no external dependencies
- ✅ **Test-First**: Enhances testing/learning content
- ✅ **Accessibility**: WCAG AA compliant (keyboard, ARIA, contrast)
- ✅ **Performance**: Client component, minimal bundle impact

## 15. Revision Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-29 | Added interactive Quiz component | copilot |
| 2025-10-06 | Initial draft | copilot |
