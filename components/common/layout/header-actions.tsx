"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"

interface HeaderActionsProps {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (value: boolean) => void;
}

function HeaderActions({ isMobileNavOpen, setIsMobileNavOpen }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4">
      {/* Request Demo button with improved visibility */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="hidden md:block"
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex min-h-[40px] md:min-h-[48px] lg:min-h-[52px] border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white transition-all duration-300 rounded-md relative overflow-hidden group px-3 md:px-5 lg:px-6" 
          asChild
        >
          <Link href="/contact" className="flex items-center">
            <span className="relative z-10 text-sm md:text-base whitespace-nowrap">Request Demo</span>
          </Link>
        </Button>
      </motion.div>
      
      {/* Contact Us button with Boyum IT styling */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="hidden md:block"
      >
        <Button 
          size="sm" 
          className="hidden md:flex min-h-[40px] md:min-h-[48px] lg:min-h-[52px] bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white transition-all duration-300 rounded-md shadow-md hover:shadow-lg hover:shadow-[#E84A0E]/20 relative overflow-hidden group px-3 md:px-5 lg:px-6" 
          asChild
        >
          <Link href="/contact" className="flex items-center">
            <span className="relative z-10 text-sm md:text-base whitespace-nowrap">Contact Us</span>
          </Link>
        </Button>
      </motion.div>
      
      {/* Enhanced mobile nav button with improved touch target */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden min-h-[44px] min-w-[44px] w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 hover:bg-[#E84A0E]/10 transition-all duration-300 rounded-md relative overflow-hidden group"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
        >
          <span className="absolute inset-0 bg-[#E84A0E]/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          {isMobileNavOpen ? (
            <X className="h-5 w-5 xs:h-6 xs:w-6 relative z-10 text-slate-800" />
          ) : (
            <Menu className="h-5 w-5 xs:h-6 xs:w-6 relative z-10 text-slate-800" />
          )}
        </Button>
      </motion.div>
    </div>
  )
} 

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function HeaderActionsWrapper(props: HeaderActionsProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HeaderActions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { HeaderActionsWrapper as HeaderActions };