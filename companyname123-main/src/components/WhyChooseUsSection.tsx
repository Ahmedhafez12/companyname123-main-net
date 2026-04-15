import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CaretDown, ArrowRight, Target, Trophy, Users, TrendUp, Shield } from "phosphor-react";
import ScrollReveal from "./ScrollReveal";

const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  cta: "#A6CE39",
  white: "#FFFFFF",
  whiteOpacity: {
    "80": "rgba(255, 255, 255, 0.8)",
    "10": "rgba(255, 255, 255, 0.1)",
    "05": "rgba(255, 255, 255, 0.05)",
  },
  primaryOpacity: {
    "20": "rgba(0, 94, 150, 0.2)",
    "15": "rgba(0, 94, 150, 0.15)",
    "10": "rgba(0, 94, 150, 0.1)",
    "05": "rgba(0, 94, 150, 0.05)",
  },
};

const TYPOGRAPHY = {
  heading: '"Rubik", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
};

const ValuePropSection = styled.section`
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
`;

const ValuePropContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: stretch;
  overflow: hidden;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  /* On mobile/tablet: image first (fixed height), accordion second (auto) */
  @media (max-width: 1023px) {
    grid-template-rows: 220px auto;
  }
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
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin-bottom: 1rem;
  margin-top: 0;
  max-width: 42rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AccordionItem = styled(motion.div)`
  border: 1px solid ${BRAND_COLORS.primaryOpacity["20"]};
  border-radius: 0.5rem;
  background: ${BRAND_COLORS.primaryOpacity["10"]};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow: hidden;

  &:hover {
    border-color: ${BRAND_COLORS.primaryOpacity["20"]};
  }
`;

const AccordionHeader = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
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

  &:hover {
    background: ${BRAND_COLORS.primaryOpacity["05"]};
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
    color: ${BRAND_COLORS.cta};
    font-size: 1.25em;
    line-height: 1;
  }
`;

const ValuePropLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1rem, 2.5vh, 2.5rem) clamp(1rem, 4vw, 3rem);
  max-width: 42rem;
`;

const AccordionIcon = styled(motion.div)`
  color: ${BRAND_COLORS.cta};
  flex-shrink: 0;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const AccordionText = styled.p`
  font-family: ${TYPOGRAPHY.body};
  font-size: clamp(0.9375rem, 1.25vw, 1.125rem);
  line-height: 1.5;
  color: ${BRAND_COLORS.whiteOpacity["80"]};
  margin: 0;
  padding: 0 1rem 0.875rem 1rem;
  padding-left: calc(1rem + 1.25rem);
`;

const ValuePropRight = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 220px;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  background: ${BRAND_COLORS.primaryOpacity["15"]};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: none;
  order: 1;

  @media (min-width: 1024px) {
    min-height: 100%;
    order: 1;
    border-right: 1px solid ${BRAND_COLORS.primaryOpacity["20"]};
  }
`;

const ValuePropImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 220px;
  background-image: url("/assets/abstracts/Digital_stream_of_information_abstract_flowing_fib_delpmaspu.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    min-height: 100%;
  }
`;

const FEATURES = [
  {
    icon: <div className="p-1"><Target weight="thin" size={20} /></div>,
    heading: "Legacy-to-Modern Migration",
    subtext: "We transition legacy systems to modern platforms with minimal risk and disruption.",
  },
  {
    icon: <div className="p-1"><Trophy weight="thin" size={20} /></div>,
    heading: "End-to-End Solutions",
    subtext: "Comprehensive solutions across UC, contact center, gateways, and command and control as a single partner.",
  },
  {
    icon: <div className="p-1"><Users weight="thin" size={20} /></div>,
    heading: "Proactive Managed Services",
    subtext: "Ongoing monitoring, support, and optimization for peak performance.",
  },
  {
    icon: <div className="p-1"><TrendUp weight="thin" size={20} /></div>,
    heading: "Agile, Senior-Led Teams",
    subtext: "Teams that adapt to your timelines and budgets with predictable outcomes.",
  },
  {
    icon: <div className="p-1"><Shield weight="thin" size={20} /></div>,
    heading: "Clear Business Outcomes",
    subtext: "Measurable results: productivity, customer experience, and cost efficiency for growth.",
  },
];

export default function WhyChooseUsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ValuePropSection>
      <ValuePropContainer>
        <div className="h-full flex justify-center items-center" style={{ order: 2 }}>
          <ScrollReveal direction="up" delay={0}>
            <ValuePropLeftWrapper>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                <ValuePropTitle>
                  Value <span>Proposition</span>
                </ValuePropTitle>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary" style={{ fontFamily: TYPOGRAPHY.heading }}>5</div>
                  <div className="text-sm text-white/70">Reasons</div>
                </div>
              </div>
              <ValuePropSubtitle>
                What sets us apart in delivering transformative technology solutions.
              </ValuePropSubtitle>
              <FeatureList>
                {FEATURES.map((feature, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <AccordionItem key={feature.heading}>
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
                          <div className="p-0.5"><CaretDown weight="thin" size={20} /></div>
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
              {/* <div className="mt-6 flex justify-start">
                <Link to="/about/overview" className="btn-primary inline-flex items-center gap-2 group text-base sm:text-lg px-5 py-2.5">
                  <span>Learn about us</span>
                  <span className="p-0.5 group-hover:translate-x-0.5"><ArrowRight weight="thin" size={20} /></span>
                </Link>
              </div> */}
            </ValuePropLeftWrapper>
          </ScrollReveal>
        </div>
        <ValuePropRight>
          <ValuePropImagePlaceholder />
        </ValuePropRight>
      </ValuePropContainer>
    </ValuePropSection>
  );
}
