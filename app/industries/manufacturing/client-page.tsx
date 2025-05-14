"use client"

import { useEffect,useState,Suspense } from "react"
import {  StructuredData as _StructuredData } from "@/components/seo/structured-data"
import {  generateServiceSchema as _generateServiceSchema, generateBreadcrumbSchema as _generateBreadcrumbSchema } from "@/lib/seo"
import { ManufacturingHero,ManufacturingValueChain,ManufacturingSolutions,ManufacturingIndustries,ManufacturingIntegration,ManufacturingDigitalTools,ManufacturingCta } from "@/components/industries/manufacturing"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export default function ClientManufacturingPage() {
  // Force the component to fully render on the client
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    // Return minimal markup during SSR/initial load
    return (
      <main className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/Service">
        <div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />
      </main>
    )
  }
  
  return (
    <main className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/Service">
      {/* Adding microdata attributes for Service schema */}
      <meta itemProp="name" content="Manufacturing Solutions" />
      <meta itemProp="serviceType" content="Industry-Specific ERP & Automation" />
      <meta itemProp="description" content="Advanced SAP Business One and automation solutions for manufacturing companies looking to optimize production, enhance quality control, and improve supply chain management with Industry 4.0 technologies." />
      
      <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Atlas Technosoft" />
        <meta itemProp="url" content="https://www.atlastechnosoft.com" />
      </div>
      
      {/* Wrap all client components in Suspense boundaries with semantic sections */}
      <section aria-labelledby="manufacturing-hero-heading" itemProp="mainEntityOfPage">
        <h2 id="manufacturing-hero-heading" className="sr-only">Manufacturing Solutions Overview</h2>
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingHero />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-value-chain-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="manufacturing-value-chain-heading" className="sr-only">Manufacturing Value Chain</h2>
        <meta itemProp="name" content="Manufacturing Value Chain Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingValueChain />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-solutions-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="manufacturing-solutions-heading" className="sr-only">Manufacturing ERP Solutions</h2>
        <meta itemProp="name" content="Manufacturing ERP Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingSolutions />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-industries-heading">
        <h2 id="manufacturing-industries-heading" className="sr-only">Manufacturing Industry Segments</h2>
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingIndustries />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-integration-heading">
        <h2 id="manufacturing-integration-heading" className="sr-only">Manufacturing Systems Integration</h2>
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingIntegration />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-digital-tools-heading">
        <h2 id="manufacturing-digital-tools-heading" className="sr-only">Manufacturing Digital Tools</h2>
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingDigitalTools />
        </Suspense>
      </section>
      
      <section aria-labelledby="manufacturing-cta-heading" itemProp="potentialAction" itemScope itemType="https://schema.org/RequestQuote">
        <h2 id="manufacturing-cta-heading" className="sr-only">Contact Us About Manufacturing Solutions</h2>
        <meta itemProp="name" content="Request Manufacturing Solutions Quote" />
        <Suspense fallback={<SectionLoading />}>
          <ManufacturingCta />
        </Suspense>
      </section>
    </main>
  )
} 