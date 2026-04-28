import React, { useEffect } from 'react';
import PageSEO from '../utils/PageSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';
import Footer from '../components/Footer';
import KeyCustomersBanner from '../components/KeyCustomersBanner';
import { useTranslation, useLocale } from '../i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CustomersPage() {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keyCustomers = [
    { name: 'STC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg' },
    { name: 'BT', logo: 'https://static.cdnlogo.com/logos/b/58/bt-3.svg' },
    { name: 'Ericsson', logo: 'https://companieslogo.com/img/orig/ERIC_BIG-6f963a82.png?t=1720244491' },
    { name: 'HP', logo: 'https://companieslogo.com/img/orig/HPQ-30e5d607.png?t=1740329963' },
    { name: 'Microsoft', logo: 'https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png' },
    { name: 'Nokia', logo: 'https://www.nokia.com/themes/custom/onenokia_reskin/logo.svg' },
    { name: 'Citibank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Goldman Sachs', logo: 'https://www.vhv.rs/dpng/d/504-5049178_goldman-sachs-logo-goldman-sachs-logo-svg-hd.png' },
    { name: 'Oracle', logo: '/assets/oracle-logo.svg' },
    { name: 'Xerox', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Xerox_logo.svg' },
    { name: 'JP Morgan', logo: 'https://www.jpmorgan.com/content/dam/logos-global/logo-jpm-brown.svg' },
  ];

  return (
    <div className="relative">
      <PageSEO
        title={t.customersPage.seoTitle}
        description={t.customersPage.seoDescription}
        path={localePath('/customers')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: t.customersPage.eyebrow, path: localePath('/customers') },
        ]}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(5rem, 10vh, 6rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 w-full max-w-7xl">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-[#44C8F5]/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#44C8F5]">
              {t.customersPage.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#44C8F5]/50" />
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            {t.customersPage.headline}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
              {t.customersPage.headlineHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/80 text-center max-w-xl mx-auto mt-4"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', lineHeight: 1.6 }}
          >
            {t.customersPage.subtitle}
          </motion.p>
        </div>
      </section>

      {/* KEY CUSTOMERS BANNER */}
      <section className="relative py-16 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <p className="text-center text-xs tracking-[0.15em] uppercase text-white/30 mb-8">
            {t.customersPage.bannerLabel}
          </p>
          <KeyCustomersBanner keyCustomers={keyCustomers} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center p-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#44C8F5] mb-4">
              {t.customersPage.ctaEyebrow}
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              {t.customersPage.ctaTitle}
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
              {t.customersPage.ctaText}
            </p>
            <Link to={localePath('/contact')} className="btn-primary inline-flex items-center gap-2 group">
              <span>{t.customersPage.ctaButton}</span>
              <div className={`transform group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rtl-flip' : ''}`}>
                <ArrowRight weight="thin" size={20} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CustomersPage;
