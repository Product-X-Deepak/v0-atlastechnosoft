"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Heart, Shield, Star, Target, Users } from "lucide-react"
import { Suspense } from "react"

export function CareersValues() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersValuesContent />
    </Suspense>
  );
}

function CareersValuesContent() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            These core values guide our decisions, shape our culture, and define how we work together.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full">
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
    title: "Teamwork",
    description:
      "We believe in the power of collaboration and working together to achieve common goals and deliver exceptional results.",
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
    icon: <Star className="h-5 w-5" />,
    title: "Growth",
    description:
      "We are committed to the personal and professional growth of our team members, providing opportunities for learning and advancement.",
  },
]
