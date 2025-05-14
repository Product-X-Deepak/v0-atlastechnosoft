"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, BrainCircuit, CheckCircle2 } from "lucide-react"

export default function UiPathCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  
  return (
    <section ref={ref} className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-amber-600 to-amber-700 text-white" id="cta">
      <div className="absolute inset-0 bg-[url('/images/patterns/grid-light.svg')] bg-repeat opacity-10"></div>
      <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-yellow-500/20 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-orange-500/20 rounded-full blur-3xl mix-blend-overlay"></div>
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-white mb-2 shadow-sm">
            <span>Ready to Transform Your Business Operations?</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white">
            Transform Your Enterprise with UiPath Agentic Automation
          </h2>
          <p className="text-amber-100 max-w-[90%] mt-2 text-base">
            Ready to unleash the combined power of AI agents and RPA robots? Start your journey toward end-to-end process automation today.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/10 rounded-xl backdrop-blur-sm p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <BrainCircuit className="h-5 w-5 mr-2 text-amber-200" />
              Strategic Consultation
            </h3>
            <ul className="space-y-3">
              {[
                "Expert assessment of automation potential",
                "AI and RPA solutions roadmap",
                "Technology selection guidance",
                "ROI calculation and business case development"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-100">
                  <CheckCircle2 className="h-4 w-4 text-amber-200 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button 
                size="sm"
                className="bg-white text-amber-900 hover:bg-amber-100 w-full group"
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center">
                  <span>Request Consultation</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/10 rounded-xl backdrop-blur-sm p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <Bot className="h-5 w-5 mr-2 text-amber-200" />
              Agentic Demo Workshop
            </h3>
            <ul className="space-y-3">
              {[
                "Personalized demonstration of platform capabilities",
                "Hands-on experience with AI agents and RPA",
                "Industry-specific use case exploration",
                "Adoption strategy and best practices"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-100">
                  <CheckCircle2 className="h-4 w-4 text-amber-200 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button 
                size="sm"
                variant="outline"
                className="bg-transparent border-white hover:bg-white/10 w-full group"
                asChild
              >
                <Link href="/contact?service=demo" className="flex items-center justify-center">
                  <span>Schedule Demo</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-amber-200 max-w-2xl mx-auto mb-4">
            Our implementation methodology is designed to maximize business value while minimizing disruption, with proven success across industries.
          </p>
          <Button 
            size="sm"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              <span>Learn More About Implementation Methodology</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 