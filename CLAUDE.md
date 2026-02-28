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

React 19 + TypeScript + Vite app with React Router v6.

### Routing

`main.tsx` → `BrowserRouter` (basename = `import.meta.env.BASE_URL`) → `I18nProvider` → `App`.

`App` renders `HeroBackground`, `SiteHeader`, a `<Routes>` block inside `<main>`, and `SiteFooter`. Routes:

| Path | Component | Source |
|---|---|---|
| `/` | `HomePage` | `src/pages/HomePage.tsx` |
| `/sponsors` | `SponsorsSection` | `src/pages/SponsorsPage.tsx` |

**GitHub Pages SPA routing:** `public/404.html` encodes the path into the query string on 404; `index.html` has a receiver script that restores it via `history.replaceState` before React hydrates.

**Navigation rules:**
- Anchor links (`/#speakers`, `/#faq`, etc.) use plain `<a href>` intercepted by `NavAnchor` in `SiteHeader` — calls `element.scrollIntoView()` if on home, otherwise `navigate({ pathname:'/', hash })`.
- Route links (`/sponsors`) use React Router `<Link>` or `useNavigate()`.
- `ScrollToTop` component in `App` resets `window.scrollTo(0,0)` on every `pathname` change.
- `HomePage` watches `location.hash` and scrolls to the matching element on mount/change (handles cross-page anchor navigation).

### Layout

`HomePage` render order: `HeroSection` → `AboutSection` → `SpeakersSection` → `ScheduleSection` → `SponsorsCta` → `VenueSection` → `OrganizersSection` → `FaqSection`.

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
- `site.ts` — nav items, `ticketsUrl` (from env), social links, `sponsorContactEmail`, `sponsorBrochures`
- `sponsors.ts` — all sponsor-related data in one file:
  - `sponsorTiers` — tier definitions (`platinum | gold | silver | bronze`) with `id`, `featured`, `labelKey`
  - `TIERS` — derived array of tier IDs, used to iterate columns in the comparison table
  - `TierValue` — exported type: `true | false | string` (the only type exported from this file)
  - `sponsorBenefits` — rows for the comparison table
  - `sponsorFootnotes` — footnote markers and texts for the table
  - `sponsors` — current sponsors grouped by tier, each with `name`, optional `logoSrcDark`, `logoSrcLight`, `href`
  - `sponsorStats` — stats shown in the "Why sponsor" card (value + i18n labelKey)

**Sponsor logos** use theme-aware CSS: `sponsorItem__img--dark` is visible by default; `sponsorItem__img--light` is hidden by default and revealed under `[data-theme="light"]`. Same pattern applies to `sponsorMarquee__img--dark/light` in the home carousel.

### Theme

Dark/light theme is toggled via `ThemeToggle` component, which sets `data-theme="light"` or `data-theme="dark"` on `<html>`. CSS variables in `src/index.css` under `[data-theme="light"]` override the default dark-mode values. Theme choice persists to `localStorage` under the key `theme`. Default is dark.

Sponsor logos must supply both dark and light variants stored at `public/assets/sponsors/dark/` and `public/assets/sponsors/light/`. Logo paths are set in `src/content/sponsors.ts` (`logoSrcDark` / `logoSrcLight` fields).

### Styling

Plain CSS only — no Tailwind or CSS-in-JS. All styles are in `src/index.css` using CSS custom properties defined on `:root`. BEM-like class naming (`section__header`, `sponsorBox__tiers`, etc.).

### Static Assets

All static files are in `public/` and served at the root path:
- `public/assets/organizers/` — organizer headshots (referenced in `organizers.ts`)
- `public/assets/sponsors/dark|light/` — sponsor logos per theme
- `public/assets/pdf/` — sponsor brochures (ES and EN)
- `public/assets/hero/` — hero section imagery
- `public/assets/icons/` — social icon SVGs
