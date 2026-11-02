import React, { useEffect, useRef, useState } from 'react';
import PageSEO from '../utils/PageSEO';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Envelope,
  Headset,
  MapPin,
  NavigationArrow,
  PaperPlaneTilt,
  Phone,
  Shield,
  User,
} from 'phosphor-react';
import { z } from 'zod';
import Footer from '../components/Footer';
import { useTranslation, useLocale } from '../i18n';
import { C, EASE, Eyebrow, GradientText, SectionTitle, pad, reveal } from '../components/solutions/SolutionKit';

/* ─── form schema ─── */
const formSchema = z.object({
  name: z.string().min(1, '__name__'),
  email: z.string().email('__email__'),
  subject: z.string().min(1, '__subject__'),
  message: z.string().min(1, '__message__'),
});
type FormData = z.infer<typeof formSchema>;

const EMAIL = 'htc@hajztel.com.sa';
const PHONE_HREF = 'tel:+966114059419';
const HERO_IMAGE = '/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_3245f7ce8c.jpeg';
const MAP_QUERY = 'Prince Abdulaziz bin Musaid bin Jalawi St, Riyadh, Saudi Arabia';

/* ─── Contact channel card (hero) ─── */
function ChannelCard({
  icon,
  label,
  value,
  href,
  accent,
  copyValue,
  valueDir,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: string;
  copyValue?: string;
  valueDir?: 'ltr';
  index: number;
}) {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const [copied, setCopied] = useState(false);
  const Arrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  const copy = async () => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <motion.div
      {...reveal(0.3 + index * 0.1, 24)}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-6 sm:p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
      style={{
        background: 'linear-gradient(160deg, rgba(0,94,150,0.45), rgba(0,44,61,0.92))',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 40px 80px -40px rgba(0,0,0,0.7)',
      }}
    >
      <div aria-hidden className="absolute -top-16 -end-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" style={{ background: accent }} />
      <div className="relative flex items-center justify-between mb-8">
        <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${accent}1F`, color: accent, border: `1px solid ${accent}40` }}>
          {icon}
        </span>
        <span className="font-sans text-xs font-semibold tabular-nums text-white/35">{pad(index + 1)}</span>
      </div>
      <span className="relative block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">{label}</span>
      <span dir={valueDir} className="relative block font-sans font-semibold text-white text-base sm:text-lg leading-snug mb-6 break-words">
        {value}
      </span>
      <div className="relative mt-auto flex items-center gap-2">
        {href && (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 min-h-0 font-sans text-xs font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={{ background: accent === C.cta ? C.cta : `${accent}33`, border: `1px solid ${accent}66` }}
          >
            {label}
            <Arrow weight="bold" size={13} />
          </a>
        )}
        {copyValue && (
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 min-h-0 min-w-0 font-sans text-xs font-semibold border border-white/15 text-white/75 hover:text-white hover:border-white/30 transition-colors"
            aria-live="polite"
          >
            {copied ? <Check weight="bold" size={13} style={{ color: C.cta }} /> : <Copy weight="bold" size={13} />}
            {copied ? t.contactPage.copied : t.contactPage.copy}
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── component ─── */
function ContactPage() {
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const cp = t.contactPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitCount, setSubmitCount] = useState(0);
  const lastSubmitTime = useRef<number>(0);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  const setField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setField(e.target.name as keyof FormData, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const now = Date.now();
    if (now - lastSubmitTime.current < 3600000 && submitCount >= 5) {
      setErrors({ message: t.contactValidation.tooManySubmissions });
      setIsSubmitting(false);
      return;
    }

    const validationMessages: Record<string, string> = {
      __name__: t.contactValidation.nameRequired,
      __email__: t.contactValidation.emailInvalid,
      __subject__: t.contactValidation.subjectRequired,
      __message__: t.contactValidation.messageRequired,
    };

    try {
      formSchema.parse(formData);

      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');

      setSubmitCount((prev) => prev + 1);
      lastSubmitTime.current = Date.now();
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
      statusTimeoutRef.current = setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            const key = err.path[0] as keyof FormData;
            fieldErrors[key] = validationMessages[err.message] ?? err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus('error');
        statusTimeoutRef.current = setTimeout(() => setSubmitStatus('idle'), 6000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── shared input classes ─── */
  const inputBase = [
    'w-full rounded-xl bg-white/[0.05] border border-white/[0.12]',
    'text-white placeholder-white/30 outline-none font-body',
    'px-4 py-3.5 text-[0.9375rem]',
    'transition-all duration-300',
    'focus:border-[#A6CE39]/70 focus:bg-white/[0.07]',
    'focus:shadow-[0_0_0_4px_rgba(166,206,57,0.12)]',
    'hover:border-white/25',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' ');
  const labelClass = 'block mb-2 font-sans text-white/60 text-xs font-semibold uppercase tracking-[0.14em]';
  const errorClass = 'mt-1.5 font-body text-red-400 text-xs';

  const [emailCard, phoneCard, locationCard] = cp.infoCards;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
  const PROMISE_ICONS = [Shield, Clock, Headset];
  const subjects = cp.subjectOptions.filter((o) => o.value);

  return (
    <div className="relative">
      <PageSEO
        title={cp.seoTitle}
        description={cp.seoDescription}
        path={localePath('/contact')}
        breadcrumbs={[
          { name: t.common.home, path: localePath('/') },
          { name: cp.eyebrow, path: localePath('/contact') },
        ]}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none -z-10" />

      {/* ━━━ HERO ━━━ */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="eager" decoding="async" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.bg}F7 0%, ${C.bg}D9 45%, ${C.bg}80 100%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bg}80 0%, transparent 30%, transparent 55%, ${C.bg}00 100%)` }} />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: `linear-gradient(${isRTL ? '270deg' : '90deg'}, #000, transparent 60%)`,
              WebkitMaskImage: `linear-gradient(${isRTL ? '270deg' : '90deg'}, #000, transparent 60%)`,
            }}
          />
        </div>

        <div className="relative page-container">
          <div className="max-w-3xl xl:max-w-4xl 3xl:max-w-5xl">
            <motion.div {...reveal(0, 16)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md px-3.5 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: C.cta }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.cta }} />
              </span>
              <span className="font-sans text-xs sm:text-sm font-medium text-white/85">{cp.eyebrow}</span>
            </motion.div>
            <motion.h1
              {...reveal(0.08)}
              className="font-sans font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 1rem + 5.4vw, 6.75rem)', lineHeight: 1, letterSpacing: '-0.035em' }}
            >
              {cp.headline}
              <GradientText>{cp.headlineHighlight}</GradientText>
            </motion.h1>
            <motion.p {...reveal(0.16)} className="font-body text-white/75 text-base sm:text-lg 3xl:text-xl leading-relaxed max-w-xl">
              {cp.subtitle}
            </motion.p>
            <motion.div {...reveal(0.24)} className="mt-8 flex flex-wrap gap-2">
              {cp.promises.map((p, i) => {
                const Icon = PROMISE_ICONS[i] ?? Shield;
                return (
                  <span key={p.title} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-4 py-2 font-body text-xs sm:text-sm text-white/80">
                    <Icon weight="duotone" size={16} style={{ color: C.cta }} />
                    {p.title}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Channels */}
          <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            <ChannelCard index={0} icon={<Envelope weight="duotone" size={24} />} label={emailCard.title} value={emailCard.text} href={`mailto:${EMAIL}`} copyValue={EMAIL} accent={C.accent} />
            <ChannelCard index={1} icon={<Phone weight="duotone" size={24} />} label={phoneCard.title} value={phoneCard.text} href={PHONE_HREF} copyValue={phoneCard.text} accent={C.secondary} valueDir="ltr" />
            <ChannelCard index={2} icon={<MapPin weight="duotone" size={24} />} label={locationCard.title} value={locationCard.text} href={mapsLink} accent={C.cta} />
          </div>
        </div>
      </section>

      {/* ━━━ FORM + EXPECTATIONS ━━━ */}
      <section id="contact-form" className="relative py-16 md:py-24 scroll-mt-20">
        <div className="page-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div {...reveal()}>
              <Eyebrow index="01" label={cp.eyebrow} />
              <SectionTitle lead={cp.reachUsTitle} />
              <p className="mt-4 font-body text-white/65 text-base sm:text-lg 3xl:text-xl leading-relaxed">{cp.reachUsBody}</p>
            </motion.div>

            <motion.div {...reveal(0.1)} className="mt-10">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 mb-5">{cp.whatToExpectLabel}</span>
              <ol className="relative">
                <span aria-hidden className="absolute top-2 bottom-2 start-[19px] w-px bg-gradient-to-b from-[#A6CE39] via-[#7CCCBF]/50 to-transparent" />
                {cp.whatToExpectSteps.map((step, i) => (
                  <li key={i} className="relative flex items-start gap-5 pb-6 last:pb-0">
                    <span
                      className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm font-bold"
                      style={{ background: C.bg, color: C.cta, border: `2px solid ${C.cta}`, boxShadow: `0 0 0 5px ${C.bg}80` }}
                    >
                      {i + 1}
                    </span>
                    <p className="pt-2 font-body text-sm sm:text-[0.95rem] text-white/75 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div {...reveal(0.15)} className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              {cp.promises.map((p, i) => {
                const Icon = PROMISE_ICONS[i] ?? Shield;
                return (
                  <div key={p.title} className="rounded-2xl border border-white/10 p-4" style={{ background: 'linear-gradient(160deg, rgba(0,94,150,0.35), rgba(0,44,61,0.8))', backdropFilter: 'blur(10px)' }}>
                    <Icon weight="duotone" size={20} style={{ color: C.accent }} />
                    <div className="mt-3 font-sans font-semibold text-white text-sm">{p.title}</div>
                    <div className="mt-1 font-body text-xs text-white/65 leading-relaxed">{p.text}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/10"
              style={{
                background: 'linear-gradient(160deg, rgba(0,94,150,0.35) 0%, rgba(0,44,61,0.85) 60%)',
                backdropFilter: 'blur(16px)',
                boxShadow: `0 50px 100px -40px rgba(0,0,0,0.65), 0 0 140px -60px ${C.secondary}80`,
              }}
            >
              <div aria-hidden className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${C.secondary}, ${C.accent}, ${C.cta})` }} />
              <div aria-hidden className="absolute -top-24 -end-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: C.secondary }} />

              <div className="relative p-6 sm:p-9 lg:p-11">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-sans font-bold text-white text-2xl sm:text-[1.75rem] leading-tight">{cp.formTitle}</h2>
                    <p className="mt-1.5 font-body text-sm text-white/50">{cp.formFieldsNote}</p>
                  </div>
                  <span className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl items-center justify-center" style={{ background: `${C.cta}1F`, color: C.cta, border: `1px solid ${C.cta}40` }}>
                    <PaperPlaneTilt weight="duotone" size={24} />
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                      <motion.div
                        initial={{ scale: 0.5, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                        style={{ background: `${C.cta}1F`, border: `1px solid ${C.cta}55`, boxShadow: `0 0 60px ${C.cta}40` }}
                      >
                        <CheckCircle weight="duotone" size={40} style={{ color: C.cta }} />
                      </motion.div>
                      <h3 className="font-sans font-bold text-white text-2xl mb-2">{cp.successTitle}</h3>
                      <p className="font-body text-white/60 max-w-sm mx-auto">{cp.successMessage}</p>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div key="error" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                      <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/25 mx-auto mb-6 flex items-center justify-center">
                        <Shield weight="duotone" size={40} className="text-red-400" />
                      </div>
                      <h3 className="font-sans font-bold text-white text-2xl mb-2">{t.common.errorTitle}</h3>
                      <p className="font-body text-white/60 max-w-sm mx-auto">{t.common.errorMessage}</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" ref={formRef} onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="cp-name" className={labelClass}>
                            {cp.namePlaceholder}
                          </label>
                          <div className="relative">
                            <User weight="duotone" size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                            <input
                              type="text"
                              id="cp-name"
                              name="name"
                              autoComplete="name"
                              value={formData.name}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              aria-invalid={Boolean(errors.name)}
                              className={`${inputBase} ps-11 ${errors.name ? '!border-red-400/70' : ''}`}
                            />
                          </div>
                          {errors.name && <p className={errorClass}>{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="cp-email" className={labelClass}>
                            {cp.emailPlaceholder}
                          </label>
                          <div className="relative">
                            <Envelope weight="duotone" size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                            <input
                              type="email"
                              id="cp-email"
                              name="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              aria-invalid={Boolean(errors.email)}
                              className={`${inputBase} ps-11 ${errors.email ? '!border-red-400/70' : ''}`}
                            />
                          </div>
                          {errors.email && <p className={errorClass}>{errors.email}</p>}
                        </div>
                      </div>

                      {/* Subject chips */}
                      <div>
                        <span id="cp-subject-label" className={labelClass}>
                          {cp.subjectFieldLabel}
                        </span>
                        <div role="radiogroup" aria-labelledby="cp-subject-label" className="flex flex-wrap gap-2">
                          {subjects.map(({ value, label }) => {
                            const selected = formData.subject === value;
                            return (
                              <button
                                key={value}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                disabled={isSubmitting}
                                onClick={() => setField('subject', value)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 min-h-0 font-body text-sm border transition-all duration-300 ${
                                  selected
                                    ? 'text-white border-transparent shadow-[0_8px_24px_-8px_rgba(166,206,57,0.6)]'
                                    : `text-white/70 bg-white/[0.04] hover:text-white hover:border-white/30 ${errors.subject ? 'border-red-400/60' : 'border-white/15'}`
                                }`}
                                style={selected ? { background: C.cta } : undefined}
                              >
                                {selected && <Check weight="bold" size={14} />}
                                {label}
                              </button>
                            );
                          })}
                        </div>
                        {errors.subject && <p className={errorClass}>{errors.subject}</p>}
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between">
                          <label htmlFor="cp-message" className={labelClass}>
                            {cp.messageFieldLabel}
                          </label>
                          <span className="font-sans text-[11px] tabular-nums text-white/35">{formData.message.length}</span>
                        </div>
                        <textarea
                          id="cp-message"
                          name="message"
                          placeholder={cp.messagePlaceholder}
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          aria-invalid={Boolean(errors.message)}
                          className={`${inputBase} resize-none leading-relaxed ${errors.message ? '!border-red-400/70' : ''}`}
                        />
                        {errors.message && <p className={errorClass}>{errors.message}</p>}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 min-h-0 font-sans font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(166,206,57,0.55)] disabled:opacity-60 disabled:cursor-not-allowed sm:min-w-[14rem]"
                          style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.accent})` }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              {cp.sending}
                            </>
                          ) : (
                            <>
                              {cp.submit}
                              <span className={`inline-flex transition-transform duration-300 group-hover:-translate-y-0.5 ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                                <PaperPlaneTilt weight="bold" size={18} className={isRTL ? 'rtl-flip' : ''} />
                              </span>
                            </>
                          )}
                        </button>
                        <p className="flex items-start gap-2 font-body text-xs text-white/45 leading-relaxed">
                          <Shield weight="duotone" size={15} className="flex-shrink-0 mt-px" style={{ color: C.accent }} />
                          {cp.privacyNote}
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ LOCATION ━━━ */}
      <section className="relative pb-20 md:pb-28">
        <div className="page-container">
          <motion.div
            {...reveal()}
            className="relative overflow-hidden rounded-[2.25rem] border border-white/10 h-[520px] sm:h-[480px] lg:h-[520px] 3xl:h-[640px]"
            style={{ background: C.bg, boxShadow: '0 50px 100px -40px rgba(0,0,0,0.6)' }}
          >
            <iframe
              title={cp.placeHeading}
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.95) contrast(0.9)' }}
            />
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${C.bg}E6 0%, ${C.bg}80 35%, transparent 65%)` }} />

            <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:start-8 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[24rem]">
              <div className="rounded-[1.75rem] border border-white/15 bg-[#002C3D]/85 backdrop-blur-xl p-6 sm:p-8" style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
                <Eyebrow index="02" label={cp.locationShort} />
                <h2 className="font-sans font-bold text-white text-2xl sm:text-3xl leading-tight mb-3">{cp.placeHeading}</h2>
                <p className="flex items-start gap-2.5 font-body text-sm text-white/70 leading-relaxed mb-6">
                  <MapPin weight="duotone" size={18} className="flex-shrink-0 mt-0.5" style={{ color: C.cta }} />
                  {locationCard.text}
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  <NavigationArrow weight="bold" size={16} className={isRTL ? 'rtl-flip' : ''} />
                  {cp.getDirections}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
