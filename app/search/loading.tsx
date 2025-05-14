export default function Loading() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Loading search results...</div>
      </div>
    </div>
  )
}
