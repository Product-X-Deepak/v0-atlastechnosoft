import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function ErpPlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for ERP Planning
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "ERP Planning", url: "/sap-solutions/erp-planning" },
  ])

  // Create section schema for ERP Planning consulting service
  const consultingServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "ERP Planning & Implementation Services",
    "serviceType": "Enterprise Resource Planning",
    "description": "Strategic SAP Business One ERP planning and implementation services that ensure your enterprise solution delivers maximum ROI and operational excellence.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ERP Implementation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ERP Needs Assessment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Implementation Planning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "System Configuration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Migration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "User Training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Post-Implementation Support"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "124"
    }
  }

  return (
    <Fragment>
      {/* Add structured data for ERP Planning section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={consultingServiceSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>SAP Business One ERP Planning & Implementation Services</h1>
        <p>
          Atlas Technosoft delivers strategic ERP planning and implementation services
          for businesses seeking digital transformation. Our comprehensive approach
          ensures your SAP Business One solution delivers maximum ROI with a 145% average
          first-year return, 20-30% reduction in operational costs, and 65% faster 
          decision-making through our proven seven-phase implementation methodology.
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
              <a itemProp="item" href="/sap-solutions/erp-planning">
                <span itemProp="name">ERP Planning</span>
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