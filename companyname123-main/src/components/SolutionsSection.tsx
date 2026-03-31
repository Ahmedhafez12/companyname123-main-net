import React from "react";
import {
  GlobeHemisphereWest,
  ShieldCheck,
  Cpu,
  SquaresFour,
  RocketLaunch,
  Lifebuoy,
  ClipboardText,
} from "phosphor-react";

type SolutionItem = {
  key: "expertise" | "tailored" | "security" | "future" | "support";
  title: string;
  description: string;
};

const SOLUTIONS: SolutionItem[] = [
  {
    key: "expertise",
    title: "🛠 Expertise & Experience",
    description:
      "At htc we Have a Team world class Engineers who have consult and deployed command center across the Globe",
  },
  {
    key: "tailored",
    title: "🧠 Tailored Solutions",
    description:
      "Our Solutions/design are 100 % tailor made for Each Requirement; we don’t sell what we have but its customer requirement only",
  },
  {
    key: "security",
    title: "🔒 Security First",
    description:
      "Our prime focus during designing solution is, to secure our customer control room and premises and sites by the use of Technologies",
  },
  {
    key: "future",
    title: "🚀 Future-Proof Architecture",
    description:
      "Our scalable solutions grow with your business and support emerging technologies like AI and IoT.and can be Scalable for future",
  },
  {
    key: "support",
    title: "🤝 End-to-End Support",
    description:
      "From initial planning to post-deployment support, we’re with you every step of the way.",
  },
];

