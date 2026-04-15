import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Buildings,
  GlobeHemisphereWest,
  Trophy,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  TrendUp,
  Quotes,
} from 'phosphor-react';
import Footer from '../components/Footer';
import KeyCustomersBanner from '../components/KeyCustomersBanner';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CustomersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const customers = [
    {
      name: 'Global Tech Industries',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&h=300&q=80',
      tag: '5G Infrastructure',
      description: 'Implementing 5G infrastructure across 12 countries',
      testimonial: 'Hajz Telecommunication Co Ltd. has been instrumental in our digital transformation journey.',
      results: ['40% reduction in network latency', '99.99% uptime achieved', 'Seamless IoT integration'],
    },
    {
      name: 'Smart City Solutions',
      logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=300&h=300&q=80',
      tag: 'IoT Networks',
      description: 'IoT network deployment for smart city initiatives',
      testimonial: 'Their expertise in IoT networks has helped us create smarter, more connected cities.',
      results: ['Connected 50,000+ devices', '30% energy savings', 'Real-time data analytics'],
    },
    {
      name: 'Enterprise Systems',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=300&h=300&q=80',
      tag: 'Cloud & Security',
      description: 'Cloud infrastructure and security solutions',
      testimonial: 'Reliable, secure, and scalable solutions that grow with our business.',
      results: ['Zero security breaches', '45% cost reduction', '100% compliance maintained'],
    },
    {
      name: 'Future Networks',
      logo: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=300&h=300&q=80',
      tag: 'Telecom Infrastructure',
      description: 'Advanced telecommunications infrastructure',
      testimonial: 'A partner that truly understands the future of connectivity.',
      results: ['10x network capacity', 'Global coverage achieved', '24/7 technical support'],
    },
  ];

  const stats = [
    { icon: <Buildings weight="thin" size={28} />, value: '500+', label: 'Enterprise Clients' },
    { icon: <GlobeHemisphereWest weight="thin" size={28} />, value: '50+', label: 'Countries Served' },
    { icon: <Trophy weight="thin" size={28} />, value: '98%', label: 'Client Satisfaction' },
    { icon: <Users weight="thin" size={28} />, value: '1M+', label: 'End Users' },
  ];

  const successMetrics = [
    {
      icon: <Star weight="thin" size={28} />,
      title: 'Customer Success',
      description: 'Our customers achieve their business objectives faster with our solutions.',
      metric: '95% success rate',
    },
    {
      icon: <CheckCircle weight="thin" size={28} />,
      title: 'Implementation',
      description: 'Smooth and efficient implementation of complex telecommunications projects.',
      metric: 'On-time delivery',
    },
    {
      icon: <TrendUp weight="thin" size={28} />,
      title: 'Return on Investment',
      description: 'Significant return on investment through optimised infrastructure.',
      metric: '3× average ROI',
    },
  ];

  const keyCustomers = [
    { name: 'STC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg' },
    { name: 'BT', logo: 'https://static.cdnlogo.com/logos/b/58/bt-3.svg' },
    { name: 'Ericsson', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ericsson_%282018%29.svg/1200px-Ericsson_%282018%29.svg.png' },
    { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png' },
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
      <Helmet>
        <title>Our Customers – Hajz Telecommunication Co Ltd. | Success Stories</title>
        <meta name="description" content="Discover how Hajz Telecommunication Co Ltd. helps enterprises achieve digital transformation through innovative telecommunications solutions." />
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
            <span className="h-px w-8 bg-[#44C8F5]/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#44C8F5]">
              Customer Stories
            </span>
            <span className="h-px w-8 bg-[#44C8F5]/50" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
              Global Leaders
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/80 text-center max-w-xl mx-auto mt-4"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', lineHeight: 1.6 }}
          >
            Discover how the world's most ambitious organisations are reimagining connectivity with Hajz.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:border-white/20 transition-colors duration-300"
              >
                <div className="text-[#44C8F5] flex justify-center mb-3">{s.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/50 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ KEY CUSTOMERS BANNER ═══════════════ */}
      <section className="relative py-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <p className="text-center text-xs tracking-[0.15em] uppercase text-white/30 mb-8">
            Trusted by industry leaders worldwide
          </p>
          <KeyCustomersBanner keyCustomers={keyCustomers} />
        </div>
      </section>

      {/* ═══════════════ CASE STUDY CARDS ═══════════════ */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8">
        <div className="container mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A6CE39] mb-3">
              Case Studies
            </p>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Real results. Real impact.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {customers.map((c, i) => (
              <motion.div
                key={c.name}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Top accent bar */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-transparent" />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#44C8F5] bg-[#44C8F5]/10 rounded-full px-3 py-1 mb-2">
                        {c.tag}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-tight">{c.name}</h3>
                      <p className="text-white/50 text-sm mt-0.5">{c.description}</p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="relative mb-5 pl-4 border-l-2 border-[#7CCCBF]/40">
                    <Quotes weight="fill" size={14} className="text-[#7CCCBF]/40 absolute -top-1 -left-1" />
                    <p className="text-white/70 text-sm leading-relaxed italic">{c.testimonial}</p>
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    {c.results.map((r) => (
                      <div key={r} className="flex items-center gap-2.5 text-sm text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A6CE39] flex-shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SUCCESS METRICS ═══════════════ */}
      <section className="relative py-20 px-4 sm:px-6 xl:px-8 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A6CE39] mb-3">
              Our Track Record
            </p>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Measurable outcomes, every time.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {successMetrics.map((m, i) => (
              <motion.div
                key={m.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 hover:border-white/20 transition-colors duration-300"
              >
                <div className="text-[#44C8F5] mb-4">{m.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{m.description}</p>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-[#A6CE39]/10 border border-[#A6CE39]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A6CE39]" />
                  <span className="text-[#A6CE39] text-sm font-semibold">{m.metric}</span>
                </div>
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#44C8F5] mb-4">
              Get Started
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              Ready to transform your business?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
              Join over 500 enterprises who have already partnered with Hajz to accelerate their digital future.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 group">
              <span>Get Started</span>
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

export default CustomersPage;