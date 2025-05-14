"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, ArrowRight, Zap, Building, Award, Network, Brain } from "lucide-react"
import { Suspense } from "react"

function Journey() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>1997 - Present</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our Innovation <span className="text-[#E84A0E]">Journey</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From our humble beginnings to becoming a global technology leader, our journey has been defined by continuous innovation and unwavering excellence.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 md:block"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full md:block" style={{ backgroundColor: milestone.color }}></div>
                
                {/* Content card */}
                <div className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: milestone.color }}>
                      {milestone.icon}
                    </div>
                    
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${milestone.color}30`, color: milestone.color }}>
                      <span>{milestone.year}</span>
                    </div>
                    
                    <h3 className="mt-3 text-xl font-bold text-slate-900">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{milestone.description}</p>
                    
                    {milestone.highlight && (
                      <div className="mt-4 inline-flex items-center space-x-1">
                        <ArrowRight className="h-3 w-3" style={{ color: milestone.color }} />
                        <span className="text-sm font-medium" style={{ color: milestone.color }}>{milestone.highlight}</span>
                      </div>
                    )}
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
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative mt-16 flex flex-col items-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#E84A0E] to-[#A73370] text-white shadow-md">
            <span className="text-xl font-bold">→</span>
          </div>
          <div className="inline-flex items-center rounded-full border border-[#1E1E38]/30 bg-[#1E1E38]/10 px-4 py-2 text-sm font-medium text-[#1E1E38]">
            <span>Future Innovation</span>
          </div>
          <p className="mt-2 max-w-md text-center text-sm text-slate-600">
            Continuing to pioneer enterprise solutions that empower businesses for tomorrow&apos;s challenges
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const milestones = [
  {
    year: "1997",
    icon: <Building className="h-6 w-6" />,
    title: "Company Founded",
    description: "Atlas Technosoft was established in Mumbai, India with a vision to transform enterprise software.",
    color: "#E84A0E",
    highlight: "Initial team of 10"
  },
  {
    year: "2003",
    icon: <Award className="h-6 w-6" />,
    title: "SAP Partnership",
    description: "Became an official SAP partner, expanding our enterprise solutions portfolio.",
    color: "#A73370",
    highlight: "First SAP implementation"
  },
  {
    year: "2008",
    icon: <Globe className="h-6 w-6" />,
    title: "Global Expansion",
    description: "Opened offices in North America and Europe, expanding our international presence.",
    color: "#E84A0E",
    highlight: "5 international offices"
  },
  {
    year: "2018",
    icon: <Zap className="h-6 w-6" />,
    title: "Digital Transformation",
    description: "Launched dedicated digital transformation services to help clients navigate the digital era.",
    color: "#A73370",
    highlight: "100+ transformation projects"
  },
  {
    year: "2021",
    icon: <Network className="h-6 w-6" />,
    title: "Cloud Innovation",
    description: "Established a cloud center of excellence to accelerate clients' cloud transformation journeys.",
    color: "#A73370",
    highlight: "200+ cloud migrations"
  },
  {
    year: "2023",
    icon: <Brain className="h-6 w-6" />,
    title: "AI Integration",
    description: "Integrated advanced AI capabilities into our solutions for predictive analytics and automation.",
    color: "#E84A0E",
    highlight: "5+ AI-powered solutions"
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function JourneyWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <Journey {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { JourneyWrapper as Journey };