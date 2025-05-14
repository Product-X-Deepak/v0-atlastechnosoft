"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, MotionValue } from "framer-motion"
import { Suspense } from "react"

function ScrollProgress() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  
  const scrollYProgress = scrollY as unknown as MotionValue<number>
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    // Reduce the measurement frequency to improve performance
    restSpeed: 0.005,
  })

  // Delay mounting until after hydration to prevent SSR issues
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 200)
    
    return () => clearTimeout(timeout)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[1000] opacity-80"
      style={{ scaleX, willChange: "transform" }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgress

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ScrollProgressWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ScrollProgress {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ScrollProgressWrapper as ScrollProgress };