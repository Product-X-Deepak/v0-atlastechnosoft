"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Users, Clock, CheckCircle, HeadphonesIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Suspense } from "react"

// Define the stat item type to include the optional suffix property
type StatItem = {
  value: string | number;
  label: string;
  description: string;
  icon: React.ElementType;
  suffix?: string;
}

function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const stats: StatItem[] = [
    {
      value: "25+",
      label: "Years of Experience",
      description: "Delivering enterprise solutions since 1997",
      icon: Clock,
    },
    {
      value: "500+",
      label: "Successful Implementations",
      description: "Across diverse industries and business sizes",
      icon: CheckCircle,
    },
    {
      value: "98%",
      label: "Client Retention",
      description: "Long-term partnerships built on trust and results",
      icon: Users,
      suffix: "%",
    },
    {
      value: "24/7",
      label: "Support Coverage",
      description: "Round-the-clock technical assistance and monitoring",
      icon: HeadphonesIcon,
    },
  ]

  return (
    <section ref={ref} className="w-full py-12 md:py-24" aria-labelledby="stats-heading">
      <div className="container px-4 md:px-6">
        <h2 id="stats-heading" className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Proven Track Record
        </h2>
        <p className="mt-4 text-lg text-muted-foreground mb-12">
          Our commitment to excellence has established Atlas Technosoft as a trusted leader in enterprise solutions
        </p>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">
                {typeof stat.value === "number" ? (
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={1.5} delay={0.1 * index} />
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function StatsSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <StatsSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { StatsSectionWrapper as StatsSection };
