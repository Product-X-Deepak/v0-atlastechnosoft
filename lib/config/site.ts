/**
 * Site configuration
 */

export const siteConfig = {
  name: "Atlas Technosoft",
  description: "Leading SAP Partner providing enterprise solutions to streamline operations and drive growth",
  url: "https://atlastechnosoft.com",
  ogImage: "https://atlastechnosoft.com/og.jpg",
  links: {
    twitter: "https://twitter.com/atlastechnosoft",
    github: "https://github.com/atlastechnosoft",
  },
  creator: "Atlas Technosoft",
  defaultLocale: "en",
}

/**
 * Site metadata configuration
 */
export const siteMetadata = {
  title: {
    default: "Atlas Technosoft | Enterprise Solutions for Digital Transformation",
    template: "%s | Atlas Technosoft",
  },
  description: "Leading SAP Partner providing enterprise solutions to streamline operations and drive growth",
  keywords: [
    "SAP",
    "ERP",
    "Digital Transformation",
    "Business Solutions",
    "Automation Solutions",
    "Enterprise Solutions",
    "SAP Business One",
    "SAP HANA",
    "Cloud ERP",
    "Business Consulting",
  ],
  authors: [
    {
      name: "Atlas Technosoft",
      url: "https://atlastechnosoft.com",
    },
  ],
  creator: "Atlas Technosoft",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atlastechnosoft.com",
    title: "Atlas Technosoft | Enterprise Solutions for Digital Transformation",
    description: "Leading SAP Partner providing enterprise solutions to streamline operations and drive growth",
    siteName: "Atlas Technosoft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Technosoft | Enterprise Solutions for Digital Transformation",
    description: "Leading SAP Partner providing enterprise solutions to streamline operations and drive growth",
    images: ["https://atlastechnosoft.com/og.jpg"],
    creator: "@atlastechnosoft",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
} 