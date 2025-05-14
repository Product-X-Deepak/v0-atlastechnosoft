"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Database, CreditCard, ShieldCheck, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function RetailIntegrationComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Seamless Connectivity</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            <span className="text-[#E84A0E]">Integrated</span> Retail Technology Solutions
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Connect all aspects of your retail operations with our comprehensive integration solutions, designed to work with your existing systems and third-party platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${integration.iconBg}`}>
                {integration.icon}
              </div>
              
              <h3 className="mt-4 text-xl font-bold text-slate-900">{integration.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{integration.description}</p>
              
              <div className="mt-6 space-y-3">
                {integration.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className="h-3 w-3 text-amber-600" />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[#E84A0E] border-[#E84A0E] hover:bg-[#E84A0E]/10"
                  asChild
                >
                  <Link href="/contact">Request a demo</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const integrations = [
  {
    icon: <Database className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "ERP Systems",
    description: "Connect your existing enterprise resource planning systems with our retail solutions.",
    features: [
      "SAP integration",
      "Microsoft Dynamics",
      "Oracle Retail",
      "Epicor compatibility"
    ]
  },
  {
    icon: <CreditCard className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Payment Gateways",
    description: "Seamless integration with all major payment processors and digital wallets.",
    features: [
      "Stripe, PayPal, Square",
      "Apple Pay and Google Pay",
      "Cryptocurrency options",
      "Regional payment methods"
    ]
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    iconBg: "bg-[#1E1E38]",
    title: "Security Framework",
    description: "Our solutions meet the highest security standards for retail data protection.",
    features: [
      "PCI DSS compliance",
      "Fraud detection",
      "Data encryption",
      "Secure authentication"
    ]
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    iconBg: "bg-amber-600",
    title: "Data Analytics",
    description: "Connect with business intelligence and analytics platforms to leverage your retail data.",
    features: [
      "Tableau integration",
      "Power BI compatibility",
      "Custom reporting",
      "Predictive analytics"
    ]
  }
]

// Wrapper component with Suspense boundary
function RetailIntegration(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailIntegrationComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RetailIntegrationWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RetailIntegrationWrapper as RetailIntegration };