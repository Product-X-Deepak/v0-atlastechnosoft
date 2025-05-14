"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, TestTube, Pill, ShieldCheck, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

// Remove export from component definition
function PharmaceuticalsSolutionsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="solutions" ref={ref} className="bg-slate-50 py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-teal-600/30 bg-teal-100/80 px-4 py-2 text-sm font-medium text-teal-800">
            <span>Our Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Pharmaceutical Excellence. <span className="text-[#0D9488]">Choose What Works For You.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our solutions help pharmaceutical businesses overcome complex challenges, streamline operations, and maintain the highest standards of quality and compliance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pharmaceuticalSolutions.map((solution, index) => (
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

const pharmaceuticalSolutions = [
  {
    icon: <TestTube className="h-6 w-6 text-white" />,
    title: "Quality Management System",
    description: "Comprehensive digital QMS to ensure product quality, compliance, and continuous improvement.",
    features: [
      "Document control",
      "Deviation management",
      "CAPA tracking",
      "Quality event handling"
    ],
    bgColor: "bg-[#0D9488]",
    textColor: "text-[#0D9488]",
    link: "/contact"
  },
  {
    icon: <Pill className="h-6 w-6 text-white" />,
    title: "Production & Inventory Management",
    description: "Streamline manufacturing processes with digital batch records and inventory tracking.",
    features: [
      "Electronic batch records",
      "Material tracking",
      "Equipment management",
      "Process control"
    ],
    bgColor: "bg-[#5E17EB]",
    textColor: "text-[#5E17EB]",
    link: "/contact"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    title: "Compliance & Validation",
    description: "Ensure regulatory compliance with validation-ready solutions and audit tools.",
    features: [
      "21 CFR Part 11 compliance",
      "Computer system validation",
      "Audit management",
      "Regulatory reporting"
    ],
    bgColor: "bg-[#0D9488]",
    textColor: "text-[#0D9488]",
    link: "/contact"
  }
]

// Wrapper component with Suspense boundary
function PharmaceuticalsSolutions(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsSolutionsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PharmaceuticalsSolutionsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PharmaceuticalsSolutions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PharmaceuticalsSolutionsWrapper as PharmaceuticalsSolutions };