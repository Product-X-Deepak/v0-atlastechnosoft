import { NextRequest, NextResponse } from 'next/server'
import { match as pathMatch } from 'path-to-regexp'

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const API_RATE_LIMITS = {
  '/api/contact': 10, // 10 requests per minute
  '/api/search': 20, // 20 requests per minute
  'default': 60 // Default for any other API routes
}

// In-memory store for rate limiting
// Note: In production with multiple instances, this should be replaced with Redis or similar
const rateLimitStore = new Map<string, { count: number, resetTime: number }>()

// URLs that should be checked for correctness
const VALID_PATHS = new Set([
  '/about',
  '/contact',
  '/services',
  '/faq',
  '/blog',
  '/careers',
  '/privacy',
  '/terms',
  '/sap-solutions/business-one',
  '/sap-solutions/business-one-cloud',
  '/sap-solutions/hana',
  '/sap-solutions/erp-planning',
  '/automation-solutions/rpa-solutions',
  '/automation-solutions/consultation',
  '/automation-solutions/workflow-automation',
  '/automation-solutions/support',
  '/automation-solutions/ui-path',
  '/automation-solutions/boyum-it',
  '/industries/manufacturing',
  '/industries/distribution',
  '/industries/healthcare',
  '/industries/retail',
  '/industries/construction',
  '/industries/financial-services',
  '/industries/pharmaceuticals',
  '/industries/professional-services',
  '/industries/shipping',
])

// List of static file extensions that should always be cached
const STATIC_FILE_EXTENSIONS = new Set([
  '.woff', '.woff2', '.ttf', '.eot', // Fonts
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', // Images
  '.css', // Stylesheets
  '.js', // JavaScript
  '.json', // JSON data
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', // Documents
  '.mp4', '.webm', '.ogg', // Video
  '.mp3', '.wav' // Audio
]);

// Check if a path has a static file extension
function isStaticFile(path: string): boolean {
  return STATIC_FILE_EXTENSIONS.has(path.substring(path.lastIndexOf('.')).toLowerCase());
}

// Check if path is a JavaScript chunk
function isJSChunk(path: string): boolean {
  return path.includes('/_next/static/chunks/') && path.endsWith('.js');
}

// Clean up the store every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Add performance headers for all requests
  const response = NextResponse.next()
  
  // Security headers for all requests
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  
  // Add more strict CSP headers for non-static routes
  if (!isStaticFile(pathname)) {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://* http://localhost:* blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self';"
    )
  }
  
  // Add cache control headers for static assets with specific chunk handling
  if (pathname.includes('/_next/static/chunks/')) {
    // Apply aggressive caching for webpack chunks to prevent chunk loading issues
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.append('Vary', 'Accept-Encoding')
    
    // Early hints for browser optimization
    if (isJSChunk(pathname)) {
      // Set proper MIME type for JS chunks
      response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
    }
  } else if (
    pathname.includes('/_next/static/') ||
    pathname.includes('/images/') ||
    pathname.includes('/fonts/') ||
    isStaticFile(pathname)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  } else if (pathname.includes('/_next/data/')) {
    // Add separate caching for Next.js data files but less aggressive 
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=60, stale-while-revalidate=86400'
    )
  } else if (!pathname.startsWith('/api/')) {
    // Default caching for HTML pages
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=60, stale-while-revalidate=86400'
    )
  }

  // Fix common URL issues
  // Remove trailing slashes for cleaner URLs
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(newUrl, 308) // 308 = Permanent Redirect
  }
  
  // Fix uppercase URLs - Next.js routes are case sensitive but URLs should be lowercase
  if (pathname !== pathname.toLowerCase()) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.toLowerCase()
    return NextResponse.redirect(newUrl, 308)
  }

  // Only apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    // API requests should not be cached by default
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    
    // Get client IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'
    
    // Find the specific rate limit for this endpoint
    let rateLimit = API_RATE_LIMITS.default
    for (const [path, limit] of Object.entries(API_RATE_LIMITS)) {
      if (path === 'default') continue
      
      const matchPath = pathMatch(path, { decode: decodeURIComponent })
      if (matchPath(pathname)) {
        rateLimit = limit
        break
      }
    }

    // Create a unique key for this IP and endpoint path
    const key = `${ip}:${pathname}`
    
    // Check if this IP is already in the store
    const now = Date.now()
    const record = rateLimitStore.get(key)
    
    // If no record exists or the reset time has passed, create a new record
    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      })
      return response
    }
    
    // If under limit, increment count and allow the request
    if (record.count < rateLimit) {
      record.count++
      return response
    }
    
    // Rate limit exceeded, return 429 Too Many Requests
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests, please try again later.'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': `${Math.ceil((record.resetTime - now) / 1000)}`,
          'X-RateLimit-Limit': `${rateLimit}`,
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': `${Math.ceil(record.resetTime / 1000)}`
        }
      }
    )
  }

  // Check if path is valid but has incorrect casing or trailing/leading spaces
  const trimmedPath = pathname.trim()
  if (trimmedPath !== pathname) {
    const correctedUrl = request.nextUrl.clone()
    correctedUrl.pathname = trimmedPath
    return NextResponse.redirect(correctedUrl, 308) // 308 = Permanent Redirect
  }

  // For non-API paths, return the enhanced response with performance headers
  return response
}

// Configure middleware to run for all routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/media|favicon.ico|images/|public/).*)',
    '/api/:path*',
    '/_next/static/chunks/:path*',
    '/_next/data/:path*',
  ],
} 