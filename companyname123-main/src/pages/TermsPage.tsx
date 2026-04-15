import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

function TermsPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);

    
  return (
    <div className="relative">
      <Helmet>
        <title>Terms of Service - Hajz Telecommunication Co Ltd.</title>
        <meta name="description" content="Hajz Telecommunication Co Ltd.'s terms of service outline the rules and guidelines for using our services." />
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
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert prose-lg">
              <p className="text-white/80">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-white/80">
                  By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Use of Services</h2>
                <p className="text-white/80 mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these Terms.
                </p>
                <ul className="list-disc pl-6 text-white/80 space-y-2">
                  <li>Maintain accurate account information</li>
                  <li>Protect your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Service Modifications</h2>
                <p className="text-white/80">
                  We reserve the right to modify or discontinue any part of our services at any time without notice.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                <p className="text-white/80">
                  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Contact Information</h2>
                <p className="text-white/80">
                  For any questions regarding these Terms, please contact us at:
                </p>
                <p className="text-white/80 mt-2">
                  Email: legal@hajztelecom.com<br />
                  Phone: +966 11 000 0000
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

export default TermsPage;