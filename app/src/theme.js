// Enter × Astryx theme.
//
// Path B — Astryx drives the look. Base theme: STONE (a near-monochrome,
// warm-neutral system: #f3f3f5 body, white surfaces, near-black text — the
// Avra "minimal frontier-lab" structure out of the box). We extend it with the
// two minimal overrides the brief allows:
//   1. accent token  → Enter amber #FFAE35 (+ 50% alpha #FFAE3580)
//   2. type families  → Inter (body + heading), JetBrains Mono (code / micro-labels)
// Everything else — neutrals, radius, spacing, motion, component overrides —
// is inherited from stone unchanged.

import { defineTheme } from '@astryxdesign/core/theme';
import { stoneTheme } from '@astryxdesign/theme-stone';

// Enter brand amber and a legible deep-amber for the rare amber-on-white text.
const AMBER = '#FFAE35';
const AMBER_ALPHA = '#FFAE3580'; // ~50% — the brief's companion-spreadsheet tint
const AMBER_TEXT = '#8a5d00';    // deep amber, passes AA on white for small text

const INTER_FALLBACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const MONO_FALLBACK = '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace';

export const enterTheme = defineTheme({
  name: 'enter',
  extends: stoneTheme,

  // Drop the bespoke stone fonts (Montserrat/Figtree/JetBrains) for the brief's
  // mandated Inter; keep a mono for the signature micro-labels.
  typography: {
    scale: { base: 14, ratio: 1.25 },
    body: { family: 'Inter Variable', fallbacks: INTER_FALLBACK },
    heading: {
      family: 'Inter Variable',
      fallbacks: INTER_FALLBACK,
      weights: { 3: 'bold', 4: 'bold' },
    },
    code: { family: 'JetBrains Mono', fallbacks: MONO_FALLBACK },
  },

  // MINIMAL token override: only the accent family is retargeted to amber.
  // [light, dark] pairs; the app is pinned to light mode but we keep both sane.
  tokens: {
    '--color-accent': [AMBER, AMBER],
    '--color-accent-muted': [AMBER_ALPHA, AMBER_ALPHA],
    // Amber is light — put near-black text/icons on amber fills for legibility.
    '--color-on-accent': ['#25252a', '#25252a'],
    // Amber-as-text needs a darker stop to stay readable on white surfaces.
    '--color-text-accent': [AMBER_TEXT, AMBER],
    '--color-icon-accent': [AMBER_TEXT, AMBER],
  },
});

export { AMBER, AMBER_ALPHA, AMBER_TEXT };
