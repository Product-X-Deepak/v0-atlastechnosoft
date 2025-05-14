"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"

interface SearchResult {
  title: string
  description: string
  url: string
  category: string
}

function SearchResultsInner() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Reset state when query changes
    setLoading(true)

    if (!query) {
      setResults([])
      setLoading(false)
      return
    }

    // Fetch search results from API
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        
        if (!response.ok) {
          throw new Error('Search request failed')
        }
        
        const data = await response.json()
        setResults(data.results || [])
      } catch {
        // Fall back to static results if API fails
        setResults([
          {
            title: "SAP Business One",
            description: "Comprehensive ERP solution for small and medium-sized businesses",
            url: "/sap-solutions/business-one",
            category: "SAP Solutions",
          },
          {
            title: "Automation Solutions",
            description: "Advanced artificial intelligence solutions for business automation",
            url: "/automation-solutions/rpa-solutions",
            category: "Automation Solutions",
          },
        ].filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        ))
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  if (loading) {
    return <div className="flex items-center justify-center py-12">Searching...</div>
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No results found for &quot;{query}&quot;</h2>
        <p className="text-muted-foreground mb-8">Try different keywords or browse our solutions below</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            href="/sap-solutions/business-one"
            className="p-6 border rounded-lg hover:border-premium-orange hover:shadow-md transition-all"
          >
            <h3 className="font-semibold mb-2">SAP Solutions</h3>
            <p className="text-sm text-muted-foreground">Explore our SAP implementation services</p>
          </Link>
          <Link
            href="/automation-solutions/rpa-solutions"
            className="p-6 border rounded-lg hover:border-premium-orange hover:shadow-md transition-all"
          >
            <h3 className="font-semibold mb-2">Automation Solutions</h3>
            <p className="text-sm text-muted-foreground">Discover our automation offerings</p>
          </Link>
          <Link
            href="/contact"
            className="p-6 border rounded-lg hover:border-premium-orange hover:shadow-md transition-all"
          >
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">Get in touch with our experts</p>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6">
        Found {results.length} results for &quot;{query}&quot;
      </p>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="border p-6 rounded-lg hover:border-premium-orange hover:shadow-md transition-all">
            <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full mb-2 inline-block">
              {result.category}
            </span>
            <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
            <p className="text-muted-foreground mb-4">{result.description}</p>
            <Button asChild variant="outline" size="sm">
              <Link href={result.url} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading search results...</div>}>
      <SearchResultsInner />
    </Suspense>
  )
}
