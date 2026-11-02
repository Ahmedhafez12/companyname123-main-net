import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'phosphor-react';
import Breadcrumbs from '../Breadcrumbs';
import { useTranslation, useLocale } from '../../i18n';

// Shared building blocks for the "What We Do" solution pages
// (Telecommunications, Command & Control).

export const C = {
  primary: '#005E96',
  secondary: '#44C8F5',
  accent: '#7CCCBF',
  cta: '#A6CE39',
  bg: '#002C3D',
} as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
export const GRADIENT_TEXT = `linear-gradient(135deg, ${C.cta}, ${C.accent}, ${C.secondary})`;

export const pad = (n: number) => String(n).padStart(2, '0');

export const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** Scrolls to `location.hash` (centred in the viewport) on mount, route change and hashchange. */
export function useHashScroll() {
  const location = useLocation();

  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return;
    const element = document.querySelector(hash);
    if (!element) return;
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const targetTop = elementTop - window.innerHeight / 2 + Math.min(rect.height, window.innerHeight) / 2;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const attemptScroll = (attempts = 0) => {
        if (document.querySelector(hash)) scrollToHash(hash);
        else if (attempts < 5) setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
      };
      setTimeout(() => attemptScroll(), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname, scrollToHash]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) setTimeout(() => scrollToHash(hash), 100);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToHash]);

  return scrollToHash;
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-transparent bg-clip-text" style={{ backgroundImage: GRADIENT_TEXT }}>
      {children}
    </span>
  );
}

export function Eyebrow({ index, label, center = false }: { index?: string; label: string; center?: boolean }) {
  const { isRTL } = useLocale();
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

export function SectionTitle({ lead, highlight, className = '' }: { lead: string; highlight?: string; className?: string }) {
  return (
    <h2
      className={`font-sans font-bold text-white leading-[1.08] ${className}`}
      style={{ fontSize: 'clamp(1.75rem, 1rem + 2.6vw, 4rem)', letterSpacing: '-0.02em', overflowWrap: 'break-word', hyphens: 'auto' }}
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

export function SectionHeader({
  index,
  eyebrow,
  lead,
  highlight,
  subtitle,
  center = false,
  aside,
}: {
  index?: string;
  eyebrow: string;
  lead: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 mb-10 lg:mb-14 ${
        center ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'
      }`}
    >
      <motion.div {...reveal()} className="max-w-2xl">
        <Eyebrow index={index} label={eyebrow} center={center} />
        <SectionTitle lead={lead} highlight={highlight} />
        {subtitle && <p className="mt-4 font-body text-white/65 text-base sm:text-lg 3xl:text-xl leading-relaxed">{subtitle}</p>}
      </motion.div>
      {aside && <motion.div {...reveal(0.1)} className="shrink-0">{aside}</motion.div>}
    </div>
  );
}

export function DirectionalArrow({ size = 18 }: { size?: number }) {
  const { isRTL } = useLocale();
  return (
    <span className={`inline-flex ${isRTL ? 'rtl-flip' : ''}`}>
      <ArrowRight weight="bold" size={size} />
    </span>
  );
}

export function PrimaryLink({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) {
  const { isRTL } = useLocale();
  return (
    <Link to={to} className={`btn-primary inline-flex items-center gap-2 group px-6 py-3 text-sm sm:text-base ${className}`}>
      <span>{children}</span>
      <span className={`inline-flex transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
        <DirectionalArrow />
      </span>
    </Link>
  );
}

// ── Hero ─────────────────────────────────────────────────────

export type HeroNavItem = { id: string; label: string };

export function SolutionHero({
  breadcrumbs,
  badge,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  navItems,
  navLabel,
}: {
  breadcrumbs: { name: string; path: string }[];
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta: { to: string; label: string };
  secondaryCta: { targetId: string; label: string };
  navItems: HeroNavItem[];
  navLabel: string;
}) {
  const { isRTL } = useLocale();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' });
  };

  return (
    <section id="overview" className="relative min-h-[100dvh] flex flex-col overflow-hidden scroll-mt-20">
      {/* Background image */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="eager" decoding="async" />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.bg}F2 0%, ${C.bg}D9 38%, ${C.bg}66 70%, ${C.bg}33 100%)`,
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}99 0%, transparent 25%, transparent 60%, ${C.bg} 100%)` }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: `linear-gradient(${isRTL ? '270deg' : '90deg'}, #000 0%, transparent 55%)`,
          WebkitMaskImage: `linear-gradient(${isRTL ? '270deg' : '90deg'}, #000 0%, transparent 55%)`,
        }}
      />

      <div className="relative flex-1 flex items-center page-container pt-32 pb-12">
        <div className="max-w-3xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-[80rem]">
          <motion.div {...reveal(0, 16)} className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
          <motion.div
            {...reveal(0.05, 16)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md px-3.5 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: C.cta }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.cta }} />
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-white/85">{badge}</span>
          </motion.div>
          <motion.h1
            {...reveal(0.1)}
            className="font-sans font-bold text-white mb-6"
            style={{ fontSize: 'clamp(1.375rem, 0.25rem + 5.8vw, 6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', overflowWrap: 'break-word', hyphens: 'auto' }}
          >
            {title}
          </motion.h1>
          <motion.p {...reveal(0.18)} className="font-body text-white/75 text-base sm:text-lg 3xl:text-xl leading-relaxed max-w-2xl 3xl:max-w-3xl">
            {subtitle}
          </motion.p>
          <motion.div {...reveal(0.26)} className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryLink to={primaryCta.to}>{primaryCta.label}</PrimaryLink>
            <button
              type="button"
              onClick={() => scrollTo(secondaryCta.targetId)}
              className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base"
            >
              <span>{secondaryCta.label}</span>
              <ArrowDown weight="bold" size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Quick navigation */}
      <motion.nav
        {...reveal(0.4, 20)}
        aria-label={navLabel}
        className="relative page-container pb-10"
      >
        <div className="rounded-2xl border border-white/10 bg-[#002C3D]/55 backdrop-blur-xl p-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="group flex-1 min-w-[9.5rem] flex items-center gap-3 rounded-xl px-4 py-3 min-h-0 text-start transition-colors duration-300 hover:bg-white/[0.07]"
            >
              <span className="font-sans text-xs font-bold tabular-nums" style={{ color: C.cta }}>
                {pad(i + 1)}
              </span>
              <span className="font-sans text-sm font-medium text-white/75 group-hover:text-white leading-snug transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </motion.nav>
    </section>
  );
}

