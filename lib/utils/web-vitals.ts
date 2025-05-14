/**
 * Web Vitals & Performance Metrics Collection
 * Monitors and reports core web vitals and other performance metrics
 */
import type { 
  // Metric, - Removing unused import
  CLSMetric, 
  FIDMetric, 
  FCPMetric, 
  LCPMetric, 
  TTFBMetric,
  INPMetric
} from 'web-vitals';

type MetricName = 
  | 'CLS' 
  | 'FID' 
  | 'LCP' 
  | 'FCP' 
  | 'TTFB' 
  | 'INP'
  | 'NextHydration'
  | 'NextRender'
  | 'NextPaint';

type MetricRating = 'good' | 'needs-improvement' | 'poor';

interface MetricReport {
  name: MetricName;
  value: number;
  rating: MetricRating;
  delta?: number;
  id?: string;
  entries?: PerformanceEntry[];
  navigationType?: string;
}

interface ReportOptions {
  /** Path to API endpoint for reporting */
  endpoint?: string;
  
  /** Whether to debug metrics in console */
  debug?: boolean;
  
  /** Whether to use sendBeacon for non-blocking reports */
  useBeacon?: boolean;
  
  /** Custom metrics callback */
  onMetric?: (metric: MetricReport) => void;
}

/**
 * Reports a performance metric to the specified endpoint
 */
const reportMetric = async (
  metric: MetricReport, 
  options: ReportOptions = {}
): Promise<void> => {
  const {
    endpoint = '/api/performance-metrics',
    debug = false,
    useBeacon = true,
    onMetric
  } = options;

  // Call the custom handler if provided
  if (onMetric) {
    onMetric(metric);
  }

  // Log to console in debug mode (development only)
  if (debug) {
    logMetricInDevelopment(metric);
  }

  try {
    // Only report in production
    if (process.env.NODE_ENV !== 'production') return;

    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connectionType: (navigator as Navigator & { connection?: { effectiveType: string } }).connection?.effectiveType || 'unknown',
    });

    // Use sendBeacon for non-blocking reporting if available and requested
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      // Fallback to fetch
      fetch(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        // Use keepalive to ensure the request completes even if the page unloads
        keepalive: true,
      }).catch(() => {
        // Silently handle fetch errors
      });
    }
  } catch {
    // Silently catch errors to prevent app crashes
  }
};

/**
 * Get metric rating based on value and metric type
 */
const getMetricRating = (name: MetricName, value: number): MetricRating => {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FID':
    case 'INP':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    case 'NextHydration':
    case 'NextRender':
    case 'NextPaint':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    default:
      return 'needs-improvement';
  }
};

/**
 * Initializes web vitals collection
 */
export const initWebVitalsReporting = (options: ReportOptions = {}): void => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    // Import web-vitals library dynamically to reduce initial bundle size
    import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB, onINP }) => {
      // Cumulative Layout Shift
      onCLS((metric: CLSMetric) => {
        reportMetric({
          name: 'CLS',
          value: metric.value,
          rating: getMetricRating('CLS', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
        }, options);
      });

      // First Input Delay
      onFID((metric: FIDMetric) => {
        reportMetric({
          name: 'FID',
          value: metric.value,
          rating: getMetricRating('FID', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
        }, options);
      });

      // Largest Contentful Paint
      onLCP((metric: LCPMetric) => {
        reportMetric({
          name: 'LCP',
          value: metric.value,
          rating: getMetricRating('LCP', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
        }, options);
      });

      // First Contentful Paint
      onFCP((metric: FCPMetric) => {
        reportMetric({
          name: 'FCP',
          value: metric.value,
          rating: getMetricRating('FCP', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
        }, options);
      });

      // Time to First Byte
      onTTFB((metric: TTFBMetric) => {
        reportMetric({
          name: 'TTFB',
          value: metric.value,
          rating: getMetricRating('TTFB', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
          navigationType: metric.navigationType,
        }, options);
      });

      // Interaction to Next Paint (experimental)
      onINP((metric: INPMetric) => {
        reportMetric({
          name: 'INP',
          value: metric.value,
          rating: getMetricRating('INP', metric.value),
          delta: metric.delta,
          id: metric.id,
          entries: metric.entries as unknown as PerformanceEntry[],
        }, options);
      });
    });

    // Collect Next.js-specific metrics
    if (typeof window !== 'undefined') {
      const { onHydrated, onFinalRendered } = getNextJsMetrics();
      
      onHydrated((duration) => {
        reportMetric({
          name: 'NextHydration',
          value: duration,
          rating: getMetricRating('NextHydration', duration)
        }, options);
      });
      
      onFinalRendered((duration) => {
        reportMetric({
          name: 'NextRender',
          value: duration,
          rating: getMetricRating('NextRender', duration)
        }, options);
      });
    }
  } catch {
    // Silently catch errors to prevent app crashes
  }
};

/**
 * Helper to get Next.js specific metrics
 */
const getNextJsMetrics = () => {
  const callbacks = {
    hydration: [] as ((duration: number) => void)[],
    finalRendered: [] as ((duration: number) => void)[],
  };
  
  // Capture hydration time
  const startTime = Date.now();
  
  if (typeof window !== 'undefined') {
    // Use the Next.js router events to measure time to interactive
    const scriptEl = document.querySelector('#__NEXT_DATA__');
    if (scriptEl) {
      try {
        // Parse the Next.js data but don't need to use it directly
        JSON.parse(scriptEl.textContent || '{}');
        
        // Check for hydration complete
        const observer = new MutationObserver(() => {
          if (document.documentElement.hasAttribute('data-hydrated')) {
            const hydratedTime = Date.now() - startTime;
            callbacks.hydration.forEach(cb => cb(hydratedTime));
            observer.disconnect();
            
            // Wait for final render and all resources
            window.setTimeout(() => {
              if (document.readyState === 'complete') {
                const finalTime = Date.now() - startTime;
                callbacks.finalRendered.forEach(cb => cb(finalTime));
              } else {
                window.addEventListener('load', () => {
                  const finalTime = Date.now() - startTime;
                  callbacks.finalRendered.forEach(cb => cb(finalTime));
                }, { once: true });
              }
            }, 0);
          }
        });
        
        observer.observe(document.documentElement, { 
          attributes: true,
          attributeFilter: ['data-hydrated']
        });
      } catch {
        // Silently handle JSON parse errors
      }
    }
  }
  
  return {
    onHydrated: (callback: (duration: number) => void) => {
      callbacks.hydration.push(callback);
    },
    onFinalRendered: (callback: (duration: number) => void) => {
      callbacks.finalRendered.push(callback);
    }
  };
};

// Add debug logging function that only runs in development
const logMetricInDevelopment = (metric: MetricReport) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${metric.value}ms (${metric.rating})`);
  }
}; 