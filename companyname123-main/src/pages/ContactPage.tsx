import React, { useEffect, useState, useRef } from "react";
import PageSEO from "../utils/PageSEO";
import { motion } from "framer-motion";
import {
  Envelope,
  Phone,
  MapPin,
  PaperPlaneTilt,
  Shield,
  Clock,
  Headset,
  CheckCircle,
  ArrowRight,
} from "phosphor-react";
import { z } from "zod";
import Footer from "../components/Footer";
import { useTranslation, useLocale } from "../i18n";

/* ─── design tokens (mirrors global) ─── */
const C = {
  primary: "#005E96",
  secondary: "#44C8F5",
  accent: "#7CCCBF",
  cta: "#A6CE39",
  bg: "#002C3D",
} as const;

const FONT = {
  heading: '"Montserrat", system-ui, sans-serif',
  body: '"Rubik", system-ui, sans-serif',
  display: '"Playfair Display", serif',
} as const;

/* ─── form schema ─── */
// SUBJECT_OPTIONS moved into component to use translations

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required"),
});
type FormData = z.infer<typeof formSchema>;

/* ─── animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── component ─── */
function ContactPage() {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitCount, setSubmitCount] = useState(0);
  const lastSubmitTime = useRef<number>(0);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const now = Date.now();
    if (now - lastSubmitTime.current < 3600000 && submitCount >= 5) {
      setErrors({ message: "Too many submissions. Please try again later." });
      setIsSubmitting(false);
      return;
    }

    try {
      formSchema.parse(formData);

      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");

      setSubmitCount((prev) => prev + 1);
      lastSubmitTime.current = Date.now();
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("success");
      statusTimeoutRef.current = setTimeout(
        () => setSubmitStatus("idle"),
        6000,
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0])
            fieldErrors[err.path[0] as keyof FormData] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus("error");
        statusTimeoutRef.current = setTimeout(
          () => setSubmitStatus("idle"),
          6000,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── shared input classes ─── */
  const inputBase = [
    "w-full rounded-xl bg-white/[0.04] border border-white/[0.12]",
    "text-white placeholder-white/30 outline-none",
    "px-4 py-3 text-[0.9375rem]",
    "transition-all duration-300",
    "focus:border-[#7CCCBF]/60 focus:bg-white/[0.06]",
    "focus:shadow-[0_0_0_3px_rgba(124,204,191,0.12),0_8px_32px_rgba(0,94,150,0.15)]",
    "hover:border-white/20 hover:bg-white/[0.05]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

  const contactCards = [
    {
      icon: <Phone weight="duotone" size={24} />,
      label: "Phone",
      value: "+966 11 405 9419",
      href: "tel:+966114059419",
      accent: C.secondary,
    },
    {
      icon: <Envelope weight="duotone" size={24} />,
      label: "Email",
      value: "htc@hajztel.com.sa",
      href: "mailto:htc@hajztel.com.sa",
      accent: C.accent,
    },
    {
      icon: <MapPin weight="duotone" size={24} />,
      label: "Headquarters",
      value: "Riyadh, Saudi Arabia",
      href: undefined,
      accent: C.cta,
    },
  ];

  const promiseBadges = [
    {
      icon: <Clock weight="duotone" size={20} />,
      text: "Response within 24 hours",
    },
    {
      icon: <Headset weight="duotone" size={20} />,
      text: "Dedicated account manager",
    },
    {
      icon: <Shield weight="duotone" size={20} />,
      text: "Confidential & secure",
    },
  ];

  return (
    <div className="relative">
      <PageSEO
        title={t.contactPage.seoTitle}
        description={t.contactPage.seoDescription}
        path={localePath("/contact")}
        breadcrumbs={[
          { name: t.common.home, path: localePath("/") },
          { name: t.contactPage.eyebrow, path: localePath("/contact") },
        ]}
      />

      {/* ━━━ Background layer (scoped to page content, not footer) ━━━ */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, #001a28 0%, ${C.bg} 30%, ${C.primary}18 100%),
              radial-gradient(ellipse 80% 60% at 20% 30%, ${C.primary}30 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 70%, ${C.secondary}12 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 50% 50%, ${C.accent}08 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(9rem, 16vh, 12rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span
              className="h-px w-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${C.accent})`,
              }}
            />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: C.accent, fontFamily: FONT.heading }}
            >
              {t.contactPage.eyebrow}
            </span>
            <span
              className="h-px w-10"
              style={{
                background: `linear-gradient(90deg, ${C.accent}, transparent)`,
              }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-center text-white font-bold"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {t.contactPage.headline}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${C.cta}, ${C.accent}, ${C.secondary})`,
              }}
            >
              {t.contactPage.headlineHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-center max-w-lg mx-auto mt-5"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: FONT.body,
              fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
              lineHeight: 1.7,
            }}
          >
            {t.contactPage.subtitle}
          </motion.p>

          {/* Promise badges */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-9"
          >
            {promiseBadges.map((b, i) => (
              <motion.div
                key={b.text}
                variants={fadeUp}
                custom={i}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <span
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: C.accent }}
                >
                  {b.icon}
                </span>
                <span
                  className="text-white/70 text-xs font-medium"
                  style={{ fontFamily: FONT.body }}
                >
                  {b.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━ MAIN CONTACT AREA ━━━━━━━━━━━━━━━ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(1rem, 2vh, 2rem)",
          paddingBottom: "clamp(5rem, 10vh, 8rem)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-start">
            {/* ─── LEFT: Contact Info ─── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              {/* Info heading */}
              <motion.div variants={fadeUp} className="mb-2">
                <h2
                  className="text-white font-semibold mb-2"
                  style={{
                    fontFamily: FONT.heading,
                    fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Reach us directly
                </h2>
                <p
                  className="text-white/40 leading-relaxed"
                  style={{
                    fontFamily: FONT.body,
                    fontSize: "clamp(0.85rem, 1.25vw, 0.9375rem)",
                  }}
                >
                  Prefer phone or email? Pick the channel that suits you and
                  we'll respond the same business day.
                </p>
              </motion.div>

              {/* Contact cards */}
              {contactCards.map((card) => {
                const cardClass =
                  "group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 transition-all duration-400";
                const cardInteractive =
                  "hover:border-white/[0.15] hover:bg-white/[0.05] hover:shadow-[0_8px_40px_rgba(0,94,150,0.2)]";
                const inner = (
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${card.href ? "transition-transform duration-300 group-hover:scale-110" : ""}`}
                      style={{
                        background: `${card.accent}15`,
                        color: card.accent,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-1.5"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {card.label}
                      </span>
                      <span
                        className={`text-white font-medium ${card.href ? "transition-colors duration-300 group-hover:text-[#7CCCBF]" : ""}`}
                        style={{
                          fontFamily: FONT.body,
                          fontSize: "clamp(0.9rem, 1.3vw, 1.0625rem)",
                        }}
                      >
                        {card.value}
                      </span>
                    </div>
                    {card.href && (
                      <ArrowRight
                        weight="bold"
                        size={16}
                        className={`text-white/20 mt-1 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-1 ${isRTL ? "rtl-flip" : ""}`}
                      />
                    )}
                  </div>
                );
                return (
                  <motion.div key={card.label} variants={fadeUp}>
                    {card.href ? (
                      <a href={card.href} className={`${cardClass} ${cardInteractive}`}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cardClass}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}

              {/* What to expect — trust-builder under the contact cards */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent p-5 sm:p-6 mt-2"
              >
                <span
                  className="block text-white/35 text-[10px] font-semibold uppercase tracking-[0.22em] mb-4"
                  style={{ fontFamily: FONT.heading }}
                >
                  What to expect
                </span>
                <ul className="flex flex-col gap-3">
                  {[
                    "We review your enquiry and assign a specialist within hours.",
                    "You receive a tailored response — not a generic auto-reply.",
                    "Initial scoping call within 1–2 business days, no pressure.",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/65 text-[13px] leading-relaxed"
                      style={{ fontFamily: FONT.body }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold mt-0.5"
                        style={{
                          background: `${C.accent}18`,
                          color: C.accent,
                          border: `1px solid ${C.accent}30`,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* ─── RIGHT: Form ─── */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
                style={{
                  background: `linear-gradient(145deg, rgba(0,94,150,0.18) 0%, rgba(0,44,61,0.35) 50%, rgba(124,204,191,0.06) 100%)`,
                  boxShadow: `
                    0 1px 0 0 rgba(255,255,255,0.05) inset,
                    0 32px 64px -16px rgba(0,0,0,0.35),
                    0 0 80px -20px ${C.primary}25
                  `,
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, ${C.cta} 30%, ${C.accent} 50%, ${C.secondary} 70%, transparent 95%)`,
                  }}
                />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <h3
                      className="text-white font-semibold mb-1.5"
                      style={{
                        fontFamily: FONT.heading,
                        fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.contactPage.formTitle}
                    </h3>
                    <p
                      className="text-white/40"
                      style={{
                        fontFamily: FONT.body,
                        fontSize: "0.8125rem",
                      }}
                    >
                      Tell us about your project — fields marked are required.
                    </p>
                  </div>

                  {/* ─ Success state ─ */}
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                        style={{
                          background: `${C.cta}18`,
                          border: `1px solid ${C.cta}30`,
                        }}
                      >
                        <CheckCircle
                          weight="duotone"
                          size={32}
                          style={{ color: C.cta }}
                        />
                      </div>
                      <h4
                        className="text-white font-semibold text-lg mb-2"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {t.contactPage.successTitle}
                      </h4>
                      <p
                        className="text-white/50 text-sm"
                        style={{ fontFamily: FONT.body }}
                      >
                        {t.contactPage.successMessage}
                      </p>
                    </motion.div>
                  ) : submitStatus === "error" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-5 flex items-center justify-center">
                        <Shield
                          weight="duotone"
                          size={32}
                          className="text-red-400"
                        />
                      </div>
                      <h4
                        className="text-white font-semibold text-lg mb-2"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {t.common.errorTitle}
                      </h4>
                      <p
                        className="text-white/50 text-sm"
                        style={{ fontFamily: FONT.body }}
                      >
                        {t.common.errorMessage}
                      </p>
                    </motion.div>
                  ) : (
                    /* ─ Form ─ */
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="cp-name"
                            className="block mb-2 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                            style={{ fontFamily: FONT.heading }}
                          >
                            {t.contactPage.namePlaceholder}
                          </label>
                          <input
                            type="text"
                            id="cp-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`${inputBase} ${errors.name ? "!border-red-400/60" : ""}`}
                            style={{ fontFamily: FONT.body }}
                          />
                          {errors.name && (
                            <p
                              className="mt-1.5 text-red-400 text-xs"
                              style={{ fontFamily: FONT.body }}
                            >
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="cp-email"
                            className="block mb-2 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                            style={{ fontFamily: FONT.heading }}
                          >
                            {t.contactPage.emailPlaceholder}
                          </label>
                          <input
                            type="email"
                            id="cp-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`${inputBase} ${errors.email ? "!border-red-400/60" : ""}`}
                            style={{ fontFamily: FONT.body }}
                          />
                          {errors.email && (
                            <p
                              className="mt-1.5 text-red-400 text-xs"
                              style={{ fontFamily: FONT.body }}
                            >
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="cp-subject"
                          className="block mb-2 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                          style={{ fontFamily: FONT.heading }}
                        >
                          Subject
                        </label>
                        <div className="relative">
                          <select
                            id="cp-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`${inputBase} pr-12 cursor-pointer ${
                              formData.subject ? "text-white" : "text-white/30"
                            } ${errors.subject ? "!border-red-400/60" : ""}`}
                            style={{
                              fontFamily: FONT.body,
                              appearance: "none",
                              WebkitAppearance: "none",
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%237CCCBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                              backgroundSize: "1.125rem",
                              colorScheme: "dark",
                            }}
                          >
                            {t.contactPage.subjectOptions.map(
                              ({ value, label }) => (
                                <option
                                  key={value || "ph"}
                                  value={value}
                                  className="bg-[#0a2f3d] text-white"
                                >
                                  {label}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                        {errors.subject && (
                          <p
                            className="mt-1.5 text-red-400 text-xs"
                            style={{ fontFamily: FONT.body }}
                          >
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="cp-message"
                          className="block mb-2 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                          style={{ fontFamily: FONT.heading }}
                        >
                          Message
                        </label>
                        <textarea
                          id="cp-message"
                          name="message"
                          placeholder="Tell us about your project or inquiry..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className={`${inputBase} resize-none leading-relaxed ${errors.message ? "!border-red-400/60" : ""}`}
                          style={{ fontFamily: FONT.body }}
                        />
                        {errors.message && (
                          <p
                            className="mt-1.5 text-red-400 text-xs"
                            style={{ fontFamily: FONT.body }}
                          >
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative mt-2 w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(166,206,57,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: `linear-gradient(135deg, ${C.cta}, ${C.accent})`,
                          fontFamily: FONT.heading,
                          fontSize: "0.9375rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2.5">
                          {isSubmitting ? (
                            t.contactPage.sending
                          ) : (
                            <>
                              {t.contactPage.submit}
                              <PaperPlaneTilt
                                weight="bold"
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </>
                          )}
                        </span>
                        {/* Hover shine effect */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                          }}
                        />
                      </button>

                      {/* Privacy note */}
                      <p
                        className="text-white/25 text-center mt-1"
                        style={{
                          fontFamily: FONT.body,
                          fontSize: "0.6875rem",
                        }}
                      >
                        Your information is encrypted and will never be shared
                        with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider between page content and footer */}
      <div
        className="relative w-full h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${C.accent}40, ${C.secondary}50, ${C.accent}40, transparent)`,
        }}
      />

      <Footer />
    </div>
  );
}

export default ContactPage;
