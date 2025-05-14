"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ShoppingCart, CreditCard, BarChart3, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function RetailHeroComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F5F3FF] py-8">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-purple-600/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-800">
            <span>Industry Solutions</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Retail <span className="text-[#8B5CF6]">Solutions</span> <br />
            <span className="text-[#A855F7]">for Modern Commerce</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-base text-slate-700">
            Innovative solutions for retailers focused on customer experience, omnichannel commerce, and operational efficiency.
          </p>
        </div>

        <div className="mx-auto mb-4 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {benefit.icon}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size="sm" 
            className="bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Demo
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#A855F7] bg-white text-[#A855F7] hover:bg-[#A855F7]/10" 
            asChild
          >
            <Link href="#solutions" className="flex items-center">
              Explore Solutions
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />,
    title: "Sales Growth",
    description: "32% average increase",
  },
  {
    icon: <CreditCard className="h-4 w-4 text-[#A855F7]" />,
    title: "Transaction Speed",
    description: "65% faster checkout",
  },
  {
    icon: <ShoppingCart className="h-4 w-4 text-[#A855F7]" />,
    title: "Customer Loyalty",
    description: "45% return rate",
  },
  {
    icon: <Tag className="h-4 w-4 text-[#8B5CF6]" />,
    title: "Inventory Accuracy",
    description: "99.8% precision",
  },
]

// Wrapper component with Suspense boundary
function RetailHero(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailHeroComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RetailHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RetailHeroWrapper as RetailHero };