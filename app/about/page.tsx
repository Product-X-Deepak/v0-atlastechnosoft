import type { Metadata } from "next"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"
import { PageSEO } from "@/components/seo/page-seo"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { 
  AboutHero, 
  MissionVision,
  CoreValues,
  Journey,
  AboutCta
} from "@/components/about"
import Link from "next/link"

// Add these static configurations at the top of the file
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Enterprise Transformation",
  "Digital Innovation",
  "SAP Partner",
  "Business Technology",
  "Digital Solutions",
];

const SECONDARY_KEYWORDS = [
  "ERP Implementation",
  "Business Automation",
  "Technology Partner",
  "Industry 4.0",
  "Future of Enterprise",
  "Atlas Technosoft",
  "Company History",
  "IT Consulting",
  "Enterprise Solutions",
  "Digital Transformation Partner"
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/about-hero.jpg",
  "/images/about-team.jpg",
  "/images/partners/sap-partner.svg",
  "/images/patterns/dots.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/about-hero.jpg": "high",
  "/images/partners/sap-partner.svg": "high",
};

// FAQ data for structured data
const ABOUT_FAQS = [
  {
    question: "What is Atlas Technosoft?",
    answer: "Atlas Technosoft is a global technology company established in 1997, specializing in enterprise transformation, SAP solutions, and digital innovation. With over 300 global clients across 25+ countries, we help businesses optimize operations, accelerate growth, and create sustainable competitive advantages through innovative technology solutions."
  },
  {
    question: "What services does Atlas Technosoft offer?",
    answer: "We offer a comprehensive range of services including SAP implementations and support, ERP planning and optimization, digital transformation consulting, robotic process automation (RPA), business intelligence solutions, cloud migration services, and custom software development to meet specific business needs across various industries."
  },
  {
    question: "What industries does Atlas Technosoft serve?",
    answer: "Atlas Technosoft serves a diverse range of industries including manufacturing, distribution, retail, healthcare, financial services, professional services, pharmaceuticals, construction, and more. Our industry-specific expertise allows us to provide tailored solutions that address unique business challenges in each sector."
  },
  {
    question: "How does Atlas Technosoft approach digital transformation projects?",
    answer: "We approach digital transformation through a structured methodology that includes discovery and assessment, strategic planning, solution design, implementation, change management, and continuous optimization. We prioritize understanding each client's unique business needs, industry challenges, and growth objectives to deliver solutions that drive measurable business outcomes."
  },
  {
    question: "What makes Atlas Technosoft different from other technology consultants?",
    answer: "Our differentiators include 28 years of industry expertise, SAP Partner status, a proven track record of 750+ successful implementations, a client-centric approach focused on business outcomes rather than technology alone, end-to-end service capabilities from strategy through implementation and support, and a commitment to innovation that keeps clients ahead of industry trends."
  }
];

// About page specific organization schema
const aboutOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Atlas Technosoft",
  "alternateName": "Atlas Technology Solutions",
  "url": "https://www.atlastechnosoft.com",
  "logo": "https://www.atlastechnosoft.com/images/logo.png",
  "foundingDate": "1997",
  "founders": [
    {
      "@type": "Person",
      "name": "Rohit Sharma"
    },
    {
      "@type": "Person",
      "name": "Ankit Patel"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office #302, Sunrise Business Park, Siddharth Nagar",
    "addressLocality": "Thane",
    "addressRegion": "Mumbai",
    "postalCode": "400604",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-22-28988230",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/atlastechnosoft",
    "https://www.linkedin.com/company/atlas-technosoft",
    "https://twitter.com/atlastechnosoft"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "200+"
  },
  "award": [
    "SAP Partner",
    "ISO 9001:2015 Certified",
    "Microsoft Silver Partner"
  ],
  "hasCredential": [
    "SAP Certified Solution Provider",
    "UiPath Certified Partner"
  ],
  "slogan": "Transforming Enterprises, Empowering Growth"
};

