"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Heart, Globe, Users, Zap, Coffee, Award } from "lucide-react"
import { Suspense } from "react"

function CareersBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-slate-50 py-16 dark:bg-slate-900 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Employee Benefits</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a comprehensive benefits package to support our employees&apos; well-being and professional growth.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(2, 8, 23, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
              }}
            >
              <Card className="h-full premium-card">
                <CardHeader>
                  <div className="mb-2 w-fit rounded-md bg-primary/10 p-2 text-primary">{benefit.icon}</div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance, mental wellness programs, and fitness allowances to keep you at your best.",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Flexible Work",
    description:
      "Hybrid work options, flexible hours, and remote work opportunities to help you maintain work-life balance.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Learning & Development",
    description:
      "Continuous learning opportunities, certification programs, and education allowances to advance your skills.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global Exposure",
    description: "Opportunities to work with international clients and teams, and potential for global assignments.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Collaborative Culture",
    description: "A supportive and inclusive work environment where teamwork and innovation are encouraged.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Career Growth",
    description:
      "Clear career paths, regular performance reviews, and opportunities for advancement within the company.",
  },
  {
    icon: <Coffee className="h-5 w-5" />,
    title: "Work Perks",
    description:
      "Modern offices, free snacks and beverages, team outings, and regular social events to foster camaraderie.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Recognition Programs",
    description: "Regular recognition of achievements, performance bonuses, and rewards for innovation and excellence.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareersBenefitsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareersBenefitsWrapper as CareersBenefits };