"use client";

import { useState, useEffect, useCallback } from 'react';
import { NetworkConnection } from '@/types/network';

interface MobileOptimizationOptions {
  /**
   * Whether to enable reduced motion for animations on mobile
   * @default true
   */
  enableReducedMotion?: boolean;
  
  /**
   * Whether to optimize image loading for mobile
   * @default true
   */
  optimizeImages?: boolean;
  
  /**
   * Whether to adjust typography for better mobile readability
   * @default true
   */
  optimizeTypography?: boolean;
  
  /**
   * Whether to apply mobile-specific styles
   * @default true
   */
  applyMobileStyles?: boolean;
  
  /**
   * Whether to log optimization decisions in development
   * @default false
   */
  debug?: boolean;
}

interface MobileOptimizationResult {
  /**
   * Whether the current device is mobile
   */
  isMobile: boolean;
  
  /**
   * Whether the current device is a tablet
   */
  isTablet: boolean;
  
  /**
   * Whether reduced motion is preferred or enabled
   */
  prefersReducedMotion: boolean;
  
  /**
   * Whether data saving mode is enabled
   */
  dataSavingEnabled: boolean;
  
  /**
   * Current screen width
   */
  screenWidth: number;
  
  /**
   * Whether user has touched the screen (touch device)
   */
  hasTouched: boolean;
  
  /**
   * Whether optimization has been applied
   */
  optimizationApplied: boolean;
  
  /**
   * CSS class to apply to the root element
   */
  optimizationClass: string;
  
  /**
   * Manually toggle mobile optimizations
   */
  toggleOptimization: () => void;
  
  /**
   * Image optimization level (1-3, where 3 is most aggressive)
   */
  imageOptimizationLevel: 1 | 2 | 3;
}

/**
 * Hook for mobile-specific optimizations to improve SEO and user experience
 * 
 * This automatically detects mobile devices and applies optimizations for:
 * - Better performance on mobile networks
 * - Improved Core Web Vitals
 * - Enhanced mobile user experience
 * - Reduced data consumption
 */
