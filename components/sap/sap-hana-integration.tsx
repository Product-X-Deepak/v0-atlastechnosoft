"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Database, 
  LayoutDashboard, 
  Router, 
  Layers, 
  ArrowRight, 
  Cloud, 
  Code2, 
  BarChart3, 
  Brain,
  Rocket 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function SapHanaIntegration() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const integrations = [
    {
      title: "SAP S/4HANA",
      description: "Next-generation ERP built natively on HANA",
      icon: <LayoutDashboard className="h-8 w-8 text-[#E84A0E]" />,
      benefit: "Accelerate core business processes by 10x",
      link: "/sap-solutions/s4hana"
    },
    {
      title: "SAP BW/4HANA",
      description: "Modern data warehousing on HANA",
      icon: <Database className="h-8 w-8 text-[#A73370]" />,
      benefit: "Simplify data modeling and accelerate reporting",
      link: "/sap-solutions/bw4hana"
    },
    {
      title: "SAP Analytics Cloud",
      description: "Cloud-based analytics and planning",
      icon: <BarChart3 className="h-8 w-8 text-[#E84A0E]" />,
      benefit: "Unify BI, planning, and predictive capabilities",
      link: "/sap-solutions/analytics-cloud"
    },
    {
      title: "SAP Data Intelligence",
      description: "Data orchestration and machine learning",
      icon: <Brain className="h-8 w-8 text-[#A73370]" />,
      benefit: "Connect, transform, and govern data assets",
      link: "/sap-solutions/data-intelligence"
    },
    {
      title: "SAP BTP",
      description: "Business Technology Platform",
      icon: <Layers className="h-8 w-8 text-[#E84A0E]" />,
      benefit: "Extend and integrate HANA applications",
      link: "/sap-solutions/btp"
    },
    {
      title: "SAP HANA Cloud",
      description: "Data platform as a service",
      icon: <Cloud className="h-8 w-8 text-[#A73370]" />,
      benefit: "Scale from gigabytes to petabytes on demand",
      link: "/sap-solutions/hana-cloud"
    }
  ]

  return (
    <section ref={ref} className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-[#E84A0E]/30 bg-[#E84A0E]/10 px-3 py-1 text-xs text-[#E84A0E] mb-2">
            <Router className="mr-1.5 h-3 w-3" />
            <span className="font-semibold">Ecosystem</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white drop-shadow-sm">
            Integrated with the <span className="text-[#E84A0E] font-black">SAP Ecosystem</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base font-medium text-slate-800 dark:text-slate-200">
            SAP HANA serves as the foundation for SAP&apos;s intelligent enterprise vision, seamlessly connecting with other SAP solutions
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-12 max-w-5xl"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E84A0E]/20 dark:via-[#E84A0E]/20 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white dark:border-slate-900 dark:bg-slate-900 shadow-sm">
              <Database className="h-6 w-6 text-[#E84A0E]" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#E84A0E]/20 dark:via-[#E84A0E]/20 to-transparent"></div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="relative overflow-hidden rounded-lg bg-white border border-slate-200 p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-3 rounded-lg bg-slate-50 p-3 shadow-sm">
                {integration.icon}
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">{integration.title}</h3>
              <p className="mb-3 text-xs text-slate-700">{integration.description}</p>
              <div className="flex items-center text-green-600 text-xs mb-3">
                <Rocket className="mr-1.5 h-3 w-3" />
                <span>{integration.benefit}</span>
              </div>
              <Link href={integration.link} className="group inline-flex items-center text-xs font-medium text-[#E84A0E] hover:text-[#E84A0E]/80">
                Learn more
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm border border-slate-200 text-center"
        >
          <h3 className="text-lg font-bold mb-3 text-slate-900">Need a Custom Integration?</h3>
          <p className="mx-auto max-w-2xl text-sm text-slate-700 mb-4">
            Our expert consultants can help you design and implement custom integrations between SAP HANA and your existing systems
          </p>
          <Button 
            size="sm"
            className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
            asChild
          >
            <Link href="/contact" className="inline-flex items-center">
              Get Integration Support
              <Code2 className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaIntegrationWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaIntegration {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaIntegrationWrapper as SapHanaIntegration };