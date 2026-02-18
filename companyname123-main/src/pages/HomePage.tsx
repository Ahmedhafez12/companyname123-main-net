import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Wifi, Cloud, Network, Shield, Database, Server, Cpu, Globe, Target, Award, Users, TrendingUp, Rocket, Monitor, Code, LayoutGrid, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import AnimatedCounter from "../components/AnimatedCounter";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../components/HeroCarousel";

// --- Brand Color Variables ---
const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  highlight: "#7CCCBF",
  cta: "#A6CE39",
  background: "#002C3D",
  white: "#FFFFFF",
  whiteOpacity: {
    "90": "rgba(255, 255, 255, 0.9)",
    "80": "rgba(255, 255, 255, 0.8)",
    "75": "rgba(255, 255, 255, 0.75)",
    "60": "rgba(255, 255, 255, 0.6)",
    "50": "rgba(255, 255, 255, 0.5)",
    "40": "rgba(255, 255, 255, 0.4)",
    "30": "rgba(255, 255, 255, 0.3)",
    "20": "rgba(255, 255, 255, 0.2)",
    "10": "rgba(255, 255, 255, 0.1)",
    "05": "rgba(255, 255, 255, 0.05)",
    "03": "rgba(255, 255, 255, 0.03)",
  },
  secondaryOpacity: {
    "20": "rgba(68, 200, 245, 0.2)",
    "10": "rgba(68, 200, 245, 0.1)",
  },
  highlightOpacity: {
    "20": "rgba(124, 204, 191, 0.2)",
    "10": "rgba(124, 204, 191, 0.1)",
  },
  ctaOpacity: {
    "10": "rgba(166, 206, 57, 0.1)",
  },
  blackOpacity: {
    "37": "rgba(0, 0, 0, 0.37)",
    "20": "rgba(0, 0, 0, 0.2)",
    "15": "rgba(0, 0, 0, 0.15)",
    "10": "rgba(0, 0, 0, 0.1)",
  },
};

// --- Typography Variables ---
const TYPOGRAPHY = {
  heading: '"Rubik", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
};

// --- Fluid Typography Scale (Mobile-First) ---
const FLUID_TYPOGRAPHY = {
  h1: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
  h2: "clamp(2rem, 4vw + 0.75rem, 3.5rem)",
  h3: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
  h4: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)",
};

// --- Services Grid Section Component ---
const ServicesGridSection = styled.section`
  padding: clamp(3rem, 6vh, 6rem) 0;
  width: 100%;
  margin-bottom: 4rem;
  background: transparent;
  overflow: hidden;
`;

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
  overflow-y: hidden;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ServicesTitle = styled(motion.h2)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.75rem, 3.5vh, 2.75rem);
  font-weight: 700;
  text-align: center;
  color: ${BRAND_COLORS.white};
  margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
  
  span {
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ServicesSubtitle = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.9375rem, 1.75vh, 1.125rem);
  text-align: center;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: clamp(2rem, 4vh, 4rem);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CategorySection = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 4vh, 4rem) 0;
  scroll-snap-align: start;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: clamp(1.5rem, 3vh, 2rem) 0;
  }
`;

const CategoryHeader = styled(motion.h3)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.5rem, 3vh, 2.25rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
  margin-top: 0;
  text-align: center;
  position: relative;
  padding-bottom: clamp(1rem, 2vh, 1.5rem);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(60px, 8vw, 80px);
    height: clamp(2px, 0.3vh, 3px);
    background: linear-gradient(90deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta}, ${BRAND_COLORS.secondary});
    border-radius: 2px;
  }
  
  span {
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    position: relative;
  }
`;

const CategoryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.375rem, 0.75vh, 0.5rem);
  padding: clamp(0.625rem, 1.25vh, 0.75rem) clamp(1.25rem, 2.5vh, 1.5rem);
  background: ${BRAND_COLORS.cta};
  color: ${BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.75rem, 1.25vh, 0.875rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: clamp(0.375rem, 0.75vh, 0.5rem);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px ${BRAND_COLORS.ctaOpacity["10"]};
  margin: clamp(1.25rem, 2.5vh, 2rem) auto 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 33.333%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: skewX(-12deg) translateX(-200%);
    transition: transform 0.8s ease-in-out;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${BRAND_COLORS.ctaOpacity["10"]};
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      transform: skewX(-12deg) translateX(400%);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 25vw, 300px), 1fr));
  gap: clamp(1rem, 2vh, 2rem);
  width: 100%;
  overflow: hidden;
  padding-bottom: clamp(1rem, 2vh, 2rem);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 1024px) {
    gap: clamp(1.5rem, 2.5vh, 2.5rem);
    padding-bottom: clamp(1.5rem, 2.5vh, 2.5rem);
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: clamp(0.75rem, 1.5vh, 1rem);
  padding: clamp(1.25rem, 2.5vh, 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  min-height: fit-content;
  overflow: visible;
  height: 100%;
`;

const ServiceIcon = styled.div`
  color: ${BRAND_COLORS.secondary};
  margin-bottom: clamp(1rem, 2vh, 1.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: clamp(2.5rem, 5vh, 3rem);
    height: clamp(2.5rem, 5vh, 3rem);
  }
`;

const ServiceTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1rem, 1.75vh, 1.375rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
  margin-top: 0;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const ServiceDescription = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.8125rem, 1.25vh, 0.9375rem);
  line-height: 1.5;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: clamp(1rem, 2vh, 1.5rem);
  margin-top: 0;
  overflow: visible;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;


const ServicesGridComponent = () => {
  // Category 1: Solutions from SolutionsPage.tsx
  const solutionsPageServices = [
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Managed WiFi",
      description: "Seamless connectivity solutions with centralized management and enhanced security for scalable network operations.",
      link: "/solutions"
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Managed Fixed Wireless Access",
      description: "High-speed wireless broadband with rapid deployment and scalable bandwidth solutions for enterprise needs.",
      link: "/solutions"
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Managed UC",
      description: "Comprehensive unified communication solutions with multi-channel communication and cloud-based collaboration.",
      link: "/solutions"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Infrastructure",
      description: "Scalable network architecture with cloud deployments, automated management, and disaster recovery capabilities.",
      link: "/solutions"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Special MODA Solutions",
      description: "Tailored network deployment with advanced cybersecurity measures and mission-critical connectivity solutions.",
      link: "/solutions"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "RPM (Remote Patient Management)",
      description: "Real-time patient monitoring with secure data transmission and AI-based health analytics for healthcare operations.",
      link: "/solutions"
    },
  ];

  // Category 2: Solutions from CommandControlPage.tsx
  const commandControlServices = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Control Room Furniture",
      description: "Ergonomic and functional control room furniture designed for 24/7 operations, ensuring comfort and efficiency.",
      link: "/what-we-do/command-control"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Software",
      description: "Custom software solutions tailored to your command and control needs with intuitive interfaces and analytics.",
      link: "/what-we-do/command-control"
    },
    {
      icon: <LayoutGrid className="w-12 h-12" />,
      title: "Video Walls",
      description: "High-resolution video wall systems for real-time monitoring and visualization of critical operations.",
      link: "/what-we-do/command-control"
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Servers (On-prem/Cloud/Hybrid)",
      description: "Flexible server infrastructure supporting on-premises, cloud, or hybrid deployments for security and scalability.",
      link: "/what-we-do/command-control"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI/Custom Software",
      description: "Advanced AI-powered custom software solutions delivering intelligent automation and predictive insights.",
      link: "/what-we-do/command-control"
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicesGridSection ref={ref}>
      <ServicesContainer>
        <ServicesTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What <span>We Do</span>
        </ServicesTitle>
        <ServicesSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Enterprise-grade solutions tailored to transform your business operations
        </ServicesSubtitle>
        
        {/* Category 1: Solutions Page Services */}
        <CategorySection>
          <CategoryHeader
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Telecommunications</span> Services
          </CategoryHeader>
          <ServicesGrid>
            {solutionsPageServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <CategoryCTA to="/what-we-do/telecommunications">
              <span>Explore Telecommunications</span>
              <ArrowRight size={16} style={{ width: 'clamp(14px, 1.5vh, 16px)', height: 'clamp(14px, 1.5vh, 16px)' }} />
            </CategoryCTA>
          </motion.div>
        </CategorySection>

        {/* Category 2: Command & Control Services */}
        <CategorySection>
          <CategoryHeader
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span>Command & Control</span> Services
          </CategoryHeader>
          <ServicesGrid>
            {commandControlServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <CategoryCTA to="/what-we-do/command-control">
              <span>Explore Command & Control</span>
              <ArrowRight size={16} style={{ width: 'clamp(14px, 1.5vh, 16px)', height: 'clamp(14px, 1.5vh, 16px)' }} />
            </CategoryCTA>
          </motion.div>
        </CategorySection>
      </ServicesContainer>
    </ServicesGridSection>
  );
};

// --- Value Prop Split Section Component ---
const ValuePropSection = styled.section`
  padding: 3rem 0;
  width: 100%;
  background: transparent;

  @media (min-width: 768px) {
    padding: 4rem 0;
  }
`;

const ValuePropContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
`;

const ValuePropGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const ValuePropLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ValuePropTitle = styled(motion.h2)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: 0.5rem;
  margin-top: 0;
  
  span {
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ValuePropSubtitle = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: 1rem;
  margin-top: 0;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AccordionItem = styled(motion.div)`
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 0.5rem;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${BRAND_COLORS.whiteOpacity["20"]};
  }
`;

const AccordionHeader = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["05"]};
  }
`;

const AccordionTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: 600;
  color: ${BRAND_COLORS.white};
  margin: 0;
  position: relative;
  padding-left: 1.25rem;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${BRAND_COLORS.secondary};
    font-size: 1.25em;
    line-height: 1;
  }
`;

const AccordionIcon = styled(motion.div)`
  color: ${BRAND_COLORS.secondary};
  flex-shrink: 0;
  transition: transform 0.3s ease;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const AccordionText = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.8125rem, 1.25vw, 0.9375rem);
  line-height: 1.5;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0;
  padding: 0 1rem 0.875rem 1rem;
  padding-left: calc(1rem + 1.25rem);
`;

const ValuePropRight = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
`;

const ValuePropImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${BRAND_COLORS.secondaryOpacity["10"]}, ${BRAND_COLORS.ctaOpacity["10"]});
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80") center/cover;
    opacity: 0.3;
    filter: blur(2px);
  }

  &::after {
    content: "Professional Corporate Image";
    position: relative;
    z-index: 1;
    font-family: ${TYPOGRAPHY.body};
    font-size: 1rem;
    color: ${BRAND_COLORS.whiteOpacity["60"]};
    text-align: center;
    padding: 1.5rem;
  }
`;

const ValuePropSplitComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      heading: "Legacy-to-Modern Migration",
      subtext: "Specialist in transitioning from legacy systems to modern, integrated communication platforms with minimal risk and disruption.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      heading: "End-to-End Solutions",
      subtext: "Designs and deploys comprehensive solutions across UC, IP PBX, contact center, gateways, fixed wireless access, and command and control as a single accountable partner.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      heading: "Proactive Managed Services",
      subtext: "Provides ongoing managed services, ensuring your environment is monitored, supported, and continuously optimized for peak performance.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      heading: "Agile, Senior-Led Teams",
      subtext: "Operates with agile, senior-led teams that adapt to your timelines, budgets, and operational constraints, delivering projects efficiently with predictable outcomes.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      heading: "Clear Business Outcomes",
      subtext: "Focuses on measurable results: higher productivity, better customer experience, and improved cost efficiency that support your growth and digital ambitions.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ValuePropSection ref={ref}>
      <ValuePropContainer>
        <ValuePropGrid>
          <ValuePropLeft>
          <ValuePropTitle
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            Why <span>Choose Us</span>
          </ValuePropTitle>
            <ValuePropSubtitle
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover what sets us apart in delivering transformative technology solutions.
            </ValuePropSubtitle>
            <FeatureList>
              {features.map((feature, index) => {
                const isOpen = openIndex === index;
                return (
                  <AccordionItem
                    key={feature.heading}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  >
                    <AccordionHeader
                      onClick={() => toggleAccordion(index)}
                      isOpen={isOpen}
                      aria-expanded={isOpen}
                    >
                      <AccordionTitle>{feature.heading}</AccordionTitle>
                      <AccordionIcon
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={18} />
                      </AccordionIcon>
                    </AccordionHeader>
                    <AnimatePresence>
                      {isOpen && (
                        <AccordionContent
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AccordionText>{feature.subtext}</AccordionText>
                        </AccordionContent>
                      )}
                    </AnimatePresence>
                  </AccordionItem>
                );
              })}
            </FeatureList>
          </ValuePropLeft>
          <ValuePropRight
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ValuePropImagePlaceholder />
          </ValuePropRight>
        </ValuePropGrid>
      </ValuePropContainer>
    </ValuePropSection>
  );
};

