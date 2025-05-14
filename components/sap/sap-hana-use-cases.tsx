"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Database, Server, LineChart, ShieldCheck, Globe, Cpu, Layers } from "lucide-react"
import { Suspense } from "react"

function SapHanaUseCases() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const useCases = [
    {
      icon: <Database className="h-5 w-5 text-[#E84A0E]" />,
      title: "Real-time Analytics",
      description: "Process billions of records in seconds to gain immediate insights for better decision-making",
      industry: "Retail & Consumer Products"
    },
    {
      icon: <LineChart className="h-5 w-5 text-[#A73370]" />,
      title: "Predictive Analytics",
      description: "Forecast trends and anticipate customer behavior using advanced modeling capabilities",
      industry: "Financial Services"
    },
    {
      icon: <Server className="h-5 w-5 text-[#E84A0E]" />,
      title: "Data Warehousing",
      description: "Consolidate disparate data sources into a single, high-performance analytical repository",
      industry: "Manufacturing"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#A73370]" />,
      title: "Fraud Detection",
      description: "Identify suspicious patterns and anomalies in real-time to prevent fraudulent activities",
      industry: "Banking & Insurance"
    },
    {
      icon: <Globe className="h-5 w-5 text-[#E84A0E]" />,
      title: "Supply Chain Optimization",
      description: "Enhance visibility and efficiency across your entire supply chain with real-time tracking",
      industry: "Logistics & Transportation"
    },
    {
      icon: <Cpu className="h-5 w-5 text-[#A73370]" />,
      title: "IoT Data Processing",
      description: "Process massive volumes of sensor data to enable smart factories and connected products",
      industry: "Industrial Manufacturing"
    },
  ]

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="mx-auto text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-[#E84A0E]/30 bg-[#E84A0E]/10 px-3 py-1 text-xs text-[#E84A0E] mb-2">
            <Layers className="mr-2 h-3 w-3" />
            <span className="font-semibold">Enterprise Applications</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white drop-shadow-sm">
            Powerful 
            <span className="text-[#E84A0E] font-black"> Use Cases</span> for SAP HANA
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base font-medium text-slate-800 dark:text-slate-200">
            Discover how organizations across industries leverage SAP HANA to transform their operations and drive innovation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="absolute top-0 right-0 p-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  {useCase.industry}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-slate-800 w-fit">
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{useCase.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{useCase.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E84A0E] to-[#A73370]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaUseCasesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaUseCases {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaUseCasesWrapper as SapHanaUseCases };