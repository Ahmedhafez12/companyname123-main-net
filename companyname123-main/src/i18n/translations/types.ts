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
    };
  };
}
