"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

function SapHanaFaq() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const faqs = [
    {
      question: "What is SAP HANA?",
      answer:
        "SAP HANA is an in-memory, column-oriented, relational database management system developed and marketed by SAP. It processes massive amounts of data in real-time with its revolutionary in-memory architecture. Beyond traditional database capabilities, HANA features advanced analytics (predictive, spatial, text, graph), application development tools, and multi-model data processing in a single platform.",
    },
    {
      question: "What are the benefits of SAP HANA?",
      answer:
        "SAP HANA delivers transformative business benefits including: 1) 10,000x faster processing than traditional databases, 2) Up to 90% reduced data footprint through advanced compression, 3) Simplified IT landscape by eliminating separate OLTP and OLAP systems, 4) Real-time analytics and reporting with zero latency, 5) Enhanced decision-making capabilities through built-in AI/ML, and 6) Reduced total cost of ownership.",
    },
    {
      question: "How does SAP HANA differ from traditional databases?",
      answer:
        "Unlike traditional disk-based, row-oriented databases, SAP HANA uses a fundamentally different architecture: 1) In-memory computing eliminates slow disk I/O operations, 2) Column-based storage optimizes analytical workloads, 3) Multicore parallelization maximizes hardware resource utilization, 4) Advanced compression reduces storage needs, 5) Unified OLTP and OLAP processing eliminates separate systems, and 6) Built-in advanced analytics eliminate the need for separate specialized systems.",
    },
    {
      question: "What is SAP HANA Cloud and how does it compare to on-premise?",
      answer:
        "SAP HANA Cloud is the cloud-native version of SAP HANA that offers the full power of HANA as a fully managed service with dynamic scaling, consumption-based pricing, and automated operations. Compared to on-premise deployments, HANA Cloud provides: 1) Lower upfront investment with pay-as-you-go pricing, 2) Rapid deployment without hardware procurement, 3) Automatic updates and maintenance, 4) On-demand scaling from gigabytes to petabytes, and 5) 99.9% uptime SLA backed by SAP.",
    },
    {
      question: "What industries can benefit from SAP HANA?",
      answer:
        "SAP HANA delivers transformative results across all data-intensive industries including: 1) Manufacturing: real-time production monitoring and predictive maintenance, 2) Retail: personalized recommendations and dynamic pricing, 3) Financial Services: fraud detection and real-time risk analysis, 4) Healthcare: patient monitoring and treatment optimization, 5) Utilities: smart grid management and demand forecasting, and 6) Transportation: route optimization and predictive logistics.",
    },
    {
      question: "How does SAP HANA integrate with other SAP products?",
      answer:
        "SAP HANA serves as the foundation for SAP's intelligent enterprise vision. It seamlessly integrates with: 1) SAP S/4HANA: next-generation ERP built natively on HANA, 2) SAP Analytics Cloud: for unified planning, BI, and predictive analytics, 3) SAP Data Intelligence: for end-to-end data orchestration, 4) SAP BW/4HANA: next-generation data warehousing, 5) SAP Business Technology Platform: extending and integrating applications, and 6) Other SAP applications through native connectors and shared data models.",
    },
    {
      question: "How can Atlas Technosoft help with SAP HANA implementation?",
      answer:
        "Atlas Technosoft provides comprehensive SAP HANA services including: 1) Assessment and roadmap planning, 2) Technical implementation and migration, 3) Performance optimization and tuning, 4) Custom development and integration, 5) Managed services and support, and 6) Training and knowledge transfer. Our certified SAP consultants have extensive experience in SAP HANA implementations across various industries, ensuring smooth transitions while minimizing business disruption and maximizing ROI.",
    },
    {
      question: "What are the latest features in SAP HANA 2.0 SPS 06?",
      answer:
        "SAP HANA 2.0 SPS 06 introduces several powerful enhancements: 1) Advanced data anonymization for privacy and compliance, 2) Expanded multi-model processing capabilities, 3) Enhanced machine learning integrations, 4) Improved workload management for mixed workloads, 5) Accelerated data tiering with native cloud storage integration, 6) Advanced persistent memory support, and 7) Enhanced security features for enterprise-grade protection.",
    },
  ]

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
      className="py-12 md:py-16 bg-[#FFF5D6]/50 dark:bg-slate-900/30"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema.org structured data */}
      <StructuredData data={faqSchema} />
      
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-2 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-[#E84A0E]/30 bg-[#E84A0E]/10 px-2.5 py-0.5 text-xs text-[#E84A0E] mb-1">
            <HelpCircle className="mr-1.5 h-3 w-3" />
            <span className="font-semibold">Information Center</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white drop-shadow-sm">
            Frequently Asked <span className="text-[#E84A0E] font-black">Questions</span>
          </h2>
          <p className="text-base font-medium text-slate-800 dark:text-slate-200">
            Get answers to common questions about SAP HANA&apos;s features, benefits, and implementation process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-5 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-slate-200 dark:border-slate-800"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger 
                    className="text-left text-sm font-medium hover:text-[#E84A0E] dark:hover:text-[#E84A0E] py-3 px-1"
                    itemProp="name"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-xs text-slate-600 dark:text-slate-300 px-1"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">{faq.answer}</div>
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Have more questions about SAP HANA? <a href="/contact" className="text-[#E84A0E] dark:text-[#E84A0E] font-medium">Contact our experts</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaFaqWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaFaq {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaFaqWrapper as SapHanaFaq };