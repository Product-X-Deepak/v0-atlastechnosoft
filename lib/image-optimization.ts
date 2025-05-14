"use client"

import { useState, useEffect } from "react"
import { isClient } from "./utils"
import { getPlaiceholder } from "plaiceholder"
import sharp from "sharp"

/**
 * Image dimensions for responsive sizing
 */
export type ResponsiveImageSizes = {
  mobile: number
  tablet: number
  desktop: number
  ultrawide?: number
}

/**
 * Generate responsive image srcSet for Next.js Image component
 */
export function generateSrcSet(baseUrl: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  return widths.map((width) => `${baseUrl}?w=${width} ${width}w`).join(", ")
}

/**
 * Generate optimized image props for Next.js Image
 */
export function getOptimizedImageProps(
  src: string,
  sizes: ResponsiveImageSizes,
  options?: {
    quality?: number
    priority?: boolean
  },
) {
  const { mobile, tablet, desktop, ultrawide = desktop } = sizes

  return {
    src,
    sizes: `(max-width: 640px) ${mobile}px, (max-width: 1024px) ${tablet}px, (max-width: 1920px) ${desktop}px, ${ultrawide}px`,
    quality: options?.quality || 75,
    priority: options?.priority || false,
  }
}

/**
 * Calculate optimal image dimensions based on a container
 */
export function calculateOptimalImageDimensions(
  containerWidth: number,
  originalWidth: number,
  originalHeight: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  const width = Math.min(containerWidth, originalWidth)
  const height = Math.round(width / aspectRatio)

  return { width, height }
}

/**
 * Transform an image URL to apply optimizations via query parameters
 */
export function optimizedImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: "webp" | "avif" | "jpeg" | "png"
  },
): string {
  if (!url) return url

  const { width, height, quality = 80, format } = options
  const params = new URLSearchParams()

  if (width) params.append("w", width.toString())
  if (height) params.append("h", height.toString())
  if (quality) params.append("q", quality.toString())
  if (format) params.append("fm", format)

  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}${params.toString()}`
}

/**
 * Check if an image is in the viewport and needs to be loaded
 */
export function isImageInViewport(element: HTMLImageElement, threshold = 200): boolean {
  if (!isClient) return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  )
}

/**
 * Estimate image file size based on dimensions and format
 */
export function estimateImageFileSize(
  width: number,
  height: number,
  format: "jpeg" | "png" | "webp" | "avif" = "jpeg",
  quality = 80,
): number {
  // Very rough estimates based on typical compression ratios
  const pixels = width * height

  // Compression factor based on format and quality
  // These are approximate values for estimation
  const compressionFactors = {
    jpeg: {
      high: 0.25, // ~25% of raw size at high quality
      medium: 0.1, // ~10% at medium quality
      low: 0.05, // ~5% at low quality
    },
    png: 0.5, // ~50% for PNG (depends heavily on image content)
    webp: 0.15, // ~15% of JPEG size
    avif: 0.1, // ~10% of JPEG size
  }

  let factor: number
  if (format === "jpeg") {
    if (quality >= 85) factor = compressionFactors.jpeg.high
    else if (quality >= 70) factor = compressionFactors.jpeg.medium
    else factor = compressionFactors.jpeg.low
  } else if (format === "png") {
    factor = compressionFactors.png
  } else if (format === "webp") {
    factor = compressionFactors.webp
  } else {
    factor = compressionFactors.avif
  }

  // Estimate bytes (3 bytes per pixel for RGB)
  return Math.round(pixels * 3 * factor)
}

/**
 * Format estimated image file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Generate blur placeholder for images
export async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (error) {
    console.error("Error generating blur data URL:", error)
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
  }
}

// Optimize image dimensions based on device
export function getOptimizedImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 1200,
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight }
  }

  const aspectRatio = originalWidth / originalHeight
  const height = Math.round(maxWidth / aspectRatio)

  return { width: maxWidth, height }
}

// Convert image to WebP format
export async function convertToWebP(buffer: Buffer, quality = 80): Promise<Buffer> {
  return await sharp(buffer).webp({ quality }).toBuffer()
}

/**
 * Generate blur placeholder URL for images
 * This creates a tiny blurred SVG placeholder that can be used while the main image loads
 *
 * @param width Width of the image
 * @param height Height of the image 
 * @param blurAmount Amount of blur to apply (1-10)
 * @returns Base64 encoded SVG for use as a placeholder
 */
export function generateBlurPlaceholder(
  width: number = 100,
  height: number = 100,
  blurAmount: number = 5
): string {
  if (!width || !height) {
    console.warn("Invalid dimensions provided for blur placeholder")
    return ""
  }

  // Create a simple SVG with a blur filter
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="b" x="0" y="0">
        <feGaussianBlur stdDeviation="${blurAmount}" />
      </filter>
      <rect width="100%" height="100%" filter="url(#b)" fill="#cccccc" opacity="0.5"/>
    </svg>
  `

  // Encode the SVG
  const encoded = typeof window !== 'undefined' 
    ? window.btoa(svg)
    : Buffer.from(svg).toString('base64')

  return `data:image/svg+xml;base64,${encoded}`
}

