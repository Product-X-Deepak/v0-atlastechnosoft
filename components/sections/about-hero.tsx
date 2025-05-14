"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function AboutHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900 md:py-24">
      <div className="absolute inset-0 z-0 opacity-30">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 0 0 L 0 8 M 0 0 L 8 0" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About <span className="gradient-text">Atlas Technosoft</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Founded in 1997, Atlas Technosoft is a leading SAP Gold Certified Partner providing ERP consulting, IT
              hardware, software solutions, and enterprise applications to businesses worldwide. With over 28 years of
              experience, we&apos;ve helped transform over 750 businesses across the globe.
            </p>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {keyFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center space-x-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-bold">{fact.value}</span>
                  </div>
                  <div className="text-sm">{fact.label}</div>
                </motion.div>
              ))}
            </div>
            <Button asChild className="w-fit">
              <Link href="/contact" className="flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative h-60 md:h-96 w-full rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/Main_Logo.png" 
                alt="About Atlas Technosoft" 
                fill 
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
const keyFacts = [
  { value: "1997", label: "Founded" },
  { value: "750+", label: "Successful Implementations" },
  { value: "300+", label: "Global Clients" },
  { value: "98%", label: "Client Retention Rate" },
]


// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function AboutHeroWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <AboutHero />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { AboutHeroWrapper as AboutHero };
