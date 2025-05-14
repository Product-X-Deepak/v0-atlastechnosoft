import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function ManufacturingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for Manufacturing
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Manufacturing", url: "/industries/manufacturing" },
  ])

  // Create schema for Manufacturing industry service
  const manufacturingServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Manufacturing Solutions",
    "serviceType": "Industry-Specific ERP & Automation",
    "description": "Advanced SAP Business One and automation solutions for manufacturing companies looking to optimize production, enhance quality control, and improve supply chain management with Industry 4.0 technologies.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Manufacturing Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manufacturing ERP Implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Production Planning & Scheduling"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manufacturing Execution Systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quality Management Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial IoT Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Predictive Maintenance"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Manufacturing Companies",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": "Global"
      }
    },
    "potentialAction": {
      "@type": "RequestQuote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.atlastechnosoft.com/contact?industry=manufacturing",
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
      {/* Add structured data for Manufacturing section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={manufacturingServiceSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>Manufacturing Industry Solutions - SAP Business One & Industry 4.0</h1>
        <p>
          Atlas Technosoft delivers integrated manufacturing solutions that combine SAP 
          Business One ERP with Industry 4.0 technologies to optimize production operations, 
          enhance quality control, and streamline supply chain management. Our manufacturing 
          solutions deliver measurable ROI with 25% higher productivity, 30% reduced costs, 
          40% lower inventory levels, and 55% improved quality metrics through comprehensive 
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
              <a itemProp="item" href="/industries/manufacturing">
                <span itemProp="name">Manufacturing</span>
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