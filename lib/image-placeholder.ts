import { getPlaiceholder } from 'plaiceholder';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Interface for placeholder generation result
 */
export interface PlaceholderResult {
  /**
   * Base64 placeholder image data URL
   */
  base64: string;
  
  /**
   * Dominant color as CSS color string
   */
  color: string;
}

/**
 * Generate a tiny blur placeholder for an image URL
 * 
 * @param src Image URL or Buffer
 * @param options Configuration options
 * @returns Promise with base64 placeholder and dominant color
 */
export async function generatePlaceholder(
  src: string | Buffer,
  options: {
    /**
     * Width of the placeholder image
     * @default 10
     */
    width?: number;
    
    /**
     * Quality of the placeholder JPEG (1-100)
     * @default 40
     */
    quality?: number;
    
    /**
     * Get the dominant color from the image
     * @default true
     */
    getDominantColor?: boolean;
  } = {}
): Promise<PlaceholderResult> {
  try {
    const { width = 10, getDominantColor = true } = options;
    
    // If src is a URL, fetch the image
    let imageBuffer: Buffer;
    
    if (typeof src === 'string') {
      if (src.startsWith('data:')) {
        // Handle data URLs
        const base64Data = src.split(',')[1];
        imageBuffer = Buffer.from(base64Data, 'base64');
      } else if (src.startsWith('http')) {
        // Handle remote URLs
        const response = await fetch(src);
        imageBuffer = Buffer.from(await response.arrayBuffer());
      } else if (src.startsWith('/')) {
        // Handle local paths - this requires fs access which depends on environment
        try {
          // When running on server, try to read from filesystem
          const publicDir = path.join(process.cwd(), 'public');
          const imagePath = path.join(publicDir, src);
          imageBuffer = fs.readFileSync(imagePath);
        } catch {
          // If filesystem access fails, try to fetch the image
          const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
          const response = await fetch(`${baseUrl}${src}`);
          imageBuffer = Buffer.from(await response.arrayBuffer());
        }
      } else {
        throw new Error(`Unsupported image source: ${src}`);
      }
    } else {
      // Use the provided buffer
      imageBuffer = src;
    }
    
    // Generate tiny placeholder with sharp
    // Note: plaiceholder API uses 'size' not 'width'
    const { base64: placeholder } = await getPlaiceholder(imageBuffer, {
      size: width,
    });
    
    // Extract dominant color if requested
    let dominantColor = '#e2e8f0'; // Default fallback color
    
    if (getDominantColor) {
      try {
        const { dominant } = await sharp(imageBuffer)
          .resize(10, 10, { fit: 'inside' })
          .stats();
        
        const { r, g, b } = dominant;
        dominantColor = `rgb(${r}, ${g}, ${b})`;
      } catch (error) {
        console.error('Error extracting dominant color:', error);
      }
    }
    
    return {
      base64: placeholder,
      color: dominantColor,
    };
  } catch (error) {
    console.error('Error generating placeholder:', error);
    // Return a fallback placeholder
    return {
      base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJZgN4jUBvgwAAAABJRU5ErkJggg==',
      color: '#e2e8f0', // Light gray color
    };
  }
}

/**
 * Generate placeholders for multiple images in parallel
 * 
 * @param urls Array of image URLs
 * @param options Configuration options
 * @returns Promise with object mapping URLs to their placeholders
 */
export async function generateMultiplePlaceholders(
  urls: string[],
  options: {
    width?: number;
    quality?: number;
    getDominantColor?: boolean;
    concurrency?: number;
  } = {}
): Promise<Record<string, PlaceholderResult>> {
  const { concurrency = 5, ...placeholderOptions } = options;
  
  // Process URLs in chunks to avoid too many concurrent requests
  const results: Record<string, PlaceholderResult> = {};
  const chunks = [];
  
  // Split URLs into chunks
  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency));
  }
  
  // Process each chunk sequentially
  for (const chunk of chunks) {
    const chunkResults = await Promise.all(
      chunk.map(async (url) => {
        try {
          const placeholder = await generatePlaceholder(url, placeholderOptions);
          return { url, placeholder };
        } catch (error) {
          console.error(`Error generating placeholder for ${url}:`, error);
          return {
            url,
            placeholder: {
              base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJZgN4jUBvgwAAAABJRU5ErkJggg==',
              color: '#e2e8f0',
            },
          };
        }
      })
    );
    
    // Add chunk results to the overall results
    chunkResults.forEach(({ url, placeholder }) => {
      results[url] = placeholder;
    });
  }
  
  return results;
}

/**
 * Color-based placeholder generation - generates solid color placeholders for better performance
 * 
 * @param color CSS color string
 * @param width Image width
 * @param height Image height
 * @returns Base64 data URL of a solid color placeholder
 */
export function generateColorPlaceholder(
  color: string = '#e2e8f0',
  width: number = 100,
  height: number = 100
): string {
  // Create a tiny SVG with the right aspect ratio and color
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="${color}" />
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get optimized image props for the AdaptiveImage component
 * 
 * @param src Image source URL
 * @param alt Image alt text
 * @param width Image width
 * @param height Image height
 * @param placeholder Placeholder data (optional)
 * @returns Props for AdaptiveImage component
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  width: number,
  height: number,
  placeholder?: PlaceholderResult
) {
  return {
    src,
    alt,
    width,
    height,
    blurPlaceholder: !!placeholder?.base64,
    placeholderDataURL: placeholder?.base64,
    colorPlaceholder: !placeholder?.base64 && !!placeholder?.color,
    placeholderColor: placeholder?.color,
  };
} 