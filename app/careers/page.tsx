import type { Metadata } from "next"
import { 
  CareerHero,
  CareerMission,
  CareerJourney,
  CareerOpenings,
  CareerBenefits,
  CareerCta
} from "@/components/careers"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Careers | Atlas Technosoft",
  description: "Join our team of innovators at Atlas Technosoft. Discover exciting career opportunities and grow with us in a collaborative, cutting-edge environment.",
  keywords: [
    "Atlas Careers",
    "Tech Jobs",
    "IT Careers",
    "SAP Jobs",
    "ERP Consulting Careers",
    "Software Development Jobs",
    "Atlas Technosoft Careers",
    "Professional Growth",
    "Career Development",
    "Technology Careers"
  ],
}

export default function CareersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Careers at Atlas Technosoft",
        "Join our team of innovators at Atlas Technosoft. Discover exciting career opportunities and grow with us in a collaborative, cutting-edge environment.",
        "/careers",
        "/images/careers/careers-hero.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Careers", url: "/careers" },
      ])} />
      <CareerHero />
      <CareerMission />
      <CareerJourney />
      <CareerOpenings />
      <CareerBenefits />
      <CareerCta />
    </main>
  )
}
