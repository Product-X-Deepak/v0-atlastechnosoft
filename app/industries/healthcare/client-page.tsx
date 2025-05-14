"use client"

import { useEffect, useState, Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { 
  HealthcareHero, 
  HealthcareValueChain,
  HealthcareSolutions,
  HealthcareIndustries,
  HealthcareIntegration,
  HealthcareDigitalTools,
  HealthcareCta
} from "@/components/industries/healthcare"

// Loading fallbacks for each section
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export default function ClientHealthcarePage() {
  // Force the component to fully render on the client
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    // Return minimal markup during SSR/initial load
    return (
      <main className="flex flex-col min-h-screen">
        <div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />
      </main>
    )
  }
  
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Healthcare Solutions",
        "Advanced SAP and automation solutions for healthcare organizations to streamline patient management, optimize billing cycles, and ensure compliance with intelligent automation.",
        "/industries/healthcare",
        "/images/industries/healthcare.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Healthcare", url: "/industries/healthcare" },
      ])} />
      
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <HealthcareHero />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareValueChain />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareSolutions />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareIndustries />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareIntegration />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareDigitalTools />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HealthcareCta />
      </Suspense>
    </main>
  )
} 