"use client"

import { Suspense } from "react"

function CustomCursor() {
  // Immediately return null to disable the custom cursor completely
  return null;

  /* Original functionality disabled to fix mouse issues
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = Boolean(
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("a") || 
        target.closest("button") || 
        target.getAttribute("role") === "button" ||
        target.closest("[role=button]") ||
        target.closest("[data-interactive]") ||
        target.classList.contains("interactive")
      )

      setIsHovering(isInteractive)
      
      const isClickableElement = Boolean(
        target.tagName === "BUTTON" || 
        target.tagName === "A" ||
        target.closest("a") || 
        target.closest("button")
      )
        
      setIsClickable(isClickableElement)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  // Only render on client
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render on mobile devices
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  if (!isMounted || isTouchDevice) return null

  return (
    <>
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999] h-3 w-3 rounded-full bg-primary/70 backdrop-blur-sm mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {isHovering && (
        <motion.div
          className="cursor-ring fixed pointer-events-none z-[9998] h-10 w-10 rounded-full border-2 border-primary/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            opacity: isClickable ? 0.7 : 0.3,
            scale: isClickable ? 2 : 1.5,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
            mass: 0.5,
          }}
        />
      )}
      
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
  */
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CustomCursorWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CustomCursor {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CustomCursorWrapper as CustomCursor };