"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { 
  Search, 
  FileBarChart, 
  ArrowRight, 
  Brain,
  Rocket,
  BarChartHorizontal,
  ClipboardList
} from "lucide-react"

function ConsultationProcess() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section 
      ref={ref} 
      id="process" 
      className="py-20 bg-[#1E1E38]"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1.5 mb-6 text-sm font-medium">
              <ClipboardList className="mr-2 h-3.5 w-3.5 text-[#E84A0E]" />
              <span className="text-[#E84A0E]">Proven Framework</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Our <span className="text-[#E84A0E]">End-to-End</span> Consulting Process
            </h2>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We follow a structured yet flexible methodology designed to deliver maximum value at every stage of your automation journey.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="relative"
          >
            {/* Timeline connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E84A0E]/80 via-[#A73370]/80 to-[#E84A0E]/80 hidden md:block"></div>
            
            {/* Process steps */}
            {processsteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#E84A0E]/30 transition-all duration-300 shadow-lg">
                    <div className={`flex items-center mb-4 ${index % 2 === 0 ? "justify-end" : ""}`}>
                      <div className="rounded-lg bg-[#FFF5D6] p-3 shadow-lg mr-3">
                        {index % 2 === 0 ? step.icon : null}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Phase {index + 1}: {step.title}
                      </h3>
                      <div className="rounded-lg bg-[#FFF5D6] p-3 shadow-lg ml-3">
                        {index % 2 === 1 ? step.icon : null}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {step.description}
                    </p>
                    <ul className={`space-y-2 ${index % 2 === 0 ? "text-right" : ""}`}>
                      {step.activities.map((activity, idx) => (
                        <li key={idx} className={`flex items-start ${index % 2 === 0 ? "justify-end" : ""}`}>
                          {index % 2 === 1 && <ArrowRight className="h-4 w-4 text-[#E84A0E] mt-1 mr-2 flex-shrink-0" />}
                          <span className="text-sm text-gray-400">{activity}</span>
                          {index % 2 === 0 && <ArrowRight className="h-4 w-4 text-[#E84A0E] mt-1 ml-2 flex-shrink-0 transform rotate-180" />}
                        </li>
                      ))}
                    </ul>
                    <div className={`flex mt-6 ${index % 2 === 0 ? "justify-end" : ""}`}>
                      <span className="text-sm font-medium text-[#E84A0E]">Duration: {step.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Timeline node */}
                <div className="flex items-center justify-center my-8 md:my-0">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E84A0E] to-[#A73370] flex items-center justify-center shadow-lg shadow-[#E84A0E]/20 z-10 relative">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <div className="absolute -inset-2 bg-[#E84A0E]/20 rounded-full blur-md -z-10"></div>
                  </div>
                </div>
                
                {/* Placeholder for alternate rows */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
            
            {/* End point */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-6"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A73370] to-[#E84A0E] flex items-center justify-center shadow-lg shadow-[#E84A0E]/20 z-10 border-4 border-[#1E1E38]">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -inset-3 bg-[#E84A0E]/20 rounded-full blur-lg -z-10"></div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center">
                  <span className="text-[#E84A0E] font-medium">Continuous Improvement</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-20 max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Ready to Start Your Automation Journey?</h3>
            <p className="text-gray-300 mb-4">
              Our proven process has helped organizations across industries achieve transformative results through strategic automation. Schedule a consultation to learn how we can help you.
            </p>
            <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1.5 text-sm font-medium">
              <span className="text-[#E84A0E]">Average time to ROI: 4-6 months</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const processsteps = [
  {
    icon: <Search className="h-6 w-6 text-[#E84A0E]" />,
    title: "Discovery",
    description: "We begin by gaining a deep understanding of your business objectives, challenges, and current processes.",
    activities: [
      "Stakeholder interviews",
      "Process documentation review",
      "Technology stack assessment",
      "Opportunity identification"
    ],
    duration: "2-3 weeks"
  },
  {
    icon: <FileBarChart className="h-6 w-6 text-[#A73370]" />,
    title: "Analysis & Strategy",
    description: "Our experts analyze findings to develop a comprehensive automation strategy tailored to your business needs.",
    activities: [
      "Process prioritization matrix",
      "ROI modeling & projections",
      "Risk assessment",
      "Technology selection"
    ],
    duration: "3-4 weeks"
  },
  {
    icon: <Brain className="h-6 w-6 text-[#E84A0E]" />,
    title: "Solution Design",
    description: "We design scalable automation solutions that integrate seamlessly with your existing systems and workflows.",
    activities: [
      "Detailed solution architecture",
      "Prototype development",
      "User experience design",
      "Integration mapping"
    ],
    duration: "4-6 weeks"
  },
  {
    icon: <Rocket className="h-6 w-6 text-[#A73370]" />,
    title: "Implementation",
    description: "Our team guides the deployment process, ensuring smooth adoption and maximum value realization.",
    activities: [
      "Phased deployment planning",
      "Change management support",
      "User training & documentation",
      "Go-live preparation"
    ],
    duration: "8-12 weeks"
  },
  {
    icon: <BarChartHorizontal className="h-6 w-6 text-[#E84A0E]" />,
    title: "Optimization",
    description: "We continuously monitor performance and identify opportunities for further enhancement and expansion.",
    activities: [
      "Performance analytics review",
      "Process refinement",
      "ROI measurement",
      "Future roadmap development"
    ],
    duration: "Ongoing"
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationProcessWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationProcess {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationProcessWrapper as ConsultationProcess };