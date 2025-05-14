"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileCheck, FileEdit, FileSearch, LayoutDashboard, Settings, Share2, Users2 } from "lucide-react"
import { Suspense } from "react"

function ErpPlanningRoadmap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const roadmapSteps = [
    {
      icon: <FileSearch className="h-10 w-10 text-white" />,
      title: "Discovery & Assessment",
      description: "Comprehensive analysis of business processes, challenges, and requirements",
      activities: [
        "Business process analysis",
        "Requirements gathering",
        "Legacy system evaluation",
        "Stakeholder interviews",
        "Current state documentation"
      ],
      duration: "2-4 Weeks",
      deliverables: "Needs Assessment Report, Process Maps, Gap Analysis"
    },
    {
      icon: <FileEdit className="h-10 w-10 text-white" />,
      title: "Solution Design",
      description: "Strategic planning and architectural design of your SAP Business One implementation",
      activities: [
        "Solution architecture design",
        "Process redesign/optimization",
        "System configuration planning",
        "Integration strategy development",
        "Data migration strategy"
      ],
      duration: "3-5 Weeks",
      deliverables: "Solution Blueprint, Technical Architecture, Project Plan"
    },
    {
      icon: <Settings className="h-10 w-10 text-white" />,
      title: "Build & Configure",
      description: "Implementation of the technical foundation and core ERP functionality",
      activities: [
        "System installation/provisioning",
        "Core module configuration",
        "Custom development (if needed)",
        "Integration development",
        "Data migration preparation"
      ],
      duration: "4-8 Weeks",
      deliverables: "Configured System, Integration Components, Migration Scripts"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-white" />,
      title: "Testing & Validation",
      description: "Comprehensive testing to ensure system reliability, accuracy, and performance",
      activities: [
        "Unit testing",
        "Integration testing",
        "User acceptance testing",
        "Performance testing",
        "Regression testing"
      ],
      duration: "2-4 Weeks",
      deliverables: "Test Results, Issue Resolution, Validated System"
    },
    {
      icon: <Users2 className="h-10 w-10 text-white" />,
      title: "Training & Change Management",
      description: "Preparing users and the organization for successful adoption",
      activities: [
        "User training development",
        "Admin/power user training",
        "End-user training",
        "Documentation creation",
        "Change management activities"
      ],
      duration: "2-4 Weeks",
      deliverables: "Training Materials, Documentation, Change Management Plan"
    },
    {
      icon: <Share2 className="h-10 w-10 text-white" />,
      title: "Deployment & Go-Live",
      description: "Controlled system launch with comprehensive support",
      activities: [
        "Final data migration",
        "Go-live preparation",
        "Cutover planning",
        "Go-live execution",
        "Hypercare support"
      ],
      duration: "1-2 Weeks",
      deliverables: "Production System, Cutover Plan, Hypercare Plan"
    },
    {
      icon: <LayoutDashboard className="h-10 w-10 text-white" />,
      title: "Optimization & Growth",
      description: "Continuous improvement and expansion of ERP capabilities",
      activities: [
        "Post-implementation review",
        "Performance optimization",
        "User feedback collection",
        "Functionality expansion",
        "Advanced capability enablement"
      ],
      duration: "Ongoing",
      deliverables: "Enhancement Roadmap, Performance Reports, System Optimizations"
    }
  ]

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden mt-16 md:mt-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-800/5 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-900/5 rounded-full blur-3xl opacity-60"></div>

      <div className="container relative px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-2 shadow-sm">
            <span>Implementation Roadmap</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-premium-heading">Digital <span className="text-premium-orange">Transformation Roadmap</span></h2>
          <p className="text-premium-text font-medium sm:text-lg max-w-[90%]">
            Our structured implementation methodology ensures a smooth, efficient journey from planning to deployment and beyond
          </p>
        </motion.div>

        <div className="relative mt-16 mb-8">
          {/* Timeline connector */}
          <div className="absolute left-0 right-0 top-16 h-1 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 hidden md:block"></div>
          
          <div className="grid gap-8 md:grid-cols-7">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative flex flex-col items-center"
              >
                {/* Step number bubble */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 mb-6 shadow-md
                  ${index === 0 ? 'bg-amber-900' : 
                   index === 1 ? 'bg-amber-800' : 
                   index === 2 ? 'bg-amber-800' : 
                   index === 3 ? 'bg-amber-700' : 
                   index === 4 ? 'bg-amber-700' : 
                   index === 5 ? 'bg-amber-600' : 'bg-amber-600'}`}
                >
                  <span className="font-bold text-white">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className={`h-full bg-white rounded-lg border border-amber-200 p-4 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col
                  ${index === 0 ? 'hover:border-amber-900/40' : 
                   index === 1 ? 'hover:border-amber-800/40' : 
                   index === 2 ? 'hover:border-amber-800/40' : 
                   index === 3 ? 'hover:border-amber-700/40' : 
                   index === 4 ? 'hover:border-amber-700/40' : 
                   index === 5 ? 'hover:border-amber-600/40' : 'hover:border-amber-600/40'}`}
                >
                  <div className={`-mt-10 mb-4 self-center rounded-full p-2 shadow-md
                    ${index === 0 ? 'bg-amber-900' : 
                     index === 1 ? 'bg-amber-800' : 
                     index === 2 ? 'bg-amber-800' : 
                     index === 3 ? 'bg-amber-700' : 
                     index === 4 ? 'bg-amber-700' : 
                     index === 5 ? 'bg-amber-600' : 'bg-amber-600'}`}
                  >
                    {step.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-center text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 text-center">{step.description}</p>
                  
                  <div className="mt-auto">
                    <div className="text-xs font-semibold text-center mb-1 text-amber-900">Duration</div>
                    <div className="text-xs text-center mb-3 text-slate-700">{step.duration}</div>
                    
                    <div className="text-xs font-semibold text-center mb-1 text-amber-900">Key Activities</div>
                    <ul className="text-xs space-y-1 mb-2">
                      {step.activities.slice(0, 3).map((activity, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <div className={`w-1 h-1 rounded-full mt-1.5 
                            ${index === 0 ? 'bg-amber-900' : 
                             index === 1 ? 'bg-amber-800' : 
                             index === 2 ? 'bg-amber-800' : 
                             index === 3 ? 'bg-amber-700' : 
                             index === 4 ? 'bg-amber-700' : 
                             index === 5 ? 'bg-amber-600' : 'bg-amber-600'}`}
                          ></div>
                          <span className="text-slate-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-premium-text max-w-2xl mx-auto p-4 rounded-lg mb-8">
            Our implementation methodology is designed to minimize business disruption while maximizing adoption and ROI. We focus on delivering value incrementally throughout the implementation process.
          </p>
          
          <Button 
            asChild 
            className="bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-800/90 hover:to-amber-900/90 text-white gap-2 shadow-sm"
          >
            <Link href="/contact">
              Start Your Digital Transformation Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningRoadmapWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningRoadmap {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningRoadmapWrapper as ErpPlanningRoadmap };