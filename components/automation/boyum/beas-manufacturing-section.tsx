"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Zap, CheckCircle, Clock, Database, ChartBar, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BeasManufacturingSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  
  return (
    <section id="beas-manufacturing" ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>BEAS Manufacturing</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Comprehensive <span className="text-[#E84A0E]">Manufacturing Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            BEAS Manufacturing provides a complete solution for production planning, shop floor control, and quality management integrated with SAP Business One.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {manufacturingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className={`${feature.iconBg} h-12 w-12 rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2 mt-auto">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#E84A0E] mt-0.5 flex-shrink-0" />
                      <span className="ml-2 text-sm text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2025 Roadmap & Innovations</h3>
              <p className="text-sm text-slate-600 mb-4">
                Stay ahead of the competition with the latest features and innovations in the Beas Manufacturing 2025 roadmap, designed to address evolving manufacturing challenges while leveraging cutting-edge technologies.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {innovationHighlights.map((highlight, index) => (
                  <div key={index} className={`rounded-lg p-3 ${highlight.bgColor} ${highlight.textColor}`}>
                    <div className="text-lg font-bold mb-1">{highlight.value}</div>
                    <div className="text-xs font-medium">{highlight.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              {roadmapFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start rounded-lg p-3 bg-slate-50 border border-slate-200"
                >
                  <div className={`rounded-full ${feature.iconBg} p-2 text-white shadow-sm mr-3 flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{feature.title}</h4>
                    <p className="text-xs text-slate-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#1E1E38] text-white rounded-xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Manufacturing Components</h3>
                <p className="text-white/80 text-sm mb-4">
                  The BEAS Manufacturing suite consists of multiple integrated components that work together to optimize your production processes:
                </p>
                <ul className="space-y-3">
                  {manufacturingComponents.map((component, index) => (
                    <li key={index} className="flex items-start">
                      <div className="rounded-full bg-white p-1 mr-2 flex-shrink-0">
                        <div className="rounded-full bg-[#A73370] h-4 w-4"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{component.title}</h4>
                        <p className="text-xs text-white/80">{component.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Industries Served</h3>
                  <p className="text-white/80 text-sm mb-4">
                    BEAS Manufacturing is adaptable to various manufacturing industries including:
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {industries.map((industry, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-[#E84A0E] mr-2 flex-shrink-0" />
                        <span className="text-sm text-white/80">{industry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="bg-[#A73370] hover:bg-[#A73370]/90 text-white w-full" 
                    asChild
                  >
                    <Link href="/contact?solution=beas-manufacturing" className="flex items-center justify-center">
                      Request Beas Manufacturing Demo
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const manufacturingFeatures = [
  {
    icon: <Factory className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Production Planning",
    description: "Optimize your production schedule with advanced planning tools that account for capacity, material availability, and order priorities.",
    points: [
      "Visual drag-and-drop scheduling",
      "Resource capacity planning",
      "Material requirements planning",
      "Multi-level production orders"
    ]
  },
  {
    icon: <Database className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Shop Floor Control",
    description: "Gain real-time visibility into production activities with comprehensive shop floor data capture and monitoring.",
    points: [
      "Real-time production tracking",
      "Labor and machine time recording",
      "QR code-based processes",
      "Mobile-ready production entries"
    ]
  },
  {
    icon: <ChartBar className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Quality Control",
    description: "Implement comprehensive quality management across your entire production process with stage-wise quality control.",
    points: [
      "Multi-stage QC processes",
      "Statistical quality control",
      "Non-conformance management",
      "Instrument calibration tracking"
    ]
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Resource Management",
    description: "Effectively manage all manufacturing resources including machines, tools, personnel, and subcontracted services.",
    points: [
      "Resource-to-item mapping",
      "Capacity utilization analytics",
      "Skill-based assignments",
      "Maintenance scheduling"
    ]
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Costing & Analysis",
    description: "Track and analyze all production costs with detailed pre-, concurrent, and post-production calculations.",
    points: [
      "Pre-costing in quotations",
      "Actual vs. standard cost analysis",
      "Work in progress valuation",
      "Make vs. buy simulations"
    ]
  },
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Complete Traceability",
    description: "Maintain full traceability throughout your production process, from raw materials to finished products.",
    points: [
      "Order-wise production tracking",
      "Batch and serial traceability",
      "Full material genealogy",
      "End-to-end supply chain visibility"
    ]
  }
]

const innovationHighlights = [
  {
    value: "AI-Powered",
    label: "Predictive Manufacturing",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800"
  },
  {
    value: "IoT Ready",
    label: "Device Integration",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800"
  },
  {
    value: "30%",
    label: "Efficiency Increase",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800"
  },
  {
    value: "Real-Time",
    label: "Decision Support",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800"
  }
]

const roadmapFeatures = [
  {
    icon: <Settings className="h-4 w-4" />,
    iconBg: "bg-[#A73370]",
    title: "Performance Optimizations (2025)",
    description: "Enhanced speed and efficiency across all core manufacturing modules"
  },
  {
    icon: <Database className="h-4 w-4" />,
    iconBg: "bg-[#E84A0E]",
    title: "Warehouse Integration (2025)",
    description: "Streamlined process integration with Produmex WMS for end-to-end material flow"
  },
  {
    icon: <Zap className="h-4 w-4" />,
    iconBg: "bg-[#A73370]",
    title: "AI for Manufacturing (2025)",
    description: "Machine learning for predictive maintenance and quality control optimization"
  }
]

const manufacturingComponents = [
  {
    title: "Master Data & Version Control",
    description: "Extended BOMs, routings, variants, resources, and document linking"
  },
  {
    title: "MRPII & Production Strategies",
    description: "Engineer-to-order, make-to-stock with automated order creation"
  },
  {
    title: "Capacity & Scheduling",
    description: "Rough cut planning and detailed scheduling with graphical tools"
  },
  {
    title: "APS (Advanced Planning & Scheduling)",
    description: "Intelligent scheduling with resource-oriented views and simulations"
  }
]

const industries = [
  "Discrete Manufacturing",
  "Process Manufacturing",
  "Aerospace & Defense",
  "Automotive Components",
  "Electronics & High Tech",
  "Food & Beverage",
  "Medical Devices",
  "Metal Fabrication"
]

// Wrapper component to ensure proper Suspense boundaries
function BeasManufacturingSectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BeasManufacturingSection {...props} />
    </Suspense>
  );
}

export { BeasManufacturingSectionWrapper as BeasManufacturingSection }; 