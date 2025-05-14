/**
 * Chunk Initialization
 * 
 * This module handles initialization of chunk loading capabilities
 * and should be imported as early as possible in the application lifecycle.
 */

import { installChunkErrorHandler } from './chunk-error-handling';
import { prefetchCriticalChunks, clearFailedChunks } from './chunkPrefetching';

/**
 * Initializes all chunk loading optimizations and error handlers.
 * This should be called as early as possible, typically in a root
 * layout or app component.
 */
export function initializeChunkHandling(): void {
  if (typeof window === 'undefined') return;
  
  // Execute in a microtask to avoid blocking the main thread
  // but ensure it runs before most other JavaScript
  Promise.resolve().then(() => {
    try {
      // Install the chunk error handler first for maximum coverage
      installChunkErrorHandler();
      
      // Clear any previous failures
      clearFailedChunks();
      
      // Prefetch critical chunks when the browser is idle
      const prefetchTimeout = setTimeout(() => {
        prefetchCriticalChunks();
      }, 2000); // 2 second delay to prioritize main page load
      
      // Clean up timeout if page navigates away quickly
      window.addEventListener('beforeunload', () => {
        clearTimeout(prefetchTimeout);
      }, { once: true });
      
      // Log successful initialization
      if (process.env.NODE_ENV === 'development') {
        console.log('[Chunk Init] Chunk handling initialized successfully');
      }
    } catch (error) {
      // Log errors but don't crash the app
      console.error('[Chunk Init] Error during initialization:', error);
    }
  });
}

/**
 * Adds event listeners for debugging chunk loading in development
 */
export function addChunkLoadingDebugListeners(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  try {
    // Listen for script load events to monitor chunk loading
    window.addEventListener('load', () => {
      // Get all script tags that are chunks
      const scripts = document.querySelectorAll('script[src*="chunk"]');
      console.log(`[Chunk Debug] ${scripts.length} chunks loaded successfully`);
    });
    
    // Track script errors
    window.addEventListener('error', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName === 'SCRIPT' && target.getAttribute('src')?.includes('chunk')) {
        console.error(`[Chunk Debug] Script loading error:`, {
          src: target.getAttribute('src'),
          error: event.error || event.message
        });
      }
    }, true); // Use capture phase to catch events before they bubble
  } catch (error) {
    console.warn('[Chunk Debug] Could not initialize debug listeners:', error);
  }
} 