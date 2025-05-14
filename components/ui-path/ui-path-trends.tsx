"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Bot, Network, Shield, ArrowRight } from "lucide-react"
import { Suspense } from "react"

function UiPathTrends() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Future of Automation</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Emerging <span className="text-[#E84A0E]">Trends</span> in Intelligent Automation
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Stay ahead of the curve with UiPath&apos;s innovation at the forefront of these emerging automation trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl border bg-white p-6 shadow-sm relative overflow-hidden group"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 origin-top-right opacity-10">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L64 0L64 64" fill={trend.color} />
                  <path d="M0 0L64 0L64 64" stroke={trend.color} />
                </svg>
              </div>
              
              <div className="flex h-16 w-16 items-center justify-center rounded-full mb-4" style={{ backgroundColor: trend.color }}>
                <div className="text-white">
                  {trend.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{trend.title}</h3>
              <p className="text-slate-600 mb-4">{trend.description}</p>
              
              <div className="space-y-3">
                {trend.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <ArrowRight className="h-3 w-3" style={{ color: trend.color }} />
                    </div>
                    <p className="text-sm text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 inline-flex items-center text-sm font-medium" style={{ color: trend.color }}>
                <span>Expected by: {trend.timeline}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const trends = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Generative AI in Automation",
    color: "#E84A0E",
    description: "UiPath is integrating generative AI capabilities to transform how automations are created, maintained, and executed.",
    points: [
      "Natural language interfaces for creating and modifying automations",
      "Auto-generation of automation scripts from process descriptions",
      "Context-aware AI assistants that can adapt to changing scenarios"
    ],
    timeline: "2024-2025"
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Autonomous Automation",
    color: "#A73370",
    description: "Self-learning, autonomous automation systems that continuously improve processes without human intervention.",
    points: [
      "Systems that identify automation opportunities automatically",
      "Self-healing automations that adapt to UI changes",
      "Continuous optimization through reinforcement learning"
    ],
    timeline: "2025-2026"
  },
  {
    icon: <Network className="h-8 w-8" />,
    title: "Hyperautomation",
    color: "#1E1E38",
    description: "Combining multiple technologies to automate increasingly complex end-to-end business processes.",
    points: [
      "Seamless integration of AI, RPA, process mining, and workflow management",
      "Orchestration of human and digital workers in complex workflows",
      "Enterprise-wide automation fabric spanning all departments"
    ],
    timeline: "2024-2025"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Ethical & Governed Automation",
    color: "#E84A0E",
    description: "Frameworks and tools to ensure automations are deployed ethically, securely, and with proper governance.",
    points: [
      "AI bias detection and mitigation in automated decision-making",
      "Enhanced security and privacy controls for sensitive processes",
      "Comprehensive governance frameworks for enterprise automation"
    ],
    timeline: "2024-2026"
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function UiPathTrendsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathTrends {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { UiPathTrendsWrapper as UiPathTrends };