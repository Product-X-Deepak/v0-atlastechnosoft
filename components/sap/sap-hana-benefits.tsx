"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3, Zap, TrendingUp, DollarSign, Users, Rocket, Activity } from "lucide-react"
import { Suspense } from "react"

function SapHanaBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const benefits = [
    {
      icon: <TrendingUp className="h-5 w-5 text-premium-orange" />,
      title: "Accelerated Decision Making",
      description: "Make critical business decisions up to 100x faster with real-time data processing and analytics",
      stat: "65%",
      statDescription: "faster decision-making process"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-premium-purple" />,
      title: "Reduced Total Cost of Ownership",
      description: "Simplify your IT landscape and reduce hardware, maintenance, and operational costs",
      stat: "40%",
      statDescription: "lower operational costs"
    },
    {
      icon: <Zap className="h-5 w-5 text-premium-orange" />,
      title: "Increased Business Agility",
      description: "Respond quickly to market changes with real-time processing and analytics capabilities",
      stat: "85%",
      statDescription: "faster reporting times"
    },
    {
      icon: <Users className="h-5 w-5 text-premium-purple" />,
      title: "Enhanced Customer Experience",
      description: "Deliver personalized experiences based on real-time customer insights and behavior",
      stat: "30%",
      statDescription: "improved customer satisfaction"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-premium-orange" />,
      title: "Improved Operational Efficiency",
      description: "Streamline business processes and eliminate bottlenecks with faster data processing",
      stat: "50%",
      statDescription: "reduction in processing time"
    },
    {
      icon: <Rocket className="h-5 w-5 text-premium-purple" />,
      title: "Future-Proof Technology",
      description: "Build a foundation for innovation with a platform that supports emerging technologies like AI/ML",
      stat: "2-3x",
      statDescription: "faster innovation cycles"
    },
  ]

  return (
    <section ref={ref} className="relative py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-premium-orange/30 bg-premium-orange/10 px-3 py-1 text-xs text-premium-orange mb-2">
            <Activity className="mr-2 h-3 w-3" />
            <span className="font-semibold">Business Impact</span>
            </div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-premium-heading drop-shadow-sm">
            Transform Your Business with 
            <span className="text-premium-orange font-black"> SAP HANA</span>
            </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base font-medium text-premium-text">
            Organizations across industries have achieved measurable results and competitive advantages with SAP HANA&apos;s revolutionary platform.
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="relative overflow-hidden rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-slate-50 p-2.5 shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-slate-700">{benefit.description}</p>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-2xl font-bold text-premium-orange">{benefit.stat}</span>
                        <span className="ml-2 text-xs text-slate-600">{benefit.statDescription}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-premium-orange to-premium-purple"></div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaBenefitsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaBenefitsWrapper as SapHanaBenefits };