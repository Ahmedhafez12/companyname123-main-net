import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { clsx } from "clsx";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_HREF = "tel:+1234567890";
const PHONE_LABEL = "+1 (234) 567-890";

/** Scroll depth (px) at which the bar condenses and gains a frosted backdrop */
const SCROLL_THRESHOLD = 50;

// ─── Brand palette ────────────────────────────────────────────────────────────
//
//  NAVY    #005E96  — primary ink; headings, active states, borders
//  TEAL    #7CCCBF  — secondary accent; hover underlines, section labels
//  SKY     #44C8F5  — tertiary; sub-item hovers, icon tints
//  LIME    #A6CE39  — CTA / highlight; contact button fill, active indicators
//
// Light-page strategy:
//   • Transparent bar  → navy text on whatever hero sits beneath
//   • Scrolled bar     → white-frosted backdrop, navy text, crisp shadow
//   • Dropdown panels  → white card with very light navy border
//   • Mobile sheet     → white panel, navy text
//   • CTA button       → solid navy fill, white label (strong contrast on light)

const C = {
  navy:       "#005E96",
  teal:       "#7CCCBF",
  sky:        "#44C8F5",
  lime:       "#A6CE39",

  // Frosted white backdrop (scrolled + mobile)
  frostBg:    "rgba(255, 255, 255, 0.88)",
  // Dropdown / sheet panel
  panelBg:    "rgba(255, 255, 255, 0.98)",
  // Dividers
  divider:    "rgba(0, 94, 150, 0.10)",  // navy @ 10%
  // Resting nav text on transparent bar (sits over a light page — navy reads well)
  navText:    "#005E96",
  // Muted nav text
  navMuted:   "rgba(0, 94, 150, 0.60)",
} as const;

/** Top bar only (dropdown / mobile sheet interiors stay on `C` for contrast on white). */
type BarTheme = {
  logoInk: string;
  navSolid: string;
  navMuted: string;
  phoneIcon: string;
  barDivider: string;
  ctaBg: string;
  ctaText: string;
  ctaShadow: string;
  ctaHoverGradient: string;
  ctaRing: string;
  menuBtnBg: string;
  menuBtnBgOpen: string;
  menuBtnBorder: string;
  menuIcon: string;
};

const DEFAULT_BAR: BarTheme = {
  logoInk: C.navy,
  navSolid: C.navy,
  navMuted: C.navMuted,
  phoneIcon: C.sky,
  barDivider: C.divider,
  ctaBg: C.navy,
  ctaText: "#ffffff",
  ctaShadow: "0 2px 12px rgba(0, 94, 150, 0.30)",
  ctaHoverGradient: `linear-gradient(135deg, ${C.navy}, #006fa8)`,
  ctaRing: C.navy,
  menuBtnBg: `${C.navy}14`,
  menuBtnBgOpen: `${C.navy}26`,
  menuBtnBorder: C.divider,
  menuIcon: C.navy,
};

/** Inverted bar for dark home hero sections: white type, white CTA shell with navy label. */
const HOME_ON_DARK_BAR: BarTheme = {
  logoInk: "#FFFFFF",
  navSolid: "#FFFFFF",
  navMuted: "rgba(255, 255, 255, 0.70)",
  phoneIcon: "#A8E6FF",
  barDivider: "rgba(255, 255, 255, 0.25)",
  ctaBg: "#FFFFFF",
  ctaText: C.navy,
  ctaShadow: "0 2px 18px rgba(0, 0, 0, 0.2)",
  ctaHoverGradient: "linear-gradient(135deg, #ffffff, #d4ebf7)",
  ctaRing: "#FFFFFF",
  menuBtnBg: "rgba(255, 255, 255, 0.14)",
  menuBtnBgOpen: "rgba(255, 255, 255, 0.26)",
  menuBtnBorder: "rgba(255, 255, 255, 0.30)",
  menuIcon: "#FFFFFF",
};

export const HOME_NAVBAR_BAR_THEME_EVENT = "home-navbar-bar-theme";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Navbar2Props = {
  basePath?: string;
};

type DropdownId = "about" | "what-we-do" | "our-impact";

// ─── Route helpers ────────────────────────────────────────────────────────────

