"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Database, Settings2, Network, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-8">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-800">
            <span>Boyum IT Silver Partner</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Bring Your <span className="text-[#E84A0E]">Products</span> to Life with <br />
            <span className="text-[#A73370]">Boyum IT Solutions</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-base text-slate-700">
            Connect your product value chain with solutions designed for SMEs. Boost your core processes from innovation to launch and focus on what truly matters.
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
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
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
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
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
    icon: <Database className="h-4 w-4 text-[#E84A0E]" />,
    title: "Product Consistency",
    description: "Enhanced visibility and traceability",
  },
  {
    icon: <Settings2 className="h-4 w-4 text-[#A73370]" />,
    title: "Process Automation",
    description: "Eliminate manual tasks and errors",
  },
  {
    icon: <LineChart className="h-4 w-4 text-[#A73370]" />,
    title: "Increased Productivity",
    description: "Up to 30% more efficient operations",
  },
  {
    icon: <Network className="h-4 w-4 text-[#E84A0E]" />,
    title: "Connected Value Chain",
    description: "From innovation to customer delivery",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItHeroWrapper as BoyumItHero };