"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, BarChart3, Clock, DollarSign, Users, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SapBusinessOneBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 md:py-28 relative">
      {/* Removing the semi-transparent overlay */}
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center rounded-full border-2 border-amber-900 bg-amber-800 px-4 py-1.5 text-sm font-bold text-white mb-4 shadow-md">
              <span>Business Impact</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl text-premium-heading drop-shadow-sm">
              Why Leading Businesses Choose <span className="text-premium-orange">SAP Business One</span>
            </h2>
            <p className="mb-8 text-lg text-premium-text font-medium drop-shadow-sm">
              SAP Business One delivers immediate value with integrated capabilities that transform your operations and drive sustainable growth. Our customers typically see ROI within 6-12 months of implementation.
            </p>

            <div className="relative mb-10 mt-8">
              <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-premium-orange/30 via-premium-orange/80 to-premium-orange/30"></div>
              <div className="space-y-8">
                {benefitCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    className="ml-10"
                  >
                    <div className="absolute -ml-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-premium-orange to-premium-purple text-white shadow-md">
                      {category.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-premium-heading drop-shadow-sm">{category.title}</h3>
                    <p className="text-premium-text rounded-md">{category.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-premium-orange to-premium-orange/90 hover:from-premium-orange/90 hover:to-premium-orange/80 shadow-md text-white">
                <Link href="/contact" className="flex items-center">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                  className="transition-all duration-300"
                >
                  <Card className="h-full border-amber-300 bg-white shadow-md">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="mb-2 font-bold text-slate-900">{benefit.title}</h3>
                        <p className="text-sm text-slate-900">{benefit.description}</p>
                        {benefit.stat && (
                          <div className="mt-3 inline-flex items-center rounded-md bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-900 shadow-sm border border-amber-300">
                            {benefit.stat}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 rounded-lg bg-white p-5 shadow-md border border-amber-300">
              <div className="mb-2 text-center text-sm font-bold text-amber-900">
                TRUSTED BY ORGANIZATIONS OF ALL SIZES
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <div className="text-center text-slate-900">
                  <div className="text-2xl font-bold">75,000+</div>
                  <div className="text-xs font-semibold">Customers</div>
                </div>
                <div className="text-center text-slate-900">
                  <div className="text-2xl font-bold">170+</div>
                  <div className="text-xs font-semibold">Countries</div>
                </div>
                <div className="text-center text-slate-900">
                  <div className="text-2xl font-bold">1.2M+</div>
                  <div className="text-xs font-semibold">Users</div>
                </div>
                <div className="text-center text-slate-900">
                  <div className="text-2xl font-bold">800+</div>
                  <div className="text-xs font-semibold">Partners</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const benefitCategories = [
  {
    title: "All-in-One Business Solution",
    description: "Eliminate siloed systems and gain comprehensive visibility with a single integrated platform covering all your business functions.",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    title: "Deployment Flexibility",
    description: "Choose the deployment option that works best for you—on-premise, cloud, or hybrid—without sacrificing functionality or performance.",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "Rapid Implementation",
    description: "Get up and running quickly with implementation timeframes 50-70% faster than traditional ERP systems.",
    icon: <Clock className="h-4 w-4" />,
  },
]

const benefits = [
  {
    title: "360° Business Visibility",
    description: "Gain real-time insights into your entire business with comprehensive dashboards and reporting.",
    icon: <BarChart3 className="h-5 w-5" />,
    stat: "98% improvement in reporting time",
  },
  {
    title: "Increased Operational Efficiency",
    description: "Automate manual processes and streamline workflows across departments for greater productivity.",
    icon: <Zap className="h-5 w-5" />,
    stat: "Up to 35% reduction in operational costs",
  },
  {
    title: "Enhanced Decision-Making",
    description: "Make faster, data-driven decisions based on accurate, up-to-date information and predictive analytics.",
    icon: <CheckCircle2 className="h-5 w-5" />,
    stat: "43% faster decision-making process",
  },
  {
    title: "Scalable Technology",
    description: "Grow your business with a flexible solution that adapts to your changing needs and requirements.",
    icon: <Users className="h-5 w-5" />,
    stat: "Supports 5 to 500+ users seamlessly",
  },
  {
    title: "Lower Total Cost of Ownership",
    description: "Reduce IT costs with a single, integrated solution requiring minimal IT resources and maintenance.",
    icon: <DollarSign className="h-5 w-5" />,
    stat: "20-30% lower TCO vs. competitors",
  },
  {
    title: "Enterprise-Grade Security",
    description: "Protect your business data with robust security features and compliance with international standards.",
    icon: <Shield className="h-5 w-5" />,
    stat: "99.9% uptime with cloud deployment",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneBenefitsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneBenefitsWrapper as SapBusinessOneBenefits };