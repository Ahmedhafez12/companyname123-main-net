import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "phosphor-react";

export interface HeroKeyCustomer {
  name: string;
  logo: string;
  url?: string;
}

interface HeroCustomersBannerProps {
  keyCustomers?: HeroKeyCustomer[];
  fullWidth?: boolean;
}

const DEFAULT_CUSTOMERS: HeroKeyCustomer[] = [
  { name: "STC", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg" },
  { name: "BT", logo: "https://static.cdnlogo.com/logos/b/58/bt-3.svg" },
  { name: "Ericsson", logo: "https://companieslogo.com/img/orig/ERIC_BIG-6f963a82.png?t=1720244491" },
  { name: "HP", logo: "https://companieslogo.com/img/orig/HPQ-30e5d607.png?t=1740329963" },
  { name: "Microsoft", logo: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png" },
  { name: "Nokia", logo: "https://www.nokia.com/themes/custom/onenokia_reskin/logo.svg" },
  { name: "Citibank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Goldman Sachs", logo: "https://static.wikia.nocookie.net/logopedia/images/b/b7/Goldman_Sachs_monogram_2024.svg" },
  { name: "Oracle", logo: "/assets/oracle-logo.svg" },
  { name: "Xerox", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Xerox_logo.svg" },
  { name: "JP Morgan", logo: "https://www.jpmorgan.com/content/dam/logos-global/logo-jpm-brown.svg" },
];

const CUSTOMER_WEBSITES: Record<string, string> = {
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

const HeroCustomersBanner: React.FC<HeroCustomersBannerProps> = ({
  keyCustomers = DEFAULT_CUSTOMERS,
  fullWidth = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loopInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isResettingRef = useRef(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const calculateWidths = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkMobile();
    calculateWidths();
    const onResize = () => {
      checkMobile();
      calculateWidths();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calculateWidths, checkMobile, keyCustomers]);

  const scroll = useCallback((newPosition: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  }, []);

  const NUM_LOOP_SETS = 4;
  const singleSetWidth = contentWidth > 0 ? contentWidth / NUM_LOOP_SETS : 0;

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isResettingRef.current) return;
    const el = containerRef.current;
    const left = el.scrollLeft;
    setScrollPosition(left);
    if (singleSetWidth > 0 && left >= singleSetWidth - 1) {
      isResettingRef.current = true;
      el.scrollLeft = left - singleSetWidth;
      setScrollPosition(el.scrollLeft);
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, [singleSetWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const startLoop = useCallback(() => {
    if (
      !containerRef.current ||
      !contentRef.current ||
      isHovering ||
      contentWidth <= containerWidth ||
      singleSetWidth <= 0
    ) return;

    loopInterval.current = setInterval(() => {
      if (!containerRef.current || isResettingRef.current) return;
      const el = containerRef.current;
      const scrollStep = 2;
      const newPosition = el.scrollLeft + scrollStep;
      if (newPosition >= singleSetWidth) {
        isResettingRef.current = true;
        el.scrollLeft = newPosition - singleSetWidth;
        setScrollPosition(el.scrollLeft);
        requestAnimationFrame(() => {
          isResettingRef.current = false;
        });
      } else {
        el.scrollLeft = newPosition;
        setScrollPosition(el.scrollLeft);
      }
    }, 25);
  }, [containerWidth, contentWidth, isHovering, singleSetWidth]);

  const stopLoop = useCallback(() => {
    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }
  }, []);

  useEffect(() => {
    startLoop();
    return () => stopLoop();
  }, [startLoop, stopLoop]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
      stopLoop();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
      startLoop();
    }
  };

  const isScrollable = contentWidth > containerWidth;

  const scrollLeft = () => {
    const scrollAmount = containerWidth * 0.7;
    scroll(Math.max(0, scrollPosition - scrollAmount));
  };

  const scrollRight = () => {
    const scrollAmount = containerWidth * 0.7;
    const maxScroll = contentWidth - containerWidth;
    scroll(Math.min(maxScroll, scrollPosition + scrollAmount));
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        paddingTop: "clamp(0.375rem, 1vh, 0.75rem)",
        paddingBottom: "clamp(0.375rem, 1vh, 0.75rem)",
      }}
    >
      {/* Semi-transparent backdrop strip so logos read on any bg */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none z-0" aria-hidden />

      <div
        className={`relative w-full z-10 ${fullWidth ? "px-0" : "px-4 sm:px-6"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Desktop: fade edge gradients */}
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />
          </>
        )}

        {/* Desktop hover arrows */}
        {!isMobile && isScrollable && isHovering && (
          <>
            <button
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors duration-300 focus:outline-none opacity-70 hover:opacity-100"
              aria-label="Scroll left"
            >
              <div className="p-2">
                <CaretLeft weight="thin" size={20} className={scrollPosition <= 0 ? "opacity-50" : "opacity-100"} />
              </div>
            </button>
            <button
              onClick={scrollRight}
              disabled={scrollPosition >= contentWidth - containerWidth}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors duration-300 focus:outline-none opacity-70 hover:opacity-100"
              aria-label="Scroll right"
            >
              <div className="p-2">
                <CaretRight
                  weight="thin"
                  size={20}
                  className={scrollPosition >= contentWidth - containerWidth ? "opacity-50" : "opacity-100"}
                />
              </div>
            </button>
          </>
        )}

        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{
            paddingTop: "clamp(0.375rem, 0.75vh, 0.625rem)",
            paddingBottom: "clamp(0.375rem, 0.75vh, 0.625rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "default",
            paddingLeft: fullWidth ? "clamp(0.75rem, 3vw, 2rem)" : undefined,
            paddingRight: fullWidth ? "clamp(0.75rem, 3vw, 2rem)" : undefined,
          }}
        >
          <div
            ref={contentRef}
            className="flex space-x-4 sm:space-x-6"
          >
            {Array.from({ length: NUM_LOOP_SETS }).map((_, setIndex) =>
              keyCustomers.map((customer, index) => (
                <motion.div
                  key={`set-${setIndex}-${customer.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (setIndex * keyCustomers.length + index) * 0.02 }}
                  whileHover={!isMobile ? { y: -3 } : {}}
                  className="flex-shrink-0"
                >
                  <a
                    href={customer.url ?? CUSTOMER_WEBSITES[customer.name] ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-transparent transition-all duration-300"
                    style={{
                      width: isMobile ? "clamp(64px, 14vw, 88px)" : "clamp(88px, 16vw, 120px)",
                      height: isMobile ? "clamp(28px, 6vw, 40px)" : "clamp(36px, 7vw, 52px)",
                      padding: isMobile ? "0.25rem 0.375rem" : "clamp(0.375rem, 0.75vh, 0.625rem)",
                    }}
                    aria-label={`Visit ${customer.name} website`}
                  >
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full w-full h-full object-contain transition-all duration-300"
                      style={{
                        minHeight: 0,
                        filter: "brightness(0) invert(1) opacity(0.65)",
                      }}
                    />
                  </a>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroCustomersBanner;