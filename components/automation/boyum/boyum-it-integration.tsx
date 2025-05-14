"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Blocks, CloudCog, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItIntegration() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Integration Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Business Systems</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Seamlessly integrate your SAP Business One with other business applications and systems for a unified data flow across your organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
          {integrationOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="h-3" style={{ background: option.accentColor }}></div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ background: option.accentColor }}>
                      {option.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{option.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{option.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Integration Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const integrationOptions = [
  {
    icon: <Share2 className="h-6 w-6 text-white" />,
    title: "B1 InterCompany",
    description: "Streamline operations between multiple companies within your organization using SAP Business One with automatic synchronization of documents and transactions.",
    accentColor: "#E84A0E",
    features: [
      "Automated inter-company transactions",
      "Centralized data management",
      "Consolidated financial reporting",
      "Simplified compliance across entities"
    ]
  },
  {
    icon: <ExternalLink className="h-6 w-6 text-white" />,
    title: "CRM for Outlook",
    description: "Connect your email directly to SAP Business One, allowing you to manage customer relationships, track opportunities, and update data without leaving Microsoft Outlook.",
    accentColor: "#A73370",
    features: [
      "Email integration with SAP Business One",
      "Create business documents from emails",
      "Update sales opportunities directly",
      "Access customer information instantly"
    ]
  },
  {
    icon: <CloudCog className="h-6 w-6 text-white" />,
    title: "API & Cloud Connectivity",
    description: "Connect SAP Business One with cloud services, third-party applications, and custom solutions through powerful and flexible API integration options.",
    accentColor: "#E84A0E",
    features: [
      "RESTful API integration",
      "Third-party application connectivity",
      "Cloud service integration",
      "Custom integration development"
    ]
  },
  {
    icon: <Blocks className="h-6 w-6 text-white" />,
    title: "Data Integration Services",
    description: "Connect, transform, and synchronize data between multiple systems and databases, ensuring consistency and accuracy across your business operations.",
    accentColor: "#A73370",
    features: [
      "Data mapping and transformation",
      "Scheduled data synchronization",
      "Master data management",
      "ETL (Extract, Transform, Load) processes"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItIntegrationWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItIntegrationWrapper as BoyumItIntegration };