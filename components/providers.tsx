"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/common/error/error-boundary'
import { LoadingProvider } from '@/components/common/loading/loading-provider'
import { Toaster } from 'sonner'
import { PerformanceProvider } from "@/components/common/performance/performance-provider";
import { Suspense } from "react"

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Global providers wrapper for the application
 * 
 * This organizes all context providers in one place for better organization
 * and proper nesting order.
 */
function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
        forcedTheme="dark"
      >
        <LoadingProvider>
          <PerformanceProvider 
            trackWebVitals={true}
            debug={process.env.NODE_ENV === 'development'}
            analyticsEndpoint="/api/performance-metrics"
          >
            {children}
            
            {/* UI components that should be available app-wide */}
            <Toaster 
              position="bottom-right" 
              richColors 
              closeButton 
            />
          </PerformanceProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ProvidersWrapper(props: ProvidersProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <Providers {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ProvidersWrapper as Providers };