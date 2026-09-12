import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const stagingCore = path.join(projectRoot, 'staging-core');

console.log('📦 Starting Clean Packaging Process...');

// 1. Clean Staging
if (fs.existsSync(stagingCore)) {
  fs.rmSync(stagingCore, { recursive: true, force: true });
}
fs.mkdirSync(stagingCore, { recursive: true });

// 2. Copy items for rvs-website-core (Everything in dist EXCEPT syllabus and videos)
const items = fs.readdirSync(distDir);
for (const item of items) {
  if (item === 'syllabus' || item === 'videos') continue;
  const src = path.join(distDir, item);
  const dest = path.join(stagingCore, item);
  fs.cpSync(src, dest, { recursive: true });
  console.log(`  ✓ Copied: ${item}`);
}

// 3. Create rvs-website-core.zip
const zipCore = path.join(projectRoot, 'rvs-website-core.zip');
if (fs.existsSync(zipCore)) {
  fs.unlinkSync(zipCore);
}

const psZipCore = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${stagingCore}', '${zipCore}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`;
execSync(`powershell -Command "${psZipCore}"`, { stdio: 'inherit' });
console.log(`✅ Successfully created: rvs-website-core.zip (${(fs.statSync(zipCore).size / (1024 * 1024)).toFixed(2)} MB)`);

// 4. Create rvs-assets-only.zip (only the assets/ folder)
const zipAssets = path.join(projectRoot, 'rvs-assets-only.zip');
if (fs.existsSync(zipAssets)) {
  fs.unlinkSync(zipAssets);
}
const assetsDir = path.join(distDir, 'assets');
const psZipAssets = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${assetsDir}', '${zipAssets}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`;
execSync(`powershell -Command "${psZipAssets}"`, { stdio: 'inherit' });
console.log(`✅ Successfully created: rvs-assets-only.zip (${(fs.statSync(zipAssets).size / (1024 * 1024)).toFixed(2)} MB)`);

// 5. Create rvs-images-only.zip (contains the images/ folder with rankings/accreditations/banners)
const zipImages = path.join(projectRoot, 'rvs-images-only.zip');
if (fs.existsSync(zipImages)) {
  fs.unlinkSync(zipImages);
}
const stagingImages = path.join(projectRoot, 'staging-images');
if (fs.existsSync(stagingImages)) {
  fs.rmSync(stagingImages, { recursive: true, force: true });
}
fs.mkdirSync(path.join(stagingImages, 'images'), { recursive: true });
fs.cpSync(path.join(projectRoot, 'public', 'images'), path.join(stagingImages, 'images'), { recursive: true });

const psZipImages = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${stagingImages}', '${zipImages}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`;
execSync(`powershell -Command "${psZipImages}"`, { stdio: 'inherit' });
fs.rmSync(stagingImages, { recursive: true, force: true });
console.log(`✅ Successfully created: rvs-images-only.zip (${(fs.statSync(zipImages).size / (1024 * 1024)).toFixed(2)} MB)`);

// 6. Clean staging directory
fs.rmSync(stagingCore, { recursive: true, force: true });
console.log('🎉 Packaging complete!');
