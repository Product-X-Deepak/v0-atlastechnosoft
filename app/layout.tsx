import type { Metadata, Viewport } from "next/types"
import { Mona_Sans } from "next/font/google"
import localFont from "next/font/local"
import { Montserrat } from "next/font/google"
import type { ReactNode } from "react"
import { Suspense, lazy } from "react"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { SiteHeader } from '@/components/common/layout/site-header'
import { SiteFooter } from '@/components/common/layout/site-footer'
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ErrorHandler } from "@/components/error-handler"
import Script from "next/script"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { ScrollProgress } from "@/components/scroll-progress"
import { VideoBackground } from "@/components/ui/video-background"
import { ExitIntentPopup } from "@/components/common/feedback/exit-intent-popup"
import { CookieConsent } from "@/components/common/feedback/cookie-consent"
import { CustomCursor } from "@/components/ui/cursor-effects"

// Lazily load non-critical components
const CommandMenu = lazy(() => import("@/components/client-wrappers").then(mod => ({ default: mod.CommandMenu })))
const ChatWidget = lazy(() => import("@/components/client-wrappers").then(mod => ({ default: mod.ChatWidget })))

// Font configuration compatible with Next.js 15.2.4
const fontSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontHeading = localFont({
  src: [
    {
      path: "../app/fonts/CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atlastechnosoft.com"),
  title: {
    default: "Atlas Technosoft | SAP Partner & Enterprise Solutions Provider",
    template: "%s | Atlas Technosoft",
  },
  description:
    "Atlas Technosoft is a leading SAP Partner providing comprehensive ERP solutions, AI automation, digital transformation, and enterprise applications since 1997.",
  keywords: [
    "SAP Business One",
    "SAP HANA",
    "ERP Solutions",
    "Automation Solutions",
    "RPA Solutions",
    "Cloud Computing",
    "Atlas Technosoft",
    "SAP Partner",
    "Business Process Automation",
    "Digital Transformation",
    "Boyum IT",
    "UI Path",
    "Consultation Services",
  ],
  authors: [
    {
      name: "Atlas Technosoft",
      url: "https://www.atlastechnosoft.com",
    },
  ],
  creator: "Atlas Technosoft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.atlastechnosoft.com",
    title: "Atlas Technosoft | SAP Partner & Enterprise Solutions Provider",
    description:
      "Atlas Technosoft is a leading SAP Partner providing comprehensive ERP solutions, AI automation, digital transformation, and enterprise applications since 1997.",
    siteName: "Atlas Technosoft",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Technosoft - Enterprise Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Technosoft | SAP Partner & Enterprise Solutions Provider",
    description:
      "Atlas Technosoft is a leading SAP Partner providing comprehensive ERP solutions, AI automation, digital transformation, and enterprise applications since 1997.",
    creator: "@atlastechnosoft",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com",
    languages: {
      "en-US": "https://www.atlastechnosoft.com",
    },
  },
  generator: "Next.js",
  applicationName: "Atlas Technosoft",
  referrer: "origin-when-cross-origin",
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#2a1a40",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
        
        {/* Resource hints for critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://atlastechnosoft.com" crossOrigin="anonymous" />
        
        {/* Optimized favicon configuration */}
        <link rel="icon" type="image/png" href="/images/Main_Logo.png" />
        <link rel="icon" href="/images/Main_Logo.png" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Main_Logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Main_Logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Main_Logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2a1a40" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/fonts/CalSans-SemiBold.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/images/atlas-technosoft-logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        
        {/* Security headers */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self';"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance optimization headers */}
        <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
        
        {/* Early hints for browser optimizations */}
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        <meta httpEquiv="Early-Hints" content="preload" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          fontSans.variable,
          fontHeading.variable,
          montserrat.variable,
        )}
      >
        <Providers>
          <ErrorHandler />
          <PerformanceOptimizer />
          <div className="relative flex min-h-screen flex-col">
            {/* Load video background with higher delay */}
            <Suspense fallback={null}>
              <VideoBackground />
            </Suspense>
            
            {/* Use a smaller initial loading delay to prevent LCP issues */}
            <Suspense fallback={null}>
              <ScrollProgress />
            </Suspense>
            
            {/* Critical UI elements for first paint - no lazy loading */}
            <SiteHeader />
            <main id="main-content" className="flex-1 w-full">
              {children}
            </main>
            <SiteFooter />
          </div>
          
          {/* Defer non-critical UI elements with higher loading thresholds */}
          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>
          <Suspense fallback={null}>
            <ExitIntentPopup />
          </Suspense>
          
          <Suspense fallback={null}>
            <CommandMenu />
          </Suspense>
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
          <Suspense fallback={null}>
            <div className="fixed bottom-6 right-6 z-[9999] w-auto h-auto">
              <ChatWidget />
            </div>
          </Suspense>
          
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <TailwindIndicator />
        </Providers>
        
        {/* Analytics & Performance Monitoring */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            `,
          }}
        />
        
        {/* Polyfills for older browsers */}
        <Script
          id="polyfills"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Intersection Observer polyfill
                if (!('IntersectionObserver' in window)) {
                  var script = document.createElement('script');
                  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
                  document.head.appendChild(script);
                }
                
                // Object.fromEntries polyfill
                if (!Object.fromEntries) {
                  Object.defineProperty(Object, 'fromEntries', {
                    value(entries) {
                      if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries requires a single iterable argument'); }
                      const obj = {};
                      for (const [key, value] of entries) {
                        obj[key] = value;
                      }
                      return obj;
                    },
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
