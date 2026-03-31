import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  highlight: "#7CCCBF",
  cta: "#A6CE39",
  whiteOpacity: {
    "30": "rgba(255, 255, 255, 0.3)",
    "20": "rgba(255, 255, 255, 0.2)",
    "10": "rgba(255, 255, 255, 0.1)",
  },
};

const DOT_COLORS = [BRAND_COLORS.cta, BRAND_COLORS.highlight, BRAND_COLORS.secondary, BRAND_COLORS.primary];

/** Section ID -> dot color override. Used to keep specific sections a fixed color. */
const SECTION_DOT_COLOR: Partial<Record<string, string>> = {
  "about-cta": "#7CCCBF",
};

export interface HeroScrollIndicatorProps {
  /** Section element IDs to observe (in order). Dots map to these by index. */
  sectionIds: string[];
}

/**
 * Returns the section ID that should be active: the section whose bounding box
 * contains the vertical center of the viewport. If none contains it (e.g. between
 * sections), returns the section whose top is closest to and above center, or the first.
 */
function getActiveSectionFromScroll(sectionIds: string[]): string | null {
  if (!sectionIds.length) return null;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i]);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= centerY && rect.bottom >= centerY) return sectionIds[i];
  }

  // No section contains center (e.g. at top or between sections): pick closest by top edge
  let bestId = sectionIds[0];
  let bestDist = Infinity;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - centerY);
    if (dist < bestDist) {
      bestDist = dist;
      bestId = id;
    }
  }
  return bestId;
}

const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({ sectionIds }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const updateActiveSection = useCallback(() => {
    const next = getActiveSectionFromScroll(sectionIds);
    setActiveSection((prev) => (prev !== next ? next : prev));
  }, [sectionIds]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const onScrollOrResize = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateActiveSection();
      });
    };

    const parent = document.querySelector(".scroll-snap-page");
    const scrollParent = parent instanceof HTMLElement ? parent : null;
    if (scrollParent) scrollParentRef.current = scrollParent;

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    if (scrollParent) scrollParent.addEventListener("scroll", onScrollOrResize, { passive: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (scrollParentRef.current) {
        scrollParentRef.current.removeEventListener("scroll", onScrollOrResize);
      }
    };
  }, [sectionIds, updateActiveSection]);

  if (!sectionIds.length) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = scrollParentRef.current ?? document.querySelector(".scroll-snap-page");
    if (!el) return;
    if (container instanceof HTMLElement) {
      const top = el.offsetTop;
      container.scrollTo({ top, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  return (
    <div
      className="fixed flex flex-col items-center gap-8"
      style={{
        right: "2rem",
        top: "100px",
        bottom: "100px",
        zIndex: 50,
        justifyContent: "center",
        transform: "translateZ(0)",
      }}
      aria-label="Scroll position"
    >
      {/* Vertical dots — 60% scale on mobile (< 768px) */}
      <div className="flex flex-col items-center gap-4 origin-center max-md:scale-[0.6]">
        {sectionIds.map((id, index) => {
            const isActive = activeSection === id;
            const color = SECTION_DOT_COLOR[id] ?? DOT_COLORS[index % DOT_COLORS.length];
            return (
              <button
                key={id}
                type="button"
                aria-label={`Go to section ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSection(id)}
                className="flex items-center justify-center rounded-full transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/50"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="rounded-full"
                  style={{
                    width: isActive ? 8 : 8,
                    height: isActive ? 24 : 8,
                    backgroundColor: isActive ? color : BRAND_COLORS.whiteOpacity["30"],
                  }}
                />
              </button>
            );
          })}
      </div>

      {/* Scroll down mouse icon — hidden on screens < 768px */}
      <div className="hidden md:flex flex-col items-center gap-1" aria-hidden>
        <motion.div
          className="rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
          style={{ width: 24, height: 36 }}
        >
          <motion.div
            className="rounded-full bg-white/70"
            style={{ width: 4, height: 4 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <span
          className="text-[10px] uppercase tracking-wider text-white/50"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
};

export default HeroScrollIndicator;
