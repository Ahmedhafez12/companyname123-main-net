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
import emailjs from "@emailjs/browser";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactSectionProps {
  size?: 'normal' | 'large' | 'extraLarge';
  layout?: 'default' | 'orbital';
}

const ContactSection: React.FC<ContactSectionProps> = ({ size = 'normal', layout = 'default' }) => {
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
    >
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

      // Send email using EmailJS
      if (formRef.current) {
        await emailjs.sendForm(
          "service_cq0isqs", // Replace with your EmailJS service ID
          "template_tzg1evt", // Replace with your EmailJS template ID
          formRef.current,
          "9DWNVO3rsaMB7nIaq" // Replace with your EmailJS public key
        );
      }

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
      console.error("Form submission error:", error);

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
  if (layout === 'orbital') {
    const secondary20 = 'rgba(68, 200, 245, 0.2)';
    const accentColor = '#7CCCBF';
    const highlight5 = 'rgba(124, 204, 191, 0.05)';
    const formInputClass =
      'w-full bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 outline-none focus:border-[var(--color-accent)] transition-colors form-input';

    return (
      <div
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto h-full min-h-0 grid grid-cols-1 md:grid-cols-[4fr_6fr] relative overflow-hidden bg-transparent scroll-mt-20 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 px-4 sm:px-6"
        style={{ scrollMarginTop: '5rem' }}
      >
        {/* 1. Background: large typography watermark (bottom-left, bleeds off) */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none select-none z-0"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            fontWeight: 700,
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.12)',
            transform: 'translate(-8%, 12%)',
          }}
          aria-hidden
        >
          CONTACT
        </div>

        {/* 2. Radial glows (Highlight 5%) to bridge form and nodes */}
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

        {/* 3. SVG circuit-style connecting lines (1px Highlight, 90° bends, slow pulse) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] animate-pulse-slow hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Circuit-style 90° lines (4:6 ratio: form left 40%, contact right 60%) form → spine at 40% → nodes */}
          <path d="M 28 50 H 40 V 20 H 46" fill="none" stroke={accentColor} strokeWidth="0.2" strokeOpacity="0.7" />
          <path d="M 28 50 H 40 V 50 H 46" fill="none" stroke={accentColor} strokeWidth="0.2" strokeOpacity="0.7" />
          <path d="M 28 50 H 40 V 80 H 46" fill="none" stroke={accentColor} strokeWidth="0.2" strokeOpacity="0.7" />
        </svg>

        {/* 4. Anchor: form (4 parts) */}
        <div className="flex items-center justify-center md:justify-end pr-0 md:pr-2 py-6 md:py-8 z-10">
          <div
            className="w-full max-w-xl rounded-2xl p-6 md:p-8 border backdrop-blur-md"
            style={{
              background: secondary20,
              borderWidth: '1px',
              borderColor: accentColor,
              boxShadow: `0 0 32px ${accentColor}15`,
            }}
          >
            <h2
              className="text-[var(--color-accent)] font-semibold mb-5"
              style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(1.25rem, 2.5vh, 1.5rem)' }}
            >
              Get in Touch
            </h2>
            {submitStatus === 'success' ? (
              <div className="text-center py-6">
                <p className="text-white" style={{ fontFamily: 'var(--font-secondary)' }}>Message sent. We&apos;ll get back soon.</p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="text-center py-6">
                <p className="text-red-400" style={{ fontFamily: 'var(--font-secondary)' }}>Something went wrong. Please try again.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label htmlFor="orbital-name" className="block mb-1 text-white/90" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.8125rem' }}>Name</label>
                  <input type="text" id="orbital-name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={formInputClass} disabled={isSubmitting} style={{ fontFamily: 'var(--font-secondary)', padding: '0.5rem 0.75rem', fontSize: '0.9375rem' }} />
                  {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="orbital-email" className="block mb-1 text-white/90" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.8125rem' }}>Email</label>
                  <input type="email" id="orbital-email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={formInputClass} disabled={isSubmitting} style={{ fontFamily: 'var(--font-secondary)', padding: '0.5rem 0.75rem', fontSize: '0.9375rem' }} />
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="orbital-subject" className="block mb-1 text-white/90" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.8125rem' }}>Subject</label>
                  <select id="orbital-subject" name="subject" value={formData.subject} onChange={handleChange} className={`${formInputClass} cursor-pointer`} disabled={isSubmitting} style={{ fontFamily: 'var(--font-secondary)', padding: '0.5rem 0.75rem', fontSize: '0.9375rem', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem', paddingRight: '2rem' }}>
                    <option value="">Select a subject</option>
                    <option value="general">General inquiry</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-red-400 text-sm">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="orbital-message" className="block mb-1 text-white/90" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.8125rem' }}>Message</label>
                  <textarea id="orbital-message" name="message" placeholder="Your Message" rows={3} value={formData.message} onChange={handleChange} className={formInputClass} disabled={isSubmitting} style={{ fontFamily: 'var(--font-secondary)', padding: '0.5rem 0.75rem', fontSize: '0.9375rem', minHeight: '4rem' }} />
                  {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 w-full py-4 rounded-xl font-bold text-primary text-lg shadow-lg ring-2 ring-[var(--color-cta)]/40 hover:ring-[var(--color-cta)]/60 hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-cta)]"
                  style={{ backgroundColor: 'var(--color-cta)', fontFamily: 'var(--font-primary)' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5. Satellites / Contact info (6 parts) */}
        <div className="flex flex-col justify-center gap-3 md:gap-4 py-4 md:py-8 pl-4 md:pl-0 pr-4 md:pr-6 lg:pr-10 z-10">
          {/* Node A: 01 // VOICE — Communication (Phone + Email) */}
          <div
            className="animate-orbital-float rounded-xl border p-5 backdrop-blur-md"
            style={{ animationDelay: '0s', background: secondary20, borderWidth: '1px', borderColor: accentColor }}
          >
            <span className="font-mono text-[var(--color-accent)]/80 text-xs tracking-wider block mb-3" style={{ fontFamily: 'ui-monospace, monospace' }}>01 // VOICE</span>
            <h3 className="text-[var(--color-accent)] font-semibold mb-3" style={{ fontFamily: 'var(--font-primary)', fontSize: '1rem' }}>Communication Hub</h3>
            <a href="tel:+15551234567" className="flex items-center gap-2 text-white/95 text-sm hover:text-[var(--color-accent)] transition-colors mb-2" style={{ fontFamily: 'var(--font-secondary)' }}>
              <Phone weight="regular" size={20} />
              +1 (555) 123-4567
            </a>
            <a href="mailto:contact@example.com" className="flex items-center gap-2 text-white/95 text-sm hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>
              <Envelope weight="regular" size={20} />
              contact@example.com
            </a>
          </div>

          {/* Node B: 02 // PLACE — Physical Presence */}
          <div
            className="animate-orbital-float rounded-xl border p-5 backdrop-blur-md"
            style={{ animationDelay: '1.5s', background: 'rgba(255,255,255,0.06)', borderWidth: '1px', borderColor: accentColor }}
          >
            <span className="font-mono text-[var(--color-accent)]/80 text-xs tracking-wider block mb-3" style={{ fontFamily: 'ui-monospace, monospace' }}>02 // PLACE</span>
            <h3 className="text-[var(--color-accent)] font-semibold mb-3" style={{ fontFamily: 'var(--font-primary)', fontSize: '1rem' }}>Physical Presence</h3>
            <div className="flex items-start gap-3">
              <MapPin weight="regular" size={22} className="flex-shrink-0 mt-0.5 text-[var(--color-accent)]" />
              <span className="text-white/95 text-sm leading-snug" style={{ fontFamily: 'var(--font-secondary)' }}>123 Tech Street, Innovation City</span>
            </div>
          </div>

          {/* Node C: 03 // DIGITAL — Social */}
          <div
            className="animate-orbital-float rounded-xl border p-5 backdrop-blur-md"
            style={{ animationDelay: '3s', background: 'rgba(255,255,255,0.06)', borderWidth: '1px', borderColor: accentColor }}
          >
            <span className="font-mono text-[var(--color-accent)]/80 text-xs tracking-wider block mb-3" style={{ fontFamily: 'ui-monospace, monospace' }}>03 // DIGITAL</span>
            <h3 className="text-[var(--color-accent)] font-semibold mb-3" style={{ fontFamily: 'var(--font-primary)', fontSize: '1rem' }}>Digital Footprint</h3>
            <ul className="flex flex-col gap-2" role="list">
              {[
                { Icon: TwitterLogo, label: 'Twitter', href: 'https://twitter.com' },
                { Icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com' },
                { Icon: InstagramLogo, label: 'Instagram', href: 'https://instagram.com' },
              ].map(({ Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center gap-2 py-2 px-3 rounded-lg text-white/90 hover:text-[var(--color-cta)] hover:bg-[var(--color-cta)]/10 transition-all text-sm" style={{ fontFamily: 'var(--font-secondary)' }}>
                    <Icon weight="regular" size={20} />
                    {label}
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
      <h2 className="text-white font-sans font-bold text-center mb-6 md:mb-8 w-full" style={{
        fontSize: size === 'extraLarge' ? 'clamp(1.75rem, 3.5vh, 2.25rem)' : size === 'large' ? 'clamp(1.5rem, 3vh, 1.875rem)' : 'clamp(1.25rem, 2.5vh, 1.5rem)'
      }}>
        Get in Touch
      </h2>
      <div
        className={`w-full min-h-0 overflow-hidden flex-1 grid grid-cols-1 gap-6 lg:gap-8 ${
          size === 'extraLarge' ? 'lg:grid-cols-[1.35fr_1fr]' : 'lg:grid-cols-2'
        }`}
      >
        {/* Left: Contact Details + Follow Us — larger column when extraLarge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`min-h-0 overflow-hidden flex flex-col ${size === 'extraLarge' ? 'lg:pr-4' : ''}`}
        >
          {size === 'extraLarge' ? (
            <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-primary/20 backdrop-blur-sm p-6 md:p-8 lg:p-10">
              <h3 className="text-cta font-sans font-semibold tracking-tight mb-8" style={{ fontSize: 'clamp(1.25rem, 2.5vh, 1.625rem)' }}>
                Contact Details
              </h3>
              <ul className="space-y-6 mb-10" role="list">
                <li className="flex flex-row items-start gap-5">
                  <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta" aria-hidden>
                    <Envelope weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">Email</span>
                    <a href="mailto:contact@example.com" className="text-white text-lg hover:text-cta transition-colors duration-200">contact@example.com</a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-5">
                  <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta" aria-hidden>
                    <Phone weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">Phone</span>
                    <a href="tel:+15551234567" className="text-white text-lg hover:text-cta transition-colors duration-200">+1 (555) 123-4567</a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-5">
                  <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-cta/25 flex items-center justify-center text-cta" aria-hidden>
                    <MapPin weight="regular" size={26} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-white/60 font-sans text-sm font-medium uppercase tracking-wider mb-2">Location</span>
                    <span className="text-white text-lg leading-snug">123 Tech Street, Innovation City</span>
                  </div>
                </li>
              </ul>
              <div className="mt-auto pt-8 border-t border-white/15">
                <h3 className="text-cta font-sans font-semibold tracking-tight mb-5" style={{ fontSize: 'clamp(1.125rem, 2.25vh, 1.375rem)' }}>
                  Follow Us
                </h3>
                <ul className="flex flex-row gap-4" role="list">
                  {[
                    { Icon: TwitterLogo, label: "Twitter", href: "https://twitter.com" },
                    { Icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com" },
                    { Icon: InstagramLogo, label: "Instagram", href: "https://instagram.com" },
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
              <h3 className="text-cta font-sans font-semibold tracking-tight mb-6" style={{ fontSize: size === 'large' ? 'clamp(1rem, 2vh, 1.25rem)' : 'clamp(0.875rem, 1.75vh, 1.125rem)' }}>
                Contact Details
              </h3>
              <ul className="space-y-5 mb-8" role="list">
                <li className="flex flex-row items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta" aria-hidden>
                    <Envelope weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">Email</span>
                    <a href="mailto:contact@example.com" className="text-white hover:text-cta transition-colors duration-200" style={{ fontSize: size === 'large' ? 'clamp(0.8125rem, 1.25vh, 0.9375rem)' : 'clamp(0.8125rem, 1.25vh, 0.9375rem)' }}>contact@example.com</a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta" aria-hidden>
                    <Phone weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">Phone</span>
                    <a href="tel:+15551234567" className="text-white hover:text-cta transition-colors duration-200" style={{ fontSize: size === 'large' ? 'clamp(0.8125rem, 1.25vh, 0.9375rem)' : 'clamp(0.8125rem, 1.25vh, 0.9375rem)' }}>+1 (555) 123-4567</a>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center text-cta" aria-hidden>
                    <MapPin weight="regular" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-white/60 font-sans text-xs font-medium uppercase tracking-wider mb-1">Location</span>
                    <span className="text-white" style={{ fontSize: size === 'large' ? 'clamp(0.8125rem, 1.25vh, 0.9375rem)' : 'clamp(0.8125rem, 1.25vh, 0.9375rem)' }}>123 Tech Street, Innovation City</span>
                  </div>
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-white/10">
                <h3 className="text-cta font-sans font-semibold tracking-tight mb-4" style={{ fontSize: size === 'large' ? 'clamp(1rem, 2vh, 1.125rem)' : 'clamp(1rem, 2vh, 1.125rem)' }}>
                  Follow Us
                </h3>
                <ul className="flex flex-row gap-3" role="list">
                  {[
                    { Icon: TwitterLogo, label: "Twitter", href: "https://twitter.com" },
                    { Icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com" },
                    { Icon: InstagramLogo, label: "Instagram", href: "https://instagram.com" },
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
          className={`min-h-0 overflow-hidden flex flex-col ${size === 'extraLarge' ? 'lg:max-w-[420px] lg:ml-auto' : ''}`}
        >
          <div 
            className={`bg-[#005E96]/30 backdrop-blur-[2px] border border-white/10 rounded-2xl shadow-xl relative overflow-hidden flex flex-col min-h-0 ${
              size === 'extraLarge' ? 'p-5 md:p-6' : 'p-6 md:p-8'
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
                    <div className="text-center" style={{ padding: size === 'extraLarge' ? 'clamp(2rem, 4vh, 2.5rem) 0' : size === 'large' ? 'clamp(1.5rem, 3vh, 2rem) 0' : 'clamp(1rem, 2vh, 1.5rem) 0' }}>
                      <div 
                        className="bg-cta/20 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                          width: size === 'extraLarge' 
                            ? 'clamp(4.5rem, 9vh, 5.5rem)'
                            : size === 'large' 
                            ? 'clamp(3.5rem, 7vh, 4.5rem)'
                            : 'clamp(2.5rem, 5vh, 3.5rem)',
                          height: size === 'extraLarge' 
                            ? 'clamp(4.5rem, 9vh, 5.5rem)'
                            : size === 'large' 
                            ? 'clamp(3.5rem, 7vh, 4.5rem)'
                            : 'clamp(2.5rem, 5vh, 3.5rem)'
                        }}
                      >
                        <div className="p-2">
                          <Shield weight="thin" size={20} className="text-cta" />
                        </div>
                      </div>
                      <h4 className="text-white mb-2" style={{ fontSize: size === 'extraLarge' ? 'clamp(1.375rem, 2.75vh, 1.625rem)' : size === 'large' ? 'clamp(1.125rem, 2.25vh, 1.375rem)' : 'clamp(1rem, 2vh, 1.25rem)', marginBottom: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.5rem, 1vh, 0.75rem)' : 'clamp(0.375rem, 0.75vh, 0.5rem)' }}>Message Sent!</h4>
                      <p className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(1rem, 1.75vh, 1.125rem)' : size === 'large' ? 'clamp(0.875rem, 1.5vh, 1rem)' : 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                        We'll get back to you soon.
                      </p>
                    </div>
                  ) : submitStatus === "error" ? (
                    <div className="text-center" style={{ padding: size === 'extraLarge' ? 'clamp(2rem, 4vh, 2.5rem) 0' : size === 'large' ? 'clamp(1.5rem, 3vh, 2rem) 0' : 'clamp(1rem, 2vh, 1.5rem) 0' }}>
                      <div 
                        className="bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                          width: size === 'extraLarge' 
                            ? 'clamp(4.5rem, 9vh, 5.5rem)'
                            : size === 'large' 
                            ? 'clamp(3.5rem, 7vh, 4.5rem)'
                            : 'clamp(2.5rem, 5vh, 3.5rem)',
                          height: size === 'extraLarge' 
                            ? 'clamp(4.5rem, 9vh, 5.5rem)'
                            : size === 'large' 
                            ? 'clamp(3.5rem, 7vh, 4.5rem)'
                            : 'clamp(2.5rem, 5vh, 3.5rem)'
                        }}
                      >
                        <div className="p-2">
                          <Shield weight="thin" size={20} className="text-red-500" />
                        </div>
                      </div>
                      <h4 className="text-white mb-2" style={{ fontSize: size === 'extraLarge' ? 'clamp(1.375rem, 2.75vh, 1.625rem)' : size === 'large' ? 'clamp(1.125rem, 2.25vh, 1.375rem)' : 'clamp(1rem, 2vh, 1.25rem)', marginBottom: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.5rem, 1vh, 0.75rem)' : 'clamp(0.375rem, 0.75vh, 0.5rem)' }}>
                        Something went wrong
                      </h4>
                      <p className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(1rem, 1.75vh, 1.125rem)' : size === 'large' ? 'clamp(0.875rem, 1.5vh, 1rem)' : 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>Please try again later.</p>
                    </div>
                  ) : (
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      style={{ gap: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : 'clamp(0.25rem, 0.5vh, 0.375rem)', display: 'flex', flexDirection: 'column' }}
                    >
                      <div>
                        <label htmlFor="name" className="block text-white font-sans font-medium mb-1.5" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.8125rem, 1.5vh, 0.9375rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>
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
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                          style={{
                            padding: size === 'extraLarge' 
                              ? 'clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)'
                              : 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)',
                            fontSize: size === 'extraLarge' 
                              ? 'clamp(0.875rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                              : 'clamp(0.625rem, 1.125vh, 0.75rem)',
                            borderRadius: size === 'extraLarge' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                              : size === 'large' 
                              ? 'clamp(0.25rem, 0.5vh, 0.375rem)'
                              : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="mt-1 text-red-500"
                            style={{ 
                              marginTop: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.625rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.5rem)' : 'clamp(0.1875rem, 0.375vh, 0.375rem)',
                              fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
                            }}
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-white font-sans font-medium mb-1.5" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.8125rem, 1.5vh, 0.9375rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>
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
                            padding: size === 'extraLarge' 
                              ? 'clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)'
                              : 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)',
                            fontSize: size === 'extraLarge' 
                              ? 'clamp(0.875rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                              : 'clamp(0.625rem, 1.125vh, 0.75rem)',
                            borderRadius: size === 'extraLarge' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                              : size === 'large' 
                              ? 'clamp(0.25rem, 0.5vh, 0.375rem)'
                              : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="mt-1 text-red-500"
                            style={{ 
                              marginTop: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.625rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.5rem)' : 'clamp(0.1875rem, 0.375vh, 0.375rem)',
                              fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
                            }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-white font-sans font-medium mb-1.5" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.8125rem, 1.5vh, 0.9375rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`form-input ${
                            errors.subject ? "border-red-500" : ""
                          }`}
                          disabled={isSubmitting}
                          aria-required="true"
                          aria-invalid={!!errors.subject}
                          aria-describedby={
                            errors.subject ? "subject-error" : undefined
                          }
                          style={{
                            padding: size === 'extraLarge' 
                              ? 'clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)'
                              : 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)',
                            fontSize: size === 'extraLarge' 
                              ? 'clamp(0.875rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                              : 'clamp(0.625rem, 1.125vh, 0.75rem)',
                            borderRadius: size === 'extraLarge' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                              : size === 'large' 
                              ? 'clamp(0.25rem, 0.5vh, 0.375rem)'
                              : 'clamp(0.1875rem, 0.375vh, 0.25rem)',
                            appearance: 'none',
                            cursor: 'pointer',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                          }}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General inquiry</option>
                          <option value="sales">Sales</option>
                          <option value="support">Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && (
                          <p
                            id="subject-error"
                            className="mt-1 text-red-500"
                            style={{ 
                              marginTop: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.625rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.5rem)' : 'clamp(0.1875rem, 0.375vh, 0.375rem)',
                              fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
                            }}
                          >
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-white font-sans font-medium mb-1.5" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.8125rem, 1.5vh, 0.9375rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Your Message"
                          rows={size === 'extraLarge' ? 3 : 4}
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
                            padding: size === 'extraLarge' 
                              ? 'clamp(0.625rem, 1.25vh, 0.75rem) clamp(0.75rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vh, 0.625rem)'
                              : 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.375rem, 0.75vh, 0.5rem)',
                            fontSize: size === 'extraLarge' 
                              ? 'clamp(0.875rem, 1.5vh, 1rem)'
                              : size === 'large' 
                              ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                              : 'clamp(0.625rem, 1.125vh, 0.75rem)',
                            borderRadius: size === 'extraLarge' 
                              ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                              : size === 'large' 
                              ? 'clamp(0.25rem, 0.5vh, 0.375rem)'
                              : 'clamp(0.1875rem, 0.375vh, 0.25rem)',
                            minHeight: size === 'extraLarge' 
                              ? 'clamp(4rem, 8vh, 5rem)'
                              : size === 'large' 
                              ? 'clamp(3rem, 6vh, 4rem)'
                              : 'clamp(2.5rem, 5vh, 3.5rem)'
                          }}
                        ></textarea>
                        {errors.message && (
                          <p
                            id="message-error"
                            className="mt-1 text-red-500"
                            style={{ 
                              marginTop: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.625rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.5rem)' : 'clamp(0.1875rem, 0.375vh, 0.375rem)',
                              fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
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
                          padding: size === 'extraLarge' 
                            ? 'clamp(0.625rem, 1.25vh, 0.75rem) clamp(1rem, 2vh, 1.25rem)'
                            : size === 'large' 
                            ? 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.75rem, 1.5vh, 0.875rem)'
                            : 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.625rem, 1.25vh, 0.75rem)',
                          fontSize: size === 'extraLarge' 
                            ? 'clamp(0.875rem, 1.5vh, 1rem)'
                            : size === 'large' 
                            ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                            : 'clamp(0.625rem, 1.125vh, 0.75rem)'
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div 
                              className="border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"
                              style={{
                                width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                                height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)'
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
                      marginTop: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.5rem, 1vh, 0.75rem)' : 'clamp(0.375rem, 0.75vh, 0.5rem)',
                      paddingTop: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.5rem, 1vh, 0.75rem)' : 'clamp(0.375rem, 0.75vh, 0.5rem)'
                    }}
                  >
                    <div 
                      className="grid grid-cols-3"
                      style={{ gap: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : 'clamp(0.25rem, 0.5vh, 0.375rem)' }}
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                          <Shield weight="thin" size={20} className="text-cta" />
                        </div>
                        <span className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : size === 'large' ? 'clamp(0.5625rem, 1vh, 0.625rem)' : 'clamp(0.5rem, 0.875vh, 0.5625rem)' }}>Secure</span>
                      </div>
                      <div className="text-center">
                        <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                          <Lightning weight="thin" size={20} className="text-cta" />
                        </div>
                        <span className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : size === 'large' ? 'clamp(0.5625rem, 1vh, 0.625rem)' : 'clamp(0.5rem, 0.875vh, 0.5625rem)' }}>
                          Fast Response
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="mx-auto mb-2 p-1 flex items-center justify-center">
                          <Globe weight="thin" size={20} className="text-cta" />
                        </div>
                        <span className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : size === 'large' ? 'clamp(0.5625rem, 1vh, 0.625rem)' : 'clamp(0.5rem, 0.875vh, 0.5625rem)' }}>
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
