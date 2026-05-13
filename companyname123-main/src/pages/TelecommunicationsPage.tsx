import React, { useEffect, useRef } from "react";
import PageSEO from "../utils/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQSection from "../components/FAQSection";
import { motion, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "phosphor-react";
import Footer from "../components/Footer";
import { useTranslation, useLocale } from "../i18n";

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// ─── Business Unit Section ─────────────────────────────────────────────────────
const BusinessUnitSection = ({
  title,
  description,
  image,
  index,
  isReversed,
  id,
}: {
  title: string;
  description: string;
  image: string;
  index: number;
  isReversed?: boolean;
  id?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      className={`flex flex-col md:grid md:grid-cols-2 md:items-center scroll-mt-20 ${
        isReversed ? "md:grid-flow-dense" : ""
      }`}
      style={{
        gap: "clamp(1rem, 2vh, 2rem)",
        marginBottom: "clamp(2rem, 4vh, 3.5rem)",
      }}
    >
      {/* Image */}
      <div className={isReversed ? "md:col-start-2" : ""}>
        <div
          className="relative rounded-xl overflow-hidden bg-white/5 w-full"
          style={{
            aspectRatio: "16/9",
            borderRadius: "clamp(0.625rem, 1.25vh, 1rem)",
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text */}
      <div
        className={`flex flex-col ${
          isReversed ? "md:col-start-1 md:row-start-1" : ""
        } ${!isReversed ? "md:text-right" : ""}`}
      >
        <h3
          className="font-bold text-white"
          style={{
            fontSize: "clamp(1.125rem, 2.25vh, 1.75rem)",
            marginBottom: "clamp(0.5rem, 1.25vh, 0.875rem)",
            lineHeight: "1.25",
          }}
        >
          {title}
        </h3>
        <p
          className="text-white/80 leading-relaxed flex-grow"
          style={{
            fontSize: "clamp(0.8125rem, 1.5vh, 1.0625rem)",
            marginBottom: "clamp(0.875rem, 1.75vh, 1.5rem)",
            lineHeight: "1.65",
          }}
        >
          {description}
        </p>

        {/* CTA BUTTON DISABLED/COMMENTED OUT */}
        {/* <div className={!isReversed ? 'md:flex md:justify-end' : ''}>
          <a
            href={`/assets/htc_Overview-${index + 1}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 group self-start"
            style={{
              padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(0.875rem, 1.75vw, 1.5rem)',
              fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)',
            }}
          >
            <span>Learn More</span>
            <div className="p-0.5 group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight weight="bold" size={16} />
            </div>
          </a>
        </div> 
        */}
      </div>
    </motion.div>
  );
};

// ─── Service Hallmark Card ─────────────────────────────────────────────────────
const HallmarkCard = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.12 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col flex-shrink-0
                 w-[80vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none"
      style={{
        padding: "clamp(1rem, 2vh, 2rem)",
        borderRadius: "clamp(0.625rem, 1.25vh, 1rem)",
      }}
    >
      <h3
        className="font-bold text-white"
        style={{
          fontSize: "clamp(0.9375rem, 1.85vh, 1.5rem)",
          marginBottom: "clamp(0.5rem, 1vh, 0.875rem)",
          lineHeight: "1.3",
        }}
      >
        {title}
      </h3>
      <p
        className="text-white/80 leading-relaxed flex-grow"
        style={{
          fontSize: "clamp(0.8125rem, 1.4vh, 1rem)",
          lineHeight: "1.65",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

// ─── Page Component ────────────────────────────────────────────────────────────
function TelecommunicationsPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const location = useLocation();

  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const element = document.querySelector(hash);
    if (element) {
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const targetTop = elementTop - viewportHeight / 2 + elementHeight / 2;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const attemptScroll = (attempts = 0) => {
        const element = document.querySelector(hash);
        if (element) {
          scrollToHash(hash);
        } else if (attempts < 5) {
          setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
        }
      };
      setTimeout(() => attemptScroll(), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) setTimeout(() => scrollToHash(hash), 100);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // ─── Data ──────────────────────────────────────────────────────────────────
  const BUSINESS_UNIT_IMAGES = [
    "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_fa3aa790f3.jpeg",
    "/assets/Telecommunications/Telecom_tower_with_glowing_waves_ae5fd516ef.jpeg",
    "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_63fec3bc12.jpeg",
    "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_delpmaspu12.png",
    "/assets/Telecommunications/Telecom_tower_connecting_landscape_7cdb458686.jpeg",
  ];
  const BUSINESS_UNIT_IDS = [
    "system-integration",
    "connectivity-transmission",
    "unified-communication",
    "access-lan-osp",
    "military-critical-communication",
  ];

  const businessUnits = t.telecomPage.businessUnits.map((unit, i) => ({
    title: unit.title,
    description: unit.description,
    image: BUSINESS_UNIT_IMAGES[i],
    id: BUSINESS_UNIT_IDS[i],
  }));

  const serviceStandards = t.telecomPage.serviceStandards;

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      <PageSEO
        title={t.telecomPage.seoTitle}
        description={t.telecomPage.seoDescription}
        path={localePath("/what-we-do/telecommunications")}
        breadcrumbs={[
          { name: t.telecomPage.breadcrumbs.home, path: localePath("/") },
          { name: t.telecomPage.breadcrumbs.whatWeDo, path: localePath("/what-we-do") },
          { name: t.telecomPage.breadcrumbs.telecom, path: localePath("/what-we-do/telecommunications") },
        ]}
        faq={t.telecomPage.faq}
      />

      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="overview"
        className="relative scroll-mt-20"
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(7rem, 14vh, 9rem)",
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 w-full max-w-7xl">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { name: t.telecomPage.breadcrumbs.home, path: localePath("/") },
                { name: t.telecomPage.breadcrumbs.whatWeDo, path: localePath("/what-we-do") },
                { name: t.telecomPage.breadcrumbs.telecom, path: localePath("/what-we-do/telecommunications") },
              ]}
            />
          </div>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{ gap: "clamp(2rem, 4vh, 3rem)" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left min-w-0"
            >
              <div
                className="inline-flex items-center bg-white/5 backdrop-blur-[2px] border border-white/10"
                style={{
                  padding:
                    "clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.75rem, 1.5vh, 1rem)",
                  borderRadius: "9999px",
                  marginBottom: "clamp(0.75rem, 1.5vh, 1.25rem)",
                }}
              >
                <span
                  className="text-white/90"
                  style={{ fontSize: "clamp(0.6875rem, 1.1vh, 0.875rem)" }}
                >
                  {t.telecomPage.badge}
                </span>
              </div>

              <h1
                className="font-bold text-white"
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
                  marginBottom: "clamp(0.75rem, 1.75vh, 1.5rem)",
                  lineHeight: "1.2",
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                  {t.telecomPage.headlineHighlight}
                </span>{" "}
                {t.telecomPage.headlineSuffix}
              </h1>

              <p
                className="text-white/80"
                style={{
                  fontSize: "clamp(0.875rem, 1.7vh, 1.125rem)",
                  lineHeight: "1.65",
                  maxWidth: "42rem",
                  margin: "0 auto",
                }}
              >
                {t.telecomPage.subheadline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full min-w-0"
            >
              <div
                className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
                style={{ borderRadius: "clamp(0.75rem, 1.5vh, 1.5rem)" }}
              >
                <img
                  src="/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_fb8c7d724c.jpeg"
                  alt={t.telecomPage.heroImageAlt}
                  className="block w-full object-cover object-center"
                  style={{ aspectRatio: "16/9" }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005E96]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Core Solutions ────────────────────── */}
      <section
        id="business-unit"
        className="relative scroll-mt-20"
        style={{
          paddingTop: "clamp(4rem, 8vh, 7rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 5rem)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
            style={{ marginBottom: "clamp(1.75rem, 3.5vh, 3rem)" }}
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: "clamp(1.375rem, 3.5vh, 3rem)",
                marginBottom: "clamp(0.5rem, 1vh, 0.875rem)",
              }}
            >
              {t.telecomPage.coreSolutionsTitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                {t.telecomPage.coreSolutionsHighlight}
              </span>
            </h2>
            <p
              className="text-white/80"
              style={{
                fontSize: "clamp(0.875rem, 1.6vh, 1.125rem)",
                lineHeight: "1.65",
              }}
            >
              {t.telecomPage.coreSolutionsSubtitle}
            </p>
          </motion.div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 4vh, 3.5rem)",
            }}
          >
            {businessUnits.map((unit, index) => (
              <BusinessUnitSection
                key={unit.title}
                title={unit.title}
                description={unit.description}
                image={unit.image}
                index={index}
                isReversed={index % 2 === 1}
                id={unit.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Service Standards ─────────────────────────────────── */}
      <section
        id="service-Standards"
        className="relative scroll-mt-20"
        style={{
          paddingTop: "clamp(4rem, 8vh, 7rem)",
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
            style={{ marginBottom: "clamp(1.25rem, 2.5vh, 2rem)" }}
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: "clamp(1.25rem, 3.25vh, 2.75rem)",
                marginBottom: "clamp(0.5rem, 1vh, 0.875rem)",
              }}
            >
              {t.telecomPage.serviceStandardsTitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                {t.telecomPage.serviceStandardsHighlight}
              </span>
            </h2>
          </motion.div>

          <p
            className="flex md:hidden items-center justify-center gap-1.5 mb-3 select-none"
            style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}
            aria-hidden
          >
            <span>←</span> {t.telecomPage.swipeHint} <span>→</span>
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible
                       snap-x snap-mandatory md:snap-none pb-4 md:pb-0"
            style={{
              gap: "clamp(0.875rem, 1.75vh, 1.5rem)",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {serviceStandards.map((hallmark, index) => (
              <HallmarkCard
                key={hallmark.title}
                title={hallmark.title}
                description={hallmark.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <FAQSection
        items={t.telecomPage.faq}
        subtitle={t.telecomPage.faqSubtitle}
      />

      <Footer />
    </div>
  );
}

export default TelecommunicationsPage;
