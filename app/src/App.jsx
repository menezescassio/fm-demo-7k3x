import { useState, useEffect, useCallback } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import ProtoBar from './ProtoBar.jsx';
import Rail from './Rail.jsx';
import S1 from './screens/S1.jsx';
import S2 from './screens/S2.jsx';
import S3 from './screens/S3.jsx';
import { TASKS, RECAPS } from './data.js';

// Parse deep-link state once, on load — mirrors the original applyUrlState():
// ?role=broker|listing|legal · ?installed=1 · ?var=live|dormant · ?screen=s1|s2|s3
function initialState() {
  const p = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
  const role = p.get('role');
  const v = p.get('var');
  const screen = p.get('screen');
  return {
    role: role && TASKS[role] ? role : 'broker',
    installed: p.get('installed') === '1',
    variant: v && RECAPS[v] ? v : 'live',
    screen: screen === 's1' || screen === 's2' || screen === 's3' ? screen : 's1',
  };
}

export default function App() {
  const init = initialState();
  const [screen, setScreen] = useState(init.screen);
  const [role, setRole] = useState(init.role);
  const [installed, setInstalled] = useState(init.installed);
  const [variant, setVariant] = useState(init.variant);

  const go = useCallback((id) => {
    setScreen(id);
  }, []);

  // Smooth scroll to top on every screen change (including deep-link mount).
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  return (
    <AppShell
      height="auto"
      contentPadding={4}
      banner={<ProtoBar screen={screen} onGo={go} />}
      sideNav={<Rail screen={screen} onGo={go} />}
    >
      <div key={screen} className="screen-rise">
        {screen === 's1' && (
          <S1 role={role} onSelectRole={setRole} onRunTask={(r) => { setRole(r); go('s2'); }} />
        )}
        {screen === 's2' && (
          <S2 role={role} installed={installed} onBack={() => go('s1')} onInstall={() => setInstalled(true)} />
        )}
        {screen === 's3' && (
          <S3 variant={variant} onVariant={setVariant} />
        )}
      </div>
    </AppShell>
  );
}
