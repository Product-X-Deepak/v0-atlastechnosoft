// Enhanced SEO utilities for Atlas Technosoft

import type { Metadata } from "next"

// Base metadata for the website
export const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.atlastechnosoft.com"),
  title: {
    default: "Atlas Technosoft | SAP Partner & ERP Solutions Provider",
    template: "%s | Atlas Technosoft",
  },
  description:
    "Atlas Technosoft is a leading SAP Certified Partner providing ERP consulting, IT hardware, software solutions, and enterprise applications since 1997.",
  keywords: [
    "SAP Business One",
    "ERP Solutions",
    "Automation Solutions",
    "RPA Solutions",
    "Workflow Automation",
    "Cloud Computing",
    "System Integration",
    "Atlas Technosoft",
    "SAP Partner",
    "Business Process Automation",
    "Digital Transformation",
  ],
  authors: [
    {
      name: "Atlas Technosoft",
      url: "https://www.atlastechnosoft.com",
    },
  ],
  creator: "Atlas Technosoft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.atlastechnosoft.com",
    title: "Atlas Technosoft | SAP Partner & ERP Solutions Provider",
    description:
      "Atlas Technosoft is a leading SAP Certified Partner providing ERP consulting, IT hardware, software solutions, and enterprise applications since 1997.",
    siteName: "Atlas Technosoft",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Technosoft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Technosoft | SAP Partner & ERP Solutions Provider",
    description:
      "Atlas Technosoft is a leading SAP Certified Partner providing ERP consulting, IT hardware, software solutions, and enterprise applications since 1997.",
    creator: "@atlastechnosoft",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com",
    languages: {
      "en-US": "https://www.atlastechnosoft.com",
    },
  },
}

// Generate page-specific metadata
export function generateMetadata(
  title: string,
  description: string,
  path = "",
  imageUrl = "/images/og-image.jpg",
): Metadata {
  const url = `https://www.atlastechnosoft.com${path}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Generate structured data for organization
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atlas Technosoft",
    url: "https://www.atlastechnosoft.com",
    logo: "https://www.atlastechnosoft.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/atlastechnosoft",
      "https://www.linkedin.com/company/atlas-technosoft",
      "https://twitter.com/atlastechnosoft",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-22-4123-4567",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Park",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
  }
}

// Generate structured data for service
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  imageUrl: string,
  price?: string,
  currency?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Atlas Technosoft",
      url: "https://www.atlastechnosoft.com",
    },
    url: `https://www.atlastechnosoft.com${url}`,
    image: `https://www.atlastechnosoft.com${imageUrl}`,
    ...(price && currency
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: currency,
          },
        }
      : {}),
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Enterprise Solutions",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Enterprise Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SAP Business One Implementation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SAP HANA Migration & Support"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RPA Solutions"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Transformation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Boyum IT B1 Usability Package"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Boyum IT Beas Manufacturing"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UiPath Process Automation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UiPath AI Document Processing"
          }
        }
      ]
    },
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.atlastechnosoft.com${item.url}`,
    })),
  }
}

// Generate FAQ structured data
export function generateFaqSchema(faqs: { question: string; answer: string; category?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  authorName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `https://www.atlastechnosoft.com${imageUrl}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Atlas Technosoft",
      logo: {
        "@type": "ImageObject",
        url: "https://www.atlastechnosoft.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.atlastechnosoft.com${url}`,
    },
  }
}

// Generate collection page structured data for category/hub pages
export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  items: { name: string; url: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `https://www.atlastechnosoft.com${url}`,
    image: `https://www.atlastechnosoft.com${imageUrl}`,
    publisher: {
      "@type": "Organization",
      name: "Atlas Technosoft",
      logo: {
        "@type": "ImageObject",
        url: "https://www.atlastechnosoft.com/logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          url: `https://www.atlastechnosoft.com${item.url}`,
          provider: {
            "@type": "Organization",
            name: "Atlas Technosoft",
          },
        },
      })),
    },
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Atlas Technosoft",
    image: "https://www.atlastechnosoft.com/logo.png",
    "@id": "https://www.atlastechnosoft.com",
    url: "https://www.atlastechnosoft.com",
    telephone: "+91-22-28988230",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office #302, Sunrise Business Park, Siddharth Nagar",
      addressLocality: "Thane",
      addressRegion: "Mumbai",
      postalCode: "400604",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/atlastechnosoft",
      "https://www.twitter.com/atlastechnosoft",
      "https://www.linkedin.com/company/atlas-technosoft",
      "https://www.instagram.com/atlastechnosoft",
    ],
  }
}
