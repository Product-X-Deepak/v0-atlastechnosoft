"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Clock, Heart, Shield, Target, Users, Lightbulb, Zap } from "lucide-react"
import { Suspense } from "react"

function ValuesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            These principles guide our decisions, shape our culture, and define how we deliver value to our clients in
            2025 and beyond.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(2, 8, 23, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
              }}
            >
              <Card className="h-full premium-card">
                <CardHeader>
                  <div className="mb-2 w-fit rounded-md bg-primary/10 p-2 text-primary">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const values = [
  {
    icon: <Award className="h-5 w-5" />,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from the solutions we deliver to the service we provide our clients.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Passion",
    description:
      "We are passionate about technology and its potential to transform businesses and improve people's lives.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Client Focus",
    description:
      "Our clients' success is our success. We work closely with them to understand their needs and deliver solutions that exceed their expectations.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Integrity",
    description:
      "We conduct our business with the highest level of integrity, honesty, and transparency in all our interactions.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Innovation",
    description:
      "We continuously innovate and stay at the forefront of technology to provide cutting-edge solutions to our clients.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Reliability",
    description:
      "We are committed to delivering on our promises and being a reliable partner our clients can count on.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Adaptability",
    description:
      "We embrace change and continuously adapt to evolving technologies and market conditions to stay ahead of the curve.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Sustainability",
    description:
      "We are committed to sustainable business practices and helping our clients achieve their environmental goals through technology.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ValuesSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ValuesSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ValuesSectionWrapper as ValuesSection };
