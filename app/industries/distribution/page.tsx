import type { Metadata } from "next"
import { Suspense } from "react"
import ClientDistributionPage from "./client-page"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Distribution Solutions",
  "Logistics Management",
  "Supply Chain Optimization",
  "Warehouse Management Systems",
  "Transportation Management",
];

const SECONDARY_KEYWORDS = [
  "SAP for Distribution",
  "Inventory Optimization",
  "Route Optimization",
  "Order Fulfillment Automation",
  "Multi-channel Distribution",
  "Last-mile Delivery",
  "Fleet Management",
  "Distribution Analytics",
  "Real-time Tracking",
  "Demand Forecasting",
  "Logistics Technology",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/industries/distribution.jpg",
  "/images/industries/distribution-value-chain.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/industries/distribution.jpg": "high",
  "/images/industries/distribution-value-chain.svg": "medium",
};

// FAQ data for structured data
const DISTRIBUTION_FAQS = [
  {
    question: "What are the key benefits of implementing SAP Business One for distribution companies?",
    answer: "SAP Business One delivers multiple benefits for distribution companies including 35% reduction in inventory carrying costs through real-time inventory management, 40% faster order processing with automated workflows, 60% improvement in shipping accuracy with barcode/RFID integration, 30% reduction in transportation costs through route optimization, and 45% enhanced demand forecasting accuracy with predictive analytics. The system also provides end-to-end visibility across warehouse operations, order management, and transportation processes in a single integrated platform."
  },
  {
    question: "How can distribution companies optimize their supply chain with technology?",
    answer: "Distribution companies can optimize their supply chain through advanced technology implementations including: AI-powered demand forecasting (40% improved accuracy), automated warehouse management systems (60% faster picking/packing), real-time fleet tracking and route optimization (30% reduced fuel costs), IoT-enabled inventory management (35% reduction in stockouts), supplier integration portals (45% faster restocking), predictive maintenance for logistics equipment (70% reduction in downtime), and integrated business intelligence (55% improved decision making through comprehensive supply chain analytics)."
  },
  {
    question: "What logistics processes can be automated to increase efficiency?",
    answer: "Key logistics processes that benefit from automation include order processing (75% faster processing times), warehouse operations (60% increased picking efficiency), inventory management (40% reduction in carrying costs), shipping documentation (90% error reduction), route planning (35% more efficient delivery routes), returns processing (50% faster processing), customer communications (80% reduction in manual updates), delivery scheduling (45% more efficient delivery windows), supplier management (30% faster procurement cycles), and quality control (65% reduction in shipping errors through automated inspection)."
  },
  {
    question: "How does real-time tracking improve distribution operations?",
    answer: "Real-time tracking transforms distribution operations through: 95% improved shipment visibility across the entire supply chain, 40% reduction in customer service inquiries due to proactive status updates, 30% decrease in failed deliveries with dynamic routing adjustments, 50% improvement in delivery time accuracy, 35% reduction in theft and loss through continuous monitoring, 60% enhanced fleet utilization with real-time load balancing, 45% more efficient driver management, 25% reduced fuel consumption through optimized routing, and 80% faster exception handling when issues occur."
  },
  {
    question: "What is the ROI timeline for implementing a distribution management system?",
    answer: "The ROI timeline for distribution management system implementation typically follows three phases: immediate returns in months 1-3 (15-20% operational efficiency from basic automation), mid-term returns in months 4-9 (25-35% improvements from integrated inventory and transportation management), and strategic returns in months 10-18 (40-55% improvements from data-driven optimization and predictive capabilities). Most distribution companies achieve complete ROI within 14-20 months, with cloud-based implementations showing 30% faster returns due to reduced upfront costs and faster deployment."
  }
];

// Loading fallback
const PageLoading = () => <div className="min-h-screen w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>

export const metadata: Metadata = {
  title: "Distribution & Logistics Solutions | Supply Chain Optimization",
  description: "Optimize your distribution operations with integrated logistics solutions that deliver 30% reduced delivery times, 25% lower logistics costs, and 40% improved inventory accuracy.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Distribution & Logistics Solutions | Supply Chain Optimization",
    description: "Transform your distribution operations with integrated supply chain technologies that optimize warehouse management, streamline transportation, and enhance inventory control.",
    type: "website",
    url: "https://www.atlastechnosoft.com/industries/distribution",
    images: [
      {
        url: "/images/industries/distribution.jpg",
        width: 1200,
        height: 630,
        alt: "Distribution & Logistics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distribution Solutions | Logistics Optimization",
    description: "Transform your distribution with advanced supply chain technologies. Achieve 30% reduced delivery times and 25% lower logistics costs.",
    images: ["/images/industries/distribution.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/industries/distribution",
  },
}

// Main page component with enhanced SEO
export default function DistributionPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Distribution & Logistics", url: "/industries/distribution" },
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
        "Distribution & Logistics Solutions",
        "Innovative SAP and automation solutions for distribution and logistics companies to optimize inventory management, streamline order fulfillment, and gain end-to-end supply chain visibility.",
        "/industries/distribution",
        "/images/industries/distribution.jpg"
      )} />
      <StructuredData data={generateFaqSchema(DISTRIBUTION_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <div className="visually-hidden">
        <h1>Distribution & Logistics Solutions for Supply Chain Optimization</h1>
        <p>
          Atlas Technosoft delivers comprehensive distribution solutions that integrate 
          SAP Business One ERP with advanced logistics technologies, providing end-to-end 
          supply chain transformation. Our distribution-specific implementations deliver 30% reduced 
          delivery times, 25% lower logistics costs, 40% improved inventory accuracy, and 45% 
          enhanced order fulfillment rates through warehouse automation, transportation management, 
          and advanced analytics.
        </p>
        
        <h2>Distribution Industry Challenges We Solve</h2>
        <ul>
          <li>Complex multi-channel inventory management</li>
          <li>Inefficient order processing and fulfillment</li>
          <li>Transportation cost optimization</li>
          <li>Last-mile delivery challenges</li>
          <li>Limited supply chain visibility</li>
          <li>Manual warehouse operations</li>
          <li>Inaccurate demand forecasting</li>
          <li>Delivery route inefficiencies</li>
        </ul>
        
        <h2>Distribution Solutions and Services</h2>
        <ul>
          <li>Warehouse Management Systems</li>
          <li>Transportation Management Solutions</li>
          <li>Inventory Optimization</li>
          <li>Route Planning & Optimization</li>
          <li>Order Fulfillment Automation</li>
          <li>Supply Chain Analytics</li>
          <li>Fleet Management Solutions</li>
          <li>Last-mile Delivery Optimization</li>
          <li>Real-time Tracking & Monitoring</li>
        </ul>
      </div>
      
      <Suspense fallback={<PageLoading />}>
        <ClientDistributionPage />
      </Suspense>
    </>
  )
} 