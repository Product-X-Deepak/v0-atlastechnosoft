/**
 * Atlas Technosoft Constants
 *
 * This file contains application-wide constants and configuration values.
 */

// Company information
export const COMPANY = {
  NAME: "Atlas Technosoft",
  LEGAL_NAME: "Atlas Technosoft Pvt. Ltd.",
  FOUNDED: "1997",
  TAGLINE: "Enterprise Solutions for Digital Transformation",
  DESCRIPTION: "Leading SAP Partner providing enterprise solutions to streamline operations and drive growth",
  ADDRESS: {
    STREET: "Office #302, Sunrise Business Park, Siddharth Nagar",
    CITY: "Thane",
    REGION: "Mumbai, Maharashtra",
    POSTAL_CODE: "400604",
    COUNTRY: "India",
    COUNTRY_CODE: "IN",
  },
  CONTACT: {
    PHONE: "+91-22-28988230",
    EMAIL: "info@atlastechnosoft.com",
    SALES_EMAIL: "info@atlastechnosoft.com",
    SUPPORT_EMAIL: "info@atlastechnosoft.com",
    CAREERS_EMAIL: "info@atlastechnosoft.com",
  },
  SOCIAL: {
    TWITTER: "https://twitter.com/Atlas_SAP",
    FACEBOOK: "https://www.facebook.com/Atlascomputer/",
    LINKEDIN: "https://www.linkedin.com/company/atlas-technosoft-pvt-ltd",
    INSTAGRAM: "https://www.instagram.com/atlas_technosoft",
    YOUTUBE: "https://youtube.com/c/atlastechnosoft",
  },
  CERTIFICATIONS: [
    {
      name: "SAP Partner",
      logo: "/images/certifications/sap-gold-partner.svg",
      year: "2010",
    },
    {
      name: "ISO 9001:2015",
      logo: "/images/certifications/iso-9001.svg",
      year: "2012",
    },
    {
      name: "ISO 27001:2013",
      logo: "/images/certifications/iso-27001.svg",
      year: "2015",
    },
    {
      name: "Microsoft Gold Partner",
      logo: "/images/certifications/microsoft-gold-partner.svg",
      year: "2014",
    },
  ],
}

