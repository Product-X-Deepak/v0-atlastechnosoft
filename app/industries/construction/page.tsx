import type { Metadata } from "next"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { 
  ConstructionHero, 
  ConstructionValueChain,
  ConstructionSolutions,
  ConstructionIndustries,
  ConstructionIntegration,
  ConstructionDigitalTools,
  ConstructionCta
} from "@/components/industries/construction"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export const metadata: Metadata = {
  title: "Construction Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for construction companies to manage projects, track resources, control costs, and enhance collaboration with integrated digital solutions.",
  keywords: [
    "Construction Solutions",
    "Project Management Software",
    "Construction ERP",
    "Resource Management",
    "Cost Control Solutions",
    "Field Operations",
    "Construction Collaboration",
    "SAP for Construction",
    "Construction Automation",
    "BIM Integration",
    "Construction Analytics"
  ],
}

export default function ConstructionPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Construction Solutions",
        "Advanced SAP and automation solutions for construction companies to manage projects, track resources, control costs, and enhance collaboration with integrated digital solutions.",
        "/industries/construction",
        "/images/industries/construction.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Construction", url: "/industries/construction" },
      ])} />
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <ConstructionHero />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionValueChain />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionSolutions />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionIndustries />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionIntegration />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionDigitalTools />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ConstructionCta />
      </Suspense>
    </main>
  )
} 