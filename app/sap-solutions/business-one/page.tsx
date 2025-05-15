import React from 'react';
import type { Metadata } from "next"
import { ProductSEO } from "@/components/seo/page-seo"
import {  SapBusinessOneHero as _SapBusinessOneHero } from "@/components/sap/sap-business-one-hero"
import {  SapBusinessOneFeatures as _SapBusinessOneFeatures } from "@/components/sap/sap-business-one-features"
import {  SapBusinessOneModules as _SapBusinessOneModules } from "@/components/sap/sap-business-one-modules"
import {  SapBusinessOneBenefits as _SapBusinessOneBenefits } from "@/components/sap/sap-business-one-benefits"
import {  SapBusinessOneFaq as _SapBusinessOneFaq } from "@/components/sap/sap-business-one-faq"
import {  SapBusinessOneCta as _SapBusinessOneCta } from "@/components/sap/sap-business-one-cta"
import {  CriticalImagePreloader as _CriticalImagePreloader } from "@/components/common/performance/critical-image-preloader"
import { BusinessOneContent } from './components/business-one-content'

// Primary and secondary keywords for better optimization
const PRIMARY_KEYWORDS = [
  "SAP Business One",
  "SAP B1",
  "ERP for SMBs",
  "Small business ERP",
  "SAP Business One 2025",
];

const SECONDARY_KEYWORDS = [
  "SAP Partner",
  "AI-powered ERP",
  "Business Technology Platform", 
  "Cloud ERP solution",
  "SAP implementation",
  "SMB software",
  "Business intelligence",
  "BTP integration",
  "Financial management software",
  "Inventory management system",
];

// Critical images for the page that should be preloaded
const CRITICAL_IMAGES = [
  "/images/sap/business-one-hero.webp",
  "/images/sap/business-one-dashboard.webp",
  "/images/partners/sap-partner.svg",
];

// Business One FAQ data for the structured data
const BUSINESS_ONE_FAQS = [
  {
    question: "What is SAP Business One?",
    answer: "SAP Business One is an integrated enterprise resource planning (ERP) solution designed specifically for small and medium-sized businesses. It helps streamline operations, gain real-time insights, and accelerate growth by integrating all core business functions including financials, sales, customer relationships, inventory, and operations."
  },
  {
    question: "How long does a typical SAP Business One implementation take?",
    answer: "The implementation timeline varies depending on the complexity of your business and specific requirements. A standard implementation typically takes 2-3 months, while more complex projects may take 4-6 months. Our team works closely with you to establish a realistic timeline and ensure a smooth implementation process."
  },
  {
    question: "What is the difference between SAP Business One on-premise and cloud deployment?",
    answer: "On-premise deployment involves installing SAP Business One on your own servers, giving you complete control over your data and infrastructure. Cloud deployment, on the other hand, is hosted on remote servers, offering flexibility, accessibility from anywhere, and reduced IT infrastructure costs. Both options have their advantages, and our team can help you determine which is best for your business."
  },
  {
    question: "How does SAP Business One integrate with other systems?",
    answer: "SAP Business One offers robust integration capabilities through its Integration Framework and APIs. It can integrate with other SAP solutions, third-party applications, e-commerce platforms, and custom systems. Our team has extensive experience in integrating SAP Business One with various systems to ensure seamless data flow across your business."
  },
  {
    question: "Is SAP Business One suitable for my industry?",
    answer: "SAP Business One is designed to be industry-agnostic but can be customized for specific industry requirements. We have successfully implemented SAP Business One across various industries including manufacturing, retail, wholesale distribution, professional services, and more. Our industry-specific solutions address the unique challenges and requirements of each sector."
  }
];

export const metadata: Metadata = {
  title: "SAP Business One 2025 | AI-Powered ERP for Small & Midsize Businesses",
  description:
    "SAP Business One 2025 delivers AI-powered ERP with enhanced web client, BTP integration, and flexible deployment (cloud/on-premise). Transform your business with real-time dashboards and 40+ industry solutions from an official SAP Partner.",
  keywords: [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].join(", "),
  openGraph: {
    title: "SAP Business One 2025 | AI-Powered ERP for Small & Midsize Businesses",
    description: "Transform your business with SAP Business One 2025 - featuring enhanced web client, SAP Business AI capabilities, and BTP integration. Flexible deployment options with transparent pricing starting at €38/month.",
    type: "website",
    url: "https://www.atlastechnosoft.com/sap-solutions/business-one",
    images: [
      {
        url: "/images/sap/business-one-og.jpg",
        width: 1200,
        height: 630,
        alt: "SAP Business One 2025 Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Business One 2025 | AI-Powered ERP for SMBs",
    description: "Transform your business with SAP Business One 2025 - AI-powered ERP with enhanced web client, BTP integration & flexible deployment options.",
    images: ["/images/sap/business-one-og.jpg"],
  },
  alternates: {
    canonical: "https://www.atlastechnosoft.com/sap-solutions/business-one",
  },
}

/**
 * SAP Business One page with comprehensive SEO optimizations
 */
export default function SAPBusinessOnePage() {
  return (
    <>
      {/* Product-specific SEO metadata and structured data */}
      <ProductSEO
        title="SAP Business One | Complete ERP Solution for SMBs"
        description="SAP Business One is a comprehensive ERP solution designed specifically for small and medium-sized businesses. Streamline operations, gain insights, and drive growth."
        canonicalUrl="/sap-solutions/business-one"
        image="/images/products/sap-business-one.jpg"
        categoryBreadcrumbs={[
          { name: "SAP Solutions", url: "/sap-solutions" }
        ]}
      />
      
      {/* Main content component (client component) */}
      <BusinessOneContent 
        faqs={BUSINESS_ONE_FAQS}
        criticalImages={CRITICAL_IMAGES}
      />
    </>
  );
}
