import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TestRefactorNavBar from './components/TestRefactorNavBar';
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

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <TestRefactorNavBar />
      
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
        </Routes>
      </AnimatePresence>

      <StickyContactForm />
    </div>
  );
}

export default App;