"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"

function TimelineSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-slate-50 py-16 dark:bg-slate-900 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From our humble beginnings to becoming a leading SAP Partner, our journey has been defined by growth,
            innovation, and a commitment to excellence.
          </p>
        </motion.div>

        <div className="mt-16 space-y-0">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="md:w-1/2">
                  <div className={`flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} items-center gap-4`}>
                    <div className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      {item.year}
                    </div>
                  </div>
                </div>
                <div className="relative flex h-24 items-center justify-center md:w-0">
                  <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-border"></div>
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {item.icon}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(2, 8, 23, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                    }}
                    className={`rounded-lg bg-card p-6 shadow-md ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                  >
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const timeline = [
  {
    year: "1997",
    icon: "🚀",
    title: "Company Founded",
    description:
      "Atlas Technosoft was founded in Mumbai, India, with a vision to provide cutting-edge IT solutions to businesses.",
  },
  {
    year: "2002",
    icon: "🤝",
    title: "SAP Partnership",
    description: "Became an official SAP partner, specializing in SAP Business One implementations.",
  },
  {
    year: "2008",
    icon: "🌐",
    title: "Global Expansion",
    description: "Expanded operations globally, serving clients across multiple countries and industries.",
  },
  {
    year: "2012",
    icon: "🏆",
    title: "SAP Partner",
    description: "Achieved SAP Partner status, recognizing our expertise and successful implementations.",
  },
  {
    year: "2018",
    icon: "🔄",
    title: "Automation Solutions",
    description: "Launched AI and RPA automation solutions to complement our ERP offerings.",
  },
  {
    year: "2022",
    icon: "☁️",
    title: "Cloud Transformation",
    description: "Expanded our cloud services portfolio to help clients with digital transformation initiatives.",
  },
  {
    year: "2024",
    icon: "🧠",
    title: "AI Integration",
    description: "Integrated advanced AI capabilities into our solutions for predictive analytics and automation.",
  },
  {
    year: "2025",
    icon: "🚀",
    title: "Innovation Hub",
    description:
      "Established an innovation hub focused on developing next-generation solutions for digital transformation.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function TimelineSectionWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <TimelineSection />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { TimelineSectionWrapper as TimelineSection };
