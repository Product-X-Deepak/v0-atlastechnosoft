"use client"

import { motion } from "framer-motion"
import { Workflow, Layers, BarChart3, FileSearch, Gauge, Users, ShieldCheck, Smartphone } from "lucide-react"
import { Suspense } from "react"

function WorkflowAutomationFeatures() {
  const features = [
    {
      icon: <Workflow className="h-6 w-6 text-primary" />,
      title: "Visual Workflow Designer",
      description: "Intuitive drag-and-drop interface to design complex workflows without coding",
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "System Integration",
      description: "Seamlessly connect with your existing business applications and data sources",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Real-time Analytics",
      description: "Monitor workflow performance with comprehensive dashboards and reports",
    },
    {
      icon: <FileSearch className="h-6 w-6 text-primary" />,
      title: "Document Processing",
      description: "Automate document routing, approvals, and data extraction",
    },
    {
      icon: <Gauge className="h-6 w-6 text-primary" />,
      title: "Process Optimization",
      description: "Identify bottlenecks and continuously improve workflow efficiency",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Role-based Access",
      description: "Define user permissions and task assignments based on roles",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Compliance Management",
      description: "Ensure adherence to regulatory requirements with audit trails",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Mobile Accessibility",
      description: "Access and approve workflows from any device, anywhere",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Workflow Automation
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers everything you need to automate and optimize your business processes
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center shadow-sm"
            >
              <div className="rounded-full bg-primary/10 p-2">{feature.icon}</div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationFeaturesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationFeatures {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationFeaturesWrapper as WorkflowAutomationFeatures };