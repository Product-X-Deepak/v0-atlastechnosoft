import type { Metadata } from "next"
import { Suspense } from "react"
import { 
  RpaSolutionsHero,
  RpaSolutionsCapabilities,
  RpaSolutionsProcess,
  RpaSolutionsUseCases,
  RpaSolutionsAgenticAi,
  RpaSolutionsBenefits,
  RpaSolutionsCta
} from "@/components/automation/rpa"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
    "RPA Solutions",
    "UiPath",
    "Agentic Automation",
    "Robotic Process Automation",
    "Workflow Automation",
];

const SECONDARY_KEYWORDS = [
    "Business Process Automation",
    "AI Agents",
    "Digital Transformation",
    "Process Optimization",
  "Enterprise Automation",
  "UiPath Partner",
  "RPA Implementation",
  "Automation Consulting",
  "Intelligent Automation",
  "Process Mining",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/solutions/uipath-rpa.jpg",
  "/images/solutions/B6_A.png",
  "/images/partners/uipath-partner.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/solutions/uipath-rpa.jpg": "high",
  "/images/partners/uipath-partner.svg": "high",
};

// FAQ data for structured data
const RPA_FAQS = [
  {
    question: "What is Robotic Process Automation (RPA)?",
    answer: "Robotic Process Automation (RPA) is a technology that uses software robots or 'bots' to automate repetitive, rule-based tasks that typically require human interaction with digital systems. These bots can capture data, navigate systems, perform calculations, and execute transactions, working 24/7 with 100% accuracy and significantly improving operational efficiency."
  },
  {
    question: "What is Agentic Automation and how does it differ from traditional RPA?",
    answer: "Agentic Automation combines AI agents with traditional RPA robots to create a more intelligent and adaptable automation solution. While traditional RPA excels at rule-based, repetitive tasks, Agentic Automation adds cognitive capabilities through AI that can understand context, make decisions, adapt to new situations, and complete complex end-to-end processes with minimal human intervention."
  },
  {
    question: "What business processes can be automated with UiPath RPA?",
    answer: "UiPath RPA can automate a wide range of business processes across departments including finance (invoice processing, financial reporting, account reconciliation), HR (employee onboarding, timesheet processing, benefits administration), operations (supply chain management, inventory control, quality assurance), customer service (query handling, order processing), and IT (system monitoring, user provisioning, data migration)."
  },
  {
    question: "How long does it take to implement an RPA solution?",
    answer: "Implementation timelines vary based on process complexity, but typically range from 4-12 weeks. Simple processes can be automated in as little as 2-4 weeks, while more complex, cross-functional processes may take 8-12 weeks. Our methodology includes process discovery, solution design, development, testing, deployment, and knowledge transfer to ensure successful implementation."
  },
  {
    question: "What is the ROI of implementing RPA solutions?",
    answer: "Organizations typically achieve ROI within 6-9 months of implementing RPA. The financial benefits come from multiple sources: 70% time savings on automated tasks, 85% faster processing times, 99.9% accuracy rates eliminating error correction costs, 40% faster time-to-market for new initiatives, and 30-50% reduction in operational costs. Additionally, improved employee satisfaction and customer experience provide significant non-financial benefits."
  }
];

