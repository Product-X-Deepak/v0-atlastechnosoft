"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Settings, BarChart3, Laptop, Bot } from "lucide-react"
import { Suspense } from "react"

// Remove export from component definition
function ManufacturingValueChainComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="value-chain" ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Production Lifecycle</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Manufacturing Process</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Our solutions provide comprehensive support across the entire manufacturing lifecycle, from materials planning and production to quality control and distribution.
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
    icon: <Factory className="h-8 w-8 text-white" />,
    title: "Production Planning",
    description: "AI-enhanced scheduling tools that adapt to changing conditions and optimize resource utilization.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Capacity planning",
      "Material requirements",
      "Multi-plant coordination"
    ]
  },
  {
    icon: <Bot className="h-8 w-8 text-white" />,
    title: "Factory Automation",
    description: "Connect shop floor equipment with your SAP environment for seamless data flow and control.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Machine integration",
      "IoT connectivity",
      "Digital work instructions"
    ]
  },
  {
    icon: <Settings className="h-8 w-8 text-white" />,
    title: "Quality Control",
    description: "Real-time monitoring and predictive quality control systems to reduce defects and waste.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Inline quality testing",
      "Statistical process control",
      "Predictive defect analysis"
    ]
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    title: "Analytics",
    description: "Turn your production data into actionable insights with advanced analytics and reporting.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "OEE monitoring",
      "Bottleneck identification",
      "Cost analysis"
    ]
  },
  {
    icon: <Laptop className="h-8 w-8 text-white" />,
    title: "Smart Factory",
    description: "Embrace Industry 4.0 with solutions that integrate digital technologies with physical production.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Digital twin technology",
      "Machine learning",
      "Predictive maintenance"
    ]
  }
]

// Wrapper component with Suspense boundary
function ManufacturingValueChain(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingValueChainComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ManufacturingValueChainWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingValueChain {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ManufacturingValueChainWrapper as ManufacturingValueChain };