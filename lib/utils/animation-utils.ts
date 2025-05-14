"use client"

import type React from "react"

/**
 * Animation Utilities
 *
 * Enhanced animation utilities for Atlas Technosoft website
 */

import { useEffect, useState, useRef } from "react"
import { prefersReducedMotion } from "./accessibility-utils"

/**
 * Easing functions
 */
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t: number) =>
    t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 10 * (2 * t - 1)) / 2 : (2 - Math.pow(2, -10 * (2 * t - 1))) / 2,
  easeInBack: (t: number) => {
    const s = 1.70158
    return t * t * ((s + 1) * t - s)
  },
  easeOutBack: (t: number) => {
    const s = 1.70158
    return --t * t * ((s + 1) * t + s) + 1
  },
  easeInOutBack: (t: number) => {
    const s = 1.70158 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((s + 1) * 2 * t - s)) / 2
      : (Math.pow(2 * t - 2, 2) * ((s + 1) * (t * 2 - 2) + s) + 2) / 2
  },
}

/**
 * Animate a value over time
 *
 * @param from Starting value
 * @param to Ending value
 * @param duration Duration in milliseconds
 * @param easing Easing function
 * @param onUpdate Callback for each update
 * @param onComplete Callback when animation completes
 * @returns Cleanup function
 */
export function animate(
  from: number,
  to: number,
  duration: number,
  easing: (t: number) => number,
  onUpdate: (value: number) => void,
  onComplete?: () => void,
): () => void {
  if (prefersReducedMotion()) {
    // Skip animation for users who prefer reduced motion
    onUpdate(to)
    if (onComplete) onComplete()
    return () => {}
  }

  const startTime = performance.now()
  let animationFrame: number

  const animateFrame = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const easedProgress = easing(progress)
    const value = from + (to - from) * easedProgress

    onUpdate(value)

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animateFrame)
    } else {
      if (onComplete) onComplete()
    }
  }

  animationFrame = requestAnimationFrame(animateFrame)

  return () => {
    cancelAnimationFrame(animationFrame)
  }
}

/**
 * Custom hook for animating a value
 *
 * @param initialValue Initial value
 * @param options Animation options
 * @returns [currentValue, animateTo]
 */
export function useAnimatedValue(
  initialValue: number,
  options: {
    duration?: number
    easing?: (t: number) => number
  } = {},
): [number, (to: number, callback?: () => void) => void] {
  const [value, setValue] = useState(initialValue)
  const animationRef = useRef<number | null>(null)
  const callbackRef = useRef<(() => void) | null>(null)

  const animateTo = (to: number, callback?: () => void) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    callbackRef.current = callback || null

    if (prefersReducedMotion()) {
      // Skip animation for users who prefer reduced motion
      setValue(to)
      if (callback) callback()
      return
    }

    const startTime = performance.now()
    const startValue = value
    const duration = options.duration || 300
    const easingFn = options.easing || easings.easeOutQuad

    const animateFrame = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easedProgress = easingFn(progress)
      const newValue = startValue + (to - startValue) * easedProgress

      setValue(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFrame)
      } else {
        animationRef.current = null
        if (callbackRef.current) {
          callbackRef.current()
          callbackRef.current = null
        }
      }
    }

    animationRef.current = requestAnimationFrame(animateFrame)
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return [value, animateTo]
}

/**
 * Custom hook for spring animation
 *
 * @param initialValue Initial value
 * @param options Spring options
 * @returns [currentValue, setTargetValue]
 */
export function useSpring(
  initialValue: number,
  options: {
    stiffness?: number
    damping?: number
    precision?: number
  } = {},
): [number, (target: number) => void] {
  const [value, setValue] = useState(initialValue)
  const [targetValue, setTargetValue] = useState(initialValue)

  const velocityRef = useRef(0)
  const frameRef = useRef<number | null>(null)

  const { stiffness = 0.1, damping = 0.8, precision = 0.01 } = options

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Skip animation for users who prefer reduced motion
      setValue(targetValue)
      return
    }

    const animate = () => {
      // Spring physics
      const force = stiffness * (targetValue - value)
      velocityRef.current = velocityRef.current * damping + force

      const nextValue = value + velocityRef.current

      // Check if we're close enough to stop
      if (Math.abs(nextValue - targetValue) < precision && Math.abs(velocityRef.current) < precision) {
        setValue(targetValue)
        velocityRef.current = 0
        frameRef.current = null
        return
      }

      setValue(nextValue)
      frameRef.current = requestAnimationFrame(animate)
    }

    if (value !== targetValue) {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value, targetValue, stiffness, damping, precision])

  return [value, setTargetValue]
}

/**
 * Custom hook for scroll-triggered animations
 *
 * @param options Intersection observer options
 * @returns [ref, isVisible]
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.1 },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, isVisible]
}

/**
 * Custom hook for staggered animations
 *
 * @param count Number of items
 * @param options Stagger options
 * @returns Array of boolean values indicating if each item should be visible
 */
export function useStaggeredAnimation(
  count: number,
  options: {
    delay?: number
    staggerDelay?: number
    threshold?: number
  } = {},
): [React.RefObject<HTMLElement | null>, boolean[]] {
  const ref = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(count).fill(false))

  const { delay = 0, staggerDelay = 100, threshold = 0.1 } = options

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animations
          const timers: NodeJS.Timeout[] = []

          for (let i = 0; i < count; i++) {
            const timer = setTimeout(
              () => {
                setVisibleItems((prev) => {
                  const next = [...prev]
                  next[i] = true
                  return next
                })
              },
              delay + i * staggerDelay,
            )

            timers.push(timer)
          }

          observer.disconnect()

          return () => {
            timers.forEach(clearTimeout)
          }
        }
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [count, delay, staggerDelay, threshold])

  return [ref, visibleItems]
}

const animationUtils = {
  easings,
  animate,
  useAnimatedValue,
  useSpring,
  useScrollAnimation,
  useStaggeredAnimation,
};

export default animationUtils;
