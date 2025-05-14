"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smartphone, Tablet, Laptop, ActivitySquare } from "lucide-react"
import { Suspense } from "react"

function HealthcareDigitalToolsComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="bg-slate-900 py-16 text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
            <span>Digital Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Healthcare <span className="text-[#E84A0E]">Digital Transformation</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Embrace the future of healthcare with our comprehensive digital transformation solutions that connect every aspect of patient care and operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white flex items-center">
              <ActivitySquare className="h-5 w-5 mr-2 text-[#E84A0E]" />
              Healthcare Technology Innovations
            </h3>
            
            <div className="space-y-4">
              {techFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#E84A0E]/20 to-[#A73370]/20 p-8 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Digital Transformation Benefits</h3>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="mr-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className={`font-bold text-white ${result.valueSize || 'text-2xl'}`}>{result.value}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{result.title}</h4>
                    <p className="text-sm text-white/80">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 text-center text-white">Access Your Healthcare Data Anywhere</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-[#E84A0E]/20 p-3">
                    {platform.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-white">{platform.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{platform.description}</p>
                
                <div className="mt-4 text-sm text-[#E84A0E]">
                  {platform.availability}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const techFeatures = [
  {
    title: "Telehealth & Remote Patient Monitoring",
    description: "Virtual care platforms that enable providers to deliver care at a distance, with remote monitoring of vital signs and health metrics."
  },
  {
    title: "AI-Powered Clinical Decision Support",
    description: "Advanced algorithms that analyze patient data to provide insights for diagnosis, treatment planning, and care management."
  },
  {
    title: "Predictive Analytics for Population Health",
    description: "Data-driven models that identify at-risk patients, predict disease progression, and enable proactive care interventions."
  }
]

const results = [
  {
    value: "42%",
    title: "Reduced Administrative Time",
    description: "Staff time savings through automation of routine administrative tasks",
    valueSize: "text-xl"
  },
  {
    value: "67%",
    title: "Faster Access to Patient Data",
    description: "Improvement in speed of accessing and sharing critical information",
    valueSize: "text-xl"
  },
  {
    value: "28%",
    title: "Increase in Patient Engagement",
    description: "Higher levels of patient participation in their own care",
    valueSize: "text-xl"
  }
]

const platforms = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#E84A0E]" />,
    title: "Mobile Provider App",
    description: "Access patient information, review results, and manage orders on the go with our secure mobile application.",
    availability: "iOS & Android"
  },
  {
    icon: <Laptop className="h-6 w-6 text-[#E84A0E]" />,
    title: "Clinical Dashboard",
    description: "Comprehensive control center for patient management, clinical documentation, and operational monitoring.",
    availability: "Web-based platform"
  },
  {
    icon: <Tablet className="h-6 w-6 text-[#E84A0E]" />,
    title: "Patient Engagement Tools",
    description: "Patient-facing applications for appointment scheduling, secure messaging, and health information access.",
    availability: "All devices"
  }
]

function HealthcareDigitalTools(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HealthcareDigitalToolsComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function HealthcareDigitalToolsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HealthcareDigitalTools {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { HealthcareDigitalToolsWrapper as HealthcareDigitalTools };