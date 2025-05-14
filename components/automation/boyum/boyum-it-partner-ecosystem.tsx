"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Globe, BriefcaseBusiness, BookOpen, PanelRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItPartnerEcosystem(_props: Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="partner-ecosystem" ref={ref} className="py-16 bg-gradient-to-r from-amber-500/10 to-amber-400/5">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Partner Ecosystem</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Join Our Global <span className="text-[#E84A0E]">Partner Network</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Expand your business opportunities and deliver exceptional value to your customers as part of our growing partner ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {partnerBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-lg mb-6" style={{ background: benefit.bgColor }}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 text-sm mb-5">{benefit.description}</p>
              
              <div className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <Award className="h-6 w-6 text-[#E84A0E]" />
              <span className="text-sm text-slate-700">10,000+ companies trust Boyum IT</span>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <Globe className="h-6 w-6 text-[#A73370]" />
              <span className="text-sm text-slate-700">Global partner network in 115+ countries</span>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <BookOpen className="h-6 w-6 text-[#E84A0E]" />
              <span className="text-sm text-slate-700">Comprehensive enablement resources</span>
            </div>
          </div>
          
          <Button 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/partners" className="flex items-center">
              Become a Partner
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const partnerBenefits = [
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Sales & Marketing Support",
    description: "Get access to sales enablement, marketing resources and lead generation opportunities to grow your business.",
    bgColor: "#E84A0E",
    features: [
      "Co-marketing opportunities",
      "Sales & marketing toolkits",
      "Lead generation programs",
      "Demand generation support"
    ]
  },
  {
    icon: <BriefcaseBusiness className="h-6 w-6 text-white" />,
    title: "Business Development",
    description: "Expand your services and create new revenue streams with our comprehensive solutions portfolio.",
    bgColor: "#A73370",
    features: [
      "Competitive margins",
      "Recurring revenue opportunities",
      "Cross-selling possibilities",
      "Value-added services potential"
    ]
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: "Technical Enablement",
    description: "Access continuous learning resources, certification programs and technical expertise to deliver excellence.",
    bgColor: "#E84A0E",
    features: [
      "Comprehensive training programs",
      "Certification opportunities",
      "Technical documentation",
      "Pre-sales & implementation support"
    ]
  },
  {
    icon: <PanelRight className="h-6 w-6 text-white" />,
    title: "Partner Portal Access",
    description: "Leverage our self-service portal with all the resources you need to succeed as a Boyum IT partner.",
    bgColor: "#A73370",
    features: [
      "License management",
      "Customer case tracking",
      "Product documentation",
      "Technical support resources"
    ]
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Global Community",
    description: "Join a worldwide network of partners sharing knowledge, insights and best practices across industries.",
    bgColor: "#E84A0E",
    features: [
      "Partner conferences & events",
      "Knowledge sharing platforms",
      "Partner advisory councils",
      "Networking opportunities"
    ]
  },
  {
    icon: <Award className="h-6 w-6 text-white" />,
    title: "Partner Recognition",
    description: "Be recognized for your expertise and success through our tiered partner program and awards.",
    bgColor: "#A73370",
    features: [
      "Partner certification levels",
      "Annual partner awards",
      "Success story highlights",
      "Co-branding opportunities"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItPartnerEcosystemWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItPartnerEcosystem {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItPartnerEcosystemWrapper as BoyumItPartnerEcosystem };