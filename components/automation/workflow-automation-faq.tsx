"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Suspense } from "react"

function WorkflowAutomationFaq() {
  const faqs = [
    {
      question: "What is workflow automation?",
      answer:
        "Workflow automation is the technology-enabled automation of complex business processes and workflows. It uses predefined business rules to automatically route tasks, data, and files between people, systems, and applications. This reduces manual effort, minimizes errors, and accelerates process completion times.",
    },
    {
      question: "How does workflow automation differ from RPA?",
      answer:
        "While both technologies automate processes, they operate differently. Workflow automation focuses on orchestrating and managing entire business processes across systems and people, often involving human decision points. RPA (Robotic Process Automation) mimics specific human actions within applications to perform repetitive tasks. They're complementary technologies that can be used together for comprehensive automation.",
    },
    {
      question: "What business processes can be automated with workflow automation?",
      answer:
        "Many business processes can be automated, including approval workflows, document management, onboarding/offboarding, purchase orders, invoice processing, expense management, customer service requests, compliance reporting, and quality assurance processes. Any process with defined steps, decision points, and predictable outcomes is a good candidate for workflow automation.",
    },
    {
      question: "What are the benefits of implementing workflow automation?",
      answer:
        "Key benefits include increased efficiency and productivity, reduced operational costs, minimized errors and risks, improved compliance and accountability, enhanced visibility and reporting, faster process completion times, better resource allocation, improved employee satisfaction, and enhanced customer experience through faster service delivery.",
    },
    {
      question: "How long does it take to implement workflow automation solutions?",
      answer:
        "Implementation timelines vary based on the complexity of processes, integration requirements, and organizational readiness. Simple workflows can be automated in a few weeks, while complex enterprise-wide implementations may take several months. At Atlas Technosoft, we follow a phased approach to deliver value quickly while building toward comprehensive automation.",
    },
    {
      question: "Do I need technical expertise to use workflow automation tools?",
      answer:
        "Most modern workflow automation platforms feature user-friendly interfaces that require minimal technical expertise. Our solutions include intuitive visual designers that allow business users to create and modify workflows. For more complex integrations or customizations, our technical team provides the necessary support.",
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about workflow automation
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function WorkflowAutomationFaqWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <WorkflowAutomationFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { WorkflowAutomationFaqWrapper as WorkflowAutomationFaq };