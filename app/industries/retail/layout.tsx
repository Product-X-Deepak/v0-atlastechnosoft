import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for Retail
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Retail", url: "/industries/retail" },
  ])

  // Create schema for Retail industry service
  const retailServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Retail Management Solutions",
    "serviceType": "Industry-Specific ERP & Omnichannel",
    "description": "Advanced SAP Business One and automation solutions for retail businesses to unify omnichannel commerce, optimize inventory with ML algorithms, and deliver personalized customer experiences for increased revenue and loyalty.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Retail Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Omnichannel Commerce Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retail ERP Implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Point of Sale (POS) Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Inventory & Warehouse Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Customer Experience Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retail Analytics & Business Intelligence"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Retail Businesses",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": "Global"
      }
    },
    "potentialAction": {
      "@type": "RequestQuote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.atlastechnosoft.com/contact?industry=retail",
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
      {/* Add structured data for Retail section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={retailServiceSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>Retail Industry Solutions - SAP Business One & Omnichannel Commerce</h1>
        <p>
          Atlas Technosoft delivers integrated retail solutions that combine SAP 
          Business One ERP with omnichannel commerce technologies to unify the shopping experience, 
          optimize inventory management, and enhance customer engagement. Our retail 
          solutions deliver measurable ROI with 15-25% higher revenue, 30% higher customer lifetime value, 
          25% reduction in inventory costs, and 45% improved forecasting accuracy through comprehensive 
          digital transformation.
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
              <a itemProp="item" href="/industries">
                <span itemProp="name">Industries</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <a itemProp="item" href="/industries/retail">
                <span itemProp="name">Retail</span>
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