"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import {
  TrendingUp,
  Clock,
  LineChart,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  Combine,
  Network,
  Activity,
  ArrowUpRight,
  ChevronUp
} from "lucide-react"

function ErpPlanningBusinessValue() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const businessValuePillars = [
    {
      icon: <TrendingUp className="h-6 w-6 text-amber-900" />,
      title: "Operational Efficiency",
      description: "Streamlined processes reduce manual effort and operational costs by 20-30% through automation and workflow optimization.",
      metrics: [
        "Reduced cycle time",
        "Lower operational costs",
        "Increased throughput",
        "Optimized resource allocation"
      ],
      stats: "28% average reduction in manual processing time"
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-800" />,
      title: "Real-time Decision Making",
      description: "Instant access to critical business data enables informed decisions based on current market conditions and business performance.",
      metrics: [
        "Faster response to market changes",
        "Improved forecast accuracy",
        "Data-driven decision processes",
        "Reduced time-to-insight"
      ],
      stats: "65% faster decision-making cycle"
    },
    {
      icon: <Combine className="h-6 w-6 text-amber-700" />,
      title: "Process Integration",
      description: "End-to-end visibility across departments eliminates silos and creates a unified view of your entire business operation.",
      metrics: [
        "Cross-functional transparency",
        "Reduced duplicate efforts",
        "Simplified compliance",
        "Enhanced collaboration"
      ],
      stats: "42% reduction in cross-departmental friction"
    },
    {
      icon: <LineChart className="h-6 w-6 text-amber-900" />,
      title: "Financial Control",
      description: "Comprehensive financial management with detailed tracking, reporting, and analysis for improved cash flow and profitability.",
      metrics: [
        "Improved cash flow management",
        "Reduced working capital needs",
        "Better financial visibility",
        "Streamlined compliance reporting"
      ],
      stats: "15% reduction in days sales outstanding (DSO)"
    },
    {
      icon: <Network className="h-6 w-6 text-amber-800" />,
      title: "Supply Chain Optimization",
      description: "Enhanced inventory management and demand forecasting reduce stockouts and excess inventory by up to 25%.",
      metrics: [
        "Reduced inventory costs",
        "Improved supplier management",
        "Enhanced demand forecasting",
        "Streamlined procurement"
      ],
      stats: "22% average inventory reduction"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-amber-700" />,
      title: "Risk Mitigation",
      description: "Improved data security, audit trails, and compliance features reduce business and regulatory risks.",
      metrics: [
        "Enhanced data security",
        "Better regulatory compliance",
        "Reduced operational risk",
        "Improved business continuity"
      ],
      stats: "54% reduction in compliance-related incidents"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-amber-900" />,
      title: "Business Intelligence",
      description: "Advanced analytics and reporting provide actionable insights to identify opportunities and address challenges proactively.",
      metrics: [
        "Enhanced performance monitoring",
        "Deeper customer insights",
        "Predictive trend analysis",
        "Customizable reporting"
      ],
      stats: "37% improvement in forecast accuracy"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-800" />,
      title: "Innovation Enablement",
      description: "Agile platform supports business evolution, new models, and continuous improvement with adaptable workflows.",
      metrics: [
        "Faster product development",
        "Business model flexibility",
        "Reduced time-to-market",
        "Adaptability to market changes"
      ],
      stats: "31% faster new initiative deployment"
    }
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden mt-16 md:mt-24">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-800/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-600/5 rounded-full mix-blend-multiply blur-3xl opacity-75 animate-blob animation-delay-2000"></div>

      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-10"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Business Impact</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-premium-heading">Measurable <span className="text-premium-orange">Business Value</span></h2>
          <p className="text-premium-text font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Our strategic ERP planning delivers quantifiable business outcomes across every aspect of your organization, with ROI typically realized within the first 6-12 months.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {businessValuePillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 h-full group"
            >
              <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                {pillar.icon}
              </div>
              
              <div className="mb-3">
                <h3 className="text-base font-bold mb-2 text-slate-900">{pillar.title}</h3>
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 mb-2">
                  <Activity className="h-3 w-3" />
                  <span>{pillar.stats}</span>
                </div>
                <p className="text-slate-700 text-xs mb-3">{pillar.description}</p>
              </div>
              
              <div className="mt-auto pt-2 border-t border-amber-100">
                <h4 className="text-[10px] font-bold text-amber-900 mb-1.5">KEY PERFORMANCE INDICATORS:</h4>
                <ul className="space-y-1.5">
                      {pillar.metrics.map((metric, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="max-w-5xl rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 p-5 border border-amber-200 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 mb-4 text-center">ROI Timeline</h3>
            
            <div className="relative mb-6">
              {/* Timeline track */}
              <div className="absolute top-[38px] left-0 right-0 h-1.5 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-500 rounded-full"></div>
              
              {/* Timeline points container */}
              <div className="grid grid-cols-4 relative z-10">
                {/* Timeline point 1 */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-5 w-5 bg-amber-100 rounded-full border border-amber-300 z-20 mb-1">
                    <ChevronUp className="h-3 w-3 text-amber-900" />
                  </div>
                  <div className="bg-amber-900 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md z-20">
                    <span className="text-xs font-bold">1-3</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-1">Months</span>
                  <div className="text-[10px] text-slate-700 mt-1 text-center max-w-[100px]">
                    <span className="font-bold block text-amber-900">Operational Efficiency</span>
                    Initial process improvements
                  </div>
                </div>
                
                {/* Timeline point 2 */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-5 w-5 bg-amber-100 rounded-full border border-amber-300 z-20 mb-1">
                    <ArrowUpRight className="h-3 w-3 text-amber-800" />
                  </div>
                  <div className="bg-amber-800 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md z-20">
                    <span className="text-xs font-bold">3-6</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-1">Months</span>
                  <div className="text-[10px] text-slate-700 mt-1 text-center max-w-[100px]">
                    <span className="font-bold block text-amber-800">Integration Benefits</span>
                    Cross-functional optimization
                  </div>
                </div>
                
                {/* Timeline point 3 */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-5 w-5 bg-amber-100 rounded-full border border-amber-300 z-20 mb-1">
                    <TrendingUp className="h-3 w-3 text-amber-700" />
                  </div>
                  <div className="bg-amber-700 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md z-20">
                    <span className="text-xs font-bold">6-12</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-1">Months</span>
                  <div className="text-[10px] text-slate-700 mt-1 text-center max-w-[100px]">
                    <span className="font-bold block text-amber-700">Business Intelligence</span>
                    Data-driven decision making
                  </div>
                </div>
                
                {/* Timeline point 4 */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-5 w-5 bg-amber-100 rounded-full border border-amber-300 z-20 mb-1">
                    <BarChart3 className="h-3 w-3 text-amber-600" />
                  </div>
                  <div className="bg-amber-600 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md z-20">
                    <span className="text-xs font-bold">12+</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-1">Months</span>
                  <div className="text-[10px] text-slate-700 mt-1 text-center max-w-[100px]">
                    <span className="font-bold block text-amber-600">Strategic Transformation</span>
                    Business model optimization
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <div className="bg-white/50 rounded-lg p-4 border border-amber-200">
                <h4 className="text-amber-900 font-bold text-sm mb-1">Quick Wins</h4>
                <p className="text-xs text-slate-700">Realize 15-20% efficiency gains within the first 90 days through targeted process improvements and automation of routine tasks.</p>
              </div>
              
              <div className="bg-white/50 rounded-lg p-4 border border-amber-200">
                <h4 className="text-amber-900 font-bold text-sm mb-1">ROI Acceleration</h4>
                <p className="text-xs text-slate-700">Our methodology focuses on rapid time-to-value with continuous improvement to maximize your ROI throughout the implementation journey.</p>
              </div>
              
              <div className="bg-white/50 rounded-lg p-4 border border-amber-200">
                <h4 className="text-amber-900 font-bold text-sm mb-1">Long-term Value</h4>
                <p className="text-xs text-slate-700">Organizations achieve 200-300% ROI within 24-36 months through strategic utilization of the full SAP Business One capability set.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningBusinessValueWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningBusinessValue {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningBusinessValueWrapper as ErpPlanningBusinessValue };