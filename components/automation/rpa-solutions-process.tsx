"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClipboardList, Code, Cog, FileSearch, Play, Settings, Zap } from "lucide-react"
import { Suspense } from "react"

function RpaSolutionsProcess() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>RPA Implementation Process</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Our Proven <span className="text-[#E84A0E]">Automation Methodology</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            We follow a structured approach to ensure your RPA implementation delivers maximum business value with minimal disruption to your operations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 sm:left-[24px] top-10 bottom-0 w-0.5 bg-amber-200 z-10 hidden sm:block"></div>
            
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative flex flex-col sm:flex-row"
                >
                  {/* Step number circle */}
                  <div className="z-20 flex-shrink-0 h-10 w-10 rounded-full bg-[#E84A0E] text-white flex items-center justify-center font-bold shadow-md mb-4 sm:mb-0 sm:mr-6 mx-auto sm:mx-0">
                    {index + 1}
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-grow">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-[#A73370]/10 flex items-center justify-center mr-3">
                          {step.icon}
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const processSteps = [
  {
    icon: <FileSearch className="h-4 w-4 text-[#A73370]" />,
    title: "Process Assessment",
    description:
      "We analyze your current processes to identify automation opportunities, evaluate potential ROI, and prioritize processes based on complexity and business impact.",
  },
  {
    icon: <ClipboardList className="h-4 w-4 text-[#A73370]" />,
    title: "Solution Design",
    description:
      "Our experts design the automation solution, mapping out process flows, defining business rules, and creating a detailed implementation plan tailored to your specific requirements.",
  },
  {
    icon: <Code className="h-4 w-4 text-[#A73370]" />,
    title: "Bot Development",
    description:
      "We develop and configure the RPA bots using industry-leading platforms, implementing the automation logic, exception handling, and integration with your existing systems.",
  },
  {
    icon: <Settings className="h-4 w-4 text-[#A73370]" />,
    title: "Testing & Validation",
    description:
      "Rigorous testing is conducted to ensure the bots perform as expected, handling various scenarios and edge cases to guarantee reliability and accuracy.",
  },
  {
    icon: <Play className="h-4 w-4 text-[#A73370]" />,
    title: "Deployment",
    description:
      "We deploy the RPA solution in your environment, providing comprehensive documentation, user training, and support during the transition to automated processes.",
  },
  {
    icon: <Cog className="h-4 w-4 text-[#A73370]" />,
    title: "Monitoring & Optimization",
    description:
      "Continuous monitoring of bot performance, regular maintenance, and ongoing optimization to improve efficiency and adapt to changing business requirements.",
  },
  {
    icon: <Zap className="h-4 w-4 text-[#A73370]" />,
    title: "Scaling & Expansion",
    description:
      "Once initial automation is successful, we help you identify additional automation opportunities and scale your RPA implementation across the organization.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsProcessWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsProcess {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsProcessWrapper as RpaSolutionsProcess };