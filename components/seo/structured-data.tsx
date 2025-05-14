interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

/**
 * Prebuilt structured data components
 */

export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atlas Technosoft",
    url: "https://www.atlastechnosoft.com",
    logo: "https://www.atlastechnosoft.com/logo.png",
    sameAs: [
      "https://www.facebook.com/atlastechnosoft",
      "https://www.linkedin.com/company/atlas-technosoft",
      "https://twitter.com/atlastechnosoft",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-22-28988230",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office #302, Sunrise Business Park, Siddharth Nagar, Thane",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400604",
      addressCountry: "IN",
    },
    foundingDate: "1997",
    description:
      "Atlas Technosoft is a leading SAP Gold Certified Partner providing ERP consulting, IT hardware, software solutions, and enterprise applications since 1997.",
  }

  return <StructuredData data={organizationData} />
}

export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atlas Technosoft",
    url: "https://www.atlastechnosoft.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.atlastechnosoft.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return <StructuredData data={websiteData} />
}

export function ProductStructuredData({
  name,
  description,
  image,
  url,
}: {
  name: string
  description: string
  image: string
  url: string
}) {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: "Atlas Technosoft",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Atlas Technosoft",
      },
    },
  }

  return <StructuredData data={productData} />
}

export function FaqStructuredData({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>
}) {
  const faqData = {
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

  return <StructuredData data={faqData} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData data={breadcrumbData} />
}
