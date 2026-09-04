# MedStudy

## What MedStudy is

Personal MBBS study website for the owner (an MBBS student). Planned feature set: subjects → modules → topics, notes, MCQ practice, spaced revision, progress tracking. Nothing beyond the scaffold is implemented yet — don't invent architecture or conventions not present in code.

## Project status

Fresh, unmodified `create-next-app` scaffold (last `git log` at "Initial commit from Create Next App"): App Router (`app/`), Next.js 16.3.4, React 19.2.8, TypeScript strict, Tailwind CSS v4 (PostCSS plugin `@tailwindcss/postcss`, no `tailwind.config.*`), ESLint 9 flat config. `app/page.tsx` is still the stock template landing page; no routes, data layer, or business logic exist yet.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint only (there is no `typecheck` script; `tsc` runs via `next build`)
- `npm run build` / `npm start` — production build / serve

## Conventions & gotchas

- Path alias `@/*` maps to repo root (`tsconfig.json` paths).
- Fonts: Geist + Geist Mono via `next/font/google`, exposed as CSS vars `--font-geist-sans` / `--font-geist-mono`.
- `CLAUDE.md` just imports `AGENTS.md`.
- Don't remove or edit the Next.js agent-rules block below; `next dev` regenerates it.

## Working rules (owner-directed)

- Build in small, reviewable steps; explain intent before coding and summarize + give a test path after each major change.
- Never mass-replace or delete existing work without first telling the owner.
- Do not install new packages without asking first — prefer zero-dependency solutions (the JSON data store is a deliberate package-free choice).

## Data layer

- Study data lives in JSON/TS fixture files under `data/` (subjects → modules → topics; MCQ banks, notes, progress come later). This is a deliberate zero-package choice; a database swap may come later, so keep the UI reading data through small typed accessor functions rather than raw file imports.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
