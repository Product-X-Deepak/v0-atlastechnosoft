import type { Metadata } from "next"
import { Suspense } from "react"
import { 
  WorkflowAutomationHero,
  WorkflowAutomationFeatures,
  WorkflowAutomationProcess,
  WorkflowAutomationUseCases,
  WorkflowAutomationBenefits,
  WorkflowAutomationFaq
} from "@/components/automation"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Workflow Automation",
  "Business Process Automation",
  "Digital Workflows",
  "Automated Business Processes",
  "Process Optimization",
];

const SECONDARY_KEYWORDS = [
  "Enterprise Workflow Management",
  "Approval Workflow Automation",
  "Document Workflow Automation",
  "Cross-Department Automation",
  "Paperless Workflow",
  "Automated Approvals",
  "Workflow Efficiency",
  "Task Automation",
  "Business Process Management",
  "BPM Solutions",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/solutions/workflow-automation.jpg",
  "/images/solutions/workflow-diagram.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/solutions/workflow-automation.jpg": "high",
  "/images/solutions/workflow-diagram.svg": "medium",
};

// FAQ data for structured data
const WORKFLOW_FAQS = [
  {
    question: "What is Workflow Automation?",
    answer: "Workflow Automation is the technology-enabled automation of complex business processes and workflows. It uses rule-based logic to automatically route documents, data, and tasks through a sequence of steps, eliminating manual handoffs, reducing errors, and accelerating processing times. Modern workflow automation incorporates digital forms, approval routing, notifications, document generation, and integration with enterprise systems."
  },
  {
    question: "What business processes can benefit from workflow automation?",
    answer: "Virtually any structured business process can benefit from workflow automation, particularly those involving approvals, reviews, or data processing. Common applications include employee onboarding, expense approval, purchase requisitions, contract management, invoice processing, customer onboarding, document review cycles, compliance processes, IT service requests, and employee leave management."
  },
  {
    question: "How does workflow automation differ from RPA?",
    answer: "While both technologies automate tasks, workflow automation orchestrates end-to-end processes involving multiple people and systems through a defined sequence of steps. Robotic Process Automation (RPA) mimics human actions to automate specific tasks within applications. They're complementary technologies, with workflow automation managing the process flow and RPA handling repetitive tasks within those processes."
  },
  {
    question: "What ROI can organizations expect from workflow automation?",
    answer: "Organizations typically achieve 25-50% reduction in processing times, 40-60% reduction in labor costs for automated processes, 80-95% decrease in errors and exceptions, and 30-40% improvement in compliance. Additional benefits include 70% reduction in paper consumption, 50% faster approval cycles, and 35% higher employee satisfaction. Most implementations see positive ROI within 3-6 months."
  },
  {
    question: "Is workflow automation suitable for small businesses?",
    answer: "Yes, workflow automation is increasingly accessible to small businesses through cloud-based solutions that require minimal IT infrastructure and technical expertise. Modern platforms offer pre-built templates for common processes, drag-and-drop design, and subscription pricing models. Small businesses typically start with automating finance, HR, and customer service processes, achieving 30-40% efficiency improvements with minimal investment."
  }
];

