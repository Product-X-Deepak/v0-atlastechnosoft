"use client"

/**
 * Client Component Wrappers
 * 
 * This file serves as a central registry for all client components that
 * should be lazy loaded. By importing them here and re-exporting them,
 * we can ensure they're properly code-split and only loaded when needed.
 * 
 * Usage: import { ComponentName } from '@/components/client-wrappers';
 */

import dynamic from "next/dynamic"

// Dynamically import client components with appropriate loading strategies
// CommandMenu removed as it's no longer needed

export const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then(mod => mod.ScrollProgress),
  { 
    ssr: false,
    loading: () => null 
  }
)

export const ExitIntentPopup = dynamic(
  () => import("@/components/common/feedback/exit-intent-popup").then(mod => mod.ExitIntentPopup),
  { 
    ssr: false,
    loading: () => null 
  }
)

export const CookieConsent = dynamic(
  () => import("@/components/common/feedback/cookie-consent").then(mod => mod.CookieConsent),
  { 
    ssr: false,
    loading: () => null 
  }
)

export const CustomCursor = dynamic(
  () => import("@/components/ui/cursor-effects").then(mod => mod.CustomCursor),
  { 
    ssr: false,
    loading: () => null 
  }
)

export const Analytics = dynamic(
  () => import("@/components/analytics").then(mod => mod.Analytics),
  { 
    ssr: false,
    loading: () => null 
  }
)

// Add other heavy client components here following the same pattern
export const CareerOpenings = dynamic(
  () => import("@/components/careers/career-openings").then(mod => mod.CareerOpenings),
  { 
    ssr: true, // This can be pre-rendered
    loading: () => (
      <div className="w-full p-6 space-y-4">
        <div className="h-12 bg-muted/30 rounded animate-pulse"></div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }
)

export const MultiStepForm = dynamic(
  () => import("@/components/multi-step-form").then(mod => mod.MultiStepForm),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-3xl mx-auto p-6 border rounded-lg shadow-sm bg-card animate-pulse">
        <div className="h-8 bg-muted/30 rounded w-2/3 mb-8"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted/20 rounded"></div>
          ))}
          <div className="h-12 bg-primary/30 rounded w-1/3 mt-4"></div>
        </div>
      </div>
    )
  }
)

export const MainNavigationMenu = dynamic(
  () => import("@/components/common/layout/navigation/navigation-menu").then(mod => mod.MainNavigationMenu),
  { 
    ssr: true, // Important for SEO and First Paint
    loading: () => (
      <div className="h-16 flex items-center justify-between px-4">
        <div className="w-32 h-8 bg-muted/30 rounded animate-pulse"></div>
        <div className="flex space-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-20 h-6 bg-muted/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }
)

export const BusinessImpactSection = dynamic(
  () => import("@/components/sections/business-impact-section").then(mod => mod.BusinessImpactSection),
  { 
    ssr: true,
    loading: () => (
      <div className="w-full py-12 space-y-8">
        <div className="h-10 bg-muted/30 rounded w-1/2 mx-auto animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }
)

// Using shorter names for these components since they're specific to feature sections
export const SapHanaFeatures = dynamic(
  () => import("@/components/sap/sap-hana-features").then(mod => mod.SapHanaFeatures),
  { ssr: true }
)

export const ErpPlanningCapabilities = dynamic(
  () => import("@/components/sap/erp-planning-capabilities").then(mod => mod.ErpPlanningCapabilities),
  { ssr: true }
) 