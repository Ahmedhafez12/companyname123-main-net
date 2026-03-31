import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import HeroCustomersBanner from "./HeroCustomersBanner";

// Brand Color Variables
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
  },
  blackOpacity: {
    "90": "rgba(0, 0, 0, 0.9)",
    "80": "rgba(0, 0, 0, 0.8)",
    "75": "rgba(0, 0, 0, 0.75)",
    "60": "rgba(0, 0, 0, 0.6)",
    "50": "rgba(0, 0, 0, 0.5)",
    "40": "rgba(0, 0, 0, 0.4)",
    "30": "rgba(0, 0, 0, 0.3)",
    "20": "rgba(0, 0, 0, 0.2)",
    "10": "rgba(0, 0, 0, 0.1)",
    "05": "rgba(0, 0, 0, 0.05)",
  },
  primaryOpacity: {
    "80": "rgba(0, 94, 150, 0.8)",
    "60": "rgba(0, 94, 150, 0.6)",
    "40": "rgba(0, 94, 150, 0.4)",
    "20": "rgba(0, 94, 150, 0.2)",
    "15": "rgba(0, 94, 150, 0.15)",
    "10": "rgba(0, 94, 150, 0.1)",
    "05": "rgba(0, 94, 150, 0.05)",
  },
};

// Typography Variables
const TYPOGRAPHY = {
  heading: '"Rubik", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
};

// Slide data (local assets from /assets/Telecommunications and /assets/Command & Control)
type Slide = {
  id: number;
  department: string;
  title: string;
  subline: string;
  image: string;
  link: string;
};

const slides: Slide[] = [
  {
    id: 1,
    department: "Telecommunications",
    title: "Telecommunication -Solutions",
    subline: "Transforming infrastructure chaos into competitive advantage with intelligent connectivity solutions that protect your past while accelerating your future.",
    image: "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_delpmaspu.png",
    link: "/what-we-do/telecommunications",
  },
  {
    id: 2,
    department: "Command & Control",
    title: "Command & Control -Solutions",
    subline: "Connecting the dots between your ELV and other systems—ensuring smooth data flow, improved performance, and intelligent automation.",
    image: "/assets/CommandandControl/Control_room_with_screens_37be293209.png",
    link: "/what-we-do/command-control",
  },
  {
    id: 3,
    department: "Fixed Wireless Access",
    title: "Fixed Wireless Access -Solutions",
    subline: "High-speed enterprise connectivity delivered without the wires.",
    image: "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_delpmaspu12.png",
    link: "/solutions",
  },
];

// Styled Components
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: clamp(5rem, 10vh, 6rem);

  /* Fix for iOS Safari 100vh issue */
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

/* Extend background to cover padding and any viewport gap so no section background shows at top/bottom */
const SlideContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(-1 * clamp(5rem, 10vh, 6rem));
  bottom: -2rem;
  width: 100%;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{
  $imageUrl: string;
  $zoomActive: boolean;
  $slideDurationMs: number;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform-origin: center center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  @keyframes hero-carousel-bg-zoom {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.12);
    }
  }

  ${props =>
    props.$zoomActive
      ? css`
          animation-name: hero-carousel-bg-zoom;
          animation-duration: ${props.$slideDurationMs}ms;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          animation-iteration-count: 1;
        `
      : css`
          animation: none;
          transform: scale(1);
        `}
`;

const BackgroundImageMotionWrap = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${BRAND_COLORS.blackOpacity["80"]} 0%,
    ${BRAND_COLORS.blackOpacity["60"]} 50%,
    ${BRAND_COLORS.blackOpacity["40"]} 100%
  );
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const GlassCard = styled(motion.div)`
  background: ${BRAND_COLORS.primaryOpacity["40"]};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${BRAND_COLORS.primaryOpacity["40"]};
  border-radius: 1.5rem;
  padding: clamp(2rem, 4vw, 3.5rem);
  max-width: 42rem;
  width: 100%;
  box-shadow: 0 8px 32px 0 ${BRAND_COLORS.primaryOpacity["40"]};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  word-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  position: relative;
