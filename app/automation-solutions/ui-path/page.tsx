import type { Metadata } from "next"
import { Suspense } from "react"
import { 
  UiPathHero,
  UiPathAgentic,
  UiPathCapabilities,
  UiPathSapAutomation,
  UiPathBusinessValue,
  UiPathTrends,
  UiPathCta
} from "@/components/ui-path"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "UiPath",
  "Agentic AI",
  "Agentic Automation",
  "RPA",
  "SAP Automation",
];

const SECONDARY_KEYWORDS = [
  "AI Agents",
  "Enterprise AI",
  "Intelligent Automation",
  "Process Automation",
  "Workflow Orchestration",
  "Digital Transformation",
  "Business Process Automation",
  "UiPath Partner",
  "Robotic Process Automation",
  "Automation Platform",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/solutions/B4_A.png",
  "/images/solutions/B4_A.png",
  "/images/partners/Ui%20Path.jpeg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/solutions/B4_A.png": "high",
  "/images/partners/Ui%20Path.jpeg": "high",
};

// FAQ data for structured data
const UIPATH_FAQS = [
  {
    question: "What is Agentic Automation?",
    answer: "Agentic Automation combines AI agents with traditional RPA robots to create a more intelligent and adaptable automation solution. While traditional RPA excels at rule-based, repetitive tasks, Agentic Automation adds cognitive capabilities through AI that can understand context, make decisions, adapt to new situations, and complete complex end-to-end processes with minimal human intervention."
  },
  {
    question: "How does UiPath integrate with SAP systems?",
    answer: "UiPath offers SAP-certified integration solutions that securely automate SAP processes without disrupting your existing landscape. The integration works across SAP GUI, S/4HANA, SuccessFactors, and other SAP solutions, enabling automation of finance, supply chain, HR, and customer service processes with up to 80% reduction in manual data entry and maintenance."
  },
  {
    question: "What ROI can organizations expect from UiPath automation?",
    answer: "Organizations typically achieve 30-50% cost reduction for automated processes, with payback periods of 3-8 months. Additional benefits include 40-80% reduction in processing time, 4-6x improvement in process throughput, 90% reduction in compliance-related errors, and 35% increase in employee satisfaction by eliminating mundane tasks."
  },
  {
    question: "How does UiPath compare to traditional RPA solutions?",
    answer: "UiPath goes beyond traditional RPA with its Agentic Automation platform that combines AI-powered agents, traditional RPA robots, document understanding capabilities, and enterprise-grade orchestration. This comprehensive approach enables end-to-end automation of complex processes that adapt to changing conditions, understand context, and make decisions—capabilities that traditional rules-based RPA lacks."
  },
  {
    question: "What are the emerging trends in UiPath's technology roadmap?",
    answer: "UiPath is pioneering several key trends: (1) Generative AI integration for creating and modifying automations through natural language, (2) Autonomous Automation with self-learning systems that identify opportunities and self-heal, (3) Hyperautomation combining multiple technologies to automate complex end-to-end processes, and (4) Enhanced security features for enterprise-grade automation governance and compliance."
  }
];

