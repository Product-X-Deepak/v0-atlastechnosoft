"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DollarSign, Clock, LineChart, BarChart, ShieldCheck, Users } from "lucide-react"
import { Suspense } from "react"

function UiPathBusinessValue() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Measurable Results</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            <span className="text-[#E84A0E]">Business Value</span> of UiPath Automation
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            UiPath delivers measurable business value through cost reduction, productivity improvements, error reduction, and enhanced employee and customer experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: value.color }}>
                <div className="text-white">
                  {value.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              
              <div className="mt-6 space-y-4">
                {value.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="border-t border-slate-100 pt-4">
                    <div className="text-3xl font-bold" style={{ color: value.color }}>
                      {metric.value}
                    </div>
                    <p className="text-sm text-slate-600">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const businessValues = [
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Cost Reduction",
    description: "Reduce operational costs through automation of repetitive, manual tasks across your enterprise.",
    color: "#E84A0E",
    metrics: [
      {
        value: "30-50%",
        label: "Average cost reduction for automated processes"
      },
      {
        value: "3-8 months",
        label: "Typical payback period for UiPath implementation"
      }
    ]
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Productivity Gains",
    description: "Increase productivity by automating routine tasks and enabling employees to focus on higher-value activities.",
    color: "#A73370",
    metrics: [
      {
        value: "40-80%",
        label: "Average reduction in processing time"
      },
      {
        value: "4-6x",
        label: "Process throughput improvement"
      }
    ]
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Operational Excellence",
    description: "Improve operational efficiency through continuous process optimization and end-to-end workflow automation.",
    color: "#1E1E38",
    metrics: [
      {
        value: "100%",
        label: "Process compliance and audit trail"
      },
      {
        value: "15-20%",
        label: "Average increase in operational capacity"
      }
    ]
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Digital Transformation",
    description: "Accelerate digital transformation initiatives by connecting legacy systems with modern digital processes.",
    color: "#E84A0E",
    metrics: [
      {
        value: "60%",
        label: "Faster implementation compared to system replacements"
      },
      {
        value: "3-5x",
        label: "ROI compared to traditional approach"
      }
    ]
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Risk & Compliance",
    description: "Reduce risks and improve compliance through standardized, automated processes with complete audit trails.",
    color: "#A73370",
    metrics: [
      {
        value: "90%",
        label: "Reduction in compliance-related errors"
      },
      {
        value: "60-80%",
        label: "Time saved on compliance reporting"
      }
    ]
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Employee Experience",
    description: "Improve employee satisfaction by automating mundane tasks and enabling focus on more rewarding work.",
    color: "#1E1E38",
    metrics: [
      {
        value: "35%",
        label: "Average increase in employee satisfaction"
      },
      {
        value: "25-40%",
        label: "Reduction in employee attrition"
      }
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function UiPathBusinessValueWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathBusinessValue {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { UiPathBusinessValueWrapper as UiPathBusinessValue };