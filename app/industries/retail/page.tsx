import type { Metadata } from "next"
import { Suspense } from "react"
import ClientRetailPage from "./client-page"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Retail ERP Solutions",
  "Omnichannel Retail",
  "Retail Management System",
  "Retail Technology",
  "Unified Commerce Platform",
];

const SECONDARY_KEYWORDS = [
  "SAP for Retail",
  "Inventory Optimization",
  "Point of Sale Integration",
  "Customer Experience Management",
  "Retail Analytics",
  "Digital Merchandising",
  "Order Management System",
  "Retail Supply Chain",
  "Mobile Commerce",
  "AI-driven Retail",
  "Retail Business Intelligence",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/industries/retail.jpg",
  "/images/industries/retail-value-chain.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/industries/retail.jpg": "high",
  "/images/industries/retail-value-chain.svg": "medium",
};

// FAQ data for structured data
const RETAIL_FAQS = [
  {
    question: "What is omnichannel retail and how does it benefit businesses?",
    answer: "Omnichannel retail is the integrated approach to sales that provides customers with a unified experience across all shopping channels—physical stores, e-commerce, mobile apps, and social commerce. Benefits include 15-25% higher revenue, 30% higher customer lifetime value, 20-30% increased conversion rates, 25% reduction in inventory costs through centralized management, and comprehensive customer insights from unified data. Our omnichannel solutions enable retailers to create seamless experiences regardless of where, when, or how customers engage with the brand."
  },
  {
    question: "How does SAP Business One help retail businesses?",
    answer: "SAP Business One provides retailers with a comprehensive management platform delivering multiple benefits: 35% faster store operations through integrated POS systems, 25-40% reduction in inventory costs with real-time stock optimization, 60% improvement in supply chain visibility, 30% faster financial reconciliation and reporting, 20% increase in customer retention with integrated CRM, and 45% improvement in forecasting accuracy. The cloud-based system also enables multi-location management, mobile access, and scalability for growing retail operations."
  },
  {
    question: "What retail processes can be automated to increase efficiency?",
    answer: "Key retail processes that benefit from automation include inventory management (40% reduction in stockouts, 30% less overstock), purchase order processing (75% faster reordering cycles), pricing and promotion management (90% fewer pricing errors), customer communications (60% more efficient customer service), financial reconciliation (65% faster end-of-day processing), employee scheduling (30% labor cost optimization), and demand forecasting (45% improved prediction accuracy). These automations deliver an average 20-35% operational efficiency improvement across retail operations."
  },
  {
    question: "How can retailers leverage data analytics for business growth?",
    answer: "Retailers can leverage data analytics for growth through: customer segmentation analysis (25% higher marketing ROI), personalized product recommendations (35% increase in average order value), dynamic pricing optimization (15-20% margin improvement), inventory forecasting (30% reduction in carrying costs), store layout optimization (18% increase in sales per square foot), staff scheduling based on foot traffic patterns (22% labor cost reduction), and customer journey analysis (40% improved conversion rates through identified friction points). Our retail analytics solutions integrate data from all channels for comprehensive business insights."
  },
  {
    question: "What is the ROI timeline for retail digital transformation?",
    answer: "The ROI timeline for retail digital transformation typically follows three phases: quick wins in months 1-3 (10-15% efficiency improvements from basic automation and integration), medium-term returns in months 4-9 (20-30% operational improvements from omnichannel capabilities and inventory optimization), and strategic returns in months 10-18 (35-50% business growth from data-driven decision making and enhanced customer experiences). Most retailers achieve complete ROI within 12-18 months, with cloud-based implementations showing faster returns."
  }
];

// Loading fallback
const PageLoading = () => <div className="min-h-screen w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>

export const metadata: Metadata = {
  title: "Retail Management Solutions | Omnichannel Commerce & ERP",
  description: "Transform your retail business with our omnichannel solutions and SAP Business One integration that unify commerce channels, optimize inventory, and increase customer lifetime value by 30%.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Retail Management Solutions | Omnichannel Commerce & ERP",
    description: "Transform your retail business with omnichannel solutions that unify online and offline channels, optimize inventory with advanced algorithms, and deliver personalized customer experiences.",
    type: "website",
    url: "https://www.atlastechnosoft.com/industries/retail",
    images: [
      {
        url: "/images/industries/retail.jpg",
        width: 1200,
        height: 630,
        alt: "Omnichannel Retail Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Solutions | Omnichannel Commerce Platform",
    description: "Transform your retail business with omnichannel solutions. Achieve 30% higher customer lifetime value and 25% inventory cost reduction.",
    images: ["/images/industries/retail.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/industries/retail",
  },
}

// Main page component with enhanced SEO
export default function RetailPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Retail", url: "/industries/retail" },
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
        "Retail Management Solutions",
        "Advanced SAP Business One and automation solutions for retail businesses to unify omnichannel commerce, optimize inventory with ML algorithms, and deliver personalized customer experiences for increased revenue and loyalty.",
        "/industries/retail",
        "/images/industries/retail.jpg"
      )} />
      <StructuredData data={generateFaqSchema(RETAIL_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <div className="visually-hidden">
        <h1>Retail Management & Omnichannel Commerce Solutions</h1>
        <p>
          Atlas Technosoft delivers comprehensive retail solutions that integrate 
          SAP Business One ERP with omnichannel commerce technologies, providing end-to-end 
          retail transformation. Our retail-specific implementations deliver 15-25% higher 
          revenue, 30% higher customer lifetime value, 25% reduction in inventory costs, 
          and 45% improved forecasting accuracy through unified commerce, intelligent 
          inventory management, and data-driven customer experiences.
        </p>
        
        <h2>Retail Industry Challenges We Solve</h2>
        <ul>
          <li>Fragmented customer experiences across channels</li>
          <li>Inventory visibility and optimization challenges</li>
          <li>Manual and inefficient store operations</li>
          <li>Limited customer insights and personalization</li>
          <li>Complex supply chain and logistics management</li>
          <li>Slow adaptation to changing market dynamics</li>
          <li>Inefficient merchandising and pricing strategies</li>
          <li>Integration between online and physical stores</li>
        </ul>
        
        <h2>Retail Solutions and Services</h2>
        <ul>
          <li>Omnichannel Commerce Integration</li>
          <li>Retail ERP Implementation and Optimization</li>
          <li>Point of Sale (POS) Integration</li>
          <li>Inventory and Warehouse Management</li>
          <li>Customer Experience Management</li>
          <li>Retail Analytics and Business Intelligence</li>
          <li>Supply Chain Optimization</li>
          <li>Mobile Retail Applications</li>
          <li>Retail Process Automation</li>
        </ul>
      </div>
      
      <Suspense fallback={<PageLoading />}>
        <ClientRetailPage />
      </Suspense>
    </>
  )
} 