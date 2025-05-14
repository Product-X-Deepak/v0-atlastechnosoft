"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Building, FileSpreadsheet, Ruler, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from the component definition
function ConstructionSolutionsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="solutions" ref={ref} className="bg-slate-50 py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
            Your Business. Your Goals. <span className="text-[#E84A0E]">Choose What Suits You Best.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our solutions help construction companies overcome complex challenges, optimize resource allocation, and improve project profitability while enhancing collaboration across teams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {constructionSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${solution.bgColor} mb-4`}>
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{solution.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{solution.description}</p>
              
              <div className="mt-4 space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className={`h-3 w-3 ${solution.textColor}`} />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link
                  href={solution.link}
                  className={`inline-flex items-center text-sm font-medium ${solution.textColor}`}
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const constructionSolutions = [
  {
    icon: <Building className="h-6 w-6 text-white" />,
    title: "Project Management",
    description: "Comprehensive project planning, scheduling, and monitoring tools to deliver projects on time and within budget.",
    features: [
      "Integrated Gantt scheduling",
      "Resource allocation and tracking",
      "Critical path analysis",
      "Change order management"
    ],
    bgColor: "bg-[#1E1E38]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6 text-white" />,
    title: "Financial Control",
    description: "Real-time cost tracking, budget management, and financial reporting to maximize project profitability.",
    features: [
      "Project cost forecasting",
      "Budget vs. actual tracking",
      "Subcontractor payment management",
      "Cash flow projections"
    ],
    bgColor: "bg-[#A73370]",
    textColor: "text-[#A73370]",
    link: "/contact"
  },
  {
    icon: <Ruler className="h-6 w-6 text-white" />,
    title: "Field Operations",
    description: "Mobile-enabled field data collection, reporting, and document management for enhanced site productivity.",
    features: [
      "Digital daily field reports",
      "Mobile time and attendance",
      "Equipment tracking and maintenance",
      "Safety incident reporting"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  }
] 

// Wrapper component with Suspense boundary
function ConstructionSolutions(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConstructionSolutionsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConstructionSolutionsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConstructionSolutions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConstructionSolutionsWrapper as ConstructionSolutions };