/**
 * Custom hook for image loading with blur placeholder
 *
 * @param src Image source URL
 * @param placeholderSrc Optional placeholder image URL
 * @returns Object with image state and attributes
 */
export function useOptimizedImage(
  src: string,
  placeholderSrc?: string
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const placeholder = placeholderSrc || generateBlurPlaceholder()

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false)
    setError(null)
    
    if (!src) return
    
    // Preload the image
    const img = new Image()
    img.src = src
    
    img.onload = () => {
      setIsLoaded(true)
    }
    
    img.onerror = () => {
      setError(new Error(`Failed to load image: ${src}`))
    }
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return {
    isLoaded,
    error,
    blurDataURL: placeholder,
    placeholder: "blur",
    onLoadingComplete: () => setIsLoaded(true),
    onError: (e: Error) => setError(e),
  }
}

/**
 * Get responsive image sizes based on the container width
 *
 * @param containerWidth Base container width in pixels or percentage
 * @returns Responsive sizes string for Next.js Image component
 */
export function getResponsiveSizes(containerWidth: string | number = "100vw"): string {
  if (typeof containerWidth === "number") {
    containerWidth = `${containerWidth}px`
  }
  
  // Create responsive sizes based on breakpoints
  return `
    (max-width: 640px) 100vw,
    (max-width: 768px) 85vw,
    (max-width: 1024px) 75vw,
    (max-width: 1280px) 60vw,
    ${containerWidth}
  `
}

/**
 * Get optimal image quality based on screen size and network
 * This dynamically adjusts image quality based on the user's connection
 *
 * @returns Promise that resolves to a quality value between 60-90
 */
export async function getOptimalImageQuality(): Promise<number> {
  // Default to medium-high quality
  let quality = 75
  
  if (typeof window === 'undefined') return quality
  
  try {
    // Check if connection info is available
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { 
        connection?: { 
          saveData?: boolean; 
          effectiveType?: string; 
        } 
      }).connection
      
      if (connection) {
        // Set quality based on connection type
        if (connection.saveData) {
          return 60 // Low quality for save-data mode
        }
        
        if (connection.effectiveType) {
          switch (connection.effectiveType) {
            case 'slow-2g':
            case '2g':
              return 60 // Low quality
            case '3g':
              return 70 // Medium quality
            case '4g':
              return 85 // High quality
            default:
              return 75 // Default to medium-high
          }
        }
      }
    }
    
    // Check for high-DPI screens and increase quality
    if (window.devicePixelRatio > 1.5) {
      quality += 5
    }
    
  } catch (error) {
    console.warn('Error determining optimal image quality:', error)
  }
  
  return Math.min(90, quality) // Cap at 90 for good compression/quality balance
}

/**
 * Get image dimensions from an image URL
 * 
 * @param url Image URL
 * @returns Promise that resolves to { width, height } or null if failed
 */
export function getImageDimensions(url: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null)
      return
    }
    
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = () => {
      console.warn(`Failed to load image dimensions for: ${url}`)
      resolve(null)
    }
    img.src = url
  })
}

/**
 * Validate image URL and check if it's accessible
 * 
 * @param url Image URL to validate
 * @returns Promise that resolves to true if valid, false otherwise
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  if (!url) return false
  
  if (typeof window === 'undefined') return true // Skip validation on server
  
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
    return response.type !== 'error'
  } catch (error) {
    console.warn(`Image validation failed for ${url}:`, error)
    return false
  }
}

// Export a utility object with all functions
export const ImageUtils = {
  generateBlurPlaceholder,
  useOptimizedImage,
  getResponsiveSizes,
  getOptimalImageQuality,
  getImageDimensions,
  validateImageUrl
}
