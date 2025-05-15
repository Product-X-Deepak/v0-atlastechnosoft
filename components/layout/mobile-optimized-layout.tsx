"use client";

import React, { useEffect, useState } from 'react';
import { useMobileOptimization } from '@/hooks/use-mobile-optimization';
import { ViewTransition } from '@/components/common/performance/view-transition';
import { cn } from '@/lib/utils';
import { Suspense } from "react"

interface MobileOptimizedLayoutProps {
  className?: string;
  children: React.ReactNode;
  withViewTransitions?: boolean;
}

/**
 * Layout component that applies mobile-specific optimizations
 * for better Core Web Vitals and user experience
 */
function MobileOptimizedLayout({
  className = "",
  children,
  withViewTransitions = false
}: MobileOptimizedLayoutProps) {
  // Get mobile optimization settings and state
  const {
    isMobile,
    isTablet,
    prefersReducedMotion,
    dataSavingEnabled,
    screenWidth,
    imageOptimizationLevel,
  } = useMobileOptimization();
  
  // State to track if critical resources are loaded
  const [criticalLoaded, setCriticalLoaded] = useState(false);
  
  // Apply initial optimizations on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Mark when the component has mounted
    setCriticalLoaded(true);
    
    // Add mobile-specific classes based on detected state
    const htmlElement = document.documentElement;
    
    // Add data attributes to control content loading strategy
    if (isMobile || isTablet) {
      htmlElement.setAttribute('data-device-type', isMobile ? 'mobile' : 'tablet');
      htmlElement.setAttribute('data-screen-width', screenWidth.toString());
      htmlElement.setAttribute('data-save-data', dataSavingEnabled ? 'true' : 'false');
      htmlElement.setAttribute('data-reduced-motion', prefersReducedMotion ? 'true' : 'false');
      htmlElement.setAttribute('data-image-quality', imageOptimizationLevel.toString());
      
      // Apply viewport-specific optimizations
      if (isMobile) {
        // For phones (smaller than 640px)
        if (screenWidth < 640) {
          // Disable animations for better performance on low-end devices
          if (!htmlElement.classList.contains('optimize-small-screen')) {
            htmlElement.classList.add('optimize-small-screen');
            
            // Add specific styles for very small screens
            const styleElement = document.createElement('style');
            styleElement.id = 'small-screen-optimizations';
            styleElement.textContent = `
              /* Increase touch targets on small screens */
              button, .btn, a, input, select, .clickable {
                min-height: 44px;
                min-width: 44px;
              }
              
              /* Optimize font sizes for readability */
              body {
                font-size: 16px;
              }
              
              /* Reduce motion for scrolling effects */
              .scroll-effect {
                transition: none !important;
                transform: none !important;
              }
              
              /* Increase spacing for better readability */
              p, h1, h2, h3, h4, h5, h6 {
                margin-bottom: 1em;
              }
            `;
            
            document.head.appendChild(styleElement);
          }
        }
      }
      
      // For data saving mode, add additional optimizations
      if (dataSavingEnabled) {
        if (!htmlElement.classList.contains('data-saving-mode')) {
          htmlElement.classList.add('data-saving-mode');
          
          // Add styles for data saving mode
          const styleElement = document.createElement('style');
          styleElement.id = 'data-saving-optimizations';
          styleElement.textContent = `
            /* Disable background images */
            .bg-image {
              background-image: none !important;
            }
            
            /* Simplify gradients */
            .gradient {
              background: #f5f5f5 !important;
            }
          `;
          
          document.head.appendChild(styleElement);
        }
      }
    }
    
    // Cleanup function
    return () => {
      // Remove any dynamically added style elements
      const smallScreenStyle = document.getElementById('small-screen-optimizations');
      if (smallScreenStyle) {
        smallScreenStyle.remove();
      }
      
      const dataSavingStyle = document.getElementById('data-saving-optimizations');
      if (dataSavingStyle) {
        dataSavingStyle.remove();
      }
    };
  }, [isMobile, isTablet, screenWidth, dataSavingEnabled, prefersReducedMotion, imageOptimizationLevel]);
  
  // Add viewport-specific content rendering
  const content = (
    <div 
      className={cn(
        "mobile-optimized-container",
        {
          "is-mobile": isMobile,
          "is-tablet": isTablet,
          "reduced-motion": prefersReducedMotion,
          "data-saving": dataSavingEnabled,
          "critical-loaded": criticalLoaded
        },
        className
      )}
      data-viewport-width={screenWidth}
      data-optimization-level={imageOptimizationLevel}
    >
      {/* Conditionally render based on device type */}
      {isMobile ? (
        // Mobile-specific wrapper with optimizations
        <div className="mobile-view">
          {children}
        </div>
      ) : isTablet ? (
        // Tablet-specific wrapper with optimizations
        <div className="tablet-view">
          {children}
        </div>
      ) : (
        // Desktop view (unchanged)
        children
      )}
    </div>
  );
  
  // Apply view transitions if enabled
  return withViewTransitions ? (
    <ViewTransition mobileOnly={true} respectReducedMotion={true}>
      {content}
    </ViewTransition>
  ) : content;
}

/**
 * A component to conditionally render content based on viewport size
 * Helps with mobile-specific SEO by providing different content for different devices
 */
export function ViewportConditional({
  mobileContent,
  tabletContent,
  desktopContent,
  fallbackContent,
}: {
  mobileContent?: React.ReactNode;
  tabletContent?: React.ReactNode;
  desktopContent?: React.ReactNode;
  fallbackContent: React.ReactNode;
}) {
  const { isMobile, isTablet } = useMobileOptimization();
  
  if (isMobile && mobileContent) {
    return <>{mobileContent}</>;
  }
  
  if (isTablet && tabletContent) {
    return <>{tabletContent}</>;
  }
  
  if (!isMobile && !isTablet && desktopContent) {
    return <>{desktopContent}</>;
  }
  
  return <>{fallbackContent}</>;
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MobileOptimizedLayoutWrapper(props: MobileOptimizedLayoutProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MobileOptimizedLayout {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MobileOptimizedLayoutWrapper as MobileOptimizedLayout };