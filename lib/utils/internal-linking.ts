/**
 * Internal linking utilities for improved SEO
 * These functions help build better content relationships and internal linking structures
 */

import type { RelatedItem } from '@/components/seo/related-content';

// Content categories for classification
export type ContentCategory = 
  | 'sap'
  | 'automation'
  | 'industries'
  | 'services'
  | 'company'
  | 'blog';

// Topic clusters for deeper semantic relationships
export type TopicCluster =
  | 'erp_solutions'
  | 'cloud_computing'
  | 'business_automation'
  | 'industry_solutions'
  | 'digital_transformation'
  | 'data_analytics'
  | 'company_info';

/**
 * Content node representing a page in the site structure
 */
export interface ContentNode {
  /**
   * URL path of the page
   */
  path: string;
  
  /**
   * Page title
   */
  title: string;
  
  /**
   * Brief description of the page
   */
  description?: string;
  
  /**
   * Primary content category
   */
  primaryCategory: ContentCategory;
  
  /**
   * Secondary categories (if applicable)
   */
  secondaryCategories?: ContentCategory[];
  
  /**
   * Topic clusters this content belongs to
   */
  topicClusters?: TopicCluster[];
  
  /**
   * Keywords associated with this content
   */
  keywords?: string[];
  
  /**
   * Whether this is a high-priority page
   */
  isPriority?: boolean;
  
  /**
   * Parent page in the hierarchy
   */
  parent?: string;
  
  /**
   * Additional related pages (manual connections)
   */
  relatedPages?: string[];
  
  /**
   * Semantic context - related topics that don't have their own pages
   */
  semanticContext?: string[];
}

/**
 * Central site content graph for maintaining page relationships
 * This ensures consistent cross-linking and content discovery
 */
