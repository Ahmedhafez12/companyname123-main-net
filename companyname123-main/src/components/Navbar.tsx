import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  List as ListIcon,
  X as XIcon,
  LinkedinLogo,
  TwitterLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Logo from "./Logo";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedinLogo },
  { label: "Twitter", href: "https://twitter.com", icon: TwitterLogo },
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookLogo },
  { label: "YouTube", href: "https://www.youtube.com", icon: YoutubeLogo },
];

/**
 * Three-level nav mapped from WhiteBgNavbar:
 * - Level 1 (Primary): Home, About Us, Solutions, Our Impact, Contact Us
 * - Level 2 (Secondary): Children of selected primary
 * - Level 3 (Tertiary): Section anchors for Solutions children
 */
type NavAnchor = { label: string; path: string };
type NavChild = {
  label: string;
  path: string;
  anchors?: NavAnchor[];
};
type NavItem = {
  label: string;
  path: string;
  category?: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about/overview",
    category: "about",
    children: [
      { label: "Company Identity", path: "/about/overview#company-identity" },
      { label: "Our Journey", path: "/about/overview#our-journey" },
      { label: "Vision & Mission", path: "/about/overview#vision-mission" },
      { label: "Core Strengths", path: "/about/overview#core-strengths" },
      { label: "Value Proposition", path: "/about/overview#value-proposition" },
      { label: "Competitive Edge", path: "/about/overview#competitive-edge" },
    ],
  },
  {
    label: "Solutions",
    path: "/what-we-do/telecommunications",
    category: "solutions",
    children: [
      {
        label: "Telecommunications",
        path: "/what-we-do/telecommunications",
        anchors: [
          { label: "Our Core Solutions", path: "/what-we-do/telecommunications#business-unit" },
          { label: "Service Standards", path: "/what-we-do/telecommunications#service-Standards" },
        ],
      },
      {
        label: "Command & Control",
        path: "/what-we-do/command-control",
        anchors: [
          { label: "Our Core Solutions", path: "/what-we-do/command-control#core-solutions" },
          { label: "Technology Stack", path: "/what-we-do/command-control#tech-stack" },
          { label: "Industries We Serve", path: "/what-we-do/command-control#industries-served" },
        ],
      },
    ],
  },
  {
    label: "Our Impact",
    path: "/customers",
    category: "our-impact",
    children: [
      { label: "Our Customers", path: "/customers" },
      { label: "Our Partners", path: "/partners" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

const menuSlide = {
  initial: { y: "-100%" },
  animate: { y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: "-100%", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSecondaryPath, setHoveredSecondaryPath] = useState<string | null>(null);
  const [activeSecondaryPath, setActiveSecondaryPath] = useState<string | null>(null);

  const displayedCategory = hoveredCategory ?? activeCategory;
  const displayedSecondaryPath = hoveredSecondaryPath ?? activeSecondaryPath;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveCategory(null);
    setHoveredCategory(null);
    setHoveredSecondaryPath(null);
    setActiveSecondaryPath(null);
  }, []);

  useEffect(() => {
    const openMenu = () => setIsOpen(true);
    window.addEventListener("open-menu", openMenu);
    return () => window.removeEventListener("open-menu", openMenu);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const toggleSecondary = (path: string) => {
    setActiveSecondaryPath((prev) => (prev === path ? null : path));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  const primaryWithChildren = NAV_ITEMS.filter((i) => i.category);
  const displayedPrimary = NAV_ITEMS.find((i) => i.category === displayedCategory);
  const tertiaryChild = displayedPrimary?.children?.find((c) => c.path === displayedSecondaryPath);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[100] w-full bg-transparent font-sans text-white transition-colors duration-300"
        aria-label="Main navigation"
      >
        <div className="flex h-[6.5rem] w-full items-center justify-between gap-4 pl-[0.5in] pr-[0.5in] md:h-[7.8rem]">
          <Link
            to="/"
            className="flex h-full min-w-0 items-center py-2 opacity-100 transition-opacity duration-300 hover:opacity-80"
            aria-label="Home"
            onClick={closeMenu}
          >
            <Logo className="h-full w-auto max-h-[3.9rem] md:max-h-[4.55rem]" scrolled={false} />
          </Link>

          <button
            type="button"
            className="flex h-[3.9rem] w-[3.9rem] shrink-0 items-center justify-center rounded-lg text-current transition-colors hover:bg-white/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XIcon weight="thin" size={32} />
            ) : (
              <ListIcon weight="thin" size={32} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            variants={menuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[90] h-screen w-screen overflow-hidden text-white"
            style={{
              background: "linear-gradient(160deg, #002C3D 0%, #003d52 40%, #005E96 100%)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="absolute inset-0 flex min-h-0 flex-col pt-[6.5rem] md:pt-[7.8rem]">
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid min-h-[min(100%,calc(100vh-8rem))] grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-3 lg:gap-14 lg:px-16 lg:py-14">
                  {/* Column 1 — Primary */}
                  <motion.div
                    className="flex flex-col justify-center"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {NAV_ITEMS.map((item) =>
                      !item.children ? (
                        <motion.div key={item.path} variants={staggerItem}>
                          <Link
                            to={item.path}
                            onClick={closeMenu}
                            className="block border-b border-white/10 py-4 text-2xl font-semibold tracking-tight transition-colors hover:text-white/90 sm:text-3xl"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div key={item.category} variants={staggerItem}>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-2xl font-semibold tracking-tight transition-colors hover:text-white/90 sm:text-3xl"
                            onClick={() => toggleCategory(item.category!)}
                            onMouseEnter={() => setHoveredCategory(item.category!)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            aria-expanded={activeCategory === item.category || hoveredCategory === item.category}
                          >
                            {item.label}
                            <span className="text-lg opacity-60" aria-hidden>
                              {activeCategory === item.category ? "−" : "+"}
                            </span>
                          </button>
                        </motion.div>
                      )
                    )}
                  </motion.div>

                  {/* Column 2 — Secondary */}
                  <div className="flex flex-col justify-center border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
                    {displayedCategory && displayedPrimary?.children ? (
                      <motion.div
                        key={displayedCategory}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-1"
                      >
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                          {displayedPrimary.label}
                        </p>
                        {displayedPrimary.children.map((child) => (
                          <div key={child.path} className="flex flex-col">
                            <div className="flex items-stretch gap-2">
                              <Link
                                to={child.path}
                                onClick={closeMenu}
                                onMouseEnter={() => child.anchors?.length && setHoveredSecondaryPath(child.path)}
                                onMouseLeave={() => setHoveredSecondaryPath(null)}
                                className="flex-1 rounded-lg py-3 text-lg font-medium text-white/95 transition-colors hover:bg-white/5 hover:text-white"
                              >
                                {child.label}
                              </Link>
                              {child.anchors && child.anchors.length > 0 && (
                                <button
                                  type="button"
                                  className="flex w-12 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10"
                                  aria-label={
                                    displayedSecondaryPath === child.path
                                      ? `Collapse sections for ${child.label}`
                                      : `Expand sections for ${child.label}`
                                  }
                                  aria-expanded={displayedSecondaryPath === child.path}
                                  onClick={() => toggleSecondary(child.path)}
                                >
                                  <span className="text-lg opacity-60" aria-hidden>
                                    {displayedSecondaryPath === child.path ? "−" : "+"}
                                  </span>
                                </button>
                              )}
                            </div>
                            {/* Mobile tertiary inline */}
                            {child.anchors &&
                              child.anchors.length > 0 &&
                              activeSecondaryPath === child.path && (
                                <div className="mb-2 ml-2 flex flex-col border-l border-white/20 pl-4 lg:hidden">
                                  {child.anchors.map((a) => (
                                    <Link
                                      key={a.path}
                                      to={a.path}
                                      onClick={closeMenu}
                                      className="py-2 text-sm text-white/80 hover:text-white"
                                    >
                                      {a.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <p className="text-sm text-white/40 lg:block">
                        {primaryWithChildren.length > 0
                          ? "Select a section to see links."
                          : null}
                      </p>
                    )}
                  </div>

                  {/* Column 3 — Tertiary (desktop) */}
                  <div className="hidden flex-col justify-center border-t border-white/10 pt-8 lg:flex lg:border-t-0 lg:pt-0">
                    {tertiaryChild?.anchors && tertiaryChild.anchors.length > 0 ? (
                      <motion.div
                        key={tertiaryChild.path}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-1"
                      >
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                          On this page
                        </p>
                        {tertiaryChild.anchors.map((a) => (
                          <Link
                            key={a.path}
                            to={a.path}
                            onClick={closeMenu}
                            className="rounded-lg py-2.5 text-base text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {a.label}
                          </Link>
                        ))}
                      </motion.div>
                    ) : (
                      <p className="text-sm text-white/40">
                        {displayedSecondaryPath ? null : "Hover a solution area for section links."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 px-6 py-8 sm:px-10">
                  {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 transition-colors hover:text-white"
                      aria-label={label}
                    >
                      <Icon weight="thin" size={28} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
