"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, CalendarDays, CheckCircle, Clock, Users } from "lucide-react"
import { Suspense } from "react"

function ErpPlanningCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden py-12 md:py-16 mt-16 md:mt-24"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <pattern id="cta-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
      </div>
      
      {/* Glowing accents */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl opacity-70 mix-blend-overlay"></div>
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl opacity-70 mix-blend-overlay"></div>
      
      <div className="container relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-white">
            Our certified ERP Planning experts help you navigate the digital transformation journey with a strategic implementation plan tailored to your specific business needs and growth objectives.
          </p>
          
          <div className="mt-6 mb-6 flex flex-wrap justify-center gap-2">
            {['98% Client Satisfaction', '7-Day Response Guarantee', '30+ Industry Specialists', 'SOC 2 Certified'].map((feature, index) => (
              <div key={index} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                <CheckCircle className="h-3 w-3 text-amber-200" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 grid gap-4 md:grid-cols-2"
          >
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-amber-100">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">Strategic ERP Consultation</h3>
              <ul className="mb-3 space-y-1.5">
                {[
                  'Business process analysis',
                  'ERP requirements definition',
                  'Implementation strategy',
                  'Technology recommendations'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-white/80">
                    <CheckCircle className="h-3.5 w-3.5 text-amber-200 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-200" />
                  <span className="text-xs text-amber-100">90-Min Deep Dive</span>
                </div>
                <Button className="group bg-white text-amber-900 hover:bg-amber-100 hover:text-amber-950 border border-transparent h-7 text-xs rounded-md px-2" asChild>
                  <Link href="/contact" className="flex items-center gap-1">
                    Request Consultation
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-amber-100">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">ERP Planning Workshop</h3>
              <ul className="mb-3 space-y-1.5">
                {[
                  'Stakeholder engagement',
                  'Process optimization',
                  'Implementation roadmap',
                  'Change management planning'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-white/80">
                    <CheckCircle className="h-3.5 w-3.5 text-amber-200 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-amber-200" />
                  <span className="text-xs text-amber-100">Half-Day Session</span>
                </div>
                <Button variant="outline" className="group border-white text-white hover:bg-white hover:text-amber-900 h-7 text-xs rounded-md px-2" asChild>
                  <Link href="/contact" className="flex items-center gap-1">
                    Schedule Workshop
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 grid gap-y-4 md:grid-cols-3 md:gap-x-6 text-center md:text-left"
          >
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-amber-200 mb-1">Implementation Timeline</h4>
              <p className="text-white/80 text-xs">Begin seeing results in as little as 8-12 weeks with our accelerated implementation methodology.</p>
            </div>
            
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-amber-200 mb-1">Proven Expertise</h4>
              <p className="text-white/80 text-xs">Our team has successfully delivered 200+ ERP implementations across diverse industries worldwide.</p>
            </div>
            
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-amber-200 mb-1">Continuous Support</h4>
              <p className="text-white/80 text-xs">Comprehensive post-implementation support with 24/7 access to our technical team.</p>
            </div>
          </motion.div>
          
          <p className="mx-auto mt-8 text-xs text-white/70 max-w-2xl">
            Join the thousands of businesses that have transformed operations with our strategic ERP Planning and implementation services, achieving an average of 145% ROI within the first year.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-5 inline-flex rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-0.5 pr-2.5"
          >
            <div className="rounded-full bg-amber-900 px-2 py-0.5 text-[10px] font-medium text-white mr-1.5">NEW</div>
            <span className="text-[10px] text-white/90">Free ERP Readiness Assessment for qualified organizations</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningCtaWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningCtaWrapper as ErpPlanningCta };