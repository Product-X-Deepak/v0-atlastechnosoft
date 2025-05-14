import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { StructuredData, WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { PageSEO } from "@/components/seo/page-seo"
import { generateServiceSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo"
import { HeroSection } from "@/components/sections/hero-section"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"

// Static import for the most critical section (Hero) for fast LCP
// Dynamic import everything else with Suspense boundaries
const PartnerLogos = dynamic(() => import("@/components/sections/partner-logos").then(mod => ({ default: mod.PartnerLogos })), { ssr: true })

// Dynamically import below-the-fold sections to improve page load
const ValueChainSection = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.ValueChainSection })), { ssr: true })
const SolutionsShowcase = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.SolutionsShowcase })), { ssr: true })
const IntegrationSection = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.IntegrationSection })), { ssr: true })
const TechnologyAdvantages = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.TechnologyAdvantages })), { ssr: true })
const BoyumSolutions = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.BoyumSolutions })), { ssr: true })
const UiPathSection = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.UiPathSection })), { ssr: true })
const IndustriesFocus = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.IndustriesFocus })), { ssr: true })
const CallToAction = dynamic(() => import("@/components/sections/home").then(mod => ({ default: mod.CallToAction })), { ssr: true })

// Simple loading fallbacks for each section
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

// List of critical images to preload with priority hints
const CRITICAL_IMAGES = [
  // Hero images
  '/images/Main_Logo.png',
  // Partner logos (important for credibility)
  '/images/partners/sap-partner.svg',
  '/images/partners/microsoft.svg',
  // Add other critical images for above-the-fold content
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, 'high' | 'medium' | 'low'> = {
  '/images/Main_Logo.png': 'high',
  '/images/partners/sap-partner.svg': 'high',
};

// Primary and secondary keywords for the homepage (important for semantic SEO)
const PRIMARY_KEYWORDS = [
  "SAP Partner",
    "SAP Business One",
  "ERP Solutions",
  "Digital Transformation",
  "Enterprise Solutions",
  "Boyum IT Solutions",
  "B1 Usability Package",
  "Beas Manufacturing",
  "UiPath Automation",
];

const SECONDARY_KEYWORDS = [
    "SAP HANA",
    "Automation Solutions",
    "RPA Solutions",
    "UiPath",
    "Workflow Automation",
    "Business Process Automation",
  "Cloud ERP",
  "Business Intelligence",
  "IT Consulting Services",
  "SAP Implementation",
  "Manufacturing Extension for SAP",
  "B1UP",
];

export const metadata: Metadata = {
  title: "Atlas Technosoft | Leading SAP Partner & Enterprise Solutions Provider",
  description:
    "Atlas Technosoft delivers comprehensive SAP Business One, HANA solutions, RPA automation, Boyum IT solutions & UiPath automation. Trusted SAP Partner since 1997 with 500+ successful implementations.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS],
  openGraph: {
    title: "Atlas Technosoft | Leading SAP Partner & Enterprise Solutions Provider",
    description: "Streamline operations with our SAP Business One, HANA, Boyum IT, and UiPath automation solutions. 25+ years experience, 500+ successful implementations, and exceptional support.",
    url: "https://www.atlastechnosoft.com",
    siteName: "Atlas Technosoft",
    images: [
      {
        url: "https://www.atlastechnosoft.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Technosoft - Enterprise Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Technosoft | Leading SAP Partner & Enterprise Solutions Provider",
    description: "Streamline operations with our SAP Business One, HANA, and automation solutions. 25+ years experience, 500+ successful implementations, and exceptional support.",
    images: ["https://www.atlastechnosoft.com/images/og-image.jpg"],
    creator: "@atlastechnosoft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "verification_token",
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com",
    languages: {
      "en-US": "https://www.atlastechnosoft.com",
    },
  },
}

export default function Home() {
  // Precompute schema data to avoid re-computation on render
  const serviceSchema = generateServiceSchema(
    "Enterprise SAP Solutions",
    "Leading SAP Partner providing comprehensive ERP, automation, and digital transformation solutions to streamline operations and drive business growth",
    "/",
    "/images/og-image.jpg"
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);
  
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <main className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/WebPage">
      {/* Performance optimization with preloaded images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        disableOnSlowConnection={true}
        priorityLevels={IMAGE_PRIORITIES}
        useResourceHints={true}
      />

      {/* Enhanced on-page SEO with keywords */}
      <PageSEO 
        title="Leading SAP Partner & Enterprise Solutions Provider"
        description="Atlas Technosoft delivers comprehensive SAP Business One, HANA solutions, RPA automation & digital transformation. Trusted SAP Partner since 1997 with 500+ successful implementations."
        canonicalUrl="/"
        type="WebPage"
        keywords={[...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS]}
      />

      {/* Enhanced Structured data for SEO */}
      <StructuredData data={serviceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={localBusinessSchema} />
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML5 structure for better crawlability */}
      <section className="homepage-hero" aria-labelledby="homepage-title">
        <div className="visually-hidden">
          <h1 id="homepage-title">Atlas Technosoft - Leading SAP Partner & Enterprise Solutions Provider</h1>
          <p>
            Atlas Technosoft delivers comprehensive SAP Business One, HANA solutions, 
            RPA automation & digital transformation. Trusted SAP Partner since 1997 
            with 500+ successful implementations.
          </p>
        </div>
      
      {/* Critical first render - no Suspense needed */}
      <HeroSection />
      </section>
      
      {/* Partner logos - visible above the fold but not critical for initial paint */}
      <Suspense fallback={<SectionLoading />}>
        <PartnerLogos />
      </Suspense>
      
      {/* Below the fold sections with Suspense boundaries for better loading */}
      <Suspense fallback={<SectionLoading />}>
        <ValueChainSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <SolutionsShowcase />
      </Suspense>
      
      {/* New Boyum IT Solutions section */}
      <Suspense fallback={<SectionLoading />}>
        <BoyumSolutions />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <IntegrationSection />
      </Suspense>
      
      {/* New UiPath Section */}
      <Suspense fallback={<SectionLoading />}>
        <UiPathSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <TechnologyAdvantages />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <IndustriesFocus />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <CallToAction />
      </Suspense>
      
      {/* Hidden semantic content for SEO that doesn't affect design */}
      <div className="visually-hidden">
        <h2>Why Choose Atlas Technosoft?</h2>
        <ul>
          <li>25+ years of industry experience as a trusted SAP Partner</li>
          <li>500+ successful SAP Business One and HANA implementations</li>
          <li>Comprehensive ERP and automation solutions for streamlined operations</li>
          <li>Industry-specific expertise across manufacturing, distribution, retail, and more</li>
          <li>Complete digital transformation services from consulting to implementation</li>
          <li>Official Boyum Silver Partner for B1 Usability Package and Beas Manufacturing</li>
          <li>UiPath certified partner for advanced RPA implementations</li>
        </ul>
      </div>
    </main>
  )
}
