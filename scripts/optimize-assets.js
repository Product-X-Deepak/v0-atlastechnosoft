#!/usr/bin/env node

/**
 * Post-Build Asset Optimization Script
 * 
 * This script optimizes assets after a Next.js production build:
 * - Compresses JavaScript and CSS files
 * - Optimizes images in the public directory
 * 
 * Usage:
 *   node scripts/optimize-assets.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const zlib = require('zlib');

// Configuration
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BUILD_DIR = path.join(process.cwd(), '.next');
const STATIC_DIR = path.join(BUILD_DIR, 'static');
const IMAGE_DIRS = [
  path.join(PUBLIC_DIR, 'images')
];
const COMPRESSION_THRESHOLD = 10 * 1024; // 10KB

// Utility for executing commands
function execute(command) {
  try {
    console.log(`Executing: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Check if a module is available
function isModuleAvailable(moduleName) {
  try {
    require.resolve(moduleName);
    return true;
  } catch (e) {
    return false;
  }
}

// Compress a single file with gzip
function compressFile(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    
    // Skip small files
    if (content.length < COMPRESSION_THRESHOLD) {
      return false;
    }
    
    const gzipped = zlib.gzipSync(content, { level: zlib.constants.Z_BEST_COMPRESSION });
    fs.writeFileSync(`${filePath}.gz`, gzipped);
    
    const originalSize = content.length;
    const compressedSize = gzipped.length;
    const savingsPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    console.log(`Compressed: ${path.basename(filePath)} - ${savingsPercent}% smaller`);
    return true;
  } catch (error) {
    console.warn(`Failed to compress ${filePath}: ${error.message}`);
    return false;
  }
}

// Recursively find and compress JS and CSS files
function compressJsAndCss(directory) {
  try {
    let compressedCount = 0;
    const processDirectory = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          processDirectory(itemPath);
        } else if (
          (item.endsWith('.js') || item.endsWith('.css')) &&
          !item.includes('.min.') && // Skip already minified files
          !fs.existsSync(`${itemPath}.gz`) // Skip already compressed files
        ) {
          if (compressFile(itemPath)) {
            compressedCount++;
          }
        }
      });
    };
    
    processDirectory(directory);
    return compressedCount;
  } catch (error) {
    console.error(`Error in compressJsAndCss: ${error}`);
    return 0;
  }
}

// Optimize images using available tools
function optimizeImages() {
  // Check for available image optimization tools
  const hasImagemin = isModuleAvailable('imagemin');
  const hasMozjpeg = isModuleAvailable('imagemin-mozjpeg');
  const hasOptipng = isModuleAvailable('imagemin-optipng');
  const hasGifsicle = isModuleAvailable('imagemin-gifsicle');
  const hasSvgo = isModuleAvailable('imagemin-svgo');
  const hasSharp = isModuleAvailable('sharp');
  
  console.log('Image optimization availability:');
  console.log(`- imagemin: ${hasImagemin ? 'Available' : 'Not available'}`);
  console.log(`- mozjpeg: ${hasMozjpeg ? 'Available' : 'Not available'}`);
  console.log(`- optipng: ${hasOptipng ? 'Available' : 'Not available'}`);
  console.log(`- gifsicle: ${hasGifsicle ? 'Available' : 'Not available'}`);
  console.log(`- svgo: ${hasSvgo ? 'Available' : 'Not available'}`);
  console.log(`- sharp: ${hasSharp ? 'Available' : 'Not available'}`);
  
  if (!hasImagemin) {
    console.warn('Imagemin is not available. Skipping image optimization.');
    return;
  }
  
  // Process each image directory
  IMAGE_DIRS.forEach(imageDir => {
    if (!fs.existsSync(imageDir)) {
      console.log(`Image directory doesn't exist: ${imageDir}`);
      return;
    }
    
    console.log(`Optimizing images in: ${imageDir}`);
    
    // Use the APIs directly to avoid CLI dependency
    try {
      const imagemin = require('imagemin');
      const plugins = [];
      
      if (hasMozjpeg) {
        plugins.push(require('imagemin-mozjpeg')({ quality: 80, progressive: true }));
      }
      
      if (hasOptipng) {
        plugins.push(require('imagemin-optipng')({ optimizationLevel: 5 }));
      }
      
      if (hasGifsicle) {
        plugins.push(require('imagemin-gifsicle')({ interlaced: true, optimizationLevel: 3 }));
      }
      
      if (hasSvgo) {
        plugins.push(require('imagemin-svgo')({
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }));
      }
      
      if (plugins.length === 0) {
        console.warn('No image optimization plugins available');
        return;
      }
      
      // Run imagemin
      const files = [
        path.join(imageDir, '**/*.jpg'),
        path.join(imageDir, '**/*.jpeg'),
        path.join(imageDir, '**/*.png'),
        path.join(imageDir, '**/*.gif'),
        path.join(imageDir, '**/*.svg')
      ];
      
      imagemin(files, {
        destination: imageDir,
        plugins: plugins
      }).then(files => {
        console.log(`${files.length} images optimized`);
      });
    } catch (error) {
      console.error(`Error optimizing images: ${error}`);
    }
  });
}

// Main function
async function main() {
  console.log('====================================');
  console.log('Starting post-build asset optimization');
  console.log('====================================');
  
  // 1. Compress JS and CSS files
  console.log('\n--- Compressing JS and CSS files ---');
  const compressedFiles = compressJsAndCss(STATIC_DIR);
  console.log(`Compressed ${compressedFiles} files`);
  
  // 2. Optimize images
  console.log('\n--- Optimizing images ---');
  optimizeImages();
  
  console.log('\n====================================');
  console.log('Asset optimization completed');
  console.log('====================================');
}

// Run the script
main().catch(error => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
}); 