"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Heart, Users, Shield, Lightbulb, Zap, Clock, Target } from "lucide-react"
import { Suspense } from "react"

function CoreValues() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Guiding Principles</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our Core <span className="text-[#E84A0E]">Values</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            These principles shape our culture, guide our decisions, and define how we deliver value to our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: value.color }}>
                <div className="text-white">
                  {value.icon}
                </div>
              </div>
              
              <h3 className="mt-4 text-xl font-bold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const values = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from the solutions we deliver to the service we provide our clients.",
    color: "#E84A0E",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Passion",
    description:
      "We are passionate about technology and its potential to transform businesses and improve people's lives.",
    color: "#A73370",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Client Focus",
    description:
      "Our clients' success is our success. We work closely with them to understand their needs and deliver solutions that exceed their expectations.",
    color: "#E84A0E",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Integrity",
    description:
      "We conduct our business with the highest level of integrity, honesty, and transparency in all our interactions.",
    color: "#A73370",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Innovation",
    description:
      "We continuously innovate and stay at the forefront of technology to provide cutting-edge solutions to our clients.",
    color: "#E84A0E",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Reliability",
    description:
      "We are committed to delivering on our promises and being a reliable partner our clients can count on.",
    color: "#A73370",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Adaptability",
    description:
      "We embrace change and continuously adapt to evolving technologies and market conditions to stay ahead of the curve.",
    color: "#E84A0E",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Sustainability",
    description:
      "We are committed to sustainable business practices and helping our clients achieve their environmental goals through technology.",
    color: "#A73370",
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CoreValuesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CoreValues {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CoreValuesWrapper as CoreValues };