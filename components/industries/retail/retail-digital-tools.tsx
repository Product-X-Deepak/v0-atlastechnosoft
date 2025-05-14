"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Suspense } from "react"

// Remove export from component definition
function RetailDigitalToolsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-slate-900 py-16 text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-purple-600/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <span>Digital Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Retail <span className="text-[#8B5CF6]">Digital Transformation</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Transform your retail business with cutting-edge digital technologies that enhance customer experience, increase sales, and streamline operations.
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
              <ShoppingCart className="h-5 w-5 mr-2 text-[#8B5CF6]" />
              Modern Retail Technology
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
        </div>
      </div>
    </section>
  )
}

const techFeatures = [
  {
    title: "Omnichannel Commerce",
    description: "Create seamless shopping experiences across physical stores, websites, mobile apps, and social media with unified inventory and customer data."
  },
  {
    title: "Intelligent Analytics",
    description: "Leverage data analytics and AI to understand customer behavior, optimize pricing, and make data-driven merchandising decisions."
  },
  {
    title: "Customer Engagement",
    description: "Build loyalty with personalized marketing, targeted promotions, and consistent brand experiences that keep customers coming back."
  }
]

// Wrapper component with Suspense boundary
function RetailDigitalTools(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailDigitalToolsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RetailDigitalToolsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailDigitalTools {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RetailDigitalToolsWrapper as RetailDigitalTools };