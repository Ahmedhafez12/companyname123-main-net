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
    notFoundTitle: "Page not found",
    notFoundMessage:
      "The page you're looking for doesn't exist or has been moved.",
    backToHome: "Back to home",
    contactUs404: "Contact us",
    scroll: "Scroll",
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
      { text: "+966 11 4059419", href: "tel:+966114059419" },
      {
        text: "Prince Abdulaziz bin Musaid bin Jalawi St., Riyadh, Saudi Arabia",
      },
    ],
    legal: "Legal",
    legalItems: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Sitemap", href: "/sitemap" },
    ],
    copyright: "Hajz Telecommunication Co Ltd. All rights reserved.",
    getInTouch: "Get in touch",
    contactHeading: "Get in Touch",
    contactSubtitle: "Have questions about our solutions? We're here to help.",
    newsletterHeading: "Stay Updated",
    newsletterSubtitle: "Subscribe to our newsletter for the latest updates.",
    newsletterPlaceholder: "Your email",
    companyName: "HTC Telecommunications",
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
          "If you have any questions about this Privacy Policy, please contact us at:\nEmail: htc@hajztel.com.sa\nPhone: +966 11 4059419",
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
          "For any questions regarding these Terms, please contact us at:\nEmail: htc@hajztel.com.sa\nPhone: +966 11 4059419",
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
      { title: "Phone", text: "+966 11 4059419" },
      {
        title: "Location",
        text: "Prince Abdulaziz bin Musaid bin Jalawi St., Riyadh, Saudi Arabia",
      },
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
    reachUsTitle: "Reach us directly",
    reachUsBody:
      "Prefer phone or email? Pick the channel that suits you and we'll respond the same business day.",
    whatToExpectLabel: "What to expect",
    whatToExpectSteps: [
      "We review your enquiry and assign a specialist within hours.",
      "You receive a tailored response — not a generic auto-reply.",
      "Initial scoping call within 1–2 business days, no pressure.",
    ],
    subjectFieldLabel: "Subject",
    messageFieldLabel: "Message",
    formFieldsNote: "Tell us about your project — fields marked are required.",
    privacyNote:
      "Your information is encrypted and will never be shared with third parties.",
    contactDetails: "Contact Details",
    followUs: "Follow Us",
    voiceLabel: "01 // VOICE",
    voiceHeading: "Communication Hub",
    placeLabel: "02 // PLACE",
    placeHeading: "Physical Presence",
    digitalLabel: "03 // DIGITAL",
    digitalHeading: "Digital Footprint",
    locationShort: "Riyadh, Saudi Arabia",
  },

  heroBanner: {
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
    trustedHeading: "Trusted by Industry Leaders",
    trustedSubtitle:
      "Partnering with global enterprises to deliver innovative telecommunications solutions.",
    swipeHint: "swipe to explore",
    visitAriaLabel: "Visit {name} website",
  },

  contactValidation: {
    nameRequired: "Name is required",
    emailInvalid: "Please enter a valid email",
    subjectRequired: "Please select a subject",
    messageRequired: "Message is required",
    tooManySubmissions: "Too many submissions. Please try again later.",
  },

  networkHero: {
    eyebrow: "Real Transformation",
    headline: "Simple.",
    headlineAccent: "Fast.",
    headlineSuffix: "Secure.",
    subheadline: "Networks You Can Trust.",
    body: "We provide high-performance, ultra-secure infrastructure for the world's most important companies.",
    ctaPrimary: "Get Started",
    ctaSecondary: "View Solutions",
    trustedBy: "Trusted By",
    initialising: "Initialising",
    ariaLabel: "Network hero sequence",
    trustedLogosLabel: "Trusted partner logos",
  },

  heroCarousel: {
    slides: [
      {
        department: "Telecommunications",
        title: "Telecommunication -Solutions",
        subline:
          "Transforming infrastructure chaos into competitive advantage with intelligent connectivity solutions that protect your past while accelerating your future.",
      },
      {
        department: "Command & Control",
        title: "Command & Control -Solutions",
        subline:
          "Connecting the dots between your ELV and other systems—ensuring smooth data flow, improved performance, and intelligent automation.",
      },
      {
        department: "Fixed Wireless Access",
        title: "Fixed Wireless Access -Solutions",
        subline:
          "High-speed enterprise connectivity delivered without the wires.",
      },
    ],
    comingSoon: "Coming Soon",
    exploreDepartment: "Explore Department",
  },

  solutionsCarousel: {
    learnMore: "Learn More",
    prevSolution: "Previous solution",
    nextSolution: "Next solution",
    goToSolution: "Go to solution",
    solutions: [
      {
        title: "Managed WiFi",
        description:
          "Next-generation mobile network infrastructure for unprecedented speed and reliability.",
      },
      {
        title: "Managed Fixed Wireless Access",
        description: "Scalable cloud solutions for modern business needs.",
      },
      {
        title: "Managed UC",
        description:
          "Comprehensive IoT network solutions for smart cities and industries.",
      },
      {
        title: "Infrastructure",
        description:
          "Enterprise-grade mobile connectivity and management platforms.",
      },
      {
        title: "Special MODA Solutions",
        description:
          "High-performance data center infrastructure and management.",
      },
      {
        title: "Remote Patient Management (RPM)",
        description:
          "Seamless international connectivity solutions for global enterprises.",
      },
    ],
  },

  companyTeaser: {
    label: "Our Story",
    heading: "Beyond the Cables and Connectivity.",
    body: 'We exist to bridge the gap between complex infrastructure and seamless communication. Our "why" is simple: we weave the digital fabric that keeps your operations secure, your people linked, and your data moving—so you can lead your industry without worrying about the link.',
    cta: "Learn More About Us",
  },

  homePage: {
    seoTitle: "Hajz Telecom | Telecommunications Solutions & Connectivity",
    seoDescription:
      "Hajz Telecommunication Co Ltd. delivers innovative telecom solutions, enterprise connectivity, and transformative network infrastructure across the globe.",
    exploreMore: "Explore More",
    telecomServices: {
      title: "Telecommunications Services",
      subtitle: "Enterprise solutions that transform your operations.",
    },
    commandControlServices: {
      title: "Command & Control Services",
      subtitle: "Control room, software, and infrastructure solutions.",
    },
    exploreTelecom: "Explore Telecommunications",
    exploreCommandControl: "Explore Command & Control",
    reachScaleSpeed: {
      reach: {
        title: "Reach",
        description:
          "Extend your network coverage to every corner of your operation with seamless connectivity solutions.",
      },
      scale: {
        title: "Scale",
        description:
          "Grow your infrastructure effortlessly with flexible solutions that adapt to your business needs.",
      },
      speed: {
        title: "Speed",
        description:
          "Accelerate your operations with high-performance networks designed for maximum efficiency.",
      },
    },
    services: {
      systemIntegration: {
        title: "System Integration",
        description:
          "Solutions that fit your network and support digital transformation.",
      },
      connectivityTransmission: {
        title: "Connectivity and Transmission",
        description:
          "Intelligent gateways that transform infrastructure into competitive advantage.",
      },
      unifiedCommunication: {
        title: "Unified Communication",
        description: "Bridge legacy and cloud for seamless collaboration.",
      },
      accessLanOsp: {
        title: "Access LAN and OSP",
        description: "Complete connectivity from fiber to Wi-Fi.",
      },
      controlRoomSoftware: {
        title: "Control Room & Software",
        description:
          "Ergonomic operations and custom software with intuitive interfaces.",
      },
      videoWallsInfrastructure: {
        title: "Video Walls & Infrastructure",
        description:
          "High-resolution video walls and flexible server infrastructure for scale.",
      },
    },
    telecomPageServices: {
      systemIntegration: {
        title: "System Integration",
        description:
          "Solutions that fit your network and support digital transformation.",
      },
      connectivity: {
        title: "Connectivity and Transmission",
        description:
          "Intelligent gateways that transform infrastructure into competitive advantage.",
      },
      unifiedCommunication: {
        title: "Unified Communication",
        description: "Bridge legacy and cloud for seamless collaboration.",
      },
      accessLan: {
        title: "Access LAN and OSP",
        description: "Complete connectivity from fiber to Wi-Fi.",
      },
      militaryCritical: {
        title: "Military and Critical Communication",
        description:
          "Encrypted, secured voice and data for critical operations.",
      },
    },
    commandPageServices: {
      controlRoom: {
        title: "Control Room Solutions",
        description:
          "Integrated command center environments providing 24/7 mission-critical visualization and ergonomic infrastructure.",
      },
      software: {
        title: "Software",
        description: "Custom software with intuitive interfaces and analytics.",
      },
      videoWalls: {
        title: "Video Walls",
        description: "High-resolution video walls for real-time monitoring.",
      },
      servers: {
        title: "Servers (On-prem/Cloud/Hybrid)",
        description: "Flexible server infrastructure for security and scale.",
      },
      aiSoftware: {
        title: "AI/Custom Software",
        description: "AI-powered automation and predictive insights.",
      },
    },
    learnMore: "Learn More",
  },

  whatWeDoPage: {
    seoTitle: "What We Do | Telecom & Network Infrastructure",
    seoDescription:
      "Explore Hajz Telecom's service areas: telecommunications, command & control systems, network infrastructure, and managed services for enterprise and government clients.",
    heroBadge: "Next-Generation Solutions",
    heroTitle: "What",
    heroTitleHighlight: "We Do",
    heroSubtitle:
      "Standard projects are our foundation, but breaking through limitations is our specialty.",
    keyFeatures: "Key Features",
    benefits: "Benefits",
    learnMore: "Learn More",
    faqSubtitle: "Common questions about Hajz Telecom's service capabilities.",
    breadcrumbs: { home: "Home", whatWeDo: "What We Do" },
    faq: [
      {
        question: "What services does Hajz Telecommunication Co Ltd. offer?",
        answer:
          "We provide telecommunications infrastructure, command & control systems, managed WiFi, cloud networking, cybersecurity, network cabling, VoIP, and end-to-end managed services for enterprise and government clients.",
      },
      {
        question: "Does Hajz Telecom work with specific technology vendors?",
        answer:
          "We are vendor-agnostic and partner with leading technology providers including Ericsson, Avaya, 3CX, Cambium Networks, Patton, and others to recommend the best-fit solution for each project.",
      },
      {
        question:
          "Can Hajz Telecom handle large-scale government or military projects?",
        answer:
          "Yes. We have 32+ years of experience delivering mission-critical telecommunications and command & control systems for government, defence, and enterprise clients across the Middle East.",
      },
    ],
    solutions: [
      {
        title: "Managed WiFi",
        description: "",
        features: [
          "Seamless Connectivity",
          "Centralized Management",
          "Enhanced Security",
          "Scalability",
          "Customizable User Access",
        ],
        benefits: [
          "Improved User Experience",
          "Reduced IT Burden",
          "Optimized Network Performance",
        ],
      },
      {
        title: "Managed Fixed Wireless Access",
        description: "",
        features: [
          "High-Speed Wireless Broadband",
          "Rapid Deployment",
          "Scalable Bandwidth Solutions",
          "Advanced Security & Encryption",
          "Network Redundancy",
        ],
        benefits: [
          "Cost-Effective Deployment",
          "Expanded Coverage",
          "Reliable Business Operations",
        ],
      },
      {
        title: "Managed UC",
        description:
          "Comprehensive IoT connectivity solutions for smart cities and industries.",
        features: [
          "Multi-Channel Communication",
          "Cloud-Based Collaboration",
          "AI-Powered Call Routing",
          "Integrated Contact Center Solutions",
          "Data Analytics",
        ],
        benefits: [
          "Enhanced Productivity",
          "Improved Customer Engagement",
          "Cost Savings",
        ],
      },
      {
        title: "Infrastructure",
        description:
          "Advanced security measures protecting your telecommunications infrastructure.",
        features: [
          "Scalable Network Architecture",
          "Cloud & Hybrid Deployments",
          "Automated Management",
          "High-Speed Fiber Backbone",
          "Disaster Recovery & Redundancy",
        ],
        benefits: [
          "Future-Proofing Investments",
          "Enhanced Reliability & Uptime",
          "Optimized IT Efficiency",
        ],
      },
      {
        title: "Special MODA Solutions",
        description:
          "Advanced security measures protecting your telecommunications infrastructure.",
        features: [
          "Tailored Network Deployment",
          "Advanced Cybersecurity Measures",
          "Mission-Critical Connectivity",
          "Encrypted Data Transmission",
          "Adaptive Technology Integration",
        ],
        benefits: [
          "Security & Compliance",
          "Reliable Performance in Critical Scenarios",
          "Adaptable to Emerging Threats",
        ],
      },
      {
        title: "RPM (Remote Patient Management)",
        description:
          "Advanced security measures protecting your telecommunications infrastructure.",
        features: [
          "Real-Time Patient Monitoring",
          "Secure Data Transmission",
          "AI-Based Health Analytics",
          "Mobile Access & Telehealth Integration",
          "Automated Alerts & Notifications",
        ],
        benefits: [
          "Real-time threat response",
          "Regulatory compliance",
          "Comprehensive protection",
        ],
      },
    ],
  },

  telecomPage: {
    seoTitle: "Telecommunications Services | Integration & Connectivity",
    seoDescription:
      "Comprehensive telecom services: system integration, enterprise connectivity, unified communications, and critical infrastructure for commercial and military applications.",
    badge: "Telecommunications",
    headline: "Telecommunications",
    headlineHighlight: "Telecommunications",
    headlineSuffix: "Solutions",
    subheadline:
      "Transforming infrastructure chaos into competitive advantage with intelligent connectivity solutions that protect your past while accelerating your future.",
    heroImageAlt: "Telecommunications Network Infrastructure",
    breadcrumbs: {
      home: "Home",
      whatWeDo: "What We Do",
      telecom: "Telecommunications",
    },
    coreSolutionsTitle: "Our",
    coreSolutionsHighlight: "Core Solutions",
    coreSolutionsSubtitle:
      "Comprehensive telecommunications solutions designed to meet your enterprise needs",
    serviceStandardsTitle: "Service",
    serviceStandardsHighlight: "Standards",
    swipeHint: "swipe to explore",
    faqSubtitle:
      "Common questions about our telecommunications services and capabilities.",
    businessUnits: [
      {
        title: "System Integration",
        description:
          "We design our solutions to fit your network supporting your digital transformation, not the other way around. Whether your infrastructure is fiber or copper (CAT6, CAT5 or CAT3), we seamlessly connect to it while supporting a full range of interfaces—from legacy E1, STM1, DS3, and RS232 to modern Ethernet and optical. We simplify complex signaling by bridging IP, legacy protocols, and RTP so different systems work together smoothly. With support for IP/MPLS, microwave, and VSAT uplinks, our platforms deliver end-to-end security, high availability, and automatic failover, ensuring your communication remains stable, resilient, and protected.",
      },
      {
        title: "Connectivity and Transmission",
        description:
          "Break Down Connectivity Barriers, we stop letting incompatible systems dictate your IT strategy. Our intelligent gateway ecosystem transforms infrastructure chaos into competitive advantage seamlessly connecting your data streams, voice communications, legacy investments, and video assets through one unified architecture. No rip-and-replace required, just smart evolution that protects your past while accelerating your future.",
      },
      {
        title: "Unified Communication",
        description:
          "We eliminate the false choice between cutting-edge cloud collaboration and your existing hardware investments, seamlessly bridging legacy analog systems, ISDN lines, and modern SIP trunks through enterprise grade gateways while unleashing IP PBX rich suite of video conferencing, mobile apps, and CRM integration across your workforce. Whether you're enabling hybrid teams with crystal-clear connectivity anywhere, plus securing your network with military-grade encryption, our integrated platform future-proofs your communications without the rip-and-replace disruption—delivering enterprise resilience with startup agility, today.",
      },
      {
        title: "Access LAN and OSP",
        description:
          "From fiber in the ground to Wi-Fi in the air, we architect the complete connectivity ecosystem that turns infrastructure into competitive advantage delivering hardened Outside Plant foundations, intelligent Enterprise Networking with seamless wired and wireless integration. Whether you're scaling secure Access layers, modernizing core Routers and Switches for software defined agility, or extending high speed connectivity to remote frontiers, our end-to-end portfolio eliminates multi-vendor complexity and accelerates your digital transformation with a single partner that builds the physical pathways and intelligent networks your business demands to thrive in an always on world.",
      },
      {
        title: "Military and Critical Communication",
        description:
          "Our Military and Critical Communication solutions transform tactical connectivity into decisive combat advantage delivering encrypted hotlines, AES-256 secured voice and fax transmission, and aerial photo distribution. Through NPOX (New Off-Premises Extension), we extend secure C2 capabilities to forward operating bases and mobile warfighters, while NALL (New Analog Lease Line) provides electromagnetic-hardened circuits that guarantee unbroken connectivity when digital networks fail. Integrated with encrypted E1 trunking, agile SIP Distribution systems, and automated early warning platforms, every component of our portfolio is engineered to enhance the combat efficiency of military units ensuring your forces maintain superior situational awareness, seamless coordination, and unwavering command authority.",
      },
    ],
    serviceStandards: [
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
    ],
    faq: [
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
          "With 32+ years of experience, vendor-agnostic solutions, senior-led project teams, expertise, and deep-dive knowledge in the technology we use regarding our solutions.",
      },
    ],
  },

  commandControlPage: {
    seoTitle: "Command & Control Solutions | Hajz Telecom",
    seoDescription:
      "Advanced command and control solutions connecting ELV and IT systems for intelligent building automation, surveillance, and operational performance monitoring.",
    badge: "Command & Control",
    headline: "Command",
    headlineHighlight: "& Control",
    headlineSuffix: "",
    subheadline:
      "Control Room Solution is a centralized system designed to monitor, manage, and control multiple devices (Surveillance Cameras, IOT Devices, Databases, AI, etc.) across a facility or a network of sites. It plays a critical role in ensuring safety, security, and operational efficiency in environments such as airports, banks, city surveillance systems, industrial plants, and commercial buildings.",
    heroImageAlt: "Command & Control Operations Center",
    breadcrumbs: {
      home: "Home",
      whatWeDo: "What We Do",
      commandControl: "Command & Control",
    },
    coreSolutionsTitle: "Our",
    coreSolutionsHighlight: "Core Solutions",
    coreSolutionsSubtitle:
      "We connect the dots between your ELV and other systems—ensuring smooth data flow, improved performance, and intelligent automation.",
    techStackTitle: "The Backbone of Every",
    techStackHighlight: "Command & Control Solution",
    techStackSubtitle: "",
    industriesTitle: "Industries",
    industriesHighlight: "We Serve",
    industriesSubtitle:
      "From public infrastructure to enterprise operations — we build command centers for every sector.",
    swipeHint: "swipe to explore more",
    faqSubtitle:
      "Common questions about our command and control integration services.",
    industriesFooter:
      "Design systems that connect people, data, and decisions for safer, smarter operations.",
    technicalAdvantages: [
      {
        title: "Expertise & Experience",
        description:
          "At htc we Have a Team world class Engineers who have consult and deployed command center across the Globe",
      },
      {
        title: "Tailored Solutions",
        description:
          "Our Solutions/design are 100 % tailor made for Each Requirement; we don't sell what we have but its customer requirement only",
      },
      {
        title: "Security First",
        description:
          "Our prime focus during designing solution is, to secure our customer control room and premises and sites by the use of Technologies",
      },
      {
        title: "Future-Proof Architecture",
        description:
          "Our scalable solutions grow with your business and support emerging technologies like AI and IoT.and can be Scalable for future",
      },
      {
        title: "End-to-End Support",
        description:
          "From initial planning to post-deployment support, we're with you every step of the way.",
      },
    ],
    coreSolutions: [
      {
        title: "Control Room Furniture",
        description:
          "We are committed to delivering innovative, reliable, and future-ready control room furniture solutions that meet the highest industry standards. By combining design expertise with technical understanding, we help organizations build efficient and comfortable control room environments that support critical decision-making around the clock with the support of our world class OEM Partner.",
      },
      {
        title: "Software",
        description:
          "Custom software solutions tailored to your command and control needs, providing intuitive interfaces and powerful analytics capabilities.",
      },
      {
        title: "Video Walls",
        description:
          "High-resolution video wall systems for real-time monitoring and visualization, enabling comprehensive oversight of all critical operations.",
      },
      {
        title: "Servers",
        description:
          "Flexible server infrastructure solutions supporting on-premises, cloud, or hybrid deployments to meet your specific security and scalability requirements.",
      },
      {
        title: "AI/Custom Software",
        description:
          "Advanced AI-powered custom software solutions that go beyond off-the-shelf products, delivering intelligent automation and predictive insights.",
      },
    ],
    techStack: [
      {
        title: "Cloud & AI",
        description:
          "Our Cloud and AI solutions delivers innovative, scalable, and intelligent technology solutions that help organizations transform, automate, and grow in a digital-first world. We provide solution with all major provider Like AWS, Azure Etc, By combining the power of cloud computing with advanced artificial intelligence, we enable businesses to optimize operations, enhance decision-making. Our Solutions/Applications can be run over Cloud, On Premises or Hybrid model solutions.",
      },
      {
        title: "Software & Analytics",
        description:
          "Our OEM's design and develop high-performance integration software applications tailored to meet the unique needs of businesses across various industries. From enterprise systems and web applications to mobile platforms and automation tools, our solutions are built to enhance productivity, improve user experience, and support business growth. These platforms are capable to integrate CCTV, access control, ANPR Frs ,IOTs, databases, etc.",
      },
      {
        title: "Server On-premises/Cloud/Hybrid",
        description:
          "We offer cloud-based server solutions hosted on leading platforms such as Amazon Web Services, Microsoft Azure, and Google Cloud Platform, enabling businesses to scale resources on demand, reduce capital expenditure, and ensure high availability. At the same time, we deliver robust on-premises server solutions for organizations that require full control over their data, enhanced security, or compliance with regulatory standards. Our on-site infrastructure services include server installation, configuration, virtualization, storage solutions, and ongoing maintenance. By integrating both environments into a hybrid model, we ensure seamless data flow, optimized performance, and operational flexibility. This approach allows businesses to keep critical workloads on-premises while leveraging the cloud for scalability, backup, and disaster recovery.",
      },
      {
        title: "Video Wall",
        description:
          "We provide high-performance video wall systems tailored for control rooms, command centers, corporate environments, retail spaces, and public venues. We offer end-to-end services—from consultation and design to installation and ongoing support—ensuring that each video wall system meets the specific operational and spatial requirements of our clients. Our systems are designed for 24/7 performance, minimal downtime, and easy scalability.",
      },
    ],
    industries: [
      { title: "Public & Infrastructure", description: "" },
      { title: "Corporate & Enterprise", description: "" },
    ],
    processSteps: [
      {
        title: "Design",
        description:
          "Requirements gathering, site surveys, and feasibility studies.",
      },
      {
        title: "Deploy",
        description:
          "Execution with in-house engineering and trusted partners.",
      },
      { title: "Manage", description: "AMC/SLA support for system longevity." },
      {
        title: "Tailor-Made",
        description:
          "Custom AI and software solutions beyond off-the-shelf products.",
      },
      {
        title: "Cost Cutting",
        description:
          "Reducing manpower and operational costs through integration.",
      },
    ],
    faq: [
      {
        question: "What is a Command & Control system?",
        answer:
          "A Command & Control (C2) system integrates Extra-Low Voltage (ELV) and IT systems into a unified platform for intelligent building automation, security surveillance, access control, and real-time operational monitoring.",
      },
      {
        question: "What systems can Hajz Telecom integrate into a C2 solution?",
        answer:
          "We integrate CCTV, access control, fire alarm, BMS, HVAC, public address, IP telephony, network infrastructure, and other ELV/IT systems into a single command dashboard.",
      },
      {
        question: "Which sectors benefit from Command & Control solutions?",
        answer:
          "Government facilities, military installations, commercial buildings, hospitality, healthcare, education campuses, and critical infrastructure all benefit from centralised C2 systems.",
      },
      {
        question: "Does Hajz Telecom provide ongoing support for C2 systems?",
        answer:
          "Yes. We offer managed services including 24/7 monitoring, preventive maintenance, software updates, and dedicated support teams to keep your command centre running at peak performance.",
      },
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
      heroImageAlt: "HTC telecommunications and connectivity",
      visionMissionImageAlt: "Telecommunications and connectivity",
      competitiveEdgeImageAlt: "Advanced telecommunications network",
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
      valuePropTitle: "Value",
      valuePropTitleHighlight: "Proposition",
      valuePropSubtitle:
        "What sets us apart in delivering transformative technology solutions.",
      reasonsCount: "5",
      reasonsLabel: "Reasons",
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
      ],
    },
    sections: {
      whoWeAre: "Who We",
      whoWeAreHighlight: "Are",
      companyIdentity: "Company",
      companyIdentityHighlight: "Identity",
      ourJourney: "Our",
      ourJourneyHighlight: "Journey",
      visionMission: "Vision &",
      visionMissionHighlight: "Mission",
      coreStrengths: "Core",
      coreStrengthsHighlight: "Strengths",
      whyChooseUs: "Why Choose Us",
      competitiveEdge: "Competitive",
      competitiveEdgeHighlight: "Edge",
      ourMission: "Our",
      ourMissionHighlight: "Mission",
      ourVision: "Our",
      ourVisionHighlight: "Vision",
    },
    breadcrumbs: { home: "Home", about: "About", overview: "Overview" },
    coreStrengths: {
      intro:
        "The capabilities that drive our success and deliver value to clients.",
      items: [
        {
          title: "32+ Years",
          description:
            "Expertise in telecom, system integration, and legacy-to-digital migration.",
        },
        {
          title: "Legacy-to-Digital",
          description:
            "Transitioning legacy systems to modern infrastructure without disruption.",
        },
        {
          title: "Agile Delivery",
          description: "Senior-led teams deliver on time and within budget.",
        },
        {
          title: "Senior-Led Teams",
          description:
            "Deep industry knowledge and technical excellence on every project.",
        },
        {
          title: "Risk-Free Migration",
          description:
            "Proven methodologies protect operations while enabling transformation.",
        },
        {
          title: "Proven Track Record",
          description:
            "Success across defense, infrastructure, banking, and enterprise.",
        },
      ],
    },
    competitiveEdge: {
      sectionTitle: "Competitive Edge",
      sectionSubtitle:
        "What makes us the partner of choice for complex communications and control environments.",
      items: [
        "Specialist in moving from legacy systems to modern, integrated communication platforms with minimal risk and disruption.",
        "Designs and deploys end-to-end solutions across UC, IP PBX, contact center, gateways, fixed wireless access, and command and control as a single accountable partner.",
        "Provides ongoing managed services, ensuring your environment is monitored, supported, and continuously optimized.",
        "Operates with agile, senior-led teams that adapt to your timelines, budgets, and operational constraints.",
        "Focuses on clear business outcomes: higher productivity, better customer experience, and improved cost efficiency.",
      ],
    },
    stats: {
      yearsExperience: "32+",
      coreStrengthsCount: "6",
      competitiveEdgeCount: "5",
    },
    cta: {
      heading: "Ready to Learn More?",
      body: "Explore our journey and see how we have shaped the telecommunications landscape.",
    },
    dragScroll: "Drag or scroll to explore",
    companyIdentity: {
      sectionTitle: "Company Identity",
      sectionSubtitle:
        "The three pillars that define who we are and how we work with our customers and communities.",
      pillarsLabel: "Pillars",
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
