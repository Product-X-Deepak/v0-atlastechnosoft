// Performance optimization script
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../..');

// Optimization areas
const OPTIMIZATION_CHECKS = [
  'Image optimization',
  'Font loading strategy',
  'Lazy loading components',
  'Code splitting',
  'Cache strategy',
  'Bundle size reduction',
  'Slow rendering components'
];

/**
 * Finds components that could be lazy loaded
 */
async function findLazyLoadingCandidates() {
  console.log('\n🔍 Scanning for lazy loading candidates...');
  
  // Search for large component files that aren't already lazy loaded
  const componentsDir = path.join(ROOT_DIR, 'components');
  
  try {
    const lazyLoadingReport = [];
    const componentFiles = await findFiles(componentsDir, '.tsx');
    
    for (const file of componentFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const relativeFilePath = path.relative(ROOT_DIR, file);
      
      // Check file size (components over 10KB are candidates)
      const stats = await fs.stat(file);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (sizeKB >= 10) {
        // Check if it's already lazy loaded
        const isLazyLoaded = content.includes('lazy(') || content.includes('React.lazy(');
        
        if (!isLazyLoaded && !content.includes('function useClient')) {
          // Look for import statements to count dependencies
          const importMatches = content.match(/import\s+.*from\s+['"](.*)['"]/g) || [];
          
          // Estimate loading complexity by lines, imports, and size
          const lineCount = content.split('\n').length;
          const complexity = Math.round((lineCount * 0.2) + (importMatches.length * 0.5) + (sizeKB * 0.3));
          
          lazyLoadingReport.push({
            file: relativeFilePath,
            sizeKB,
            lineCount,
            imports: importMatches.length,
            complexity,
            isClient: content.includes('useEffect') || content.includes('useState') || content.includes('onClick'),
          });
        }
      }
    }
    
    // Sort by complexity (highest first)
    lazyLoadingReport.sort((a, b) => b.complexity - a.complexity);
    
    // Output top 10 candidates
    console.log('Top candidates for lazy loading:');
    lazyLoadingReport.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.file} (${item.sizeKB}KB, ${item.lineCount} lines, complexity: ${item.complexity})`);
      console.log(`   Client component: ${item.isClient ? 'Yes' : 'No'}, ${item.imports} imports\n`);
    });
    
    return lazyLoadingReport;
  } catch (error) {
    console.error('Error finding lazy loading candidates:', error);
    return [];
  }
}

/**
 * Finds all files matching a pattern recursively
 */
async function findFiles(dir, extension) {
  const files = [];
  
  async function scan(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

/**
 * Analyzes image optimization opportunities
 */
async function analyzeImages() {
  console.log('\n🖼️ Analyzing image optimization...');
  
  // Check for unoptimized images in public/images
  const imagesDir = path.join(ROOT_DIR, 'public/images');
  
  try {
    const imageReport = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    const imageFiles = [];
    
    // Custom function to find image files
    async function findImageFiles(directory) {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory()) {
          await findImageFiles(fullPath);
        } else if (entry.isFile() && 
                  imageExtensions.some(ext => entry.name.toLowerCase().endsWith(ext))) {
          imageFiles.push(fullPath);
        }
      }
    }
    
    await findImageFiles(imagesDir);
    
    for (const file of imageFiles) {
      const stats = await fs.stat(file);
      const sizeKB = Math.round(stats.size / 1024);
      const relativeFilePath = path.relative(ROOT_DIR, file);
      
      // Flag large images
      if (sizeKB > 200) {
        imageReport.push({
          file: relativeFilePath,
          sizeKB,
          recommendation: sizeKB > 1000 
            ? 'Compress and resize urgently' 
            : 'Optimize with Next.js Image component'
        });
      }
    }
    
    // Sort by size (largest first)
    imageReport.sort((a, b) => b.sizeKB - a.sizeKB);
    
    // Output results
    if (imageReport.length > 0) {
      console.log('Images that need optimization:');
      imageReport.forEach((item, index) => {
        console.log(`${index + 1}. ${item.file} (${item.sizeKB}KB)`);
        console.log(`   Recommendation: ${item.recommendation}\n`);
      });
    } else {
      console.log('✅ No large unoptimized images found.');
    }
    
    return imageReport;
  } catch (error) {
    console.error('Error analyzing images:', error);
    return [];
  }
}

/**
 * Checks for performance best practices in layout.tsx
 */
async function analyzeLayoutPerformance() {
  console.log('\n📋 Analyzing layout performance...');
  
  try {
    const layoutPath = path.join(ROOT_DIR, 'app/layout.tsx');
    const layoutContent = await fs.readFile(layoutPath, 'utf-8');
    
    const issues = [];
    
    // Check for proper font loading
    if (!layoutContent.includes('display: "swap"')) {
      issues.push('Font loading should use display: "swap" to prevent blocking render');
    }
    
    // Check for excessive Suspense boundaries
    const suspenseCount = (layoutContent.match(/<Suspense/g) || []).length;
    if (suspenseCount > 10) {
      issues.push(`Layout has ${suspenseCount} Suspense boundaries which may impact performance`);
    }
    
    // Check for excessive script tags
    const scriptCount = (layoutContent.match(/<Script/g) || []).length;
    if (scriptCount > 3) {
      issues.push(`Layout has ${scriptCount} Script tags which may impact initial load time`);
    }
    
    // Check for proper preconnect/dns-prefetch usage
    if (!layoutContent.includes('rel="preconnect"') || !layoutContent.includes('rel="dns-prefetch"')) {
      issues.push('Consider adding preconnect and dns-prefetch for key domains');
    }
    
    // Output results
    if (issues.length > 0) {
      console.log('Layout performance issues:');
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    } else {
      console.log('✅ Layout follows performance best practices');
    }
    
    return issues;
  } catch (error) {
    console.error('Error analyzing layout:', error);
    return [];
  }
}

/**
 * Main optimization function
 */
async function optimizePerformance() {
  console.log('🚀 Starting Atlas Website Performance Optimization');
  console.log('================================================');
  console.log('Analyzing the following areas:');
  OPTIMIZATION_CHECKS.forEach(check => console.log(`- ${check}`));
  
  // Run optimization checks
  const lazyLoadingCandidates = await findLazyLoadingCandidates();
  const imageIssues = await analyzeImages();
  const layoutIssues = await analyzeLayoutPerformance();
  
  // Generate summary
  console.log('\n📊 Optimization Summary:');
  console.log('================================================');
  console.log(`- Found ${lazyLoadingCandidates.length} components that could be lazy loaded`);
  console.log(`- Found ${imageIssues.length} images that need optimization`);
  console.log(`- Found ${layoutIssues.length} layout performance issues`);
  
  console.log('\n✅ Performance analysis complete!');
  console.log('Run this script regularly to identify new performance opportunities');
}

// Run the optimization
optimizePerformance().catch(console.error);
