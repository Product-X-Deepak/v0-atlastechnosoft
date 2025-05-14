"use client"

import { useState, useRef, useEffect, useCallback, type MutableRefObject, type CSSProperties } from "react"
import { isClient } from "@/lib/utils"

interface ScrollState {
  scrollY: number
  direction: "up" | "down" | null
  isAtTop: boolean
  isAtBottom: boolean
  scrollPercentage: number
}

/**
 * Hook to track scroll position and direction
 */
export function useScroll(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
  })

  // Store the previous scroll position
  const prevScrollY = useRef(0)

  useEffect(() => {
    if (!isClient) {
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const direction = scrollY > prevScrollY.current ? "down" : "up"
      const isAtTop = scrollY <= 5

      // Calculate how far down the page has been scrolled
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY

      // Calculate how far down the page we've scrolled (as a percentage)
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100

      // Check if we're at the bottom
      const isAtBottom = scrollPercentage > 98

      // Update state
      setScrollState({
        scrollY,
        direction,
        isAtTop,
        isAtBottom,
        scrollPercentage,
      })

      // Store current position for next comparison
      prevScrollY.current = scrollY
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to initialize
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollState
}

/**
 * Hook to create a parallax scrolling effect
 */
export function useParallax(
  speed = 0.5,
  direction: "vertical" | "horizontal" = "vertical",
): { ref: MutableRefObject<HTMLElement | null>; style: CSSProperties } {
  const ref = useRef<HTMLElement | null>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  const handleScroll = useCallback(() => {
    const element = ref.current
    if (!element || !isClient) return

    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Check if element is in viewport
    if (rect.bottom < 0 || rect.top > viewportHeight) {
      return
    }

    // Calculate position based on element's position in viewport
    const scrollPosition = (rect.top - viewportHeight) * speed

    // Apply transform based on direction
    if (direction === "vertical") {
      setStyle({
        transform: `translate3d(0, ${scrollPosition}px, 0)`,
      })
    } else {
      setStyle({
        transform: `translate3d(${scrollPosition}px, 0, 0)`,
      })
    }
  }, [speed, direction])

  useEffect(() => {
    if (!isClient) return

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to initialize
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return { ref, style }
}

/**
 * Hook to create a sticky element effect when scrolling
 */
export function useSticky(threshold = 0): { ref: MutableRefObject<HTMLElement | null>; isSticky: boolean } {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const isCurrentlySticky = rect.top <= threshold

      setIsSticky(isCurrentlySticky)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to initialize
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return { ref, isSticky }
}

/**
 * Hook to animate values based on scroll position
 */
export function useScrollValue(
  startValue = 0,
  endValue = 100,
  options: {
    startScroll?: number // Percentage (0-100) of page where animation starts
    endScroll?: number // Percentage (0-100) of page where animation ends
    easing?: (t: number) => number // Easing function
  } = {},
): number {
  const [value, setValue] = useState(startValue)
  const { scrollPercentage } = useScroll()

  const {
    startScroll = 0,
    endScroll = 100,
    easing = (t) => t, // Linear by default
  } = options

  useEffect(() => {
    // Calculate where we are in the animation
    let progress = 0

    if (scrollPercentage <= startScroll) {
      progress = 0
    } else if (scrollPercentage >= endScroll) {
      progress = 1
    } else {
      // Calculate normalized progress (0 to 1)
      progress = (scrollPercentage - startScroll) / (endScroll - startScroll)
    }

    // Apply easing function
    const easedProgress = easing(progress)

    // Calculate current value
    const currentValue = startValue + (endValue - startValue) * easedProgress

    setValue(currentValue)
  }, [scrollPercentage, startValue, endValue, startScroll, endScroll, easing])

  return value
}
