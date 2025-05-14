"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart2 } from "lucide-react"

export default function UiPathTrends() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  
  const trends = [
    {
      number: "01",
      title: "The Dawn of Agentic AI",
      description: "Autonomous AI agents that can understand, reason, and execute complete business processes with minimal human supervision."
    },
    {
      number: "02",
      title: "Built-In AI Everywhere",
      description: "AI capabilities embedded directly into everyday business applications and workflows, making intelligence ubiquitous."
    },
    {
      number: "03",
      title: "The End of Work as We Know It",
      description: "Fundamental reshaping of human work as repetitive tasks are automated and roles evolve to focus on creativity and oversight."
    },
    {
      number: "04",
      title: "Taming the Data Deluge",
      description: "New approaches to managing, processing, and deriving insights from the exponentially growing volumes of enterprise data."
    },
    {
      number: "05",
      title: "AI Regulation Heats Up",
      description: "Increasing global regulatory frameworks for AI ethics, transparency, and governance requiring enterprise adaptation."
    },
    {
      number: "06",
      title: "Human-AI Collaboration",
      description: "Enhanced interfaces and experiences that enable seamless cooperation between knowledge workers and AI systems."
    },
    {
      number: "07",
      title: "Rise of Specialized Agents",
      description: "Purpose-built AI agents designed for specific business domains, functions, and industry-specific workflows."
    }
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden" id="trends">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-800/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-10"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Digital Transformation Roadmap</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-900">
            2025 UiPath AI and Automation Trends
          </h2>
          <p className="text-slate-800 font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Seven key trends to help you make the most of the future at the intersection of AI and automation
          </p>
        </motion.div>

        <div className="flex flex-col">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-4">
              {trends.map((trend, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all flex gap-4 group"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#E84A0E] flex flex-col justify-center items-center bg-amber-50 rounded-full h-14 w-14 flex-shrink-0">
                    {trend.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#E84A0E] transition-colors">{trend.title}</h3>
                    <p className="text-slate-600 text-sm">{trend.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8 ml-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <BarChart2 className="h-4 w-4 text-amber-600" />
                <span>Updated quarterly with latest automation insights and forecasts</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 