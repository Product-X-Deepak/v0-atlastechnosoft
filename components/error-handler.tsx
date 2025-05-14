"use client"

import { useEffect } from "react"
import { initializeChunkHandling } from "@/lib/utils/chunk-initialization"

/**
 * Global Error Handler Component
 * 
 * This component handles global error initialization, including:
 * - Chunk loading error recovery
 * - Global unhandled error monitoring
 * - Error reporting to the API
 */
export function ErrorHandler() {
  useEffect(() => {
    // Initialize chunk error handling as early as possible
    initializeChunkHandling()
    
    // Try to install chunk error handling on window if needed
    if (typeof window !== 'undefined' && !window.__chunk_error_handler_installed) {
      try {
        // Add a fallback chunk error handler for webpack
        if (window.__webpack_chunk_load__) {
          const originalLoad = window.__webpack_chunk_load__;
          window.__webpack_chunk_load__ = (id) => {
            return originalLoad(id).catch((error) => {
              console.warn(`[Chunk Error Handler] Error loading chunk ${id}, attempting retry...`);
              
              // Try to clear chunk from webpack cache
              if (window.__webpack_require__ && window.__webpack_require__.c) {
                try {
                  const webpackRequire = window.__webpack_require__;
                  if (webpackRequire && webpackRequire.c) {
                    Object.keys(webpackRequire.c).forEach(moduleId => {
                      if (moduleId.includes(id)) {
                        delete webpackRequire.c[moduleId];
                      }
                    });
                  }
                } catch (err) {
                  // Silently fail if we can't access the cache
                  console.warn('[Error Handler] Failed to clear chunk from cache:', err);
                }
              }
              
              // Wait and retry once
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  originalLoad(id).then(resolve).catch(reject);
                }, 1000);
              });
            });
          };
          
          // Flag as initialized
          window.__chunk_error_handler_installed = true;
        }
      } catch (error) {
        console.warn('[Error Handler] Failed to install chunk handler:', error);
      }
    }
    
    // Set up global error handling for unhandled errors
    const errorHandler = (event: ErrorEvent) => {
      // Prevent default browser error handling
      event.preventDefault()
      
      // Check if this is a chunk error
      const isChunkError = 
        event.message?.includes('chunk') || 
        event.message?.includes('script') || 
        event.message?.includes('webpack') ||
        event.filename?.includes('chunk') ||
        event.error?.stack?.includes('chunk') ||
        event.error?.message?.includes('chunk')
      
      // Only report errors that aren't already being caught by other mechanisms
      if (!isChunkError) {
        try {
          fetch('/api/error-logging/chunk-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: event.message,
              stack: event.error?.stack,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              path: window.location.pathname,
              isGlobalError: true
            }),
            keepalive: true
          }).catch(() => {
            // Ignore fetch errors to avoid cascading issues
          })
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        } catch (_) {
          // Silently fail error reporting
        }
      }
    }
    
    // Set up promise rejection handling
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      // Check if this is a network error that might be related to chunks
      const isNetworkError = 
        event.reason?.message?.includes('network') ||
        event.reason?.message?.includes('fetch') ||
        event.reason?.message?.includes('load') ||
        event.reason?.stack?.includes('chunk')
      
      // Only handle network errors specially
      if (isNetworkError) {
        // Attempt to clean webpack cache for any potential chunk issues
        try {
          if (window.__webpack_require__ && window.__webpack_require__.c) {
            const modules = window.__webpack_require__.c
            const chunksToRetry = []
            
            // Identify modules that might be causing issues
            for (const moduleId in modules) {
              if (moduleId.includes('/chunks/')) {
                chunksToRetry.push(moduleId)
              }
            }
            
            // If we found problematic modules, try to reload them
            if (chunksToRetry.length > 0) {
              console.warn(`[Error Handler] Detected ${chunksToRetry.length} possibly failed chunks. Attempting cleanup.`)
              
              // Clean up problematic modules
              chunksToRetry.forEach(moduleId => {
                try {
                  delete modules[moduleId]
                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                } catch (_) {
                  // Ignore cleanup errors
                }
              })
            }
          }
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        } catch (_) {
          // Ignore webpack cache access errors
        }
      }
    }
    
    // Register the error handlers
    window.addEventListener('error', errorHandler)
    window.addEventListener('unhandledrejection', rejectionHandler)
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [])
  
  // This component doesn't render anything
  return null
}