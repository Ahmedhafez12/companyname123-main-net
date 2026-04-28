import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  List as ListIcon,
  X as XIcon,
  CaretRight,
  CaretLeft,
} from "@phosphor-icons/react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation, useLocale } from "../i18n";


type NavAnchor = { label: string; path: string };
type NavChild = { label: string; path: string; anchors?: NavAnchor[] };
type NavItem  = { label: string; path: string; category?: string; children?: NavChild[] };

function useNavItems() {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  return useMemo(() => {
    const prefixPaths = (items: typeof t.nav.items): NavItem[] =>
      items.map(item => ({
        ...item,
        path: localePath(item.path),
        children: item.children?.map(child => ({
          ...child,
          path: localePath(child.path),
          anchors: child.anchors?.map(a => ({ ...a, path: localePath(a.path) })),
        })),
      }));

    const navItems = prefixPaths(t.nav.items);
    const legalLinks = t.nav.legalLinks.map(l => ({ ...l, path: localePath(l.path) }));

    return { navItems, legalLinks };
  }, [t, localePath]);
}

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
  const { isRTL, localePath } = useLocale();
  const { t } = useTranslation();
  const { navItems: NAV_ITEMS, legalLinks: LEGAL_LINKS } = useNavItems();

  const [isOpen,                setIsOpen]                = useState(false);
  const [activeCategory,        setActiveCategory]        = useState<string | null>(null);
  const [hoveredCategory,       setHoveredCategory]       = useState<string | null>(null);
  const [hoveredSecondaryPath,  setHoveredSecondaryPath]  = useState<string | null>(null);
  const [activeSecondaryPath,   setActiveSecondaryPath]   = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<"primary" | "secondary">("primary");

  const overlayRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handler = () => openMenu();
    window.addEventListener("open-menu", handler);
    return () => window.removeEventListener("open-menu", handler);
  }, [openMenu]);

  useEffect(() => { closeMenu(); }, [location.pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeMenu]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        const focusable = overlayRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

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

  // RTL-aware slide animations
  const mobileSlideIn = isRTL ? slideFromRight : slideFromLeft;
  const mobileSlideOut = isRTL ? slideFromLeft : slideFromRight;

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────────────── */}
      <header
        className="fixed left-0 right-0 top-0 z-[100] w-full bg-transparent font-sans text-white transition-colors duration-300"
        aria-label="Main navigation"
      >
        <div className="flex h-16 sm:h-20 md:h-[6.5rem] lg:h-[7.8rem] w-full items-center justify-between px-4 sm:px-6 md:px-[0.5in]">
          <Link
            to={localePath("/")}
            className="flex h-full min-w-0 items-center py-2 opacity-100 transition-opacity duration-300 hover:opacity-80"
            aria-label="Home"
            onClick={closeMenu}
          >
            <Logo
              className="h-auto w-auto max-h-8 sm:max-h-10 md:max-h-[3.9rem] lg:max-h-[4.55rem]"
              scrolled={false}
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <LanguageSwitcher className="text-white/60 hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300" />
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
                        variants={mobileSlideIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col"
                      >
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
                                    <CaretRight weight="thin" className={`w-5 h-5 ${isRTL ? 'rtl-flip' : ''}`} />
                                  </button>
                                </div>
                              </motion.div>
                            )
                          )}
                        </motion.nav>

                        {/* Footer — legal links + language + social icons */}
                        <div className="shrink-0 border-t border-white/10 px-5 py-5 flex flex-col items-center gap-4">
                          <div className="flex items-center gap-4">
                            {LEGAL_LINKS.map(({ label, path }) => (
                              <Link
                                key={path}
                                to={path}
                                onClick={closeMenu}
                                className="text-xs text-white/50 transition-colors hover:text-white"
                              >
                                {label}
                              </Link>
                            ))}
                          </div>
                          <div className="flex items-center gap-6">
                            <LanguageSwitcher className="text-white/60 hover:text-white" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Panel B — Secondary drill-down */}
                    {mobilePanel === "secondary" && (
                      <motion.div
                        key="mob-secondary"
                        variants={mobileSlideOut}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col overflow-y-auto"
                      >
                        <div className="flex items-center border-b border-white/10 px-4 py-3">
                          <button
                            type="button"
                            onClick={handleMobileBack}
                            className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                          >
                            <CaretLeft weight="thin" className={`w-4 h-4 ${isRTL ? 'rtl-flip' : ''}`} />
                            {t.common.back}
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
                                        {activeSecondaryPath === child.path ? "\u2212" : "+"}
                                      </span>
                                    </button>
                                  )}
                                </div>
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
                                        <div className={`mb-2 flex flex-col pt-1 ${isRTL ? 'mr-3 border-r border-white/20 pr-4' : 'ml-3 border-l border-white/20 pl-4'}`}>
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
                                  {activeCategory === item.category ? "\u2212" : "+"}
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
                          initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
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
                                    aria-expanded={displayedSecondaryPath === child.path}
                                    onClick={() => toggleSecondary(child.path)}
                                  >
                                    <span className="text-lg opacity-60" aria-hidden>
                                      {displayedSecondaryPath === child.path ? "\u2212" : "+"}
                                    </span>
                                  </button>
                                )}
                              </div>
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
                                      <div className={`mb-2 flex flex-col ${isRTL ? 'mr-2 border-r border-white/20 pr-4' : 'ml-2 border-l border-white/20 pl-4'}`}>
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
                            ? t.common.selectSection
                            : null}
                        </p>
                      )}
                    </div>

                    {/* Column 3 — Tertiary (desktop lg+ only) */}
                    <div className="hidden flex-col justify-center lg:flex">
                      {tertiaryChild?.anchors && tertiaryChild.anchors.length > 0 ? (
                        <motion.div
                          key={tertiaryChild.path}
                          initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-1"
                        >
                          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                            {t.common.onThisPage}
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
                            : t.common.hoverSolution}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Legal + language + social links — tablet/desktop */}
                  <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 px-8 py-7 md:px-12 lg:px-16">
                    {LEGAL_LINKS.map(({ label, path }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={closeMenu}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    ))}
                    <span className="h-4 w-px bg-white/20" aria-hidden />
                    <LanguageSwitcher className="text-white/60 hover:text-white" />
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
