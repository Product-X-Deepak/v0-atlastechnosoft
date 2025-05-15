"use client";

import { useEffect, memo, useRef } from 'react';

interface CriticalImagePreloaderProps {
  // Paths to critical images, in order of priority
  imagePaths: string[];
  // Whether to disable preloading on slow connections
  disableOnSlowConnection?: boolean;
  // Whether to show debug information
  debug?: boolean;
  // Optional priority levels for images
  priorityLevels?: Record<string, 'high' | 'medium' | 'low'>;
  // Whether to use resource hints alongside preloading
  useResourceHints?: boolean;
}

// Define the NetworkInformation interface
interface NetworkInformation {
  saveData: boolean;
  effectiveType: string;
  downlink: number;
}

// Replace the console.log with a conditional version that only runs in development
const logMessage = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

// Also ensure debug console.warn is properly conditioned
const logWarning = (message: string, shouldShow = true) => {
  if (process.env.NODE_ENV === 'development' && shouldShow) {
    console.warn(message);
  }
};

/**
 * Component that preloads critical images for better LCP performance
 * This is particularly useful for hero images and above-the-fold content
 * 
 * Enhanced for better Core Web Vitals and SEO performance
 */
export const CriticalImagePreloader = memo(function CriticalImagePreloader({
  imagePaths,
  disableOnSlowConnection = true,
  debug = false,
  priorityLevels = {},
  useResourceHints = true,
}: CriticalImagePreloaderProps) {
  // Use ref to track which images we've already loaded
  const loadedImages = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    // Skip if no image paths or window is not available
    if (!imagePaths.length || typeof window === 'undefined') return;
    
    // Check connection speed if needed
    let shouldPreload = true;
    let connectionQuality: 'high' | 'medium' | 'low' = 'high';
    
    if (disableOnSlowConnection && 'connection' in navigator) {
      const connection = navigator.connection as NetworkInformation;
      
      // Determine connection quality for adaptive loading
      if (['slow-2g', '2g'].includes(connection.effectiveType) || connection.downlink < 0.5) {
        connectionQuality = 'low';
      } else if (['3g'].includes(connection.effectiveType) || connection.downlink < 2) {
        connectionQuality = 'medium';
      }
      
      // Disable on save-data or very slow connections
      if (connection.saveData) {
        logMessage('🔄 Image preloading disabled: Save-Data mode enabled');
        shouldPreload = false;
      } else if (['slow-2g', '2g'].includes(connection.effectiveType)) {
        logMessage(`🔄 Image preloading disabled: Very slow connection (${connection.effectiveType})`);
        shouldPreload = false;
      } else if (connection.downlink < 0.5) {
        logMessage(`🔄 Image preloading disabled: Very low bandwidth (${connection.downlink}Mbps)`);
        shouldPreload = false;
      }
      
      // Report to analytics for tracking
      try {
        if (typeof window.performance?.mark === 'function') {
          window.performance.mark(`connection-quality-${connectionQuality}`);
        }
      } catch {
        // Silently fail if performance API fails
      }
    }
    
    if (!shouldPreload) return;
    
    // Function to preload a single image with enhanced error handling
    const preloadImage = (src: string): Promise<void> => {
      // Skip if already loaded
      if (loadedImages.current.has(src)) {
        return Promise.resolve();
      }
      
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Add fetchpriority if browser supports it
        if ('fetchPriority' in HTMLImageElement.prototype) {
          (img as any).fetchPriority = priorityLevels[src] || 'auto';
        }
        
        // Handle successful load
        img.onload = () => {
          logMessage(`✅ Preloaded: ${src}`);
          loadedImages.current.add(src);
          
          // Mark in Performance API for analytics
          try {
            if (typeof window.performance?.mark === 'function') {
              window.performance.mark(`img-loaded-${src.split('/').pop()}`);
            }
          } catch {
            // Silently fail if performance API fails
          }
          
          resolve();
        };
        
        // Handle load failure
        img.onerror = () => {
          logWarning(`❌ Failed to preload: ${src}`, debug);
          reject();
        };
        
        // Improve cache behavior
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;
      });
    };
    
    // Add resource hints if enabled
    if (useResourceHints && typeof document !== 'undefined') {
      // Add preload links to head for highest priority images
      imagePaths.slice(0, 2).forEach(src => {
        // Skip if we already have this preload link
        if (document.querySelector('link[rel="preload"][href="' + src + '"]')) {
          return;
        }
        
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = src;
        preloadLink.crossOrigin = 'anonymous';
        
        if (priorityLevels[src] === 'high') {
          preloadLink.setAttribute('fetchpriority', 'high');
        }
        
        document.head.appendChild(preloadLink);
      });
      
      // Add prefetch links for lower priority images
      if (connectionQuality === 'high') {
        imagePaths.slice(2, 6).forEach(src => {
          // Skip if we already have this prefetch link
          if (document.querySelector('link[rel="prefetch"][href="' + src + '"]')) {
            return;
          }
          
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.as = 'image';
          prefetchLink.href = src;
          prefetchLink.crossOrigin = 'anonymous';
          document.head.appendChild(prefetchLink);
        });
      }
    }
    
    // Categorize images based on priority or adaptive loading based on connection quality
    let highPriorityImages: string[] = [];
    let mediumPriorityImages: string[] = [];
    let lowPriorityImages: string[] = [];
    
    // Adaptive loading strategy based on connection quality
    if (connectionQuality === 'low') {
      // On slow connections, only load the most critical images
      highPriorityImages = imagePaths.slice(0, 1);
      mediumPriorityImages = imagePaths.slice(1, 2);
      lowPriorityImages = imagePaths.slice(2, 3); // Load fewer images on slow connections
    } else if (connectionQuality === 'medium') {
      highPriorityImages = imagePaths.slice(0, 2);
      mediumPriorityImages = imagePaths.slice(2, 4);
      lowPriorityImages = imagePaths.slice(4);
    } else {
      // On fast connections, load everything but still prioritize
      highPriorityImages = imagePaths.slice(0, 3);
      mediumPriorityImages = imagePaths.slice(3, 6);
      lowPriorityImages = imagePaths.slice(6);
    }
    
    // Helper to handle preloading with priority groups
    const preloadWithPriority = async () => {
      // Mark the start of preloading for performance measurement
      if (typeof window.performance?.mark === 'function') {
        window.performance.mark('critical-images-preload-start');
      }
      
      // Preload high priority images immediately (in parallel)
      if (highPriorityImages.length) {
        try {
          await Promise.all(highPriorityImages.map(src => preloadImage(src)));
          if (typeof window.performance?.mark === 'function') {
            window.performance.mark('high-priority-images-loaded');
          }
        } catch {
          // Continue even if some images fail
        }
      }
    
      // Use requestIdleCallback for medium priority images
      if (mediumPriorityImages.length && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
          Promise.all(mediumPriorityImages.map(src => preloadImage(src)))
            .catch(() => {}) // Ignore errors
            .finally(() => {
              if (typeof window.performance?.mark === 'function') {
                window.performance.mark('medium-priority-images-loaded');
              }
            });
        }, { timeout: 1000 });
      }
    };
    
    // Start preloading high and medium priority images
    preloadWithPriority();
    
    // Use Intersection Observer for low priority images
    if (lowPriorityImages.length && 'IntersectionObserver' in window) {
      // Wait until user has scrolled or after 3 seconds, whichever comes first
      let hasScrolled = false;
      
      // Listen for scroll
      const scrollHandler = () => {
        hasScrolled = true;
        window.removeEventListener('scroll', scrollHandler);
        
        // Preload remaining low priority images one by one
        let index = 0;
        const preloadNext = () => {
          if (index >= lowPriorityImages.length) return;
          
          const src = lowPriorityImages[index++];
          preloadImage(src)
            .catch(() => {}) // Ignore errors
            .finally(() => {
              // Continue with next image after a small delay
              setTimeout(preloadNext, 200);
            });
        };
        
        preloadNext();
      };
      
      window.addEventListener('scroll', scrollHandler, { passive: true });
      
      // Set fallback timer
      setTimeout(() => {
        if (!hasScrolled) {
          window.removeEventListener('scroll', scrollHandler);
          
          // If on a good connection, load a few low priority images
          if (connectionQuality !== 'low') {
            const imagesToLoad = connectionQuality === 'high' 
              ? lowPriorityImages 
              : lowPriorityImages.slice(0, 2);
              
            let index = 0;
            const preloadNext = () => {
              if (index >= imagesToLoad.length) return;
              
              const src = imagesToLoad[index++];
              preloadImage(src).catch(() => {});
              
              // Stagger loading
              if (index < imagesToLoad.length) {
                setTimeout(preloadNext, 300);
              }
            };
            
            preloadNext();
    }
        }
      }, 3000);
    }
    
    // Clean up function
    return () => {
      // Nothing to clean up for now
    };
  }, [imagePaths, disableOnSlowConnection, debug, priorityLevels, useResourceHints]);
  
  // This is a utility component that doesn't render anything
  return null;
});

export default CriticalImagePreloader; 