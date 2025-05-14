"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { Bot as _Bot, Workflow as _Workflow, Cpu as _Cpu, LineChart, Award, Clock, Brain, TestTube, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function UiPathSection(_props: Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="uipath-solutions" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>UiPath Certified Partner</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Accelerate Business with <span className="text-premium-orange font-extrabold">UiPath Automation</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            Transform your operations with intelligent RPA and agentic AI solutions that combine machine learning and business process automation.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#E84A0E] p-3 w-fit text-white shadow-md">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Agentic AI Automation</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                The next evolution of automation where AI agents think and robots do. Harness UiPath's AI capabilities for intelligent document processing and advanced automation.
              </p>
              <div className="mt-auto space-y-2">
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>Agent Builder</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>Process Orchestration</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>Generative AI Integration</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#A73370] p-3 w-fit text-white shadow-md">
                <TestTube className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Agentic Testing</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                AI-powered testing that autonomously explores, creates, and runs tests across your entire application portfolio with minimal human intervention.
              </p>
              <div className="mt-auto space-y-2">
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#A73370]"></div>
                  <span>Test Cloud</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#A73370]"></div>
                  <span>Self-Healing Tests</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#A73370]"></div>
                  <span>Autopilot for Testers</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#E84A0E] p-3 w-fit text-white shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">UiPath Autopilot</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Build, debug, and optimize automation workflows using natural language - just describe what you need, and Autopilot delivers the solution.
              </p>
              <div className="mt-auto space-y-2">
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>Autopilot for Developers</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>UI Agent for Resilience</span>
                </div>
                <div className="flex items-center text-sm text-slate-800 font-medium">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span>Low-Code Development</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">UiPath 2025 Platform Advantages</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                The latest UiPath platform delivers advanced agentic capabilities that drive productivity, enhance governance, and maximize ROI for your automation initiatives.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-3 bg-amber-50 text-amber-800">
                  <div className="text-2xl font-bold mb-1">80%</div>
                  <div className="text-xs font-medium">Faster Process Discovery</div>
                </div>
                <div className="rounded-lg p-3 bg-rose-50 text-rose-800">
                  <div className="text-2xl font-bold mb-1">65%</div>
                  <div className="text-xs font-medium">Cost Reduction</div>
                </div>
                <div className="rounded-lg p-3 bg-amber-50 text-amber-800">
                  <div className="text-2xl font-bold mb-1">99.9%</div>
                  <div className="text-xs font-medium">Automation Accuracy</div>
                </div>
                <div className="rounded-lg p-3 bg-rose-50 text-rose-800">
                  <div className="text-2xl font-bold mb-1">3x</div>
                  <div className="text-xs font-medium">Faster ROI</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start rounded-lg p-3 bg-slate-50 border border-slate-200">
                <div className="rounded-full bg-[#E84A0E] p-2 text-white shadow-sm mr-3 flex-shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Enterprise-Grade Security</h4>
                  <p className="text-xs text-slate-800 font-medium">Enhanced encryption, role-based access controls, and compliance features</p>
                </div>
              </div>
              
              <div className="flex items-start rounded-lg p-3 bg-slate-50 border border-slate-200">
                <div className="rounded-full bg-[#A73370] p-2 text-white shadow-sm mr-3 flex-shrink-0">
                  <LineChart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Advanced Analytics</h4>
                  <p className="text-xs text-slate-800 font-medium">Real-time ROI tracking, automation performance metrics, and business impact analytics</p>
                </div>
              </div>
              
              <div className="flex items-start rounded-lg p-3 bg-slate-50 border border-slate-200">
                <div className="rounded-full bg-[#E84A0E] p-2 text-white shadow-sm mr-3 flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Agentic Ecosystem</h4>
                  <p className="text-xs text-slate-800 font-medium">Seamless integration of AI agents, robots, and human workers in end-to-end processes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/automation-solutions/ui-path">
            <Button className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white">
              Explore UiPath Solutions
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries
function UiPathSectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <UiPathSection {...props} />
    </Suspense>
  );
}

export { UiPathSectionWrapper as UiPathSection }; 