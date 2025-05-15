/**
 * Performance Utilities
 * Collection of utility functions for improving application performance
 */

import { useEffect, useCallback, useState, useRef } from 'react';

// Configure default options
const DEFAULT_THROTTLE_MS = 100;
const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_DEFER_MS = 20;
const IMAGE_LOAD_TIMEOUT = 10000; // 10 seconds timeout for images

/**
 * Utility function for logging only in development
 */
const logDev = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...args);
  }
};

/**
 * Utility function for warnings only in development
 */
const warnDev = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(message, ...args);
  }
};

/**
 * Initializes performance monitoring for the application
 */
export function initPerformanceMonitoring(): void {
  if (typeof window !== 'undefined') {
    // Add mark at the start for measuring total page load time
    performance.mark('app_start');
    
    // Listen for the window load event to measure full page load time
    window.addEventListener('load', () => {
      performance.mark('app_loaded');
      performance.measure('app_load_time', 'app_start', 'app_loaded');
      
      const loadTime = performance.getEntriesByName('app_load_time')[0]?.duration || 0;
      
      // Log in development for debugging
      if (process.env.NODE_ENV === 'development') {
        logDev(`📊 App loaded in ${Math.round(loadTime)}ms`);
      }
      
      // Report to analytics in production
      if (process.env.NODE_ENV === 'production') {
        try {
          const loadData = {
            metric: 'app_load_time',
            value: Math.round(loadTime),
            url: window.location.href,
          };
          
          // Use non-blocking reporting method
          if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/performance-metrics', JSON.stringify(loadData));
          } else {
            fetch('/api/performance-metrics', {
              method: 'POST',
              keepalive: true,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(loadData)
            }).catch(() => {
              // Silently handle errors
            });
          }
        } catch {
          // Silently catch errors to prevent app crashes
        }
      }
    }, { once: true });
    
    // Setup MutationObserver to detect layout shifts
    setupLayoutShiftDetection();
  }
}

/**
 * Setup detection for layout shifts to identify CLS issues
 */
function setupLayoutShiftDetection(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }
  
  try {
    // Track significant layout shifts for debugging
    let cumulativeLayoutShift = 0;
    
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!('hadRecentInput' in entry)) continue;
        if ((entry as PerformanceEntry & { hadRecentInput: boolean; value: number }).hadRecentInput) continue;
        
        // Use double type assertion with unknown as intermediate step
        const layoutShiftEntry = entry as unknown as PerformanceEntry & { value: number };
        const score = layoutShiftEntry.value || 0;
        cumulativeLayoutShift += score;
        
        // Log significant individual shifts in development only
        if (process.env.NODE_ENV === 'development' && score > 0.05) {
          warnDev(`💥 Layout shift detected: ${score.toFixed(4)}`);
          logDev('Total CLS:', cumulativeLayoutShift.toFixed(4));
        }
      }
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Silently catch errors to prevent app crashes
  }
}

/**
 * Throttle function to limit how often a function can be called
 * @param fn The function to throttle
 * @param delay The delay in milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = DEFAULT_THROTTLE_MS
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = DEFAULT_DEBOUNCE_MS
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Defers non-critical task to optimize initial loading
 * @param fn The function to execute later
 * @param delay Optional delay in milliseconds
 */
export function deferNonCriticalTask(
  fn: () => void,
  delay: number = DEFAULT_DEFER_MS
): void {
  if (typeof window === 'undefined') return;
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => fn(), { timeout: delay + 1000 });
  } else {
    setTimeout(fn, delay);
  }
}

/**
 * Sets up optimized image loading for better performance
 */
export function setupOptimizedImageLoading(): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Setup image failure detection
    window.addEventListener('error', function(event) {
      const target = event.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        handleImageError(target);
        
        // Prevent default error handling for images only
        if (event.target instanceof HTMLImageElement) {
          event.preventDefault();
        }
      }
    }, true);
    
    // Set up timeout for slow-loading images
    setupImageLoadingTimeout();
    
    // Prioritize above-the-fold images
    prioritizeVisibleImages();
    
    // Prefetch critical images that are referenced in data-prefetch attributes
    const prefetchSelectors = document.querySelectorAll('[data-prefetch-images]');
    prefetchSelectors.forEach(el => {
      try {
        const imagesToPrefetch = el.getAttribute('data-prefetch-images')?.split(',') || [];
        if (imagesToPrefetch.length > 0) {
          import('@/lib/utils/helpers/image-utils').then(({ prefetchImages }) => {
            prefetchImages(imagesToPrefetch);
          }).catch(() => {
            // Silently fail if module cannot be loaded
          });
        }
      } catch {
        // Ignore errors in prefetching
      }
    });
  } catch {
    // Silently catch errors to prevent app crashes
  }
}

