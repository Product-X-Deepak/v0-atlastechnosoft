"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Clock, BarChart, Shield, Zap, Users } from "lucide-react"
import { Suspense } from "react"

function RpaSolutionsBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>RPA Benefits</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Transform Your Business with <span className="text-[#E84A0E]">Robotic Process Automation</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Discover how RPA can help your organization reduce costs, improve accuracy, increase compliance, and free your employees to focus on higher-value tasks.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all p-6"
            >
              <div className="flex mb-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E84A0E]/10 to-[#A73370]/10 mr-4">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
                  
                  {/* Display differently based on the benefit type */}
                  {benefit.title === "Quick ROI" ? (
                    <div className="text-[#E84A0E]">
                      <div className="font-medium">Up to</div>
                      <div>
                        <span className="text-xl font-bold">{benefit.stat}</span>
                        <span className="ml-1 font-medium">{benefit.unit}</span>
                      </div>
                    </div>
                  ) : benefit.title === "Business Agility" || benefit.title === "Improved Employee Experience" ? (
                    <div>
                      <div className="text-[#E84A0E] font-medium">Up to</div>
                      <div className="flex items-center text-[#E84A0E]">
                        <span className="text-xl font-bold">{benefit.stat}</span>
                        <span className="ml-1 font-medium">{benefit.unit}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-[#E84A0E]">
                      <span className="font-medium">Up to </span>
                      <span className="text-xl font-bold ml-1">{benefit.stat}</span>
                      <span className="ml-1 font-medium">{benefit.unit}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <TrendingUp className="h-6 w-6 text-[#E84A0E]" />,
    title: "Increased Productivity",
    description: "Automate repetitive tasks to free up employee time for higher-value work that requires human judgment and creativity.",
    stat: "70",
    unit: "% time savings"
  },
  {
    icon: <Clock className="h-6 w-6 text-[#A73370]" />,
    title: "Faster Processing",
    description: "Dramatically reduce processing times for critical business operations with 24/7 automated execution.",
    stat: "85",
    unit: "% faster execution"
  },
  {
    icon: <Shield className="h-6 w-6 text-[#E84A0E]" />,
    title: "Enhanced Accuracy",
    description: "Eliminate human errors in data entry, calculations, and transfers with precision-driven automation.",
    stat: "99.9",
    unit: "% accuracy"
  },
  {
    icon: <BarChart className="h-6 w-6 text-[#A73370]" />,
    title: "Quick ROI",
    description: "Achieve measurable returns on your automation investment within months rather than years.",
    stat: "6-9",
    unit: "month payback period"
  },
  {
    icon: <Zap className="h-6 w-6 text-[#E84A0E]" />,
    title: "Business Agility",
    description: "Respond faster to changing market conditions and customer needs with flexible automation.",
    stat: "40",
    unit: "% faster time-to-market"
  },
  {
    icon: <Users className="h-6 w-6 text-[#A73370]" />,
    title: "Improved Employee Experience",
    description: "Boost employee satisfaction by automating mundane tasks and allowing focus on meaningful work.",
    stat: "50",
    unit: "% higher engagement"
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsBenefitsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsBenefitsWrapper as RpaSolutionsBenefits };