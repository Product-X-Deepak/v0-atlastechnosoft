import type { Metadata } from "next"
import { Suspense } from "react"
import ClientManufacturingPage from "./client-page"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Manufacturing ERP Solutions",
  "Manufacturing Software",
  "Production Management System",
  "Factory Automation",
  "Smart Manufacturing",
];

const SECONDARY_KEYWORDS = [
  "Industry 4.0 Implementation",
  "SAP for Manufacturing",
  "Manufacturing Intelligence",
  "Production Planning Software",
  "Quality Control Systems",
  "Manufacturing Execution System",
  "Supply Chain Optimization",
  "Industrial IoT",
  "Digital Twin Technology",
  "Predictive Maintenance",
  "Manufacturing Analytics",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/industries/manufacturing.jpg",
  "/images/industries/manufacturing-value-chain.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/industries/manufacturing.jpg": "high",
  "/images/industries/manufacturing-value-chain.svg": "medium",
};

// FAQ data for structured data
const MANUFACTURING_FAQS = [
  {
    question: "What are the benefits of implementing ERP in manufacturing?",
    answer: "Implementing ERP in manufacturing delivers multiple benefits including 20-30% reduction in inventory costs, 15-25% improvement in productivity, 12-18% decrease in operational expenses, and 30-45% faster time-to-market for new products. The integrated system provides real-time visibility across production, inventory, quality, maintenance, and supply chain operations, enabling data-driven decision making and continuous improvement."
  },
  {
    question: "How does Industry 4.0 transform manufacturing operations?",
    answer: "Industry 4.0 transforms manufacturing through smart connectivity and automation technologies. Key impacts include 35% increased operational efficiency through predictive maintenance, 40-60% reduction in downtime, 20-25% quality improvement with real-time monitoring and AI-assisted quality control, 30% faster product development cycles with digital twins, and sustainable manufacturing practices reducing energy consumption by 15-20% and waste by 25%."
  },
  {
    question: "What manufacturing processes can be automated?",
    answer: "Numerous manufacturing processes can be automated including production scheduling (85% reduction in planning time), inventory management (30% reduction in carrying costs), quality inspection (99.8% defect detection with machine vision), material handling (62% increase in throughput with AGVs/AMRs), order processing (75% faster order fulfillment), production reporting (90% reduction in manual data collection), maintenance scheduling (45% reduction in unexpected downtime), and supplier management (35% more efficient procurement)."
  },
  {
    question: "How do SAP solutions benefit manufacturing companies?",
    answer: "SAP solutions benefit manufacturing by providing comprehensive functionality for production planning and execution (15% higher resource utilization), inventory and warehouse management (25% reduction in carrying costs), quality management (40% fewer quality incidents), maintenance management (30% extended equipment lifetime), product lifecycle management (35% faster time-to-market), supply chain visibility (65% improvement in forecast accuracy), manufacturing analytics (55% better operational insights), and compliance management (90% reduction in audit preparation time)."
  },
  {
    question: "What is the ROI timeline for digital transformation in manufacturing?",
    answer: "Digital transformation ROI in manufacturing typically follows this timeline: quick wins in months 1-3 (5-10% operational efficiency gains from basic automation), initial returns in months 4-6 (15-20% productivity improvements from workflow optimization), significant returns in months 7-12 (25-35% cost reductions across connected systems), and transformational returns in years 2-3 (40-60% improvements in KPIs through predictive analytics and AI-driven optimization). Most manufacturing clients achieve complete ROI within 18-24 months."
  }
];

// Loading fallback
const PageLoading = () => <div className="min-h-screen w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>

export const metadata: Metadata = {
  title: "Manufacturing ERP & Automation Solutions | Industry 4.0 Implementation",
  description: "Optimize your manufacturing operations with integrated ERP, Industry 4.0, and automation solutions that deliver 25% higher productivity, 30% reduced costs, and enhanced quality control.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Manufacturing ERP & Automation Solutions | Industry 4.0 Implementation",
    description: "Transform your manufacturing operations with integrated ERP, smart factory technologies, and automation solutions that deliver measurable ROI across production, quality, and supply chain.",
    type: "website",
    url: "https://www.atlastechnosoft.com/industries/manufacturing",
    images: [
      {
        url: "/images/industries/manufacturing.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Manufacturing Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Solutions | ERP & Industry 4.0",
    description: "Transform your manufacturing with smart factory technologies. Achieve 25% higher productivity and 30% reduced costs.",
    images: ["/images/industries/manufacturing.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/industries/manufacturing",
  },
}

// Main page component with enhanced SEO
export default function ManufacturingPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Manufacturing", url: "/industries/manufacturing" },
  ]
  
  return (
    <>
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />
      
      {/* Enhanced SEO with structured data */}
      <StructuredData data={generateServiceSchema(
        "Manufacturing Solutions",
        "Advanced SAP Business One and automation solutions for manufacturing companies looking to optimize production, enhance quality control, and improve supply chain management with Industry 4.0 technologies.",
        "/industries/manufacturing",
        "/images/industries/manufacturing.jpg"
      )} />
      <StructuredData data={generateFaqSchema(MANUFACTURING_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <div className="visually-hidden">
        <h1>Manufacturing ERP & Industry 4.0 Solutions</h1>
        <p>
          Atlas Technosoft delivers comprehensive manufacturing solutions that integrate 
          SAP Business One ERP with Industry 4.0 technologies, providing end-to-end digital 
          transformation for manufacturing operations. Our manufacturing-specific implementations 
          deliver 25% higher productivity, 30% lower operational costs, 40% reduced inventory 
          levels, and 55% improvement in quality metrics through integrated production planning, 
          shop floor execution, quality management, and supply chain optimization.
        </p>
        
        <h2>Manufacturing Industry Challenges We Solve</h2>
        <ul>
          <li>Production planning and scheduling inefficiencies</li>
          <li>Quality control and compliance issues</li>
          <li>Supply chain visibility and disruption</li>
          <li>Equipment downtime and maintenance costs</li>
          <li>Inventory management and optimization</li>
          <li>Product lifecycle management</li>
          <li>Cost tracking and profitability analysis</li>
          <li>Shop floor data collection and visibility</li>
        </ul>
        
        <h2>Manufacturing Solutions and Services</h2>
        <ul>
          <li>Manufacturing ERP Implementation and Optimization</li>
          <li>Production Planning and Scheduling Systems</li>
          <li>Manufacturing Execution Systems (MES)</li>
          <li>Quality Management and Compliance Solutions</li>
          <li>Supply Chain Planning and Optimization</li>
          <li>Shop Floor Data Collection and Analysis</li>
          <li>Industrial IoT and Sensor Integration</li>
          <li>Predictive Maintenance Implementation</li>
          <li>Manufacturing Business Intelligence</li>
        </ul>
      </div>
      
    <Suspense fallback={<PageLoading />}>
      <ClientManufacturingPage />
    </Suspense>
    </>
  )
}