/**
 * Handles image loading errors with fallbacks
 * @param img The image element that failed to load
 */
function handleImageError(img: HTMLImageElement): void {
  // Skip if already handled or no src
  if (img.dataset.errorHandled || !img.src) return;
  
  // Mark as handled to prevent infinite loops
  img.dataset.errorHandled = 'true';
  
  // Try a fallback if available
  if (img.dataset.fallback) {
    img.src = img.dataset.fallback;
  } else {
    // Apply default fallback styles
    img.alt = img.alt || 'Image failed to load';
    img.style.backgroundColor = '#f0f0f0';
    img.style.border = '1px solid #ddd';
    img.style.padding = '15px';
    img.style.display = 'flex';
    img.style.justifyContent = 'center';
    img.style.alignItems = 'center';
    
    // Add failure indicator via pseudo-elements if supported
    img.classList.add('image-load-failed');
  }
}

/**
 * Setup timeouts for slow-loading images to improve perceived performance
 */
function setupImageLoadingTimeout(): void {
  // Check all images that don't have loading="lazy"
  const criticalImages = document.querySelectorAll('img:not([loading="lazy"])');
  
  criticalImages.forEach(img => {
    const imgElement = img as HTMLImageElement;
    if (!imgElement.complete) {
      const timeoutId = setTimeout(() => {
        if (!imgElement.complete) {
          // If image is taking too long, set loading to lazy
          imgElement.loading = 'lazy';
          
          // Log image loading issues in development
          if (process.env.NODE_ENV === 'development') {
            warnDev(`🐢 Slow loading image detected: ${imgElement.src}`);
          }
        }
      }, IMAGE_LOAD_TIMEOUT);
      
      // Clear timeout once image is loaded
      imgElement.addEventListener('load', () => {
        clearTimeout(timeoutId);
      }, { once: true });
    }
  });
}

/**
 * Prioritize loading of images that are visible in the viewport
 */
function prioritizeVisibleImages(): void {
  // Use IntersectionObserver to detect visible images
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Set high priority for visible images
            if ('fetchPriority' in img) {
              (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'high';
            }
            
            // Add decoding attribute for better processing
            img.decoding = 'async';
            
            // Stop observing once prioritized
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );
    
    // Observe all images that don't have loading="lazy"
    document.querySelectorAll('img:not([loading="lazy"])').forEach(img => {
      observer.observe(img);
    });
  }
}

/**
 * Track component render performance
 * @param componentName Name of the component to track renders for
 */
export function useRenderPerformance(componentName: string): void {
  // Always initialize refs, regardless of environment
  const startTimeRef = useRef(performance.now());
  const renderCountRef = useRef(0);
  
  useEffect(() => {
    // Only execute the timing logic in development and browser environment
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
      return;
    }
    
    renderCountRef.current += 1;
    const duration = performance.now() - startTimeRef.current;
    
    // Log performance info - only in development
    logDev(`⏱️ ${componentName} rendered in ${Math.round(duration)}ms`);
    
    // Reset timer for next render
    startTimeRef.current = performance.now();
    
    // Report if this is a particularly slow render
    if (duration > 50) {
      warnDev(`⚠️ Slow render detected in ${componentName}: ${Math.round(duration)}ms`);
    }
  }, [componentName]); // Add componentName as dependency
}

/**
 * React hook for performance-optimized window resize handling
 * @param callback Function to call when window is resized
 * @param delay Debounce delay in ms
 */
export function useWindowResize<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = DEFAULT_DEBOUNCE_MS
): void {
  // Create debounced function inline within the hook
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Create a fresh debounced function each time
      const debouncedFn = debounce(callback, delay);
      return debouncedFn(...args);
    },
    [callback, delay]
  );
  
  useEffect(() => {
    // Use type assertion with unknown as intermediate step
    window.addEventListener('resize', debouncedCallback as unknown as EventListener);
    
    return () => {
      window.removeEventListener('resize', debouncedCallback as unknown as EventListener);
    };
  }, [debouncedCallback]);
}