const homePath = (base: string) => `${base}/`;
const isHome   = (pathname: string, base: string) =>
  pathname === homePath(base) || pathname === base;

// ─── Shared class fragments ───────────────────────────────────────────────────

/**
 * Desktop nav trigger — no background pill; pure text with underline animation.
 * Colour is set via inline style so both states (transparent / scrolled) share
 * the same navy palette without needing two separate class strings.
 */
const NAV_LINK =
  "group relative inline-flex items-center gap-2 px-4 py-2.5 text-[0.875rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300";

/** Teal-to-lime animated underline (scale in on hover / active) */
const NAV_UNDERLINE =
  "absolute bottom-0.5 left-1/2 h-[2px] w-[calc(100%-1.75rem)] -translate-x-1/2 scale-x-0 rounded-full bg-gradient-to-r from-[#7CCCBF] to-[#A6CE39] transition-transform duration-300 group-hover:scale-x-100";

// ─── Sub-components ───────────────────────────────────────────────────────────

// ── Logo ──────────────────────────────────────────────────────────────────────

function LogoBlock({
  base,
  className,
  bar,
}: {
  base: string;
  className?: string;
  bar: BarTheme;
}) {
  return (
    <Link
      to={homePath(base)}
      className={clsx(
        "flex items-center transition-opacity duration-300 hover:opacity-75",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        bar === HOME_ON_DARK_BAR
          ? "focus-visible:ring-white/45"
          : "focus-visible:ring-[#005E96]/40",
        className
      )}
      aria-label="Hajz Telecommunications — Home"
    >
      <Logo
        className="h-11 w-auto max-h-[3.25rem] shrink-0 sm:h-12 lg:h-[3.5rem]"
        scrolled
        textColorOverride={bar.logoInk}
      />
    </Link>
  );
}

// ── Dropdown panel — crisp white card ─────────────────────────────────────────

