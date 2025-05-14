"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function RpaSolutionsCta() {
  return (
    <section className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Transform Your Business with <span className="text-[#E84A0E]">UiPath RPA</span>?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Start your automation journey today and discover how our RPA solutions can help 
            your organization achieve more with less effort.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-x-6 sm:space-y-0">
            <Button 
              className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group w-full sm:w-auto"
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              asChild
            >
              <Link href="/automation-solutions" className="flex items-center justify-center">
                Explore Other Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsCtaWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsCtaWrapper as RpaSolutionsCta };