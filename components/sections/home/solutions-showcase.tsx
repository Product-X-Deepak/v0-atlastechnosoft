"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Database, Server, Cloud, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"

function SolutionsShowcase() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="solutions" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Enterprise Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Comprehensive <span className="text-premium-orange font-extrabold">Enterprise Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            Discover our range of enterprise solutions designed to help businesses streamline operations, gain insights, and accelerate growth.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col"
            >
              <Card className="h-full bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <CardHeader className="pb-2 pt-6 px-6">
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${solution.iconBg} text-white shadow-md`}>
                    {solution.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900">{solution.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow px-6 py-2">
                  <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden bg-slate-100">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-sm text-slate-900 mb-4 font-medium">{solution.description}</p>
                  
                  <div className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-800 font-medium">
                        <div className={`mr-2 h-1.5 w-1.5 rounded-full ${solution.dotColor}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6 px-6 mt-auto bg-gray-50">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className={`w-full ${solution.buttonBg} text-white hover:opacity-90 group`}
                    asChild
                  >
                    <Link href={solution.href} className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="default" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group"
            asChild
          >
            <Link href="/sap-solutions/business-one" className="flex items-center">
              View All Solutions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const solutions = [
  {
    icon: <Database className="h-5 w-5" />,
    iconBg: "bg-[#E84A0E]",
    title: "SAP Business One",
    description: "Comprehensive ERP solution designed for small and medium-sized businesses to streamline operations and drive growth.",
    image: "/images/solutions/SAP_B1.png",
    href: "/sap-solutions/hana",
    features: [
      "Financial management",
      "Sales and customer management",
      "Purchasing and inventory control",
      "Production planning",
    ],
    dotColor: "bg-[#E84A0E]",
    buttonBg: "bg-[#E84A0E]"
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    iconBg: "bg-[#A73370]",
    title: "SAP Business One Cloud",
    description: "Cloud-based ERP solution with flexible deployment options and subscription-based pricing for optimal scalability.",
    image: "/images/solutions/cloud.png",
    href: "/sap-solutions/business-one-cloud",
    features: [
      "Subscription-based pricing",
      "Anywhere, anytime access",
      "Automatic updates and maintenance",
      "Enterprise-grade security",
    ],
    dotColor: "bg-[#A73370]",
    buttonBg: "bg-[#A73370]"
  },
  {
    icon: <Server className="h-5 w-5" />,
    iconBg: "bg-[#E84A0E]",
    title: "SAP HANA",
    description: "In-memory database technology providing real-time analytics and advanced data processing capabilities.",
    image: "/images/solutions/HANA.png",
    href: "/sap-solutions/hana",
    features: [
      "In-memory computing",
      "Advanced analytics",
      "Real-time reporting",
      "Predictive capabilities",
    ],
    dotColor: "bg-[#E84A0E]",
    buttonBg: "bg-[#E84A0E]"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    iconBg: "bg-[#A73370]",
    title: "UiPath Solutions",
    description: "Enterprise automation platform combining RPA, AI, and process mining to eliminate manual work and reduce costs.",
    image: "/images/solutions/Uipath_RPA.jpg",
    href: "/automation-solutions/ui-path",
    features: [
      "Process automation",
      "AI-powered workflows",
      "Business process optimization",
      "Enterprise integration",
    ],
    dotColor: "bg-[#A73370]",
    buttonBg: "bg-[#A73370]"
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SolutionsShowcaseWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SolutionsShowcase {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SolutionsShowcaseWrapper as SolutionsShowcase };