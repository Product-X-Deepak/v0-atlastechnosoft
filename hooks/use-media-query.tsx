"use client"

import { useState, useEffect } from "react"
import { isClient } from "@/lib/utils"

/**
 * Hook to check if a media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return
    }

    // Handle vendor prefixed versions
    if ('matchMedia' in window) {
      const prefixedMediaQueries = [
        window.matchMedia(query),
        // Handle various vendor prefixing
        (window as Window & { 
          msMatchMedia?: typeof window.matchMedia,
          webkitMatchMedia?: typeof window.matchMedia,
          mozMatchMedia?: typeof window.matchMedia,
          oMatchMedia?: typeof window.matchMedia 
        }).msMatchMedia?.(query),
        (window as Window & { 
          msMatchMedia?: typeof window.matchMedia,
          webkitMatchMedia?: typeof window.matchMedia,
          mozMatchMedia?: typeof window.matchMedia,
          oMatchMedia?: typeof window.matchMedia 
        }).webkitMatchMedia?.(query),
        (window as Window & { 
          msMatchMedia?: typeof window.matchMedia,
          webkitMatchMedia?: typeof window.matchMedia,
          mozMatchMedia?: typeof window.matchMedia,
          oMatchMedia?: typeof window.matchMedia 
        }).mozMatchMedia?.(query),
        (window as Window & { 
          msMatchMedia?: typeof window.matchMedia,
          webkitMatchMedia?: typeof window.matchMedia,
          mozMatchMedia?: typeof window.matchMedia,
          oMatchMedia?: typeof window.matchMedia 
        }).oMatchMedia?.(query),
      ].filter(Boolean);

      // Set initial value
      setMatches(prefixedMediaQueries.some(mq => mq?.matches || false))

      // Create listener function
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      // Add listener
      prefixedMediaQueries.forEach(mq => {
        if (mq) mq.addEventListener("change", listener)
      })

      // Clean up
      return () => {
        prefixedMediaQueries.forEach(mq => {
          if (mq) mq.removeEventListener("change", listener)
        })
      }
    }
  }, [query])

  return matches
}

/**
 * Predefined media queries for common breakpoints (using Tailwind defaults)
 */
export function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 639px)")
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const isDesktop = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)")
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)")

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isTabletOrMobile: isMobile || isTablet,
    isDesktopOrLarger: isDesktop || isLargeDesktop,
  }
}

/**
 * Hook to detect preferred color scheme
 */
export function useColorSchemePreference(): "light" | "dark" | "no-preference" {
  const prefersLight = useMediaQuery("(prefers-color-scheme: light)")
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  if (prefersLight) return "light"
  if (prefersDark) return "dark"
  return "no-preference"
}

/**
 * Hook to detect reduced motion preference
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}

/**
 * Hook to detect if the device is a touch device
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return
    }

    // Check for touch capability
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - vendor prefixed property
      navigator.msMaxTouchPoints > 0

    setIsTouch(isTouchDevice)
  }, [])

  return isTouch
}
