"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Suspense, useState } from "react"

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href="/" 
      className={cn(
        "group flex items-center transition-all duration-300 hover:scale-105",
        className
      )}
      aria-label="Atlas Technosoft Home"
    >
      <div className="relative">
        {/* Premium glow effect behind logo */}
        <span className="absolute -inset-2 -z-10 rounded-lg bg-gradient-to-r from-primary/20 via-primary/5 to-secondary/20 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100"></span>
        
        {/* Image logo with appropriate sizing */}
        <div className="relative flex items-center">
          <Image 
            src={imageError ? "/images/atlas-technosoft-logo.png" : "/images/Main_Logo.png"}
            alt="Atlas Technosoft Logo" 
            width={300}
            height={103}
            className="h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 min-w-[150px] w-auto object-contain transition-all duration-300"
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
            priority
            onError={() => setImageError(true)}
            loading="eager"
            unoptimized
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