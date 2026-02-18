import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  Target,
  Eye,
  Heart,
  Award,
  Calendar,
  ArrowRight,
  Network,
  Rocket,
  Shield,
  CheckCircle,
  Zap,
  Users
} from 'lucide-react';
import Footer from '../components/Footer';
import HorizontalTimeline from '../components/HorizontalTimeline';

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

// Compound Component: Identity Card
const IdentityCard = ({ icon, title, description, index }: {
  icon: React.ReactNode;
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
      <div className="text-white/40 mb-4 inline-flex" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
        {React.cloneElement(icon as React.ReactElement, { 
          style: { width: 'clamp(1rem, 2vh, 1.25rem)', height: 'clamp(1rem, 2vh, 1.25rem)' }
        })}
      </div>
      <h3 className="font-bold text-white mb-3" style={{ 
        fontSize: 'clamp(1.125rem, 2.25vh, 1.5rem)',
        marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
      }}>{title}</h3>
      <p className="text-white/80 leading-relaxed" style={{ 
        fontSize: 'clamp(0.875rem, 1.5vh, 1rem)',
        lineHeight: '1.6'
      }}>{description}</p>
    </motion.div>
  );
};


// Compound Component: Strength Card
const StrengthCard = ({  title, description, index }: {
  // icon: React.ReactNode;
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
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col"
      style={{
        padding: 'clamp(1.25rem, 2.5vh, 2rem)',
        borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
      }}
    >
      {/* <div className="text-[#44C8F5] mb-4 inline-flex p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
        {icon}
      </div> */}
      <h3 className="font-bold text-white mb-3" style={{ 
        fontSize: 'clamp(1rem, 2vh, 1.25rem)',
        marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
      }}>{title}</h3>
      <p className="text-white/70 leading-relaxed" style={{ 
        fontSize: 'clamp(0.8125rem, 1.5vh, 0.875rem)',
        lineHeight: '1.6'
      }}>{description}</p>
    </motion.div>
  );
};

// Compound Component: Value Prop Item
const ValuePropItem = ({ icon, title, description, index }: {
  icon: React.ReactNode;
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
      className="flex items-start"
      style={{ gap: 'clamp(0.75rem, 1.5vh, 1rem)' }}
    >
      <div className="text-[#A6CE39] mt-1 flex-shrink-0">
        {React.cloneElement(icon as React.ReactElement, { 
          style: { width: 'clamp(1.25rem, 2.5vh, 1.5rem)', height: 'clamp(1.25rem, 2.5vh, 1.5rem)' }
        })}
      </div>
      <div>
        <h4 className="font-bold text-white mb-2" style={{ 
          fontSize: 'clamp(1rem, 2vh, 1.125rem)',
          marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)'
        }}>{title}</h4>
        <p className="text-white/80 leading-relaxed" style={{ 
          fontSize: 'clamp(0.875rem, 1.5vh, 1rem)',
          lineHeight: '1.6'
        }}>{description}</p>
      </div>
    </motion.div>
  );
};

