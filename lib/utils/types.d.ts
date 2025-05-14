/**
 * Global TypeScript type declarations
 * 
 * This file contains TypeScript type declarations for webpack and other
 * global objects that may be accessed throughout the application.
 */

// Webpack internals
interface WebpackRequire {
  c: Record<string, any>;
  f: {
    j: Record<string, number>;
    [key: string]: any;
  };
  e: (chunkId: string) => Promise<any>;
  [key: string]: any;
}

// Extend the Window interface with webpack and chunk handling properties
interface Window {
  // Webpack chunk loading mechanism
  __webpack_chunk_load__?: (id: string) => Promise<any>;
  
  // Webpack module system
  __webpack_require__?: WebpackRequire;
  
  // Chunk error handler flags
  __chunk_error_handler_installed?: boolean;
  __chunk_handler_initialized?: boolean;
  __chunk_retry_configured?: boolean;
  
  // For requestIdleCallback polyfill
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
} 