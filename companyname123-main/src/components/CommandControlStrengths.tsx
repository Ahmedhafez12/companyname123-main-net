import React from "react";
import {
  CheckCircle,
  Cpu,
  Lifebuoy,
  Rocket,
  ShieldCheck,
  SquaresFour,
  Timer,
  WifiHigh,
} from "phosphor-react";
import clsx from "clsx";

type PillarKey = "expertise" | "tailored" | "security" | "future" | "endToEnd";

type Pillar = {
  key: PillarKey;
  title: string;
  copy: string;
  Icon: React.ComponentType<{ size?: number; weight?: string; className?: string }>;
};

const PILLARS: Record<PillarKey, Pillar> = {
  expertise: {
    key: "expertise",
    title: "Expertise",
    copy: "",
    Icon: CheckCircle,
  },
  tailored: {
    key: "tailored",
    title: "Tailored Solutions",
    copy: "",
    Icon: SquaresFour,
  },
  security: {
    key: "security",
    title: "Security First",
    copy: "",
    Icon: ShieldCheck,
  },
  future: {
    key: "future",
    title: "Future-Proof",
    copy: "",
    Icon: Timer,
  },
  endToEnd: {
    key: "endToEnd",
    title: "End-to-End",
    copy: "",
    Icon: SquaresFour,
  },
};

