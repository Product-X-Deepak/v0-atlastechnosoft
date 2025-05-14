"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Ship, BarChart2, Globe, ClipboardCheck } from "lucide-react"
import { Suspense } from "react"

function ShippingValueChainComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Maritime Value Chain</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Shipping Processes</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Our solutions provide comprehensive support across the entire maritime logistics value chain, from port operations and vessel management to cargo tracking and compliance.
          </p>
        </div>
        
        <div className="relative mt-16">
          {/* Value Chain Diagram */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 gap-y-8 md:grid-cols-5 md:gap-x-6">
            {valueChainSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm p-6 border border-slate-100"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor} mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-xs">{step.description}</p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-slate-700">
                      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${step.dotColor}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const valueChainSteps = [
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    title: "Documentation",
    description: "Automate and digitize customs documentation and compliance processes for error-free international shipments.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Electronic bills of lading",
      "Automated customs declarations",
      "Regulatory compliance monitoring"
    ]
  },
  {
    icon: <Ship className="h-8 w-8 text-white" />,
    title: "Vessel Management",
    description: "Optimize fleet operations with real-time tracking and intelligent scheduling algorithms.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Real-time vessel tracking",
      "Route optimization",
      "Fuel efficiency monitoring"
    ]
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-white" />,
    title: "Container Logistics",
    description: "Track and optimize your container fleet with real-time visibility and allocation algorithms.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Container tracking",
      "Booking optimization",
      "Equipment maintenance"
    ]
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-white" />,
    title: "Freight Analytics",
    description: "Gain actionable insights from your shipping data to optimize routes, reduce costs, and improve service.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Route profitability analysis",
      "Carrier performance metrics",
      "Predictive transit modeling"
    ]
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Sustainability",
    description: "Implement green shipping practices that reduce environmental impact while maintaining efficiency.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Carbon footprint reporting",
      "Emissions optimization",
      "Regulatory compliance"
    ]
  }
]

// Wrapper component with Suspense boundary
function ShippingValueChain(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingValueChainComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ShippingValueChainWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingValueChain {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ShippingValueChainWrapper as ShippingValueChain };