import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/20 z-0" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 z-0" />
      
      <div className="container relative flex flex-col items-center justify-center min-h-[70vh] py-20 z-10">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          {/* Badge skeleton */}
          <Skeleton className="h-8 w-32 rounded-full mb-6" />
          
          {/* Heading skeleton */}
          <Skeleton className="h-16 w-full max-w-2xl mb-6" />
          
          {/* Description skeleton */}
          <Skeleton className="h-6 w-full max-w-2xl mb-2" />
          <Skeleton className="h-6 w-5/6 max-w-xl mb-2" />
          <Skeleton className="h-6 w-4/6 max-w-lg mb-10" />
          
          {/* Form skeleton */}
          <div className="w-full max-w-md mb-12">
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Button skeleton */}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
} 