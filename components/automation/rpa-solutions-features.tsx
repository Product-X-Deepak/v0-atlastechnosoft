"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, Braces, Clock, Database, FileText, Layers, Shield, Repeat, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function RpaSolutionsFeatures() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section id="capabilities" ref={ref} className="py-16 bg-[#1E1E38]">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-10 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Key Capabilities</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="text-white text-shadow-sm">Comprehensive</span> <span className="text-[#A73370] drop-shadow-md">RPA Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Our UiPath RPA solutions offer an extensive set of capabilities to automate your business processes and drive digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button 
            className="bg-[#A73370] text-white hover:bg-[#A73370]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Detailed Capabilities Overview
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <Bot className="h-6 w-6 text-white" />,
    title: "Intelligent Automation",
    description: "Combine RPA with AI capabilities for intelligent decision-making and autonomous processing.",
    iconBg: "bg-[#E84A0E]",
    benefits: [
      "AI-powered workflow intelligence",
      "Automated decision trees",
      "Advanced pattern recognition"
    ]
  },
  {
    icon: <Repeat className="h-6 w-6 text-white" />,
    title: "Process Recording",
    description: "Record human actions and convert them into automated workflows with minimal configuration.",
    iconBg: "bg-[#A73370]",
    benefits: [
      "One-click process capture",
      "Automatic script generation",
      "Interactive editing tools"
    ]
  },
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "Data Extraction",
    description: "Extract data from various sources including documents, emails, PDFs, and legacy systems.",
    iconBg: "bg-[#E84A0E]",
    benefits: [
      "OCR and computer vision",
      "Structured data parsing",
      "Form field recognition"
    ]
  },
  {
    icon: <Layers className="h-6 w-6 text-white" />,
    title: "Multi-platform Support",
    description: "Automate processes across different applications and systems without requiring API integration.",
    iconBg: "bg-[#A73370]",
    benefits: [
      "Legacy system compatibility",
      "Cross-platform workflows",
      "Citrix and virtual environment support"
    ]
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Scheduled Execution",
    description: "Schedule bots to run at specific times or trigger them based on events for optimal resource use.",
    iconBg: "bg-[#E84A0E]",
    benefits: [
      "Calendar-based scheduling",
      "Event-driven triggers",
      "Queue management"
    ]
  },
  {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Detailed Analytics",
    description: "Monitor bot performance, track automation metrics, and generate detailed reports.",
    iconBg: "bg-[#A73370]",
    benefits: [
      "Real-time dashboards",
      "Process efficiency metrics",
      "ROI calculation tools"
    ]
  },
  {
    icon: <Braces className="h-6 w-6 text-white" />,
    title: "Low-Code Development",
    description: "Create and modify automation workflows with minimal coding using intuitive interfaces.",
    iconBg: "bg-[#E84A0E]",
    benefits: [
      "Drag-and-drop workflow builder",
      "Reusable components",
      "Version control and collaboration"
    ]
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Exception Handling",
    description: "Robust error handling and exception management to ensure business continuity.",
    iconBg: "bg-[#A73370]",
    benefits: [
      "Automatic retry mechanisms",
      "Error logging and reporting",
      "Human-in-the-loop fallbacks"
    ]
  }
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsFeaturesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsFeatures {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsFeaturesWrapper as RpaSolutionsFeatures };