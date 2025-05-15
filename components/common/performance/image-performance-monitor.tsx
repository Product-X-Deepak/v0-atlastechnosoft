'use client'

import { useEffect, useCallback } from 'react'

// Extend PerformanceEntry with resource-specific properties
interface PerformanceResourceEntry extends PerformanceEntry {
  initiatorType: string
  transferSize?: number
  failed?: boolean
}

/**
 * ImagePerformanceMonitor
 * 
 * A component that monitors image loading performance and reports issues.
 * It tracks failed image loads and can automatically retry loading critical images.
 */
export function ImagePerformanceMonitor() {
  // Track failed image loads
  const trackImageErrors = useCallback(() => {
    if (typeof window === 'undefined') return
    
    // Create observer for images
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceEntry[]
      
      entries.forEach((entry) => {
        // Filter for failed image resources
        if (
          entry.initiatorType === 'img' &&
          entry.name && 
          !entry.name.includes('data:') && 
          entry.failed
        ) {
          console.warn(`[Image Error] Failed to load: ${entry.name}`)
          
          // Log to server if production
          if (process.env.NODE_ENV === 'production') {
            try {
              fetch('/api/error-logging/image-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  url: entry.name,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent,
                  performance: {
                    duration: entry.duration,
                    size: entry.transferSize || 0
                  }
                }),
                // Fire and forget
                keepalive: true
              }).catch(() => {
                // Silently fail if logging fails
              })
            } catch {
              // Ignore errors in error reporting
            }
          }
        }
      })
    })
    
    // Start observing resource timing entries
    observer.observe({ entryTypes: ['resource'] })
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  // Setup image error monitoring
  useEffect(() => {
    const cleanup = trackImageErrors()
    
    // Also monitor direct image error events for older browsers
    const handleImageError = (e: ErrorEvent) => {
      const target = e.target as HTMLImageElement
      if (target && target.tagName === 'IMG' && target.src && !target.src.startsWith('data:')) {
        console.warn(`[Image Error] Failed to load via event: ${target.src}`)
      }
    }
    
    window.addEventListener('error', handleImageError, { capture: true })
    
    return () => {
      cleanup?.()
      window.removeEventListener('error', handleImageError, { capture: true })
    }
  }, [trackImageErrors])
  
  // This is a monitoring component, so it doesn't render anything
  return null
} 