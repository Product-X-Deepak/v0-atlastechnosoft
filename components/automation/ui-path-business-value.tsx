"use client"

import React, { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Building2, Landmark, HeartPulse, Shield, Wrench, Truck } from "lucide-react"

export default function UiPathBusinessValue() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  
  const industries = [
    {
      icon: <Building2 className="h-6 w-6 text-white" />,
      title: "Banking & Financial Services",
      description: "Automate customer onboarding, loan processing, fraud detection, and regulatory compliance.",
      imageUrl: "/images/solutions/uipath-banking.jpg"
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-white" />,
      title: "Healthcare",
      description: "Streamline patient registration, claims processing, and medical record management.",
      imageUrl: "/images/solutions/uipath-healthcare.jpg"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Insurance",
      description: "Accelerate claims processing, policy management, and underwriting workflows.",
      imageUrl: "/images/solutions/uipath-insurance.jpg"
    },
    {
      icon: <Landmark className="h-6 w-6 text-white" />,
      title: "Public Sector",
      description: "Enhance citizen services, document processing, and regulatory compliance.",
      imageUrl: "/images/solutions/uipath-public-sector.jpg"
    },
    {
      icon: <Truck className="h-6 w-6 text-white" />,
      title: "Manufacturing",
      description: "Optimize supply chain, quality control, and production planning processes.",
      imageUrl: "/images/solutions/uipath-manufacturing.jpg"
    },
    {
      icon: <Wrench className="h-6 w-6 text-white" />,
      title: "Telecom",
      description: "Improve customer service, network operations, and service provisioning.",
      imageUrl: "/images/solutions/uipath-telecom.jpg"
    }
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden" id="business-value">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-800/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Measurable Business Value</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-900">
            Transforming Industries with Agentic Automation
          </h2>
          <p className="text-slate-800 font-medium text-sm sm:text-base max-w-[85%] mt-2">
            From finance to healthcare and beyond, UiPath&apos;s agentic automation accelerates your AI transformation with verifiable ROI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={industry.imageUrl}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent flex items-end">
                  <div className="p-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#E84A0E] text-white mb-2">
                      {industry.icon}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{industry.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{industry.description}</p>
                <Link href="#" className="inline-flex items-center text-[#E84A0E] text-sm font-medium hover:text-[#E84A0E]/80">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-4 py-2 rounded-lg bg-amber-50 text-amber-900 font-medium border border-amber-200">
            Partner with UiPath to transform your industry-specific processes
          </div>
        </motion.div>
      </div>
    </section>
  )
} 