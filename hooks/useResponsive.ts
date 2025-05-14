"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  breakpoint: Breakpoint
  width: number
  height: number
}

const breakpointValues = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
}

export default function useResponsive(): ResponsiveState {
  // Default to desktop values for SSR
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    breakpoint: "lg",
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const calculateResponsiveState = (): ResponsiveState => {
      const width = window.innerWidth
      const height = window.innerHeight

      let breakpoint: Breakpoint = "xs"

      if (width >= breakpointValues["2xl"]) {
        breakpoint = "2xl"
      } else if (width >= breakpointValues.xl) {
        breakpoint = "xl"
      } else if (width >= breakpointValues.lg) {
        breakpoint = "lg"
      } else if (width >= breakpointValues.md) {
        breakpoint = "md"
      } else if (width >= breakpointValues.sm) {
        breakpoint = "sm"
      }

      return {
        isMobile: width < breakpointValues.md,
        isTablet: width >= breakpointValues.md && width < breakpointValues.lg,
        isDesktop: width >= breakpointValues.lg,
        isLargeDesktop: width >= breakpointValues.xl,
        breakpoint,
        width,
        height,
      }
    }

    // Set the initial state
    setState(calculateResponsiveState())

    // Add event listener for resize
    const handleResize = () => {
      setState(calculateResponsiveState())
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [])

  return state
}

// Helper to provide responsive values based on breakpoint
type ResponsiveValueMap<T> = {
  base?: T
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  "2xl"?: T
}

export function getResponsiveValue<T>(values: ResponsiveValueMap<T> | T, breakpoint: Breakpoint): T | undefined {
  if (typeof values !== "object" || values === null) {
    return values as T
  }

  const valueMap = values as ResponsiveValueMap<T>

  // Order of precedence: current breakpoint -> smaller breakpoints -> base
  switch (breakpoint) {
    case "2xl":
      return valueMap["2xl"] ?? valueMap.xl ?? valueMap.lg ?? valueMap.md ?? valueMap.sm ?? valueMap.xs ?? valueMap.base
    case "xl":
      return valueMap.xl ?? valueMap.lg ?? valueMap.md ?? valueMap.sm ?? valueMap.xs ?? valueMap.base
    case "lg":
      return valueMap.lg ?? valueMap.md ?? valueMap.sm ?? valueMap.xs ?? valueMap.base
    case "md":
      return valueMap.md ?? valueMap.sm ?? valueMap.xs ?? valueMap.base
    case "sm":
      return valueMap.sm ?? valueMap.xs ?? valueMap.base
    case "xs":
      return valueMap.xs ?? valueMap.base
    default:
      return valueMap.base
  }
}
