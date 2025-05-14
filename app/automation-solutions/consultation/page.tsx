import type { Metadata } from "next"
import { 
  ConsultationHero,
  ConsultationApproach,
  ConsultationServices,
  ConsultationIndustries,
  ConsultationBenefits,
  ConsultationProcess
} from "@/components/automation/consultation"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Automation Consultation Services | Strategic Solutions for 2025",
  description: "Transform your business with our expert automation consultation services. We help you implement hyperautomation, AI-driven solutions, and intelligent process optimization to drive growth and efficiency.",
  keywords: [
    "Hyperautomation Consulting",
    "AI Consulting Services",
    "Business Process Optimization",
    "Automation Strategy 2025",
    "Intelligent Automation",
    "Process Mining Consultation",
    "Digital Transformation Services",
    "Low-Code Automation",
    "Enterprise Automation",
    "ROI Optimization"
  ],
}

export default function ConsultationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Strategic Automation Consultation Services",
        "Transform your business with our expert automation consultation services. We help you implement hyperautomation, AI-driven solutions, and intelligent process optimization to drive growth and efficiency.",
        "/automation-solutions/consultation",
        "/images/solutions/consultation-hero.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Automation Solutions", url: "/automation-solutions" },
        { name: "Consultation", url: "/automation-solutions/consultation" },
      ])} />
      <ConsultationHero />
      <ConsultationApproach />
      <ConsultationServices />
      <ConsultationIndustries />
      <ConsultationBenefits />
      <ConsultationProcess />
    </main>
  )
}
