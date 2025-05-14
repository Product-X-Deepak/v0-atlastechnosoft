"use client"

import { motion } from "framer-motion"
import { FileCheck, UserPlus, Receipt, MessageSquare, ClipboardCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function WorkflowAutomationUseCases() {
  const useCases = [
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Document Approvals",
      description: "Streamline review and approval processes for contracts, invoices, and other documents.",
    },
    {
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      title: "Employee Onboarding",
      description: "Automate the entire employee onboarding process from offer letter to equipment setup.",
    },
    {
      icon: <Receipt className="h-10 w-10 text-primary" />,
      title: "Invoice Processing",
      description: "Automate invoice capture, validation, approval, and payment processing.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Customer Service",
      description: "Route and track customer inquiries to ensure timely and consistent responses.",
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-primary" />,
      title: "Compliance Reporting",
      description: "Automate data collection, verification, and submission for regulatory compliance.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Content Management",
      description: "Streamline content creation, review, approval, and publishing workflows.",
    },
  ]

  return (
    <section id="use-cases" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Use Cases</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Workflow Automation in Action
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our workflow automation solutions can transform various business processes
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 text-center shadow-sm"
            >
              <div className="rounded-full bg-primary/10 p-3">{useCase.icon}</div>
              <h3 className="text-xl font-bold">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">Discuss Your Use Case</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationUseCasesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationUseCases {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationUseCasesWrapper as WorkflowAutomationUseCases };