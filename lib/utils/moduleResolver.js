/**
 * Module Resolver Helper
 * 
 * This utility helps handle ESM/CommonJS module compatibility issues.
 * It's used by build scripts to dynamically import modules in a way
 * that works across module systems.
 */

'use strict';

// Helper for dynamic imports in both ESM and CommonJS environments
exports.requireModule = function requireModule(moduleName) {
  try {
    return require(moduleName);
  } catch (err) {
    console.warn(`Failed to require module: ${moduleName}`, err);
    return null;
  }
};

// Clean up module from cache
exports.clearModuleCache = function clearModuleCache(moduleName) {
  try {
    const modulePath = require.resolve(moduleName);
    if (require.cache[modulePath]) {
      delete require.cache[modulePath];
      return true;
    }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  } catch (e) {
    // Module not found, nothing to clear
  }
  return false;
};
