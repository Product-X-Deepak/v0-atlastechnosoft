"use client"

import { useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/search/search-form"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="mb-8">
        <Suspense fallback={<div className="w-full max-w-sm h-10 bg-muted/20 rounded-md animate-pulse"></div>}>
          <SearchForm />
        </Suspense>
      </div>
      <div className="min-h-[40vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Results</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          We encountered an error while searching. Please try again with a different query.
        </p>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  )
}
