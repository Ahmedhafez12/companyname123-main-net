import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  List as ListIcon,
  X as XIcon,
  LinkedinLogo,
  TwitterLogo,
  FacebookLogo,
  YoutubeLogo,
  CaretRight,
  CaretLeft,
} from "@phosphor-icons/react";
import Logo from "./Logo";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedinLogo },
  { label: "Twitter", href: "https://twitter.com", icon: TwitterLogo },
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookLogo },
  { label: "YouTube", href: "https://www.youtube.com", icon: YoutubeLogo },
];

type NavAnchor = { label: string; path: string };
type NavChild = { label: string; path: string; anchors?: NavAnchor[] };
type NavItem  = { label: string; path: string; category?: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about/overview",
    category: "about",
    children: [
      { label: "Who We Are",        path: "/about/overview#what-we-do" },
      { label: "Company Identity",  path: "/about/overview#company-identity" },
      { label: "Our Journey",       path: "/about/overview#our-journey" },
      { label: "Vision & Mission",  path: "/about/overview#vision-mission" },
      { label: "Core Strengths",    path: "/about/overview#core-strengths" },
      { label: "Why Choose Us",     path: "/about/overview#why-choose-us" },
      { label: "Competitive Edge",  path: "/about/overview#competitive-edge" },
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
          { label: "Overview",           path: "/what-we-do/telecommunications#overview" },
          { label: "Our Core Solutions", path: "/what-we-do/telecommunications#business-unit" },
          { label: "Service Standards",  path: "/what-we-do/telecommunications#service-Standards" },
        ],
      },
      {
        label: "Command & Control",
        path: "/what-we-do/command-control",
        anchors: [
          { label: "Overview",            path: "/what-we-do/command-control#overview" },
          { label: "Our Core Solutions",  path: "/what-we-do/command-control#core-solutions" },
          { label: "Technology Stack",    path: "/what-we-do/command-control#tech-stack" },
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
      { label: "Our Partners",  path: "/partners" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

// ─── animation variants ──────────────────────────────────────────────────────
const menuSlide = {
  initial: { y: "-100%" },
  animate: { y: 0,      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { y: "-100%", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const slideFromRight = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: "100%", opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const slideFromLeft = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: "-100%", opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

// ─── component ───────────────────────────────────────────────────────────────
function Navbar() {
  const location = useLocation();

  const [isOpen,                setIsOpen]                = useState(false);
  const [activeCategory,        setActiveCategory]        = useState<string | null>(null);
  const [hoveredCategory,       setHoveredCategory]       = useState<string | null>(null);
  const [hoveredSecondaryPath,  setHoveredSecondaryPath]  = useState<string | null>(null);
  const [activeSecondaryPath,   setActiveSecondaryPath]   = useState<string | null>(null);
  // mobile-only: which panel is visible ("primary" list or "secondary" drill-down)
  const [mobilePanel, setMobilePanel] = useState<"primary" | "secondary">("primary");

  // ref for the dialog overlay — used for focus management
  const overlayRef = useRef<HTMLDivElement>(null);
  // ref for the element that had focus before the menu opened — restored on close
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const displayedCategory     = hoveredCategory ?? activeCategory;
  const displayedSecondaryPath = hoveredSecondaryPath ?? activeSecondaryPath;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setMobilePanel("primary");
    setActiveCategory(null);
    setHoveredCategory(null);
    setHoveredSecondaryPath(null);
    setActiveSecondaryPath(null);
  }, []);

  const openMenu = useCallback(() => {
    setMobilePanel("primary");
    setIsOpen(true);
  }, []);

  // drill into a primary category on mobile
  const handleMobileDrill = (category: string) => {
    setActiveCategory(category);
    setMobilePanel("secondary");
  };

  const handleMobileBack = () => {
    setMobilePanel("primary");
    setActiveCategory(null);
    setActiveSecondaryPath(null);
  };

  const toggleCategory = (category: string) =>
    setActiveCategory((prev) => (prev === category ? null : category));

  const toggleSecondary = (path: string) =>
    setActiveSecondaryPath((prev) => (prev === path ? null : path));

  // external trigger
  useEffect(() => {
    const handler = () => openMenu();
    window.addEventListener("open-menu", handler);
    return () => window.removeEventListener("open-menu", handler);
  }, [openMenu]);

  // close on navigation
  useEffect(() => { closeMenu(); }, [location.pathname, closeMenu]);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeMenu]);

  // Move focus into the overlay when it opens; restore when it closes
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        const focusable = overlayRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 60); // small delay lets the slide-in animation start first
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Trap Tab key inside the overlay while the menu is open
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.tabIndex >= 0 && !el.closest("[hidden]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const primaryWithChildren = NAV_ITEMS.filter((i) => i.category);
  const displayedPrimary    = NAV_ITEMS.find((i) => i.category === displayedCategory);
  const tertiaryChild       = displayedPrimary?.children?.find((c) => c.path === displayedSecondaryPath);

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────────────── */}
      <header
        className="fixed left-0 right-0 top-0 z-[100] w-full bg-transparent font-sans text-white transition-colors duration-300"
        aria-label="Main navigation"
      >
        <div className="flex h-16 sm:h-20 md:h-[6.5rem] lg:h-[7.8rem] w-full items-center justify-between px-4 sm:px-6 md:px-[0.5in]">
          <Link
            to="/"
            className="flex h-full min-w-0 items-center py-2 opacity-100 transition-opacity duration-300 hover:opacity-80"
            aria-label="Home"
            onClick={closeMenu}
          >
            <Logo
              className="h-auto w-auto max-h-8 sm:max-h-10 md:max-h-[3.9rem] lg:max-h-[4.55rem]"
              scrolled={false}
            />
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-[3.9rem] md:w-[3.9rem] shrink-0 items-center justify-center rounded-lg text-current transition-colors hover:bg-white/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => (isOpen ? closeMenu() : openMenu())}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <XIcon weight="thin" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{    rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <ListIcon weight="thin" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            key="menu-overlay"
            variants={menuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[90] overflow-hidden text-white"
            style={{
              background:
                "linear-gradient(160deg, #002C3D 0%, #003d52 40%, #005E96 100%)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="absolute inset-0 flex flex-col pt-16 sm:pt-20 md:pt-[6.5rem] lg:pt-[7.8rem]">
              <div className="min-h-0 flex-1 overflow-hidden">

                {/* ════════════════════════════════════════════════════════════
                    MOBILE  (<md)  — sliding two-panel navigation
                    ════════════════════════════════════════════════════════════ */}
                <div className="relative flex h-full flex-col overflow-hidden md:hidden">
                  <AnimatePresence initial={false} mode="wait">

                    {/* Panel A — Primary list */}
                    {mobilePanel === "primary" && (
                      <motion.div
                        key="mob-primary"
                        variants={slideFromLeft}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col"
                      >
                        {/* Scrollable nav items */}
                        <motion.nav
                          className="flex flex-col flex-1 overflow-y-auto px-5 pt-6 pb-2"
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                          aria-label="Primary navigation"
                        >
                          {NAV_ITEMS.map((item) =>
                            !item.children ? (
                              <motion.div key={item.path} variants={staggerItem}>
                                <Link
                                  to={item.path}
                                  onClick={closeMenu}
                                  className="flex items-center justify-between border-b border-white/10 py-4 text-[1.375rem] font-semibold tracking-tight transition-colors hover:text-white/80"
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            ) : (
                              <motion.div key={item.category} variants={staggerItem}>
                                {/* Split row: label → navigates to parent; caret → drills into submenu */}
                                <div className="flex items-stretch border-b border-white/10">
                                  <Link
                                    to={item.path}
                                    onClick={closeMenu}
                                    className="flex-1 py-4 text-[1.375rem] font-semibold tracking-tight transition-colors hover:text-white/80"
                                  >
                                    {item.label}
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => handleMobileDrill(item.category!)}
                                    className="flex w-12 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white"
                                    aria-label={`Explore ${item.label}`}
                                  >
                                    <CaretRight weight="thin" className="w-5 h-5" />
                                  </button>
                                </div>
                              </motion.div>
                            )
                          )}
                        </motion.nav>

                        {/* Social row — always pinned at bottom, never scrolled away */}
                        <div className="shrink-0 flex items-center justify-center gap-6 border-t border-white/10 px-5 py-5">
                          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/60 transition-colors hover:text-white"
                              aria-label={label}
                            >
                              <Icon weight="thin" className="w-6 h-6" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Panel B — Secondary drill-down */}
                    {mobilePanel === "secondary" && (
                      <motion.div
                        key="mob-secondary"
                        variants={slideFromRight}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col overflow-y-auto"
                      >
                        {/* Back bar */}
                        <div className="flex items-center border-b border-white/10 px-4 py-3">
                          <button
                            type="button"
                            onClick={handleMobileBack}
                            className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                          >
                            <CaretLeft weight="thin" className="w-4 h-4" />
                            Back
                          </button>
                        </div>

                        {displayedPrimary?.children && (
                          <nav
                            className="flex flex-col px-5 pt-4 pb-8"
                            aria-label={`${displayedPrimary.label} sub-navigation`}
                          >
                            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">
                              {displayedPrimary.label}
                            </p>
                            {displayedPrimary.children.map((child) => (
                              <div key={child.path} className="flex flex-col">
                                <div className="flex items-stretch gap-2 border-b border-white/10">
                                  <Link
                                    to={child.path}
                                    onClick={closeMenu}
                                    className="flex-1 py-4 text-lg font-medium text-white/90 transition-colors hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                  {child.anchors && child.anchors.length > 0 && (
                                    <button
                                      type="button"
                                      className="flex w-10 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white"
                                      onClick={() => toggleSecondary(child.path)}
                                      aria-expanded={activeSecondaryPath === child.path}
                                      aria-label={
                                        activeSecondaryPath === child.path
                                          ? `Collapse ${child.label} sections`
                                          : `Expand ${child.label} sections`
                                      }
                                    >
                                      <span className="text-base leading-none">
                                        {activeSecondaryPath === child.path ? "−" : "+"}
                                      </span>
                                    </button>
                                  )}
                                </div>
                                {/* Inline tertiary anchors */}
                                <AnimatePresence>
                                  {child.anchors &&
                                    child.anchors.length > 0 &&
                                    activeSecondaryPath === child.path && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="mb-2 ml-3 flex flex-col border-l border-white/20 pl-4 pt-1">
                                          {child.anchors.map((a) => (
                                            <Link
                                              key={a.path}
                                              to={a.path}
                                              onClick={closeMenu}
                                              className="py-2.5 text-sm text-white/70 transition-colors hover:text-white"
                                            >
                                              {a.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </nav>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ════════════════════════════════════════════════════════════
                    TABLET + DESKTOP  (md+)  — column grid
                    Tablet (md–lg): 2 columns   Desktop (lg+): 3 columns
                    ════════════════════════════════════════════════════════════ */}
                <div className="hidden md:flex md:h-full md:flex-col md:overflow-y-auto">
                  <div className="grid flex-1 grid-cols-1 gap-10 px-8 py-10 md:grid-cols-2 md:gap-12 md:px-12 md:py-12 lg:grid-cols-3 lg:gap-14 lg:px-16 lg:py-14">

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
                              className="block border-b border-white/10 py-4 text-2xl font-semibold tracking-tight transition-colors hover:text-white/90 lg:text-3xl"
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ) : (
                          <motion.div key={item.category} variants={staggerItem}>
                            {/* Split row: label → navigates to parent; +/− → toggles submenu column */}
                            <div
                              className="flex items-stretch border-b border-white/10"
                              onMouseEnter={() => setHoveredCategory(item.category!)}
                              onMouseLeave={() => setHoveredCategory(null)}
                            >
                              <Link
                                to={item.path}
                                onClick={closeMenu}
                                className="flex-1 py-4 text-2xl font-semibold tracking-tight transition-colors hover:text-white/90 lg:text-3xl"
                              >
                                {item.label}
                              </Link>
                              <button
                                type="button"
                                className="flex w-12 shrink-0 items-center justify-center text-white/60 transition-colors hover:text-white"
                                onClick={() => toggleCategory(item.category!)}
                                aria-expanded={
                                  activeCategory === item.category ||
                                  hoveredCategory === item.category
                                }
                                aria-label={`${activeCategory === item.category ? "Collapse" : "Expand"} ${item.label}`}
                              >
                                <span className="text-lg leading-none" aria-hidden>
                                  {activeCategory === item.category ? "−" : "+"}
                                </span>
                              </button>
                            </div>
                          </motion.div>
                        )
                      )}
                    </motion.div>

                    {/* Column 2 — Secondary */}
                    <div className="flex flex-col justify-center border-t border-white/10 pt-8 md:border-t-0 md:pt-0">
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
                                  onMouseEnter={() =>
                                    child.anchors?.length &&
                                    setHoveredSecondaryPath(child.path)
                                  }
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
                              {/* Tablet-only inline tertiary (hidden on lg where col 3 handles it) */}
                              <AnimatePresence>
                                {child.anchors &&
                                  child.anchors.length > 0 &&
                                  activeSecondaryPath === child.path && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden lg:hidden"
                                    >
                                      <div className="mb-2 ml-2 flex flex-col border-l border-white/20 pl-4">
                                        {child.anchors.map((a) => (
                                          <Link
                                            key={a.path}
                                            to={a.path}
                                            onClick={closeMenu}
                                            className="py-2 text-sm text-white/80 transition-colors hover:text-white"
                                          >
                                            {a.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <p className="text-sm text-white/40">
                          {primaryWithChildren.length > 0
                            ? "Select a section to see links."
                            : null}
                        </p>
                      )}
                    </div>

                    {/* Column 3 — Tertiary (desktop lg+ only) */}
                    <div className="hidden flex-col justify-center lg:flex">
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
                          {displayedSecondaryPath
                            ? null
                            : "Hover a solution area for section links."}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social links — tablet/desktop */}
                  <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 px-8 py-7 md:px-12 lg:px-16">
                    {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition-colors hover:text-white"
                        aria-label={label}
                      >
                        <Icon weight="thin" className="w-6 h-6 md:w-7 md:h-7" />
                      </a>
                    ))}
                  </div>
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
