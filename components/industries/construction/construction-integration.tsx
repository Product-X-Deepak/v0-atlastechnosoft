"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Ruler, Users, FileSpreadsheet, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function ConstructionIntegrationComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-gradient-to-b from-amber-50 to-white py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Integration Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
            Seamless <span className="text-[#E84A0E]">Connectivity</span> For Your Construction Systems
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Connect your project management, field operations, and accounting systems with Atlas Technosoft&apos;s powerful integration solutions for construction companies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {integrationOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${option.bgColor} mb-4`}>
                {option.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">{option.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{option.description}</p>
              
              <div className="mt-6 space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className={`h-3 w-3 ${option.textColor}`} />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button
            className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Integration Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const integrationOptions = [
  {
    icon: <Ruler className="h-6 w-6 text-white" />,
    title: "BIM Systems Integration",
    description: "Connect your Building Information Modeling tools with project management and financial systems.",
    features: [
      "3D model sync with project schedules",
      "Quantity takeoffs integration",
      "Design change synchronization",
      "Clash detection reporting"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "HR & Payroll Integration",
    description: "Streamline workforce management and time tracking across your construction operations.",
    features: [
      "Field time capture to payroll",
      "Labor cost allocation by project/task",
      "Certification and compliance tracking",
      "Subcontractor workforce management"
    ],
    bgColor: "bg-[#A73370]",
    textColor: "text-[#A73370]"
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6 text-white" />,
    title: "Accounting Integration",
    description: "Connect project costs and financial management with your accounting systems.",
    features: [
      "Project cost to GL mapping",
      "AP/AR automation",
      "Certified payroll integration",
      "Multi-company financials"
    ],
    bgColor: "bg-[#1E1E38]",
    textColor: "text-[#1E1E38]"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    title: "Analytics & Reporting",
    description: "Advanced business intelligence connecting all aspects of your construction operations.",
    features: [
      "Cross-project performance tracking",
      "Productivity analysis",
      "Financial KPI dashboards",
      "Custom reporting solutions"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]"
  }
]

// Wrapper component with Suspense boundary
function ConstructionIntegration(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConstructionIntegrationComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConstructionIntegrationWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConstructionIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConstructionIntegrationWrapper as ConstructionIntegration };