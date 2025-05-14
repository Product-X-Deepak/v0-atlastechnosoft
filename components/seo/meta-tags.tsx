import { Metadata } from "next"

/**
 * Generate consistent SEO metadata for a page
 * 
 * @param props Configuration for page metadata
 * @returns Next.js Metadata object
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/images/og-image.jpg",
  baseUrl = "https://www.atlastechnosoft.com",
  canonical,
  type = "website",
  robots = true,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  baseUrl?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  robots?: boolean;
}): Metadata {
  // Ensure absolute URL for OpenGraph image
  const ogImageUrl = image.startsWith("http")
    ? image
    : `${baseUrl}${image}`;
  
  // Calculate canonical URL
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : `${baseUrl}`;
  
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Atlas Technosoft",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: type === 'product' ? 'website' : type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
  
  // Add robots directive if needed
  if (!robots) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }
  
  return metadata;
}

/**
 * Generate JSON-LD schema for rich results in search engines
 * 
 * @param type Type of schema
 * @param data Schema data
 * @returns JSON string of schema
 */
export function generateSchema(
  type: "Organization" | "Service" | "FAQPage" | "BreadcrumbList" | "Product",
  data: Record<string, unknown>
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
  
  return JSON.stringify(schema);
}

/**
 * Generate specific FAQPage schema
 * 
 * @param faqs Array of FAQ items
 * @returns Structured data object
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
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
  };
} 
