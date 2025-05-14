"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Suspense } from "react"

function CareersFaq() {
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
            Find answers to common questions about careers at Atlas Technosoft.
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
    question: "What is the interview process like?",
    answer:
      "Our interview process typically consists of an initial screening, a technical or role-specific assessment, and final interviews with the team and leadership. The entire process usually takes 2-3 weeks, and we strive to provide timely feedback at each stage.",
  },
  {
    question: "Do you offer internship opportunities?",
    answer:
      "Yes, we offer internship programs for students and recent graduates in various departments including development, consulting, and marketing. Internships typically last 3-6 months and provide hands-on experience working on real projects with our team.",
  },
  {
    question: "What is the work culture like at Atlas Technosoft?",
    answer:
      "We foster a collaborative, innovative, and inclusive work environment where everyone's ideas are valued. We believe in work-life balance, continuous learning, and celebrating achievements together. Our team members describe our culture as supportive, dynamic, and focused on excellence.",
  },
  {
    question: "Do you provide training for new employees?",
    answer:
      "Yes, all new employees go through a comprehensive onboarding program to familiarize themselves with our company, processes, and tools. Additionally, we provide role-specific training and ongoing learning opportunities through workshops, certifications, and mentorship programs.",
  },
  {
    question: "What growth opportunities are available?",
    answer:
      "We believe in promoting from within and offer various career advancement paths. Employees have opportunities to grow vertically within their department or explore lateral moves to gain experience in different areas. We work with each team member to create personalized development plans aligned with their career goals.",
  },
  {
    question: "Can I apply for multiple positions?",
    answer:
      "Yes, you can apply for multiple positions if you believe your skills and experience match the requirements. However, we recommend focusing on roles that best align with your career goals and expertise to increase your chances of success.",
  },
  {
    question: "What technologies and tools do you use?",
    answer:
      "We work with a wide range of technologies including SAP Business One, React, TypeScript, Node.js, UiPath for RPA, and various cloud platforms. Our specific tech stack varies by project and client requirements, and we're always evaluating and adopting new technologies to stay at the forefront of innovation.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareersFaqWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareersFaqWrapper as CareersFaq };