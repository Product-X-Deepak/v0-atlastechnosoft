"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smartphone, Tablet, Laptop, Glasses } from "lucide-react"
import { Suspense } from "react"

function DistributionDigitalToolsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-slate-900 py-16 text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
            <span>Digital Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Digital <span className="text-[#E84A0E]">Distribution Technologies</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Transform your distribution processes with cutting-edge digital technologies that enhance visibility, reduce costs, and accelerate fulfillment.
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
              <Glasses className="h-5 w-5 mr-2 text-[#E84A0E]" />
              Next-Generation Logistics Technology
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
            <h3 className="text-xl font-semibold mb-6 text-white">Digital Transformation Benefits</h3>
            
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
          <h3 className="text-xl font-semibold mb-6 text-center text-white">Access Your Supply Chain Data Anywhere</h3>
          
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
    title: "Internet of Things (IoT) Integration",
    description: "Deploy sensors throughout your supply chain to track assets, monitor conditions, and automate data collection for proactive decision-making."
  },
  {
    title: "Blockchain for Supply Chain Transparency",
    description: "Implement immutable, shared ledgers that provide end-to-end visibility, authenticate products, and streamline trade documentation."
  },
  {
    title: "Augmented Reality Warehouse Operations",
    description: "Enhance picking efficiency and accuracy with AR-enabled tools that provide visual guidance and real-time information to warehouse staff."
  }
]

const results = [
  {
    value: "42%",
    title: "Operational Efficiency",
    description: "Average improvement in operational efficiency across distribution processes",
    valueSize: "text-2xl"
  },
  {
    value: "67%",
    title: "Increased Visibility",
    description: "Enhanced supply chain visibility from manufacturer to end customer",
    valueSize: "text-2xl"
  },
  {
    value: "3.8x",
    title: "ROI on Digital Technologies",
    description: "Average return on investment from digital logistics implementations",
    valueSize: "text-xl"
  }
]

const platforms = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#E84A0E]" />,
    title: "Mobile App",
    description: "Access real-time inventory, shipment tracking, and approvals on the go with our mobile application.",
    availability: "iOS & Android"
  },
  {
    icon: <Laptop className="h-6 w-6 text-[#E84A0E]" />,
    title: "Web Dashboard",
    description: "Comprehensive control center for analytics, planning, and operational management across your distribution network.",
    availability: "All modern browsers"
  },
  {
    icon: <Tablet className="h-6 w-6 text-[#E84A0E]" />,
    title: "Warehouse Tools",
    description: "Specialized applications for warehouse operations, including picking, packing, and inventory management.",
    availability: "Windows & iOS tablets"
  }
]

function DistributionDigitalTools(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <DistributionDigitalToolsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function DistributionDigitalToolsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <DistributionDigitalTools {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { DistributionDigitalToolsWrapper as DistributionDigitalTools };