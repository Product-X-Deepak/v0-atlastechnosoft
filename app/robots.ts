import { MetadataRoute } from "next";

// Base URL for the website
const baseUrl = "https://www.atlastechnosoft.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/bin/",
          "/private/",
          "/admin/",
          "/*.json$",
          "/*.xml$",
          "/search?*",
          "/download/", 
        ],
        crawlDelay: 2, // Add a crawl delay of 2 seconds for all bots
      },
      {
        // Rules specifically for Google
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/bin/",
        ],
      },
      {
        // Rules for Google Image bot
        userAgent: "Googlebot-Image",
        allow: [
          "/images/",
          "/public/images/",
        ],
        disallow: [
          "/images/private/", 
          "/images/admin/",
        ],
      },
      {
        // Rules for Bing
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/", 
          "/_next/",
          "/bin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 