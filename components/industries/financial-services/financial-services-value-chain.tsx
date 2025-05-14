"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LineChart, ShieldCheck, Users, BadgePercent, LockKeyhole } from "lucide-react"
import { Suspense } from "react"

// Remove export from component definition
function FinancialServicesValueChainComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="value-chain" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Financial Value Chain</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Financial Operations</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Modern financial success depends on connecting each stage of your business process and operational workflow. Optimize your institution with our integrated solutions.
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

// Wrapper component with Suspense boundary
function FinancialServicesValueChain(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <FinancialServicesValueChainComponent {...props} />
    </Suspense>
  )
}

const valueChainSteps = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: "Regulatory Compliance",
    description: "Automate compliance processes and reduce risks with integrated regulatory solutions.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "KYC/AML compliance",
      "Regulatory reporting",
      "Audit trails",
      "Risk monitoring"
    ]
  },
  {
    icon: <LockKeyhole className="h-8 w-8 text-white" />,
    title: "Security & Fraud",
    description: "Protect your institution and customers with advanced security measures.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Fraud detection",
      "Authentication",
      "Secure transactions",
      "Data protection"
    ]
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Customer Experience",
    description: "Create seamless, personalized digital experiences across all channels.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Digital onboarding",
      "Omnichannel engagement",
      "360° customer view",
      "Self-service options"
    ]
  },
  {
    icon: <LineChart className="h-8 w-8 text-white" />,
    title: "Risk Management",
    description: "Identify, assess, and mitigate risks across your financial portfolio.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Credit risk modeling",
      "Market risk analysis",
      "Stress testing",
      "Portfolio management"
    ]
  },
  {
    icon: <BadgePercent className="h-8 w-8 text-white" />,
    title: "Financial Insights",
    description: "Transform your data into actionable insights for better decision making.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Performance analytics",
      "Predictive modeling",
      "Trend analysis",
      "Reporting dashboards"
    ]
  }
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function FinancialServicesValueChainWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <FinancialServicesValueChain {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { FinancialServicesValueChainWrapper as FinancialServicesValueChain };