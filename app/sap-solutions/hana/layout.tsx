import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function SapHanaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for SAP HANA
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "SAP HANA", url: "/sap-solutions/hana" },
  ])

  // Create section schema for HANA solutions
  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SAP HANA",
    "applicationCategory": "DatabaseApplication",
    "operatingSystem": "Cross-platform",
    "description": "Revolutionary in-memory database and real-time analytics platform that processes data 10,000x faster than traditional databases with advanced analytics capabilities.",
    "offers": {
      "@type": "Offer",
      "price": "Contact for pricing",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "creator": {
      "@type": "Organization",
      "name": "SAP",
      "url": "https://www.sap.com"
    },
    "applicationSubCategory": "In-Memory Database",
    "featureList": [
      "In-memory computing",
      "Column-based storage",
      "Advanced analytics",
      "Real-time processing",
      "Multi-model capabilities",
      "Hybrid cloud deployment"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "156"
    }
  }

  return (
    <Fragment>
      {/* Add structured data for SAP HANA section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={sectionSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>SAP HANA Database & Analytics Platform by Atlas Technosoft</h1>
        <p>
          Atlas Technosoft provides expert implementation and optimization services for 
          SAP HANA—a revolutionary in-memory computing platform that processes data 10,000x 
          faster than traditional databases. With column-store architecture, advanced analytics, 
          and multi-model capabilities, SAP HANA enables real-time decision making and 
          transforms business operations with unprecedented speed and intelligence.
        </p>
        <nav aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <a itemProp="item" href="/sap-solutions">
                <span itemProp="name">SAP Solutions</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <a itemProp="item" href="/sap-solutions/hana">
                <span itemProp="name">SAP HANA</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Render children */}
      {children}
    </Fragment>
  )
} 