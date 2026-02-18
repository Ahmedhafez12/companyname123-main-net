import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Wifi, Cloud, Network, Shield, Database, Server, Cpu, Globe, Zap, Lock, Radio, Target, Award, Users, TrendingUp, Mail, Phone, MapPin, X, Calendar, Gauge, Rocket, TrendingUp as TrendingUpIcon } from "lucide-react";
import styled, { keyframes } from "styled-components";
import AnimatedCounter from "../components/AnimatedCounter";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Logo from "../components/Logo";

// --- SVG Noise Filter (Hidden) ---
const NoiseFilter = () => (
  <svg className="hidden" style={{ position: 'absolute', width: 0, height: 0 }}>
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>
);

// --- Brand Color Variables ---
const BRAND_COLORS = {
  primary: "#005E96",      // Dark Blue - Primary Headings/Text
  secondary: "#44C8F5",    // Light Blue - Secondary Accents
  highlight: "#7CCCBF",    // Turquoise - Timeline/Highlights
  cta: "#A6CE39",          // Green - Primary CTAs/Action
  background: "#002C3D",   // Navy Blue - Background Base
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
  backgroundOpacity: {
    "80": "rgba(0, 44, 61, 0.8)",
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
  body: '"Montserrat", system-ui, sans-serif',
};

// --- Fluid Typography Scale (Mobile-First) ---
// H1: 2.5rem (mobile) → 4.5rem (desktop)
// H2: 2rem (mobile) → 3.5rem (desktop)
// H3: 1.5rem (mobile) → 2.5rem (desktop)
// H4: 1.25rem (mobile) → 1.75rem (desktop)
const FLUID_TYPOGRAPHY = {
  h1: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",      // 40px → 72px
  h2: "clamp(2rem, 4vw + 0.75rem, 3.5rem)",     // 32px → 56px
  h3: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",    // 24px → 40px
  h4: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)",  // 20px → 28px
};

// --- Content Wrapper for Curtain Reveal Effect ---
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  margin-top: 100vh;
  background: linear-gradient(to bottom, #FFFFFF, #FFFFFF, #F5F5F5);
  width: 100%;
  min-height: 100vh;
  box-shadow: 0 -20px 60px -15px rgba(0, 0, 0, 0.1), 0 -10px 30px -10px rgba(0, 0, 0, 0.05);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  /* Noise Texture Layer - Very Noticeable */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: url(#noiseFilter);
    opacity: 0.25;
    pointer-events: none;
    z-index: 1;
    background: rgba(255, 255, 255, 0.05);
  }
  
  /* Smooth scrolling on mobile */
  @media (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
`;

// --- Main Sandbox Container Styles ---
const SandboxContainer = styled.div`
  min-height: 400vh; // Increased height to ensure scrolling for all components
  padding: 8rem clamp(1rem, 4vw, 3rem);
  /* No solid background - let global background theme show through */
  background: transparent;
  color: ${BRAND_COLORS.primary};
  font-family: ${TYPOGRAPHY.body};
  overflow-x: hidden;
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Section = styled.section`
  padding: 4rem 0;
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  &:last-child {
    border-bottom: none;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// --- Fluid Heading Components ---
const Heading = styled.h2`
  font-size: ${FLUID_TYPOGRAPHY.h2};
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${BRAND_COLORS.primary};
  font-family: ${TYPOGRAPHY.heading};
  line-height: 1.2;
`;

const H1 = styled.h1`
  font-size: ${FLUID_TYPOGRAPHY.h1};
  font-weight: 700;
  font-family: ${TYPOGRAPHY.heading};
  line-height: 1.2;
`;

const H3 = styled.h3`
  font-size: ${FLUID_TYPOGRAPHY.h3};
  font-weight: 700;
  font-family: ${TYPOGRAPHY.heading};
  line-height: 1.3;
`;

const H4 = styled.h4`
  font-size: ${FLUID_TYPOGRAPHY.h4};
  font-weight: 600;
  font-family: ${TYPOGRAPHY.heading};
  line-height: 1.4;
`;

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  min-height: 250px;
`;

// --- 1. Morphing Blob Background (Fixed) ---
const blobVariants = {
  animate: {
    scale: [1, 1.1, 0.9, 1],
    rotate: [0, 90, 180, 270, 360],
    borderRadius: [
      "40% 60% 70% 30% / 40% 50% 50% 60%",
      "30% 70% 60% 40% / 50% 60% 40% 50%",
      "50% 50% 50% 50% / 50% 50% 50% 50%",
      "40% 60% 70% 30% / 40% 50% 50% 60%",
    ],
  },
};

const Blob = styled(motion.div)`
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.highlight});
  filter: blur(80px);
  opacity: 0.6;
`;

const MorphingBlob = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <div
        style={{
          position: "absolute",
          inset: "0",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Blob
          variants={blobVariants}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          animate="animate"
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingTop: "10rem",
          color: BRAND_COLORS.primary,
        }}
      >
        <h1>A Living Background</h1>
        <p>This blob continuously morphs and changes shape.</p>
      </div>
    </div>
  );
};

// --- 2. Parallax Scroll Progress Bar ---
const ProgressBarWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background: ${BRAND_COLORS.secondary};
  z-index: 1000;
`;

const ParallaxProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <ProgressBarWrapper style={{ scaleX, originX: 0 }} />;
};

// --- 3. Wavy Text Reveal on Scroll (Fixed) ---
const WavyTextWrapper = styled(motion.div)`
  display: block;
  font-size: ${FLUID_TYPOGRAPHY.h2};
  font-weight: 800;
  text-align: center;
  color: ${BRAND_COLORS.primary};
  overflow: hidden;
  font-family: ${TYPOGRAPHY.heading};
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin: 0 2px;
`;

const WavyText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const wordVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <WavyTextWrapper
      ref={ref}
      variants={wordVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", marginRight: "1rem" }}>
          {word.split("").map((char, j) => (
            <Character key={j} variants={charVariants}>
              {char === " " ? "\u00A0" : char}
            </Character>
          ))}
        </span>
      ))}
    </WavyTextWrapper>
  );
};

// --- 4. Glowing Neon Button ---
const NeonButton = styled.button`
  background: transparent;
  border: 2px solid ${({ color }) => color};
  border-radius: 50px;
  color: ${BRAND_COLORS.white};
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  text-shadow: 0 0 5px ${BRAND_COLORS.white}, 0 0 10px ${BRAND_COLORS.white}, 0 0 15px ${({ color }) => color};
  box-shadow: 0 0 10px ${({ color }) => color},
    inset 0 0 10px ${({ color }) => color};

  &:hover {
    color: ${({ color }) => color};
    background: ${BRAND_COLORS.white};
    text-shadow: none;
    box-shadow: 0 0 20px ${({ color }) => color},
      inset 0 0 20px ${({ color }) => color};
  }
