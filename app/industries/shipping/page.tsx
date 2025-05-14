import type { Metadata } from "next"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { 
  ShippingHero, 
  ShippingValueChain,
  ShippingSolutions,
  ShippingIndustries,
  ShippingIntegration,
  ShippingDigitalTools,
  ShippingCta
} from "@/components/industries/shipping"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export const metadata: Metadata = {
  title: "Shipping & Import/Export Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for shipping and global trade companies to digitize customs documentation, optimize container logistics, and achieve real-time supply chain visibility.",
  keywords: [
    "Shipping Solutions",
    "Global Trade",
    "Container Management",
    "Customs Documentation",
    "Import Export Software",
    "Maritime Technology",
    "Shipping Analytics",
    "Freight Management",
    "Vessel Tracking",
    "Green Shipping",
    "Shipping Compliance"
  ],
}

export default function ShippingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Shipping & Import/Export Solutions",
        "Advanced SAP and automation solutions for shipping and global trade companies to digitize customs documentation, optimize container logistics, and achieve real-time supply chain visibility.",
        "/industries/shipping",
        "/images/industries/shipping.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Shipping & Import/Export", url: "/industries/shipping" },
      ])} />
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <ShippingHero />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingValueChain />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingSolutions />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingIndustries />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingIntegration />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingDigitalTools />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ShippingCta />
      </Suspense>
    </main>
  )
} 