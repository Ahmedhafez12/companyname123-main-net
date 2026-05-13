import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShareShareNetwork,
  Lightning,
  Trophy,
  Lightbulb,
  Globe,
  Users,
  TrendUp,
  Rocket,
} from "phosphor-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote: string;
  icon: React.ReactNode;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1994",
    title: " First Cloud service",
    description:
      "Offer Worldspan ticketing system as service in the kingdom to travel agenises over STC legacy technology X.25 and connected with the world servers  700+ agenises  ",
    quote: "",
    icon: (
      <div className="p-1.5">
        <ShareNetwork weight="thin" size={20} />
      </div>
    ),
    color: "#44C8F5",
  },
  {
    year: "1998",
    title: " First DID/DOD Service",
    description:
      "STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pairgain solution and serve more than 2500+ key customer",
    quote: "",
    icon: (
      <div className="p-1.5">
        <Lightning weight="thin" size={20} />
      </div>
    ),
    color: "#7CCCBF",
  },
  {
    year: "2002",
    title: "First MPLS Technology",
    description:
      "We have reseller agreement with STC to serve the customer with MPLS and connect their head office with the branch office through our solutions 300+ branches ",
    quote: "",
    icon: (
      <div className="p-1.5">
        <Globe weight="thin" size={20} />
      </div>
    ),
    color: "#A6CE39",
  },
  {
    year: " 2009",
    title: "First SIP Trunk",
    description:
      "We provided with  STC the new technology for DID/DOD service the SIP trunk providing the solution to 450+ customer",
    quote: "",
    icon: (
      <div className="p-1.5">
        <Trophy weight="thin" size={20} />
      </div>
    ),
    color: "#44C8F5",
  },
  {
    year: "2012",
    title: "STC NGN Migration",
    description:
      " Provide STC with the solution to migrate their Key customer from the DDN technology to NGN as MODA, RSAF, RSAD 1550+ Links",
    quote: "",
    icon: (
      <div className="p-1.5">
        <Lightbulb weight="thin" size={20} />
      </div>
    ),
    color: "#7CCCBF",
  },
  {
    year: "2016",
    title: "STC Hazm Room",
    description:
      " htc have been chosen by STC, MODA and RSADF to provide off hook service to all he remote areas during the Hazm War over different technologies IPMPLS, MW and VSAT over 500+ links ",
    quote: "",
    icon: (
      <div className="p-1.5">
        <Users weight="thin" size={20} />
      </div>
    ),
    color: "#A6CE39",
  },
  {
    year: "2022",
    title: " STC Service concept and 2 contract ",
    description:
      "Work with STC to launch new service concept for Digital convertors over PLL service with the current to project to serve the key customer",
    quote:
      "Key customer Active equipment project (exclusive for htc) Customer premises equipment project",
    icon: (
      <div className="p-1.5">
        <TrendUp weight="thin" size={20} />
      </div>
    ),
    color: "#44C8F5",
  },
];

const CompanyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="py-16 md:py-24 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-sans mb-4">
          Our Journey
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          From our founding to today, we've been at the forefront of
          telecommunications innovation.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#A6CE39] via-[#7CCCBF] via-[#44C8F5] to-[#005E96]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline events */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-16 sm:mb-24 relative"
            >
              <div className="flex flex-col items-center">
                {/* Year bubble */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center z-10 mb-6"
                  style={{
                    background: `radial-gradient(circle, ${event.color}40 0%, ${event.color}20 70%, transparent 100%)`,
                    boxShadow: `0 0 20px ${event.color}30`,
                  }}
                >
                  <div className="relative w-14 h-14 rounded-full border border-black/10 backdrop-blur-[2px] flex items-center justify-center">
                    {/* Overlay */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#005E96", opacity: 0.3 }}
                    ></div>
                    <span className="relative z-10 text-white font-sans font-bold text-lg">
                      {event.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center max-w-lg mx-auto">
                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-full border border-black/10 backdrop-blur-[2px] flex items-center justify-center mx-auto mb-4"
                    style={{ color: event.color }}
                  >
                    {/* Overlay */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#005E96", opacity: 0.3 }}
                    ></div>
                    <div className="relative z-10">{event.icon}</div>
                  </div>

                  {/* Text content */}
                  <h3 className="text-xl text-white font-sans mb-3">
                    {event.title}
                  </h3>
                  <p className="text-white/80 text-base font-body">
                    {event.description}
                  </p>
                  <h3 className="text-xl text-white font-sans mb-3">
                    {event.quote}
                  </h3>
                </div>

                {/* Decorative elements */}
                <div
                  className="absolute top-[40px] left-1/2 w-px h-16 transform -translate-x-1/2"
                  style={{
                    background: `linear-gradient(to bottom, ${event.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTimeline;
