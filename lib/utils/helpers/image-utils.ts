/**
 * Utility functions for handling images in the application
 */

/**
 * Checks if the given path is an absolute URL
 */
export function isAbsoluteUrl(url: string): boolean {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

/**
 * Ensures image URLs are properly formatted
 * Converts relative paths to absolute paths if needed
 */
export function getImageUrl(src: string): string {
  if (!src) return '/fallback/image-placeholder.svg'
  
  // If already absolute, return as is
  if (isAbsoluteUrl(src)) return src
  
  // If it starts with a slash, it's a root-relative path
  if (src.startsWith('/')) return src
  
  // Otherwise, make it root-relative
  return `/${src}`
}

/**
 * Prefetches an image to improve loading performance
 */
export function prefetchImage(src: string): void {
  if (typeof window === 'undefined') return
  
  const imgUrl = getImageUrl(src)
  const img = new Image()
  img.src = imgUrl
}

/**
 * Batch prefetch multiple images
 */
export function prefetchImages(sources: string[]): void {
  if (!sources || !sources.length) return
  
  // Prefetch in batches to not overload browser
  const batchSize = 5
  let index = 0
  
  const prefetchBatch = () => {
    const batch = sources.slice(index, index + batchSize)
    batch.forEach(prefetchImage)
    index += batchSize
    
    if (index < sources.length) {
      setTimeout(prefetchBatch, 300)
    }
  }
  
  prefetchBatch()
} 