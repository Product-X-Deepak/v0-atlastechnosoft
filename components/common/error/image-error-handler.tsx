'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  fallbackSrc?: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fill?: boolean
  style?: React.CSSProperties
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
}

/**
 * ImageWithFallback component that handles image loading errors
 * and provides a fallback image when the main image fails to load.
 */
export function ImageWithFallback({
  src,
  fallbackSrc = '/fallback/image-placeholder.svg',
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality,
  fill = false,
  style,
  objectFit,
  objectPosition,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Handle image load error
  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  const imageStyle = {
    ...style,
    objectFit: objectFit || (fill ? 'cover' : undefined),
    objectPosition: objectPosition || 'center',
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, hasError && 'opacity-70')}
      onError={handleError}
      priority={priority}
      sizes={sizes}
      quality={quality || 80}
      fill={fill}
      style={imageStyle}
    />
  )
} 