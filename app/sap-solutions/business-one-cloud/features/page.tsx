import type { Metadata } from "next"
import { SapBusinessOneCloudFeatures } from "@/components/sap/sap-business-one-cloud-features"
import { CtaSection } from "@/components/sections/cta-section"

export const metadata: Metadata = {
  title: "SAP Business One Cloud Features | Atlas Technosoft",
  description:
    "Explore the powerful features of SAP Business One Cloud that drive operational excellence, enhance decision-making, and accelerate business growth.",
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <SapBusinessOneCloudFeatures />
      <CtaSection />
    </div>
  )
} 