// ── Closing CTA band ─────────────────────────────────────────

export type CtaCopy = { eyebrow: string; title: string; highlight?: string; text: string; button: string };

export function CtaBand({
  image,
  secondary,
  copy,
}: {
  image: string;
  secondary: { to: string; label: string };
  /** Overrides the default contact-page wording. */
  copy?: CtaCopy;
}) {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const c: CtaCopy = copy ?? {
    eyebrow: t.contactPage.eyebrow,
    title: t.contactPage.headline,
    highlight: t.contactPage.headlineHighlight,
    text: t.contactPage.subtitle,
    button: t.common.contactUs,
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2.25rem] px-6 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20"
          style={{ boxShadow: `0 60px 120px -40px rgba(0,0,0,0.6), 0 0 160px -60px ${C.secondary}80` }}
        >
          <img src={image} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${C.primary}F2 0%, ${C.bg}E6 55%, ${C.bg}B3 100%)` }} />
          <div aria-hidden className="absolute -top-32 end-10 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: C.secondary }} />
          <div aria-hidden className="absolute -bottom-40 start-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: C.cta }} />
          <div className="absolute inset-0 rounded-[2.25rem] border border-white/10 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <Eyebrow label={c.eyebrow} />
              <h2
                className="font-sans font-bold text-white"
                style={{ fontSize: 'clamp(1.75rem, 0.9rem + 3.2vw, 4.25rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
              >
                {c.title}
                {c.highlight && <GradientText>{c.highlight}</GradientText>}
              </h2>
              <p className="mt-4 font-body text-white/75 text-base sm:text-lg 3xl:text-xl leading-relaxed max-w-xl">{c.text}</p>
            </div>
            <div className="flex flex-wrap lg:flex-col lg:items-end gap-3">
              <PrimaryLink to={localePath('/contact')} className="px-7 py-3.5">
                {c.button}
              </PrimaryLink>
              <Link to={secondary.to} className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base">
                {secondary.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
