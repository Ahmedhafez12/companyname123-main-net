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
  { name: "Ericsson", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ericsson_%282018%29.svg/1200px-Ericsson_%282018%29.svg.png" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png" },
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
    if (!isMobile && singleSetWidth > 0 && left >= singleSetWidth - 1) {
      isResettingRef.current = true;
      el.scrollLeft = left - singleSetWidth;
      setScrollPosition(el.scrollLeft);
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, [isMobile, singleSetWidth]);

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
      isMobile ||
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
  }, [containerWidth, contentWidth, isHovering, isMobile, singleSetWidth]);

  const stopLoop = useCallback(() => {
    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isMobile) startLoop();
    else stopLoop();
    return () => stopLoop();
  }, [startLoop, stopLoop, isMobile]);

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
        paddingTop: "clamp(0.5rem, 1.5vh, 1rem)",
        paddingBottom: "clamp(0.5rem, 1.5vh, 1rem)",
      }}
    >
      <div
        className={`relative w-full ${fullWidth ? "px-0" : "px-4 sm:px-6"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMobile && isScrollable && (
          <>
            <button
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg bg-black/40 backdrop-blur-md border border-white/20 text-white hover:border-white/40 hover:bg-black/50"
              aria-label="Scroll left"
            >
              <div className="p-1.5">
                <CaretLeft weight="thin" size={20} />
              </div>
            </button>
            <button
              onClick={scrollRight}
              disabled={scrollPosition >= contentWidth - containerWidth}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg bg-black/40 backdrop-blur-md border border-white/20 text-white hover:border-white/40 hover:bg-black/50"
              aria-label="Scroll right"
            >
              <div className="p-1.5">
                <CaretRight weight="thin" size={20} />
              </div>
            </button>
          </>
        )}

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

        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />
          </>
        )}

        <div
          ref={containerRef}
          className={`flex overflow-x-auto scrollbar-hide ${isMobile ? "snap-x snap-mandatory" : ""} ${fullWidth ? "" : isMobile ? "px-4" : ""}`}
          style={{
            paddingTop: "clamp(0.5rem, 1vh, 0.75rem)",
            paddingBottom: "clamp(0.5rem, 1vh, 0.75rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isMobile ? "grab" : "default",
          }}
        >
          <div
            ref={contentRef}
            className={`flex ${isMobile ? "space-x-4" : "space-x-6"} ${fullWidth ? "px-4 sm:px-6" : isMobile ? "px-4" : "px-8"}`}
          >
            {Array.from({ length: isMobile ? 1 : NUM_LOOP_SETS }).map((_, setIndex) =>
              keyCustomers.map((customer, index) => (
                <motion.div
                  key={`set-${setIndex}-${customer.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (setIndex * keyCustomers.length + index) * 0.02 }}
                  whileHover={{ y: -5 }}
                  className={`flex-shrink-0 ${isMobile ? "snap-center" : ""}`}
                >
                  <a
                    href={customer.url ?? CUSTOMER_WEBSITES[customer.name] ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-transparent transition-all duration-300"
                    style={{
                      width: isMobile ? "clamp(80px, 16vw, 100px)" : "clamp(100px, 20vw, 120px)",
                      height: isMobile ? "clamp(40px, 8vw, 50px)" : "clamp(50px, 10vw, 60px)",
                      padding: "clamp(0.5rem, 1vh, 0.75rem)",
                    }}
                    aria-label={`Visit ${customer.name} website`}
                  >
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full w-full h-full object-contain transition-all duration-300 hover:opacity-90"
                      style={{ minHeight: 0, filter: "brightness(0) invert(1) opacity(0.6)" }}
                    />
                  </a>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {isMobile && isScrollable && (
          <div className="flex justify-center mt-4 space-x-3">
            {Array.from({ length: Math.ceil(keyCustomers.length / 2.5) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scroll(index * containerWidth * 0.7)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border ${
                  Math.floor(scrollPosition / (containerWidth * 0.7)) === index
                    ? "bg-white/90 border-white/90 scale-110"
                    : "bg-white/20 border-white/30 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCustomersBanner;
