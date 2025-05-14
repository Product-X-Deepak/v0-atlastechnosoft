import { MetadataRoute } from "next";

// Base URL for the website
const baseUrl = "https://www.atlastechnosoft.com";

// Specific last modified dates for key pages (simulating a CMS that would provide actual dates)
// In a real implementation, these would come from a CMS, database, or git history
const lastModifiedDates: Record<string, Date> = {
  "/": new Date(), // Homepage is always fresh
  "/blog": new Date(), // Blog is frequently updated
  "/about": new Date("2023-11-15"),
  "/contact": new Date("2023-10-20"),
  "/careers": new Date("2024-01-10"),
  "/privacy": new Date("2023-09-05"),
  "/terms": new Date("2023-09-05"),
  "/sap-solutions/business-one": new Date("2024-02-18"),
  "/sap-solutions/business-one-cloud": new Date("2024-02-18"),
  "/sap-solutions/hana": new Date("2024-01-25"),
  "/sap-solutions/erp-planning": new Date("2023-12-12"),
};

// Route categories and their corresponding URLs with better organization
const routes = {
  main: [
    "/",
    "/about",
    "/contact",
    "/search",
    "/faq",
    "/careers",
    "/privacy",
    "/terms",
    "/blog",
  ],
  sap: [
    "/sap-solutions/business-one",
    "/sap-solutions/business-one-cloud",
    "/sap-solutions/business-one-cloud/features",
    "/sap-solutions/erp-planning",
    "/sap-solutions/hana",
  ],
  automation: [
    "/automation-solutions/boyum-it",
    "/automation-solutions/consultation",
    "/automation-solutions/rpa-solutions",
    "/automation-solutions/ui-path",
    "/automation-solutions/workflow-automation",
    "/automation-solutions/support",
  ],
  industries: [
    "/industries",
    "/industries/construction",
    "/industries/distribution",
    "/industries/financial-services",
    "/industries/healthcare",
    "/industries/manufacturing",
    "/industries/pharmaceuticals",
    "/industries/professional-services",
    "/industries/retail",
    "/industries/shipping",
  ],
  services: [
    "/services",
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Current date for pages without specific last modified dates
  const defaultLastModified = new Date();
  
  // Flatten all routes
  const allRoutes = [
    ...routes.main,
    ...routes.sap,
    ...routes.automation,
    ...routes.industries,
    ...routes.services,
  ];
  
  // Create sitemap entries with improved metadata
  const entries = allRoutes.map((route) => {
    // Prioritize main routes with a smarter algorithm
    let priority: number;
    
    if (route === "/") {
      priority = 1.0; // Homepage gets highest priority
    } else if (routes.main.includes(route)) {
      priority = 0.9; // Main pages get high priority
    } else if (route.includes("/sap-solutions/")) {
      priority = 0.8; // SAP solutions are core offerings
    } else if (route.includes("/industries/")) {
      priority = 0.7; // Industry pages are important for targeting
    } else if (route.includes("/automation-solutions/")) {
      priority = 0.7; // Automation solutions are also key offerings
    } else if (route.includes("/services/")) {
      priority = 0.7; // Service pages are important
    } else if (route.includes("/blog/")) {
      priority = 0.6; // Individual blog posts
    } else {
      priority = 0.5; // Default for other pages
    }
    
    // Set change frequency based on route type and content update patterns
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    
    if (route === "/") {
      changeFrequency = "daily"; // Homepage changes frequently
    } else if (route === "/blog" || route.includes("/blog/")) {
      changeFrequency = "daily"; // Blog section changes frequently
    } else if (route.includes("/industries/") || route.includes("/sap-solutions/") || route.includes("/automation-solutions/")) {
      changeFrequency = "monthly"; // Product/service pages change less frequently
    } else if (route === "/careers") {
      changeFrequency = "weekly"; // Career pages change based on job openings
    } else if (route === "/privacy" || route === "/terms") {
      changeFrequency = "yearly"; // Legal pages rarely change
    } else {
      changeFrequency = "weekly"; // Default for other pages
    }
    
    // Get the last modified date for this route or use default
    const lastModified = lastModifiedDates[route] || defaultLastModified;
    
    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
  
  return entries;
} 