"use client"

import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { Container } from "@/components/ui/container"
import { IndustriesSection } from "@/components/sections/industries-section"

// Loading fallbacks
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export default function IndustriesPageContent() {
  return (
    <div className="relative">
      <PageHeader
        title="Industry-Specific Solutions"
        description="Specialized technology solutions tailored to your industry's unique challenges"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Industries", href: "/industries" },
        ]}
      />
      <Container className="py-12 space-y-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Solutions for Every Industry</h2>
          <p>
            At Atlas Technosoft, we understand that each industry faces unique challenges. 
            Our specialized solutions are designed to address the specific needs of your sector, 
            providing tailored technology that drives efficiency, compliance, and growth.
          </p>
        </div>
        
        <Suspense fallback={<SectionLoading />}>
          <IndustriesSection />
        </Suspense>
      </Container>
    </div>
  )
} 