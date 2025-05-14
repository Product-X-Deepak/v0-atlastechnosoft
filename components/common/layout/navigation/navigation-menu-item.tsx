"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavigationMenuLink, NavigationMenuItem as RadixNavigationMenuItem } from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import { Suspense } from "react"

interface NavigationMenuItemProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

function NavigationMenuItemLink({
  href,
  isActive,
  children,
  onMouseEnter,
  onMouseLeave,
  className
}: NavigationMenuItemProps) {
  return (
    <RadixNavigationMenuItem
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
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            "h-10 inline-flex items-center px-3 text-base rounded-md transition-all duration-300 hover:bg-white/5 dark:hover:bg-white/5",
            isActive ? "text-primary font-bold" : "hover:text-primary font-semibold",
            className
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </RadixNavigationMenuItem>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function NavigationMenuItemLinkWrapper(props: NavigationMenuItemProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <NavigationMenuItemLink {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { NavigationMenuItemLinkWrapper as NavigationMenuItemLink };