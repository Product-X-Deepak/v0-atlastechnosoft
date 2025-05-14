"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Cloud, CloudCog, Database, Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"

function BoyumItMobileCloud() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="mobile-cloud" ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Mobile & Cloud Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Access Your Business <span className="text-[#E84A0E]">Anywhere, Anytime</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Extend SAP Business One beyond the office with mobile applications and cloud solutions that keep your team connected and productive from anywhere.
          </p>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row md:items-center md:space-x-8 lg:space-x-16">
          <motion.div 
            className="mt-8 md:mt-0 md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              {mobileTechnologies.map((tech, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: tech.bgColor }}>
                      {tech.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{tech.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button
                className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group"
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Request Mobile Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 relative">
              <div className="absolute -top-4 -right-4 h-12 w-12 bg-[#E84A0E] rounded-full flex items-center justify-center">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4">Produmex Scan</h3>
              <p className="text-slate-600 mb-6">A mobile scanning solution that enhances warehouse operations with real-time data capture and processing.</p>
              
              <div className="space-y-4">
                {cloudFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="relative h-64 w-full md:h-80 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/images/solutions/B5_A.jpg"
                    alt="Produmex Scan Mobile Interface"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const mobileTechnologies = [
  {
    icon: <Smartphone className="h-5 w-5 text-white" />,
    title: "Mobile Data Capture",
    description: "Capture inventory data, scan barcodes, and process warehouse operations from iOS and Android devices.",
    bgColor: "#E84A0E"
  },
  {
    icon: <CloudCog className="h-5 w-5 text-white" />,
    title: "Cloud-Based Solutions",
    description: "Access your business data and applications from anywhere with secure cloud-based deployment options.",
    bgColor: "#A73370"
  },
  {
    icon: <Database className="h-5 w-5 text-white" />,
    title: "Real-Time Synchronization",
    description: "Keep all your data synchronized in real-time between mobile devices and your main ERP system.",
    bgColor: "#E84A0E"
  },
  {
    icon: <Lock className="h-5 w-5 text-white" />,
    title: "Secure Access Control",
    description: "Control who has access to what data with granular permission settings and secure authentication.",
    bgColor: "#A73370"
  }
]

const cloudFeatures = [
  "Mobile barcode scanning",
  "Real-time inventory updates", 
  "Paperless operations",
  "Seamless SAP integration",
  "Works offline and synchronizes when connected",
  "User-friendly interface optimized for mobile devices"
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItMobileCloudWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItMobileCloud {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItMobileCloudWrapper as BoyumItMobileCloud };