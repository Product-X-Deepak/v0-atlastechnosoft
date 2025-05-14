"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react"
import { Suspense } from "react"

function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden py-12 md:py-16"
    >
      {/* Background with amber/brown gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-600">
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
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/90">
            Our SAP Business One Cloud experts can help you navigate the digital transformation journey with a personalized consultation tailored to your business needs.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6"
          >
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-white">Schedule a Consultation</h3>
              <p className="mb-3 text-xs text-white/80">
                Speak with our SAP Business One specialists to discuss your specific business challenges and objectives.
              </p>
              <Button className="w-full group bg-white text-primary hover:bg-white/90" size="sm" asChild>
                <Link href="/contact">
                  Request Consultation
                  <ArrowRight className="ml-1.5 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-white">Live Product Demo</h3>
              <p className="mb-3 text-xs text-white/80">
                See SAP Business One Cloud 2025 in action with a personalized demo focused on your industry and needs.
              </p>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary" size="sm" asChild>
                <Link href="/contact">
                  Schedule Demo
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <p className="mx-auto mt-5 text-xs text-white/70">
            Join the thousands of businesses that have streamlined operations with our SAP Business One Cloud implementation services.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// For backward compatibility
export const CtaSection = CTASection


// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CTASectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CTASection {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CTASectionWrapper as CTASection };