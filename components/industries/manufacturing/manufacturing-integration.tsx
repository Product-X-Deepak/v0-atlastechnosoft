"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Link as LinkIcon, Database, Network, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function ManufacturingIntegrationComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-600/30 bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-800">
            <span>Integration Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Seamless <span className="text-[#3B82F6]">Connectivity</span> For Your Factory
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Connect your systems, machines, and data with Atlas Technosoft&apos;s powerful integration solutions for manufacturing businesses.
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
            className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
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
    icon: <LinkIcon className="h-6 w-6 text-white" />,
    title: "SAP Business One Connectivity",
    description: "Integrate your manufacturing operations directly with SAP Business One for seamless business process management.",
    features: [
      "Production order integration",
      "Shop floor data collection",
      "Material requirements planning",
      "Quality control tracking"
    ],
    bgColor: "bg-[#3B82F6]",
    textColor: "text-[#3B82F6]"
  },
  {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Machine & Equipment Integration",
    description: "Connect your manufacturing equipment directly to your business systems for real-time data flow.",
    features: [
      "PLC and machine connectivity",
      "OEE data collection",
      "Production counter integration",
      "Machine state monitoring"
    ],
    bgColor: "bg-[#6B7280]",
    textColor: "text-[#6B7280]"
  },
  {
    icon: <Network className="h-6 w-6 text-white" />,
    title: "IoT Device Management",
    description: "Integrate IoT devices for real-time tracking, monitoring, and management of your production environment.",
    features: [
      "Environmental sensor integration",
      "Energy consumption monitoring",
      "Predictive maintenance alerts",
      "Asset tracking systems"
    ],
    bgColor: "bg-[#1F2937]",
    textColor: "text-[#1F2937]"
  },
  {
    icon: <Code className="h-6 w-6 text-white" />,
    title: "API & MES Integration",
    description: "Connect with manufacturing execution systems and other factory applications through modern API integrations.",
    features: [
      "Real-time production reporting",
      "Quality data exchange",
      "Order status integration",
      "Material tracking"
    ],
    bgColor: "bg-[#3B82F6]",
    textColor: "text-[#3B82F6]"
  }
]

// Wrapper component with Suspense boundary
function ManufacturingIntegration(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingIntegrationComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ManufacturingIntegrationWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ManufacturingIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ManufacturingIntegrationWrapper as ManufacturingIntegration };