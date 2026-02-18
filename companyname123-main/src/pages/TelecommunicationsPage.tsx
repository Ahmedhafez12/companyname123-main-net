import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Network,
  Shield,
  Rocket,
  ArrowRight
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

// Compound Component: Business Unit Section with Z-pattern
const BusinessUnitSection = ({ title, description, image, index, isReversed, id }: {
  title: string;
  description: string;
  image: string;
  index: number;
  isReversed?: boolean;
  id?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
      className={`grid md:grid-cols-2 items-center scroll-mt-20 ${
        isReversed ? 'md:grid-flow-dense' : ''
      }`}
      style={{
        gap: 'clamp(1.5rem, 3vh, 2rem)',
        marginBottom: 'clamp(2rem, 4vh, 3rem)',
        minHeight: 'clamp(400px, 50vh, 600px)'
      }}
    >
      <div className={isReversed ? 'md:col-start-2' : ''}>
        <div className="relative rounded-xl overflow-hidden bg-white/5" style={{ height: 'clamp(250px, 30vh, 400px)', borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/60 via-transparent to-transparent" />
        </div>
      </div>
      <div className={`${isReversed ? 'md:col-start-1 md:row-start-1' : ''} ${!isReversed ? 'md:text-right' : ''} flex flex-col`}>
        <h3 className="font-bold text-white mb-4" style={{ 
          fontSize: 'clamp(1.25rem, 2.5vh, 1.875rem)',
          marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
        }}>{title}</h3>
        <p className="text-white/80 leading-relaxed mb-6 flex-grow" style={{ 
          fontSize: 'clamp(0.875rem, 1.5vh, 1.125rem)',
          marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
          lineHeight: '1.6'
        }}>{description}</p>
        <div className={`${!isReversed ? 'md:flex md:justify-end' : ''}`}>
          <a 
            href={`/assets/htc_Overview-${index + 1}.pdf`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 group"
            style={{
              padding: 'clamp(0.6rem, 1.2vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
              fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
            }}
          >
            <span>Learn More</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" style={{ width: 'clamp(14px, 1.5vh, 16px)', height: 'clamp(14px, 1.5vh, 16px)' }} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Compound Component: Service Hallmark Card
const HallmarkCard = ({ title, description, index }: {
//   icon: React.ReactNode;
  title: string;
  description: string;
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
      transition={{ delay: index * 0.15 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col"
      style={{
        padding: 'clamp(1.25rem, 2.5vh, 2rem)',
        borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
      }}
    >
      {/* <div className="text-[#44C8F5] mb-4 inline-flex p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
        {icon}
      </div> */}
      <h3 className="font-bold text-white mb-4" style={{ 
        fontSize: 'clamp(1.125rem, 2.25vh, 1.5rem)',
        marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
      }}>{title}</h3>
      <p className="text-white/80 leading-relaxed" style={{ 
        fontSize: 'clamp(0.875rem, 1.5vh, 1.125rem)',
        lineHeight: '1.6'
      }}>{description}</p>
    </motion.div>
  );
};

function TelecommunicationsPage() {
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

  // Telecommunication Business Unit Sections
  const businessUnits = [
    {
      title: "System Integration",
      description: "We design our solutions to fit your network supporting your digital transformation, not the other way around. Whether your infrastructure is fiber or copper (CAT6, CAT5 or CAT3), we seamlessly connect to it while supporting a full range of interfaces—from legacy E1, STM1, DS3, and RS232 to modern Ethernet and optical. We simplify complex signaling by bridging IP, legacy protocols, and RTP so different systems work together smoothly. With support for IP/MPLS, microwave, and VSAT uplinks, our platforms deliver end-to-end security, high availability, and automatic failover, ensuring your communication remains stable, resilient, and protected.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      id: "system-integration"
    },
    {
      title: "Connectivity and Transmission",
      description: "Break Down Connectivity Barriers, we stop letting incompatible systems dictate your IT strategy. Our intelligent gateway ecosystem transforms infrastructure chaos into competitive advantage seamlessly connecting your data streams, voice communications, legacy investments, and video assets through one unified architecture. No rip-and-replace required, just smart evolution that protects your past while accelerating your future.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      id: "connectivity-transmission"
    },
    {
      title: "Unified Communication",
      description: "We eliminate the false choice between cutting-edge cloud collaboration and your existing hardware investments, seamlessly bridging legacy analog systems, ISDN lines, and modern SIP trunks through enterprise grade gateways while unleashing IP PBX rich suite of video conferencing, mobile apps, and CRM integration across your workforce. Whether you're enabling hybrid teams with crystal-clear connectivity anywhere, plus securing your network with military-grade encryption, our integrated platform future-proofs your communications without the rip-and-replace disruption—delivering enterprise resilience with startup agility, today.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      id: "unified-communication"
    },
    {
      title: "Access LAN and OSP",
      description: "From fiber in the ground to Wi-Fi in the air, we architect the complete connectivity ecosystem that turns infrastructure into competitive advantage delivering hardened Outside Plant foundations, intelligent Enterprise Networking with seamless wired and wireless integration. Whether you're scaling secure Access layers, modernizing core Routers and Switches for software defined agility, or extending high speed connectivity to remote frontiers, our end-to-end portfolio eliminates multi-vendor complexity and accelerates your digital transformation with a single partner that builds the physical pathways and intelligent networks your business demands to thrive in an always on world.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      id: "access-lan-osp"
    },
    {
      title: "Military and Critical Communication",
      description: "Our Military and Critical Communication solutions transform tactical connectivity into decisive combat advantage delivering encrypted hotlines, AES-256 secured voice and fax transmission, and aerial photo distribution. Through NPOX (New Off-Premises Extension), we extend secure C2 capabilities to forward operating bases and mobile warfighters, while NALL (New Analog Lease Line) provides electromagnetic-hardened circuits that guarantee unbroken connectivity when digital networks fail. Integrated with encrypted E1 trunking, agile SIP Distribution systems, and automated early warning platforms, every component of our portfolio is engineered to enhance the combat efficiency of military units ensuring your forces maintain superior situational awareness, seamless coordination, and unwavering command authority.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      id: "military-critical-communication"
    }
  ];

  // Service Standards
  const serviceStandards = [
    {
      icon: <Network className="w-12 h-12" />,
      title: "Seamless Integration & Migration",
      description: "HTC delivers end‑to‑end solutions that are carefully designed to fit each customer's environment, ensuring smooth integration across existing systems, networks, and platforms with minimal disruption to operations."
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Agile Delivery & Reliable Execution",
      description: "Our lean, senior-led teams deliver projects with speed and precision, swiftly adapting to shifting requirements, timelines, and budgets to ensure solutions arrive on time, perform flawlessly, and fit seamlessly into your real-world operations."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Managed, Secure & Always-On Operations",
      description: "HTC goes beyond implementation to actively run and support your environment as a managed service, with proactive monitoring, end‑to‑end security, and built‑in resilience and failover to keep your communications continuously stable, available, and protected."
    }
  ];

  // Hero section ref for scroll animations
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      <Helmet>
        <title>Telecommunications - Hajz Telecommunication Co Ltd. | Advanced Telecommunications Solutions</title>
        <meta name="description" content="Comprehensive telecommunications solutions including system integration, connectivity, unified communication, and critical infrastructure for enterprise and military applications." />
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
                <Network className="text-[#A6CE39]" style={{ width: 'clamp(14px, 1.5vh, 16px)', height: 'clamp(14px, 1.5vh, 16px)' }} />
                <span className="text-white/90" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>Telecommunications</span>
              </div>
              
              <h1 className="font-bold text-white mb-6" style={{ 
                fontSize: 'clamp(2rem, 5vh, 3.75rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                lineHeight: '1.2'
              }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Telecommunications</span> Solutions
              </h1>
              <p className="text-white/80 mb-12" style={{ 
                fontSize: 'clamp(1rem, 2vh, 1.25rem)',
                marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
                lineHeight: '1.6'
              }}>
                Transforming infrastructure chaos into competitive advantage with intelligent connectivity solutions that protect your past while accelerating your future.
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
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
                  alt="Telecommunications Network Infrastructure"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: Telecommunication Business Unit */}
      <section 
        id="business-unit" 
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
            style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
          >
            <h2 className="font-bold text-white mb-4" style={{ 
              fontSize: 'clamp(1.75rem, 4vh, 3rem)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
            }}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Core Solutions</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
              lineHeight: '1.6'
            }}>
              Comprehensive telecommunications solutions designed to meet your enterprise needs
            </p>
          </motion.div>

          <div style={{ gap: 'clamp(2rem, 4vh, 3rem)', display: 'flex', flexDirection: 'column' }}>
            {businessUnits.map((unit, index) => (
              <BusinessUnitSection
                key={unit.title}
                title={unit.title}
                description={unit.description}
                image={unit.image}
                index={index}
                isReversed={index % 2 === 1}
                id={unit.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Service Standards */}
      <section 
        id="service-Standards" 
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
              Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Standards</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
              lineHeight: '1.6'
            }}>
              The three primary strengths that define HTC's telecommunications services
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3"
            style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}
          >
            {serviceStandards.map((hallmark, index) => (
              <HallmarkCard
                key={hallmark.title}
                // icon={hallmark.icon}
                title={hallmark.title}
                description={hallmark.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default TelecommunicationsPage;




