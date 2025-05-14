import type { Metadata } from "next"
import { Suspense } from "react"
import { SapHanaHero } from "@/components/sap/sap-hana-hero"
import { SapHanaFeatures } from "@/components/sap/sap-hana-features"
import { SapHanaBenefits } from "@/components/sap/sap-hana-benefits"
import { SapHanaIntegration } from "@/components/sap/sap-hana-integration"
import { SapHanaFaq } from "@/components/sap/sap-hana-faq"
import { CtaSection } from "@/components/sections/cta-section"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { generateServiceSchema, generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "SAP HANA",
  "In-memory database",
  "Real-time analytics",
  "Column-oriented database",
  "Predictive analytics",
];

const SECONDARY_KEYWORDS = [
  "SAP HANA Cloud",
  "SAP HANA SPS 06",
  "Business intelligence",
  "Data processing",
  "Atlas Technosoft",
  "SAP Partner",
  "SAP implementation",
  "Big data",
  "Digital transformation",
  "Database optimization",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/sap/hana-platform.jpg",
  "/images/sap/hana-hero.webp",
  "/images/partners/sap-partner.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/sap/hana-hero.webp": "high",
  "/images/partners/sap-partner.svg": "high",
};

export const metadata: Metadata = {
  title: "SAP HANA | In-Memory Database | Real-Time Data Platform | Atlas Technosoft",
  description:
    "Supercharge your business with SAP HANA's revolutionary in-memory database and real-time analytics platform. Process data 10,000x faster, reduce storage by 90%, and make instant data-driven decisions. Expert implementation services by Atlas Technosoft.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "SAP HANA | In-Memory Database & Real-Time Analytics Platform",
    description: "Transform your business with SAP HANA's revolutionary in-memory database. Process data 10,000x faster, reduce storage by 90%, and enable real-time decision making with advanced analytics.",
    type: "website",
    url: "https://www.atlastechnosoft.com/sap-solutions/hana",
    images: [
      {
        url: "/images/sap/hana-platform.jpg",
        width: 1200,
        height: 630,
        alt: "SAP HANA In-Memory Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP HANA | In-Memory Database & Analytics Platform",
    description: "Transform your business with SAP HANA's revolutionary in-memory database technology. Process data 10,000x faster & reduce storage needs by 90%.",
    images: ["/images/sap/hana-platform.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/sap-solutions/hana",
  },
}

export default function SapHanaPage() {
  // FAQ data for structured data
  const faqData = [
    {
      question: "What is SAP HANA?",
      answer:
        "SAP HANA is an in-memory, column-oriented, relational database management system developed and marketed by SAP. It processes massive amounts of data in real-time with its revolutionary in-memory architecture. Beyond traditional database capabilities, HANA features advanced analytics (predictive, spatial, text, graph), application development tools, and multi-model data processing in a single platform.",
    },
    {
      question: "What are the benefits of SAP HANA?",
      answer:
        "SAP HANA delivers transformative business benefits including: 1) 10,000x faster processing than traditional databases, 2) Up to 90% reduced data footprint through advanced compression, 3) Simplified IT landscape by eliminating separate OLTP and OLAP systems, 4) Real-time analytics and reporting with zero latency, 5) Enhanced decision-making capabilities through built-in AI/ML, and 6) Reduced total cost of ownership.",
    },
    {
      question: "How does SAP HANA differ from traditional databases?",
      answer:
        "Unlike traditional disk-based, row-oriented databases, SAP HANA uses a fundamentally different architecture: 1) In-memory computing eliminates slow disk I/O operations, 2) Column-based storage optimizes analytical workloads, 3) Multicore parallelization maximizes hardware resource utilization, 4) Advanced compression reduces storage needs, 5) Unified OLTP and OLAP processing eliminates separate systems, and 6) Built-in advanced analytics eliminate the need for separate specialized systems.",
    },
    {
      question: "What is SAP HANA Cloud and how does it compare to on-premise?",
      answer:
        "SAP HANA Cloud is the cloud-native version of SAP HANA that offers the full power of HANA as a fully managed service with dynamic scaling, consumption-based pricing, and automated operations. Compared to on-premise deployments, HANA Cloud provides: 1) Lower upfront investment with pay-as-you-go pricing, 2) Rapid deployment without hardware procurement, 3) Automatic updates and maintenance, 4) On-demand scaling from gigabytes to petabytes, and 5) 99.9% uptime SLA backed by SAP.",
    },
    {
      question: "What industries can benefit from SAP HANA?",
      answer:
        "SAP HANA delivers transformative results across all data-intensive industries including: 1) Manufacturing: real-time production monitoring and predictive maintenance, 2) Retail: personalized recommendations and dynamic pricing, 3) Financial Services: fraud detection and real-time risk analysis, 4) Healthcare: patient monitoring and treatment optimization, 5) Utilities: smart grid management and demand forecasting, and 6) Transportation: route optimization and predictive logistics.",
    },
    {
      question: "How can Atlas Technosoft help with SAP HANA implementation?",
      answer:
        "Atlas Technosoft provides comprehensive SAP HANA services including: 1) Assessment and roadmap planning, 2) Technical implementation and migration, 3) Performance optimization and tuning, 4) Custom development and integration, 5) Managed services and support, and 6) Training and knowledge transfer. Our certified SAP consultants have extensive experience in SAP HANA implementations across various industries, ensuring smooth transitions while minimizing business disruption and maximizing ROI.",
    },
  ]

  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "SAP HANA", url: "/sap-solutions/hana" },
  ]

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
        title="SAP HANA In-Memory Database"
        description="SAP HANA is a revolutionary in-memory computing platform that processes data 10,000x faster than traditional databases. With advanced analytics, multi-model capabilities, and flexible deployment options, transform your business with real-time insights."
        canonicalUrl="/sap-solutions/hana"
        image="/images/sap/hana-platform.jpg"
        brand="SAP"
        categoryBreadcrumbs={[
          { name: "SAP Solutions", url: "/sap-solutions" },
          { name: "SAP HANA", url: "/sap-solutions/hana" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "SAP HANA Solutions",
        "Accelerate your digital transformation with SAP HANA's revolutionary in-memory computing platform. Process data 10,000x faster, gain real-time insights, and transform business operations with our expert implementation services.",
        "/sap-solutions/hana",
        "/images/sap/hana-platform.jpg",
      )} />
      <StructuredData data={generateFaqSchema(faqData)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">SAP HANA In-Memory Database & Real-Time Analytics Platform</h1>
        <div itemProp="description">
          SAP HANA is a revolutionary in-memory computing platform that processes data 10,000x 
          faster than traditional databases. With column-store architecture, advanced analytics, 
          and multi-model capabilities, transform your business with real-time insights and 
          reduced total cost of ownership.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="SAP" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <SapHanaHero />
        
        <section id="features" className="-mb-12">
          <SapHanaFeatures />
        </section>
        
        <section id="benefits">
          <SapHanaBenefits />
        </section>
        
        <section id="integration" className="-mb-12">
          <SapHanaIntegration />
        </section>
        
        <section id="faq">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <SapHanaFaq />
          </Suspense>
        </section>
        
        <section id="cta">
          <CtaSection />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose SAP HANA?</h2>
        <ul>
          <li>Process data 10,000x faster than traditional databases</li>
          <li>Reduce data storage footprint by up to 90% with advanced compression</li>
          <li>Eliminate separate OLTP and OLAP systems with a unified platform</li>
          <li>Enable real-time analytics and reporting with zero latency</li>
          <li>Make better decisions with built-in AI and machine learning capabilities</li>
          <li>Reduce total cost of ownership through simplified IT landscape</li>
          <li>Implementation by certified SAP Partner with 25+ years experience</li>
        </ul>
        
        <h2>SAP HANA Technical Specifications</h2>
        <p>
          SAP HANA combines an in-memory, column-oriented database with advanced analytical 
          processing engines for different workloads. The platform includes native support for 
          multi-model data (relational, graph, spatial, and document), advanced analytics 
          capabilities (predictive, spatial, text, graph), and development tools for creating 
          high-performance applications.
        </p>
        
        <h2>Industry Applications of SAP HANA</h2>
        <p>
          SAP HANA delivers transformative results across multiple industries. Manufacturing 
          companies use HANA for real-time production monitoring and predictive maintenance. 
          Retail organizations leverage it for personalized recommendations and dynamic pricing. 
          Financial services firms implement HANA for fraud detection and real-time risk analysis. 
          Healthcare providers utilize HANA for patient monitoring and treatment optimization. 
          HANA enables utilities with smart grid management and transportation companies with 
          route optimization.
        </p>
      </div>
    </div>
  )
}
