import React, { Suspense, lazy, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Recruitment pages are only reachable by direct link and are loaded on demand,
// so they add nothing to the main website bundle.
const ApplicationFormPage = lazy(() => import('./features/recruitment/ApplicationFormPage'));
const AdminConsole = lazy(() => import('./features/recruitment/admin/AdminConsole'));

type Mode = 'site' | 'apply' | 'admin';

const modeFromHash = (): Mode => {
  const h = window.location.hash;
  if (h.startsWith('#hr-console/')) return 'admin';
  if (h === '#careers-apply' || h.startsWith('#careers-apply/')) return 'apply';
  return 'site';
};

const Loading = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#867362', background: '#FBF5EB' }}>
    Loading…
  </div>
);

const Root: React.FC = () => {
  const [mode, setMode] = useState<Mode>(modeFromHash);

  useEffect(() => {
    const onHash = () => {
      const next = modeFromHash();
      setMode((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (mode === 'site') return <App />;
  return (
    <Suspense fallback={<Loading />}>{mode === 'admin' ? <AdminConsole /> : <ApplicationFormPage />}</Suspense>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}
