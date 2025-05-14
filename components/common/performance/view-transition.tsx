"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface ViewTransitionProps {
  /**
   * Child elements to render
   */
  children: React.ReactNode;
  
  /**
   * Custom class name for the transition container
   */
  className?: string;
  
  /**
   * Whether to enable transitions for mobile devices only
   * @default true
   */
  mobileOnly?: boolean;
  
  /**
   * Whether to respect reduced motion preferences
   * @default true
   */
  respectReducedMotion?: boolean;
  
  /**
   * Duration of the transition in milliseconds
   * @default 300
   */
  duration?: number;
  
  /**
   * Easing function for the transition
   * @default "ease"
   */
  easing?: string;
}

/**
 * Component that provides smooth view transitions for mobile devices
 * with proper fallbacks for older browsers
 * 
 * Improves perceived performance and user experience while navigating
 */
export function ViewTransition({
  children,
  className = "",
  mobileOnly = true,
  respectReducedMotion = true,
  duration = 300,
  easing = "ease",
}: ViewTransitionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Track the previous path to detect navigation
  const prevPathRef = useRef(pathname + (searchParams?.toString() || ""));
  
  // Check if we're on a mobile device and if reduced motion is preferred
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    
    // Handle motion preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Listen for resize events
    checkMobile();
    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", handleMotionChange);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);
  
  // Handle page transitions
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const currentPath = pathname + (searchParams?.toString() || "");
    
    // Skip if it's the initial load or there's no transition API
    if (
      prevPathRef.current === currentPath ||
      !document.startViewTransition ||
      (mobileOnly && !isMobile) ||
      (respectReducedMotion && prefersReducedMotion)
    ) {
      prevPathRef.current = currentPath;
      return;
    }
    
    // Set up custom transition styles
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(`
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: ${duration}ms;
        animation-timing-function: ${easing};
      }
      
      /* Mobile-specific animations */
      @media (max-width: 767px) {
        ::view-transition-old(root) {
          animation-name: fade-out;
        }
        
        ::view-transition-new(root) {
          animation-name: fade-in;
        }
      }
      
      /* Tablet-specific animations */
      @media (min-width: 768px) and (max-width: 1023px) {
        ::view-transition-old(root) {
          animation-name: slide-out;
        }
        
        ::view-transition-new(root) {
          animation-name: slide-in;
        }
      }
      
      /* Define animation keyframes */
      @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slide-out {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-10%); opacity: 0; }
      }
      
      @keyframes slide-in {
        from { transform: translateX(10%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `);
    
    // Apply transition styles
    try {
      // Properly type document to allow adoptedStyleSheets
      const doc = document as Document & {
        adoptedStyleSheets: CSSStyleSheet[];
      };
      doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, styleSheet];
      
      // Start the view transition
      document.startViewTransition();
    } catch {
      // Silently fail for unsupported browsers
      console.warn("View transitions not supported in this browser");
    }
    
    // Update the previous path
    prevPathRef.current = currentPath;
  }, [pathname, searchParams, mobileOnly, isMobile, respectReducedMotion, prefersReducedMotion, duration, easing]);
  
  // Apply semantic transition attributes for accessibility
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    
    return () => {
      container.removeAttribute("aria-live");
      container.removeAttribute("aria-atomic");
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={className}
      data-view-transition-container
      style={{ 
        // Ensure the container is full width and has proper stacking context
        width: "100%",
        isolation: "isolate", 
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hook for applying custom view transitions programmatically
 */
export function useViewTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  /**
   * Apply a custom view transition to a DOM update
   */
  const applyTransition = async (updateCallback: () => void | Promise<void>, options?: { 
    duration?: number;
    skipIfReducedMotion?: boolean;
  }) => {
    if (typeof window === "undefined" || !document.startViewTransition) {
      // Fallback for browsers without support
      await updateCallback();
      return;
    }
    
    // Check reduced motion preference if needed
    if (options?.skipIfReducedMotion) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        await updateCallback();
        return;
      }
    }
    
    try {
      setIsTransitioning(true);
      
      // Apply custom duration if specified
      if (options?.duration) {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(`
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: ${options.duration}ms;
          }
        `);
        
        // Properly type document to allow adoptedStyleSheets
        const doc = document as Document & {
          adoptedStyleSheets: CSSStyleSheet[];
        };
        doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, styleSheet];
      }
      
      // Start the transition
      const transition = document.startViewTransition(async () => {
        await updateCallback();
      });
      
      // Wait for the transition to finish
      await transition.finished;
    } catch {
      // Fallback to normal update
      await updateCallback();
    } finally {
      setIsTransitioning(false);
    }
  };
  
  return { applyTransition, isTransitioning };
} 