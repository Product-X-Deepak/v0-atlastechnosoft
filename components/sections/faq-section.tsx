"use client"

import { useRef,useState, useEffect as _useEffect } from "react"
import { motion,useInView } from "framer-motion"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

const categories = [
  { label: "General", value: "general" },
  { label: "SAP Solutions", value: "sap" },
  { label: "Automation", value: "automation" },
  { label: "Implementation", value: "implementation" },
  { label: "Support", value: "support" },
]

// Define faqs outside the component to avoid recreating on each render
const faqs = [
  {
    category: "general",
    question: "What services does Atlas Technosoft offer?",
    answer:
      "Atlas Technosoft offers a comprehensive range of services including SAP Business One implementation, ERP consulting, RPA solutions, AI automation, cloud computing, and IT infrastructure services. We provide end-to-end solutions to help businesses streamline operations and drive growth.",
  },
  {
    category: "general",
    question: "How long has Atlas Technosoft been in business?",
    answer:
      "Atlas Technosoft was founded in 1997 and has over 28 years of experience in providing IT solutions to businesses worldwide. We've successfully completed over 750 implementations across various industries.",
  },
  {
    category: "general",
    question: "Which industries does Atlas Technosoft serve?",
    answer:
      "We serve a wide range of industries including manufacturing, retail, logistics, professional services, healthcare, financial services, and more. Our solutions are tailored to address the specific needs and challenges of each industry.",
  },
  {
    category: "general",
    question: "Where is Atlas Technosoft located?",
    answer:
      "Our headquarters is in Mumbai, India, with regional offices in Delhi, Bangalore, Pune, Chennai, and Hyderabad. We also have international presence in Singapore, Dubai, London, New York, and Sydney to serve our global clients.",
  },
  {
    category: "sap",
    question: "What is SAP Business One?",
    answer:
      "SAP Business One is an integrated ERP solution designed specifically for small and medium-sized businesses. It helps manage core business functions including finance, sales, customer relationships, inventory, operations, and reporting in a single system.",
  },
  {
    category: "sap",
    question: "How long does a typical SAP Business One implementation take?",
    answer:
      "A typical SAP Business One implementation takes between 2-4 months, depending on the complexity of your business processes and customization requirements. Our accelerated implementation methodology can reduce this timeframe for businesses with standard processes.",
  },
  {
    category: "sap",
    question: "Can SAP Business One be customized for our specific business needs?",
    answer:
      "Yes, SAP Business One is highly customizable. We can tailor the solution to meet your specific business requirements through configuration, custom development, and integration with third-party applications.",
  },
  {
    category: "sap",
    question: "Is SAP Business One available in the cloud?",
    answer:
      "Yes, SAP Business One is available both as an on-premises solution and in the cloud. The cloud version offers the same functionality with the added benefits of lower upfront costs, automatic updates, and accessibility from anywhere.",
  },
]

function FaqSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  // Filter FAQs by active category and search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      (faq.category === activeCategory || activeCategory === "all") &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Generate FAQ schema for structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section 
      ref={ref} 
      className="py-10 md:py-16 pb-0 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b-0 -mb-6"
      style={{ marginBottom: "-1px" }}
      itemScope itemType="https://schema.org/FAQPage" 
    >
      {/* Structured data for SEO */}
      <StructuredData data={faqSchema} />

      {/* Background with solid color instead of gradient */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        {/* Remove background gradients that cause the orange/amber color */}
      </div>

      <div className="container relative z-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Frequently Asked <span className="text-[#E84A0E]">Questions</span>
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Find answers to common questions about our services, solutions, and processes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-3xl"
        >
          <div className="relative mb-4 group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#E84A0E] transition-colors" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 bg-white/80 dark:bg-white/10 backdrop-blur-sm border-slate-200 dark:border-white/10 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20 shadow-sm transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search frequently asked questions"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex flex-wrap justify-center gap-1.5"
          role="tablist"
          aria-label="FAQ Categories"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeCategory === "all" 
                ? "bg-[#E84A0E] text-white shadow-md" 
                : "bg-white/80 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white hover:bg-[#E84A0E]/10 hover:text-[#E84A0E] dark:hover:text-[#E84A0E] shadow-sm"
            }`}
            role="tab"
            aria-selected={activeCategory === "all"}
            aria-controls="all-faqs"
            id="tab-all"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeCategory === category.value
                  ? "bg-[#E84A0E] text-white shadow-md" 
                  : "bg-white/80 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white hover:bg-[#E84A0E]/10 hover:text-[#E84A0E] dark:hover:text-[#E84A0E] shadow-sm"
              }`}
              role="tab"
              aria-selected={activeCategory === category.value}
              aria-controls={`${category.value}-faqs`}
              id={`tab-${category.value}`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl mb-0"
          id={`${activeCategory}-faqs`}
          role="tabpanel"
        >
          {filteredFaqs.length > 0 ? (
            <Accordion 
              type="single" 
              collapsible 
              className="w-full bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-slate-200/50 dark:border-white/5"
              value={activeAccordion || undefined}
              onValueChange={(value) => setActiveAccordion(value)}
            >
              {filteredFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-slate-200/70 dark:border-white/10 last:border-0 overflow-hidden"
                  data-faq-item
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger 
                    className="text-left hover:text-[#E84A0E] transition-colors py-3 px-3 text-sm md:text-base font-medium flex items-center"
                    aria-expanded={activeAccordion === `item-${index}`}
                    itemProp="name"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground px-3 pb-3 pt-0 text-sm"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <div 
                      className="bg-slate-50/80 dark:bg-slate-800/80 p-3 rounded-lg border-l-2 border-[#E84A0E]/70"
                      itemProp="text"
                    >
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 dark:border-white/5">
              <Search className="h-6 w-6 mx-auto text-muted-foreground mb-3" />
              <p className="text-base font-medium text-slate-900 dark:text-white">No matching questions found.</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Try adjusting your search or category, or{" "}
                <a href="#contactform" className="text-[#E84A0E] hover:underline">
                  contact us
                </a>{" "}
                for more help.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function FaqSectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <FaqSection {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { FaqSectionWrapper as FaqSection };