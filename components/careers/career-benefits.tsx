"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  HeartPulse, 
  GraduationCap, 
  Palmtree, 
  TrendingUp, 
  Globe, 
  Zap, 
  Coffee,
  UserPlus
} from "lucide-react"
import { Suspense } from "react"

function CareerBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-16 bg-[#1E1E38] overflow-hidden md:py-20">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400 mb-4">
            <span>Benefits & Perks</span>
          </div>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Why You&apos;ll Love Working With Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe that happy employees create amazing experiences for our clients.
              That&apos;s why we invest in your wellbeing and growth.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefitsList.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#E84A0E]/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#A73370]/10 blur-3xl"></div>
    </section>
  )
}

const benefitsList = [
  {
    icon: <HeartPulse className="h-6 w-6 text-white" />,
    bgColor: "bg-[#E84A0E]",
    title: "Health & Wellness",
    description: "Comprehensive health insurance, wellness programs, and mental health support for you and your family.",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    bgColor: "bg-[#A73370]",
    title: "Learning & Development",
    description: "Continuous learning opportunities with access to courses, certifications, and professional development resources.",
  },
  {
    icon: <Palmtree className="h-6 w-6 text-white" />,
    bgColor: "bg-[#E84A0E]",
    title: "Work-Life Balance",
    description: "Flexible work arrangements, generous PTO, and paid parental leave to help you maintain a healthy balance.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    bgColor: "bg-[#A73370]",
    title: "Career Growth",
    description: "Clear career paths with regular performance reviews and opportunities for advancement within the company.",
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    bgColor: "bg-[#A73370]",
    title: "Global Exposure",
    description: "Work with international clients and collaborate with diverse teams across different regions and cultures.",
  },
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    bgColor: "bg-[#E84A0E]",
    title: "Cutting-Edge Tech",
    description: "Access to the latest technologies and tools to help you deliver innovative solutions and stay at the forefront.",
  },
  {
    icon: <Coffee className="h-6 w-6 text-white" />,
    bgColor: "bg-[#A73370]",
    title: "Vibrant Culture",
    description: "Enjoy team events, celebrations, and a positive work environment focused on collaboration and creativity.",
  },
  {
    icon: <UserPlus className="h-6 w-6 text-white" />,
    bgColor: "bg-[#E84A0E]",
    title: "Referral Program",
    description: "Attractive bonuses for referring talented individuals who join our team and contribute to our success.",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareerBenefitsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareerBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareerBenefitsWrapper as CareerBenefits };