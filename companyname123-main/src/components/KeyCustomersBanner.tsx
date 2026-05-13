import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../i18n";

interface KeyCustomer {
  name: string;
  logo: string;
  url?: string;
}

interface KeyCustomersBannerProps {
  keyCustomers: KeyCustomer[];
}

const customerWebsites: Record<string, string> = {
  STC: "https://www.stc.com.sa/",
  BT: "https://www.bt.com/",
  Ericsson: "https://www.ericsson.com/",
  HP: "https://www.hp.com/",
  Microsoft: "https://www.microsoft.com/",
  Nokia: "https://www.nokia.com/",
  Citibank: "https://www.citibank.com/",
  IBM: "https://www.ibm.com/",
  "Goldman Sachs": "https://www.goldmansachs.com/",
  Oracle: "https://www.oracle.com/",
  Xerox: "https://www.xerox.com/",
  "JP Morgan": "https://www.jpmorgan.com/",
};

const LogoCard = ({ customer, id, visitLabel }: { customer: KeyCustomer; id: string; visitLabel: string }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -4 }}
    className="flex-shrink-0"
  >
    <a
      href={customer.url ?? customerWebsites[customer.name] ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
      style={{
        width: 'clamp(90px, 18vw, 120px)',
        height: 'clamp(44px, 9vw, 60px)',
        padding: 'clamp(0.5rem, 1vh, 0.75rem)',
      }}
      aria-label={visitLabel.replace("{name}", customer.name)}
    >
      <img
        src={customer.logo}
        alt={`${customer.name} logo`}
        loading="lazy"
        className={`max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 ${
          customer.name === "IBM" ? "brightness-0" : ""
        }`}
      />
    </a>
  </motion.div>
);

const KeyCustomersBanner: React.FC<KeyCustomersBannerProps> = ({
  keyCustomers = [
    { name: "STC", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=STC" },
    { name: "BT", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=BT" },
    { name: "Ericsson", logo: "https://companieslogo.com/img/orig/ERIC_BIG-6f963a82.png?t=1720244491" },
    { name: "HP", logo: "https://companieslogo.com/img/orig/HPQ-30e5d607.png?t=1740329963" },
    { name: "Microsoft", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Microsoft" },
    { name: "Nokia", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Nokia" },
    { name: "Citibank", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Citibank" },
    { name: "IBM", logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=IBM" },
  ],
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const loopInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isResettingRef = useRef(false);
  // Respect the user's motion preference — skip auto-scroll if reduced motion is preferred
  const [prefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const calculateWidths = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    calculateWidths();
    window.addEventListener("resize", calculateWidths);
    return () => window.removeEventListener("resize", calculateWidths);
  }, [calculateWidths, keyCustomers]);

  // One set width = half of total (we render two copies for seamless loop)
  const singleSetWidth = contentWidth > 0 ? contentWidth / 2 : 0;

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isResettingRef.current || singleSetWidth <= 0) return;
    const el = containerRef.current;
    if (el.scrollLeft >= singleSetWidth - 1) {
      isResettingRef.current = true;
      el.scrollLeft = el.scrollLeft - singleSetWidth;
      requestAnimationFrame(() => { isResettingRef.current = false; });
    }
  }, [singleSetWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const stopLoop = useCallback(() => {
    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();
    if (!containerRef.current || !contentRef.current || isHovering || singleSetWidth <= 0 || prefersReducedMotion) return;
    loopInterval.current = setInterval(() => {
      if (!containerRef.current || isResettingRef.current) return;
      const el = containerRef.current;
      const next = el.scrollLeft + 1.5;
      if (next >= singleSetWidth) {
        isResettingRef.current = true;
        el.scrollLeft = next - singleSetWidth;
        requestAnimationFrame(() => { isResettingRef.current = false; });
      } else {
        el.scrollLeft = next;
      }
    }, 20);
  }, [isHovering, singleSetWidth, stopLoop, prefersReducedMotion]);

  useEffect(() => {
    startLoop();
    return () => stopLoop();
  }, [startLoop, stopLoop]);

  const visitLabel = t.heroBanner.visitAriaLabel;

  return (
    <div
      className="relative overflow-hidden bg-transparent"
      style={{
        paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
        paddingBottom: 'clamp(1rem, 2vh, 1.5rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}
      >
        <h2
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vh, 1.875rem)',
            marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
          }}
        >
          {t.heroBanner.trustedHeading}
        </h2>
        <p className="text-white/80" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>
          {t.heroBanner.trustedSubtitle}
        </p>
      </motion.div>

      <div
        className="relative w-full"
        onMouseEnter={() => { setIsHovering(true); stopLoop(); }}
        onMouseLeave={() => { setIsHovering(false); }}
      >
        {/* Fade-out edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#003d66] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#003d66] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          dir="ltr"
          className="flex overflow-x-auto select-none"
          style={{
            paddingTop: 'clamp(0.75rem, 1.5vh, 1rem)',
            paddingBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
          }}
        >
          <div ref={contentRef} className="flex gap-4 sm:gap-6 px-6 sm:px-10">
            {/* Original set */}
            {keyCustomers.map((customer, index) => (
              <LogoCard
                key={`${customer.name}-${index}`}
                id={`${customer.name}-${index}`}
                customer={customer}
                visitLabel={visitLabel}
              />
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {keyCustomers.map((customer, index) => (
              <LogoCard
                key={`dup-${customer.name}-${index}`}
                id={`dup-${customer.name}-${index}`}
                customer={customer}
                visitLabel={visitLabel}
              />
            ))}
          </div>
        </div>

        {/* Swipe hint — mobile only */}
        <p
          className="flex sm:hidden items-center justify-center gap-1.5 mt-2 select-none"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}
          aria-hidden
        >
          <span>←</span> {t.heroBanner.swipeHint} <span>→</span>
        </p>
      </div>
    </div>
  );
};

export default KeyCustomersBanner;
