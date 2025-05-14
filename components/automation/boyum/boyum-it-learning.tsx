"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, BookOpen, Video, Users, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Props type for the component
type BoyumItLearningProps = Record<string, never>

// Internal implementation component (not exported)
function BoyumItLearningContent(_: BoyumItLearningProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Learning Resources</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Maximize Your <span className="text-[#E84A0E]">Product Knowledge</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Access comprehensive training resources, documentation, and support to get the most from your Boyum IT solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {learningResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: resource.bgColor }}>
                  {resource.icon}
                </div>
                <h3 className="ml-4 text-lg font-semibold text-slate-900">{resource.title}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">{resource.description}</p>
              
              <ul className="space-y-2 mb-4">
                {resource.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-[#E84A0E] mr-2">•</span>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 mt-auto">
                <span className="inline-flex items-center text-sm font-medium text-[#E84A0E]">
                  {resource.actionText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">E-learning Hub</h3>
                <p className="text-slate-600 mb-6">
                  Access our comprehensive e-learning platform with self-paced courses, tutorials, and certification programs designed to help you master Boyum IT solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-slate-700">Self-paced learning modules</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-slate-700">Interactive video tutorials</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-slate-700">Certification programs and assessments</span>
                  </li>
                </ul>
                <Button 
                  className="w-full sm:w-auto bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group"
                  asChild
                >
                  <Link href="/learning" className="flex items-center justify-center">
                    Explore E-learning Hub
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-[#E84A0E]/90 to-[#A73370]/90 p-10 flex items-center justify-center">
                <div className="text-center text-white">
                  <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Get Certified</h4>
                  <p className="mb-6">Enhance your skills and demonstrate your expertise with official Boyum IT certifications</p>
                  <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm">
                    <span className="font-medium">Start learning today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const learningResources = [
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: "Product Documentation",
    description: "Comprehensive guides and documentation for all Boyum IT products and solutions.",
    bgColor: "#E84A0E",
    features: [
      "User manuals and guides",
      "Technical documentation",
      "Implementation guidelines",
      "Best practices"
    ],
    actionText: "Browse documentation"
  },
  {
    icon: <Video className="h-6 w-6 text-white" />,
    title: "Video Tutorials",
    description: "Visual learning resources to help you get the most out of your Boyum IT solutions.",
    bgColor: "#A73370",
    features: [
      "Step-by-step tutorials",
      "Feature overviews",
      "Implementation walkthroughs",
      "Tips and tricks"
    ],
    actionText: "Watch tutorials"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Community Resources",
    description: "Connect with other users, share insights and learn from the Boyum IT community.",
    bgColor: "#E84A0E",
    features: [
      "User forums",
      "Knowledge sharing",
      "Solution showcases",
      "Community events"
    ],
    actionText: "Join the community"
  },
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "Help Center",
    description: "Find answers to common questions and troubleshooting guides for all products.",
    bgColor: "#A73370",
    features: [
      "Frequently asked questions",
      "Troubleshooting guides",
      "Knowledge base articles",
      "Support resources"
    ],
    actionText: "Visit help center"
  },
  {
    icon: <Calendar className="h-6 w-6 text-white" />,
    title: "Webinars & Events",
    description: "Join live and on-demand webinars to learn about product features and best practices.",
    bgColor: "#E84A0E",
    features: [
      "Product demonstrations",
      "Expert sessions",
      "Customer success stories",
      "Industry insights"
    ],
    actionText: "Register for webinars"
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    title: "Training Programs",
    description: "Structured training programs designed for various roles and skill levels.",
    bgColor: "#A73370",
    features: [
      "Administrator training",
      "Developer courses",
      "End-user training",
      "Advanced specialized courses"
    ],
    actionText: "Enroll in training"
  }
]

// Wrapper component with Suspense boundary
export function BoyumItLearning(props: BoyumItLearningProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItLearningContent {...props} />
    </Suspense>
  );
}