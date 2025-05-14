"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import { useLazyLoad } from "@/hooks/use-intersection-observer"
import { deferLoadingFor } from "@/lib/performance"
import { Suspense } from "react"

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
  threshold?: number
  rootMargin?: string
  priority?: boolean
}

/**
 * Component for lazy loading child components when they come into view
 */
function LazyComponent({ 
  children, 
  fallback = <div className="min-h-[100px] animate-pulse bg-muted/20 rounded-md" />,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  priority = false
}: LazyComponentProps) {
  const [shouldRender, setShouldRender] = useState(priority)
  const [isVisible, ref] = useLazyLoad<HTMLDivElement>({
    threshold,
    rootMargin,
  })

  useEffect(() => {
    if (isVisible && !shouldRender) {
      const loadComponent = async () => {
        if (delay > 0) {
          await deferLoadingFor(delay)
        }
        setShouldRender(true)
      }

      loadComponent()
    }
  }, [isVisible, shouldRender, delay])

  // Always render immediately for search engines and if marked as priority
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isBot = /bot|crawler|spider|googlebot|lighthouse|slurp|bingbot|mediapartners-google/i.test(
        window.navigator.userAgent,
      )

      if (isBot || priority) {
        setShouldRender(true)
      }
    }
  }, [priority])

  return (
    <div ref={ref} className="lazy-component">
      {shouldRender ? children : fallback}
    </div>
  )
}

/**
 * Component for lazy loading images with a nice fade-in effect
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  style = {},
  priority = false,
  placeholder = "blur",
  blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
}: {
  src: string
  alt: string
  width: number | string
  height: number | string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, ref] = useLazyLoad<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
    >
      {(isVisible || priority) && (
        <>
          {placeholder === "blur" && !isLoaded && (
            <div
              className="lazy-image-placeholder"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${blurDataURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)",
                transform: "scale(1.2)",
              }}
            />
          )}
          <Image
            src={src}
            alt={alt}
            width={typeof width === "number" ? width : 1000}
            height={typeof height === "number" ? height : 1000}
            onLoad={() => setIsLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </>
      )}
    </div>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function LazyComponentWrapper(props: LazyComponentProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { LazyComponentWrapper as LazyComponent };
