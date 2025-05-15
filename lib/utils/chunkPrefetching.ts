/**
 * Chunk Prefetching Utility
 * 
 * This utility helps optimize the loading of dynamic imports by prefetching
 * critical chunks when the browser is idle. This can help prevent chunk loading
 * issues by ensuring chunks are already in the browser cache.
 */

// Logging utilities that only run in development
const logDev = (message: string, ...args: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...args);
  }
};

const warnDev = (message: string, ...args: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(message, ...args);
  }
};

// List of critical chunk paths to prefetch
// These should be paths relative to your app's root
const CRITICAL_CHUNKS = [
  '/api/search',
  '/about',
  '/contact',
  '/blog',
  '/sap-solutions/business-one',
  '/automation-solutions/rpa-solutions'
]

/**
 * Prefetch critical chunks as soon as possible after navigation
 */
export const prefetchCriticalChunks = async (): Promise<void> => {
  if (typeof window === 'undefined') return
  
  try {
    // Use requestIdleCallback if available, or setTimeout as fallback
    const scheduleWork = window.requestIdleCallback || 
      ((cb: () => void) => setTimeout(cb, 1000))
    
    scheduleWork(() => {
      // Log prefetching start in development
      logDev('[Chunk Prefetcher] Initializing critical chunk prefetching')
      
      // Prefetch each critical path using Next.js router prefetch
      CRITICAL_CHUNKS.forEach(path => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = path
        link.as = 'fetch'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
        
        logDev(`[Chunk Prefetcher] Prefetching: ${path}`)
      })
    })
  } catch (error) {
    // Silently handle prefetching errors, logging only in development
    warnDev('Failed to prefetch chunks:', error)
  }
}

/**
 * Checks for previously failed chunks in session storage
 * and clears them to allow retry
 */
export const clearFailedChunks = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    sessionStorage.removeItem('chunk_load_errors')
  } catch {
    // Ignore errors accessing session storage
  }
}

/**
 * Configure webpack chunk loading retries
 * This is a backup in case the main error handler in chunk-error-handling.js fails
 */
export const configureChunkLoadingRetries = (): void => {
  if (typeof window === 'undefined' || !window.__webpack_chunk_load__) return
  
  try {
    // Check if already configured to avoid double configuration
    if ((window as any).__chunk_retry_configured) return
    
    const originalLoad = window.__webpack_chunk_load__
    window.__webpack_chunk_load__ = (id: string) => {
      return originalLoad(id).catch((loadError: Error) => {
        warnDev(`[Chunk Loader] Error loading chunk ${id}, attempting retry...`, loadError)
        
        // Clear chunk from cache if possible
        try {
          if (window.__webpack_require__) {
            const modules = window.__webpack_require__.c
            for (const moduleId in modules) {
              if (moduleId.includes(id)) {
                delete modules[moduleId]
              }
            }
          }
        } catch {
          // Ignore errors clearing cache
        }
        
        // Wait and retry once
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            originalLoad(id).then(resolve).catch(reject)
          }, 1000)
        })
      })
    }
    
    // Mark as configured
    (window as any).__chunk_retry_configured = true
    
    logDev('[Chunk Loader] Configured chunk loading retries')
  } catch (error) {
    warnDev('Failed to configure chunk loading retries:', error)
  }
} 