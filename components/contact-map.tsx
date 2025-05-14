"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Suspense } from "react"

export function ContactMap() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactMapContent />
    </Suspense>
  );
}

function ContactMapContent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="container px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight">Our Locations</h2>
          <p className="mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg text-muted-foreground">
            Visit our head office in Marine Lines or our branch office in Borivali West, Mumbai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <div className="rounded-lg overflow-hidden border border-border bg-white dark:bg-slate-800 shadow-lg p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Head Office
                </h3>
                <div>
                  <p className="text-muted-foreground">
                    Office No.29, Building No.108/116, Vitthalwadi,<br />
                    Kalabadevi Road, Marine Lines,<br />
                    Mumbai - 400 002 Maharashtra, India
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <p className="text-muted-foreground">+91-22-2240 1925</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Branch Office
                </h3>
                <div>
                  <p className="text-muted-foreground">
                    Yashodhan Building, Chandavarkar Rd,<br />
                    Borivali West,<br />
                    Mumbai, Maharashtra 400092, India
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <p className="text-muted-foreground">+91-22-2898 8230</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">Business Hours: Monday to Friday, 9:00 AM to 6:00 PM</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">Email: info@atlastechnosoft.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
