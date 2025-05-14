"use client";

import { usePathname,useSearchParams } from 'next/navigation';
import { useEffect,useRef } from 'react';
import { WebVitalsTracker } from './web-vitals-tracker';
import { Metric } from 'web-vitals';

interface PerformanceProviderProps {
  /**
   * Whether to track Core Web Vitals
   * @default true
   */
  trackWebVitals?: boolean;
  
  /**
   * Whether to log performance metrics to console
   * @default false
   */
  debug?: boolean;
  
  /**
   * URL of the analytics endpoint to send data to
   */
  analyticsEndpoint?: string;
  
  /**
   * Children components to render
   */
  children: React.ReactNode;
}

/**
 * Helper function to detect device type
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const ua = navigator.userAgent;
  
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return 'mobile';
  }
  
  if (/iPad|Tablet|PlayBook/i.test(ua)) {
    return 'tablet';
  }
  
  return 'desktop';
}

/**
 * Helper function to add resource hints to the document
 */
function addResourceHint(
  rel: 'preload' | 'prefetch' | 'preconnect', 
  href: string, 
  as?: string,
  options: {
    crossOrigin?: 'anonymous' | 'use-credentials';
    media?: string;
    type?: string;
  } = {}
) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  
  if (as) {
    link.as = as;
  }
  
  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }
  
  if (options.media) {
    link.media = options.media;
  }
  
  if (options.type) {
    link.type = options.type;
  }
  
  // Add custom attribute to identify this link for cleanup
  link.setAttribute('data-route-hint', 'true');
  
  document.head.appendChild(link);
}

/**
 * Provides performance optimization and tracking for the application
 * - Tracks Core Web Vitals
 * - Sends performance data to analytics
 * - Implements resource hints for better performance
 */
export function PerformanceProvider({
  trackWebVitals = true,
  debug = false,
  analyticsEndpoint,
  children,
}: PerformanceProviderProps) {
  // Track route changes to implement route-based optimizations
  const pathname = usePathname() || '';
  const searchParams = useSearchParams();
  const prevPathRef = useRef<string | null>(null);
  
  // Parse search params to string
  const searchParamsString = searchParams?.toString();
  const _url = searchParamsString ? `${pathname}?${searchParamsString}` : pathname;
  
  // Handle sending metrics to analytics
  const handleWebVitalsReport = (metric: Metric) => {
    if (!analyticsEndpoint) return;
    
    // Add additional data before sending
    const body = {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      page: pathname,
      href: window.location.href,
      eventTime: Date.now(),
      userAgent: window.navigator.userAgent,
      networkInfo: 'connection' in navigator 
        ? {
            effectiveType: (navigator as any).connection?.effectiveType,
            downlink: (navigator as any).connection?.downlink,
            rtt: (navigator as any).connection?.rtt,
            saveData: (navigator as any).connection?.saveData,
          }
        : undefined,
      deviceType: getDeviceType(),
    };
    
    // Use beacon API if available, otherwise fetch
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        navigator.sendBeacon(analyticsEndpoint, blob);
      } else {
        fetch(analyticsEndpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
          // Use keepalive to ensure the request completes even if the page is unloaded
          keepalive: true,
        });
      }
    } catch (error) {
      // Silently fail to avoid breaking the app
      if (debug) {
        console.error('Failed to send performance data:', error);
      }
    }
  };
  
  // Apply route-specific performance optimizations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Skip for same route renders (e.g. search params changes)
    if (prevPathRef.current === pathname) return;
    
    prevPathRef.current = pathname;
    
    // Mark route change in performance timeline
    if (typeof window.performance?.mark === 'function') {
      try {
        // Clear previous marks/measures to avoid memory leaks
        window.performance.clearMarks('route-change-start');
        window.performance.clearMarks('route-change-complete');
        
        // Mark the route change
        window.performance.mark('route-change-start');
        
        // Wait for the next frame to mark completion
        requestAnimationFrame(() => {
          window.performance.mark('route-change-complete');
          window.performance.measure(
            'route-change-duration',
            'route-change-start',
            'route-change-complete'
          );
        });
      } catch {
        // Silently fail
      }
    }
    
    // Reset scroll position on page changes
    if ('scrollTo' in window) {
      window.scrollTo(0, 0);
    }
    
    // Add route-specific resource hints
    // This is useful for preloading resources that will be needed on this route
    try {
      // Clean up any previous resource hints
      document.querySelectorAll('link[data-route-hint]').forEach(el => el.remove());
      
      // Add new resource hints based on the current route
      // For example, preload critical images or scripts for specific pages
      if (pathname.includes('/about')) {
        addResourceHint('preload', '/images/about-hero.jpg', 'image');
      } else if (pathname.includes('/contact')) {
        addResourceHint('preload', '/images/contact-hero.jpg', 'image');
      } else if (pathname.includes('/blog')) {
        addResourceHint('preload', '/images/blog-hero.jpg', 'image');
      }
    } catch {
      // Silently fail
    }
  }, [pathname]);
  
  return (
    <>
      {/* Track Core Web Vitals if enabled */}
      {trackWebVitals && (
        <WebVitalsTracker 
          debug={debug} 
          reportHandler={analyticsEndpoint ? handleWebVitalsReport : undefined} 
        />
      )}
      
      {/* Render children */}
      {children}
    </>
  );
} 
