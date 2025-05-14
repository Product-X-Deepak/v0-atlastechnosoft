/**
 * Image Utilities
 *
 * Enhanced image optimization utilities for Atlas Technosoft website
 */

/**
 * Get image dimensions from URL
 *
 * @param url Image URL
 * @returns Promise resolving to image dimensions
 */
export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot get image dimensions on server"))
      return
    }

    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`))
    }
    img.src = url
    img.crossOrigin = "anonymous"
  })
}

/**
 * Generate responsive image srcset
 *
 * @param baseUrl Base image URL
 * @param widths Array of widths for srcset
 * @param extension Image extension
 * @returns srcset string
 */
export function generateSrcSet(baseUrl: string, widths: number[], extension = "webp"): string {
  // Remove extension from base URL if present
  const baseWithoutExtension = baseUrl.replace(/\.[^/.]+$/, "")

  return widths.map((width) => `${baseWithoutExtension}-${width}.${extension} ${width}w`).join(", ")
}

/**
 * Generate responsive sizes attribute
 *
 * @param sizes Array of size descriptors
 * @returns sizes string
 */
export function generateSizes(sizes: string[]): string {
  return sizes.join(", ")
}

/**
 * Get image format based on browser support
 *
 * @returns Preferred image format
 */
export function getPreferredImageFormat(): "avif" | "webp" | "jpg" {
  if (typeof window === "undefined") {
    return "webp" // Default for SSR
  }

  // Check for AVIF support
  const canvas = document.createElement("canvas")
  if (canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0) {
    return "avif"
  }

  // Check for WebP support
  if (canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0) {
    return "webp"
  }

  return "jpg"
}

/**
 * Get fallback image URL when original image is not available
 *
 * @returns Fallback image URL
 */
export function getPlaceholderImage(): string {
  // Use the company logo as a fallback
  return `/images/Main_Logo.png`
}

/**
 * Generate blur data URL for image placeholder
 *
 * @param width Image width
 * @param height Image height
 * @param color Background color (hex)
 * @returns Blur data URL
 */
export function generateBlurDataURL(width: number, height: number, color = "#27272a"): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20" />
      </filter>
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

/**
 * Get aspect ratio from dimensions
 *
 * @param width Image width
 * @param height Image height
 * @returns Aspect ratio string (e.g., "16/9")
 */
export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = gcd(width, height)
  return `${width / divisor}/${height / divisor}`
}

/**
 * Calculate image dimensions to maintain aspect ratio
 *
 * @param originalWidth Original image width
 * @param originalHeight Original image height
 * @param targetWidth Target width
 * @returns Calculated dimensions
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  const height = Math.round(targetWidth / aspectRatio)

  return {
    width: targetWidth,
    height,
  }
}

/**
 * Get image type from URL
 *
 * @param url Image URL
 * @returns Image type
 */
export function getImageType(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase() || ""

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "png":
      return "image/png"
    case "webp":
      return "image/webp"
    case "avif":
      return "image/avif"
    case "gif":
      return "image/gif"
    case "svg":
      return "image/svg+xml"
    default:
      return "image/jpeg"
  }
}

/**
 * Check if image exists
 *
 * @param url Image URL
 * @returns Promise resolving to boolean
 */
export function imageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(true) // Default for SSR
      return
    }

    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

const imageUtils = {
  getImageDimensions,
  generateSrcSet,
  generateSizes,
  getPreferredImageFormat,
  getPlaceholderImage,
  generateBlurDataURL,
  getAspectRatio,
  calculateDimensions,
  getImageType,
  imageExists,
};

export default imageUtils;
