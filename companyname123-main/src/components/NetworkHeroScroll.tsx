import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRAND_PRIMARY = "#005E96";

export type NetworkHeroScrollProps = {
  /** When the page scrolls inside a nested element (e.g. snap container), pass its ref so pinning/scrub use the correct scroller. */
  scrollScrollerRef?: RefObject<HTMLElement | null>;
};

/**
 * Full-viewport hero: video `currentTime` is driven by scroll progress while the section is pinned (GSAP ScrollTrigger).
 */
export default function NetworkHeroScroll({
  scrollScrollerRef,
}: NetworkHeroScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const scroller = scrollScrollerRef?.current ?? undefined;

    const updateVideoTime = (progress: number) => {
      const dur = video.duration;
      if (!dur || !Number.isFinite(dur) || dur <= 0) return;
      const t = progress * dur;
      if (Number.isFinite(t)) {
        try {
          video.currentTime = t;
        } catch {
          /* seek can throw if not ready */
        }
      }
    };

    const stConfig: ScrollTrigger.Vars = {
      trigger: section,
      start: "top top",
      end: "+=250%",
      pin: true,
      scrub: 0.45,
      onUpdate: (self) => updateVideoTime(self.progress),
    };
    if (scroller) {
      stConfig.scroller = scroller;
    }
    const scrollTrigger = ScrollTrigger.create(stConfig);

    const onLoadedMetadata = () => {
      updateVideoTime(scrollTrigger.progress);
      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateVideoTime(scrollTrigger.progress);
    });

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      scrollTrigger.kill();
    };
  }, [scrollScrollerRef]);

  return (
    <section
      id="network-hero-scroll"
      ref={sectionRef}
      className="relative h-screen min-h-[100dvh] w-full shrink-0 overflow-hidden bg-[#002C3D]"
      aria-label="Network hero"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/network-scroll.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-black/45"
        aria-hidden
      />
      <div className="relative z-[2] flex h-full w-full items-center justify-center px-6 sm:px-10">
        <div className="max-w-3xl border-l-4 pl-6 text-left sm:pl-8" style={{ borderColor: BRAND_PRIMARY }}>
          <h1
            className="font-semibold leading-tight tracking-tight"
            style={{
              fontFamily: '"Rubik", system-ui, sans-serif',
              fontSize: "clamp(2rem, 5vw + 0.75rem, 3.75rem)",
              color: BRAND_PRIMARY,
              textShadow: "0 2px 28px rgba(0, 0, 0, 0.75)",
            }}
          >
            The Future of Connectivity
          </h1>
          <p
            className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg"
            style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
          >
            Building the backbone of modern networks.
          </p>
        </div>
      </div>
    </section>
  );
}
