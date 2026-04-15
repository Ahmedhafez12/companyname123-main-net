import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
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
} from 'phosphor-react';
import HorizontalTimeline from '../components/HorizontalTimeline';
import CompanyIdentityCarousel from '../components/CompanyIdentityCarousel';
import ScrollReveal from '../components/ScrollReveal';
import HeroScrollIndicator from '../components/HeroScrollIndicator';
import WhyChooseUsSection from '../components/WhyChooseUsSection';

// Content constants (max 3 short sentences per block for above-the-fold fit)
const ABOUT_CONSTANTS = {
  hero: {
    badge: 'About HTC',
    headline: 'Who We',
    headlineHighlight: 'Are',
    summary:
      '32+ years of telecommunications excellence. We partner in legacy-to-digital migration, unified communications, and command & control. Driven by clarity, respect, and commitment.',
    heroImageSrc: '/assets/abstracts/Soft_focus_abstract_network_blurred_glowing_partic_delpmaspu.png',
    heroImageAlt: 'HTC telecommunications and connectivity',
  },
  identity: {
    mission:
      'Hajz Telecom crafts dependable, high-performance communication systems that propel businesses forward. We partner closely with enterprises, government, and defense clients across our markets to overcome operational hurdles with precision-engineered support and unwavering reliability nurturing homegrown talent to pioneer solutions that deliver enduring value and excellence. ',
    vision:
      'Bridging legacies and technology gaps to unlock true digital innovation. We empower enterprises, government, and defense across our markets with mission critical, unbreakable connectivity igniting a new generation of local experts to innovate, customize, and conquer your toughest challenges with unwavering confidence. ',
    missionBullets: ['Empowering communities through cutting-edge technology.', 'Driving progress with high-quality solutions.', 'Enhancing connectivity for daily life and growth.'],
    visionBullets: ['Personalized solutions for unique needs.', 'Top-tier services and products that add value.', 'Improving businesses and lives.'],
  },
  whyUs: {
    sectionTitle: 'Why Us',
    sectionSubtitle: 'What sets HTC apart in telecommunications excellence.',
    valueProps: [
      { title: 'Seamless Migration', description: 'Zero-downtime transitions from legacy to modern systems.' },
      { title: 'Turnkey Projects', description: 'End-to-end delivery from design to ongoing management.' },
      { title: 'Proactive Managed Services', description: 'Continuous monitoring and optimization for peak performance.' },
      { title: 'Agile Delivery', description: 'Flexible teams adapt to your timelines and budgets.' },
      { title: 'Tangible Impact', description: 'Focus on productivity, customer experience, and growth.' },
    ],
  },
  journey: {
    intro: 'From our founding to today, we have led telecommunications innovation.',
    events: [
      { date: '1994', title: 'First Cloud Service', description: 'Offer Worldspan ticketing system as service in the kingdom to travel agencies over STC legacy technology X.25 and connected with the world servers 700+ agencies' },
      { date: '1998', title: 'First DID/DOD Service', description: 'STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pregain solution and serve more than 2500+ key customer' },
      { date: '2002', title: 'First MPLS Technology', description: 'We have reseller agreement with STC to serve the customer with MPLS and connect their head office with the branch office through our solutions 300+ branches' },
      { date: '2009', title: 'First SIP Trunk', description: 'We provided with STC the new technology for DID/DOD service the SIP trunk providing the solution to 450+ customer' },
      { date: '2012', title: 'STC NGN Migration', description: 'Provide STC with the solution to migrate their Key customer from the DDN technology to NGN as MODA, RSAF, RSAD 1550+ Links' },
      { date: '2016', title: 'STC Hazm Room', description: 'htc have been chosen by STC, MODA and RSADF to provide off hook service to all the remote areas during the Hazm War over different technologies IPMPLS, MW and VSAT over 500+ links' },
      { date: '2022', title: 'STC Service Concept and 2 Contract', description: 'Work with STC to launch new service concept for Digital convertors over PLL service with the current to project to serve the key customer. Key customer Active equipment project (exclusive for htc) Customer premises equipment project' },
    ],
  },
  companyIdentity: {
    sectionTitle: 'Company Identity',
    sectionSubtitle: 'The three pillars that define who we are and how we work with our customers and communities.',
    blocks: [
      {
        title: 'Clarity, Respect & Commitment',
        paragraphs: [
          'We believe clarity drives confidence. By communicating transparently and aligning our actions with our words, we ensure that our goals and expectations are always understood.',
          'Respect guides how we engage with our colleagues, customers, and partners—fostering a culture of trust, inclusiveness, and mutual growth.',
          'Our commitment defines our reliability. We take ownership of every promise, consistently delivering quality, value, and results that strengthen our long-term partnerships and reputation.',
        ],
      },
      {
        title: 'Innovation, Quality & Community Impact',
        paragraphs: [
          'We strive for innovation that drives progress, developing advanced communication technologies that connect people and empower businesses.',
          'Our commitment to quality ensures reliable, high-performance solutions that meet the evolving needs of our customers and partners.',
          'We believe in making a positive difference—fostering economic development and enhancing the quality of life in every community we serve.',
        ],
      },
      {
        title: 'Customer Partnership, Excellence & Lasting Impact',
        paragraphs: [
          'We see every customer relationship as a partnership built on understanding, innovation, and shared success. By listening first and designing with purpose, we create smart, customized solutions that turn challenges into opportunities.',
          'Our drive for excellence pushes us to go beyond expectations—delivering experiences that empower businesses, elevate performance, and enrich everyday life.',
        ],
      },
    ],
  },
  competitiveEdge: {
    sectionTitle: 'Competitive Edge',
    sectionSubtitle: 'What makes us the partner of choice for complex communications and control environments.',
    items: [
      'Specialist in moving from legacy systems to modern, integrated communication platforms with minimal risk and disruption.',
      'Designs and deploys end-to-end solutions across UC, IP PBX, contact center, gateways, fixed wireless access, and command and control as a single accountable partner.',
      'Provides ongoing managed services, ensuring your environment is monitored, supported, and continuously optimized.',
      'Operates with agile, senior-led teams that adapt to your timelines, budgets, and operational constraints.',
      'Focuses on clear business outcomes: higher productivity, better customer experience, and improved cost efficiency.',
    ],
  },
  coreStrengths: {
    intro: 'The capabilities that drive our success and deliver value to clients.',
    items: [
      { title: '32+ Years', description: 'Expertise in telecom, system integration, and legacy-to-digital migration.' },
      { title: 'Legacy-to-Digital', description: 'Transitioning legacy systems to modern infrastructure without disruption.' },
      { title: 'Agile Delivery', description: 'Senior-led teams deliver on time and within budget.' },
      { title: 'Senior-Led Teams', description: 'Deep industry knowledge and technical excellence on every project.' },
      { title: 'Risk-Free Migration', description: 'Proven methodologies protect operations while enabling transformation.' },
      { title: 'Proven Track Record', description: 'Success across defense, infrastructure, banking, and enterprise.' },
    ],
  },
  cta: {
    heading: 'Ready to Learn More?',
    body: 'Explore our journey and see how we have shaped the telecommunications landscape.',
  },
};

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
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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
      <Helmet>
        <title>About Us - Hajz Telecommunication Co Ltd. | Identity, Vision & Mission</title>
        <meta name="description" content="HTC: 32+ years of telecommunications excellence. Our identity, vision, mission, why we stand out, and core strengths." />
      </Helmet>

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
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 2xl:pl-32 py-4 lg:py-12 overflow-hidden">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center bg-primary/20 backdrop-blur-[2px] border border-primary/30 py-1.5 px-4 rounded-full mb-3 lg:mb-6">
                <span className="text-sm sm:text-base text-white/90">{ABOUT_CONSTANTS.hero.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 lg:mb-6 font-sans leading-tight">
                Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">We Are</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-white/80 leading-relaxed max-w-2xl">
                {ABOUT_CONSTANTS.hero.summary}
              </p>
            </div>
          </div>
          {/* Image — bottom 60% on mobile, right 60% on desktop */}
          <div className="relative w-full overflow-hidden">
            <img
              src={ABOUT_CONSTANTS.hero.heroImageSrc}
              alt={ABOUT_CONSTANTS.hero.heroImageAlt}
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
          <div className="relative w-full min-h-[45vh] sm:min-h-[52vh] lg:min-h-0 lg:h-full order-1 lg:order-1 lg:flex-1 flex flex-col">
            <CompanyIdentityCarousel
              blocks={ABOUT_CONSTANTS.companyIdentity.blocks}
              images={[
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu.png",
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu1.png",
                "/assets/abstracts/Highresolution_abstract_digital_art_for_web_compon_delpmaspu2.png",
              ]}
              imagePositions={["right center", "left center", "right center"]}
            />
          </div>
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pr-16 xl:pr-24 2xl:pr-32 py-7 lg:py-12 order-2 lg:order-2 min-h-0">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans mb-2 lg:mb-4">
                Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Identity</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                {ABOUT_CONSTANTS.companyIdentity.sectionSubtitle}
              </p>
              <div className="mt-4 lg:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-cta font-sans">
                {ABOUT_CONSTANTS.companyIdentity.blocks.length} Pillars
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Journey</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 mt-2">{ABOUT_CONSTANTS.journey.intro}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent font-sans">32+</div>
              <div className="text-sm sm:text-base text-white/70 font-medium">Years of Excellence</div>
            </div>
          </div>
          <HorizontalTimeline events={ABOUT_CONSTANTS.journey.events} />
        </div>
        </ScrollReveal>
      </section>

      {/* Identity: Mission | Vision — 50/50 grid, right panel full height */}
      <section id="vision-mission" className={sectionClass}>
        <DecorativeBlob className="-bottom-24 -left-24 opacity-20" />
        <div className="flex-1 min-h-0 w-full h-full flex flex-col">
        <ScrollReveal direction="up" delay={0} className="h-full flex-1 min-h-0 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full h-full min-h-0 flex-1">
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 2xl:pl-32 py-8 lg:py-12 order-2 lg:order-1">
            <div className="max-w-2xl mx-auto lg:mx-0 space-y-4 lg:space-y-8">
              <div className="card p-4 sm:p-6 lg:p-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl pointer-events-none" />
                <h2 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 lg:mb-4 font-sans">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Mission</span></h2>
                <p className="relative z-10 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  {ABOUT_CONSTANTS.identity.mission}
                </p>
              </div>
              <div className="card p-4 sm:p-6 lg:p-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl pointer-events-none" />
                <h2 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 lg:mb-4 font-sans">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Vision</span></h2>
                <p className="relative z-10 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  {ABOUT_CONSTANTS.identity.vision}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-full h-full min-h-0 relative overflow-hidden order-1 lg:order-2 flex-1">
            <img
              src="/assets/abstracts/Abstract_isometric_grid_of_interconnected_hexagons_delpmaspu.png"
              alt="Telecommunications and connectivity"
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
                Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Strengths</span>
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mt-2">{ABOUT_CONSTANTS.coreStrengths.intro}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary font-sans">6</div>
              <div className="text-sm sm:text-base text-white/70 font-medium">Core Capabilities</div>
            </div>
          </div>
          </ScrollReveal>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full"
            style={{ gridAutoRows: 'minmax(100px, 1fr)' }}
          >
            {ABOUT_CONSTANTS.coreStrengths.items.map((strength, index) => (
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">{ABOUT_CONSTANTS.whyUs.sectionTitle}</h2>
              <p className="text-lg text-white/80 max-w-2xl mt-2">{ABOUT_CONSTANTS.whyUs.sectionSubtitle}</p>
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
            {ABOUT_CONSTANTS.whyUs.valueProps.map((prop, index) => (
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
        <div className="grid grid-rows-[2fr_3fr] grid-cols-1 lg:grid-rows-none lg:grid-cols-[2fr_3fr] gap-0 w-full h-screen lg:h-full flex-1 min-h-0">
          {/* Image — top 40% on mobile, left 40% on desktop */}
          <div className="relative w-full overflow-hidden">
            <img
              src="/assets/abstracts/Abstract_web_background_minimalist_neural_network__delpmaspu.png"
              alt="Advanced telecommunications network"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/20 to-secondary/20 pointer-events-none" />
          </div>
          {/* Text — bottom 60% on mobile, right 60% on desktop */}
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 2xl:pl-32 py-5 lg:py-12 overflow-y-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                    Competitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Edge</span>
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 max-w-md mt-2">
                    {ABOUT_CONSTANTS.competitiveEdge.sectionSubtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cta font-sans">5</div>
                  <div className="text-sm sm:text-base text-white/70 font-medium">Key Advantages</div>
                </div>
              </div>
              <ul className="text-xs sm:text-sm lg:text-base text-white/80 flex flex-col gap-3">
                {ABOUT_CONSTANTS.competitiveEdge.items.map((item, i) => (
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
      <section id="cta" className={sectionClass}>
        <DecorativeBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <ScrollReveal direction="up" delay={0} className="w-full flex-1 flex flex-col justify-center items-center min-h-0">
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl w-full flex flex-col justify-center items-center text-center py-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-md mb-3 lg:mb-4 font-sans">
              Ready to Learn More?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/95 drop-shadow-sm mb-5 lg:mb-8">
              {ABOUT_CONSTANTS.cta.body}
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <span>Contact Us</span>
              <span className="p-0.5 group-hover:translate-x-0.5">
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

