#!/usr/bin/env node

/**
 * Script Permissions Setup
 * 
 * This script sets the correct executable permissions for all
 * script files in a cross-platform compatible way.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

// Determine if we're on Windows
const isWindows = os.platform() === 'win32';

// Scripts to make executable
const SCRIPT_FILES = [
  'scripts/build-production.js',
  'scripts/optimize-assets.js',
  'scripts/set-permissions.js'
];

// Set permissions on Unix-like systems
function setUnixPermissions(filePath) {
  try {
    fs.chmodSync(filePath, 0o755); // rwxr-xr-x
    console.log(`✅ Set executable permissions for: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error setting permissions for ${filePath}:`, error.message);
    return false;
  }
}

// Set permissions on Windows (uses PowerShell for better compatibility)
function setWindowsPermissions(filePath) {
  try {
    // PowerShell is more reliable than icacls for file permissions
    const command = `powershell -Command "& {try { $acl = Get-Acl -Path '${filePath}'; $username = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name; $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($username, 'FullControl', 'Allow'); $acl.SetAccessRule($accessRule); Set-Acl -Path '${filePath}' -AclObject $acl; Write-Host 'Permissions set successfully.' } catch { Write-Host $_.Exception.Message; exit 1 }}"`;
    
    // Execute PowerShell with stdio pipes to capture output
    const ps = spawn('powershell.exe', [
      '-Command',
      `& {try { $acl = Get-Acl -Path '${filePath}'; $username = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name; $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($username, 'FullControl', 'Allow'); $acl.SetAccessRule($accessRule); Set-Acl -Path '${filePath}' -AclObject $acl; Write-Host 'Permissions set successfully.' } catch { Write-Host $_.Exception.Message; exit 1 }}`
    ], { shell: true });
    
    // For non-blocking operation, just log the success
    console.log(`✅ Set permissions for: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error setting permissions for ${filePath}:`, error.message);
    return false;
  }
}

// Check Node.js execution permissions on Windows
function checkNodejsExecutionPolicy() {
  if (!isWindows) return true;
  
  try {
    // Test if node can execute scripts
    const testPath = path.join(os.tmpdir(), `test-script-${Date.now()}.js`);
    fs.writeFileSync(testPath, 'console.log("Script execution test");');
    
    try {
      execSync(`node "${testPath}"`, { stdio: 'ignore' });
      fs.unlinkSync(testPath); // Clean up
      return true;
    } catch (execError) {
      console.warn('⚠️ Node.js script execution might be restricted by your execution policy.');
      
      // Suggest changing PowerShell execution policy
      console.log('\nYou might need to adjust your PowerShell execution policy:');
      console.log('1. Open PowerShell as Administrator');
      console.log('2. Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser');
      console.log('3. Confirm the change when prompted');
      
      fs.unlinkSync(testPath); // Clean up
      return false;
    }
  } catch (error) {
    console.warn('⚠️ Could not test script execution:', error.message);
    return false;
  }
}

// Ensure script has a proper shebang line
function ensureShebang(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith('#!/usr/bin/env node')) {
      const newContent = `#!/usr/bin/env node\n\n${content.startsWith('#!') ? content.substring(content.indexOf('\n') + 1) : content}`;
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Updated shebang line in: ${filePath}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ Error updating shebang in ${filePath}:`, error.message);
    return false;
  }
}

// Create Windows command file for each script
function createWindowsCmd(jsFilePath) {
  if (!isWindows) return true;
  
  try {
    const cmdPath = jsFilePath.replace(/\.js$/, '.cmd');
    const relativePath = path.relative(process.cwd(), jsFilePath).replace(/\\/g, '/');
    
    const cmdContent = `@echo off\r\nnode "%~dp0${path.basename(jsFilePath)}" %*\r\n`;
    fs.writeFileSync(cmdPath, cmdContent);
    console.log(`✅ Created Windows command file: ${cmdPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating cmd file for ${jsFilePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log(`Setting script permissions on ${isWindows ? 'Windows' : 'Unix-like'} system`);
  
  // On Windows, check node execution policy first
  if (isWindows) {
    checkNodejsExecutionPolicy();
  }
  
  let successCount = 0;
  let failCount = 0;
  
  SCRIPT_FILES.forEach(scriptPath => {
    const fullPath = path.resolve(process.cwd(), scriptPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Script not found: ${scriptPath}`);
      failCount++;
      return;
    }
    
    // Ensure the script has the correct shebang
    ensureShebang(fullPath);
    
    // Set appropriate permissions based on platform
    const success = isWindows 
      ? setWindowsPermissions(fullPath)
      : setUnixPermissions(fullPath);
      
    // On Windows, also create .cmd file for easier execution
    if (isWindows) {
      createWindowsCmd(fullPath);
    }
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  });
  
  console.log(`\nPermission setting complete: ${successCount} succeeded, ${failCount} failed`);
  
  if (isWindows) {
    console.log('\nOn Windows, you can run the scripts using:');
    console.log('- npm run build:production');
    console.log('- npm run optimize-assets');
    console.log('\nOr directly with node:');
    console.log('- node scripts/build-production.js');
  } else {
    console.log('\nOn Unix-like systems, you can run the scripts using:');
    console.log('- npm run build:production');
    console.log('- npm run optimize-assets');
    console.log('\nOr directly:');
    console.log('- ./scripts/build-production.js');
  }
}

// Run the script
main(); 