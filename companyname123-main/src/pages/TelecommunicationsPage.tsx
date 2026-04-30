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
  const businessUnits = [
    {
      title: "System Integration",
      description:
        "We design our solutions to fit your network supporting your digital transformation, not the other way around. Whether your infrastructure is fiber or copper (CAT6, CAT5 or CAT3), we seamlessly connect to it while supporting a full range of interfaces—from legacy E1, STM1, DS3, and RS232 to modern Ethernet and optical. We simplify complex signaling by bridging IP, legacy protocols, and RTP so different systems work together smoothly. With support for IP/MPLS, microwave, and VSAT uplinks, our platforms deliver end-to-end security, high availability, and automatic failover, ensuring your communication remains stable, resilient, and protected.",
      image:
        "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_fa3aa790f3.jpeg",
      id: "system-integration",
    },
    {
      title: "Connectivity and Transmission",
      description:
        "Break Down Connectivity Barriers, we stop letting incompatible systems dictate your IT strategy. Our intelligent gateway ecosystem transforms infrastructure chaos into competitive advantage seamlessly connecting your data streams, voice communications, legacy investments, and video assets through one unified architecture. No rip-and-replace required, just smart evolution that protects your past while accelerating your future.",
      image:
        "/assets/Telecommunications/Telecom_tower_with_glowing_waves_ae5fd516ef.jpeg",
      id: "connectivity-transmission",
    },
    {
      title: "Unified Communication",
      description:
        "We eliminate the false choice between cutting-edge cloud collaboration and your existing hardware investments, seamlessly bridging legacy analog systems, ISDN lines, and modern SIP trunks through enterprise grade gateways while unleashing IP PBX rich suite of video conferencing, mobile apps, and CRM integration across your workforce. Whether you're enabling hybrid teams with crystal-clear connectivity anywhere, plus securing your network with military-grade encryption, our integrated platform future-proofs your communications without the rip-and-replace disruption—delivering enterprise resilience with startup agility, today.",
      image:
        "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_63fec3bc12.jpeg",
      id: "unified-communication",
    },
    {
      title: "Access LAN and OSP",
      description:
        "From fiber in the ground to Wi-Fi in the air, we architect the complete connectivity ecosystem that turns infrastructure into competitive advantage delivering hardened Outside Plant foundations, intelligent Enterprise Networking with seamless wired and wireless integration. Whether you're scaling secure Access layers, modernizing core Routers and Switches for software defined agility, or extending high speed connectivity to remote frontiers, our end-to-end portfolio eliminates multi-vendor complexity and accelerates your digital transformation with a single partner that builds the physical pathways and intelligent networks your business demands to thrive in an always on world.",
      image:
        "/assets/Telecommunications/Modern_premium_corporate_photography_for_a_network_delpmaspu12.png",
      id: "access-lan-osp",
    },
    {
      title: "Military and Critical Communication",
      description:
        "Our Military and Critical Communication solutions transform tactical connectivity into decisive combat advantage delivering encrypted hotlines, AES-256 secured voice and fax transmission, and aerial photo distribution. Through NPOX (New Off-Premises Extension), we extend secure C2 capabilities to forward operating bases and mobile warfighters, while NALL (New Analog Lease Line) provides electromagnetic-hardened circuits that guarantee unbroken connectivity when digital networks fail. Integrated with encrypted E1 trunking, agile SIP Distribution systems, and automated early warning platforms, every component of our portfolio is engineered to enhance the combat efficiency of military units ensuring your forces maintain superior situational awareness, seamless coordination, and unwavering command authority.",
      image:
        "/assets/Telecommunications/Telecom_tower_connecting_landscape_7cdb458686.jpeg",
      id: "military-critical-communication",
    },
  ];

  const serviceStandards = [
    {
      title: "Seamless Integration & Migration",
      description:
        "HTC delivers end‑to‑end solutions that are carefully designed to fit each customer's environment, ensuring smooth integration across existing systems, networks, and platforms with minimal disruption to operations.",
    },
    {
      title: "Agile Delivery & Reliable Execution",
      description:
        "Our lean, senior-led teams deliver projects with speed and precision, swiftly adapting to shifting requirements, timelines, and budgets to ensure solutions arrive on time, perform flawlessly, and fit seamlessly into your real-world operations.",
    },
    {
      title: "Managed, Secure & Always-On Operations",
      description:
        "HTC goes beyond implementation to actively run and support your environment as a managed service, with proactive monitoring, end‑to‑end security, and built‑in resilience and failover to keep your communications continuously stable, available, and protected.",
    },
  ];

  const TELECOM_FAQ = [
    {
      question: "What telecommunications services does Hajz Telecom provide?",
      answer:
        "We provide end-to-end telecom services including system integration, enterprise connectivity, unified communications, VoIP solutions, and critical infrastructure deployment for both commercial and military applications.",
    },
    {
      question: "Which industries does Hajz Telecom serve?",
      answer:
        "We serve a wide range of industries including banking and finance, government and defence, oil and gas, healthcare, hospitality, and education across the region",
    },
    {
      question: "Does Hajz Telecom offer managed telecom services?",
      answer:
        "Yes. We provide fully managed services with proactive monitoring, security, maintenance, and 24/7 support to ensure your telecommunications infrastructure remains stable and available.",
    },
    {
      question: "What makes Hajz Telecom different from other providers?",
      answer:
        "With 32+ years of experience, vendor-agnostic solutions, senior-led project teams, and expertise and deep-dive knowledge in the technology we use regarding our solutions.",
    },
  ];

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      <PageSEO
        title="Telecommunications Services | Integration & Connectivity"
        description="Comprehensive telecom services: system integration, enterprise connectivity, unified communications, and critical infrastructure for commercial and military applications."
        path={localePath("/what-we-do/telecommunications")}
        breadcrumbs={[
          { name: t.common.home, path: localePath("/") },
          { name: "What We Do", path: localePath("/what-we-do") },
          {
            name: "Telecommunications",
            path: localePath("/what-we-do/telecommunications"),
          },
        ]}
        faq={TELECOM_FAQ}
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
                { name: "Home", path: "/" },
                { name: "What We Do", path: "/what-we-do" },
                {
                  name: "Telecommunications",
                  path: "/what-we-do/telecommunications",
                },
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
                  Telecommunications
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
                  Telecommunications
                </span>{" "}
                Solutions
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
                Transforming infrastructure chaos into competitive advantage
                with intelligent connectivity solutions that protect your past
                while accelerating your future.
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
                  alt="Telecommunications Network Infrastructure"
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
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                Core Solutions
              </span>
            </h2>
            <p
              className="text-white/80"
              style={{
                fontSize: "clamp(0.875rem, 1.6vh, 1.125rem)",
                lineHeight: "1.65",
              }}
            >
              Comprehensive telecommunications solutions designed to meet your
              enterprise needs
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
              Service{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                Standards
              </span>
            </h2>
            <p
              className="text-white/80"
              style={{
                fontSize: "clamp(0.8125rem, 1.5vh, 1.0625rem)",
                lineHeight: "1.65",
              }}
            >
              The three primary strengths that define HTC's telecommunications
              services
            </p>
          </motion.div>

          <p
            className="flex md:hidden items-center justify-center gap-1.5 mb-3 select-none"
            style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}
            aria-hidden
          >
            <span>←</span> swipe to explore <span>→</span>
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
        items={TELECOM_FAQ}
        subtitle="Common questions about our telecommunications services and capabilities."
      />

      <Footer />
    </div>
  );
}

export default TelecommunicationsPage;
