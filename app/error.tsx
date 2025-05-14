"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps): React.ReactNode {
  const router = useRouter()
  const pathname = usePathname()
  const [isChunkError, setIsChunkError] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  
  // Check if this is a chunk loading error
  useEffect(() => {
    // Common error messages for chunk loading failures
    const chunkErrorPatterns = [
      /loading chunk/i,
      /failed to load chunk/i,
      /chunk \d+ failed/i,
      /loading css chunk/i,
      /loading javascript chunk/i,
      /manifest unavailable/i,
      /network error.*chunk/i,
      /stylesheet.*chunk/i,
      /webpack_require/i
    ]
    
    const errorMessage = error.message || '';
    const errorStack = error.stack || '';
    const isChunk = chunkErrorPatterns.some(pattern => 
      pattern.test(errorMessage) || pattern.test(errorStack)
    );
    
    setIsChunkError(isChunk);
    
    // Report error to the API
    if (typeof window !== 'undefined') {
      const errorData = {
        message: errorMessage,
        stack: errorStack,
        pathname,
        timestamp: new Date().toISOString(),
        isChunkError: isChunk,
        userAgent: navigator.userAgent,
        digest: error.digest
      };
      
      // Use non-blocking fetch with keepalive to ensure the report is sent
      try {
        if (typeof fetch === 'function') {
          fetch('/api/error-logging/chunk-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errorData),
            keepalive: true
          }).catch(() => {
            // Ignore fetch errors to avoid cascading issues
          });
        }
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (_) {
        // Silently fail error reporting
      }
    }
    
    // Attempt automatic recovery for chunk errors
    if (isChunk && attemptCount < 2) {
      const timeoutId = setTimeout(() => {
        reset(); // Try React's reset function first
        setAttemptCount(count => count + 1);
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
    
    // If multiple reset attempts fail, reload the page with cache busting
    if (isChunk && attemptCount >= 2 && typeof window !== 'undefined') {
      // Clean up any cached chunks that might be causing problems
      if (window.localStorage) {
        try {
          Object.keys(localStorage).forEach(key => {
            if (key.includes('chunk') || key.includes('webpack')) {
              localStorage.removeItem(key);
            }
          });
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        } catch (_) {
          // Ignore storage errors
        }
      }
      
      // Navigate to the fallback page if the error persists
      router.push(`/fallback/chunk-error.html?errorType=chunk-error&path=${encodeURIComponent(pathname || '')}`);
    }
  }, [error, pathname, isChunkError, reset, attemptCount, router]);
  
  // Function to reload the page safely
  const reloadPage = () => {
    if (typeof window !== 'undefined') {
      window.location.href = window.location.href;
    }
  };
  
  // Don't render anything while attempting recovery
  if (isChunkError && attemptCount < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="p-6 max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">
            Loading...
          </h2>
          <p className="text-muted-foreground mb-4">
            Recovering application resources
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E38] text-white p-4">
      <div className="max-w-md w-full bg-[#2e2e48] rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-center mb-2">
            {isChunkError ? 'Application Loading Error' : 'Something went wrong'}
          </h1>
          
          <p className="text-gray-300 text-center mb-6">
            {isChunkError
              ? 'We encountered an issue loading part of the application. This might be due to a network issue or a recent update.'
              : 'An unexpected error occurred. Our team has been notified.'}
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => reset()}
              className="py-2 px-4 bg-[#E84A0E] text-white rounded-md hover:bg-[#ff5a1f] transition-colors"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="py-2 px-4 bg-transparent border border-[#A73370] text-[#A73370] rounded-md hover:bg-[#A73370] hover:text-white text-center transition-colors"
            >
              Return to Home
            </Link>
            
            {isChunkError && (
              <button
                onClick={() => {
                  // Clear cache and hard reload
                  if (typeof window !== 'undefined' && 'caches' in window) {
                    caches.keys().then(cacheNames => {
                      cacheNames.forEach(cacheName => {
                        caches.delete(cacheName);
                      });
                      reloadPage();
                    });
                  } else {
                    reloadPage();
                  }
                }}
                className="py-2 px-4 bg-transparent border border-white/20 text-white/70 rounded-md hover:bg-white/10 transition-colors"
              >
                Clear Cache & Reload
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-6 text-xs text-gray-400 hover:text-white underline text-center w-full"
          >
            {showDetails ? 'Hide Error Details' : 'Show Error Details'}
          </button>
          
          {showDetails && (
            <div className="mt-4 p-3 bg-black/30 rounded text-xs overflow-auto max-h-48">
              <p className="font-mono break-all whitespace-pre-wrap">
                {error.message}
                {error.stack && (
                  <>
                    <br /><br />
                    {error.stack.split('\n').slice(1).join('\n')}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
