import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowsLeftRight,
  Broadcast,
  Lifebuoy,
  PlugsConnected,
  Rocket,
  ShareNetwork,
  ShieldCheck,
  TreeStructure,
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

const IMG = '/assets/Telecommunications/';
const MODERN = 'Modern_premium_corporate_photography_for_a_network_';

const UNITS = [
  { id: 'system-integration', icon: TreeStructure, image: `${IMG}${MODERN}63fec3bc12.jpeg` },
  { id: 'connectivity-transmission', icon: Broadcast, image: `${IMG}Telecom_tower_with_glowing_waves_ae5fd516ef.jpeg` },
  { id: 'unified-communication', icon: ShareNetwork, image: `${IMG}${MODERN}3c849b12e7.jpeg` },
  { id: 'access-lan-osp', icon: PlugsConnected, image: `${IMG}${MODERN}45a0fc7f40.jpeg` },
  { id: 'military-critical-communication', icon: ShieldCheck, image: `${IMG}Satellite_dish_array_signal_beams_facef61a0d.jpeg` },
];

const STANDARD_ICONS = [ArrowsLeftRight, Rocket, Lifebuoy];

const HERO_IMAGE = `${IMG}${MODERN}fb8c7d724c.jpeg`;
const STANDARDS_IMAGE = `${IMG}Network_company_server_corridor_78627a8092.jpeg`;
const CTA_IMAGE = `${IMG}Telecom_tower_with_glowing_waves_2c069c0613.jpeg`;

type Unit = { id: string; title: string; description: string; image: string; icon: React.ElementType };

// ── Core solutions: sticky visual + scrolling narrative ──────

