"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Compass, Eye, BarChart3, Lightbulb } from "lucide-react"
import { Suspense } from "react"

function MissionVision() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/10 px-4 py-2 text-sm font-medium text-amber-300">
            <span>Our Purpose</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Mission, Vision & <span className="text-[#E84A0E]">Purpose</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Driving transformation through innovation and excellence in enterprise technology solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="rounded-xl bg-[#2E2E48] p-6 shadow-md border border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E84A0E]/20">
              <Compass className="h-6 w-6 text-[#E84A0E]" />
            </div>
            
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="mt-2 text-slate-300">
              To empower businesses with innovative technology solutions that drive efficiency, 
              growth, and competitive advantage in an ever-evolving digital landscape. We are 
              committed to delivering exceptional value through expertise, integrity, and 
              customer-centric service.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl bg-[#2E2E48] p-6 shadow-md border border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#A73370]/20">
              <Eye className="h-6 w-6 text-[#A73370]" />
            </div>
            
            <h3 className="text-xl font-bold">Our Vision</h3>
            <p className="mt-2 text-slate-300">
              To be the global leader in enterprise technology solutions, recognized for our innovation, 
              expertise, and unwavering commitment to client success. We envision a world where 
              businesses of all sizes can harness the full potential of technology to transform 
              their operations and achieve sustainable growth.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl bg-[#2E2E48] p-6 shadow-md border border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E84A0E]/20">
              <BarChart3 className="h-6 w-6 text-[#E84A0E]" />
            </div>
            
            <h3 className="text-xl font-bold">Our Goals</h3>
            <p className="mt-2 text-slate-300">
              Drive digital transformation across industries through cutting-edge solutions.
              Build long-term partnerships based on trust, transparency, and mutual success.
              Continuously innovate and evolve our offerings to meet emerging market needs.
              Maintain the highest standards of service excellence and technical expertise.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl bg-[#2E2E48] p-6 shadow-md border border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#A73370]/20">
              <Lightbulb className="h-6 w-6 text-[#A73370]" />
            </div>
            
            <h3 className="text-xl font-bold">Our Approach</h3>
            <p className="mt-2 text-slate-300">
              We combine deep industry knowledge with technical expertise to deliver solutions 
              that address specific business challenges. Our collaborative approach ensures we 
              understand your unique needs and provide tailored solutions that drive measurable 
              results and long-term value.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MissionVisionWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MissionVision {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MissionVisionWrapper as MissionVision };