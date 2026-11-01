import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Armchair,
  Bank,
  Brain,
  Briefcase,
  Buildings,
  Car,
  CloudArrowUp,
  ChartBar,
  Code,
  Cpu,
  Drop,
  Factory,
  Gear,
  Globe,
  GraduationCap,
  GridFour,
  HardDrives,
  Heartbeat,
  HouseLine,
  Lifebuoy,
  Lightning,
  MonitorPlay,
  PencilSimple,
  Quotes,
  Rocket,
  ShieldCheck,
  ShieldStar,
  Sliders,
  SlidersHorizontal,
  Storefront,
  Train,
  TrendDown,
} from 'phosphor-react';
import PageSEO from '../utils/PageSEO';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { useTranslation, useLocale } from '../i18n';
import {
  C,
  CtaBand,
  EASE,
  GradientText,
  SectionHeader,
  SolutionHero,
  pad,
  reveal,
  useHashScroll,
} from '../components/solutions/SolutionKit';

const CC = '/assets/CommandandControl/';
const TEL = '/assets/Telecommunications/';
const MODERN = 'Modern_premium_corporate_photography_for_a_network_';

const HERO_IMAGE = `${CC}Control_room_with_screens_9c4c709e86.jpeg`;
const CTA_IMAGE = `${CC}${MODERN}c4c5289792.jpeg`;

const SOLUTION_VISUALS = [
  { icon: Armchair, image: `${CC}${MODERN}30f0a44d43.jpeg` },
  { icon: Code, image: `${CC}${MODERN}9802d7d127.jpeg` },
  { icon: GridFour, image: `${CC}${MODERN}42589d16b5.jpeg` },
  { icon: HardDrives, image: `${CC}${MODERN}3fbc7ceb1d.jpeg` },
  { icon: Brain, image: `${CC}${MODERN}db5915e486.jpeg` },
];

const PROCESS_ICONS = [PencilSimple, Rocket, Gear, Sliders, TrendDown];
const ADVANTAGE_ICONS = [Globe, SlidersHorizontal, ShieldCheck, Cpu, Lifebuoy];
const ADVANTAGE_IMAGE = `${CC}Leadership_team_reviewing_map_5bf849bbcf.jpeg`;

const TECH_VISUALS = [
  { icon: CloudArrowUp, image: `${CC}${MODERN}0375503d93.jpeg` },
  { icon: ChartBar, image: `${CC}${MODERN}84801237b1.jpeg` },
  { icon: HardDrives, image: `${TEL}Network_company_server_corridor_a386952677.jpeg` },
  { icon: MonitorPlay, image: `${CC}${MODERN}b715a93b98.jpeg` },
];

const INDUSTRY_GROUPS = [
  { image: `${CC}${MODERN}726d6a0985.jpeg`, icons: [Buildings, ShieldStar, Train, Heartbeat, Lightning, GraduationCap, Drop] },
  { image: `${CC}${MODERN}f1c5ecea36.jpeg`, icons: [Bank, Factory, Car, Briefcase, HouseLine, Storefront, Heartbeat] },
];

const AUTOPLAY_MS = 7000;

// ── 01 Core solutions (tabbed showcase) ──────────────────────