function AboutUsPage() {
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

  // Company Identity Values
  const identityValues = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Core Values",
      description: "We believe clarity drives confidence through transparent communication and aligned actions. Respect guides our engagement with colleagues, customers, and partners, fostering trust and mutual growth. Our commitment defines our reliability—we take ownership of every promise, consistently delivering quality, value, and results that strengthen long-term partnerships."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Innovation & Quality",
      description: "We strive for innovation that drives progress, developing advanced communication technologies that connect people and empower businesses. Our commitment to quality ensures reliable, high-performance solutions that meet evolving needs. We believe in making a positive difference, fostering economic development and enhancing quality of life in every community we serve."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Customer Excellence",
      description: "We see every customer relationship as a partnership built on understanding, innovation, and shared success. By listening first and designing with purpose, we create smart, customized solutions that turn challenges into opportunities. Our drive for excellence pushes us beyond expectations, delivering experiences that empower businesses, elevate performance, and enrich everyday life."
    }
  ];


  // Core Strengths (6 items for 3x2 grid)
  const coreStrengths = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "32+ Years of Experience",
      description: "Three decades of expertise in telecommunications, system integration, and legacy-to-digital migration across diverse industries."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Legacy-to-Digital Migration",
      description: "Specialized expertise in seamlessly transitioning legacy systems to modern digital infrastructure without disrupting operations."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agile Delivery",
      description: "Senior-led teams that adapt quickly to changing requirements, delivering solutions on time and within budget with precision."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Senior-Led Teams",
      description: "Experienced professionals at the helm, ensuring every project benefits from deep industry knowledge and technical excellence."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk-Free Migration",
      description: "Proven methodologies that minimize risk during system transitions, protecting your operations while enabling transformation."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Track Record",
      description: "Successfully delivered projects across defense, infrastructure, banking, and enterprise sectors with measurable results."
    }
  ];

  // Journey Timeline Events
  const journeyEvents = [
    {
      date: "1994",
      title: "First Cloud Service",
      description: "Offer Worldspan ticketing system as service in the kingdom to travel agencies over STC legacy technology X.25 and connected with the world servers 700+ agencies"
    },
    {
      date: "1998",
      title: "First DID/DOD Service",
      description: "STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pregain solution and serve more than 2500+ key customer"
    },
    {
      date: "2002",
      title: "First MPLS Technology",
      description: "We have reseller agreement with STC to serve the customer with MPLS and connect their head office with the branch office through our solutions 300+ branches"
    },
    {
      date: "2009",
      title: "First SIP Trunk",
      description: "We provided with STC the new technology for DID/DOD service the SIP trunk providing the solution to 450+ customer"
    },
    {
      date: "2012",
      title: "STC NGN Migration",
      description: "Provide STC with the solution to migrate their Key customer from the DDN technology to NGN as MODA, RSAF, RSAD 1550+ Links"
    },
    {
      date: "2016",
      title: "STC Hazm Room",
      description: "htc have been chosen by STC, MODA and RSADF to provide off hook service to all the remote areas during the Hazm War over different technologies IPMPLS, MW and VSAT over 500+ links"
    },
    {
      date: "2022",
      title: "STC Service Concept and 2 Contract",
      description: "Work with STC to launch new service concept for Digital convertors over PLL service with the current to project to serve the key customer. Key customer Active equipment project (exclusive for htc) Customer premises equipment project"
    }
  ];

  // Value Proposition
  const valueProps = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Seamless Migration",
      description: "Zero-downtime transitions from legacy to modern systems, ensuring business continuity throughout the transformation process."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Turnkey Projects",
      description: "End-to-end project delivery from design and deployment to ongoing management, eliminating multi-vendor complexity."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Proactive Managed Services",
      description: "Continuous monitoring, maintenance, and optimization of your communication infrastructure to ensure peak performance and reliability."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Agile Delivery, Real-World Fit",
      description: "Our flexible, hands-on teams adapt to your timelines, budgets, and constraints, ensuring projects are delivered efficiently with predictable outcomes."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Tangible Business Impact",
      description: "We focus on results: enhanced productivity, improved customer experience, and stronger performance that support your growth and digital ambitions."
    }
  ];

  // Hero section ref for scroll animations
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      <Helmet>
        <title>About Us - Hajz Telecommunication Co Ltd. | Company Identity & Values</title>
        <meta name="description" content="Learn about HTC's company identity, vision, mission, core strengths, and value proposition. 32+ years of telecommunications excellence." />
      </Helmet>

      {/* Background gradient */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
      
      {/* Section 1: What We Do */}
      <section 
        id="what-we-do" 
        className="relative scroll-mt-20"
        style={{
          minHeight: '100dvh',
          paddingTop: 'clamp(12rem, 24vh, 14rem)',
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
              fontSize: 'clamp(1.75rem, 4vh, 3rem)'
            }}>
              Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Identity</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
              lineHeight: '1.6'
            }}>
                At HTC, our core values of Clarity, Respect, and Commitment define who we are and guide everything we do. These principles shape our approach to every project, partnership, and solution we deliver.
              </p>
          </motion.div>

          {/* Company Identity */}
          <div ref={heroRef} id="company-identity" className="scroll-mt-20" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto"
            style={{ 
              gap: 'clamp(1rem, 2vh, 1.5rem)',
              paddingBottom: 'clamp(5rem, 10vh, 6rem)'
            }}
          >
            {identityValues.map((value, index) => (
              <IdentityCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </motion.div>
          </div>

          {/* Value Proposition */}
          <div id="value-proposition" className="scroll-mt-20" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto text-center"
              style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}
            >
              <h3 className="font-bold text-white mb-4" style={{ 
                fontSize: 'clamp(1.5rem, 3vh, 2.25rem)',
                marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
              }}>
                Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Proposition</span>
              </h3>
              <p className="text-white/80 max-w-3xl mx-auto" style={{ 
                fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                lineHeight: '1.6'
              }}>
                What sets HTC apart in delivering telecommunications excellence
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-3xl mx-auto"
              style={{ gap: 'clamp(1rem, 2vh, 1.5rem)', display: 'flex', flexDirection: 'column' }}
            >
              {valueProps.map((prop, index) => (
                <ValuePropItem
                  key={prop.title}
                  icon={prop.icon}
                  title={prop.title}
                  description={prop.description}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* Competitive Edge */}
          <div 
            id="competitive-edge" 
            className="scroll-mt-20"
            style={{
              paddingTop: 'clamp(4rem, 8vh, 5rem)',
              paddingBottom: 'clamp(10rem, 20vh, 11rem)'
            }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                style={{
                  padding: 'clamp(1.5rem, 3vh, 2.5rem)',
                  borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
                }}
              >
                <h3 className="font-bold text-white mb-6" style={{ 
                  fontSize: 'clamp(1.5rem, 3vh, 2.25rem)',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                }}>
                  Competitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Edge</span>
                </h3>
                <p className="text-white/80 leading-relaxed mb-6" style={{ 
                  fontSize: 'clamp(0.9375rem, 1.75vh, 1.25rem)',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  lineHeight: '1.6'
                }}>
                  Clients choose HTC for our specialized expertise in risk-free migration and senior-led agile teams. We don't just implement solutions—we engineer them to fit your unique environment, ensuring seamless integration with existing systems while unlocking the full potential of digital transformation.
                </p>
                <p className="text-white/80 leading-relaxed" style={{ 
                  fontSize: 'clamp(0.9375rem, 1.75vh, 1.25rem)',
                  lineHeight: '1.6'
                }}>
                  Our approach combines deep technical knowledge with business acumen, delivering solutions that are not only technically superior but also strategically aligned with your long-term objectives. With 32+ years of experience and a proven track record across critical industries, HTC is the partner you can trust to bridge your legacy infrastructure to a digital future.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Journey */}
      <section 
        id="our-journey" 
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Journey</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
              lineHeight: '1.6'
            }}>
              From our founding to today, we've been at the forefront of telecommunications innovation, delivering groundbreaking solutions that shape the industry.
            </p>
          </motion.div>

          <HorizontalTimeline events={journeyEvents} />
        </div>
      </section>

      {/* Section 3: Vision and Mission */}
      <section 
        id="vision-mission" 
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
              Vision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 items-stretch max-w-6xl mx-auto" style={{ gap: 'clamp(1.5rem, 3vh, 2rem)' }}>
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col"
              style={{
                padding: 'clamp(1.5rem, 3vh, 2.5rem)',
                borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl"></div>
              
              <h2 className="relative z-10 font-bold text-white mb-6" style={{ 
                fontSize: 'clamp(1.5rem, 3vh, 2rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
              }}>
                Our Mission
              </h2>
              <p className="relative z-10 text-white/80 leading-relaxed mb-6" style={{ 
                fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                lineHeight: '1.6'
              }}>
                " Our mission Is to deliver advanced, high-quality communication technology services that enrich the quality of life and foster economic development in the communities we serve. We are committed to providing innovative solutions that positively impact the areas where we operate. "
              </p>
              
              <ul className="relative z-10 text-white/70" style={{ gap: 'clamp(0.5rem, 1vh, 0.75rem)', display: 'flex', flexDirection: 'column' }}>
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#44C8F5',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Empowering communities through cutting-edge communication technology.</span>
                </li>
                
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#7CCCBF',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Driving progress and innovation with high-quality solutions.</span>
                </li>
                
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#A6CE39',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Enhancing connectivity and accessibility to improve daily life and economic growth.</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col"
              style={{
                padding: 'clamp(1.5rem, 3vh, 2.5rem)',
                borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl"></div>
              
              <h2 className="relative z-10 font-bold text-white mb-6" style={{ 
                fontSize: 'clamp(1.5rem, 3vh, 2rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
              }}>
                Our Vision
              </h2>
              <p className="relative z-10 text-white/80 leading-relaxed mb-6" style={{ 
                fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                lineHeight: '1.6'
              }}>
                " Centered around providing tailored solutions to our customers, aiming to address their unique needs and challenges. We are committed to delivering the best possible services and products in the industry, ensuring that they contribute to the enhancement of our customers' businesses and lives. "
              </p>
              
              <ul className="relative z-10 text-white/70" style={{ gap: 'clamp(0.5rem, 1vh, 0.75rem)', display: 'flex', flexDirection: 'column' }}>
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#44C8F5',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Focused on personalized solutions that serves to the unique needs of customers.</span>
                </li>
                
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#7CCCBF',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Dedicated to delivering top-tier services and products that add value.</span>
                </li>
                
                <li className="flex items-center">
                  <div className="rounded-full mr-3" style={{ 
                    width: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    height: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    backgroundColor: '#A6CE39',
                    minWidth: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    minHeight: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    marginRight: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}></div>
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Committed to improving businesses and lives through high-quality offerings.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Core Strengths */}
      <section 
        id="core-strengths" 
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
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Strengths</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto" style={{ 
              fontSize: 'clamp(0.9375rem, 1.75vh, 1.125rem)',
              lineHeight: '1.6'
            }}>
              The foundational capabilities that drive our success and deliver exceptional value to our clients
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto"
            style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}
          >
            {coreStrengths.map((strength, index) => (
              <StrengthCard
                key={strength.title}
                // icon={strength.icon}
                title={strength.title}
                description={strength.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Explore our journey, discover our milestones, and see how we've shaped the telecommunications landscape over three decades.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#A6CE39] text-white px-8 py-4 rounded-lg hover:bg-[#7CCCBF] transition-all duration-300 shadow-lg font-sans text-lg font-medium tracking-wide transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A6CE39] focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <span>Explore Our Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}

export default AboutUsPage;

