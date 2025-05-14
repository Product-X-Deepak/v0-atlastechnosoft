"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Suspense } from "react"

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef as React.RefObject<Element>, { once: false })
  const [isVisible, setIsVisible] = useState(false)

  // Use IntersectionObserver as a backup to optimize video loading/playback
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current!)

    return () => {
      observer.disconnect()
    }
  }, [])
  
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set playback rate
    video.playbackRate = 0.75

    // Optimize video playback
    if (inView || isVisible) {
      if (video.paused) {
        // Use a low priority to avoid competing with critical resources
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, we'll try again when user interacts
            document.addEventListener('click', () => {
              video.play().catch(e => console.error("Could not play video after user interaction:", e))
            }, { once: true })
          })
        }
      }
    } else {
      // Pause video when not in view to save resources
      if (!video.paused) {
        video.pause()
      }
    }

    // Handle visibility changes to pause when tab is not active
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !video.paused) {
        video.pause()
      } else if (document.visibilityState === "visible" && video.paused && (inView || isVisible)) {
        video.play().catch(e => console.error("Could not resume video:", e))
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (!video.paused) {
        video.pause()
      }
    }
  }, [inView, isVisible])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover brightness-125 contrast-110 saturate-125"
      >
        <source src="/images/solutions/Golden.mp4" type="video/mp4" />
      </video>
      {/* Add a subtle overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60"></div>
      
      {/* Add some bright particles/elements to enhance the visual appeal - simplified for performance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,140,0,0.15),transparent_70%)]"></div>
    </div>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function VideoBackgroundWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <VideoBackground {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { VideoBackgroundWrapper as VideoBackground };