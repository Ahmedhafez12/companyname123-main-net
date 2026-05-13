import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Envelope,
  Phone,
  MapPin,
  ShareNetwork,
  ArrowRight,
  ArrowSquareOut,
} from "phosphor-react";
import { useLocale, useTranslation } from "../i18n";

const ContactFooter: React.FC = () => {
  const { isRTL } = useLocale();
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  // Adjust height based on viewport for snap-scroll
  useEffect(() => {
    const adjustHeight = () => {
      if (sectionRef.current) {
        const viewportHeight = window.innerHeight;
        sectionRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);


  const footerLinks = t.footer.legalItems;

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col justify-center relative overflow-hidden py-8 md:py-0"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10 bg-transparent flex-grow flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl text-white font-sans mb-3">
              {t.footer.contactHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8">
              {t.footer.contactSubtitle}
            </p>

            {/* Contact Info Cards */}
            <div className="grid gap-3 mb-8">
              {/* Email */}
              <motion.a
                href="mailto:htc@hajztel.com.sa"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center gap-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center flex-shrink-0">
                  <div className="p-0.5">
                    <Envelope weight="thin" size={20} className="text-cta" />
                  </div>
                </div>
                <span className="text-white text-sm">htc@hajztel.com.sa</span>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+966114059419"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center gap-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-cta" />
                </div>
                <span dir="ltr" className="text-white text-sm">+966 11 4059419</span>
              </motion.a>

              {/* Location */}
              <motion.a
                href="#location"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center gap-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-cta" />
                </div>
                <span className="text-white text-sm">{t.footer.contactInfo[2].text}</span>
              </motion.a>
            </div>


            {/* Newsletter Signup */}
            <div className="bg-transparent border border-white/10 rounded-lg p-4 mb-8">
              <h3 className="text-white text-sm font-medium mb-2">
                {t.footer.newsletterHeading}
              </h3>
              <p className="text-white/80 text-xs mb-3">
                {t.footer.newsletterSubtitle}
              </p>
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""}`}>
                <input
                  type="email"
                  placeholder={t.footer.newsletterPlaceholder}
                  className={`flex-1 px-3 py-2 bg-transparent border-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs ${isRTL ? "rounded-r-lg border-l-0" : "rounded-l-lg border-r-0"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <button className={`bg-cta px-3 hover:bg-accent transition-colors duration-300 text-white font-medium text-xs flex items-center ${isRTL ? "rounded-l-lg" : "rounded-r-lg"}`}>
                  <div className="p-0.5">
                    <ArrowRight weight="thin" size={20} className={isRTL ? "rtl-flip" : ""} />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-auto border-t border-white/10 pt-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-0.5">
                <ShareNetwork weight="thin" size={20} className="text-white" />
              </div>
              <span className="text-xs text-white font-sans">
                {t.footer.companyName}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/70">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <span>{link.name}</span>
                  <div className="p-0.5 opacity-70">
                    <ArrowSquareOut weight="thin" size={20} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white/60 text-xs">
              &copy; {currentYear} {t.footer.copyright}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default ContactFooter;
