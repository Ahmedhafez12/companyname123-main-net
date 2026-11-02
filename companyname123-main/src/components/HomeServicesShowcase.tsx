import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Brain,
  Broadcast,
  Code,
  GridFour,
  HardDrives,
  Monitor,
  PlugsConnected,
  ShareNetwork,
  ShieldCheck,
  TreeStructure,
} from "phosphor-react";
import { useTranslation, useLocale } from "../i18n";

// --- Brand palette (matches tailwind theme) ---
const C = {
  primary: "#005E96",
  secondary: "#44C8F5",
  accent: "#7CCCBF",
  cta: "#A6CE39",
  bg: "#002C3D",
} as const;

const AUTOPLAY_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

export type ShowcaseCategory = "telecommunications" | "command-control";

type ShowcaseItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  image: string;
};

const TELECOM_IMG = "/assets/Telecommunications/";
const CC_IMG = "/assets/CommandandControl/";
const MODERN = "Modern_premium_corporate_photography_for_a_network_";

function useShowcaseData(category: ShowcaseCategory) {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  if (category === "telecommunications") {
    const s = t.homePage.telecomPageServices;
    const base = "/what-we-do/telecommunications";
    return {
      index: "01",
      title: t.homePage.telecomServices.title,
      subtitle: t.homePage.telecomServices.subtitle,
      exploreLabel: t.homePage.exploreTelecom,
      exploreHref: localePath(base),
      items: [
        {
          icon: TreeStructure,
          ...s.systemIntegration,
          href: localePath(`${base}#system-integration`),
          image: `${TELECOM_IMG}${MODERN}63fec3bc12.jpeg`,
        },
        {
          icon: Broadcast,
          ...s.connectivity,
          href: localePath(`${base}#connectivity-transmission`),
          image: `${TELECOM_IMG}Telecom_tower_connecting_landscape_7cdb458686.jpeg`,
        },
        {
          icon: ShareNetwork,
          ...s.unifiedCommunication,
          href: localePath(`${base}#unified-communication`),
          image: `${TELECOM_IMG}${MODERN}541700df21.jpeg`,
        },
        {
          icon: PlugsConnected,
          ...s.accessLan,
          href: localePath(`${base}#access-lan-osp`),
          image: `${TELECOM_IMG}${MODERN}45a0fc7f40.jpeg`,
        },
        {
          icon: ShieldCheck,
          ...s.militaryCritical,
          href: localePath(`${base}#military-critical-communication`),
          image: `${TELECOM_IMG}Satellite_dish_array_signal_beams_15aa8e2a0d.jpeg`,
        },
      ] as ShowcaseItem[],
    };
  }

  const s = t.homePage.commandPageServices;
  const href = localePath("/what-we-do/command-control#tech-stack");
  return {
    index: "02",
    title: t.homePage.commandControlServices.title,
    subtitle: t.homePage.commandControlServices.subtitle,
    exploreLabel: t.homePage.exploreCommandControl,
    exploreHref: localePath("/what-we-do/command-control"),
    items: [
      {
        icon: Monitor,
        ...s.controlRoom,
        href,
        image: `${CC_IMG}Control_room_with_screens_37be293209.jpeg`,
      },
      {
        icon: Code,
        ...s.software,
        href,
        image: `${CC_IMG}${MODERN}9802d7d127.jpeg`,
      },
      {
        icon: GridFour,
        ...s.videoWalls,
        href,
        image: `${CC_IMG}${MODERN}42589d16b5.jpeg`,
      },
      {
        icon: HardDrives,
        ...s.servers,
        href,
        image: `${CC_IMG}${MODERN}3fbc7ceb1d.jpeg`,
      },
      {
        icon: Brain,
        ...s.aiSoftware,
        href,
        image: `${CC_IMG}${MODERN}db5915e486.jpeg`,
      },
    ] as ShowcaseItem[],
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomeServicesShowcase({
  category,
  reversed = false,
}: {
  category: ShowcaseCategory;
  /** Put the visual panel on the trailing side (alternates rhythm between slides). */
  reversed?: boolean;
}) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const data = useShowcaseData(category);
  const { items } = data;

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const nearView = useInView(rootRef, { once: true, margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the first image loads up front; the rest mount once the slide is reached.
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    if (!inView || primed) return;
    const id = setTimeout(() => setPrimed(true), 800);
    return () => clearTimeout(id);
  }, [inView, primed]);

  const playing = inView && !paused && !reduceMotion && primed;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(id);
  }, [playing, active, items.length]);

  const current = items[active];
  const CurrentIcon = current.icon;
  const Arrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <div
      ref={rootRef}
      className="page-container py-20 md:py-16 lg:py-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* ── Visual panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`lg:col-span-6 ${reversed ? "lg:order-last" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative w-full overflow-hidden rounded-[1.75rem] h-[46vh] min-h-[280px] xs:min-h-[300px] sm:h-[52vh] lg:h-[min(74vh,640px)] 3xl:h-[min(74vh,780px)]"
            style={{
              boxShadow: `0 40px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 120px -40px ${C.secondary}55`,
            }}
          >
            {/* Image stack */}
            {items.map((item, i) =>
              i === 0 || primed || i === active ? (
                <motion.img
                  key={item.image}
                  src={item.image}
                  alt=""
                  aria-hidden
                  decoding="async"
                  loading={nearView ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    scale: i === active && !reduceMotion ? 1.08 : 1.0,
                  }}
                  transition={{
                    opacity: { duration: 0.9, ease: "easeOut" },
                    scale: {
                      duration: i === active ? AUTOPLAY_MS / 1000 + 1 : 0.9,
                      ease: "linear",
                    },
                  }}
                />
              ) : null,
            )}

            {/* Tonal overlays */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, ${C.bg}66 0%, transparent 28%, transparent 45%, ${C.bg}E6 82%, ${C.bg} 100%)`,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{
                background: `linear-gradient(135deg, ${C.primary}99, transparent 60%)`,
              }}
            />

            {/* Top bar: counter + icon */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between p-5 sm:p-6">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 backdrop-blur-md px-3.5 py-1.5">
                <span
                  className="font-sans text-xs font-semibold tabular-nums"
                  style={{ color: C.cta }}
                >
                  {pad(active + 1)}
                </span>
                <span className="h-3 w-px bg-white/25" />
                <span className="font-sans text-xs text-white/60 tabular-nums">
                  {pad(items.length)}
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/15 bg-black/20 backdrop-blur-md"
                  style={{ color: C.cta }}
                >
                  <CurrentIcon weight="duotone" size={22} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 lg:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <h3 className="font-sans font-bold text-white text-xl sm:text-2xl lg:text-[1.75rem] leading-tight mb-2">
                    {current.title}
                  </h3>
                  <p className="font-body text-white/75 text-sm sm:text-base leading-relaxed max-w-md">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress segments */}
              <div className="flex gap-1.5 mt-3" role="tablist">
                {items.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={item.title}
                    onClick={() => setActive(i)}
                    className="group/seg flex-1 min-h-0 min-w-0 px-0 py-2 bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
                  >
                    <span className="relative block h-[3px] rounded-full bg-white/15 overflow-hidden transition-colors group-hover/seg:bg-white/30">
                    {i < active && (
                      <span className="absolute inset-0 bg-white/50" />
                    )}
                    {i === active && (
                      <motion.span
                        key={`${active}-${playing}`}
                        className={`absolute inset-0 ${isRTL ? "origin-right" : "origin-left"}`}
                        style={{
                          background: `linear-gradient(90deg, ${C.secondary}, ${C.cta})`,
                        }}
                        initial={{ scaleX: playing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: playing ? AUTOPLAY_MS / 1000 : 0,
                          ease: "linear",
                        }}
                      />
                    )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div className="lg:col-span-6 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-sans text-sm font-bold tabular-nums"
                style={{ color: C.cta }}
              >
                {data.index}
              </span>
              <span
                className="h-px w-12"
                style={{
                  background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, ${C.cta}, transparent)`,
                }}
              />
              <span
                className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/75"
              >
                {t.whatWeDoPage.heroTitle} {t.whatWeDoPage.heroTitleHighlight}
              </span>
            </div>
            <h2
              className="font-sans font-bold text-white leading-[1.08] mb-4"
              style={{
                fontSize: "clamp(1.75rem, 1rem + 2.6vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {data.title}
            </h2>
            <p className="font-body text-white/60 text-base sm:text-lg 3xl:text-xl leading-relaxed max-w-lg 3xl:max-w-xl">
              {data.subtitle}
            </p>
          </motion.div>

          {/* Service index */}
          <motion.ul
            className="mt-7 lg:mt-9 border-t border-white/10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
            }}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                  className="relative border-b border-white/10"
                >
                  {/* Active indicator */}
                  <motion.span
                    aria-hidden
                    className="absolute top-0 bottom-0 start-0 w-[2px]"
                    style={{
                      background: `linear-gradient(180deg, ${C.secondary}, ${C.cta})`,
                    }}
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  <Link
                    to={item.href}
                    onMouseEnter={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onFocus={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onBlur={() => setPaused(false)}
                    className="group flex items-center gap-4 sm:gap-5 py-3.5 lg:py-4 ps-4 sm:ps-5 pe-1 focus:outline-none focus-visible:bg-white/[0.04] transition-colors duration-300"
                  >
                    <span
                      className="font-sans text-xs font-semibold tabular-nums w-5 transition-colors duration-300"
                      style={{ color: isActive ? C.cta : "rgba(255,255,255,0.3)" }}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-xl items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? `${C.cta}1F` : "rgba(255,255,255,0.04)",
                        color: isActive ? C.cta : "rgba(255,255,255,0.45)",
                        border: `1px solid ${isActive ? `${C.cta}40` : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <Icon weight="duotone" size={18} />
                    </span>
                    <span
                      className={`flex-1 min-w-0 font-sans font-semibold text-base sm:text-lg leading-snug transition-all duration-300 ${
                        isActive ? "text-white" : "text-white/55 group-hover:text-white/80"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? C.cta : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                        border: `1px solid ${isActive ? C.cta : "rgba(255,255,255,0.12)"}`,
                      }}
                    >
                      <Arrow weight="bold" size={15} />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            className="mt-7 lg:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            <Link
              to={data.exploreHref}
              className="btn-primary inline-flex items-center gap-2 group text-sm sm:text-base px-6 py-3"
            >
              <span>{data.exploreLabel}</span>
              <span
                className={`inline-flex transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
              >
                <span className={`inline-flex ${isRTL ? "rtl-flip" : ""}`}>
                  <ArrowRight weight="bold" size={18} />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
