"use client"

import { motion } from "framer-motion"
import { Search, Workflow, Settings, Play, BarChart3, RefreshCw } from "lucide-react"
import { Suspense } from "react"

function WorkflowAutomationProcess() {
  const steps = [
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Process Analysis",
      description:
        "We analyze your existing processes to identify automation opportunities and potential improvements.",
    },
    {
      icon: <Workflow className="h-6 w-6 text-primary" />,
      title: "Workflow Design",
      description: "Our experts design optimized workflows tailored to your specific business requirements.",
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Implementation",
      description: "We configure the automation platform, integrate with your systems, and set up the workflows.",
    },
    {
      icon: <Play className="h-6 w-6 text-primary" />,
      title: "Deployment",
      description: "The solution is deployed in your environment with thorough testing and user training.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Monitoring",
      description: "We help you track performance metrics and ensure your workflows are running efficiently.",
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      title: "Continuous Improvement",
      description: "Regular reviews and optimizations to enhance your workflows as your business evolves.",
    },
  ]

  return (
    <section id="process" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Process</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How We Implement Workflow Automation
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our structured approach ensures successful implementation and adoption of workflow automation solutions
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{step.icon}</div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationProcessWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationProcess {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationProcessWrapper as WorkflowAutomationProcess };