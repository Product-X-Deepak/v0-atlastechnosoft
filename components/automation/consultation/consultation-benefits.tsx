"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  BarChart4, 
  BadgeCheck,
  Target,
  Sparkles
} from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"

function ConsultationBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  return (
    <section 
      ref={ref} 
      id="benefits" 
      className="py-16 bg-[#FFF5D6] relative overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Why Choose Our <span className="text-[#A73370]">Automation Consulting</span> Services
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our clients achieve transformative business outcomes through our structured approach, deep expertise, and commitment to delivering measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/solutions/B7_B.png" 
                alt="Enterprise Automation Dashboard" 
                width={600}
                height={400}
                className="w-full h-auto object-contain bg-white"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#A73370] rounded-full -z-10"></div>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#E84A0E] rounded-full -z-10"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.slice(0, 4).map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5D6] mb-4">
                  {benefit.icon}
                </div>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#1E1E38]">{benefit.stat}</span>
                  <span className="ml-1 text-[#E84A0E] text-sm">{benefit.unit}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#1E1E38]">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.slice(4).map((benefit, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + (0.1 * index) }}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5D6] mb-4">
                {benefit.icon}
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold text-[#1E1E38]">{benefit.stat}</span>
                <span className="ml-1 text-[#E84A0E] text-sm">{benefit.unit}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1E1E38]">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <TrendingUp className="h-5 w-5 text-[#E84A0E]" />,
    stat: "35",
    unit: "%",
    title: "Efficiency Increase",
    description: "On average, our clients experience a 35% improvement in operational efficiency through hyperautomation."
  },
  {
    icon: <Zap className="h-5 w-5 text-[#A73370]" />,
    stat: "72",
    unit: "%",
    title: "Faster Processes",
    description: "Key business processes are accelerated by up to 72% with our AI-powered automation solutions."
  },
  {
    icon: <Shield className="h-5 w-5 text-[#E84A0E]" />,
    stat: "17.3",
    unit: "%",
    title: "CAGR Growth",
    description: "Hyperautomation market growing at 17.3% CAGR through 2025, highlighting its business impact."
  },
  {
    icon: <Users className="h-5 w-5 text-[#A73370]" />,
    stat: "85",
    unit: "%",
    title: "Employee Satisfaction",
    description: "Team members report higher job satisfaction when freed from repetitive tasks to focus on strategic work."
  },
  {
    icon: <BarChart4 className="h-5 w-5 text-[#E84A0E]" />,
    stat: "30",
    unit: "%",
    title: "Cost Reduction",
    description: "Clients typically reduce operational costs by 30% through low-code automation and process mining."
  },
  {
    icon: <Target className="h-5 w-5 text-[#A73370]" />,
    stat: "3.5x",
    unit: "",
    title: "ROI Multiplier",
    description: "Our clients achieve an average of 3.5x return on their automation consulting investment."
  },
  {
    icon: <BadgeCheck className="h-5 w-5 text-[#E84A0E]" />,
    stat: "95",
    unit: "%",
    title: "Cloud Adoption",
    description: "By 2025, 95% of new digital workloads are deployed on cloud-native platforms for automation."
  },
  {
    icon: <Sparkles className="h-5 w-5 text-[#A73370]" />,
    stat: "6x",
    unit: "",
    title: "Innovation Acceleration",
    description: "Our clients report launching new initiatives 6 times faster with hyperautomation processes."
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationBenefitsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationBenefitsWrapper as ConsultationBenefits };