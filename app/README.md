# First Monday: Shift Copilot — Astryx build

The prototype rebuilt on the **Astryx** design system (`@astryxdesign/*`, React +
StyleX) in Enter's amber brand with Avra's minimal frontier-lab style.

- **Theme:** base `@astryxdesign/theme-stone` extended (`src/theme.js`) with the
  Enter amber accent (`#FFAE35`) and Inter / JetBrains Mono fonts. Applied at
  runtime via `<Theme>` — no build plugin needed.
- **Behavior parity:** same 3-screen flow (S1 first session · S2 result + install
  · S3 Monday recap), role scoping, install flip, live/dormant recap, and deep-link
  URL params (`?screen`, `?role`, `?installed`, `?var`) as the original static
  prototype. All copy, numbers, and citations are carried over verbatim (`src/data.js`).

## Develop

Requires **Node ≥ 22.13** (see `.nvmrc` → 24; the Astryx CLI needs it).

```bash
npm install
npm run dev      # local dev at http://localhost:5173/
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

The Vite `base` is parametrized via `DEPLOY_BASE` so the same source builds for the
`/next/` preview subpath and the promoted root. See the deploy workflow in the
public `fm-demo-7k3x` repo.
