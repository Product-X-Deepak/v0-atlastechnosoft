"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ContactHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-10 md:py-14">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFF5D6]/50 to-transparent"></div>
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#E84A0E]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-[#A73370]/10 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-2.5 py-0.5 text-sm font-medium text-amber-800">
            <span>Contact Us</span>
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl"
          >
            Ready to <span className="text-[#E84A0E]">Connect</span> with <br />
            <span className="text-[#A73370]">Atlas Technosoft</span>?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mb-6 max-w-2xl text-sm md:text-base text-slate-700"
          >
            Reach out to our team of experts to discuss how we can help transform your business with innovative technology solutions.
          </motion.p>
        </div>

        <div className="mx-auto mb-6 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {contactPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              className="flex flex-col items-center p-3 text-center bg-white/50 backdrop-blur-sm rounded-lg border border-slate-200/50 shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {point.icon}
              </div>
              <h3 className="mt-1.5 text-xs font-semibold text-slate-900">{point.title}</h3>
              <p className="mt-0.5 text-[10px] text-slate-600">{point.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0"
        >
          <Button 
            size="default" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group w-full sm:w-auto" 
            asChild
          >
            <Link href="#contactform" className="flex items-center text-sm">
              Contact Us Now
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="default" 
            variant="outline" 
            className="bg-white/80 backdrop-blur-sm border-[#1E1E38]/80 text-[#1E1E38] hover:bg-[#1E1E38]/10 hover:text-[#1E1E38] w-full sm:w-auto shadow-sm" 
            asChild
          >
            <Link href="/sap-solutions" className="flex items-center text-sm">
              Explore Solutions
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const contactPoints = [
  {
    icon: <MapPin className="h-5 w-5 text-[#E84A0E]" />,
    title: "Head Office",
    description: "Mumbai, Maharashtra, India",
  },
  {
    icon: <MapPin className="h-5 w-5 text-[#A73370]" />,
    title: "Branch Office",
    description: "Borivali West, Mumbai, India",
  },
  {
    icon: <Phone className="h-5 w-5 text-[#A73370]" />,
    title: "Call Us",
    description: "+91-22-2240 1925",
  },
  {
    icon: <Mail className="h-5 w-5 text-[#E84A0E]" />,
    title: "Email Us",
    description: "info@atlastechnosoft.com",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ContactHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactHeroWrapper as ContactHero };