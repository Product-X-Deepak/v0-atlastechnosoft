import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function DistributionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for Distribution
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Distribution & Logistics", url: "/industries/distribution" },
  ])

  // Create schema for Distribution industry service
  const distributionServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Distribution & Logistics Solutions",
    "serviceType": "Industry-Specific ERP & Supply Chain",
    "description": "Innovative SAP and automation solutions for distribution and logistics companies to optimize inventory management, streamline order fulfillment, and gain end-to-end supply chain visibility.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Distribution Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Warehouse Management Systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transportation Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Inventory Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Route Planning & Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Order Fulfillment Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Supply Chain Analytics"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Distribution & Logistics Companies",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": "Global"
      }
    },
    "potentialAction": {
      "@type": "RequestQuote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.atlastechnosoft.com/contact?industry=distribution",
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Quote",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "Custom Quote",
          "priceCurrency": "USD"
        }
      }
    }
  }

  return (
    <Fragment>
      {/* Add structured data for Distribution section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={distributionServiceSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>Distribution & Logistics Solutions - SAP Business One & Supply Chain Optimization</h1>
        <p>
          Atlas Technosoft delivers integrated distribution solutions that combine SAP 
          Business One ERP with supply chain technologies to optimize warehouse operations, 
          streamline transportation management, and enhance inventory control. Our distribution 
          solutions deliver measurable ROI with 30% reduced delivery times, 25% lower logistics costs, 
          40% improved inventory accuracy, and 45% enhanced order fulfillment rates through comprehensive 
          supply chain transformation.
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
              <Link itemProp="item" href="/industries">
                <span itemProp="name">Industries</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/industries/distribution">
                <span itemProp="name">Distribution & Logistics</span>
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