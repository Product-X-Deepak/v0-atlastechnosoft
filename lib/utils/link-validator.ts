/**
 * Link Validator Utility
 * Used to validate links and ensure they're pointing to valid locations
 */

// Common prefixes to check for absolute URLs
const ABSOLUTE_URL_PREFIXES = ['http://', 'https://', '//', 'tel:', 'mailto:']

/**
 * Check if a link is an absolute URL (external)
 * @param href Link to check
 * @returns True if the link is absolute
 */
export function isAbsoluteUrl(href: string): boolean {
  if (!href) return false
  return ABSOLUTE_URL_PREFIXES.some(prefix => href.startsWith(prefix))
}

/**
 * Client-side link validator that fixes common link errors
 * @param href Original link
 * @returns Corrected link
 */
export function validateLink(href: string): string {
  if (!href) return href
  
  // If it's an absolute URL, don't modify it
  if (isAbsoluteUrl(href)) return href
  
  // Clean up the URL - remove trailing slashes, whitespace, etc.
  let cleanedHref = href.trim()
  
  // Remove trailing slash for internal links (except for root path)
  if (cleanedHref !== '/' && cleanedHref.endsWith('/')) {
    cleanedHref = cleanedHref.slice(0, -1)
  }
  
  // Ensure internal links start with /
  if (!cleanedHref.startsWith('/')) {
    cleanedHref = `/${cleanedHref}`
  }
  
  // Correct common link errors for main pages
  const linkMappings: Record<string, string> = {
    '/about-us': '/about',
    '/contact-us': '/contact',
    '/contactus': '/contact',
    '/aboutus': '/about',
    '/faq-page': '/faq',
    '/faqs': '/faq',
    '/terms-of-service': '/terms',
    '/terms-and-conditions': '/terms',
    '/privacy-policy': '/privacy',
    '/privacy-statement': '/privacy',
    '/sap/business-one': '/sap-solutions/business-one',
    '/sap/b1': '/sap-solutions/business-one',
    '/sap-business-one': '/sap-solutions/business-one',
    '/business-one': '/sap-solutions/business-one',
    '/automation-rpa': '/automation-solutions/rpa-solutions',
    '/rpa': '/automation-solutions/rpa-solutions',
    '/automation-solutions/ui-path': '/automation-solutions/rpa-solutions',
    '/automation-solutions/boyum-it': '/sap-solutions/business-one',
    '/automation-solutions/workflow-automation': '/automation-solutions/rpa-solutions',
    '/automation-solutions/support': '/contact',
    '/sap-solutions/hana': '/sap-solutions/business-one',
    '/contact/demo': '/contact',
    '/resources/brochure': '/about',
    '/sap-solutions/business-one/boyum-it': '/sap-solutions/business-one',
    '/sap-solutions/business-one-cloud/features': '/sap-solutions/business-one-cloud',
    '/careers/life-at-atlas': '/careers',
  }
  
  // Return corrected link if a mapping exists
  return linkMappings[cleanedHref] || cleanedHref
}

/**
 * Validate all links on the client-side to ensure they're pointing to correct destinations
 * This should be called once after page load
 */
export function validatePageLinks(): void {
  if (typeof window === 'undefined') return
  
  // Find all links on the page
  const links = document.querySelectorAll('a[href]')
  
  links.forEach(link => {
    const originalHref = link.getAttribute('href')
    if (!originalHref) return
    
    // Skip anchor links and non-http protocols
    if (originalHref.startsWith('#') || 
        originalHref.startsWith('javascript:') ||
        originalHref.startsWith('tel:') ||
        originalHref.startsWith('mailto:')) {
      return
    }
    
    // Only validate internal links (skip absolute URLs)
    if (!isAbsoluteUrl(originalHref)) {
      const validatedHref = validateLink(originalHref)
      
      // If the link needed correction, update it
      if (validatedHref !== originalHref) {
        link.setAttribute('href', validatedHref)
        
        // In development, log the correction
        if (process.env.NODE_ENV === 'development') {
          console.info(`🔗 Corrected link: ${originalHref} → ${validatedHref}`)
        }
      }
    }
  })
}

// Add preconnect hints for common domains to improve performance
export function addPreconnectHints(): void {
  if (typeof window === 'undefined') return
  
  // List of common domains to preconnect to
  const preconnectDomains = [
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
  
  preconnectDomains.forEach(domain => {
    // Check if link already exists
    const existingLink = document.querySelector(`link[rel="preconnect"][href="${domain}"]`) as HTMLLinkElement | null;
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  })
}

// Prefetch links that are visible in the viewport
export function prefetchVisibleLinks(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  
  const linksObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement
          const href = link.getAttribute('href')
          
          // Only prefetch internal links
          if (href && !isAbsoluteUrl(href) && !href.startsWith('#')) {
            // Create prefetch link
            const prefetchLink = document.createElement('link')
            prefetchLink.rel = 'prefetch'
            prefetchLink.href = href
            prefetchLink.as = 'document'
            
            // Add to head if it doesn't already exist
            if (!document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
              document.head.appendChild(prefetchLink)
            }
          }
          
          // Stop observing this link
          linksObserver.unobserve(link)
        }
      })
    },
    { rootMargin: '200px' }
  )
  
  // Observe all links in the navigation and important areas
  const links = document.querySelectorAll('nav a, header a, footer a, [data-prefetch] a');
  links.forEach((link: Element) => {
    linksObserver.observe(link);
  });
}

/**
 * Initialize link validation and optimization when the page loads
 */
export function initLinkOptimizer(): void {
  if (typeof window === 'undefined') return
  
  // Run immediately if the document is already loaded
  if (document.readyState === 'complete') {
    validatePageLinks()
    addPreconnectHints()
    prefetchVisibleLinks()
  } else {
    // Otherwise wait for the page to load
    window.addEventListener('load', () => {
      validatePageLinks()
      addPreconnectHints()
    })
    
    // Delay prefetching to prioritize critical content
    window.addEventListener('load', () => {
      setTimeout(prefetchVisibleLinks, 1000)
    })
  }
} 