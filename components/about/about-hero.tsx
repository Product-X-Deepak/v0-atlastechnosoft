"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Users, Award, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function AboutHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-16">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 py-1 text-sm font-medium text-amber-800">
            <span>EST. 1997</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
            Pioneering <span className="text-[#E84A0E]">Enterprise</span> <br />
            <span className="text-[#A73370]">Transformation</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
            Atlas Technosoft is your strategic partner in navigating digital transformation.
            Since 1997, we&apos;ve empowered businesses worldwide with innovative technology solutions.
          </p>
        </div>

        <div className="mx-auto mb-8 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {keyStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
              <h3 className="mt-3 font-bold text-2xl text-[#1E1E38]">{stat.value}</h3>
              <p className="mt-1 text-sm text-slate-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Connect With Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="/solutions" className="flex items-center">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const keyStats = [
  {
    icon: <Users className="h-6 w-6 text-[#E84A0E]" />,
    value: "300+",
    description: "Global clients across industries",
  },
  {
    icon: <Award className="h-6 w-6 text-[#A73370]" />,
    value: "750+",
    description: "Successful implementations",
  },
  {
    icon: <Globe className="h-6 w-6 text-[#E84A0E]" />,
    value: "25+",
    description: "Countries served worldwide",
  },
  {
    icon: <Clock className="h-6 w-6 text-[#A73370]" />,
    value: "28",
    description: "Years of industry expertise",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function AboutHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <AboutHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { AboutHeroWrapper as AboutHero };