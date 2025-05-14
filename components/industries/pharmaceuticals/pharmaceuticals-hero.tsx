"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, TestTube, Beaker, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function PharmaceuticalsHeroComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F0FDFA] py-8">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-teal-600/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-800">
            <span>Industry Solutions</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Pharmaceutical <span className="text-[#0D9488]">Solutions</span> <br />
            <span className="text-[#5E17EB]">for Digital Transformation</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-base text-slate-700">
            Innovative solutions for pharmaceutical companies focused on compliance, quality, and operational excellence.
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
            className="bg-[#0D9488] text-white hover:bg-[#0D9488]/90 group" 
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
            className="border-[#5E17EB] bg-white text-[#5E17EB] hover:bg-[#5E17EB]/10" 
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
    icon: <ShieldCheck className="h-4 w-4 text-[#0D9488]" />,
    title: "Compliance",
    description: "21 CFR Part 11 validated",
  },
  {
    icon: <TestTube className="h-4 w-4 text-[#5E17EB]" />,
    title: "Quality Control",
    description: "98% error reduction",
  },
  {
    icon: <Beaker className="h-4 w-4 text-[#5E17EB]" />,
    title: "R&D Efficiency",
    description: "35% time savings",
  },
  {
    icon: <Clock className="h-4 w-4 text-[#0D9488]" />,
    title: "Time-to-Market",
    description: "28% faster delivery",
  },
]

// Wrapper component with Suspense boundary
function PharmaceuticalsHero(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsHeroComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsHeroWrapper as PharmaceuticalsHero };