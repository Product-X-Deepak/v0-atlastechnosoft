/**
 * Client-side Chunk Error Handling
 * 
 * This script provides robust handling for webpack chunk loading errors with:
 * - Progressive retries with exponential backoff
 * - Cleanup of failed chunk entries from webpack cache
 * - Error telemetry for monitoring
 * - Cache invalidation for persistent errors
 */

// Configuration
const RETRY_MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 200;
const COLLECT_TELEMETRY = true;
const CLEAR_SESSION_CACHE = true;

/**
 * Install the chunk error handler at the earliest opportunity
 */
export function installChunkErrorHandler() {
  if (typeof window === 'undefined') return;
  
  try {
    // Only install once
    if (window.__chunk_error_handler_installed) return;
    
    // Keep reference to original webpack chunk loader
    const originalLoad = window.__webpack_chunk_load__;
    if (!originalLoad) return;
    
    // Replace the chunk loader with our enhanced version
    window.__webpack_chunk_load__ = function(chunkId) {
      return new Promise((resolve, reject) => {
        // Initial attempt
        attemptChunkLoad(chunkId, 0, resolve, reject);
      });
    };
    
    // Flag as installed
    window.__chunk_error_handler_installed = true;
    
    // Clear any previously stored error records on fresh page load
    if (CLEAR_SESSION_CACHE) {
      try {
        sessionStorage.removeItem('chunk_load_errors');
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        // Ignore session storage errors
      }
    }
    
    console.log('[Chunk Error Handler] Installed successfully');
  } catch (error) {
    console.warn('[Chunk Error Handler] Installation failed:', error);
  }
  
  /**
   * Attempt to load a chunk with retries
   */
  function attemptChunkLoad(chunkId, attempt, resolve, reject) {
    // If we've already retried too many times, give up
    if (attempt >= RETRY_MAX_ATTEMPTS) {
      const error = new Error(`Failed to load chunk ${chunkId} after ${RETRY_MAX_ATTEMPTS} attempts`);
      logChunkError(chunkId, error);
      return reject(error);
    }
    
    // Try to load the chunk
    window.__webpack_require__.e(chunkId)
      .then(resolve)
      .catch(error => {
        // Log the error 
        if (attempt === 0) {
          console.warn(`[Chunk Error Handler] Error loading chunk ${chunkId}, attempting retry...`);
        } else {
          console.warn(`[Chunk Error Handler] Retry ${attempt}/${RETRY_MAX_ATTEMPTS} failed for chunk ${chunkId}`);
        }
        
        // Try to clean the chunk from cache
        cleanupFailedChunk(chunkId);
        
        // Calculate delay with exponential backoff & some jitter
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 100;
        
        // Wait and retry
        setTimeout(() => {
          attemptChunkLoad(chunkId, attempt + 1, resolve, reject);
        }, delay);
      });
  }
  
  /**
   * Try to clean up a failed chunk from webpack's internal cache
   */
  function cleanupFailedChunk(chunkId) {
    try {
      if (window.__webpack_require__ && window.__webpack_require__.c) {
        // Clean up any modules that belong to this chunk
        const modules = window.__webpack_require__.c;
        for (const moduleId in modules) {
          if (moduleId.includes(chunkId)) {
            delete modules[moduleId];
          }
        }
      }
      
      // Clean chunk promise
      if (window.__webpack_require__ && window.__webpack_require__.e && window.__webpack_require__.f) {
        // Remove the promise tracking the chunk load
        delete window.__webpack_require__.f.j[chunkId];
        
        // Remove the chunk from the installed chunks
        if (window.__webpack_require__.f.j) {
          // Clear the "loaded" flag for this chunk
          window.__webpack_require__.f.j[chunkId] = 0;
        }
      }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    } catch (e) {
      // Ignore errors during cleanup
    }
  }
  
  /**
   * Log chunk errors for telemetry
   */
  function logChunkError(chunkId, error) {
    if (!COLLECT_TELEMETRY) return;
    
    try {
      // Store in session for the current browsing session
      const errorRecord = {
        chunkId: chunkId,
        timestamp: Date.now(),
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        error: error.message
      };
      
      // Get existing errors
      let errors = [];
      try {
        const stored = sessionStorage.getItem('chunk_load_errors');
        if (stored) {
          errors = JSON.parse(stored);
        }
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        // Start with empty array if parsing fails
      }
      
      // Add new error and limit to last 10
      errors.push(errorRecord);
      if (errors.length > 10) {
        errors = errors.slice(errors.length - 10);
      }
      
      // Save back to session storage
      sessionStorage.setItem('chunk_load_errors', JSON.stringify(errors));
      
      // Send to server if possible, but don't block
      if (typeof fetch === 'function') {
        fetch('/api/error-logging/chunk-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorRecord),
          // Use keepalive to allow the request to complete even during navigation
          keepalive: true,
          // Don't wait for response or let failures impact the user
          priority: 'low'
        }).catch(() => {
          // Ignore fetch errors
        });
      }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    } catch (e) {
      // Ignore telemetry errors
    }
  }
}

// Type definitions for webpack internals
if (typeof window !== 'undefined') {
  window.__chunk_error_handler_installed = false;
} 