"use client"

import { useEffect, useState, useRef } from "react"
import { useInView, motion } from "framer-motion"
import { Suspense } from "react"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  delay?: number
  className?: string
  format?: (value: number) => string
  prefix?: string
  suffix?: string
}

function AnimatedCounter(props: AnimatedCounterProps) {
  const { from = 0, to, duration = 2, delay = 0, className, format, prefix = "", suffix = "" } = props
  const [count, setCount] = useState(from)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(nodeRef as React.RefObject<Element>, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    let start: number | null = null
    let animationFrameId = 0

    const startTimestamp = Date.now() + delay * 1000

    const step = (timestamp: number) => {
      if (Date.now() < startTimestamp) {
        animationFrameId = requestAnimationFrame(step)
        return
      }

      if (start === null) {
        start = timestamp
      }

      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const nextCount = Math.floor(from + progress * (to - from))

      setCount(nextCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(to)
        setHasAnimated(true)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, duration, from, to, delay, hasAnimated])

  const formattedValue = format ? format(count) : count.toString()

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function AnimatedCounterWrapper(props: AnimatedCounterProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <AnimatedCounter {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { AnimatedCounterWrapper as AnimatedCounter };
