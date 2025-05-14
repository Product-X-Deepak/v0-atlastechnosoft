"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BrainCircuit, Cloud, Globe, Shield } from "lucide-react"
import { Suspense } from "react"

function SapBusinessOneCloudHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-[#FFF5D6] py-8"
      aria-labelledby="business-one-cloud-hero-title"
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
            <meta itemProp="price" content="38" />
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </div>
        </div>
        
        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 
            id="business-one-cloud-hero-title"
            className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl"
            itemProp="name"
          >
            Transform Your Business with <span className="text-[#E84A0E]">SAP</span> <br />
            <span className="text-[#A73370]">Business One</span> <span className="text-primary">Cloud</span>
          </h1>
          <p 
            className="mx-auto mb-4 max-w-2xl text-base text-slate-700"
            itemProp="description"
          >
            A fully cloud-native ERP solution with zero infrastructure overhead, providing anytime, anywhere access to business data. Featuring automatic updates, built-in disaster recovery, and seamless scalability to meet your growing business needs.
          </p>
          
          {/* Add hidden structured content for search engines */}
          <div className="visually-hidden">
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <meta itemProp="ratingValue" content="4.7" />
              <meta itemProp="reviewCount" content="86" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
              <meta itemProp="name" content="SAP" />
              <meta itemProp="url" content="https://www.sap.com" />
            </div>
            <meta itemProp="sku" content="SAP-B1-CLOUD-2025" />
            <meta itemProp="productID" content="SAP-B1-CLOUD-2025" />
            <meta itemProp="category" content="Software > Enterprise Resource Planning > Cloud ERP > SMB Solutions" />
          </div>
        </div>

        <div className="mx-auto mb-4 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
              itemProp="hasFeature"
              itemScope
              itemType="https://schema.org/PropertyValue"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {feature.icon}
              </div>
              <h3 
                className="mt-2 text-sm font-semibold text-slate-900"
                itemProp="name"
              >
                {feature.title}
              </h3>
              <p 
                className="mt-1 text-xs text-slate-600"
                itemProp="value"
              >
                {feature.description}
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
              Request a Demo
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="/sap-solutions/business-one-cloud/features" className="flex items-center">
              Explore Features
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <BrainCircuit className="h-4 w-4 text-[#E84A0E]" />,
    title: "Cloud-Powered AI",
    description: "Intelligent insights without local computing resources",
  },
  {
    icon: <Cloud className="h-4 w-4 text-[#A73370]" />,
    title: "Cloud Integration",
    description: "Connect with 160+ cloud services instantly",
  },
  {
    icon: <Shield className="h-4 w-4 text-[#A73370]" />,
    title: "Enterprise Security",
    description: "Bank-grade cloud protection for your data",
  },
  {
    icon: <Globe className="h-4 w-4 text-[#E84A0E]" />,
    title: "Global Accessibility",
    description: "Real-time business data from anywhere",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCloudHeroWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCloudHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCloudHeroWrapper as SapBusinessOneCloudHero };