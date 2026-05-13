export interface NavItem {
  label: string;
  path: string;
  category?: string;
  children?: { label: string; path: string; anchors?: { label: string; path: string }[] }[];
}

export interface FooterLink { name: string; href: string }
export interface ContactInfo { text: string; href?: string }

export interface Translations {
  fontFamily: string;
  fontFamilyHeading: string;
  fontFamilyBody: string;

  // Common
  common: {
    learnMore: string;
    contactUs: string;
    getInTouch: string;
    readMore: string;
    back: string;
    home: string;
    selectSection: string;
    hoverSolution: string;
    onThisPage: string;
    tryAgain: string;
    goHome: string;
    errorTitle: string;
    errorMessage: string;
    notFoundTitle: string;
    notFoundMessage: string;
    backToHome: string;
    contactUs404: string;
    scroll: string;
  };

  // Language switcher
  langSwitch: { label: string };

  // Nav
  nav: {
    items: NavItem[];
    legalLinks: { label: string; path: string }[];
  };

  // Footer
  footer: {
    description: string;
    quickLinks: string;
    quickLinksItems: FooterLink[];
    aboutUs: string;
    aboutUsItems: FooterLink[];
    telecom: string;
    telecomItems: FooterLink[];
    commandControl: string;
    commandItems: FooterLink[];
    contact: string;
    contactInfo: ContactInfo[];
    legal: string;
    legalItems: FooterLink[];
    copyright: string;
    getInTouch: string;
    contactHeading: string;
    contactSubtitle: string;
    newsletterHeading: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    companyName: string;
  };

