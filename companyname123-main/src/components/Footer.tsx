import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope, Phone, MapPin, ArrowUpRight, CaretDown } from "phosphor-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation, useLocale } from "../i18n";

// ── Reusable NavLink ──────────────────────────────────────────────────────────
const NavLink: React.FC<{ href: string; children: React.ReactNode; isRTL?: boolean }> = ({ href, children }) => (
  <li>
    <Link
      to={href}
      className="group relative text-white/50 hover:text-white text-[13px] transition-colors duration-300 inline-block py-0.5"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#44C8F5] to-[#7CCCBF] group-hover:w-full transition-all duration-300" />
    </Link>
  </li>
);

// ── Column heading ───────────────────────────
const ColHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-white/90 text-[11px] font-semibold uppercase tracking-[0.2em] mb-5">
    {children}
  </h3>
);

// ── Accordion column (mobile) ───────────────
const FooterCol: React.FC<{
  id: string;
  heading: string;
  openId: string | null;
  toggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ id, heading, openId, toggle, children }) => {
  const isOpen = openId === id;
  return (
    <div>
      <button
        type="button"
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between sm:cursor-default sm:pointer-events-none py-3.5 sm:py-0 border-b border-white/[0.06] sm:border-0"
        aria-expanded={isOpen}
      >
        <ColHeading>{heading}</ColHeading>
        <CaretDown
          weight="bold"
          size={14}
          className={`text-white/30 flex-shrink-0 sm:hidden transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <div className="hidden sm:block">
        {children}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden sm:hidden"
          >
            <div className="pt-3 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [openColId, setOpenColId] = useState<string | null>(null);
  const toggleCol = (id: string) => setOpenColId((prev) => (prev === id ? null : id));
  const { t } = useTranslation();
  const { isRTL, localePath } = useLocale();

  const contactIcons = [Envelope, Phone, MapPin];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #001a28 0%, #002C3D 100%)" }}>

      {/* ── Top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#44C8F5]/30 to-transparent" />

      {/* ── Ambient glow orbs ── */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #44C8F5, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #A6CE39, transparent 70%)" }}
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10 max-w-7xl">

        {/* ── Top row: Brand + CTA ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-10 mb-14 sm:mb-16"
        >
          <div className="flex flex-col gap-4 max-w-sm">
            <Link to={localePath("/")} className="inline-block self-start" aria-label="Hajz Telecommunication home">
              <Logo
                className="h-12 sm:h-14 w-auto max-w-[min(100%,240px)]"
                textColorOverride="#ECF0F1"
              />
            </Link>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <Link
            to={localePath("/contact")}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-400"
          >
            <span className="text-[13px] font-medium tracking-wide">{t.footer.getInTouch}</span>
            <ArrowUpRight
              weight="bold"
              size={14}
              className={`opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${isRTL ? "rtl-flip" : ""}`}
            />
          </Link>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-12 sm:mb-14" />

        {/* ── Link columns grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-2 sm:gap-y-10">

          <motion.div {...fadeUp(0.05)}>
            <FooterCol id="quick" heading={t.footer.quickLinks} openId={openColId} toggle={toggleCol}>
              <ul className="space-y-2.5">
                {t.footer.quickLinksItems.map((l) => <NavLink key={l.name} href={l.href} isRTL={isRTL}>{l.name}</NavLink>)}
              </ul>
            </FooterCol>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <FooterCol id="about" heading={t.footer.aboutUs} openId={openColId} toggle={toggleCol}>
              <ul className="space-y-2.5">
                {t.footer.aboutUsItems.map((l) => <NavLink key={l.name} href={l.href} isRTL={isRTL}>{l.name}</NavLink>)}
              </ul>
            </FooterCol>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <FooterCol id="telecom" heading={t.footer.telecom} openId={openColId} toggle={toggleCol}>
              <ul className="space-y-2.5">
                {t.footer.telecomItems.map((l) => <NavLink key={l.name} href={l.href} isRTL={isRTL}>{l.name}</NavLink>)}
              </ul>
              <div className="mt-6">
                <h3 className="text-white/90 text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                  {t.footer.commandControl}
                </h3>
                <ul className="space-y-2.5">
                  {t.footer.commandItems.map((l) => <NavLink key={l.name} href={l.href} isRTL={isRTL}>{l.name}</NavLink>)}
                </ul>
              </div>
            </FooterCol>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <FooterCol id="contact" heading={t.footer.contact} openId={openColId} toggle={toggleCol}>
              <ul className="space-y-3.5">
                {t.footer.contactInfo.map((item, i) => {
                  const Icon = contactIcons[i];
                  return (
                    <li key={item.text} className="group flex items-start gap-2.5 text-white/50 text-[13px]">
                      <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                        <Icon weight="regular" size={13} className="text-[#44C8F5]/50 group-hover:text-[#44C8F5] transition-colors duration-300" />
                      </span>
                      {item.href ? (
                        <a href={item.href} className="hover:text-white transition-colors duration-300 leading-relaxed pt-0.5">
                          {item.text}
                        </a>
                      ) : (
                        <span className="leading-relaxed pt-0.5">{item.text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </FooterCol>
          </motion.div>

          <motion.div {...fadeUp(0.25)}>
            <FooterCol id="legal" heading={t.footer.legal} openId={openColId} toggle={toggleCol}>
              <ul className="space-y-2.5">
                {t.footer.legalItems.map((l) => <NavLink key={l.name} href={l.href} isRTL={isRTL}>{l.name}</NavLink>)}
              </ul>
            </FooterCol>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-white/[0.06]">
          <motion.div
            {...fadeUp(0.35)}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-white/25 text-xs tracking-wide">
              &copy; {currentYear} {t.footer.copyright}
            </p>

            <LanguageSwitcher className="text-white/30 hover:text-white/60 text-xs transition-colors duration-300" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
