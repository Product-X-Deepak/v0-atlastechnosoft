import type { Metadata } from "next"
import { BreadcrumbStructuredData } from "@/components/seo/structured-data"
import { MultiStepForm } from "@/components/multi-step-form"

export const metadata: Metadata = {
  title: "Request a Consultation | Atlas Technosoft",
  description:
    "Fill out our detailed consultation request form to get started with Atlas Technosoft's enterprise solutions. Our team will analyze your business needs and provide tailored recommendations.",
  openGraph: {
    title: "Request a Consultation | Atlas Technosoft",
    description:
      "Fill out our detailed consultation request form to get started with Atlas Technosoft's enterprise solutions. Our team will analyze your business needs and provide tailored recommendations.",
    url: "https://atlastechnosoft.com/contact/request-form",
    type: "website",
  },
}

export default function RequestFormPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
    { name: "Request Form", url: "/contact/request-form" },
  ]

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Request a Consultation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Fill out the form below to request a personalized consultation with our experts. We&apos;ll analyze your business
            needs and provide tailored recommendations.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8"></div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 lg:p-10 border border-border/50">
          <MultiStepForm />
        </div>
      </div>

      {/* Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
    </main>
  )
}