// Navigation structure
export const NAVIGATION = {
  MAIN: [
    {
      title: "SAP Solutions",
      href: "/sap-solutions",
      children: [
        {
          title: "SAP Business One",
          description: "Complete ERP solution for small and medium enterprises",
          href: "/sap-solutions/business-one",
          icon: "Database",
        },
        {
          title: "SAP Business One Cloud",
          description: "Cloud-based ERP solution with flexible deployment",
          href: "/sap-solutions/business-one-cloud",
          icon: "Cloud",
        },
        {
          title: "SAP HANA",
          description: "In-memory database and analytics platform",
          href: "/sap-solutions/hana",
          icon: "BarChart",
        },
        {
          title: "ERP Planning",
          description: "End-to-end SAP implementation and support",
          href: "/sap-solutions/erp-planning",
          icon: "Settings",
        },
      ],
    },
    {
      title: "Automation Solutions",
      href: "/automation-solutions",
      children: [
        {
          title: "AI Solutions",
          description: "Intelligent automation with artificial intelligence",
          href: "/automation-solutions/ai-solutions",
          icon: "Brain",
        },
        {
          title: "RPA Solutions",
          description: "Robotic process automation for business efficiency",
          href: "/automation-solutions/rpa-solutions",
          icon: "Bot",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Careers",
      href: "/careers",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  FOOTER: [
    {
      title: "Solutions",
      links: [
        { title: "SAP Business One", href: "/sap-solutions/business-one" },
        { title: "SAP HANA", href: "/sap-solutions/hana" },
        { title: "AI Solutions", href: "/automation-solutions/ai-solutions" },
        { title: "RPA Solutions", href: "/automation-solutions/rpa-solutions" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Partners", href: "/partners" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Terms of Service", href: "/terms-of-service" },
        { title: "Cookie Policy", href: "/cookie-policy" },
        { title: "GDPR Compliance", href: "/gdpr-compliance" },
      ],
    },
  ],
}

// Partner information
export const PARTNERS = {
  FEATURED: [
    {
      name: "SAP",
      logo: "/images/partners/sap-logo.svg",
      url: "https://www.sap.com",
      description: "Enterprise software solutions for business management",
    },
    {
      name: "Microsoft",
      logo: "/images/partners/microsoft-logo.svg",
      url: "https://www.microsoft.com",
      description: "Cloud computing and productivity solutions",
    },
    {
      name: "UiPath",
      logo: "/images/partners/uipath-logo.svg",
      url: "https://www.uipath.com",
      description: "Leading robotic process automation platform",
    },
    {
      name: "Boyum IT",
      logo: "/images/partners/boyum-logo.svg",
      url: "https://www.boyum-it.com",
      description: "SAP Business One add-on solutions",
    },
    {
      name: "AWS",
      logo: "/images/partners/aws-logo.svg",
      url: "https://aws.amazon.com",
      description: "Cloud computing and hosting services",
    },
    {
      name: "Google Cloud",
      logo: "/images/partners/google-cloud-logo.svg",
      url: "https://cloud.google.com",
      description: "Cloud computing and AI/ML solutions",
    },
  ],
}

// Industry sectors served
export const INDUSTRIES = [
  {
    name: "Manufacturing",
    icon: "Factory",
    description: "End-to-end solutions for manufacturing operations and supply chain management",
    href: "/industries/manufacturing",
  },
  {
    name: "Retail & Distribution",
    icon: "ShoppingBag",
    description: "Integrated systems for inventory, POS, and omnichannel retail",
    href: "/industries/retail",
  },
  {
    name: "Professional Services",
    icon: "Briefcase",
    description: "Project management and resource optimization for service firms",
    href: "/industries/professional-services",
  },
  {
    name: "Healthcare",
    icon: "Stethoscope",
    description: "Compliant solutions for healthcare providers and life sciences",
    href: "/industries/healthcare",
  },
  {
    name: "Construction",
    icon: "Building",
    description: "Project-based solutions for construction and engineering firms",
    href: "/industries/construction",
  },
  {
    name: "Wholesale Distribution",
    icon: "Truck",
    description: "Supply chain and logistics management for distributors",
    href: "/industries/wholesale-distribution",
  },
]

// Testimonials
export const TESTIMONIALS = [
  {
    quote:
      "Atlas Technosoft's implementation of SAP Business One transformed our operations. Their team's expertise and dedication ensured a smooth transition and excellent ongoing support.",
    author: "Rajesh Sharma",
    title: "CIO",
    company: "Precision Manufacturing Ltd.",
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote:
      "The RPA solutions implemented by Atlas Technosoft have reduced our processing time by 70% and virtually eliminated errors. Their consultants truly understood our business needs.",
    author: "Priya Mehta",
    title: "Operations Director",
    company: "Global Logistics Solutions",
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote:
      "Working with Atlas Technosoft on our digital transformation journey has been exceptional. Their holistic approach and technical expertise have given us a competitive edge in the market.",
    author: "Vikram Singh",
    title: "CEO",
    company: "Innovate Retail Group",
    image: "/images/testimonials/testimonial-3.jpg",
  },
]

// Stats and achievements
export const STATS = [
  {
    value: "25+",
    label: "Years of Experience",
    description: "Delivering enterprise solutions since 1997",
  },
  {
    value: "500+",
    label: "Successful Implementations",
    description: "Across diverse industries and business sizes",
  },
  {
    value: "50+",
    label: "Certified Consultants",
    description: "Experts in SAP, RPA, and digital transformation",
  },
  {
    value: "15+",
    label: "Countries Served",
    description: "Global presence with local expertise",
  },
]

// SEO defaults
export const SEO = {
  DEFAULT_TITLE: "Atlas Technosoft | SAP Partner & Enterprise Solutions Provider",
  DEFAULT_DESCRIPTION:
    "Atlas Technosoft is a leading SAP Certified Partner providing comprehensive ERP solutions, AI automation, digital transformation, and enterprise applications since 1997.",
  DEFAULT_KEYWORDS: [
    "SAP Business One",
    "SAP HANA",
    "ERP Solutions",
    "Automation Solutions",
    "RPA Solutions",
    "Workflow Automation",
    "Digital Transformation",
    "Atlas Technosoft",
    "SAP Partner",
    "Business Process Automation",
    "Enterprise Solutions",
  ],
  SITE_NAME: "Atlas Technosoft",
  CANONICAL_URL: "https://www.atlastechnosoft.com",
}

// API endpoints
export const API = {
  CONTACT_FORM: "/api/contact",
  NEWSLETTER: "/api/contact",
  CAREERS: "/api/contact",
}

// Feature flags for progressive enhancement
export const FEATURES = {
  DARK_MODE: true,
  ANIMATIONS: true,
  CHAT_WIDGET: false,
  ANALYTICS: true,
  COOKIE_CONSENT: true,
  EXIT_INTENT: true,
  COMMAND_MENU: true,
}

// Analytics and tracking
export const ANALYTICS = {
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || "",
  ENABLE_PAGEVIEW_TRACKING: true,
  ENABLE_EVENT_TRACKING: true,
  ENABLE_USER_TRACKING: false, // Disabled by default for privacy
}

// Cache control headers
export const CACHE = {
  DEFAULT_REVALIDATE: 3600, // 1 hour
  STATIC_PAGE_REVALIDATE: 86400, // 24 hours
  DYNAMIC_PAGE_REVALIDATE: 60, // 1 minute
}

// Content security policy
export const SECURITY = {
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "'unsafe-inline'",
      "'unsafe-eval'",
    ],
    STYLE_SRC: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
    IMG_SRC: ["'self'", "data:", "https://www.google-analytics.com"],
    FONT_SRC: ["'self'", "https://fonts.gstatic.com"],
    CONNECT_SRC: ["'self'", "https://www.google-analytics.com"],
    FRAME_SRC: ["'self'"],
  },
  PERMISSIONS_POLICY: "camera=(), microphone=(), geolocation=()",
  REFERRER_POLICY: "strict-origin-when-cross-origin",
  X_CONTENT_TYPE_OPTIONS: "nosniff",
  X_FRAME_OPTIONS: "SAMEORIGIN",
}

const CONSTANTS = {
  COMPANY,
  NAVIGATION,
  PARTNERS,
  INDUSTRIES,
  TESTIMONIALS,
  STATS,
  SEO,
  API,
  FEATURES,
  ANALYTICS,
  CACHE,
  SECURITY,
}

export default CONSTANTS
