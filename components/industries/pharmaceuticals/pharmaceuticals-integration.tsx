"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Link as LinkIcon, Database, Network, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function PharmaceuticalsIntegrationComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-gradient-to-b from-teal-50 to-white py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-teal-600/30 bg-teal-100/80 px-4 py-2 text-sm font-medium text-teal-800">
            <span>Integration Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Seamless <span className="text-[#0D9488]">Connectivity</span> For Your Business
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Connect your systems, laboratory equipment, and supply chain with Atlas Technosoft&apos;s powerful integration solutions for pharmaceutical businesses.
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
            className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white"
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
    description: "Integrate your pharmaceutical operations directly with SAP Business One for seamless business process management.",
    features: [
      "Regulatory document management",
      "Batch and lot tracking",
      "Shelf-life management",
      "Quality hold integration"
    ],
    bgColor: "bg-[#0D9488]",
    textColor: "text-[#0D9488]"
  },
  {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Laboratory Information Management",
    description: "Connect your LIMS systems with your ERP for seamless quality control and test result management.",
    features: [
      "Test result integration",
      "Sample tracking",
      "Stability study management",
      "Automated quality approvals"
    ],
    bgColor: "bg-[#5E17EB]",
    textColor: "text-[#5E17EB]"
  },
  {
    icon: <TestTube className="h-6 w-6 text-white" />,
    title: "Blockchain Serialization",
    description: "End-to-end product serialization and tracking with blockchain technology for supply chain security.",
    features: [
      "Global compliance (DSCSA, FMD)",
      "Cold chain verification",
      "Anti-counterfeiting",
      "Product authentication"
    ],
    bgColor: "bg-[#0D9488]",
    textColor: "text-[#0D9488]"
  },
  {
    icon: <Network className="h-6 w-6 text-white" />,
    title: "Clinical Trial Integration",
    description: "Connect clinical trial systems with supply chain and manufacturing for seamless R&D operations.",
    features: [
      "Patient randomization",
      "Clinical supply management",
      "Blinding procedures",
      "Protocol management"
    ],
    bgColor: "bg-[#5E17EB]",
    textColor: "text-[#5E17EB]"
  }
]

// Wrapper component with Suspense boundary
function PharmaceuticalsIntegration(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsIntegrationComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsIntegrationWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsIntegrationWrapper as PharmaceuticalsIntegration };