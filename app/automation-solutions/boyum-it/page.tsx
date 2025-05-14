import type { Metadata } from "next"
import { Suspense } from "react"
import { 
  BoyumItHero,
  BoyumItValueChain,
  BoyumItSolutions,
  BoyumItIndustries,
  BoyumItIntegration,
  BoyumItMobileCloud,
  BoyumItCta,
  BeasManufacturingSection,
  B1UsabilitySection
} from "@/components/automation/boyum"
import { ProductSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"

// Add these static configurations at the top of the file
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Boyum IT",
  "Product Value Chain",
  "SAP Business One Solutions",
  "Manufacturing Solutions",
  "Product Information Management",
  "B1 Usability Package",
  "Beas Manufacturing"
];

const SECONDARY_KEYWORDS = [
  "PIM System",
  "Wholesale Solutions",
  "SME Solutions",
  "Beas Manufacturing",
  "Produmex WMS",
  "B1 Usability Package",
  "Warehouse Management System",
  "ERP Add-ons",
  "Cloud Solutions",
  "Mobile Business Solutions",
  "SAP Business One Customization",
  "Manufacturing ERP",
  "Production Planning",
  "Shop Floor Control"
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/solutions/boyum-it.jpg",
  "/images/solutions/B5_A.jpg",
  "/images/partners/boyum-partner.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/solutions/boyum-it.jpg": "high",
  "/images/partners/boyum-partner.svg": "high",
};

// FAQ data for structured data
const BOYUM_FAQS = [
  {
    question: "What is Boyum IT Solutions?",
    answer: "Boyum IT Solutions is a leading global provider of software solutions that enhance the functionality of SAP Business One. Their product suite includes solutions for manufacturing, warehouse management, product information management, and business process optimization, specifically designed to help small and medium-sized enterprises (SMEs) connect their entire product value chain from innovation to launch."
  },
  {
    question: "What is Beas Manufacturing?",
    answer: "Beas Manufacturing is a comprehensive manufacturing solution that integrates with SAP Business One to optimize production processes and enhance operational efficiency. It provides functionality for production planning and scheduling, resource management, quality control, and cost tracking and analysis, enabling manufacturers to streamline operations and improve overall productivity."
  },
  {
    question: "What is Produmex WMS?",
    answer: "Produmex WMS is a Warehouse Management System that streamlines logistics operations and improves inventory accuracy for businesses using SAP Business One. It provides advanced capabilities for inventory management, order fulfillment, barcode and RFID scanning, and sophisticated picking strategies, helping companies achieve greater efficiency and accuracy in their warehouse operations."
  },
  {
    question: "What is the B1 Usability Package?",
    answer: "B1 Usability Package (B1UP) is an award-winning solution that enhances SAP Business One with additional functionality and improved user experience. It enables businesses to customize interfaces, automate workflows, implement data validation rules, and create interactive dashboards without coding, resulting in increased efficiency and data quality."
  },
  {
    question: "How does Perfion PIM improve product management?",
    answer: "Perfion PIM (Product Information Management) enables businesses to efficiently manage and distribute product data across all channels. It centralizes product information in a single repository, automates data enrichment processes, integrates seamlessly with e-commerce platforms, and ensures consistent product information across all sales and marketing channels, reducing errors and accelerating time-to-market."
  },
  {
    question: "What mobile solutions does Boyum IT offer?",
    answer: "Boyum IT offers several mobile solutions, with Produmex Scan being the most notable. This mobile scanning solution enhances warehouse operations with real-time data capture and processing, allowing employees to capture inventory data, scan barcodes, and process warehouse operations from iOS and Android devices. The solution works offline and synchronizes when connected, providing a seamless experience with a user-friendly interface optimized for mobile devices."
  }
];

