"use client"

import { useEffect, memo, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Use memo to prevent unnecessary re-renders
const ErrorMessage = memo(function ErrorMessage() {
  return (
    <div className="text-center w-full max-w-[280px] xs:max-w-sm">
      <h1 className="text-2xl xs:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4 tracking-tight">Something went wrong</h1>
      <p className="mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base text-muted-foreground mx-auto">
        We encountered an error while loading the application. Please try again.
      </p>
    </div>
  )
})

// Add display name for debugging
ErrorMessage.displayName = 'ErrorMessage'

function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Create a ref to track if we've already reported this error
  const hasReportedError = useRef<boolean>(false);
  
  useEffect(() => {
    // Log error to console
    console.error(error)
    
    // In production, report to monitoring service
    if (process.env.NODE_ENV === 'production' && !hasReportedError.current) {
      try {
        // Prepare error data once to avoid object creation in the fetch call
        const errorData = {
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          type: 'global',
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }
        
        // Mark as reported to prevent duplicate reports
        hasReportedError.current = true;
        
        // Use requestIdleCallback for non-critical operations when browser is idle
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            // Use sendBeacon API for more reliable error reporting
            if (navigator.sendBeacon) {
              navigator.sendBeacon('/api/error-logging', JSON.stringify(errorData));
            } else {
              // Example of sending error to API endpoint
              fetch('/api/error-logging', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(errorData),
                keepalive: true,
              }).catch(() => {
                // Silently handle fetch errors
              });
            }
          }, { timeout: 1000 });
        } else {
          // Fallback for browsers that don't support requestIdleCallback
          setTimeout(() => {
            fetch('/api/error-logging', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(errorData),
              keepalive: true,
            }).catch(() => {
              // Silently handle fetch errors
            });
          }, 0);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_unused) {
        // Prevent error reporting loops
      }
    }
    
    // Register error with performance tracking
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark('app_error');
      performance.measure('time_to_error', 'app_start', 'app_error');
      
      const errorTime = performance.getEntriesByName('time_to_error')[0]?.duration || 0;
      
      // Store error timing information in sessionStorage for analysis
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('lastErrorTime', String(errorTime));
          sessionStorage.setItem('lastErrorType', error.name || 'UnknownError');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_unused) {
        // Silently handle storage errors
      }
    }
  }, [error])

  // Define handler functions with useCallback to prevent recreating on each render
  const handleReset = useCallback(() => {
    // Attempt to reset and clear any cached state
    try {
      // Clear local storage errors if they exist
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lastError');
        
        // Reset any performance markers
        performance.clearMarks();
        performance.clearMeasures();
      }
      
      // Call the reset function
      reset();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_unused) {
      // If reset fails, hard reload the page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }, [reset]);

  return (
    <html lang="en">
      <head>
        {/* Add resource hints for critical resources */}
        <link rel="preconnect" href="/" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="/" />
        
        {/* Add favicon */}
        <link rel="icon" type="image/png" href="/images/Main_Logo.png" />
        
        {/* Add viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Add theme color for better mobile experience */}
        <meta name="theme-color" content="#2a1a40" />
        
        {/* Add title for error page */}
        <title>Error - Atlas Technosoft</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 bg-background text-foreground">
          <ErrorMessage />
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center">
            <Button 
              onClick={handleReset} 
              variant="outline" 
              className="min-h-[44px] w-full xs:w-auto touch-target"
            >
              Try again
            </Button>
            <Button 
              asChild 
              className="min-h-[44px] w-full xs:w-auto mt-2 xs:mt-0 touch-target"
            >
              <Link href="/" prefetch={false}>Return to Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
