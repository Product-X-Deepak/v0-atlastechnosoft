"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SapBusinessOneCta() {
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
              Ready to <span className="text-[#E84A0E]">Transform</span> Your Business?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Join thousands of small and medium businesses that trust SAP Business One to streamline operations and drive growth.
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
                <Link href="/sap-solutions" className="flex items-center justify-center">
                  Explore All SAP Solutions
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
  "Comprehensive ERP solution tailored for SMBs",
  "Seamless integration with existing business systems",
  "AI-powered analytics and business intelligence",
  "Flexible deployment options (cloud or on-premise)",
  "Expert implementation and ongoing support",
  "Proven results with 75,000+ customers worldwide"
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCtaWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCtaWrapper as SapBusinessOneCta };