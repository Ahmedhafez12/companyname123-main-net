import type { Translations } from "./types";

const en: Translations = {
  fontFamily: '"Montserrat", system-ui, sans-serif',
  fontFamilyHeading: '"Montserrat", system-ui, sans-serif',
  fontFamilyBody: '"Rubik", system-ui, sans-serif',

  common: {
    learnMore: "Learn More",
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    readMore: "Read More",
    back: "Back",
    home: "Home",
    selectSection: "Select a section to see links.",
    hoverSolution: "Hover a solution area for section links.",
    onThisPage: "On this page",
    tryAgain: "Try Again",
    goHome: "Go Home",
    errorTitle: "Something went wrong",
    errorMessage:
      "We're sorry, an unexpected error occurred. Please try again.",
  },

  langSwitch: { label: "العربية" },

  nav: {
    items: [
      { label: "Home", path: "/" },
      {
        label: "About Us",
        path: "/about/overview",
        category: "about",
        children: [
          { label: "Who We Are", path: "/about/overview#what-we-do" },
          {
            label: "Company Identity",
            path: "/about/overview#company-identity",
          },
          { label: "Our Journey", path: "/about/overview#our-journey" },
          { label: "Vision & Mission", path: "/about/overview#vision-mission" },
          { label: "Core Strengths", path: "/about/overview#core-strengths" },
          { label: "Why Choose Us", path: "/about/overview#why-choose-us" },
          {
            label: "Competitive Edge",
            path: "/about/overview#competitive-edge",
          },
        ],
      },
      {
        label: "Solutions",
        path: "/what-we-do/telecommunications",
        category: "solutions",
        children: [
          {
            label: "Telecommunications",
            path: "/what-we-do/telecommunications",
            anchors: [
              {
                label: "Overview",
                path: "/what-we-do/telecommunications#overview",
              },
              {
                label: "Our Core Solutions",
                path: "/what-we-do/telecommunications#business-unit",
              },
              {
                label: "Service Standards",
                path: "/what-we-do/telecommunications#service-Standards",
              },
            ],
          },
          {
            label: "Command & Control",
            path: "/what-we-do/command-control",
            anchors: [
              {
                label: "Overview",
                path: "/what-we-do/command-control#overview",
              },
              {
                label: "Our Core Solutions",
                path: "/what-we-do/command-control#core-solutions",
              },
              {
                label: "Technology Stack",
                path: "/what-we-do/command-control#tech-stack",
              },
              {
                label: "Industries We Serve",
                path: "/what-we-do/command-control#industries-served",
              },
            ],
          },
        ],
      },
      {
        label: "Our Impact",
        path: "/customers",
        category: "our-impact",
        children: [
          { label: "Our Customers", path: "/customers" },
          { label: "Our Partners", path: "/partners" },
        ],
      },
      { label: "Contact Us", path: "/contact" },
    ],
    legalLinks: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Sitemap", path: "/sitemap" },
    ],
  },

  footer: {
    description:
      "Leading the telecommunications revolution with innovative solutions and unparalleled expertise in global connectivity.",
    quickLinks: "Quick Links",
    quickLinksItems: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about/overview" },
      { name: "What We Do", href: "/what-we-do/telecommunications" },
      { name: "Solutions", href: "/solutions" },
      { name: "Contact", href: "/contact" },
    ],
    aboutUs: "About Us",
    aboutUsItems: [
      { name: "Company Overview", href: "/about/overview" },
      { name: "Our Journey", href: "/about/overview#our-journey" },
      { name: "Vision & Mission", href: "/about/overview#vision-mission" },
    ],
    telecom: "Telecommunications",
    telecomItems: [
      { name: "Overview", href: "/what-we-do/telecommunications" },
      {
        name: "Core Solutions",
        href: "/what-we-do/telecommunications#business-unit",
      },
    ],
    commandControl: "Command & Control",
    commandItems: [
      { name: "Overview", href: "/what-we-do/command-control" },
      {
        name: "Core Solutions",
        href: "/what-we-do/command-control#core-solutions",
      },
    ],
    contact: "Contact",
    contactInfo: [
      { text: "htc@hajztel.com.sa", href: "mailto:htc@hajztel.com.sa" },
      { text: "+966 11 405 9419", href: "tel:+966114059419" },
      { text: "Riyadh, Saudi Arabia" },
    ],
    legal: "Legal",
    legalItems: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Sitemap", href: "/sitemap" },
    ],
    copyright: "Hajz Telecommunication Co Ltd. All rights reserved.",
    getInTouch: "Get in touch",
  },

  stickyForm: {
    title: "Quick Contact",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Your message...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successMessage: "We'll get back to you shortly.",
    errorTitle: "Failed to Send",
    errorMessage: "Please try again later.",
  },

  faqSection: { title: "Frequently Asked Questions" },

  customersPage: {
    seoTitle: "Our Customers | Trusted by Global Enterprises",
    seoDescription:
      "Discover the global enterprises that trust Hajz Telecommunication Co Ltd. for telecom infrastructure, network solutions, and technology services.",
    eyebrow: "Our Customers",
    headline: "Trusted by ",
    headlineHighlight: "Global Leaders",
    subtitle:
      "We are proud to serve some of the world's most recognised organisations across telecommunications, finance, and technology.",
    bannerLabel: "Trusted by industry leaders worldwide",
    ctaEyebrow: "Get in Touch",
    ctaTitle: "Interested in working with us?",
    ctaText:
      "Get in touch to learn how Hajz can support your organisation's telecommunications needs.",
    ctaButton: "Contact Us",
  },

  partnersPage: {
    seoTitle: "Technology Partners | Hajz Telecom Alliances",
    seoDescription:
      "Meet the technology partners who collaborate with Hajz Telecommunication Co Ltd. to deliver world-class telecom and network infrastructure solutions.",
    eyebrow: "Our Partners",
    headline: "Building the future ",
    headlineHighlight: "together",
    subtitle:
      "We collaborate with leading technology providers to deliver comprehensive telecommunications solutions.",
    bannerLabel: "Our global partner network",
    ctaEyebrow: "Partner With Us",
    ctaTitle: "Interested in becoming a partner?",
    ctaText:
      "Get in touch to explore partnership opportunities with Hajz Telecommunication Co Ltd.",
    ctaButton: "Contact Us",
  },

  privacyPage: {
    seoTitle: "Privacy Policy | Hajz Telecommunication Co Ltd.",
    seoDescription:
      "Hajz Telecommunication Co Ltd.'s privacy policy explains how we collect, use, store, and protect your personal information when you use our services and website.",
    title: "Privacy Policy",
    lastUpdated: "Last updated:",
    sections: [
      {
        heading: "1. Information We Collect",
        content:
          "We collect information that you provide directly to us, including:",
        items: [
          "Contact information (name, email, phone number)",
          "Company information",
          "Communication preferences",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        content: "We use the information we collect to:",
        items: [
          "Provide and improve our services",
          "Communicate with you",
          "Send important updates and announcements",
          "Respond to your requests and inquiries",
        ],
      },
      {
        heading: "3. Information Security",
        content:
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, modification, or destruction.",
      },
      {
        heading: "4. Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us at:\nEmail: privacy@hajztelecom.com\nPhone: +966 11 405 9419",
      },
    ],
  },

  termsPage: {
    seoTitle: "Terms of Service | Hajz Telecommunication Co Ltd.",
    seoDescription:
      "Review Hajz Telecommunication Co Ltd.'s terms of service outlining the rules, guidelines, and conditions for using our telecom services and website.",
    title: "Terms of Service",
    lastUpdated: "Last updated:",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        content:
          "By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      },
      {
        heading: "2. Use of Services",
        content:
          "You agree to use our services only for lawful purposes and in accordance with these Terms.",
        items: [
          "Maintain accurate account information",
          "Protect your account credentials",
          "Comply with all applicable laws and regulations",
        ],
      },
      {
        heading: "3. Service Modifications",
        content:
          "We reserve the right to modify or discontinue any part of our services at any time without notice.",
      },
      {
        heading: "4. Limitation of Liability",
        content:
          "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
      },
      {
        heading: "5. Contact Information",
        content:
          "For any questions regarding these Terms, please contact us at:\nEmail: legal@hajztelecom.com\nPhone: +966 11 405 9419",
      },
    ],
  },

  sitemapPage: {
    seoTitle: "Sitemap | Hajz Telecommunication Co Ltd.",
    seoDescription:
      "Browse the full site structure of Hajz Telecommunication Co Ltd. Find links to all our pages including services, solutions, partners, and contact information.",
    title: "Sitemap",
    sections: [
      {
        title: "Main Pages",
        links: [
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
          { name: "Solutions", path: "/solutions" },
          { name: "Our Customers", path: "/customers" },
          { name: "Our Partners", path: "/partners" },
          { name: "Contact", path: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { name: "Privacy Policy", path: "/privacy" },
          { name: "Terms of Service", path: "/terms" },
        ],
      },
    ],
  },

  contactPage: {
    seoTitle: "Contact Us | Hajz Telecommunication Co Ltd.",
    seoDescription:
      "Contact Hajz Telecommunication Co Ltd. for telecommunications infrastructure, command & control systems, and managed services. Riyadh, Saudi Arabia.",
    eyebrow: "Contact Us",
    headline: "Let's ",
    headlineHighlight: "Connect",
    subtitle:
      "Ready to transform your telecommunications? Reach out and let us help.",
    formTitle: "Send us a message",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    subjectLabel: "Select a subject",
    subjectOptions: [
      { value: "", label: "Select a subject" },
      { value: "general", label: "General Inquiry" },
      { value: "sales", label: "Sales & Partnerships" },
      { value: "support", label: "Technical Support" },
      { value: "partnership", label: "Strategic Partnership" },
      { value: "other", label: "Other" },
    ],
    messagePlaceholder: "Your message...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successMessage:
      "Thank you for reaching out. We'll get back to you within 24 hours.",
    infoCards: [
      { title: "Email", text: "htc@hajztel.com.sa" },
      { title: "Phone", text: "+966 11 405 9419" },
      { title: "Location", text: "Riyadh, Saudi Arabia" },
    ],
    promisesTitle: "Our Promise",
    promises: [
      {
        title: "Security First",
        text: "Your data is encrypted and protected.",
      },
      {
        title: "24hr Response",
        text: "We'll respond within one business day.",
      },
      { title: "Expert Support", text: "Speak directly with our specialists." },
    ],
  },

  aboutUsPage: {
    seoTitle: "About Us | Hajz Telecommunication Co Ltd.",
    seoDescription:
      "Learn about Hajz Telecommunication Co Ltd., 32+ years of telecommunications excellence in Saudi Arabia.",
    hero: {
      badge: "About HTC",
      headline: "Who We",
      headlineHighlight: "Are",
      summary:
        "32+ years of telecommunications excellence. We partner in legacy-to-digital migration, unified communications, and command & control. Driven by clarity, respect, and commitment.",
    },
    identity: {
      mission:
        "Hajz Telecom crafts dependable, high-performance communication systems that propel businesses forward. We partner closely with enterprises, government, and defense clients across our markets to overcome operational hurdles with precision-engineered support and unwavering reliability nurturing homegrown talent to pioneer solutions that deliver enduring value and excellence.",
      vision:
        "Bridging legacies and technology gaps to unlock true digital innovation. We empower enterprises, government, and defense across our markets with mission critical, unbreakable connectivity igniting a new generation of local experts to innovate, customize, and conquer your toughest challenges with unwavering confidence.",
      missionBullets: [
        "Empowering communities through cutting-edge technology.",
        "Driving progress with high-quality solutions.",
        "Enhancing connectivity for daily life and growth.",
      ],
      visionBullets: [
        "Personalized solutions for unique needs.",
        "Top-tier services and products that add value.",
        "Improving businesses and lives.",
      ],
    },
    whyUs: {
      sectionTitle: "Why Us",
      sectionSubtitle: "What sets HTC apart in telecommunications excellence.",
      valueProps: [
        {
          title: "Seamless Migration",
          description:
            "Zero-downtime transitions from legacy to modern systems.",
        },
        {
          title: "Turnkey Projects",
          description: "End-to-end delivery from design to ongoing management.",
        },
        {
          title: "Proactive Managed Services",
          description:
            "Continuous monitoring and optimization for peak performance.",
        },
        {
          title: "Agile Delivery",
          description: "Flexible teams adapt to your timelines and budgets.",
        },
        {
          title: "Tangible Impact",
          description:
            "Focus on productivity, customer experience, and growth.",
        },
      ],
    },
    journey: {
      intro:
        "From our founding to today, we have led telecommunications innovation.",
      events: [
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
            "STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pregain solution and serve more than 2500+ key customer",
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
      ],
    },
    companyIdentity: {
      sectionTitle: "Company Identity",
      sectionSubtitle:
        "The three pillars that define who we are and how we work with our customers and communities.",
      blocks: [
        {
          title: "Clarity, Respect & Commitment",
          paragraphs: [
            "We believe clarity drives confidence. By communicating transparently and aligning our actions with our words, we ensure that our goals and expectations are always understood.",
            "Respect guides how we engage with our colleagues, customers, and partners\u2014fostering a culture of trust, inclusiveness, and mutual growth.",
            "Our commitment defines our reliability. We take ownership of every promise, consistently delivering quality, value, and results that strengthen our long-term partnerships and reputation.",
          ],
        },
        {
          title: "Innovation, Quality & Community Impact",
          paragraphs: [
            "Innovation is our DNA. We invest in emerging technologies and agile methods to keep our solutions ahead of the curve.",
            "Quality is non-negotiable. Every project meets rigorous standards before it ships.",
            "We measure success by the positive impact we create for communities and economies we serve.",
          ],
        },
        {
          title: "Trust, Partnership & Growth",
          paragraphs: [
            "Trust is earned through consistent delivery and transparent communication.",
            "Partnership means walking alongside our clients from concept to completion and beyond.",
            "Growth is a shared journey\u2014we grow when our customers grow.",
          ],
        },
      ],
    },
  },
};

export default en;
