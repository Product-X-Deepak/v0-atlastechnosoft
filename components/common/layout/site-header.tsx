"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/common/layout/mobile-nav"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/common/layout/logo"
import { HeaderActions } from "@/components/common/layout/header-actions"
import { MainNavigationMenu } from "@/components/common/layout/navigation/navigation-menu"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Transform values for the floating animation
  const floatingY = useTransform(scrollY, [0, 100], [0, -5])
  const blurStrength = useTransform(scrollY, [0, 100], [0.5, 1])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1])
  
  // Handle scroll event to change header appearance with smoother transition
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest: number) => {
      setIsScrolled(latest > 10);
    });
    
    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, [scrollY]);

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [pathname])

  // Handle resize to close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileNavOpen]);

  return (
    <motion.header
      ref={headerRef}
      style={{ 
        y: isScrolled ? 0 : floatingY,
      }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 safe-top",
        isLoaded ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      )}
    >
      {/* Glass container with white background */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-white"
        style={{
          backdropFilter: `blur(${blurStrength.get()}rem)`,
          WebkitBackdropFilter: `blur(${blurStrength.get()}rem)`,
        }}
      >
        {/* Animated border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E84A0E]/30 to-transparent"
          style={{ opacity: borderOpacity }}
        />
      </motion.div>
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>
      <div className="container relative flex h-[65px] xs:h-[70px] sm:h-[75px] md:h-[80px] lg:h-[85px] items-center justify-between pl-0 xs:pl-0 sm:pl-0 pr-2 xs:pr-3 sm:pr-4 md:pr-6 py-1 xs:py-2 sm:py-2 md:py-3">
        <div className="flex items-center gap-2 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Logo with hover effect */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex-shrink-0 -ml-3 xs:-ml-3 sm:-ml-3 md:-ml-4 lg:-ml-5"
          >
            <Logo className="scale-95 xs:scale-100 sm:scale-100 md:scale-100 lg:scale-105" />
          </motion.div>

          {/* Using the MainNavigationMenu component with updated text color */}
          <div className="hidden md:block text-slate-800">
            <MainNavigationMenu />
          </div>
        </div>

        {/* Header Actions with hover effects */}
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center"
        >
          <HeaderActions 
            isMobileNavOpen={isMobileNavOpen} 
            setIsMobileNavOpen={setIsMobileNavOpen} 
          />
        </motion.div>
      </div>
      
      {/* Mobile Navigation with animations */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="safe-bottom bg-white text-slate-800 z-30"
          >
            <MobileNav />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
