import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Design Tokens ────────────────────────────────────────────────────────────

/** CTA / badge accent — lime-green brand colour */
const COLOR_ACCENT = "#A6CE39";
/** Teal — secondary brand colour used for sub-headline & decor */
const COLOR_TEAL = "#7CCCBF";
/** Sky-blue — tertiary brand colour for tertiary headline */
const COLOR_SKY = "#44C8F5";
/** Overlay that dims the frame sequence (deep navy, matches site bg) */
const OVERLAY_COLOR = "rgba(0, 44, 61, 0.55)";

// ─── Sequence config ─────────────────────────────────────────────────────────

const FRAME_COUNT = 190;
const MIN_LOADED_COUNT = Math.ceil(FRAME_COUNT * 0.2);
const SEQUENCE_BASE = "/images/hero-sequence";
/** Strip watermark rows from bottom of each source frame */
const SOURCE_CROP_BOTTOM_PX = 50;

// ─── Scroll-animation config ──────────────────────────────────────────────────

/** Scroll progress (0–1) at which the headline motion completes */
const HERO_TITLE_MOTION_END = 0.28;
/** Peak scale factor for the headline block */
const HERO_TITLE_SCALE_MAX = 1.1;
/** Max upward drift (px) shared by headline block & Trusted-By strip */
const HERO_COPY_Y_MAX = 90;

/** Tailwind padding-top to clear the fixed transparent navbar */
const NAV_CLEARANCE = "pt-16 sm:pt-20";

// ─── Types ────────────────────────────────────────────────────────────────────

type Partner = { name: string; src: string };

