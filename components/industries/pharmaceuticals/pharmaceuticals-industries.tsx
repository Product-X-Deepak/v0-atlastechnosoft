"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Pill, TestTube, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function PharmaceuticalsIndustriesComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Pharmaceutical Sectors</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Solutions Tailored to Your <span className="text-[#0D9488]">Pharmaceutical Needs</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            We understand the unique challenges faced by different pharmaceutical sectors and offer specialized solutions to address your specific requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pharmaSegments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`rounded-xl p-6 ${segment.bgColor} text-white`}
            >
              <div className="flex h-12 w-12 items-center justify-center">
                {segment.icon}
              </div>
              
              <h3 className="mt-4 text-xl font-bold text-white">{segment.title}</h3>
              <p className="mt-2 text-sm text-white/80">{segment.description}</p>
              
              <div className="mt-6 space-y-3">
                {segment.solutions.map((solution, solutionIndex) => (
                  <div key={solutionIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className="h-3 w-3 text-white/70" />
                    </div>
                    <span className="text-sm text-white/90">{solution}</span>
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

const pharmaSegments = [
  {
    icon: <Pill className="h-8 w-8 text-white" />,
    title: "Pharmaceutical Manufacturing",
    description: "Integrated solutions for pharmaceutical manufacturers focused on production efficiency, quality control, and regulatory compliance.",
    solutions: [
      "Batch record management",
      "Quality management systems",
      "Regulatory compliance tools",
      "Serialization solutions"
    ],
    bgColor: "bg-[#0D9488]"
  },
  {
    icon: <TestTube className="h-8 w-8 text-white" />,
    title: "Drug Development & Research",
    description: "Advanced technology solutions for R&D teams to accelerate development and ensure data integrity.",
    solutions: [
      "Laboratory information management",
      "Research data analytics",
      "Clinical trial management",
      "Formulation development tools"
    ],
    bgColor: "bg-[#5E17EB]"
  },
  {
    icon: <Microscope className="h-8 w-8 text-white" />,
    title: "Biotech & Life Sciences",
    description: "Specialized tools for biotech companies to manage complex processes and enhance innovation.",
    solutions: [
      "Bioprocess management",
      "Gene therapy tracking",
      "Cell line development",
      "Bioinformatics platforms"
    ],
    bgColor: "bg-[#0D9488]"
  }
]

// Wrapper component with Suspense boundary
function PharmaceuticalsIndustries(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsIndustriesComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsIndustriesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsIndustries {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsIndustriesWrapper as PharmaceuticalsIndustries };