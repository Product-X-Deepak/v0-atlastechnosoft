"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Cloud, Server, Shield } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"

function SolutionsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden py-10 md:py-16">
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
          className="mx-auto max-w-3xl text-center mb-8"
        >
          <div className="mb-3 mx-auto inline-flex items-center rounded-full border-2 border-primary/60 bg-primary/30 px-2.5 py-1 text-xs text-white backdrop-blur-sm shadow-lg">
            <span className="font-semibold drop-shadow-md">SAP Solutions</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white drop-shadow-lg">
            Comprehensive <span className="bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent font-extrabold drop-shadow-xl">SAP Solutions</span>
          </h2>
          <p className="mt-3 text-base text-white font-medium drop-shadow-md">
            We offer a complete range of SAP solutions to help businesses of all sizes streamline operations, gain
            insights, and accelerate growth.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sapSolutions.map((solution, index) => (
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
            >
              <Card className="h-full border-2 border-primary/40 bg-black/40 backdrop-blur-md hover:border-primary/80 hover:shadow-xl shadow-lg transition-all duration-300 shadow-primary/20 flex flex-col">
                <CardHeader className="pb-2 pt-3 px-3">
                  <div className="mb-2 rounded-md bg-gradient-to-br from-primary/40 to-primary/20 p-2 w-fit text-white shadow-lg">{solution.icon}</div>
                  <CardTitle className="text-lg text-white">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col px-3 py-2">
                  <div className="relative h-32 w-full mb-3 rounded-md overflow-hidden bg-black/50 flex items-center justify-center p-2 border border-primary/20">
                    <Image
                      src={solution.image || "/images/Main_Logo.png"}
                      alt={solution.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-gray-200 mb-3 font-medium">{solution.description}</p>

                  {/* Enhanced key features */}
                  <ul className="mt-auto space-y-1.5">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-200 font-medium">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/40 flex items-center justify-center mr-1.5 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-2 w-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-1 pb-3 px-3">
                  <Button 
                    variant="default" 
                    size="sm" 
                    asChild 
                    className="mt-1 group w-full justify-between bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary text-white shadow-lg font-semibold border border-primary/40 text-xs py-1"
                  >
                    <Link href={solution.href} className="flex items-center">
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
          <Button 
            variant="default" 
            size="sm"
            asChild 
            className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/60 text-white hover:bg-primary/30 hover:text-white hover:border-primary shadow-lg group"
          >
            <Link href="/sap-solutions" className="flex items-center px-4 py-1.5">
              View All SAP Solutions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const sapSolutions = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "SAP Business One",
    description:
      "Next-generation ERP solution with AI-powered automation and analytics, designed for small and midsize businesses to optimize operations across your entire company.",
    image: "/images/solutions/SAP_B1.png",
    href: "/sap-solutions/business-one",
    features: [
      "AI-driven financial management",
      "Intelligent sales forecasting",
      "Automated inventory optimization",
      "Advanced business intelligence",
    ],
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: "SAP Business One Cloud",
    description:
      "Cloud-native ERP with enhanced security and scalability, offering flexible subscription models and seamless integration with Microsoft 365, Google Workspace, and other cloud platforms.",
    image: "/images/solutions/cloud.png",
    href: "/sap-solutions/business-one-cloud",
    features: ["Enhanced cybersecurity", "Pay-as-you-grow pricing", "Continuous AI-powered updates", "Multi-device accessibility"],
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "SAP HANA",
    description:
      "High-performance in-memory database with advanced analytics and integrated AI capabilities, deployable on-premise or in the cloud for real-time business insights.",
    image: "/images/solutions/HANA.png",
    href: "/sap-solutions/hana",
    features: ["Vector engine database", "AI-augmented analytics", "Real-time predictive insights", "Knowledge graph integration"],
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "ERP Planning",
    description:
      "Strategic ERP planning services to design and implement a customized roadmap for your organization, ensuring optimal alignment with your business goals and digital transformation initiatives.",
    image: "/images/solutions/ERP.png",
    href: "/sap-solutions/erp-planning",
    features: ["Digital transformation strategy", "Process optimization", "Change management", "Continuous improvement framework"],
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SolutionsSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SolutionsSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SolutionsSectionWrapper as SolutionsSection };
