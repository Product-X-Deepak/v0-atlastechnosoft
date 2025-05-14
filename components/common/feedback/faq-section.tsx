"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { Suspense } from "react"

export interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
  category?: string;
}

interface CommonFAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  contactEmail?: string;
  contactText?: string;
  className?: string;
  bgClassName?: string;
  gradientBackground?: boolean;
  showContactSection?: boolean;
}

export function CommonFAQ(props: CommonFAQProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CommonFAQContent {...props} />
    </Suspense>
  );
}

function CommonFAQContent({
  faqs,
  title,
  subtitle,
  badge,
  contactEmail,
  contactText,
  className = "",
  bgClassName = "bg-background",
  gradientBackground = false,
  showContactSection = true
}: CommonFAQProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const backgroundClass = gradientBackground 
    ? "bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900" 
    : bgClassName;

  return (
    <section ref={ref} className={`py-16 md:py-24 ${backgroundClass} ${className}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {badge && (
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-3">
              <HelpCircle className="mr-1.5 h-3 w-3" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-4">
                    {faq.icon ? (
                      <div className="flex items-start pt-1">
                        <div className="mr-2 mt-0.5 flex-shrink-0">{faq.icon}</div>
                        <div>{faq.answer}</div>
                      </div>
                    ) : (
                      faq.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {showContactSection && contactEmail && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              {contactText}{" "}
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                {contactEmail}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
