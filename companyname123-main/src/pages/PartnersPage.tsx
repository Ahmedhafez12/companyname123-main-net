import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'phosphor-react';
import { Link } from 'react-router-dom';
import KeyCustomersBanner from '../components/KeyCustomersBanner';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keyPartners = [
    { name: 'FORA', logo: 'https://cdn.shopify.com/s/files/1/0510/8655/7362/files/FORA_Logo_e69f5314-5a32-440e-9f1b-a3d2f9676bb1.png', url: 'https://foracare.com/' },
    { name: 'Cambium Networks', logo: '/assets/Cambium-Networks-Logo.png', url: 'https://www.cambiumnetworks.com/' },
    { name: 'Patton', logo: 'https://tritech.co.il/wp-content/uploads/2018/04/formation-patton-1.png', url: 'https://www.patton.com/' },
    { name: 'Ip Tech', logo: 'https://iptechlabs.com/wp-content/uploads/BrandingGraphicsLogos/IPTL_Logo_Transparent_PNG.png', url: 'https://iptechlabs.com/' },
    { name: 'M5 Technologies', logo: 'https://documentation.media5corp.com/download/attachments/524289/atl.site.logo?version=7&modificationDate=1771424618039&api=v2', url: 'https://www.m5technologies.com/' },
    { name: 'Kerpen', logo: 'https://www.secomp.nl/thumbor/OrDiZJB3a2ytXjNkifZBsqPip3A=/filters:cachevalid(2022-11-18T15:16:15.230772):strip_icc():strip_exif()/cms_secde/cms/ueber_uns/markenwelt/kerpen_datacom/kerpen-datacom.png', url: 'https://kerpen-data.com/en/' },
    { name: 'Avaya', logo: '/assets/avaya_red_logo_600x300.jpg', url: 'https://www.avaya.com/' },
    { name: '3CX', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/3CX_logo.svg', url: 'https://www.3cx.com/' },
    { name: 'J&R Technology', logo: 'https://www.jrtelephone.com/uploads/7137/logo.png', url: 'https://www.jrtelephone.com/' },
  ];

  return (
    <div className="relative">
      <Helmet>
        <title>Our Partners – Hajz Telecommunication Co Ltd.</title>
        <meta name="description" content="Meet the partners who collaborate with Hajz Telecommunication Co Ltd. to deliver world-class telecommunications solutions." />
      </Helmet>

      {/* Background */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      {/* ═══════════════ HERO ═══════════════ */}
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

          {/* Eyebrow */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-[#A6CE39]/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A6CE39]">
              Our Partners
            </span>
            <span className="h-px w-8 bg-[#A6CE39]/50" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Building the future{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
              together
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/80 text-center max-w-xl mx-auto mt-4"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', lineHeight: 1.6 }}
          >
            We collaborate with leading technology providers to deliver comprehensive telecommunications solutions.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ KEY PARTNERS BANNER ═══════════════ */}
      <section className="relative py-16 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <p className="text-center text-xs tracking-[0.15em] uppercase text-white/30 mb-8">
            Our global partner network
          </p>
          <KeyCustomersBanner keyCustomers={keyPartners} />
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center p-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A6CE39] mb-4">
              Partner With Us
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              Interested in becoming a partner?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
              Get in touch to explore partnership opportunities with Hajz Telecommunication Co Ltd.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 group">
              <span>Contact Us</span>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
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

export default PartnersPage;
