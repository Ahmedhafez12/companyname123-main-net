import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  CaretLeft,
  CaretRight,
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

/** Duotone icons for Technical Advantages bento — keyed by `technicalAdvantages[].title`. */
const TECHNICAL_ADVANTAGES_ICON_MAP: Record<
  string,
  React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
> = {
  "Expertise & Experience": Globe,
  "Tailored Solutions": SlidersHorizontal,
  "Security First": ShieldCheck,
  "Future-Proof Architecture": Cpu,
  "End-to-End Support": Lifebuoy,
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
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20";

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(68,200,245,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(0,94,150,0.22),transparent_50%),radial-gradient(ellipse_60%_45%_at_0%_80%,rgba(166,206,57,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Technical{" "}
            <span className="bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5] bg-clip-text text-transparent">
              Advantages
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Hero — first item */}
          <div
            className={[
              cardBase,
              "p-6 sm:p-8 lg:p-10",
              hero.highlight ? "ring-2 ring-[#A6CE39]/30" : "",
            ].join(" ")}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cta md:h-16 md:w-16">
                <TechnicalAdvantagesIcon title={hero.title} size={32} className="text-cta" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                  {hero.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                  {hero.description}
                </p>
              </div>
            </div>
          </div>

          {/* Bento grid — remaining items: 1 col mobile, 2 tablet, 4 desktop */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {rest.map((item) => (
              <article
                key={item.title}
                className={[
                  cardBase,
                  "flex h-full flex-col p-5 sm:p-6",
                  item.highlight ? "ring-2 ring-[#A6CE39]/30" : "",
                ].join(" ")}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cta">
                  <TechnicalAdvantagesIcon title={item.title} size={22} className="text-cta" />
                </div>
                <h4 className="text-base font-bold text-white sm:text-lg">{item.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
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

// Scroll animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Compound Component: Feature Card
const FeatureCard = ({ icon, title, description, image, index }: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col"
      style={{
        padding: 'clamp(0.75rem, 1.5vh, 1.125rem)',
        borderRadius: 'clamp(0.625rem, 1.25vh, 0.875rem)'
      }}
    >
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden bg-white/5" style={{ 
          marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
          height: 'clamp(80px, 10vh, 120px)',
          borderRadius: 'clamp(0.375rem, 0.75vh, 0.625rem)'
        }}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-fill"
            loading="lazy"
          />
        </div>
      )}
      {icon && (
        <div className="text-cta mb-4 flex justify-center items-center" style={{ marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
          <div className="flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, { 
              style: { width: 'clamp(1.25rem, 2.5vh, 1.625rem)', height: 'clamp(1.25rem, 2.5vh, 1.625rem)' }
            })}
          </div>
        </div>
      )}
      <h3 className="font-bold text-white mb-2 text-center" style={{ 
        fontSize: 'clamp(0.875rem, 1.75vh, 1.0625rem)',
        marginBottom: 'clamp(0.25rem, 0.5vh, 0.375rem)'
      }}>{title}</h3>
      <p className="text-white/70 text-center" style={{ 
        fontSize: 'clamp(0.75rem, 1.25vh, 0.8125rem)',
        lineHeight: '1.5'
      }}>{description}</p>
    </motion.div>
  );
};

// Compound Component: Tech Stack Card with Z-pattern layout (no icon when section has images)
const TechStackCard = ({ title, description, image, index, isReversed }: {
  title: string;
  description: string;
  image: string;
  index: number;
  isReversed?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
      className={`grid md:grid-cols-2 items-center ${
        isReversed ? 'md:grid-flow-dense' : ''
      }`}
      style={{
        gap: 'clamp(1.5rem, 3vh, 2rem)',
        marginBottom: 'clamp(2rem, 4vh, 3rem)',
        minHeight: 'clamp(300px, 40vh, 500px)'
      }}
    >
      <div className={isReversed ? 'md:col-start-2' : ''}>
        <div className="relative rounded-xl overflow-hidden bg-white/5" style={{ 
          height: 'clamp(200px, 25vh, 350px)',
          borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
        }}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-fill"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/60 via-transparent to-transparent" />
        </div>
      </div>
      <div className={`${isReversed ? 'md:col-start-1 md:row-start-1' : ''} ${!isReversed ? 'md:text-right' : ''}`}>
        <h3 className="font-bold text-white mb-4" style={{ 
          fontSize: 'clamp(1.25rem, 2.5vh, 1.875rem)',
          marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
        }}>{title}</h3>
        <p className="text-white/80 leading-relaxed" style={{ 
          fontSize: 'clamp(0.875rem, 1.5vh, 1.125rem)',
          lineHeight: '1.6'
        }}>{description}</p>
      </div>
    </motion.div>
  );
};

// Compound Component: Industry Accordion
const IndustryAccordion = ({ title, industries, image }: {
  title: string;
  industries: Array<{ name: string; icon?: React.ReactNode; description?: string }>;
  image: string;
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full flex flex-col"
      style={{
        borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
      }}
    >
      {/* Header with Image */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(150px, 20vh, 200px)' }}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-fill"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/90 via-[#005E96]/50 to-transparent" />
        <h3 className="absolute bottom-6 left-6 right-6 font-bold text-white" style={{ 
          fontSize: 'clamp(1.125rem, 2.25vh, 1.5rem)',
          bottom: 'clamp(0.75rem, 1.5vh, 1.5rem)',
          left: 'clamp(0.75rem, 1.5vh, 1.5rem)',
          right: 'clamp(0.75rem, 1.5vh, 1.5rem)'
        }}>
          {title}
        </h3>
      </div>

      {/* Accordion Items */}
      <div className="flex-1 flex flex-col" style={{ 
        padding: 'clamp(1rem, 2vh, 1.5rem)',
        gap: 'clamp(0.25rem, 0.5vh, 0.5rem)'
      }}>
        {industries.map((industry, index) => (
          <div
            key={industry.name}
            className="border-b border-white/10 last:border-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between text-left hover:bg-white/5 rounded-lg transition-colors"
              style={{
                padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                gap: 'clamp(0.5rem, 1vh, 0.75rem)',
                borderRadius: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}
            >
              <div className="flex items-center" style={{ gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
                {industry.icon && (
                  <div className="text-cta flex items-center justify-center">
                    {React.cloneElement(industry.icon as React.ReactElement, { 
                      style: { width: 'clamp(1rem, 2vh, 1.5rem)', height: 'clamp(1rem, 2vh, 1.5rem)' }
                    })}
                  </div>
                )}
                <span className="font-medium text-white" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>{industry.name}</span>
              </div>
              <div className="p-0.5">
                <CaretDown 
                  weight="bold"
                  size={20}
                  className={`text-white/60 transition-transform ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {openItems.has(index) && industry.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/70"
                style={{
                  paddingLeft: 'clamp(0.75rem, 1.5vh, 1rem)',
                  paddingRight: 'clamp(0.75rem, 1.5vh, 1rem)',
                  paddingBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
                  fontSize: 'clamp(0.8125rem, 1.5vh, 0.875rem)',
                  lineHeight: '1.5'
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

function CommandControlPage() {
  const location = useLocation();

  // Function to scroll to hash element
  const scrollToHash = (hash: string) => {
    if (!hash) return;
    
    const element = document.querySelector(hash);
    if (element) {
      requestAnimationFrame(() => {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offset = 80;
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        });
      });
    }
  };

  // Handle hash on mount and route changes
  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      const attemptScroll = (attempts = 0) => {
        const element = document.querySelector(hash);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80;
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        } else if (attempts < 5) {
          setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
        }
      };
      
      setTimeout(() => attemptScroll(), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const corePillars = [
    {
      icon: <PencilSimple weight="bold" size={20} />,
      title: "Design",
      description: "Requirements gathering, site surveys, and feasibility studies."
    },
    {
      icon: <Rocket weight="bold" size={20} />,
      title: "Deploy",
      description: "Execution with in-house engineering and trusted partners."
    },
    {
      icon: <Gear weight="bold" size={20} />,
      title: "Manage",
      description: "AMC/SLA support for system longevity."
    },
    {
      icon: <Sliders weight="bold" size={20} />,
      title: "Tailor-Made",
      description: "Custom AI and software solutions beyond off-the-shelf products."
    },
    {
      icon: <TrendDown weight="bold" size={20} />,
      title: "Cost Cutting",
      description: "Reducing manpower and operational costs through integration."
    }
  ];

  const technicalAdvantages = [
    {
      title: "Expertise & Experience",
      description:
        "At htc we Have a Team world class Engineers who have consult and deployed command center across the Globe",
      accent: "secondary",
    },
    {
      title: "Tailored Solutions",
      description:
        "Our Solutions/design are 100 % tailor made for Each Requirement; we don’t sell what we have but its customer requirement only",
      accent: "secondary",
    },
    {
      title: "Security First",
      description:
        "Our prime focus during designing solution is, to secure our customer control room and premises and sites by the use of Technologies",
      accent: "secondary",
    },
    {
      title: "Future-Proof Architecture",
      description:
        "Our scalable solutions grow with your business and support emerging technologies like AI and IoT.and can be Scalable for future",
      accent: "secondary",
    },
    {
      title: "End-to-End Support",
      description:
        "From initial planning to post-deployment support, we’re with you every step of the way.",
      accent: "secondary",
    },
  ] as const;

  const subSolutions = [
    { 
      name: "Control Room Furniture", 
      description: "Ergonomic and functional control room furniture designed for 24/7 operations, ensuring comfort and efficiency for operators managing critical systems.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_726d6a0985.jpeg"
    },
    { 
      name: "Software", 
      description: "Custom software solutions tailored to your command and control needs, providing intuitive interfaces and powerful analytics capabilities.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_42589d16b5.jpeg"
    },
    { 
      name: "Video Walls", 
      description: "High-resolution video wall systems for real-time monitoring and visualization, enabling comprehensive oversight of all critical operations.",
      image: "/assets/CommandandControl/Control_room_with_screens_37be293209.jpeg"
    },
    { 
      name: "Servers", 
      description: "Flexible server infrastructure solutions supporting on-premises, cloud, or hybrid deployments to meet your specific security and scalability requirements.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_c6f6c6bbe5.jpeg"
    },
    { 
      name: "AI/Custom Software", 
      description: "Advanced AI-powered custom software solutions that go beyond off-the-shelf products, delivering intelligent automation and predictive insights.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_b715a93b98.jpeg"
    }
  ];

  const [activeSubSolutionIndex, setActiveSubSolutionIndex] = useState(0);

  const handleNextSubSolution = () => {
    setActiveSubSolutionIndex((prev) => (prev + 1) % subSolutions.length);
  };

  const handlePrevSubSolution = () => {
    setActiveSubSolutionIndex((prev) => (prev - 1 + subSolutions.length) % subSolutions.length);
  };

  const techStack = [
    {
      title: "Cloud & AI",
      description: "Hybrid architecture and predictive insights for scalable, intelligent operations.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_33e9818a2b.jpeg"
    },
    {
      title: "Software & Analytics",
      description: "Advanced dashboards and data-driven decision tools for comprehensive insights.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_f1c5ecea36.jpeg"
    },
    {
      title: "Server On-premises/Cloud/Hybrid",
      description: "Secure communication protocols between ELV and IT systems for seamless operations.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_92c4643513.jpeg"
    },
    {
      title: "Hardware",
      description: "Enterprise-grade consoles, servers, and physical infrastructure for mission-critical applications.",
      image: "/assets/CommandandControl/Modern_premium_corporate_photography_for_a_network_db5915e486.jpeg"
    }
  ];

  const publicIndustries = [
    { 
      name: "Smart Cities", 
      description: "Integrated urban management systems for traffic, utilities, and public safety."
    },
    { 
      name: "Defense", 
      description: "Mission-critical command centers for defense operations and strategic planning."
    },
    { 
      name: "Transportation", 
      description: "Traffic management and logistics control systems for efficient transportation networks."
    },
    { 
      name: "Healthcare", 
      description: "Hospital command centers and emergency response coordination systems."
    },
    { 
      name: "Energy & Utilities", 
      description: "Power grid monitoring and utility management for reliable energy distribution."
    }
  ];

  const corporateIndustries = [
    { 
      name: "Banking & Finance", 
      description: "Trading floors and financial operations centers for real-time market monitoring."
    },
    { 
      name: "Manufacturing", 
      description: "Production control rooms and quality assurance monitoring systems."
    },
    { 
      name: "Aviation", 
      description: "Air traffic control and airport operations management centers."
    },
    { 
      name: "Maritime", 
      description: "Port operations and vessel traffic management systems."
    },
    { 
      name: "Automotive", 
      description: "Manufacturing control centers and supply chain coordination systems."
    },
    { 
      name: "Corporate Offices", 
      description: "Enterprise command centers for facilities management and security operations."
    }
  ];

  // Hero section ref for scroll animations
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      <Helmet>
        <title>Command & Control - Hajz Telecommunication Co Ltd. | Advanced Control Solutions</title>
        <meta name="description" content="Comprehensive Command & Control solutions connecting ELV and IT systems for intelligent automation and improved performance." />
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative overflow-hidden scroll-mt-20"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(5rem, 10vh, 6rem)'
        }}
      >
        {/* Hero-only overlay so content below is not faded */}
        <div className="absolute inset-0 bg-[#005E96] opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 w-full relative z-10">
          <div 
            className="grid lg:grid-cols-2 items-center"
            style={{ gap: 'clamp(1.5rem, 3vh, 2rem)' }}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <div 
                className="inline-flex items-center bg-white/5 backdrop-blur-[2px] border border-white/10 mb-6"
                style={{
                  padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.75rem, 1.5vh, 1rem)',
                  gap: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                  borderRadius: '9999px',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                }}
              >
                <span className="text-white/90" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>Command & Control</span>
              </div>
              
              <h1 className="font-bold text-white mb-6" style={{ 
                fontSize: 'clamp(2rem, 5vh, 3.75rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                lineHeight: '1.2'
              }}>
                Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">& Control</span>
              </h1>
              <p className="text-white/80 mb-12" style={{ 
                fontSize: 'clamp(1rem, 2vh, 1.25rem)',
                marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
                lineHeight: '1.6'
              }}>
                Connecting the dots between your ELV and other systems—ensuring smooth data flow, improved performance, and intelligent automation.
              </p>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div 
                className="relative w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
                style={{
                  height: 'clamp(300px, 40vh, 500px)',
                  borderRadius: 'clamp(1rem, 2vh, 1.5rem)'
                }}
              >
                <img 
                  src="/assets/CommandandControl/Control_room_with_screens_9c4c709e86.jpeg"
                  alt="Command & Control Operations Center"
                  className="w-full h-full object-fill"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: Our Core Solutions */}
      <section 
        id="core-solutions" 
        className="relative scroll-mt-20"
        style={{
          paddingTop: 'clamp(7rem, 14vh, 9rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.5rem, 3vh, 2.25rem)' }}
          >
            <h2 className="font-bold text-white mb-4" style={{ 
              fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)',
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
            }}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Core Solutions</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.875rem, 1.5vh, 1rem)',
              lineHeight: '1.6'
            }}>
              We connect the dots between your ELV and other systems—ensuring smooth data flow, improved performance, and intelligent automation.
            </p>
          </motion.div>

          {/* Process Flow Grid with Images */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-5"
            style={{ gap: 'clamp(0.75rem, 1.5vh, 1.125rem)', marginBottom: 'clamp(1.25rem, 2.5vh, 1.875rem)' }}
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

          {/* Sub-solutions Hero Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Hero Carousel Container */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden" style={{
              borderRadius: 'clamp(0.875rem, 1.75vh, 1.25rem)',
              height: 'clamp(280px, 36vh, 400px)'
            }}>
              {/* Main Featured Solution */}
              <motion.div
                key={activeSubSolutionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full"
                style={{ height: '100%' }}
              >
                <div className="flex flex-col lg:flex-row h-full" style={{ height: '100%' }}>
                  {/* Image Section - 40% */}
                  <div className="w-full lg:w-[40%] relative" style={{ height: '100%' }}>
                    <motion.img
                      key={`img-${activeSubSolutionIndex}`}
                      src={subSolutions[activeSubSolutionIndex].image}
                      alt={subSolutions[activeSubSolutionIndex].name}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-fill"
                      style={{ height: '100%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#005E96]/60 via-[#005E96]/20 to-transparent lg:from-[#005E96]/40 lg:via-transparent" />
                  </div>

                  {/* Text Section - 60% */}
                  <div className="w-full lg:w-[60%] flex flex-col justify-center overflow-hidden" style={{ 
                    padding: 'clamp(1.125rem, 2.25vh, 2.25rem)',
                    height: '100%'
                  }}>
                    <h4 className="font-bold text-white mb-4" style={{ 
                      fontSize: 'clamp(1rem, 2vh, 1.75rem)',
                      marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
                      lineHeight: '1.3'
                    }}>
                      {subSolutions[activeSubSolutionIndex].name}
                    </h4>
                    <p className="text-white/80 leading-relaxed" style={{ 
                      fontSize: 'clamp(0.8125rem, 1.25vh, 0.9375rem)',
                      lineHeight: '1.6'
                    }}>
                      {subSolutions[activeSubSolutionIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-0 flex items-center" style={{ paddingLeft: 'clamp(0.375rem, 0.75vw, 0.75rem)' }}>
                <button
                  onClick={handlePrevSubSolution}
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white group"
                  aria-label="Previous solution"
                  style={{
                    width: 'clamp(1.625rem, 3.25vh, 2rem)',
                    height: 'clamp(1.625rem, 3.25vh, 2rem)'
                  }}
                >
                  <div className="p-0.5 group-hover:translate-x-[-2px] transition-transform">
                    <CaretLeft weight="bold" size={20} />
                  </div>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center" style={{ paddingRight: 'clamp(0.375rem, 0.75vw, 0.75rem)' }}>
                <button
                  onClick={handleNextSubSolution}
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white group"
                  aria-label="Next solution"
                  style={{
                    width: 'clamp(1.625rem, 3.25vh, 2rem)',
                    height: 'clamp(1.625rem, 3.25vh, 2rem)'
                  }}
                >
                  <div className="p-0.5 group-hover:translate-x-[2px] transition-transform">
                    <CaretRight weight="bold" size={20} />
                  </div>
                </button>
              </div>

              {/* Indicator Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex" style={{ 
                bottom: 'clamp(0.625rem, 1.25vh, 1.125rem)',
                gap: 'clamp(0.1875rem, 0.375vh, 0.375rem)'
              }}>
                {subSolutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSubSolutionIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeSubSolutionIndex
                        ? 'bg-[#44C8F5]'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to solution ${index + 1}`}
                    style={{
                      width: index === activeSubSolutionIndex ? 'clamp(1.25rem, 2.5vh, 1.625rem)' : 'clamp(0.3125rem, 0.625vh, 0.4375rem)',
                      height: 'clamp(0.3125rem, 0.625vh, 0.4375rem)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {/* <div className="mt-6 mb-12 flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {subSolutions.map((solution, index) => (
                <button
                  key={solution.name}
                  onClick={() => setActiveSubSolutionIndex(index)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg border transition-all duration-300 ${
                    index === activeSubSolutionIndex
                      ? 'bg-white/10 border-[#44C8F5]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`mb-2 transition-colors ${
                    index === activeSubSolutionIndex ? 'text-cta' : 'text-white/70'
                  }`}>
                    {solution.icon}
                  </div>
                  <span className={`text-xs font-medium text-center max-w-[100px] transition-colors ${
                    index === activeSubSolutionIndex ? 'text-white' : 'text-white/70'
                  }`}>
                    {solution.name}
                  </span>
                </button>
              ))}
            </div> */}
          </motion.div>
        </div>
      </section>

      <TechnicalAdvantagesBento items={technicalAdvantages} />


      {/* Section 2: Technology Stack - Z-Pattern Layout */}
      <section 
        id="tech-stack" 
        className="relative scroll-mt-20"
        style={{
          minHeight: '100dvh',
          paddingTop: 'clamp(7rem, 14vh, 9rem)',
          paddingBottom: 'clamp(3rem, 6vh, 5rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
            style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
          >
            <h2 className="font-bold text-white mb-4" style={{ 
              fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)',
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
            }}>
              The Backbone of Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Command & Control Solution</span>
            </h2>
          </motion.div>

          <div style={{ gap: 'clamp(7rem, 14vh, 9rem)', display: 'flex', flexDirection: 'column' }}>
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

      {/* Section 3: Industries We Serve - Accordion Layout */}
      <section 
        id="industries-served" 
        className="relative scroll-mt-20"
        style={{
          paddingTop: 'clamp(7rem, 14vh, 9rem)',
          paddingBottom: 'clamp(7rem, 14vh, 9rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}
          >
            <h2 className="font-bold text-white mb-4" style={{ 
              fontSize: 'clamp(1.75rem, 4vh, 3rem)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
            }}>
              Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">We Serve</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2" style={{ 
            gap: 'clamp(1rem, 2vh, 1.5rem)',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)'
          }}>
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

          {/* Footer Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-white/90 font-medium italic" style={{ 
              fontSize: 'clamp(1rem, 2vh, 1.25rem)',
              lineHeight: '1.6'
            }}>
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
