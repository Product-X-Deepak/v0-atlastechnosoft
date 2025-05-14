"use client"

import { useEffect, useMemo, useCallback } from "react"
import { PremiumError } from "@/components/common/error/premium-error"

// Memoize the error type determination function to improve performance
const determineErrorType = (error: Error): 'network' | 'server' | 'generic' => {
  // Check for offline status first
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'network'
  }
  
  // Network errors - check with single lowercase conversion for better performance
  const errorMsgLower = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  if (
    errorMsgLower.includes('fetch') || 
    errorMsgLower.includes('network') ||
    errorMsgLower.includes('failed to fetch') ||
    errorMsgLower.includes('network error') ||
    errorMsgLower.includes('abort') ||
    errorMsgLower.includes('timeout')
  ) {
    return 'network'
  }
  
  // Server errors (typically 5xx)
  if (
    errorMsgLower.includes('500') || 
    errorMsgLower.includes('server') ||
    errorMsgLower.includes('internal server error') ||
    /50[0-9]/.test(errorMsgLower) ||
    errorMsgLower.includes('econnrefused')
  ) {
    return 'server'
  }
  
  // Default to generic error
  return 'generic'
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Memoize the error type to avoid unnecessary recalculations
  const errorType = useMemo(() => determineErrorType(error), [error])
  
  // Memoize reset function to prevent unnecessary re-renders
  const handleReset = useCallback(() => reset(), [reset])

  useEffect(() => {
    // Log the error to the console in development
    console.error(error)
    
    // Report error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Use requestIdleCallback to defer non-critical operations
      const reportError = () => {
        try {
          const errorData = {
            message: error.message,
            stack: error.stack,
            digest: error.digest,
            url: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: new Date().toISOString(),
            type: errorType,
          }
          
          // Send error to API endpoint - non-blocking
          fetch('/api/error-logging', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errorData),
            keepalive: true,
          }).catch(() => {
            // Silently handle fetch errors to avoid cascading failures
          })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_unused) {
          // Ignore errors in the error reporter to prevent loops
        }
      }
      
      // Schedule error reporting during browser idle time
      if (typeof window !== 'undefined') {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(reportError, { timeout: 2000 });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(reportError, 0);
        }
      }
    }
  }, [error, errorType])

  return (
    <PremiumError 
      error={error}
      errorType={errorType}
      onReset={handleReset}
      fullscreen={true}
      showBackButton={true}
    />
  )
}
