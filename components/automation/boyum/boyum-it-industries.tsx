"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Store, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function BoyumItIndustries() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Industry Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Tailored For Your <span className="text-[#E84A0E]">Business</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            From manufacturing to retail, Boyum IT solutions adapt to the unique challenges and requirements of your industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-20" style={{ background: industry.accentColor }}></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 -ml-10 -mb-10 rounded-full opacity-10" style={{ background: industry.accentColor }}></div>
              
              <div className="relative z-10 p-8">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg mb-6`} style={{ background: industry.accentColor }}>
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{industry.name}</h3>
                <p className="text-slate-300 text-sm mb-6">{industry.description}</p>
                
                <div className="space-y-2 mb-8">
                  {industry.challenges.map((challenge, challengeIndex) => (
                    <div key={challengeIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-slate-300">{challenge}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <Button 
                    size="sm"
                    className="border-white bg-transparent hover:bg-white hover:text-slate-900 group"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/${industry.slug}`} className="flex items-center">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const industries = [
  {
    icon: <Factory className="h-6 w-6 text-white" />,
    name: "Manufacturing",
    description: "Optimize your entire manufacturing process, from production planning to quality control and inventory management.",
    accentColor: "#E84A0E",
    slug: "industries/manufacturing",
    challenges: [
      "Complex production scheduling",
      "Quality assurance",
      "Supply chain management",
      "Cost control and optimization"
    ]
  },
  {
    icon: <Store className="h-6 w-6 text-white" />,
    name: "Wholesale & Distribution",
    description: "Streamline your distribution operations, manage your inventory efficiently, and enhance customer satisfaction.",
    accentColor: "#A73370",
    slug: "industries/wholesale-distribution",
    challenges: [
      "Inventory management",
      "Order fulfillment",
      "Logistics optimization",
      "Multi-channel distribution"
    ]
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    name: "Regulated Industries",
    description: "Ensure compliance with industry regulations while optimizing your operations and maintaining product quality.",
    accentColor: "#E84A0E",
    slug: "industries/regulated-industries",
    challenges: [
      "Regulatory compliance",
      "Documentation management",
      "Traceability requirements",
      "Quality and safety standards"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BoyumItIndustriesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumItIndustries {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BoyumItIndustriesWrapper as BoyumItIndustries };