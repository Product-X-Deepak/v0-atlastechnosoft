"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Heart, Users, Shield, Lightbulb, Zap, Clock, Target } from "lucide-react"
import { Suspense } from "react"

function CoreValuesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

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
    },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-16 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#E84A0E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#A73370]/10 rounded-full blur-3xl"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg 
          className="h-full w-full"
          width="100%" 
          height="100%" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="smallGrid" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Our Guiding Principles</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our Core <span className="text-[#E84A0E]">Values</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-700">
            These principles shape our culture, guide our decisions, and define how we deliver value to our clients
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group flex flex-col text-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-200 hover:bg-white transition-colors"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full relative" style={{ backgroundColor: value.color }}>
                <div className="absolute inset-0 rounded-full blur-sm" style={{ backgroundColor: value.color, opacity: 0.5 }}></div>
                <div className="text-white relative z-10">
                  {value.icon}
                </div>
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-slate-900">{value.title}</h3>
              <p className="text-sm text-slate-700">{value.description}</p>
              
              {/* Futuristic accent line */}
              <div className="mt-4 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-400/30 to-transparent group-hover:via-slate-400/50 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CoreValuesSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CoreValuesSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CoreValuesSectionWrapper as CoreValuesSection };
