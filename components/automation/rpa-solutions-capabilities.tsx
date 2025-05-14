"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, BrainCircuit, FileText, Workflow, Database, ArrowRight, Clock, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function RpaSolutionsCapabilities(_props: Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  
  return (
    <section id="capabilities" ref={ref} className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
      {/* Remove the amber gradient background that was causing contrast issues */}
      
      <div className="container px-2 sm:px-3 md:px-4 lg:px-6 relative z-10">
        <div className="mx-auto mb-4 sm:mb-5 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 py-1 text-xs font-medium text-amber-800 mb-3">
            <span>Key Capabilities</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
            <span className="text-white">Comprehensive</span> <span className="text-white">RPA Solutions</span>
          </h2>
          <p className="mt-1.5 text-sm font-medium text-white max-w-2xl mx-auto">
            Our UiPath RPA solutions offer an extensive set of capabilities to automate your business processes and drive digital transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.08 * index }}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all h-full"
            >
              <div className="p-3 sm:p-4 flex flex-col h-full">
                <div className="flex-none mb-2">
                  <div className={`h-9 w-9 rounded-full ${capability.iconBg} flex items-center justify-center shadow-sm`}>
                    {capability.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">{capability.title}</h3>
                <p className="text-slate-700 text-xs leading-relaxed mb-2">{capability.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-5 sm:mt-6 flex justify-center">
          <Button 
            size="sm"
            className="h-8 text-xs bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group shadow-md" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Detailed Capabilities Overview
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const capabilities = [
  {
    icon: <Bot className="h-4 w-4 text-white" />,
    title: "Process Automation",
    description: "Combine RPA with AI capabilities for intelligent decision-making and end-to-end process automation.",
    iconBg: "bg-[#E84A0E]"
  },
  {
    icon: <Clock className="h-4 w-4 text-white" />,
    title: "Process Recording",
    description: "Record human actions and convert them into automated workflows with built-in process configuration.",
    iconBg: "bg-[#A73370]"
  },
  {
    icon: <FileText className="h-4 w-4 text-white" />,
    title: "Data Extraction",
    description: "Extract data from various sources including documents, emails, PDFs, APIs, and legacy systems.",
    iconBg: "bg-[#E84A0E]"
  },
  {
    icon: <BrainCircuit className="h-4 w-4 text-white" />,
    title: "Multi-platform Support",
    description: "Automate processes across different applications and systems without requiring API integration.",
    iconBg: "bg-[#A73370]"
  },
  {
    icon: <Workflow className="h-4 w-4 text-white" />,
    title: "Scheduled Execution",
    description: "Schedule bots to run at specific times or trigger them based on events for optimal resource use.",
    iconBg: "bg-[#E84A0E]"
  },
  {
    icon: <Database className="h-4 w-4 text-white" />,
    title: "Detailed Analytics",
    description: "Monitor bot performance, track automation metrics, and generate detailed reports for improvement.",
    iconBg: "bg-[#A73370]"
  },
  {
    icon: <Zap className="h-4 w-4 text-white" />,
    title: "Low-Code Development",
    description: "Create and modify automation workflows using intuitive drag-and-drop interfaces with minimal coding.",
    iconBg: "bg-[#E84A0E]"
  },
  {
    icon: <Shield className="h-4 w-4 text-white" />,
    title: "Exception Handling",
    description: "Robust error handling and exception management to ensure business continuity when issues arise.",
    iconBg: "bg-[#A73370]"
  }
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsCapabilitiesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsCapabilities {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsCapabilitiesWrapper as RpaSolutionsCapabilities };