export const metadata: Metadata = {
  title: "Boyum IT Solutions | Product Value Chain for SMEs | SAP Business One",
  description:
    "Connect your product value chain with Boyum IT solutions designed for SMEs. Optimize manufacturing, warehouse management, and product information with SAP Business One add-ons.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Boyum IT Solutions | Product Value Chain for SMEs | SAP Business One",
    description: "Connect your product value chain with Boyum IT solutions designed for SMEs. Boost your core processes from innovation to launch with industry-leading SAP Business One add-ons.",
    type: "website",
    url: "https://www.atlastechnosoft.com/automation-solutions/boyum-it",
    images: [
      {
        url: "/images/solutions/boyum-it.jpg",
        width: 1200,
        height: 630,
        alt: "Boyum IT Solutions Product Value Chain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boyum IT Solutions | Product Value Chain for SMEs",
    description: "Connect your product value chain with Boyum IT solutions. Optimize manufacturing, warehouse management, and product information with SAP Business One add-ons.",
    images: ["/images/solutions/boyum-it.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/automation-solutions/boyum-it",
  },
}

export default function BoyumItPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Automation Solutions", url: "/automation-solutions" },
    { name: "Boyum IT", url: "/automation-solutions/boyum-it" },
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
        title="Boyum IT Solutions for SAP Business One"
        description="Connect your product value chain with Boyum IT solutions designed for SMEs. Optimize manufacturing, warehouse management, product information with SAP Business One add-ons."
        canonicalUrl="/automation-solutions/boyum-it"
        image="/images/solutions/boyum-it.jpg"
        brand="Boyum IT"
        categoryBreadcrumbs={[
          { name: "Automation Solutions", url: "/automation-solutions" },
          { name: "Boyum IT", url: "/automation-solutions/boyum-it" }
        ]}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "Boyum IT Solutions",
        "Connect your product value chain with Boyum IT solutions designed for SMEs. Boost your core processes from innovation to launch and focus on what truly matters.",
        "/automation-solutions/boyum-it",
        "/images/solutions/boyum-it.jpg"
      )} />
      <StructuredData data={generateFaqSchema(BOYUM_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">Boyum IT Solutions for SAP Business One: Complete Product Value Chain</h1>
        <div itemProp="description">
          Connect your product value chain with Boyum IT solutions designed specifically for SMEs. 
          Boost your core business processes from innovation to launch with industry-leading 
          SAP Business One add-ons including Beas Manufacturing, Produmex WMS, Perfion PIM, 
          and mobile cloud solutions.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="Boyum IT" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <BoyumItHero />
        
        <section id="value-chain">
          <BoyumItValueChain />
        </section>
        
        <section id="solutions">
          <BoyumItSolutions />
        </section>
        
        <section id="beas-manufacturing">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <BeasManufacturingSection />
          </Suspense>
        </section>
        
        <section id="b1-usability">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <B1UsabilitySection />
          </Suspense>
        </section>
        
        <section id="industries">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <BoyumItIndustries />
          </Suspense>
        </section>
        
        <section id="integration">
          <BoyumItIntegration />
        </section>
        
        <section id="mobile-cloud">
          <BoyumItMobileCloud />
        </section>
        
        <section id="cta">
          <BoyumItCta />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose Boyum IT Solutions?</h2>
        <ul>
          <li>30% more efficient operations with integrated value chain solutions</li>
          <li>Centralized product data management through Perfion PIM</li>
          <li>Optimized manufacturing processes with Beas Manufacturing</li>
          <li>Streamlined logistics operations using Produmex WMS</li>
          <li>Mobile data capture for warehouse management with Produmex Scan</li>
          <li>Seamless integration with SAP Business One and other business systems</li>
          <li>Implementation by certified Boyum IT Silver Partner with proven expertise</li>
        </ul>
        
        <h2>Boyum IT Technical Capabilities</h2>
        <p>
          Boyum IT solutions provide comprehensive functionality that enhances SAP Business One. 
          Beas Manufacturing delivers production planning and scheduling, resource management, 
          quality control, and cost tracking. Produmex WMS enables inventory management, order 
          fulfillment, barcode scanning, and advanced picking strategies. Perfion PIM centralizes 
          product data management, automates data enrichment, and distributes consistent product 
          information across channels. Mobile solutions allow real-time data capture, cloud-based 
          access, and seamless synchronization with core ERP systems.
        </p>
        
        <h2>B1 Usability Package (B1UP) Features</h2>
        <p>
          B1UP transforms how businesses use SAP Business One with powerful customization and automation capabilities.
          Key features include data quality management with validation rules and templates, enhanced user experience
          with customizable interfaces and contextual help, workflow optimization through business rules and automated
          tasks, and better decision-making with interactive dashboards and reporting tools. Organizations using B1UP
          report up to 40% reduction in data entry time and 60% fewer data errors.
        </p>
        
        <h2>Beas Manufacturing Capabilities</h2>
        <p>
          Beas Manufacturing is an advanced extension for SAP Business One tailored for discrete and process manufacturing
          companies. It provides comprehensive production planning with visual scheduling, real-time shop floor control with
          QR-code based processes, multi-stage quality control with full traceability, and detailed cost analysis from pre-costing
          to post-calculation. The 2025 roadmap includes AI-powered predictive manufacturing, enhanced warehouse integration,
          and performance optimizations across all core modules.
        </p>
        
        <h2>Industry Applications of Boyum IT</h2>
        <p>
          Boyum IT solutions serve multiple industries with tailored capabilities. Manufacturing 
          companies benefit from streamlined production planning, resource optimization, and 
          quality control. Wholesale and distribution businesses leverage advanced warehouse 
          management, inventory control, and order fulfillment capabilities. Retail organizations 
          utilize product information management to maintain consistent product data across 
          multiple sales channels. Service companies implement mobile and cloud solutions for 
          field service management and remote operations, creating a fully connected business 
          environment regardless of industry.
        </p>
      </div>
    </div>
  )
}
