"use client"

import { useEffect,useState,Suspense } from "react"
import {  StructuredData as _StructuredData } from "@/components/seo/structured-data"
import {  generateServiceSchema as _generateServiceSchema, generateBreadcrumbSchema as _generateBreadcrumbSchema } from "@/lib/seo"
import { RetailHero,RetailValueChain,RetailSolutions,RetailIndustries,RetailIntegration,RetailDigitalTools,RetailCta } from "@/components/industries/retail"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export default function ClientRetailPage() {
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
      <meta itemProp="name" content="Retail Management Solutions" />
      <meta itemProp="serviceType" content="Industry-Specific ERP & Omnichannel" />
      <meta itemProp="description" content="Advanced SAP Business One and automation solutions for retail businesses to unify omnichannel commerce, optimize inventory with ML algorithms, and deliver personalized customer experiences for increased revenue and loyalty." />
      
      <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Atlas Technosoft" />
        <meta itemProp="url" content="https://www.atlastechnosoft.com" />
      </div>
      
      {/* Wrap all client components in Suspense boundaries with semantic sections */}
      <section aria-labelledby="retail-hero-heading" itemProp="mainEntityOfPage">
        <h2 id="retail-hero-heading" className="sr-only">Retail Solutions Overview</h2>
        <Suspense fallback={<SectionLoading />}>
          <RetailHero />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-value-chain-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="retail-value-chain-heading" className="sr-only">Retail Value Chain</h2>
        <meta itemProp="name" content="Retail Value Chain Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <RetailValueChain />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-solutions-heading" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <h2 id="retail-solutions-heading" className="sr-only">Retail ERP Solutions</h2>
        <meta itemProp="name" content="Retail ERP Solutions" />
        <Suspense fallback={<SectionLoading />}>
          <RetailSolutions />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-industries-heading">
        <h2 id="retail-industries-heading" className="sr-only">Retail Industry Segments</h2>
        <Suspense fallback={<SectionLoading />}>
          <RetailIndustries />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-integration-heading">
        <h2 id="retail-integration-heading" className="sr-only">Retail Systems Integration</h2>
        <Suspense fallback={<SectionLoading />}>
          <RetailIntegration />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-digital-tools-heading">
        <h2 id="retail-digital-tools-heading" className="sr-only">Retail Digital Tools</h2>
        <Suspense fallback={<SectionLoading />}>
          <RetailDigitalTools />
        </Suspense>
      </section>
      
      <section aria-labelledby="retail-cta-heading" itemProp="potentialAction" itemScope itemType="https://schema.org/RequestQuote">
        <h2 id="retail-cta-heading" className="sr-only">Contact Us About Retail Solutions</h2>
        <meta itemProp="name" content="Request Retail Solutions Quote" />
        <Suspense fallback={<SectionLoading />}>
          <RetailCta />
        </Suspense>
      </section>
    </main>
  )
} 