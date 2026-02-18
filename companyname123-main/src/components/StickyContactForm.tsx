import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, ChevronUp } from 'lucide-react';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

const StickyContactForm: React.FC = () => {
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

  // Rate limiting configuration
  const RATE_LIMIT_COUNT = 5; // Maximum submissions per time window
  const RATE_LIMIT_WINDOW = 3600000; // Time window in milliseconds (1 hour)

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
      const validatedData = formSchema.parse(formData);

      if (formRef.current) {
        await emailjs.sendForm(
          'service_cq0isqs',
          'template_tzg1evt',
          formRef.current,
          '9DWNVO3rsaMB7nIaq'
        );
      }

      setSubmitCount(prev => prev + 1);
      lastSubmitTime.current = Date.now();

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitStatus('success');

      setTimeout(() => {
        setSubmitStatus('idle');
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      
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
        setTimeout(() => {
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
    <div className="fixed bottom-4 right-4 z-50">
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
                <h2 className="text-lg font-medium text-white">Quick Contact</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-12 h-12 text-[#A6CE39] mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">Message Sent!</p>
                  <p className="text-white/70">We'll get back to you soon.</p>
                </motion.div>
              ) : submitStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">Something went wrong</p>
                  <p className="text-white/70">Please try again later.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email *"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject *"
                      className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message *"
                      rows={4}
                      className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#A6CE39] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7CCCBF] transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
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
            className="bg-[#A6CE39] text-white p-4 rounded-full shadow-lg hover:bg-[#7CCCBF] transition-colors duration-300"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StickyContactForm;