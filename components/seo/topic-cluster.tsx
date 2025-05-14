"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelatedPages, getRelatedTopics, TopicCluster, topicClusters, contentGraph } from '@/lib/utils/internal-linking';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from "react"

interface TopicClusterProps {
  /**
   * Topic cluster to display
   */
  cluster: TopicCluster;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Maximum number of pages to display
   * @default 5
   */
  maxPages?: number;
  
  /**
   * Maximum number of topics to display
   * @default 8
   */
  maxTopics?: number;
  
  /**
   * Whether to show related topics section
   * @default true
   */
  showRelatedTopics?: boolean;
}

/**
 * Component to visualize a topic cluster with its related pages and topics
 * This enhances internal linking and topic relevance for SEO
 */
function TopicClusterCard({
  cluster,
  className,
  maxPages = 5,
  maxTopics = 8,
  showRelatedTopics = true
}: TopicClusterProps) {
  const clusterData = topicClusters[cluster];
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold">{clusterData.name}</CardTitle>
        <CardDescription>{clusterData.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {/* Primary pages in this cluster */}
          <div>
            <h4 className="text-sm font-medium mb-2">Related Pages</h4>
            <ul className="space-y-1">
              {clusterData.primaryPages.slice(0, maxPages).map((pagePath) => (
                <li key={pagePath} className="text-sm">
                  <Link 
                    href={pagePath}
                    className="text-primary hover:underline"
                  >
                    {getPageTitle(pagePath)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Related keywords */}
          {showRelatedTopics && (
            <div>
              <h4 className="text-sm font-medium mb-2">Related Topics</h4>
              <div className="flex flex-wrap gap-1">
                {clusterData.relatedKeywords.slice(0, maxTopics).map((keyword) => (
                  <span 
                    key={keyword}
                    className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Component that displays multiple topic clusters based on the current page
 */
export function TopicClusters({
  className,
  maxClusters = 3,
  maxPagesPerCluster = 4,
}: {
  className?: string;
  maxClusters?: number;
  maxPagesPerCluster?: number;
}) {
  const pathname = usePathname() || '';
  const relevantClusters = getRelevantClusters(pathname, maxClusters);
  
  if (relevantClusters.length === 0) return null;
  
  return (
    <section 
      className={cn('py-8', className)} 
      aria-labelledby="topic-clusters-heading"
    >
      <div className="container px-4 md:px-6">
        <h2 
          id="topic-clusters-heading" 
          className="text-2xl font-bold tracking-tight mb-6"
        >
          Related Topics
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relevantClusters.map((cluster) => (
            <TopicClusterCard 
              key={cluster} 
              cluster={cluster} 
              maxPages={maxPagesPerCluster}
            />
          ))}
        </div>
        
        {/* Hidden semantic content for SEO */}
        <div className="visually-hidden">
          <h3>Explore more topics related to {getPageTitle(pathname)}:</h3>
          <ul>
            {getRelatedTopics(pathname).slice(0, 15).map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Get the most relevant topic clusters for a page
 */
function getRelevantClusters(path: string, limit: number): TopicCluster[] {
  // Get all topic clusters
  const allClusters = Object.keys(topicClusters) as TopicCluster[];
  
  // Find clusters that include this page as a primary page
  const primaryClusters = allClusters.filter(
    cluster => topicClusters[cluster].primaryPages.includes(path)
  );
  
  // If we have enough primary clusters, return those
  if (primaryClusters.length >= limit) {
    return primaryClusters.slice(0, limit);
  }
  
  // Otherwise, find related pages and their clusters
  const relatedItems = getRelatedPages(path, { limit: 6 });
  const relatedPaths = relatedItems.map(item => item.href);
  
  // Find clusters that include related pages
  const secondaryClusters = allClusters.filter(
    cluster => !primaryClusters.includes(cluster) && 
      topicClusters[cluster].primaryPages.some(page => relatedPaths.includes(page))
  );
  
  // Combine primary and secondary clusters up to the limit
  return [...primaryClusters, ...secondaryClusters].slice(0, limit);
}

/**
 * Get the title for a page path
 */
function getPageTitle(path: string): string {
  try {
    return contentGraph[path]?.title || path;
  } catch {
    return path;
  }
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function TopicClusterCardWrapper(props: TopicClusterProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <TopicClusterCard {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { TopicClusterCardWrapper as TopicClusterCard };