import { generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Fragment } from "react"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import Link from "next/link"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate breadcrumb schema for Blog
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ])

  // Create schema for Blog collection
  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Atlas Technosoft Blog",
    "description": "Expert insights on SAP solutions, business automation, and digital transformation from Atlas Technosoft's team of specialists.",
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.atlastechnosoft.com/images/logo.png"
      }
    },
    "url": "https://www.atlastechnosoft.com/blog",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    }
  }

  return (
    <Fragment>
      {/* Add structured data for Blog section */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogCollectionSchema} />
      <WebsiteStructuredData />
      <OrganizationStructuredData />

      {/* Add semantic structure with hidden elements */}
      <div className="visually-hidden">
        <h1>Atlas Technosoft Blog - Expert Insights on SAP & Business Automation</h1>
        <p>
          Welcome to the Atlas Technosoft blog, your source for expert insights, best practices, 
          and the latest trends in SAP Business One, ERP solutions, automation technologies, 
          and digital transformation. Our team of specialists share their knowledge to help 
          you optimize your business processes, implement effective software solutions, 
          and achieve your business goals.
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
              <Link itemProp="item" href="/blog">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Render children */}
      <div className="blog-container">
        {children}
      </div>
    </Fragment>
  )
} 