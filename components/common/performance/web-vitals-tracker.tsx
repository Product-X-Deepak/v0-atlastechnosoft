"use client";

import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onINP, onTTFB, onFCP, Metric } from 'web-vitals';

// Define a type for the web-vitals functions
type WebVitalsFn = (onReport: (metric: Metric) => void, opts?: Record<string, unknown>) => (() => void) | undefined;

interface WebVitalsTrackerProps {
  /**
   * Whether to log metrics to console in development
   * @default false
   */
  debug?: boolean;
  
  /**
   * Custom function to handle the recorded metrics
   * For example, to send them to analytics
   */
  reportHandler?: (metric: Metric) => void;
}

/**
 * Tracks Core Web Vitals metrics for SEO performance monitoring
 * 
 * This component doesn't render anything visible
 */
export function WebVitalsTracker({ 
  debug = false,
  reportHandler,
}: WebVitalsTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isDevEnv = process.env.NODE_ENV === 'development';
    
    // Handle metrics reporting
    const handleMetric = (metric: Metric) => {
      // Log to console in development mode if debug is enabled
      if (isDevEnv && debug) {
        const color = getMetricDisplayColor(metric.name, metric.value);
        console.info(
          `%c Web Vital: ${metric.name} `,
          `background: ${color}; color: white; padding: 2px 6px; border-radius: 2px; font-weight: bold;`,
          `\n Value: ${metric.value.toFixed(2)}`,
          `\n ID: ${metric.id}`,
          `\n Navigation Type: ${metric.navigationType || 'N/A'}`
        );
      }
      
      // Send to custom handler if provided
      if (reportHandler) {
        reportHandler(metric);
      }
      
      // Check if performance API is available
      if (typeof window.performance?.mark === 'function') {
        try {
          // Mark the metric in Performance API
          window.performance.mark(`${metric.name}-${metric.value.toFixed(2)}`);
        } catch {
          // Silently fail
        }
      }
    };
    
    // Start monitoring Web Vitals
    const metricsToTrack = [
      { fn: onCLS as WebVitalsFn, opts: {} },
      { fn: onFID as WebVitalsFn, opts: {} },
      { fn: onLCP as WebVitalsFn, opts: {} },
      { fn: onTTFB as WebVitalsFn, opts: {} },
      { fn: onFCP as WebVitalsFn, opts: {} },
      { fn: onINP as WebVitalsFn, opts: { reportAllChanges: false } }, // Only report final INP
    ];
    
    // Register all metrics
    const cleanups = metricsToTrack.map(({ fn, opts }) => 
      fn(handleMetric, opts)
    );
    
    // Cleanup function to unregister all metrics
    return () => {
      cleanups.forEach((cleanup) => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, [debug, reportHandler]);
  
  // This component doesn't render anything
  return null;
}

/**
 * Get display color for metric based on value
 */
function getMetricDisplayColor(name: string, value: number): string {
  // Thresholds based on Core Web Vitals
  // https://web.dev/vitals/
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? '#4caf50' : value <= 0.25 ? '#ff9800' : '#f44336';
    
    case 'FID':
      return value <= 100 ? '#4caf50' : value <= 300 ? '#ff9800' : '#f44336';
    
    case 'LCP':
      return value <= 2500 ? '#4caf50' : value <= 4000 ? '#ff9800' : '#f44336';
    
    case 'TTFB':
      return value <= 500 ? '#4caf50' : value <= 1000 ? '#ff9800' : '#f44336';
      
    case 'FCP':
      return value <= 1800 ? '#4caf50' : value <= 3000 ? '#ff9800' : '#f44336';
      
    case 'INP': 
      return value <= 200 ? '#4caf50' : value <= 500 ? '#ff9800' : '#f44336';
      
    default:
      return '#2196f3';
  }
}

/**
 * Hook to track Core Web Vitals metrics
 */
export function useWebVitals(options?: {
  debug?: boolean;
  reportHandler?: (metric: Metric) => void;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const { debug = false, reportHandler } = options || {};
    const isDevEnv = process.env.NODE_ENV === 'development';
    
    // Handle metrics reporting
    const handleMetric = (metric: Metric) => {
      // Log to console in development mode if debug is enabled
      if (isDevEnv && debug) {
        const color = getMetricDisplayColor(metric.name, metric.value);
        console.info(
          `%c Web Vital: ${metric.name} `,
          `background: ${color}; color: white; padding: 2px 6px; border-radius: 2px; font-weight: bold;`,
          `\n Value: ${metric.value.toFixed(2)}`
        );
      }
      
      // Send to custom handler if provided
      if (reportHandler) {
        reportHandler(metric);
      }
    };
    
    // Start monitoring Web Vitals
    const metricFns = [onCLS, onFID, onLCP, onTTFB, onFCP, onINP] as WebVitalsFn[];
    const cleanups = metricFns.map((fn) => fn(handleMetric));
    
    // Cleanup function to unregister all metrics
    return () => {
      cleanups.forEach((cleanup) => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, [options]);
} 