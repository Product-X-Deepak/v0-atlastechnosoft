"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Bot, 
  Database,
  Network, 
  CreditCard, 
  FileSpreadsheet,
  FileCheck,
  GanttChartSquare,
  Factory,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

function UiPathCapabilities() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-10 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-8 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 py-1 text-xs font-medium text-amber-800">
            <span>Complete Automation Platform</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            UiPath <span className="text-[#E84A0E]">Capabilities</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            A comprehensive platform with everything you need to discover, build, manage, and run automations across your enterprise.
          </p>
        </div>
        
        <div className="grid gap-6">
          {/* RPA & AI Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Robotic Process Automation & AI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rpaCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E84A0E]/10">
                    {capability.icon}
                  </div>
                  
                  <h4 className="mt-3 text-base font-bold text-slate-900">{capability.title}</h4>
                  <p className="mt-1 text-xs text-slate-600">{capability.description}</p>
                  
                  {capability.badge && (
                    <div className="mt-2 inline-flex items-center rounded-full border border-amber-700/30 bg-amber-100/50 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {capability.badge}
                    </div>
                  )}
                  
                  <div className="mt-3 space-y-1.5">
                    {capability.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <ArrowRight className="h-2.5 w-2.5 text-[#E84A0E]" />
                        </div>
                        <span className="text-[10px] text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Integration Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Integration & Connectivity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrationCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A73370]/10">
                    {capability.icon}
                  </div>
                  
                  <h4 className="mt-3 text-base font-bold text-slate-900">{capability.title}</h4>
                  <p className="mt-1 text-xs text-slate-600">{capability.description}</p>
                  
                  {capability.badge && (
                    <div className="mt-2 inline-flex items-center rounded-full border border-amber-700/30 bg-amber-100/50 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {capability.badge}
                    </div>
                  )}
                  
                  <div className="mt-3 space-y-1.5">
                    {capability.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <ArrowRight className="h-2.5 w-2.5 text-[#A73370]" />
                        </div>
                        <span className="text-[10px] text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            size="sm"
            className="bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Detailed Capabilities Overview
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const rpaCapabilities = [
  {
    icon: <Bot className="h-5 w-5 text-[#E84A0E]" />,
    title: "Robotic Process Automation",
    description: "Software robots that mimic human actions to automate repetitive tasks across applications and systems.",
    features: ["Screen automation", "Keystroke emulation", "Rule-based execution"],
    badge: "Core Module"
  },
  {
    icon: <GanttChartSquare className="h-5 w-5 text-[#E84A0E]" />,
    title: "Process Mining",
    description: "Data-driven process discovery and analysis that identifies automation opportunities and bottlenecks.",
    features: ["Process mapping", "Bottleneck identification", "Opportunity scoring"],
    badge: ""
  },
  {
    icon: <Factory className="h-5 w-5 text-[#E84A0E]" />,
    title: "Task Mining",
    description: "Desktop activity monitoring that captures user interactions to identify tasks suitable for automation.",
    features: ["Pattern recognition", "Task frequency analysis", "ROI calculation"],
    badge: ""
  },
  {
    icon: <FileCheck className="h-5 w-5 text-[#E84A0E]" />,
    title: "Test Automation",
    description: "Automated testing capabilities that ensure application quality and reduce manual testing effort.",
    features: ["UI testing", "API testing", "Regression testing"],
    badge: "Enhanced"
  }
]

const integrationCapabilities = [
  {
    icon: <Network className="h-5 w-5 text-[#A73370]" />,
    title: "API Automation",
    description: "Connect systems and applications through their APIs to create seamless automated workflows.",
    features: ["RESTful integration", "SOAP support", "Authentication handling"],
    badge: ""
  },
  {
    icon: <CreditCard className="h-5 w-5 text-[#A73370]" />,
    title: "SAP Automation",
    description: "Purpose-built automation for SAP systems that streamlines core business processes and reduces manual effort.",
    features: ["GUI automation", "S/4HANA support", "Transaction automation"],
    badge: "SAP Certified"
  },
  {
    icon: <FileSpreadsheet className="h-5 w-5 text-[#A73370]" />,
    title: "Microsoft 365 Integration",
    description: "Seamless automation with Microsoft applications including Excel, Outlook, Teams, and SharePoint.",
    features: ["Email processing", "Excel automation", "Teams integration"],
    badge: ""
  },
  {
    icon: <Database className="h-5 w-5 text-[#A73370]" />,
    title: "Enterprise Integration",
    description: "Connect with enterprise systems like Oracle, Salesforce, and ServiceNow through native connectors.",
    features: ["Bi-directional sync", "Event-driven automation", "Data validation"],
    badge: ""
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function UiPathCapabilitiesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathCapabilities {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { UiPathCapabilitiesWrapper as UiPathCapabilities };