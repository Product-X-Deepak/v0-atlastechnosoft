"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Package, Shield, Eye, Workflow, BarChart3, Settings, Code, Sparkles, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function B1UsabilitySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  
  return (
    <section id="b1-usability" ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>B1 Usability Package</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Enhanced <span className="text-[#E84A0E]">User Experience</span> for SAP Business One
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Improve productivity and streamline workflows with intuitive interface enhancements and powerful productivity tools for SAP Business One.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="bg-[#E84A0E] rounded-lg p-4 w-16 h-16 flex items-center justify-center shadow-md">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    Award-Winning Solution for SAP Business One
                  </h3>
                  <p className="text-slate-600">
                    B1 Usability Package is trusted by 8,000+ customers in 120+ countries with 160,000+ users worldwide. Winner of multiple SAP Global Solution of the Year & People's Choice Awards.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {usabilityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6">
                <div className={`${feature.iconBg} h-12 w-12 rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.capabilities.map((capability, capabilityIndex) => (
                    <li key={capabilityIndex} className="flex items-start">
                      <div className="text-[#E84A0E] mr-2 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <h3 className="flex items-center text-xl font-semibold text-slate-900 mb-4">
                <Sparkles className="h-5 w-5 text-[#E84A0E] mr-2" />
                2025 New Features
              </h3>
              <ul className="space-y-4">
                {newFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-amber-100 rounded-full p-1 text-amber-800 mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{feature.title}</h4>
                      <p className="text-xs text-slate-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <h3 className="flex items-center text-xl font-semibold text-slate-900 mb-4">
                <Code className="h-5 w-5 text-[#E84A0E] mr-2" />
                Integration Capabilities
              </h3>
              <p className="text-slate-800 text-sm mb-4">
                B1 Usability Package seamlessly integrates with your existing SAP Business One ecosystem and other Boyum IT solutions.
              </p>
              <ul className="grid grid-cols-1 gap-3">
                {integrations.map((integration, index) => (
                  <li key={index} className="flex items-center bg-slate-50 rounded-lg p-3">
                    <div className={`${integration.iconColor} mr-3 flex-shrink-0`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{integration.title}</h4>
                      <p className="text-xs text-slate-700">{integration.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-12 bg-[#1E1E38] text-white rounded-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Business Benefits</h3>
              <p className="text-white/80 text-sm mb-6">
                Companies implementing the B1 Usability Package experience significant improvements in efficiency and user satisfaction:
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className={`rounded-lg bg-white p-4 shadow-sm border border-slate-100`}>
                    <div className={`text-2xl font-bold ${benefit.valueColor} mb-1`}>{benefit.value}</div>
                    <div className="text-sm text-slate-600">{benefit.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col">
              <blockquote className="flex-grow bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative">
                <div className="text-[#E84A0E] mb-4">
                  <svg className="h-8 w-8 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-slate-800 mb-4 font-medium italic">
                  "The B1 Usability Package transformed our efficiency. What previously took 3-4 clicks now takes just one. Our team's productivity has increased by over 30%."
                </p>
                <footer className="mt-2">
                  <p className="text-sm text-slate-700 font-medium">Manufacturing Client, 200+ Users</p>
                </footer>
              </blockquote>
              
              <div className="mt-6">
                <Button 
                  className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white w-full" 
                  asChild
                >
                  <Link href="/contact?solution=b1-usability-package" className="flex items-center justify-center">
                    Request B1UP Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const usabilityFeatures = [
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Ensure Data Quality",
    description: "Implement robust data validation and standardization mechanisms to maintain high-quality information across your business.",
    capabilities: [
      "Validation rules to prevent incorrect entries",
      "Template system for consistent data input",
      "Mass update tools for efficient document management",
      "Automatic data verification and cleansing"
    ]
  },
  {
    icon: <Eye className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Enhance User Experience",
    description: "Customize the SAP Business One interface to make it more intuitive, efficient, and tailored to your specific business roles.",
    capabilities: [
      "Customizable screen layouts per user role",
      "Contextual messages to guide users",
      "Google-style search functionality",
      "Quick create for master data in documents"
    ]
  },
  {
    icon: <Workflow className="h-6 w-6 text-white" />,
    iconBg: "bg-[#E84A0E]",
    title: "Optimize Your Work",
    description: "Automate repetitive tasks and streamline workflows to save time and reduce errors in your daily operations.",
    capabilities: [
      "Business rules with conditional logic",
      "Macro recording and execution",
      "Scheduled automatic tasks",
      "Collaborative task assignment"
    ]
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    iconBg: "bg-[#A73370]",
    title: "Make Better Decisions",
    description: "Access real-time insights through interactive dashboards and customizable reports to drive strategic business decisions.",
    capabilities: [
      "Interactive real-time B1 Dashboards",
      "Dynamic charts and visualizations",
      "HANA and SQL-based custom reports",
      "Crystal Reports layout support"
    ]
  }
]

const newFeatures = [
  {
    title: "AI-Powered Insights (2025)",
    description: "Machine learning algorithms that analyze your business data to provide actionable recommendations and identify opportunities."
  },
  {
    title: "Enhanced Mobile Experience (2025)",
    description: "Fully responsive interface adaptations with touch-optimized controls for field personnel and remote workers."
  },
  {
    title: "Advanced Workflow Designer (2025)",
    description: "Visual drag-and-drop workflow creation tool with conditional branching, approvals, and automated actions."
  },
  {
    title: "Predictive Data Quality (2025)",
    description: "AI-driven suggestions for data entry fields based on historical patterns and business rules."
  }
]

const integrations = [
  {
    icon: <Factory className="h-4 w-4" />,
    iconColor: "text-[#A73370]",
    title: "Beas Manufacturing",
    description: "Seamless integration with production planning and shop floor operations"
  },
  {
    icon: <Package className="h-4 w-4" />,
    iconColor: "text-[#E84A0E]",
    title: "Produmex WMS",
    description: "Enhanced warehouse management with automated data flows"
  },
  {
    icon: <Settings className="h-4 w-4" />,
    iconColor: "text-[#A73370]",
    title: "SAP HANA",
    description: "Optimized performance with in-memory database capabilities"
  }
]

const benefits = [
  {
    value: "40%",
    label: "Reduction in Data Entry Time",
    valueColor: "text-[#E84A0E]"
  },
  {
    value: "60%",
    label: "Decrease in Data Errors",
    valueColor: "text-[#A73370]"
  },
  {
    value: "3x",
    label: "Faster Report Generation",
    valueColor: "text-[#E84A0E]"
  },
  {
    value: "25%",
    label: "Improved User Adoption",
    valueColor: "text-[#A73370]"
  }
]

// Wrapper component to ensure proper Suspense boundaries
function B1UsabilitySectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <B1UsabilitySection {...props} />
    </Suspense>
  );
}

export { B1UsabilitySectionWrapper as B1UsabilitySection }; 