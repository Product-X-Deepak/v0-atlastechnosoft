"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeCheck, X, ArrowRight, Zap, DollarSign, ShieldCheck, Laptop, Cloud } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

interface ComparisonFeature {
  name: string
  description: string
  available: boolean
}

interface ComparisonCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features: ComparisonFeature[]
  isInView: boolean
  highlighted: boolean
}

function SapBusinessOneCloudComparison() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-12 md:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full border border-amber-600/30 bg-amber-100/80 px-3 py-1 text-sm font-medium text-amber-800">
            <Cloud className="mr-1.5 h-3 w-3" />
            <span>Strategic Choice</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Cloud vs. <span className="text-premium-orange">On-Premise</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto">
            Make an informed decision based on your business needs with our in-depth 2025 comparison of deployment options.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-xs grid-cols-3 text-xs">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="mt-5">
              <div className="grid gap-5 md:grid-cols-2">
                <ComparisonCard 
                  title="Cloud Deployment" 
                  description="Modern, flexible, subscription-based solution with lower upfront costs and faster implementation"
                  icon={<Cloud className="h-8 w-8 text-primary" />}
                  features={cloudOverviewFeatures}
                  isInView={isInView}
                  highlighted={true}
                />
                
                <ComparisonCard 
                  title="On-Premise Deployment" 
                  description="Traditional deployment with greater control over your hardware, infrastructure, and data"
                  icon={<Laptop className="h-8 w-8" />}
                  features={onPremiseOverviewFeatures}
                  isInView={isInView}
                  highlighted={false}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="mt-5">
              <div className="grid gap-5 md:grid-cols-2">
                <ComparisonCard 
                  title="Cloud Financial Model" 
                  description="Predictable operational expense model without large capital investments"
                  icon={<DollarSign className="h-8 w-8 text-primary" />}
                  features={cloudFinancialFeatures}
                  isInView={isInView}
                  highlighted={true}
                />
                
                <ComparisonCard 
                  title="On-Premise Financial Model" 
                  description="Higher initial investment with long-term ownership of infrastructure"
                  icon={<DollarSign className="h-8 w-8" />}
                  features={onPremiseFinancialFeatures}
                  isInView={isInView}
                  highlighted={false}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-5">
              <div className="grid gap-5 md:grid-cols-2">
                <ComparisonCard 
                  title="Cloud Technical Benefits" 
                  description="Modern architecture designed for accessibility, scalability, and reduced IT burden"
                  icon={<Zap className="h-8 w-8 text-primary" />}
                  features={cloudTechnicalFeatures}
                  isInView={isInView}
                  highlighted={true}
                />
                
                <ComparisonCard 
                  title="On-Premise Technical Benefits" 
                  description="Full control over your environment, hardware, customizations, and security"
                  icon={<ShieldCheck className="h-8 w-8" />}
                  features={onPremiseTechnicalFeatures}
                  isInView={isInView}
                  highlighted={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col items-center text-center">
            <BadgeCheck className="h-8 w-8 text-[#E84A0E]" />
            <h3 className="mt-2 text-lg font-bold text-slate-900">Need Help Deciding?</h3>
            <p className="mt-2 text-sm text-slate-700">
              Our experts can analyze your specific business requirements and recommend the ideal deployment option for your organization.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ x: 5 }}
                className="mt-3 flex cursor-pointer items-center text-[#E84A0E] text-sm"
              >
                <span className="font-medium">Schedule a consultation</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ComparisonCard({ title, description, icon, features, isInView, highlighted }: ComparisonCardProps) {
  return (
    <Card className={`h-full bg-white border ${highlighted ? 'border-[#E84A0E]/50' : 'border-slate-200'} shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      <CardHeader className={`p-4 pb-2 ${highlighted ? 'border-b border-[#E84A0E]/20' : 'border-b border-slate-200'}`}>
        <div className="mb-1">
          {highlighted ? 
            <div className="inline-flex h-8 w-8 items-center justify-center text-[#E84A0E]">{icon}</div> : 
            <div className="inline-flex h-8 w-8 items-center justify-center text-slate-700">{icon}</div>
          }
        </div>
        <CardTitle className="text-base text-slate-900">{title}</CardTitle>
        <CardDescription className="mt-0.5 text-xs text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <ul className="space-y-2">
          {features.map((feature: ComparisonFeature, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: highlighted ? -10 : 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="flex items-start"
            >
              <div className={`mr-2 mt-0.5 rounded-full p-0.5 ${highlighted ? 'bg-[#E84A0E]/20 text-[#E84A0E]' : 'bg-slate-100 text-slate-600'}`}>
                {feature.available ? (
                  <BadgeCheck className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-900">{feature.name}</p>
                <p className="text-xs text-slate-700">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Overview Features
const cloudOverviewFeatures = [
  {
    name: "Rapid Deployment",
    description: "Get started in weeks with minimal IT requirements and pre-configured solutions",
    available: true,
  },
  {
    name: "Accessibility",
    description: "Access from anywhere with any device using the new web interface",
    available: true,
  },
  {
    name: "Automatic Updates",
    description: "Always have the latest features and security patches without IT intervention",
    available: true,
  },
  {
    name: "Scalability",
    description: "Easily add users and functionality as your business grows",
    available: true,
  },
]

const onPremiseOverviewFeatures = [
  {
    name: "Complete Control",
    description: "Full control over your environment, hardware, and infrastructure",
    available: true,
  },
  {
    name: "One-Time License",
    description: "Perpetual license with one-time payment plus annual maintenance",
    available: true,
  },
  {
    name: "Customization",
    description: "Extensive customization capabilities with direct database access",
    available: true,
  },
  {
    name: "Internet Independence",
    description: "Continue operations even during internet outages",
    available: true,
  },
]

// Financial Features
const cloudFinancialFeatures = [
  {
    name: "Subscription Model",
    description: "Predictable monthly or annual subscription with no capital expenditure",
    available: true,
  },
  {
    name: "No Hardware Costs",
    description: "Eliminate costs for servers, networking, and infrastructure maintenance",
    available: true,
  },
  {
    name: "Reduced IT Staffing",
    description: "Lower personnel costs for maintaining infrastructure and software",
    available: true,
  },
  {
    name: "Flexible Scaling",
    description: "Pay only for what you use, with ability to scale up or down as needed",
    available: true,
  },
]

const onPremiseFinancialFeatures = [
  {
    name: "Capital Investment",
    description: "Significant upfront investment in licenses, hardware, and implementation",
    available: true,
  },
  {
    name: "Long-term Value",
    description: "Potential for lower long-term costs for stable, non-growing organizations",
    available: true,
  },
  {
    name: "Maintenance Fees",
    description: "Annual maintenance fees for updates and support (typically 15-20% of license)",
    available: true,
  },
  {
    name: "Hardware Refresh",
    description: "Periodic hardware replacement costs every 3-5 years",
    available: true,
  },
]

// Technical Features
const cloudTechnicalFeatures = [
  {
    name: "2025 Web Interface",
    description: "Access the new responsive web interface from any browser on any device",
    available: true,
  },
  {
    name: "Managed Infrastructure",
    description: "No need to manage servers, databases, or system maintenance",
    available: true,
  },
  {
    name: "High Availability",
    description: "99.9% uptime SLA with automated failover and disaster recovery",
    available: true,
  },
  {
    name: "Integration Platform",
    description: "Cloud-native integrations with other SaaS applications and services",
    available: true,
  },
]

const onPremiseTechnicalFeatures = [
  {
    name: "Customization Control",
    description: "Complete control over customizations, integrations, and upgrade timing",
    available: true,
  },
  {
    name: "Network Performance",
    description: "Potentially faster performance for local users on high-speed internal networks",
    available: true,
  },
  {
    name: "Legacy Integration",
    description: "Direct integration with legacy on-premise systems without cloud gateways",
    available: true,
  },
  {
    name: "Data Sovereignty",
    description: "Full control over where and how your data is stored to meet compliance requirements",
    available: true,
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCloudComparisonWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCloudComparison {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCloudComparisonWrapper as SapBusinessOneCloudComparison };