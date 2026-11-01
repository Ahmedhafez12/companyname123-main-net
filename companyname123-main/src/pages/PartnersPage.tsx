import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowsLeftRight,
  ChartLineUp,
  Package,
  Rocket,
  TrendUp,
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

const PARTNERS = [
  { name: 'Avaya', logo: '/assets/avaya_red_logo_600x300.jpg', url: 'https://www.avaya.com/' },
  { name: 'Cambium Networks', logo: '/assets/Cambium-Networks-Logo.png', url: 'https://www.cambiumnetworks.com/' },
  { name: '3CX', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/3CX_logo.svg', url: 'https://www.3cx.com/' },
  { name: 'Patton', logo: 'https://tritech.co.il/wp-content/uploads/2018/04/formation-patton-1.png', url: 'https://www.patton.com/' },
  { name: 'Kerpen', logo: 'https://www.secomp.nl/thumbor/OrDiZJB3a2ytXjNkifZBsqPip3A=/filters:cachevalid(2022-11-18T15:16:15.230772):strip_icc():strip_exif()/cms_secde/cms/ueber_uns/markenwelt/kerpen_datacom/kerpen-datacom.png', url: 'https://kerpen-data.com/en/' },
  { name: 'M5 Technologies', logo: 'https://documentation.media5corp.com/download/attachments/524289/atl.site.logo?version=7&modificationDate=1771424618039&api=v2', url: 'https://www.m5technologies.com/' },
  { name: 'Ip Tech', logo: 'https://iptechlabs.com/wp-content/uploads/BrandingGraphicsLogos/IPTL_Logo_Transparent_PNG.png', url: 'https://iptechlabs.com/' },
  { name: 'J&R Technology', logo: 'https://www.jrtelephone.com/uploads/7137/logo.png', url: 'https://www.jrtelephone.com/' },
  { name: 'FORA', logo: 'https://cdn.shopify.com/s/files/1/0510/8655/7362/files/FORA_Logo_e69f5314-5a32-440e-9f1b-a3d2f9676bb1.png', url: 'https://foracare.com/' },
];

const VALUE_ICONS = [ArrowsLeftRight, Package, ChartLineUp, Rocket, TrendUp];
const VALUE_IMAGE = '/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_926ae64b7c.jpeg';
const CTA_IMAGE = '/assets/Telecommunications/Satellite_dish_array_signal_beams_15aa8e2a0d.jpeg';

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// ── Hero: copy + partner orbit ───────────────────────────────

function Orbit() {
  const reduceMotion = useReducedMotion();
  const inner = PARTNERS.slice(0, 4);
  const outer = PARTNERS.slice(4);

  const ring = (items: typeof PARTNERS, radius: number, duration: number, reverse = false, offset = 0) => (
    <motion.div
      className="absolute inset-0"
      animate={reduceMotion ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {items.map((p, i) => {
        const angle = (i / items.length) * Math.PI * 2 + offset;
        return (
          <div
            key={p.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%` }}
          >
            <motion.div
              animate={reduceMotion ? undefined : { rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
              <LogoPlate
                name={p.name}
                logo={p.logo}
                className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] ring-4 ring-[#002C3D]/60"
                imgClassName="max-h-[45%] max-w-[70%]"
              />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );

  return (
    <div className="relative w-full max-w-[560px] aspect-square mx-auto">
      {/* rings */}
      <div aria-hidden className="absolute inset-[25%] rounded-full border border-dashed border-white/20" />
      <div aria-hidden className="absolute inset-[9%] rounded-full border border-white/10" />
      <div aria-hidden className="absolute inset-[30%] rounded-full blur-3xl opacity-40" style={{ background: C.secondary }} />

      {ring(inner, 25, 50, false, Math.PI / 4)}
      {ring(outer, 41, 80, true)}

      {/* hub */}
      <div className="absolute inset-[36%] rounded-full flex items-center justify-center border border-white/15" style={{ background: `radial-gradient(circle at 30% 30%, ${C.primary}, ${C.bg})`, boxShadow: `0 0 0 10px ${C.bg}66, 0 0 60px ${C.secondary}55` }}>
        <img src="/assets/hajz-navbar-logo.png" alt="HTC" className="w-[78%] h-auto" />
      </div>
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const pp = t.partnersPage;
  const stats = [
    { value: String(PARTNERS.length), label: pp.statPartners },
    { value: t.aboutUsPage.stats.yearsExperience, label: t.aboutUsPage.labels.yearsLabel },
    { value: String(t.telecomPage.businessUnits.length), label: t.telecomPage.coreSolutionsHighlight },
  ];

  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex items-center pt-28 pb-16 lg:py-0">
      <div aria-hidden className="absolute bottom-0 -end-40 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25" style={{ background: C.primary }} />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6">
          <motion.div {...reveal(0, 16)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md px-3.5 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: C.cta }} />
            <span className="font-sans text-xs sm:text-sm font-medium text-white/85">{pp.eyebrow}</span>
          </motion.div>
          <motion.h1
            {...reveal(0.08)}
            className="font-sans font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.6vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.03em' }}
          >
            {pp.headline}
            <GradientText>{pp.headlineHighlight}</GradientText>
          </motion.h1>
          <motion.p {...reveal(0.16)} className="font-body text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
            {pp.subtitle}
          </motion.p>
          <motion.div {...reveal(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryLink to={localePath('/contact')}>{pp.ctaButton}</PrimaryLink>
            <button
              type="button"
              onClick={() => document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className="lg:col-span-6"
          aria-label={pp.bannerLabel}
        >
          <Orbit />
        </motion.div>
      </div>
    </section>
  );
}

// ── Partner grid ─────────────────────────────────────────────

function PartnerGrid() {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const pp = t.partnersPage;
  const Arrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="partners" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow={pp.bannerLabel}
          lead={pp.gridTitle}
          highlight={pp.gridHighlight}
          subtitle={pp.gridSubtitle}
          aside={
            <span className="font-sans font-bold text-6xl lg:text-7xl leading-none">
              <GradientText>{pad(PARTNERS.length)}</GradientText>
            </span>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARTNERS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              {...reveal(0.05 * (i % 3), 24)}
              className="group relative block rounded-[1.75rem] border border-white/10 p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25"
              style={{ background: 'linear-gradient(160deg, rgba(0,94,150,0.32), rgba(0,44,61,0.82))', backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.55)' }}
            >
              <div className="relative">
                <LogoPlate name={p.name} logo={p.logo} className="aspect-[16/9] rounded-[1.25rem]" imgClassName="max-h-[48%] max-w-[62%] transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 start-3 rounded-full bg-[#002C3D] px-2.5 py-0.5 font-sans text-[11px] font-bold tabular-nums" style={{ color: C.cta }}>
                  {pad(i + 1)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 pt-5 pb-2">
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-white text-lg leading-tight truncate">{p.name}</h3>
                  <p className="font-body text-xs text-white/50 mt-1 truncate" dir="ltr">
                    {hostname(p.url)}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/70 transition-all duration-300 group-hover:bg-[#A6CE39] group-hover:border-[#A6CE39] group-hover:text-white"
                  aria-hidden
                >
                  <Arrow weight="bold" size={16} />
                </span>
              </div>
              <span className="sr-only">{pp.visitWebsite}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Value delivered ──────────────────────────────────────────

function ValueSection() {
  const { t } = useTranslation();
  const pp = t.partnersPage;
  const why = t.aboutUsPage.whyUs;

  return (
    <section className="relative py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 lg:order-last">
            <SectionHeader index="02" eyebrow={pp.eyebrow} lead={why.valuePropTitle} highlight={why.valuePropTitleHighlight} subtitle={why.valuePropSubtitle} />
            <ul className="border-t border-white/10 -mt-4">
              {why.valueProps.map((v, i) => {
                const Icon = VALUE_ICONS[i] ?? Rocket;
                return (
                  <motion.li key={v.title} {...reveal(0.05 * i, 16)} className="group flex items-start gap-5 py-5 border-b border-white/10">
                    <span
                      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[#A6CE39] group-hover:text-white"
                      style={{ background: `${C.cta}1F`, color: C.cta, border: `1px solid ${C.cta}40` }}
                    >
                      <Icon weight="duotone" size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-sans text-xs font-bold tabular-nums text-white/40">{pad(i + 1)}</span>
                        <h3 className="font-sans font-bold text-white text-lg">{v.title}</h3>
                      </div>
                      <p className="font-body text-sm sm:text-base text-white/65 leading-relaxed mt-1">{v.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <motion.div
            {...reveal()}
            className="lg:col-span-5 relative h-[340px] lg:h-[min(72vh,620px)] rounded-[2rem] overflow-hidden"
            style={{ boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 120px -40px ${C.secondary}55` }}
          >
            <img src={VALUE_IMAGE} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${C.bg}F2 100%)` }} />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-7 sm:p-8">
              <div className="flex -space-x-3 rtl:space-x-reverse mb-4">
                {PARTNERS.slice(0, 5).map((p) => (
                  <LogoPlate key={p.name} name={p.name} logo={p.logo} className="w-12 h-12 rounded-full ring-2 ring-[#002C3D]" imgClassName="max-h-[45%] max-w-[70%]" />
                ))}
                <span className="w-12 h-12 rounded-full ring-2 ring-[#002C3D] flex items-center justify-center font-sans text-sm font-bold text-white" style={{ background: C.cta }}>
                  +{PARTNERS.length - 5}
                </span>
              </div>
              <p className="font-sans font-semibold text-white text-lg leading-snug max-w-xs">{pp.subtitle}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────

function PartnersPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const pp = t.partnersPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <PageSEO
        title={pp.seoTitle}
        description={pp.seoDescription}
        path={localePath('/partners')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: pp.eyebrow, path: localePath('/partners') },
        ]}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none -z-10" />

      <Hero />
      <PartnerGrid />
      <ValueSection />

      <CtaBand
        image={CTA_IMAGE}
        secondary={{ to: localePath('/customers'), label: t.customersPage.eyebrow }}
        copy={{ eyebrow: pp.ctaEyebrow, title: pp.ctaTitle, text: pp.ctaText, button: pp.ctaButton }}
      />

      <Footer />
    </div>
  );
}

export default PartnersPage;