function CoreSolutions() {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const cp = t.commandControlPage;
  const items = cp.coreSolutions.map((s, i) => ({ ...s, ...(SOLUTION_VISUALS[i] ?? SOLUTION_VISUALS[0]) }));

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [playing, active, items.length]);

  const current = items[active];
  const CurrentIcon = current.icon;

  return (
    <section id="core-solutions" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="01" eyebrow={cp.badge} lead={cp.coreSolutionsTitle} highlight={cp.coreSolutionsHighlight} subtitle={cp.coreSolutionsSubtitle} />

        <div
          ref={rootRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tabs */}
          <motion.div {...reveal(0.05)} role="tablist" aria-orientation="vertical" className="lg:col-span-4 flex flex-col gap-2">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative overflow-hidden flex items-center gap-4 rounded-2xl px-5 py-4 min-h-0 text-start border transition-all duration-300 ${
                    isActive ? 'border-white/20 bg-white/[0.09]' : 'border-transparent hover:bg-white/[0.05]'
                  }`}
                >
                  <span
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? C.cta : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <Icon weight="duotone" size={22} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-sans text-[11px] font-semibold tabular-nums tracking-[0.15em]" style={{ color: isActive ? C.cta : 'rgba(255,255,255,0.4)' }}>
                      {pad(i + 1)}
                    </span>
                    <span className={`block font-sans font-semibold text-base lg:text-lg leading-snug transition-colors ${isActive ? 'text-white' : 'text-white/65 group-hover:text-white/90'}`}>
                      {item.title}
                    </span>
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
                      <motion.span
                        key={`${active}-${playing}`}
                        className={`absolute inset-0 ${isRTL ? 'origin-right' : 'origin-left'}`}
                        style={{ background: `linear-gradient(90deg, ${C.secondary}, ${C.cta})` }}
                        initial={{ scaleX: playing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Panel */}
          <motion.div
            {...reveal(0.12)}
            role="tabpanel"
            className="lg:col-span-8 relative overflow-hidden rounded-[2rem] min-h-[460px] lg:min-h-0 lg:h-[min(66vh,580px)]"
            style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55` }}
          >
            {items.map((item, i) => (
              <motion.img
                key={item.image}
                src={item.image}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active && !reduceMotion ? 1.06 : 1 }}
                transition={{ opacity: { duration: 0.8 }, scale: { duration: i === active ? AUTOPLAY_MS / 1000 : 0.8, ease: 'linear' } }}
              />
            ))}
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}33 0%, transparent 30%, ${C.bg}E6 72%, ${C.bg} 100%)` }} />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4 border border-white/15 bg-black/25 backdrop-blur-md" style={{ color: C.cta }}>
                    <CurrentIcon weight="duotone" size={24} />
                  </span>
                  <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', lineHeight: 1.1 }}>
                    {current.title}
                  </h3>
                  <p className="font-body text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 02 Process ───────────────────────────────────────────────

function Process() {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const cp = t.commandControlPage;
  const steps = cp.processSteps;

  return (
    <section id="approach" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="02" eyebrow={cp.badge} lead={cp.processTitle} highlight={cp.processHighlight} center />

        <div className="relative">
          {/* Connector (desktop) */}
          <div aria-hidden className="hidden lg:block absolute top-8 inset-x-[10%] h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className={`absolute inset-0 ${isRTL ? 'origin-right' : 'origin-left'}`}
              style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.secondary}, ${C.cta})` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </div>
          {/* Connector (mobile) */}
          <div aria-hidden className="lg:hidden absolute top-8 bottom-8 start-8 w-[2px] bg-gradient-to-b from-[#44C8F5] to-[#A6CE39] opacity-60" />

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? Gear;
              return (
                <motion.li key={step.title} {...reveal(0.15 + i * 0.12, 20)} className="group relative flex lg:flex-col items-start lg:items-center gap-5 lg:text-center">
                  <span
                    className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: C.bg, color: C.cta, border: `2px solid ${C.cta}`, boxShadow: `0 0 0 8px ${C.bg}80, 0 0 30px ${C.cta}40` }}
                  >
                    <Icon weight="duotone" size={26} />
                  </span>
                  <div className="lg:mt-3">
                    <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 mb-1.5 tabular-nums">{pad(i + 1)}</span>
                    <h3 className="font-sans font-bold text-white text-xl mb-2">{step.title}</h3>
                    <p className="font-body text-sm text-white/65 leading-relaxed max-w-[16rem] lg:mx-auto">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ── 03 Advantages (bento) ────────────────────────────────────

