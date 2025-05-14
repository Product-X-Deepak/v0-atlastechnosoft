import type { Metadata } from "next"
import { Suspense } from "react"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData,OrganizationStructuredData } from "@/components/seo/structured-data"
import { SapBusinessOneCloudHero } from "@/components/sap/sap-business-one-cloud-hero"
import { SapBusinessOneCloudFeatures } from "@/components/sap/sap-business-one-cloud-features"
import { SapBusinessOneCloudComparison } from "@/components/sap/sap-business-one-cloud-comparison"
import { SapBusinessOneCloudFaq } from "@/components/sap/sap-business-one-cloud-faq"
import { CtaSection } from "@/components/sections/cta-section"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "SAP Business One Cloud",
  "Cloud ERP solution",
  "SAP Business One 2025",
  "Web-based ERP",
  "Cloud business management",
];

const SECONDARY_KEYWORDS = [
  "SAP Partner",
  "AI-powered ERP",
  "Business Technology Platform", 
  "Cloud business automation",
  "SAP cloud implementation",
  "SMB cloud software",
  "Business intelligence cloud",
  "SaaS ERP solution",
  "Financial management cloud",
  "Inventory management system",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/sap/business-one-cloud-hero.webp",
  "/images/partners/sap-partner.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/sap/business-one-cloud-hero.webp": "high",
  "/images/partners/sap-partner.svg": "high",
};

// Cloud FAQs for structured data
const _CLOUD_FAQS = [
  {
    question: "What is SAP Business One Cloud?",
    answer: "SAP Business One Cloud is a comprehensive ERP solution delivered in the cloud, designed specifically for small and medium-sized businesses. It provides integrated business management tools for finance, sales, purchasing, inventory, manufacturing, and more, all accessible through a web browser as of the 2025 version."
  },
  {
    question: "What's new in the 2025 web version?",
    answer: "The 2025 web version introduces a completely redesigned user interface with responsive design for any device, AI-powered analytics for better decision making, enhanced collaboration tools, and improved accessibility features. It allows users to access the full functionality of SAP Business One from any modern web browser without installing any software."
  },
  {
    question: "How secure is my business data in the cloud?",
    answer: "SAP Business One Cloud employs enterprise-grade security measures including data encryption in transit and at rest, multi-factor authentication, continuous security monitoring, and compliance with industry standards such as ISO 27001. Your data is hosted in secure data centers with physical security, redundancy, and regular security audits."
  },
  {
    question: "Can I migrate from on-premise to cloud?",
    answer: "Yes, SAP provides well-defined migration paths from on-premise to cloud deployments. Our migration services include data transfer, configuration settings, customizations, and historical data. The process is carefully planned to minimize disruption, typically requiring just a single weekend of downtime for the final cutover."
  },
  {
    question: "How is the subscription pricing structured?",
    answer: "SAP Business One Cloud uses a subscription model based on the number of users and selected functionality modules. The subscription includes software licensing, hosting infrastructure, maintenance, regular updates, and basic support. Volume discounts are available for larger user counts, and you can scale up or down as your business needs change."
  }
];

export const metadata: Metadata = {
  title: "SAP Business One Cloud 2025 | Web-Based ERP Solution for SMBs",
  description:
    "SAP Business One Cloud 2025 delivers a complete web-based ERP solution with AI-powered analytics, real-time dashboards, and seamless accessibility from any device. Transform your business with flexible subscription pricing and enterprise-grade security.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "SAP Business One Cloud 2025 | Web-Based ERP Solution for SMBs",
    description: "Transform your business with SAP Business One Cloud 2025 - featuring responsive web interface, AI-powered analytics, and automated updates. Flexible subscription pricing with no hardware investment required.",
    type: "website",
    url: "https://www.atlastechnosoft.com/sap-solutions/business-one-cloud",
    images: [
      {
        url: "/images/sap/business-one-cloud-og.jpg",
        width: 1200,
        height: 630,
        alt: "SAP Business One Cloud 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Business One Cloud 2025 | Web-Based ERP for SMBs",
    description: "Transform your business with SAP Business One Cloud 2025 - web-based ERP with AI-powered analytics, real-time dashboards & subscription pricing model.",
    images: ["/images/sap/business-one-cloud-og.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/sap-solutions/business-one-cloud",
  },
}

export default function SapBusinessOneCloudPage() {
  return (
    <div className="flex flex-col" itemScope itemType="https://schema.org/Product">
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />

      {/* Enhanced SEO with structured data */}
      <ProductSEO 
        title="SAP Business One Cloud 2025"
        description="SAP Business One Cloud 2025 delivers a complete web-based ERP solution with AI-powered analytics, real-time dashboards, and seamless accessibility from any device with subscription pricing."
        canonicalUrl="/sap-solutions/business-one-cloud"
        image="/images/sap/business-one-cloud-og.jpg"
        price="38"
        currency="EUR"
        sku="SAP-B1-CLOUD-2025"
        brand="SAP"
        availability="https://schema.org/InStock"
        categoryBreadcrumbs={[
          { name: "SAP Solutions", url: "/sap-solutions" },
          { name: "Business One Cloud", url: "/sap-solutions/business-one-cloud" }
        ]}
      />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">SAP Business One Cloud 2025 - Web-Based ERP Solution for Small & Midsize Businesses</h1>
        <div itemProp="description">
          SAP Business One Cloud 2025 delivers a complete web-based ERP solution with AI-powered 
          analytics, real-time dashboards, and seamless accessibility from any device. With enterprise-grade 
          security, automatic updates, and subscription pricing, reduce IT costs while accelerating growth.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="SAP" />
        </div>
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="EUR" />
          <meta itemProp="price" content="38" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
      <SapBusinessOneCloudHero />
        
        <section id="features" className="-mb-12">
      <SapBusinessOneCloudFeatures />
        </section>
        
        <section id="comparison" className="-mb-12">
      <SapBusinessOneCloudComparison />
        </section>
        
        <section id="faq">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
      <SapBusinessOneCloudFaq />
          </Suspense>
        </section>
        
        <section id="cta">
      <CtaSection />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose SAP Business One Cloud?</h2>
        <ul>
          <li>Access your ERP system from anywhere with the responsive web interface</li>
          <li>Reduce IT costs with no hardware investment or maintenance required</li>
          <li>Stay current with automatic updates and the latest features</li>
          <li>Scale your solution easily as your business grows</li>
          <li>Enterprise-grade security with multi-factor authentication and data encryption</li>
          <li>Predictable subscription pricing with lower upfront costs</li>
          <li>Implementation by certified SAP Partner with 25+ years experience</li>
        </ul>
        
        <h2>SAP Business One Cloud Technical Specifications</h2>
        <p>
          SAP Business One Cloud 2025 leverages SAP HANA in-memory database technology for superior 
          performance and real-time analytics. The solution features a responsive web interface 
          accessible from any modern browser, native mobile apps for iOS and Android, and seamless 
          integration with Microsoft Office, SAP Business Technology Platform, and third-party 
          applications through open APIs.
        </p>
        
        <h2>Cloud Benefits for Small & Medium Businesses</h2>
        <p>
          Cloud deployment allows businesses to reduce total cost of ownership by eliminating hardware 
          investments and ongoing maintenance costs. The subscription model provides predictable monthly 
          expenses while keeping your business running on the latest technology with automatic updates 
          and enhanced security. The web-based interface ensures your team can access critical business 
          data from anywhere, on any device, improving productivity and collaboration.
        </p>
      </div>
    </div>
  )
}
