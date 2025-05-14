#!/usr/bin/env node

/**
 * Image Verification Script
 * 
 * This script scans the components directory for image references
 * and verifies that the referenced images exist in the public directory.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = require('glob');

const readFile = promisify(fs.readFile);

// Path to the components directory
const componentsDir = path.resolve(__dirname, '../components');
// Path to the public directory
const publicDir = path.resolve(__dirname, '../public');

// Regular expression to match image paths in src attributes
const imgSrcRegex = /src=["']\/images\/([^"']+)["']/g;

// Function to extract image paths from a file
async function extractImagePaths(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const matches = [...content.matchAll(imgSrcRegex)];
    return matches.map(match => match[1]);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Function to verify if an image exists
function verifyImageExists(imagePath) {
  const fullPath = path.join(publicDir, 'images', imagePath);
  return {
    path: imagePath,
    exists: fs.existsSync(fullPath),
    fullPath
  };
}

// Find files using glob (synchronous version)
function findFiles(pattern) {
  return glob.sync(pattern);
}

// Main function
async function main() {
  try {
    // Find all .tsx and .jsx files in the components directory
    const files = findFiles(`${componentsDir}/**/*.{tsx,jsx}`);
    console.log(`Found ${files.length} component files to scan.`);

    let allImagePaths = [];

    // Extract image paths from each file
    for (const file of files) {
      const imagePaths = await extractImagePaths(file);
      if (imagePaths.length > 0) {
        allImagePaths = [...allImagePaths, ...imagePaths.map(imgPath => ({ file, imgPath }))];
      }
    }

    console.log(`Found ${allImagePaths.length} image references.`);

    // Verify each image path
    const results = [];
    for (const { file, imgPath } of allImagePaths) {
      const result = verifyImageExists(imgPath);
      results.push({
        file: path.relative(process.cwd(), file),
        ...result
      });
    }

    // Report missing images
    const missingImages = results.filter(result => !result.exists);
    
    if (missingImages.length > 0) {
      console.error('\nMissing Images:');
      missingImages.forEach(img => {
        console.error(`- ${img.path} (referenced in ${img.file})`);
      });
      console.error(`\n${missingImages.length} images are missing.`);
      
      // Create a list of unique missing images
      const uniqueMissingPaths = [...new Set(missingImages.map(img => img.path))];
      console.log('\nUnique missing images:');
      uniqueMissingPaths.forEach(path => {
        console.log(`- ${path}`);
      });
      
      process.exit(1);
    } else {
      console.log('\nAll image references were verified successfully!');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 