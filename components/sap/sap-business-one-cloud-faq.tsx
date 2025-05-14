"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Accordion,
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { HelpCircle, BookOpen, Server, ArrowRightLeft, Shield, Zap, Code } from "lucide-react"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

interface Faq {
  question: string
  answer: string
  icon: React.ReactNode
  category: "general" | "technical" | "business"
}

function SapBusinessOneCloudFaq() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  const generalFaqs = faqs.filter(faq => faq.category === "general")
  const technicalFaqs = faqs.filter(faq => faq.category === "technical")
  const businessFaqs = faqs.filter(faq => faq.category === "business")

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
      className="bg-gradient-to-b from-white to-slate-50 py-12 dark:from-slate-950 dark:to-slate-900 md:py-16"
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
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <HelpCircle className="mr-1.5 h-3 w-3" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Get answers to common questions about SAP Business One Cloud 2025 to help you make informed decisions for your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3"
        >
          <div>
            <div className="mb-2 flex items-center">
              <BookOpen className="mr-1.5 h-4 w-4 text-primary" />
              <h3 className="text-base font-semibold">General</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`general-${index}`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="py-2 text-left text-sm" itemProp="name">
                    <div className="flex items-start">
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="flex items-start pt-1">
                      <div className="mr-2 mt-0.5 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="text-xs text-muted-foreground" itemProp="text">{faq.answer}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <div className="mb-2 flex items-center">
              <Server className="mr-1.5 h-4 w-4 text-primary" />
              <h3 className="text-base font-semibold">Technical</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {technicalFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`technical-${index}`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="py-2 text-left text-sm" itemProp="name">
                    <div className="flex items-start">
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="flex items-start pt-1">
                      <div className="mr-2 mt-0.5 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="text-xs text-muted-foreground" itemProp="text">{faq.answer}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <div className="mb-2 flex items-center">
              <ArrowRightLeft className="mr-1.5 h-4 w-4 text-primary" />
              <h3 className="text-base font-semibold">Business</h3>
            </div>
          <Accordion type="single" collapsible className="w-full">
              {businessFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`business-${index}`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="py-2 text-left text-sm" itemProp="name">
                    <div className="flex items-start">
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="flex items-start pt-1">
                      <div className="mr-2 mt-0.5 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="text-xs text-muted-foreground" itemProp="text">{faq.answer}</div>
                    </div>
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 max-w-2xl rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-800"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Still have questions about SAP Business One Cloud?
            </p>
            <a 
              href="/contact" 
              className="mt-1.5 inline-flex items-center text-primary hover:underline text-sm"
            >
              <span className="font-medium">Contact our experts</span>
              <ArrowRightLeft className="ml-1 h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const faqs: Faq[] = [
  // General FAQs
  {
    question: "What is SAP Business One Cloud?",
    answer: "SAP Business One Cloud is a comprehensive ERP solution delivered in the cloud, designed specifically for small and medium-sized businesses. It provides integrated business management tools for finance, sales, purchasing, inventory, manufacturing, and more, all accessible through a web browser as of the 2025 version.",
    icon: <BookOpen className="h-4 w-4 text-primary" />,
    category: "general",
  },
  {
    question: "What's new in the 2025 web version?",
    answer: "The 2025 web version introduces a completely redesigned user interface with responsive design for any device, AI-powered analytics for better decision making, enhanced collaboration tools, and improved accessibility features. It allows users to access the full functionality of SAP Business One from any modern web browser without installing any software.",
    icon: <BookOpen className="h-4 w-4 text-primary" />,
    category: "general",
  },
  {
    question: "How secure is my business data in the cloud?",
    answer: "SAP Business One Cloud employs enterprise-grade security measures including data encryption in transit and at rest, multi-factor authentication, continuous security monitoring, and compliance with industry standards such as ISO 27001. Your data is hosted in secure data centers with physical security, redundancy, and regular security audits.",
    icon: <Shield className="h-4 w-4 text-primary" />,
    category: "general",
  },
  
  // Technical FAQs
  {
    question: "What happens if I lose internet connectivity?",
    answer: "While the 2025 web version requires internet connectivity for full access, the system is designed to handle temporary disruptions with offline capabilities for critical functions. Data entered during brief outages is cached locally and synchronized when connectivity is restored. For areas with unreliable internet, we can discuss hybrid deployment options.",
    icon: <Server className="h-4 w-4 text-primary" />,
    category: "technical",
  },
  {
    question: "Can I migrate from on-premise to cloud?",
    answer: "Yes, SAP provides well-defined migration paths from on-premise to cloud deployments. Our migration services include data transfer, configuration settings, customizations, and historical data. The process is carefully planned to minimize disruption, typically requiring just a single weekend of downtime for the final cutover.",
    icon: <ArrowRightLeft className="h-4 w-4 text-primary" />,
    category: "technical",
  },
  {
    question: "Does the web version support all functionality?",
    answer: "The 2025 web version supports all core functionality of SAP Business One. The web interface has been completely rebuilt to provide full access to all modules including financials, sales, purchasing, inventory, production, and service management. Some advanced customizations might require additional configuration.",
    icon: <Code className="h-4 w-4 text-primary" />,
    category: "technical",
  },
  
  // Business FAQs
  {
    question: "How is the subscription pricing structured?",
    answer: "SAP Business One Cloud uses a subscription model based on the number of users and selected functionality modules. The subscription includes software licensing, hosting infrastructure, maintenance, regular updates, and basic support. Volume discounts are available for larger user counts, and you can scale up or down as your business needs change.",
    icon: <Zap className="h-4 w-4 text-primary" />,
    category: "business",
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation timelines for SAP Business One Cloud typically range from 4-12 weeks depending on your business complexity and requirements. Our accelerated implementation methodology using industry-specific templates can significantly reduce deployment time. The cloud deployment is generally 30-40% faster than on-premise implementations.",
    icon: <Zap className="h-4 w-4 text-primary" />,
    category: "business",
  },
  {
    question: "What kind of support is included?",
    answer: "The standard subscription includes technical support during business hours, system monitoring, maintenance, and regular updates. Premium support packages with 24/7 coverage, faster response times, and dedicated support contacts are available. All customers have access to the online knowledge base, community forums, and regular webinars.",
    icon: <Zap className="h-4 w-4 text-primary" />,
    category: "business",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCloudFaqWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCloudFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCloudFaqWrapper as SapBusinessOneCloudFaq };