"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"

function CareerJourney() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-16 bg-slate-50 overflow-hidden md:py-20">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
            <span>Our Journey</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
            From <span className="text-[#E84A0E]">Vision</span> to <span className="text-[#A73370]">Reality</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our journey has been marked by innovation, growth, and a relentless commitment to excellence. Join us as we continue to write our success story.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#E84A0E] via-[#A73370] to-[#1E1E38]"></div>
          
          <div className="space-y-12 relative">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-1 rounded-full ${event.yearBg} text-white font-medium mb-3`}>
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-600">{event.description}</p>
                </div>
                
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <div className="absolute h-6 w-6 rounded-full bg-white"></div>
                  <div className={`absolute h-4 w-4 rounded-full ${event.dotColor}`}></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#E84A0E" d="M46.5,-58.5C59.1,-46.9,67.7,-31.2,72.1,-13.8C76.5,3.6,76.7,22.7,68.8,38.1C60.9,53.4,45,64.9,27.2,70.9C9.4,76.9,-10.3,77.4,-27.6,71.1C-44.9,64.8,-59.9,51.7,-68.4,35.2C-76.8,18.7,-78.7,-1.1,-72.6,-17.5C-66.6,-33.8,-52.7,-46.7,-38,-57.5C-23.2,-68.3,-7.6,-77,7.2,-75.8C22,-74.6,33.9,-70.1,46.5,-58.5Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  )
}

const timelineEvents = [
  {
    year: "2008",
    yearBg: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    title: "Founded with a Vision",
    description: "Atlas Technosoft was established with a mission to provide innovative technology solutions to businesses worldwide.",
  },
  {
    year: "2012",
    yearBg: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    title: "Expanding Horizons",
    description: "Expanded our service portfolio to include enterprise solutions and opened our first international office.",
  },
  {
    year: "2015",
    yearBg: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    title: "Technology Leadership",
    description: "Achieved major technology partnerships and launched our flagship product suite for business automation.",
  },
  {
    year: "2018",
    yearBg: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    title: "Global Expansion",
    description: "Expanded to multiple countries with new offices and a growing team of talented professionals.",
  },
  {
    year: "2021",
    yearBg: "bg-[#1E1E38]",
    dotColor: "bg-[#1E1E38]",
    title: "Digital Transformation Era",
    description: "Pioneered new AI-driven solutions helping clients navigate the challenges of digital transformation.",
  },
  {
    year: "Present",
    yearBg: "bg-[#1E1E38]",
    dotColor: "bg-[#1E1E38]",
    title: "Leading Innovation",
    description: "Continuing our journey of innovation with a focus on sustainable technology solutions for the future.",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareerJourneyWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareerJourney {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareerJourneyWrapper as CareerJourney };