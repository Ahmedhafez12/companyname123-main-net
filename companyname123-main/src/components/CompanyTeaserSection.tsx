import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "phosphor-react";
import { useTranslation, useLocale } from "../i18n";

const MAGNETIC_STRENGTH = 0.25;
const MAGNETIC_MAX = 12;

const SECTION_COLORS = {
  rightBg: "#005E96",
  label: "#44C8F5",
  buttonBg: "#A6CE39",
  buttonHover: "#7CCCBF",
};

const Section = styled.section`
  width: 100%;
  /* Full-fold height — match NetworkHeroCanvas / HeroCarousel pattern */
  height: min(100dvh, 100svh);
  min-height: 100dvh;
  scroll-snap-align: start;
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;

  /* Fix for iOS Safari */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }

  /* Mobile: equal 50/50 split — image top half, text bottom half */
  @media (max-width: 639px) {
    height: 100dvh;
    min-height: 100dvh;
    grid-template-rows: 50dvh 50dvh;
  }

  /* Tablet: give the image a fixed portion, text below */
  @media (min-width: 640px) and (max-width: 1023px) {
    grid-template-rows: 42vh 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const ImageColumn = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 44vw;
  overflow: hidden;

  /* Mobile: grid row controls height — let it stretch to fill the row */
  @media (max-width: 639px) {
    min-height: 0;
    max-height: none;
    height: 100%;
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    min-height: 100%;
    max-height: none;
  }

  @media (min-width: 1024px) {
    min-height: 100%;
  }
`;

const ImageLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`;

const ContentColumn = styled.div`
  background: ${SECTION_COLORS.rightBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.75rem, 5vw, 4rem);

  @media (max-width: 639px) {
    padding: 1.75rem 1.25rem 2rem;
  }
`;

const ContentInner = styled.div`
  max-width: 28rem;
  width: 100%;

  @media (max-width: 1023px) {
    max-width: 100%;
  }
`;

const Label = styled.span`
  display: block;
  font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${SECTION_COLORS.label};
  margin-bottom: 0.625rem;
`;

const Heading = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.875rem 0;
  line-height: 1.2;
`;

const Paragraph = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1.125rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem 0;
`;

const CtaButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 1.75rem);
  background: ${SECTION_COLORS.buttonBg};
  color: #FFFFFF;
  font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
  font-weight: 700;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background: ${SECTION_COLORS.buttonHover};
  }
`;

const DEFAULT_IMAGE = "/assets/Telecommunications/Network_company_server_corridor_a386952677.jpeg";

interface CompanyTeaserSectionProps {
  backgroundImage?: string;
}

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export default function CompanyTeaserSection({ backgroundImage = DEFAULT_IMAGE }: CompanyTeaserSectionProps) {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.2 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = buttonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
      const deltaY = (e.clientY - centerY) * MAGNETIC_STRENGTH;
      setMagnetic({
        x: clamp(deltaX, MAGNETIC_MAX),
        y: clamp(deltaY, MAGNETIC_MAX),
      });
    },
    []
  );

  const onMouseLeave = useCallback(() => {
    setMagnetic({ x: 0, y: 0 });
  }, []);

  return (
    <Section>
      <ImageColumn ref={imageRef}>
        <ImageLayer
          initial={{ scale: 1 }}
          animate={isInView ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </ImageLayer>
      </ImageColumn>
      <ContentColumn>
        <ContentInner>
          <Label className="font-sans">{t.companyTeaser.label}</Label>
          <Heading className="font-sans">{t.companyTeaser.heading}</Heading>
          <Paragraph className="font-body">
            {t.companyTeaser.body}
          </Paragraph>
          <CtaButton
            ref={buttonRef}
            to={localePath("/about/overview")}
            className="font-sans"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ x: magnetic.x, y: magnetic.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t.companyTeaser.cta}</span>
            <span className={`inline-flex ${isRTL ? "rtl-flip" : ""}`}>
              <ArrowRight weight="bold" size={20} />
            </span>
          </CtaButton>
        </ContentInner>
      </ContentColumn>
    </Section>
  );
}