import React, { useCallback, useEffect, useRef, useState } from 'react';
import PageSEO from '../utils/PageSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  Trophy,
  Calendar,
  ShareNetwork,
  Rocket,
  Shield,
  Lightning,
  Users,
  ArrowsLeftRight,
  Package,
  ChartLineUp,
  TrendUp,
  ArrowRight,
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle,
  Target,
  Eye,
  Phone,
  Envelope,
} from 'phosphor-react';
import HeroScrollIndicator from '../components/HeroScrollIndicator';
import { useTranslation, useLocale } from '../i18n';

// --- Brand palette (matches tailwind theme) ---
const C = {
  primary: '#005E96',
  secondary: '#44C8F5',
  accent: '#7CCCBF',
  cta: '#A6CE39',
  bg: '#002C3D',
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT_TEXT = `linear-gradient(135deg, ${C.cta}, ${C.accent}, ${C.secondary})`;

const IMG = {
  heroMain: '/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_541700df21.jpeg',
  heroSide: '/assets/Telecommunications/Telecom_tower_connecting_landscape_7cdb458686.jpeg',
  pillars: [
    '/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu.png',
    '/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu1.png',
    '/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu2.png',
  ],
  vision: '/assets/abstracts/Abstract_isometric_grid_of_interconnected_hexagons_delpmaspu.png',
  strengthWide: '/assets/Telecommunications/Network_company_server_corridor_78627a8092.jpeg',
  strengthTrack: '/assets/CommandandControl/Leadership_team_reviewing_map_5bf849bbcf.jpeg',
  whyBg: '/assets/abstracts/Abstract_digital_art_featuring_flowing_data_stream_delpmaspu.png',
  edge: '/assets/abstracts/Abstract_web_background_minimalist_neural_network__delpmaspu.png',
  cta: '/assets/abstracts/Digital_stream_of_information_abstract_flowing_fib_delpmaspu.png',
};

const pad = (n: number) => String(n).padStart(2, '0');

const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay, ease: EASE },
});

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// ── Shared bits ──────────────────────────────────────────────

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-transparent bg-clip-text" style={{ backgroundImage: GRADIENT_TEXT }}>
      {children}
    </span>
  );
}

