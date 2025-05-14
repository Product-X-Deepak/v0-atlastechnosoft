import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import Link from "next/link"

export default function WorkflowAutomationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for Workflow Automation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Automation Solutions", url: "/automation-solutions" },
    { name: "Workflow Automation", url: "/automation-solutions/workflow-automation" },
  ])

  // Create section schema for Workflow Automation service
  const workflowServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Workflow Automation Solutions",
    "serviceType": "Business Process Automation",
    "description": "Enterprise-grade workflow automation solutions that transform your business operations with intelligent process optimization, cross-department integration, and measurable efficiency gains.",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Workflow Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Process Analysis & Mapping"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Design & Implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Form & Document Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Approval Workflow Configuration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "System Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Analytics & Optimization"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "87"
    }
  }

  return (
    <Fragment>
      {/* Add structured data for Workflow Automation section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={workflowServiceSchema} />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>Enterprise Workflow Automation Solutions</h1>
        <p>
          Atlas Technosoft delivers intelligent workflow automation solutions that transform
          your business operations with streamlined processes, reduced manual effort, and
          enhanced compliance. Our solutions reduce processing times by 50%, eliminate 95%
          of errors, and deliver 40% cost savings across departments through paperless
          workflows, automated approvals, and seamless system integration.
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
              <Link itemProp="item" href="/automation-solutions">
                <span itemProp="name">Automation Solutions</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/automation-solutions/workflow-automation">
                <span itemProp="name">Workflow Automation</span>
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