`;

// --- 5. Magnetic Follow Cursor ---
const MagneticContainer = styled(motion.div)`
  display: inline-block;
  cursor: pointer;
`;

const MagneticButton = styled.div`
  background-color: ${BRAND_COLORS.secondary};
  color: ${BRAND_COLORS.white};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.25rem;
  transition: all 0.2s ease-out;
  box-shadow: 0 4px 15px ${BRAND_COLORS.blackOpacity["20"]};
  font-family: ${TYPOGRAPHY.heading};
`;

const MagneticButtonComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { width, height, x, y } = ref.current.getBoundingClientRect();
    const newX = clientX - (x + width / 2);
    const newY = clientY - (y + height / 2);
    setPosition({ x: newX * 0.4, y: newY * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <MagneticContainer
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <MagneticButton>Hover Me</MagneticButton>
    </MagneticContainer>
  );
};

// --- 6. 3D Flip Card on Hover ---
const CardContainer = styled.div`
  width: 300px;
  height: 400px;
  perspective: 1000px;
`;

const FlipCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px ${BRAND_COLORS.blackOpacity["20"]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${BRAND_COLORS.white};
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.secondary});
  transform: rotateY(0deg);
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, ${BRAND_COLORS.cta}, ${BRAND_COLORS.highlight});
  transform: rotateY(180deg);
`;

const FlipCardComponent = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer onClick={() => setIsFlipped(!isFlipped)}>
      <FlipCard
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
      >
        <CardFront>Front Side</CardFront>
        <CardBack>
          Back Side
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginTop: "0.5rem",
            }}
          >
            Click again to flip back!
          </p>
        </CardBack>
      </FlipCard>
    </CardContainer>
  );
};

// --- 7. Glassmorphism Card ---
const GlassCard = styled(motion.div)`
  width: 300px;
  height: 400px;
  background: ${BRAND_COLORS.whiteOpacity["20"]};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid ${BRAND_COLORS.whiteOpacity["30"]};
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["37"]};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${BRAND_COLORS.white};
`;

const GlassCardContent = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-family: ${TYPOGRAPHY.heading};
    color: ${BRAND_COLORS.white};
  }
  p {
    font-size: 1rem;
    opacity: 0.8;
    font-family: ${TYPOGRAPHY.body};
    color: ${BRAND_COLORS.white};
  }
`;

const GlassCardButton = styled.button`
  background: ${BRAND_COLORS.whiteOpacity["10"]};
  border: 1px solid ${BRAND_COLORS.whiteOpacity["30"]};
  color: ${BRAND_COLORS.white};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["20"]};
  }
`;

const GlassmorphismCard = () => {
  return (
    <div
      style={{
        background:
          `linear-gradient(135deg, ${BRAND_COLORS.background}, ${BRAND_COLORS.primary}, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.highlight})`,
        padding: "5rem",
        borderRadius: "12px",
        minWidth: "400px",
      }}
    >
      <GlassCard
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <GlassCardContent>
          <h3>Glassmorphism</h3>
          <p>
            A beautifully frosted card effect with a translucent background.
          </p>
        </GlassCardContent>
        <GlassCardButton>Learn More</GlassCardButton>
      </GlassCard>
    </div>
  );
};

// --- 8. Text Glitch Effect on Hover ---
const GlitchTextContainer = styled.div`
  position: relative;
  font-size: ${FLUID_TYPOGRAPHY.h1};
  font-weight: 800;
  text-transform: uppercase;
  color: ${BRAND_COLORS.primary};
  cursor: pointer;
  z-index: 10;
  font-family: ${TYPOGRAPHY.heading};
`;

const GlitchLayer = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  user-select: none;
`;

const GlitchText = ({ children }: { children: React.ReactNode }) => {
  const [glitch, setGlitch] = useState(false);

  const handleHoverStart = () => setGlitch(true);
  const handleHoverEnd = () => setGlitch(false);

  return (
    <GlitchTextContainer
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <span>{children}</span>
      <AnimatePresence>
        {glitch && (
          <>
            <GlitchLayer
              initial={{ opacity: 0, x: -5, y: -5 }}
              animate={{
                opacity: 1,
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ color: BRAND_COLORS.secondary, mixBlendMode: "multiply" }}
            >
              {children}
            </GlitchLayer>
            <GlitchLayer
              initial={{ opacity: 0, x: 5, y: 5 }}
              animate={{
                opacity: 1,
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ color: BRAND_COLORS.highlight, mixBlendMode: "multiply" }}
            >
              {children}
            </GlitchLayer>
          </>
        )}
      </AnimatePresence>
    </GlitchTextContainer>
  );
};

// --- 9. Infinite Looping Carousel ---
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  padding: 2rem 0;
  background-color: ${BRAND_COLORS.whiteOpacity["05"]};
  border-radius: 12px;
  box-shadow: inset 0 0 10px ${BRAND_COLORS.blackOpacity["10"]};
`;

const CarouselInner = styled.div`
  display: inline-block;
  animation: ${scroll} 30s linear infinite;
`;

const CarouselItem = styled.div`
  display: inline-block;
  margin-right: 2rem;
  padding: 1rem 2rem;
  background-color: ${BRAND_COLORS.white};
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 5px ${BRAND_COLORS.blackOpacity["10"]};
  user-select: none;
  color: ${BRAND_COLORS.primary};
  font-family: ${TYPOGRAPHY.heading};
`;

interface InfiniteCarouselProps {
  items: string[];
}

const InfiniteCarousel = ({ items }: InfiniteCarouselProps) => {
  return (
    <CarouselWrapper>
      <CarouselInner>
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
        {items.map((item, index) => (
          <CarouselItem key={index + items.length}>{item}</CarouselItem>
        ))}
      </CarouselInner>
    </CarouselWrapper>
  );
};

// --- Hero Identity Carousel Component ---
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const HeroSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 64px;
  box-sizing: border-box;
  overflow: hidden;
  background: transparent;
  z-index: 0;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  /* Mobile: Use 100vh for consistency */
  @media (max-width: 767px) {
    padding-top: 64px;
    height: 100vh;
  }
`;

const HeroCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100dvh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;

  /* Mobile: Better height handling */
  @media (max-width: 767px) {
    min-height: calc(100svh - 64px);
    align-items: flex-start;
    padding-top: 1rem;
  }
