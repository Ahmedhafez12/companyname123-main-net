import React from "react";
import { motion } from "framer-motion";
import { Envelope, Phone, MapPin, ArrowRight, ArrowUpRight } from "phosphor-react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Logo from "./Logo";

// ── Reusable NavLink ──────────────────────────────────────────────────────────
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link
      to={href}
      className="group flex items-center gap-1.5 text-[#ECF0F1]/60 hover:text-[#44C8F5] text-xs transition-colors duration-200"
    >
      <ArrowRight
        weight="bold"
        size={10}
        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
      />
      {children}
    </Link>
  </li>
);

// ── Column heading ────────────────────────────────────────────────────────────
const ColHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[#ECF0F1] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
    {children}
  </h3>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about/overview" },
    { name: "Our Customers", href: "/customers" },
    { name: "Our Partners", href: "/partners" },
    { name: "Contact Us", href: "/contact" },
  ];

  const aboutUsAnchors = [
    { name: "What We Do", href: "/about/overview#what-we-do" },
    { name: "Company Identity", href: "/about/overview#company-identity" },
    { name: "Competitive Edge", href: "/about/overview#competitive-edge" },
    { name: "Our Journey", href: "/about/overview#our-journey" },
    { name: "Vision & Mission", href: "/about/overview#vision-mission" },
    { name: "Core Strengths", href: "/about/overview#core-strengths" },
  ];

  const telecomLinks = [
    { name: "Service Portfolio", href: "/what-we-do/telecommunications#service-portfolio" },
    { name: "Business Unit", href: "/what-we-do/telecommunications#business-unit" },
    { name: "Service Standards", href: "/what-we-do/telecommunications#service-Standards" },
  ];

  const commandLinks = [
    { name: "Core Solutions", href: "/what-we-do/command-control#core-solutions" },
    { name: "Technology Stack", href: "/what-we-do/command-control#tech-stack" },
    { name: "Industries We Serve", href: "/what-we-do/command-control#industries-served" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  const contactInfo = [
    { icon: Envelope, text: "contact@example.com", href: "mailto:contact@example.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Tech Street, Innovation City", href: null },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/yourprofile", label: "Facebook" },
    { icon: FaTwitter, href: "https://www.twitter.com/yourprofile", label: "Twitter" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/yourprofile", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/yourprofile", label: "Instagram" },
  ];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <footer className="relative w-full bg-[#002C3D] border-t border-white/10 overflow-hidden">

      {/* Subtle ambient glow — top-left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #44C8F5, transparent 70%)" }}
      />
      {/* Subtle ambient glow — bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #A6CE39, transparent 70%)" }}
      />

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="relative container mx-auto px-6 sm:px-8 pt-14 pb-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">

          {/* ── Brand column ── */}
          <motion.div {...fadeUp(0)} className="lg:col-span-3 flex flex-col gap-5">
            <Link to="/" className="inline-block self-start" aria-label="Hajz Telecommunication home">
              <Logo
                className="h-14 sm:h-16 w-auto max-w-[min(100%,260px)]"
                textColorOverride="#ECF0F1"
              />
            </Link>

            <p className="text-[#ECF0F1]/60 text-xs leading-relaxed max-w-[220px]">
              Leading the telecommunications revolution with innovative solutions and
              unparalleled expertise in global connectivity.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#ECF0F1]/50 hover:text-[#44C8F5] hover:border-[#44C8F5]/40 transition-all duration-200"
                >
                  <s.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Link columns ── */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">

            {/* Quick Links */}
            <motion.div {...fadeUp(0.08)}>
              <ColHeading>Quick Links</ColHeading>
              <ul className="space-y-2.5">
                {quickLinks.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
              </ul>
            </motion.div>

            {/* About Us */}
            <motion.div {...fadeUp(0.14)}>
              <ColHeading>About Us</ColHeading>
              <ul className="space-y-2.5">
                {aboutUsAnchors.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
              </ul>
            </motion.div>

            {/* Telecommunications */}
            <motion.div {...fadeUp(0.2)}>
              <ColHeading>Telecom</ColHeading>
              <ul className="space-y-2.5">
                {telecomLinks.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
              </ul>

              {/* Command & Control nested below Telecom on this column */}
              <div className="mt-6">
                <ColHeading>Command & Control</ColHeading>
                <ul className="space-y-2.5">
                  {commandLinks.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
                </ul>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div {...fadeUp(0.26)}>
              <ColHeading>Contact</ColHeading>
              <ul className="space-y-3">
                {contactInfo.map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-[#ECF0F1]/60 text-xs">
                    <item.icon weight="thin" size={14} className="flex-shrink-0 mt-0.5 text-[#44C8F5]/60" />
                    {item.href ? (
                      <a href={item.href} className="hover:text-[#44C8F5] transition-colors duration-200 leading-relaxed">
                        {item.text}
                      </a>
                    ) : (
                      <span className="leading-relaxed">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div {...fadeUp(0.32)}>
              <ColHeading>Legal</ColHeading>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
              </ul>
            </motion.div>

          </div>
        </div>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="mt-10 mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.38)}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[#ECF0F1]/40 text-xs">
            &copy; {currentYear} Hajz Telecommunication Co Ltd. All rights reserved.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs text-[#44C8F5]/70 hover:text-[#44C8F5] transition-colors duration-200 group"
          >
            Get in touch
            <ArrowUpRight
              weight="bold"
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;