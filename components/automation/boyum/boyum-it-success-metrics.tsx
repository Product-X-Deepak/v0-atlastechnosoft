"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, ChevronUp, ChevronDown } from "lucide-react"
import { Suspense } from "react"

function BoyumITSuccessMetrics(_props: Record<string, unknown>) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null)

  const toggleMetric = (id: string) => {
    if (expandedMetric === id) {
      setExpandedMetric(null)
    } else {
      setExpandedMetric(id)
    }
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real Business Impact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Don&apos;t just take our word for it - see the measurable impact Boyum IT solutions have delivered to businesses across various industries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {successMetrics.map((metric) => (
            <div 
              key={metric.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleMetric(metric.id)}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  {expandedMetric === metric.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
                <div className="text-3xl font-bold text-primary mb-3">
                  {metric.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>

              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedMetric === metric.id ? "auto" : 0,
                  opacity: expandedMetric === metric.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-3">How It Works:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {metric.details}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                    <h5 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Industry Example</h5>
                    <p className="text-sm">{metric.example}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const successMetrics = [
  {
    id: "efficiency",
    title: "Operational Efficiency",
    value: "+43%",
    description: "Average improvement in operational efficiency across our clients",
    details: "By streamlining business processes and eliminating manual tasks, Boyum IT solutions dramatically reduce operational overhead and accelerate workflows.",
    example: "A manufacturing company reduced their order processing time from 2 days to just 3 hours by implementing Boyum's automated workflow solutions."
  },
  {
    id: "roi",
    title: "Return on Investment",
    value: "285%",
    description: "Average 3-year ROI for Boyum IT implementations",
    details: "Our solutions deliver rapid return on investment through cost savings, productivity improvements, and new revenue opportunities.",
    example: "A distribution company achieved complete ROI within 8 months and went on to realize a 327% return over three years."
  },
  {
    id: "errors",
    title: "Error Reduction",
    value: "-92%",
    description: "Average reduction in data entry and processing errors",
    details: "Automated validation rules, data consistency checks, and streamlined workflows virtually eliminate costly errors and quality issues.",
    example: "A professional services firm reduced invoice errors by 97%, eliminating customer disputes and accelerating payment collection by 15 days on average."
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumITSuccessMetricsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumITSuccessMetrics {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumITSuccessMetricsWrapper as BoyumITSuccessMetrics };