"use client"

import { memo, useEffect, useState } from "react"
import { PremiumLoading } from "@/components/common/loading/premium-loading"

// Use memo to prevent unnecessary re-renders of the loading component
const LoadingPage = memo(function LoadingPage() {
  // We'll show an enhanced loading experience after a short delay
  // to avoid flash of loading components on fast connections
  const [showEnhancedLoading, setShowEnhancedLoading] = useState(false);
  
  useEffect(() => {
    // Use a small timeout to delay showing enhanced loading
    // This optimizes for fast connections where content loads quickly
    const timeoutId = setTimeout(() => {
      setShowEnhancedLoading(true);
    }, 300);
    
    // Track loading time for performance monitoring
    const startTime = performance.now();
    
    return () => {
      clearTimeout(timeoutId);
      
      // Measure loading time when component unmounts (page loaded)
      const loadTime = performance.now() - startTime;
      
      // Store loading time for analytics
      if (typeof sessionStorage !== 'undefined') {
        try {
          // Calculate average load time
          const prevLoadTimes = JSON.parse(sessionStorage.getItem('pageLoadTimes') || '[]');
          const newLoadTimes = [...prevLoadTimes, loadTime].slice(-5); // Keep last 5 measurements
          sessionStorage.setItem('pageLoadTimes', JSON.stringify(newLoadTimes));
          
          // Store this for use in optimizing subsequent loads
          const avgLoadTime = newLoadTimes.reduce((sum, time) => sum + time, 0) / newLoadTimes.length;
          sessionStorage.setItem('avgLoadTime', String(avgLoadTime));
        } catch {
          // Silently fail if storage access fails
        }
      }
    };
  }, []);
  
  return (
    <>
      {/* Always show minimal loading indicator for immediate feedback */}
      <div 
        className="fixed top-0 left-0 w-full h-0.5 bg-primary/20 overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-primary animate-pulse"
          style={{
            width: '30%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Show enhanced loading only after delay */}
      {showEnhancedLoading && (
        <PremiumLoading
          message="Loading your experience"
          fullscreen={true}
          showLogo={true}
        />
      )}
    </>
  );
})

// Add display name for easier debugging
LoadingPage.displayName = 'LoadingPage'

export default LoadingPage
