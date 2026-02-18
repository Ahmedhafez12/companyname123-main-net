import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
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
}

const ContactSection: React.FC<ContactSectionProps> = ({ size = 'normal' }) => {
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

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col justify-center relative overflow-hidden"
      style={{
        padding: size === 'extraLarge' 
          ? 'clamp(1rem, 2vh, 1.5rem) 0'
          : size === 'large' 
          ? 'clamp(0.5rem, 1vh, 0.75rem) 0'
          : 'clamp(0.5rem, 1vh, 0.75rem) 0'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start" style={{ gap: size === 'extraLarge' ? 'clamp(1.5rem, 3vh, 2rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.75rem, 1.5vh, 1rem)' }}>
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white font-sans mb-3" style={{ 
                fontSize: size === 'extraLarge' 
                  ? 'clamp(1.5rem, 3vh, 2.25rem)'
                  : size === 'large' 
                  ? 'clamp(1rem, 2vh, 1.5rem)'
                  : 'clamp(0.875rem, 1.75vh, 1.25rem)',
                marginBottom: size === 'extraLarge' 
                  ? 'clamp(0.75rem, 1.5vh, 1rem)'
                  : size === 'large' 
                  ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                  : 'clamp(0.25rem, 0.5vh, 0.375rem)'
              }}>
                Get in Touch
              </h2>
              <p className="text-white/80 mb-8" style={{ 
                fontSize: size === 'extraLarge' 
                  ? 'clamp(1rem, 1.75vh, 1.125rem)'
                  : size === 'large' 
                  ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)'
                  : 'clamp(0.625rem, 1.125vh, 0.75rem)',
                marginBottom: size === 'extraLarge' 
                  ? 'clamp(1.5rem, 3vh, 2rem)'
                  : size === 'large' 
                  ? 'clamp(0.75rem, 1.5vh, 1rem)'
                  : 'clamp(0.5rem, 1vh, 0.75rem)',
                lineHeight: '1.4'
              }}>
                Have questions about our solutions? We're here to help you find
                the perfect telecommunications solution for your needs.
              </p>

              {/* Contact Info Cards */}
              <div style={{ gap: size === 'extraLarge' ? 'clamp(0.75rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : 'clamp(0.25rem, 0.5vh, 0.375rem)', display: 'flex', flexDirection: 'column' }}>
                {/* Email */}
                <motion.a
                  href="mailto:contact@example.com"
                  whileHover={{ x: 5 }}
                  className="relative bg-[#005E96]/30 border border-white/10 rounded-lg flex items-center hover:border-white/30 transition-colors duration-300"
                  style={{
                    padding: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.5rem, 1vh, 0.625rem)'
                      : 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    gap: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)',
                    borderRadius: size === 'extraLarge' 
                      ? 'clamp(0.625rem, 1.25vh, 0.75rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)'
                  }}
                >
                  <div 
                    className="rounded-full bg-transparent border border-white/20 flex items-center justify-center"
                    style={{
                      width: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      height: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minWidth: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minHeight: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)'
                    }}
                  >
                    <Mail className="text-[#44C8F5]" style={{ width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)', height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)' }} />
                  </div>
                  <div>
                    <div className="text-white/60" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : size === 'large' ? 'clamp(0.625rem, 1vh, 0.75rem)' : 'clamp(0.5625rem, 1vh, 0.6875rem)' }}>Email Us</div>
                    <div className="text-white" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : 'clamp(0.625rem, 1.125vh, 0.75rem)' }}>contact@example.com</div>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:+15551234567"
                  whileHover={{ x: 5 }}
                  className="relative bg-[#005E96]/30 border border-white/10 rounded-lg flex items-center hover:border-white/30 transition-colors duration-300"
                  style={{
                    padding: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.5rem, 1vh, 0.625rem)'
                      : 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    gap: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)',
                    borderRadius: size === 'extraLarge' 
                      ? 'clamp(0.625rem, 1.25vh, 0.75rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)'
                  }}
                >
                  <div 
                    className="rounded-full bg-transparent border border-white/20 flex items-center justify-center"
                    style={{
                      width: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      height: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minWidth: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minHeight: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)'
                    }}
                  >
                    <Phone className="text-[#A6CE39]" style={{ width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)', height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)' }} />
                  </div>
                  <div>
                    <div className="text-white/60" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : size === 'large' ? 'clamp(0.625rem, 1vh, 0.75rem)' : 'clamp(0.5625rem, 1vh, 0.6875rem)' }}>Call Us</div>
                    <div className="text-white" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : 'clamp(0.625rem, 1.125vh, 0.75rem)' }}>+1 (555) 123-4567</div>
                  </div>
                </motion.a>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="relative bg-[#005E96]/30 border border-white/10 rounded-lg flex items-center"
                  style={{
                    padding: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.5rem, 1vh, 0.625rem)'
                      : 'clamp(0.375rem, 0.75vh, 0.5rem)',
                    gap: size === 'extraLarge' 
                      ? 'clamp(0.75rem, 1.5vh, 1rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)',
                    borderRadius: size === 'extraLarge' 
                      ? 'clamp(0.625rem, 1.25vh, 0.75rem)'
                      : size === 'large' 
                      ? 'clamp(0.375rem, 0.75vh, 0.5rem)'
                      : 'clamp(0.25rem, 0.5vh, 0.375rem)'
                  }}
                >
                  <div 
                    className="rounded-full bg-transparent border border-white/20 flex items-center justify-center"
                    style={{
                      width: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      height: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minWidth: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)',
                      minHeight: size === 'extraLarge' 
                        ? 'clamp(2rem, 4vh, 2.5rem)'
                        : size === 'large' 
                        ? 'clamp(1.5rem, 3vh, 2rem)'
                        : 'clamp(1.25rem, 2.5vh, 1.75rem)'
                    }}
                  >
                    <MapPin className="text-[#7CCCBF]" style={{ width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)', height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)' }} />
                  </div>
                  <div>
                    <div className="text-white/60" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.75rem, 1.25vh, 0.875rem)' : size === 'large' ? 'clamp(0.625rem, 1vh, 0.75rem)' : 'clamp(0.5625rem, 1vh, 0.6875rem)' }}>Visit Us</div>
                    <div className="text-white" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.875rem, 1.5vh, 1rem)' : size === 'large' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : 'clamp(0.625rem, 1.125vh, 0.75rem)' }}>
                      123 Tech Street, Innovation City
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="bg-[#005E96]/30 backdrop-blur-[2px] border border-white/10 rounded-xl relative overflow-hidden"
                style={{
                  padding: size === 'extraLarge' 
                    ? 'clamp(1.25rem, 2.5vh, 1.75rem)'
                    : size === 'large' 
                    ? 'clamp(0.75rem, 1.5vh, 1rem)'
                    : 'clamp(0.5rem, 1vh, 0.75rem)',
                  borderRadius: size === 'extraLarge' 
                    ? 'clamp(0.75rem, 1.5vh, 1rem)'
                    : size === 'large' 
                    ? 'clamp(0.5rem, 1vh, 0.75rem)'
                    : 'clamp(0.375rem, 0.75vh, 0.5rem)'
                }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#005E96]/30 via-[#44C8F5]/30 to-[#005E96]/30 animate-gradient-x"></div>
                </div>

                <div className="relative">
                  <h3 
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
                  </h3>

                  {submitStatus === "success" ? (
                    <div className="text-center" style={{ padding: size === 'extraLarge' ? 'clamp(2rem, 4vh, 2.5rem) 0' : size === 'large' ? 'clamp(1.5rem, 3vh, 2rem) 0' : 'clamp(1rem, 2vh, 1.5rem) 0' }}>
                      <div 
                        className="bg-[#A6CE39]/20 rounded-full flex items-center justify-center mx-auto mb-4"
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
                        <Shield className="text-[#A6CE39]" style={{ width: size === 'extraLarge' ? 'clamp(2.25rem, 4.5vh, 2.75rem)' : size === 'large' ? 'clamp(1.75rem, 3.5vh, 2.25rem)' : 'clamp(1.25rem, 2.5vh, 1.75rem)', height: size === 'extraLarge' ? 'clamp(2.25rem, 4.5vh, 2.75rem)' : size === 'large' ? 'clamp(1.75rem, 3.5vh, 2.25rem)' : 'clamp(1.25rem, 2.5vh, 1.75rem)' }} />
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
                        <Shield className="text-red-500" style={{ width: size === 'extraLarge' ? 'clamp(2.25rem, 4.5vh, 2.75rem)' : size === 'large' ? 'clamp(1.75rem, 3.5vh, 2.25rem)' : 'clamp(1.25rem, 2.5vh, 1.75rem)', height: size === 'extraLarge' ? 'clamp(2.25rem, 4.5vh, 2.75rem)' : size === 'large' ? 'clamp(1.75rem, 3.5vh, 2.25rem)' : 'clamp(1.25rem, 2.5vh, 1.75rem)' }} />
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
                        <label htmlFor="name" className="sr-only">
                          Your Name
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
                        <label htmlFor="email" className="sr-only">
                          Your Email
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
                        <label htmlFor="subject" className="sr-only">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
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
                              : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
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
                        <label htmlFor="message" className="sr-only">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Your Message"
                          rows={4}
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
                            <ArrowRight
                              size={16}
                              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              style={{ width: size === 'extraLarge' ? 'clamp(14px, 1.5vh, 16px)' : size === 'large' ? 'clamp(10px, 1vh, 12px)' : 'clamp(8px, 0.875vh, 10px)', height: size === 'extraLarge' ? 'clamp(14px, 1.5vh, 16px)' : size === 'large' ? 'clamp(10px, 1vh, 12px)' : 'clamp(8px, 0.875vh, 10px)', marginLeft: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vw, 0.5rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vw, 0.375rem)' : 'clamp(0.1875rem, 0.375vw, 0.25rem)' }}
                            />
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
                        <Shield
                          className="mx-auto mb-2 text-[#A6CE39]"
                          style={{ 
                            width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            marginBottom: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.375rem)' : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
                        <span className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : size === 'large' ? 'clamp(0.5625rem, 1vh, 0.625rem)' : 'clamp(0.5rem, 0.875vh, 0.5625rem)' }}>Secure</span>
                      </div>
                      <div className="text-center">
                        <Zap
                          className="mx-auto mb-2 text-[#44C8F5]"
                          style={{ 
                            width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            marginBottom: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.375rem)' : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
                        <span className="text-white/70" style={{ fontSize: size === 'extraLarge' ? 'clamp(0.6875rem, 1.25vh, 0.8125rem)' : size === 'large' ? 'clamp(0.5625rem, 1vh, 0.625rem)' : 'clamp(0.5rem, 0.875vh, 0.5625rem)' }}>
                          Fast Response
                        </span>
                      </div>
                      <div className="text-center">
                        <Globe
                          className="mx-auto mb-2 text-[#7CCCBF]"
                          style={{ 
                            width: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            height: size === 'extraLarge' ? 'clamp(1rem, 2vh, 1.25rem)' : size === 'large' ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.625rem, 1.25vh, 0.875rem)',
                            marginBottom: size === 'extraLarge' ? 'clamp(0.375rem, 0.75vh, 0.5rem)' : size === 'large' ? 'clamp(0.25rem, 0.5vh, 0.375rem)' : 'clamp(0.1875rem, 0.375vh, 0.25rem)'
                          }}
                        />
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
      </div>
    </div>
  );
};

export default ContactSection;
