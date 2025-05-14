/**
 * SEO Utilities
 *
 * Enhanced SEO utilities for Atlas Technosoft website
 */

import type { Metadata } from "next"
import { SEO } from '@/lib/constants/index'

/**
 * Generate metadata for a page
 *
 * @param title Page title
 * @param description Page description
 * @param path URL path (without domain)
 * @param imageUrl Open Graph image URL
 * @param keywords Array of keywords
 * @returns Metadata object
 */
export function generateMetadata(
  title: string,
  description: string,
  path = "",
  imageUrl = "/images/og-image.jpg",
  keywords: string[] = [],
): Metadata {
  const url = `${SEO.CANONICAL_URL}${path}`
  const fullTitle = title === SEO.DEFAULT_TITLE ? title : `${title} | ${SEO.SITE_NAME}`

  return {
    title: fullTitle,
    description,
    keywords: [...SEO.DEFAULT_KEYWORDS, ...keywords],
    authors: [
      {
        name: SEO.SITE_NAME,
        url: SEO.CANONICAL_URL,
      },
    ],
    creator: SEO.SITE_NAME,
    publisher: SEO.SITE_NAME,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SEO.SITE_NAME,
      images: [
        {
          url: imageUrl.startsWith("http") ? imageUrl : `${SEO.CANONICAL_URL}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl.startsWith("http") ? imageUrl : `${SEO.CANONICAL_URL}${imageUrl}`],
      creator: "@atlastechnosoft",
    },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
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
  }
}

/**
 * Generate JSON-LD structured data for organization
 *
 * @returns Organization schema as JSON string
 */
export function generateOrganizationSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.SITE_NAME,
    url: SEO.CANONICAL_URL,
    logo: `${SEO.CANONICAL_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/atlastechnosoft",
      "https://www.linkedin.com/company/atlas-technosoft",
      "https://twitter.com/atlastechnosoft",
      "https://www.instagram.com/atlastechnosoft",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-22-28988230",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office #302, Sunrise Business Park, Siddharth Nagar",
      addressLocality: "Thane",
      addressRegion: "Mumbai, Maharashtra",
      postalCode: "400604",
      addressCountry: "IN",
    },
    foundingDate: "1997",
  })
}

/**
 * Generate JSON-LD structured data for a service
 *
 * @param name Service name
 * @param description Service description
 * @param url Service URL path (without domain)
 * @param imageUrl Service image URL
 * @param price Price (optional)
 * @param currency Currency code (optional)
 * @returns Service schema as JSON string
 */
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  imageUrl: string,
  price?: string,
  currency?: string,
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: SEO.SITE_NAME,
      url: SEO.CANONICAL_URL,
    },
    url: `${SEO.CANONICAL_URL}${url}`,
    image: imageUrl.startsWith("http") ? imageUrl : `${SEO.CANONICAL_URL}${imageUrl}`,
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
  })
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 *
 * @param items Array of breadcrumb items with name and URL
 * @returns Breadcrumb schema as JSON string
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SEO.CANONICAL_URL}${item.url}`,
    })),
  })
}

/**
 * Generate JSON-LD structured data for FAQ
 *
 * @param faqs Array of FAQ items with question and answer
 * @returns FAQ schema as JSON string
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
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
  })
}

/**
 * Generate JSON-LD structured data for an article
 *
 * @param title Article title
 * @param description Article description
 * @param url Article URL path (without domain)
 * @param imageUrl Article image URL
 * @param datePublished Publication date (ISO string)
 * @param dateModified Last modified date (ISO string)
 * @param authorName Author name
 * @returns Article schema as JSON string
 */
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  authorName: string,
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl.startsWith("http") ? imageUrl : `${SEO.CANONICAL_URL}${imageUrl}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SEO.CANONICAL_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SEO.CANONICAL_URL}${url}`,
    },
  })
}

/**
 * Generate JSON-LD structured data for local business
 *
 * @returns Local business schema as JSON string
 */
export function generateLocalBusinessSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO.SITE_NAME,
    image: `${SEO.CANONICAL_URL}/logo.png`,
    "@id": SEO.CANONICAL_URL,
    url: SEO.CANONICAL_URL,
    telephone: "+91-22-28988230",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office #302, Sunrise Business Park, Siddharth Nagar",
      addressLocality: "Thane",
      addressRegion: "Mumbai",
      postalCode: "400604",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.2183,
      longitude: 72.9781,
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
  })
}

/**
 * Generate JSON-LD structured data for a product
 *
 * @param name Product name
 * @param description Product description
 * @param url Product URL path (without domain)
 * @param imageUrl Product image URL
 * @param price Price
 * @param currency Currency code
 * @param availability Availability status
 * @returns Product schema as JSON string
 */
export function generateProductSchema(
  name: string,
  description: string,
  url: string,
  imageUrl: string,
  price: string,
  currency: string,
  availability: "InStock" | "OutOfStock" | "PreOrder",
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl.startsWith("http") ? imageUrl : `${SEO.CANONICAL_URL}${imageUrl}`,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `${SEO.CANONICAL_URL}${url}`,
    },
    brand: {
      "@type": "Brand",
      name: SEO.SITE_NAME,
    },
  })
}

/**
 * Generate meta tags for robots.txt
 *
 * @returns Robots.txt content
 */
export function generateRobotsTxt() {
  return `
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SEO.CANONICAL_URL}/sitemap.xml
  `.trim()
}

/**
 * Generate canonical URL
 *
 * @param path URL path (without domain)
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SEO.CANONICAL_URL}${path}`
}

const seoUtils = {
  generateMetadata,
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
  generateProductSchema,
  generateRobotsTxt,
  getCanonicalUrl,
}

export default seoUtils;
