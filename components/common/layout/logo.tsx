"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Suspense, useState } from "react"

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

function Logo({ className, height, width }: LogoProps) {
  const [_imageError, setImageError] = useState(false);

  return (
    <Link 
      href="/" 
      className={cn(
        "group flex items-center transition-all duration-300 hover:scale-105",
        className
      )}
      aria-label="Atlas Technosoft homepage"
    >
      <div className="relative px-2 sm:px-1">
        {/* Premium glow effect behind logo */}
        <span className="absolute -inset-2 -z-10 rounded-lg bg-gradient-to-r from-primary/20 via-primary/5 to-secondary/20 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100"></span>
        
        {/* Image logo with responsive sizing */}
        <div className="relative flex items-center">
          <Image 
            src="/images/Main_Logo.png"
            alt="Atlas Technosoft"
            height={height || 28}
            width={width || 120}
            className={cn(
              "object-contain", 
              "w-[52px] xs:w-[65px] sm:w-[80px] md:w-[110px] lg:w-[120px]", 
              "h-auto",
              className
            )}
            onError={() => setImageError(false)}
            priority={true}
            unoptimized={false}
          />
        </div>
      </div>
    </Link>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function LogoWrapper(props: LogoProps) {
  return (
    <Suspense fallback={<div className="h-16 w-32 animate-pulse bg-muted/20 rounded-lg" />}>
      <Logo {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { LogoWrapper as Logo };