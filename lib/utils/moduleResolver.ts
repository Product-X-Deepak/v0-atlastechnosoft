/**
 * Module Resolver Helper
 * 
 * This utility helps handle ESM/CommonJS module compatibility issues.
 * It's used by build scripts to dynamically import modules in a way
 * that works across module systems.
 */

'use strict';

// Helper for dynamic imports in both ESM and CommonJS environments
export function requireModule<T>(moduleName: string): T | null {
  try {
    // Use dynamic import for modern environments
    if (typeof (global as any).__import === 'function') {
      return (global as any).__import(moduleName);
    }
    
    // Fallback to require for CommonJS
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(moduleName);
  } catch (err) {
    console.warn(`Failed to require module: ${moduleName}`, err);
    return null;
  }
}

// Clean up module from cache
export function clearModuleCache(moduleName: string): boolean {
  try {
    if (typeof require !== 'undefined' && typeof require.cache !== 'undefined') {
      const modulePath = require.resolve(moduleName);
      if (require.cache[modulePath]) {
        delete require.cache[modulePath];
        return true;
      }
    }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  } catch (e) {
    // Module not found, nothing to clear
  }
  return false;
}

// Type safe dynamic import wrapper
export async function importDynamically<T>(moduleName: string): Promise<T | null> {
  try {
    return await import(moduleName) as T;
  } catch (error) {
    console.warn(`Failed to dynamically import module: ${moduleName}`, error);
    return null;
  }
}

// Node.js specific utilities
export const isNodeEnvironment = typeof process !== 'undefined' && 
  process.versions != null && 
  process.versions.node != null; 