export function useMobileOptimization(
  options: MobileOptimizationOptions = {}
): MobileOptimizationResult {
  const {
    enableReducedMotion = true,
    optimizeImages = true,
    optimizeTypography = true,
    applyMobileStyles = true,
    debug = false,
  } = options;
  
  // State variables
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dataSavingEnabled, setDataSavingEnabled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [hasTouched, setHasTouched] = useState(false);
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  const [imageOptimizationLevel, setImageOptimizationLevel] = useState<1 | 2 | 3>(1);
  
  // Detect mobile/tablet devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize screen width
    setScreenWidth(window.innerWidth);
    
    // Check for mobile/tablet using user agent
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
    const isTabletDevice = /ipad|android(?!.*mobile)/i.test(userAgent) || (window.innerWidth >= 768 && window.innerWidth <= 1024);
    
    setIsMobile(isMobileDevice && !isTabletDevice);
    setIsTablet(isTabletDevice);
    
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    // Handle motion preference changes
    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Define connection change handler
    const handleConnectionChange = () => {
      if ('connection' in navigator && navigator.connection) {
        const connection = navigator.connection as NetworkConnection;
        setDataSavingEnabled(connection.saveData === true);
        
        // Update image optimization level
        if (connection.saveData) {
          setImageOptimizationLevel(3);
        } else if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          setImageOptimizationLevel(3);
        } else if (connection.effectiveType === '3g') {
          setImageOptimizationLevel(2);
        } else {
          setImageOptimizationLevel(1);
        }
      }
    };
    
    // Check for Save-Data header or setting
    if ('connection' in navigator && navigator.connection) {
      const connection = navigator.connection as NetworkConnection;
      setDataSavingEnabled(connection.saveData === true);
      
      // Set image optimization level based on connection
      if (connection.saveData) {
        setImageOptimizationLevel(3); // Most aggressive
      } else if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setImageOptimizationLevel(3);
      } else if (connection.effectiveType === '3g') {
        setImageOptimizationLevel(2);
      } else {
        setImageOptimizationLevel(1);
      }
      
      // Listen for connection changes
      if (connection.addEventListener) {
        connection.addEventListener('change', handleConnectionChange);
      }
    }
    
    // Listen for screen size changes
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      
      // Update device type based on screen width
      const newIsMobile = window.innerWidth < 768;
      const newIsTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
    };
    
    // Detect touch events to identify touch devices
    const handleTouch = () => {
      setHasTouched(true);
      // Remove listener after first touch
      window.removeEventListener('touchstart', handleTouch);
    };
    
    // Add event listeners
    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouch);
    
    // Cleanup
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouch);
      
      if ('connection' in navigator && navigator.connection) {
        const connection = navigator.connection as NetworkConnection;
        if (connection.removeEventListener) {
          connection.removeEventListener('change', handleConnectionChange);
        }
      }
    };
  }, []);
  
  // Apply optimizations based on device detection
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Skip if not enabled
    if (!applyMobileStyles) {
      setOptimizationApplied(false);
      return;
    }
    
    // Apply mobile optimizations
    if (isMobile || isTablet) {
      // Apply HTML classes
      document.documentElement.classList.add('mobile-optimized');
      
      if (isMobile) {
        document.documentElement.classList.add('is-mobile');
      } else if (isTablet) {
        document.documentElement.classList.add('is-tablet');
      }
      
      // Apply reduced motion if preferred or enabled
      if (enableReducedMotion && (prefersReducedMotion || dataSavingEnabled)) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // Apply font optimization for better mobile readability
      if (optimizeTypography) {
        document.documentElement.classList.add('optimize-typography');
        
        // Adjust base font size for better readability on small screens
        if (screenWidth < 375) {
          document.documentElement.style.fontSize = '14px';
        } else {
          // Reset to default
          document.documentElement.style.fontSize = '';
        }
      }
      
      // Apply image optimizations
      if (optimizeImages) {
        document.documentElement.classList.add('optimize-images');
        document.documentElement.setAttribute('data-image-optimization', imageOptimizationLevel.toString());
      }
      
      setOptimizationApplied(true);
      
      // Log optimization in development
      if (debug && process.env.NODE_ENV === 'development') {
        console.info(`🔧 Mobile optimizations applied:
- Device: ${isMobile ? 'Mobile' : 'Tablet'}
- Screen width: ${screenWidth}px
- Reduced motion: ${prefersReducedMotion ? 'Yes' : 'No'}
- Data saving: ${dataSavingEnabled ? 'Yes' : 'No'}
- Touch device: ${hasTouched ? 'Yes' : 'No'}
- Image optimization level: ${imageOptimizationLevel}`);
      }
    } else {
      // Remove optimization classes for desktop
      document.documentElement.classList.remove(
        'mobile-optimized',
        'is-mobile',
        'is-tablet',
        'reduce-motion',
        'optimize-typography',
        'optimize-images'
      );
      
      // Reset font size
      document.documentElement.style.fontSize = '';
      
      // Remove attributes
      document.documentElement.removeAttribute('data-image-optimization');
      
      setOptimizationApplied(false);
    }
  }, [
    isMobile,
    isTablet,
    prefersReducedMotion,
    dataSavingEnabled,
    screenWidth,
    hasTouched,
    enableReducedMotion,
    optimizeImages,
    optimizeTypography,
    applyMobileStyles,
    imageOptimizationLevel,
    debug,
  ]);
  
  // Toggle optimization manually
  const toggleOptimization = useCallback(() => {
    setOptimizationApplied(prev => !prev);
    
    if (typeof document !== 'undefined') {
      if (optimizationApplied) {
        // Remove optimization classes
        document.documentElement.classList.remove(
          'mobile-optimized',
          'reduce-motion',
          'optimize-typography',
          'optimize-images'
        );
      } else {
        // Apply optimization classes
        document.documentElement.classList.add('mobile-optimized');
        
        if (enableReducedMotion && (prefersReducedMotion || dataSavingEnabled)) {
          document.documentElement.classList.add('reduce-motion');
        }
        
        if (optimizeTypography) {
          document.documentElement.classList.add('optimize-typography');
        }
        
        if (optimizeImages) {
          document.documentElement.classList.add('optimize-images');
        }
      }
    }
  }, [
    optimizationApplied,
    enableReducedMotion,
    prefersReducedMotion,
    dataSavingEnabled,
    optimizeTypography,
    optimizeImages,
  ]);
  
  return {
    isMobile,
    isTablet,
    prefersReducedMotion,
    dataSavingEnabled,
    screenWidth,
    hasTouched,
    optimizationApplied,
    optimizationClass: 'mobile-optimized',
    toggleOptimization,
    imageOptimizationLevel,
  };
} 