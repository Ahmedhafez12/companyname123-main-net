import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { clsx } from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import CambiumLogo from "/assets/Cambium-Networks-Logo.png"; // Adjust the path as necessary

const partners = [
  {
    name: "FORA",
    logo: "https://cdn.shopify.com/s/files/1/0510/8655/7362/files/FORA_Logo_e69f5314-5a32-440e-9f1b-a3d2f9676bb1.png",
    category: "technology",
    website: "https://foracare.com/",
  },
  {
    name: "Cambium Networks",
    logo: CambiumLogo,
    category: "infrastructure",
    website: "https://www.cambiumnetworks.com/",
  },
  {
    name: "Patton",
    logo: "https://tritech.co.il/wp-content/uploads/2018/04/formation-patton-1.png",
    category: "connectivity",
    website: "https://www.patton.com/",
  },
  {
    name: "IP Technology Labs",
    logo: "https://iptechlabs.com/wp-content/uploads/BrandingGraphicsLogos/IPTL_Logo_Transparent_PNG.png",
    category: "technology",
    website: "https://iptechlabs.com/",
  },
  {
    name: "Media5",
    logo: "https://documentation.media5corp.com/download/attachments/16551695/media5corporation_standard.png",
    category: "media",
    website: "https://www.media5corp.com/",
  },
  {
    name: "Kerpen Datacom",
    logo: "https://www.secomp.nl/thumbor/OrDiZJB3a2ytXjNkifZBsqPip3A=/filters:cachevalid(2022-11-18T15:16:15.230772):strip_icc():strip_exif()/cms_secde/cms/ueber_uns/markenwelt/kerpen_datacom/kerpen-datacom.png",
    category: "infrastructure",
    website: "https://www.kerpen-data.com/en/",
  },
  {
    name: "AVAYA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Avaya.svg/2560px-Avaya.svg.png",
    category: "communication",
    website: "https://www.avaya.com/",
  },
  {
    name: "3CX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/3CX_logo.svg/2560px-3CX_logo.svg.png",
    category: "technology",
    website: "https://www.3cx.com/",
  },
  {
    name: "Inseego",
    logo: "https://companieslogo.com/img/orig/INSG_BIG-94409d15.png",
    category: "connectivity",
    website: "https://inseego.com/",
  },
  {
    name: "J&R Technology",
    logo: "https://www.jrtelephone.com/uploads/7137/logo.png",
    category: "technology",
    website: "https://www.jrtelephone.com/",
  },
];

const PartnerLogos = () => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Determine how many slides to show based on viewport width
  const getSlidesToShow = useCallback(() => {
    if (viewportWidth < 640) return 1; // Mobile
    if (viewportWidth < 768) return 2; // Small tablets
    if (viewportWidth < 1024) return 3; // Large tablets
    return 4; // Desktop
  }, [viewportWidth]);

  // Create an autoplay plugin with custom delay and stopOnInteraction settings
  const autoplayOptions = {
    delay: 3000, // 3 seconds
    stopOnInteraction: true, // Stop autoplay on user interaction for better mobile experience
    rootNode: (emblaRoot: { parentElement: HTMLElement | null }) => emblaRoot.parentElement,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      slidesToScroll: 1,
      duration: 30,
      breakpoints: {
        "(max-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 641px) and (max-width: 768px)": { slidesToScroll: 1 },
        "(min-width: 769px) and (max-width: 1024px)": { slidesToScroll: 1 },
        "(min-width: 1025px)": { slidesToScroll: 1 },
      },
    },
    [Autoplay(autoplayOptions)]
  );

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      // Hide controls on very small screens
      setShowControls(width > 480);
      // Set mobile state for pagination style
      setIsMobile(width < 640);

      // Reinitialize Embla when screen size changes significantly
      if (emblaApi) {
        emblaApi.reInit();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    // Recalculate on resize
    const handleResize = () => {
      emblaApi.reInit();
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      emblaApi.off("select", onSelect);
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full" style={{ paddingTop: 'clamp(1rem, 2vh, 1.5rem)', paddingBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
      <div className="container mx-auto px-4">
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
            Key Partners
          </h2>
          <p className="text-white max-w-2xl mx-auto px-4" style={{ 
            fontSize: 'clamp(0.875rem, 1.5vh, 1rem)'
          }}>
            Working with industry leaders to deliver exceptional
            telecommunications solutions.
          </p>
        </motion.div>

        <div className="relative flex items-center">
          {/* Previous Button - Hidden on small mobile */}
          {showControls && (
            <button
              className="absolute left-0 z-10 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full bg-white/80 shadow-md"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous slide"
              style={{
                padding: 'clamp(0.25rem, 0.5vh, 0.375rem)'
              }}
            >
              <ChevronLeftIcon style={{ width: 'clamp(1.25rem, 2.5vh, 1.5rem)', height: 'clamp(1.25rem, 2.5vh, 1.5rem)' }} />
            </button>
          )}

          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex-grow-0 min-w-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 md:px-4"
                >
                  <div className="group relative h-full">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-gray-300 bg-white/5 backdrop-blur-sm"
                      style={{
                        height: 'clamp(80px, 16vh, 120px)',
                        padding: 'clamp(0.75rem, 1.5vh, 1rem)'
                      }}
                      aria-label={`Visit ${partner.name} website`}
                    >
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button - Hidden on small mobile */}
          {showControls && (
            <button
              className="absolute right-0 z-10 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full bg-white/80 shadow-md"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next slide"
              style={{
                padding: 'clamp(0.25rem, 0.5vh, 0.375rem)'
              }}
            >
              <ChevronRightIcon style={{ width: 'clamp(1.25rem, 2.5vh, 1.5rem)', height: 'clamp(1.25rem, 2.5vh, 1.5rem)' }} />
            </button>
          )}
        </div>

        {/* Pagination: Cursor for mobile, dots for larger screens */}
        {isMobile ? (
          <div className="flex justify-between items-center px-4" style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="text-gray-300 hover:text-white focus:outline-none disabled:opacity-30 transition-opacity"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon style={{ width: 'clamp(1.25rem, 2.5vh, 1.5rem)', height: 'clamp(1.25rem, 2.5vh, 1.5rem)' }} />
            </button>
            {/* CarouselCounter with partner name */}
            <span className="text-gray-300" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
              {partners[selectedIndex]?.name || ""}{" "}
              {/* Display partner name or empty string if not found */}
            </span>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="text-gray-300 hover:text-white focus:outline-none disabled:opacity-30 transition-opacity"
              aria-label="Next slide"
            >
              <ChevronRightIcon style={{ width: 'clamp(1.25rem, 2.5vh, 1.5rem)', height: 'clamp(1.25rem, 2.5vh, 1.5rem)' }} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-2" style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={clsx(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  index === selectedIndex
                    ? "bg-gray-200"
                    : "bg-gray-500 hover:bg-gray-400"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerLogos;
