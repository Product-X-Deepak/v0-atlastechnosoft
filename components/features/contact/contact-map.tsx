"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Building } from "lucide-react"
import { Suspense } from "react"

function ContactMap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/80 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1E1E38] to-transparent"></div>
      <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-[#E84A0E]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-[#A73370]/5 blur-3xl"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Visit Our <span className="text-[#E84A0E]">Offices</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We have two convenient locations in Mumbai to serve you better.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          <div className="rounded-lg overflow-hidden border border-border bg-white dark:bg-slate-800 shadow-lg h-auto min-h-[400px] relative group p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4 text-[#E84A0E]">
                <Building className="h-6 w-6" />
                <h3 className="font-semibold text-xl">Head Office</h3>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-[#E84A0E]" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      Office No.29, Building No.108/116, Vitthalwadi,<br />
                      Kalabadevi Road, Marine Lines,<br />
                      Mumbai - 400 002 Maharashtra, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-[#E84A0E]" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91-22-2240 1925</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-[#E84A0E]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@atlastechnosoft.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-muted-foreground">Saturday & Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden border border-border bg-white dark:bg-slate-800 shadow-lg h-auto min-h-[400px] relative group p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4 text-[#A73370]">
                <Building className="h-6 w-6" />
                <h3 className="font-semibold text-xl">Branch Office</h3>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-[#A73370]" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      Yashodhan Building, Chandavarkar Rd,<br />
                      Borivali West,<br />
                      Mumbai, Maharashtra 400092, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-[#A73370]" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91-22-2898 8230</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-[#A73370]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@atlastechnosoft.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-muted-foreground">Saturday & Sunday: Closed</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Don&apos;t have time to visit? Contact us at <span className="font-medium text-[#E84A0E]">+91-22-2240 1925</span> for immediate assistance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ContactMapWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactMap />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactMapWrapper as ContactMap };
