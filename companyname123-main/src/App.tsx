import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WhiteBgNavbar from './components/WhiteBgNavbar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutUsPage from './pages/AboutUsPage';
import WhatwedoPage from './pages/WhatwedoPage';
import SolutionsPage from './pages/SolutionsPage';
import CustomersPage from './pages/CustomersPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SitemapPage from './pages/SitemapPage';
import CommandControlPage from './pages/CommandControlPage';
import TelecommunicationsPage from './pages/TelecommunicationsPage';
import StickyContactForm from './components/StickyContactForm';
import Navbar2PreviewPage from './pages/Navbar2PreviewPage';

/** Transparent navbar is only for Home and About Overview. */
const TRANSPARENT_NAVBAR_PATHS = ['/', '/about/overview'] as const;

const NAVBAR2_PREVIEW_PATH = '/preview/navbar2';

function App() {
  const location = useLocation();
  const useTransparentNavbar = (TRANSPARENT_NAVBAR_PATHS as readonly string[]).includes(location.pathname);
  const isNavbar2Preview = location.pathname === NAVBAR2_PREVIEW_PATH;

  return (
    <div className="relative">
      {!isNavbar2Preview && (useTransparentNavbar ? <Navbar /> : <WhiteBgNavbar basePath="" />)}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
        </Routes>
      </AnimatePresence>

      {!isNavbar2Preview && <StickyContactForm />}
    </div>
  );
}

export default App;