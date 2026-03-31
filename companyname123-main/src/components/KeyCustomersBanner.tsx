import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "phosphor-react";

interface KeyCustomer {
  name: string;
  logo: string;
  url?: string;
}

interface KeyCustomersBannerProps {
  keyCustomers: KeyCustomer[];
}

const KeyCustomersBanner: React.FC<KeyCustomersBannerProps> = ({
  keyCustomers = [
    {
      name: "STC",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=STC",
    },
    {
      name: "BT",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=BT",
    },
    {
      name: "Ericsson",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Ericsson",
    },
    {
      name: "HP",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=HP",
    },
    {
      name: "Microsoft",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Microsoft",
    },
    {
      name: "Nokia",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Nokia",
    },
    {
      name: "Citibank",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=Citibank",
    },
    {
      name: "IBM",
      logo: "https://via.placeholder.com/120x60/ffffff/005E96?text=IBM",
    },
  ],
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

  // Check if device is mobile
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

  // One set of items width (we render two sets for seamless loop)
  const singleSetWidth = contentWidth > 0 ? contentWidth / 2 : 0;

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isResettingRef.current) return;
    const el = containerRef.current;
    const left = el.scrollLeft;
    setScrollPosition(left);

    // Seamless infinite loop: when we've scrolled one full set, jump back by one set width (no visible jump)
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

  // Infinite loop for desktop: scroll continuously, reset seamlessly when past first set
  const startLoop = useCallback(() => {
    if (
      !containerRef.current ||
      !contentRef.current ||
      isHovering ||
      contentWidth <= containerWidth ||
      isMobile ||
      singleSetWidth <= 0
    ) {
      return;
    }

    loopInterval.current = setInterval(() => {
      if (!containerRef.current || isResettingRef.current) return;
      const el = containerRef.current;
      const scrollStep = 2;
      const newPosition = el.scrollLeft + scrollStep;

      // If we've scrolled past the first set, instantly jump back (seamless - duplicate content looks the same)
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
    if (!isMobile) {
      startLoop();
    } else {
      stopLoop();
    }

    return () => {
      stopLoop();
    };
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

  const customerWebsites = {
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

  // Mobile navigation handlers
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
    <div className="relative overflow-hidden bg-transparent" style={{ 
      paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
      paddingBottom: 'clamp(1rem, 2vh, 1.5rem)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}
      >
        <h2 className="font-bold text-white" style={{ 
          fontSize: 'clamp(1.25rem, 2.5vh, 1.875rem)',
          marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
        }}>
          Trusted by Industry Leaders
        </h2>
        <p className="text-white/80" style={{ 
          fontSize: 'clamp(0.875rem, 1.5vh, 1rem)'
        }}>
          Partnering with global enterprises to deliver innovative
          telecommunications solutions.
        </p>
      </motion.div>

      <div
        className="relative w-full px-4 sm:px-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mobile Navigation Arrows */}
        {isMobile && isScrollable && (
          <>
            <button
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-cta hover:bg-white/30 transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
              aria-label="Scroll left"
            >
              <div className="p-1.5">
                <CaretLeft weight="thin" size={20} />
              </div>
            </button>

            <button
              onClick={scrollRight}
              disabled={scrollPosition >= contentWidth - containerWidth}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-cta hover:bg-white/30 transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
              aria-label="Scroll right"
            >
              <div className="p-1.5">
                <CaretRight weight="thin" size={20} />
              </div>
            </button>
          </>
        )}

        {/* Desktop Navigation Arrows (only show when hovering and scrollable) */}
        {!isMobile && isScrollable && isHovering && (
          <>
            <button
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-cta transition-colors duration-300 focus:outline-none opacity-70 hover:opacity-100"
              aria-label="Scroll left"
            >
              <div className="p-2">
                <CaretLeft
                  weight="thin"
                  size={20}
                  className={scrollPosition <= 0 ? "opacity-50" : "opacity-100"}
                />
              </div>
            </button>

            <button
              onClick={scrollRight}
              disabled={scrollPosition >= contentWidth - containerWidth}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-cta transition-colors duration-300 focus:outline-none opacity-70 hover:opacity-100"
              aria-label="Scroll right"
            >
              <div className="p-2">
                <CaretRight
                  weight="thin"
                  size={20}
                  className={
                    scrollPosition >= contentWidth - containerWidth
                      ? "opacity-50"
                      : "opacity-100"
                  }
                />
              </div>
            </button>
          </>
        )}

        {/* Gradient overlays for desktop */}
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#005E96] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#005E96] to-transparent z-10"></div>
          </>
        )}

        <div
          ref={containerRef}
          className={`flex overflow-x-auto scrollbar-hide ${
            isMobile ? "snap-x snap-mandatory px-4" : ""
          }`}
          style={{
            paddingTop: 'clamp(0.75rem, 1.5vh, 1rem)',
            paddingBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isMobile ? "grab" : "default",
          }}
        >
          <div
            ref={contentRef}
            className={`flex ${isMobile ? "space-x-4" : "space-x-6"} ${
              isMobile ? "px-4" : "px-8"
            }`}
          >
            {keyCustomers.map((customer, index) => (
              <motion.div
                key={`${customer.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`flex-shrink-0 ${isMobile ? "snap-center" : ""}`}
              >
                <a
                  href={
                    customer.url ??
                    customerWebsites[
                      customer.name as keyof typeof customerWebsites
                    ] ??
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                  style={{
                    width: isMobile ? 'clamp(80px, 16vw, 100px)' : 'clamp(100px, 20vw, 120px)',
                    height: isMobile ? 'clamp(40px, 8vw, 50px)' : 'clamp(50px, 10vw, 60px)',
                    padding: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}
                  aria-label={`Visit ${customer.name} website`}
                >
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className={`max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 ${
                      isMobile ? "filter brightness-110" : ""
                    } ${customer.name === "IBM" ? "brightness-0" : ""}`}
                  />
                </a>
              </motion.div>
            ))}
            {/* Duplicate items for seamless infinite loop on desktop */}
            {!isMobile &&
              keyCustomers.map((customer, index) => (
                <motion.div
                  key={`duplicate-${customer.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0"
                >
                  <a
                    href={
                      customer.url ??
                      customerWebsites[
                        customer.name as keyof typeof customerWebsites
                      ] ??
                      "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                    style={{
                      width: isMobile ? 'clamp(80px, 16vw, 100px)' : 'clamp(100px, 20vw, 120px)',
                      height: isMobile ? 'clamp(40px, 8vw, 50px)' : 'clamp(50px, 10vw, 60px)',
                      padding: 'clamp(0.5rem, 1vh, 0.75rem)'
                    }}
                    aria-label={`Visit ${customer.name} website`}
                  >
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      className={`max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 ${
                        isMobile ? "filter brightness-110" : ""
                      } ${customer.name === "IBM" ? "brightness-0" : ""}`}
                    />
                  </a>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Mobile scroll indicator dots */}
        {isMobile && isScrollable && (
          <div className="flex justify-center mt-6 space-x-3">
            {Array.from({ length: Math.ceil(keyCustomers.length / 2.5) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => scroll(index * containerWidth * 0.7)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                    Math.floor(scrollPosition / (containerWidth * 0.7)) ===
                    index
                      ? "bg-white scale-110 border-white"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyCustomersBanner;
