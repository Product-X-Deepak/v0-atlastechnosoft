"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import { Suspense } from "react"

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ThemeProviderWrapper(props: ThemeProviderProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ThemeProvider {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ThemeProviderWrapper as ThemeProvider };