`;

const HeroCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  min-height: calc(100dvh - 64px);
  margin: 0 auto;
  padding: 2rem clamp(1rem, 4vw, 3rem);
  overflow: hidden;
  display: flex;
  align-items: center;

  /* Mobile: Tighter container for unified appearance */
  @media (max-width: 767px) {
    padding: 1rem clamp(1rem, 4vw, 1.5rem);
    min-height: calc(100svh - 64px);
    align-items: center;
    justify-content: center;
  }
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  padding: 2rem 0;
  box-sizing: border-box;

  /* Mobile: Unified container - image and text as one cohesive unit */
  @media (max-width: 767px) {
    grid-template-rows: auto 1fr;
    gap: 0;
    padding: 0.75rem 0.75rem 0.75rem 0.75rem;
    align-items: stretch;
    justify-items: stretch;
    background: ${BRAND_COLORS.whiteOpacity["03"]};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 1rem;
    border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  max-width: 100%;
    margin: 0 auto;
  }

  /* Desktop: 50/50 horizontal split - closer together */
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 2.5rem;
    align-items: center;
    padding: 2rem 0;
  }
`;

const SlideContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  z-index: 2;
  width: 100%;

  /* Mobile: Centered content below image with backdrop blur */
  @media (max-width: 767px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    grid-row: 2;
    gap: 1rem;
    padding: 0 0.5rem 0.5rem 0.5rem;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  /* Tablet and up */
  @media (min-width: 768px) and (max-width: 1023px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
  }

  /* Desktop: Left align, left column */
  @media (min-width: 1024px) {
    text-align: left;
    align-items: flex-start;
    justify-content: center;
    grid-column: 1;
    grid-row: 1;
    gap: 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: ${BRAND_COLORS.white};
  margin: 0;
  text-align: center;

  /* Mobile: Centered typography with optimal sizing */
  @media (max-width: 767px) {
    line-height: 1.25;
    font-size: clamp(1.875rem, 7vw, 2.5rem);
    margin: 0 auto;
    padding: 0;
    text-align: center;
    width: 100%;
  }

  .highlight {
    color: ${BRAND_COLORS.secondary};
    font-weight: 800;
  }

  /* First word heavier weight for focal point */
  & > span:first-child,
  & > *:first-child > span {
    font-weight: 800;
  }
`;

const HeroSubtext = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  color: ${BRAND_COLORS.whiteOpacity["90"]};
  margin: 0;
  max-width: 600px;
  text-align: center;

  /* Mobile: Centered text with optimal readability - line-height 1.6 */
  @media (max-width: 767px) {
    font-size: clamp(0.875rem, 3.5vw, 1rem);
    line-height: 1.6;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 100%;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  align-items: center;

  /* Mobile: Centered compact buttons */
  @media (max-width: 639px) {
    gap: 0.875rem;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0.5rem auto 0 auto;
    align-items: stretch;
  }

  @media (min-width: 640px) and (max-width: 767px) {
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }

  @media (max-width: 1023px) {
    justify-content: center;
    max-width: 100%;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: ${BRAND_COLORS.cta};
  color: ${BRAND_COLORS.background};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px -2px rgba(166, 206, 57, 0.4), 0 2px 4px -1px ${BRAND_COLORS.blackOpacity["10"]};
  border: none;
  cursor: pointer;
  will-change: opacity, filter, box-shadow;

  /* Mobile: Compact rounded button with optimal sizing and drop shadow - 52px minimum */
  @media (max-width: 639px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    min-height: 52px;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px -2px rgba(166, 206, 57, 0.35), 0 2px 6px -1px ${BRAND_COLORS.blackOpacity["15"]};
  }

  @media (min-width: 640px) and (max-width: 767px) {
    flex: 1;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    min-height: 52px;
  }

  /* Desktop: Ensure 52px minimum height */
  min-height: 52px;

  &:hover {
    opacity: 0.85;
    filter: brightness(1.1);
  }

  &:active {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: ${BRAND_COLORS.white};
  color: ${BRAND_COLORS.background};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 600;
  border: 3px solid ${BRAND_COLORS.secondary};
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px -2px ${BRAND_COLORS.blackOpacity["10"]};

  /* Mobile: Solid white button with navy text for accessibility - 52px minimum */
  @media (max-width: 639px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    min-height: 52px;
    border-radius: 0.75rem;
    border-width: 3px;
    background-color: ${BRAND_COLORS.white};
    color: ${BRAND_COLORS.background};
  }

  @media (min-width: 640px) and (max-width: 767px) {
    flex: 1;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    min-height: 52px;
  }

  /* Desktop: Ensure 52px minimum height */
  min-height: 52px;

  &:hover {
    background-color: ${BRAND_COLORS.whiteOpacity["90"]};
    color: ${BRAND_COLORS.background};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px ${BRAND_COLORS.blackOpacity["15"]};
  }
`;

const ImagePlaceholder = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  overflow: hidden;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  animation: ${floatAnimation} 6s ease-in-out infinite;
  position: relative;
  z-index: 1;

  /* Mobile: Image as part of unified container - wider with rounded corners */
  @media (max-width: 767px) {
    grid-row: 1;
    min-height: 416px;
    max-height: 520px;
    width: calc(100% + 1rem);
    max-width: calc(100% + 1rem);
    margin: 0 -0.5rem;
    border-radius: 24px 24px 0 0;
    margin-bottom: 0;
    padding-bottom: 0;
    overflow: hidden;
  }

  /* Desktop: Right side of split */
  @media (min-width: 1024px) {
    grid-column: 2;
    grid-row: 1;
    min-height: 400px;
    max-height: 500px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${BRAND_COLORS.secondaryOpacity["10"]}, ${BRAND_COLORS.highlightOpacity["10"]});
    opacity: 0.5;
  }

  &::after {
    content: "Professional Image";
    position: relative;
    z-index: 1;
    font-family: ${TYPOGRAPHY.body};
    font-size: 1.25rem;
    color: ${BRAND_COLORS.whiteOpacity["60"]};
    text-align: center;
  }
`;

const NavigationArrows = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1280px;
  pointer-events: none;
  z-index: 20;
  padding: 0 clamp(1rem, 4vw, 3rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ArrowButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${BRAND_COLORS.whiteOpacity["10"]};
  backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
  color: ${BRAND_COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 21;

  ${HeroCarouselContainer}:hover & {
    opacity: 1;
    pointer-events: all;
  }

  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["20"]};
    border-color: ${BRAND_COLORS.secondary};
    color: ${BRAND_COLORS.secondary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PaginationDots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 20;
  align-items: center;
  padding-right: calc(3rem + 24px); /* Space for back-to-top button (3rem button + 24px dead space) */
  
  @media (max-width: 767px) {
    padding-right: 0; /* No back-to-top button on mobile, or adjust as needed */
  }
`;

const Dot = styled.button<{ active: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? BRAND_COLORS.cta : BRAND_COLORS.whiteOpacity["40"]};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  min-width: 0.5rem;
  min-height: 0.5rem;

  &:hover {
    background: ${BRAND_COLORS.cta};
    transform: scale(1.2);
  }
`;

const slideVariants = {
  enter: (direction: number) => {
    // On initial mount (direction === 0), show immediately
    if (direction === 0) {
      return {
        zIndex: 1,
        x: 0,
        opacity: 1,
      };
    }
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const SandboxHero = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = [
    {
      title: "Real Transformation",
      subtitle: "Experience cutting-edge solutions that enable, manage, and scale your business operations.",
      cta1: "Explore Solutions",
      cta2: "Contact Sales",
    },
    {
      title: "Innovation That Delivers",
      subtitle: "Discover how we deliver transformative technology experiences through innovative enterprise solutions.",
      cta1: "Learn More",
      cta2: "Get Started",
    },
  ];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(([currentPage]) => [currentPage + 1, 1]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const actualIndex = ((page % slides.length) + slides.length) % slides.length;

  return (
    <HeroSection>
      <HeroCarouselContainer>
        <HeroCarouselWrapper>
          <AnimatePresence initial={false} custom={direction}>
            <CarouselSlide
              key={actualIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <SlideContent>
                <HeroTitle>
                  {slides[actualIndex].title.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {i === 0 ? (
                        <>
                          <span className="highlight" style={{ fontWeight: 800 }}>{word}</span>{" "}
                        </>
                      ) : (
                        <span style={{ fontWeight: 700 }}>{word} </span>
                      )}
                    </React.Fragment>
                  ))}
                </HeroTitle>
                <HeroSubtext>{slides[actualIndex].subtitle}</HeroSubtext>
                <CTAContainer>
                  <PrimaryButton to="/solutions">
                    {slides[actualIndex].cta1}
                  </PrimaryButton>
                  <SecondaryButton to="/contact">
                    {slides[actualIndex].cta2}
                  </SecondaryButton>
                </CTAContainer>
              </SlideContent>
              <ImagePlaceholder />
            </CarouselSlide>
          </AnimatePresence>
        </HeroCarouselWrapper>

        <PaginationDots>
          {slides.map((_, index) => (
            <Dot
              key={index}
              active={actualIndex === index}
              onClick={() => {
                const newDirection = index > actualIndex ? 1 : -1;
                setPage([index, newDirection]);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </PaginationDots>
      </HeroCarouselContainer>
    </HeroSection>
  );
};

// --- Identity Pop-up Component (Stable CSS-only approach) ---
const IdentityPopUpContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 50;
  max-width: 320px;
  pointer-events: auto;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.8s ease-out;
  will-change: opacity;

  /* Mobile: Full-width banner at bottom */
  @media (max-width: 639px) {
    bottom: 0;
    left: 0;
    right: 0;
    width: calc(100% - 2rem);
    max-width: 100%;
    margin: 0 1rem 1rem 1rem;
    border-radius: 1rem 1rem 0 0;
  }

  @media (min-width: 640px) and (max-width: 767px) {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    max-width: calc(100% - 2rem);
  }
`;

const MissionCard = styled.div`
  background: rgba(0, 44, 61, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-left: 2px solid ${BRAND_COLORS.highlight};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["20"]};
  position: relative;

  /* Mobile: Adjust border for banner style */
  @media (max-width: 639px) {
    border-left: none;
    border-top: 2px solid ${BRAND_COLORS.highlight};
    border-radius: 1rem 1rem 0 0;
  }
`;

const MissionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const MissionCardTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h4};
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${BRAND_COLORS.whiteOpacity["60"]};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 0.25rem;

  &:hover {
    color: ${BRAND_COLORS.white};
    background: ${BRAND_COLORS.whiteOpacity["10"]};
  }
