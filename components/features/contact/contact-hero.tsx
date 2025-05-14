"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ContactHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#E84A0E]/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#A73370]/10 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto text-center max-w-3xl">
            {/* Top badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex justify-center mb-2"
            >
              <div className="inline-flex h-7 items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 text-xs font-medium text-amber-800">
                Contact Us
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 mb-3"
            >
              Let's Start a <span className="text-[#E84A0E]">Conversation</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm md:text-base text-slate-700 mb-4 mx-auto"
            >
              Reach out to our team of experts to discuss how we can help transform your business.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
            >
              <Button 
                size="default" 
                className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white w-full sm:w-auto group text-sm h-9" 
                asChild
              >
                <Link href="#contact-section" className="flex items-center">
                  Contact Us Now
                  <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white w-full sm:w-auto text-sm h-9" 
                asChild
              >
                <Link href="/sap-solutions/business-one" className="flex items-center">
                  Explore Solutions
                  <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Contact points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {contactPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-amber-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 mb-2 shadow-sm">
                  {point.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{point.title}</h3>
                <p className="text-xs text-slate-600 text-center">{point.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const contactPoints = [
  {
    icon: <Phone className="h-4 w-4 text-[#E84A0E]" />,
    title: "Call Us",
    description: "+91-22-2240 1925",
  },
  {
    icon: <Mail className="h-4 w-4 text-[#A73370]" />,
    title: "Email Us",
    description: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@atlastechnosoft.com",
  },
  {
    icon: <MapPin className="h-4 w-4 text-[#E84A0E]" />,
    title: "Visit Us",
    description: "Mumbai, Maharashtra, India",
  },
] 

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ContactHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[200px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactHeroWrapper as ContactHero };