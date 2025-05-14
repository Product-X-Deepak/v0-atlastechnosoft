"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"
import { Suspense } from "react"

function IntegrationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="integration" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Seamless Integration</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Connect Your <span className="text-premium-orange font-extrabold">Entire Business</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            Our solutions integrate seamlessly with your existing business systems and third-party applications, providing a unified platform for all your operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/solutions/Integration.jpg"
                alt="Integration Ecosystem"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-premium-heading mb-4">Integration Capabilities</h3>
            <p className="text-premium-text mb-6 font-medium">
              We offer comprehensive integration options to ensure your business systems work together seamlessly, eliminating data silos and enabling real-time information flow across your organization.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {integrationFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-800 mb-3 font-medium">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-premium-orange mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-800 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-premium-heading mb-3">Popular Integrations</h4>
              <div className="flex flex-wrap gap-3">
                {integrationLogos.map((logo, index) => (
                  <div 
                    key={index} 
                    className="flex h-12 items-center justify-center rounded bg-white px-4 shadow-sm border border-slate-100"
                  >
                    <span className="font-medium text-slate-900">{logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const integrationFeatures = [
  {
    title: "API Connectivity",
    description: "Connect to any system with our robust API framework",
    points: [
      "RESTful API support",
      "Real-time data synchronization",
      "Secure data exchange protocols",
    ]
  },
  {
    title: "Pre-Built Connectors",
    description: "Ready-to-use connectors for popular platforms",
    points: [
      "CRM integration (Salesforce, Microsoft)",
      "E-commerce platforms (Shopify, Magento)",
      "Payment gateways and banking systems",
    ]
  },
  {
    title: "Custom Integrations",
    description: "Tailor-made integration solutions for unique needs",
    points: [
      "Legacy system integration",
      "Industry-specific applications",
      "Custom workflow automation",
    ]
  },
  {
    title: "Data Migration",
    description: "Seamless data transfer between systems",
    points: [
      "Automated data mapping",
      "Validation and cleaning procedures",
      "Historical data preservation",
    ]
  },
]

const integrationLogos = [
  "Microsoft 365",
  "Salesforce",
  "AWS",
  "Shopify",
  "PayPal",
  "Stripe",
  "Google Cloud",
  "Zapier",
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function IntegrationSectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <IntegrationSection {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { IntegrationSectionWrapper as IntegrationSection };