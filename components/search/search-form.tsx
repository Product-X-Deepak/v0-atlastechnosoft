"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

interface SearchFormProps {
  className?: string;
}

function SearchForm({ className = "" }: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-sm items-center space-x-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SearchFormWrapper(props: SearchFormProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SearchForm {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SearchFormWrapper as SearchForm };