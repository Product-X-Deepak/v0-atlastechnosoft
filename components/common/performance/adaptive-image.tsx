"use client";

import { useState, useEffect, useRef, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

interface AdaptiveImageProps extends Omit<ImageProps, 'onLoad'> {
  /**
   * Additional class name for the image container
   */
  containerClassName?: string;
  
  /**
   * Whether to enable fade-in effect when the image loads
   * @default true
   */
  fadeIn?: boolean;
  
  /**
   * Duration of the fade-in effect in milliseconds
   * @default 300
   */
  fadeInDuration?: number;
  
  /**
   * Whether to show a blurred placeholder while the image loads
   * @default false
   */
  blurPlaceholder?: boolean;
  
  /**
   * Base64 data URL for the blur placeholder
   * Only used if blurPlaceholder is true and no placeholder is provided
   */
  placeholderDataURL?: string;
  
  /**
   * Whether to use color placeholder instead of blur
   * @default false
   */
  colorPlaceholder?: boolean;
  
  /**
   * Background color to use as placeholder
   * Only used if colorPlaceholder is true
   * @default "#f3f4f6"
   */
  placeholderColor?: string;
  
  /**
   * Whether to use browser's native lazy loading
   * @default true
   */
  useBrowserLazy?: boolean;
  
  /**
   * Delay in milliseconds before starting to load the image
   * @default 0
   */
  loadDelay?: number;
  
  /**
   * Whether to adapt image quality based on network conditions
   * @default true
   */
  adaptiveQuality?: boolean;
  
  /**
   * Whether to enable saving bandwidth on slow connections
   * @default true
   */
  saveDataOnSlowConnection?: boolean;
  
  /**
   * Custom function to call when the image has loaded
   */
  onImageLoad?: () => void;
  
  /**
   * Whether to log performance metrics to console in development
   * @default false
   */
  logPerformance?: boolean;
}

/**
 * AdaptiveImage component for optimized image loading based on
 * network conditions, device capabilities, and viewport visibility
 * 
 * Improves Core Web Vitals (LCP, CLS) and reduces bandwidth usage
 */
const AdaptiveImage = forwardRef<HTMLImageElement, AdaptiveImageProps>(
  ({
    src,
    alt,
    width,
    height,
    className,
    containerClassName,
    fadeIn = true,
    fadeInDuration = 300,
    blurPlaceholder = false,
    placeholderDataURL,
    colorPlaceholder = false,
    placeholderColor = "#f3f4f6",
    useBrowserLazy = true,
    priority = false,
    loadDelay = 0,
    fill = false,
    sizes,
    quality: initialQuality = 75,
    adaptiveQuality = true,
    saveDataOnSlowConnection = true,
    onImageLoad,
    logPerformance = false,
    style,
    ...rest
  }, ref) => {
    // Track if the image has loaded
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Track if we should start loading the image
    const [shouldLoad, setShouldLoad] = useState(priority || loadDelay === 0);
    
    // Track actual image quality based on network
    const [quality, setQuality] = useState(initialQuality);
    
    // Track if we should load a lower resolution version
    const [loadLowRes, setLoadLowRes] = useState(false);
    
    // Ref to track if component is mounted
    const isMounted = useRef(false);
    
    // Ref for the container element to observe
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Track if the element is in viewport with a safe initial value
    const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, amount: 0.1 });
    
    // Track load start time for performance metrics
    const loadStartTime = useRef(0);
    
    // Function to log performance metrics
    const logImagePerformance = (url: string, loadTime: number) => {
      if (process.env.NODE_ENV === 'development' && logPerformance) {
        console.info(
          `🖼️ Image loaded: ${url.split('/').pop()}\n` +
          `⏱️ Load time: ${loadTime.toFixed(2)}ms\n` +
          `🔍 Quality: ${quality}%\n` +
          `🔄 Low res: ${loadLowRes ? 'Yes' : 'No'}`
        );
      }
      
      // Report to performance API if available
      if (typeof window.performance?.mark === 'function') {
        try {
          const imageName = url.split('/').pop()?.split('.')[0] || 'image';
          window.performance.mark(`img-loaded-${imageName}`);
          window.performance.measure(
            `img-load-time-${imageName}`,
            `img-load-start-${imageName}`,
            `img-loaded-${imageName}`
          );
        } catch {
          // Silently fail if performance API fails
        }
      }
    };
    
    // Check network conditions and adapt image loading strategy
    useEffect(() => {
      isMounted.current = true;
      
      // Skip adaptive loading for priority images
      if (priority) return;
      
      // Detect network conditions if the API is available
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection) {
          // Determine adaptive quality based on network conditions
          if (adaptiveQuality) {
            if (connection.saveData || connection.effectiveType === 'slow-2g') {
              // Lowest quality for save-data or very slow connections
              setQuality(30);
              setLoadLowRes(true);
            } else if (connection.effectiveType === '2g' || (connection.downlink !== undefined && connection.downlink < 0.5)) {
              // Lower quality for slow connections
              setQuality(45);
              setLoadLowRes(true);
            } else if (connection.effectiveType === '3g' || (connection.downlink !== undefined && connection.downlink < 2)) {
              // Medium quality for 3G connections
              setQuality(60);
            } else if (connection.downlink !== undefined && connection.downlink < 5) {
              // Slightly reduced quality for slower 4G
              setQuality(70);
            }
            // Otherwise, keep the initial quality
          }
          
          // Skip loading completely for save-data mode if enabled
          if (saveDataOnSlowConnection && connection.saveData && !priority) {
            if (logPerformance && process.env.NODE_ENV === 'development') {
              console.info('🔄 Image loading skipped: Save-Data mode enabled');
            }
            return;
          }
        }
      }
      
      // Set up delayed loading for non-priority images
      if (!priority && loadDelay > 0) {
        const timer = setTimeout(() => {
          if (isMounted.current) {
            setShouldLoad(true);
            if (typeof window.performance?.mark === 'function') {
              const imageName = typeof src === 'string' 
                ? src.split('/').pop()?.split('.')[0] || 'image'
                : 'image';
              loadStartTime.current = performance.now();
              window.performance.mark(`img-load-start-${imageName}`);
            }
          }
        }, loadDelay);
        
        return () => {
          clearTimeout(timer);
        };
      } else if (!loadStartTime.current && typeof window.performance?.mark === 'function') {
        // Mark load start time for performance tracking
        const imageName = typeof src === 'string' 
          ? src.split('/').pop()?.split('.')[0] || 'image'
          : 'image';
        loadStartTime.current = performance.now();
        window.performance.mark(`img-load-start-${imageName}`);
      }
      
      return () => {
        isMounted.current = false;
      };
    }, [priority, loadDelay, adaptiveQuality, saveDataOnSlowConnection, logPerformance, src]);
    
    // Start loading when in viewport for non-priority images
    useEffect(() => {
      if (!priority && !shouldLoad && isInView) {
        setShouldLoad(true);
        if (!loadStartTime.current && typeof window.performance?.mark === 'function') {
          const imageName = typeof src === 'string' 
            ? src.split('/').pop()?.split('.')[0] || 'image'
            : 'image';
          loadStartTime.current = performance.now();
          window.performance.mark(`img-load-start-${imageName}`);
        }
      }
    }, [isInView, priority, shouldLoad, src]);
    
    // Handle the image load event
    const handleImageLoad = () => {
      if (isMounted.current) {
        setIsLoaded(true);
        
        // Log performance metrics
        if (loadStartTime.current) {
          const loadTime = performance.now() - loadStartTime.current;
          logImagePerformance(src.toString(), loadTime);
        }
        
        // Call custom load handler if provided
        if (onImageLoad) {
          onImageLoad();
        }
      }
    };
    
    // Create dynamic styles for fade-in effect
    const imageStyles = {
      ...style,
      transition: fadeIn ? `opacity ${fadeInDuration}ms ease-in-out` : undefined,
      opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
    };
    
    // Calculate placeholder styles
    const placeholderStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colorPlaceholder ? placeholderColor : undefined,
      backgroundImage: blurPlaceholder && placeholderDataURL ? `url(${placeholderDataURL})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: blurPlaceholder ? 'blur(10px)' : undefined,
      transform: blurPlaceholder ? 'scale(1.1)' : undefined, // Prevent blur edges
    } as React.CSSProperties;
    
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden',
          containerClassName
        )}
        style={{
          width: fill ? '100%' : typeof width === 'number' ? `${width}px` : width,
          height: fill ? '100%' : typeof height === 'number' ? `${height}px` : height,
        }}
        data-loaded={isLoaded ? 'true' : 'false'}
      >
        {/* Placeholder if enabled and not loaded */}
        {(blurPlaceholder || colorPlaceholder) && !isLoaded && (
          <div
            aria-hidden="true"
            style={placeholderStyles}
          />
        )}
        
        {/* Only render the actual image when we're ready to load it */}
        {(shouldLoad || priority || isInView) && (
          <Image
            ref={ref}
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            className={cn(
              'transition-opacity',
              className
            )}
            priority={priority}
            quality={quality}
            onLoad={handleImageLoad}
            sizes={sizes || (fill ? '100vw' : undefined)}
            loading={useBrowserLazy && !priority ? 'lazy' : undefined}
            fill={fill}
            style={imageStyles}
            {...rest}
          />
        )}
      </div>
    );
  }
);

AdaptiveImage.displayName = 'AdaptiveImage';

export { AdaptiveImage }; 