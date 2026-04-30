import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Envelope,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Lightning,
  Globe,
  TwitterLogo,
  LinkedinLogo,
  InstagramLogo,
} from "phosphor-react";
import { z } from "zod";

/** Accent chevrons for custom-styled subject selects (native `appearance: none`). */
const SUBJECT_CHEVRON_ORBITAL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%237CCCBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;
const SUBJECT_CHEVRON_DEFAULT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%2344C8F5' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

const SUBJECT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General inquiry" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactSectionProps {
  size?: "normal" | "large" | "extraLarge";
  layout?: "default" | "orbital";
}

const ContactSection: React.FC<ContactSectionProps> = ({
  size = "normal",
  layout = "default",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  // Rate limiting configuration
  const RATE_LIMIT_COUNT = 5; // Maximum submissions per time window
  const RATE_LIMIT_WINDOW = 3600000; // Time window in milliseconds (1 hour)

  // Note: Height is now handled via inline styles with viewport units

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    if (now - lastSubmitTime.current > RATE_LIMIT_WINDOW) {
      // Reset counter if time window has passed
      setSubmitCount(0);
      lastSubmitTime.current = now;
      return true;
    }

    if (submitCount >= RATE_LIMIT_COUNT) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Check rate limiting
    if (!checkRateLimit()) {
      setErrors({ message: "Too many submissions. Please try again later." });
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);

      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");

      // Update rate limiting counters
      setSubmitCount((prev) => prev + 1);
      lastSubmitTime.current = Date.now();

      // Clear form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitStatus("success");

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      // Form submission error handled by UI state

      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus("error");
        // Reset error status after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ——— Orbital snap-scroll layout (dense, watermark, radial glows, circuit lines, grid-12) ———
  if (layout === "orbital") {
    const secondary20 = "rgba(68, 200, 245, 0.2)";
    const accentColor = "#7CCCBF";
    const highlight5 = "rgba(124, 204, 191, 0.05)";
    const formInputClass =
      "w-full bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 outline-none focus:border-[var(--color-accent)] transition-colors form-input";

    return (
      <div
        ref={sectionRef}
        className="orbital-contact-grid w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[4fr_6fr] relative overflow-hidden bg-transparent scroll-mt-20 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-5 px-3 sm:px-5 md:px-6"
        style={{ scrollMarginTop: "5rem" }}
      >
        {/* 1. Background watermark — scaled down on mobile */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none select-none z-0"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(3rem, 14vw, 14rem)",
            fontWeight: 700,
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.08)",
            transform: "translate(-8%, 12%)",
          }}
          aria-hidden
        >
          CONTACT
        </div>

        {/* 2. Radial glows */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 30% 50%, ${highlight5} 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 75% 50%, ${highlight5} 0%, transparent 65%)
            `,
          }}
          aria-hidden
        />

        {/* 3. SVG circuit lines — desktop only */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] animate-pulse-slow hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 28 50 H 40 V 20 H 46"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.2"
            strokeOpacity="0.7"
          />
          <path
            d="M 28 50 H 40 V 50 H 46"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.2"
            strokeOpacity="0.7"
          />
          <path
            d="M 28 50 H 40 V 80 H 46"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.2"
            strokeOpacity="0.7"
          />
        </svg>

        {/* 4. Form — full width on mobile, left column on md+ */}
        <div className="flex items-center justify-center md:justify-end pr-0 md:pr-2 py-4 sm:py-5 md:py-8 z-10">
          <div
            className="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border backdrop-blur-md"
            style={{
              background: secondary20,
              borderWidth: "1px",
              borderColor: accentColor,
              boxShadow: `0 0 32px ${accentColor}15`,
            }}
          >
            <h2
              className="text-[var(--color-accent)] font-semibold mb-3 sm:mb-5"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
              }}
            >
              Get in Touch
            </h2>
            {submitStatus === "success" ? (
              <div className="text-center py-6">
                <p
                  className="text-white"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Message sent. We&apos;ll get back soon.
                </p>
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-center py-6">
                <p
                  className="text-red-400"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Something went wrong. Please try again.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 sm:gap-3"
              >
                {/* Name + Email side by side on tablet+ to save vertical space */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label
                      htmlFor="orbital-name"
                      className="block mb-1 text-white/90"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "0.8125rem",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="orbital-name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formInputClass}
                      disabled={isSubmitting}
                      style={{
                        fontFamily: "var(--font-secondary)",
                        padding: "0.5rem 0.75rem",
                        fontSize: "1rem",
                      }}
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-400 text-xs">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="orbital-email"
                      className="block mb-1 text-white/90"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "0.8125rem",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="orbital-email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formInputClass}
                      disabled={isSubmitting}
                      style={{
                        fontFamily: "var(--font-secondary)",
                        padding: "0.5rem 0.75rem",
                        fontSize: "1rem",
                      }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-xs">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="orbital-subject"
                    className="block mb-1 text-white/90"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    Subject
                  </label>
                  <div
                    className={[
                      "relative rounded-xl transition-all duration-200",
                      "border border-white/25 bg-gradient-to-b from-white/[0.09] to-white/[0.03]",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
                      "hover:border-[#7CCCBF]/50",
                      "focus-within:border-[#7CCCBF] focus-within:shadow-[0_0_0_1px_rgba(124,204,191,0.45),0_4px_28px_rgba(68,200,245,0.14)]",
                      errors.subject
                        ? "border-red-400/80 ring-1 ring-red-400/35"
                        : "",
                    ].join(" ")}
                  >
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 w-11 rounded-r-xl border-l border-white/10 bg-white/[0.06]"
                      aria-hidden
                    />
                    <select
                      id="orbital-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={[
                        "w-full cursor-pointer rounded-xl bg-transparent text-[1rem] outline-none transition-colors",
                        "border-0 py-2.5 pl-3 pr-12",
                        "focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                        formData.subject ? "text-white" : "text-white/45",
                      ].join(" ")}
                      style={{
                        fontFamily: "var(--font-secondary)",
                        appearance: "none",
                        WebkitAppearance: "none",
                        backgroundImage: SUBJECT_CHEVRON_ORBITAL,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.9375rem center",
                        backgroundSize: "1.125rem",
                        colorScheme: "dark",
                      }}
                    >
                      {SUBJECT_OPTIONS.map(({ value, label }) => (
                        <option
                          key={value || "placeholder"}
                          value={value}
                          className="bg-[#0a2f3d] text-[#ECF0F1]"
                        >
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-xs">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="orbital-message"
                    className="block mb-1 text-white/90"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="orbital-message"
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className={formInputClass}
                    disabled={isSubmitting}
                    style={{
                      fontFamily: "var(--font-secondary)",
                      padding: "0.5rem 0.75rem",
                      fontSize: "1rem",
                      minHeight: "3.5rem",
                    }}
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-xs">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-white shadow-lg ring-2 ring-[var(--color-cta)]/40 hover:ring-[var(--color-cta)]/60 hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-cta)] disabled:text-white/60"
                  style={{
                    backgroundColor: "var(--color-cta)",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5. Contact info nodes — horizontal row on mobile, vertical column on md+ */}
        <div className="flex flex-col sm:flex-row md:flex-col justify-start sm:justify-center md:justify-center gap-2.5 sm:gap-3 md:gap-4 py-0 sm:py-4 md:py-8 pb-4 sm:pb-5 md:pb-8 px-0 md:pl-0 md:pr-6 lg:pr-10 z-10">
          {/* Node A: 01 // VOICE */}
          <div
            className="animate-orbital-float rounded-xl border flex-1 md:flex-none backdrop-blur-md p-3 sm:p-4 md:p-5"
            style={{
              animationDelay: "0s",
              background: secondary20,
              borderWidth: "1px",
              borderColor: accentColor,
            }}
          >
            <span
              className="text-primary text-[0.65rem] sm:text-xs tracking-wider block mb-1.5 sm:mb-2 md:mb-3"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              01 // VOICE
            </span>
            <h3
              className="text-[var(--color-accent)] font-semibold mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Communication Hub
            </h3>
            <a
              href="tel:+966114059419"
              className="flex items-center gap-1.5 sm:gap-2 text-white/95 text-xs sm:text-sm hover:text-[var(--color-accent)] transition-colors mb-1 sm:mb-2"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              <Phone weight="regular" size={16} />
              +966 11 405 9419
            </a>
            <a
              href="mailto:htc@hajztel.com.sa"
              className="flex items-center gap-1.5 sm:gap-2 text-white/95 text-xs sm:text-sm hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              <Envelope weight="regular" size={16} />
              <span className="truncate">htc@hajztel.com.sa</span>
            </a>
          </div>

          {/* Node B: 02 // PLACE */}
          <div
            className="animate-orbital-float rounded-xl border flex-1 md:flex-none backdrop-blur-md p-3 sm:p-4 md:p-5"
            style={{
              animationDelay: "1.5s",
              background: "rgba(255,255,255,0.06)",
              borderWidth: "1px",
              borderColor: accentColor,
            }}
          >
            <span
              className="text-primary text-[0.65rem] sm:text-xs tracking-wider block mb-1.5 sm:mb-2 md:mb-3"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              02 // PLACE
            </span>
            <h3
              className="text-[var(--color-accent)] font-semibold mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Physical Presence
            </h3>
            <div className="flex items-start gap-2 sm:gap-3">
              <MapPin
                weight="regular"
                size={18}
                className="flex-shrink-0 mt-0.5 text-[var(--color-accent)]"
              />
              <span
                className="text-white/95 text-xs sm:text-sm leading-snug"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Riyadh, Saudi Arabia
              </span>
            </div>
          </div>

          {/* Node C: 03 // DIGITAL */}
          <div
            className="animate-orbital-float rounded-xl border flex-1 md:flex-none backdrop-blur-md p-3 sm:p-4 md:p-5"
            style={{
              animationDelay: "3s",
              background: "rgba(255,255,255,0.06)",
              borderWidth: "1px",
              borderColor: accentColor,
            }}
          >
            <span
              className="text-primary text-[0.65rem] sm:text-xs tracking-wider block mb-1.5 sm:mb-2 md:mb-3"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              03 // DIGITAL
            </span>
            <h3
              className="text-[var(--color-accent)] font-semibold mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Digital Footprint
            </h3>
            <ul className="flex sm:flex-col gap-1.5 sm:gap-2" role="list">
              {[
                {
                  Icon: TwitterLogo,
                  label: "Twitter",
                  href: "https://twitter.com",
                },
                {
                  Icon: LinkedinLogo,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                },
                {
                  Icon: InstagramLogo,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
              ].map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-white/90 hover:text-[var(--color-cta)] hover:bg-[var(--color-cta)]/10 transition-all text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    <Icon weight="regular" size={16} />
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden flex flex-col justify-center min-h-0 flex-1 py-8 md:py-12"
    >
      <h2
        className="text-white font-sans font-bold text-center mb-6 md:mb-8 w-full"
        style={{
          fontSize:
            size === "extraLarge"
              ? "clamp(1.75rem, 3.5vh, 2.25rem)"
              : size === "large"
                ? "clamp(1.5rem, 3vh, 1.875rem)"
                : "clamp(1.25rem, 2.5vh, 1.5rem)",
        }}
      >
        Get in Touch
      </h2>
      <div
        className={`w-full min-h-0 overflow-hidden flex-1 grid grid-cols-1 gap-6 lg:gap-8 ${
          size === "extraLarge" ? "lg:grid-cols-[1.35fr_1fr]" : "lg:grid-cols-2"
        }`}
      >
        {/* Left: Contact Details + Follow Us — larger column when extraLarge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`min-h-0 overflow-hidden flex flex-col ${size === "extraLarge" ? "lg:pr-4" : ""}`}
        >
          {size === "extraLarge" ? (
            <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-primary/20 backdrop-blur-sm p-6 md:p-8 lg:p-10">
              <h3
                className="text-cta font-sans font-semibold tracking-tight mb-8"
                style={{ fontSize: "clamp(1.25rem, 2.5vh, 1.625rem)" }}
              >
                Contact Details
              </h3>
              <ul className="space-y-6 mb-10" role="list">
                <li className="flex flex-row items-start gap-5">
                  <span
                    className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <Envelope weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">
                      Email
                    </span>
                    <a
                      href="mailto:htc@hajztel.com.sa"
                      className="text-white text-lg hover:text-cta transition-colors duration-200"
                    >
                      htc@hajztel.com.sa
                    </a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-5">
                  <span
                    className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <Phone weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">
                      Phone
                    </span>
                    <a
                      href="tel:+966114059419"
                      className="text-white text-lg hover:text-cta transition-colors duration-200"
                    >
                      +966 11 405 9419
                    </a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-5">
                  <span
                    className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <MapPin weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">
                      Location
                    </span>
                    <span className="text-white text-lg leading-snug">
                      Riyadh, Saudi Arabia
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-auto pt-8 border-t border-white/15">
                <h3
                  className="text-cta font-sans font-semibold tracking-tight mb-5"
                  style={{ fontSize: "clamp(1.125rem, 2.25vh, 1.375rem)" }}
                >
                  Follow Us
                </h3>
                <ul className="flex flex-row gap-4" role="list">
                  {[
                    {
                      Icon: TwitterLogo,
                      label: "Twitter",
                      href: "https://twitter.com",
                    },
                    {
                      Icon: LinkedinLogo,
                      label: "LinkedIn",
                      href: "https://linkedin.com",
                    },
                    {
                      Icon: InstagramLogo,
                      label: "Instagram",
                      href: "https://instagram.com",
                    },
                  ].map(({ Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white/80 hover:scale-110 hover:bg-cta/25 hover:text-cta transition-all duration-300 ease-out"
                      >
                        <Icon weight="regular" size={24} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <h3
                className="text-cta font-sans font-semibold tracking-tight mb-6"
                style={{
                  fontSize:
                    size === "large"
                      ? "clamp(1rem, 2vh, 1.25rem)"
                      : "clamp(0.875rem, 1.75vh, 1.125rem)",
                }}
              >
                Contact Details
              </h3>
              <ul className="space-y-5 mb-8" role="list">
                <li className="flex flex-row items-start gap-4">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <Envelope weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:htc@hajztel.com.sa"
                      className="text-white hover:text-cta transition-colors duration-200"
                      style={{
                        fontSize:
                          size === "large"
                            ? "clamp(0.8125rem, 1.25vh, 0.9375rem)"
                            : "clamp(0.8125rem, 1.25vh, 0.9375rem)",
                      }}
                    >
                      htc@hajztel.com.sa
                    </a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-4">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <Phone weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">
                      Phone
                    </span>
                    <a
                      href="tel:+966114059419"
                      className="text-white hover:text-cta transition-colors duration-200"
                      style={{
                        fontSize:
                          size === "large"
                            ? "clamp(0.8125rem, 1.25vh, 0.9375rem)"
                            : "clamp(0.8125rem, 1.25vh, 0.9375rem)",
                      }}
                    >
                      +966 11 405 9419
                    </a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-4">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta"
                    aria-hidden
                  >
                    <MapPin weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">
                      Location
                    </span>
                    <span
                      className="text-white"
                      style={{
                        fontSize:
                          size === "large"
                            ? "clamp(0.8125rem, 1.25vh, 0.9375rem)"
                            : "clamp(0.8125rem, 1.25vh, 0.9375rem)",
                      }}
                    >
                      Riyadh, Saudi Arabia
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-white/10">
                <h3
                  className="text-cta font-sans font-semibold tracking-tight mb-4"
                  style={{
                    fontSize:
                      size === "large"
                        ? "clamp(1rem, 2vh, 1.125rem)"
                        : "clamp(1rem, 2vh, 1.125rem)",
                  }}
                >
                  Follow Us
                </h3>
                <ul className="flex flex-row gap-3" role="list">
                  {[
                    {
                      Icon: TwitterLogo,
                      label: "Twitter",
                      href: "https://twitter.com",
                    },
                    {
                      Icon: LinkedinLogo,
                      label: "LinkedIn",
                      href: "https://linkedin.com",
                    },
                    {
                      Icon: InstagramLogo,
                      label: "Instagram",
                      href: "https://instagram.com",
                    },
                  ].map(({ Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/80 hover:scale-105 hover:bg-cta/20 hover:text-cta transition-all duration-300 ease-out"
                      >
                        <Icon weight="regular" size={22} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </motion.div>

        {/* Right: Contact Form card — smaller column when extraLarge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`min-h-0 overflow-hidden flex flex-col ${size === "extraLarge" ? "lg:max-w-[420px] lg:ml-auto" : ""}`}
        >
          <div
            className={`bg-[#005E96]/30 backdrop-blur-[2px] border border-white/10 rounded-2xl shadow-xl relative overflow-hidden flex flex-col min-h-0 ${
              size === "extraLarge" ? "p-5 md:p-6" : "p-6 md:p-8"
            }`}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#005E96]/30 via-[#44C8F5]/30 to-[#005E96]/30 animate-gradient-x"></div>
            </div>

            <div className="relative">
              {/* <h3 
                    className="text-white font-sans"
                    style={{ 
                      fontSize: size === 'extraLarge' 
                        ? 'clamp(1.125rem, 2.25vh, 1.5rem)'
                        : size === 'large' 
                        ? 'clamp(0.875rem, 1.75vh, 1.125rem)'
                        : 'clamp(0.75rem, 1.5vh, 1rem)',
                      marginBottom: size === 'extraLarge' 
                        ? 'clamp(0.75rem, 1.5vh, 1rem)'
                        : size === 'large' 
                        ? 'clamp(0.5rem, 1vh, 0.75rem)'
                        : 'clamp(0.375rem, 0.75vh, 0.5rem)'
                    }}
                  >
                    Send us a Message
                  </h3> */}

              {submitStatus === "success" ? (
                <div
                  className="text-center"
                  style={{
                    padding:
                      size === "extraLarge"
                        ? "clamp(2rem, 4vh, 2.5rem) 0"
                        : size === "large"
                          ? "clamp(1.5rem, 3vh, 2rem) 0"
                          : "clamp(1rem, 2vh, 1.5rem) 0",
                  }}
                >
                  <div
                    className="bg-cta/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      width:
                        size === "extraLarge"
                          ? "clamp(4.5rem, 9vh, 5.5rem)"
                          : size === "large"
                            ? "clamp(3.5rem, 7vh, 4.5rem)"
                            : "clamp(2.5rem, 5vh, 3.5rem)",
                      height:
                        size === "extraLarge"
                          ? "clamp(4.5rem, 9vh, 5.5rem)"
                          : size === "large"
                            ? "clamp(3.5rem, 7vh, 4.5rem)"
                            : "clamp(2.5rem, 5vh, 3.5rem)",
                    }}
                  >
                    <div className="p-2">
                      <Shield weight="thin" size={20} className="text-cta" />
                    </div>
                  </div>
                  <h4
                    className="text-white mb-2"
                    style={{
                      fontSize:
                        size === "extraLarge"
                          ? "clamp(1.375rem, 2.75vh, 1.625rem)"
                          : size === "large"
                            ? "clamp(1.125rem, 2.25vh, 1.375rem)"
                            : "clamp(1rem, 2vh, 1.25rem)",
                      marginBottom:
                        size === "extraLarge"
                          ? "clamp(0.75rem, 1.5vh, 1rem)"
                          : size === "large"
                            ? "clamp(0.5rem, 1vh, 0.75rem)"
                            : "clamp(0.375rem, 0.75vh, 0.5rem)",
                    }}
                  >
                    Message Sent!
                  </h4>
                  <p
                    className="text-white/70"
                    style={{
                      fontSize:
                        size === "extraLarge"
                          ? "clamp(1rem, 1.75vh, 1.125rem)"
                          : size === "large"
                            ? "clamp(0.875rem, 1.5vh, 1rem)"
                            : "clamp(0.75rem, 1.25vh, 0.875rem)",
                    }}
                  >
                    We'll get back to you soon.
                  </p>
                </div>
              ) : submitStatus === "error" ? (
                <div
                  className="text-center"
                  style={{
                    padding:
                      size === "extraLarge"
                        ? "clamp(2rem, 4vh, 2.5rem) 0"
                        : size === "large"
                          ? "clamp(1.5rem, 3vh, 2rem) 0"
                          : "clamp(1rem, 2vh, 1.5rem) 0",
                  }}
                >
                  <div
                    className="bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      width:
                        size === "extraLarge"
                          ? "clamp(4.5rem, 9vh, 5.5rem)"
                          : size === "large"
                            ? "clamp(3.5rem, 7vh, 4.5rem)"
                            : "clamp(2.5rem, 5vh, 3.5rem)",
                      height:
                        size === "extraLarge"
                          ? "clamp(4.5rem, 9vh, 5.5rem)"
                          : size === "large"
                            ? "clamp(3.5rem, 7vh, 4.5rem)"
                            : "clamp(2.5rem, 5vh, 3.5rem)",
                    }}
                  >
                    <div className="p-2">
                      <Shield
                        weight="thin"
                        size={20}
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <h4
                    className="text-white mb-2"
                    style={{
                      fontSize:
                        size === "extraLarge"
                          ? "clamp(1.375rem, 2.75vh, 1.625rem)"
                          : size === "large"
                            ? "clamp(1.125rem, 2.25vh, 1.375rem)"
                            : "clamp(1rem, 2vh, 1.25rem)",
                      marginBottom:
                        size === "extraLarge"
                          ? "clamp(0.75rem, 1.5vh, 1rem)"
                          : size === "large"
                            ? "clamp(0.5rem, 1vh, 0.75rem)"
                            : "clamp(0.375rem, 0.75vh, 0.5rem)",
                    }}
                  >
                    Something went wrong
                  </h4>
                  <p
                    className="text-white/70"
                    style={{
                      fontSize:
                        size === "extraLarge"
                          ? "clamp(1rem, 1.75vh, 1.125rem)"
                          : size === "large"
                            ? "clamp(0.875rem, 1.5vh, 1rem)"
                            : "clamp(0.75rem, 1.25vh, 0.875rem)",
                    }}
                  >
                    Please try again later.
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={{
                    gap:
                      size === "extraLarge"
                        ? "clamp(0.75rem, 1.5vh, 1rem)"
                        : size === "large"
                          ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                          : "clamp(0.25rem, 0.5vh, 0.375rem)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-sans font-medium mb-1.5"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.8125rem, 1.5vh, 0.9375rem)"
                            : size === "large"
                              ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                              : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      style={{
                        padding:
                          size === "extraLarge"
                            ? "clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)"
                              : "clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)",
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.875rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                              : "clamp(0.625rem, 1.125vh, 0.75rem)",
                        borderRadius:
                          size === "extraLarge"
                            ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                            : size === "large"
                              ? "clamp(0.25rem, 0.5vh, 0.375rem)"
                              : "clamp(0.1875rem, 0.375vh, 0.25rem)",
                      }}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-1 text-red-500"
                        style={{
                          marginTop:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.625rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.5rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.375rem)",
                          fontSize:
                            size === "extraLarge"
                              ? "clamp(0.875rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                                : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-sans font-medium mb-1.5"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.8125rem, 1.5vh, 0.9375rem)"
                            : size === "large"
                              ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                              : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      style={{
                        padding:
                          size === "extraLarge"
                            ? "clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)"
                              : "clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)",
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.875rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                              : "clamp(0.625rem, 1.125vh, 0.75rem)",
                        borderRadius:
                          size === "extraLarge"
                            ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                            : size === "large"
                              ? "clamp(0.25rem, 0.5vh, 0.375rem)"
                              : "clamp(0.1875rem, 0.375vh, 0.25rem)",
                      }}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-1 text-red-500"
                        style={{
                          marginTop:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.625rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.5rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.375rem)",
                          fontSize:
                            size === "extraLarge"
                              ? "clamp(0.875rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                                : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-white font-sans font-medium mb-1.5"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.8125rem, 1.5vh, 0.9375rem)"
                            : size === "large"
                              ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                              : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                      }}
                    >
                      Subject
                    </label>
                    <div
                      className={[
                        "relative transition-all duration-300",
                        size === "extraLarge"
                          ? "rounded-[clamp(0.375rem,0.75vh,0.5rem)]"
                          : size === "large"
                            ? "rounded-[clamp(0.25rem,0.5vh,0.375rem)]"
                            : "rounded-[clamp(0.1875rem,0.375vh,0.25rem)]",
                        "border bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                        "hover:border-white/35",
                        "focus-within:border-[#44C8F5]/90 focus-within:ring-2 focus-within:ring-[#44C8F5]/30",
                        errors.subject
                          ? "border-red-500 ring-2 ring-red-500/25"
                          : "border-white/20",
                      ].join(" ")}
                    >
                      <div
                        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-11 border-l border-white/10 bg-white/[0.05]"
                        style={{
                          borderTopRightRadius:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.375rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.25rem)",
                          borderBottomRightRadius:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.375rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.25rem)",
                        }}
                        aria-hidden
                      />
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={[
                          "w-full cursor-pointer border-0 bg-transparent font-body text-white outline-none transition-colors",
                          "focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                          !formData.subject ? "text-white/50" : "text-white",
                          size === "extraLarge"
                            ? "rounded-[clamp(0.375rem,0.75vh,0.5rem)]"
                            : size === "large"
                              ? "rounded-[clamp(0.25rem,0.5vh,0.375rem)]"
                              : "rounded-[clamp(0.1875rem,0.375vh,0.25rem)]",
                        ].join(" ")}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={
                          errors.subject ? "subject-error" : undefined
                        }
                        style={{
                          padding:
                            size === "extraLarge"
                              ? "clamp(0.625rem, 1.25vh, 0.75rem) clamp(2.65rem, 5vh, 3rem) clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.375rem, 0.75vh, 0.5rem) clamp(2.35rem, 4.5vh, 2.65rem) clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)"
                                : "clamp(0.25rem, 0.5vh, 0.375rem) clamp(2.15rem, 4vh, 2.4rem) clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)",
                          fontSize:
                            size === "extraLarge"
                              ? "clamp(0.875rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                                : "clamp(0.625rem, 1.125vh, 0.75rem)",
                          appearance: "none",
                          WebkitAppearance: "none",
                          backgroundImage: SUBJECT_CHEVRON_DEFAULT,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.9375rem center",
                          backgroundSize: "1.125rem",
                          colorScheme: "dark",
                        }}
                      >
                        {SUBJECT_OPTIONS.map(({ value, label }) => (
                          <option
                            key={value || "placeholder"}
                            value={value}
                            className="bg-[#06354a] text-[#ECF0F1]"
                          >
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.subject && (
                      <p
                        id="subject-error"
                        className="mt-1 text-red-500"
                        style={{
                          marginTop:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.625rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.5rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.375rem)",
                          fontSize:
                            size === "extraLarge"
                              ? "clamp(0.875rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                                : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                        }}
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white font-sans font-medium mb-1.5"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.8125rem, 1.5vh, 0.9375rem)"
                            : size === "large"
                              ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                              : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      rows={size === "extraLarge" ? 3 : 4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      style={{
                        padding:
                          size === "extraLarge"
                            ? "clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)"
                              : "clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)",
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.875rem, 1.5vh, 1rem)"
                            : size === "large"
                              ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                              : "clamp(0.625rem, 1.125vh, 0.75rem)",
                        borderRadius:
                          size === "extraLarge"
                            ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                            : size === "large"
                              ? "clamp(0.25rem, 0.5vh, 0.375rem)"
                              : "clamp(0.1875rem, 0.375vh, 0.25rem)",
                        minHeight:
                          size === "extraLarge"
                            ? "clamp(4rem, 8vh, 5rem)"
                            : size === "large"
                              ? "clamp(3rem, 6vh, 4rem)"
                              : "clamp(2.5rem, 5vh, 3.5rem)",
                      }}
                    ></textarea>
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-red-500"
                        style={{
                          marginTop:
                            size === "extraLarge"
                              ? "clamp(0.375rem, 0.75vh, 0.625rem)"
                              : size === "large"
                                ? "clamp(0.25rem, 0.5vh, 0.5rem)"
                                : "clamp(0.1875rem, 0.375vh, 0.375rem)",
                          fontSize:
                            size === "extraLarge"
                              ? "clamp(0.875rem, 1.5vh, 1rem)"
                              : size === "large"
                                ? "clamp(0.75rem, 1.25vh, 0.875rem)"
                                : "clamp(0.6875rem, 1.125vh, 0.8125rem)",
                        }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center group"
                    disabled={isSubmitting}
                    style={{
                      padding:
                        size === "extraLarge"
                          ? "clamp(0.625rem, 1.25vh, 0.75rem) clamp(1rem, 2vh, 1.25rem)"
                          : size === "large"
                            ? "clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.75rem, 1.5vh, 0.875rem)"
                            : "clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.625rem, 1.25vh, 0.75rem)",
                      fontSize:
                        size === "extraLarge"
                          ? "clamp(0.875rem, 1.5vh, 1rem)"
                          : size === "large"
                            ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                            : "clamp(0.625rem, 1.125vh, 0.75rem)",
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div
                          className="border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"
                          style={{
                            width:
                              size === "extraLarge"
                                ? "clamp(1rem, 2vh, 1.25rem)"
                                : size === "large"
                                  ? "clamp(0.75rem, 1.5vh, 1rem)"
                                  : "clamp(0.625rem, 1.25vh, 0.875rem)",
                            height:
                              size === "extraLarge"
                                ? "clamp(1rem, 2vh, 1.25rem)"
                                : size === "large"
                                  ? "clamp(0.75rem, 1.5vh, 1rem)"
                                  : "clamp(0.625rem, 1.25vh, 0.875rem)",
                          }}
                        ></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <div className="p-0.5 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          <ArrowRight weight="thin" size={20} />
                        </div>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Trust indicators */}
              <div
                className="border-t border-white/10"
                style={{
                  marginTop:
                    size === "extraLarge"
                      ? "clamp(0.75rem, 1.5vh, 1rem)"
                      : size === "large"
                        ? "clamp(0.5rem, 1vh, 0.75rem)"
                        : "clamp(0.375rem, 0.75vh, 0.5rem)",
                  paddingTop:
                    size === "extraLarge"
                      ? "clamp(0.75rem, 1.5vh, 1rem)"
                      : size === "large"
                        ? "clamp(0.5rem, 1vh, 0.75rem)"
                        : "clamp(0.375rem, 0.75vh, 0.5rem)",
                }}
              >
                <div
                  className="grid grid-cols-3"
                  style={{
                    gap:
                      size === "extraLarge"
                        ? "clamp(0.75rem, 1.5vh, 1rem)"
                        : size === "large"
                          ? "clamp(0.375rem, 0.75vh, 0.5rem)"
                          : "clamp(0.25rem, 0.5vh, 0.375rem)",
                  }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                      <Shield weight="thin" size={20} className="text-cta" />
                    </div>
                    <span
                      className="text-white/70"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                            : size === "large"
                              ? "clamp(0.5625rem, 1vh, 0.625rem)"
                              : "clamp(0.5rem, 0.875vh, 0.5625rem)",
                      }}
                    >
                      Secure
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                      <Lightning weight="thin" size={20} className="text-cta" />
                    </div>
                    <span
                      className="text-white/70"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                            : size === "large"
                              ? "clamp(0.5625rem, 1vh, 0.625rem)"
                              : "clamp(0.5rem, 0.875vh, 0.5625rem)",
                      }}
                    >
                      Fast Response
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                      <Globe weight="thin" size={20} className="text-cta" />
                    </div>
                    <span
                      className="text-white/70"
                      style={{
                        fontSize:
                          size === "extraLarge"
                            ? "clamp(0.6875rem, 1.25vh, 0.8125rem)"
                            : size === "large"
                              ? "clamp(0.5625rem, 1vh, 0.625rem)"
                              : "clamp(0.5rem, 0.875vh, 0.5625rem)",
                      }}
                    >
                      24/7 Support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
