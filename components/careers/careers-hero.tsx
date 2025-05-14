"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"

function CareersHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900 md:py-24">
      <div className="absolute inset-0 z-0 opacity-30">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 0 0 L 0 8 M 0 0 L 8 0" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
              <span>Join Our Team</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build Your <span className="gradient-text">Career</span> With Us
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Join a team of passionate professionals working on cutting-edge technologies to solve complex business
              challenges. Discover exciting career opportunities at Atlas Technosoft.
            </p>
            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              {careerBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start space-x-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-1 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button size="lg" asChild className="futuristic-button">
                  <Link href="#current-openings" className="flex items-center">
                    View Current Openings
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/careers/life-at-atlas" className="flex items-center">
                    Life at Atlas
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative mb-10 lg:mb-0 h-[300px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/Main_Logo.png"
                alt="Atlas Technosoft Team" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const careerBenefits = [
  {
    title: "Professional Growth",
    description: "Continuous learning opportunities and career advancement paths",
  },
  {
    title: "Innovative Environment",
    description: "Work with cutting-edge technologies and solve complex challenges",
  },
  {
    title: "Work-Life Balance",
    description: "Flexible work arrangements and comprehensive wellness programs",
  },
  {
    title: "Global Exposure",
    description: "Collaborate with international clients and diverse teams",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareersHeroWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareersHeroWrapper as CareersHero };