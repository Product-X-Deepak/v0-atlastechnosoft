"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import { Suspense } from "react"

interface NavigationDropdownProps {
  title: string;
  isActive: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
  children: ReactNode;
}

function NavigationDropdown({
  title,
  isActive,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  children
}: NavigationDropdownProps) {
  return (
    <NavigationMenuItem
      className={isActive ? "relative" : ""}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isActive && (
        <motion.span
          layoutId="activeSection"
          className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-primary via-primary/80 to-secondary shadow-sm"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <NavigationMenuTrigger
        className={cn(
          "h-10 px-3 text-base rounded-md transition-all duration-300 border-0 bg-transparent hover:bg-white/5 dark:hover:bg-white/5",
          isActive ? "text-primary font-bold" : "hover:text-primary font-semibold",
          isHovered ? "bg-white/5 text-foreground" : ""
        )}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {children}
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function NavigationDropdownWrapper(props: NavigationDropdownProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <NavigationDropdown {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { NavigationDropdownWrapper as NavigationDropdown };