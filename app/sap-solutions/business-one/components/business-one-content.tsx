"use client";

import React from 'react';
import { SapBusinessOneHero } from '@/components/sap/sap-business-one-hero';
import { SapBusinessOneFeatures } from '@/components/sap/sap-business-one-features';
import { SapBusinessOneModules } from '@/components/sap/sap-business-one-modules';
import { SapBusinessOneBenefits } from '@/components/sap/sap-business-one-benefits';
import { SapBusinessOneFaq } from '@/components/sap/sap-business-one-faq';
import { SapBusinessOneCta } from '@/components/sap/sap-business-one-cta';
import { CriticalImagePreloader } from '@/components/common/performance/critical-image-preloader';
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo"
import { Suspense } from "react"

interface BusinessOneContentProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  criticalImages: string[];
}

/**
 * Client component that contains all the interactive parts of the Business One page
 */
function BusinessOneContent({ faqs, criticalImages }: BusinessOneContentProps) {
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "SAP Solutions", url: "/sap-solutions" },
    { name: "Business One", url: "/sap-solutions/business-one" },
  ]

  return (
    <div className="flex flex-col" itemScope itemType="https://schema.org/Product">
      {/* Preload critical images */}
      <CriticalImagePreloader 
        imagePaths={criticalImages}
        disableOnSlowConnection={true}
      />

      {/* Additional structured data */}
      <StructuredData data={generateServiceSchema(
        "SAP Business One",
        "Transform your business with SAP Business One - a comprehensive ERP solution designed specifically for small and medium-sized businesses. Streamline operations, gain insights, and drive growth.",
        "/sap-solutions/business-one",
        "/images/sap/business-one-hero.webp"
      )} />
      <StructuredData data={generateFaqSchema(faqs)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
      
      {/* Global structured data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      
      {/* Semantic HTML structure with hidden elements for search engines */}
      <header className="visually-hidden">
        <h1 itemProp="name">SAP Business One: Complete ERP Solution for Small and Medium Businesses</h1>
        <div itemProp="description">
          SAP Business One is a comprehensive enterprise resource planning (ERP) solution designed
          specifically for small and medium-sized businesses. It offers an integrated suite of
          applications that streamline operations, provide real-time insights, and help drive
          profitable growth with AI-powered capabilities.
        </div>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="SAP" />
        </div>
      </header>
      
      {/* Main content sections */}
      <main>
        <SapBusinessOneHero />
        
        <section id="features">
          <SapBusinessOneFeatures />
        </section>
        
        <section id="modules">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <SapBusinessOneModules />
          </Suspense>
        </section>
        
        <section id="benefits">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <SapBusinessOneBenefits />
          </Suspense>
        </section>
        
        <section id="faq">
          <Suspense fallback={<div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md"></div>}>
            <SapBusinessOneFaq faqs={faqs} />
          </Suspense>
        </section>
        
        <section id="cta">
          <SapBusinessOneCta />
        </section>
      </main>
      
      {/* Hidden content with additional semantic information for SEO */}
      <div className="visually-hidden">
        <h2>Why Choose SAP Business One?</h2>
        <ul>
          <li>30% more efficient operations with integrated business processes</li>
          <li>Real-time visibility across all departments</li>
          <li>AI-powered insights for better decision making</li>
          <li>Streamlined financial operations and reporting</li>
          <li>Enhanced customer relationship management</li>
          <li>Mobile access for anywhere, anytime business management</li>
          <li>Implementation by certified SAP Partner with proven expertise</li>
        </ul>
        
        <h2>SAP Business One Technical Capabilities</h2>
        <p>
          SAP Business One provides comprehensive functionality that covers all essential business processes.
          Financial Management delivers automated accounting processes, real-time cash flow visibility, and
          fixed asset management. Sales and CRM features include opportunity management, campaign tracking,
          and customer service management. Purchasing and Inventory enables streamlined procurement, warehouse
          management, and multi-location inventory control. The Production module supports bill of materials
          management, production planning, and cost tracking. Business Intelligence features offer interactive
          dashboards, AI-assisted analytics, and predictive insights for better decision making.
        </p>
      </div>
    </div>
  );
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function BusinessOneContentWrapper(props: BusinessOneContentProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BusinessOneContent {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { BusinessOneContentWrapper as BusinessOneContent };