`;

const MissionCardContent = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0;
`;

const IdentityPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <IdentityPopUpContainer isVisible={isVisible}>
      <MissionCard>
        <MissionCardHeader>
          <MissionCardTitle>Our Mission</MissionCardTitle>
          <CloseButton
            onClick={() => setIsDismissed(true)}
            aria-label="Close mission card"
          >
            <X size={20} />
          </CloseButton>
        </MissionCardHeader>
        <MissionCardContent>
          Delivering transformative technology solutions that enable, manage, and scale your business operations with innovation and excellence.
        </MissionCardContent>
      </MissionCard>
    </IdentityPopUpContainer>
  );
};

// --- Global Scroll Reveal Observer Utility ---
const ScrollRevealObserver = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            entry.target.classList.add('is-visible');
            // Optionally disconnect after reveal to reduce overhead
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px',
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return null;
};

// --- Scroll Reveal CSS Styles (Global) ---
// Inject global styles for reveal-on-scroll
const ScrollRevealStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .reveal-on-scroll {
        opacity: 0 !important;
        transform: translateY(30px) !important;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out !important;
        will-change: opacity, transform;
      }

      .reveal-on-scroll.is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Staggered delays for child elements */
      .reveal-on-scroll.delay-100 {
        transition-delay: 0.1s !important;
      }

      .reveal-on-scroll.delay-200 {
        transition-delay: 0.2s !important;
      }

      .reveal-on-scroll.delay-300 {
        transition-delay: 0.3s !important;
      }

      .reveal-on-scroll.delay-400 {
        transition-delay: 0.4s !important;
      }

      .reveal-on-scroll.delay-500 {
        transition-delay: 0.5s !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// --- Lightweight Scroll Reveal Component (CSS-only fallback) ---
const ScrollRevealSection = styled.section<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  will-change: transform, opacity;
`;

const ScrollRevealWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to reduce overhead
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <ScrollRevealSection ref={ref} isVisible={isVisible}>
      {children}
    </ScrollRevealSection>
  );
};

// --- Services Grid Section Component ---
const ServicesGridSection = styled.section`
  padding: 6rem 0; /* py-24 equivalent */
  width: 100%;
  margin-bottom: 4rem;
  /* No solid background - let global background show through */
  background: transparent;
`;

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 1rem;
`;

const ServicesSubtitle = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-align: center;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;

  @media (min-width: 1024px) {
    gap: 2.5rem;
  }
`;

const ServiceCard = styled(motion.div)`
  /* Glassmorphism effect - Initial state */
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease-out;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  will-change: transform, background;

  /* Hover state - Group hover */
  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["10"]};
    transform: scale(1.02);
    box-shadow: 0 12px 40px 0 rgba(124, 204, 191, 0.2);
  }
