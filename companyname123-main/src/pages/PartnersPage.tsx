import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Trophy, ArrowRight, Shield, Lightning, Target } from 'phosphor-react';
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

  const partnerTypes = [
    {
      icon: <Shield weight="thin" size={28} />,
      accentClass: 'text-[#44C8F5]',
      accentBg: 'bg-[#44C8F5]/10',
      accentBorder: 'border-[#44C8F5]/20',
      dotColor: 'bg-[#44C8F5]',
      title: 'Technology Partners',
      description: 'Leading technology providers who complement and extend our solution portfolio.',
      benefits: ['Access to cutting-edge technology', 'Deeply integrated solutions', 'Shared technical expertise'],
    },
    {
      icon: <Lightning weight="thin" size={28} />,
      accentClass: 'text-[#A6CE39]',
      accentBg: 'bg-[#A6CE39]/10',
      accentBorder: 'border-[#A6CE39]/20',
      dotColor: 'bg-[#A6CE39]',
      title: 'Solution Partners',
      description: 'System integrators and solution providers who deploy our technology at scale.',
      benefits: ['Comprehensive onboarding support', 'Training & certification programs', 'Co-marketing resources'],
    },
    {
      icon: <Target weight="thin" size={28} />,
      accentClass: 'text-[#7CCCBF]',
      accentBg: 'bg-[#7CCCBF]/10',
      accentBorder: 'border-[#7CCCBF]/20',
      dotColor: 'bg-[#7CCCBF]',
      title: 'Strategic Partners',
      description: 'Long-term alliances built on shared innovation and global market expansion.',
      benefits: ['Joint product development', 'Priority market access', 'Revenue-sharing models'],
    },
  ];

  const stats = [
    { icon: <Handshake weight="thin" size={28} />, value: '200+', label: 'Active Partners' },
    { icon: <Users weight="thin" size={28} />, value: '5,000+', label: 'Certified Professionals' },
    { icon: <Globe weight="thin" size={28} />, value: '50+', label: 'Countries' },
    { icon: <Trophy weight="thin" size={28} />, value: '25+', label: 'Industry Awards' },
  ];

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

  const processSteps = [
    { step: '01', title: 'Apply', description: 'Submit your partnership application and tell us about your organisation.' },
    { step: '02', title: 'Evaluate', description: 'Our partnership team reviews your application and aligns on mutual goals.' },
    { step: '03', title: 'Onboard', description: 'Complete certification and gain access to resources, tools, and training.' },
    { step: '04', title: 'Grow', description: 'Launch joint initiatives and grow your business alongside Hajz.' },
  ];

  return (
    <div className="relative">
      <Helmet>
        <title>Our Partners – Hajz Telecommunication Co Ltd. | Global Partnership Program</title>
        <meta name="description" content="Join Hajz Telecommunication Co Ltd.'s partner ecosystem and help shape the future of telecommunications." />
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
              Partnership Program
            </span>
            <span className="h-px w-8 bg-[#A6CE39]/50" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Build the future{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
              together
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/80 text-center max-w-xl mx-auto mt-4"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', lineHeight: 1.6 }}
          >
            Join a global ecosystem of innovators and help shape the next generation of telecommunications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 group">
              <span>Become a Partner</span>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight weight="thin" size={20} />
              </div>
            </Link>
            <a
              href="#partner-types"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-colors duration-300"
            >
              Explore Programs
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:border-white/20 transition-colors duration-300"
              >
                <div className="text-[#A6CE39] flex justify-center mb-3">{s.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/50 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ KEY PARTNERS BANNER ═══════════════ */}
      <section className="relative py-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <p className="text-center text-xs tracking-[0.15em] uppercase text-white/30 mb-8">
            Our global partner network
          </p>
          <KeyCustomersBanner keyCustomers={keyPartners} />
        </div>
      </section>

      {/* ═══════════════ PARTNERSHIP TYPES ═══════════════ */}
      <section id="partner-types" className="relative py-24 px-4 sm:px-6 xl:px-8">
        <div className="container mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A6CE39] mb-3">
              Partnership Programs
            </p>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Find the right fit for your business.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((pt, i) => (
              <motion.div
                key={pt.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
                className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                {/* Top accent bar */}
                <div className={`h-[2px] w-full mb-6 rounded-full ${pt.dotColor} opacity-60`} />

                <div className={`${pt.accentClass} mb-4`}>{pt.icon}</div>

                <h3 className="text-white font-bold text-xl mb-3">{pt.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{pt.description}</p>

                <ul className="space-y-2.5 mb-7">
                  {pt.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/60">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${pt.dotColor}`} />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${pt.accentClass} group-hover:gap-3 transition-all duration-200`}
                >
                  Learn more
                  <ArrowRight weight="bold" size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="relative py-20 px-4 sm:px-6 xl:px-8 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#44C8F5] mb-3">
              How It Works
            </p>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              From application to growth.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/20 transition-colors duration-300"
              >
                <span className="text-4xl font-bold text-white/10 block mb-4 leading-none">
                  {s.step}
                </span>
                <h4 className="text-white font-bold text-lg mb-2">{s.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
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
              Join Us
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              Ready to partner with Hajz?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
              Join 200+ active partners across 50+ countries and unlock new opportunities in telecommunications.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 group">
              <span>Apply Now</span>
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