/**
 * Early Chunk Error Handler 
 * 
 * This script is loaded early in the page lifecycle to handle webpack chunk loading errors.
 * It's designed to be included directly in the head with a beforeInteractive strategy.
 */
(function() {
  // Configuration
  var MAX_RETRIES = 3;
  var BASE_DELAY_MS = 200;
  var REPORT_ERRORS = true;
  
  // Keep track of installed state to avoid double installation
  var isInstalled = false;

  // Attempt to install as early as possible
  try {
    installHandler();
  } catch (e) {
    // If installation fails immediately, retry when page is more ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        try { installHandler(); } catch (e) { /* silent failure */ }
      });
    }
  }

  function installHandler() {
    // Skip if already installed or if we're not in a browser
    if (isInstalled || typeof window === 'undefined') return;
    
    // Wait for webpack to initialize its chunk loader
    var checkInterval = setInterval(function() {
      if (window.__webpack_chunk_load__) {
        clearInterval(checkInterval);
        enhanceChunkLoader();
      }
    }, 50); // Check every 50ms
    
    // Set a timeout to stop checking after 10 seconds
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 10000);
    
    // Mark as installed
    isInstalled = true;
  }

  function enhanceChunkLoader() {
    // Store reference to original loader
    var originalLoader = window.__webpack_chunk_load__;
    
    // Replace with enhanced version that handles retries
    window.__webpack_chunk_load__ = function(chunkId) {
      return new Promise(function(resolve, reject) {
        attemptChunkLoad(chunkId, 0);
        
        function attemptChunkLoad(chunkId, attempt) {
          originalLoader(chunkId)
            .then(resolve)
            .catch(function(error) {
              // Check if we've reached maximum retries
              if (attempt >= MAX_RETRIES) {
                console.error('[Chunk Error] Failed to load chunk ' + chunkId + ' after ' + MAX_RETRIES + ' attempts');
                
                // Report the error if enabled
                if (REPORT_ERRORS) {
                  reportChunkError(chunkId, error);
                }
                
                return reject(error);
              }
              
              // Log retry attempt
              console.warn('[Chunk Error] Retrying chunk ' + chunkId + ' (attempt ' + (attempt + 1) + '/' + MAX_RETRIES + ')');
              
              // Clear the failed chunk from webpack's cache if possible
              try {
                clearChunkCache(chunkId);
              } catch (e) {
                // Ignore cache clearing errors
              }
              
              // Calculate exponential backoff delay with small jitter
              var delay = BASE_DELAY_MS * Math.pow(2, attempt) + (Math.random() * 100);
              
              // Wait and retry
              setTimeout(function() {
                attemptChunkLoad(chunkId, attempt + 1);
              }, delay);
            });
        }
      });
    };
    
    // Also patch fetch for network-based chunk loading
    if (typeof window.fetch === 'function') {
      var originalFetch = window.fetch;
      
      window.fetch = function(resource, init) {
        // Only add retry logic for script/chunk requests
        var url = resource.url || resource;
        var isChunk = typeof url === 'string' && (
          url.includes('chunk') || 
          url.includes('.js') && url.includes('_next/static/')
        );
        
        if (!isChunk) {
          return originalFetch(resource, init);
        }
        
        // Create a retryable fetch for chunks
        return fetchWithRetry(resource, init, 0);
        
        function fetchWithRetry(resource, init, attempt) {
          return originalFetch(resource, init).catch(function(error) {
            if (attempt >= MAX_RETRIES) {
              throw error;
            }
            
            // Calculate delay with exponential backoff
            var delay = BASE_DELAY_MS * Math.pow(2, attempt);
            
            // Wait and retry fetch
            return new Promise(function(resolve) {
              setTimeout(function() {
                resolve(fetchWithRetry(resource, init, attempt + 1));
              }, delay);
            });
          });
        }
      };
    }
    
    console.log('[Chunk Error Handler] Successfully installed early chunk error handler');
  }
  
  function clearChunkCache(chunkId) {
    if (window.__webpack_require__ && window.__webpack_require__.c) {
      var moduleCache = window.__webpack_require__.c;
      
      // Look through the module cache for modules from this chunk
      for (var moduleId in moduleCache) {
        if (moduleId.includes(chunkId)) {
          delete moduleCache[moduleId];
        }
      }
    }
    
    // Also clear from webpack's internal chunk tracking
    if (window.__webpack_require__ && window.__webpack_require__.f && window.__webpack_require__.f.j) {
      // Mark the chunk as not loaded so webpack will try again
      window.__webpack_require__.f.j[chunkId] = 0;
    }
  }
  
  function reportChunkError(chunkId, error) {
    try {
      // Create error report
      var errorData = {
        chunkId: chunkId,
        message: error.message || 'Unknown chunk error',
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      
      // Try to send error using beacon API (non-blocking)
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/error-logging/chunk-error', JSON.stringify(errorData));
      } else if (window.fetch) {
        // Fallback to fetch with keepalive
        fetch('/api/error-logging/chunk-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData),
          keepalive: true,
          mode: 'no-cors'
        }).catch(function() {
          // Ignore fetch errors to avoid cascading issues
        });
      }
    } catch (e) {
      // Silent failure for telemetry
    }
  }
})(); 