`;

const ServiceIcon = styled.div`
  color: ${BRAND_COLORS.secondary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 1rem;
  margin-top: 0;
  transition: all 0.3s ease-out;
  
  /* Hover state - changes to Light Blue */
  ${ServiceCard}:hover & {
    color: ${BRAND_COLORS.secondary};
  }
`;

const ServiceDescription = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin-bottom: 1.5rem;
  margin-top: 0;
  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${TYPOGRAPHY.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${BRAND_COLORS.highlight};
  text-decoration: none;
  transition: all 0.3s ease-out;
  margin-top: auto;
`;

const ArrowIcon = styled(ArrowRight)`
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease-out;
  
  /* Hover state - Arrow becomes visible and snaps into place (Group hover) */
  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ServicesGridComponent = () => {
  const services = [
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Managed WiFi",
      description: "Seamless connectivity solutions with centralized management and enhanced security for scalable network operations.",
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Cloud Solutions",
      description: "High-speed wireless broadband with rapid deployment and scalable bandwidth solutions for enterprise needs.",
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Network Infrastructure",
      description: "Comprehensive network architecture with cloud deployments and automated management for optimal performance.",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Security Services",
      description: "Advanced cybersecurity measures protecting your infrastructure with real-time threat response and compliance.",
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "Data Management",
      description: "State-of-the-art data centers for secure storage and processing with disaster recovery capabilities.",
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Server Solutions",
      description: "Scalable server infrastructure with edge computing capabilities for real-time processing and optimization.",
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Network Automation",
      description: "Intelligent automation solutions for network management with AI-powered optimization and analytics.",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Connectivity",
      description: "Worldwide network coverage with seamless integration and multi-region deployment capabilities.",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Performance Optimization",
      description: "Advanced performance tuning and optimization services to maximize efficiency and reduce operational costs.",
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
          What We Do
        </ServicesTitle>
        <ServicesSubtitle
              initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Comprehensive solutions designed to meet your enterprise needs
        </ServicesSubtitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <LearnMoreLink to="/solutions">
                Learn More
                <ArrowIcon size={16} />
              </LearnMoreLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContainer>
    </ServicesGridSection>
  );
};

// --- Stats Ribbon Section Component ---
const StatsRibbonSection = styled.section`
  padding: 4rem 0;
  width: 100%;
  /* Semi-transparent background to maintain One Page Theme */
  background: ${BRAND_COLORS.whiteOpacity["03"]};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-top: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
`;

const StatsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;

  /* Tablet: 2x2 grid */
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  /* Desktop: 4-column horizontal ribbon */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  text-align: center;
`;

const StatsRibbonComponent = () => {
  const stats = [
    { value: 30, suffix: "+", label: "Years Experience", color: "#44C8F5" },
    { value: 500, suffix: "+", label: "Global Projects", color: "#A6CE39" },
    { value: 98, suffix: "%", label: "Client Satisfaction", color: "#7CCCBF" },
    { value: 200, suffix: "+", label: "Active Partners", color: "#44C8F5" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <StatsRibbonSection ref={ref}>
      <StatsContainer>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatNumber>
                <span style={{ color: stat.color }}>
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </span>
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsGrid>
      </StatsContainer>
    </StatsRibbonSection>
  );
};

// --- Value Prop Split Section Component ---
const ValuePropSection = styled.section`
  padding: 6rem 0;
  width: 100%;
  /* No solid background - let global background show through */
  background: transparent;
`;

const ValuePropContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ValuePropGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  /* Desktop: Split layout */
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const ValuePropLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ValuePropTitle = styled(motion.h2)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 1rem;
  margin-top: 0;
`;

const ValuePropSubtitle = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin-bottom: 2rem;
  margin-top: 0;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BRAND_COLORS.secondary};
  background: ${BRAND_COLORS.secondaryOpacity["10"]};
  border-radius: 0.75rem;
  border: 1px solid ${BRAND_COLORS.secondaryOpacity["20"]};
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureHeading = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const FeatureSubtext = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin: 0;
`;

const ValuePropRight = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
  /* Glassmorphism effect for image container */
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
`;

const ValuePropImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
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
    font-size: 1.25rem;
    color: ${BRAND_COLORS.whiteOpacity["60"]};
    text-align: center;
    padding: 2rem;
  }
`;

const ValuePropSplitComponent = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      heading: "Strategic Vision",
      subtext: "We maintain a clear focus on long-term goals while delivering immediate value to our clients through innovative solutions.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      heading: "Excellence Driven",
      subtext: "We strive for excellence in everything we do, from technical solutions to customer service and support.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      heading: "Customer Commitment",
      subtext: "Our success is measured by the success of our clients and their satisfaction with our comprehensive solutions.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      heading: "Continuous Growth",
      subtext: "We invest in research and development to stay ahead of technological advancements and market trends.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Why Choose Us
            </ValuePropTitle>
            <ValuePropSubtitle
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover what sets us apart in delivering transformative technology solutions.
            </ValuePropSubtitle>
            <FeatureList>
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.heading}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>{feature.heading}</FeatureHeading>
                    <FeatureSubtext>{feature.subtext}</FeatureSubtext>
                  </FeatureContent>
                </FeatureItem>
              ))}
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

// --- Enterprise Footer Component ---
// --- Latest Updates Section Component ---
const LatestUpdatesSection = styled.section`
  padding: 6rem 0;
  width: 100%;
  background: transparent;
`;

const LatestUpdatesContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LatestUpdatesTitle = styled.h2`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  text-align: center;
  margin-bottom: 1rem;
`;

const LatestUpdatesSubtitle = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 1.125rem;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  text-align: center;
  margin-bottom: 4rem;
`;

const UpdatesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    gap: 2.5rem;
  }
`;

const UpdateCard = styled(motion.div)`
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  will-change: transform;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px 0 ${BRAND_COLORS.blackOpacity["15"]};
  }
`;

const UpdateDateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${BRAND_COLORS.secondaryOpacity["20"]};
  color: ${BRAND_COLORS.secondary};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  width: fit-content;
`;

const UpdateTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h4};
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const UpdateExcerpt = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.9375rem;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const UpdateLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${BRAND_COLORS.highlight};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    gap: 0.75rem;
  }
`;

const LatestUpdatesComponent = () => {
  const updates = [
    {
      id: 1,
      date: "March 15, 2024",
      title: "New Enterprise Network Solutions Launch",
      excerpt: "We're excited to announce our latest enterprise network solutions designed to transform connectivity and scalability for businesses of all sizes.",
      href: "/sandbox/news/enterprise-launch",
    },
    {
      id: 2,
      date: "March 10, 2024",
      title: "Partnership with Leading Healthcare Provider",
      excerpt: "Hajztel partners with major healthcare institutions to deliver secure, high-performance network infrastructure for critical medical operations.",
      href: "/sandbox/news/healthcare-partnership",
    },
    {
      id: 3,
      date: "March 5, 2024",
      title: "Innovation Award for Digital Transformation",
      excerpt: "Recognized for excellence in digital transformation solutions, helping organizations scale and modernize their technology infrastructure.",
      href: "/sandbox/news/innovation-award",
    },
  ];

  return (
    <LatestUpdatesSection>
      <LatestUpdatesContainer>
        <LatestUpdatesTitle>Latest Updates</LatestUpdatesTitle>
        <LatestUpdatesSubtitle>Stay informed with our latest news and announcements</LatestUpdatesSubtitle>
        <UpdatesGrid>
          {updates.map((update) => (
            <UpdateCard
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <UpdateDateBadge>
                <Calendar size={16} />
                {update.date}
              </UpdateDateBadge>
              <UpdateTitle>{update.title}</UpdateTitle>
              <UpdateExcerpt>{update.excerpt}</UpdateExcerpt>
              <UpdateLink to={update.href}>
                Read More
                <ArrowRight size={16} />
              </UpdateLink>
            </UpdateCard>
          ))}
        </UpdatesGrid>
      </LatestUpdatesContainer>
    </LatestUpdatesSection>
  );
};

