"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"
import { Suspense } from "react"

// Add TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      params?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

// Web vitals metric type
interface _WebVitalMetric {
  name: string;
  value: number;
  id?: string;
}

/**
 * Event names for Google Analytics tracking
 */
export const events = {
  PAGE_VIEW: "page_view",
  BUTTON_CLICK: "button_click",
  LINK_CLICK: "link_click",
  FORM_SUBMIT: "form_submit",
  SEARCH: "search",
  DOWNLOAD: "download",
  VIDEO_PLAY: "video_play",
  VIDEO_PROGRESS: "video_progress",
  VIDEO_COMPLETE: "video_complete",
  ERROR: "error",
  LOGIN: "login",
  SIGN_UP: "sign_up",
  SHARE: "share",
  ADD_TO_CART: "add_to_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  PURCHASE: "purchase",
}

function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

  // Track page views when path or search params change
  useEffect(() => {
    if (!googleAnalyticsId) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Send page view event
    window.gtag?.("event", events.PAGE_VIEW, {
      page_path: url,
    })
  }, [pathname, searchParams, googleAnalyticsId])

  if (!googleAnalyticsId && !googleTagManagerId) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
    </>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function AnalyticsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <Analytics {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { AnalyticsWrapper as Analytics };