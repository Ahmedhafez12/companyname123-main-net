import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
const WhiteBgNavbar = lazy(() => import('./components/WhiteBgNavbar'));
const Navbar = lazy(() => import('./components/Navbar'));
const StickyContactForm = lazy(() => import('./components/StickyContactForm'));
import { useLocale, useTranslation } from './i18n';

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const WhatwedoPage = lazy(() => import('./pages/WhatwedoPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const CommandControlPage = lazy(() => import('./pages/CommandControlPage'));
const TelecommunicationsPage = lazy(() => import('./pages/TelecommunicationsPage'));
const Navbar2PreviewPage = lazy(() => import('./pages/Navbar2PreviewPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Transparent navbar is only for Home and About Overview. */
const TRANSPARENT_NAVBAR_PATHS = ['/', '/ar', '/about/overview', '/ar/about/overview'] as const;

const NAVBAR2_PREVIEW_PATH = '/preview/navbar2';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#002C3D' }}>
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: t.fontFamily }}>
          {t.common.errorTitle}
        </h1>
        <p className="text-white/60 mb-6" style={{ fontFamily: '"Rubik", system-ui, sans-serif' }}>
          {t.common.errorMessage}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-2.5 rounded-lg bg-[#A6CE39] text-white font-medium hover:bg-[#7CCCBF] transition-colors"
          >
            {t.common.tryAgain}
          </button>
          <Link
            to={localePath('/')}
            onClick={resetErrorBoundary}
            className="px-6 py-2.5 rounded-lg border border-white/20 text-white font-medium hover:border-white/40 transition-colors"
          >
            {t.common.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="w-8 h-8 border-2 border-white/20 border-t-[#44C8F5] rounded-full animate-spin" />
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const { locale, dir } = useLocale();
  const { t } = useTranslation();
  const useTransparentNavbar = (TRANSPARENT_NAVBAR_PATHS as readonly string[]).includes(location.pathname);
  const isNavbar2Preview = location.pathname === NAVBAR2_PREVIEW_PATH;

  // Set HTML attributes based on locale
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.style.fontFamily = t.fontFamily;
  }, [locale, dir, t.fontFamily]);

  // Smooth scroll-to-top on route change (only when no hash anchor in URL)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="relative">
      {!isNavbar2Preview && (
        <Suspense fallback={null}>
          {useTransparentNavbar ? <Navbar /> : <WhiteBgNavbar basePath="" />}
        </Suspense>
      )}

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace(locale === 'ar' ? '/ar' : '/')}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                {/* English routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/about/overview" element={<AboutUsPage />} />
                <Route path="/what-we-do" element={<WhatwedoPage />} />
                <Route path="/what-we-do/command-control" element={<CommandControlPage />} />
                <Route path="/what-we-do/telecommunications" element={<TelecommunicationsPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path={NAVBAR2_PREVIEW_PATH} element={<Navbar2PreviewPage />} />

                {/* Arabic routes */}
                <Route path="/ar" element={<HomePage />} />
                <Route path="/ar/about" element={<AboutPage />} />
                <Route path="/ar/about/overview" element={<AboutUsPage />} />
                <Route path="/ar/what-we-do" element={<WhatwedoPage />} />
                <Route path="/ar/what-we-do/command-control" element={<CommandControlPage />} />
                <Route path="/ar/what-we-do/telecommunications" element={<TelecommunicationsPage />} />
                <Route path="/ar/solutions" element={<SolutionsPage />} />
                <Route path="/ar/customers" element={<CustomersPage />} />
                <Route path="/ar/partners" element={<PartnersPage />} />
                <Route path="/ar/contact" element={<ContactPage />} />
                <Route path="/ar/privacy" element={<PrivacyPage />} />
                <Route path="/ar/terms" element={<TermsPage />} />
                <Route path="/ar/sitemap" element={<SitemapPage />} />

                {/* 404 catch-all — must come last */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </ErrorBoundary>

      {!isNavbar2Preview && <StickyContactForm />}
    </div>
  );
}

export default App;