export const contentGraph: Record<string, ContentNode> = {
  '/': {
    path: '/',
    title: 'Home',
    primaryCategory: 'company',
    keywords: ['atlas technosoft', 'enterprise solutions', 'digital transformation'],
    isPriority: true,
    topicClusters: ['digital_transformation', 'company_info'],
    semanticContext: ['digital solutions', 'business technology', 'enterprise software'],
  },
  
  // SAP Solutions
  '/sap-solutions/business-one': {
    path: '/sap-solutions/business-one',
    title: 'SAP Business One',
    description: 'Complete ERP solution for small and medium businesses',
    primaryCategory: 'sap',
    secondaryCategories: ['services'],
    keywords: ['sap business one', 'erp', 'small business', 'medium business'],
    isPriority: true,
    parent: '/',
    relatedPages: ['/sap-solutions/business-one-cloud', '/sap-solutions/hana'],
    topicClusters: ['erp_solutions', 'digital_transformation'],
    semanticContext: ['business management software', 'integrated ERP', 'SMB solutions'],
  },
  '/sap-solutions/business-one-cloud': {
    path: '/sap-solutions/business-one-cloud',
    title: 'SAP Business One Cloud',
    description: 'Cloud-based ERP solution with flexible deployment options',
    primaryCategory: 'sap',
    secondaryCategories: ['services'],
    keywords: ['sap business one cloud', 'cloud erp', 'saas'],
    isPriority: true,
    parent: '/sap-solutions/business-one',
    relatedPages: ['/sap-solutions/business-one', '/sap-solutions/hana'],
    topicClusters: ['erp_solutions', 'cloud_computing', 'digital_transformation'],
    semanticContext: ['cloud deployment', 'SaaS ERP', 'flexible hosting'],
  },
  '/sap-solutions/hana': {
    path: '/sap-solutions/hana',
    title: 'SAP HANA',
    description: 'In-memory computing platform for real-time analytics',
    primaryCategory: 'sap',
    secondaryCategories: ['services'],
    keywords: ['sap hana', 'in-memory database', 'real-time analytics'],
    isPriority: true,
    parent: '/',
    relatedPages: ['/sap-solutions/business-one', '/sap-solutions/erp-planning'],
    topicClusters: ['data_analytics', 'digital_transformation'],
    semanticContext: ['in-memory computing', 'business intelligence', 'data processing'],
  },
  '/sap-solutions/erp-planning': {
    path: '/sap-solutions/erp-planning',
    title: 'ERP Planning',
    description: 'Strategic ERP planning and implementation services',
    primaryCategory: 'sap',
    secondaryCategories: ['services'],
    keywords: ['erp planning', 'erp implementation', 'digital transformation'],
    parent: '/',
    relatedPages: ['/sap-solutions/business-one', '/sap-solutions/hana'],
    topicClusters: ['erp_solutions', 'digital_transformation'],
    semanticContext: ['implementation strategy', 'change management', 'business process reengineering'],
  },
  
  // Automation Solutions
  '/automation-solutions/rpa-solutions': {
    path: '/automation-solutions/rpa-solutions',
    title: 'RPA Solutions',
    description: 'Robotic Process Automation for business efficiency',
    primaryCategory: 'automation',
    secondaryCategories: ['services'],
    keywords: ['rpa', 'robotic process automation', 'business automation'],
    isPriority: true,
    parent: '/',
    relatedPages: ['/automation-solutions/ui-path', '/automation-solutions/workflow-automation'],
    topicClusters: ['business_automation', 'digital_transformation'],
    semanticContext: ['process automation', 'business efficiency', 'digital workforce'],
  },
  '/automation-solutions/ui-path': {
    path: '/automation-solutions/ui-path',
    title: 'UiPath Solutions',
    description: 'UiPath-based automation solutions for enterprise',
    primaryCategory: 'automation',
    secondaryCategories: ['services'],
    keywords: ['uipath', 'rpa platform', 'enterprise automation'],
    parent: '/automation-solutions/rpa-solutions',
    relatedPages: ['/automation-solutions/rpa-solutions', '/automation-solutions/workflow-automation'],
    topicClusters: ['business_automation'],
    semanticContext: ['UiPath platform', 'automation development', 'bot orchestration'],
  },
  '/automation-solutions/workflow-automation': {
    path: '/automation-solutions/workflow-automation',
    title: 'Workflow Automation',
    description: 'End-to-end workflow automation for business processes',
    primaryCategory: 'automation',
    secondaryCategories: ['services'],
    keywords: ['workflow automation', 'business process', 'digital workflow'],
    parent: '/',
    relatedPages: ['/automation-solutions/rpa-solutions', '/automation-solutions/ui-path'],
    topicClusters: ['business_automation', 'digital_transformation'],
    semanticContext: ['process workflow', 'business efficiency', 'approval automation'],
  },
  
  // Industries
  '/industries/manufacturing': {
    path: '/industries/manufacturing',
    title: 'Manufacturing Industry Solutions',
    description: 'Digital solutions for manufacturing businesses',
    primaryCategory: 'industries',
    secondaryCategories: ['sap', 'automation'],
    keywords: ['manufacturing erp', 'industry 4.0', 'smart manufacturing'],
    isPriority: true,
    parent: '/industries',
    relatedPages: ['/sap-solutions/business-one', '/automation-solutions/rpa-solutions'],
    topicClusters: ['industry_solutions', 'erp_solutions'],
    semanticContext: ['production planning', 'supply chain', 'quality management'],
  },
  '/industries/retail': {
    path: '/industries/retail',
    title: 'Retail Industry Solutions',
    description: 'Digital solutions for retail businesses',
    primaryCategory: 'industries',
    secondaryCategories: ['sap', 'automation'],
    keywords: ['retail management', 'omnichannel', 'pos integration'],
    isPriority: true,
    parent: '/industries',
    relatedPages: ['/sap-solutions/business-one', '/automation-solutions/workflow-automation'],
    topicClusters: ['industry_solutions', 'business_automation'],
    semanticContext: ['inventory management', 'point of sale', 'omnichannel retail'],
  },
  '/industries/distribution': {
    path: '/industries/distribution',
    title: 'Distribution Industry Solutions',
    description: 'Digital solutions for distribution businesses',
    primaryCategory: 'industries',
    secondaryCategories: ['sap', 'automation'],
    keywords: ['distribution management', 'supply chain', 'logistics'],
    isPriority: true,
    parent: '/industries',
    relatedPages: ['/sap-solutions/business-one', '/industries/manufacturing'],
    topicClusters: ['industry_solutions', 'erp_solutions'],
    semanticContext: ['logistics', 'inventory control', 'supply chain management'],
  },
  
  // Company pages
  '/about': {
    path: '/about',
    title: 'About Atlas Technosoft',
    description: 'Our journey, mission, and values',
    primaryCategory: 'company',
    keywords: ['about atlas technosoft', 'company history', 'mission vision'],
    isPriority: true,
    parent: '/',
    relatedPages: ['/contact', '/careers'],
    topicClusters: ['company_info'],
    semanticContext: ['company mission', 'values', 'team expertise'],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us',
    description: 'Get in touch with our team',
    primaryCategory: 'company',
    keywords: ['contact atlas technosoft', 'support', 'business inquiry'],
    isPriority: true,
    parent: '/',
    relatedPages: ['/about', '/services'],
    topicClusters: ['company_info'],
    semanticContext: ['support', 'business inquiries', 'consultation'],
  },
  '/blog': {
    path: '/blog',
    title: 'Blog',
    description: 'Insights, news, and updates',
    primaryCategory: 'blog',
    keywords: ['atlas technosoft blog', 'erp insights', 'technology news'],
    isPriority: true,
    parent: '/',
    topicClusters: ['digital_transformation', 'company_info'],
    semanticContext: ['industry insights', 'technology trends', 'best practices'],
  },
};

