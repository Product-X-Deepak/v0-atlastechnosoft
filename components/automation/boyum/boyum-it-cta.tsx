"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden py-16 bg-[#1E1E38]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E1E38] via-[#1E1E38] to-[#A73370]/30 opacity-90"></div>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E84A0E]/10 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#A73370]/10 -ml-24 -mb-24"></div>
      
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to <span className="text-[#E84A0E]">Connect</span> Your Product Value Chain?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Take the first step towards optimizing your processes and delivering exceptional products to your customers.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="ml-3 text-sm text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group w-full sm:w-auto" 
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#1E1E38] w-full sm:w-auto" 
                asChild
              >
                <Link href="/automation-solutions" className="flex items-center justify-center">
                  Explore All Solutions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  "Tailored solutions for your specific industry needs",
  "Seamless integration with your existing systems",
  "Expert guidance throughout implementation",
  "Ongoing support and continuous improvement",
  "Proven results with 10,000+ satisfied companies",
  "25+ years of experience in ERP and business solutions"
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItCtaWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItCtaWrapper as BoyumItCta };