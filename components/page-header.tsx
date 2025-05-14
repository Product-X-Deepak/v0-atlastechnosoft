import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  title: string
  href: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
  bgClassName?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  bgClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("relative border-b border-white/10", bgClassName)}>
      {/* Background elements with responsive patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-70"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)", 
        backgroundSize: "16px 16px",
      }}></div>
      
      <div className="container relative px-2 xs:px-3 sm:px-4 md:px-6 py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 overflow-hidden">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav 
            aria-label="Breadcrumbs" 
            className="mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 flex flex-wrap items-center text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground overflow-x-auto scrollbar-hide pb-0.5"
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                {index > 0 && (
                  <ChevronRight className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 mx-0.5 xs:mx-1 sm:mx-1.5 flex-shrink-0 opacity-50" />
                )}
                <Link
                  href={breadcrumb.href}
                  className={cn(
                    "transition-colors hover:text-foreground whitespace-nowrap min-h-[32px] flex items-center touch-target px-1",
                    index === breadcrumbs.length - 1 ? "text-foreground pointer-events-none font-medium" : "hover:underline"
                  )}
                  aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                >
                  {breadcrumb.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}
        
        <div className={cn("flex flex-col gap-1 xs:gap-1.5 sm:gap-2 md:gap-3", className)}>
          <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent drop-shadow-sm break-words hyphens-auto tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs xs:text-sm sm:text-base text-muted-foreground max-w-prose">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-2 xs:mt-2.5 sm:mt-3 flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 