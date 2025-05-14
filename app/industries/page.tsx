import { Metadata } from "next"
import { Suspense } from "react"
import IndustriesClientPage from "./industries-client"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/seo"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Industry Solutions",
  "Industry-Specific ERP",
  "Sector-Focused Solutions",
  "Vertical Market Software",
  "Specialized Business Solutions",
];

const SECONDARY_KEYWORDS = [
  "Manufacturing ERP",
  "Distribution Solutions",
  "Healthcare Technology",
  "Retail Management Systems",
  "Financial Services Solutions",
  "Construction Management",
  "Pharmaceutical Compliance",
  "Professional Services Automation",
  "Supply Chain Solutions",
  "Shipping & Logistics Software",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/industries/industries-hero.jpg",
  "/images/industries/manufacturing-thumb.jpg",
  "/images/industries/distribution-thumb.jpg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/industries/industries-hero.jpg": "high",
  "/images/industries/manufacturing-thumb.jpg": "medium",
  "/images/industries/distribution-thumb.jpg": "medium",
};

// Industry data for structured data and semantic content
const INDUSTRY_DATA = [
  {
    name: "Manufacturing",
    url: "/industries/manufacturing",
    description: "ERP and automation solutions for manufacturing operations, production planning, and quality control."
  },
  {
    name: "Distribution",
    url: "/industries/distribution",
    description: "Inventory management, logistics optimization, and warehouse automation solutions."
  },
  {
    name: "Retail",
    url: "/industries/retail",
    description: "Point-of-sale, inventory forecasting, and customer engagement systems."
  },
  {
    name: "Healthcare",
    url: "/industries/healthcare",
    description: "Patient management, compliance, and healthcare administration solutions."
  },
  {
    name: "Professional Services",
    url: "/industries/professional-services",
    description: "Project management, resource scheduling, and billing automation for service firms."
  },
  {
    name: "Financial Services",
    url: "/industries/financial-services",
    description: "Regulatory compliance, risk management, and financial reporting solutions."
  },
  {
    name: "Construction",
    url: "/industries/construction",
    description: "Project planning, cost control, and field service management tools."
  },
  {
    name: "Shipping",
    url: "/industries/shipping",
    description: "Fleet management, route optimization, and logistics coordination solutions."
  },
  {
    name: "Pharmaceuticals",
    url: "/industries/pharmaceuticals",
    description: "Compliance tracking, quality assurance, and supply chain validation systems."
  }
];

// Loading fallback
const PageLoading = () => <div className="min-h-screen w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>

export const metadata: Metadata = {
  title: "Industry-Specific Solutions | SAP & Automation Systems by Sector",
  description: "Discover specialized SAP Business One and automation solutions tailored to your industry's unique challenges. Industry-specific systems for manufacturing, distribution, healthcare, and more.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Industry-Specific Solutions | SAP & Automation Systems by Sector",
    description: "Discover specialized business technology solutions tailored to your industry's unique challenges. Implementation expertise across manufacturing, distribution, healthcare, retail, and more.",
    type: "website",
    url: "https://www.atlastechnosoft.com/industries",
    images: [
      {
        url: "/images/industries/industries-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Industry-Specific Business Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific Solutions | Business Technology by Sector",
    description: "Discover specialized business solutions tailored to your industry. Implementation expertise across manufacturing, distribution, healthcare, and more.",
    images: ["/images/industries/industries-hero.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/industries",
  },
}

// Main page component with Suspense boundary
export default function IndustriesPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ]
  
  // Create collection page schema
  const collectionPageSchema = generateCollectionPageSchema(
    "Industry Solutions",
    "Specialized business technology solutions tailored to unique industry challenges and requirements.",
    "/industries",
    "/images/industries/industries-hero.jpg",
    INDUSTRY_DATA.map(industry => ({
      name: industry.name, 
      url: industry.url, 
      description: industry.description
    }))
  )
  
  return (
    <>
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />
      
      {/* Enhanced SEO with structured data */}
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      <StructuredData data={collectionPageSchema} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <div className="visually-hidden">
        <h1>Industry-Specific Business Technology Solutions</h1>
        <p>
          Atlas Technosoft delivers specialized SAP Business One and automation solutions 
          tailored to each industry's unique challenges and requirements. Our industry expertise 
          spans manufacturing, distribution, retail, healthcare, financial services, construction, 
          professional services, shipping, and pharmaceuticals, with implementation methodologies 
          optimized for sector-specific compliance, processes, and growth objectives.
        </p>
        
        <nav aria-label="Industries Directory">
          <ul>
            {INDUSTRY_DATA.map((industry, index) => (
              <li key={index}>
                <a href={industry.url}>
                  <h2>{industry.name}</h2>
                  <p>{industry.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <Suspense fallback={<PageLoading />}>
        <IndustriesClientPage />
      </Suspense>
    </>
  )
} 