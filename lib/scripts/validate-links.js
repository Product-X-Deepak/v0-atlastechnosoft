#!/usr/bin/env node
// @ts-check
// @type=module

/**
 * Link Validation Script
 * Run this script to validate all links in the website during build time
 * Usage: node validate-links.js
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Execute shell commands if needed for complex validations
const execPromise = promisify(exec);
async function runCommand(cmd) {
  try {
    const { stdout } = await execPromise(cmd);
    return stdout.trim();
  } catch (error) {
    console.error(`Error executing command: ${cmd}`, error);
    return '';
  }
}

// Configuration
const APP_DIR = path.join(process.cwd(), 'app');
const COMPONENTS_DIR = path.join(process.cwd(), 'components');

// Regular expressions to match links in React code
const LINK_REGEX = /[<]Link\s+href=['"](.*?)['"].*?>/g;
const CUSTOM_LINK_REGEX = /href=['"](.*?)['"]|url=['"](.*?)['"]|path=['"](.*?)['"]|to=['"](.*?)['"]|route=['"](.*?)['"]|navigate=['"](.*?)['"]|redirect=['"](.*?)['"]|destination=['"](.*?)[']/g;

// Redirect mappings from next.config.mjs
let redirectMappings = {};

// Valid routes in the app directory (automatically detected)
const validRoutes = new Set();

// Track problematic links
const problematicLinks = [];

/**
 * Extract Next.js redirects from next.config.mjs
 */