export const metadata: Metadata = {
  title: "UiPath | Agentic AI & Automation Solutions | Enterprise RPA",
  description:
    "Transform your enterprise with UiPath's Agentic Automation platform combining AI agents, RPA, and workflow orchestration for end-to-end process automation. Achieve 30-50% cost reduction and 80% faster processing.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "UiPath | Agentic AI & Automation Solutions | Enterprise RPA",
    description: "Transform your enterprise with UiPath's Agentic Automation platform combining AI agents, RPA, and workflow orchestration for end-to-end process automation.",
    type: "website",
    url: "https://www.atlastechnosoft.com/automation-solutions/ui-path",
    images: [
      {
        url: "/images/solutions/B4_A.png",
        width: 1200,
        height: 630,
        alt: "UiPath Agentic Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UiPath | Agentic AI & Automation Solutions",
    description: "Transform your enterprise with UiPath's Agentic Automation platform. Achieve 30-50% cost reduction and 80% faster processing.",
    images: ["/images/solutions/B4_A.png"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/automation-solutions/ui-path",
  },
}

export default function UiPathPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Automation Solutions", url: "/automation-solutions" },
    { name: "UiPath", url: "/automation-solutions/ui-path" },
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
        title="UiPath Agentic Automation Platform"
        description="Transform your enterprise with UiPath's Agentic Automation platform combining AI agents, RPA, and workflow orchestration for end-to-end process automation. Achieve 30-50% cost reduction and 80% faster processing."
        canonicalUrl="/automation-solutions/ui-path"
        image="/images/solutions/B4_A.png"
        brand="UiPath"
        categoryBreadcrumbs={[
          { name: "Automation Solutions", url: "/automation-solutions" },
          { name: "UiPath", url: "/automation-solutions/ui-path" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "UiPath Agentic Automation",
        "Transform your enterprise with UiPath's Agentic Automation platform combining AI agents, RPA, and workflow orchestration for end-to-end process automation.",
        "/automation-solutions/ui-path",
        "/images/solutions/B4_A.png"
      )} />
      <StructuredData data={generateFaqSchema(UIPATH_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">UiPath Agentic Automation Platform for Enterprise Process Automation</h1>
        <div itemProp="description">
          Transform your enterprise with UiPath's Agentic Automation platform that combines AI agents, 
          RPA robots, and workflow orchestration for end-to-end process automation. Achieve 30-50% 
          cost reduction, 40-80% faster processing, and 90% reduction in compliance-related errors 
          across finance, HR, operations, customer service, and IT workflows.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="UiPath" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <UiPathHero />
        
        <section id="agentic">
          <UiPathAgentic />
        </section>
        
        <section id="capabilities">
          <UiPathCapabilities />
        </section>
        
        <section id="sap-automation">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <UiPathSapAutomation />
          </Suspense>
        </section>
        
        <section id="business-value">
          <UiPathBusinessValue />
        </section>
        
        <section id="trends">
          <UiPathTrends />
        </section>
        
        <section id="cta">
          <UiPathCta />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose UiPath Agentic Automation?</h2>
        <ul>
          <li>30-50% reduction in operational costs for automated processes</li>
          <li>40-80% reduction in processing time with increased accuracy</li>
          <li>AI agents that understand context and adapt to changing scenarios</li>
          <li>SAP-certified solution for secure, reliable automation of SAP processes</li>
          <li>90% reduction in compliance-related errors through standardized workflows</li>
          <li>35% increase in employee satisfaction by eliminating mundane tasks</li>
          <li>Implementation by certified UiPath partner with proven expertise</li>
        </ul>
        
        <h2>UiPath Platform Technical Capabilities</h2>
        <p>
          UiPath's comprehensive platform combines AI agents with traditional RPA robots for 
          intelligent automation. Core capabilities include Robotic Process Automation for 
          automating repetitive tasks, Process Mining for data-driven process discovery, 
          Task Mining for desktop activity monitoring, Document Understanding for intelligent 
          data extraction, and Orchestration for comprehensive workflow management. The platform 
          integrates seamlessly with enterprise systems including SAP, Microsoft 365, Oracle, 
          Salesforce, and ServiceNow through native connectors.
        </p>
        
        <h2>Industry Applications of UiPath</h2>
        <p>
          UiPath delivers transformative results across multiple industries. In financial services, 
          it automates accounts payable, accounts receivable, and financial close processes with 
          80% reduction in manual effort. Healthcare organizations leverage UiPath for patient 
          scheduling, claims processing, and medical records management, achieving 70% faster 
          processing time. Manufacturing companies implement UiPath for order management, supply 
          chain automation, quality control, and maintenance management, resulting in 40% reduction 
          in processing costs and 65% improvement in data accuracy.
        </p>
      </div>
    </div>
  )
}
