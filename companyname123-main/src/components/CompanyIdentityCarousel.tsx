import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { CaretLeft, CaretRight } from "phosphor-react";

export interface CompanyIdentityBlock {
  title: string;
  paragraphs: string[];
}

const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  cta: "#A6CE39",
  white: "#FFFFFF",
  whiteOpacity: { "80": "rgba(255, 255, 255, 0.8)" },
  primaryOpacity: {
    "40": "rgba(0, 94, 150, 0.4)",
    "30": "rgba(0, 94, 150, 0.3)",
    "20": "rgba(0, 94, 150, 0.2)",
    "10": "rgba(0, 94, 150, 0.1)",
  },
};

const TYPOGRAPHY = {
  heading: '"Rubik", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
};

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 1023px) {
    overflow-y: auto;
  }
`;

const BackgroundImage = styled.div<{ $imageUrl?: string; $position?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: ${(p) => (p.$imageUrl ? `url(${p.$imageUrl})` : "none")};
  background-size: cover;
  background-position: ${(p) => p.$position ?? "center"};
  background-repeat: no-repeat;
  z-index: 0;
`;

const SlideContainer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 3rem);
  padding-bottom: clamp(3rem, 6vh, 4rem);
  opacity: ${(p) => (p.$active ? 1 : 0)};
  pointer-events: ${(p) => (p.$active ? "auto" : "none")};
  z-index: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  @media (max-width: 1023px) {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(36rem, 92vw);
  padding: clamp(1.25rem, 3vw, 2.75rem) clamp(1rem, 3vw, 2rem);
  min-height: auto;
  background: ${BRAND_COLORS.primaryOpacity["40"]};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${BRAND_COLORS.primaryOpacity["30"]};
  border-radius: clamp(0.5rem, 1.25vh, 1rem);
  box-shadow: 0 8px 32px ${BRAND_COLORS.primaryOpacity["30"]};

  @media (min-width: 1024px) {
    min-height: 18rem;
  }
`;

const CardTitle = styled.h3`
  font-family: ${TYPOGRAPHY.heading};
  font-size: clamp(1rem, 2.25vw, 1.6rem);
  font-weight: 700;
  color: ${BRAND_COLORS.white};
  margin: 0 0 0.625rem 0;
  line-height: 1.3;
`;

const CardParagraph = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.8125rem, 1.25vw, 1.0625rem);
  line-height: 1.55;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0 0 0.5rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CursorButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: clamp(2rem, 5vw, 3.5rem);
  height: clamp(2rem, 5vw, 3.5rem);
  border-radius: 50%;
  border: 1px solid ${BRAND_COLORS.primaryOpacity["30"]};
  background: ${BRAND_COLORS.primaryOpacity["40"]};
  color: ${BRAND_COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: ${BRAND_COLORS.primaryOpacity["30"]};
    border-color: ${BRAND_COLORS.cta};
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 1023px) {
    top: auto;
    bottom: 3.5rem;
    transform: none;

    &:active {
      transform: scale(0.96);
    }
  }
`;

const CursorLeft = styled(CursorButton)`
  left: clamp(0.5rem, 2vw, 1.5rem);

  @media (max-width: 1023px) {
    left: auto;
    right: calc(clamp(0.5rem, 2vw, 1.5rem) + 3rem);
  }
`;

const CursorRight = styled(CursorButton)`
  right: clamp(0.5rem, 2vw, 1.5rem);
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: clamp(1rem, 3vh, 2rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ProgressBar = styled.div<{ $active: boolean }>`
  position: relative;
  width: 48px;
  height: 3px;
  background: ${(p) => (p.$active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)")};
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 640px) {
    width: 36px;
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

interface CompanyIdentityCarouselProps {
  blocks: CompanyIdentityBlock[];
  sectionTitle?: string;
  images?: string[];
  /** CSS background-position per slide (e.g. "right center", "left center") */
  imagePositions?: string[];
}

export default function CompanyIdentityCarousel({
  blocks,
  images,
  imagePositions,
}: CompanyIdentityCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [key, setKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideDuration = 8000;
  const transitionDuration = 500;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % blocks.length);
      setKey((k) => k + 1);
    }, slideDuration);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, blocks.length]);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= blocks.length) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCurrentSlide(index);
    setKey((k) => k + 1);
  };

  const goPrev = () => {
    goToSlide(currentSlide === 0 ? blocks.length - 1 : currentSlide - 1);
  };

  const goNext = () => {
    goToSlide((currentSlide + 1) % blocks.length);
  };

  if (!blocks || blocks.length === 0) return null;

  return (
    <Section>
      <BackgroundImage
        $imageUrl={images?.[currentSlide]}
        $position={imagePositions?.[currentSlide]}
        aria-hidden
      />

      <SlideContainer $active>
        <Card
          key={currentSlide}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration / 1000, ease: "easeOut" }}
        >
          <CardTitle>{blocks[currentSlide].title}</CardTitle>
          {blocks[currentSlide].paragraphs.map((para, i) => (
            <CardParagraph key={i}>{para}</CardParagraph>
          ))}
        </Card>
      </SlideContainer>

      <ProgressContainer role="tablist" aria-label="Company Identity carousel">
        {blocks.map((_, index) => (
          <ProgressBar
            key={index}
            $active={index === currentSlide}
            onClick={() => goToSlide(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToSlide(index);
              }
            }}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to pillar ${index + 1}: ${blocks[index].title}`}
            tabIndex={0}
          >
            {index === currentSlide && (
              <ProgressFill
                key={`fill-${index}-${key}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: slideDuration / 1000,
                  ease: "linear",
                }}
                aria-hidden
              />
            )}
          </ProgressBar>
        ))}
      </ProgressContainer>
    </Section>
  );
}
