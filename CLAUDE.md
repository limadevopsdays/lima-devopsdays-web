# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check then build for production (output: dist/)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

There are no tests. Install deps with `npm ci` (CI) or `npm install` (local).

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TICKETS_URL` | If set, enables the "Buy Tickets" CTA in the header and hero. If unset, the button is hidden. |
| `BASE_PATH` | Sets the Vite `base` path (default: `/`). Used in CI for GitHub Pages deployment. |

## Architecture

Single-page React 19 + TypeScript + Vite app. No router — the page is one long scrollable document with anchor-linked sections. Deployed to GitHub Pages on push to `main` via `.github/workflows/pages.yml`.

### Layout

`main.tsx` → `I18nProvider` wraps `App`. `App` renders a fixed `HeroBackground`, sticky `SiteHeader`, then all page sections in order, then `SiteFooter`.

Page sections (in render order): `HeroSection` → `AboutSection` → `SpeakersSection` → `ScheduleSection` → `SponsorsSection` → `VenueSection` → `OrganizersSection` → `FaqSection`.

Each section uses the `Section` component (`src/components/Section.tsx`) which provides a consistent `<section id="...">` wrapper with eyebrow/title/lead header pattern and a `Container` for max-width layout.

### Internationalization

Custom i18n with two locales: `en` and `es`. All strings live in `src/i18n/translations.ts` as flat key/value maps. The `t(key, params?)` function supports `{placeholder}` interpolation.

- `I18nProvider` (`src/i18n/I18nProvider.tsx`) — manages locale state, persists to `localStorage`, and sets `document.documentElement.lang`. Auto-detects Spanish via `navigator.language`.
- `useI18n()` hook (`src/i18n/useI18n.ts`) — used in every component that needs translated strings.
- `TranslationKey` type is derived from the `en` object, so TypeScript enforces that every key exists in both locales.

To add a new string: add the key/value to both `en` and `es` objects in `translations.ts`.

### Content Data

Static data for dynamic sections lives in `src/content/`:

- `speakers.ts` — `Speaker[]` with name, role, topic, imageSrc
- `organizers.ts` — `Organizer[]` with name, bio, employer, and optional social links
- `faq.ts` — `FaqItem[]` referencing translation keys (questions/answers live in `translations.ts`)
- `site.ts` — nav items, `ticketsUrl` (from env), and social links

Sponsors data is inlined directly in `src/sections/SponsorsSection.tsx` since it includes theme-specific logo paths (`logoSrcDark` / `logoSrcLight`).

### Theme

Dark/light theme is toggled via `ThemeToggle` component, which sets `data-theme="light"` or `data-theme="dark"` on `<html>`. CSS variables in `src/index.css` under `[data-theme="light"]` override the default dark-mode values. Theme choice persists to `localStorage` under the key `theme`. Default is dark.

Sponsor logos must supply both dark and light variants stored at `public/assets/sponsors/dark/` and `public/assets/sponsors/light/`. CSS classes `sponsorItem__img--dark` and `sponsorItem__img--light` control visibility per theme.

### Styling

Plain CSS only — no Tailwind or CSS-in-JS. All styles are in `src/index.css` using CSS custom properties defined on `:root`. BEM-like class naming (`section__header`, `sponsorBox__tiers`, etc.).

### Static Assets

All static files are in `public/` and served at the root path:
- `public/assets/organizers/` — organizer headshots (referenced in `organizers.ts`)
- `public/assets/sponsors/dark|light/` — sponsor logos per theme
- `public/assets/pdf/` — sponsor brochures (ES and EN)
- `public/assets/hero/` — hero section imagery
- `public/assets/icons/` — social icon SVGs
