"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Link as LinkIcon, Database, Globe, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ShippingIntegrationComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-gradient-to-b from-amber-50 to-white py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Integration Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Seamless <span className="text-[#E84A0E]">Connectivity</span> For Global Operations
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Connect your maritime systems, trading partners, and regulatory platforms with Atlas Technosoft&apos;s powerful integration solutions for the shipping industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {integrationOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${option.bgColor} mb-4`}>
                {option.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">{option.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{option.description}</p>
              
              <div className="mt-6 space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className={`h-3 w-3 ${option.textColor}`} />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button
            className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request Integration Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const integrationOptions = [
  {
    icon: <LinkIcon className="h-6 w-6 text-white" />,
    title: "SAP Business One Connectivity",
    description: "Integrate your shipping operations directly with SAP Business One for seamless business process management.",
    features: [
      "Booking and shipment tracking",
      "Vessel scheduling integration",
      "Financial transaction synchronization",
      "Customer contract management"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]"
  },
  {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Terminal Operating Systems",
    description: "Connect your terminal systems with booking platforms, shipping lines, and regulatory authorities.",
    features: [
      "Real-time container status updates",
      "Equipment management integration",
      "Gate automation systems",
      "Yard planning optimization"
    ],
    bgColor: "bg-[#A73370]",
    textColor: "text-[#A73370]"
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Global Trade Networks",
    description: "Connect with carriers, forwarders, customs authorities, and other stakeholders in the global shipping ecosystem.",
    features: [
      "Multi-carrier API integration",
      "Global port community systems",
      "Shipping alliance networks",
      "Electronic data interchange (EDI)"
    ],
    bgColor: "bg-[#1E1E38]",
    textColor: "text-[#1E1E38]"
  },
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "Regulatory Compliance",
    description: "Automate connections with customs, security, and environmental regulatory systems across global jurisdictions.",
    features: [
      "Customs declaration filing",
      "Security manifest submission",
      "Dangerous goods reporting",
      "Environmental compliance documentation"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]"
  }
]

// Wrapper component with Suspense boundary
function ShippingIntegration(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingIntegrationComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ShippingIntegrationWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ShippingIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ShippingIntegrationWrapper as ShippingIntegration };