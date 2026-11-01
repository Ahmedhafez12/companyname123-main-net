import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  Bank,
  Briefcase,
  Buildings,
  Drop,
  GraduationCap,
  Heartbeat,
  Lightning,
  ShieldStar,
} from 'phosphor-react';
import PageSEO from '../utils/PageSEO';
import Footer from '../components/Footer';
import LogoPlate from '../components/brands/LogoPlate';
import { useTranslation, useLocale } from '../i18n';
import {
  C,
  CtaBand,
  EASE,
  GradientText,
  PrimaryLink,
  SectionHeader,
  pad,
  reveal,
} from '../components/solutions/SolutionKit';

type Sector = 'telecom' | 'finance' | 'technology';

const CUSTOMERS: { name: string; logo: string; sector: Sector }[] = [
  { name: 'STC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg', sector: 'telecom' },
  { name: 'BT', logo: 'https://static.cdnlogo.com/logos/b/58/bt-3.svg', sector: 'telecom' },
  { name: 'Ericsson', logo: 'https://companieslogo.com/img/orig/ERIC_BIG-6f963a82.png?t=1720244491', sector: 'telecom' },
  { name: 'Nokia', logo: 'https://www.nokia.com/themes/custom/onenokia_reskin/logo.svg', sector: 'telecom' },
  { name: 'Microsoft', logo: 'https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png', sector: 'technology' },
  { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', sector: 'technology' },
  { name: 'HP', logo: 'https://companieslogo.com/img/orig/HPQ-30e5d607.png?t=1740329963', sector: 'technology' },
  { name: 'Oracle', logo: '/assets/oracle-logo.svg', sector: 'technology' },
  { name: 'Xerox', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Xerox_logo.svg', sector: 'technology' },
  { name: 'Citibank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg', sector: 'finance' },
  { name: 'Goldman Sachs', logo: 'https://www.vhv.rs/dpng/d/504-5049178_goldman-sachs-logo-goldman-sachs-logo-svg-hd.png', sector: 'finance' },
  { name: 'JP Morgan', logo: 'https://www.jpmorgan.com/content/dam/logos-global/logo-jpm-brown.svg', sector: 'finance' },
];

const SECTORS: Sector[] = ['telecom', 'finance', 'technology'];
const SECTOR_COLOR: Record<Sector, string> = { telecom: C.secondary, finance: C.cta, technology: C.accent };

const INDUSTRY_IMAGE = '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_c6f6c6bbe5.jpeg';
const CTA_IMAGE = '/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_17ab39d0a6.jpeg';

// ── Hero: copy + scrolling logo columns ──────────────────────

function LogoColumn({ items, reverse, duration }: { items: typeof CUSTOMERS; reverse?: boolean; duration: number }) {
  const reduceMotion = useReducedMotion();
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden h-full">
      <motion.div
        className="flex flex-col gap-4"
        animate={reduceMotion ? undefined : { y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {list.map((c, i) => (
          <LogoPlate
            key={`${c.name}-${i}`}
            name={c.name}
            logo={c.logo}
            className="aspect-[4/3] rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
          />
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const cp = t.customersPage;

  const columns = [0, 1, 2].map((col) => CUSTOMERS.filter((_, i) => i % 3 === col));
  const stats = [
    { value: t.aboutUsPage.stats.yearsExperience, label: t.aboutUsPage.labels.yearsLabel },
    { value: String(CUSTOMERS.length), label: cp.statBrands },
    { value: String(SECTORS.length), label: cp.statSectors },
  ];

  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex items-center pt-28 pb-16 lg:py-0">
      <div aria-hidden className="absolute top-1/4 -start-40 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25" style={{ background: C.primary }} />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6">
          <motion.div {...reveal(0, 16)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md px-3.5 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: C.cta }} />
            <span className="font-sans text-xs sm:text-sm font-medium text-white/85">{cp.eyebrow}</span>
          </motion.div>
          <motion.h1
            {...reveal(0.08)}
            className="font-sans font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.6vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.03em' }}
          >
            {cp.headline}
            <GradientText>{cp.headlineHighlight}</GradientText>
          </motion.h1>
          <motion.p {...reveal(0.16)} className="font-body text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
            {cp.subtitle}
          </motion.p>
          <motion.div {...reveal(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryLink to={localePath('/contact')}>{cp.ctaButton}</PrimaryLink>
            <button
              type="button"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base"
            >
              <span>{t.homePage.exploreMore}</span>
              <ArrowDown weight="bold" size={16} />
            </button>
          </motion.div>
          <motion.dl {...reveal(0.32)} className="mt-12 grid grid-cols-3 max-w-lg border-t border-white/15">
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

        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="lg:col-span-6 relative h-[440px] lg:h-[min(80vh,700px)] rounded-[2rem] overflow-hidden border border-white/10 p-4 sm:p-5"
          style={{
            background: `linear-gradient(160deg, ${C.primary}66, ${C.bg}E6)`,
            boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55`,
            maskImage: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
          aria-label={cp.bannerLabel}
        >
          <div className="grid grid-cols-3 gap-4 h-full">
            <LogoColumn items={columns[0]} duration={26} />
            <LogoColumn items={columns[1]} duration={32} reverse />
            <LogoColumn items={columns[2]} duration={28} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Portfolio with sector filter ─────────────────────────────

function Portfolio() {
  const { t } = useTranslation();
  const cp = t.customersPage;
  const [filter, setFilter] = useState<Sector | 'all'>('all');
  const visible = useMemo(() => CUSTOMERS.filter((c) => filter === 'all' || c.sector === filter), [filter]);

  const filters: { key: Sector | 'all'; label: string; count: number }[] = [
    { key: 'all', label: cp.filterAll, count: CUSTOMERS.length },
    ...SECTORS.map((s) => ({ key: s, label: cp.sectors[s], count: CUSTOMERS.filter((c) => c.sector === s).length })),
  ];

  return (
    <section id="portfolio" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="01" eyebrow={cp.bannerLabel} lead={cp.sectorsTitle} highlight={cp.sectorsHighlight} subtitle={cp.sectorsSubtitle} />

        <motion.div {...reveal(0.05, 16)} role="tablist" className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const active = f.key === filter;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 min-h-0 font-sans text-sm font-semibold border transition-colors ${
                  active ? 'border-transparent text-white' : 'border-white/15 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {active && <motion.span layoutId="customer-filter" className="absolute inset-0 rounded-full" style={{ background: C.cta }} transition={{ duration: 0.4, ease: EASE }} />}
                <span className="relative">{f.label}</span>
                <span className={`relative text-xs tabular-nums ${active ? 'text-white/85' : 'text-white/40'}`}>{pad(f.count)}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.article
                key={c.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group relative rounded-[1.5rem] border border-white/10 p-3 transition-colors duration-300 hover:border-white/25"
                style={{ background: 'linear-gradient(160deg, rgba(0,94,150,0.30), rgba(0,44,61,0.78))', backdropFilter: 'blur(10px)' }}
              >
                <LogoPlate
                  name={c.name}
                  logo={c.logo}
                  className="aspect-[16/10] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  imgClassName="max-h-[50%] max-w-[65%] grayscale-[35%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="flex items-center justify-between gap-2 px-2 pt-4 pb-1">
                  <h3 className="font-sans font-semibold text-white text-sm sm:text-base truncate">{c.name}</h3>
                  <span className="flex items-center gap-1.5 shrink-0 font-body text-[11px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: SECTOR_COLOR[c.sector] }} />
                    <span className="hidden sm:inline">{cp.sectors[c.sector]}</span>
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Industries ───────────────────────────────────────────────

function Industries() {
  const { t } = useTranslation();
  const cp = t.customersPage;
  const cc = t.commandControlPage;
  const [pub, corp] = cc.industries;
  const items = [
    { name: pub.items[1]?.name, icon: ShieldStar },
    { name: corp.items[0]?.name, icon: Bank },
    { name: pub.items[6]?.name, icon: Drop },
    { name: pub.items[4]?.name, icon: Lightning },
    { name: pub.items[3]?.name, icon: Heartbeat },
    { name: pub.items[5]?.name, icon: GraduationCap },
    { name: pub.items[0]?.name, icon: Buildings },
    { name: corp.items[3]?.name, icon: Briefcase },
  ].filter((i): i is { name: string; icon: typeof Bank } => Boolean(i.name));

  return (
    <section className="relative py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            {...reveal()}
            className="lg:col-span-5 relative h-[340px] lg:h-[min(68vh,560px)] rounded-[2rem] overflow-hidden"
            style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55` }}
          >
            <img src={INDUSTRY_IMAGE} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 35%, ${C.bg}F2 100%)` }} />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-7 sm:p-8 flex items-end gap-4">
              <span className="font-sans font-bold leading-none" style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}>
                <GradientText>{t.aboutUsPage.stats.yearsExperience}</GradientText>
              </span>
              <span className="pb-2 font-sans text-sm uppercase tracking-[0.2em] text-white/70">{t.aboutUsPage.labels.yearsLabel}</span>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <SectionHeader index="02" eyebrow={cp.eyebrow} lead={cc.industriesTitle} highlight={cc.industriesHighlight} />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 -mt-4">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    {...reveal(0.05 * i, 16)}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 px-4 sm:px-5 py-4 transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(160deg, rgba(0,94,150,0.30), rgba(0,44,61,0.75))', backdropFilter: 'blur(10px)' }}
                  >
                    <span
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[#A6CE39] group-hover:text-white"
                      style={{ background: `${C.cta}1F`, color: C.cta }}
                    >
                      <Icon weight="duotone" size={22} />
                    </span>
                    <span className="font-sans font-semibold text-white text-sm sm:text-base leading-snug">{item.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────

function CustomersPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const cp = t.customersPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <PageSEO
        title={cp.seoTitle}
        description={cp.seoDescription}
        path={localePath('/customers')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: cp.eyebrow, path: localePath('/customers') },
        ]}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none -z-10" />

      <Hero />
      <Portfolio />
      <Industries />

      <CtaBand
        image={CTA_IMAGE}
        secondary={{ to: localePath('/partners'), label: t.partnersPage.eyebrow }}
        copy={{ eyebrow: cp.ctaEyebrow, title: cp.ctaTitle, text: cp.ctaText, button: cp.ctaButton }}
      />

      <Footer />
    </div>
  );
}

export default CustomersPage;