export default function SolutionsSection() {
  const [trustBanner, ...gridItems] = SOLUTIONS;

  return (
    <section className="relative w-full overflow-hidden bg-slate-50">
      <style>
        {`
          @keyframes ss-ping {
            0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.55; }
            70% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
          }
          @keyframes ss-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
        `}
      </style>

      {/* Subtle tech grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Trust Banner (full-width) */}
        <div className="group w-full overflow-hidden rounded-2xl border border-primary/20 shadow-[0_22px_70px_-44px_rgba(0,0,0,0.35)]">
          {/* Placeholder background image layer */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-background/60 to-primary/70" aria-hidden="true" />
            <div className="absolute inset-0 opacity-30" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, rgba(68,200,245,0.35), transparent 55%), radial-gradient(circle at 80% 40%, rgba(124,204,191,0.28), transparent 55%)" }} />
            <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

            {/* Stylized world map + pings */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
              viewBox="0 0 1200 420"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ss-map-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#44C8F5" stopOpacity="0.75" />
                  <stop offset="0.55" stopColor="#005E96" stopOpacity="0.75" />
                  <stop offset="1" stopColor="#7CCCBF" stopOpacity="0.75" />
                </linearGradient>
                <filter id="ss-map-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>
              <g filter="url(#ss-map-soft)" fill="url(#ss-map-grad)">
                <path d="M165 150c60-60 190-72 265-28 70 40 82 112 18 164-58 48-162 70-258 40-96-30-110-116-25-176z" />
                <path d="M540 95c70-48 170-40 230 8 66 54 64 126-8 170-70 42-176 44-240-8-62-50-54-126 18-170z" />
                <path d="M830 165c40-52 134-74 206-42 78 36 98 104 44 156-48 46-132 66-206 40-74-26-88-100-44-154z" />
                <path d="M655 265c34-32 92-44 140-30 54 18 72 58 40 92-30 30-88 44-142 28-54-16-68-58-38-90z" />
              </g>
              <g opacity="0.25" stroke="#FFFFFF" strokeOpacity="0.35">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v-${i}`} x1={80 + i * 110} y1="40" x2={80 + i * 110} y2="380" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`h-${i}`} x1="40" y1={80 + i * 70} x2="1160" y2={80 + i * 70} />
                ))}
              </g>
            </svg>

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {[
                { left: "23%", top: "40%" }, // NYC-ish
                { left: "46%", top: "34%" }, // London-ish
                { left: "64%", top: "44%" }, // Dubai-ish
                { left: "78%", top: "46%" }, // Singapore-ish
              ].map((p, idx) => (
                <div key={idx} className="absolute" style={{ left: p.left, top: p.top }}>
                  <span
                    className="absolute h-10 w-10 rounded-full"
                    style={{
                      background: "rgba(68,200,245,0.18)",
                      animation: `ss-ping 1.9s ${idx * 0.25}s infinite`,
                    }}
                  />
                  <span
                    className="absolute h-2.5 w-2.5 rounded-full"
                    style={{
                      background: "#44C8F5",
                      boxShadow: "0 0 0 6px rgba(68,200,245,0.12)",
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center">
                    <div className="absolute -inset-6 rounded-full bg-secondary/10 blur-2xl opacity-70" />
                    <GlobeHemisphereWest
                      size={28}
                      weight="bold"
                      className="relative text-white transition-transform duration-300 group-hover:scale-110"
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.18em] text-white">
                      Global Reach
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold tracking-wide text-white text-xl sm:text-2xl">
                    {trustBanner.title}
                  </h3>
                  <p className="mt-2 font-body text-white/85 text-base sm:text-lg leading-relaxed">
                    {trustBanner.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid (remaining 4) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gridItems.map((item) => (
            <div key={item.key} className="group relative">
              {/* Hover glow border wrapper */}
              <div className="rounded-2xl p-[1px] bg-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-secondary group-hover:to-accent">
                <div
                  className={[
                    "rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md",
                    "shadow-[0_18px_55px_-42px_rgba(0,0,0,0.25)]",
                    "transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_-46px_rgba(0,0,0,0.32)]",
                    item.key === "security"
                      ? "ring-1 ring-cta/35 shadow-[0_18px_60px_-44px_rgba(166,206,57,0.35)]"
                      : "",
                  ].join(" ")}
                >
                  <div className="p-5 sm:p-6">
                    {/* Icon baseline (phosphor) in styled container */}
                    <div className="mb-4">
                      <div
                        className={[
                          "relative h-11 w-11 rounded-full border border-white/15 bg-white/10",
                          "flex items-center justify-center",
                          item.key === "security" ? "shadow-[0_0_0_8px_rgba(166,206,57,0.12)]" : "shadow-[0_0_0_8px_rgba(0,94,150,0.08)]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "absolute -inset-6 rounded-full blur-2xl opacity-70",
                            item.key === "security" ? "bg-cta/15" : "bg-secondary/10",
                          ].join(" ")}
                        />
                        {item.key === "tailored" ? (
                          <SquaresFour
                            size={20}
                            weight="bold"
                            className="relative text-primary transition-transform duration-300 group-hover:scale-110"
                            aria-hidden
                          />
                        ) : item.key === "security" ? (
                          <ShieldCheck
                            size={20}
                            weight="bold"
                            className="relative text-primary transition-transform duration-300 group-hover:scale-110"
                            aria-hidden
                          />
                        ) : item.key === "future" ? (
                          <Cpu
                            size={20}
                            weight="bold"
                            className="relative text-primary transition-transform duration-300 group-hover:scale-110"
                            aria-hidden
                          />
                        ) : (
                          <Lifebuoy
                            size={20}
                            weight="bold"
                            className="relative text-primary transition-transform duration-300 group-hover:scale-110"
                            aria-hidden
                          />
                        )}
                      </div>
                    </div>

                    <h4 className="font-sans font-bold tracking-wide text-primary text-base sm:text-lg">
                      {item.title}
                    </h4>
                    <p className="mt-2 font-body text-primary/75 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* Future-Proof: AI/IoT tag cloud */}
                    {item.key === "future" ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["AI", "IoT", "Edge", "Cloud"].map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-primary/15 bg-white/30 px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide text-primary/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* End-to-End: process line with micro-icons */}
                    {item.key === "support" ? (
                      <div className="mt-4 rounded-xl border border-white/15 bg-white/10 px-3 py-3">
                        <div className="relative flex items-center justify-between gap-2">
                          <svg
                            className="pointer-events-none absolute left-2 right-2 top-1/2 -translate-y-1/2"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 5 H98"
                              stroke="rgba(0,94,150,0.22)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M2 5 H98"
                              stroke="rgba(68,200,245,0.55)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeDasharray="6 10"
                            />
                          </svg>

                          {[
                            { label: "Planning", Icon: ClipboardText },
                            { label: "Deployment", Icon: SquaresFour },
                            { label: "Launch", Icon: RocketLaunch },
                            { label: "Support", Icon: Lifebuoy },
                          ].map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center gap-1">
                              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                                <step.Icon
                                  size={18}
                                  weight="bold"
                                  className="text-primary transition-transform duration-300 group-hover:scale-110"
                                  aria-hidden
                                />
                              </div>
                              <span className="text-[0.68rem] font-semibold tracking-wide text-primary/70">
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

