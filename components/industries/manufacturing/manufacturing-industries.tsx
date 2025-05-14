"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Factory, Settings, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ManufacturingIndustriesComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Manufacturing Segments</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Solutions Tailored to Your <span className="text-[#E84A0E]">Manufacturing Sector</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            We understand the unique challenges faced by different manufacturing sectors and offer specialized solutions to address your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {industryTypes.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`rounded-xl p-6 ${industry.bgColor} text-white`}
            >
              <div className="flex h-12 w-12 items-center justify-center">
                {industry.icon}
              </div>
              
              <h3 className="mt-4 text-xl font-bold text-white">{industry.title}</h3>
              <p className="mt-2 text-sm text-white/80">{industry.description}</p>
              
              <div className="mt-6 space-y-3">
                {industry.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className="h-3 w-3 text-white/70" />
                    </div>
                    <span className="text-sm text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  asChild
                >
                  <Link href="/contact">Learn more</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ManufacturingIndustries(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingIndustriesComponent {...props} />
    </Suspense>
  )
}

const industryTypes = [
  {
    icon: <Factory className="h-8 w-8 text-white" />,
    title: "Automotive Manufacturing",
    description: "Specialized solutions for automotive manufacturers, focusing on quality control, just-in-time production, and supply chain integration.",
    features: [
      "Vehicle lifecycle management",
      "Supplier quality tracking",
      "Production scheduling",
      "Regulatory compliance"
    ],
    bgColor: "bg-[#3B82F6]"
  },
  {
    icon: <Settings className="h-8 w-8 text-white" />,
    title: "Electronics & High-Tech",
    description: "Precision manufacturing solutions for electronics producers with complex assembly processes and strict quality requirements.",
    features: [
      "BOM management",
      "Component traceability",
      "Revision control",
      "Testing & quality assurance"
    ],
    bgColor: "bg-[#6B7280]"
  },
  {
    icon: <Truck className="h-8 w-8 text-white" />,
    title: "Process Manufacturing",
    description: "Solutions for batch-oriented process manufacturing with focus on consistency, quality and traceability.",
    features: [
      "Formula & recipe management",
      "Batch tracking",
      "Regulatory compliance",
      "Quality control"
    ],
    bgColor: "bg-[#3B82F6]"
  }
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ManufacturingIndustriesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingIndustries {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ManufacturingIndustriesWrapper as ManufacturingIndustries };