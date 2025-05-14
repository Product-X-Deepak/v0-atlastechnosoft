"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smartphone, Tablet, Laptop, TestTube } from "lucide-react"
import { Suspense } from "react"

function PharmaceuticalsDigitalToolsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-slate-900 py-16 text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-teal-600/30 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300">
            <span>Digital Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Pharmaceutical <span className="text-[#0D9488]">Digital Transformation</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Transform your pharmaceutical processes with cutting-edge digital technologies that enhance compliance, reduce risks, and accelerate time to market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white flex items-center">
              <TestTube className="h-5 w-5 mr-2 text-[#0D9488]" />
              Next-Generation Pharma Technology
            </h3>
            
            <div className="space-y-4">
              {techFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#E84A0E]/20 to-[#A73370]/20 p-8 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Compliance & Security Benefits</h3>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="mr-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className={`font-bold text-white ${result.valueSize || 'text-2xl'}`}>{result.value}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{result.title}</h4>
                    <p className="text-sm text-white/80">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 text-center text-white">Access Your Pharma Data Anywhere</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-[#E84A0E]/20 p-3">
                    {platform.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-white">{platform.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{platform.description}</p>
                
                <div className="mt-4 text-sm text-[#E84A0E]">
                  {platform.availability}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const techFeatures = [
  {
    title: "GxP Compliant Systems",
    description: "Fully validated platforms that ensure regulatory compliance while streamlining operations across R&D, manufacturing, and quality control."
  },
  {
    title: "Blockchain for Supply Chain",
    description: "Immutable ledger technology that ensures end-to-end traceability, combats counterfeiting, and enhances patient safety."
  },
  {
    title: "AI-Powered Drug Discovery",
    description: "Machine learning models that accelerate candidate identification, optimize clinical trials, and personalize treatment approaches."
  }
]

const results = [
  {
    value: "99.9%",
    title: "Supply Chain Visibility",
    description: "Complete transparency across your pharmaceutical supply chain",
    valueSize: "text-xl"
  },
  {
    value: "85%",
    title: "Reduction in Counterfeits",
    description: "Significant decrease in counterfeit incidents with blockchain verification",
    valueSize: "text-xl"
  },
  {
    value: "100%",
    title: "Regulatory Compliance",
    description: "Full compliance with FDA, EMA, and global regulatory standards",
    valueSize: "text-xl"
  }
]

const platforms = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#E84A0E]" />,
    title: "Mobile Compliance App",
    description: "Access compliance data, approve quality reviews, and monitor serialization on your mobile device.",
    availability: "iOS & Android"
  },
  {
    icon: <Laptop className="h-6 w-6 text-[#E84A0E]" />,
    title: "Regulatory Dashboard",
    description: "Comprehensive control center for compliance management, audit preparation, and regulatory submissions.",
    availability: "Web-based platform"
  },
  {
    icon: <Tablet className="h-6 w-6 text-[#E84A0E]" />,
    title: "Lab & Production Tools",
    description: "Tablet-based applications for laboratory testing, batch record review, and production monitoring.",
    availability: "Windows & iOS tablets"
  }
]

function PharmaceuticalsDigitalTools(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsDigitalToolsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsDigitalToolsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsDigitalTools {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsDigitalToolsWrapper as PharmaceuticalsDigitalTools };