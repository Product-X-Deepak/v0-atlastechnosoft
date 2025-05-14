"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Receipt, Building2, TrendingUp, ClipboardList, HeartPulse, BadgeDollarSign } from "lucide-react"
import { Suspense } from "react"

function RpaSolutionsUseCases() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section id="use-cases" ref={ref} className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-10 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Industry Use Cases</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Automation Excellence <span className="text-[#A73370]">Across Industries</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover how UiPath RPA solutions transform operations in key industries 
            with tailored automation that delivers measurable results.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-5xl"
        >
          <Tabs defaultValue="finance" className="mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 mb-8">
              <TabsTrigger 
                value="finance" 
                className="data-[state=active]:bg-[#E84A0E] data-[state=active]:text-white py-3 text-sm rounded-none"
              >
                Finance & Banking
              </TabsTrigger>
              <TabsTrigger 
                value="healthcare"
                className="data-[state=active]:bg-[#E84A0E] data-[state=active]:text-white py-3 text-sm rounded-none"
              >
                Healthcare
              </TabsTrigger>
              <TabsTrigger 
                value="manufacturing"
                className="data-[state=active]:bg-[#E84A0E] data-[state=active]:text-white py-3 text-sm rounded-none"
              >
                Manufacturing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="finance">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {financeUseCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E84A0E]/10 mr-4">
                          {useCase.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{useCase.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{useCase.description}</p>
                          <p className="text-[#E84A0E] font-medium text-sm">{useCase.result}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="healthcare">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {healthcareUseCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#A73370]/10 mr-4">
                          {useCase.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{useCase.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{useCase.description}</p>
                          <p className="text-[#A73370] font-medium text-sm">{useCase.result}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="manufacturing">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {manufacturingUseCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E84A0E]/10 mr-4">
                          {useCase.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{useCase.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{useCase.description}</p>
                          <p className="text-[#E84A0E] font-medium text-sm">{useCase.result}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

const financeUseCases = [
  {
    icon: <Receipt className="h-5 w-5 text-[#E84A0E]" />,
    title: "Invoice Processing",
    description: "Automate invoice extraction, validation, and approval workflows for faster processing and improved accuracy.",
    result: "Result: 85% faster processing time and 99.5% accuracy"
  },
  {
    icon: <BadgeDollarSign className="h-5 w-5 text-[#E84A0E]" />,
    title: "Financial Reporting",
    description: "Automate data gathering, consolidation, and reporting processes to meet regulatory requirements.",
    result: "Result: 70% time reduction in monthly closing"
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#E84A0E]" />,
    title: "Customer Onboarding",
    description: "Streamline customer onboarding with automated KYC processes, document verification, and account setup.",
    result: "Result: 60% faster onboarding and improved compliance"
  },
  {
    icon: <ClipboardList className="h-5 w-5 text-[#E84A0E]" />,
    title: "Compliance Monitoring",
    description: "Automated monitoring of transactions and activities for regulatory compliance and risk management.",
    result: "Result: 90% reduction in compliance reporting time"
  }
];

const healthcareUseCases = [
  {
    icon: <HeartPulse className="h-5 w-5 text-[#A73370]" />,
    title: "Patient Scheduling",
    description: "Automate appointment scheduling, reminders, and resource allocation for improved patient experience.",
    result: "Result: 40% reduction in no-shows and 30% admin time saved"
  },
  {
    icon: <ClipboardList className="h-5 w-5 text-[#A73370]" />,
    title: "Claims Processing",
    description: "Streamline insurance claims processing with automated data validation, coding, and submission.",
    result: "Result: 75% faster claims processing and fewer denials"
  },
  {
    icon: <Receipt className="h-5 w-5 text-[#A73370]" />,
    title: "Medical Records Management",
    description: "Automate data extraction and entry from medical records for analysis and billing purposes.",
    result: "Result: 65% time savings and improved data accuracy"
  },
  {
    icon: <Building2 className="h-5 w-5 text-[#A73370]" />,
    title: "Inventory Management",
    description: "Automated tracking, ordering, and management of medical supplies and pharmaceuticals.",
    result: "Result: 50% reduction in stockouts and 30% inventory cost savings"
  }
];

const manufacturingUseCases = [
  {
    icon: <TrendingUp className="h-5 w-5 text-[#E84A0E]" />,
    title: "Production Planning",
    description: "Automate forecast analysis, production scheduling, and resource allocation for optimized operations.",
    result: "Result: 35% increase in production efficiency"
  },
  {
    icon: <Building2 className="h-5 w-5 text-[#E84A0E]" />,
    title: "Supply Chain Automation",
    description: "Streamline supplier communication, order processing, and inventory management across the supply chain.",
    result: "Result: 45% faster order processing and improved vendor management"
  },
  {
    icon: <ClipboardList className="h-5 w-5 text-[#E84A0E]" />,
    title: "Quality Control",
    description: "Automate quality inspection data collection, analysis, and reporting for improved product quality.",
    result: "Result: 55% reduction in quality-related issues"
  },
  {
    icon: <Receipt className="h-5 w-5 text-[#E84A0E]" />,
    title: "Maintenance Management",
    description: "Automate maintenance scheduling, parts ordering, and preventive maintenance workflows.",
    result: "Result: 60% reduction in unplanned downtime"
  }
];

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsUseCasesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsUseCases {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsUseCasesWrapper as RpaSolutionsUseCases };