function Advantages() {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const cp = t.commandControlPage;
  const items = cp.technicalAdvantages;
  // Layout: [0 0][1] / [2][3][4]
  const spans = ['lg:col-span-2 sm:col-span-2', '', '', '', ''];

  return (
    <section id="advantages" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="03" eyebrow={cp.badge} lead={cp.advantagesTitle} highlight={cp.advantagesHighlight} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = ADVANTAGE_ICONS[i] ?? ShieldCheck;
            const featured = i === 0;
            return (
              <motion.article
                key={item.title}
                {...reveal(0.06 * i, 24)}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-7 lg:p-8 flex flex-col min-h-[240px] transition-all duration-500 hover:-translate-y-1 hover:border-white/25 ${spans[i]}`}
                style={{
                  background: featured ? C.bg : 'linear-gradient(160deg, rgba(0,94,150,0.35), rgba(0,44,61,0.78))',
                  backdropFilter: featured ? undefined : 'blur(10px)',
                  boxShadow: '0 30px 60px -30px rgba(0,0,0,0.55)',
                }}
              >
                {featured && (
                  <>
                    <img src={ADVANTAGE_IMAGE} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.bg}F7 0%, ${C.bg}CC 50%, ${C.bg}40 100%)` }} />
                  </>
                )}
                <div
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${C.cta}, ${C.secondary}, transparent)` }}
                />
                <div className="relative flex items-center justify-between mb-auto">
                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${C.cta}1F`, color: C.cta, border: `1px solid ${C.cta}40` }}>
                    <Icon weight="duotone" size={24} />
                  </span>
                  <span className="font-sans text-xs font-semibold tabular-nums text-white/40">{pad(i + 1)}</span>
                </div>
                <div className={`relative mt-8 ${featured ? 'max-w-md' : ''}`}>
                  <h3 className={`font-sans font-bold text-white leading-snug mb-3 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'}`}>{item.title}</h3>
                  <p className={`font-body text-white/70 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 04 Tech stack ────────────────────────────────────────────

function TechStack() {
  const { t } = useTranslation();
  const cp = t.commandControlPage;

  return (
    <section id="tech-stack" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="04" eyebrow={cp.badge} lead={cp.techStackTitle} highlight={cp.techStackHighlight} subtitle={cp.techStackSubtitle || undefined} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cp.techStack.map((item, i) => {
            const visual = TECH_VISUALS[i] ?? TECH_VISUALS[0];
            const Icon = visual.icon;
            return (
              <motion.article
                key={item.title}
                {...reveal(0.08 * (i % 2), 28)}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 flex flex-col transition-all duration-500 hover:border-white/25"
                style={{ background: 'linear-gradient(180deg, rgba(0,94,150,0.30), rgba(0,44,61,0.85))', boxShadow: '0 40px 80px -40px rgba(0,0,0,0.6)' }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={visual.image} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${C.bg}E6 100%)` }} />
                  <span className="absolute top-5 start-5 rounded-full border border-white/20 bg-black/25 backdrop-blur-md px-3 py-1 font-sans text-xs font-bold tabular-nums" style={{ color: C.cta }}>
                    {pad(i + 1)}
                  </span>
                </div>
                <div className="relative p-7 lg:p-8 -mt-10">
                  <span
                    className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: C.cta, color: '#fff', boxShadow: `0 14px 30px -10px ${C.cta}99` }}
                  >
                    <Icon weight="duotone" size={26} />
                  </span>
                  <h3 className="font-sans font-bold text-white text-2xl leading-tight mb-3">{item.title}</h3>
                  <p className="font-body text-sm lg:text-[0.95rem] text-white/70 leading-[1.75]">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 05 Industries ────────────────────────────────────────────

