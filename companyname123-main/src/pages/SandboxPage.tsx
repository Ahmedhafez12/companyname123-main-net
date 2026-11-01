import React, { useState, useEffect, useMemo } from "react";
import { MOCK_CHANNELS, Channel } from "../sandboxData";

// ==========================================
// 1. ISOLATED SUBCOMPONENTS (Preventing global stutter)
// ==========================================

/**
 * CircularTelemetry manages its own internal 2s timer.
 * Changes to CPU or RAM metrics only force this visual loop to redraw,
 * leaving parent inputs and open menus completely unaffected.
 */
const CircularTelemetry: React.FC = () => {
  const [metrics, setMetrics] = useState({ cpu: 42, ram: 68 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * (85 - 30 + 1)) + 30,
        ram: Math.floor(Math.random() * (90 - 50 + 1)) + 50,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset = 251.2 - (251.2 * metrics.cpu) / 100;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="72"
            cy="72"
            r="40"
            className="stroke-slate-100 fill-none dark:stroke-slate-800"
            strokeWidth="8"
          />
          <circle
            cx="72"
            cy="72"
            r="40"
            className="stroke-blue-500 fill-none transition-all duration-500 ease-out"
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {metrics.cpu}%
          </span>
          <span className="text-xs text-slate-400 font-medium">CPU Load</span>
        </div>
      </div>
      <div className="w-full text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Memory Allocation
        </p>
        <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1">
          {metrics.ram}% Active
        </p>
      </div>
    </div>
  );
};

/**
 * TransceiverTelemetry handles isolated channel metrics, status updates,
 * and active signal simulation.
 */
const TransceiverTelemetry: React.FC<{ direction: "ltr" | "rtl" }> = ({
  direction,
}) => {
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const isRtl = direction === "rtl";

  useEffect(() => {
    const interval = setInterval(() => {
      setChannels((prev) =>
        prev.map((ch: Channel) => {
          if (ch.status === "active") {
            const variance = Math.floor(Math.random() * 21) - 10; // +/- 10%
            const nextLoad = Math.max(5, Math.min(100, ch.load + variance));
            return { ...ch, load: nextLoad };
          }
          return ch;
        }),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {isRtl ? "حالة قنوات الإرسال" : "Transceiver Channels"}
        </h4>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {isRtl ? "متصل" : "Live"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {channels.map((ch) => (
          <div key={ch.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {ch.name}
              </span>
              <span className="text-slate-400">{ch.frequency}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  ch.status === "active"
                    ? "bg-blue-500"
                    : ch.status === "standby"
                      ? "bg-slate-400"
                      : "bg-rose-500"
                }`}
                style={{ width: `${ch.status === "fault" ? 100 : ch.load}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * FilteredDataTable - Now keeps cursor selection focus perfectly intact
 * when parent elements or telemetry metrics update!
 */
const FilteredDataTable: React.FC<{ direction: "ltr" | "rtl" }> = ({
  direction,
}) => {
  const [filterText, setFilterText] = useState("");
  const isRtl = direction === "rtl";

  const filtered = useMemo<Channel[]>(() => {
    return MOCK_CHANNELS.filter(
      (ch: Channel) =>
        ch.name.toLowerCase().includes(filterText.toLowerCase()) ||
        ch.frequency.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [filterText]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <input
          type="text"
          placeholder={isRtl ? "ابحث عن القنوات..." : "Search channels..."}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-400 dark:border-slate-800 dark:bg-slate-950">
            <tr>
              <th className={`px-4 py-2 ${isRtl ? "text-right" : "text-left"}`}>
                {isRtl ? "الاسم" : "Name"}
              </th>
              <th className={`px-4 py-2 ${isRtl ? "text-right" : "text-left"}`}>
                {isRtl ? "التردد" : "Frequency"}
              </th>
              <th className={`px-4 py-2 ${isRtl ? "text-right" : "text-left"}`}>
                {isRtl ? "التحميل" : "Load"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((ch) => (
              <tr
                key={ch.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20"
              >
                <td className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-200">
                  {ch.name}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">
                  {ch.frequency}
                </td>
                <td className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">
                  {ch.load}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN SANDBOX PAGE
// ==========================================
export const SandboxPage: React.FC = () => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [bgStyle, setBgStyle] = useState<"grid" | "solid">("grid");

  // Unified registry schema
  const componentGroups = useMemo(
    () => [
      {
        id: "telemetry",
        category:
          direction === "rtl"
            ? "أجهزة قياس البيانات والاتصالات"
            : "Telemetry & Live Metrics",
        components: [
          {
            id: "radial-telemetry",
            title:
              direction === "rtl"
                ? "مؤشر أداء المعالجة (منفصل)"
                : "Dynamic CPU Tracker (Isolated)",
            render: () => <CircularTelemetry />,
          },
          {
            id: "transceiver-channels",
            title:
              direction === "rtl"
                ? "قنوات الاتصال المباشرة"
                : "Transceiver Status Feed",
            render: ({ direction }: { direction: "ltr" | "rtl" }) => (
              <TransceiverTelemetry direction={direction} />
            ),
          },
        ],
      },
      {
        id: "interactive",
        category:
          direction === "rtl" ? "المكونات التفاعلية" : "Interactive Components",
        components: [
          {
            id: "filtered-table",
            title:
              direction === "rtl"
                ? "جدول القنوات القابل للتصفية"
                : "Live-Filterable Data Table",
            render: ({ direction }: { direction: "ltr" | "rtl" }) => (
              <FilteredDataTable direction={direction} />
            ),
          },
        ],
      },
    ],
    [direction],
  );

  return (
    <div
      dir={direction}
      className={`min-h-screen transition-colors duration-200 ${
        theme === "dark"
          ? "dark bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background Layer */}
      {bgStyle === "grid" && (
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      )}

      {/* Control Panel Header */}
      <header className="relative z-10 border-b border-slate-200 bg-white/80 py-4 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Component Sandbox
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {direction === "rtl"
                ? "بيئة معزولة لتجربة وتطوير واجهات المستخدم ثنائية اللغة."
                : "Isolated testing harness for multi-directional web components."}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3">
            {/* Direction Toggle */}
            <button
              onClick={() => setDirection((d) => (d === "ltr" ? "rtl" : "ltr"))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              {direction === "ltr" ? "LTR ➔ RTL" : "RTL ➔ LTR"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            {/* Background Toggle */}
            <button
              onClick={() =>
                setBgStyle((b) => (b === "grid" ? "solid" : "grid"))
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              {bgStyle === "grid" ? "Plain Canvas" : "Grid Canvas"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Sandbox Grid */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-10">
          {componentGroups.map((group) => (
            <section key={group.id} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold tracking-tight text-slate-400 uppercase">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.components.map((comp) => (
                  <div key={comp.id} className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                      {comp.title}
                    </h3>
                    {comp.render({ direction })}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};
export default SandboxPage;
