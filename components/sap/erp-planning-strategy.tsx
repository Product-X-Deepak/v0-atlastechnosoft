"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CircleCheck, Workflow, Braces, Target, Users2, MessageSquareCode, GitBranch, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

function ErpPlanningStrategy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const strategicPillars = [
    {
      icon: Workflow,
      title: "Business Process Mapping",
      description: "Detailed analysis and documentation of current workflows to identify bottlenecks, redundancies, and opportunities for automation and optimization.",
      benefits: "Reduces implementation time by 35% and ensures ERP configuration aligns with operational realities."
    },
    {
      icon: Target,
      title: "Strategic Alignment",
      description: "Direct mapping between organizational KPIs, business objectives, and ERP configuration to ensure technology investments drive measurable business outcomes.",
      benefits: "Creates clear ROI measurements and accountability while ensuring the system supports strategic priorities."
    },
    {
      icon: Users2,
      title: "Stakeholder Engagement",
      description: "Structured program for involving decision-makers, department leaders, and end-users in requirements gathering, system design, and implementation oversight.",
      benefits: "Increases adoption rates by 40% and ensures system meets cross-functional business requirements."
    },
    {
      icon: Braces,
      title: "Data Architecture",
      description: "Comprehensive data governance framework including harmonization strategy, migration methodology, and master data management approach across the enterprise.",
      benefits: "Ensures 99.5% data accuracy and provides a single source of truth for critical business information."
    },
    {
      icon: MessageSquareCode,
      title: "Customization Strategy",
      description: "Methodical approach to evaluating standard functionality against business requirements with a scoring system to justify customizations that deliver real value.",
      benefits: "Reduces custom development by 60% while ensuring the system meets unique business needs."
    },
    {
      icon: GitBranch,
      title: "Scalable Implementation",
      description: "Modular, phased deployment methodology that prioritizes high-impact modules first while establishing the foundation for future expansion and capability adoption.",
      benefits: "Accelerates time-to-value by 30% and allows for agile adaptation throughout the implementation journey."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Proactive risk assessment protocol with mitigation strategies for technical, organizational, and change management challenges throughout the project lifecycle.",
      benefits: "Reduces implementation delays by 50% and prevents budget overruns through early intervention."
    },
    {
      icon: CircleCheck,
      title: "Continuous Optimization",
      description: "Structured post-implementation program with regular system health checks, performance reviews, and capability expansion roadmaps to maximize long-term value.",
      benefits: "Increases system ROI by 25% annually through ongoing refinement and new feature adoption."
    },
  ]

  return (
    <section id="strategy" ref={ref} className="py-14 md:py-20 relative overflow-hidden mt-16 md:mt-24">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-800/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-800/5 rounded-full mix-blend-multiply blur-3xl opacity-75 animate-blob"></div>
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-10"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Strategic Framework</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-premium-heading max-w-3xl">
            A Strategic Approach to <span className="text-premium-orange">ERP Planning</span>
          </h2>
          <p className="text-premium-text font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Our research-backed methodology ensures your SAP Business One implementation aligns perfectly with your business strategy, delivering maximum ROI through eight proven strategic pillars.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strategicPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 h-full group"
            >
              <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                <pillar.icon className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="text-base font-bold mb-2 text-slate-900">{pillar.title}</h3>
              <p className="text-slate-700 text-xs mb-3 flex-grow">{pillar.description}</p>
              <div className="mt-auto pt-2 border-t border-amber-100">
                <p className="text-xs text-amber-900">
                  <span className="font-bold">Benefit:</span> {pillar.benefits}
                </p>
                  </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="max-w-3xl rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 p-5 border border-amber-200 shadow-sm text-center">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Our Strategic Difference</h3>
            <p className="text-slate-700 text-sm mb-4">
              Our strategic ERP planning framework has been refined through 200+ successful implementations, resulting in 30% faster deployment times and 45% higher ROI compared to traditional approaches.
            </p>
            <Button 
              asChild 
              className="group bg-amber-800 hover:bg-amber-900 text-white text-sm px-4 py-1.5 h-auto"
            >
              <Link href="/contact" className="flex items-center gap-1.5">
                Request Strategic Assessment
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningStrategyWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningStrategy {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningStrategyWrapper as ErpPlanningStrategy };