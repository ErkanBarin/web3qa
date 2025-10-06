# Performance Contract

Status: Draft v1 (2025-10-06)

Defines performance budgets, measurement methodology, and enforcement strategy for the Site Shell & Content Architecture feature.

## 1. Goals
Provide fast initial load, responsive filtering, and stable layout to satisfy Core Web Vitals and product non-functional requirements.

## 2. Budgets (MVP)
| Category | Metric | Target | Rationale |
|----------|--------|--------|-----------|
| Loading | LCP (article & listing) | < 2.5s (mobile emulation) | Core Web Vitals threshold |
| Loading | FMP + Hydration (listing page) | < 1.0s @ ≤200 items | Smooth initial filter experience |
| Interactivity | Filter interaction latency | < 150ms (UI update) | Perceived instantaneous |
| Bundle | Initial JS (shared + page) | ≤ 170KB gzip | Lightweight shell |
| Network | Unused JS (Lighthouse) | < 15% of total | Avoid dead code bloat |
| Images | Total hero + decorative | < 60KB combined | Keep LCP fast |

Stretch (Future): LCP < 2.0s, JS ≤ 140KB gzip.

## 3. Measurement Tooling
| Tool | Purpose | Notes |
|------|---------|-------|
| Lighthouse CI | LCP, unused JS, best practices, a11y score | Run via `lighthouserc.json` config |
| Playwright custom script | Measure filter latency & hydration timing | `performance.spec.js` harness |
| Web Vitals JS (optional) | Field data simulation (future) | Out of initial scope |

## 4. Test Implementation Strategy
- E2E performance test loads listing page with synthetic dataset sized to 200 items (mock if necessary) and asserts hydration complete (DOM marker) under 1000ms.
- Filter latency: record `performance.now()` before applying filter → await list modification mutation → assert delta < 150ms.
- Lighthouse run using mobile configuration (Moto G4 / slow 4G throttling defaults) for deterministic baseline.

## 5. Instrumentation Signals
| Signal | Source | Capture Method |
|--------|--------|----------------|
| `data-hydrated` attribute on root container | App code | Set after hydration effect runs |
| Result list update count | Filter logic | MutationObserver in test harness |
| Items rendered | DOM list length | Query `.article-list-item` |

## 6. Enforcement
- CI step: run Lighthouse; fail build if budgets exceeded (except first iteration may only warn for JS size as content evolves).
- Local script: `npm run perf` executes Playwright performance tests + Lighthouse.
- Gradual tightening: After initial pass, reduce JS budget per stretch goals.

## 7. Optimization Guidelines
| Area | Recommendation |
|------|----------------|
| Bundling | Use dynamic imports for heavy future components (search, analytics) |
| CSS | Tailwind JIT; purge unused classes in production build |
| Images | Prefer SVG or pure CSS for icons (lucide-react tree-shaken) |
| MDX Rendering | Avoid client components unless interactive controls needed |
| Filtering | Precompute indexes; O(n) scan acceptable for n≤200; optimize later if scaling |

## 8. Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| Content growth increases hydration time | Introduce pagination or virtual list |
| Additional libraries inflate bundle | Evaluate size impact via `next build --analyze` before adding |
| Lighthouse variance | Run 3x and take median in CI (future improvement) |

## 9. Future Enhancements
| Item | Description |
|------|-------------|
| Real user monitoring | Add Web Vitals reporting endpoint |
| Image optimization service | On-demand social image generation |
| Edge caching strategy | Layer CDN caching for listing responses |

## 10. Test Seeds
| Scenario | Test ID |
|----------|---------|
| Listing hydration under budget | TID-PERF-HYDRATE |
| Filter latency under 150ms | TID-PERF-FILTER-LAT |
| LCP under threshold | TID-PERF-LCP |
| Bundle size within limit | TID-PERF-BUNDLE |

## 11. Revision Log
| Date (UTC) | Change | Author |
|------------|--------|--------|
| 2025-10-06 | Initial draft | copilot |
