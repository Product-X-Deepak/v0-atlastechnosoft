"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, CreditCard, Building2, BarChart3 } from "lucide-react"
import { Suspense } from "react"

interface BusinessBenefit {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
}

function SapBusinessOneCloudBenefits() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 dark:from-slate-950 dark:to-slate-900 md:py-28"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Measurable Business Impact</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-premium-heading">Transform Your Business <span className="text-premium-orange">Operations</span></h2>
          <p className="mt-4 text-lg text-premium-text">
            SAP Business One Cloud delivers concrete, measurable benefits that directly impact your bottom line and operational efficiency.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative flex h-[500px] w-full max-w-[550px] rounded-xl bg-white shadow-xl dark:bg-slate-800">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-xl bg-primary/10 dark:bg-primary/20"></div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl bg-primary/10 dark:bg-primary/20"></div>
              
              <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-sm">
                <div className="flex h-12 w-full items-center bg-slate-100 px-4 dark:bg-slate-700">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <p className="ml-4 text-xs font-medium">SAP Business One Cloud - Executive Dashboard</p>
                </div>
                
                <div className="grid flex-1 grid-cols-2 gap-4 p-4">
                  <div className="col-span-2 h-32 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-medium">Revenue Growth Trend</h4>
                      <Badge variant="outline" className="text-xs">Real-time</Badge>
                    </div>
                    <div className="flex h-16 items-end space-x-1">
                      <div className="h-6 w-6 rounded-sm bg-blue-200 dark:bg-blue-900"></div>
                      <div className="h-9 w-6 rounded-sm bg-blue-300 dark:bg-blue-800"></div>
                      <div className="h-8 w-6 rounded-sm bg-blue-400 dark:bg-blue-700"></div>
                      <div className="h-10 w-6 rounded-sm bg-blue-500 dark:bg-blue-600"></div>
                      <div className="h-12 w-6 rounded-sm bg-blue-600 dark:bg-blue-500"></div>
                      <div className="h-14 w-6 rounded-sm bg-blue-700 dark:bg-blue-400"></div>
                    </div>
                  </div>
                  
                  <div className="h-32 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                    <h4 className="mb-2 text-sm font-medium">Operational Costs</h4>
                    <div className="mt-6 flex items-center text-green-500">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span className="text-xl font-bold">-18%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Year over year</p>
                  </div>
                  
                  <div className="h-32 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                    <h4 className="mb-2 text-sm font-medium">Time Savings</h4>
                    <div className="mt-6 flex items-center text-primary">
                      <Clock className="mr-1 h-4 w-4" />
                      <span className="text-xl font-bold">+32%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Productivity gain</p>
                  </div>
                  
                  <div className="col-span-2 h-32 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                    <h4 className="mb-2 text-sm font-medium">Real-time Business Insights</h4>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="rounded bg-primary/10 p-2 text-center">
                        <span className="block text-xs text-muted-foreground">Inventory</span>
                        <span className="text-sm font-medium">98.2%</span>
                      </div>
                      <div className="rounded bg-primary/10 p-2 text-center">
                        <span className="block text-xs text-muted-foreground">Orders</span>
                        <span className="text-sm font-medium">+12%</span>
                      </div>
                      <div className="rounded bg-primary/10 p-2 text-center">
                        <span className="block text-xs text-muted-foreground">Cash Flow</span>
                        <span className="text-sm font-medium">Positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl text-premium-heading">
              Real Business <span className="text-premium-orange">Outcomes</span>
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden border-l-4 border-l-primary">
                    <CardContent className="flex items-start space-x-4 p-4 md:p-6">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        {benefit.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{benefit.title}</h3>
                          {benefit.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {benefit.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const benefits: BusinessBenefit[] = [
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Reduced Total Cost of Ownership",
    description:
      "On average, businesses report 30-40% lower TCO with cloud deployment compared to on-premise, with elimination of hardware costs, maintenance, and IT infrastructure expenses.",
    badge: "Cost Saving",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Accelerated Implementation and ROI",
    description:
      "Implement in weeks instead of months with pre-configured templates and industry best practices, leading to faster time-to-value and business impact.",
    badge: "Time Saving",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Data-Driven Decision Making",
    description:
      "Real-time analytics and reporting capabilities enable executives and managers to make faster, more accurate business decisions based on live data.",
    badge: "Competitive Edge",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Business Continuity and Resilience",
    description:
      "Enterprise-grade security, automated backups, and disaster recovery capabilities ensure your business can operate without disruption under any circumstances.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCloudBenefitsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCloudBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCloudBenefitsWrapper as SapBusinessOneCloudBenefits };