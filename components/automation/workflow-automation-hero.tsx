"use client"

import { motion } from "framer-motion"
import { ArrowRight, Workflow, Clock, CheckCircle2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function WorkflowAutomationHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Workflow Automation
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Streamline Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Business Processes
              </span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Transform your operations with intelligent workflow automation. Reduce manual tasks, eliminate errors, and
              boost productivity across your organization.
            </p>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Save Time</h3>
                  <p className="text-sm text-muted-foreground">Reduce process completion time by up to 80%</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Eliminate Errors</h3>
                  <p className="text-sm text-muted-foreground">Minimize human errors in critical processes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Increase Productivity</h3>
                  <p className="text-sm text-muted-foreground">Boost team efficiency by 40% or more</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">End-to-End Automation</h3>
                  <p className="text-sm text-muted-foreground">Seamlessly connect people, systems, and data</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background"></div>

              {/* Workflow animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[300px] w-[300px]">
                  {/* Workflow nodes */}
                  <motion.div
                    className="absolute left-1/2 top-[10%] h-12 w-12 -translate-x-1/2 rounded-full bg-card shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">Start</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[20%] top-[40%] h-12 w-12 -translate-x-1/2 rounded-full bg-card shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">Task 1</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[50%] top-[50%] h-12 w-12 -translate-x-1/2 rounded-full bg-card shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">Task 2</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[80%] top-[40%] h-12 w-12 -translate-x-1/2 rounded-full bg-card shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">Task 3</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-1/2 top-[90%] h-12 w-12 -translate-x-1/2 rounded-full bg-card shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">End</span>
                    </div>
                  </motion.div>

                  {/* Connecting lines */}
                  <motion.div
                    className="absolute left-1/2 top-[16%] h-[24%] w-[1px] bg-primary/30"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    style={{ transformOrigin: "top" }}
                  />

                  <motion.div
                    className="absolute left-[35%] top-[40%] h-[1px] w-[30%] bg-primary/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />

                  <motion.div
                    className="absolute left-[65%] top-[40%] h-[1px] w-[30%] bg-primary/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.9, duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />

                  <motion.div
                    className="absolute left-1/2 top-[50%] h-[40%] w-[1px] bg-primary/30"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 2.1, duration: 0.5 }}
                    style={{ transformOrigin: "top" }}
                  />

                  {/* Animated data point */}
                  <motion.div
                    className="absolute h-3 w-3 rounded-full bg-primary"
                    initial={{
                      x: "calc(50% - 6px)",
                      y: "calc(10% - 6px)",
                      opacity: 0,
                    }}
                    animate={[
                      { x: "calc(50% - 6px)", y: "calc(10% - 6px)", opacity: 1 },
                      { x: "calc(50% - 6px)", y: "calc(40% - 6px)" },
                      { x: "calc(20% - 6px)", y: "calc(40% - 6px)" },
                      { x: "calc(20% - 6px)", y: "calc(40% - 6px)", opacity: 0.8 },
                      { x: "calc(20% - 6px)", y: "calc(40% - 6px)", opacity: 1 },
                      { x: "calc(50% - 6px)", y: "calc(50% - 6px)" },
                      { x: "calc(50% - 6px)", y: "calc(50% - 6px)", opacity: 0.8 },
                      { x: "calc(50% - 6px)", y: "calc(50% - 6px)", opacity: 1 },
                      { x: "calc(80% - 6px)", y: "calc(40% - 6px)" },
                      { x: "calc(80% - 6px)", y: "calc(40% - 6px)", opacity: 0.8 },
                      { x: "calc(80% - 6px)", y: "calc(40% - 6px)", opacity: 1 },
                      { x: "calc(50% - 6px)", y: "calc(90% - 6px)" },
                      { x: "calc(50% - 6px)", y: "calc(90% - 6px)", opacity: 0.8 },
                      { x: "calc(50% - 6px)", y: "calc(90% - 6px)", opacity: 0 },
                    ]}
                    transition={{
                      duration: 8,
                      times: [0, 0.1, 0.2, 0.21, 0.3, 0.4, 0.41, 0.5, 0.6, 0.61, 0.7, 0.9, 0.91, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationHeroWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationHeroWrapper as WorkflowAutomationHero };