"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, BarChart2, Database, Settings2, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ErpPlanningHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  
  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-[#FFF5D6] py-8"
      aria-labelledby="erp-planning-hero-title"
    >
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div 
            className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-800"
            itemProp="offers" 
            itemScope 
            itemType="https://schema.org/Offer"
          >
            <span itemProp="offeredBy">SAP Partner</span>
            <meta itemProp="price" content="Contact for pricing" />
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 
            id="erp-planning-hero-title"
            className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl"
            itemProp="name"
          >
            Strategic <span className="text-[#E84A0E]">ERP Planning</span> for <br />
            <span className="text-[#A73370]">Business Transformation</span>
          </h1>
          <p 
            className="mx-auto mb-4 max-w-2xl text-base text-slate-700"
            itemProp="description"
          >
            Comprehensive SAP Business One planning, implementation, and optimization to drive operational excellence and business growth with tailored ERP solutions designed for your specific industry needs.
          </p>
          
          {/* Add hidden structured content for search engines */}
          <div className="visually-hidden">
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <meta itemProp="ratingValue" content="4.9" />
              <meta itemProp="reviewCount" content="124" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Atlas Technosoft" />
              <meta itemProp="url" content="https://www.atlastechnosoft.com" />
            </div>
            <meta itemProp="serviceType" content="Enterprise Resource Planning" />
            <meta itemProp="areaServed" content="Global" />
          </div>
        </div>

        <div className="mx-auto mb-4 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
              itemProp="hasOfferCatalog"
              itemScope
              itemType="https://schema.org/OfferCatalog"
            >
              <meta itemProp="name" content="ERP Benefits" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {benefit.icon}
              </div>
              <h3 
                className="mt-2 text-sm font-semibold text-slate-900"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <span itemProp="name">{benefit.title}</span>
              </h3>
              <p 
                className="mt-1 text-xs text-slate-600"
                itemProp="description"
              >
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size="sm" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Start Your ERP Journey
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="#strategy" className="flex items-center">
              Explore Our Approach
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <Database className="h-4 w-4 text-[#E84A0E]" />,
    title: "Unified Data Platform",
    description: "Single source of truth for all business data",
  },
  {
    icon: <Settings2 className="h-4 w-4 text-[#A73370]" />,
    title: "Process Optimization",
    description: "Streamlined workflows and automation",
  },
  {
    icon: <BarChart2 className="h-4 w-4 text-[#A73370]" />,
    title: "Strategic Insights",
    description: "Real-time analytics and reporting",
  },
  {
    icon: <Network className="h-4 w-4 text-[#E84A0E]" />,
    title: "Seamless Integration",
    description: "Connect your entire business ecosystem",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningHeroWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningHeroWrapper as ErpPlanningHero };