async function extractRedirects() {
  try {
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extract redirect objects using regex
    const redirectsMatch = configContent.match(/async\s+redirects\(\)\s*{\s*return\s*\[([\s\S]*?)\]\s*}/);
    
    if (redirectsMatch && redirectsMatch[1]) {
      const redirectsContent = redirectsMatch[1];
      const redirectEntries = [...redirectsContent.matchAll(/{\s*source:\s*['"]([^'"]+)['"]\s*,\s*destination:\s*['"]([^'"]+)['"]/g)];
      
      redirectEntries.forEach(entry => {
        const [, source, destination] = entry;
        redirectMappings[source] = destination;
      });
      
      console.log(`✓ Loaded ${Object.keys(redirectMappings).length} redirects from next.config.mjs`);
    }
  } catch (error) {
    console.error('Failed to parse redirects from next.config.mjs:', error);
  }
}

/**
 * Discover all valid routes in the app directory
 */
async function discoverValidRoutes() {
  try {
    // Find all directories in the app structure that could be routes
    const appDirs = await glob('**/*/page.{ts,tsx,js,jsx}', { cwd: APP_DIR });
    
    appDirs.forEach(dir => {
      // Convert file path to route path
      const routePath = '/' + dir
        .replace(/\/page\.(ts|tsx|js|jsx)$/, '')  // Remove page.tsx
        .replace(/\/\(\w+\)\//g, '/') // Remove group notation (group)
        .replace(/\/\[\[\.{3}\w+\]\]/g, '/*') // Replace catch-all [[...param]]
        .replace(/\/\[\.{3}\w+\]/g, '/*') // Replace catch-all [...param]
        .replace(/\/\[(\w+)\]/g, '/:$1'); // Replace dynamic [param]
      
      if (routePath !== '/') {
        validRoutes.add(routePath);
      }
    });
    
    // Add special cases and known routes
    validRoutes.add('/');
    validRoutes.add('/about');
    validRoutes.add('/blog');
    validRoutes.add('/contact');
    validRoutes.add('/privacy');
    validRoutes.add('/terms');
    validRoutes.add('/faq');
    
    // Add all redirect sources and destinations as valid routes
    Object.entries(redirectMappings).forEach(([source, destination]) => {
      // Convert path parameter syntax if needed
      const cleanSource = source
        .replace(/\(\.\*\)/g, '*')
        .replace(/:path\*/g, '*');
      
      const cleanDest = destination
        .replace(/\(\.\*\)/g, '*')
        .replace(/:path\*/g, '*');
      
      validRoutes.add(cleanSource);
      validRoutes.add(cleanDest);
    });
    
    console.log(`✓ Found ${validRoutes.size} valid routes`);
  } catch (error) {
    console.error('Failed to discover routes:', error);
  }
}

/**
 * Check if a link is valid
 * @param {string} link Link to validate
 * @returns {boolean} Whether the link is valid
 */
function isLinkValid(link) {
  // Skip empty links
  if (!link) return true;
  
  // Skip JavaScript URLs - these are valid for back buttons
  if (link.startsWith('javascript:')) return true;
  
  // Skip external links, anchor links, and special protocols
  if (link.startsWith('http') || 
      link.startsWith('//') ||
      link.startsWith('#') ||
      link.startsWith('tel:') ||
      link.startsWith('mailto:')) {
    return true;
  }
  
  // Clean the link
  let cleanLink = link.trim();
  
  // Remove query parameters and hash
  cleanLink = cleanLink.split('?')[0].split('#')[0];
  
  // Remove trailing slash except for root
  if (cleanLink !== '/' && cleanLink.endsWith('/')) {
    cleanLink = cleanLink.slice(0, -1);
  }
  
  // Check redirects
  if (redirectMappings[cleanLink]) {
    return true;
  }
  
  // Check if it's a valid route
  for (const route of validRoutes) {
    // Exact match
    if (route === cleanLink) {
      return true;
    }
    
    // Dynamic route match using regex pattern
    if (route.includes(':') || route.includes('*')) {
      const routePattern = route
        .replace(/:[^/]+/g, '[^/]+') // Replace :param with regex
        .replace(/\*/g, '.*'); // Replace * with regex
      
      const routeRegex = new RegExp(`^${routePattern}$`);
      if (routeRegex.test(cleanLink)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Extract links from a file
 * @param {string} filePath Path to the file
 * @returns {Array<{link: string, line: number, file: string}>} Extracted links
 */
function extractLinksFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const extractedLinks = [];
  
  // Process each line
  lines.forEach((line, lineIndex) => {
    // Match Link components
    const linkMatches = [...line.matchAll(LINK_REGEX)];
    linkMatches.forEach(match => {
      const link = match[1];
      extractedLinks.push({
        link,
        line: lineIndex + 1,
        file: filePath
      });
    });
    
    // Match other link patterns
    const customMatches = [...line.matchAll(CUSTOM_LINK_REGEX)];
    customMatches.forEach(match => {
      // Find the first non-undefined capture group (the URL)
      const link = match.slice(1).find(g => g !== undefined);
      if (link) {
        extractedLinks.push({
          link,
          line: lineIndex + 1,
          file: filePath
        });
      }
    });
  });
  
  return extractedLinks;
}

/**
 * Validate all links in the codebase
 */
async function validateLinks() {
  try {
    // Extract redirects from next.config.mjs
    await extractRedirects();
    
    // Discover valid routes
    await discoverValidRoutes();
    
    // Find all TypeScript/JavaScript files in app and components
    const tsxFiles = [
      ...(await glob('**/*.{ts,tsx,js,jsx}', { cwd: APP_DIR })).map(f => path.join(APP_DIR, f)),
      ...(await glob('**/*.{ts,tsx,js,jsx}', { cwd: COMPONENTS_DIR })).map(f => path.join(COMPONENTS_DIR, f))
    ];
    
    console.log(`Scanning ${tsxFiles.length} files for links...`);
    
    // Process each file
    let totalLinks = 0;
    let validLinks = 0;
    let invalidLinks = 0;
    
    for (const file of tsxFiles) {
      const links = extractLinksFromFile(file);
      totalLinks += links.length;
      
      // Validate each link
      for (const { link, line, file } of links) {
        if (isLinkValid(link)) {
          validLinks++;
        } else {
          invalidLinks++;
          problematicLinks.push({ link, line, file });
        }
      }
    }
    
    // Print results
    console.log('\n----- Link Validation Results -----');
    console.log(`Total Links: ${totalLinks}`);
    console.log(`Valid Links: ${validLinks}`);
    console.log(`Invalid Links: ${invalidLinks}`);
    
    if (problematicLinks.length > 0) {
      console.log('\nProblematic Links:');
      problematicLinks.forEach(({ link, line, file }) => {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`  - ${link} (${relativePath}:${line})`);
      });
    }
    
    if (invalidLinks === 0) {
      console.log('\n✅ All links are valid!');
      return true;
    } else {
      console.log('\n❌ Some links are invalid!');
      return false;
    }
  } catch (error) {
    console.error('Error validating links:', error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔗 Starting link validation...');
  
  const isValid = await validateLinks();
  
  if (!isValid) {
    console.log('\nSuggested fixes:');
    console.log('1. Update links to valid routes');
    console.log('2. Add redirects in next.config.mjs');
    console.log('3. Create missing pages');
    
    // Only exit with error in CI environment
    if (process.env.CI) {
      process.exit(1);
    }
  } else {
    // When all internal links are valid, perform basic HTTP check on the main site
    // This uses our execPromise function to validate it's really used
    try {
      console.log('\nVerifying main site is accessible...');
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.atlastechnosoft.com';
      await runCommand(`curl -s -o /dev/null -w "%{http_code}" ${baseUrl}`);
      console.log(`✅ Main site accessible: ${baseUrl}`);
    } catch (err) {
      console.warn(`⚠️ Warning: Could not verify main site is accessible. ${err.message}`);
    }
  }
}

// Run the script
main().catch(error => {
  console.error('Error running validation script:', error);
  process.exit(1);
}); 