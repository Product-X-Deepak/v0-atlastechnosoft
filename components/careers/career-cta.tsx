"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function CareerCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-16 md:py-20">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-800 mb-4">
              <span>Join Our Team</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to Start Your <span className="text-[#E84A0E]">Journey</span> With Us?
            </h2>
            <p className="mb-10 text-lg text-slate-700 max-w-2xl mx-auto">
              Join our team of innovators and make an impact in the world of technology.
              We&apos;re always looking for talented individuals who share our passion for excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button 
              className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
              asChild
            >
              <Link href="#current-openings" className="flex items-center">
                View Current Openings
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#E84A0E]/10 blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#A73370]/10 blur-3xl"></div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareerCtaWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareerCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareerCtaWrapper as CareerCta };