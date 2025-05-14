/**
 * Utilities Index
 * 
 * This file re-exports all utility functions from the utils directory
 * to provide a clean, centralized import location.
 */

// Import the main utility functions
import { cn } from "@/lib/utils"

// Import performance utilities directly from the main performance file
import { 
  debounce, 
  throttle, 
  useLazyComponent,
  deferLoadingFor,
  lazyLoadImage,
  lazyLoadImages,
  measureRenderTime,
  measureWebVitals,
  preloadCriticalResources,
  useIntersectionObserver,
  useLazyImage,
  deferNonCriticalJS,
} from "@/lib/performance"

// Export all
export {
  cn,
  debounce, 
  throttle, 
  useLazyComponent,
  deferLoadingFor,
  lazyLoadImage,
  lazyLoadImages,
  measureRenderTime,
  measureWebVitals,
  preloadCriticalResources,
  useIntersectionObserver,
  useLazyImage,
  deferNonCriticalJS,
}

// Create a named variable for the default export
const utilsExport = { cn };

// Export the named variable as default
export default utilsExport;

// Formatting utilities
export * from './formatting/date';

// Validation utilities
export * from './validation/form';

// Helper utilities
export * from './helpers/string'; 