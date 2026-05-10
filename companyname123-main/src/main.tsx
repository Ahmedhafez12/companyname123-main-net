import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider } from './i18n';
import LoadingScreen from './components/LoadingScreen';
import './index.css';

const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LocaleProvider>
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingScreen />}>
              <App />
            </Suspense>
          </AnimatePresence>
        </LocaleProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
