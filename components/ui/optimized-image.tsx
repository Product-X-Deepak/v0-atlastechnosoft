"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Helper function for blur placeholder
const shimmer = (w: number, h: number, blur = 10) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  <filter id="f" x="0" y="0">
    <feGaussianBlur stdDeviation="${blur}" />
  </filter>
  <rect width="${w}" height="${h}" fill="url(#g)" filter="url(#f)" opacity="0.5" />
</svg>`

const toBase64 = (str: string) => 
  typeof window === 'undefined' 
    ? Buffer.from(str).toString('base64') 
    : window.btoa(str)

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  blurAmount?: number
  onClick?: () => void
}

/**
 * OptimizedImage component wraps Next.js Image with additional optimizations:
 * - Automatic blur-up placeholder
 * - Loading animation
 * - Error fallback
 * - Lazy loading with customizable boundaries
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  fill = false,
  objectFit = 'cover',
  blurAmount = 10,
  onClick,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)
  const [error, setError] = useState(false)
  
  // Generate default dimensions if not provided
  const defaultWidth = width || 800
  const defaultHeight = height || 600
  
  // Handle externally hosted images
  const isExternal = src.startsWith('http') && !src.includes('atlastechnosoft.com')
  const hasImageExtension = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(src)
  
  // Default image path for errors
  const errorImagePath = '/images/image-placeholder.svg'
  
  // Use next/image only for local images or images with proper extensions
  const useNextImage = !isExternal || hasImageExtension
  
  // Parse image filename for better alt text if none provided
  useEffect(() => {
    if (alt === '' || alt === 'image') {
      console.warn('OptimizedImage: Please provide descriptive alt text for image:', src)
    }
  }, [src, alt])
  
  // Handle load completion
  const handleLoadComplete = () => {
    setIsLoading(false)
  }
  
  // Handle load error
  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }
  
  // Common styles for image container
  const containerStyle = cn(
    'overflow-hidden relative',
    isLoading && 'animate-pulse bg-muted/30',
    className
  )
  
  // For error state, show fallback
  if (error) {
    return (
      <div className={containerStyle}>
        <Image
          src={errorImagePath}
          alt={`Failed to load image: ${alt}`}
          width={defaultWidth}
          height={defaultHeight}
          className={cn('transition-opacity duration-500', fill && 'object-cover')}
          {...props}
        />
      </div>
    )
  }
  
  // Regular image with next/image optimization
  if (useNextImage) {
    return (
      <div className={containerStyle} onClick={onClick}>
        <Image
          src={src}
          alt={alt}
          width={!fill ? defaultWidth : undefined}
          height={!fill ? defaultHeight : undefined}
          className={cn(
            'transition-all duration-500',
            isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
            fill && `object-${objectFit}`
          )}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          fill={fill}
          onLoadingComplete={handleLoadComplete}
          onError={handleError}
          placeholder={priority ? 'empty' : 'blur'}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(defaultWidth, defaultHeight, blurAmount))}`}
          {...props}
        />
      </div>
    )
  }
  
  // Fallback for unsupported external images
  return (
    <div className={containerStyle} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={defaultWidth}
        height={defaultHeight}
        className={cn('w-full h-auto')}
        onLoadingComplete={handleLoadComplete}
        onError={handleError}
        unoptimized={true}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-muted/30 animate-pulse" />
      )}
    </div>
  )
} 