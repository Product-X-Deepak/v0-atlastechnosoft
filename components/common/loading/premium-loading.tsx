"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

interface PremiumLoadingProps {
  message?: string
  fullscreen?: boolean
  overlay?: boolean
  className?: string
  showLogo?: boolean
}

/**
 * A premium loading component with animations and customizable options
 * Optimized for performance with simplified animations
 */
function PremiumLoading({
  message = "Loading...",
  fullscreen = false,
  overlay = false,
  className = "",
  showLogo = true
}: PremiumLoadingProps) {
  const containerClasses = useMemo(() => `
    ${overlay ? "fixed inset-0 bg-background/80 backdrop-blur-md z-50" : ""}
    ${fullscreen ? "min-h-screen" : "min-h-[400px]"}
    flex flex-col items-center justify-center relative
    ${className}
  `, [overlay, fullscreen, className])

  return (
    <div className={containerClasses}>
      {/* Simplified background elements - reduced animations for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <motion.div 
          className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
      </div>

      {/* Loading card content - simplified for performance */}
      <motion.div 
        className="relative bg-background/70 border border-border/50 shadow-lg rounded-2xl p-8 backdrop-blur-md max-w-md mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Logo and brand - simplified */}
          {showLogo && (
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">AT</span>
              </div>
            </div>
          )}

          {/* Loading title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {message}
            </h2>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              We&apos;re preparing something amazing for you...
            </p>
          </div>

          {/* Simplified loading animation */}
          <div className="relative flex items-center justify-center h-8 w-full">
            <Loader2 className="h-6 w-6 text-primary animate-spin opacity-70" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/**
 * A simpler inline loading component for use within content areas
 */
export function InlineLoading({ 
  className = "",
  message = "Loading..." 
}: { 
  className?: string,
  message?: string 
}) {
  return (
    <div className={`flex items-center justify-center space-x-3 p-4 ${className}`}>
      <Loader2 className="h-4 w-4 text-primary animate-spin" />
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  )
}

/**
 * A button loading spinner component
 */
export function ButtonLoading({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PremiumLoadingWrapper(props: PremiumLoadingProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PremiumLoading {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PremiumLoadingWrapper as PremiumLoading };