// Topic cluster definitions for semantic connections
export const topicClusters: Record<TopicCluster, {
  name: string;
  description: string;
  primaryPages: string[];
  relatedKeywords: string[];
}> = {
  erp_solutions: {
    name: 'ERP Solutions',
    description: 'Enterprise Resource Planning software and implementations',
    primaryPages: ['/sap-solutions/business-one', '/sap-solutions/business-one-cloud', '/sap-solutions/erp-planning'],
    relatedKeywords: ['erp', 'enterprise planning', 'business management', 'sap'],
  },
  cloud_computing: {
    name: 'Cloud Computing',
    description: 'Cloud-based solutions and services',
    primaryPages: ['/sap-solutions/business-one-cloud'],
    relatedKeywords: ['cloud', 'saas', 'cloud hosting', 'cloud deployment'],
  },
  business_automation: {
    name: 'Business Automation',
    description: 'Automation solutions for business processes',
    primaryPages: ['/automation-solutions/rpa-solutions', '/automation-solutions/ui-path', '/automation-solutions/workflow-automation'],
    relatedKeywords: ['automation', 'rpa', 'workflow', 'business process'],
  },
  industry_solutions: {
    name: 'Industry Solutions',
    description: 'Industry-specific business solutions',
    primaryPages: ['/industries/manufacturing', '/industries/retail', '/industries/distribution'],
    relatedKeywords: ['industry', 'manufacturing', 'retail', 'distribution'],
  },
  digital_transformation: {
    name: 'Digital Transformation',
    description: 'Business transformation through digital technologies',
    primaryPages: ['/', '/sap-solutions/business-one', '/automation-solutions/rpa-solutions'],
    relatedKeywords: ['digital transformation', 'business innovation', 'technology adoption'],
  },
  data_analytics: {
    name: 'Data Analytics',
    description: 'Data analysis and business intelligence',
    primaryPages: ['/sap-solutions/hana'],
    relatedKeywords: ['analytics', 'business intelligence', 'data processing', 'real-time analytics'],
  },
  company_info: {
    name: 'Company Information',
    description: 'Information about Atlas Technosoft',
    primaryPages: ['/about', '/contact'],
    relatedKeywords: ['atlas technosoft', 'company', 'contact', 'about us'],
  },
};

/**
 * Get related pages for a given page path with improved topic clustering
 * 
 * @param path Current page path
 * @param options Configuration options
 * @returns Array of related content items
 */
