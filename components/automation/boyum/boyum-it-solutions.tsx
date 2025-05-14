"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Database, Box, Factory, Truck, Layout, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItSolutions() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Enhance Your <span className="text-[#E84A0E]">SAP Business One</span> Experience
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Discover how our award-winning software solutions can transform your business operations and maximize your SAP Business One investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-lg ${solution.iconBg} flex items-center justify-center mb-4`}>
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{solution.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const solutions = [
  {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Perfion PIM",
    description: "A Product Information Management system that enables you to efficiently manage and distribute product data across all channels.",
    iconBg: "bg-[#E84A0E]",
    features: [
      "Centralized product data management",
      "Multi-channel distribution",
      "Integration with e-commerce platforms",
      "Automated data enrichment"
    ]
  },
  {
    icon: <Factory className="h-6 w-6 text-white" />,
    title: "Beas Manufacturing",
    description: "A comprehensive manufacturing solution that helps you optimize production processes and enhance operational efficiency.",
    iconBg: "bg-[#A73370]",
    features: [
      "Production planning & scheduling",
      "Resource management",
      "Quality control",
      "Cost tracking & analysis"
    ]
  },
  {
    icon: <Box className="h-6 w-6 text-white" />,
    title: "Produmex WMS",
    description: "A Warehouse Management System that streamlines your logistics operations and improves inventory accuracy.",
    iconBg: "bg-[#E84A0E]",
    features: [
      "Inventory management",
      "Order fulfillment",
      "Barcode & RFID scanning",
      "Advanced picking strategies"
    ]
  },
  {
    icon: <Truck className="h-6 w-6 text-white" />,
    title: "Produmex Scan",
    description: "A mobile scanning solution that enhances warehouse operations with real-time data capture and processing.",
    iconBg: "bg-[#A73370]",
    features: [
      "Mobile barcode scanning",
      "Real-time inventory updates",
      "Paperless operations",
      "Seamless SAP integration"
    ]
  },
  {
    icon: <Layout className="h-6 w-6 text-white" />,
    title: "B1 Usability Package",
    description: "Enhance SAP Business One with additional functionality and an improved user experience.",
    iconBg: "bg-[#E84A0E]",
    features: [
      "Enhanced user interface",
      "Productivity tools",
      "Customizable dashboards",
      "Advanced reporting"
    ]
  },
  {
    icon: <Layers className="h-6 w-6 text-white" />,
    title: "B1 InterCompany",
    description: "Streamline operations between multiple companies within your organization using SAP Business One.",
    iconBg: "bg-[#A73370]",
    features: [
      "Automated inter-company transactions",
      "Centralized data management",
      "Consolidated reporting",
      "Simplified compliance"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItSolutionsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItSolutions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItSolutionsWrapper as BoyumItSolutions };