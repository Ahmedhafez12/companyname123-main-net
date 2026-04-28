import { Helmet } from 'react-helmet-async';
import { useLocale } from '../i18n';

const SITE_URL = 'https://hajztelecom.com';
const SITE_NAME = 'Hajz Telecommunication Co Ltd.';
const SITE_NAME_AR = '\u0634\u0631\u0643\u0629 \u062d\u062c\u0632 \u0644\u0644\u0627\u062a\u0635\u0627\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u062f\u0648\u062f\u0629';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
  additionalSchema?: Record<string, unknown>;
}

export default function PageSEO({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  breadcrumbs,
  faq,
  additionalSchema,
}: PageSEOProps) {
  const { locale, dir } = useLocale();
  const isArabic = locale === 'ar';
  const siteName = isArabic ? SITE_NAME_AR : SITE_NAME;
  const ogLocale = isArabic ? 'ar_SA' : 'en_US';
  const fullUrl = `${SITE_URL}${path}`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: fullUrl,
    inLanguage: isArabic ? 'ar' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }
    : null;

  const faqSchema = faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <Helmet>
      <html lang={locale} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {additionalSchema && (
        <script type="application/ld+json">
          {JSON.stringify(additionalSchema)}
        </script>
      )}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME };
