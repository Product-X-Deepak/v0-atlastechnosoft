/**
 * Cache control utility functions for optimizing performance
 * with proper HTTP cache headers
 */

// Cache durations in seconds
export const CACHE_DURATIONS = {
  STATIC: 60 * 60 * 24 * 30, // 30 days
  DYNAMIC: 60 * 60, // 1 hour
  REVALIDATE: 60 * 10, // 10 minutes
  API: 60, // 1 minute
  NONE: 0 // No caching
};

// Cache control types
export type CacheControlType = 
  | 'static' 
  | 'dynamic' 
  | 'revalidate' 
  | 'api' 
  | 'none';

/**
 * Creates cache control headers for different content types
 * 
 * @param type - Type of cache control policy to use
 * @param customMaxAge - Optional custom max-age value in seconds
 * @returns Cache control header string
 */
export function getCacheControlHeader(
  type: CacheControlType = 'dynamic',
  customMaxAge?: number
): string {
  switch (type) {
    // Static assets (images, fonts, CSS) - long cache, with revalidation
    case 'static':
      return `public, max-age=${customMaxAge ?? CACHE_DURATIONS.STATIC}, stale-while-revalidate=${CACHE_DURATIONS.REVALIDATE}`;
    
    // Dynamic but relatively stable content (product pages, blog posts)
    case 'dynamic':
      return `public, max-age=${customMaxAge ?? CACHE_DURATIONS.DYNAMIC}, stale-while-revalidate=${CACHE_DURATIONS.REVALIDATE}`;
    
    // Content that changes but can use stale content during revalidation
    case 'revalidate':
      return `public, max-age=${customMaxAge ?? CACHE_DURATIONS.REVALIDATE}, stale-while-revalidate=${CACHE_DURATIONS.API}`;
    
    // API responses - short cache but allows stale content briefly
    case 'api':
      return `public, max-age=${customMaxAge ?? CACHE_DURATIONS.API}, stale-while-revalidate=30`;
    
    // No caching - for user-specific or rapidly changing content
    case 'none':
      return 'no-store, no-cache, must-revalidate, proxy-revalidate';
      
    default:
      return 'public, max-age=3600';
  }
}

/**
 * Creates standard fetch options with appropriate cache settings
 * 
 * @param cacheType - Type of caching to use
 * @returns Fetch options object with cache settings
 */
export function getFetchOptions(cacheType: CacheControlType = 'dynamic'): RequestInit {
  return {
    headers: {
      'Cache-Control': getCacheControlHeader(cacheType),
    },
    next: {
      revalidate: cacheType === 'none' ? 0 : 
                  cacheType === 'api' ? CACHE_DURATIONS.API : 
                  cacheType === 'revalidate' ? CACHE_DURATIONS.REVALIDATE : 
                  cacheType === 'dynamic' ? CACHE_DURATIONS.DYNAMIC : 
                  CACHE_DURATIONS.STATIC,
    },
  };
}

/**
 * Configures route segment config for Next.js App Router
 * with appropriate caching settings
 * 
 * @param cacheType - Type of caching to use
 * @returns Route segment configuration object
 */
export function getRouteConfig(cacheType: CacheControlType = 'dynamic') {
  // For static, use true for static rendering
  if (cacheType === 'static') {
    return { 
      fetchCache: 'force-cache',
      revalidate: CACHE_DURATIONS.STATIC,
    };
  }
  
  // For none, disable all caching
  if (cacheType === 'none') {
    return { 
      fetchCache: 'no-store',
      revalidate: 0,
    };
  }
  
  // For others, use appropriate revalidation times
  return {
    fetchCache: 'auto',
    revalidate: cacheType === 'api' ? CACHE_DURATIONS.API : 
                cacheType === 'revalidate' ? CACHE_DURATIONS.REVALIDATE : 
                CACHE_DURATIONS.DYNAMIC,
  };
} 