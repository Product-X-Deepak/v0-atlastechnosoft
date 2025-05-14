#!/usr/bin/env node

/**
 * Post-Build Asset Optimization Script
 * 
 * This script optimizes assets after a Next.js production build:
 * - Compresses JavaScript and CSS files
 * - Optimizes images in the public directory
 * - Processes and optimizes videos
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
const VIDEO_DIRS = [
  path.join(PUBLIC_DIR, 'videos')
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

// Optimize videos using next-video if available
function optimizeVideos() {
  const hasNextVideo = isModuleAvailable('next-video');
  const hasFFmpeg = checkFFmpegAvailable();
  
  console.log(`Video optimization availability:`);
  console.log(`- next-video: ${hasNextVideo ? 'Available' : 'Not available'}`);
  console.log(`- ffmpeg: ${hasFFmpeg ? 'Available' : 'Not available'}`);
  
  if (!hasNextVideo && !hasFFmpeg) {
    console.warn('Neither next-video nor ffmpeg is available. Skipping video optimization.');
    return;
  }
  
  VIDEO_DIRS.forEach(videoDir => {
    if (!fs.existsSync(videoDir)) {
      console.log(`Video directory doesn't exist: ${videoDir}`);
      return;
    }
    
    console.log(`Processing videos in: ${videoDir}`);
    
    try {
      if (hasNextVideo) {
        processWithNextVideo(videoDir);
      } else if (hasFFmpeg) {
        processWithFFmpeg(videoDir);
      }
    } catch (error) {
      console.error(`Error in video optimization: ${error}`);
    }
  });
}

// Process videos using next-video
function processWithNextVideo(videoDir) {
  // Create next-video.json config if it doesn't exist
  const configPath = path.join(process.cwd(), 'next-video.json');
  if (!fs.existsSync(configPath)) {
    const configContent = {
      "folder": "public/videos",
      "input": ["public/videos/**/*.{mp4,mov,webm}"],
      "provider": "static",
      "output": "public/videos/processed",
      "credentials": {},
      "maxDuration": 300,
      "transcode": {
        "video": {
          "codec": "h264",
          "resolution": {
            "width": 1280,
            "height": null
          },
          "resizeMode": "preserve",
          "crf": 23
        },
        "audio": {
          "codec": "aac",
          "bitrate": "128k"
        },
        "format": "mp4"
      }
    };
    fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2));
    console.log(`Created next-video.json configuration file`);
  }

  // Use next-video to process all videos in the directory
  try {
    // We're in CommonJS context here, so we can use require
    const { processVideo } = require('next-video/process');
    
    // Find video files
    const processDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          processDirectory(itemPath);
        } else if (
          item.endsWith('.mp4') || 
          item.endsWith('.webm') || 
          item.endsWith('.mov')
        ) {
          console.log(`Processing video with next-video: ${itemPath}`);
          processVideo(itemPath, {
            outputDir: path.join(videoDir, 'processed'),
            shouldTranscode: true
          }).catch(err => {
            console.error(`Error processing video ${item}:`, err);
          });
        }
      });
    };
    
    processDirectory(videoDir);
  } catch (error) {
    console.error(`Error using next-video: ${error}`);
    if (checkFFmpegAvailable()) {
      console.log('Falling back to direct FFmpeg processing...');
      processWithFFmpeg(videoDir);
    }
  }
}

// Process videos using FFmpeg directly
function processWithFFmpeg(videoDir) {
  // Check if FFmpeg is available
  if (!checkFFmpegAvailable()) {
    console.warn('FFmpeg is not available. Skipping video processing.');
    return;
  }
  
  const outputDir = path.join(videoDir, 'processed');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Find and process video files
  const processDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && itemPath !== outputDir) {
        processDirectory(itemPath);
      } else if (
        item.endsWith('.mp4') || 
        item.endsWith('.webm') || 
        item.endsWith('.mov')
      ) {
        // Skip already processed files
        if (itemPath.includes('processed')) return;
        
        const outputFilename = path.join(
          outputDir, 
          path.basename(item, path.extname(item)) + '.mp4'
        );
        
        // Skip if output already exists
        if (fs.existsSync(outputFilename)) {
          console.log(`Skipping already processed video: ${item}`);
          return;
        }
        
        console.log(`Processing video with FFmpeg: ${itemPath}`);
        
        try {
          // Optimize with FFmpeg using H.264 for maximum compatibility
          const command = `ffmpeg -i "${itemPath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart -vf "scale='min(1280,iw)':'-2'" "${outputFilename}"`;
          
          execSync(command, { stdio: 'inherit' });
          console.log(`Successfully processed video: ${item}`);
        } catch (err) {
          console.error(`Error processing video ${item}:`, err.message);
        }
      }
    });
  };
  
  processDirectory(videoDir);
}

// Check if FFmpeg is available on the system
function checkFFmpegAvailable() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
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
  
  // 3. Optimize videos
  console.log('\n--- Processing videos ---');
  optimizeVideos();
  
  console.log('\n====================================');
  console.log('Asset optimization completed');
  console.log('====================================');
}

// Run the script
main().catch(error => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
}); 