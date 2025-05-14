"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ExternalLink, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"

function ErpPlanningArchitecture() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const integrationPoints = [
    "Microsoft Office Suite",
    "E-commerce Platforms",
    "CRM Systems",
    "Banking & Financial Services",
    "Logistics & Shipping",
    "Manufacturing Systems",
    "Warehouse Management",
    "Business Intelligence Tools",
    "Custom-built Solutions",
    "Legacy Systems Migration"
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden mt-16 md:mt-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-800/5 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-900/5 rounded-full blur-3xl opacity-60"></div>

      <div className="container relative px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-2 shadow-sm">
            <span>System Architecture</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-premium-heading">Flexible <span className="text-premium-orange">System Architecture</span></h2>
          <p className="text-premium-text font-medium sm:text-lg max-w-[90%]">
            SAP Business One provides a robust, scalable architecture with seamless integration capabilities to connect your entire business ecosystem.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-amber-200 p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Technical Foundation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-900">SAP HANA Database</span>
                        <p className="text-sm text-slate-600">In-memory computing for lightning-fast data processing and real-time analytics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-900">Cloud or On-Premises Deployment</span>
                        <p className="text-sm text-slate-600">Flexible deployment options to suit your business requirements and IT strategy</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-900">Service Layer API</span>
                        <p className="text-sm text-slate-600">RESTful API architecture for seamless integrations and extensibility</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
              <div className="bg-white rounded-lg border border-amber-200 p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Integration Framework</h3>
                  <p className="text-slate-600 mb-4">
                    SAP Business One Integration Framework enables connectivity with virtually any system or service:
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {integrationPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-800" />
                        <span className="text-sm text-slate-900">{point}</span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild className="gap-2 font-bold bg-amber-100 border-2 border-amber-800 text-amber-900 hover:bg-amber-200 hover:text-amber-950 shadow-md px-5 py-6">
                  <Link href="/contact" className="flex items-center">
                    Learn About Our Integration Services
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* SAP Business One Architecture Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto h-auto w-full max-w-[500px]"
          >
            <div className="h-full w-full rounded-xl border-2 border-amber-300 bg-white/80 flex flex-col items-center justify-center p-6 shadow-md">
              <div className="rounded-xl bg-amber-50 w-full h-full flex flex-col items-center justify-center p-4">
                <h3 className="text-lg font-bold text-center mb-4 text-slate-900">SAP Business One Architecture</h3>
                
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
                    <Image 
                      src="/images/solutions/B3_A.png" 
                      alt="SAP Business One Architecture Diagram" 
                      fill 
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-premium-text max-w-2xl mx-auto p-4 rounded-lg">
              Our ERP planning approach ensures that your SAP Business One implementation leverages the right architectural configuration for optimal performance, scalability, and integration with your existing systems.
            </p>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningArchitectureWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningArchitecture {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningArchitectureWrapper as ErpPlanningArchitecture };