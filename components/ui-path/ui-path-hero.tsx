"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Bot, Brain, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function UiPathHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF5D6] py-10">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 py-1 text-xs font-medium text-amber-800">
            <span>INTELLIGENT AUTOMATION</span>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-4xl text-center">
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            UiPath <span className="text-[#E84A0E]">Agentic Automation</span> <br />
            <span className="text-[#A73370]">Platform</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base text-slate-700">
            Transform your enterprise with UiPath&apos;s Agentic Automation platform that combines AI agents, 
            RPA robots, and workflow orchestration for end-to-end process automation.
          </p>
        </div>

        <div className="mx-auto mb-6 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mt-2 text-sm font-bold text-[#1E1E38]">{feature.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size="sm"
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Demo
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="sm"
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="/automation-solutions" className="flex items-center">
              Explore Automation Solutions
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const keyFeatures = [
  {
    icon: <Bot className="h-5 w-5 text-[#E84A0E]" />,
    title: "AI Agents",
    description: "Autonomous AI agents that understand intent and complete complex tasks",
  },
  {
    icon: <Zap className="h-5 w-5 text-[#A73370]" />,
    title: "RPA Robots",
    description: "Software robots that automate repetitive tasks with precision",
  },
  {
    icon: <Brain className="h-5 w-5 text-[#E84A0E]" />,
    title: "Cognitive AI",
    description: "Advanced AI models for document understanding and decision-making",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-[#A73370]" />,
    title: "Orchestration",
    description: "End-to-end workflow management across humans, AI, and systems",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function UiPathHeroWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { UiPathHeroWrapper as UiPathHero };