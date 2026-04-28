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

const ContactFooter: React.FC = () => {
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


  // Footer links
  const footerLinks = [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Sitemap", href: "#sitemap" },
  ];

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
              Get in Touch
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8">
              Have questions about our solutions? We're here to help.
            </p>

            {/* Contact Info Cards */}
            <div className="grid gap-3 mb-8">
              {/* Email */}
              <motion.a
                href="mailto:contact@htc.com"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center space-x-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                  <div className="p-0.5">
                    <Envelope weight="thin" size={20} className="text-cta" />
                  </div>
                </div>
                <span className="text-white text-sm">contact@htc.com</span>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+966114059419"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center space-x-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-cta" />
                </div>
                <span className="text-white text-sm">+966 11 405 9419</span>
              </motion.a>

              {/* Location */}
              <motion.a
                href="#location"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center space-x-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-cta" />
                </div>
                <span className="text-white text-sm">Riyadh, Saudi Arabia</span>
              </motion.a>
            </div>


            {/* Newsletter Signup */}
            <div className="bg-transparent border border-white/10 rounded-lg p-4 mb-8">
              <h3 className="text-white text-sm font-medium mb-2">
                Stay Updated
              </h3>
              <p className="text-white/80 text-xs mb-3">
                Subscribe to our newsletter for the latest updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-lg bg-transparent border-white/20 border border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs"
                />
                <button className="bg-cta px-3 rounded-r-lg hover:bg-accent transition-colors duration-300 text-white font-medium text-xs flex items-center">
                  <div className="p-0.5">
                    <ArrowRight weight="thin" size={20} />
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
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-3 sm:mb-0">
              <div className="p-0.5">
                <ShareNetwork weight="thin" size={20} className="text-white" />
              </div>
              <span className="text-xs text-white font-sans">
                HTC Telecommunications
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-white/70">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span>{link.name}</span>
                  <div className="p-0.5 ml-1 opacity-70">
                    <ArrowSquareOut weight="thin" size={20} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white/60 text-xs">
              &copy; {currentYear} HTC. All rights reserved.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default ContactFooter;
