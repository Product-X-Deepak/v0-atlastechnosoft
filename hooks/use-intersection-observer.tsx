"use client"

import { useState, useEffect, useRef, type MutableRefObject } from "react"
import { isClient } from "@/lib/utils"

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

type IntersectionObserverResult<T> = [boolean, MutableRefObject<T | null>]

/**
 * Custom hook that observes when an element enters or exists the viewport
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): IntersectionObserverResult<T> {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T | null>(null)
  const frozen = useRef(false)

  useEffect(() => {
    if (!isClient) {
      return
    }

    const currentElement = ref.current
    if (!currentElement) {
      return
    }

    // Skip if already frozen
    if (freezeOnceVisible && frozen.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyVisible = entry.isIntersecting

        // Update state with visibility
        setIsVisible(isCurrentlyVisible)

        // If freezeOnceVisible is enabled and element is visible, freeze it
        if (freezeOnceVisible && isCurrentlyVisible) {
          frozen.current = true
        }
      },
      { threshold, root, rootMargin },
    )

    observer.observe(currentElement)

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [isVisible, ref]
}

/**
 * Utility hook for lazy loading elements
 */
export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverProps = {},
): IntersectionObserverResult<T> {
  return useIntersectionObserver<T>({
    ...options,
    threshold: 0.01,
    rootMargin: "200px",
  })
}

/**
 * Utility hook for fade-in animations
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverProps = {},
): IntersectionObserverResult<T> {
  return useIntersectionObserver<T>({
    ...options,
    threshold: 0.01,
    rootMargin: "50px",
    freezeOnceVisible: true,
  })
}

/**
 * Hook for staggered animations of child elements
 */
export function useStaggeredChildren<T extends HTMLElement = HTMLElement>(
  _childCount: number, // Currently unused but kept for API compatibility
  baseDelay = 0.1,
  duration = 0.5,
): [boolean, MutableRefObject<T | null>, (index: number) => { delay: number; duration: number }] {
  const [isVisible, ref] = useIntersectionObserver<T>({
    threshold: 0.1,
    rootMargin: "50px",
    freezeOnceVisible: true,
  })

  const getAnimationProps = (index: number) => ({
    delay: baseDelay + index * 0.1,
    duration,
  })

  return [isVisible, ref, getAnimationProps]
}
