"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Target, Lightbulb, Sparkles, Zap, Globe } from "lucide-react"
import { Suspense } from "react"

function MissionVisionSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24 bg-transparent">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#E84A0E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#A73370]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Blueprint for Tomorrow</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Guided by <span className="text-[#E84A0E]">Vision</span> & <span className="text-[#A73370]">Mission</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-600">
            We&apos;re shaping the future of enterprise technology with a clear mission and bold vision
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col text-center bg-white rounded-xl shadow-sm p-8 border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Decorative background elements */}
            <div className="absolute right-0 top-0 h-24 w-24 origin-top-right opacity-10">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L96 0L96 96" fill="#E84A0E" />
                <path d="M0 0L96 0L96 96" stroke="#E84A0E" />
              </svg>
            </div>
            
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E84A0E] text-white shadow-sm">
              <Target className="h-8 w-8" />
            </div>
            
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#E84A0E]">Our Mission</h3>
            <h4 className="mb-6 text-3xl font-bold text-slate-900">Empowering Digital Excellence</h4>
            
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              To transform businesses through innovative technology solutions that optimize operations, accelerate growth, and create sustainable competitive advantage.
            </p>
            
            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              {[
                "Deliver enterprise-grade solutions with measurable ROI",
                "Foster lasting partnerships built on trust and mutual success",
                "Continuously innovate to keep clients ahead of industry trends",
                "Provide exceptional support and expert guidance throughout digital journeys"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-[#E84A0E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            {/* Futuristic corner accent */}
            <div className="absolute bottom-0 right-0 flex space-x-3 p-4 text-[#E84A0E] opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="h-4 w-4" />
              <Zap className="h-4 w-4" />
              <Globe className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-col text-center bg-white rounded-xl shadow-sm p-8 border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Decorative background elements */}
            <div className="absolute left-0 bottom-0 h-24 w-24 origin-bottom-left opacity-10 rotate-180">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L96 0L96 96" fill="#A73370" />
                <path d="M0 0L96 0L96 96" stroke="#A73370" />
              </svg>
            </div>
            
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#A73370] text-white shadow-sm">
              <Lightbulb className="h-8 w-8" />
            </div>
            
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#A73370]">Our Vision</h3>
            <h4 className="mb-6 text-3xl font-bold text-slate-900">Pioneering the Future</h4>
            
            <p className="mb-6 text-lg leading-relaxed text-slate-800">
              To be the global leader in enterprise transformation, pioneering quantum-powered solutions that redefine what&apos;s possible for businesses in a rapidly evolving digital landscape.
            </p>
            
            <div className="mb-6 space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-50 to-white p-5 text-left border border-slate-100 group-hover:border-[#A73370]/20 transition-colors">
                <h5 className="mb-2 font-semibold text-slate-900">2030 Strategic Horizon</h5>
                <p className="text-sm text-slate-600">
                  Seamlessly integrating quantum computing and advanced AI to unlock unprecedented business intelligence and process automation.
                </p>
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#A73370]/10" />
              </div>
              
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-50 to-white p-5 text-left border border-slate-100 group-hover:border-[#E84A0E]/20 transition-colors">
                <h5 className="mb-2 font-semibold text-slate-900">Global Impact Initiative</h5>
                <p className="text-sm text-slate-600">
                  Expanding our technologies to empower businesses across emerging markets, driving economic growth through digital transformation.
                </p>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-[#E84A0E]/10" />
              </div>
            </div>
            
            {/* Futuristic corner accent */}
            <div className="absolute bottom-0 left-0 flex space-x-3 p-4 text-[#A73370] opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="h-4 w-4" />
              <Zap className="h-4 w-4" />
              <Globe className="h-4 w-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MissionVisionSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MissionVisionSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MissionVisionSectionWrapper as MissionVisionSection };
