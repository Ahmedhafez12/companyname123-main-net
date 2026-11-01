import React, { useEffect } from "react";
import PageSEO from "../utils/PageSEO";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Globe,
  Rocket,
  Target,
  Heart,
  Lightbulb,
  Shield,
} from "phosphor-react";
import HorizontalTimeline from "../components/HorizontalTimeline";
import VennDiagram2 from "../components/VennDiagram2";
import EnhancedDimensions from "../components/EnhancedDimensions";
import { useTranslation, useLocale } from "../i18n";

function AboutPage() {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  const timelineEvents = [
    {
      date: "1994",
      title: "First Cloud Service",
      description:
        "Offer Worldspan ticketing system as service in the kingdom to travel agencies over STC legacy technology X.25 and connected with the world servers 700+ agencies",
    },
    {
      date: "1998",
      title: "First DID/DOD Service",
      description:
        "STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pairgain solution and serve more than 2500+ key customer",
    },
    {
      date: "2002",
      title: "First MPLS Technology",
      description:
        "We have reseller agreement with STC to serve the customer with MPLS and connect their head office with the branch office through our solutions 300+ branches",
    },
    {
      date: "2009",
      title: "First SIP Trunk",
      description:
        "We provided with STC the new technology for DID/DOD service the SIP trunk providing the solution to 450+ customer",
    },
    {
      date: "2012",
      title: "STC NGN Migration",
      description:
        "Provide STC with the solution to migrate their Key customer from the DDN technology to NGN as MODA, RSAF, RSAD 1550+ Links",
    },
    {
      date: "2016",
      title: "STC Hazm Room",
      description:
        "htc have been chosen by STC, MODA and RSADF to provide off hook service to all the remote areas during the Hazm War over different technologies IPMPLS, MW and VSAT over 500+ links",
    },
    {
      date: "2022",
      title: "STC Service Concept and 2 Contract",
      description:
        "Work with STC to launch new service concept for Digital convertors over PLL service with the current to project to serve the key customer. Key customer Active equipment project (exclusive for htc) Customer premises equipment project",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionClass =
    "snap-section min-h-[100dvh] flex flex-col justify-center snap-start relative overflow-hidden [transform:translateZ(0)]";

  return (
    <div className="relative overflow-x-hidden">
      <PageSEO
        title={t.aboutUsPage.seoTitle}
        description={t.aboutUsPage.seoDescription}
        path={localePath("/about")}
        breadcrumbs={[
          { name: t.common.home, path: localePath("/") },
          { name: t.nav.items[1].label, path: localePath("/about") },
        ]}
      />
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />

      <div className="scroll-snap-page md:h-[100dvh] md:overflow-y-scroll overflow-x-hidden">

        {/* Section 1: Hero + Mission & Vision */}
        <section className={sectionClass}>
          <div className="container mx-auto px-4 sm:px-6 py-24 md:py-20 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                  Story
                </span>
              </h1>
              <p className="text-xl text-white/80">
                We deliver our customers valuable, secure, and reliable telecom
                solutions that effectively meet their specific needs and bridge
                the technology gap in the market
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
              >
                <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl" />
                <h2 className="relative z-10 text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="relative z-10 text-white/80 text-lg leading-relaxed mb-6">
                  " Our mission Is to deliver advanced, high-quality communication technology
                  services that enrich the quality of life and foster economic development in
                  the communities we serve. We are committed to providing innovative solutions
                  that positively impact the areas where we operate. "
                </p>
                <ul className="relative z-10 space-y-3 text-white/70">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#44C8F5] rounded-full mr-3 flex-shrink-0" />
                    Empowering communities through cutting-edge communication technology.
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#7CCCBF] rounded-full mr-3 flex-shrink-0" />
                    Driving progress and innovation with high-quality solutions.
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cta rounded-full mr-3 flex-shrink-0" />
                    Enhancing connectivity and accessibility to improve daily life and economic growth.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
              >
                <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl" />
                <h2 className="relative z-10 text-3xl font-bold text-white mb-6">Our Vision</h2>
                <p className="relative z-10 text-white/80 text-lg leading-relaxed mb-6">
                  " Centered around providing tailored solutions to our customers, aiming to
                  address their unique needs and challenges. We are committed to delivering
                  the best possible services and products in the industry, ensuring that they
                  contribute to the enhancement of our customers' businesses and lives. "
                </p>
                <ul className="relative z-10 space-y-3 text-white/70">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#44C8F5] rounded-full mr-3 flex-shrink-0" />
                    Focused on personalized solutions that serve the unique needs of customers.
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#7CCCBF] rounded-full mr-3 flex-shrink-0" />
                    Dedicated to delivering top-tier services and products that add value.
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cta rounded-full mr-3 flex-shrink-0" />
                    Committed to improving businesses and lives through high-quality offerings.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Strategy (Venn + Dimensions) */}
        <section className={sectionClass}>
          <div className="w-full overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Strategy</h2>
              </motion.div>
              <VennDiagram2 />
            </div>
            <div className="container mx-auto px-4 sm:px-6 pb-16">
              <EnhancedDimensions />
            </div>
          </div>
        </section>

        {/* Section 3: Timeline */}
        <section className={sectionClass}>
          <div className="w-full overflow-y-auto">
            <HorizontalTimeline events={timelineEvents} />
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
