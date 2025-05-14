"use client"

import { useState, useEffect } from 'react'
import { debounce } from '@/lib/utils/helpers'
import { Suspense } from "react"

interface WebVitals {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

interface PerformanceMonitorProps {
  showInProduction?: boolean;
}

/**
 * Component that monitors and displays Core Web Vitals metrics
 * Only visible in development mode by default
 */
export function PerformanceMonitor(props: PerformanceMonitorProps) {
  return (
    <Suspense fallback={null}>
      <PerformanceMonitorContent {...props} />
    </Suspense>
  );
}

function PerformanceMonitorContent({ showInProduction = false }: PerformanceMonitorProps) {
  const [webVitals, setWebVitals] = useState<WebVitals>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  })
  
  const [isVisible, setIsVisible] = useState(false)
  
  // Don't show in production unless explicitly enabled
  const isDev = process.env.NODE_ENV === 'development'
  const shouldRender = isDev || showInProduction
  
  useEffect(() => {
    if (!shouldRender) return
    
    const measureWebVitals = () => {
      try {
        if (typeof window === 'undefined' || !('performance' in window)) return

        // Get TTFB
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const ttfb = navigationEntry ? Math.round(navigationEntry.responseStart) : null
        
        // Get FCP
        const paintEntries = performance.getEntriesByType('paint')
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
        const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : null
        
        // Update with the metrics we can get immediately
        setWebVitals(prev => ({
          ...prev,
          fcp,
          ttfb,
        }))
        
        // Set up observers for other metrics that come later
        
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver(entryList => {
            const entries = entryList.getEntries()
            const lastEntry = entries[entries.length - 1]
            const lcp = Math.round(lastEntry.startTime)
            
            setWebVitals(prev => ({
              ...prev,
              lcp,
            }))
          })
          
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
          
          // First Input Delay
          const fidObserver = new PerformanceObserver(entryList => {
            const entries = entryList.getEntries()
            // First input entries have processingStart and startTime properties
            if (entries.length > 0) {
              const firstEntry = entries[0] as PerformanceEventTiming
              const fid = Math.round(firstEntry.processingStart - firstEntry.startTime)
              
              setWebVitals(prev => ({
                ...prev,
                fid,
              }))
            }
          })
          
          fidObserver.observe({ type: 'first-input', buffered: true })
          
          // Cumulative Layout Shift
          let clsValue = 0
          const clsObserver = new PerformanceObserver(entryList => {
            for (const entry of entryList.getEntries()) {
              // Layout shift entries have 'hadRecentInput' and 'value' properties
              const layoutShiftEntry = entry as PerformanceEntry & { 
                hadRecentInput: boolean; 
                value: number; 
              }
              
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value
                
                setWebVitals(prev => ({
                  ...prev,
                  cls: parseFloat(clsValue.toFixed(3)),
                }))
              }
            }
          })
          
          clsObserver.observe({ type: 'layout-shift', buffered: true })
          
          // Clean up observers on unmount
          return () => {
            lcpObserver.disconnect()
            fidObserver.disconnect()
            clsObserver.disconnect()
          }
        }
      } catch (error) {
        console.error('Error measuring performance metrics:', error)
      }
    }
    
    // Debounce the measurement to avoid blocking the main thread
    const debouncedMeasure = debounce(measureWebVitals, 500)
    debouncedMeasure()
    
    // Toggle visibility with Alt+P key combo
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        setIsVisible(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shouldRender])
  
  if (!shouldRender || !isVisible) return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4 z-50 text-xs font-mono">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Performance Metrics</h3>
        <button 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="pr-4">TTFB:</td>
            <td className={getMetricColorClass('ttfb', webVitals.ttfb)}>
              {webVitals.ttfb !== null ? `${webVitals.ttfb}ms` : 'Measuring...'}
            </td>
          </tr>
          <tr>
            <td className="pr-4">FCP:</td>
            <td className={getMetricColorClass('fcp', webVitals.fcp)}>
              {webVitals.fcp !== null ? `${webVitals.fcp}ms` : 'Measuring...'}
            </td>
          </tr>
          <tr>
            <td className="pr-4">LCP:</td>
            <td className={getMetricColorClass('lcp', webVitals.lcp)}>
              {webVitals.lcp !== null ? `${webVitals.lcp}ms` : 'Measuring...'}
            </td>
          </tr>
          <tr>
            <td className="pr-4">FID:</td>
            <td className={getMetricColorClass('fid', webVitals.fid)}>
              {webVitals.fid !== null ? `${webVitals.fid}ms` : 'Waiting...'}
            </td>
          </tr>
          <tr>
            <td className="pr-4">CLS:</td>
            <td className={getMetricColorClass('cls', webVitals.cls)}>
              {webVitals.cls !== null ? webVitals.cls : 'Measuring...'}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-2 text-[10px] text-muted-foreground">
        Press Alt+P to toggle visibility
      </div>
    </div>
  )
}

/**
 * Helper to get color class based on metric value
 */
function getMetricColorClass(metric: keyof WebVitals, value: number | null): string {
  if (value === null) return 'text-muted-foreground'
  
  // Thresholds based on Core Web Vitals
  const thresholds = {
    fcp: { good: 1800, needsImprovement: 3000 }, // ms
    lcp: { good: 2500, needsImprovement: 4000 }, // ms
    cls: { good: 0.1, needsImprovement: 0.25 }, // score
    fid: { good: 100, needsImprovement: 300 }, // ms
    ttfb: { good: 800, needsImprovement: 1800 }, // ms
  }
  
  const metricThresholds = thresholds[metric]
  
  if (value <= metricThresholds.good) {
    return 'text-green-500'
  } else if (value <= metricThresholds.needsImprovement) {
    return 'text-amber-500'
  } else {
    return 'text-red-500'
  }
}
