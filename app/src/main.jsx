import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Astryx base styles (required — components render unstyled without these).
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';

// Self-hosted fonts (no CDN): Inter for UI, JetBrains Mono for micro-labels.
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';

import './App.css';
import { Theme } from '@astryxdesign/core';
import { enterTheme } from './theme.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme theme={enterTheme} mode="light">
      <App />
    </Theme>
  </StrictMode>,
);
