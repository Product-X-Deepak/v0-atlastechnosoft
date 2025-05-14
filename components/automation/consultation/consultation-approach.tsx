"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Suspense } from "react"
import { 
  UserCheck, 
  LineChart, 
  Workflow, 
  CircleDollarSign, 
  Shield, 
  Layers 
} from "lucide-react"

function ConsultationApproach() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} id="approach" className="relative py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our <span className="text-[#E84A0E]">Automation</span> Consulting Approach
            </h2>
            <p className="text-gray-600">
              We help businesses navigate the complexities of automation with a strategic, data-driven approach that prioritizes measurable outcomes and sustainable growth.
            </p>

            <div className="space-y-4">
              {approaches.map((approach, index) => (
              <motion.div
                key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex gap-3"
              >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF5D6]">
                      {approach.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E1E38]">{approach.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{approach.description}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
          
          <div className="relative lg:mt-0 mt-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/solutions/B7_A.png"
                alt="Management Consulting Services Framework"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#A73370] rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#E84A0E] rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

const approaches = [
  {
    icon: <UserCheck className="h-4 w-4 text-[#A73370]" />,
    title: "Strategic Assessment",
    description: "We analyze your existing processes, technologies, and pain points to identify automation opportunities with the highest ROI potential."
  },
  {
    icon: <LineChart className="h-4 w-4 text-[#E84A0E]" />,
    title: "Process Mining & Intelligence",
    description: "Using advanced data analytics to map your business processes, identify bottlenecks, and quantify improvement opportunities."
  },
  {
    icon: <Workflow className="h-4 w-4 text-[#A73370]" />,
    title: "Hyperautomation Strategy",
    description: "Developing a comprehensive roadmap that combines AI, RPA, and ML technologies for end-to-end process optimization."
  },
  {
    icon: <CircleDollarSign className="h-4 w-4 text-[#E84A0E]" />,
    title: "Technology Selection & Implementation",
    description: "Guiding you through the selection of the right automation platforms and technologies aligned with your business objectives."
  },
  {
    icon: <Shield className="h-4 w-4 text-[#A73370]" />,
    title: "Governance & Compliance",
    description: "Establishing frameworks to ensure your automation initiatives comply with regulations and industry standards."
  },
  {
    icon: <Layers className="h-4 w-4 text-[#E84A0E]" />,
    title: "Change Management & Training",
    description: "Supporting your team through the transition with comprehensive training and adoption strategies."
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationApproachWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationApproach {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationApproachWrapper as ConsultationApproach };