function CoreSolutions({ units }: { units: Unit[] }) {
  const { t } = useTranslation();
  const tp = t.telecomPage;
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [units.length]);

  const current = units[active];

  return (
    <section id="business-unit" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow={tp.badge}
          lead={tp.coreSolutionsTitle}
          highlight={tp.coreSolutionsHighlight}
          subtitle={tp.coreSolutionsSubtitle}
          aside={
            <div className="flex items-baseline gap-3">
              <span className="font-sans font-bold text-6xl lg:text-7xl leading-none">
                <GradientText>{pad(units.length)}</GradientText>
              </span>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div
              className="sticky top-28 h-[calc(100vh-9rem)] max-h-[680px] rounded-[2rem] overflow-hidden"
              style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55` }}
            >
              {units.map((unit, i) => (
                <motion.img
                  key={unit.id}
                  src={unit.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.04 : 1.12 }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              ))}
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}4D 0%, transparent 35%, ${C.bg}F2 100%)` }} />
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />

              {/* progress rail */}
              <div className="absolute top-6 end-6 flex flex-col gap-2">
                {units.map((unit, i) => (
                  <span
                    key={unit.id}
                    className="w-1.5 rounded-full transition-all duration-500"
                    style={{ height: i === active ? 28 : 10, background: i === active ? C.cta : 'rgba(255,255,255,0.35)' }}
                  />
                ))}
              </div>

              <div className="absolute bottom-0 inset-x-0 p-8">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="flex items-baseline gap-2 font-sans tabular-nums">
                    <span className="text-5xl font-bold" style={{ color: C.cta }}>
                      {pad(active + 1)}
                    </span>
                    <span className="text-white/45 text-lg">/ {pad(units.length)}</span>
                  </div>
                  <div className="mt-2 font-sans font-bold text-white text-2xl leading-tight">{current.title}</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            {units.map((unit, i) => {
              const Icon = unit.icon;
              const isActive = i === active;
              return (
                <article
                  key={unit.id}
                  id={unit.id}
                  data-index={i}
                  ref={(el) => (blockRefs.current[i] = el)}
                  className="relative scroll-mt-28 py-10 lg:py-0 lg:min-h-[72vh] flex flex-col justify-center border-t border-white/10 first:border-t-0 lg:first:border-t"
                >
                  <div className={`transition-opacity duration-500 ${isActive ? 'lg:opacity-100' : 'lg:opacity-40'}`}>
                    {/* Inline image (mobile/tablet) */}
                    <div className="lg:hidden relative mb-7 aspect-[16/10] rounded-[1.5rem] overflow-hidden">
                      <img src={unit.image} alt={unit.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, ${C.bg}CC 100%)` }} />
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: isActive ? C.cta : `${C.cta}1F`,
                          color: isActive ? '#fff' : C.cta,
                          border: `1px solid ${C.cta}55`,
                          boxShadow: isActive ? `0 12px 30px -8px ${C.cta}80` : 'none',
                        }}
                      >
                        <Icon weight="duotone" size={26} />
                      </span>
                      <span className="font-sans text-sm font-bold tabular-nums text-white/50">
                        {pad(i + 1)} / {pad(units.length)}
                      </span>
                    </div>
                    <h3
                      className="font-sans font-bold text-white mb-5"
                      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                    >
                      {unit.title}
                    </h3>
                    <p className="font-body text-white/75 text-base lg:text-[1.0625rem] leading-[1.8] max-w-2xl">{unit.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Service standards ────────────────────────────────────────

function ServiceStandards() {
  const { t } = useTranslation();
  const tp = t.telecomPage;

  return (
    <section id="service-Standards" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...reveal()}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/10 px-6 sm:px-10 lg:px-14 py-14 lg:py-20"
          style={{ background: C.bg, boxShadow: '0 50px 100px -40px rgba(0,0,0,0.6)' }}
        >
          <img src={STANDARDS_IMAGE} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}B3 0%, ${C.bg}F2 60%)` }} />
          <div aria-hidden className="absolute -top-40 start-1/3 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: C.primary }} />

          <div className="relative">
            <SectionHeader index="02" eyebrow={tp.badge} lead={tp.serviceStandardsTitle} highlight={tp.serviceStandardsHighlight} center />

            <div className="grid grid-cols-1 md:grid-cols-3">
              {tp.serviceStandards.map((item, i) => {
                const Icon = STANDARD_ICONS[i] ?? ShieldCheck;
                return (
                  <motion.div
                    key={item.title}
                    {...reveal(0.1 + i * 0.1, 24)}
                    className={`group relative py-8 md:py-2 md:px-8 lg:px-10 ${i > 0 ? 'border-t md:border-t-0 md:border-s border-white/10' : ''}`}
                  >
                    <div
                      aria-hidden
                      className="font-sans font-bold leading-none mb-6 select-none"
                      style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', WebkitTextStroke: '1.5px rgba(166,206,57,0.6)', color: 'transparent' }}
                    >
                      {pad(i + 1)}
                    </div>
                    <span
                      className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${C.secondary}1F`, color: C.secondary, border: `1px solid ${C.secondary}40` }}
                    >
                      <Icon weight="duotone" size={24} />
                    </span>
                    <h3 className="font-sans font-bold text-white text-xl lg:text-2xl leading-snug mb-3">{item.title}</h3>
                    <p className="font-body text-sm lg:text-base text-white/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────

function TelecommunicationsPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const tp = t.telecomPage;
  useHashScroll();

  const breadcrumbs = [
    { name: tp.breadcrumbs.home, path: localePath('/') },
    { name: tp.breadcrumbs.whatWeDo, path: localePath('/what-we-do') },
    { name: tp.breadcrumbs.telecom, path: localePath('/what-we-do/telecommunications') },
  ];

  const units: Unit[] = tp.businessUnits.map((unit, i) => ({
    ...unit,
    id: UNITS[i]?.id ?? `unit-${i}`,
    image: UNITS[i]?.image ?? HERO_IMAGE,
    icon: UNITS[i]?.icon ?? ShieldCheck,
  }));

  return (
    <div className="relative">
      <PageSEO
        title={tp.seoTitle}
        description={tp.seoDescription}
        path={localePath('/what-we-do/telecommunications')}
        breadcrumbs={breadcrumbs}
        faq={tp.faq}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none -z-10" />

      <SolutionHero
        breadcrumbs={breadcrumbs}
        badge={tp.badge}
        title={
          <>
            <GradientText>{tp.headlineHighlight}</GradientText> {tp.headlineSuffix}
          </>
        }
        subtitle={tp.subheadline}
        image={HERO_IMAGE}
        imageAlt={tp.heroImageAlt}
        primaryCta={{ to: localePath('/contact'), label: t.common.contactUs }}
        secondaryCta={{ targetId: 'business-unit', label: `${tp.coreSolutionsTitle} ${tp.coreSolutionsHighlight}` }}
        navItems={units.map((u) => ({ id: u.id, label: u.title }))}
        navLabel={`${tp.coreSolutionsTitle} ${tp.coreSolutionsHighlight}`}
      />

      <CoreSolutions units={units} />

      <ServiceStandards />

      <FAQSection items={tp.faq} subtitle={tp.faqSubtitle} />

      <CtaBand image={CTA_IMAGE} secondary={{ to: localePath('/what-we-do/command-control'), label: t.homePage.exploreCommandControl }} />

      <Footer />
    </div>
  );
}

export default TelecommunicationsPage;
