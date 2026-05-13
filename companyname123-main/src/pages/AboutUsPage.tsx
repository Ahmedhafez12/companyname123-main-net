import React, { useEffect, useRef } from 'react';
import PageSEO from '../utils/PageSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
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
  ArrowUpLeft,
  ArrowUpRight,
} from 'phosphor-react';
import HorizontalTimeline from '../components/HorizontalTimeline';
import CompanyIdentityCarousel from '../components/CompanyIdentityCarousel';
import ScrollReveal from '../components/ScrollReveal';
import HeroScrollIndicator from '../components/HeroScrollIndicator';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import { useTranslation, useLocale } from '../i18n';


// Core Strength card (uses project .card styling, bento-friendly)
const StrengthCard = ({ icon, title, description, className = '' }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  className?: string;
}) => {
  return (
    <div
      className={`p-3 sm:p-4 lg:p-6 h-full flex flex-col rounded-xl bg-primary/20 border border-primary/30 backdrop-blur-sm shadow-lg ${className}`.trim()}
    >
      <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-white mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 leading-snug">
        <span className="text-cta flex-shrink-0">{React.cloneElement(icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5' })}</span>
        {title}
      </h3>
      <p className="text-xs sm:text-xs lg:text-sm text-white/70 leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

// Why Us card for Bento grid (uses project .card styling)
const WhyUsCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div className="card p-5 lg:p-6 h-full flex flex-col">
      <div className="text-cta mb-3 flex-shrink-0">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-base sm:text-lg text-white/80 leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

function AboutUsPage() {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { amount: 0.3 });

  // Function to scroll to hash element
  const scrollToHash = (hash: string) => {
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
  };

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
  }, [location.hash, location.pathname]);

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
  }, []);

  const valuePropIcons = [
    <ArrowsLeftRight key="a" weight="bold" size={20} />,
    <Package key="p" weight="bold" size={20} />,
    <ChartLineUp key="c" weight="bold" size={20} />,
    <Rocket key="r" weight="bold" size={20} />,
    <TrendUp key="t" weight="bold" size={20} />,
  ];
  const strengthIcons = [
    <Calendar key="c" weight="bold" size={20} />,
    <ShareNetwork key="s" weight="bold" size={20} />,
    <Lightning key="l" weight="bold" size={20} />,
    <Users key="u" weight="bold" size={20} />,
    <Shield key="sh" weight="bold" size={20} />,
    <Trophy key="t" weight="bold" size={20} />,
  ];

  const sectionClass = 'min-h-screen lg:h-screen lg:min-h-[600px] flex flex-col justify-center snap-start relative overflow-hidden shrink-0';
  // Decorative blob component for visual anchors
  const DecorativeBlob = ({ className = '' }: { className?: string }) => (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
      style={{ background: 'var(--color-primary)', width: 'min(28rem, 80vw)', height: 'min(28rem, 80vw)' }}
      aria-hidden
    />
  );

  return (
    <div className="relative overflow-x-hidden">
      <PageSEO
        title={t.aboutUsPage.seoTitle}
        description={t.aboutUsPage.seoDescription}
        path={localePath("/about/overview")}
        breadcrumbs={[
          { name: t.common.home, path: localePath("/") },
          { name: t.aboutUsPage.hero.badge, path: localePath("/about/overview") },
        ]}
      />

      <div className="fixed inset-0 bg-primary/20 pointer-events-none -z-10" style={{ transform: 'translateZ(0)' }} />

      <HeroScrollIndicator
        sectionIds={[
          "what-we-do",
          "company-identity",
          "our-journey",
          "vision-mission",
          "core-strengths",
          "why-choose-us",
          "competitive-edge",
          "cta",
        ]}
      />

      <div
        ref={scrollContainerRef}
        className="scroll-snap-page h-screen overflow-y-scroll overflow-x-hidden"
      >
      {/* Hero: text top 40% / image bottom 60% on mobile; text left 40% / image right 60% on desktop */}
      <section id="what-we-do" className={sectionClass}>
        <DecorativeBlob className="-top-24 -right-24 lg:right-[25%]" />
        <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-none lg:grid-cols-2 gap-0 w-full h-screen lg:h-full flex-1 min-h-0">
          {/* Text — top 50% on mobile, left 50% on desktop */}
          <div className={`flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 2xl:pl-32 py-4 lg:py-12 overflow-hidden ${isRTL ? "lg:pr-20 xl:pr-28 2xl:pr-36" : ""}`}>
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="mb-4">
                <Breadcrumbs items={[
                  { name: t.aboutUsPage.breadcrumbs.home, path: localePath("/") },
                  { name: t.aboutUsPage.breadcrumbs.about, path: localePath("/about") },
                  { name: t.aboutUsPage.breadcrumbs.overview, path: localePath("/about/overview") },
                ]} />
              </div>
              <div className="inline-flex items-center bg-primary/20 backdrop-blur-[2px] border border-primary/30 py-1.5 px-4 rounded-full mb-3 lg:mb-6">
                <span className="text-sm sm:text-base text-white/90">{t.aboutUsPage.hero.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 lg:mb-6 font-sans leading-tight">
                {t.aboutUsPage.sections.whoWeAre}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.whoWeAreHighlight}</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-white/80 leading-relaxed max-w-2xl">
                {t.aboutUsPage.hero.summary}
              </p>
            </div>
          </div>
          {/* Image — bottom 60% on mobile, right 60% on desktop */}
          <div className="relative w-full overflow-hidden">
            <img
              src="/assets/abstracts/Soft_focus_abstract_network_blurred_glowing_partic_delpmaspu.png"
              alt={t.aboutUsPage.hero.heroImageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Company Identity: 1:1 text + carousel */}
      <section id="company-identity" className={sectionClass}>
        <DecorativeBlob className="top-1/2 -translate-y-1/2 -right-32 opacity-25" />
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0 w-full flex-1 min-h-0">
          <div className="relative w-full min-h-[45vh] sm:min-h-[52vh] lg:min-h-0 lg:h-full order-2 lg:order-1 lg:flex-1 flex flex-col">
            <CompanyIdentityCarousel
              blocks={t.aboutUsPage.companyIdentity.blocks}
              images={[
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu.png",
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu1.png",
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu2.png",
              ]}
              imagePositions={["right center", "left center", "right center"]}
            />
          </div>
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pr-16 xl:pr-24 2xl:pr-32 py-7 lg:py-12 order-1 lg:order-2 min-h-0">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans mb-2 lg:mb-4">
                {t.aboutUsPage.sections.companyIdentity}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.companyIdentityHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                {t.aboutUsPage.companyIdentity.sectionSubtitle}
              </p>
              <div className="mt-4 lg:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-cta font-sans">
                {t.aboutUsPage.companyIdentity.blocks.length} {t.aboutUsPage.companyIdentity.pillarsLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey: decorative blob + stat */}
      <section id="our-journey" className={sectionClass}>
        <DecorativeBlob className="top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-20" />
        <ScrollReveal direction="up" delay={0} className="w-full flex-1 flex flex-col justify-center min-h-0">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl w-full flex flex-col justify-center py-8 lg:py-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 sm:mb-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                {t.aboutUsPage.sections.ourJourney}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.ourJourneyHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 mt-2">{t.aboutUsPage.journey.intro}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent font-sans">{t.aboutUsPage.stats.yearsExperience}</div>
              <div className="text-sm sm:text-base text-white/70 font-medium">{t.aboutUsPage.coreStrengths.items[0].title}</div>
            </div>
          </div>
          {/* Scroll hint — gently animated to telegraph horizontal interaction */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 mb-3 text-white/40 text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em]"
          >
            <motion.span
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowsLeftRight weight="regular" size={14} className="text-accent/70" />
            </motion.span>
            <span>{t.aboutUsPage.dragScroll}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowsLeftRight weight="regular" size={14} className="text-accent/70" />
            </motion.span>
          </motion.div>
          <HorizontalTimeline events={t.aboutUsPage.journey.events} />
        </div>
        </ScrollReveal>
      </section>

      {/* Identity: Mission | Vision — 50/50 grid, right panel full height */}
      <section id="vision-mission" className={sectionClass}>
        <DecorativeBlob className="-bottom-24 -left-24 opacity-20" />
        <div className="flex-1 min-h-0 w-full h-full flex flex-col">
        <ScrollReveal direction="up" delay={0} className="h-full flex-1 min-h-0 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full h-full min-h-0 flex-1">
          <div className={`flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 2xl:pl-32 py-8 lg:py-12 order-2 lg:order-1 ${isRTL ? "lg:pr-20 xl:pr-28 2xl:pr-36" : ""}`}>
            <div className="max-w-2xl mx-auto lg:mx-0 space-y-4 lg:space-y-8">
              <div className="card p-4 sm:p-6 lg:p-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl pointer-events-none" />
                <h2 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 lg:mb-4 font-sans">{t.aboutUsPage.sections.ourMission}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.ourMissionHighlight}</span></h2>
                <p className="relative z-10 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  {t.aboutUsPage.identity.mission}
                </p>
              </div>
              <div className="card p-4 sm:p-6 lg:p-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl pointer-events-none" />
                <h2 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 lg:mb-4 font-sans">{t.aboutUsPage.sections.ourVision}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.ourVisionHighlight}</span></h2>
                <p className="relative z-10 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  {t.aboutUsPage.identity.vision}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-full h-full min-h-0 relative overflow-hidden order-1 lg:order-2 flex-1">
            <img
              src="/assets/abstracts/Abstract_isometric_grid_of_interconnected_hexagons_delpmaspu.png"
              alt={t.aboutUsPage.hero.visionMissionImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/10 to-secondary/20" aria-hidden />
            <DecorativeBlob className="bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-40" />
          </div>
        </div>
        </ScrollReveal>
        </div>
      </section>

      {/* Core Strengths: Bento grid with col/row span */}
      <section id="core-strengths" className={sectionClass}>
        <DecorativeBlob className="-bottom-24 right-1/4 opacity-25" />
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl w-full flex-1 flex flex-col justify-center py-8 min-h-0">
          <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 sm:mb-5">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                {t.aboutUsPage.sections.coreStrengths}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.coreStrengthsHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mt-2">{t.aboutUsPage.coreStrengths.intro}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary font-sans">{t.aboutUsPage.stats.coreStrengthsCount}</div>
              <div className="text-sm sm:text-base text-white/70 font-medium">{t.aboutUsPage.whyUs.sectionTitle}</div>
            </div>
          </div>
          </ScrollReveal>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full"
            style={{ gridAutoRows: 'minmax(100px, 1fr)' }}
          >
            {t.aboutUsPage.coreStrengths.items.map((strength, index) => (
              <ScrollReveal key={strength.title} direction="up" delay={index * 0.08}>
              <div
                className={`h-full ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <StrengthCard
                  icon={strengthIcons[index]}
                  title={strength.title}
                  description={strength.description}
                  index={index}
                />
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — Value Proposition (accordion) */}
      <section id="why-choose-us" className={sectionClass}>
        <DecorativeBlob className="-bottom-24 -left-24 opacity-20" />
        <WhyChooseUsSection />
      </section>

      {/* Why Us: Bento grid with varying card sizes */}
      {/* <section id="why-us" className={sectionClass}>
        <DecorativeBlob className="-top-24 left-1/2 -translate-x-1/2 opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl w-full flex flex-col justify-center py-8">
          <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">{t.aboutUsPage.whyUs.sectionTitle}</h2>
              <p className="text-lg text-white/80 max-w-2xl mt-2">{t.aboutUsPage.whyUs.sectionSubtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl sm:text-5xl font-bold text-secondary font-sans">99%</div>
              <div className="text-lg text-white/70 font-medium">Success Rate</div>
            </div>
          </div>
          </ScrollReveal>
          <div
            className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 w-full min-h-[50vh]"
            style={{ gridAutoRows: 'minmax(140px, 1fr)' }}
          >
            {t.aboutUsPage.whyUs.valueProps.map((prop, index) => (
              <ScrollReveal key={prop.title} direction="up" delay={index * 0.1}>
              <div
                className={`h-full min-h-[140px] ${index === 3 ? 'md:col-span-2' : ''}`}
              >
                <WhyUsCard
                  icon={valuePropIcons[index]}
                  title={prop.title}
                  description={prop.description}
                  index={index}
                />
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* Competitive Edge: image top 40% / text bottom 60% on mobile; image left 40% / text right 60% on desktop */}
      <section id="competitive-edge" className={sectionClass}>
        <DecorativeBlob className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4 opacity-25" />
        <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-none lg:grid-cols-2 gap-0 w-full h-screen lg:h-full flex-1 min-h-0">
          {/* Image — top 40% on mobile, left 40% on desktop */}
          <div className="relative w-full overflow-hidden">
            <img
              src="/assets/abstracts/Abstract_web_background_minimalist_neural_network__delpmaspu.png"
              alt={t.aboutUsPage.hero.competitiveEdgeImageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/20 to-secondary/20 pointer-events-none" />
          </div>
          {/* Text — bottom 60% on mobile, right 60% on desktop */}
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pl-16 lg:pr-20 xl:pl-24 xl:pr-24 2xl:pl-32 2xl:pr-32 py-5 lg:py-12 overflow-y-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                    {t.aboutUsPage.sections.competitiveEdge}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">{t.aboutUsPage.sections.competitiveEdgeHighlight}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 max-w-md mt-2">
                    {t.aboutUsPage.competitiveEdge.sectionSubtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cta font-sans">{t.aboutUsPage.stats.competitiveEdgeCount}</div>
                  <div className="text-sm sm:text-base text-white/70 font-medium">{t.aboutUsPage.whyUs.valueProps[0].title}</div>
                </div>
              </div>
              <ul className="text-xs sm:text-sm lg:text-base text-white/80 flex flex-col gap-3">
                {t.aboutUsPage.competitiveEdge.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="rounded-full w-1.5 h-1.5 sm:w-2 sm:h-2 flex-shrink-0 mt-1.5 sm:mt-2 bg-cta" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA: decorative blob + stat */}
      <section id="cta" ref={ctaRef} className={sectionClass}>
        <motion.button
          type="button"
          className={`explore-more-btn group absolute top-12 z-[100] pt-[0.5in] flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full ${isRTL ? "left-4 sm:left-6 md:left-8 pl-[0.75in]" : "right-4 sm:right-6 md:right-8 pr-[0.75in]"}`}
          initial={{ opacity: 0 }}
          animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => window.dispatchEvent(new CustomEvent("open-menu"))}
          aria-label="Open menu"
        >
          <span className="text-white/60 group-hover:text-white text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300">
            {t.homePage.exploreMore}
          </span>
          <motion.span
            className="inline-flex text-white/60 group-hover:text-white transition-colors duration-300"
            animate={isCtaInView ? { x: isRTL ? -4 : 4, y: -4 } : { x: 0, y: 0 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            {isRTL ? <ArrowUpLeft weight="regular" size={16} /> : <ArrowUpRight weight="regular" size={16} />}
          </motion.span>
        </motion.button>
        <DecorativeBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <ScrollReveal direction="up" delay={0} className="w-full flex-1 flex flex-col justify-center items-center min-h-0">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl w-full flex flex-col justify-center items-center text-center py-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-md mb-3 lg:mb-4 font-sans">
              {t.aboutUsPage.cta.heading}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/95 drop-shadow-sm mb-5 lg:mb-8">
              {t.aboutUsPage.cta.body}
            </p>
            <Link
              to={localePath("/contact")}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <span>{t.common.contactUs}</span>
              <span className={`p-0.5 group-hover:translate-x-0.5 ${isRTL ? "rtl-flip" : ""}`}>
                <ArrowRight weight="bold" size={20} />
              </span>
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}

export default AboutUsPage;

