"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, FileText, Ship, BarChart2, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function ShippingSolutionsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="solutions" ref={ref} className="bg-slate-50 py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
            Your Business. Your Goals. <span className="text-[#E84A0E]">Choose What Suits You Best.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our solutions help maritime businesses overcome complex challenges, streamline operations, and elevate their position in the global trade ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shippingSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${solution.bgColor} mb-4`}>
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{solution.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{solution.description}</p>
              
              <div className="mt-4 space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className={`h-3 w-3 ${solution.textColor}`} />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link
                  href={solution.link}
                  className={`inline-flex items-center text-sm font-medium ${solution.textColor}`}
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const shippingSolutions = [
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "Global Trade Documentation",
    description: "Automate and digitize customs documentation and compliance processes for faster, error-free international shipments.",
    features: [
      "Electronic bills of lading",
      "Automated customs declarations",
      "Regulatory compliance monitoring",
      "Certificate of origin management"
    ],
    bgColor: "bg-[#1E1E38]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  },
  {
    icon: <Ship className="h-6 w-6 text-white" />,
    title: "Container Management",
    description: "Track and optimize your container fleet with real-time visibility and intelligent allocation algorithms.",
    features: [
      "Real-time container tracking",
      "Booking and allocation optimization",
      "Equipment maintenance scheduling",
      "Empty container repositioning"
    ],
    bgColor: "bg-[#A73370]",
    textColor: "text-[#A73370]",
    link: "/contact"
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    title: "Freight Analytics",
    description: "Gain actionable insights from your shipping data to optimize routes, reduce costs, and improve service levels.",
    features: [
      "Route profitability analysis",
      "Carrier performance metrics",
      "Predictive transit time modeling",
      "Carbon footprint reporting"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  }
]

// Wrapper component with Suspense boundary
function ShippingSolutions(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingSolutionsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ShippingSolutionsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingSolutions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ShippingSolutionsWrapper as ShippingSolutions };