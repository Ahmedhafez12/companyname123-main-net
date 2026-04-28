import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider } from './i18n';
import LoadingScreen from './components/LoadingScreen';
import './index.css';

// Lazy load the main App component with artificial delay
const App = lazy(async () => {
  // Delay for 3 seconds exactly
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { default: (await import('./App')).default };
});

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
