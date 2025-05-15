/**
 * Dynamic Import Utilities
 * 
 * This module provides enhanced dynamic import functionality with:
 * - Error handling for chunk loading failures
 * - Automatic retries for failed imports
 * - Performance tracking
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

/**
 * Options for the importWithRetry function
 */
interface ImportRetryOptions {
  /** Maximum number of retry attempts */
  maxRetries?: number
  /** Base delay in ms between retries (will be used with exponential backoff) */
  retryDelayMs?: number
  /** Whether to log retry attempts */
  verbose?: boolean
  /** Name of the module being imported (for logging) */
  moduleName?: string
}

/**
 * Enhanced dynamic import with automatic retry for chunk loading errors
 * 
 * @param importFn Function that returns a dynamic import (e.g., () => import('./my-module'))
 * @param options Configuration options for retries
 * @returns Promise that resolves to the imported module
 */
export async function importWithRetry<T>(
  importFn: () => Promise<T>,
  options: ImportRetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    retryDelayMs = 200,
    verbose = process.env.NODE_ENV === 'development',
    moduleName = 'unknown module'
  } = options
  
  // Initialize lastError with a default error to avoid "used before assigned" warning
  let lastError: Error = new Error(`Failed to load module "${moduleName}" after maximum retries`)
  
  // Try the import multiple times with exponential backoff
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // If this isn't the first attempt, wait before retrying
      if (attempt > 0) {
        const delay = retryDelayMs * Math.pow(2, attempt - 1)
        if (verbose) {
          logDev(`[Dynamic Import] Retrying import of ${moduleName} (attempt ${attempt}/${maxRetries})`)
        }
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      // Attempt the import
      const startTime = performance.now()
      const result = await importFn()
      
      // Log successful import time in development
      if (verbose && attempt > 0) {
        const loadTime = performance.now() - startTime
        logDev(`[Dynamic Import] Successfully imported ${moduleName} after ${attempt} retries (${loadTime.toFixed(2)}ms)`)
      }
      
      return result
    } catch (error) {
      lastError = error as Error
      
      // Only retry on chunk loading errors, not other types of errors
      const isChunkError = 
        error instanceof Error && (
          error.message.includes('Loading chunk') ||
          error.message.includes('ChunkLoadError') ||
          error.message.includes('Failed to fetch dynamically imported module') ||
          error.message.includes('Network Error')
        )
      
      if (!isChunkError || attempt >= maxRetries) {
        // If it's not a chunk error or we've reached max retries, stop trying
        break
      }
      
      if (verbose) {
        warnDev(`[Dynamic Import] Error loading ${moduleName} (attempt ${attempt + 1}/${maxRetries}):`, error)
      }
    }
  }
  
  // If we got here, all retries failed
  throw lastError
}

/**
 * Enhanced lazy loading wrapper with retry logic for React components
 * 
 * @param importFn Function that returns a dynamic import
 * @param options Configuration options for retries
 * @returns Dynamic import with retry capability
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: ImportRetryOptions = {}
): React.LazyExoticComponent<T> {
  const retry = () => importWithRetry(importFn, options)
  return React.lazy(retry)
}

// Add lazy type
declare global {
  interface React {
    lazy<T extends React.ComponentType<any>>(
      factory: () => Promise<{ default: T }>
    ): React.LazyExoticComponent<T>
  }
} 