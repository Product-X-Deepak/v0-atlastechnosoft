"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Cpu, Workflow } from "lucide-react"
import { Suspense } from "react"

function AutomationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-12 lg:grid-cols-2 lg:gap-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-sm"
            >
              <span>AI-Powered Automation</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Transform Operations with <span className="animated-gradient-text">Intelligent Automation</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mb-8 text-lg text-muted-foreground">
              Our AI-powered automation solutions eliminate manual processes, reduce operational costs, and increase
              productivity with cutting-edge technology designed for enterprise environments.
            </motion.p>

            <motion.div variants={containerVariants} className="mb-8 grid gap-6 sm:grid-cols-2">
              {automationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="futuristic-card h-full border border-primary/10 hover:border-primary/30">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="rounded-md bg-primary/10 p-3 text-primary">{feature.icon}</div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button asChild className="futuristic-button group w-fit">
                <Link href="/ai-automation" className="flex items-center">
                  Explore Automation Solutions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-primary/10 animate-pulse-slow"></div>
              <div
                className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-purple-500/10 animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Main visual */}
              <div className="card-3d relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-48 w-48 rounded-full bg-primary/5 animate-pulse-slow"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-32 w-32 rounded-full bg-primary/10 animate-pulse-slow"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-16 w-16 rounded-full bg-primary/20 animate-pulse-slow"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                {automationIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute glass-effect rounded-lg p-3 shadow-lg"
                    style={{
                      top: `${20 + index * 15}%`,
                      left: index % 2 === 0 ? "15%" : "70%",
                      transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            x: index % 2 === 0 ? [0, -10, 0] : [0, 10, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      delay: 0.5 + index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const automationFeatures = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "RPA Solutions",
    description: "Automate repetitive tasks with UiPath RPA technology, reducing processing time by up to 85%",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Workflow Automation",
    description: "Streamline approval processes and document workflows with intelligent routing and validation",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI-Powered Analytics",
    description: "Transform raw data into actionable insights with predictive analytics and machine learning",
  },
  {
    icon: <ArrowRight className="h-5 w-5" />,
    title: "SAP Integration",
    description: "Seamlessly connect automation solutions with your SAP ecosystem for end-to-end process optimization",
  },
]

const automationIcons = [
  <svg
    key="0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
  >
    <rect width="8" height="8" x="2" y="2" rx="2" />
    <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
    <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
    <path d="M8 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2" />
    <path d="M14 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2" />
    <path d="M20 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2" />
    <path d="M6 6h12" />
    <path d="M6 18h12" />
  </svg>,

  <svg
    key="1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-purple-500"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
    <path d="m9 9 6 6" />
  </svg>,

  <svg
    key="2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="10" cy="13" r="2" />
    <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
  </svg>,
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function AutomationSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <AutomationSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { AutomationSectionWrapper as AutomationSection };
