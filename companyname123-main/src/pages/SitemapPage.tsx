import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function SitemapPage() {
  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Our Customers', path: '/customers' },
        { name: 'Our Partners', path: '/partners' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);

  return (
    <div className="relative">
      <Helmet>
        <title>Sitemap - Hajz Telecommunication Co Ltd.</title>
        <meta name="description" content="Navigate through Hajz Telecommunication Co Ltd.'s website structure with our comprehensive sitemap." />
      </Helmet>

      {/* Background gradient */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      <div className="relative pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Sitemap</h1>

            <div className="space-y-12">
              {siteStructure.map((section, index) => (
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
                          to={link.path}
                          className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                        >
                          <span className="w-2 h-2 bg-[#A6CE39] rounded-full mr-3"></span>
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