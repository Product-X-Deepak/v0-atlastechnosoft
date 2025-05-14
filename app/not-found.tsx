"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { memo, useState, useEffect, Suspense } from "react"
import { Home, Search, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// Memoized components for better performance
const BackgroundEffects = memo(function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          // Reduce CPU usage with fewer updates
          restSpeed: 0.01,
          restDelta: 0.01,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-secondary/5 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          // Reduce CPU usage with fewer updates
          restSpeed: 0.01,
          restDelta: 0.01,
        }}
      />
    </div>
  );
})

BackgroundEffects.displayName = 'BackgroundEffects';

// Memoized links component to reduce re-renders
const HelpfulLinks = memo(function HelpfulLinks() {
  return (
    <motion.div 
      className="mt-10 pt-6 border-t border-border/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <p className="text-sm text-muted-foreground mb-4">
        Looking for something specific? Try these popular pages:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <Link 
          href="/contact" 
          className="text-foreground hover:text-primary flex items-center justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
          prefetch={false}
        >
          <span>Contact Us</span>
        </Link>
        <Link 
          href="/sap-solutions" 
          className="text-foreground hover:text-primary flex items-center justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
          prefetch={false}
        >
          <span>SAP Solutions</span>
        </Link>
        <Link 
          href="/blog" 
          className="text-foreground hover:text-primary flex items-center justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
          prefetch={false}
        >
          <span>Blog</span>
        </Link>
        <Link 
          href="/search" 
          className="text-foreground hover:text-primary flex items-center justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
          prefetch={false}
        >
          <Search className="h-3.5 w-3.5 mr-1.5 opacity-70" />
          <span>Search</span>
        </Link>
      </div>
    </motion.div>
  );
})

HelpfulLinks.displayName = 'HelpfulLinks';

// Fallback content for when motion is loading
const MotionFallback = memo(function MotionFallback() {
  return (
    <div className="bg-background/70 backdrop-blur-md shadow-lg border border-border/60 rounded-2xl p-8 md:p-10">
      <div className="text-center">
        <div className="inline-block mb-6">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">404 Error</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>
      </div>
    </div>
  );
})

MotionFallback.displayName = 'MotionFallback';

// Client-side only rendering with motion for better hydration
function NotFoundContent() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          // Use better performance settings
          type: "tween",
          ease: "easeOut"
        }}
        className="bg-background/70 backdrop-blur-md shadow-lg border border-border/60 rounded-2xl p-8 md:p-10"
      >
        <div className="text-center">
          {/* Animated badge */}
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2,
              // Improve motion performance
              restDelta: 0.01
            }}
          >
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              404 Error
            </div>
          </motion.div>
          
          {/* Title with gradient */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Page Not Found
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-muted-foreground mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The page you are looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="space-x-2 touch-target shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-shadow"
            >
              <Link href="/" prefetch={false}>
                <Home className="h-4 w-4 mr-1.5" />
                <span>Back to Home</span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="space-x-2 touch-target"
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                <span>Go Back</span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Helpful links section */}
          <HelpfulLinks />
        </div>
      </motion.div>
    </div>
  );
}

// The main component wrapped in Suspense
export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-8 py-12">
        <MotionFallback />
      </div>
    }>
      <NotFoundClientContent />
    </Suspense>
  );
}

// Client component that uses hooks
function NotFoundClientContent() {
  // Client-side only rendering to ensure framer-motion works properly
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Set document favicon for this page
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = "/images/Main_Logo.png";
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = "/images/Main_Logo.png";
      document.head.appendChild(newLink);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-8 py-12">
      {/* Only render animations on client-side */}
      {isMounted && (
        <>
          <BackgroundEffects />
          <NotFoundContent />
        </>
      )}
      
      {/* Show fallback before client-side hydration */}
      {!isMounted && (
        <MotionFallback />
      )}
    </div>
  );
}