export function getRelatedPages(
  path: string,
  options: {
    /**
     * Maximum number of related pages to return
     * @default 6
     */
    limit?: number;
    
    /**
     * Whether to include parent page in the results
     * @default true
     */
    includeParent?: boolean;
    
    /**
     * Whether to include pages from the same category
     * @default true
     */
    includeSameCategory?: boolean;
    
    /**
     * Categories to prioritize in the results
     */
    priorityCategories?: ContentCategory[];
    
    /**
     * Topic clusters to prioritize in the results
     */
    priorityClusters?: TopicCluster[];
  } = {}
): RelatedItem[] {
  const {
    limit = 6,
    includeParent = true,
    includeSameCategory = true,
    priorityCategories = [],
    priorityClusters = [],
  } = options;
  
  // Get current page from content graph
  const currentPage = contentGraph[path];
  if (!currentPage) return [];
  
  const result: RelatedItem[] = [];
  const addedPaths = new Set<string>();
  
  // Add the current page to prevent it from being included
  addedPaths.add(path);
  
  // Function to add a page to the results
  const addPageToResults = (pagePath: string, importance: 'primary' | 'secondary' | 'tertiary' = 'secondary') => {
    if (addedPaths.has(pagePath) || !contentGraph[pagePath]) return;
    
    const page = contentGraph[pagePath];
    result.push({
      title: page.title,
      description: page.description,
      href: page.path,
      category: page.primaryCategory,
      importance,
    });
    
    addedPaths.add(pagePath);
  };
  
  // 1. Add explicitly related pages first (highest priority)
  if (currentPage.relatedPages) {
    currentPage.relatedPages.forEach(pagePath => {
      addPageToResults(pagePath, 'primary');
    });
  }
  
  // 2. Add parent page if enabled
  if (includeParent && currentPage.parent) {
    addPageToResults(currentPage.parent, 'primary');
  }
  
  // 3. Add pages from same topic clusters (new semantic relationship)
  if (currentPage.topicClusters && currentPage.topicClusters.length > 0) {
    // First add priority clusters if specified
    if (priorityClusters.length > 0) {
      const relevantClusters = currentPage.topicClusters.filter(cluster => 
        priorityClusters.includes(cluster)
      );
      
      relevantClusters.forEach(cluster => {
        topicClusters[cluster].primaryPages
          .filter(pagePath => pagePath !== path && !addedPaths.has(pagePath))
          .forEach(pagePath => {
            addPageToResults(pagePath, 'primary');
          });
      });
    } else {
      // Add from all clusters this page belongs to
      currentPage.topicClusters.forEach(cluster => {
        topicClusters[cluster].primaryPages
          .filter(pagePath => pagePath !== path && !addedPaths.has(pagePath))
          .forEach(pagePath => {
            addPageToResults(pagePath, 'secondary');
          });
      });
    }
  }
  
  // 4. Add pages from priority categories
  if (priorityCategories.length > 0) {
    Object.values(contentGraph)
      .filter(page => 
        priorityCategories.includes(page.primaryCategory) &&
        !addedPaths.has(page.path)
      )
      .sort((a, b) => (b.isPriority ? 1 : 0) - (a.isPriority ? 1 : 0))
      .forEach(page => {
        addPageToResults(page.path, 'secondary');
      });
  }
  
  // 5. Add pages from the same primary category
  if (includeSameCategory) {
    Object.values(contentGraph)
      .filter(page => 
        page.primaryCategory === currentPage.primaryCategory &&
        !addedPaths.has(page.path)
      )
      .forEach(page => {
        addPageToResults(page.path, 'secondary');
      });
  }
  
  // 6. Add pages from the same secondary categories
  if (currentPage.secondaryCategories) {
    currentPage.secondaryCategories.forEach(category => {
      Object.values(contentGraph)
        .filter(page => 
          page.primaryCategory === category &&
          !addedPaths.has(page.path)
        )
        .forEach(page => {
          addPageToResults(page.path, 'tertiary');
        });
    });
  }
  
  // 7. Add pages with semantic keyword overlap
  if (currentPage.semanticContext && currentPage.semanticContext.length > 0) {
    // Find pages with overlapping semantic context
    const semanticMatches = Object.values(contentGraph)
      .filter(page => 
        !addedPaths.has(page.path) &&
        page.semanticContext &&
        page.semanticContext.some(keyword => 
          currentPage.semanticContext?.includes(keyword)
        )
      )
      .sort((a, b) => {
        // Count matching keywords
        const aMatches = a.semanticContext?.filter(
          keyword => currentPage.semanticContext?.includes(keyword)
        ).length || 0;
        
        const bMatches = b.semanticContext?.filter(
          keyword => currentPage.semanticContext?.includes(keyword)
        ).length || 0;
        
        return bMatches - aMatches;
      });
    
    semanticMatches.forEach(page => {
      addPageToResults(page.path, 'tertiary');
    });
  }
  
  // 8. Fill remaining slots with priority pages
  if (result.length < limit) {
    Object.values(contentGraph)
      .filter(page => page.isPriority && !addedPaths.has(page.path))
      .forEach(page => {
        addPageToResults(page.path, 'tertiary');
      });
  }
  
  // Return the specified number of results
  return result.slice(0, limit);
}

