import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Zap, 
  Settings, 
  Rocket, 
  Wrench, 
  DollarSign, 
  Monitor, 
  Code, 
  LayoutGrid, 
  Server, 
  Brain,
  Cloud,
  BarChart3,
  Network,
  Cpu,
  Building2,
  Shield,
  Building,
  Factory,
  Plane,
  Ship,
  Car,
  Train,
  Activity,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import Footer from '../components/Footer';

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
  icon: React.ReactNode;
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
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="text-[#44C8F5] mb-4 flex justify-center" style={{ marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
        {React.cloneElement(icon as React.ReactElement, { 
          style: { width: 'clamp(1.25rem, 2.5vh, 1.625rem)', height: 'clamp(1.25rem, 2.5vh, 1.625rem)' }
        })}
      </div>
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

// Compound Component: Tech Stack Card with Z-pattern layout
const TechStackCard = ({ icon, title, description, image, index, isReversed }: {
  icon: React.ReactNode;
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
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/60 via-transparent to-transparent" />
        </div>
      </div>
      <div className={`${isReversed ? 'md:col-start-1 md:row-start-1' : ''} ${!isReversed ? 'md:text-right' : ''}`}>
        <div className={`text-[#44C8F5] mb-4 inline-flex rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 ${!isReversed ? 'md:ml-auto' : ''}`} style={{
          padding: 'clamp(0.5rem, 1vh, 0.75rem)',
          marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
          borderRadius: 'clamp(0.5rem, 1vh, 0.75rem)'
        }}>
          {React.cloneElement(icon as React.ReactElement, { 
            style: { width: 'clamp(2rem, 4vh, 3rem)', height: 'clamp(2rem, 4vh, 3rem)' }
          })}
        </div>
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
  industries: Array<{ name: string; icon: React.ReactNode; description?: string }>;
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
          className="w-full h-full object-cover"
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
                <div className="text-[#44C8F5]">
                  {React.cloneElement(industry.icon as React.ReactElement, { 
                    style: { width: 'clamp(1rem, 2vh, 1.5rem)', height: 'clamp(1rem, 2vh, 1.5rem)' }
                  })}
                </div>
                <span className="font-medium text-white" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>{industry.name}</span>
              </div>
              <ChevronDown 
                className={`text-white/60 transition-transform ${
                  openItems.has(index) ? 'rotate-180' : ''
                }`}
                style={{ width: 'clamp(1rem, 2vh, 1.25rem)', height: 'clamp(1rem, 2vh, 1.25rem)' }}
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
      icon: <Settings className="w-8 h-8" />,
      title: "Design",
      description: "Requirements gathering, site surveys, and feasibility studies."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deploy",
      description: "Execution with in-house engineering and trusted partners."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Manage",
      description: "AMC/SLA support for system longevity."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Tailor-Made",
      description: "Custom AI and software solutions beyond off-the-shelf products."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Cutting",
      description: "Reducing manpower and operational costs through integration."
    }
  ];

  const subSolutions = [
    { 
      name: "Control Room Furniture", 
      icon: <Monitor className="w-6 h-6" />,
      description: "Ergonomic and functional control room furniture designed for 24/7 operations, ensuring comfort and efficiency for operators managing critical systems.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Software", 
      icon: <Code className="w-6 h-6" />,
      description: "Custom software solutions tailored to your command and control needs, providing intuitive interfaces and powerful analytics capabilities.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Video Walls", 
      icon: <LayoutGrid className="w-6 h-6" />,
      description: "High-resolution video wall systems for real-time monitoring and visualization, enabling comprehensive oversight of all critical operations.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Servers", 
      icon: <Server className="w-6 h-6" />,
      description: "Flexible server infrastructure solutions supporting on-premises, cloud, or hybrid deployments to meet your specific security and scalability requirements.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "AI/Custom Software", 
      icon: <Brain className="w-6 h-6" />,
      description: "Advanced AI-powered custom software solutions that go beyond off-the-shelf products, delivering intelligent automation and predictive insights.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
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
      icon: <Cloud className="w-12 h-12" />,
      title: "Cloud & AI",
      description: "Hybrid architecture and predictive insights for scalable, intelligent operations.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Software & Analytics",
      description: "Advanced dashboards and data-driven decision tools for comprehensive insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Network & Integration",
      description: "Secure communication protocols between ELV and IT systems for seamless operations.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Hardware",
      description: "Enterprise-grade consoles, servers, and physical infrastructure for mission-critical applications.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const publicIndustries = [
    { 
      name: "Smart Cities", 
      icon: <Building2 className="w-6 h-6" />,
      description: "Integrated urban management systems for traffic, utilities, and public safety."
    },
    { 
      name: "Defense", 
      icon: <Shield className="w-6 h-6" />,
      description: "Mission-critical command centers for defense operations and strategic planning."
    },
    { 
      name: "Transportation", 
      icon: <Train className="w-6 h-6" />,
      description: "Traffic management and logistics control systems for efficient transportation networks."
    },
    { 
      name: "Healthcare", 
      icon: <Activity className="w-6 h-6" />,
      description: "Hospital command centers and emergency response coordination systems."
    },
    { 
      name: "Energy & Utilities", 
      icon: <Zap className="w-6 h-6" />,
      description: "Power grid monitoring and utility management for reliable energy distribution."
    }
  ];

  const corporateIndustries = [
    { 
      name: "Banking & Finance", 
      icon: <DollarSign className="w-6 h-6" />,
      description: "Trading floors and financial operations centers for real-time market monitoring."
    },
    { 
      name: "Manufacturing", 
      icon: <Factory className="w-6 h-6" />,
      description: "Production control rooms and quality assurance monitoring systems."
    },
    { 
      name: "Aviation", 
      icon: <Plane className="w-6 h-6" />,
      description: "Air traffic control and airport operations management centers."
    },
    { 
      name: "Maritime", 
      icon: <Ship className="w-6 h-6" />,
      description: "Port operations and vessel traffic management systems."
    },
    { 
      name: "Automotive", 
      icon: <Car className="w-6 h-6" />,
      description: "Manufacturing control centers and supply chain coordination systems."
    },
    { 
      name: "Corporate Offices", 
      icon: <Building className="w-6 h-6" />,
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

      {/* Background gradient */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative overflow-hidden scroll-mt-20"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 w-full">
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
                <Zap className="text-[#A6CE39]" style={{ width: 'clamp(14px, 1.5vh, 16px)', height: 'clamp(14px, 1.5vh, 16px)' }} />
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                  alt="Command & Control Operations Center"
                  className="w-full h-full object-cover"
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
          minHeight: '100dvh',
          paddingTop: 'clamp(2rem, 4vh, 4rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)'
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
                      className="w-full h-full object-cover"
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
                  <ChevronLeft className="group-hover:translate-x-[-2px] transition-transform" style={{ width: 'clamp(0.875rem, 1.75vh, 1rem)', height: 'clamp(0.875rem, 1.75vh, 1rem)' }} />
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
                  <ChevronRight className="group-hover:translate-x-[2px] transition-transform" style={{ width: 'clamp(0.875rem, 1.75vh, 1rem)', height: 'clamp(0.875rem, 1.75vh, 1rem)' }} />
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
                    index === activeSubSolutionIndex ? 'text-[#44C8F5]' : 'text-white/70'
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

      {/* Section 2: Technology Stack - Z-Pattern Layout */}
      <section 
        id="tech-stack" 
        className="relative scroll-mt-20"
        style={{
          minHeight: '100dvh',
          paddingTop: 'clamp(2rem, 4vh, 4rem)',
          paddingBottom: 'clamp(7rem, 14vh, 9rem)'
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
              fontSize: 'clamp(1.75rem, 4vh, 3rem)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
            }}>
              The Backbone of Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Command & Control Solution</span>
            </h2>
          </motion.div>

          <div style={{ gap: 'clamp(7rem, 14vh, 9rem)', display: 'flex', flexDirection: 'column' }}>
            {techStack.map((tech, index) => (
              <TechStackCard
                key={tech.title}
                icon={tech.icon}
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
          minHeight: '100dvh',
          paddingTop: 'clamp(2rem, 4vh, 4rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)'
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
              image="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80"
            />
            <IndustryAccordion
              title="Corporate & Enterprise"
              industries={corporateIndustries}
              image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
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
