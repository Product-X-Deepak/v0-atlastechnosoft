"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ClipboardList, FileText, MessageSquare, Send, Users } from "lucide-react"
import { Suspense } from "react"

export function CareersProcess() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersProcessContent />
    </Suspense>
  );
}

function CareersProcessContent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section ref={ref} id="process" className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Hiring Process</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;ve designed a straightforward hiring process to help us find the right talent and ensure a great
            experience for candidates.
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-border"></div>
            <div className="space-y-12">
              {hiringSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative"
                >
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8`}
                  >
                    <div className="md:w-1/2">
                      <div className={`flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                        <Card className={`w-full max-w-lg ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              {index % 2 === 1 && step.icon}
                              <span>
                                Step {index + 1}: {step.title}
                              </span>
                              {index % 2 === 0 && step.icon}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{step.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="relative flex h-24 items-center justify-center md:w-0">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const hiringSteps = [
  {
    icon: <Send className="h-5 w-5" />,
    title: "Application Submission",
    description:
      "Submit your application through our careers page. Make sure to include your updated resume and a cover letter explaining why you&apos;re interested in joining our team.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Resume Screening",
    description:
      "Our hiring team will review your application to assess your qualifications, experience, and fit for the role. We aim to get back to all applicants within 1-2 weeks.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Initial Interview",
    description:
      "If your profile matches our requirements, we'll schedule an initial interview (phone or video call) to discuss your background, experience, and expectations.",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Technical Assessment",
    description:
      "Depending on the role, you may be asked to complete a technical assessment or case study to demonstrate your skills and problem-solving abilities.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Final Interview",
    description:
      "The final round typically involves meeting with the team and leadership. This is an opportunity for deeper discussions about the role and for you to learn more about our company culture.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Offer & Onboarding",
    description:
      "If you&apos;re selected, we&apos;ll extend an offer and work with you to ensure a smooth onboarding process. We&apos;re excited to welcome you to the team!",
  },
]
