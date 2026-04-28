import type { Translations } from "./types";

const ar: Translations = {
  fontFamily:
    '"IBM Plex Sans Arabic", "Frutiger LT Arabic", system-ui, sans-serif',
  fontFamilyHeading: '"IBM Plex Sans Arabic", system-ui, sans-serif',
  fontFamilyBody:
    '"Frutiger LT Arabic", "IBM Plex Sans Arabic", system-ui, sans-serif',

  common: {
    learnMore: "اعرف المزيد",
    contactUs: "تواصل معنا",
    getInTouch: "تواصل معنا",
    readMore: "اقرأ المزيد",
    back: "رجوع",
    home: "الرئيسية",
    selectSection: "اختر قسماً لعرض الروابط.",
    hoverSolution: "مرر على أحد الحلول لعرض الأقسام.",
    onThisPage: "في هذه الصفحة",
    tryAgain: "حاول مجدداً",
    goHome: "الصفحة الرئيسية",
    errorTitle: "حدث خطأ",
    errorMessage: "نأسف، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
  },

  langSwitch: { label: "English" },

  nav: {
    items: [
      { label: "الرئيسية", path: "/" },
      {
        label: "من نحن",
        path: "/about/overview",
        category: "about",
        children: [
          { label: "من نحن", path: "/about/overview#what-we-do" },
          { label: "هوية الشركة", path: "/about/overview#company-identity" },
          { label: "مسيرتنا", path: "/about/overview#our-journey" },
          { label: "الرؤية والرسالة", path: "/about/overview#vision-mission" },
          { label: "نقاط القوة", path: "/about/overview#core-strengths" },
          { label: "لماذا نحن", path: "/about/overview#why-choose-us" },
          {
            label: "الميزة التنافسية",
            path: "/about/overview#competitive-edge",
          },
        ],
      },
      {
        label: "الحلول",
        path: "/what-we-do/telecommunications",
        category: "solutions",
        children: [
          {
            label: "الاتصالات",
            path: "/what-we-do/telecommunications",
            anchors: [
              {
                label: "نظرة عامة",
                path: "/what-we-do/telecommunications#overview",
              },
              {
                label: "حلولنا الأساسية",
                path: "/what-we-do/telecommunications#business-unit",
              },
              {
                label: "معايير الخدمة",
                path: "/what-we-do/telecommunications#service-Standards",
              },
            ],
          },
          {
            label: "القيادة والتحكم",
            path: "/what-we-do/command-control",
            anchors: [
              {
                label: "نظرة عامة",
                path: "/what-we-do/command-control#overview",
              },
              {
                label: "حلولنا الأساسية",
                path: "/what-we-do/command-control#core-solutions",
              },
              {
                label: "المنظومة التقنية",
                path: "/what-we-do/command-control#tech-stack",
              },
              {
                label: "القطاعات التي نخدمها",
                path: "/what-we-do/command-control#industries-served",
              },
            ],
          },
        ],
      },
      {
        label: "أثرنا",
        path: "/customers",
        category: "our-impact",
        children: [
          { label: "عملاؤنا", path: "/customers" },
          { label: "شركاؤنا", path: "/partners" },
        ],
      },
      { label: "تواصل معنا", path: "/contact" },
    ],
    legalLinks: [
      { label: "سياسة الخصوصية", path: "/privacy" },
      { label: "شروط الخدمة", path: "/terms" },
      { label: "خريطة الموقع", path: "/sitemap" },
    ],
  },

  footer: {
    description:
      "نقود ثورة الاتصالات بحلول مبتكرة وخبرة لا مثيل لها في الاتصال العالمي.",
    quickLinks: "روابط سريعة",
    quickLinksItems: [
      { name: "الرئيسية", href: "/ar" },
      { name: "من نحن", href: "/ar/about/overview" },
      { name: "ماذا نفعل", href: "/ar/what-we-do/telecommunications" },
      { name: "الحلول", href: "/ar/solutions" },
      { name: "تواصل معنا", href: "/ar/contact" },
    ],
    aboutUs: "من نحن",
    aboutUsItems: [
      { name: "نظرة عامة", href: "/ar/about/overview" },
      { name: "مسيرتنا", href: "/ar/about/overview#our-journey" },
      { name: "الرؤية والرسالة", href: "/ar/about/overview#vision-mission" },
    ],
    telecom: "الاتصالات",
    telecomItems: [
      { name: "نظرة عامة", href: "/ar/what-we-do/telecommunications" },
      {
        name: "حلولنا الأساسية",
        href: "/ar/what-we-do/telecommunications#business-unit",
      },
    ],
    commandControl: "القيادة والتحكم",
    commandItems: [
      { name: "نظرة عامة", href: "/ar/what-we-do/command-control" },
      {
        name: "حلولنا الأساسية",
        href: "/ar/what-we-do/command-control#core-solutions",
      },
    ],
    contact: "اتصل بنا",
    contactInfo: [
      { text: "htc@hajztel.com.sa", href: "mailto:htc@hajztel.com.sa" },
      { text: "+٩٦٦ ١١ ٠٠٠ ٠٠٠٠", href: "tel:+966114059419" },
      { text: "الرياض، المملكة العربية السعودية" },
    ],
    legal: "قانوني",
    legalItems: [
      { name: "سياسة الخصوصية", href: "/ar/privacy" },
      { name: "شروط الخدمة", href: "/ar/terms" },
      { name: "خريطة الموقع", href: "/ar/sitemap" },
    ],
    copyright: "شركة حجز للاتصالات المحدودة. جميع الحقوق محفوظة.",
    getInTouch: "تواصل معنا",
  },

  stickyForm: {
    title: "تواصل سريع",
    namePlaceholder: "اسمك",
    emailPlaceholder: "بريدك الإلكتروني",
    subjectPlaceholder: "الموضوع",
    messagePlaceholder: "رسالتك...",
    submit: "إرسال الرسالة",
    sending: "جاري الإرسال...",
    successTitle: "تم الإرسال!",
    successMessage: "سنتواصل معك قريباً.",
    errorTitle: "فشل الإرسال",
    errorMessage: "يرجى المحاولة لاحقاً.",
  },

  faqSection: { title: "الأسئلة الشائعة" },

  customersPage: {
    seoTitle: "عملاؤنا | موثوقون من قبل المؤسسات العالمية",
    seoDescription:
      "اكتشف المؤسسات العالمية التي تثق بشركة حجز للاتصالات لتوفير البنية التحتية للاتصالات وحلول الشبكات والخدمات التقنية.",
    eyebrow: "عملاؤنا",
    headline: "موثوقون من ",
    headlineHighlight: "القادة العالميين",
    subtitle:
      "نفخر بخدمة بعض أبرز المؤسسات العالمية في قطاعات الاتصالات والمالية والتقنية.",
    bannerLabel: "موثوقون من قادة الصناعة حول العالم",
    ctaEyebrow: "تواصل معنا",
    ctaTitle: "مهتم بالعمل معنا؟",
    ctaText: "تواصل معنا لمعرفة كيف يمكن لحجز دعم احتياجات الاتصالات لمؤسستك.",
    ctaButton: "تواصل معنا",
  },

  partnersPage: {
    seoTitle: "الشركاء التقنيون | تحالفات حجز للاتصالات",
    seoDescription:
      "تعرّف على الشركاء التقنيين الذين يتعاونون مع شركة حجز للاتصالات لتقديم حلول اتصالات وبنية تحتية للشبكات على مستوى عالمي.",
    eyebrow: "شركاؤنا",
    headline: "نبني المستقبل ",
    headlineHighlight: "معاً",
    subtitle: "نتعاون مع كبرى شركات التقنية لتقديم حلول اتصالات شاملة.",
    bannerLabel: "شبكة شركائنا العالمية",
    ctaEyebrow: "كن شريكاً",
    ctaTitle: "مهتم بأن تصبح شريكاً؟",
    ctaText: "تواصل معنا لاستكشاف فرص الشراكة مع شركة حجز للاتصالات المحدودة.",
    ctaButton: "تواصل معنا",
  },

  privacyPage: {
    seoTitle: "سياسة الخصوصية | شركة حجز للاتصالات المحدودة",
    seoDescription:
      "توضح سياسة الخصوصية لشركة حجز للاتصالات كيفية جمعنا واستخدامنا وتخزيننا وحمايتنا لمعلوماتك الشخصية عند استخدام خدماتنا وموقعنا الإلكتروني.",
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث:",
    sections: [
      {
        heading: "١. المعلومات التي نجمعها",
        content: "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:",
        items: [
          "معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف)",
          "معلومات الشركة",
          "تفضيلات الاتصال",
        ],
      },
      {
        heading: "٢. كيف نستخدم معلوماتك",
        content: "نستخدم المعلومات التي نجمعها من أجل:",
        items: [
          "تقديم وتحسين خدماتنا",
          "التواصل معك",
          "إرسال التحديثات والإعلانات المهمة",
          "الرد على طلباتك واستفساراتك",
        ],
      },
      {
        heading: "٣. أمن المعلومات",
        content:
          "نطبّق التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو التدمير.",
      },
      {
        heading: "٤. اتصل بنا",
        content:
          "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:\nالبريد الإلكتروني: privacy@hajztelecom.com\nالهاتف: +٩٦٦ ١١ ٠٠٠ ٠٠٠٠",
      },
    ],
  },

  termsPage: {
    seoTitle: "شروط الخدمة | شركة حجز للاتصالات المحدودة",
    seoDescription:
      "راجع شروط خدمة شركة حجز للاتصالات المحدودة التي تحدد القواعد والإرشادات والشروط لاستخدام خدماتنا وموقعنا الإلكتروني.",
    title: "شروط الخدمة",
    lastUpdated: "آخر تحديث:",
    sections: [
      {
        heading: "١. قبول الشروط",
        content:
          "من خلال الوصول إلى خدماتنا أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها.",
      },
      {
        heading: "٢. استخدام الخدمات",
        content:
          "أنت توافق على استخدام خدماتنا لأغراض قانونية فقط ووفقاً لهذه الشروط.",
        items: [
          "الحفاظ على دقة معلومات الحساب",
          "حماية بيانات اعتماد حسابك",
          "الامتثال لجميع القوانين واللوائح المعمول بها",
        ],
      },
      {
        heading: "٣. تعديل الخدمات",
        content:
          "نحتفظ بالحق في تعديل أو إيقاف أي جزء من خدماتنا في أي وقت دون إشعار مسبق.",
      },
      {
        heading: "٤. تحديد المسؤولية",
        content:
          "لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية ناتجة عن استخدامك لخدماتنا.",
      },
      {
        heading: "٥. معلومات الاتصال",
        content:
          "لأي أسئلة تتعلق بهذه الشروط، يرجى التواصل معنا على:\nالبريد الإلكتروني: legal@hajztelecom.com\nالهاتف: +٩٦٦ ١١ ٠٠٠ ٠٠٠٠",
      },
    ],
  },

  sitemapPage: {
    seoTitle: "خريطة الموقع | شركة حجز للاتصالات المحدودة",
    seoDescription:
      "تصفح هيكل موقع شركة حجز للاتصالات المحدودة. ابحث عن روابط جميع صفحاتنا بما في ذلك الخدمات والحلول والشركاء ومعلومات الاتصال.",
    title: "خريطة الموقع",
    sections: [
      {
        title: "الصفحات الرئيسية",
        links: [
          { name: "الرئيسية", path: "/" },
          { name: "من نحن", path: "/about" },
          { name: "الحلول", path: "/solutions" },
          { name: "عملاؤنا", path: "/customers" },
          { name: "شركاؤنا", path: "/partners" },
          { name: "تواصل معنا", path: "/contact" },
        ],
      },
      {
        title: "قانوني",
        links: [
          { name: "سياسة الخصوصية", path: "/privacy" },
          { name: "شروط الخدمة", path: "/terms" },
        ],
      },
    ],
  },

  contactPage: {
    seoTitle: "تواصل معنا | شركة حجز للاتصالات المحدودة",
    seoDescription:
      "تواصل مع شركة حجز للاتصالات المحدودة للبنية التحتية للاتصالات وأنظمة القيادة والتحكم والخدمات المدارة. الرياض، المملكة العربية السعودية.",
    eyebrow: "تواصل معنا",
    headline: "لنتواصل ",
    headlineHighlight: "معاً",
    subtitle: "هل أنت مستعد لتحويل اتصالاتك؟ تواصل معنا ودعنا نساعدك.",
    formTitle: "أرسل لنا رسالة",
    namePlaceholder: "الاسم الكامل",
    emailPlaceholder: "البريد الإلكتروني",
    subjectLabel: "اختر موضوعاً",
    subjectOptions: [
      { value: "", label: "اختر موضوعاً" },
      { value: "general", label: "استفسار عام" },
      { value: "sales", label: "المبيعات والشراكات" },
      { value: "support", label: "الدعم الفني" },
      { value: "partnership", label: "شراكة استراتيجية" },
      { value: "other", label: "أخرى" },
    ],
    messagePlaceholder: "رسالتك...",
    submit: "إرسال الرسالة",
    sending: "جاري الإرسال...",
    successTitle: "تم الإرسال!",
    successMessage: "شكراً لتواصلك. سنرد عليك خلال ٢٤ ساعة.",
    infoCards: [
      { title: "البريد الإلكتروني", text: "htc@hajztel.com.sa" },
      { title: "الهاتف", text: "+٩٦٦ ١١ ٠٠٠ ٠٠٠٠" },
      { title: "الموقع", text: "الرياض، المملكة العربية السعودية" },
    ],
    promisesTitle: "وعدنا لك",
    promises: [
      { title: "الأمان أولاً", text: "بياناتك مشفرة ومحمية." },
      { title: "رد خلال ٢٤ ساعة", text: "سنرد خلال يوم عمل واحد." },
      { title: "دعم متخصص", text: "تحدث مباشرة مع متخصصينا." },
    ],
  },

  aboutUsPage: {
    seoTitle: "من نحن | شركة حجز للاتصالات المحدودة",
    seoDescription:
      "تعرّف على شركة حجز للاتصالات المحدودة، أكثر من ٣٢ عاماً من التميز في الاتصالات في المملكة العربية السعودية.",
    hero: {
      badge: "عن حجز للاتصالات",
      headline: "من",
      headlineHighlight: "نحن",
      summary:
        "أكثر من ٣٢ عاماً من التميز في الاتصالات. نحن شركاء في الترحيل من الأنظمة التقليدية إلى الرقمية والاتصالات الموحدة والقيادة والتحكم. مدفوعون بالوضوح والاحترام والالتزام.",
    },
    identity: {
      mission:
        "تصنع حجز للاتصالات أنظمة اتصالات موثوقة وعالية الأداء تدفع الأعمال إلى الأمام. نتشارك بشكل وثيق مع المؤسسات والحكومات والعملاء الدفاعيين عبر أسواقنا للتغلب على العقبات التشغيلية بدعم هندسي دقيق وموثوقية لا تتزعزع مع رعاية المواهب المحلية لابتكار حلول تحقق قيمة دائمة وتميزاً.",
      vision:
        "ردم الفجوة بين الأنظمة القديمة والتقنيات الحديثة لإطلاق العنان للابتكار الرقمي الحقيقي. نمكّن المؤسسات والحكومات والقطاع الدفاعي عبر أسواقنا باتصالية حيوية لا تنقطع، مع إشعال جيل جديد من الخبراء المحليين للابتكار والتخصيص ومواجهة أصعب التحديات بثقة لا تتزعزع.",
      missionBullets: [
        "تمكين المجتمعات من خلال التقنية المتطورة.",
        "دفع التقدم بحلول عالية الجودة.",
        "تعزيز الاتصال للحياة اليومية والنمو.",
      ],
      visionBullets: [
        "حلول مخصصة لاحتياجات فريدة.",
        "خدمات ومنتجات من الدرجة الأولى تضيف قيمة.",
        "تحسين الأعمال والحياة.",
      ],
    },
    whyUs: {
      sectionTitle: "لماذا نحن",
      sectionSubtitle: "ما يميز حجز للاتصالات في التميز بقطاع الاتصالات.",
      valueProps: [
        {
          title: "ترحيل سلس",
          description: "انتقالات بدون توقف من الأنظمة التقليدية إلى الحديثة.",
        },
        {
          title: "مشاريع متكاملة",
          description: "تسليم شامل من التصميم إلى الإدارة المستمرة.",
        },
        {
          title: "خدمات مدارة استباقية",
          description: "مراقبة وتحسين مستمر لأداء مثالي.",
        },
        {
          title: "تسليم مرن",
          description: "فرق مرنة تتكيف مع جداولك الزمنية وميزانياتك.",
        },
        {
          title: "أثر ملموس",
          description: "التركيز على الإنتاجية وتجربة العملاء والنمو.",
        },
      ],
    },
    journey: {
      intro: "من تأسيسنا حتى اليوم، قدنا الابتكار في مجال الاتصالات.",
      events: [
        {
          date: "١٩٩٤",
          title: "أول خدمة سحابية",
          description:
            "تقديم نظام تذاكر Worldspan كخدمة في المملكة لوكالات السفر عبر تقنية STC القديمة X.25 والربط مع خوادم العالم لأكثر من ٧٠٠ وكالة",
        },
        {
          date: "١٩٩٨",
          title: "أول خدمة DID/DOD",
          description:
            "تواصلت STC مع حجز لحل مشكلة المسافة لخدمة العملاء بتقنية E1، استخدمت حجز حل pregain وخدمت أكثر من ٢٥٠٠ عميل رئيسي",
        },
        {
          date: "٢٠٠٢",
          title: "أول تقنية MPLS",
          description:
            "اتفاقية إعادة بيع مع STC لخدمة العملاء بتقنية MPLS وربط مكاتبهم الرئيسية بالفروع من خلال حلولنا لأكثر من ٣٠٠ فرع",
        },
        {
          date: "٢٠٠٩",
          title: "أول SIP Trunk",
          description:
            "قدمنا مع STC التقنية الجديدة لخدمة DID/DOD وهي SIP trunk لتقديم الحل لأكثر من ٤٥٠ عميل",
        },
        {
          date: "٢٠١٢",
          title: "ترحيل STC NGN",
          description:
            "تقديم حل لـ STC لترحيل عملائها الرئيسيين من تقنية DDN إلى NGN مثل وزارة الدفاع والقوات الجوية والدفاع الجوي لأكثر من ١٥٥٠ رابط",
        },
        {
          date: "٢٠١٦",
          title: "غرفة الحزم STC",
          description:
            "اختيرت حجز من قبل STC ووزارة الدفاع والقوات المسلحة لتقديم خدمة الاتصال المباشر لجميع المناطق النائية أثناء حرب الحزم عبر تقنيات مختلفة IPMPLS وMW وVSAT لأكثر من ٥٠٠ رابط",
        },
        {
          date: "٢٠٢٢",
          title: "مفهوم خدمة STC وعقدان",
          description:
            "العمل مع STC لإطلاق مفهوم خدمة جديد للمحولات الرقمية عبر خدمة PLL مع المشروع الحالي لخدمة العملاء الرئيسيين. مشروع المعدات النشطة للعملاء الرئيسيين (حصري لحجز) ومشروع معدات مقرات العملاء",
        },
      ],
    },
    companyIdentity: {
      sectionTitle: "هوية الشركة",
      sectionSubtitle:
        "الركائز الثلاث التي تحدد من نحن وكيف نعمل مع عملائنا ومجتمعاتنا.",
      blocks: [
        {
          title: "الوضوح والاحترام والالتزام",
          paragraphs: [
            "نؤمن بأن الوضوح يعزز الثقة. من خلال التواصل الشفاف ومواءمة أفعالنا مع أقوالنا، نضمن أن أهدافنا وتوقعاتنا مفهومة دائماً.",
            "الاحترام يوجه طريقة تعاملنا مع زملائنا وعملائنا وشركائنا\u2014مما يعزز ثقافة الثقة والشمولية والنمو المتبادل.",
            "التزامنا يحدد موثوقيتنا. نتحمل مسؤولية كل وعد، ونقدم باستمرار الجودة والقيمة والنتائج التي تعزز شراكاتنا طويلة الأمد وسمعتنا.",
          ],
        },
        {
          title: "الابتكار والجودة والأثر المجتمعي",
          paragraphs: [
            "الابتكار في حمضنا النووي. نستثمر في التقنيات الناشئة والأساليب المرنة للحفاظ على حلولنا في الطليعة.",
            "الجودة غير قابلة للتفاوض. كل مشروع يلبي معايير صارمة قبل التسليم.",
            "نقيس النجاح بالأثر الإيجابي الذي نخلقه للمجتمعات والاقتصادات التي نخدمها.",
          ],
        },
        {
          title: "الثقة والشراكة والنمو",
          paragraphs: [
            "الثقة تُكتسب من خلال التسليم المستمر والتواصل الشفاف.",
            "الشراكة تعني السير جنباً إلى جنب مع عملائنا من المفهوم إلى الإنجاز وما بعده.",
            "النمو رحلة مشتركة\u2014ننمو عندما ينمو عملاؤنا.",
          ],
        },
      ],
    },
  },
};

export default ar;
