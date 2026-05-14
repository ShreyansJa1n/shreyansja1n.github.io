# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Shreyans Jain's personal portfolio site, deployed at `shreyansja1n.github.io`. Single-page React SPA built with Vite, plus two extra routes (`/blogs`, `/blogs/:slug`). All content lives in the repo - there is no CMS or external API.

## Commands

```bash
npm install          # First-time setup
npm run dev          # Vite dev server on http://localhost:8080 (port is pinned in vite.config.ts)
npm run build        # Production build to dist/
npm run build:dev    # Development-mode build (rare; used by deploy workflow only if needed)
npm run lint         # ESLint over the whole repo
npm run preview      # Preview the production build locally
```

There is no test suite. There is no formatter wired in - rely on the editor and ESLint.

## Deployment

`.github/workflows/portfolio_workflow.yml` builds and deploys to GitHub Pages on every push to `main`. `dist/` is the upload artifact. There is no staging environment - merging to `main` is the deploy.

## Architecture

### Page composition

`src/pages/Index.tsx` renders the entire single-page experience as a flat stack of section components:

```
NavBar → Hero → ForRecruiters → About → Education → Experience → Projects → Skills → Blogs → Certifications → Contact
```

Each section is a self-contained component in `src/components/`. Section order is meaningful (recruiter-skim flow: hero → recruiter summary → story → credentials → work → projects → skills → writing → certs → contact). Don't reorder casually.

`src/App.tsx` is the top-level shell - wraps routes in providers (DarkModeContext, QueryClient, Tooltip, BrowserRouter) and toggles the `.dark` class on `<html>` based on state.

### Content source of truth

**`src/site.json`** is the single canonical content file. It holds `education`, `experience`, `projectsSection.projects`, and `certificationsSection.certifications`. There used to be a duplicate `site.json` at the repo root - it was removed; do not recreate it. All three consumer components (`Experience.tsx`, `Projects.tsx`, `Certifications.tsx`) import from `../site.json`.

Hero, About, ForRecruiters, Skills, Blogs, and Contact copy is **hardcoded in the components** (not JSON-driven). Skills categories are a const array in `Skills.tsx`. Blog metadata sits in `src/blogIndex.json`; blog post bodies are markdown in `src/blogs/*.md` loaded via Vite's `?raw` import inside `BlogPost.tsx`.

### Project case-study schema

Projects in `src/site.json` support optional fields `featured: boolean`, `problem`, `approach`, `impact`, `nextSteps`. `Projects.tsx` splits the array into featured (rendered as large `card-surface-raised` case studies with the labeled blocks) and non-featured (rendered as compact tiles in a 3-column grid). When adding a project, decide whether it warrants featured treatment - that requires writing the four case-study fields, not just a one-liner.

### Dark mode

Dark mode uses **two parallel mechanisms that must stay in sync**:

1. `App.tsx` toggles the `.dark` class on `document.documentElement` and persists to `localStorage.theme`. Initial value comes from stored pref, then `prefers-color-scheme`.
2. `DarkModeContext` (in `src/contexts/dark.tsx`) exposes `[darkMode, setDarkMode]` for legacy components that build conditional className strings with ternaries.

New components should prefer Tailwind `dark:` variants (which work because of the class on `<html>`) and CSS variables (which already switch values under `.dark`). Use the context only when you need the boolean directly (e.g., to switch icons).

### Design system

The visual language is "iOS-native minimalism" - SF system font stack, restrained brand blue `#0071e3`, soft hairline borders, generous whitespace, Apple easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

Design tokens live in **two places**:

- `src/index.css` - CSS custom properties for surfaces/ink/hairline/brand under `:root` and `.dark`. Also defines reusable utility classes: `eyebrow`, `card-surface`, `card-surface-raised`, `pill`, `pill-accent`, `btn-pill` / `btn-pill-primary` / `btn-pill-outline`, `section-y`, `mesh-orb`, `reveal`, `text-display`, `text-tightish`, `hairline-gradient`.
- `tailwind.config.ts` - Maps `bg-ink`, `bg-surface`, `text-brand`, etc. to those vars, plus drift/fade-up/word-rise keyframes and `ease-apple` timing functions.

When building or editing a section, **use the utility classes first** before reaching for raw Tailwind. They encode the color/border/radius decisions consistently across light and dark.

### Scroll effects

Three primitives:

- `src/hooks/useInView.ts` - IntersectionObserver wrapper. Default: fires once, 15% threshold, `-10%` bottom rootMargin.
- `src/hooks/useScrollProgress.ts` - exports `useScrollProgress()` (0-1) and `useScrollY()` (raw px), both rAF-throttled.
- `src/components/SectionReveal.tsx` - wraps children with the `.reveal` class, fades + translates up when in view. Stagger children by passing `delay={i * 80}` in lists.

`src/components/ScrollProgressBar.tsx` is mounted at the top of Index/BlogList/BlogPost. The Hero uses `useScrollY` directly for content parallax + orb drift.

All effects honor `prefers-reduced-motion` via the CSS in `src/index.css` (reveals snap to visible, orbs stop drifting, smooth-scroll disables).

## Conventions

- **No em-dashes anywhere** (neither `—` nor `&mdash;`). User preference. Use commas, periods, parens, or "and" instead. En-dashes (`–`) are fine in date and number ranges (`Sept 2025 – Dec 2025`, `0–2 YoE`).
- **Role positioning**: iOS, software engineering (SWE), and SDE (I/II) are framed as equally desired throughout the copy. Do not reintroduce "primary iOS / secondary backend" framing. "New-grad" appears exactly once on the page (in `ForRecruiters.tsx`'s target-roles row) - keep it that way; the graduation date carries the rest of the signal.
- **Lose It! tense**: the Co-op ended in December 2025. All copy uses past tense ("Most recently shipped…", "Owned end-to-end iOS features…").
- **Path alias**: `@/*` resolves to `src/*` (Vite + tsconfig). Components import shadcn primitives as `@/components/ui/...` and contexts as `@/contexts/dark`.
- **TypeScript is intentionally loose**: `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` are all off in `tsconfig.json`. The site.json shape is mostly typed inline at consumer sites via `as { ... }` casts. Don't fight this - keep type discipline at the boundary, not pervasive.
- **shadcn/ui** components live under `src/components/ui/`. Treat them as vendored; only edit them if a primitive needs a real behavioral change.
- **Resume PDF** is at `public/ShreyansResume.pdf`. Hero and Contact link to it via a relative `ShreyansResume.pdf` path. When the user updates the resume, replace that file and update the "(updated …)" label if one is present.

## Planning notes

Long-lived planning artifacts for this portfolio live at `~/.claude/plans/this-is-my-portfolio-adaptive-sky.md`. Past phases (A: content alignment, B: new sections, C: design overhaul, latest: copy revision) are documented there. Phase D items still open: per-project screenshots/GIFs/demo links in `public/projects/`, "Why work with me" paragraph, optional testimonials, certification-to-project tie-ins.
