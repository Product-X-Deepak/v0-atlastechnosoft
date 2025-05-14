"use client"

import { useEffect, useState, Suspense } from "react"
import { StructuredData as _StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema as _generateServiceSchema, generateBreadcrumbSchema as _generateBreadcrumbSchema } from "@/lib/seo"
import { 
  DistributionHero, 
  DistributionValueChain,
  DistributionSolutions,
  DistributionIndustries,
  DistributionIntegration,
  DistributionDigitalTools,
  DistributionCta
} from "@/components/industries/distribution"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export default function ClientDistributionPage() {
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
      <meta itemProp="name" content="Distribution & Logistics Solutions" />
      <meta itemProp="serviceType" content="Industry-Specific ERP & Supply Chain" />
      <meta itemProp="description" content="Innovative SAP and automation solutions for distribution and logistics companies to optimize inventory management, streamline order fulfillment, and gain end-to-end supply chain visibility." />
      
      <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Atlas Technosoft" />
        <meta itemProp="url" content="https://www.atlastechnosoft.com" />
      </div>
      
      {/* Wrap all client components in Suspense boundaries with semantic sections */}
      <section aria-labelledby="distribution-hero-heading" itemProp="mainEntityOfPage">
        <h2 id="distribution-hero-heading" className="sr-only">Distribution Solutions Overview</h2>
        <Suspense fallback={<SectionLoading />}>
          <DistributionHero />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-value-chain-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="distribution-value-chain-heading" className="sr-only">Distribution Value Chain</h2>
        <meta itemProp="name" content="Distribution Value Chain Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <DistributionValueChain />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-solutions-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="distribution-solutions-heading" className="sr-only">Distribution ERP Solutions</h2>
        <meta itemProp="name" content="Distribution ERP Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <DistributionSolutions />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-industries-heading">
        <h2 id="distribution-industries-heading" className="sr-only">Distribution Industry Segments</h2>
        <Suspense fallback={<SectionLoading />}>
          <DistributionIndustries />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-integration-heading">
        <h2 id="distribution-integration-heading" className="sr-only">Distribution Systems Integration</h2>
        <Suspense fallback={<SectionLoading />}>
          <DistributionIntegration />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-digital-tools-heading">
        <h2 id="distribution-digital-tools-heading" className="sr-only">Distribution Digital Tools</h2>
        <Suspense fallback={<SectionLoading />}>
          <DistributionDigitalTools />
        </Suspense>
      </section>
      
      <section aria-labelledby="distribution-cta-heading" itemProp="potentialAction" itemScope itemType="https://schema.org/RequestQuote">
        <h2 id="distribution-cta-heading" className="sr-only">Contact Us About Distribution Solutions</h2>
        <meta itemProp="name" content="Request Distribution Solutions Quote" />
        <Suspense fallback={<SectionLoading />}>
          <DistributionCta />
        </Suspense>
      </section>
    </main>
  )
} 