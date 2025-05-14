"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import {
  ArrowRight,
  Building2,
  Factory,
  ShoppingBag,
  Truck,
  FlaskRoundIcon as Flask,
  Briefcase,
  Stethoscope,
  Building,
  Ship,
  Award,
} from "lucide-react"

function IndustriesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden py-12 md:py-16">
      {/* Enhanced animated backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-vibrant-blue/30 to-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-primary/25 blur-[60px] animate-pulse-slow"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 mx-auto inline-flex items-center rounded-full border-2 border-primary/60 bg-primary/30 px-2.5 py-1 text-xs text-white shadow-lg">
            <Award className="h-3 w-3 mr-1.5" />
            <span className="font-semibold drop-shadow-md">Specialized Expertise</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white drop-shadow-lg">
            Industry-Specific <span className="bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent font-extrabold drop-shadow-xl">Solutions</span>
          </h2>
          <p className="mt-3 text-base text-white font-medium drop-shadow-md">
            We architect intelligent enterprise solutions that fuse cutting-edge SAP technology with advanced AI, machine learning, and predictive analytics to revolutionize your industry operations and create sustainable competitive advantages.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {featuredIndustries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(2, 8, 23, 0.5), 0 0 20px rgba(255, 140, 0, 0.3)",
                transition: {
                  y: { duration: 0.3 },
                  boxShadow: { duration: 0.3 }
                }
              }}
              className="industry-card-wrapper"
            >
              <Card className="h-full border-2 border-primary/40 bg-black/40 backdrop-blur-md hover:border-primary/80 hover:shadow-xl shadow-lg transition-all duration-300 shadow-primary/20">
                <CardHeader className="py-3 px-3">
                  <div className="mb-2 rounded-md bg-gradient-to-br from-primary/40 to-primary/20 p-2 w-fit text-white shadow-lg">{industry.icon}</div>
                  <CardTitle className="text-lg text-white">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-1 px-3">
                  <p className="text-xs text-gray-200">{industry.description}</p>

                  {/* Enhanced key features */}
                  <ul className="mt-3 space-y-1">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1.5 h-2.5 w-2.5 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-3 pt-1 px-3">
                  <Button variant="ghost" size="sm" asChild className="mt-1 group w-full justify-between text-white border border-primary/40 hover:bg-primary/20 hover:text-white text-xs py-1">
                    <Link href={industry.href} className="flex items-center">
                      Learn more
                      <ArrowRight className="ml-1.5 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/60 text-white hover:bg-primary/30 hover:text-white hover:border-primary shadow-lg group text-xs">
            <Link href="/industries" className="flex items-center px-4 py-1.5">
              View All Industries
              <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const featuredIndustries = [
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Distribution & Logistics",
    description:
      "Optimize inventory management, streamline order fulfillment, and gain end-to-end supply chain visibility with AI-driven insights.",
    href: "/industries/distribution",
    features: [
      "Predictive inventory optimization",
      "AI-powered route planning",
      "Digital warehouse management",
      "Automated order fulfillment",
    ],
  },
  {
    icon: <Ship className="h-5 w-5" />,
    title: "Shipping & Import/Export",
    description:
      "Digitize customs documentation, optimize container logistics, and achieve real-time global supply chain visibility.",
    href: "/industries/shipping",
    features: [
      "Automated customs compliance",
      "Container tracking & management",
      "Global trade documentation",
      "Freight analytics & optimization",
    ],
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Manufacturing",
    description:
      "Integrate production planning, quality control, and supply chain management with AI-enhanced real-time analytics.",
    href: "/industries/manufacturing",
    features: ["Smart production scheduling", "Predictive quality assurance", "Advanced MRP integration", "IoT-enabled maintenance"],
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    title: "Retail",
    description:
      "Unify online and offline channels, optimize inventory with ML algorithms, and deliver hyper-personalized customer experiences.",
    href: "/industries/retail",
    features: ["Seamless omnichannel integration", "Next-gen POS systems", "Predictive customer analytics", "AI inventory forecasting"],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Professional Services",
    description: "Streamline project management, optimize resource allocation, and automate client engagement with intelligent workflows.",
    href: "/industries/professional-services",
    features: ["AI-assisted project management", "Dynamic resource optimization", "Automated time & expense tracking", "Intelligent client portals"],
  },
  {
    icon: <Flask className="h-5 w-5" />,
    title: "Pharmaceuticals",
    description: "Ensure regulatory compliance, manage complex formulations, and optimize production with blockchain-secured systems.",
    href: "/industries/pharmaceuticals",
    features: ["Precision batch tracking", "Automated regulatory compliance", "Advanced quality control", "Secure supply chain validation"],
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Financial Services",
    description: "Automate compliance processes, enhance security with AI monitoring, and create frictionless customer experiences.",
    href: "/industries/financial-services",
    features: ["Real-time regulatory reporting", "AI-powered fraud detection", "Seamless customer onboarding", "Intelligent risk assessment"],
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Healthcare",
    description: "Streamline patient management, optimize billing cycles, and ensure compliance with intelligent automation.",
    href: "/industries/healthcare",
    features: ["Secure patient records management", "Automated insurance processing", "IoT inventory tracking", "Predictive compliance reporting"],
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "Construction",
    description: "Manage projects, track resources, control costs, and enhance collaboration with integrated digital solutions.",
    href: "/industries/construction",
    features: ["AI-enhanced project planning", "Dynamic resource allocation", "Real-time cost tracking", "Centralized document management"],
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function IndustriesSectionWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <IndustriesSection {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { IndustriesSectionWrapper as IndustriesSection };