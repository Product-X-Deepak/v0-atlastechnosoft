"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Target, Compass } from "lucide-react"
import { Suspense } from "react"

function CareerMission() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative py-16 bg-white overflow-hidden md:py-20">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
              <span>Our Foundation</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              Guided by Purpose, <span className="text-[#A73370]">Driven by Excellence</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              At Atlas Technosoft, we&apos;re building more than software—we&apos;re creating solutions that transform businesses and empower people.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {pillars.map((pillar, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + (0.1 * index) }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`h-12 w-12 rounded-lg ${pillar.iconBg} flex items-center justify-center`}>
                    {pillar.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-600">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 -z-10 h-64 w-64 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#E84A0E" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="#A73370" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" stroke="#1E1E38" strokeWidth="2" />
        </svg>
      </div>
    </section>
  )
}

const pillars = [
  {
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Our Mission",
    description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.",
  },
  {
    icon: <Target className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Our Vision",
    description: "To be the global leader in delivering transformative digital solutions that help organizations thrive in the digital era, known for excellence, innovation, and customer-centricity.",
  },
  {
    icon: <Compass className="h-6 w-6 text-white" />,
    iconBg: "bg-[#1E1E38]",
    title: "Our Values",
    description: "Excellence, integrity, innovation, collaboration, and customer success drive everything we do. We foster a culture of continuous learning, diversity, and work-life balance.",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareerMissionWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareerMission {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareerMissionWrapper as CareerMission };