export const metadata: Metadata = {
  title: "About Atlas Technosoft | Pioneering Enterprise Transformation Since 1997",
  description:
    "Discover Atlas Technosoft's 28-year journey of innovation since 1997. As a leading SAP Partner with 750+ successful implementations across 25+ countries, we transform businesses through cutting-edge ERP and digital solutions.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "About Atlas Technosoft | Pioneering Enterprise Transformation Since 1997",
    description: "Discover Atlas Technosoft's 28-year journey of innovation. With 750+ successful implementations across 25+ countries, we transform businesses through cutting-edge enterprise solutions.",
    type: "website",
    url: "https://www.atlastechnosoft.com/about",
    images: [
      {
        url: "/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Technosoft - Pioneering Enterprise Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Atlas Technosoft | Pioneering Enterprise Transformation",
    description: "Discover our 28-year journey of innovation with 750+ successful implementations across 25+ countries.",
    images: ["/images/about-hero.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/about",
  },
}

export default function AboutPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]
  
  return (
    <div className="flex flex-col" itemScope itemType="https://schema.org/AboutPage">
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />

      {/* Enhanced SEO with structured data */}
      <PageSEO 
        title="About Atlas Technosoft"
        description="Discover Atlas Technosoft's 28-year journey of innovation since 1997. As a leading SAP Partner with 750+ successful implementations across 25+ countries, we transform businesses through cutting-edge enterprise solutions."
        canonicalUrl="/about"
        image="/images/about-hero.jpg"
        type="AboutPage"
        breadcrumbs={breadcrumbData}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "About Atlas Technosoft",
        "Discover Atlas Technosoft's journey of innovation since 1997. As a leading SAP Partner, we transform businesses through cutting-edge ERP and digital solutions for tomorrow's enterprise.",
        "/about",
        "/images/about-hero.jpg"
      )} />
      <StructuredData data={aboutOrganizationSchema} />
      <StructuredData data={generateFaqSchema(ABOUT_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">About Atlas Technosoft: Pioneering Enterprise Transformation Since 1997</h1>
        <div itemProp="description">
          Atlas Technosoft is your strategic partner in navigating digital transformation.
          Since 1997, we've empowered businesses worldwide with innovative technology solutions.
          With 750+ successful implementations across 25+ countries, our team of experts
          delivers cutting-edge enterprise solutions for tomorrow's business challenges.
        </div>
        <div itemProp="foundingDate" content="1997"></div>
        <div itemProp="numberOfEmployees" content="200+"></div>
        
        <nav aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li 
              itemScope 
              itemType="https://schema.org/ListItem" 
              itemProp="itemListElement"
            >
              <Link itemProp="item" href="/about">
                <span itemProp="name">About</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </header>
      
      {/* Main content sections */}
      <main>
        <AboutHero />
        
        <section id="mission-vision" aria-labelledby="mission-vision-heading">
          <MissionVision />
        </section>
        
        <section id="core-values" aria-labelledby="core-values-heading">
          <CoreValues />
        </section>
        
        <section id="journey" aria-labelledby="journey-heading">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <Journey />
          </Suspense>
        </section>
        
        <section id="cta" aria-labelledby="cta-heading">
          <AboutCta />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Atlas Technosoft Company Profile</h2>
        <p>
          Founded in 1997, Atlas Technosoft has grown from a small team of 10 technology enthusiasts 
          to a global enterprise solutions provider with offices across North America, Europe, and Asia. 
          Our journey began with a vision to transform enterprise software, and today, we stand as a 
          leading SAP Partner with over 750 successful implementations across 25+ countries.
        </p>
        
        <h2>Our Expertise and Services</h2>
        <ul>
          <li>SAP Implementation and Support (500+ SAP implementations)</li>
          <li>Digital Transformation Consulting (100+ transformation projects)</li>
          <li>Cloud Migration and Services (200+ cloud migrations)</li>
          <li>Business Intelligence and Analytics</li>
          <li>Enterprise Resource Planning (ERP)</li>
          <li>Robotic Process Automation (RPA)</li>
          <li>AI-Powered Business Solutions</li>
          <li>Custom Software Development</li>
        </ul>
        
        <h2>Our Global Presence</h2>
        <p>
          With headquarters in Mumbai, India, and regional offices throughout North America, Europe, 
          and Asia, Atlas Technosoft serves a diverse portfolio of 300+ global clients across industries 
          including manufacturing, retail, healthcare, financial services, professional services, and more. 
          Our team of 200+ technology experts, consultants, and industry specialists work collaboratively 
          to deliver innovative solutions that address complex business challenges.
        </p>
        
        <h2>Our Approach to Innovation</h2>
        <p>
          At Atlas Technosoft, innovation is at the core of everything we do. We consistently invest in 
          research and development to stay ahead of industry trends and emerging technologies. Our 
          innovation lab explores cutting-edge solutions in artificial intelligence, machine learning, 
          blockchain, and IoT to help our clients gain competitive advantages in their respective industries.
        </p>
        
        <h2>Leadership and Expertise</h2>
        <p>
          Our leadership team combines decades of industry experience with deep technical expertise. 
          With over 50 certified SAP consultants, 30 RPA specialists, and 25 digital transformation 
          experts, we bring unparalleled knowledge and insights to every client engagement. Our 
          consultants hold advanced certifications across multiple technologies and methodologies.
        </p>
        
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="streetAddress" content="Office #302, Sunrise Business Park, Siddharth Nagar" />
          <meta itemProp="addressLocality" content="Thane" />
          <meta itemProp="addressRegion" content="Mumbai" />
          <meta itemProp="postalCode" content="400604" />
          <meta itemProp="addressCountry" content="India" />
        </div>
      </div>
    </div>
  )
}