// --- Digital Demands Section Component ---
const DigitalDemandsSection = styled.section`
  padding: 6rem 0;
  width: 100%;
  background: transparent;
`;

const DemandsContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
`;

const DemandsTitle = styled(motion.h2)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  color: ${BRAND_COLORS.white};
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const DemandsSubtitle = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-align: center;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DemandsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    gap: 3rem;
  }
`;

const DemandCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
`;

const DemandIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${BRAND_COLORS.secondary};
`;

const DemandHeading = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h3};
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin: 0 0 1rem 0;
`;

const DemandBody = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

const LiquidButton = styled.button`
  position: relative;
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid ${BRAND_COLORS.secondary};
  color: ${BRAND_COLORS.secondary};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-out;
  z-index: 1;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0%;
    background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
    z-index: -1;
    transition: width 0.4s ease;
  }
  
  &:hover {
    color: ${BRAND_COLORS.white};
    border-color: ${BRAND_COLORS.secondary};
    
    &::before {
      width: 100%;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const DigitalDemandsComponent = () => {
  const demands = [
    {
      title: "Reach",
      description: "Extend your network coverage to every corner of your operation with seamless connectivity solutions.",
      // icon: Globe,
    },
    {
      title: "Scale",
      description: "Grow your infrastructure effortlessly with flexible solutions that adapt to your business needs.",
      // icon: TrendingUp,
    },
    {
      title: "Speed",
      description: "Accelerate your operations with high-performance networks designed for maximum efficiency.",
      // icon: Rocket,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <DigitalDemandsSection ref={ref}>
      <DemandsContainer>
        {/* <DemandsTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Digital <span>Demands</span>
        </DemandsTitle>
        <DemandsSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Meeting the evolving needs of modern enterprises with cutting-edge solutions
        </DemandsSubtitle> */}
        <DemandsGrid>
          {demands.map((demand, index) => {
            // const IconComponent = demand.icon;
            return (
              <DemandCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* <DemandIconWrapper>
                  <IconComponent size={48} />
                </DemandIconWrapper> */}
                <DemandHeading>{demand.title}</DemandHeading>
                <DemandBody>{demand.description}</DemandBody>
              </DemandCard>
            );
          })}
        </DemandsGrid>
      </DemandsContainer>
    </DigitalDemandsSection>
  );
};

function HomePage() {
  const contactRef = useRef<HTMLElement>(null); // Ref for the Contact Section

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page starts at the top
  }, []);

  // useEffect(() => {
  //   const observerOptions = {
  //     root: null, // relative to the viewport
  //     rootMargin: "0px",
  //     threshold: 0.2, // Adjust this threshold (e.g., 0.1 to 0.5)
  //     // 0.2 means 20% of the target element must be visible
  //     // to trigger the scrollIntoView. This makes it more
  //     // responsive to scrolling.
  //   };

  //   const observerCallback = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach((entry) => {
  //       // We only want to scroll if the element is entering the viewport from the top
  //       // or just barely intersecting, and it's not already at the top.
  //       // This helps prevent aggressive snapping when scrolling through quickly.
  //       if (
  //         entry.isIntersecting &&
  //         entry.intersectionRatio > 0 &&
  //         entry.boundingClientRect.top < window.innerHeight / 2
  //       ) {
  //         entry.target.scrollIntoView({ behavior: "smooth", block: "start" });
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(
  //     observerCallback,
  //     observerOptions
  //   );

  //   // Observe each section
  //   sectionRefs.forEach((ref) => {
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
  //   });

  //   // Cleanup observer on component unmount
  //   return () => {
  //     sectionRefs.forEach((ref) => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     });
  //   };
  // }, [sectionRefs]); // Dependency array includes sectionRefs, though it's static here.

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>Homepage - Hajz Telecommunication Co Ltd. | Real Transformation</title>
        <meta
          name="description"
          content="Learn about Hajz Telecommunication Co Ltd.'s journey, values, and mission in revolutionizing global connectivity through innovative telecommunications solutions."
        />
      </Helmet>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Background gradient for sections */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
      
      {/* Content Sections Container */}
      <div className="relative z-10">
        {/* Value Prop Split Section */}
        <ValuePropSplitComponent />

        {/* Services Grid Section */}
        <ServicesGridComponent />

        {/* Digital Demands Section */}
        {/* <DigitalDemandsComponent /> */}

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="relative bg-transparent px-2 sm:px-4"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <div className="mx-2 sm:mx-4">
            <ContactSection size="extraLarge" />
          </div>
        </section>

        {/* Footer Section - Now responsive and fits screen */}
          <div className="w-full pt-20">
            <Footer />
          </div>
      </div>
    </div>
  );
}

export default HomePage;
