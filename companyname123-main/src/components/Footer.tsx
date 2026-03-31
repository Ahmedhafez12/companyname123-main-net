import React from "react";
import { motion } from "framer-motion";
import {
  Envelope,
  Phone,
  MapPin,
  ShareNetwork,
  ArrowRight,
} from "phosphor-react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

// Inline SVG Logo Component
const FooterLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1109.48 491"
  >
    <defs>
      <style>
        {`
          .cls-1 {
            font-size: 40.39px;
          }
          .cls-1, .cls-3 {
            font-family: Montserrat-SemiBold, Montserrat;
            font-weight: 600;
          }
          .cls-8 {
            letter-spacing: .3em;
          }
          .cls-9 {
            letter-spacing: .34em;
          }
          .cls-10 {
            letter-spacing: .33em;
          }
          .cls-3 {
            font-size: 26.58px;
          }
        `}
      </style>
          <linearGradient
            id="linear-gradient-default-1"
            x1="360.27"
            y1="86.73"
            x2="170.11"
            y2="396.3"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a6ce39" />
            <stop offset=".34" stopColor="#7cccbe" />
            <stop offset=".65" stopColor="#44c8f5" />
            <stop offset="1" stopColor="#005e96" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-default-2"
            x1="440.03"
            y1="146.99"
            x2="259.72"
            y2="440.51"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a6ce39" />
            <stop offset=".34" stopColor="#7cccbe" />
            <stop offset=".65" stopColor="#44c8f5" />
            <stop offset="1" stopColor="#005e96" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-default-3"
            x1="270.81"
            y1="43.03"
            x2="90.5"
            y2="336.56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a6ce39" />
            <stop offset=".34" stopColor="#7cccbe" />
            <stop offset=".65" stopColor="#44c8f5" />
            <stop offset="1" stopColor="#005e96" />
          </linearGradient>
    </defs>
    <path
      fill="#005E96"
      d="M1026,134.38c0,9.66-7.85,17.43-17.43,17.43s-17.43-7.76-17.43-17.43,7.77-17.35,17.43-17.35s17.43,7.77,17.43,17.35ZM1022.53,134.38c0-7.68-6.28-13.96-13.96-13.96s-13.96,6.28-13.96,13.96,6.28,13.96,13.96,13.96,13.96-6.2,13.96-13.96ZM1015.67,140c.41,0,.66-.16.66-.16v3.3s-.25.08-.66.08c-4.63,0-4.3-6.44-8.43-6.44-.74,0-.83.74-.83.74v5.7h-3.47v-18.42h7.35c5.95.5,6.44,8.01,1.57,10.41,2.23,1.9,2.56,4.79,3.8,4.79ZM1009.73,128.02h-3.3v5.45l3.55-1.24c2.4-1.24,2.31-4.21-.25-4.21Z"
    />
    <g>
      <path
        fill="#fff"
        d="M792.53,119.27v50.96h41.35v12.53h-41.35v111.39c0,20.59,22.58,38.3,50.3,21.77-10.58,16.02-44.26,21.39-62.07,21.39-13.3,0-23.11-2.09-29.45-6.34-6.27-4.18-10.16-9.19-11.7-14.9-1.46-5.71-2.23-13.02-2.23-21.86v-111.46h-22.56v-12.53h22.56v-.84c0-27.61,22.52-50.12,50.12-50.12h5.01ZM825.11,269.22c-13.84,0-25.06,11.22-25.06,25.06s11.22,25.06,25.06,25.06,25.06-11.22,25.06-25.06-11.22-25.06-25.06-25.06Z"
      />
      <path
        fill="#fff"
        d="M598,192.74c12.31-16.39,29.05-24.6,50.11-24.6,11.7,0,23.46,3.69,35.3,11,11.83,7.38,17.75,21.65,17.75,42.81v115.35h-5.43c-27.61,0-50.13-22.52-50.13-50.12v-77c0-15.8-5.22-23.67-15.73-23.67-12.53,0-22.56,6.27-30.14,18.87-.6,1-1.18,1.97-1.73,2.91v-15.55h0ZM536.3,265.53c-7.34,3.35-13.67,9.09-17.69,16.8-9.6,18.41-2.45,41.12,15.95,50.71,18.41,9.6,41.12,2.45,50.71-15.95,2.42-4.64,3.77-9.54,4.15-14.44.03.01.05-81.85.06-92.04-13.01,37.72-27.1,46.71-53.19,54.92h0ZM589.81,111.35c3.6,23.15.79,49.55-2.07,68.09-5.15,33.35-19.36,65.33-53.38,76.18V61.21h5.43c32.59,0,45.77,22.8,50.02,50.14Z"
      />
      <path
        fill="#fff"
        d="M1023.46,278.41h2.31c-2.16,18.59-10.23,33.07-24.16,43.44-13.92,10.3-30.07,15.46-48.45,15.46-24.72,0-45.95-8.35-63.7-24.99-17.75-16.64-26.59-36.76-26.59-60.29s9.05-44.55,27.22-62.31c18.1-17.75,40.1-26.59,65.93-26.59,16.95,0,40.69,4.75,56.75,24.44-22.18-12.61-39.77-12.75-55.01-12.75-10.23,0-18.1,3.62-23.6,10.79-5.5,7.24-8.21,26.45-8.21,57.71s1.81,54.16,5.5,64.6c3.69,10.37,13.09,15.59,28.19,15.59,25.13,0,42.53-12.37,52.15-37.12,1.91-4.92,6.41-7.99,11.68-7.99h0ZM993.49,184.27c-13.84,0-25.06,11.22-25.06,25.06s11.22,25.06,25.06,25.06,25.06-11.22,25.06-25.06-11.22-25.06-25.06-25.06Z"
      />
    </g>
    <text
      fontFamily="Rubik-SemiBold, Rubik"
      fontSize="27.58px"
      fontWeight="1000"
      fill="white"
      transform="translate(521 403.08)"
    >
      <tspan letterSpacing=".34em" x="0" y="0">
        HAJZ TELECOM CO. LTD.
      </tspan>
    </text>
    <g>
      <path
        fill="url(#linear-gradient-default-1)"
        d="M221.3,426.81c-7.85,0-15.41-2.39-21.85-6.91-17.21-12.06-21.4-35.88-9.33-53.09,6.62-9.45,17.47-15.5,29-16.17,25.7-1.51,45.51-23.25,44.63-48.98-.06-1.72-.02-3.46.11-5.18,1.05-13.73-3.93-27.24-13.63-37.02-8.94-9-21.07-14.02-33.67-14.02-1.08,0-2.16.04-3.25.11-1.06.07-2.14.11-3.21.11-9.6,0-18.84-2.92-26.73-8.45-10.2-7.15-17-17.84-19.16-30.1-2.16-12.27.59-24.64,7.74-34.83,8.72-12.44,23-19.86,38.21-19.86.51,0,1.03,0,1.54.02.52.02,1.05.03,1.57.03,12.35,0,24.24-4.82,33.12-13.48,9.25-9.02,14.42-21.42,14.32-34.34-.09-11.71,4.39-22.69,12.62-30.93s18.86-12.67,30.58-12.67,22.29,4.38,30.58,12.67c16.86,16.86,16.86,44.29,0,61.15-8.26,8.26-18.8,12.64-30.47,12.67-12.93.03-25.3,5.34-34.22,14.7-8.93,9.36-13.64,21.96-13.06,34.88.08,1.88.06,3.77-.08,5.62-1.05,13.73,3.93,27.24,13.62,37.01,8.94,9.01,21.07,14.03,33.67,14.03,1.07,0,2.15-.04,3.23-.11,1.04-.07,2.1-.11,3.16-.11,9.6,0,18.84,2.92,26.73,8.45,21.05,14.75,26.17,43.89,11.41,64.94-8.72,12.44-23,19.86-38.21,19.86-.59,0-1.18-.01-1.77-.03-.6-.02-1.2-.03-1.8-.03-24.93,0-45.75,19.4-47.32,44.49-.43,6.97-2.74,13.48-6.85,19.34-7.13,10.17-18.81,16.24-31.24,16.24Z"
      />
      <circle
        fill="url(#linear-gradient-default-2)"
        cx="402.03"
        cy="208.84"
        r="46.38"
      />
      <circle
        fill="url(#linear-gradient-default-3)"
        cx="121.54"
        cy="286.02"
        r="38.06"
      />
    </g>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const renderLinkColumns = (links: { name: string; href: string }[]) => {
    const columns: { name: string; href: string }[][] = [];
    for (let i = 0; i < links.length; i += 3) columns.push(links.slice(i, i + 3));

    if (columns.length <= 1) {
      return (
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className="text-[#ECF0F1]/75 hover:text-[#44c8f5] text-xs transition-colors duration-300 flex items-center group"
              >
                <div className="p-0.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight weight="thin" size={20} />
                </div>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-x-8">
        {columns.slice(0, 2).map((col, idx) => (
          <ul key={idx} className="space-y-1">
            {col.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[#ECF0F1]/75 hover:text-[#44c8f5] text-xs transition-colors duration-300 flex items-center group"
                >
                  <div className="p-0.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight weight="thin" size={20} />
                  </div>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  };

  // Category 1: Legal & Utility
  const legalUtilityLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  // Quick Links (1x1 - All links to pages)
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about/overview" },
    { name: "Our Customers", href: "/customers" },
    { name: "Our Partners", href: "/partners" },
    { name: "Contact Us", href: "/contact" },
  ];

  // About Us Page Hash Anchors (1x2)
  const aboutUsAnchors = [
    { name: "What We Do", href: "/about/overview#what-we-do" },
    { name: "Company Identity", href: "/about/overview#company-identity" },
    // { name: "Value Proposition", href: "/about/overview#value-proposition" },
    { name: "Competitive Edge", href: "/about/overview#competitive-edge" },
    { name: "Our Journey", href: "/about/overview#our-journey" },
    { name: "Vision and Mission", href: "/about/overview#vision-mission" },
    { name: "Core Strengths", href: "/about/overview#core-strengths" },
  ];

  // What We Do Page Hash Anchors (2x1)
  const whatWeDoAnchors = [
    { name: "Service Portfolio", href: "/what-we-do/telecommunications#service-portfolio", category: "Telecommunications" },
    { name: "Business Unit", href: "/what-we-do/telecommunications#business-unit", category: "Telecommunications" },
    { name: "Service Standards", href: "/what-we-do/telecommunications#service-Standards", category: "Telecommunications" },
  ];

  // Our Impact Pages (2x2)
  const ourImpactLinks = [
    { name: "Core Solutions", href: "/what-we-do/command-control#core-solutions", category: "Command & Control" },
    { name: "Technology Stack", href: "/what-we-do/command-control#tech-stack", category: "Command & Control" },
    { name: "Industries We Serve", href: "/what-we-do/command-control#industries-served", category: "Command & Control" },
  ];

  // Contact Info and Link
  const contactInfo: { icon: React.ComponentType<{ className?: string }>; text: string; type: string }[] = [
    { icon: Envelope, text: "contact@example.com", type: "email" },
    { icon: Phone, text: "+1 (555) 123-4567", type: "phone" },
    { icon: MapPin, text: "123 Tech Street, Innovation City", type: "address" },
  ];

  // Social Media Links
  const socialMediaLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/yourprofile" },
    { icon: FaTwitter, href: "https://www.twitter.com/yourprofile" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/yourprofile" },
    { icon: FaInstagram, href: "https://www.instagram.com/yourprofile" },
  ];

  return (
    // Added flex-grow and adjusted padding for non-homepage footer to fill available space
    <div className="w-full relative overflow-hidden py-8 bg-[#002C3D] border-t border-[#ECF0F1]/10 flex-grow flex flex-col justify-end">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-8">
            {/* Logo and Description - Keep as is */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <FooterLogo className="h-20 w-auto mb-4" />
              <p className="text-[#ECF0F1]/80 text-sm leading-relaxed max-w-xs">
                Leading the telecommunications revolution with innovative
                solutions and unparalleled expertise in global connectivity.
              </p>
              {/* Social Media Links for Non-Homepage */}
              <div className="flex space-x-3 mt-4">
                {socialMediaLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ECF0F1]/75 hover:text-[#44c8f5] transition-colors duration-300"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* 2x3 Grid for the rest of the sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {/* Row 1, Column 1 (1x1): All Links to Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  Quick Links
                </h3>
                {renderLinkColumns(quickLinks)}
              </motion.div>

              {/* Row 1, Column 2 (1x2): All Hash Anchors of AboutUsPage.tsx */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  About Us
                </h3>
                {renderLinkColumns(aboutUsAnchors)}
              </motion.div>

              {/* Row 1, Column 3 (1x3): Contact Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  Contact
                </h3>
                <ul className="space-y-1">
                  {contactInfo.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[#ECF0F1]/75 text-xs"
                    >
                      <div className="p-0.5 mr-1.5">
                        <item.icon weight="thin" size={20} />
                      </div>
                      {item.type === "email" ? (
                        <a
                          href={`mailto:${item.text}`}
                          className="hover:text-[#005E96] transition-colors duration-300"
                        >
                          {item.text}
                        </a>
                      ) : item.type === "phone" ? (
                        <a
                          href={`tel:${item.text.replace(/\D/g, "")}`}
                          className="hover:text-[#005E96] transition-colors duration-300"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Row 2, Column 1 (2x1): All Hash Anchors of WhatWeDoPage.tsx */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  Telecommunications
                </h3>
                <div className="space-y-2">
                  {/* Telecommunications Section */}
                  <div>
                    {renderLinkColumns(
                      whatWeDoAnchors
                        .filter((link) => link.category === "Telecommunications")
                        .map(({ name, href }) => ({ name, href }))
                    )}
                  </div>
                  {/* Command & Control Section */}
                  {/* <div>
                    <h4 className="text-[#ECF0F1]/60 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Command & Control
                    </h4>
                    <ul className="space-y-1">
                      {whatWeDoAnchors
                        .filter((link) => link.category === "Command & Control")
                        .map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.href}
                              className="text-[#ECF0F1]/75 hover:text-[#44c8f5] text-xs transition-colors duration-300 flex items-center group"
                            >
                      <div className="p-0.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight weight="thin" size={20} />
                      </div>
                              {link.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div> */}
                </div>
              </motion.div>

              {/* Row 2, Column 2 (2x2): All Pages under Our Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  Command & Control
                </h3>
                {renderLinkColumns(ourImpactLinks.map(({ name, href }) => ({ name, href })))}
              </motion.div>

              {/* Row 2, Column 3 (2x3): Legal Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-[#ECF0F1] text-sm font-bold mb-3">
                  Legal & Utility
                </h3>
                {renderLinkColumns(legalUtilityLinks.map(({ name, href }) => ({ name, href })))}
              </motion.div>
            </div>
          </div>
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-[#ECF0F1]/10 mt-8 pt-6 flex justify-center"
          >
            <div className="flex items-center text-[#ECF0F1]/60 text-xs">
              <div className="p-0.5 mr-1.5">
                <ShareNetwork weight="thin" size={20} />
              </div>
              <span>
                &copy; {currentYear} Hajz Telecommunication Co Ltd.. All rights reserved.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
