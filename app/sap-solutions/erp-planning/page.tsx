import type { Metadata } from "next"
import { Suspense } from "react"
import { 
  ErpPlanningHero,
  ErpPlanningStrategy,
  ErpPlanningCapabilities,
  ErpPlanningArchitecture,
  ErpPlanningBusinessValue,
  ErpPlanningRoadmap,
  ErpPlanningCta
} from "@/components/sap"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "SAP Business One",
  "ERP Planning",
  "ERP Implementation",
  "SAP Solutions",
  "Strategic ERP",
];

const SECONDARY_KEYWORDS = [
  "Business Transformation",
  "Digital Transformation",
  "Enterprise Resource Planning",
  "SAP Business One Implementation",
  "Business Process Optimization",
  "ERP Strategy",
  "SAP Partner",
  "ERP Roadmap",
  "ERP Consulting",
  "Business Intelligence",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/solutions/erp-planning.jpg",
  "/images/partners/sap-partner.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/solutions/erp-planning.jpg": "high",
  "/images/partners/sap-partner.svg": "high",
};

// FAQ data for structured data
const ERP_FAQS = [
  {
    question: "What is ERP Planning?",
    answer: "ERP Planning is a strategic approach to designing, configuring, and implementing Enterprise Resource Planning systems like SAP Business One. It involves analyzing business processes, defining requirements, creating implementation roadmaps, and establishing governance frameworks to ensure successful ERP adoption and maximum business value."
  },
  {
    question: "How long does ERP implementation typically take?",
    answer: "The implementation timeline varies based on business complexity and scope, but typically ranges from 3-6 months for SAP Business One. Our accelerated methodology can deliver initial results in 8-12 weeks through a phased approach, with each phase carefully planned to minimize disruption while maximizing value."
  },
  {
    question: "What business processes can SAP Business One manage?",
    answer: "SAP Business One provides comprehensive functionality for financial management, sales and customer management, purchasing and inventory control, production planning, business intelligence, and analytics. The system integrates all core business functions into a single platform with real-time visibility across operations."
  },
  {
    question: "What is the ROI for a SAP Business One implementation?",
    answer: "Organizations typically achieve 145% ROI within the first year of implementation. Benefits include 20-30% reduction in operational costs, 65% faster decision-making, 42% reduction in cross-departmental friction, 15% improvement in cash flow management, 22% inventory reduction, and 37% improvement in forecast accuracy."
  },
  {
    question: "How do you ensure successful ERP adoption?",
    answer: "Our comprehensive change management approach includes stakeholder engagement, detailed process documentation, role-based training programs, and post-implementation support. This methodology has resulted in 35% higher user adoption rates compared to industry averages, ensuring your organization realizes the full benefits of the ERP system."
  }
];

export const metadata: Metadata = {
  title: "ERP Planning & Implementation | SAP Business One Solutions",
  description:
    "Strategic SAP Business One ERP planning and implementation services that ensure your enterprise solution delivers maximum ROI and operational excellence with 145% average first-year return.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Strategic ERP Planning & Implementation | SAP Business One Solutions",
    description: "Transform your business operations with our comprehensive SAP Business One ERP planning and implementation services. Achieve 20-30% reduction in operational costs and 65% faster decision-making.",
    type: "website",
    url: "https://www.atlastechnosoft.com/sap-solutions/erp-planning",
    images: [
      {
        url: "/images/solutions/erp-planning.jpg",
        width: 1200,
        height: 630,
        alt: "Strategic ERP Planning and Implementation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERP Planning & Implementation | SAP Business One",
    description: "Transform your business with strategic SAP Business One ERP planning and implementation. Achieve 145% average first-year ROI.",
    images: ["/images/solutions/erp-planning.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/sap-solutions/erp-planning",
  },
}

export default function ErpPlanningPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "ERP Planning", url: "/sap-solutions/erp-planning" },
  ]
  
  return (
    <div className="flex flex-col" itemScope itemType="https://schema.org/Service">
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />

      {/* Enhanced SEO with structured data */}
      <ProductSEO 
        title="Strategic ERP Planning & Implementation"
        description="Transform your business with comprehensive SAP Business One ERP planning and implementation services. Our strategic approach ensures maximum ROI, operational excellence, and long-term growth."
        canonicalUrl="/sap-solutions/erp-planning"
        image="/images/solutions/erp-planning.jpg"
        brand="SAP"
        categoryBreadcrumbs={[
          { name: "SAP Solutions", url: "/sap-solutions" },
          { name: "ERP Planning", url: "/sap-solutions/erp-planning" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "ERP Planning",
        "Strategic SAP Business One ERP planning and implementation services that ensure your enterprise solution delivers maximum ROI and operational excellence.",
        "/sap-solutions/erp-planning",
        "/images/solutions/erp-planning.jpg"
      )} />
      <StructuredData data={generateFaqSchema(ERP_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">Strategic ERP Planning & Implementation for Business Transformation</h1>
        <div itemProp="description">
          Comprehensive SAP Business One planning, implementation, and optimization services to 
          drive operational excellence and business growth. Our strategic approach delivers
          145% average first-year ROI with 20-30% reduction in operational costs, 65% faster
          decision-making, and 37% improvement in forecast accuracy.
        </div>
        <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Atlas Technosoft" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <ErpPlanningHero />
        
        <section id="strategy">
          <ErpPlanningStrategy />
        </section>
        
        <section id="capabilities">
          <ErpPlanningCapabilities />
        </section>
        
        <section id="architecture">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <ErpPlanningArchitecture />
          </Suspense>
        </section>
        
        <section id="business-value">
          <ErpPlanningBusinessValue />
        </section>
        
        <section id="roadmap">
          <ErpPlanningRoadmap />
        </section>
        
        <section id="cta">
          <ErpPlanningCta />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose Our ERP Planning Services?</h2>
        <ul>
          <li>Strategic approach with 40% faster implementation timeline</li>
          <li>145% average first-year ROI for implemented systems</li>
          <li>35% higher user adoption rates through comprehensive change management</li>
          <li>20-30% reduction in operational costs through process optimization</li>
          <li>Certified SAP Partner with 200+ successful implementations</li>
          <li>Industry-specific solutions tailored to your business requirements</li>
          <li>Comprehensive post-implementation support with 24/7 access</li>
        </ul>
        
        <h2>Our ERP Planning Methodology</h2>
        <p>
          Our structured ERP planning methodology ensures successful implementations through 
          a strategic seven-phase approach: Discovery & Assessment, Solution Design, Build & 
          Configure, Testing & Validation, Training & Change Management, Deployment & Go-Live, 
          and Optimization & Growth. Each phase is carefully executed with industry best 
          practices to minimize risk, accelerate time-to-value, and maximize long-term benefits.
        </p>
        
        <h2>Business Value of Strategic ERP Planning</h2>
        <p>
          Strategic ERP planning delivers measurable business outcomes across all departments. 
          Organizations achieve operational efficiency with 28% reduction in manual processing time, 
          real-time decision making with 65% faster decision cycles, process integration with 42% 
          reduction in cross-departmental friction, enhanced financial control with 15% reduction 
          in days sales outstanding, optimized supply chain with 22% inventory reduction, improved 
          risk management with 54% fewer compliance incidents, and advanced business intelligence 
          with 37% improvement in forecast accuracy.
        </p>
      </div>
    </div>
  )
} 