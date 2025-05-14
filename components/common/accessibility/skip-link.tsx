"use client"

import { useEffect, useState } from "react"
import { Suspense } from "react"

interface SkipLinkProps {
  mainContentId?: string;
  label?: string;
}

/**
 * Skip link component for keyboard accessibility
 * 
 * This component allows keyboard users to skip navigation 
 * and go directly to the main content
 */
export function SkipLink({ mainContentId = "main-content", label = "Skip to main content" }: SkipLinkProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SkipLinkContent mainContentId={mainContentId} label={label} />
    </Suspense>
  );
}

function SkipLinkContent({ mainContentId, label }: SkipLinkProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Handle keyboard focus to show/hide the link
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show on Tab key press
      if (e.key === "Tab") {
        setIsVisible(true)
      }
      
      // Hide when Escape is pressed
      if (e.key === "Escape") {
        setIsVisible(false)
      }
    }
    
    // Hide when clicking outside
    const handleClick = () => {
      setIsVisible(false)
    }
    
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("click", handleClick)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("click", handleClick)
    }
  }, [])
  
  return (
    <a 
      href={`#${mainContentId}`}
      className={`
        fixed top-0 left-0 z-50 p-3 m-3 
        bg-primary text-primary-foreground
        rounded shadow-lg font-medium
        transform transition-transform
        focus:outline-none focus:ring-2 focus:ring-primary
        ${isVisible ? 'translate-y-0' : '-translate-y-20'}
      `}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {label}
    </a>
  )
}
