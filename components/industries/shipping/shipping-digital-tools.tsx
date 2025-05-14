"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smartphone, Laptop, Ship, MapPin } from "lucide-react"
import { Suspense } from "react"

function ShippingDigitalToolsComponent(_props: Record<string, unknown>) {
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
            Global <span className="text-[#E84A0E]">Maritime Technology</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Leverage cutting-edge technology to optimize your global shipping operations, enhance visibility, and maintain regulatory compliance.
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
              <Ship className="h-5 w-5 mr-2 text-[#E84A0E]" />
              Next-Generation Maritime Solutions
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
          <h3 className="text-xl font-semibold mb-6 text-center text-white">Access Your Shipping Data Anywhere</h3>
          
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
    title: "Maritime IoT Solutions",
    description: "Connect your vessels and containers with IoT sensors for real-time monitoring of location, condition, and security."
  },
  {
    title: "Blockchain for Trade Documentation",
    description: "Implement secure, transparent documentation processes using blockchain to streamline customs clearance and reduce fraud."
  },
  {
    title: "AI-Powered Route Optimization",
    description: "Leverage artificial intelligence to determine optimal shipping routes based on weather, port congestion, and fuel efficiency."
  }
]

const results = [
  {
    value: "25%",
    title: "Fuel Efficiency Improvement",
    description: "Average fuel savings through optimized route planning and vessel performance monitoring",
    valueSize: "text-2xl"
  },
  {
    value: "45%",
    title: "Documentation Processing Time",
    description: "Reduction in time required for customs and regulatory documentation",
    valueSize: "text-2xl"
  },
  {
    value: "99.8%",
    title: "Cargo Visibility",
    description: "Track shipments with near-perfect accuracy across the entire global supply chain",
    valueSize: "text-2xl"
  }
]

const platforms = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#E84A0E]" />,
    title: "Mobile Fleet Management",
    description: "Monitor your vessels, cargo, and operations on the go with our powerful mobile application.",
    availability: "iOS & Android"
  },
  {
    icon: <Laptop className="h-6 w-6 text-[#E84A0E]" />,
    title: "Command Center",
    description: "Comprehensive control center for fleet-wide visibility, reporting, and operation management.",
    availability: "Web-based platform"
  },
  {
    icon: <MapPin className="h-6 w-6 text-[#E84A0E]" />,
    title: "Global Tracking Portal",
    description: "Share real-time shipment status with your customers through a dedicated tracking interface.",
    availability: "All devices"
  }
]

// Wrapper component with Suspense boundary
function ShippingDigitalTools(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingDigitalToolsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ShippingDigitalToolsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingDigitalTools {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ShippingDigitalToolsWrapper as ShippingDigitalTools };