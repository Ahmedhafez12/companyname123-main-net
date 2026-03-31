import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "phosphor-react";

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
  height: 100%;
  min-height: 100vh;
  scroll-snap-align: start;
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageColumn = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 40vh;
  overflow: hidden;

  @media (min-width: 1024px) {
    min-height: 100%;
  }
`;

const ImageLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentColumn = styled.div`
  background: ${SECTION_COLORS.rightBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
`;

const ContentInner = styled.div`
  max-width: 28rem;
  width: 100%;
`;

const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${SECTION_COLORS.label};
  margin-bottom: 0.75rem;
`;

const Heading = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.75rem 0;
`;

const CtaButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: ${SECTION_COLORS.buttonBg};
  color: #FFFFFF;
  font-size: 1.125rem;
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
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ scale: 1 }}
          animate={isInView ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </ImageColumn>
      <ContentColumn>
        <ContentInner>
          <Label className="font-sans">Our Story</Label>
          <Heading className="font-sans">Beyond the Cables and Connectivity.</Heading>
          <Paragraph className="font-body">
          We exist to bridge the gap between complex infrastructure and seamless communication. Our "why" is simple: we weave the digital fabric that keeps your operations secure, your people linked, and your data moving—so you can lead your industry without worrying about the link.
          </Paragraph>
          <CtaButton
            ref={buttonRef}
            to="/about/overview"
            className="font-sans"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ x: magnetic.x, y: magnetic.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More About Us</span>
            <span className="inline-flex">
              <ArrowRight weight="bold" size={20} />
            </span>
          </CtaButton>
        </ContentInner>
      </ContentColumn>
    </Section>
  );
}
