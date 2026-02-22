# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevOpsDays Lima 2026 conference website — a single-page React application deployed to GitHub Pages at devopsdays.pe.

## Commands

- `npm run dev` — Start local dev server (Vite)
- `npm run build` — Production build (TypeScript check + Vite build)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

## Tech Stack

- **React 19** with **TypeScript** (strict mode) and **Vite 7**
- **Tailwind CSS** for styling, with extensive custom properties in `src/index.css`
- Dark/light theme via `[data-theme]` attribute on `<html>`, persisted in localStorage
- Custom i18n system (English/Spanish) using React Context (`src/i18n/`)

## Architecture

```
src/
  App.tsx              # Root component, assembles all sections
  main.tsx             # Entry point (React 19 createRoot)
  index.css            # Global styles, CSS variables, theme definitions
  components/          # Reusable UI (Button, Container, Header, Footer, etc.)
  sections/            # Page sections (Hero, About, Speakers, Schedule, etc.)
  content/             # Data files: speakers.ts, organizers.ts, faq.ts, site.ts
  i18n/                # Translations (translations.ts), context, provider, hook
public/
  assets/              # Static images: hero/, organizers/, sponsors/, icons/, pdf/
```

**Content is data-driven:** Speaker, organizer, FAQ, and navigation data live in `src/content/*.ts`. Sections consume this data and render it with i18n-translated labels.

**i18n pattern:** Use the `useI18n()` hook to get `t()` function. Translation keys are in `src/i18n/translations.ts`. Supports parameterized strings like `{year}`, `{name}`.

## Environment Variables

- `VITE_TICKETS_URL` — External ticketing URL (optional)
- `BASE_PATH` — Base path for subdirectory deployments (optional, defaults to `/`)

## Deployment

GitHub Actions (`.github/workflows/pages.yml`) auto-deploys `main` to GitHub Pages. Build runs Node 22, `npm ci`, `npm run build`, then uploads `dist/`.

## Code Style

- 2-space indentation, LF line endings, UTF-8
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- ESLint flat config with React Hooks and React Refresh rules
