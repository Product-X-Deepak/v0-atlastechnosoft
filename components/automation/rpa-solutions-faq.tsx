"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Suspense } from "react"

function RpaSolutionsFaq() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our RPA solutions and implementation process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

const faqs = [
  {
    question: "What is Robotic Process Automation (RPA)?",
    answer:
      "Robotic Process Automation (RPA) is a technology that uses software robots or 'bots' to automate repetitive, rule-based tasks and processes. These bots can interact with digital systems just like humans do—clicking, typing, copying data, following rules—but with greater speed, accuracy, and consistency. RPA helps organizations reduce manual effort, minimize errors, and free up employees to focus on higher-value work.",
  },
  {
    question: "Which processes are suitable for RPA?",
    answer:
      "Processes that are ideal for RPA automation typically have these characteristics: rule-based (following clear, defined rules), repetitive (performed frequently), high-volume (involving large amounts of data or transactions), structured data (well-organized, consistent data formats), and stable (processes that don't change frequently). Common examples include data entry and extraction, report generation, invoice processing, employee onboarding, and customer data management.",
  },
  {
    question: "How long does it take to implement an RPA solution?",
    answer:
      "The implementation timeline varies depending on the complexity of the process being automated. Simple automations can be implemented in 2-4 weeks, while more complex processes involving multiple systems and decision points may take 8-12 weeks. Our approach includes process assessment, solution design, development, testing, and deployment phases, with each phase tailored to your specific requirements and timeline constraints.",
  },
  {
    question: "What is the typical ROI for RPA implementations?",
    answer:
      "Most organizations achieve ROI within 6-12 months of implementing RPA. The exact timeline depends on the complexity of the processes being automated and the cost of the implementation. RPA typically delivers cost savings of 25-50% for automated processes, along with additional benefits like improved accuracy (reducing error rates by 80-100%), faster processing times (reducing cycle times by 30-90%), and improved compliance and auditability.",
  },
  {
    question: "How does RPA integrate with our existing systems?",
    answer:
      "RPA bots can work with your existing systems without requiring changes to your infrastructure or applications. They interact with systems at the user interface level, just like human users would, which means they can work with legacy systems, modern applications, web interfaces, and desktop software. For more complex integrations, RPA can also leverage APIs and other integration methods to communicate with your systems.",
  },
  {
    question: "Do we need to have technical expertise to use RPA?",
    answer:
      "While technical expertise is beneficial, it's not a requirement for using RPA. Our team handles the technical aspects of implementation, and we provide comprehensive training for your team. Many modern RPA platforms offer low-code or no-code interfaces that allow business users to create and modify simple automations. For more complex automations, our technical experts will work with you to ensure successful implementation and knowledge transfer.",
  },
  {
    question: "How secure is RPA?",
    answer:
      "RPA platforms incorporate robust security features to protect your data and systems. These include role-based access control, encryption, secure credential management, audit logging, and compliance with industry standards and regulations. Bots only access the systems and data they're authorized to use, and all actions are logged for audit purposes. We implement RPA solutions following security best practices and can work with your IT security team to ensure compliance with your organization's security policies.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RpaSolutionsFaqWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RpaSolutionsFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RpaSolutionsFaqWrapper as RpaSolutionsFaq };