export const metadata: Metadata = {
  title: "Enterprise Workflow Automation | Business Process Optimization",
  description:
    "Transform your business with intelligent workflow automation solutions that reduce processing times by 50%, eliminate 95% of errors, and deliver 40% cost savings across departments.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Enterprise Workflow Automation | Business Process Optimization",
    description: "Transform your business operations with intelligent workflow automation that reduces processing times by 50%, eliminates 95% of errors, and delivers 40% cost savings.",
    type: "website",
    url: "https://www.atlastechnosoft.com/automation-solutions/workflow-automation",
    images: [
      {
        url: "/images/solutions/workflow-automation.jpg",
        width: 1200,
        height: 630,
        alt: "Enterprise Workflow Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Automation | Business Process Optimization",
    description: "Transform your business with intelligent workflow automation. Reduce processing times by 50% and achieve 40% cost savings.",
    images: ["/images/solutions/workflow-automation.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/automation-solutions/workflow-automation",
  },
}

export default function WorkflowAutomationPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Automation Solutions", url: "/automation-solutions" },
    { name: "Workflow Automation", url: "/automation-solutions/workflow-automation" },
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
        title="Intelligent Workflow Automation Solutions"
        description="Transform your business operations with enterprise-grade workflow automation that reduces processing times by 50%, eliminates 95% of errors, and delivers 40% cost savings across departments."
        canonicalUrl="/automation-solutions/workflow-automation"
        image="/images/solutions/workflow-automation.jpg"
        brand="Atlas Technosoft"
        categoryBreadcrumbs={[
          { name: "Automation Solutions", url: "/automation-solutions" },
          { name: "Workflow Automation", url: "/automation-solutions/workflow-automation" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "Workflow Automation Solutions",
        "Enterprise-grade workflow automation solutions that transform your business operations with intelligent process optimization, cross-department integration, and measurable efficiency gains.",
        "/automation-solutions/workflow-automation",
        "/images/solutions/workflow-automation.jpg"
      )} />
      <StructuredData data={generateFaqSchema(WORKFLOW_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">Enterprise Workflow Automation Solutions</h1>
        <div itemProp="description">
          Transform your business operations with intelligent workflow automation solutions 
          that reduce processing times by 50%, eliminate 95% of errors, and deliver 40% cost 
          savings across departments. Our comprehensive approach to business process automation 
          streamlines approvals, document handling, cross-department coordination, and 
          system integration for maximum operational efficiency.
        </div>
        <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Atlas Technosoft" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <WorkflowAutomationHero />
        
        <section id="features" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Workflow Automation Features</h2>
          <WorkflowAutomationFeatures />
        </section>
        
        <section id="process" aria-labelledby="process-heading">
          <h2 id="process-heading" className="sr-only">Workflow Implementation Process</h2>
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <WorkflowAutomationProcess />
          </Suspense>
        </section>
        
        <section id="use-cases" aria-labelledby="use-cases-heading">
          <h2 id="use-cases-heading" className="sr-only">Workflow Automation Use Cases</h2>
          <WorkflowAutomationUseCases />
        </section>
        
        <section id="benefits" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="sr-only">Workflow Automation Benefits</h2>
          <WorkflowAutomationBenefits />
        </section>
        
        <section id="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
          <WorkflowAutomationFaq />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose Our Workflow Automation Solutions?</h2>
        <ul>
          <li>50% reduction in process cycle times across departments</li>
          <li>95% elimination of manual errors in document processing</li>
          <li>40% cost savings through operational efficiency</li>
          <li>70% reduction in paper consumption and storage costs</li>
          <li>80% faster approval cycles for critical business processes</li>
          <li>35% improvement in employee satisfaction through reduced manual work</li>
          <li>Seamless integration with existing enterprise systems</li>
        </ul>
        
        <h2>Enterprise Workflow Automation Capabilities</h2>
        <p>
          Our enterprise workflow automation platform provides comprehensive capabilities for 
          optimizing business processes across departments. Core features include visual process 
          design with drag-and-drop interfaces, intelligent form creation, conditional logic 
          for complex routing, role-based approvals, document generation, digital signatures, 
          audit trails for compliance, and robust reporting. The platform seamlessly integrates 
          with ERP, CRM, HRIS and document management systems through pre-built connectors.
        </p>
        
        <h2>Industry Applications of Workflow Automation</h2>
        <p>
          Workflow automation delivers transformative results across multiple industries. In finance, 
          it streamlines AP/AR processes, expense management, and budgeting approvals with 50% faster 
          processing. HR departments benefit from automated onboarding, performance reviews, and leave 
          management, reducing administrative costs by 45%. Manufacturing companies implement workflow 
          automation for quality assurance, change management, and supplier onboarding, achieving 65% 
          reduction in process delays and 40% improvement in compliance management.
        </p>
      </div>
    </div>
  )
} 