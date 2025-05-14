import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ComingSoonForm } from "./components/coming-soon-form"
import { StructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { WebsiteStructuredData as _WebsiteStructuredData, OrganizationStructuredData as _OrganizationStructuredData } from "@/components/seo/structured-data"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "SAP Business One Blog",
  "ERP Implementation Blog",
  "Business Automation Blog",
  "Digital Transformation Blog",
  "Enterprise Software Solutions",
];

const SECONDARY_KEYWORDS = [
  "SAP Solutions",
  "SAP HANA",
  "Cloud ERP",
  "Workflow Automation",
  "Business Process Optimization",
  "Industry 4.0",
  "RPA Implementation",
  "UiPath Automation",
  "Boyum IT Solutions",
  "Supply Chain Optimization",
  "Inventory Management",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/blog-coming-soon.jpg",
  "/images/patterns/dots.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/blog-coming-soon.jpg": "high",
  "/images/patterns/dots.svg": "medium",
};

export const metadata: Metadata = {
  title: "Atlas Technosoft Blog | SAP & Automation Insights",
  description: "Discover expert insights on SAP solutions, business automation, and digital transformation from Atlas Technosoft's team of specialists. Subscribe to be notified when we launch.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Atlas Technosoft Blog | SAP & Automation Insights",
    description: "Discover expert insights on SAP solutions, business automation, and digital transformation from Atlas Technosoft's team of specialists.",
    url: "https://www.atlastechnosoft.com/blog",
    siteName: "Atlas Technosoft",
    images: [
      {
        url: "/images/blog-coming-soon.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Technosoft Blog - Expert Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Technosoft Blog | SAP & Automation Insights",
    description: "Discover expert insights on SAP solutions, business automation, and digital transformation from our team of specialists.",
    images: ["/images/blog-coming-soon.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/blog",
  },
}

export default function BlogPage() {
  // Generate blog collection schema
  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Atlas Technosoft Blog",
    "description": "Expert insights on SAP solutions, business automation, and digital transformation from Atlas Technosoft's team of specialists.",
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "url": "https://www.atlastechnosoft.com"
    },
    "url": "https://www.atlastechnosoft.com/blog",
    "about": [
      { "@type": "Thing", "name": "SAP Business One" },
      { "@type": "Thing", "name": "ERP Solutions" },
      { "@type": "Thing", "name": "Business Automation" },
      { "@type": "Thing", "name": "Digital Transformation" },
      { "@type": "Thing", "name": "Enterprise Software" }
    ]
  }

  return (
    <>
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />
      
      {/* Enhanced SEO with structured data */}
      <StructuredData data={blogCollectionSchema} />
      
      {/* Visually hidden content for SEO */}
      <div className="visually-hidden">
        <h1>Atlas Technosoft Blog - Expert Insights on SAP & Business Automation</h1>
        <p>
          Welcome to the Atlas Technosoft blog, your source for expert insights, best practices, 
          and the latest trends in SAP Business One, ERP solutions, automation technologies, 
          and digital transformation. Our team of specialists share their knowledge to help 
          you optimize your business processes, implement effective software solutions, 
          and achieve your business goals.
        </p>
        
        <h2>Blog Categories</h2>
        <ul>
          <li>SAP Business One Implementation</li>
          <li>ERP Solutions & Best Practices</li>
          <li>Business Process Automation</li>
          <li>Digital Transformation Strategies</li>
          <li>Industry-Specific Solutions</li>
          <li>Cloud Computing & Migration</li>
          <li>Business Intelligence & Analytics</li>
        </ul>
      </div>
      
      {/* Coming Soon Content */}
      <div className="relative isolate overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/20 z-0" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 z-0" />
        
        {/* Gradient circles */}
        <div className="absolute -top-20 -left-20 h-[30rem] w-[30rem] rounded-full bg-premium-orange/20 blur-3xl opacity-30 animate-pulse-slow z-0" />
        <div className="absolute top-1/3 right-10 h-[25rem] w-[25rem] rounded-full bg-vibrant-purple/20 blur-3xl opacity-20 animate-pulse-slower z-0" />
        
        {/* Main Content */}
        <div className="container relative flex flex-col items-center justify-center min-h-[70vh] py-20 z-10">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
            
            {/* Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight bg-gradient-to-br from-white to-muted-foreground/70 bg-clip-text text-transparent">
              Our Blog is Coming Soon
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              We're working on creating valuable content about SAP solutions, business automation, and digital transformation. Subscribe to be notified when we launch.
            </p>
            
            {/* Coming Soon Form */}
            <div className="w-full max-w-md mb-12">
              <ComingSoonForm />
            </div>
            
            {/* Return to Home */}
            <div className="mt-4">
              <Link href="/">
                <Button variant="link" className="text-muted-foreground hover:text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 