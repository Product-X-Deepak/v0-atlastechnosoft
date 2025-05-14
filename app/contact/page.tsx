import type { Metadata } from "next"
import { ContactHero } from '@/components/features/contact/contact-hero'
import { ContactForm } from '@/components/features/contact/contact-form'
import { ContactInfo } from '@/components/features/contact/contact-info'
import { FaqSection } from "@/components/sections/faq-section"
import { StructuredData } from "@/components/seo/structured-data"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateFaqSchema } from "@/lib/seo"
import { CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { PageSEO } from "@/components/seo/page-seo"
import Link from "next/link"

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "Contact Atlas Technosoft",
  "SAP Business One Support",
  "ERP Consulting Services",
  "IT Solutions Mumbai",
  "Business Automation Support",
];

const SECONDARY_KEYWORDS = [
  "Digital Transformation Services",
  "Enterprise Solutions Support",
  "SAP Implementation Help",
  "Business Process Automation",
  "Technology Consulting",
  "Get in Touch",
  "Request a Demo",
  "Schedule Consultation",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/contact-hero.jpg",
  "/images/patterns/dots.svg",
];

// Image priority configuration
const IMAGE_PRIORITIES: Record<string, "high" | "medium" | "low"> = {
  "/images/contact-hero.jpg": "high",
  "/images/patterns/dots.svg": "medium",
};

// FAQ data for structured data
const CONTACT_FAQS = [
  {
    question: "How can I reach Atlas Technosoft customer support?",
    answer: "You can reach our customer support team through multiple channels: fill out the contact form on this page, email us at support@atlastechnosoft.com, or call our helpdesk at +91-22-28988230 during business hours (9 AM - 6 PM IST, Monday to Friday)."
  },
  {
    question: "What information should I provide when requesting a consultation?",
    answer: "When requesting a consultation, please provide your contact details, company information, the specific solutions or services you're interested in, and a brief description of your business needs or challenges. This helps us connect you with the right specialist for your requirements."
  },
  {
    question: "How quickly can I expect a response after submitting my inquiry?",
    answer: "We typically respond to all inquiries within one business day. For urgent matters, please indicate the urgency in your message or call our support line directly for immediate assistance."
  },
  {
    question: "Can I schedule a product demonstration before making a decision?",
    answer: "Yes, we offer comprehensive product demonstrations for all our solutions. You can request a demo through our contact form, and our team will schedule a personalized demonstration tailored to your specific business requirements."
  },
  {
    question: "Does Atlas Technosoft offer on-site visits for consultation?",
    answer: "Yes, we offer on-site consultations for businesses located in regions where we have a physical presence. For other locations, we provide virtual consultations via video conferencing to ensure we can address your needs regardless of your location."
  }
];

export const metadata: Metadata = {
  title: "Contact Atlas Technosoft | SAP & ERP Solutions Support",
  description:
    "Get in touch with Atlas Technosoft for SAP Business One solutions, ERP consulting, and digital transformation services. Our specialists are ready to help with your business needs.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "Contact Atlas Technosoft | SAP & ERP Solutions Support",
    description: "Get in touch with Atlas Technosoft for SAP Business One solutions, ERP consulting, and digital transformation services. Our specialists are ready to help with your business needs.",
    type: "website",
    url: "https://www.atlastechnosoft.com/contact",
    images: [
      {
        url: "/images/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Atlas Technosoft - SAP & ERP Solutions Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Atlas Technosoft | SAP & ERP Solutions Support",
    description: "Get in touch with our team for SAP solutions, ERP consulting, and digital transformation services.",
    images: ["/images/contact-hero.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/contact",
  },
}

export default function ContactPage() {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]
  
  return (
    <div className="flex flex-col" itemScope itemType="https://schema.org/ContactPage">
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={CRITICAL_IMAGES}
        priorityLevels={IMAGE_PRIORITIES}
        disableOnSlowConnection={true}
      />

      {/* Enhanced SEO with structured data */}
      <PageSEO 
        title="Contact Atlas Technosoft"
        description="Get in touch with Atlas Technosoft for SAP Business One solutions, ERP consulting, and digital transformation services. Our specialists are ready to help with your business needs."
        canonicalUrl="/contact"
        type="ContactPage"
        image="/images/contact-hero.jpg"
        breadcrumbs={breadcrumbData}
      />
      
      {/* Additional structured data */}
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      <StructuredData data={generateLocalBusinessSchema()} />
      <StructuredData data={generateFaqSchema(CONTACT_FAQS)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1>Contact Atlas Technosoft - SAP & ERP Solutions Support</h1>
        <p>
          Get in touch with Atlas Technosoft's team of specialists for SAP Business One solutions, 
          ERP consulting, and digital transformation services. We're here to help with your 
          business needs and provide the support you require for your technology initiatives.
        </p>
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
              <Link itemProp="item" href="/contact">
                <span itemProp="name">Contact</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </header>
      
      <main>
        <ContactHero />
        
        <section className="relative py-16 md:py-24 bg-[#1E1E38] overflow-hidden" id="contact-section">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E1E38] via-[#1E1E38] to-[#A73370]/30 opacity-90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E84A0E]/10 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#A73370]/10 -ml-24 -mb-24"></div>
          
          <div className="container relative z-10 px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get in <span className="text-[#E84A0E]">Touch</span> With Our Team
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Have questions about our solutions or services? We&apos;re here to help you transform your business.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <ContactForm />
              </div>
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        <section id="faq-section">
          <FaqSection />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 dark:bg-slate-900" style={{ marginBottom: "-10px", zIndex: 5 }}></div>
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Atlas Technosoft Contact Information</h2>
        <p>
          Our headquarters is located in Mumbai, India, with regional offices 
          throughout North America, Europe, and Asia. You can reach us through our 
          contact form, by phone at +91-22-28988230, or by email at 
          info@atlastechnosoft.com. Our support team is available Monday through 
          Friday, 9:00 AM to 6:00 PM IST.
        </p>
        
        <h2>Our Services</h2>
        <ul>
          <li>SAP Business One Implementation and Support</li>
          <li>ERP Consulting and Solutions</li>
          <li>Business Process Automation</li>
          <li>Digital Transformation Services</li>
          <li>Cloud Migration and Computing</li>
          <li>IT Infrastructure Services</li>
          <li>Custom Software Development</li>
        </ul>
        
        <h2>Contact Methods</h2>
        <dl>
          <dt>Phone:</dt>
          <dd>+91-22-28988230</dd>
          <dt>Email:</dt>
          <dd>info@atlastechnosoft.com</dd>
          <dt>Support:</dt>
          <dd>support@atlastechnosoft.com</dd>
          <dt>Sales:</dt>
          <dd>sales@atlastechnosoft.com</dd>
          <dt>Address:</dt>
          <dd>Office #302, Sunrise Business Park, Siddharth Nagar, Thane, Mumbai, India 400604</dd>
        </dl>
      </div>
    </div>
  )
}
