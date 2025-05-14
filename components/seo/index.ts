// Export all SEO components for easier importing

// Core SEO components
export { PageSEO } from './page-seo';
export { StructuredData } from './structured-data';

// Structured data exports
export { 
  WebsiteStructuredData,
  OrganizationStructuredData,
  ProductStructuredData,
  FaqStructuredData,
  BreadcrumbStructuredData
} from './structured-data';

// Performance optimization components
export { AdaptiveImage } from '../common/performance/adaptive-image';
export { CriticalImagePreloader } from '../common/performance/critical-image-preloader';
export { WebVitalsTracker } from '../common/performance/web-vitals-tracker';
export { PerformanceProvider } from '../common/performance/performance-provider'; 