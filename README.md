# AuditAI — Agentic SEO Platform

A modern, light-mode SEO audit SaaS UI covering traditional SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization).

## File Structure

```
auditai/
├── index.html          ← Entry point
├── css/
│   └── styles.css      ← All styles (reset, tokens, layout, components)
└── js/
    ├── tokens.js       ← Design tokens (colors, helpers)
    ├── data.js         ← App data (sites, audit steps, fixes)
    ├── components.js   ← Reusable UI components (Icon, Pill, Chip, Ring, Bar…)
    ├── views.js        ← Page views (Dashboard, Audit, Report + all tabs)
    └── app.js          ← Root App component + state management
```

## How to run

Just open `index.html` in any browser. No build step, no npm install.

> React 18 is loaded from unpkg CDN. Requires an internet connection on first load.

## Features

- **Dashboard** — monitored sites table with SEO / AEO / GEO score bars
- **Agentic Audit** — live 12-step crawl with per-step findings revealed in real time
- **Full Report** — 6 tabs: Overview, SEO, AEO, GEO, Technical, AI Fixes
- **AI Fix Queue** — prioritized recommendations sorted by impact score, with effort tags

## Tech

- React 18 (CDN, no JSX — uses `React.createElement`)
- Vanilla CSS (no framework)
- Zero build tooling
