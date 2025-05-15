"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Cloud, Server, ShieldCheck, Clock, Zap, Coins } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SapBusinessOneDeployment() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary mb-4">
            <span>Flexible Options</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Ideal Deployment</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            SAP Business One offers flexible deployment options to fit your business needs, IT strategy, and budget requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <Tabs defaultValue="cloud" className="w-full">
            <TabsList className="mx-auto grid w-[400px] grid-cols-2">
              <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Cloud className="mr-2 h-4 w-4" />
                Cloud
              </TabsTrigger>
              <TabsTrigger value="on-premise" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Server className="mr-2 h-4 w-4" />
                On-Premise
              </TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="cloud" className="mt-0">
                <div className="rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 p-1">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardHeader>
                      <div className="flex flex-col items-center">
                        <Cloud className="h-16 w-16 text-primary" />
                        <CardTitle className="mt-4 text-center text-2xl">SAP Business One Cloud</CardTitle>
                        <div className="mt-2 flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                          <span>Subscription-based model</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-8 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-xl font-medium">Key Benefits</h3>
                          <ul className="space-y-3">
                            {cloudBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <div className="mr-2 mt-1 text-primary">
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-4 text-xl font-medium">Ideal For</h3>
                          <div className="grid gap-4">
                            {cloudIdealFor.map((item, index) => (
                              <Card key={index} className="border-primary/10 bg-white/50 dark:bg-slate-900/50">
                                <CardContent className="flex items-center p-4">
                                  <div className="mr-4 text-primary">{item.icon}</div>
                                  <div>
                                    <h4 className="font-medium">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-blue-50 p-5 dark:bg-blue-950/20">
                        <h3 className="mb-2 text-center text-lg font-medium text-primary">Cloud Pricing</h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">€91</div>
                            <div className="text-xs text-muted-foreground">Professional User/month</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">€47</div>
                            <div className="text-xs text-muted-foreground">Limited User/month</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">€38</div>
                            <div className="text-xs text-muted-foreground">Starter Package User/month</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/contact" className="flex items-center">
                          Get Cloud Pricing
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="on-premise" className="mt-0">
                <div className="rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 p-1 dark:from-slate-800 dark:to-slate-700">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardHeader>
                      <div className="flex flex-col items-center">
                        <Server className="h-16 w-16 text-slate-700 dark:text-slate-300" />
                        <CardTitle className="mt-4 text-center text-2xl">SAP Business One On-Premise</CardTitle>
                        <div className="mt-2 flex items-center rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-600 dark:text-white">
                          <span>Perpetual licensing model</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-8 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-xl font-medium">Key Benefits</h3>
                          <ul className="space-y-3">
                            {onPremiseBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <div className="mr-2 mt-1 text-slate-700 dark:text-slate-300">
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-4 text-xl font-medium">Ideal For</h3>
                          <div className="grid gap-4">
                            {onPremiseIdealFor.map((item, index) => (
                              <Card key={index} className="border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-900/50">
                                <CardContent className="flex items-center p-4">
                                  <div className="mr-4 text-slate-700 dark:text-slate-300">{item.icon}</div>
                                  <div>
                                    <h4 className="font-medium">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-slate-100 p-5 dark:bg-slate-800">
                        <h3 className="mb-2 text-center text-lg font-medium">On-Premise Pricing</h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold">€2,700</div>
                            <div className="text-xs text-muted-foreground">Professional User (one-time)</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">€1,400</div>
                            <div className="text-xs text-muted-foreground">Limited User (one-time)</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">€1,140</div>
                            <div className="text-xs text-muted-foreground">Starter Package User (one-time)</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild variant="outline" className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                        <Link href="/contact" className="flex items-center">
                          Get On-Premise Pricing
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

const cloudBenefits = [
  "Lower upfront investment with predictable monthly subscription costs",
  "Automatic updates and upgrades with no IT maintenance required",
  "Rapid implementation and deployment (typically 2-8 weeks)",
  "Accessible anywhere, anytime on any device with internet connection",
  "Scalable resources to accommodate business growth",
  "Reduced IT infrastructure costs and complexity",
  "Enterprise-grade security and compliance with international standards",
]

const cloudIdealFor = [
  {
    title: "Budget-Conscious Businesses",
    description: "Organizations looking to minimize capital expenditure and optimize operational expenses",
    icon: <Coins className="h-6 w-6" />,
  },
  {
    title: "Fast-Growing Companies",
    description: "Businesses that need to scale quickly and adapt to changing market conditions",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Remote & Distributed Teams",
    description: "Companies with multiple locations or remote workforce requiring secure, centralized access",
    icon: <Clock className="h-6 w-6" />,
  },
]

const onPremiseBenefits = [
  "Complete control over your data and system environment",
  "One-time licensing cost with predictable annual maintenance fees",
  "Highly customizable to meet specific business requirements",
  "No reliance on internet connectivity for system access",
  "Direct integration with on-site hardware and systems",
  "Greater control over upgrade timing and testing",
  "Potential for lower long-term costs for stable businesses",
]

const onPremiseIdealFor = [
  {
    title: "Data-Sensitive Industries",
    description: "Organizations with strict data security, compliance or regulatory requirements",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Customization-Heavy Users",
    description: "Businesses requiring extensive tailoring and integration with existing systems",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Long-Term Stability",
    description: "Companies with stable operations looking for long-term cost optimization",
    icon: <Coins className="h-6 w-6" />,
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneDeploymentWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneDeployment {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneDeploymentWrapper as SapBusinessOneDeployment };