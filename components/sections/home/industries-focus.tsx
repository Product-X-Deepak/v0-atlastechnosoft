"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Building2, ShoppingBag, Briefcase, TrendingUp, Package } from "lucide-react"
import { Suspense } from "react"

function IndustriesFocus() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="industries" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Industry Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Solutions for <span className="text-premium-orange font-extrabold">Key Industries</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            We deliver specialized solutions tailored to the unique needs of various industries, helping businesses overcome specific challenges and maximize opportunities.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col"
            >
              <div className="flex h-full flex-col rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
                <div className="mb-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${industry.iconBg} text-white shadow-md`}>
                    {industry.icon}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{industry.title}</h3>
                <p className="mb-4 text-sm text-slate-800 font-medium">{industry.description}</p>
                <div className="mt-auto space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">Key Features:</h4>
                  <ul className="space-y-1.5">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-800 font-medium">
                        <div className={`mr-2 h-1.5 w-1.5 rounded-full ${industry.dotColor}`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const industries = [
  {
    icon: <Factory className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Manufacturing",
    description: "Optimize production processes, manage inventory, and streamline operations for manufacturing businesses of all sizes.",
    features: [
      "Production planning and scheduling",
      "Quality control and compliance",
      "Supply chain optimization",
      "Equipment maintenance management",
      "Real-time shop floor visibility"
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Professional Services",
    description: "Streamline project management, resource allocation, and client billing for consulting and service-based organizations.",
    features: [
      "Project costing and tracking",
      "Resource utilization monitoring",
      "Time and expense management",
      "Client relationship management",
      "Knowledge sharing and collaboration"
    ],
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Retail & Distribution",
    description: "Connect physical and digital retail operations while optimizing inventory and enhancing customer experiences.",
    features: [
      "Inventory and warehouse management",
      "Point of sale integration",
      "E-commerce connectivity",
      "Customer loyalty programs",
      "Demand forecasting and planning"
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Financial Services",
    description: "Enhance compliance, streamline operations, and improve customer service for banks, insurance, and financial institutions.",
    features: [
      "Regulatory compliance management",
      "Risk assessment and monitoring",
      "Customer onboarding automation",
      "Transaction processing",
      "Fraud detection and prevention"
    ],
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Healthcare",
    description: "Improve patient care, optimize administrative processes, and ensure compliance with healthcare regulations.",
    features: [
      "Patient records management",
      "Appointment scheduling",
      "Insurance claims processing",
      "Compliance and reporting",
      "Inventory and supplies management"
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Package className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Wholesale & Distribution",
    description: "Optimize inventory, streamline order processing, and enhance logistics for wholesale and distribution companies.",
    features: [
      "Inventory optimization",
      "Order processing automation",
      "Warehouse management",
      "Route planning and logistics",
      "Supplier relationship management"
    ],
    dotColor: "bg-[#A73370]"
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function IndustriesFocusWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <IndustriesFocus {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { IndustriesFocusWrapper as IndustriesFocus };