function DropdownPanel({
  children,
  minWidth = 260,
}: {
  children: React.ReactNode;
  minWidth?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.985 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 top-full z-20 mt-5 overflow-hidden rounded-2xl"
      style={{
        minWidth,
        background: C.panelBg,
        border: `1px solid ${C.divider}`,
        boxShadow:
          "0 20px 60px rgba(0, 94, 150, 0.10), 0 6px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
      }}
    >
      {/* Navy-to-teal top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${C.navy}, ${C.teal})`,
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

// ── Dropdown row item ─────────────────────────────────────────────────────────

function DropdownItem({
  to,
  children,
  indent = false,
}: {
  to: string;
  children: React.ReactNode;
  indent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={clsx(
        "group flex items-center justify-between transition-all duration-200",
        "border-b last:border-b-0",
      )}
      style={{ borderColor: C.divider }}
    >
      <span
        className={clsx(
          "flex-1 transition-colors duration-200",
          indent
            ? "py-3 pl-9 pr-5 text-[0.9rem]"
            : "px-6 py-3.5 text-base font-medium"
        )}
        style={{
          color: indent ? C.navMuted : C.navy,
        }}
      >
        {children}
      </span>
      {!indent && (
        <ArrowUpRight
          className="mr-5 h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-40"
          style={{ color: C.teal }}
          aria-hidden
        />
      )}
    </Link>
  );
}

function DropdownSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="px-6 pb-1.5 pt-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em]"
      style={{ color: C.teal }}
    >
      {children}
    </p>
  );
}

// ── Desktop nav dropdowns ─────────────────────────────────────────────────────

function DesktopDropdowns({
  base,
  pathname,
  openDropdown,
  setOpenDropdown,
  bar,
}: {
  base: string;
  pathname: string;
  openDropdown: DropdownId | null;
  setOpenDropdown: (v: DropdownId | null) => void;
  bar: BarTheme;
}) {
  const impactActive =
    pathname.startsWith(`${base}/our-impact`) ||
    pathname.startsWith(`${base}/customers`) ||
    pathname.startsWith(`${base}/partners`);

  const withDropdown = (
    id: DropdownId,
    label: string,
    isActive: boolean,
    content: React.ReactNode,
    minWidth?: number
  ) => (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(id)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        type="button"
        aria-expanded={openDropdown === id}
        className={NAV_LINK}
        style={{ color: isActive ? bar.navSolid : bar.navMuted }}
      >
        {label}
        <ChevronDown
          className={clsx(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            openDropdown === id && "rotate-180"
          )}
          style={{ color: isActive ? C.teal : bar.navMuted }}
          aria-hidden
        />
        <span className={NAV_UNDERLINE} aria-hidden />
        {/* Active dot indicator */}
        {isActive && (
          <span
            className="absolute bottom-0.5 left-1/2 h-[2px] w-[calc(100%-1.75rem)] -translate-x-1/2 rounded-full"
            style={{ background: `linear-gradient(90deg, ${C.teal}, ${C.lime})` }}
            aria-hidden
          />
        )}
      </button>
      <AnimatePresence>
        {openDropdown === id && (
          <DropdownPanel minWidth={minWidth}>{content}</DropdownPanel>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex items-center gap-0">
      {/* Home */}
      <Link
        to={homePath(base)}
        className={NAV_LINK}
        style={{ color: isHome(pathname, base) ? bar.navSolid : bar.navMuted }}
      >
        Home
        <span className={NAV_UNDERLINE} aria-hidden />
        {isHome(pathname, base) && (
          <span
            className="absolute bottom-0.5 left-1/2 h-[2px] w-[calc(100%-1.75rem)] -translate-x-1/2 rounded-full"
            style={{ background: `linear-gradient(90deg, ${C.teal}, ${C.lime})` }}
            aria-hidden
          />
        )}
      </Link>

      {/* About Us */}
      {withDropdown(
        "about",
        "About Us",
        pathname.startsWith(`${base}/about`),
        <div className="py-2">
          <DropdownItem to={`${base}/about/overview`}>Overview</DropdownItem>
          <DropdownItem to={`${base}/about/overview#what-we-do`} indent>Company Identity</DropdownItem>
          <DropdownItem to={`${base}/about/overview#our-journey`} indent>Our Journey</DropdownItem>
          <DropdownItem to={`${base}/about/overview#vision-mission`} indent>Vision &amp; Mission</DropdownItem>
          <DropdownItem to={`${base}/about/overview#core-strengths`} indent>Core Strengths</DropdownItem>
        </div>,
        300
      )}

      {/* Solutions */}
      {withDropdown(
        "what-we-do",
        "Solutions",
        pathname.startsWith(`${base}/what-we-do`),
        <div className="py-2">
          <DropdownSectionLabel>Telecommunications</DropdownSectionLabel>
          <DropdownItem to={`${base}/what-we-do/telecommunications`}>Overview</DropdownItem>
          <DropdownItem to={`${base}/what-we-do/telecommunications#business-unit`} indent>Our Core Solutions</DropdownItem>
          <DropdownItem to={`${base}/what-we-do/telecommunications#service-Standards`} indent>Service Standards</DropdownItem>

          <DropdownSectionLabel>Command &amp; Control</DropdownSectionLabel>
          <DropdownItem to={`${base}/what-we-do/command-control`}>Overview</DropdownItem>
          <DropdownItem to={`${base}/what-we-do/command-control#core-solutions`} indent>Our Core Solutions</DropdownItem>
          <DropdownItem to={`${base}/what-we-do/command-control#tech-stack`} indent>Technology Stack</DropdownItem>
          <DropdownItem to={`${base}/what-we-do/command-control#industries-served`} indent>Industries We Serve</DropdownItem>
        </div>,
        320
      )}

      {/* Our Impact */}
      {withDropdown(
        "our-impact",
        "Our Impact",
        impactActive,
        <div className="py-2">
          <DropdownItem to={`${base}/customers`}>Our Customers</DropdownItem>
          <DropdownItem to={`${base}/partners`}>Our Partners</DropdownItem>
        </div>,
        260
      )}
    </div>
  );
}

// ── Right-rail: phone + CTA ───────────────────────────────────────────────────

function PhoneAndContact({ base, bar }: { base: string; bar: BarTheme }) {
  return (
    <div className="flex shrink-0 items-center gap-4">
      {/* Phone — xl only */}
      <a
        href={PHONE_HREF}
        className="hidden items-center gap-2.5 text-[0.875rem] font-medium transition-colors duration-300 xl:flex"
        style={{ color: bar.navMuted }}
        aria-label={`Call ${PHONE_LABEL}`}
      >
        <Phone className="h-4 w-4 shrink-0" style={{ color: bar.phoneIcon }} aria-hidden />
        <span className="whitespace-nowrap tracking-wide">{PHONE_LABEL}</span>
      </a>

      {/* Vertical rule */}
      <div
        className="hidden h-5 w-px xl:block"
        style={{ background: bar.barDivider }}
        aria-hidden
      />

      {/* Contact CTA — navy pill (default) or white pill on dark home hero */}
      <Link
        to={`${base}/contact`}
        className={clsx(
          "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-[0.8125rem] font-bold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          bar === HOME_ON_DARK_BAR
            ? "focus-visible:ring-white/50"
            : "focus-visible:ring-[#005E96]/45"
        )}
        style={{
          background: bar.ctaBg,
          color: bar.ctaText,
          boxShadow: bar.ctaShadow,
          outlineColor: bar.ctaRing,
        }}
        aria-label="Contact us"
      >
        <span
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: bar.ctaHoverGradient }}
          aria-hidden
        />
        <span className="relative">Contact Us</span>
        <ArrowUpRight
          className="relative h-4 w-4 shrink-0 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          style={{ color: bar.ctaText }}
          aria-hidden
        />
      </Link>
    </div>
  );
}

