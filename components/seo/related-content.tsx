"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Suspense } from "react"

export interface RelatedItem {
  title: string;
  description?: string;
  href: string;
  category?: string;
  importance?: 'primary' | 'secondary' | 'tertiary';
}

interface RelatedContentProps {
  /**
   * Title for the related content section
   */
  title?: string;
  
  /**
   * Description for the related content section
   */
  description?: string;
  
  /**
   * Related content items to display
   */
  items: RelatedItem[];
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * How many columns to display on larger screens
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4;
  
  /**
   * Whether to group items by category
   * @default false
   */
  groupByCategory?: boolean;
  
  /**
   * Whether to sort items by importance
   * @default true
   */
  sortByImportance?: boolean;
}

/**
 * Displays semantically related content with proper internal linking
 * for better SEO and improved user navigation
 */
function RelatedContent({
  title = "Related Content",
  description,
  items = [],
  className = "",
  columns = 3,
  groupByCategory = false,
  sortByImportance = true
}: RelatedContentProps) {
  // Sort items by importance if specified
  const sortedItems = sortByImportance 
    ? [...items].sort((a, b) => {
        const importanceOrder = { primary: 1, secondary: 2, tertiary: 3 };
        const aOrder = a.importance ? importanceOrder[a.importance] : 999;
        const bOrder = b.importance ? importanceOrder[b.importance] : 999;
        return aOrder - bOrder;
      })
    : items;
  
  // Group items by category if specified
  const groupedItems = groupByCategory
    ? sortedItems.reduce<Record<string, RelatedItem[]>>((acc, item) => {
        const category = item.category || 'Other';
        acc[category] = acc[category] || [];
        acc[category].push(item);
        return acc;
      }, {})
    : { 'All': sortedItems };
  
  // Determine grid columns
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];
  
  return (
    <section className={cn('py-8', className)} aria-labelledby="related-content-heading">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <h2 
            id="related-content-heading" 
            className="text-2xl font-bold tracking-tight"
          >
            {title}
          </h2>
          
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        
        {/* If grouping by category, render each category separately */}
        {groupByCategory ? (
          Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className={cn("grid gap-4", gridCols)}>
                {categoryItems.map((item, index) => (
                  <RelatedContentCard key={item.href + index} item={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={cn("grid gap-4", gridCols)}>
            {sortedItems.map((item, index) => (
              <RelatedContentCard key={item.href + index} item={item} />
            ))}
          </div>
        )}
        
        {/* Hidden semantic links for SEO - these improve internal linking without affecting layout */}
        <div className="visually-hidden">
          <h3>Explore more related topics:</h3>
          <ul>
            {sortedItems.map((item, index) => (
              <li key={`semantic-${index}`}>
                <Link href={item.href}>
                  <span>{item.title}</span>
                  {item.category && <span> - {item.category}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual card for a related content item
 */
function RelatedContentCard({ item }: { item: RelatedItem }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link 
        href={item.href} 
        className="block h-full" 
        aria-label={`Read more about ${item.title}`}
      >
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-2 text-lg">
            {item.title}
          </CardTitle>
        </CardHeader>
        
        {item.description && (
          <CardContent className="p-4 pt-0">
            <CardDescription className="line-clamp-3">
              {item.description}
            </CardDescription>
          </CardContent>
        )}
      </Link>
    </Card>
  );
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RelatedContentWrapper(props: RelatedContentProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RelatedContent {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RelatedContentWrapper as RelatedContent };