/**
 * React hook for tracking network status
 * @returns Object with online status and connection info
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  
  const [connectionInfo, setConnectionInfo] = useState<{
    effectiveType?: string;
    saveData?: boolean;
    downlink?: number;
  }>({});
  
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    
    const updateConnectionInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as Navigator & { 
          connection?: { 
            effectiveType: string; 
            saveData: boolean; 
            downlink: number; 
          } 
        }).connection;
        
        if (connection) {
          setConnectionInfo({
            effectiveType: connection.effectiveType,
            saveData: connection.saveData,
            downlink: connection.downlink,
          });
        }
      }
    };
    
    // Update initial states
    updateOnlineStatus();
    updateConnectionInfo();
    
    // Add event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Add connection change listener if available
    if ('connection' in navigator) {
      const typedNavigator = (navigator as Navigator & { 
        connection?: { 
          addEventListener: (event: string, listener: EventListener) => void;
          removeEventListener: (event: string, listener: EventListener) => void;
        } 
      });
      
      if (typedNavigator.connection) {
        typedNavigator.connection.addEventListener('change', updateConnectionInfo as unknown as EventListener);
      }
    }
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      
      if ('connection' in navigator) {
        const typedNavigator = (navigator as Navigator & { 
          connection?: { 
            addEventListener: (event: string, listener: EventListener) => void;
            removeEventListener: (event: string, listener: EventListener) => void;
          } 
        });
        
        if (typedNavigator.connection) {
          typedNavigator.connection.removeEventListener('change', updateConnectionInfo as unknown as EventListener);
        }
      }
    };
  }, []);
  
  return { isOnline, connectionInfo };
}

/**
 * React hook for intelligent data prefetching
 * @param urls Array of URLs to prefetch
 * @param options Configuration options
 */
export function usePrefetch(
  urls: string[],
  options: {
    delay?: number;
    threshold?: number;
    withCredentials?: boolean;
  } = {}
): void {
  const {
    delay = 2000,
    threshold = 0.1,
    withCredentials = false,
  } = options;
  
  // Keep track of what we've already prefetched
  const prefetchedUrls = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    // Skip if no URLs or browser doesn't support required features
    if (!urls.length || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    
    // Wait a bit after initial render to avoid competing with critical resources
    const timeoutId = setTimeout(() => {
      // Filter out already prefetched URLs
      const urlsToPrefetch = urls.filter(url => !prefetchedUrls.current.has(url));
      
      if (!urlsToPrefetch.length) return;
      
      // Use requestIdleCallback if available
      const prefetchTask = () => {
        // Detect idle periods and prefetch in chunks to avoid blocking
        urlsToPrefetch.forEach((url, index) => {
          setTimeout(() => {
            // Only prefetch if we're still online
            if (!navigator.onLine) return;
            
            // Mark as prefetched
            prefetchedUrls.current.add(url);
            
            // Determine if it's a JSON endpoint or a page
            const isApiEndpoint = url.includes('/api/') || url.endsWith('.json');
            
            if (isApiEndpoint) {
              // For API endpoints, just prefetch the data
              fetch(url, {
                method: 'GET',
                credentials: withCredentials ? 'include' : 'same-origin',
                headers: { 'Purpose': 'prefetch' },
              }).catch(() => {
                // Silently handle errors in prefetching
              });
            } else {
              // For page routes, use link prefetch
              const linkEl = document.createElement('link');
              linkEl.rel = 'prefetch';
              linkEl.href = url;
              linkEl.as = 'document';
              document.head.appendChild(linkEl);
            }
          }, index * 150); // Spread out requests
        });
      };
      
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(prefetchTask, { timeout: 2000 });
      } else {
        setTimeout(prefetchTask, 50);
      }
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [urls, delay, threshold, withCredentials]);
}

/**
 * Track number of renders for a component (development only)
 * @param componentName Name of the component to track renders for
 */
export function useTrackRenders(componentName: string): void {
  // Track number of renders
  const renders = useRef(0);
  
  useEffect(() => {
    // Increment render count
    renders.current += 1;
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      logDev(`🔄 ${componentName} rendered: ${renders.current} time(s)`);
      
      // Warn if excessive renders are detected
      if (renders.current > 5) {
        warnDev(`⚠️ Excessive re-renders detected in ${componentName}: ${renders.current} renders`);
      }
    }
  });
}

/**
 * Optimizes third-party scripts by adding async/defer and resource hints
 * @param scriptUrls Array of third-party script URLs to optimize
 */
export function optimizeThirdPartyScripts(scriptUrls: string[]): void {
  if (typeof window === 'undefined') return;
  
  deferNonCriticalTask(() => {
    scriptUrls.forEach(url => {
      // Add DNS prefetch for better performance
      const linkEl = document.createElement('link');
      linkEl.rel = 'dns-prefetch';
      linkEl.href = new URL(url).origin;
      document.head.appendChild(linkEl);
      
      // Find existing script tag if any
      const existingScript = document.querySelector(`script[src="${url}"]`);
      
      if (existingScript) {
        // Optimize existing script
        existingScript.setAttribute('async', '');
        existingScript.setAttribute('defer', '');
      }
    });
  }, 1000);
}
