"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Globe, Award, Cloud, Brain } from "lucide-react"
import { Suspense } from "react"

function JourneySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const milestones = [
    {
      year: "1997",
      icon: <Rocket className="h-6 w-6 text-white" />,
      title: "Company Founded",
      description:
        "Atlas Technosoft was founded in Mumbai, India, with a vision to provide cutting-edge IT solutions to businesses.",
      color: "#E84A0E",
      highlight: "Established with 5 employees",
    },
    {
      year: "2002",
      icon: <Award className="h-6 w-6 text-white" />,
      title: "SAP Partnership",
      description: "Became an official SAP partner, specializing in SAP Business One implementations.",
      color: "#A73370",
      highlight: "50+ implementations",
    },
    {
      year: "2008",
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Global Expansion",
      description: "Expanded operations globally, serving clients across multiple countries and industries.",
      color: "#E84A0E",
      highlight: "5+ Global offices",
    },
    {
      year: "2012",
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Enterprise Solutions",
      description: "Expanded our enterprise solutions portfolio with successful implementations across industries.",
      color: "#A73370",
      highlight: "250+ enterprise clients",
    },
    {
      year: "2022",
      icon: <Cloud className="h-6 w-6 text-white" />,
      title: "Cloud Transformation",
      description: "Expanded our cloud services portfolio to help clients with digital transformation initiatives.",
      color: "#A73370",
      highlight: "500+ cloud migrations",
    },
    {
      year: "2025",
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "AI Integration",
      description: "Integrated advanced AI capabilities into our solutions for predictive analytics and automation.",
      color: "#E84A0E",
      highlight: "5+ AI integrations",
    }
  ]

  return (
    <section id="journey" ref={ref} className="py-16 lg:py-24 bg-transparent overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-[#E84A0E]/5 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-1/3 w-64 h-64 bg-[#A73370]/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>1997 - 2025</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our Innovation <span className="text-[#E84A0E]">Journey</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-600">
            From our humble beginnings to becoming a global technology leader, our journey has been defined by constant innovation and unwavering commitment to excellence
          </p>
        </motion.div>
        
        {/* Timeline display section */}
        <div className="relative mb-16">
          {/* Milestone circles only */}
          <div className="relative flex justify-between items-center pb-2 mb-10 px-6 md:px-0">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E84A0E]/30 via-[#A73370]/30 to-[#E84A0E]/30 -translate-y-1/2 z-0"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="relative flex flex-col items-center z-10"
              >
                <div className="absolute -top-8 whitespace-nowrap rounded-full bg-[#1E1E38] px-3 py-1 text-xs font-bold text-white">
                  {milestone.year}
                </div>
                <div 
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg relative group"
                  style={{ backgroundColor: milestone.color }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" 
                    style={{ boxShadow: `0 0 20px 5px ${milestone.color}` }}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    {milestone.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Cards in separate rows below */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
                className="flex flex-col items-center"
              >
                <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100 hover:shadow-lg transition-shadow duration-300 w-full h-full flex flex-col">
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{milestone.title}</h3>
                  <p className="text-xs text-slate-600 flex-grow">{milestone.description}</p>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-medium text-[#A73370]">
                    {milestone.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
          
        {/* Future indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative mt-10 flex flex-col items-center"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#E84A0E] to-[#A73370] text-white shadow-lg">
            <span className="text-2xl">→</span>
          </div>
          <div className="inline-flex items-center justify-center rounded-full border border-[#1E1E38]/30 bg-[#1E1E38]/10 px-4 py-2 text-sm font-medium text-[#1E1E38]">
            <span>Future Horizons</span>
          </div>
          <p className="mt-2 max-w-md text-center text-sm text-slate-600">
            Pushing the boundaries of innovation to create the enterprise solutions of tomorrow
          </p>
        </motion.div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function JourneySectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <JourneySection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { JourneySectionWrapper as JourneySection };
