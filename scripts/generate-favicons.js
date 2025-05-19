const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create favicon directory if it doesn't exist
const faviconDir = path.join(__dirname, '../public/favicon');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

const inputFile = path.join(__dirname, '../public/images/Main_Logo.png');

// Generate different favicon sizes
async function generateFavicons() {
  try {
    // 16x16 favicon
    await sharp(inputFile)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'favicon-16x16.png'));
    
    // 32x32 favicon
    await sharp(inputFile)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'favicon-32x32.png'));
    
    // 48x48 favicon
    await sharp(inputFile)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'favicon-48x48.png'));
    
    // 192x192 favicon for Android
    await sharp(inputFile)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'android-chrome-192x192.png'));
    
    // 512x512 favicon for Android
    await sharp(inputFile)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'android-chrome-512x512.png'));
    
    // 180x180 Apple touch icon
    await sharp(inputFile)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'apple-touch-icon.png'));
    
    // Generate .ico file (which browsers prefer)
    await sharp(inputFile)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(faviconDir, 'favicon.ico'));

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 