function Eyebrow({ index, label, isRTL, center = false }: { index?: string; label: string; isRTL: boolean; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      {index && (
        <span className="font-sans text-sm font-bold tabular-nums" style={{ color: C.cta }}>
          {index}
        </span>
      )}
      <span
        className="h-px w-10"
        style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.cta}, transparent)` }}
      />
      <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
        {label}
      </span>
    </div>
  );
}

function SectionTitle({ lead, highlight, className = '' }: { lead: string; highlight?: string; className?: string }) {
  return (
    <h2
      className={`font-sans font-bold text-white leading-[1.08] ${className}`}
      style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)', letterSpacing: '-0.02em' }}
    >
      {lead}
      {highlight && (
        <>
          {' '}
          <GradientText>{highlight}</GradientText>
        </>
      )}
    </h2>
  );
}

function DirectionalArrow({ isRTL, size = 18 }: { isRTL: boolean; size?: number }) {
  return (
    <span className={`inline-flex ${isRTL ? 'rtl-flip' : ''}`}>
      <ArrowRight weight="bold" size={size} />
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────

function AboutUsPage() {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { amount: 0.3 });
  const isLg = useMediaQuery('(min-width: 1024px)');
  const a = t.aboutUsPage;

  // Function to scroll to hash element
  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return;

    const container = scrollContainerRef.current;
    const element = (container?.querySelector(hash) ?? document.querySelector(hash)) as HTMLElement | null;
    if (!element) return;

    requestAnimationFrame(() => {
      const offset = 80;

      if (container) {
        const elementTop =
          element.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop;

        container.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      } else {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      }
    });
  }, []);

  // Handle hash on mount and route changes
  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const attemptScroll = (attempts = 0) => {
        const container = scrollContainerRef.current;
        const element = container?.querySelector(hash) ?? document.querySelector(hash);

        if (element) {
          scrollToHash(hash);
        } else if (attempts < 5) {
          setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
        }
      };

      setTimeout(() => attemptScroll(), 100);
    } else {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.hash, location.pathname, scrollToHash]);

  // Also handle browser back/forward with hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => scrollToHash(hash), 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToHash]);

  const sectionClass =
    'snap-start relative overflow-hidden shrink-0 min-h-[100dvh] lg:py-16 flex flex-col justify-center';
  const containerClass = 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <div className="relative overflow-x-hidden">
      <PageSEO
        title={a.seoTitle}
        description={a.seoDescription}
        path={localePath('/about/overview')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: a.hero.badge, path: localePath('/about/overview') },
        ]}
      />

      <div className="fixed inset-0 bg-primary/20 pointer-events-none -z-10" style={{ transform: 'translateZ(0)' }} />

      <HeroScrollIndicator
        sectionIds={[
          'what-we-do',
          'company-identity',
          'our-journey',
          'vision-mission',
          'core-strengths',
          'why-choose-us',
          'competitive-edge',
          'cta',
        ]}
      />

      <div ref={scrollContainerRef} className="scroll-snap-page h-screen overflow-y-scroll overflow-x-hidden">
        {/* ── Hero ── */}
        <section id="what-we-do" className={sectionClass}>
          <HeroSection onJourney={() => scrollToHash('#our-journey')} containerClass={containerClass} />
        </section>

        {/* ── Company Identity ── */}
        <section id="company-identity" className={sectionClass}>
          <IdentitySection isLg={isLg} containerClass={containerClass} />
        </section>

        {/* ── Our Journey ── */}
        <section id="our-journey" className={sectionClass}>
          <JourneySection containerClass={containerClass} />
        </section>

        {/* ── Vision & Mission ── */}
        <section id="vision-mission" className={sectionClass}>
          <VisionMissionSection containerClass={containerClass} />
        </section>

        {/* ── Core Strengths ── */}
        <section id="core-strengths" className={sectionClass}>
          <StrengthsSection containerClass={containerClass} />
        </section>

        {/* ── Why Choose Us ── */}
        <section id="why-choose-us" className={sectionClass}>
          <WhyUsSection containerClass={containerClass} />
        </section>

        {/* ── Competitive Edge ── */}
        <section id="competitive-edge" className={sectionClass}>
          <EdgeSection containerClass={containerClass} />
        </section>

        {/* ── CTA ── */}
        <section id="cta" ref={ctaRef} className={sectionClass}>
          <motion.button
            type="button"
            className={`explore-more-btn group absolute top-12 z-[100] pt-[0.5in] flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full ${isRTL ? 'left-4 sm:left-6 md:left-8 pl-[0.75in]' : 'right-4 sm:right-6 md:right-8 pr-[0.75in]'}`}
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-menu'))}
            aria-label="Open menu"
          >
            <span className="text-white/60 group-hover:text-white text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300">
              {t.homePage.exploreMore}
            </span>
            <motion.span
              className="inline-flex text-white/60 group-hover:text-white transition-colors duration-300"
              animate={isCtaInView ? { x: isRTL ? -4 : 4, y: -4 } : { x: 0, y: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              {isRTL ? <ArrowUpLeft weight="regular" size={16} /> : <ArrowUpRight weight="regular" size={16} />}
            </motion.span>
          </motion.button>
          <CtaSection containerClass={containerClass} />
        </section>
      </div>
    </div>
  );
}

// ── 1. Hero ──────────────────────────────────────────────────

function HeroSection({ onJourney, containerClass }: { onJourney: () => void; containerClass: string }) {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const a = t.aboutUsPage;

  const stats = [
    { value: a.stats.yearsExperience, label: a.labels.yearsLabel },
    { value: String(a.journey.events.length), label: a.labels.milestonesLabel },
    { value: a.stats.coreStrengthsCount, label: a.labels.strengthsLabel },
  ];

  return (
    <div className={`${containerClass} pt-28 pb-14 lg:py-0`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <motion.div {...reveal(0, 16)} className="mb-5">
            <Breadcrumbs
              items={[
                { name: a.breadcrumbs.home, path: localePath('/') },
                { name: a.breadcrumbs.about, path: localePath('/about') },
                { name: a.breadcrumbs.overview, path: localePath('/about/overview') },
              ]}
            />
          </motion.div>

          <motion.div
            {...reveal(0.05, 16)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: C.cta }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.cta }} />
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-white/85">{a.hero.badge}</span>
          </motion.div>

          <motion.h1
            {...reveal(0.1)}
            className="font-sans font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.25rem)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
          >
            {a.sections.whoWeAre} <GradientText>{a.sections.whoWeAreHighlight}</GradientText>
          </motion.h1>

          <motion.p {...reveal(0.18)} className="font-body text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
            {a.hero.summary}
          </motion.p>

          <motion.div {...reveal(0.26)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={localePath('/contact')} className="btn-primary inline-flex items-center gap-2 group px-6 py-3 text-sm sm:text-base">
              <span>{t.common.contactUs}</span>
              <span className={`inline-flex transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                <DirectionalArrow isRTL={isRTL} />
              </span>
            </Link>
            <button type="button" onClick={onJourney} className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base">
              <Calendar weight="bold" size={17} />
              <span>{a.labels.exploreJourney}</span>
            </button>
          </motion.div>

          <motion.dl {...reveal(0.34)} className="mt-10 lg:mt-12 grid grid-cols-3 max-w-lg border-t border-white/15">
            {stats.map((s, i) => (
              <div key={s.label} className={`pt-5 ${i > 0 ? 'ps-4 sm:ps-6 border-s border-white/15' : ''}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-sans font-bold text-white tabular-nums" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1 }}>
                  {s.value}
                </dd>
                <dd className="mt-2 font-body text-xs sm:text-sm text-white/60 leading-snug">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="lg:col-span-6 relative h-[52vh] min-h-[340px] lg:h-[min(72vh,620px)]"
        >
          <div
            className="absolute top-0 bottom-[12%] end-0 w-[86%] rounded-[2rem] overflow-hidden"
            style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08) inset` }}
          >
            <img src={IMG.heroMain} alt={a.hero.heroImageAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(200deg, transparent 40%, ${C.bg}CC 100%)` }} />
            <div className="absolute inset-0 mix-blend-soft-light" style={{ background: `linear-gradient(135deg, ${C.primary}AA, transparent 60%)` }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="absolute bottom-0 start-0 w-[46%] h-[42%] rounded-[1.5rem] overflow-hidden"
            style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.65)`, border: `5px solid ${C.bg}` }}
          >
            <img src={IMG.heroSide} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="absolute top-[10%] start-0 rounded-2xl border border-white/15 bg-[#002C3D]/70 backdrop-blur-xl px-5 py-4"
            style={{ boxShadow: '0 20px 40px -16px rgba(0,0,0,0.5)' }}
          >
            <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/55">{a.labels.since}</div>
            <div className="font-sans font-bold text-3xl tabular-nums mt-1">
              <GradientText>{a.journey.events[0]?.date}</GradientText>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="absolute bottom-[18%] end-5 hidden sm:flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-3"
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${C.cta}26`, color: C.cta }}>
              <Shield weight="duotone" size={20} />
            </span>
            <span className="font-sans text-sm font-semibold text-white max-w-[11rem] leading-snug">
              {a.coreStrengths.items[1]?.title}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── 2. Company Identity ──────────────────────────────────────

function IdentitySection({ isLg, containerClass }: { isLg: boolean; containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;
  const blocks = a.companyIdentity.blocks;
  const [active, setActive] = useState(0);

  return (
    <div className={`${containerClass} py-20 lg:py-0 lg:pt-16`}>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 lg:mb-10">
        <motion.div {...reveal()} className="max-w-2xl">
          <Eyebrow index="01" label={a.companyIdentity.sectionTitle} isRTL={isRTL} />
          <SectionTitle lead={a.sections.companyIdentity} highlight={a.sections.companyIdentityHighlight} />
          <p className="mt-4 font-body text-white/65 text-base sm:text-lg leading-relaxed">{a.companyIdentity.sectionSubtitle}</p>
        </motion.div>
        <motion.div {...reveal(0.1)} className="flex items-baseline gap-3 shrink-0">
          <span className="font-sans font-bold text-6xl lg:text-7xl leading-none">
            <GradientText>{blocks.length}</GradientText>
          </span>
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-white/60">{a.companyIdentity.pillarsLabel}</span>
        </motion.div>
      </div>

      <motion.div {...reveal(0.15)} className="flex flex-col lg:flex-row gap-4 lg:h-[min(54vh,500px)]">
        {blocks.map((block, i) => {
          const isActive = !isLg || i === active;
          return (
            <motion.div
              key={block.title}
              layout={isLg}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              tabIndex={0}
              className="relative overflow-hidden rounded-[1.75rem] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[320px] lg:min-h-0"
              style={{
                flex: isLg ? (i === active ? 3.2 : 1) : undefined,
                transition: 'flex 0.7s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={IMG.pillars[i % IMG.pillars.length]}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out"
                style={{ transform: isLg && i === active ? 'scale(1.06)' : 'scale(1)' }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(180deg, ${C.bg}55 0%, ${C.bg}B3 45%, ${C.bg}F2 100%)`,
                  opacity: isActive ? 1 : 0.9,
                }}
              />
              <div className="absolute inset-0 rounded-[1.75rem] pointer-events-none border border-white/10" />

              <div className="relative h-full flex flex-col p-6 sm:p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="font-sans text-sm font-bold tabular-nums rounded-full px-3 py-1 border"
                    style={{
                      color: isActive ? C.cta : 'rgba(255,255,255,0.7)',
                      borderColor: isActive ? `${C.cta}66` : 'rgba(255,255,255,0.2)',
                      background: 'rgba(0,0,0,0.2)',
                    }}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className="hidden lg:flex w-10 h-10 rounded-full items-center justify-center border transition-all duration-500"
                    style={{
                      borderColor: isActive ? C.cta : 'rgba(255,255,255,0.2)',
                      background: isActive ? C.cta : 'transparent',
                      color: '#fff',
                      transform: isActive ? 'rotate(0deg)' : `rotate(${isRTL ? 45 : -45}deg)`,
                    }}
                  >
                    <DirectionalArrow isRTL={isRTL} size={16} />
                  </span>
                </div>

                <div className="mt-auto">
                  <h3
                    className="font-sans font-bold text-white leading-tight transition-all duration-500"
                    style={{ fontSize: isActive ? 'clamp(1.35rem, 2vw, 1.85rem)' : '1.15rem' }}
                  >
                    {block.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="body"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: isLg ? 0.25 : 0, ease: EASE } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="mt-4 space-y-2.5 max-w-xl"
                      >
                        {block.paragraphs.map((p) => (
                          <p key={p} className="font-body text-sm lg:text-[0.95rem] text-white/75 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ── 3. Journey ───────────────────────────────────────────────

function extractMetric(text: string) {
  const m = text.match(/\+?\d[\d,]*\+|\+\d[\d,]*/);
  if (!m) return null;
  return m[0];
}

function JourneySection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;
  const events = a.journey.events;
  const [[active, dir], setState] = useState<[number, number]>([0, 0]);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(events.length - 1, i));
    setState(([cur]) => [next, next > cur ? 1 : -1]);
  };

  const ev = events[active];
  const metric = extractMetric(ev.description);
  const progress = events.length > 1 ? (active / (events.length - 1)) * 100 : 0;
  const offset = (isRTL ? -1 : 1) * 40;

  return (
    <div className={`${containerClass} py-20 lg:py-0 lg:pt-16`}>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
        <motion.div {...reveal()} className="max-w-2xl">
          <Eyebrow index="02" label={`${a.journey.events[0]?.date} — ${events[events.length - 1]?.date}`} isRTL={isRTL} />
          <SectionTitle lead={a.sections.ourJourney} highlight={a.sections.ourJourneyHighlight} />
          <p className="mt-4 font-body text-white/65 text-base sm:text-lg leading-relaxed">{a.journey.intro}</p>
        </motion.div>
        <motion.div {...reveal(0.1)} className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label={a.labels.previous}
            className="w-12 h-12 min-h-0 p-0 rounded-full border border-white/20 text-white flex items-center justify-center transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className={`inline-flex ${isRTL ? 'rtl-flip' : ''}`}><ArrowLeft weight="bold" size={18} /></span>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === events.length - 1}
            aria-label={a.labels.next}
            className="w-12 h-12 min-h-0 p-0 rounded-full text-white flex items-center justify-center transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: C.cta }}
          >
            <DirectionalArrow isRTL={isRTL} />
          </button>
        </motion.div>
      </div>

      {/* Rail */}
      <motion.div {...reveal(0.15)} className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-none">
        <div
          className="relative min-w-[560px]"
          role="tablist"
          aria-label={a.sections.ourJourney + ' ' + a.sections.ourJourneyHighlight}
          onKeyDown={(e) => {
            const fwd = isRTL ? 'ArrowLeft' : 'ArrowRight';
            const back = isRTL ? 'ArrowRight' : 'ArrowLeft';
            if (e.key === fwd) go(active + 1);
            if (e.key === back) go(active - 1);
          }}
        >
          <div className="absolute top-[11px] inset-x-[11px] h-[2px] rounded-full bg-white/15" />
          <motion.div
            className="absolute top-[11px] start-[11px] h-[2px] rounded-full"
            style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.secondary}, ${C.cta})` }}
            animate={{ width: `calc((100% - 22px) * ${progress / 100})` }}
            transition={{ duration: 0.6, ease: EASE }}
          />
          <div className="relative flex justify-between">
            {events.map((e, i) => {
              const done = i <= active;
              const isActive = i === active;
              return (
                <button
                  key={e.date}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(i)}
                  className="group flex flex-col items-center gap-3 min-h-0 min-w-0 p-0 bg-transparent focus:outline-none"
                >
                  <span
                    className="relative w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white/60"
                    style={{
                      background: done ? C.bg : 'rgba(0,44,61,0.6)',
                      border: `2px solid ${done ? C.cta : 'rgba(255,255,255,0.25)'}`,
                      boxShadow: isActive ? `0 0 0 6px ${C.cta}33, 0 0 24px ${C.cta}88` : 'none',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full transition-all" style={{ background: done ? C.cta : 'transparent' }} />
                  </span>
                  <span
                    className={`font-sans text-sm font-semibold tabular-nums transition-colors ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}
                  >
                    {e.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Featured milestone */}
      <motion.div
        {...reveal(0.2)}
        className="relative mt-8 lg:mt-10 rounded-[1.75rem] overflow-hidden border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${C.primary}59 0%, ${C.bg}D9 60%, ${C.bg}F2 100%)`,
          boxShadow: `0 40px 80px -40px rgba(0,0,0,0.6)`,
        }}
      >
        <div aria-hidden className="absolute -top-24 -end-24 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: C.secondary }} />
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: dir * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * offset }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center p-6 sm:p-8 lg:p-10"
          >
            <div
              className="font-sans font-bold tabular-nums leading-none select-none"
              style={{
                fontSize: 'clamp(4rem, 10vw, 8.5rem)',
                WebkitTextStroke: '1.5px rgba(166,206,57,0.85)',
                color: 'transparent',
                letterSpacing: '-0.03em',
              }}
            >
              {ev.date}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/55">
                  {a.labels.milestone} {pad(active + 1)} / {pad(events.length)}
                </span>
                {metric && (
                  <span
                    className="font-sans text-xs font-bold rounded-full px-3 py-1 tabular-nums"
                    style={{ background: `${C.cta}26`, color: C.cta, border: `1px solid ${C.cta}55` }}
                    dir="ltr"
                  >
                    {metric}
                  </span>
                )}
              </div>
              <h3 className="font-sans font-bold text-white text-2xl sm:text-3xl leading-tight mb-3">{ev.title}</h3>
              <p className="font-body text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl">{ev.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── 4. Vision & Mission ──────────────────────────────────────

function VisionMissionSection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;

  const cards = [
    {
      icon: Target,
      lead: a.sections.ourMission,
      highlight: a.sections.ourMissionHighlight,
      text: a.identity.mission,
      bullets: a.identity.missionBullets,
      bg: `linear-gradient(160deg, ${C.primary} 0%, #00466F 50%, ${C.bg} 100%)`,
      image: null as string | null,
    },
    {
      icon: Eye,
      lead: a.sections.ourVision,
      highlight: a.sections.ourVisionHighlight,
      text: a.identity.vision,
      bullets: a.identity.visionBullets,
      bg: `linear-gradient(160deg, ${C.bg} 0%, #013A50 100%)`,
      image: IMG.vision,
    },
  ];

  return (
    <div className={`${containerClass} py-20 lg:py-0 lg:pt-16`}>
      <motion.div {...reveal()} className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
        <Eyebrow index="03" label={a.hero.badge} isRTL={isRTL} center />
        <SectionTitle lead={a.sections.visionMission} highlight={a.sections.visionMissionHighlight} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={i}
              {...reveal(0.1 + i * 0.12)}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-7 sm:p-9 lg:p-10"
              style={{ background: card.bg, boxShadow: '0 40px 80px -40px rgba(0,0,0,0.6)' }}
            >
              {card.image && (
                <>
                  <img src={card.image} alt={a.hero.visionMissionImageAlt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-25 transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}99, ${C.bg}F2 70%)` }} />
                </>
              )}
              {!card.image && (
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                    maskImage: 'linear-gradient(180deg, #000, transparent 70%)',
                    WebkitMaskImage: 'linear-gradient(180deg, #000, transparent 70%)',
                  }}
                />
              )}
              <Icon aria-hidden weight="thin" size={220} className="absolute -bottom-10 -end-10 text-white/[0.06] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${C.cta}1F`, color: C.cta, border: `1px solid ${C.cta}40` }}
                  >
                    <Icon weight="duotone" size={24} />
                  </span>
                  <h3 className="font-sans font-bold text-white text-2xl sm:text-3xl">
                    {card.lead} <GradientText>{card.highlight}</GradientText>
                  </h3>
                </div>
                <p className="font-body text-white/80 text-sm sm:text-base leading-relaxed">{card.text}</p>
                <div className="h-px my-6 bg-gradient-to-r from-white/20 via-white/10 to-transparent rtl:bg-gradient-to-l" />
                <ul className="space-y-2.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle weight="fill" size={18} className="flex-shrink-0 mt-0.5" style={{ color: C.cta }} />
                      <span className="font-body text-sm sm:text-[0.95rem] text-white/85 leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

// ── 5. Core Strengths (bento) ────────────────────────────────

const STRENGTH_ICONS = [Calendar, ShareNetwork, Lightning, Users, Shield, Trophy];

function StrengthsSection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;
  const items = a.coreStrengths.items;

  // Layout: [0 0][1][2] / [3][4][5 5]
  const spans = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2'];
  const images: Record<number, string> = { 0: IMG.strengthWide, 5: IMG.strengthTrack };

  return (
    <div className={`${containerClass} py-20 lg:py-0 lg:pt-12`}>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-7 lg:mb-8">
        <motion.div {...reveal()} className="max-w-2xl">
          <Eyebrow index="04" label={a.labels.strengthsLabel} isRTL={isRTL} />
          <SectionTitle lead={a.sections.coreStrengths} highlight={a.sections.coreStrengthsHighlight} />
          <p className="mt-4 font-body text-white/65 text-base sm:text-lg leading-relaxed">{a.coreStrengths.intro}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(min(24vh,220px),auto)] gap-4">
        {items.map((item, i) => {
          const Icon = STRENGTH_ICONS[i] ?? Shield;
          const image = images[i];
          const featured = i === 0;
          return (
            <motion.div
              key={item.title}
              {...reveal(0.05 * i, 24)}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-6 flex flex-col min-h-[200px] lg:min-h-0 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 ${spans[i]} ${image ? 'sm:col-span-2' : ''}`}
              style={{
                background: image ? C.bg : `linear-gradient(160deg, rgba(0,94,150,0.35), rgba(0,44,61,0.75))`,
                boxShadow: '0 30px 60px -30px rgba(0,0,0,0.55)',
                backdropFilter: image ? undefined : 'blur(10px)',
              }}
            >
              {image && (
                <>
                  <img src={image} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.bg}F2 0%, ${C.bg}CC 45%, ${C.bg}33 100%)` }}
                  />
                </>
              )}
              <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${C.cta}, ${C.secondary}, transparent)` }}
              />

              <div className="relative flex items-center justify-between mb-auto">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{ background: `${C.cta}1F`, color: C.cta, border: `1px solid ${C.cta}40` }}
                >
                  <Icon weight="duotone" size={22} />
                </span>
                <span className="font-sans text-xs font-semibold tabular-nums text-white/40">{pad(i + 1)}</span>
              </div>

              <div className={`relative mt-4 ${image ? "max-w-md" : ""}`}>
                {featured ? (
                  <div className="font-sans font-bold leading-none mb-3" style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)', letterSpacing: '-0.03em' }}>
                    <GradientText>{item.title}</GradientText>
                  </div>
                ) : (
                  <h3 className="font-sans font-bold text-white text-lg lg:text-xl leading-snug mb-2">{item.title}</h3>
                )}
                <p className="font-body text-sm text-white/70 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── 6. Why Choose Us ─────────────────────────────────────────

const VALUE_ICONS = [ArrowsLeftRight, Package, ChartLineUp, Rocket, TrendUp];

function WhyUsSection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;
  const props = a.whyUs.valueProps;

  return (
    <>
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img src={IMG.whyBg} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg}40 80%)` }} />
      </div>

      <div className={`relative ${containerClass} py-20 lg:py-0 lg:pt-16`}>
        <motion.div {...reveal()} className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <Eyebrow index="05" label={`${a.whyUs.reasonsCount} ${a.whyUs.reasonsLabel}`} isRTL={isRTL} center />
          <SectionTitle lead={a.whyUs.valuePropTitle} highlight={a.whyUs.valuePropTitleHighlight} />
          <p className="mt-4 font-body text-white/65 text-base sm:text-lg leading-relaxed">{a.whyUs.valuePropSubtitle}</p>
        </motion.div>

        <div className="relative">
          {/* connector line (desktop) */}
          <div aria-hidden className="hidden lg:block absolute top-6 inset-x-[10%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          {/* connector line (mobile) */}
          <div aria-hidden className="lg:hidden absolute top-0 bottom-0 start-6 w-px bg-gradient-to-b from-white/25 via-white/15 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-4">
            {props.map((prop, i) => {
              const Icon = VALUE_ICONS[i] ?? Rocket;
              return (
                <motion.div key={prop.title} {...reveal(0.08 * i, 24)} className="group relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0">
                  <span
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-sans text-sm font-bold tabular-nums transition-all duration-300 group-hover:scale-110"
                    style={{ background: C.bg, color: C.cta, border: `2px solid ${C.cta}`, boxShadow: `0 0 0 6px ${C.bg}66, 0 0 24px ${C.cta}40` }}
                  >
                    {pad(i + 1)}
                  </span>
                  <div
                    className="relative flex-1 w-full lg:mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 p-6 lg:text-center transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-white/25 lg:min-h-[230px]"
                    style={{ background: 'linear-gradient(180deg, rgba(0,94,150,0.30), rgba(0,44,61,0.80))', backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.55)' }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: `linear-gradient(90deg, ${C.secondary}, ${C.cta})` }}
                    />
                    <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4" style={{ background: `${C.secondary}1F`, color: C.secondary }}>
                      <Icon weight="duotone" size={22} />
                    </span>
                    <h3 className="font-sans font-bold text-white text-lg leading-snug mb-2">{prop.title}</h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">{prop.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ── 7. Competitive Edge ──────────────────────────────────────

function EdgeSection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const a = t.aboutUsPage;
  const items = a.competitiveEdge.items;

  return (
    <div className={`${containerClass} py-20 lg:py-0 lg:pt-16`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          {...reveal(0)}
          className="lg:col-span-5 relative h-[40vh] min-h-[280px] lg:h-[min(70vh,600px)] rounded-[2rem] overflow-hidden"
          style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55` }}
        >
          <img src={IMG.edge} alt={a.hero.competitiveEdgeImageAlt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, ${C.bg}F2 100%)` }} />
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
            <div className="flex items-end gap-4">
              <span className="font-sans font-bold leading-none" style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}>
                <GradientText>{a.stats.competitiveEdgeCount}</GradientText>
              </span>
              <span className="pb-2 font-sans text-sm uppercase tracking-[0.2em] text-white/70">{a.labels.differentiatorsLabel}</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div {...reveal(0.05)}>
            <Eyebrow index="06" label={a.competitiveEdge.sectionTitle} isRTL={isRTL} />
            <SectionTitle lead={a.sections.competitiveEdge} highlight={a.sections.competitiveEdgeHighlight} />
            <p className="mt-4 font-body text-white/65 text-base sm:text-lg leading-relaxed max-w-xl">{a.competitiveEdge.sectionSubtitle}</p>
          </motion.div>

          <ul className="mt-8 border-t border-white/10">
            {items.map((item, i) => (
              <motion.li
                key={i}
                {...reveal(0.1 + i * 0.06, 16)}
                className="group relative flex items-start gap-5 py-4 lg:py-[1.1rem] border-b border-white/10"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                  style={{ background: `linear-gradient(180deg, ${C.secondary}, ${C.cta})` }}
                />
                <span className="flex-shrink-0 ms-4 mt-0.5 font-sans text-xs font-bold tabular-nums" style={{ color: C.cta }}>
                  {pad(i + 1)}
                </span>
                <p className="font-body text-sm sm:text-[0.95rem] text-white/75 group-hover:text-white leading-relaxed transition-colors duration-300">
                  {item}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── 8. CTA ───────────────────────────────────────────────────

function CtaSection({ containerClass }: { containerClass: string }) {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const a = t.aboutUsPage;
  const [email, phone] = t.contactPage.infoCards;

  return (
    <div className={`${containerClass} py-24 lg:py-0`}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative overflow-hidden rounded-[2.25rem] max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20 lg:py-24 text-center"
        style={{ boxShadow: `0 60px 120px -40px rgba(0,0,0,0.6), 0 0 160px -60px ${C.secondary}80` }}
      >
        <img src={IMG.cta} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.primary}E6 0%, ${C.bg}E6 55%, ${C.bg}F7 100%)` }} />
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
          }}
        />
        <div aria-hidden className="absolute -top-32 start-1/4 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: C.secondary }} />
        <div aria-hidden className="absolute -bottom-40 end-1/4 w-80 h-80 rounded-full blur-3xl opacity-25" style={{ background: C.cta }} />
        <div className="absolute inset-0 rounded-[2.25rem] border border-white/10 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <Eyebrow label={a.hero.badge} isRTL={isRTL} center />
          <h2
            className="font-sans font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.25rem, 4.6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            {a.cta.heading}
          </h2>
          <p className="font-body text-white/75 text-base sm:text-lg leading-relaxed mb-9">{a.cta.body}</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to={localePath('/contact')} className="btn-primary inline-flex items-center gap-2 group px-7 py-3.5 text-sm sm:text-base">
              <span>{t.common.contactUs}</span>
              <span className={`inline-flex transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                <DirectionalArrow isRTL={isRTL} />
              </span>
            </Link>
            <Link to={localePath('/what-we-do')} className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base">
              {a.labels.exploreSolutions}
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href="tel:+966114059419" className="group inline-flex items-center gap-2.5 px-0 py-1 text-white/75 hover:text-white transition-colors">
              <Phone weight="duotone" size={18} style={{ color: C.accent }} />
              <span dir="ltr" className="font-body text-sm">{phone?.text}</span>
            </a>
            <a href="mailto:htc@hajztel.com.sa" className="group inline-flex items-center gap-2.5 px-0 py-1 text-white/75 hover:text-white transition-colors">
              <Envelope weight="duotone" size={18} style={{ color: C.accent }} />
              <span className="font-body text-sm">{email?.text}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUsPage;
