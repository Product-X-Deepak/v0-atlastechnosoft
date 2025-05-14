import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  fluid?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "full"
  gutters?: boolean
  className?: string
}

export function Container({
  className,
  as: Component = "div",
  fluid = false,
  size = "lg",
  gutters = true,
  ...props
}: ContainerProps) {
  // Define max-width based on size
  const sizeClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-none",
  }

  // Define padding based on gutters
  const gutterClasses = gutters 
    ? "px-4 sm:px-6 md:px-8" 
    : ""

  return (
    <Component
      className={cn(
        "mx-auto w-full", 
        fluid ? "max-w-none" : sizeClasses[size],
        gutterClasses,
        className
      )}
      {...props}
    />
  )
} 