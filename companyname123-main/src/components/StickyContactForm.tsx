import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PaperPlaneTilt, CheckCircle, WarningCircle, CaretUp } from 'phosphor-react';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { useTranslation, useLocale } from '../i18n';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

const StickyContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitCount, setSubmitCount] = useState(0);
  const lastSubmitTime = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  const RATE_LIMIT_COUNT = 5;
  const RATE_LIMIT_WINDOW = 3600000;

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    if (now - lastSubmitTime.current > RATE_LIMIT_WINDOW) {
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

    if (!checkRateLimit()) {
      setErrors({ message: 'Too many submissions. Please try again later.' });
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
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }

      setSubmitCount(prev => prev + 1);
      lastSubmitTime.current = Date.now();
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
      statusTimeoutRef.current = setTimeout(() => {
        setSubmitStatus('idle');
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus('error');
        statusTimeoutRef.current = setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={`fixed bottom-4 z-50 ${isRTL ? 'left-[0.5in]' : 'right-[0.5in]'}`}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl w-[320px] sm:w-[380px]"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-white">{t.stickyForm.title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <div className="p-1">
                    <X weight="thin" size={20} />
                  </div>
                </button>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="p-2 mx-auto mb-4">
                    <CheckCircle weight="thin" size={20} className="text-cta" />
                  </div>
                  <p className="text-white text-lg mb-2">{t.stickyForm.successTitle}</p>
                  <p className="text-white/70">{t.stickyForm.successMessage}</p>
                </motion.div>
              ) : submitStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="p-2 mx-auto mb-4">
                    <WarningCircle weight="thin" size={20} className="text-red-500" />
                  </div>
                  <p className="text-white text-lg mb-2">{t.stickyForm.errorTitle}</p>
                  <p className="text-white/70">{t.stickyForm.errorMessage}</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.stickyForm.namePlaceholder}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.stickyForm.emailPlaceholder}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.stickyForm.subjectPlaceholder}
                      className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.stickyForm.messagePlaceholder}
                      rows={4}
                      className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cta text-white px-4 py-2 rounded-lg font-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin me-2" />
                        {t.stickyForm.sending}
                      </>
                    ) : (
                      <>
                        <div className="p-0.5 me-2">
                          <PaperPlaneTilt weight="thin" size={20} className={isRTL ? 'rtl-flip' : ''} />
                        </div>
                        {t.stickyForm.submit}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-cta text-white p-4 rounded-full shadow-lg hover:bg-accent transition-colors duration-300"
          >
            <div className="p-1">
              <CaretUp weight="thin" size={20} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StickyContactForm;
