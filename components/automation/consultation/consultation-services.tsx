"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  BrainCircuit, 
  Replace, 
  Database, 
  Layers,
  Network,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ConsultationServices() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  return (
    <section 
      ref={ref} 
      id="services" 
      className="py-16 bg-white"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Our <span className="text-[#E84A0E]">Consulting</span> Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer specialized consulting services that help you navigate the complex landscape of business automation and digital transformation for 2025 and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5D6] mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1E1E38]">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="mt-3 space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#A73370] mt-1.5 mr-2"></span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto p-6 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E84A0E] hover:text-[#E84A0E]/80 group-hover:translate-x-1 transition-transform pl-0"
                  asChild
                >
                  <Link href="/contact" className="flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="sm" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Schedule a Strategy Session
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-[#E84A0E]" />,
    title: "Hyperautomation Strategy",
    description: "Develop an end-to-end strategy combining AI, RPA, and ML to automate complex business processes.",
    features: [
      "AI, RPA & ML integration",
      "End-to-end process orchestration",
      "Intelligent document processing",
      "Automation ROI analysis"
    ]
  },
  {
    icon: <Layers className="h-6 w-6 text-[#A73370]" />,
    title: "Process Mining & Intelligence",
    description: "Leverage data-driven analytics to visualize processes, identify bottlenecks, and quantify improvement opportunities.",
    features: [
      "Process discovery & mapping",
      "Bottleneck identification",
      "Predictive process analytics",
      "Continuous improvement frameworks"
    ]
  },
  {
    icon: <Replace className="h-6 w-6 text-[#E84A0E]" />,
    title: "Low-Code/No-Code Automation",
    description: "Democratize automation with user-friendly platforms that empower business users to create and modify workflows.",
    features: [
      "Platform evaluation & selection",
      "Citizen developer programs",
      "Governance frameworks",
      "Implementation roadmaps"
    ]
  },
  {
    icon: <Network className="h-6 w-6 text-[#A73370]" />,
    title: "Intelligent Integration",
    description: "Connect systems, applications, and data sources to create a unified digital ecosystem with AI-powered insights.",
    features: [
      "API strategy development",
      "Legacy system integration",
      "Cloud integration planning",
      "Integration architecture design"
    ]
  },
  {
    icon: <Database className="h-6 w-6 text-[#E84A0E]" />,
    title: "AI-Powered Business Intelligence",
    description: "Transform raw data into actionable insights with AI-enhanced analytics for smarter decision-making.",
    features: [
      "Data strategy development",
      "Predictive analytics implementation",
      "Data visualization solutions",
      "AI-enhanced reporting systems"
    ]
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-[#A73370]" />,
    title: "Sustainable Automation",
    description: "Design automation initiatives that support environmental and social responsibility goals while driving business growth.",
    features: [
      "ESG compliance frameworks",
      "Energy-efficient automation",
      "Paper reduction strategies",
      "Sustainable supply chain optimization"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationServicesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationServices {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationServicesWrapper as ConsultationServices };