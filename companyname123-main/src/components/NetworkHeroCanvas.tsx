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

const COLOR_ACCENT = "#A6CE39";
const COLOR_TEAL = "#7CCCBF";
const COLOR_SKY = "#44C8F5";
const COLOR_NAVY = "#005E96";

// ─── Sequence config ─────────────────────────────────────────────────────────

const FRAME_COUNT = 100;
const MIN_LOADED_COUNT = Math.ceil(FRAME_COUNT * 0.2);
const SEQUENCE_BASE = "/images/hero-sequence";
const SOURCE_CROP_BOTTOM_PX = 50;

// ─── Scroll-animation config ─────────────────────────────────────────────────

const HERO_TITLE_MOTION_END = 0.28;
const HERO_TITLE_SCALE_MAX = 1.1;
const HERO_COPY_Y_MAX = 90;
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
    src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Hewlett_Packard_Enterprise_logo.svg",
  },
  {
    name: "Microsoft",
    src: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
  },
  {
    name: "IBM",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  { name: "Oracle", src: "/assets/oracle-logo.svg" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function frameUrl(index1Based: number): string {
  return `${SEQUENCE_BASE}/scene${String(index1Based).padStart(5, "0")}.webp`;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
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
    img.onload = () => {
      // Decode off main-thread when supported, then resolve
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

// Run async tasks with a concurrency cap so we don't saturate the network
async function runConcurrent<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<void> {
  let cursor = 0;
  const workers = new Array(Math.min(limit, tasks.length))
    .fill(0)
    .map(async () => {
      while (cursor < tasks.length) {
        const idx = cursor++;
        try {
          await tasks[idx]();
        } catch {
          /* swallow per-task errors; caller handles via onSettled */
        }
      }
    });
  await Promise.all(workers);
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

export default function NetworkHeroCanvas({
  scrollScrollerRef,
}: NetworkHeroCanvasProps) {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasShellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroHeadlinesRef = useRef<HTMLDivElement>(null);
  const trustedBannerRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | undefined)[]>(
    new Array<HTMLImageElement | undefined>(FRAME_COUNT).fill(undefined),
  );
  const loadCountRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const canPaintRef = useRef(false);

  // Cached canvas dimensions — only recomputed on resize, not per paint
  const canvasDimsRef = useRef<{ w: number; h: number; dpr: number } | null>(null);
  // Pending frame for RAF coalescing
  const pendingFrameRef = useRef<number>(-1);
  const rafScheduledRef = useRef<boolean>(false);

  // ── State ─────────────────────────────────────────────────────────────────
  const [loadPhase, setLoadPhase] = useState<"boot" | "interactive" | "error">(
    "boot",
  );

  // ── Helpers ───────────────────────────────────────────────────────────────

  const clearHeroCopyTransforms = useCallback(() => {
    if (heroHeadlinesRef.current)
      gsap.set(heroHeadlinesRef.current, { clearProps: "transform" });
    if (trustedBannerRef.current)
      gsap.set(trustedBannerRef.current, { clearProps: "transform" });
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

  // Recalculate canvas size (only on resize, NOT per paint)
  const syncCanvasSize = useCallback((): { w: number; h: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
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
      // setTransform must be reapplied after canvas resize
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    canvasDimsRef.current = { w, h, dpr };
    return { w, h };
  }, [measureViewport]);

  // Get cached dims + ctx for a paint — no layout reads
  const getPaintContext = useCallback((): {
    ctx: CanvasRenderingContext2D;
    w: number;
    h: number;
  } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return null;
    const dims = canvasDimsRef.current;
    if (!dims) return null;
    return { ctx, w: dims.w, h: dims.h };
  }, []);

  const findDrawableFrame = useCallback((idx: number) => {
    const arr = imagesRef.current;
    const ready = (im?: HTMLImageElement) => im?.complete && im.naturalWidth;
    if (ready(arr[idx])) return arr[idx]!;
    for (let j = idx; j >= 0; j--) if (ready(arr[j])) return arr[j]!;
    for (let j = idx + 1; j < FRAME_COUNT; j++)
      if (ready(arr[j])) return arr[j]!;
    return null;
  }, []);

  const paintFrameNow = useCallback(
    (index0Based: number) => {
      if (!canPaintRef.current) return;
      const prepared = getPaintContext();
      if (!prepared) return;
      const { ctx, w, h } = prepared;
      const img = findDrawableFrame(index0Based);
      ctx.fillStyle = "#000d14";
      ctx.fillRect(0, 0, w, h);
      if (img) drawImageCover(ctx, img, w, h);
    },
    [getPaintContext, findDrawableFrame],
  );

  // RAF-coalesced paint: multiple scroll updates within one frame collapse to a single paint
  const schedulePaint = useCallback(
    (index0Based: number) => {
      pendingFrameRef.current = index0Based;
      if (rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      requestAnimationFrame(() => {
        rafScheduledRef.current = false;
        const idx = pendingFrameRef.current;
        if (idx >= 0) paintFrameNow(idx);
      });
    },
    [paintFrameNow],
  );

  const resizeAndRedraw = useCallback(() => {
    syncCanvasSize();
    paintFrameNow(Math.min(Math.max(lastFrameRef.current, 0), FRAME_COUNT - 1));
  }, [syncCanvasSize, paintFrameNow]);

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
      const index0 = Math.min(
        FRAME_COUNT - 1,
        Math.round(p * (FRAME_COUNT - 1)),
      );
      applyHeroCopyScroll(p);
      if (index0 !== lastFrameRef.current) {
        lastFrameRef.current = index0;
        schedulePaint(index0);
      }
    },
    [schedulePaint, applyHeroCopyScroll],
  );

  // ── Load frames ───────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    let cancelled = false;
    const slots = new Array<HTMLImageElement | undefined>(FRAME_COUNT).fill(
      undefined,
    );
    imagesRef.current = slots;
    loadCountRef.current = 0;
    canPaintRef.current = false;
    setLoadPhase("boot");

    // Tiny offscreen canvas to pre-warm GPU textures as each frame loads.
    // Drawing to this 1x1 canvas forces the browser to upload the bitmap
    // as a GPU texture, so the real canvas paint later is instant.
    const warmCanvas = document.createElement("canvas");
    warmCanvas.width = 1;
    warmCanvas.height = 1;
    const warmCtx = warmCanvas.getContext("2d", { alpha: false });

    const onOneLoaded = (img: HTMLImageElement) => {
      if (cancelled) return;
      loadCountRef.current += 1;

      // Pre-warm the GPU texture by drawing this image to a 1x1 canvas.
      // The first real paint of this frame becomes near-instant.
      if (warmCtx) {
        try { warmCtx.drawImage(img, 0, 0, 1, 1); } catch { /* ignore */ }
      }

      // Fire ONCE when crossing the threshold — not on every subsequent frame.
      if (loadCountRef.current === MIN_LOADED_COUNT) {
        canPaintRef.current = true;
        setLoadPhase((prev) => (prev === "error" ? prev : "interactive"));
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    let settled = 0;
    const bumpSettled = () => {
      settled += 1;
      if (cancelled) return;
      if (settled >= FRAME_COUNT && loadCountRef.current < MIN_LOADED_COUNT)
        setLoadPhase("error");
      if (settled === FRAME_COUNT)
        requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // Cap concurrent requests so the browser doesn't queue/throttle
    const tasks = Array.from({ length: FRAME_COUNT }, (_, i) => async () => {
      try {
        const img = await loadImage(frameUrl(i + 1));
        if (!cancelled) {
          slots[i] = img;
          onOneLoaded(img);
        }
      } finally {
        bumpSettled();
      }
    });
    runConcurrent(tasks, 8);

    return () => {
      cancelled = true;
      canPaintRef.current = false;
      imagesRef.current = new Array<HTMLImageElement | undefined>(
        FRAME_COUNT,
      ).fill(undefined);
    };
  }, []);

  // ── Scroll trigger ────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    if (loadPhase !== "interactive") return;
    const track = trackRef.current;
    if (!track) return;
    const scroller = scrollScrollerRef?.current ?? undefined;

    // Sync canvas dimensions once at mount so paints have valid cached dims
    syncCanvasSize();

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
      // scrub: true (instant) keeps the canvas frame perfectly synced with
      // scroll position. scrub: 1 introduced a 1s smoothing tail that made
      // the canvas feel laggy on first scroll.
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => drawFrame(self.progress),
      onToggle: (self) => toggleSnap(self.isActive),
      onRefresh: () => {
        clearHeroCopyTransforms();
        syncCanvasSize();
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

    // Debounced resize — mobile browsers fire many resize events as the
    // address bar shows/hides; refreshing ScrollTrigger on each is expensive.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        clearHeroCopyTransforms();
        resizeAndRedraw();
        drawFrame(st.progress);
      }, 120);
    };
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      drawFrame(st.progress);
    });

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      st.kill();
      scroller?.classList.remove("network-hero-snap-off");
      clearHeroCopyTransforms();
    };
  }, [
    loadPhase,
    scrollScrollerRef,
    drawFrame,
    resizeAndRedraw,
    clearHeroCopyTransforms,
    syncCanvasSize,
  ]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section
      id="network-hero-scroll"
      ref={trackRef as React.RefObject<HTMLElement>}
      className="network-hero-canvas-section relative h-[400vh] w-full shrink-0"
      style={{ background: "#000d14" }}
      aria-label="Network hero sequence"
    >
      {/* ── Sticky viewport ────────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[min(100dvh,100svh)] min-h-[100dvh] w-full overflow-hidden"
        style={{ background: "#000d14" }}
      >
        {/* ── Canvas + overlay stack ──────────────────────────────────────── */}
        <div
          ref={canvasShellRef}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />

          {/* Base colour-tint overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(0,44,61,0.45)" }}
            aria-hidden
          />

          {/* Bottom-up vignette — deeper & taller for more contrast under copy */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,13,20,0.90) 0%, rgba(0,13,20,0.55) 28%, transparent 55%)",
            }}
            aria-hidden
          />

          {/* Top-down vignette — keeps nav area dark enough */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,13,20,0.60) 0%, transparent 22%)",
            }}
            aria-hidden
          />

          {/* Radial centre glow — softens the hard frame edges */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 40%, rgba(0,13,20,0.35) 100%)",
            }}
            aria-hidden
          />
        </div>

        {/* ── Hero copy layer ─────────────────────────────────────────────── */}
        <div
          className="pointer-events-none relative flex h-full w-full flex-col"
          style={{ zIndex: 10 }}
        >
          <div
            className={`
              pointer-events-none absolute inset-0
              flex flex-col items-center justify-center
              gap-14 px-5
              sm:gap-18 sm:px-8
              md:gap-20
              ${NAV_CLEARANCE}
            `}
          >
            {/* ── Headline stack ────────────────────────────────────────── */}
            <div
              ref={heroHeadlinesRef}
              className="flex w-full max-w-[min(88vw,58rem)] flex-col items-center gap-0 will-change-transform"
            >
              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(to right, transparent, ${COLOR_ACCENT})`,
                  }}
                />
                <p
                  className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.7rem]"
                  style={{
                    color: COLOR_ACCENT,
                    textShadow: "0 1px 14px rgba(0,18,28,0.6)",
                  }}
                >
                  Real Transformation
                </p>
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(to left, transparent, ${COLOR_ACCENT})`,
                  }}
                />
              </div>

              {/* Primary headline */}
              <h1
                className="w-full text-center font-sans font-black leading-[1.0] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(2.4rem,7vw,5.25rem)",
                  color: "#ffffff",
                  textShadow: "0 2px 32px rgba(0,13,20,0.6)",
                }}
              >
                Simple. <span style={{ color: COLOR_ACCENT }}>Fast.</span>{" "}
                Secure.
              </h1>

              {/* Secondary headline */}
              <h2
                className="mt-4 w-full text-center font-sans font-semibold leading-[1.15] tracking-[-0.015em]"
                style={{
                  fontSize: "clamp(1.5rem,4.4vw,3rem)",
                  color: COLOR_TEAL,
                  textShadow: "0 1px 24px rgba(0,20,30,0.65)",
                }}
              >
                Networks You Can Trust.
              </h2>

              {/* Body copy */}
              <p
                className="mt-5 max-w-[36rem] text-center font-sans font-normal leading-relaxed"
                style={{
                  fontSize: "clamp(0.9rem,1.9vw,1.1rem)",
                  color: "rgba(255,255,255,0.72)",
                  textShadow: "0 1px 18px rgba(0,18,28,0.55)",
                }}
              >
                We provide high-performance, ultra-secure infrastructure for the
                world’s most important companies.
              </p>

              {/* CTA row */}
              <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
                {/* Primary CTA */}
                <a
                  href="/contact"
                  className="
                    inline-flex items-center gap-2.5
                    rounded-full px-7 py-3
                    text-sm font-semibold tracking-wide
                    transition-all duration-200
                    hover:scale-[1.04] active:scale-[0.97]
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  "
                  style={{
                    background: COLOR_ACCENT,
                    color: "#000000",
                    boxShadow: `0 0 24px rgba(166,206,57,0.35), 0 2px 8px rgba(0,0,0,0.4)`,
                    outlineColor: COLOR_ACCENT,
                  }}
                >
                  Get Started
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                {/* Secondary CTA */}
                <a
                  href="/what-we-do/telecommunications"
                  className="
                    inline-flex items-center gap-2.5
                    rounded-full px-7 py-3
                    text-sm font-semibold tracking-wide
                    transition-all duration-200
                    hover:bg-white/10 active:scale-[0.97]
                  "
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  View Solutions
                </a>
              </div>
            </div>

            {/* ── Trusted By strip ──────────────────────────────────────── */}
            <div
              ref={trustedBannerRef}
              className="flex w-full max-w-3xl flex-col items-center gap-5 will-change-transform"
            >
              {/* Label with flanking lines */}
              <div className="flex w-full max-w-xs items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.14))",
                  }}
                />
                <p
                  className="whitespace-nowrap font-mono text-[0.6rem] font-semibold uppercase tracking-[0.24em] sm:text-[0.65rem]"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    textShadow: "0 1px 10px rgba(0,18,28,0.4)",
                  }}
                >
                  Trusted By
                </p>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(255,255,255,0.14))",
                  }}
                />
              </div>

              {/* Logo row */}
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
                        opacity-35 transition-all duration-300
                        hover:opacity-75 hover:scale-105
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

        {/* ── Boot / loading state ────────────────────────────────────────── */}
        {loadPhase === "boot" && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6"
            style={{ background: "#000d14" }}
            aria-live="polite"
            aria-busy
          >
            {/* Progress ring */}
            <div className="relative h-11 w-11" aria-hidden>
              {/* Track */}
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              />
              {/* Spinner */}
              <div
                className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
                style={{ borderTopColor: COLOR_ACCENT }}
              />
              {/* Inner dot */}
              <div
                className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full"
                style={{ background: COLOR_ACCENT, opacity: 0.7 }}
              />
            </div>

            {/* Label */}
            <p
              className="font-mono text-[0.65rem] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Initialising
            </p>
          </div>
        )}

        {/* ── Error state ─────────────────────────────────────────────────── */}
        {loadPhase === "error" && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
            style={{ background: "#000d14" }}
            role="alert"
          >
            <div className="flex flex-col items-center gap-4 max-w-xs">
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M16 10v7M16 21v1"
                    stroke={COLOR_TEAL}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Message */}
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Couldn&apos;t load the frame sequence. Please verify{" "}
                <code
                  className="mt-1 block rounded-md px-2.5 py-1.5 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: COLOR_SKY,
                    border: "1px solid rgba(255,255,255,0.08)",
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
