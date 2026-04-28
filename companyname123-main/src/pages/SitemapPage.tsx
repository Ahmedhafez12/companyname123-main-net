import React, { useEffect } from 'react';
import PageSEO from '../utils/PageSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useTranslation, useLocale } from '../i18n';

function SitemapPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <PageSEO
        title={t.sitemapPage.seoTitle}
        description={t.sitemapPage.seoDescription}
        path={localePath('/sitemap')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: t.sitemapPage.title, path: localePath('/sitemap') },
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
            <h1 className="text-4xl font-bold text-white mb-8">{t.sitemapPage.title}</h1>

            <div className="space-y-12">
              {t.sitemapPage.sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={localePath(link.path)}
                          className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                        >
                          <span className="w-2 h-2 bg-[#A6CE39] rounded-full me-3"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitemapPage;
