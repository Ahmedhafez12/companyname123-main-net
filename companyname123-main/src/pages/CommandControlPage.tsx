import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  CaretDown,
  PencilSimple,
  Rocket,
  Gear,
  Sliders,
  TrendDown,
  Globe,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  Lifebuoy,
  type IconProps,
} from 'phosphor-react';
import Footer from '../components/Footer';

// ─── Technical Advantages Bento ───────────────────────────────────────────────
const TECHNICAL_ADVANTAGES_ICON_MAP: Record<
  string,
  React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
> = {
  'Expertise & Experience': Globe,
  'Tailored Solutions': SlidersHorizontal,
  'Security First': ShieldCheck,
  'Future-Proof Architecture': Cpu,
  'End-to-End Support': Lifebuoy,
};

function TechnicalAdvantagesIcon({
  title,
  size,
  className,
}: {
  title: string;
  size: number;
  className?: string;
}) {
  const Cmp = TECHNICAL_ADVANTAGES_ICON_MAP[title];
  if (!Cmp) return null;
  return <Cmp weight="duotone" size={size} className={className} aria-hidden />;
}

type TechnicalAdvantageEntry = {
  readonly title: string;
  readonly description: string;
  readonly accent?: string;
  readonly highlight?: boolean;
};

function TechnicalAdvantagesBento({
  items,
}: {
  items: readonly TechnicalAdvantageEntry[];
}) {
  const [hero, ...rest] = items;
  if (!hero) return null;

  const cardBase =
    'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20';

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(68,200,245,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(0,94,150,0.22),transparent_50%),radial-gradient(ellipse_60%_45%_at_0%_80%,rgba(166,206,57,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <h2 className="mb-2 text-xl font-bold text-white sm:text-3xl lg:text-4xl">
            Technical{' '}
            <span className="bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5] bg-clip-text text-transparent">
              Advantages
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5 lg:gap-6">
          {/* Hero card — featured first item */}
          <div
            className={[
              cardBase,
              'p-5 sm:p-8 lg:p-10',
              hero.highlight ? 'ring-2 ring-[#A6CE39]/30' : '',
            ].join(' ')}
          >
            <div className="flex flex-row gap-4 items-start md:items-center md:gap-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cta sm:h-14 sm:w-14 md:h-16 md:w-16">
                <TechnicalAdvantagesIcon title={hero.title} size={28} className="text-cta" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-base font-bold text-white sm:text-2xl lg:text-3xl">
                  {hero.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 sm:mt-3 sm:text-base lg:text-lg">
                  {hero.description}
                </p>
              </div>
            </div>
          </div>

          {/* Bento grid — 1 col mobile → 2 tablet → 4 desktop */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {rest.map((item) => (
              <article
                key={item.title}
                className={[
                  cardBase,
                  'flex h-full flex-col p-4 sm:p-5 lg:p-6',
                  item.highlight ? 'ring-2 ring-[#A6CE39]/30' : '',
                ].join(' ')}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cta sm:h-11 sm:w-11">
                  <TechnicalAdvantagesIcon title={item.title} size={20} className="text-cta" />
                </div>
                <h4 className="text-sm font-bold text-white sm:text-base lg:text-lg">{item.title}</h4>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/75 sm:text-sm lg:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// ─── Feature Card (Core Pillars) ───────────────────────────────────────────────
const FeatureCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col items-center text-center"
      style={{
        padding: 'clamp(0.875rem, 1.75vh, 1.25rem)',
        borderRadius: 'clamp(0.625rem, 1.25vh, 0.875rem)',
      }}
    >
      {icon && (
        <div
          className="text-cta flex items-center justify-center mb-3 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-shrink-0"
        >
          {React.cloneElement(icon as React.ReactElement, {
            style: {
              width: 'clamp(1.125rem, 2.25vh, 1.5rem)',
              height: 'clamp(1.125rem, 2.25vh, 1.5rem)',
            },
          })}
        </div>
      )}
      <h3
        className="font-bold text-white"
        style={{
          fontSize: 'clamp(0.8125rem, 1.6vh, 1rem)',
          marginBottom: 'clamp(0.25rem, 0.5vh, 0.375rem)',
          lineHeight: '1.3',
        }}
      >
        {title}
      </h3>
      <p
        className="text-white/70"
        style={{ fontSize: 'clamp(0.6875rem, 1.2vh, 0.8125rem)', lineHeight: '1.5' }}
      >
        {description}
      </p>
    </motion.div>
  );
};

// ─── Tech Stack Card (Z-pattern) ──────────────────────────────────────────────
// Mobile: image on top (aspect-video), text below.
// md+   : alternating left/right two-column layout.
const TechStackCard = ({
  title,
  description,
  image,
  index,
  isReversed,
}: {
  title: string;
  description: string;
  image: string;
  index: number;
  isReversed?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className={`flex flex-col md:grid md:grid-cols-2 md:items-center ${
        isReversed ? 'md:grid-flow-dense' : ''
      }`}
      style={{ gap: 'clamp(1rem, 2.5vh, 2rem)' }}
    >
      {/* Image */}
      <div className={isReversed ? 'md:col-start-2' : ''}>
        <div
          className="relative w-full overflow-hidden bg-white/5"
          style={{
            aspectRatio: '16/9',
            borderRadius: 'clamp(0.625rem, 1.25vh, 1rem)',
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text */}
      <div
        className={`${isReversed ? 'md:col-start-1 md:row-start-1' : ''} ${
          !isReversed ? 'md:text-right' : ''
        }`}
      >
        <h3
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(1.0625rem, 2.25vh, 1.75rem)',
            marginBottom: 'clamp(0.5rem, 1.25vh, 0.875rem)',
            lineHeight: '1.25',
          }}
        >
          {title}
        </h3>
        <p
          className="text-white/80 leading-relaxed"
          style={{ fontSize: 'clamp(0.8125rem, 1.5vh, 1.0625rem)', lineHeight: '1.65' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Industry Accordion ────────────────────────────────────────────────────────
const IndustryAccordion = ({
  title,
  industries,
  image,
}: {
  title: string;
  industries: Array<{ name: string; icon?: React.ReactNode; description?: string }>;
  image: string;
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col"
      style={{ borderRadius: 'clamp(0.625rem, 1.25vh, 1rem)' }}
    >
      {/* Image header */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: 'clamp(130px, 18vh, 200px)' }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/90 via-[#005E96]/50 to-transparent" />
        <h3
          className="absolute font-bold text-white"
          style={{
            fontSize: 'clamp(0.9375rem, 1.85vh, 1.375rem)',
            bottom: 'clamp(0.625rem, 1.25vh, 1rem)',
            left: 'clamp(0.75rem, 1.5vh, 1.25rem)',
            right: 'clamp(0.75rem, 1.5vh, 1.25rem)',
            lineHeight: '1.3',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Accordion items */}
      <div
        className="flex-1 flex flex-col"
        style={{
          padding: 'clamp(0.75rem, 1.5vh, 1.25rem)',
          gap: 'clamp(0.125rem, 0.25vh, 0.25rem)',
        }}
      >
        {industries.map((industry, index) => (
          <div key={industry.name} className="border-b border-white/10 last:border-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between text-left hover:bg-white/5 rounded-lg transition-colors"
              style={{
                padding: 'clamp(0.5rem, 1vh, 0.875rem)',
                gap: 'clamp(0.375rem, 0.75vh, 0.625rem)',
                borderRadius: 'clamp(0.375rem, 0.75vh, 0.625rem)',
              }}
            >
              <span
                className="font-medium text-white"
                style={{ fontSize: 'clamp(0.8125rem, 1.4vh, 0.9375rem)' }}
              >
                {industry.name}
              </span>
              <CaretDown
                weight="bold"
                size={16}
                className={`text-white/60 transition-transform flex-shrink-0 ${
                  openItems.has(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openItems.has(index) && industry.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/70"
                style={{
                  padding: '0 clamp(0.5rem, 1vh, 0.875rem) clamp(0.5rem, 1vh, 0.875rem)',
                  fontSize: 'clamp(0.75rem, 1.3vh, 0.875rem)',
                  lineHeight: '1.55',
                }}
              >
                {industry.description}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Page Component ────────────────────────────────────────────────────────────
function CommandControlPage() {
  const location = useLocation();

  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const element = document.querySelector(hash);
    if (element) {
      requestAnimationFrame(() => {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementTop - 80, behavior: 'smooth' });
      });
    }
  };

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const attemptScroll = (attempts = 0) => {
        const element = document.querySelector(hash);
        if (element) {
          scrollToHash(hash);
        } else if (attempts < 5) {
          setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
        }
      };
      setTimeout(() => attemptScroll(), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) setTimeout(() => scrollToHash(hash), 100);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ─── Data ──────────────────────────────────────────────────────────────────
  const corePillars = [
    {
      icon: <PencilSimple weight="bold" size={20} />,
      title: 'Design',
      description: 'Requirements gathering, site surveys, and feasibility studies.',
    },
    {
      icon: <Rocket weight="bold" size={20} />,
      title: 'Deploy',
      description: 'Execution with in-house engineering and trusted partners.',
    },
    {
      icon: <Gear weight="bold" size={20} />,
      title: 'Manage',
      description: 'AMC/SLA support for system longevity.',
    },
    {
      icon: <Sliders weight="bold" size={20} />,
      title: 'Tailor-Made',
      description: 'Custom AI and software solutions beyond off-the-shelf products.',
    },
    {
      icon: <TrendDown weight="bold" size={20} />,
      title: 'Cost Cutting',
      description: 'Reducing manpower and operational costs through integration.',
    },
  ];

  const technicalAdvantages = [
    {
      title: 'Expertise & Experience',
      description:
        'At htc we Have a Team world class Engineers who have consult and deployed command center across the Globe',
      accent: 'secondary',
    },
    {
      title: 'Tailored Solutions',
      description:
        "Our Solutions/design are 100 % tailor made for Each Requirement; we don't sell what we have but its customer requirement only",
      accent: 'secondary',
    },
    {
      title: 'Security First',
      description:
        'Our prime focus during designing solution is, to secure our customer control room and premises and sites by the use of Technologies',
      accent: 'secondary',
    },
    {
      title: 'Future-Proof Architecture',
      description:
        'Our scalable solutions grow with your business and support emerging technologies like AI and IoT.and can be Scalable for future',
      accent: 'secondary',
    },
    {
      title: 'End-to-End Support',
      description:
        "From initial planning to post-deployment support, we're with you every step of the way.",
      accent: 'secondary',
    },
  ] as const;

  const subSolutions = [
    {
      name: 'Control Room Furniture',
      description:
        'We are committed to delivering innovative, reliable, and future-ready control room furniture solutions that meet the highest industry standards. By combining design expertise with technical understanding, we help organizations build efficient and comfortable control room environments that support critical decision-making around the clock with the support of our world class OEM Partner.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_30f0a44d43.jpeg',
    },
    {
      name: 'Software',
      description:
        'Custom software solutions tailored to your command and control needs, providing intuitive interfaces and powerful analytics capabilities.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_c6f6c6bbe5.jpeg',
    },
    {
      name: 'Video Walls',
      description:
        'High-resolution video wall systems for real-time monitoring and visualization, enabling comprehensive oversight of all critical operations.',
      image: '/assets/CommandandControl/Control_room_with_screens_37be293209.jpeg',
    },
    {
      name: 'Servers',
      description:
        'Flexible server infrastructure solutions supporting on-premises, cloud, or hybrid deployments to meet your specific security and scalability requirements.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_33e9818a2b.jpeg',
    },
    {
      name: 'AI/Custom Software',
      description:
        'Advanced AI-powered custom software solutions that go beyond off-the-shelf products, delivering intelligent automation and predictive insights.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_9802d7d127.jpeg',
    },
  ];

  const [activeSubSolutionIndex, setActiveSubSolutionIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const subSolutionsLength = subSolutions.length;

  // Auto-advance: reset the timer every time the slide changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSubSolutionIndex((p) => (p + 1) % subSolutionsLength);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSubSolutionIndex, subSolutionsLength]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      setActiveSubSolutionIndex((p) =>
        delta > 0
          ? (p + 1) % subSolutionsLength
          : (p - 1 + subSolutionsLength) % subSolutionsLength
      );
    }
    setTouchStartX(null);
  };

  const techStack = [
    {
      title: 'Cloud & AI',
      description:
        'Our Cloud and AI solutions delivers innovative, scalable, and intelligent technology solutions that help organizations transform, automate, and grow in a digital-first world. We provide solution with all major provider Like AWS, Azure Etc, By combining the power of cloud computing with advanced artificial intelligence, we enable businesses to optimize operations, enhance decision-making. Our Solutions/Applications can be run over Cloud, On Premises or Hybrid model solutions.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_db5915e486.jpeg',
    },
    {
      title: 'Software & Analytics',
      description:
        'Our OEM\'s design and develop high-performance integration software applications tailored to meet the unique needs of businesses across various industries. From enterprise systems and web applications to mobile platforms and automation tools, our solutions are built to enhance productivity, improve user experience, and support business growth. These platforms are capable to integrate CCTV, access control, ANPR Frs ,IOTs, databases, etc.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_b46db2bfed.jpeg',
    },
    {
      title: 'Server On-premises/Cloud/Hybrid',
      description:
        'We offer cloud-based server solutions hosted on leading platforms such as Amazon Web Services, Microsoft Azure, and Google Cloud Platform, enabling businesses to scale resources on demand, reduce capital expenditure, and ensure high availability. At the same time, we deliver robust on-premises server solutions for organizations that require full control over their data, enhanced security, or compliance with regulatory standards. Our on-site infrastructure services include server installation, configuration, virtualization, storage solutions, and ongoing maintenance. By integrating both environments into a hybrid model, we ensure seamless data flow, optimized performance, and operational flexibility. This approach allows businesses to keep critical workloads on-premises while leveraging the cloud for scalability, backup, and disaster recovery.',
      image: '/assets/CommandandControl/Leadership_team_reviewing_map_5bf849bbcf.jpeg',
    },
    {
      title: 'Video Wall',
      description:
        'We provide high-performance video wall systems tailored for control rooms, command centers, corporate environments, retail spaces, and public venues. We offer end-to-end services—from consultation and design to installation and ongoing support—ensuring that each video wall system meets the specific operational and spatial requirements of our clients. Our systems are designed for 24/7 performance, minimal downtime, and easy scalability.',
      image:
        '/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_b715a93b98.jpeg',
    },
  ];

  const publicIndustries = [
    { name: 'Smart Cities', description: 'Integrated urban management systems for traffic, utilities, and public safety.' },
    { name: 'Defense', description: 'Mission-critical command centers for defense operations and strategic planning.' },
    { name: 'Transportation', description: 'Traffic management and logistics control systems for efficient transportation networks.' },
    { name: 'Healthcare', description: 'Hospital command centers and emergency response coordination systems.' },
    { name: 'Energy & Utilities', description: 'Power grid monitoring and utility management for reliable energy distribution.' },
    { name: 'Education', description: 'Campus safety, facilities, and district-wide operations centers for schools and universities.' },
    { name: 'Oil & Gas', description: 'Upstream, midstream, and downstream monitoring for pipelines, plants, and field operations.' },
  ];

  const corporateIndustries = [
    { name: 'Banking & Finance', description: 'Trading floors and financial operations centers for real-time market monitoring.' },
    { name: 'Manufacturing', description: 'Production control rooms and quality assurance monitoring systems.' },
    { name: 'Automotive', description: 'Manufacturing control centers and supply chain coordination systems.' },
    { name: 'Corporate Offices', description: 'Enterprise command centers for facilities management and security operations.' },
    { name: 'Real Estate', description: 'Property operations, smart buildings, and portfolio-wide security and facilities oversight.' },
    { name: 'Retail', description: 'Store networks, distribution centers, and loss-prevention operations with unified visibility.' },
    { name: 'Health', description: 'Life sciences, payers, and health services operations centers beyond acute-care hospital settings.' },
  ];

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  return (
    <div className="relative">
      <Helmet>
        <title>Command & Control - Hajz Telecommunication Co Ltd. | Advanced Control Solutions</title>
        <meta
          name="description"
          content="Comprehensive Command & Control solutions connecting ELV and IT systems for intelligent automation and improved performance."
        />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden scroll-mt-20"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'clamp(5rem, 10vh, 6rem)',
          paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      >
        <div className="absolute inset-0 bg-[#005E96] opacity-20 pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 xl:px-8 w-full max-w-7xl relative z-10">
          {/*
            Mobile  : stacked — text then image.
            Desktop : side-by-side two-column grid.
          */}
          <div
            className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center"
            style={{ gap: 'clamp(1.5rem, 3vh, 2.5rem)' }}
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <div
                className="inline-flex items-center bg-white/5 backdrop-blur-[2px] border border-white/10"
                style={{
                  padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.75rem, 1.5vh, 1rem)',
                  borderRadius: '9999px',
                  marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                }}
              >
                <span
                  className="text-white/90"
                  style={{ fontSize: 'clamp(0.6875rem, 1.1vh, 0.875rem)' }}
                >
                  Command & Control
                </span>
              </div>

              <h1
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(1.75rem, 4.5vh, 3.75rem)',
                  marginBottom: 'clamp(0.75rem, 1.75vh, 1.5rem)',
                  lineHeight: '1.15',
                }}
              >
                Command{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                  & Control
                </span>
              </h1>

              <p
                className="text-white/80"
                style={{
                  fontSize: 'clamp(0.8125rem, 1.6vh, 1.0625rem)',
                  lineHeight: '1.65',
                  maxWidth: '42rem',
                  margin: '0 auto',
                }}
              >
                Control Room Solution is a centralized system designed to monitor, manage, and
                control multiple devices (Surveillance Cameras, IOT Devices, Databases, AI, etc.)
                across a facility or a network of sites. It plays a critical role in ensuring
                safety, security, and operational efficiency in environments such as airports,
                banks, city surveillance systems, industrial plants, and commercial buildings.
              </p>
            </motion.div>

            {/* Hero Image — aspect-video on mobile, fixed height on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <div
                className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
                style={{
                  aspectRatio: '16/9',
                  borderRadius: 'clamp(0.75rem, 1.5vh, 1.5rem)',
                }}
              >
                <img
                  src="/assets/CommandandControl/Control_room_with_screens_9c4c709e86.jpeg"
                  alt="Command & Control Operations Center"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Core Solutions ─────────────────────────────────────── */}
      <section
        id="core-solutions"
        className="relative scroll-mt-20"
        style={{
          paddingTop: 'clamp(4rem, 8vh, 9rem)',
          paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.25rem, 2.5vh, 2.25rem)' }}
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.25rem, 3.25vh, 2.5rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
              }}
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                Core Solutions
              </span>
            </h2>
            <p
              className="text-white/80"
              style={{ fontSize: 'clamp(0.8125rem, 1.4vh, 1rem)', lineHeight: '1.65' }}
            >
              We connect the dots between your ELV and other systems—ensuring smooth data flow,
              improved performance, and intelligent automation.
            </p>
          </motion.div>

          {/*
            Core Pillars grid:
            Mobile  : 2 columns (so all 5 cards show as 2-2-1).
            sm      : 3 columns.
            lg      : 5 columns (all in one row).
          */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            style={{
              gap: 'clamp(0.625rem, 1.25vh, 1.125rem)',
              marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
            }}
          >
            {corePillars.map((pillar, index) => (
              <FeatureCard
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                index={index}
              />
            ))}
          </motion.div>

          {/* ── Sub-solutions Carousel ────────────────────────────────────── */}
          {/*
            Mobile  : image stacks on top (aspect-video), text below, nav bar at bottom.
            Desktop : image left 40%, text right 60%, side-by-side in a fixed-height box.
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden select-none"
              style={{ borderRadius: 'clamp(0.75rem, 1.5vh, 1.25rem)', cursor: 'grab' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={activeSubSolutionIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/*
                  flex-col on mobile: image (aspect-video banner) then text.
                  lg:flex-row on desktop: image left 40%, text right 60%, min-h fixed.
                */}
                <div
                  className="flex flex-col lg:flex-row"
                  style={{ minHeight: 'clamp(0px, 0px, 0px)' }}
                >
                  {/* Image — aspect-video on mobile, fixed height on desktop */}
                  <div
                    className="relative w-full lg:w-[40%] flex-shrink-0"
                    style={{
                      /* aspect-video equivalent on mobile, fixed height desktop */
                      aspectRatio: '16/9',
                    }}
                  >
                    {/* Override aspect-ratio on desktop via an inner absolute image */}
                    <div className="absolute inset-0 lg:static lg:h-full" style={{ position: 'relative' }}>
                      <div
                        className="relative w-full overflow-hidden"
                        style={{
                          aspectRatio: '16/9',
                        }}
                      >
                        <motion.img
                          key={`img-${activeSubSolutionIndex}`}
                          src={subSolutions[activeSubSolutionIndex].image}
                          alt={subSolutions[activeSubSolutionIndex].name}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#005E96]/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div
                    className="w-full lg:w-[60%] flex flex-col justify-center"
                    style={{ padding: 'clamp(1rem, 2vh, 2rem)' }}
                  >
                    <h4
                      className="font-bold text-white"
                      style={{
                        fontSize: 'clamp(0.9375rem, 1.9vh, 1.625rem)',
                        marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
                        lineHeight: '1.3',
                      }}
                    >
                      {subSolutions[activeSubSolutionIndex].name}
                    </h4>
                    <p
                      className="text-white/80 leading-relaxed"
                      style={{
                        fontSize: 'clamp(0.75rem, 1.25vh, 0.9375rem)',
                        lineHeight: '1.65',
                      }}
                    >
                      {subSolutions[activeSubSolutionIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Swipe hint — mobile only */}
              <p
                className="flex lg:hidden items-center justify-center gap-1.5 py-2 select-none"
                style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}
                aria-hidden
              >
                <span>←</span> swipe to explore more <span>→</span>
              </p>

              {/* Auto-advance progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <motion.div
                  key={activeSubSolutionIndex}
                  className="h-full bg-gradient-to-r from-[#A6CE39] to-[#44C8F5]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Technical Advantages Bento ────────────────────────────────────── */}
      <TechnicalAdvantagesBento items={technicalAdvantages} />

      {/* ── Section 2: Technology Stack (Z-pattern) ───────────────────────── */}
      <section
        id="tech-stack"
        className="relative scroll-mt-20"
        style={{
          paddingTop: 'clamp(4rem, 8vh, 9rem)',
          paddingBottom: 'clamp(3rem, 6vh, 5rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.5rem, 3vh, 3rem)' }}
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.125rem, 3vh, 2.5rem)',
                lineHeight: '1.25',
              }}
            >
              The Backbone of Every{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                Command & Control Solution
              </span>
            </h2>
          </motion.div>

          {/*
            CRITICAL FIX: was gap clamp(7rem, 14vh, 9rem) = 112px min on mobile!
            Now: clamp(2.5rem, 5vh, 9rem) = 40px min — sensible on all screens.
          */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2.5rem, 5vh, 9rem)',
            }}
          >
            {techStack.map((tech, index) => (
              <TechStackCard
                key={tech.title}
                title={tech.title}
                description={tech.description}
                image={tech.image}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Industries We Serve ───────────────────────────────── */}
      <section
        id="industries-served"
        className="relative scroll-mt-20"
        style={{
          paddingTop: 'clamp(4rem, 8vh, 9rem)',
          paddingBottom: 'clamp(4rem, 8vh, 9rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)' }}
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.25rem, 3.5vh, 3rem)',
                marginBottom: 'clamp(0.375rem, 0.75vh, 0.75rem)',
              }}
            >
              Industries{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                We Serve
              </span>
            </h2>
            <p
              className="text-white/75"
              style={{ fontSize: 'clamp(0.8125rem, 1.4vh, 1rem)', lineHeight: '1.6' }}
            >
              From public infrastructure to enterprise operations — we build command centers for every sector.
            </p>
          </motion.div>

          {/* On mobile: stacked (1 col). sm+: side-by-side (2 col). */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{
              gap: 'clamp(0.875rem, 1.75vh, 1.5rem)',
              marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
            }}
          >
            <IndustryAccordion
              title="Public & Infrastructure"
              industries={publicIndustries}
              image="/assets/CommandandControl/Leadership_team_reviewing_map_5bf849bbcf.jpeg"
            />
            <IndustryAccordion
              title="Corporate & Enterprise"
              industries={corporateIndustries}
              image="/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_3fbc7ceb1d.jpeg"
            />
          </div>

          {/* Footer statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <p
              className="text-white/90 font-medium italic"
              style={{
                fontSize: 'clamp(0.875rem, 1.75vh, 1.125rem)',
                lineHeight: '1.65',
              }}
            >
              Design systems that connect people, data, and decisions for safer, smarter operations.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CommandControlPage;
