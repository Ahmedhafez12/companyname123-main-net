import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Lightning, WifiHigh, Cloud, ShareNetwork, Shield, Database, HardDrives, Cpu, Globe, Rocket, Monitor, Code, GridFour, Brain, Envelope, Phone, MapPin, TwitterLogo, LinkedinLogo, InstagramLogo } from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContactSection from "../components/ContactSection";
import ScrollReveal from "../components/ScrollReveal";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../components/HeroCarousel";
import HeroScrollIndicator from "../components/HeroScrollIndicator";
import NetworkHeroCanvas from "../components/NetworkHeroCanvas";
import CompanyTeaserSection from "../components/CompanyTeaserSection";

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
  primaryOpacity: {
    "20": "rgba(0, 94, 150, 0.2)",
    "15": "rgba(0, 94, 150, 0.15)",
    "10": "rgba(0, 94, 150, 0.1)",
    "05": "rgba(0, 94, 150, 0.05)",
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

// --- Services constant and icon map for dynamic rendering ---
/** Map of icon name (string) to Phosphor icon component for dynamic rendering. */
const PHOSPHOR_ICON_MAP: Record<string, React.ElementType> = {
  WifiHigh,
  Cloud,
  ShareNetwork,
  Shield,
  Monitor,
  Code,
  GridFour,
  HardDrives,
  Brain,
  Lightning,
  Globe,
  Rocket,
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
};

export const SERVICES: ServiceItem[] = [
  { id: "system-integration", title: "System Integration", description: "Solutions that fit your network and support digital transformation.", iconName: "WifiHigh", href: "/solutions" },
  { id: "connectivity-transmission", title: "Connectivity and Transmission", description: "Intelligent gateways that transform infrastructure into competitive advantage.", iconName: "Cloud", href: "/solutions" },
  { id: "unified-communication", title: "Unified Communication", description: "Bridge legacy and cloud for seamless collaboration.", iconName: "ShareNetwork", href: "/solutions" },
  { id: "access-lan-osp", title: "Access LAN and OSP", description: "Complete connectivity from fiber to Wi-Fi.", iconName: "Shield", href: "/solutions" },
  { id: "control-room-software", title: "Control Room & Software", description: "Ergonomic operations and custom software with intuitive interfaces.", iconName: "Monitor", href: "/what-we-do/command-control" },
  { id: "video-walls-infrastructure", title: "Video Walls & Infrastructure", description: "High-resolution video walls and flexible server infrastructure for scale.", iconName: "GridFour", href: "/what-we-do/command-control" },
];

// --- Customers (id, name, logoUrl, industry, slug) ---
export type CustomerItem = {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  slug: string;
};

export const CUSTOMERS: CustomerItem[] = [
  { id: "stc", name: "STC", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg", industry: "Telecommunications", slug: "stc" },
  { id: "bt", name: "BT", logoUrl: "https://static.cdnlogo.com/logos/b/58/bt-3.svg", industry: "Telecommunications", slug: "bt" },
  { id: "ericsson", name: "Ericsson", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ericsson_%282018%29.svg/1200px-Ericsson_%282018%29.svg.png", industry: "Technology", slug: "ericsson" },
  { id: "hp", name: "HP", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png", industry: "Technology", slug: "hp" },
  { id: "microsoft", name: "Microsoft", logoUrl: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png", industry: "Technology", slug: "microsoft" },
  { id: "nokia", name: "Nokia", logoUrl: "https://www.nokia.com/themes/custom/onenokia_reskin/logo.svg", industry: "Telecommunications", slug: "nokia" },
  { id: "citibank", name: "Citibank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg", industry: "Financial Services", slug: "citibank" },
  { id: "ibm", name: "IBM", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", industry: "Technology", slug: "ibm" },
  { id: "oracle", name: "Oracle", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg", industry: "Technology", slug: "oracle" },
  { id: "xerox", name: "Xerox", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Xerox_logo.svg", industry: "Technology", slug: "xerox" },
];

// --- Featured Customer (for pull-quote card below logo grid) ---
const FEATURED_CUSTOMER = {
  quote: "Our mission is simple: to provide the reliable, high-performance infrastructure you need to stay ahead. As the industry evolves, we remain committed to your growth and to delivering the precision your operations demand.",
  name: "Company's CEO",
  title: "Chief Executive Officer",
  company: "HTC",
};

// --- ServiceCard functional component (props: id, title, description, iconName, href) ---
export function ServiceCard({ id, title, description, iconName, href }: ServiceItem) {
  const IconComponent = PHOSPHOR_ICON_MAP[iconName] ?? Shield;
  return (
    <ServiceCardGlassWrapper
      to={href}
      data-service-id={id}
      aria-labelledby={`${id}-title`}
      className="group transition-all duration-300 ease-in-out hover:-translate-y-2"
    >
      {/* Stretched-link pattern: full card is clickable */}
      <span className="absolute inset-0 z-0" aria-hidden />
      <div className="relative z-10 flex flex-col items-center flex-1 w-full">
        <div className="text-cta group-hover:text-secondary transition-all duration-300 ease-in-out mb-3 flex items-center justify-center flex-shrink-0 [&_svg]:w-8 [&_svg]:h-8">
          <IconComponent weight="bold" size={32} />
        </div>
        <ServiceTitle id={`${id}-title`} className="mb-2">{title}</ServiceTitle>
        <p className="font-body text-sm sm:text-base text-white/80 leading-snug m-0 line-clamp-2 flex-1">{description}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-cta font-sans text-sm font-medium">
          Learn More
          <span className="inline-flex transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            <ArrowRight weight="bold" size={16} />
          </span>
        </span>
      </div>
    </ServiceCardGlassWrapper>
  );
}

// --- Services Grid Section Component (fits in section viewport) ---
const ServicesGridSection = styled.section`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  overflow: hidden;
`;

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
  overflow: hidden;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: clamp(1rem, 2vh, 1.25rem);
  text-align: center;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: clamp(0.75rem, 2vh, 1.25rem);
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-height: 0;
  padding: clamp(0.75rem, 2vh, 1.5rem) 0;
`;

const CategoryHeader = styled(motion.h3)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.5rem, 4vh, 2.5rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
  position: relative;
  padding-bottom: clamp(0.5rem, 1.5vh, 1rem);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(48px, 8vw, 72px);
    height: 2px;
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

const CategoryHeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem 1rem;
  margin-bottom: clamp(0.5rem, 1vh, 0.75rem);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(0.75rem, 2vh, 1.5rem);
  width: 100%;
  overflow: hidden;
  padding-bottom: clamp(0.75rem, 2vh, 1.5rem);
  flex: 1;
  min-height: 0;
  align-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-rows: minmax(0, 1fr);
    max-height: 65vh;
    gap: clamp(1rem, 2vh, 1.5rem);
  }

  @media (min-width: 1024px) {
    max-height: 70vh;
    gap: clamp(1rem, 2.5vh, 1.75rem);
    padding-bottom: clamp(1rem, 2vh, 1.5rem);
  }
`;

const ServiceCardWrapper = styled(motion.div)`
  background: ${BRAND_COLORS.primaryOpacity["20"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.primaryOpacity["20"]};
  border-radius: clamp(0.5rem, 1.25vh, 1rem);
  padding: clamp(1rem, 2.5vh, 1.75rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 0;
  overflow: hidden;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

/** Glassmorphism card for SERVICES section: glass style, hover lift, full-area link. */
const ServiceCardGlassWrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: clamp(1.25rem, 2.5vh, 1.75rem);
  background: ${BRAND_COLORS.primaryOpacity["20"]};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${BRAND_COLORS.primaryOpacity["20"]};
  border-radius: clamp(0.5rem, 1.25vh, 1rem);
  box-shadow: 0 4px 24px ${BRAND_COLORS.primaryOpacity["20"]};
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${BRAND_COLORS.primaryOpacity["20"]};
    box-shadow: 0 12px 32px ${BRAND_COLORS.primaryOpacity["20"]};
  }
`;

const ServiceIcon = styled.div`
  color: ${BRAND_COLORS.cta};
  margin-bottom: clamp(0.5rem, 1.5vh, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: clamp(2rem, 4.5vh, 2.75rem);
    height: clamp(2rem, 4.5vh, 2.75rem);
  }
`;

const ServiceTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1rem, 2vh, 1.375rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: clamp(0.375rem, 1vh, 0.625rem);
  margin-top: 0;
  line-height: 1.25;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const ServiceDescription = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vh, 1.0625rem);
  line-height: 1.45;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;


type ServicesCategory = 'telecommunications' | 'command-control';

const ServicesGridComponent = ({ category }: { category: ServicesCategory }) => {
  // Category 1: Telecommunications (max 3 short sentences / one line per card for above-the-fold)
  const solutionsPageServices = [
    { icon: <div className="p-2"><WifiHigh weight="bold" size={20} /></div>, title: "System Integration", description: "Solutions that fit your network and support digital transformation.", link: "/solutions" },
    { icon: <div className="p-2"><Cloud weight="bold" size={20} /></div>, title: "Connectivity and Transmission", description: "Intelligent gateways that transform infrastructure into competitive advantage.", link: "/solutions" },
    { icon: <div className="p-2"><ShareNetwork weight="bold" size={20} /></div>, title: "Unified Communication", description: "Bridge legacy and cloud for seamless collaboration.", link: "/solutions" },
    { icon: <div className="p-2"><Shield weight="bold" size={20} /></div>, title: "Access LAN and OSP", description: "Complete connectivity from fiber to Wi-Fi.", link: "/solutions" },
    { icon: <div className="p-2"><Shield weight="bold" size={20} /></div>, title: "Military and Critical Communication", description: "Encrypted, secured voice and data for critical operations.", link: "/solutions" },
  ];

  // Category 2: Command & Control
  const commandControlServices = [
    { icon: <div className="p-2"><Monitor weight="bold" size={20} /></div>, title: "Control Room Furniture", description: "Ergonomic furniture for 24/7 operations.", link: "/what-we-do/command-control" },
    { icon: <div className="p-2"><Code weight="bold" size={20} /></div>, title: "Software", description: "Custom software with intuitive interfaces and analytics.", link: "/what-we-do/command-control" },
    { icon: <div className="p-2"><GridFour weight="bold" size={20} /></div>, title: "Video Walls", description: "High-resolution video walls for real-time monitoring.", link: "/what-we-do/command-control" },
    { icon: <div className="p-2"><HardDrives weight="bold" size={20} /></div>, title: "Servers (On-prem/Cloud/Hybrid)", description: "Flexible server infrastructure for security and scale.", link: "/what-we-do/command-control" },
    { icon: <div className="p-2"><Brain weight="bold" size={20} /></div>, title: "AI/Custom Software", description: "AI-powered automation and predictive insights.", link: "/what-we-do/command-control" },
  ];

  const showTelecom = category === 'telecommunications';

  const headerConfig = showTelecom
    ? { title: <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Telecommunications</span> Services</>, subtitle: "Enterprise solutions that transform your operations." }
    : { title: <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Command & Control </span>Services</>, subtitle: "Control room, software, and infrastructure solutions." };

  const services = showTelecom ? solutionsPageServices : commandControlServices;
  const exploreHref = showTelecom ? "/what-we-do/telecommunications" : "/what-we-do/command-control";
  const exploreLabel = showTelecom ? "Explore Telecommunications" : "Explore Command & Control";

  return (
    <>
      <header className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans mb-3">
          {headerConfig.title}
        </h2>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto font-body">
          {headerConfig.subtitle}
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
        {services.map((service, index) => (
          <ServiceCardGlassWrapper
            key={service.title}
            to={service.link}
            className={`group transition-all duration-300 ease-in-out hover:-translate-y-2 ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 !bg-transparent" : ""}`}
          >
            {index === 0 && (
              <>
                <div
                  className="absolute inset-0 z-0 rounded-[inherit] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${showTelecom
                      ? "/assets/Telecommunications/Telecom_tower_connecting_landscape_7cdb458686.jpeg"
                      : "/assets/CommandandControl/Control_room_with_screens_9c4c709e86.jpeg"
                    })`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 z-0 rounded-[inherit] bg-primary/50" aria-hidden />
              </>
            )}
            <span className="absolute inset-0 z-0" aria-hidden />
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full text-center min-h-0">
              <div
                className={`text-cta group-hover:text-secondary transition-all duration-300 ease-in-out mb-3 flex items-center justify-center flex-shrink-0 ${index === 0 ? "[&_svg]:w-32 [&_svg]:h-32" : "[&_svg]:w-8 [&_svg]:h-8"}`}
              >
                {service.icon}
              </div>
              <ServiceTitle className={index === 0 ? "mb-2 !text-4xl sm:!text-5xl" : "mb-2"}>
                {service.title}
              </ServiceTitle>
              <p
                className={`font-body text-white/80 leading-snug m-0 line-clamp-2 ${index === 0 ? "text-xl sm:text-2xl md:text-3xl" : "text-sm sm:text-base"}`}
              >
                {service.description}
              </p>
            </div>
          </ServiceCardGlassWrapper>
        ))}
      </div>
      <div className="flex justify-center w-full mt-10 md:mt-12">
        <Link to={exploreHref} className="btn-primary inline-flex items-center gap-2 group text-base sm:text-lg px-6 py-3">
          <span>{exploreLabel}</span>
          <span className="p-0.5"><ArrowRight weight="bold" size={22} /></span>
        </Link>
      </div>
    </>
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
  background: ${BRAND_COLORS.primaryOpacity["20"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.primaryOpacity["20"]};
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.primaryOpacity["20"]};
`;

const DemandIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${BRAND_COLORS.cta};
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
  border: 1px solid ${BRAND_COLORS.cta};
  color: ${BRAND_COLORS.cta};
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
    border-color: ${BRAND_COLORS.cta};
    
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
      // icon: TrendUp,
    },
    {
      title: "Speed",
      description: "Accelerate your operations with high-performance networks designed for maximum efficiency.",
      // icon: Rocket,
    },
  ];

  return (
    <DigitalDemandsSection>
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
              <DemandCard key={index}>
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
  const scrollSnapRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null); // Ref for the Contact Section (last section)
  const isLastSectionInView = useInView(contactRef, { once: false, amount: 0.2 });

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

  const sectionClass =
  'snap-section h-screen min-h-[600px] flex flex-col justify-center snap-start relative overflow-hidden shrink-0';

  const DecorativeBlob = ({ className = '' }: { className?: string }) => (
    <div
      className={`absolute rounded-full blur-3xl opacity-25 pointer-events-none z-0 ${className}`}
      style={{ background: 'var(--color-primary)', width: 'min(28rem, 80vw)', height: 'min(28rem, 80vw)' }}
      aria-hidden
    />
  );

  return (
    <div className="relative overflow-x-hidden">
      <Helmet>
        <title>Homepage - Hajz Telecommunication Co Ltd. | Real Transformation</title>
        <meta
          name="description"
          content="Hajz Telecommunication Co Ltd.: innovative telecommunications solutions, global connectivity, and transformative technology."
        />
      </Helmet>

      <div className="fixed inset-0 bg-primary opacity-20 pointer-events-none -z-10" style={{ transform: 'translateZ(0)' }} />

      <HeroScrollIndicator
        sectionIds={[
          "network-hero-scroll",
          "hero",
          "about-cta",
          "telecommunications",
          "command-control",
          "contact",
        ]}
      />

      <div
        ref={scrollSnapRef}
        className="scroll-snap-page h-screen overflow-y-scroll overflow-x-hidden"
      >
        <NetworkHeroCanvas scrollScrollerRef={scrollSnapRef} />

        <section id="hero" className={`${sectionClass} z-[15]`}>
          <DecorativeBlob className="-top-24 -right-24" />
          <HeroCarousel />
        </section>

        {/* Company Teaser / Our Story */}
        <section id="about-cta" className={sectionClass}>
          <CompanyTeaserSection />
        </section>

        {/* What We Do - Telecommunications */}
        <section id="telecommunications" className={sectionClass}>
          <DecorativeBlob className="top-1/2 -translate-y-1/2 -right-32 opacity-20" />
          <ScrollReveal direction="up" delay={0}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center min-h-0 flex-1 py-12 md:py-16">
              <ServicesGridComponent category="telecommunications" />
            </div>
          </ScrollReveal>
        </section>

        {/* What We Do - Command & Control */}
        <section id="command-control" className={sectionClass}>
          <DecorativeBlob className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4 opacity-20" />
          <ScrollReveal direction="up" delay={0}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center min-h-0 flex-1 py-12 md:py-16">
              <ServicesGridComponent category="command-control" />
            </div>
          </ScrollReveal>
        </section>

        {/* Customers logo grid — commented out
        <section id="customers" className={sectionClass}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center min-h-0 flex-1 py-12 md:py-16">
            <header className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans mb-3">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta via-accent to-secondary">Customers</span>
              </h2>
              <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto font-body">
                Trusted by leading organizations across telecommunications, technology, and financial services.
              </p>
            </header>
            <div className="grid grid-cols-2 gap-6 md:hidden">
              {CUSTOMERS.map((customer) => (
                <Link
                  key={customer.id}
                  to={`/customers#${customer.slug}`}
                  className="group flex flex-col items-center justify-center p-4 rounded-lg bg-white border border-slate-200 transition-all duration-300 ease-in-out hover:border-primary/40 hover:bg-slate-50"
                >
                  <div className="w-full aspect-[3/2] flex items-center justify-center p-2">
                    <img
                      src={customer.logoUrl}
                      alt={customer.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="sr-only">{customer.name} — {customer.industry}</span>
                </Link>
              ))}
            </div>

            <motion.div
              className="hidden md:block overflow-hidden w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex w-max marquee-track">
                {[...CUSTOMERS, ...CUSTOMERS].map((customer, index) => (
                  <Link
                    key={`${customer.id}-${index}`}
                    to={`/customers#${customer.slug}`}
                    className="group flex-shrink-0 w-44 lg:w-52 flex flex-col items-center justify-center p-4 rounded-lg bg-white border border-slate-200 mx-3 transition-all duration-300 ease-in-out hover:border-primary/40 hover:bg-slate-50"
                  >
                    <div className="w-full aspect-[3/2] flex items-center justify-center p-2">
                      <img
                        src={customer.logoUrl}
                        alt={customer.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="sr-only">{customer.name} — {customer.industry}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <article className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl border border-primary/30 bg-primary/20 backdrop-blur-sm">
              <div className="relative min-h-[240px] lg:min-h-[320px] bg-white overflow-hidden">
                <img
                  src="/assets/A_photograph_for_a_corporate_aboutus_section_subje_delpmaspu.png"
                  alt="Corporate about us"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-snug mb-6 md:mb-8">
                  &ldquo;{FEATURED_CUSTOMER.quote}&rdquo;
                </blockquote>
                <footer>
                  <cite className="not-italic">
                    <span className="block font-sans font-bold text-white text-lg">{FEATURED_CUSTOMER.name}</span>
                    <span className="block font-body text-white/70 text-base">{FEATURED_CUSTOMER.title}, {FEATURED_CUSTOMER.company}</span>
                  </cite>
                </footer>
              </div>
            </article>
          </div>
        </section>
        */}

        {/* Contact (last section) — Orbital snap-scroll layout */}
        <section
          id="contact"
          ref={contactRef}
          className={sectionClass}
        >
          <motion.button
            type="button"
            className="absolute top-12 right-4 sm:right-6 md:right-8 z-[100] pt-[0.5in] pr-[0.75in] flex items-center gap-3 text-white tracking-widest uppercase font-sans text-lg cursor-pointer hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            initial={{ x: 0, y: 0 }}
            animate={
              isLastSectionInView
                ? { x: [0, 6, 0], y: [0, -10, 0] }
                : { x: 0, y: 0 }
            }
            transition={{
              duration: 0.4,
              repeat: isLastSectionInView ? Infinity : 0,
              repeatDelay: 0.4,
              ease: "easeInOut",
            }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-menu"))}
            aria-label="Open menu"
          >
            <span>Explore More</span>
            <ArrowUpRight weight="bold" size={20} />
          </motion.button>
          <DecorativeBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
          <div className="w-full h-full min-h-0 flex flex-col justify-center bg-transparent px-0">
              <ContactSection size="extraLarge" layout="orbital" />
            </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
