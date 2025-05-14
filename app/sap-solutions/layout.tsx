import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function SapSolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for SAP Solutions
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
  ])

  // Create organization section schema
  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SAP Solutions",
    "description": "Enterprise SAP solutions including Business One, HANA, and cloud ERP systems implemented by an official SAP Partner.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com",
    },
    "serviceType": "Enterprise Solutions",
    "areaServed": "Global",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small and Medium-sized Businesses"
    },
    "offers": {
      "@type": "AggregateOffer",
      "highPrice": "5000",
      "lowPrice": "38",
      "priceCurrency": "EUR",
      "offerCount": "5"
    }
  }

  return (
    <Fragment>
      {/* Add structured data for SAP Solutions section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={sectionSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>SAP Solutions by Atlas Technosoft</h1>
        <p>
          Atlas Technosoft is a certified SAP Partner providing comprehensive 
          enterprise solutions including SAP Business One, SAP HANA, and cloud-based 
          ERP systems for small and medium-sized businesses. With 25+ years of experience 
          and 500+ successful implementations, we deliver tailored solutions that 
          optimize business processes and drive growth.
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
              <Link itemProp="item" href="/sap-solutions">
                <span itemProp="name">SAP Solutions</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Render children */}
      {children}
    </Fragment>
  )
} 