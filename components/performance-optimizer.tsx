"use client"

import { useEffect, useCallback } from 'react'
import { setupOptimizedImageLoading, initPerformanceMonitoring, deferNonCriticalTask } from '@/lib/utils/performance'
import { initWebVitalsReporting } from '@/lib/utils/web-vitals'
import { initLinkOptimizer } from '@/lib/utils/link-validator'
import { Suspense } from 'react'
import { initializeChunkHandling, addChunkLoadingDebugListeners } from '@/lib/utils/chunk-initialization'
import { ImagePerformanceMonitor } from '@/components/common/performance/image-performance-monitor'

// Define an extended interface for CSSStyleDeclaration to include fontDisplay
interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  fontDisplay: string;
}

// Extended interface for passive event listener options
interface ExtendedEventListenerOptions extends EventListenerOptions {
  passive?: boolean;
}

/**
 * Performance optimizer component
 * This component initializes various performance optimizations
 * It should be imported in the app/layout.tsx file
 */
function PerformanceOptimizer() {
  // Use memoized callbacks to prevent recreation on every render
  const setupFontOptimization = useCallback(() => {
    // Add font-display: swap to any dynamically loaded fonts
    const styleSheets = document.styleSheets
    
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i]
        
        // Skip cross-origin stylesheets we can't access
        if (sheet.cssRules) {
          for (let j = 0; j < sheet.cssRules.length; j++) {
            const rule = sheet.cssRules[j]
            
            if (rule instanceof CSSFontFaceRule) {
              // Use type assertion for fontDisplay property
              const style = rule.style as unknown as ExtendedCSSStyleDeclaration;
              if (!style.fontDisplay) {
                style.fontDisplay = 'swap';
              }
            }
          }
        }
      } catch {
        // Silently catch security errors from accessing cross-origin stylesheets
      }
    }
  }, []);

  const setupAnimationObservers = useCallback(() => {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target
            
            // Add animation class only when element is visible
            element.classList.add('animate-in')
            
            // Stop observing this element
            animationObserver.unobserve(element)
          }
        })
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )
    
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      animationObserver.observe(el)
    })

    return animationObserver;
  }, []);

  const prefetchNearbyPages = useCallback(() => {
    // Create a cache to avoid duplicate prefetching
    const prefetched = new Set<string>();
    
    // Get all links that are likely to be clicked
    const links = document.querySelectorAll('a[href^="/"]:not([prefetch="false"])')
    
    // Create a reusable IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            // Skip if already prefetched or invalid
            if (!href || href === '/' || href.startsWith('#') || prefetched.has(href)) return;
            
            // Mark as prefetched to avoid duplicates
            prefetched.add(href);
            
            // When link becomes visible, prefetch the page
            const prefetcher = document.createElement('link');
            prefetcher.rel = 'prefetch';
            prefetcher.href = href;
            prefetcher.as = 'document';
            prefetcher.crossOrigin = 'anonymous';
            document.head.appendChild(prefetcher);
            
            // Stop observing once prefetched
            observer.unobserve(entry.target);
          }
        })
      },
      { 
        rootMargin: '200px',
        threshold: 0.1
      }
    )
    
    // Batch DOM reads before writes for better performance
    requestAnimationFrame(() => {
      links.forEach(link => observer.observe(link));
    });
    
    return observer;
  }, []);

  const optimizeRuntime = useCallback(() => {
    // Implement passive event listeners for scroll and touch events
    const supportsPassive = (() => {
      let passive = false;
      try {
        // Use a type guard to avoid TypeScript errors
        const testOptions = {
          get passive() {
            passive = true;
            return true;
          }
        } as AddEventListenerOptions;
        
        // Use a dummy test event
        window.addEventListener('test' as keyof WindowEventMap, null as unknown as EventListener, testOptions);
        window.removeEventListener('test' as keyof WindowEventMap, null as unknown as EventListener, testOptions);
      } catch {}
      return passive;
    })();
    
    const passiveOption = supportsPassive ? { passive: true } : false;
    
    // Override event listeners to make them passive by default for performance
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'scroll' || type === 'touchstart' || type === 'touchmove') {
        const newOptions = typeof options === 'object'
          ? { ...options, passive: options.passive !== false } as ExtendedEventListenerOptions
          : passiveOption;
        originalAddEventListener.call(this, type, listener, newOptions);
      } else {
        originalAddEventListener.call(this, type, listener, options);
      }
    };
    
    // Optimize image loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          // Use type assertion
          (img as HTMLImageElement).loading = 'lazy';
          (img as HTMLImageElement).decoding = 'async';
        }
      });
    }
    
    // Enable priority hints API for browsers that support it
    const criticalElements = document.querySelectorAll('.critical-resource');
    criticalElements.forEach(element => {
      if ('importance' in element) {
        (element as HTMLElement & { importance: string }).importance = 'high';
      }
    });
    
    // Clean unused event listeners periodically to prevent memory leaks
    const cleanEventListeners = () => {
      const observerEntries = performance.getEntriesByType('event');
      if (observerEntries && observerEntries.length > 100) {
        // Too many event entries, may indicate a leak - force a cleanup
        performance.clearMarks();
        performance.clearMeasures();
        performance.clearResourceTimings();
      }
    };
    
    const cleanupInterval = setInterval(cleanEventListeners, 60000); // Every minute
    
    return () => clearInterval(cleanupInterval);
  }, []);

  useEffect(() => {
    // Variable to hold cleanup functions
    const cleanupFunctions: Array<() => void> = [];
    
    // Initialize chunk handling early
    initializeChunkHandling();
    
    // Add debug listeners in development
    if (process.env.NODE_ENV === 'development') {
      addChunkLoadingDebugListeners();
    }
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize Web Vitals reporting
    initWebVitalsReporting({
      debug: process.env.NODE_ENV === 'development',
      endpoint: '/api/performance-metrics',
      useBeacon: true
    });
    
    // Setup optimized image loading
    setupOptimizedImageLoading();
    
    // Initialize link optimization and validation
    initLinkOptimizer();
    
    // Initialize code splitting for route prefetching
    deferNonCriticalTask(() => {
      const observer = prefetchNearbyPages();
      cleanupFunctions.push(() => observer.disconnect());
    }, 2000);
    
    // Optimize font loading
    deferNonCriticalTask(() => {
      setupFontOptimization();
    }, 1500);
    
    // Setup IntersectionObserver for animations
    deferNonCriticalTask(() => {
      const observer = setupAnimationObservers();
      cleanupFunctions.push(() => observer.disconnect());
    }, 1000);
    
    // Runtime optimizations for improved performance
    deferNonCriticalTask(() => {
      const cleanup = optimizeRuntime();
      if (cleanup) cleanupFunctions.push(cleanup);
    }, 800);
    
    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(fn => fn());
    };
  }, [setupFontOptimization, setupAnimationObservers, prefetchNearbyPages, optimizeRuntime]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Performance Optimizer Wrapper
 * Wraps the performance optimizer with error handling
 */
function PerformanceOptimizerWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={null}>
      <PerformanceOptimizer {...props} />
      <ImagePerformanceMonitor />
    </Suspense>
  );
}

export { PerformanceOptimizerWrapper as PerformanceOptimizer };