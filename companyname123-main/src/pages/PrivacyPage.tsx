import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

function PrivacyPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);
    
  return (
    <div className="relative">
      <Helmet>
        <title>Privacy Policy - Hajz Telecommunication Co Ltd.</title>
        <meta name="description" content="Hajz Telecommunication Co Ltd.'s privacy policy explains how we collect, use, and protect your personal information." />
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
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert prose-lg">
              <p className="text-white/80">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="text-white/80 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-white/80 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Company information</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-white/80 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-white/80 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you</li>
                  <li>Send important updates and announcements</li>
                  <li>Respond to your requests and inquiries</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Information Security</h2>
                <p className="text-white/80">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, modification, or destruction.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
                <p className="text-white/80">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-white/80 mt-2">
                  Email: privacy@example.com<br />
                  Phone: +1 (555) 123-4567
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPage;