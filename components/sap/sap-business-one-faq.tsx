"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

function SapBusinessOneFaq() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  // Generate FAQ schema for structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section 
      ref={ref} 
      className="bg-slate-50 py-16 dark:bg-slate-900 md:py-24"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema.org structured data */}
      <StructuredData data={faqSchema} />
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about SAP Business One and our implementation services.
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
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger itemProp="name">{faq.question}</AccordionTrigger>
                <AccordionContent 
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

// FAQ data that can be reused both for UI and structured data
export const faqs = [
  {
    question: "What is SAP Business One?",
    answer:
      "SAP Business One is an integrated enterprise resource planning (ERP) solution designed specifically for small and medium-sized businesses. It helps streamline operations, gain real-time insights, and accelerate growth by integrating all core business functions including financials, sales, customer relationships, inventory, and operations.",
  },
  {
    question: "How long does a typical SAP Business One implementation take?",
    answer:
      "The implementation timeline varies depending on the complexity of your business and specific requirements. A standard implementation typically takes 2-3 months, while more complex projects may take 4-6 months. Our team works closely with you to establish a realistic timeline and ensure a smooth implementation process.",
  },
  {
    question: "Can SAP Business One be customized to meet our specific business needs?",
    answer:
      "Yes, SAP Business One is highly customizable. We can tailor the solution to meet your specific industry requirements, business processes, and workflows. Our team of experts will work with you to understand your needs and configure the system accordingly.",
  },
  {
    question: "What is the difference between SAP Business One on-premise and cloud deployment?",
    answer:
      "On-premise deployment involves installing SAP Business One on your own servers, giving you complete control over your data and infrastructure. Cloud deployment, on the other hand, is hosted on remote servers, offering flexibility, accessibility from anywhere, and reduced IT infrastructure costs. Both options have their advantages, and our team can help you determine which is best for your business.",
  },
  {
    question: "How does SAP Business One integrate with other systems?",
    answer:
      "SAP Business One offers robust integration capabilities through its Integration Framework and APIs. It can integrate with other SAP solutions, third-party applications, e-commerce platforms, and custom systems. Our team has extensive experience in integrating SAP Business One with various systems to ensure seamless data flow across your business.",
  },
  {
    question: "What kind of support do you provide after implementation?",
    answer:
      "We offer comprehensive post-implementation support including technical assistance, user training, system maintenance, and regular updates. Our support team is available to address any issues or questions you may have, ensuring your system continues to run smoothly and efficiently.",
  },
  {
    question: "Is SAP Business One suitable for my industry?",
    answer:
      "SAP Business One is designed to be industry-agnostic but can be customized for specific industry requirements. We have successfully implemented SAP Business One across various industries including manufacturing, retail, wholesale distribution, professional services, and more. Our industry-specific solutions address the unique challenges and requirements of each sector.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneFaqWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneFaqWrapper as SapBusinessOneFaq };