`;

const SlideTitle = styled(motion.h1)`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(2rem, 4vw + 0.75rem, 3.5rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin: 0;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  
  .gradient-text {
    background: linear-gradient(135deg, ${BRAND_COLORS.cta}, ${BRAND_COLORS.highlight}, ${BRAND_COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SlideDepartment = styled(motion.div)<{ $color: string }>`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.75rem, 1.25vw, 0.875rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.$color};
  margin-bottom: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  flex-shrink: 0;
  
  &::before {
    content: '';
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.$color}, transparent);
    flex-shrink: 0;
  }
`;

const SlideSubline = styled(motion.p)`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(1.125rem, 1.5vw, 1.25rem);
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
`;

const CTAButtonWrapper = styled(motion.div)`
  margin-top: 0.5rem;
  width: fit-content;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: transparent;
  backdrop-filter: blur(2px);
  color: ${BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-weight: 600;
  border: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${BRAND_COLORS.whiteOpacity["10"]};
    border-color: ${BRAND_COLORS.whiteOpacity["40"]};
    transform: translateY(-2px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 640px) {
    bottom: 1rem;
    gap: 0.375rem;
  }
`;

const ProgressBar = styled.div<{ $isActive: boolean }>`
  width: 60px;
  height: 3px;
  background: ${props => props.$isActive ? BRAND_COLORS.whiteOpacity["30"] : BRAND_COLORS.whiteOpacity["10"]};
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  @media (max-width: 640px) {
    width: 40px;
    height: 2px;
  }
`;

const ProgressFill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, ${BRAND_COLORS.cta}, ${BRAND_COLORS.secondary});
  border-radius: 2px;
`;

const BannerWrapper = styled.div`
  position: absolute;
  bottom: 3.5rem;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 3;
  padding: 0;

  @media (max-width: 640px) {
    bottom: 3rem;
  }
`;

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [key, setKey] = useState<number>(0); // Key to restart zoom in/out cycle when slide changes
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slideDuration = 8000; // 8 seconds
  const transitionDuration = 700; // 0.7 seconds

  useEffect(() => {
    // Reset key to restart zoom in / zoom out cycle
    setKey((prev) => prev + 1);

    // Auto-advance slides
    const timeoutId = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    intervalRef.current = timeoutId;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    // Validate index
    if (index < 0 || index >= slides.length) return;
    
    // Clear existing timeout
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Update slide and restart animations
    setCurrentSlide(index);
    setKey((prev) => prev + 1);
  };

  // Department color per slide: 1st = primary, 3rd = cta, others = secondary
  const getDepartmentColor = (index: number) => {
    if (index === 0) return BRAND_COLORS.cta;
    if (index === 1) return BRAND_COLORS.highlight;
    if (index === 2) return BRAND_COLORS.secondary;
    return BRAND_COLORS.secondary;
  };

  // First word gradient, rest white
  const getHighlightedTitle = (title: string) => {
    const words = title.split(" -");
    return words.map((word, i) =>
      i === 0 ? (
        <span key={i} className="gradient-text">{word} </span>
      ) : (
        <span key={i}>{word} </span>
      )
    );
  };

  return (
    <HeroSection>
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <SlideContainer
            key={slide.id}
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 1 : 0,
            }}
          >
            <BackgroundImageMotionWrap
              key={`bg-${slide.id}-${isActive ? key : "hidden"}`}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{
                duration: transitionDuration / 1000,
                ease: "easeInOut",
              }}
            >
              <BackgroundImage
                $imageUrl={slide.image}
                $zoomActive={isActive}
                $slideDurationMs={slideDuration}
              />
            </BackgroundImageMotionWrap>
            <Overlay
              as={motion.div}
              initial={false}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: transitionDuration / 1000 }}
            />
            <ContentContainer>
              <GlassCard
                initial={false}
                animate={
                  isActive
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -50 }
                }
                transition={{ duration: transitionDuration / 1000 }}
                style={{
                  position: "relative",
                  willChange: isActive ? "transform, opacity" : "auto",
                }}
              >
                <SlideDepartment
                  $color={getDepartmentColor(index)}
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {slide.department}
                </SlideDepartment>
                <SlideTitle
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {getHighlightedTitle(slide.title)}
                </SlideTitle>
                <SlideSubline
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {slide.subline}
                </SlideSubline>
                <CTAButtonWrapper
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <CTAButton to={slide.link}>
                    <span>Explore Department</span>
                    <div className="p-0.5">
                      <ArrowRight weight="thin" size={20} />
                    </div>
                  </CTAButton>
                </CTAButtonWrapper>
              </GlassCard>
            </ContentContainer>
          </SlideContainer>
        );
      })}

      <BannerWrapper>
        <HeroCustomersBanner fullWidth />
      </BannerWrapper>

      <ProgressContainer role="tablist" aria-label="Carousel navigation">
        {slides.map((slide, index) => (
          <ProgressBar
            key={index}
            $isActive={index === currentSlide}
            onClick={() => goToSlide(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToSlide(index);
              }
            }}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            {index === currentSlide && (
              <ProgressFill
                key={`progress-${index}-${key}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: slideDuration / 1000,
                  ease: "linear",
                }}
                aria-hidden="true"
              />
            )}
          </ProgressBar>
        ))}
      </ProgressContainer>
    </HeroSection>
  );
};

export default HeroCarousel;

