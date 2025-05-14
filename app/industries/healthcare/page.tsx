import type { Metadata } from "next"
import { Suspense } from "react"
import ClientHealthcarePage from "./client-page"

// Loading fallback
const PageLoading = () => <div className="min-h-screen w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>

export const metadata: Metadata = {
  title: "Healthcare Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for healthcare organizations to streamline patient management, optimize billing cycles, and ensure compliance with intelligent automation.",
  keywords: [
    "Healthcare Solutions",
    "Patient Management",
    "Revenue Cycle Management",
    "Healthcare Compliance",
    "Medical Practice Systems",
    "Hospital Management Software",
    "HIPAA Compliance",
    "Healthcare ERP",
    "Medical Billing Solutions",
    "Patient Portal Integration",
    "Electronic Health Records"
  ],
}

export default function HealthcarePage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ClientHealthcarePage />
    </Suspense>
  )
} 