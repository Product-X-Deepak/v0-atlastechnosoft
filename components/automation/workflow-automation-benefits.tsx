"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Suspense } from "react"

function WorkflowAutomationBenefits() {
  const benefits = [
    "Reduce operational costs by up to 40%",
    "Eliminate manual data entry and human errors",
    "Accelerate process completion times",
    "Improve compliance and auditability",
    "Enhance visibility into business processes",
    "Free up staff for higher-value activities",
    "Scale operations without adding headcount",
    "Improve customer and employee satisfaction",
  ]

  return (
    <section id="benefits" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Benefits</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Transform Your Business with Workflow Automation
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Our workflow automation solutions deliver measurable results that impact your bottom line while improving
              operational efficiency.
            </p>
            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-video overflow-hidden rounded-xl lg:order-last"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-background rounded-xl"></div>
            <div className="relative h-full w-full p-4 flex items-center justify-center">
              <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="space-y-4">
                  <div className="h-2 w-1/3 bg-primary/20 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded-full"></div>
                    <div className="h-4 w-full bg-muted rounded-full"></div>
                    <div className="h-4 w-2/3 bg-muted rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                    <div className="h-4 w-24 bg-muted rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 rounded-md bg-primary/20 flex items-center justify-center">
                      <div className="h-4 w-16 bg-primary/40 rounded-full"></div>
                    </div>
                    <div className="h-8 rounded-md bg-muted flex items-center justify-center">
                      <div className="h-4 w-16 bg-muted/70 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated workflow lines */}
              <motion.div
                className="absolute top-1/4 left-1/4 h-1 w-1/2 bg-gradient-to-r from-primary/50 to-primary/0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 1 }}
                viewport={{ once: false }}
                style={{ transformOrigin: "left" }}
              />

              <motion.div
                className="absolute top-2/4 right-1/4 h-1 w-1/2 bg-gradient-to-l from-secondary/50 to-secondary/0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 0.5,
                }}
                viewport={{ once: false }}
                style={{ transformOrigin: "right" }}
              />

              <motion.div
                className="absolute bottom-1/4 left-1/4 h-1 w-1/2 bg-gradient-to-r from-primary/50 to-primary/0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 1,
                }}
                viewport={{ once: false }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationBenefitsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationBenefits {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationBenefitsWrapper as WorkflowAutomationBenefits };