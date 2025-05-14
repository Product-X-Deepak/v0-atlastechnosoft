"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, FileCheck, HeartPulse, ActivitySquare, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function HealthcareSolutionsComponent() {
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
            Your Organization. Your Goals. <span className="text-[#E84A0E]">Choose What Suits You Best.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our solutions help healthcare organizations overcome complex challenges, meet regulatory requirements, and improve patient outcomes while optimizing operational efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthcareSolutions.map((solution, index) => (
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

function HealthcareSolutions(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HealthcareSolutionsComponent {...props} />
    </Suspense>
  )
}

const healthcareSolutions = [
  {
    icon: <FileCheck className="h-6 w-6 text-white" />,
    title: "Patient Management",
    description: "Streamline patient registration, scheduling, and communication with integrated digital solutions.",
    features: [
      "Unified patient records",
      "Automated appointment scheduling",
      "Patient portal integration",
      "Digital intake and consent forms"
    ],
    bgColor: "bg-[#1E1E38]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-white" />,
    title: "Revenue Cycle Management",
    description: "Optimize billing processes, claims management, and payment collection to improve cash flow.",
    features: [
      "Automated insurance verification",
      "Claims scrubbing and submission",
      "Denial management workflows",
      "Patient payment solutions"
    ],
    bgColor: "bg-[#A73370]",
    textColor: "text-[#A73370]",
    link: "/contact"
  },
  {
    icon: <ActivitySquare className="h-6 w-6 text-white" />,
    title: "Compliance Management",
    description: "Ensure adherence to healthcare regulations and standards with automated compliance tools.",
    features: [
      "HIPAA compliance monitoring",
      "Automated regulatory reporting",
      "Audit trail documentation",
      "Privacy and security controls"
    ],
    bgColor: "bg-[#E84A0E]",
    textColor: "text-[#E84A0E]",
    link: "/contact"
  }
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function HealthcareSolutionsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HealthcareSolutions {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { HealthcareSolutionsWrapper as HealthcareSolutions };