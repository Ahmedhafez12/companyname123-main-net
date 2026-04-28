import React, { useState, useRef, useEffect } from "react";
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
import emailjs from "@emailjs/browser";
import { useTranslation, useLocale } from "../i18n";

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
} as const;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required"),
});
type FormData = z.infer<typeof formSchema>;

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

interface ContactContentProps {
  compact?: boolean;
}

const ContactContent: React.FC<ContactContentProps> = ({ compact = false }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();

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

      if (formRef.current) {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        );
      }

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

  const inputBase = [
    "w-full rounded-xl bg-white/[0.04] border border-white/[0.12]",
    "text-white placeholder-white/30 outline-none",
    "transition-all duration-300",
    "focus:border-[#7CCCBF]/60 focus:bg-white/[0.06]",
    "focus:shadow-[0_0_0_3px_rgba(124,204,191,0.12),0_8px_32px_rgba(0,94,150,0.15)]",
    "hover:border-white/20 hover:bg-white/[0.05]",
  ].join(" ");

  const contactCards = [
    {
      icon: <Phone weight="duotone" size={compact ? 20 : 24} />,
      label: t.contactPage.infoCards[1].title,
      value: t.contactPage.infoCards[1].text,
      href: "tel:+966114059419",
      accent: C.secondary,
    },
    {
      icon: <Envelope weight="duotone" size={compact ? 20 : 24} />,
      label: t.contactPage.infoCards[0].title,
      value: t.contactPage.infoCards[0].text,
      href: "mailto:htc@hajztel.com.sa",
      accent: C.accent,
    },
    {
      icon: <MapPin weight="duotone" size={compact ? 20 : 24} />,
      label: t.contactPage.infoCards[2].title,
      value: t.contactPage.infoCards[2].text,
      href: undefined,
      accent: C.cta,
    },
  ];

  return (
    <div
      className={`w-full ${compact ? "max-w-6xl" : "max-w-6xl"} mx-auto px-4 sm:px-6 xl:px-8`}
    >
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={0}
        className={`text-center ${compact ? "mb-8" : "mb-10"}`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
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
        </div>
        <h2
          className="text-white font-bold"
          style={{
            fontFamily: FONT.heading,
            fontSize: compact
              ? "clamp(1.5rem, 4vw, 2.25rem)"
              : "clamp(2rem, 5vw, 3rem)",
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
        </h2>
        <p
          className="max-w-lg mx-auto mt-3"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: FONT.body,
            fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
            lineHeight: 1.7,
          }}
        >
          {t.contactPage.subtitle}
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-10 items-start">
        {/* Left: Contact Info */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {contactCards.map((card) => (
            <motion.div key={card.label} variants={fadeUp}>
              {card.href ? (
                <a
                  href={card.href}
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 transition-all duration-400 hover:border-white/[0.15] hover:bg-white/[0.05] hover:shadow-[0_8px_40px_rgba(0,94,150,0.2)]"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${card.accent}15`,
                        color: card.accent,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-1"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {card.label}
                      </span>
                      <span
                        className="text-white font-medium transition-colors duration-300 group-hover:text-[#7CCCBF]"
                        style={{
                          fontFamily: FONT.body,
                          fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                        }}
                      >
                        {card.value}
                      </span>
                    </div>
                    <ArrowRight
                      weight="bold"
                      size={14}
                      className={`text-white/20 mt-1 transition-all duration-300 group-hover:text-white/50 ${isRTL ? "group-hover:-translate-x-1 rtl-flip" : "group-hover:translate-x-1"}`}
                    />
                  </div>
                </a>
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${card.accent}15`,
                        color: card.accent,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-1"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {card.label}
                      </span>
                      <span
                        className="text-white font-medium"
                        style={{
                          fontFamily: FONT.body,
                          fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                        }}
                      >
                        {card.value}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

        </motion.div>

        {/* Right: Form */}
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
            className="relative rounded-3xl overflow-hidden"
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

            {/* Glass border */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            />

            <div
              className={`relative ${compact ? "p-5 sm:p-6 lg:p-8" : "p-6 sm:p-8 lg:p-10"}`}
            >
              {/* Form header */}
              <div className={compact ? "mb-5" : "mb-8"}>
                <h3
                  className="text-white font-semibold mb-1"
                  style={{
                    fontFamily: FONT.heading,
                    fontSize: compact
                      ? "clamp(1rem, 1.8vw, 1.2rem)"
                      : "clamp(1.125rem, 2vw, 1.375rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.contactPage.formTitle}
                </h3>
                <p
                  className="text-white/35"
                  style={{ fontFamily: FONT.body, fontSize: "0.8125rem" }}
                >
                  {t.contactPage.subtitle}
                </p>
              </div>

              {/* Success state */}
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-center ${compact ? "py-8" : "py-12"}`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `${C.cta}18`,
                      border: `1px solid ${C.cta}30`,
                    }}
                  >
                    <CheckCircle
                      weight="duotone"
                      size={28}
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
                  className={`text-center ${compact ? "py-8" : "py-12"}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-4 flex items-center justify-center">
                    <Shield
                      weight="duotone"
                      size={28}
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
                /* Form */
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className={`flex flex-col ${compact ? "gap-4" : "gap-5"}`}
                >
                  {/* Name + Email row */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? "gap-4" : "gap-5"}`}
                  >
                    <div>
                      <label
                        htmlFor="cc-name"
                        className="block mb-1.5 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {t.contactPage.namePlaceholder}
                      </label>
                      <input
                        type="text"
                        id="cc-name"
                        name="name"
                        placeholder=""
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`${inputBase} ${errors.name ? "!border-red-400/60" : ""}`}
                        style={{
                          fontFamily: FONT.body,
                          padding: compact
                            ? "0.625rem 0.875rem"
                            : "0.75rem 1rem",
                          fontSize: "0.9375rem",
                        }}
                      />
                      {errors.name && (
                        <p
                          className="mt-1 text-red-400 text-xs"
                          style={{ fontFamily: FONT.body }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cc-email"
                        className="block mb-1.5 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                        style={{ fontFamily: FONT.heading }}
                      >
                        {t.contactPage.emailPlaceholder}
                      </label>
                      <input
                        type="email"
                        id="cc-email"
                        name="email"
                        placeholder=""
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`${inputBase} ${errors.email ? "!border-red-400/60" : ""}`}
                        style={{
                          fontFamily: FONT.body,
                          padding: compact
                            ? "0.625rem 0.875rem"
                            : "0.75rem 1rem",
                          fontSize: "0.9375rem",
                        }}
                      />
                      {errors.email && (
                        <p
                          className="mt-1 text-red-400 text-xs"
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
                      htmlFor="cc-subject"
                      className="block mb-1.5 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                      style={{ fontFamily: FONT.heading }}
                    >
                      {t.contactPage.subjectLabel}
                    </label>
                    <div className="relative">
                      <select
                        id="cc-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`${inputBase} cursor-pointer ${
                          formData.subject ? "text-white" : "text-white/30"
                        } ${errors.subject ? "!border-red-400/60" : ""}`}
                        style={{
                          fontFamily: FONT.body,
                          padding: compact
                            ? "0.625rem 3rem 0.625rem 0.875rem"
                            : "0.75rem 3rem 0.75rem 1rem",
                          fontSize: "0.9375rem",
                          appearance: "none",
                          WebkitAppearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%237CCCBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: isRTL
                            ? "left 1rem center"
                            : "right 1rem center",
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
                        className="mt-1 text-red-400 text-xs"
                        style={{ fontFamily: FONT.body }}
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="cc-message"
                      className="block mb-1.5 text-white/50 text-xs font-medium uppercase tracking-[0.12em]"
                      style={{ fontFamily: FONT.heading }}
                    >
                      {t.contactPage.messagePlaceholder}
                    </label>
                    <textarea
                      id="cc-message"
                      name="message"
                      placeholder="Tell us about your project or inquiry..."
                      rows={compact ? 3 : 5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`${inputBase} resize-none ${errors.message ? "!border-red-400/60" : ""}`}
                      style={{
                        fontFamily: FONT.body,
                        padding: compact ? "0.625rem 0.875rem" : "0.75rem 1rem",
                        fontSize: "0.9375rem",
                        lineHeight: 1.6,
                      }}
                    />
                    {errors.message && (
                      <p
                        className="mt-1 text-red-400 text-xs"
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
                    className="group relative mt-1 w-full py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(166,206,57,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
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
                            size={16}
                            className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rtl-flip" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
                          />
                        </>
                      )}
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                      }}
                    />
                  </button>

                  <p
                    className="text-white/25 text-center"
                    style={{ fontFamily: FONT.body, fontSize: "0.6875rem" }}
                  >
                    Your information is encrypted and will never be shared with
                    third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactContent;
