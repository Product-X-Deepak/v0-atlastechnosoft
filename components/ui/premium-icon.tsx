import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface PremiumIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  background?: boolean
}

export function PremiumIcon({ icon: Icon, className, size = 24, background = true }: PremiumIconProps) {
  return (
    <div
      className={cn("flex items-center justify-center", background && "rounded-full bg-primary/10 p-2.5", className)}
    >
      <Icon className="text-primary" size={size} />
    </div>
  )
}
