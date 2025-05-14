import type { Metadata } from "next"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { 
  PharmaceuticalsHero, 
  PharmaceuticalsValueChain,
  PharmaceuticalsSolutions,
  PharmaceuticalsIndustries,
  PharmaceuticalsIntegration,
  PharmaceuticalsDigitalTools,
  PharmaceuticalsCta
} from "@/components/industries/pharmaceuticals"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export const metadata: Metadata = {
  title: "Pharmaceutical Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for pharmaceutical companies to ensure regulatory compliance, manage complex formulations, and optimize production with blockchain-secured systems.",
  keywords: [
    "Pharmaceutical Solutions",
    "Regulatory Compliance",
    "Drug Manufacturing",
    "Serialization",
    "Track and Trace",
    "Quality Control",
    "Compliance Management",
    "Pharmaceutical ERP",
    "Batch Manufacturing",
    "FDA 21 CFR Part 11",
    "GMP Compliance"
  ],
}

export default function PharmaceuticalsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Pharmaceutical Solutions",
        "Advanced SAP and automation solutions for pharmaceutical companies to ensure regulatory compliance, manage complex formulations, and optimize production with blockchain-secured systems.",
        "/industries/pharmaceuticals",
        "/images/industries/pharmaceuticals.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Pharmaceuticals", url: "/industries/pharmaceuticals" },
      ])} />
      
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsHero />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsValueChain />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsSolutions />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsIndustries />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsIntegration />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsDigitalTools />
      </Suspense>
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Suspense fallback={<SectionLoading />}>
        <PharmaceuticalsCta />
      </Suspense>
      </Suspense>
    </main>
  )
} 