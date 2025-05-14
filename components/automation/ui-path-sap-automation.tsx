"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function UiPathSapAutomation() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  
  const benefits = [
    "Automate SAP GUI, S/4HANA, and SAP Web transactions",
    "Streamline core SAP business processes end-to-end",
    "Extract and process data from SAP documents",
    "Validate SAP data during migration and upgrades",
    "Reduce manual SAP data entry and processing errors",
    "Connect SAP with non-SAP systems and applications"
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100" id="sap-automation">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-amber-600/5 rounded-full mix-blend-multiply blur-3xl opacity-70"></div>

      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-4 shadow-sm">
              <span>SAP Automation Excellence</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-900 mb-4">
              Accelerate <span className="text-[#E84A0E]">SAP Process Automation</span> with UiPath Agentic Solutions
            </h2>
            <p className="text-slate-700 mb-8 text-base">
              Combine the power of AI agents and RPA robots to transform your SAP operations, reduce manual effort, and improve data accuracy across your SAP landscape.
            </p>
            
            <div className="grid grid-cols-1 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#E84A0E] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-6 mt-8 bg-white p-4 rounded-lg shadow-sm border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-[#E84A0E] font-bold text-xl">70%</span>
                </div>
                <p className="text-sm text-slate-700">Faster SAP<br/>process execution</p>
              </div>
              <div className="h-10 w-px bg-amber-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-[#A73370] font-bold text-xl">100%</span>
                </div>
                <p className="text-sm text-slate-700">Data accuracy in<br/>SAP transactions</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-5">
              <Image 
                src="/images/solutions/B4_B.png"
                alt="UiPath SAP Automation"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 