// ─── Mobile accordion ─────────────────────────────────────────────────────────

function MobileAccordion({
  label,
  id,
  open,
  onToggle,
  children,
}: {
  label: string;
  id: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t" style={{ borderColor: C.divider }}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-2 py-5 text-left text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200"
        style={{ color: open ? C.navy : C.navMuted }}
        aria-expanded={open}
        aria-controls={`mobile-menu-${id}`}
        onClick={onToggle}
      >
        {label}
        <ChevronDown
          className={clsx(
            "h-5 w-5 transition-transform duration-300",
            open && "rotate-180"
          )}
          style={{ color: open ? C.teal : C.navMuted }}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`mobile-menu-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mb-3 ml-4 border-l pl-4"
              style={{ borderColor: `${C.teal}55` }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({
  to,
  onClick,
  children,
  indent = false,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
  indent?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-3 text-base transition-colors duration-200"
      style={{ color: indent ? `${C.navy}80` : C.navMuted }}
    >
      {children}
    </Link>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Navbar2 — transparent landing navbar; on Home, first scroll sections use an
 * inverted bar (white type + white CTA) over dark heroes via scroll sync.
 *
 * Palette roles:
 *   Navy  #005E96 — primary text, active links, CTA fill, dropdown border
 *   Teal  #7CCCBF — hover underlines, section labels, accordion border-left
 *   Sky   #44C8F5 — phone icon tint, subtle accent
 *   Lime  #A6CE39 — underline gradient tail, active indicator
 *
 * States:
 *   • Top of page  : transparent bar; Home early sections → white nav / inverted CTA
 *   • Scrolled     : white frosted glass backdrop, navy text, soft navy shadow
 *   • Mobile open  : white sheet panel, navy text, teal accent line at top
 */
export default function Navbar2({ basePath = "" }: Navbar2Props) {
  const { pathname } = useLocation();
  const base = basePath;

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [openDropdown,   setOpenDropdown]   = useState<DropdownId | null>(null);
  /** Home only: true while viewport is in network hero + carousel + teaser (before Telecom). */
  const [homeDarkHeroBar, setHomeDarkHeroBar] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  const isHomePath = pathname === "/" || pathname === "";
  const bar: BarTheme =
    isHomePath && homeDarkHeroBar && !isScrolled && !mobileOpen
      ? HOME_ON_DARK_BAR
      : DEFAULT_BAR;

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── External open-menu event ─────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setMobileOpen(true);
    window.addEventListener("open-menu", handler);
    return () => window.removeEventListener("open-menu", handler);
  }, []);

  // ── Home page: first sections vs rest (scroll container is not window) ──
  useEffect(() => {
    const onTheme = (e: Event) => {
      const ce = e as CustomEvent<{ onDark?: boolean }>;
      if (typeof ce.detail?.onDark === "boolean") setHomeDarkHeroBar(ce.detail.onDark);
    };
    window.addEventListener(HOME_NAVBAR_BAR_THEME_EVENT, onTheme);
    return () => window.removeEventListener(HOME_NAVBAR_BAR_THEME_EVENT, onTheme);
  }, []);

  useEffect(() => {
    if (!isHomePath) setHomeDarkHeroBar(true);
  }, [isHomePath]);

  // ── Body scroll lock when mobile sheet is open ───────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenMobileMenu(null);
  }, []);

  useEffect(() => { closeMobile(); }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMobile(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  const navProps = { base, pathname, openDropdown, setOpenDropdown, bar };

  // ── Header background ────────────────────────────────────────────────────
  // Transparent at rest; white-frosted once scrolled or mobile is open.
  const headerStyle: React.CSSProperties =
    isScrolled || mobileOpen
      ? {
          background:          C.frostBg,
          backdropFilter:      "blur(20px) saturate(150%)",
          WebkitBackdropFilter:"blur(20px) saturate(150%)",
          borderBottom:        `1px solid ${C.divider}`,
          boxShadow:           `0 4px 32px rgba(0, 94, 150, 0.08), 0 1px 0 rgba(0,94,150,0.06)`,
        }
      : {
          background:   "transparent",
          borderBottom: "1px solid transparent",
        };

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-out",
        isScrolled ? "py-4" : "py-5 sm:py-6"
      )}
      style={headerStyle}
    >
      <div className="w-full max-w-none px-6 sm:px-8 lg:px-12 xl:px-14 2xl:px-16">

        {/* ── Mobile bar (below lg): logo centered, menu right ─────────────── */}
        <div className="relative z-[60] flex min-h-[3rem] items-center justify-end lg:hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-auto">
              <LogoBlock base={base} bar={bar} />
            </div>
          </div>
          <button
            type="button"
            className={clsx(
              "relative z-[30] inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              bar === HOME_ON_DARK_BAR
                ? "focus-visible:ring-white/45"
                : "focus-visible:ring-[#005E96]/40"
            )}
            style={{
              background:   mobileOpen ? bar.menuBtnBgOpen : bar.menuBtnBg,
              border:       `1px solid ${bar.menuBtnBorder}`,
              outlineColor: bar.ctaRing,
            }}
            aria-expanded={mobileOpen}
            aria-controls="navbar2-mobile-panel"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <X className="h-5 w-5" style={{ color: bar.menuIcon }} aria-hidden />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <Menu className="h-5 w-5" style={{ color: bar.menuIcon }} aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── Desktop (lg+): logo fixed to visual center; nav left / actions right ── */}
        <div className="relative hidden lg:flex lg:items-center lg:min-h-[3.5rem]">
          <div className="relative z-[30] flex min-w-0 flex-1 justify-start">
            <nav className="overflow-visible" aria-label="Primary navigation">
              <DesktopDropdowns {...navProps} />
            </nav>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[10] -translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-auto">
              <LogoBlock base={base} bar={bar} />
            </div>
          </div>
          <div className="relative z-[20] flex min-w-0 flex-1 justify-end">
            <PhoneAndContact base={base} bar={bar} />
          </div>
        </div>
      </div>

      {/* ── Mobile sheet ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-sheet"
              id="navbar2-mobile-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full z-[90] max-h-[calc(100dvh-5.75rem)] overflow-y-auto"
              style={{
                background:          C.panelBg,
                backdropFilter:      "blur(24px) saturate(160%)",
                WebkitBackdropFilter:"blur(24px) saturate(160%)",
                borderBottom:        `1px solid ${C.divider}`,
                boxShadow:           `0 20px 60px rgba(0, 94, 150, 0.12), 0 4px 16px rgba(0,0,0,0.06)`,
              }}
              role="dialog"
              aria-label="Mobile navigation"
            >
              {/* Teal → lime top accent stripe */}
              <div
                className="h-[2px] w-full"
                style={{ background: `linear-gradient(90deg, ${C.navy}, ${C.teal})` }}
                aria-hidden
              />

              <nav
                className="w-full max-w-none px-6 py-5 sm:px-8 lg:px-12 xl:px-14 2xl:px-16"
                aria-label="Mobile primary"
              >
                {/* Home */}
                <Link
                  to={homePath(base)}
                  onClick={closeMobile}
                  className="block px-2 py-5 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{ color: isHome(pathname, base) ? C.navy : C.navMuted }}
                >
                  Home
                </Link>

                {/* About Us */}
                <MobileAccordion
                  label="About Us" id="about"
                  open={openMobileMenu === "about"}
                  onToggle={() => setOpenMobileMenu(openMobileMenu === "about" ? null : "about")}
                >
                  <MobileLink to={`${base}/about/overview`} onClick={closeMobile}>Overview</MobileLink>
                  <MobileLink to={`${base}/about/overview#what-we-do`} onClick={closeMobile} indent>Company Identity</MobileLink>
                  <MobileLink to={`${base}/about/overview#our-journey`} onClick={closeMobile} indent>Our Journey</MobileLink>
                  <MobileLink to={`${base}/about/overview#vision-mission`} onClick={closeMobile} indent>Vision &amp; Mission</MobileLink>
                  <MobileLink to={`${base}/about/overview#core-strengths`} onClick={closeMobile} indent>Core Strengths</MobileLink>
                </MobileAccordion>

                {/* Solutions */}
                <MobileAccordion
                  label="Solutions" id="what-we-do"
                  open={openMobileMenu === "what-we-do"}
                  onToggle={() => setOpenMobileMenu(openMobileMenu === "what-we-do" ? null : "what-we-do")}
                >
                  <p className="pb-1 pt-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal }}>
                    Telecommunications
                  </p>
                  <MobileLink to={`${base}/what-we-do/telecommunications`} onClick={closeMobile}>Overview</MobileLink>
                  <MobileLink to={`${base}/what-we-do/telecommunications#business-unit`} onClick={closeMobile} indent>Our Core Solutions</MobileLink>
                  <MobileLink to={`${base}/what-we-do/telecommunications#service-Standards`} onClick={closeMobile} indent>Service Standards</MobileLink>

                  <p className="pb-1 pt-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal }}>
                    Command &amp; Control
                  </p>
                  <MobileLink to={`${base}/what-we-do/command-control`} onClick={closeMobile}>Overview</MobileLink>
                  <MobileLink to={`${base}/what-we-do/command-control#core-solutions`} onClick={closeMobile} indent>Our Core Solutions</MobileLink>
                  <MobileLink to={`${base}/what-we-do/command-control#tech-stack`} onClick={closeMobile} indent>Technology Stack</MobileLink>
                  <MobileLink to={`${base}/what-we-do/command-control#industries-served`} onClick={closeMobile} indent>Industries We Serve</MobileLink>
                </MobileAccordion>

                {/* Our Impact */}
                <MobileAccordion
                  label="Our Impact" id="our-impact"
                  open={openMobileMenu === "our-impact"}
                  onToggle={() => setOpenMobileMenu(openMobileMenu === "our-impact" ? null : "our-impact")}
                >
                  <MobileLink to={`${base}/customers`} onClick={closeMobile}>Our Customers</MobileLink>
                  <MobileLink to={`${base}/partners`} onClick={closeMobile}>Our Partners</MobileLink>
                </MobileAccordion>

                {/* Bottom action row */}
                <div
                  className="mt-5 flex flex-col gap-4 border-t py-6"
                  style={{ borderColor: C.divider }}
                >
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 px-2 text-base transition-colors duration-200"
                    style={{ color: C.navMuted }}
                  >
                    <Phone className="h-5 w-5 shrink-0" style={{ color: C.sky }} aria-hidden />
                    {PHONE_LABEL}
                  </a>
                  <Link
                    to={`${base}/contact`}
                    onClick={closeMobile}
                    className="group flex items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200"
                    style={{
                      background: C.navy,
                      boxShadow:  `0 2px 16px rgba(0, 94, 150, 0.25)`,
                    }}
                  >
                    Contact Us
                    <ArrowUpRight
                      className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </div>
              </nav>
            </motion.div>

            {/* Dimmer backdrop */}
            <motion.button
              key="mobile-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 z-[80] cursor-default"
              style={{
                top: headerRef.current
                  ? `${headerRef.current.getBoundingClientRect().bottom}px`
                  : "5.75rem",
                background:           "rgba(0, 30, 50, 0.35)",
                backdropFilter:       "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
              aria-label="Close menu overlay"
              onClick={closeMobile}
              tabIndex={-1}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}