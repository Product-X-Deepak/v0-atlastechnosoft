"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { Suspense } from "react"

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="relative overflow-hidden"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{theme === "light" ? "Switch to dark theme" : "Switch to light theme"}</span>
      <span className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity dark:opacity-30"></span>
    </Button>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ThemeToggleWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ThemeToggle />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ThemeToggleWrapper as ThemeToggle };
