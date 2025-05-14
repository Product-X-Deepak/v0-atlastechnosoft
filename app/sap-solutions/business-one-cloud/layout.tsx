import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function SapBusinessOneCloudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for SAP Business One Cloud
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "Business One Cloud", url: "/sap-solutions/business-one-cloud" },
  ])

  // Create section schema for cloud solutions
  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SAP Business One Cloud",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud-based",
    "description": "Cloud-native ERP solution for small and medium-sized businesses with web-based access, automatic updates, and enterprise-grade security.",
    "offers": {
      "@type": "Offer",
      "price": "38",
      "priceCurrency": "EUR",
      "priceValidUntil": "2025-12-31",
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
    }
  }

  return (
    <Fragment>
      {/* Add structured data for SAP Business One Cloud section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={sectionSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>SAP Business One Cloud by Atlas Technosoft</h1>
        <p>
          Atlas Technosoft offers SAP Business One Cloud - a comprehensive cloud-native 
          ERP solution designed for small and medium businesses. With web-based access, 
          enterprise-grade security, and automatic updates, transform your operations 
          with a flexible subscription model starting at €38/month. As a certified SAP 
          Partner, we provide expert implementation, customization, and support services.
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
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/sap-solutions/business-one-cloud">
                <span itemProp="name">Business One Cloud</span>
              </Link>
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