export const metadata: Metadata = {
  title: "RPA Solutions | UiPath Agentic Automation | Enterprise Process Automation",
  description:
    "Transform your business with our UiPath RPA solutions. Combine agentic AI with robotic process automation to achieve 70% time savings, 85% faster processing, and 99.9% accuracy across enterprise workflows.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "RPA Solutions | UiPath Agentic Automation | Enterprise Process Automation",
    description: "Transform your business with UiPath RPA solutions and agentic AI. Achieve 70% time savings, 85% faster processing, and 99.9% accuracy across enterprise workflows.",
    type: "website",
    url: "https://www.atlastechnosoft.com/automation-solutions/rpa-solutions",
    images: [
      {
        url: "/images/solutions/B6_A.png",
        width: 1200,
        height: 630,
        alt: "UiPath RPA and Agentic Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPA Solutions | UiPath Agentic Automation",
    description: "Transform your enterprise workflows with UiPath RPA and agentic AI automation. Achieve 70% time savings and 99.9% accuracy.",
    images: ["/images/solutions/B6_A.png"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/automation-solutions/rpa-solutions",
  },
}

export default function RpaSolutionsPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Automation Solutions", url: "/automation-solutions" },
    { name: "RPA Solutions", url: "/automation-solutions/rpa-solutions" },
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
        title="UiPath RPA Solutions"
        description="Transform your business with UiPath RPA and agentic AI automation. Combine intelligent agents with robotic process automation to achieve 70% time savings, 85% faster processing, and 99.9% accuracy across your enterprise."
        canonicalUrl="/automation-solutions/rpa-solutions"
        image="/images/solutions/uipath-rpa.jpg"
        brand="UiPath"
        categoryBreadcrumbs={[
          { name: "Automation Solutions", url: "/automation-solutions" },
          { name: "RPA Solutions", url: "/automation-solutions/rpa-solutions" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "UiPath RPA Solutions",
        "Accelerate your digital transformation with our UiPath RPA solutions. Combine agentic AI with robotic process automation to transform your enterprise workflows.",
        "/automation-solutions/rpa-solutions",
        "/images/solutions/uipath-rpa.jpg"
      )} />
      <StructuredData data={generateFaqSchema(RPA_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">UiPath RPA Solutions with Agentic Automation</h1>
        <div itemProp="description">
          Transform your business processes with our UiPath RPA solutions that combine AI-powered 
          agents with robotic process automation. Achieve 70% time savings, 85% faster processing, 
          and 99.9% accuracy across finance, HR, operations, customer service, and IT workflows.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="UiPath" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
      <RpaSolutionsHero />
        
        <section id="capabilities">
      <RpaSolutionsCapabilities />
        </section>
        
        <section id="agentic-ai">
      <RpaSolutionsAgenticAi />
        </section>
        
        <section id="use-cases">
      <RpaSolutionsUseCases />
        </section>
        
        <section id="process">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
      <RpaSolutionsProcess />
          </Suspense>
        </section>
        
        <section id="benefits">
      <RpaSolutionsBenefits />
        </section>
        
        <section id="cta">
      <RpaSolutionsCta />
        </section>
    </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose UiPath RPA Solutions?</h2>
        <ul>
          <li>70% time savings on automated tasks across business departments</li>
          <li>85% faster processing times for critical business operations</li>
          <li>99.9% accuracy rates with elimination of human errors</li>
          <li>6-9 month ROI with measurable returns on automation investment</li>
          <li>40% faster time-to-market for new business initiatives</li>
          <li>50% higher employee engagement by eliminating mundane tasks</li>
          <li>Implementation by certified UiPath partner with proven methodology</li>
        </ul>
        
        <h2>UiPath RPA Technical Capabilities</h2>
        <p>
          UiPath's RPA platform combines traditional robotic process automation with AI-powered 
          agents to create a comprehensive automation solution. The platform includes process 
          recording for easy automation creation, intelligent data extraction from various documents, 
          multi-platform support across applications, scheduled execution based on triggers, and 
          detailed analytics for continuous improvement. The agentic automation capabilities add 
          cognitive decision-making, natural language understanding, and adaptive learning.
        </p>
        
        <h2>Industry Applications of RPA</h2>
        <p>
          UiPath RPA delivers transformative results across multiple industries. In financial services, 
          it automates invoice processing, financial reporting, and compliance monitoring with 85% 
          faster processing time. Healthcare organizations benefit from automated patient scheduling, 
          claims processing, and medical records management, reducing administrative costs by 40%. 
          Manufacturing companies implement RPA for production planning, supply chain automation, 
          quality control, and maintenance management, achieving 55% reduction in quality-related 
          issues and 60% reduction in unplanned downtime.
        </p>
      </div>
    </div>
  )
}