/**
 * Get breadcrumbs for a given page path
 * 
 * @param path Current page path
 * @returns Array of breadcrumb items
 */
export function getBreadcrumbs(path: string): { name: string; url: string }[] {
  const breadcrumbs: { name: string; url: string }[] = [];
  
  // Always start with home
  breadcrumbs.push({ name: 'Home', url: '/' });
  
  // If we're on the home page, just return home
  if (path === '/') return breadcrumbs;
  
  const currentPath = path;
  const pathSegments = path.split('/').filter(Boolean);
  
  // Handle multi-level paths
  if (pathSegments.length > 1) {
    let partialPath = '';
    
    for (let i = 0; i < pathSegments.length - 1; i++) {
      partialPath += '/' + pathSegments[i];
      
      const segmentPage = contentGraph[partialPath];
      if (segmentPage) {
        breadcrumbs.push({ name: segmentPage.title, url: partialPath });
      }
    }
  }
  
  // Add the current page
  const currentPage = contentGraph[currentPath];
  if (currentPage) {
    breadcrumbs.push({ name: currentPage.title, url: currentPath });
  }
  
  return breadcrumbs;
}

/**
 * Get the canonical URL for a page
 * 
 * @param path Page path
 * @returns Canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://www.atlastechnosoft.com';
  
  // Strip trailing slash except for home page
  const normalizePath = path === '/' ? path : path.replace(/\/$/, '');
  
  return `${baseUrl}${normalizePath}`;
}

/**
 * Find semantically related topics for a given page
 * Useful for generating related content suggestions and strengthening topical relevance
 * 
 * @param path Current page path 
 * @returns Array of related topic strings
 */
export function getRelatedTopics(path: string): string[] {
  const currentPage = contentGraph[path];
  if (!currentPage) return [];
  
  const relatedTopics: string[] = [];
  
  // 1. Get keywords from current page
  if (currentPage.keywords) {
    relatedTopics.push(...currentPage.keywords);
  }
  
  // 2. Get semantic context phrases
  if (currentPage.semanticContext) {
    relatedTopics.push(...currentPage.semanticContext);
  }
  
  // 3. Get related keywords from topic clusters
  if (currentPage.topicClusters) {
    currentPage.topicClusters.forEach(cluster => {
      relatedTopics.push(...topicClusters[cluster].relatedKeywords);
    });
  }
  
  // 4. Get related topics from directly related pages
  if (currentPage.relatedPages) {
    currentPage.relatedPages.forEach(relatedPath => {
      const relatedPage = contentGraph[relatedPath];
      if (relatedPage && relatedPage.keywords) {
        relatedTopics.push(...relatedPage.keywords);
      }
    });
  }
  
  // Remove duplicates and return
  return Array.from(new Set(relatedTopics));
} 