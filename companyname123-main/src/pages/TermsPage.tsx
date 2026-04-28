import React, { useEffect } from 'react';
import PageSEO from '../utils/PageSEO';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { useTranslation, useLocale } from '../i18n';

function TermsPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <PageSEO
        title={t.termsPage.seoTitle}
        description={t.termsPage.seoDescription}
        path={localePath('/terms')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: t.termsPage.title, path: localePath('/terms') },
        ]}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      <div className="relative pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-white mb-8">{t.termsPage.title}</h1>

            <div className="prose prose-invert prose-lg">
              <p className="text-white/80">
                {t.termsPage.lastUpdated} {new Date().toLocaleDateString()}
              </p>

              {t.termsPage.sections.map((section, i) => (
                <section key={i} className="mt-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
                  {section.content.split('\n').map((line, j) => (
                    <p key={j} className="text-white/80 mb-2">{line}</p>
                  ))}
                  {section.items && (
                    <ul className="list-disc ps-6 text-white/80 space-y-2">
                      {section.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsPage;
