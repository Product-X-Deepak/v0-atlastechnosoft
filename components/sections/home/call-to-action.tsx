"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

function CallToAction() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Get Started Today</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-premium-heading md:text-4xl mb-4">
            Ready to <span className="text-premium-orange font-extrabold">Transform</span> Your Business?
          </h2>
          <p className="mb-8 text-lg text-premium-text font-medium">
            Schedule a consultation with our experts to discuss how our solutions can help streamline your operations, improve decision-making, and drive growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group px-6" 
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white px-6" 
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {ctaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                className="flex flex-col items-center p-4 rounded-lg bg-white text-center border border-slate-200 shadow-sm"
              >
                <div className="text-xl font-bold text-slate-900 mb-1">{feature.highlight}</div>
                <p className="text-sm text-slate-800 font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ctaFeatures = [
  {
    highlight: "25+ Years",
    description: "Helping businesses transform with enterprise solutions",
  },
  {
    highlight: "500+ Customers",
    description: "Across multiple industries worldwide",
  },
  {
    highlight: "24/7 Support",
    description: "Expert assistance whenever you need it",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CallToActionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CallToAction {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CallToActionWrapper as CallToAction };