"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from the component definition
function PharmaceuticalsCtaComponent() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#F0FDFA] to-teal-100">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-teal-600/30 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-800">
            <span>Ready to transform your pharmaceutical operations?</span>
          </div>
          
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Ready to Transform Your <span className="text-[#0D9488]">Pharmaceutical Operations?</span>
          </h2>
          
          <p className="mt-4 text-lg text-slate-600">
            Contact our pharmaceutical technology experts to discuss how our tailored solutions can streamline your operations, enhance compliance, and accelerate innovation.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              className="bg-[#0D9488] text-white hover:bg-[#0D9488]/90 group w-full sm:w-auto" 
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white/90 border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB]/10 hover:border-[#5E17EB] w-full sm:w-auto group" 
              asChild
            >
              <Link href="/solutions" className="flex items-center justify-center">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 

// Wrapper component with Suspense boundary
function PharmaceuticalsCta(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsCtaComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsCtaWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsCtaWrapper as PharmaceuticalsCta };