const EnterpriseFooterSection = styled.footer`
  width: 100%;
  padding: 4rem 0 2rem;
  margin-top: auto;
  /* Solid background color */
  background: #002C3D;
  border-top: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  /* Desktop: 5-column layout */
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
    gap: 2rem;
    text-align: left;
  }
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogoColumn = styled(FooterColumn)`
  @media (min-width: 1024px) {
    max-width: 300px;
  }
`;

const FooterTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const FooterLink = styled(Link)`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${BRAND_COLORS.white};
  opacity: 0.75;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${BRAND_COLORS.highlight};
    opacity: 1;
    transform: translateX(4px);
  }

  svg {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const FooterText = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${BRAND_COLORS.white};
  opacity: 0.75;
  line-height: 1.6;
  margin: 0;
`;

const FooterSlogan = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.75rem;
  color: ${BRAND_COLORS.white};
  opacity: 0.6;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  color: ${BRAND_COLORS.whiteOpacity["75"]};
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: ${BRAND_COLORS.highlightOpacity["20"]};
    border-color: ${BRAND_COLORS.highlight};
    color: ${BRAND_COLORS.highlight};
    transform: translateY(-2px);
  }
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NewsletterInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  color: ${BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  width: 100%;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${BRAND_COLORS.whiteOpacity["50"]};
  }

  &:focus {
    outline: none;
    border-color: ${BRAND_COLORS.secondary};
    background: ${BRAND_COLORS.whiteOpacity["05"]};
  }
`;

const NewsletterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: ${BRAND_COLORS.secondary};
  color: ${BRAND_COLORS.background};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  &:hover {
    background: ${BRAND_COLORS.highlight};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${BRAND_COLORS.secondaryOpacity["20"]};
  }

  &:active {
    transform: translateY(0);
  }
`;

const FooterCopyright = styled.div`
  padding-top: 2rem;
  border-top: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  text-align: center;
`;

const CopyrightText = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.75rem;
  color: ${BRAND_COLORS.white};
  opacity: 0.6;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const EnterpriseFooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { name: "Managed WiFi", href: "/solutions" },
    { name: "Cloud Solutions", href: "/solutions" },
    { name: "Network Infrastructure", href: "/solutions" },
    { name: "Security Services", href: "/solutions" },
  ];

  const aboutLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/contact" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <EnterpriseFooterSection ref={ref}>
      <FooterContainer>
        <FooterGrid>
          {/* Column 1: Logo/Slogan */}
          <FooterLogoColumn
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
              <Logo className="h-16 w-auto" />
            </Link>
            <FooterText>
              Enterprise solutions that drive transformation through innovative technology and strategic implementation.
            </FooterText>
            <FooterSlogan>Real Transformation</FooterSlogan>
            <SocialLinksContainer>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </SocialLink>
              ))}
            </SocialLinksContainer>
          </FooterLogoColumn>

          {/* Column 2: Services */}
          <FooterColumn
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FooterTitle>Services</FooterTitle>
            {servicesLinks.map((link) => (
              <FooterLink key={link.name} to={link.href}>
                {link.name}
                <ArrowRight size={14} />
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 3: About */}
          <FooterColumn
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FooterTitle>About</FooterTitle>
            {aboutLinks.map((link) => (
              <FooterLink key={link.name} to={link.href}>
                {link.name}
                <ArrowRight size={14} />
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 4: Legal */}
          <FooterColumn
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FooterTitle>Legal</FooterTitle>
            {legalLinks.map((link) => (
              <FooterLink key={link.name} to={link.href}>
                {link.name}
                <ArrowRight size={14} />
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 5: Newsletter/Social */}
          <FooterColumn
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FooterTitle>Newsletter</FooterTitle>
            <FooterText>
              Subscribe to our newsletter for the latest updates and insights.
            </FooterText>
            <NewsletterContainer>
              <NewsletterInput
                type="email"
                placeholder="Your email address"
                aria-label="Email address for newsletter subscription"
              />
              <NewsletterButton type="button" aria-label="Subscribe to newsletter">
                Subscribe
                <ArrowRight size={16} />
              </NewsletterButton>
            </NewsletterContainer>
          </FooterColumn>
        </FooterGrid>

        {/* Copyright */}
        <FooterCopyright
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CopyrightText>
            <Network size={14} />
            &copy; {currentYear} Hajz Telecommunications. All rights reserved.
          </CopyrightText>
        </FooterCopyright>
      </FooterContainer>
    </EnterpriseFooterSection>
  );
};

// --- Partner Marquee Component ---
const marqueeScroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const PartnerMarqueeSection = styled.section`
  padding: 4rem 0;
  width: 100%;
  background: transparent;
  overflow: hidden;
  position: relative;
`;

const PartnerMarqueeContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PartnerMarqueeTitle = styled.h2`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h2};
  font-weight: 700;
  text-align: center;
  color: ${BRAND_COLORS.primary};
  margin-bottom: 3rem;
`;

const PartnerMarqueeTrack = styled.div`
  display: flex;
  gap: 4rem;
  width: fit-content;
  animation: ${marqueeScroll} 30s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }
`;

const PartnerLogo = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 80px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease-out;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 0.5rem;
  padding: 1rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }

  .logo-text {
    font-family: ${TYPOGRAPHY.heading};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${BRAND_COLORS.primary};
    text-align: center;
    width: 100%;
  }

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
    background: ${BRAND_COLORS.whiteOpacity["10"]};
    border-color: ${BRAND_COLORS.secondary};
  }
`;

const PartnerMarqueeComponent = () => {
  // Partner logos with text placeholders (can be replaced with actual logo images)
  const partnerLogos = [
    { name: "TechCorp", text: "TechCorp" },
    { name: "GlobalNet", text: "GlobalNet" },
    { name: "CloudSys", text: "CloudSys" },
    { name: "DataFlow", text: "DataFlow" },
    { name: "SecureLink", text: "SecureLink" },
    { name: "InnovateHub", text: "InnovateHub" },
  ];

  // Duplicate array for seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <PartnerMarqueeSection className="reveal-on-scroll">
      <PartnerMarqueeContainer>
        <PartnerMarqueeTitle>Our Partners</PartnerMarqueeTitle>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <PartnerMarqueeTrack>
            {duplicatedLogos.map((partner, index) => (
              <PartnerLogo key={`${partner.name}-${index}`}>
                <div className="logo-text">{partner.text}</div>
              </PartnerLogo>
            ))}
          </PartnerMarqueeTrack>
        </div>
      </PartnerMarqueeContainer>
    </PartnerMarqueeSection>
  );
};