const PARTNERS: Partner[] = [
  {
    name: "Saudi Ministry of Defense",
    src: "https://upload.wikimedia.org/wikipedia/ar/d/d7/Saudi_Ministry_of_Defense_Logo.svg",
  },
  {
    name: "STC",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg",
  },
  {
    name: "HP",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
  },
  {
    name: "Microsoft",
    src: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
  },
  {
    name: "IBM",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Oracle",
    src: "/assets/oracle-logo.svg",
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function frameUrl(index1Based: number): string {
  return `${SEQUENCE_BASE}/scene${String(index1Based).padStart(5, "0")}.webp`;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
): void {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const sh = Math.max(1, ih - SOURCE_CROP_BOTTOM_PX);
  const scale = Math.max(cw / iw, ch / sh);
  const dw = iw * scale;
  const dh = sh * scale;
  ctx.drawImage(img, 0, 0, iw, sh, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

// ─── Decorative SVG (side fibre lines) ───────────────────────────────────────

export function NetworkFlowDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        d="M-20 720 C 80 620, 120 480, 200 400 S 340 220, 360 80"
        stroke={COLOR_TEAL}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M40 760 Q 160 600, 220 420 T 320 120"
        stroke={COLOR_TEAL}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="320" cy="120" r="3.5" fill={COLOR_TEAL} opacity="0.45" />
      <circle cx="200" cy="400" r="2.5" fill={COLOR_TEAL} opacity="0.35" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export type NetworkHeroCanvasProps = {
  scrollScrollerRef?: RefObject<HTMLElement | null>;
};

/**
 * NetworkHeroCanvas
 *
 * 400 vh scroll-scrubbed canvas hero (scene00001 – scene00190).
 * Full-bleed frame sequence · GSAP scroll animation on headline stack
 * · Trusted-By partner strip · graceful boot/error states.
 */
export default function NetworkHeroCanvas({
  scrollScrollerRef,
}: NetworkHeroCanvasProps) {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasShellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Single transform wrapper so all headline lines scale as one unit */
  const heroHeadlinesRef = useRef<HTMLDivElement>(null);
  const trustedBannerRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | undefined)[]>(
    new Array<HTMLImageElement | undefined>(FRAME_COUNT).fill(undefined)
  );
  const loadCountRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const canPaintRef = useRef(false);

  // ── State ─────────────────────────────────────────────────────────────────
  const [loadPhase, setLoadPhase] = useState<"boot" | "interactive" | "error">(
    "boot"
  );

  // ── Helpers ───────────────────────────────────────────────────────────────

  const clearHeroCopyTransforms = useCallback(() => {
    const headlines = heroHeadlinesRef.current;
    if (headlines) gsap.set(headlines, { clearProps: "transform" });
    const banner = trustedBannerRef.current;
    if (banner) gsap.set(banner, { clearProps: "transform" });
  }, []);

  const measureViewport = useCallback(() => {
    for (const ref of [canvasShellRef, stickyRef]) {
      const r = ref.current?.getBoundingClientRect();
      if (r && r.width >= 8 && r.height >= 8)
        return { w: Math.round(r.width), h: Math.round(r.height) };
    }
    return {
      w: typeof window !== "undefined" ? window.innerWidth : 0,
      h: typeof window !== "undefined" ? window.innerHeight : 0,
    };
  }, []);

  const prepareCanvas = useCallback(():
    | { ctx: CanvasRenderingContext2D; w: number; h: number }
    | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { w, h } = measureViewport();
    if (w < 2 || h < 2) return null;

    const nw = Math.round(w * dpr);
    const nh = Math.round(h * dpr);

    if (canvas.width !== nw || canvas.height !== nh) {
      canvas.width = nw;
      canvas.height = nh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }, [measureViewport]);

  const findDrawableFrame = useCallback((idx: number) => {
    const arr = imagesRef.current;
    const ready = (im?: HTMLImageElement) => im?.complete && im.naturalWidth;
    if (ready(arr[idx])) return arr[idx]!;
    for (let j = idx; j >= 0; j--) if (ready(arr[j])) return arr[j]!;
    for (let j = idx + 1; j < FRAME_COUNT; j++) if (ready(arr[j])) return arr[j]!;
    return null;
  }, []);

  const paintFrame = useCallback(
    (index0Based: number) => {
      if (!canPaintRef.current) return;
      const prepared = prepareCanvas();
      if (!prepared) return;
      const { ctx, w, h } = prepared;
      const img = findDrawableFrame(index0Based);
      ctx.fillStyle = "#000d14";
      ctx.fillRect(0, 0, w, h);
      if (img) drawImageCover(ctx, img, w, h);
    },
    [prepareCanvas, findDrawableFrame]
  );

  const resizeAndRedraw = useCallback(() => {
    paintFrame(Math.min(Math.max(lastFrameRef.current, 0), FRAME_COUNT - 1));
  }, [paintFrame]);

  const applyHeroCopyScroll = useCallback((scrollProgress: number) => {
    const p = Math.min(1, Math.max(0, scrollProgress));
    const t = Math.min(1, Math.max(0, p / HERO_TITLE_MOTION_END));
    const ease = 1 - (1 - t) * (1 - t);
    const scale = gsap.utils.interpolate(1, HERO_TITLE_SCALE_MAX, ease);
    const y = -gsap.utils.interpolate(0, HERO_COPY_Y_MAX, ease);

    if (heroHeadlinesRef.current) {
      gsap.set(heroHeadlinesRef.current, {
        opacity: 1,
        scale,
        y,
        transformOrigin: "50% 100%",
        force3D: true,
      });
    }
    if (trustedBannerRef.current) {
      gsap.set(trustedBannerRef.current, {
        opacity: 1,
        visibility: "visible",
        y,
        force3D: true,
      });
    }
  }, []);

  const drawFrame = useCallback(
    (progress: number) => {
      const p = Math.min(1, Math.max(0, progress));
      const index0 = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
      applyHeroCopyScroll(p);
      if (index0 !== lastFrameRef.current) {
        lastFrameRef.current = index0;
        paintFrame(index0);
      }
    },
    [paintFrame, applyHeroCopyScroll]
  );

  // ── Load frames ───────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    let cancelled = false;
    const slots = new Array<HTMLImageElement | undefined>(FRAME_COUNT).fill(undefined);
    imagesRef.current = slots;
    loadCountRef.current = 0;
    canPaintRef.current = false;
    setLoadPhase("boot");

    const onOneLoaded = () => {
      if (cancelled) return;
      loadCountRef.current += 1;
      if (loadCountRef.current >= MIN_LOADED_COUNT) {
        canPaintRef.current = true;
        setLoadPhase((prev) => (prev === "error" ? prev : "interactive"));
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    let settled = 0;
    const bumpSettled = () => {
      settled += 1;
      if (cancelled) return;
      if (settled >= FRAME_COUNT && loadCountRef.current < MIN_LOADED_COUNT) {
        setLoadPhase("error");
      }
      if (settled === FRAME_COUNT) requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    Array.from({ length: FRAME_COUNT }, (_, i) => frameUrl(i + 1)).forEach(
      (src, i) => {
        loadImage(src)
          .then((img) => {
            if (!cancelled) {
              slots[i] = img;
              onOneLoaded();
            }
          })
          .catch(() => {})
          .finally(bumpSettled);
      }
    );

    return () => {
      cancelled = true;
      canPaintRef.current = false;
      imagesRef.current = new Array<HTMLImageElement | undefined>(FRAME_COUNT).fill(undefined);
    };
  }, []);

  // ── Scroll trigger ────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    if (loadPhase !== "interactive") return;

    const track = trackRef.current;
    if (!track) return;

    const scroller = scrollScrollerRef?.current ?? undefined;

    const toggleSnap = (active: boolean) => {
      if (!scroller) return;
      scroller.classList.toggle("network-hero-snap-off", active);
      if (!active) requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const stConfig: ScrollTrigger.Vars = {
      id: "network-hero-canvas-st",
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => drawFrame(self.progress),
      onToggle: (self) => toggleSnap(self.isActive),
      onRefresh: () => {
        clearHeroCopyTransforms();
        requestAnimationFrame(() => {
          const st = ScrollTrigger.getById("network-hero-canvas-st");
          if (st) drawFrame(st.progress);
        });
      },
    };
    if (scroller) stConfig.scroller = scroller;

    const st = ScrollTrigger.create(stConfig);
    if (scroller && st.isActive) toggleSnap(true);

    drawFrame(st.progress);

    const onResize = () => {
      ScrollTrigger.refresh();
      clearHeroCopyTransforms();
      resizeAndRedraw();
      drawFrame(st.progress);
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      drawFrame(st.progress);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
      scroller?.classList.remove("network-hero-snap-off");
      clearHeroCopyTransforms();
    };
  }, [loadPhase, scrollScrollerRef, drawFrame, resizeAndRedraw, clearHeroCopyTransforms]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section
      id="network-hero-scroll"
      ref={trackRef as React.RefObject<HTMLElement>}
      className="network-hero-canvas-section relative h-[400vh] w-full shrink-0"
      style={{ background: "#000d14" }}
      aria-label="Network hero sequence"
    >
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[min(100dvh,100svh)] min-h-[100dvh] w-full overflow-hidden"
        style={{ background: "#000d14" }}
      >
        {/* ── Canvas + overlay ─────────────────────────────────────────── */}
        <div
          ref={canvasShellRef}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />

          {/* Gradient overlay — bottom vignette + colour tint */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: OVERLAY_COLOR }}
            aria-hidden
          />
          {/* Bottom-up dark vignette for legibility */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,13,20,0.72) 0%, transparent 45%)",
            }}
            aria-hidden
          />
        </div>

        {/* ── Hero copy layer ───────────────────────────────────────────── */}
        <div
          className="pointer-events-none relative flex h-full w-full flex-col"
          style={{ zIndex: 10 }}
        >
          <div
            className={`
              pointer-events-none absolute inset-0
              flex flex-col items-center justify-center
              gap-12 px-5
              sm:gap-16 sm:px-8
              md:gap-20
              ${NAV_CLEARANCE}
            `}
          >
            {/* ── Headline stack ──────────────────────────────────────── */}
            <div
              ref={heroHeadlinesRef}
              className="flex w-full max-w-[min(88vw,58rem)] flex-col items-center gap-0 will-change-transform"
            >
              {/* Eyebrow label — brand accent */}
              <p
                className="mb-5 flex items-center gap-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.26em] [text-shadow:0_1px_14px_rgba(0,18,28,0.45)]"
                style={{ color: COLOR_ACCENT }}
              >
                <span
                  className="inline-block h-px w-6 sm:w-8"
                  style={{ background: COLOR_ACCENT, opacity: 0.6 }}
                />
                Enterprise Network Solutions
                <span
                  className="inline-block h-px w-6 sm:w-8"
                  style={{ background: COLOR_ACCENT, opacity: 0.6 }}
                />
              </p>

              {/* Primary headline */}
              <h1
                className="
                  w-full text-center
                  font-sans text-[clamp(2.4rem,7vw,5.25rem)]
                  font-black leading-[1.0] tracking-[-0.025em]
                "
                style={{ color: "#ffffff" }}
              >
                Simple.{" "}
                <span style={{ color: COLOR_ACCENT }}>Fast.</span>{" "}
                Secure.
              </h1>

              {/* Secondary headline — brand teal */}
              <h2
                className="
                  mt-3 w-full text-center
                  font-sans text-[clamp(1.65rem,4.8vw,3.35rem)]
                  font-semibold leading-[1.15] tracking-[-0.015em]
                  [text-shadow:0_1px_24px_rgba(0,20,30,0.55)]
                "
                style={{ color: COLOR_TEAL }}
              >
                Networks You Can Trust.
              </h2>

              {/* Tertiary / sub-head — brand sky at full opacity (readability via weight + shadow, not greying the hue) */}
              <p
                className="
                  mt-4 max-w-[40rem] text-center
                  font-sans text-[clamp(1rem,2.15vw,1.2rem)]
                  font-medium leading-relaxed
                  [text-shadow:0_1px_18px_rgba(0,18,28,0.5)]
                "
                style={{ color: COLOR_SKY }}
              >
                Powering mission-critical infrastructure for the world's most
                demanding organisations — with zero compromise on performance or
                security.
              </p>

              {/* CTA row */}
              <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  className="
                    inline-flex items-center gap-2
                    rounded-full px-7 py-3
                    text-sm font-semibold tracking-wide
                    transition-all duration-200
                    hover:scale-[1.04] active:scale-[0.98]
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  "
                  style={{
                    background: COLOR_ACCENT,
                    color: "#0a1a0a",
                    boxShadow: `0 0 0 0 ${COLOR_ACCENT}`,
                    outline: `2px solid transparent`,
                    outlineColor: COLOR_ACCENT,
                  }}
                >
                  Get Started
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="
                    inline-flex items-center gap-2
                    rounded-full border px-7 py-3
                    text-sm font-semibold tracking-wide
                    text-white/80 transition-all duration-200
                    hover:text-white hover:border-white/50
                    active:scale-[0.98]
                  "
                  style={{ borderColor: "rgba(255,255,255,0.22)" }}
                >
                  View Solutions
                </button>
              </div>
            </div>

            {/* ── Trusted By strip ──────────────────────────────────────── */}
            <div
              ref={trustedBannerRef}
              className="flex w-full max-w-5xl flex-col items-center gap-4 will-change-transform"
            >
              {/* Divider */}
              <div className="flex w-full max-w-sm items-center gap-4">
                <div
                  className="h-px flex-1"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <p
                  className="whitespace-nowrap text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.2em] [text-shadow:0_1px_10px_rgba(0,18,28,0.4)]"
                  style={{ color: COLOR_TEAL }}
                >
                  Trusted By
                </p>
                <div
                  className="h-px flex-1"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              </div>

              <ul
                className="m-0 flex w-full list-none flex-wrap items-center justify-center gap-7 p-0 sm:gap-10 md:gap-12"
                aria-label="Trusted partner logos"
              >
                {PARTNERS.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-9 shrink-0 items-center justify-center sm:h-10"
                  >
                    <img
                      src={partner.src}
                      alt={partner.name}
                      width={120}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-6 w-auto max-w-[5rem] object-contain object-center
                        brightness-0 invert
                        opacity-40 transition-opacity duration-300 hover:opacity-70
                        sm:h-7 sm:max-w-[6rem]
                        md:h-8 md:max-w-[7rem]
                      "
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Boot / loading state ──────────────────────────────────────── */}
        {loadPhase === "boot" && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5"
            style={{ background: "#000d14" }}
            aria-live="polite"
            aria-busy
          >
            {/* Animated ring */}
            <div className="relative h-12 w-12" aria-hidden>
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              />
              <div
                className="absolute inset-0 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: `${COLOR_ACCENT} transparent transparent transparent` }}
              />
            </div>
            <p
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Loading…
            </p>
          </div>
        )}

        {/* ── Error state ───────────────────────────────────────────────── */}
        {loadPhase === "error" && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
            style={{ background: "#000d14" }}
            role="alert"
          >
            <div className="flex flex-col items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden
              >
                <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <path d="M16 10v7M16 21v1" stroke={COLOR_TEAL} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p
                className="max-w-xs font-sans text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Couldn&apos;t load the frame sequence. Please verify{" "}
                <code
                  className="rounded px-1.5 py-0.5 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: COLOR_SKY,
                  }}
                >
                  /images/hero-sequence/scene#####.webp
                </code>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}