function Industries() {
  const { t } = useTranslation();
  const cp = t.commandControlPage;
  const groups = cp.industries;
  const [group, setGroup] = useState(0);
  const current = groups[group];
  const visual = INDUSTRY_GROUPS[group] ?? INDUSTRY_GROUPS[0];

  return (
    <section id="industries-served" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          eyebrow={cp.badge}
          lead={cp.industriesTitle}
          highlight={cp.industriesHighlight}
          subtitle={cp.industriesSubtitle}
          aside={
            <div role="tablist" className="inline-flex rounded-full border border-white/15 bg-[#002C3D]/50 backdrop-blur-md p-1.5">
              {groups.map((g, i) => (
                <button
                  key={g.title}
                  type="button"
                  role="tab"
                  aria-selected={i === group}
                  onClick={() => setGroup(i)}
                  className="relative rounded-full px-4 sm:px-5 py-2.5 min-h-0 font-sans text-sm font-semibold transition-colors"
                  style={{ color: i === group ? '#fff' : 'rgba(255,255,255,0.65)' }}
                >
                  {i === group && (
                    <motion.span layoutId="industry-pill" className="absolute inset-0 rounded-full" style={{ background: C.cta }} transition={{ duration: 0.4, ease: EASE }} />
                  )}
                  <span className="relative">{g.title}</span>
                </button>
              ))}
            </div>
          }
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] min-h-[220px] sm:col-span-2 lg:col-span-1 border border-white/10">
              <img src={visual.image} alt={current.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}26 0%, ${C.bg}F2 100%)` }} />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="font-sans font-bold text-5xl leading-none mb-2">
                  <GradientText>{pad(current.items.length)}</GradientText>
                </div>
                <div className="font-sans font-bold text-white text-xl leading-snug">{current.title}</div>
              </div>
            </div>

            {current.items.map((item, i) => {
              const Icon = visual.icons[i] ?? Buildings;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * i, ease: EASE }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-white/25"
                  style={{ background: 'linear-gradient(160deg, rgba(0,94,150,0.30), rgba(0,44,61,0.78))', backdropFilter: 'blur(10px)' }}
                >
                  <span
                    className="inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#A6CE39] group-hover:text-white"
                    style={{ background: `${C.secondary}1F`, color: C.secondary }}
                  >
                    <Icon weight="duotone" size={22} />
                  </span>
                  <h3 className="font-sans font-bold text-white text-lg mb-1.5">{item.name}</h3>
                  <p className="font-body text-sm text-white/65 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.figure {...reveal(0.1)} className="mt-14 max-w-3xl mx-auto text-center">
          <Quotes weight="fill" size={36} className="mx-auto mb-4" style={{ color: C.cta }} />
          <blockquote className="font-sans font-semibold text-white leading-snug" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)' }}>
            {cp.industriesFooter}
          </blockquote>
        </motion.figure>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────

function CommandControlPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const cp = t.commandControlPage;
  useHashScroll();

  const breadcrumbs = [
    { name: cp.breadcrumbs.home, path: localePath('/') },
    { name: cp.breadcrumbs.whatWeDo, path: localePath('/what-we-do') },
    { name: cp.breadcrumbs.commandControl, path: localePath('/what-we-do/command-control') },
  ];

  const navItems = [
    { id: 'core-solutions', label: `${cp.coreSolutionsTitle} ${cp.coreSolutionsHighlight}` },
    { id: 'approach', label: `${cp.processTitle} ${cp.processHighlight}` },
    { id: 'advantages', label: `${cp.advantagesTitle} ${cp.advantagesHighlight}` },
    { id: 'tech-stack', label: cp.techStackHighlight },
    { id: 'industries-served', label: `${cp.industriesTitle} ${cp.industriesHighlight}` },
  ];

  return (
    <div className="relative">
      <PageSEO
        title={cp.seoTitle}
        description={cp.seoDescription}
        path={localePath('/what-we-do/command-control')}
        breadcrumbs={breadcrumbs}
        faq={cp.faq}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none -z-10" />

      <SolutionHero
        breadcrumbs={breadcrumbs}
        badge={cp.badge}
        title={
          <>
            {cp.headline} <GradientText>{cp.headlineHighlight}</GradientText>
          </>
        }
        subtitle={cp.subheadline}
        image={HERO_IMAGE}
        imageAlt={cp.heroImageAlt}
        primaryCta={{ to: localePath('/contact'), label: t.common.contactUs }}
        secondaryCta={{ targetId: 'core-solutions', label: `${cp.coreSolutionsTitle} ${cp.coreSolutionsHighlight}` }}
        navItems={navItems}
        navLabel={cp.badge}
      />

      <CoreSolutions />
      <Process />
      <Advantages />
      <TechStack />
      <Industries />

      <FAQSection items={cp.faq} subtitle={cp.faqSubtitle} />

      <CtaBand image={CTA_IMAGE} secondary={{ to: localePath('/what-we-do/telecommunications'), label: t.homePage.exploreTelecom }} />

      <Footer />
    </div>
  );
}

export default CommandControlPage;
