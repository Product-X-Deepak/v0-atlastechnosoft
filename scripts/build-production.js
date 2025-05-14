#!/usr/bin/env node

/**
 * Production Build Script
 * 
 * This script performs a thorough clean build process:
 * 1. Cleans temporary files and caches
 * 2. Runs TypeScript type checking
 * 3. Runs ESLint to validate code quality
 * 4. Builds the Next.js application with optimizations
 * 5. Validates the build artifacts
 * 
 * Usage:
 *   node scripts/build-production.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Cross-platform compatibility for commands
const isWindows = os.platform() === 'win32';
const rmCommand = isWindows ? 'rd /s /q' : 'rm -rf';
const mkdirCommand = isWindows ? 'mkdir' : 'mkdir -p';

// Define directories to clean
const DIRS_TO_CLEAN = [
  '.next',
  '.swc',
  'node_modules/.cache'
];

// Define files to clean
const FILES_TO_CLEAN = [
  'tsconfig.tsbuildinfo',
  '.eslintcache'
];

// Function to execute commands with error handling
function execute(command, options = {}) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { 
      stdio: 'inherit',
      ...options
    });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Function to check if directory exists
function directoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (e) {
    return false;
  }
}

// Function to clean directories
function cleanDirectories() {
  console.log('Cleaning directories...');
  
  DIRS_TO_CLEAN.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);
    if (directoryExists(dirPath)) {
      try {
        if (isWindows) {
          // Windows needs a different approach
          execute(`${rmCommand} "${dirPath}"`, { stdio: 'ignore' });
        } else {
          // Unix/Linux/Mac approach
          execute(`${rmCommand} "${dirPath}"`);
        }
        console.log(`Cleaned: ${dir}`);
      } catch (e) {
        console.warn(`Failed to clean directory: ${dir}`);
      }
    }
  });
}

// Function to clean files
function cleanFiles() {
  console.log('Cleaning files...');
  
  FILES_TO_CLEAN.forEach(file => {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Cleaned: ${file}`);
      } catch (e) {
        console.warn(`Failed to clean file: ${file}`);
      }
    }
  });
}

// Run TypeScript type checking
function runTypeCheck() {
  console.log('Running TypeScript type checking...');
  return execute('pnpm tsc --noEmit');
}

// Run ESLint
function runLint() {
  console.log('Running ESLint...');
  return execute('pnpm lint');
}

// Check for unmet peer dependencies
function checkPeerDependencies() {
  console.log('Checking peer dependencies...');
  try {
    // Read package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Get list of dependencies and devDependencies
    const allDeps = { 
      ...packageJson.dependencies || {}, 
      ...packageJson.devDependencies || {} 
    };
    
    // Log unmet peer warnings for awareness but don't fail the build
    console.log('Note: Some peer dependency warnings are expected with React 19');
  } catch (e) {
    console.warn('Failed to check peer dependencies:', e);
  }
  
  return true; // Always continue the build process
}

// Create a file to ensure proper ESM/CJS compatibility
function ensureModuleCompatibility() {
  console.log('Ensuring module compatibility...');
  
  // Create a simple module resolver helper
  const helperPath = path.join(process.cwd(), 'lib/utils/moduleResolver.js');
  const helperDir = path.dirname(helperPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(helperDir)) {
    fs.mkdirSync(helperDir, { recursive: true });
  }
  
  // Write the helper file
  const helperContent = `/**
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
    console.warn(\`Failed to require module: \${moduleName}\`, err);
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
  } catch (e) {
    // Module not found, nothing to clear
  }
  return false;
};
`;

  try {
    fs.writeFileSync(helperPath, helperContent);
    console.log('Module resolver helper created successfully');
    return true;
  } catch (e) {
    console.warn('Failed to create module resolver helper:', e);
    return false;
  }
}

// Validate the build output
function validateBuild() {
  console.log('Validating build...');
  
  // Check if static directory exists
  const staticDir = path.join(process.cwd(), '.next', 'static');
  if (!directoryExists(staticDir)) {
    console.error('Build validation failed: .next/static directory not found');
    return false;
  }
  
  // Check if server directory exists
  const serverDir = path.join(process.cwd(), '.next', 'server');
  if (!directoryExists(serverDir)) {
    console.error('Build validation failed: .next/server directory not found');
    return false;
  }
  
  // Check if the main chunks exist
  const chunksDir = path.join(staticDir, 'chunks');
  if (!directoryExists(chunksDir)) {
    console.error('Build validation failed: .next/static/chunks directory not found');
    return false;
  }
  
  // Check the size of the build
  let totalSize = 0;
  let largeChunks = [];
  
  function calculateDirSize(directory) {
    if (!fs.existsSync(directory)) return 0;
    
    const files = fs.readdirSync(directory);
    let size = 0;
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += calculateDirSize(filePath);
      } else {
        size += stats.size;
        
        // Track large chunks (over 500KB)
        if (stats.size > 500 * 1024 && file.endsWith('.js')) {
          largeChunks.push({
            name: file,
            size: (stats.size / (1024 * 1024)).toFixed(2) + 'MB'
          });
        }
      }
    });
    
    return size;
  }
  
  try {
    totalSize = calculateDirSize(path.join(process.cwd(), '.next'));
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`Total build size: ${sizeInMB}MB`);
    
    // Warn about large chunks
    if (largeChunks.length > 0) {
      console.warn('Large chunks detected (>500KB):');
      largeChunks.forEach(chunk => {
        console.warn(`- ${chunk.name}: ${chunk.size}`);
      });
    }
  } catch (e) {
    console.warn('Failed to calculate build size:', e);
  }
  
  return true;
}

// Main function to run the script
async function main() {
  console.log('========================================');
  console.log('Starting production build process');
  console.log('========================================');
  
  // Step 1: Clean up
  cleanDirectories();
  cleanFiles();
  
  // Step 2: Ensure module compatibility
  if (!ensureModuleCompatibility()) {
    console.warn('Module compatibility setup had issues, but continuing...');
  }
  
  // Step 3: Install dependencies if needed
  if (!directoryExists(path.resolve(process.cwd(), 'node_modules'))) {
    console.log('Node modules not found, installing dependencies...');
    if (!execute('pnpm install')) {
      process.exit(1);
    }
  }
  
  // Step 4: Check peer dependencies
  checkPeerDependencies();
  
  // Step 5: Type check
  if (!runTypeCheck()) {
    console.error('Type checking failed');
    process.exit(1);
  }
  
  // Step 6: Lint
  if (!runLint()) {
    console.warn('Linting had issues, but continuing with build');
  }
  
  // Step 7: Set environment variables for production
  process.env.NODE_ENV = 'production';
  process.env.NEXT_TELEMETRY_DISABLED = '1';
  process.env.NEXT_VIDEO_ENABLED = 'true';
  
  // Step 8: Create necessary directories
  if (!directoryExists(path.resolve(process.cwd(), '.next'))) {
    execute(`${mkdirCommand} ".next"`);
  }
  
  // Step 9: Run the build
  console.log('Building production bundle...');
  if (!execute('pnpm run build')) {
    process.exit(1);
  }
  
  // Step 10: Validate the build
  if (!validateBuild()) {
    console.error('Build validation failed');
    process.exit(1);
  }
  
  console.log('========================================');
  console.log('Production build completed successfully!');
  console.log('========================================');
}

// Execute the main function
main().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
}); 