export default function CommandControlStrengths() {
  const hero = PILLARS.expertise;
  const grid = [PILLARS.tailored, PILLARS.security, PILLARS.future, PILLARS.endToEnd];

  return (
    <section className="w-full py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10">
          <h2 className="font-sans font-extrabold tracking-[0.18em] text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_2px_12px_rgba(0,94,150,0.25)]">
            Command&ControlCoreStrengths
          </h2>
        </header>

        {/* Top: Expertise hero card */}
        <div className="mb-6 sm:mb-8">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_28px_80px_-36px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.22] via-transparent to-secondary/[0.18]" />

            {/* Stylized world map (decorative) */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.22]"
              viewBox="0 0 1200 420"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cc-map-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#44C8F5" stopOpacity="0.55" />
                  <stop offset="0.5" stopColor="#005E96" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#7CCCBF" stopOpacity="0.55" />
                </linearGradient>
                <filter id="cc-map-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>

              {/* Simplified, abstract "continent" blobs */}
              <g filter="url(#cc-map-soft)" fill="url(#cc-map-grad)">
                <path d="M165 150c60-60 190-72 265-28 70 40 82 112 18 164-58 48-162 70-258 40-96-30-110-116-25-176z" />
                <path d="M540 95c70-48 170-40 230 8 66 54 64 126-8 170-70 42-176 44-240-8-62-50-54-126 18-170z" />
                <path d="M830 165c40-52 134-74 206-42 78 36 98 104 44 156-48 46-132 66-206 40-74-26-88-100-44-154z" />
                <path d="M655 265c34-32 92-44 140-30 54 18 72 58 40 92-30 30-88 44-142 28-54-16-68-58-38-90z" />
              </g>

              {/* Subtle grid */}
              <g opacity="0.22" stroke="#FFFFFF" strokeOpacity="0.35">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v-${i}`} x1={80 + i * 110} y1="40" x2={80 + i * 110} y2="380" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`h-${i}`} x1="40" y1={80 + i * 70} x2="1160" y2={80 + i * 70} />
                ))}
              </g>
            </svg>

            {/* Ping markers (decorative) */}
            <div className="pointer-events-none absolute inset-0">
              {[
                { left: "22%", top: "38%" }, // NA
                { left: "48%", top: "34%" }, // EU
                { left: "70%", top: "48%" }, // ME/AS
                { left: "56%", top: "68%" }, // AF
              ].map((p, idx) => (
                <div key={idx} className="absolute" style={{ left: p.left, top: p.top }}>
                  <span className="absolute inline-flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 animate-ping" />
                  <span className="absolute inline-flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(68,200,245,0.12)]" />
                </div>
              ))}
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-white/5 px-3 py-1">
                    <hero.Icon size={16} weight="bold" className="text-secondary" aria-hidden />
                    <span className="text-[0.75rem] font-semibold tracking-[0.18em] text-white">
                      {hero.title}
                    </span>
                  </div>
                  {hero.copy ? (
                    <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-white/80">
                      {hero.copy}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {grid.map(({ key, title, copy, Icon }) => (
            <div key={key} className="group relative">
              {/* Special gradient glow border for Security First */}
              <div
                className={clsx(
                  "relative overflow-hidden rounded-2xl",
                  key === "security"
                    ? "p-[1px] bg-gradient-to-r from-primary via-primary to-primary shadow-[0_0_0_1px_rgba(0,94,150,0.25),0_0_40px_-12px_rgba(0,94,150,0.65)]"
                    : "p-0"
                )}
              >
                <div
                  className={clsx(
                    "relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-[1.02]",
                    key === "security" ? "border-transparent" : "",
                    "shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] hover:shadow-[0_26px_70px_-38px_rgba(0,0,0,0.45)]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.16] via-transparent to-secondary/[0.12]" />
                  <div className="relative p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                        <Icon size={20} weight="bold" className="text-secondary" aria-hidden />
                      </div>
                    </div>

                    <h3 className="font-sans font-bold tracking-wide text-white text-base sm:text-lg">
                      {title}
                    </h3>
                    {copy ? (
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                        {copy}
                      </p>
                    ) : null}

                    {/* Tailored Solutions: modular 2x2 blocks */}
                    {key === "tailored" ? (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {[
                          { dx: "group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" },
                          { dx: "group-hover:-translate-x-[1px] group-hover:-translate-y-[1px]" },
                          { dx: "group-hover:translate-x-[1px] group-hover:translate-y-[1px]" },
                          { dx: "group-hover:-translate-x-[1px] group-hover:translate-y-[1px]" },
                        ].map((t, i) => (
                          <div
                            key={i}
                            className={clsx(
                              "relative aspect-square rounded-xl border border-white/10 bg-white/[0.04] transition-transform duration-300",
                              t.dx
                            )}
                          >
                            <svg
                              viewBox="0 0 64 64"
                              className="absolute inset-0 h-full w-full p-3"
                              aria-hidden="true"
                            >
                              <defs>
                                <linearGradient id={`cc-block-${i}`} x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0" stopColor="#44C8F5" stopOpacity="0.9" />
                                  <stop offset="1" stopColor="#A6CE39" stopOpacity="0.9" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M20 18h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2z"
                                fill={`url(#cc-block-${i})`}
                                opacity="0.22"
                              />
                              <path
                                d="M32 30l12-12 2 2-12 12-2-2z"
                                fill="#FFFFFF"
                                opacity="0.35"
                              />
                              <path
                                d="M18 40h26a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"
                                fill="#FFFFFF"
                                opacity="0.18"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* Future-Proof: AI/IoT/Edge ticker */}
                    {key === "future" ? (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                        <div className="flex gap-3 px-3 py-2 whitespace-nowrap">
                          <div className="flex gap-3 animate-marquee">
                            {["AI", "IoT", "Edge", "AI", "IoT", "Edge"].map((t, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.75rem] font-semibold tracking-wide text-white/85"
                              >
                                <WifiHigh size={14} weight="bold" className="text-secondary" aria-hidden />
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* End-to-End: micro workflow line */}
                    {key === "endToEnd" ? (
                      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                        <div className="relative flex items-center justify-between gap-3">
                          <svg
                            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 5 H98"
                              stroke="rgba(255,255,255,0.18)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M2 5 H98"
                              stroke="rgba(68,200,245,0.45)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeDasharray="6 10"
                            />
                          </svg>

                          {[
                            { label: "Planning", Icon: SquaresFour },
                            { label: "Deployment", Icon: Rocket },
                            { label: "Monitoring", Icon: Cpu },
                            { label: "Support", Icon: Lifebuoy },
                          ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-1">
                              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                                <step.Icon size={18} weight="bold" className="text-secondary" aria-hidden />
                              </div>
                              <span className="text-[0.7rem] font-semibold tracking-wide text-white/80">
                                {step.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

