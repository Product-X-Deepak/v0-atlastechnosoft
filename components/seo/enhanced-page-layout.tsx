"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { MobileOptimizedLayout } from '@/components/layout/mobile-optimized-layout';
import { TopicClusters } from '@/components/seo/topic-cluster';
import { RelatedContent } from '@/components/seo/related-content';
import { getRelatedPages } from '@/lib/utils/internal-linking';
import { cn } from '@/lib/utils';

interface EnhancedPageLayoutProps {
  /**
   * Main content of the page
   */
  children: React.ReactNode;
  
  /**
   * Optional class name for the container
   */
  className?: string;
  
  /**
   * Whether to show topic clusters section
   * @default true
   */
  showTopicClusters?: boolean;
  
  /**
   * Whether to show related content section
   * @default true
   */
  showRelatedContent?: boolean;
  
  /**
   * Whether to apply mobile optimizations
   * @default true
   */
  applyMobileOptimizations?: boolean;
  
  /**
   * Title for the related content section
   * @default "Related Content"
   */
  relatedContentTitle?: string;
  
  /**
   * Maximum number of topic clusters to show
   * @default 3
   */
  maxTopicClusters?: number;
  
  /**
   * Maximum number of related content items to show
   * @default 6
   */
  maxRelatedItems?: number;
}

/**
 * A comprehensive page layout component that combines:
 * 1. Mobile optimizations for better Core Web Vitals
 * 2. Topic clusters for enhanced semantic relationships
 * 3. Related content for improved internal linking
 * 
 * This component applies all the SEO enhancements in one place.
 */
export function EnhancedPageLayout({
  children,
  className,
  showTopicClusters = true,
  showRelatedContent = true,
  applyMobileOptimizations = true,
  relatedContentTitle = "Related Content",
  maxTopicClusters = 3,
  maxRelatedItems = 6,
}: EnhancedPageLayoutProps) {
  const pathname = usePathname() || '';
  
  // Get related content items for the current page
  const relatedItems = showRelatedContent 
    ? getRelatedPages(pathname, { limit: maxRelatedItems })
    : [];
  
  // Wrap content with optimizations conditionally
  const content = (
    <div className={cn("enhanced-page-content", className)}>
      {/* Main content */}
      <div className="main-content">
        {children}
      </div>
      
      {/* Topic clusters section */}
      {showTopicClusters && (
        <TopicClusters 
          maxClusters={maxTopicClusters} 
          maxPagesPerCluster={4}
        />
      )}
      
      {/* Related content section */}
      {showRelatedContent && relatedItems.length > 0 && (
        <RelatedContent 
          title={relatedContentTitle}
          items={relatedItems}
        />
      )}
      
      {/* Hidden semantic content for improved SEO */}
      <div className="visually-hidden" aria-hidden="true">
        <h2>Additional Resources and Related Information</h2>
        <p>
          This page is part of our comprehensive guide to help you understand and implement 
          solutions for your business needs. Explore related topics and additional resources.
        </p>
      </div>
    </div>
  );
  
  // Apply mobile optimizations if enabled
  return applyMobileOptimizations 
    ? <MobileOptimizedLayout>{content}</MobileOptimizedLayout>
    : content;
}

/**
 * A specialized version of EnhancedPageLayout for product pages
 * with more focused topic clustering and content relationships
 */
export function ProductPageLayout({
  children,
  className,
  productCategory,
  relatedProductCategories = [],
}: {
  children: React.ReactNode;
  className?: string;
  productCategory: string;
  relatedProductCategories?: string[];
}) {
  const pathname = usePathname() || '';
  
  // Get related products with priority for the specified category (unused but kept for future implementation)
  const _relatedItems = getRelatedPages(pathname, { 
    limit: 3,
    priorityCategories: ['sap', 'automation', 'services'],
  });
  
  return (
    <EnhancedPageLayout
      className={className}
      showTopicClusters={true}
      showRelatedContent={true}
      relatedContentTitle={`Related ${productCategory} Solutions`}
      maxRelatedItems={3}
    >
      {children}
      
      {/* Product-specific semantic content */}
      <div className="visually-hidden" aria-hidden="true">
        <h2>About {productCategory} Solutions</h2>
        <p>
          Our {productCategory} solutions are designed to help businesses optimize their operations,
          improve efficiency, and drive digital transformation. Explore our offerings and learn how
          we can help your business succeed.
        </p>
        {relatedProductCategories.map((category, index) => (
          <p key={index}>
            {category} integration capabilities allow for seamless connectivity with your existing systems.
          </p>
        ))}
      </div>
    </EnhancedPageLayout>
  );
}

/**
 * A specialized version of EnhancedPageLayout for industry pages
 * that highlights industry-specific solutions
 */
export function IndustryPageLayout({
  children,
  className,
  industryName,
}: {
  children: React.ReactNode;
  className?: string;
  industryName: string;
}) {
  const pathname = usePathname() || '';
  
  // Get related industries and solutions (unused but kept for future implementation)
  const _relatedItems = getRelatedPages(pathname, { 
    limit: 6,
    priorityCategories: ['industries', 'sap', 'automation'],
  });
  
  return (
    <EnhancedPageLayout
      className={className}
      showTopicClusters={true}
      showRelatedContent={true}
      relatedContentTitle={`Solutions for ${industryName}`}
    >
      {children}
      
      {/* Industry-specific semantic content */}
      <div className="visually-hidden" aria-hidden="true">
        <h2>{industryName} Industry Solutions</h2>
        <p>
          Our comprehensive {industryName.toLowerCase()} industry solutions are designed to address
          the specific challenges and opportunities in your sector. We provide tailored digital
          transformation strategies to improve operational efficiency, enhance customer experience,
          and drive business growth.
        </p>
      </div>
    </EnhancedPageLayout>
  );
} 