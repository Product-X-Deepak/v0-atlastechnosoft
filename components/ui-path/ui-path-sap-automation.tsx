"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Suspense } from "react"

function UiPathSapAutomation() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900 mb-1 shadow-sm">
              <span>SAP Automation Excellence</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#f0f4f8] md:text-4xl">
              Accelerate <span className="text-[#E84A0E]">SAP Process Automation</span> with UiPath
            </h2>
            <p className="mt-4 text-lg text-[#d0d8e0] mb-8">
              Combine the power of AI agents and RPA robots to transform your SAP operations, reduce manual effort, and improve data accuracy across your SAP landscape.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#E84A0E] mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-[#d0d8e0] font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sapSolutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (0.1 * index) }}
                  className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-base font-bold text-black mb-2">{solution.title}</h3>
                  <p className="text-sm text-slate-900">{solution.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-slate-100"
          >
            <Image 
              src="/images/solutions/B4_B.png"
              alt="UiPath SAP Automation"
              fill
              className="object-contain bg-white"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  "SAP-certified solution for secure, reliable automation of your SAP processes",
  "Reduce manual data entry and maintenance by up to 80%",
  "Enable cross-platform workflows between SAP and non-SAP systems",
  "Accelerate ECC to S/4HANA migration with automated testing and validation",
  "No disruption to your existing SAP landscape or security model"
]

const sapSolutions = [
  {
    title: "Financial Process Automation",
    description: "Streamline accounts payable, accounts receivable, financial close, and reporting processes in SAP."
  },
  {
    title: "Order-to-Cash Automation",
    description: "Automate customer orders, credit checks, deliveries, invoicing, and payment collection processes."
  },
  {
    title: "Procure-to-Pay Automation",
    description: "Efficient automation of procurement, goods receipt, invoice processing, and payment execution."
  },
  {
    title: "Master Data Management",
    description: "Automate creation, validation, and maintenance of material, vendor, customer, and other master data."
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function UiPathSapAutomationWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathSapAutomation {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { UiPathSapAutomationWrapper as UiPathSapAutomation };