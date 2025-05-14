"use client";

import { useState, useEffect } from 'react';

/**
 * Network information type for browser connection API
 */
interface NetworkInformation extends EventTarget {
  effectiveType: string;
  saveData: boolean;
  downlink: number;
  rtt: number;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * Connection quality assessment result
 */
export type ConnectionQuality = 'high' | 'medium' | 'low' | 'saveData';

/**
 * Get the browser's connection quality to make adaptive decisions
 * Returns one of: 'high', 'medium', 'low', or 'saveData'
 */
export function getConnectionQuality(): ConnectionQuality {
  // Client-side only
  if (typeof navigator === 'undefined') return 'high';
  
  // Check for Network Information API
  if ('connection' in navigator) {
    const connection = (navigator as any).connection as NetworkInformation;
    
    // Check for save-data mode
    if (connection.saveData) {
      return 'saveData';
    }
    
    // Check for slow connections
    if (['slow-2g', '2g'].includes(connection.effectiveType) || connection.downlink < 0.5) {
      return 'low';
    }
    
    // Check for medium connections
    if (connection.effectiveType === '3g' || connection.downlink < 2) {
      return 'medium';
    }
    
    // Default to high for 4g and better
    return 'high';
  }
  
  // Default to high if Network Information API is not available
  return 'high';
}

/**
 * Get image quality setting based on connection quality
 */
export function getAdaptiveImageQuality(connectionQuality: ConnectionQuality, defaultQuality = 80): number {
  switch (connectionQuality) {
    case 'saveData':
      return 30; // Very low quality for save-data mode
    case 'low':
      return 40; // Low quality for slow connections
    case 'medium':
      return 60; // Medium quality for 3G connections
    case 'high':
    default:
      return defaultQuality; // Default quality for fast connections
  }
}

/**
 * Calculate responsive image sizes for different breakpoints
 */
export function getResponsiveImageSizes(
  desktopSize: number, 
  options?: {
    mobileSize?: number;
    tabletSize?: number;
  }
): string {
  const { 
    mobileSize = Math.round(desktopSize * 0.5),
    tabletSize = Math.round(desktopSize * 0.7),
  } = options || {};
  
  return `
    (max-width: 640px) ${mobileSize}px,
    (max-width: 1024px) ${tabletSize}px,
    ${desktopSize}px
  `.trim();
}

/**
 * Get the image format based on browser support and connection quality
 */
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpg' {
  // Client-side only
  if (typeof window === 'undefined') return 'webp';
  
  // Check connection quality
  const connectionQuality = getConnectionQuality();
  
  // On slow connections, prefer more compressed formats
  if (connectionQuality === 'low' || connectionQuality === 'saveData') {
    return 'webp'; // WebP is a good compromise
  }
  
  // Check for AVIF support
  const supportsAvif = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };
  
  // Check for WebP support
  const supportsWebp = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };
  
  // Return best available format
  if (supportsAvif()) {
    return 'avif';
  } else if (supportsWebp()) {
    return 'webp';
  }
  
  return 'jpg';
}

/**
 * Custom hook to track connection quality changes
 */
export function useConnectionQuality(): ConnectionQuality {
  const [quality, setQuality] = useState<ConnectionQuality>(() => 
    typeof navigator !== 'undefined' ? getConnectionQuality() : 'high'
  );
  
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    
    // Update quality initially
    setQuality(getConnectionQuality());
    
    // Set up listener for connection changes if API is available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection as NetworkInformation;
      
      const updateConnectionQuality = () => {
        setQuality(getConnectionQuality());
      };
      
      // Listen for connection changes
      connection.addEventListener('change', updateConnectionQuality);
      
      // Clean up
      return () => {
        connection.removeEventListener('change', updateConnectionQuality);
      };
    }
  }, []);
  
  return quality;
}

/**
 * Custom hook to get optimal image props based on connection and viewport
 */
export function useOptimalImageProps(
  defaultQuality = 80,
  defaultFormat: 'avif' | 'webp' | 'jpg' = 'webp'
): {
  quality: number;
  format: 'avif' | 'webp' | 'jpg';
  loading: 'eager' | 'lazy';
  connectionQuality: ConnectionQuality;
} {
  const connectionQuality = useConnectionQuality();
  const [format, setFormat] = useState<'avif' | 'webp' | 'jpg'>(defaultFormat);
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Try to determine optimal format
    const optimalFormat = getOptimalImageFormat();
    setFormat(optimalFormat);
  }, []);
  
  return {
    quality: getAdaptiveImageQuality(connectionQuality, defaultQuality),
    format,
    loading: connectionQuality === 'saveData' || connectionQuality === 'low' ? 'lazy' : 'eager',
    connectionQuality,
  };
} 