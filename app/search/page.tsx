"use client"

import { Suspense } from "react"
import { SearchForm } from "@/components/search/search-form"
import dynamic from "next/dynamic"

// Dynamically import the SearchResults component
const SearchResults = dynamic(() => import("@/components/search/search-results"), {
  loading: () => <div className="py-12 text-center">Loading search results...</div>,
})

// Metadata needs to be moved to a separate layout file since this is now a client component
export default function SearchPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="mb-8">
        <Suspense fallback={<div className="w-full max-w-sm h-10 bg-muted/20 rounded-md animate-pulse"></div>}>
        <SearchForm />
        </Suspense>
      </div>
      <Suspense fallback={<div className="py-12 text-center">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}