  // Sticky form
  stickyForm: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
  };

  // FAQ
  faqSection: { title: string };

  // Customers page
  customersPage: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subtitle: string;
    bannerLabel: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };

  // Partners page
  partnersPage: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subtitle: string;
    bannerLabel: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };

  // Privacy page
  privacyPage: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    lastUpdated: string;
    sections: { heading: string; content: string; items?: string[] }[];
  };

  // Terms page
  termsPage: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    lastUpdated: string;
    sections: { heading: string; content: string; items?: string[] }[];
  };

  // Sitemap page
  sitemapPage: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    sections: { title: string; links: { name: string; path: string }[] }[];
  };

  // Contact page
  contactPage: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subtitle: string;
    formTitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectOptions: { value: string; label: string }[];
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    infoCards: { title: string; text: string }[];
    promisesTitle: string;
    promises: { title: string; text: string }[];
    reachUsTitle: string;
    reachUsBody: string;
    whatToExpectLabel: string;
    whatToExpectSteps: string[];
    subjectFieldLabel: string;
    messageFieldLabel: string;
    formFieldsNote: string;
    privacyNote: string;
    contactDetails: string;
    followUs: string;
    voiceLabel: string;
    voiceHeading: string;
    placeLabel: string;
    placeHeading: string;
    digitalLabel: string;
    digitalHeading: string;
    locationShort: string;
  };

  // Telecommunications page
  telecomPage: {
    seoTitle: string;
    seoDescription: string;
    badge: string;
    headline: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subheadline: string;
    heroImageAlt: string;
    breadcrumbs: { home: string; whatWeDo: string; telecom: string };
    coreSolutionsTitle: string;
    coreSolutionsHighlight: string;
    coreSolutionsSubtitle: string;
    serviceStandardsTitle: string;
    serviceStandardsHighlight: string;
    swipeHint: string;
    faqSubtitle: string;
    businessUnits: { title: string; description: string }[];
    serviceStandards: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  };

  // Command & Control page
  commandControlPage: {
    seoTitle: string;
    seoDescription: string;
    badge: string;
    headline: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subheadline: string;
    heroImageAlt: string;
    breadcrumbs: { home: string; whatWeDo: string; commandControl: string };
    coreSolutionsTitle: string;
    coreSolutionsHighlight: string;
    coreSolutionsSubtitle: string;
    techStackTitle: string;
    techStackHighlight: string;
    techStackSubtitle: string;
    industriesTitle: string;
    industriesHighlight: string;
    industriesSubtitle: string;
    swipeHint: string;
    faqSubtitle: string;
    industriesFooter: string;
    technicalAdvantages: { title: string; description: string }[];
    coreSolutions: { title: string; description: string }[];
    techStack: { title: string; description: string }[];
    industries: { title: string; description: string }[];
    processSteps: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  };

  // What We Do page
  whatWeDoPage: {
    seoTitle: string;
    seoDescription: string;
    heroBadge: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    keyFeatures: string;
    benefits: string;
    learnMore: string;
    faqSubtitle: string;
    breadcrumbs: { home: string; whatWeDo: string };
    faq: { question: string; answer: string }[];
    solutions: {
      title: string;
      description: string;
      features: string[];
      benefits: string[];
    }[];
  };

  // Hero customers banner accessibility labels
  heroBanner: {
    scrollLeft: string;
    scrollRight: string;
    trustedHeading: string;
    trustedSubtitle: string;
    swipeHint: string;
    visitAriaLabel: string;
  };

  // Contact form validation
  contactValidation: {
    nameRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    messageRequired: string;
    tooManySubmissions: string;
  };

  // Hero canvas section
  networkHero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    headlineSuffix: string;
    subheadline: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustedBy: string;
    initialising: string;
    ariaLabel: string;
    trustedLogosLabel: string;
  };

  // Hero carousel
  heroCarousel: {
    slides: { department: string; title: string; subline: string }[];
    comingSoon: string;
    exploreDepartment: string;
  };

  // Solutions carousel
  solutionsCarousel: {
    learnMore: string;
    prevSolution: string;
    nextSolution: string;
    goToSolution: string;
    solutions: { title: string; description: string }[];
  };

  // Company teaser section
  companyTeaser: {
    label: string;
    heading: string;
    body: string;
    cta: string;
  };

  // Homepage services grid
  homePage: {
    seoTitle: string;
    seoDescription: string;
    exploreMore: string;
    telecomServices: { title: string; subtitle: string };
    commandControlServices: { title: string; subtitle: string };
    exploreTelecom: string;
    exploreCommandControl: string;
    reachScaleSpeed: {
      reach: { title: string; description: string };
      scale: { title: string; description: string };
      speed: { title: string; description: string };
    };
    services: {
      systemIntegration: { title: string; description: string };
      connectivityTransmission: { title: string; description: string };
      unifiedCommunication: { title: string; description: string };
      accessLanOsp: { title: string; description: string };
      controlRoomSoftware: { title: string; description: string };
      videoWallsInfrastructure: { title: string; description: string };
    };
    telecomPageServices: {
      systemIntegration: { title: string; description: string };
      connectivity: { title: string; description: string };
      unifiedCommunication: { title: string; description: string };
      accessLan: { title: string; description: string };
      militaryCritical: { title: string; description: string };
    };
    commandPageServices: {
      controlRoom: { title: string; description: string };
      software: { title: string; description: string };
      videoWalls: { title: string; description: string };
      servers: { title: string; description: string };
      aiSoftware: { title: string; description: string };
    };
    learnMore: string;
  };

  // About Us page (overview)
  aboutUsPage: {
    seoTitle: string;
    seoDescription: string;
    hero: {
      badge: string;
      headline: string;
      headlineHighlight: string;
      summary: string;
      heroImageAlt: string;
      visionMissionImageAlt: string;
      competitiveEdgeImageAlt: string;
    };
    identity: {
      mission: string;
      vision: string;
      missionBullets: string[];
      visionBullets: string[];
    };
    whyUs: {
      sectionTitle: string;
      sectionSubtitle: string;
      valuePropTitle: string;
      valuePropTitleHighlight: string;
      valuePropSubtitle: string;
      reasonsCount: string;
      reasonsLabel: string;
      valueProps: { title: string; description: string }[];
    };
    journey: {
      intro: string;
      events: { date: string; title: string; description: string }[];
    };
    companyIdentity: {
      sectionTitle: string;
      sectionSubtitle: string;
      blocks: { title: string; paragraphs: string[] }[];
      pillarsLabel: string;
    };
    sections: {
      whoWeAre: string;
      whoWeAreHighlight: string;
      companyIdentity: string;
      companyIdentityHighlight: string;
      ourJourney: string;
      ourJourneyHighlight: string;
      visionMission: string;
      visionMissionHighlight: string;
      coreStrengths: string;
      coreStrengthsHighlight: string;
      whyChooseUs: string;
      competitiveEdge: string;
      competitiveEdgeHighlight: string;
      ourMission: string;
      ourMissionHighlight: string;
      ourVision: string;
      ourVisionHighlight: string;
    };
    breadcrumbs: { home: string; about: string; overview: string };
    coreStrengths: {
      intro: string;
      items: { title: string; description: string }[];
    };
    competitiveEdge: {
      sectionTitle: string;
      sectionSubtitle: string;
      items: string[];
    };
    stats: {
      yearsExperience: string;
      coreStrengthsCount: string;
      competitiveEdgeCount: string;
    };
    cta: { heading: string; body: string };
    dragScroll: string;
  };
}
