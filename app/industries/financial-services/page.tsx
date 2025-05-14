import type { Metadata } from "next"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { 
  FinancialServicesHero, 
  FinancialServicesValueChain,
  FinancialServicesSolutions,
  FinancialServicesIndustries,
  FinancialServicesIntegration,
  FinancialServicesDigitalTools,
  FinancialServicesCta
} from "@/components/industries/financial-services"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export const metadata: Metadata = {
  title: "Financial Services Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for banking, insurance, and financial institutions to automate compliance processes, enhance security, and create frictionless customer experiences.",
  keywords: [
    "Financial Services Solutions",
    "Banking Solutions",
    "Insurance Software",
    "Asset Management Systems",
    "Regulatory Compliance",
    "Fraud Detection",
    "Risk Management",
    "Financial Analytics",
    "Digital Banking",
    "Wealth Management",
    "SAP for Financial Services"
  ],
}

export default function FinancialServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Financial Services Solutions",
        "Advanced SAP and automation solutions for banking, insurance, and financial institutions to automate compliance processes, enhance security, and create frictionless customer experiences.",
        "/industries/financial-services",
        "/images/industries/financial-services.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Financial Services", url: "/industries/financial-services" },
      ])} />
      
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesHero />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesValueChain />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesSolutions />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesIndustries />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesIntegration />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesDigitalTools />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FinancialServicesCta />
      </Suspense>
    </main>
  )
} 