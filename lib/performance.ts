"use client"

/**
 * Performance Utilities
 *
 * Enhanced performance optimization utilities for Atlas Technosoft website
 */

import type React from "react"
import { useEffect, useState, useRef } from "react"

/**
 * Debounce function to limit the rate at which a function can fire
 *
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 *
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: NodeJS.Timeout
  let lastRan: number

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this as ThisParameterType<T>, args)
      lastRan = Date.now()
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this as ThisParameterType<T>, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

// Helper function to conditionally log based on environment
const isDev = process.env.NODE_ENV === 'development'

function devLog(message: string, ...args: unknown[]) {
  if (isDev) {
    console.log(message, ...args)
  }
}

/**
 * Measure component render time
 *
 * @param componentName Name of the component
 * @returns Cleanup function
 */
export function measureRenderTime(componentName: string): () => void {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    devLog(`[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`)
  }
}

/**
 * Lazy load images when they enter the viewport
 *
 * @param imageElement Image element
 * @param src Image source URL
 * @param options IntersectionObserver options
 */
export function lazyLoadImage(
  imageElement: HTMLImageElement,
  src: string,
  options: IntersectionObserverInit = { rootMargin: "200px" },
): void {
  if (!imageElement || !src) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imageElement.src = src

        // Add onload handler to remove blur placeholder
        imageElement.onload = () => {
          imageElement.style.opacity = "1"
          imageElement.style.filter = "none"
          imageElement.classList.add("loaded")
        }

        observer.disconnect()
      }
    })
  }, options)

  observer.observe(imageElement)
}

/**
 * Preload critical resources
 *
 * @param resources Array of resource URLs
 */
export function preloadCriticalResources(resources: string[]): void {
  if (typeof window === "undefined") return

  resources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = resource

    if (resource.endsWith(".js")) {
      link.as = "script"
    } else if (resource.endsWith(".css")) {
      link.as = "style"
    } else if (/\.(jpe?g|png|gif|svg|webp)$/i.test(resource)) {
      link.as = "image"
    } else if (/\.(woff2?|ttf|otf|eot)$/i.test(resource)) {
      link.as = "font"
      link.crossOrigin = "anonymous"
    }

    document.head.appendChild(link)
  })
}

/**
 * Measure and report Core Web Vitals
 */
export function measureWebVitals(): void {
  if (typeof window === "undefined" || !("performance" in window)) return

  // First Contentful Paint
  const paintEntries = performance.getEntriesByType("paint")
  const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint")
  if (fcp) {
    console.log(`[Web Vitals] FCP: ${fcp.startTime.toFixed(1)}ms`)
  }

  // Largest Contentful Paint
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcpValue = lastEntry.startTime
        console.log(`[Web Vitals] LCP: ${lcpValue.toFixed(1)}ms`)
      })

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Layout shift entries have a 'hadRecentInput' property
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        }
        console.log(`[Web Vitals] CLS: ${clsValue.toFixed(3)}`)
      })

      clsObserver.observe({ type: "layout-shift", buffered: true })

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // First input entries have processingStart and startTime properties
          const firstInputEntry = entry as PerformanceEntry & { processingStart: number; startTime: number }
          const fid = firstInputEntry.processingStart - firstInputEntry.startTime
          console.log(`[Web Vitals] FID: ${fid.toFixed(1)}ms`)
        }
      })

      fidObserver.observe({ type: "first-input", buffered: true })

      // Disconnect observers after 60 seconds
      setTimeout(() => {
        lcpObserver.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }, 60000)
    } catch (_unused) {
      console.error("[Web Vitals] Error measuring performance metrics:", _unused)
    }
  }
}

/**
 * Lazy load images that are off-screen
 */
export function lazyLoadImages(): void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          const src = image.dataset.src

          if (src) {
            image.src = src
            image.removeAttribute("data-src")

            // Add onload handler to remove blur placeholder
            image.onload = () => {
              image.style.opacity = "1"
              image.style.filter = "none"
              image.classList.add("loaded")
            }
          }

          imageObserver.unobserve(image)
        }
      })
    },
    {
      rootMargin: "200px",
    },
  )

  images.forEach((image) => imageObserver.observe(image))
}

/**
 * Defer non-critical JavaScript
 * 
 * @param scriptUrl URL of the script to defer
 * @param defer Whether to use defer attribute
 */
export function deferNonCriticalJS(scriptUrl: string, defer = true): void {
  if (typeof window === "undefined") return
  
  const script = document.createElement("script")
  script.src = scriptUrl
  script.defer = defer
  document.body.appendChild(script)
}

/**
 * Custom hook for lazy loading components
 *
 * @param factory Factory function that returns a promise resolving to a component
 * @returns Component or null if not loaded yet
 */
export function useLazyComponent<T>(factory: () => Promise<{ default: React.ComponentType<T> }>) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null)

  useEffect(() => {
    let mounted = true

    factory().then((module) => {
      if (mounted) {
        setComponent(() => module.default)
      }
    })

    return () => {
      mounted = false
    }
  }, [factory])

  return Component
}

/**
 * Custom hook for intersection observer
 * 
 * @param options IntersectionObserver options
 * @returns Tuple of [ref, isIntersecting]
 */
export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.1 },
): [React.RefObject<T>, boolean] {
  const ref = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref as React.RefObject<T>, isIntersecting]
}

/**
 * Custom hook for lazy loading images
 * 
 * @param src Image source URL
 * @param placeholder Placeholder image URL
 * @returns Tuple of [ref, isLoaded, currentSrc]
 */
export function useLazyImage(src: string, placeholder = ""): [React.RefObject<HTMLImageElement>, boolean, string] {
  const ref = useRef<HTMLImageElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(placeholder)

  useEffect(() => {
    if (!ref.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src)
          observer.disconnect()
          
          // Mark as loaded when the image is fully loaded
          if (ref.current) {
            ref.current.onload = () => {
              setIsLoaded(true)
            }
          }
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(ref.current)
    
    return () => {
      observer.disconnect()
    }
  }, [src])

  return [ref as React.RefObject<HTMLImageElement>, isLoaded, currentSrc]
}

/**
 * Utility to defer code execution for a specified time
 * 
 * @param ms Time to delay in milliseconds
 * @returns Promise that resolves after the specified time
 */
export function deferLoadingFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Export all utilities as a default object for convenience
const performanceUtils = {
  debounce,
  throttle,
  measureRenderTime,
  lazyLoadImage,
  preloadCriticalResources,
  measureWebVitals,
  lazyLoadImages,
  deferNonCriticalJS,
  useLazyComponent,
  useIntersectionObserver,
  useLazyImage,
  deferLoadingFor,
}

export default performanceUtils