// --- Carousel Component ---
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 1rem;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  padding: 2rem;
`;

const CarouselSlideItem = styled(motion.div)`
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselContentItem = styled(motion.div)`
  background: ${BRAND_COLORS.whiteOpacity["10"]};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 16px 0 ${BRAND_COLORS.blackOpacity["10"]};
  transition: all 0.3s ease-out;

  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["20"]};
    transform: translateY(-4px);
    box-shadow: 0 8px 24px 0 ${BRAND_COLORS.blackOpacity["15"]};
  }
`;

const CarouselImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  overflow: hidden;
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  box-shadow: 0 2px 8px 0 ${BRAND_COLORS.blackOpacity["10"]};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${BRAND_COLORS.secondaryOpacity["10"]}, ${BRAND_COLORS.highlightOpacity["10"]});
    opacity: 0.5;
  }

  &::after {
    content: "Image Placeholder";
    position: relative;
    z-index: 1;
    font-family: ${TYPOGRAPHY.body};
    font-size: 1rem;
    color: ${BRAND_COLORS.whiteOpacity["60"]};
    text-align: center;
  }
`;

const CarouselText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CarouselItemTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h4};
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin: 0;
  line-height: 1.4;
`;

const CarouselItemDescription = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin: 0;
`;

const CarouselCTA = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${BRAND_COLORS.cta};
  color: ${BRAND_COLORS.background};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px -2px rgba(166, 206, 57, 0.4), 0 2px 4px -1px ${BRAND_COLORS.blackOpacity["10"]};
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.85;
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px -2px rgba(166, 206, 57, 0.5), 0 4px 6px -1px ${BRAND_COLORS.blackOpacity["15"]};
  }

  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }
`;

const CarouselNavButtons = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
  z-index: 10;

  @media (max-width: 767px) {
    padding: 0 0.5rem;
  }
`;

const CarouselNavButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${BRAND_COLORS.whiteOpacity["20"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["30"]};
  color: ${BRAND_COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: all;
  box-shadow: 0 2px 8px 0 ${BRAND_COLORS.blackOpacity["10"]};

  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["30"]};
    border-color: ${BRAND_COLORS.secondary};
    color: ${BRAND_COLORS.secondary};
    transform: scale(1.1);
    box-shadow: 0 4px 12px 0 ${BRAND_COLORS.blackOpacity["15"]};
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 767px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const CarouselIndicator = styled.button<{ active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? BRAND_COLORS.secondary : BRAND_COLORS.whiteOpacity["30"]};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  min-width: 0.75rem;
  min-height: 0.75rem;

  &:hover {
    background: ${BRAND_COLORS.secondary};
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface CarouselItemData {
  title: string;
  description: string;
  ctaText: string;
  imageAlt?: string;
}

interface CarouselComponentProps {
  items?: CarouselItemData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const CarouselComponent = ({ 
  items, 
  autoPlay = false, 
  autoPlayInterval = 5000 
}: CarouselComponentProps) => {
  const defaultItems: CarouselItemData[] = [
    {
      title: "Network Solutions",
      description: "Comprehensive network infrastructure designed to scale with your business needs. Transform your connectivity with cutting-edge technology.",
      ctaText: "Learn More",
      imageAlt: "Network Solutions",
    },
    {
      title: "Cloud Services",
      description: "Secure and scalable cloud solutions to transform your digital operations. Experience the power of cloud computing.",
      ctaText: "Get Started",
      imageAlt: "Cloud Services",
    },
    {
      title: "Security Services",
      description: "Advanced cybersecurity measures to protect your critical infrastructure. Stay secure with enterprise-grade protection.",
      ctaText: "Explore Security",
      imageAlt: "Security Services",
    },
    {
      title: "Data Management",
      description: "Efficient data storage and processing solutions for modern enterprises. Harness the power of your data.",
      ctaText: "Discover Solutions",
      imageAlt: "Data Management",
    },
    {
      title: "Server Solutions",
      description: "High-performance server infrastructure with edge computing capabilities. Optimize your server operations.",
      ctaText: "View Services",
      imageAlt: "Server Solutions",
    },
  ];

  const carouselItems = items || defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return carouselItems.length - 1;
      if (newIndex >= carouselItems.length) return 0;
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex]);

  return (
    <CarouselContainer>
      <CarouselNavButtons>
        <CarouselNavButton
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </CarouselNavButton>
        <CarouselNavButton
          onClick={() => paginate(1)}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </CarouselNavButton>
      </CarouselNavButtons>

      <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
        <AnimatePresence initial={false} custom={direction}>
          <CarouselSlideItem
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            <CarouselContentItem
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CarouselImagePlaceholder 
                role="img" 
                aria-label={carouselItems[currentIndex].imageAlt || carouselItems[currentIndex].title}
              />
              <CarouselText>
                <CarouselItemTitle>
                  {carouselItems[currentIndex].title}
                </CarouselItemTitle>
                <CarouselItemDescription>
                  {carouselItems[currentIndex].description}
                </CarouselItemDescription>
              </CarouselText>
              <CarouselCTA onClick={() => console.log(`CTA clicked: ${carouselItems[currentIndex].ctaText}`)}>
                {carouselItems[currentIndex].ctaText}
                <ArrowRight size={18} />
              </CarouselCTA>
            </CarouselContentItem>
          </CarouselSlideItem>
        </AnimatePresence>
      </div>

      <CarouselIndicators>
        {carouselItems.map((_, index) => (
          <CarouselIndicator
            key={index}
            active={currentIndex === index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </CarouselIndicators>
    </CarouselContainer>
  );
 };

// --- Card Component ---
const Card = styled(motion.div)`
  /* Glassmorphism effect - matching page styling */
  background: ${BRAND_COLORS.whiteOpacity["05"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease-out;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.blackOpacity["10"]};
  will-change: transform, background, box-shadow;

  /* Hover state */
  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["10"]};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px 0 rgba(124, 204, 191, 0.2);
    border-color: ${BRAND_COLORS.whiteOpacity["20"]};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BRAND_COLORS.secondary};
  background: ${BRAND_COLORS.secondaryOpacity["10"]};
  border-radius: 0.75rem;
  border: 1px solid ${BRAND_COLORS.secondaryOpacity["20"]};
  transition: all 0.3s ease-out;

  ${Card}:hover & {
    background: ${BRAND_COLORS.secondaryOpacity["20"]};
    transform: scale(1.05);
    color: ${BRAND_COLORS.highlight};
  }
`;

const CardTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h4};
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin: 0;
  line-height: 1.4;
  transition: all 0.3s ease-out;

  ${Card}:hover & {
    color: ${BRAND_COLORS.secondary};
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardDescription = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
`;

const CardButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${TYPOGRAPHY.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${BRAND_COLORS.highlight};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.3s ease-out;
  text-decoration: none;

  svg {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease-out;
  }

  ${Card}:hover & {
    color: ${BRAND_COLORS.secondary};
    gap: 0.75rem;

    svg {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }
`;

const CardBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: ${BRAND_COLORS.highlightOpacity["20"]};
  color: ${BRAND_COLORS.highlight};
  border-radius: 0.5rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

interface CardComponentProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  badge?: string;
  buttonText?: string;
}

const CardComponent = ({ 
  icon, 
  title = "Enterprise Solution", 
  description = "Transform your business with cutting-edge technology solutions designed to scale and adapt to your growing needs.",
  badge = "Featured",
  buttonText = "Learn More"
}: CardComponentProps) => {
  const defaultIcon = <Rocket size={24} />;

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CardHeader>
        <CardIcon>{icon || defaultIcon}</CardIcon>
        <div style={{ flex: 1 }}>
          <CardTitle>{title}</CardTitle>
        </div>
        {badge && <CardBadge>{badge}</CardBadge>}
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <CardButton>
          {buttonText}
          <ArrowRight size={16} />
        </CardButton>
      </CardFooter>
    </Card>
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
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
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

const DemandCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const DemandIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  color: ${BRAND_COLORS.secondary};
  
  ${DemandCard}:hover & {
    transform: scale(1.1);
  }
`;

const DemandHeading = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: ${FLUID_TYPOGRAPHY.h3};
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  margin: 0 0 1rem 0;
  transition: transform 0.3s ease;
  
  ${DemandCard}:hover & {
    transform: translateY(-5px);
  }
`;

const DemandBody = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: ${BRAND_COLORS.primary};
  opacity: 0.8;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  transition: transform 0.3s ease;
  
  ${DemandCard}:hover & {
    transform: translateY(-5px);
  }
`;

const LiquidButton = styled.button`
  position: relative;
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid ${BRAND_COLORS.highlight};
  color: ${BRAND_COLORS.primary};
  font-family: ${TYPOGRAPHY.heading};
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease-out;
  z-index: 1;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0%;
    background: ${BRAND_COLORS.highlight};
    z-index: -1;
    transition: width 0.4s ease;
  }
  
  &:hover {
    color: ${BRAND_COLORS.white};
    
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
      icon: Globe,
    },
    {
      title: "Scale",
      description: "Grow your infrastructure effortlessly with flexible solutions that adapt to your business needs.",
      icon: TrendingUp,
    },
    {
      title: "Speed",
      description: "Accelerate your operations with high-performance networks designed for maximum efficiency.",
      icon: Rocket,
    },
  ];

  return (
    <DigitalDemandsSection>
      <DemandsContainer>
        <DemandsGrid>
          {demands.map((demand, index) => {
            const IconComponent = demand.icon;
            return (
              <DemandCard key={index}>
                <DemandIconWrapper>
                  <IconComponent size={48} />
                </DemandIconWrapper>
                <DemandHeading>{demand.title}</DemandHeading>
                <DemandBody>{demand.description}</DemandBody>
                <LiquidButton>Learn More</LiquidButton>
              </DemandCard>
            );
          })}
        </DemandsGrid>
      </DemandsContainer>
    </DigitalDemandsSection>
  );
};

// --- Main Wrapper Component ---
const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// --- Final Sandbox Component ---
const Sandbox = () => {
  const logos = [
    "Framer Motion",
    "Styled Components",
    "React",
    "JavaScript",
    "HTML5",
    "CSS3",
  ];

  return (
    <MainWrapper>
      {/* SVG Noise Filter */}
      <NoiseFilter />
      
      {/* Global Scroll Reveal Observer */}
      <ScrollRevealObserver />
      <ScrollRevealStyles />
      
      {/* Fixed Hero Section - stays in place */}
      <IdentityPopUp />
      <SandboxHero />
      
      {/* Content Wrapper - Slides over hero with textured gradient background */}
      <ContentWrapper>
        <ScrollRevealWrapper>
          <ServicesGridComponent />
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <StatsRibbonComponent />
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <ValuePropSplitComponent />
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <DigitalDemandsComponent />
        </ScrollRevealWrapper>
        <PartnerMarqueeComponent />
      {/* <SandboxContainer>
        <ParallaxProgressBar />
        <Heading>Creative Component Sandbox</Heading>
      <p
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          maxWidth: "600px",
          margin: "0 auto 4rem",
        }}
      >
        This page showcases a collection of creative and highly interactive UI
        components. Scroll down to see them all in action.
      </p> */}

      {/* 1. Morphing Blob Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Morphing Blob Background</Heading>
        <MorphingBlob />
      </Section>
      </ScrollRevealWrapper> */}

      {/* 2. Magnetic Button Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Magnetic Button</Heading>
        <ComponentWrapper>
          <MagneticButtonComponent />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 3. 3D Flip Card Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>3D Flip Card</Heading>
        <ComponentWrapper>
          <FlipCardComponent />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 4. Text Glitch Effect Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Text Glitch Effect</Heading>
        <ComponentWrapper>
          <GlitchText>Glitch</GlitchText>
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 5. Glassmorphism Card Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Glassmorphism Card</Heading>
        <ComponentWrapper>
          <GlassmorphismCard />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 6. Infinite Carousel Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Infinite Looping Carousel</Heading>
        <InfiniteCarousel items={logos} />
      </Section>
      </ScrollRevealWrapper> */}

      {/* 7. Wavy Text Reveal Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Wavy Text Reveal</Heading>
        <ComponentWrapper>
          <WavyText text="Waves of creativity" />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 8. Glowing Neon Button Section */}
      {/* <ScrollRevealWrapper>
        <Section style={{ background: BRAND_COLORS.primary }}>
          <Heading style={{ color: BRAND_COLORS.primary }}>Glowing Neon Button</Heading>
        <ComponentWrapper>
            <NeonButton color={BRAND_COLORS.secondary}>Learn More</NeonButton>
            <NeonButton color={BRAND_COLORS.highlight}>Get Started</NeonButton>
        </ComponentWrapper>
      </Section>
        </ScrollRevealWrapper> */}

      {/* 9. Carousel Component Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Carousel Component</Heading>
        <ComponentWrapper style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <CarouselComponent />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}

      {/* 10. Card Component Section */}
      {/* <ScrollRevealWrapper>
      <Section>
        <Heading>Card Component</Heading>
        <ComponentWrapper>
          <CardComponent />
        </ComponentWrapper>
      </Section>
      </ScrollRevealWrapper> */}
    {/* </SandboxContainer> */}
        <ScrollRevealWrapper>
          <LatestUpdatesComponent />
        </ScrollRevealWrapper>
        <EnterpriseFooterComponent />
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Sandbox;
