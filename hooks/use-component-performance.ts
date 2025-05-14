"use client"

import { useRef, useEffect } from 'react'

type PerformanceConfig = {
  /**
   * Component name to identify in performance logs
   */
  componentName: string
  
  /**
   * Whether to log performance metrics to console
   * @default false in production, true in development
   */
  enableLogging?: boolean
  
  /**
   * Threshold in milliseconds after which to warn about slow rendering
   * @default 16 (approximately 60fps)
   */
  renderTimeThreshold?: number
  
  /**
   * Whether to report metrics to an analytics service in production
   * @default false
   */
  reportToAnalytics?: boolean
  
  /**
   * Custom function to call when performance metrics are available
   */
  onPerformanceData?: (data: {
    componentName: string
    renderTime: number
    mountTime: number
    isSlowRender: boolean
  }) => void
}

/**
 * Hook to measure React component rendering and mounting performance
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   useComponentPerformance({ componentName: 'MyComponent' });
 *   // Component code...
 * }
 * ```
 */
export function useComponentPerformance({
  componentName,
  enableLogging = process.env.NODE_ENV !== 'production',
  renderTimeThreshold = 16, // ~60fps
  reportToAnalytics = false,
  onPerformanceData
}: PerformanceConfig) {
  // Store render start time
  const renderStartTime = useRef<number>(performance.now())
  
  // Store mount start time
  const mountStartTime = useRef<number>(performance.now())
  
  // Track if component is already mounted
  const isMounted = useRef(false)
  
  // First render/mount measurement
  useEffect(() => {
    // Get current time to measure mount duration
    const mountEndTime = performance.now()
    const mountDuration = mountEndTime - mountStartTime.current
    
    // Calculate the render time (time from render start to commit)
    const renderDuration = mountEndTime - renderStartTime.current
    
    // Check if render was slow
    const isSlowRender = renderDuration > renderTimeThreshold
    
    // Store the performance data
    const perfData = {
      componentName,
      renderTime: renderDuration,
      mountTime: mountDuration,
      isSlowRender,
    }
    
    // Call the custom handler if provided
    if (onPerformanceData) {
      onPerformanceData(perfData)
    }
    
    // Log performance info if enabled
    if (enableLogging) {
      if (isSlowRender) {
        console.warn(
          `🐢 Slow render detected [${componentName}]: ${renderDuration.toFixed(2)}ms ` +
          `(threshold: ${renderTimeThreshold}ms)`
        )
      } else {
        console.info(
          `⚡️ [${componentName}] Render: ${renderDuration.toFixed(2)}ms, ` +
          `Mount: ${mountDuration.toFixed(2)}ms`
        )
      }
    }
    
    // Report to analytics in production if enabled
    if (process.env.NODE_ENV === 'production' && reportToAnalytics) {
      try {
        // This is where you would send the data to your analytics service
        // For example using navigator.sendBeacon for non-blocking reporting
        if (isSlowRender && navigator.sendBeacon) {
          const analyticsEndpoint = '/api/performance-metrics'
          
          navigator.sendBeacon(
            analyticsEndpoint,
            JSON.stringify({
              component: componentName,
              renderTime: renderDuration,
              mountTime: mountDuration,
              timestamp: new Date().toISOString(),
              url: window.location.pathname,
            })
          )
        }
      } catch {
        // Silently catch errors to prevent app crashes
      }
    }
    
    // Mark component as mounted
    isMounted.current = true
    
    // Cleanup function is empty since we only need to measure first mount
  }, [componentName, enableLogging, renderTimeThreshold, reportToAnalytics, onPerformanceData])
  
  // Measure re-renders
  // Reset the render start time before each render
  renderStartTime.current = performance.now()
  
  return null
}

/**
 * Wrapper hook for measuring React.memo component performance
 */
export function useMemoizedComponentPerformance(config: PerformanceConfig) {
  return useComponentPerformance({
    ...config,
    componentName: `${config.componentName} (memoized)`
  })
}

export default useComponentPerformance 