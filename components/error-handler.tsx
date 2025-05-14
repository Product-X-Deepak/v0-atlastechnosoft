"use client"

import { useEffect } from "react"
import { setupGlobalErrorHandlers } from '@/lib/error-logging'
import { Suspense } from "react"

function ErrorHandler() {
  useEffect(() => {
    setupGlobalErrorHandlers()
  }, [])

  return null
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErrorHandlerWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErrorHandler {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErrorHandlerWrapper as ErrorHandler };