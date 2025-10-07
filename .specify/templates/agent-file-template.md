# [PROJECT NAME] Development Guidelines
Auto-generated from feature plans. Last updated: [DATE]

## Active Technologies
- Next.js (App Router), JavaScript strict
- Tailwind CSS + @tailwindcss/typography
- MDX via Contentlayer
- shadcn/ui + lucide-react
- PNPM, ESLint, Prettier, Vitest/Playwright (as chosen in plan)
- Vercel deploy, Namecheap DNS

## Project Structure
- app/, components/, content/, lib/, styles/, .specify/, .github/workflows/
## Commands
- `pnpm dev` — local dev
- `pnpm build` — typecheck + build
- `pnpm lint` — ESLint
- `pnpm test` — tests (unit/e2e if configured)
- `uvx ... specify guard` — Spec-Guard

## Code Style
- JS strict, no `any`
- Server components by default
- Tailwind for styling; no inline styles
- MDX: front-matter { title, section, chain, scenarios[], tags[], summary, updated }

## Recent Changes
- [1] [FEATURE] added [files]
- [2] ...
- [3] ...

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->