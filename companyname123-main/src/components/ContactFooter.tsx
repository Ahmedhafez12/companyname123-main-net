import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Network, ArrowRight, ExternalLink } from 'lucide-react';

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
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);
  
  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'GitHub', href: '#', icon: 'github' }
  ];
  
  // Footer links
  const footerLinks = [
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'Sitemap', href: '#sitemap' }
  ];
  
  return (
    <div ref={sectionRef} className="w-full flex flex-col justify-center relative overflow-hidden py-8 md:py-0">
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
            <h2 className="text-2xl sm:text-3xl text-white font-sans mb-3">Get in Touch</h2>
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
                  <Mail className="h-4 w-4 text-[#44C8F5]" />
                </div>
                <span className="text-white text-sm">contact@htc.com</span>
              </motion.a>
              
              {/* Phone */}
              <motion.a
                href="tel:+15551234567"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center space-x-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#A6CE39]" />
                </div>
                <span className="text-white text-sm">+1 (555) 123-4567</span>
              </motion.a>
              
              {/* Location */}
              <motion.a
                href="#location"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-transparent border border-white/10 rounded-lg p-4 flex items-center justify-center space-x-3 hover:border-white/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#7CCCBF]" />
                </div>
                <span className="text-white text-sm">123 Tech Street, Innovation City</span>
              </motion.a>
            </div>
            
            {/* Social Media */}
            <div className="flex justify-center space-x-3 mb-8">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -3, scale: 1.1, transition: { duration: 0.2 } }}
                  className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-white hover:border-white/30 transition-colors duration-300"
                  aria-label={link.name}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {link.icon === 'twitter' && (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    )}
                    {link.icon === 'github' && (
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    )}
                    {link.icon === 'linkedin' && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-transparent border border-white/10 rounded-lg p-4 mb-8">
              <h3 className="text-white text-sm font-medium mb-2">Stay Updated</h3>
              <p className="text-white/80 text-xs mb-3">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-lg bg-transparent border-white/20 border border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-[#44C8F5] text-xs"
                />
                <button className="bg-[#44C8F5] px-3 rounded-r-lg hover:bg-[#7CCCBF] transition-colors duration-300 text-white font-medium text-xs flex items-center">
                  <ArrowRight size={14} />
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
              <Network className="h-4 w-4 text-white" />
              <span className="text-xs text-white font-sans">HTC Telecommunications</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-white/70">
              {footerLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span>{link.name}</span>
                  <ExternalLink size={10} className="ml-1 opacity-70" />
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