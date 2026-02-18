#!/usr/bin/env node
/**
 * Converts PNG to WebP and creates responsive variants.
 * Run: node scripts/optimize-images.js
 */
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');
const images = [
  { name: 'hero-sklep', width: 1024, height: 589, sizes: [900, 1024] },
  { name: 'galeria-front', width: 1024, height: 768, sizes: [756, 1024] },
  { name: 'galeria-corner', width: 1024, height: 768, sizes: [756, 1024] },
  { name: 'galeria-wnetrze', width: 1024, height: 768, sizes: [756, 1024] },
  { name: 'galeria-sklep', width: 1024, height: 589, sizes: [756, 1024] },
];

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.error('Install sharp: npm install --save-dev sharp');
    process.exit(1);
  }

  for (const img of images) {
    const src = path.join(IMAGES_DIR, `${img.name}.png`);
    if (!fs.existsSync(src)) {
      console.warn(`Skipping (file not found): ${img.name}.png`);
      continue;
    }

    for (const w of img.sizes) {
      const dest = path.join(IMAGES_DIR, `${img.name}-${w}w.webp`);
      await sharp(src)
        .resize(w)
        .webp({ quality: 82 })
        .toFile(dest);
      const stats = fs.statSync(dest);
      console.log(`  ${img.name}-${w}w.webp: ${(stats.size / 1024).toFixed(1)} KiB`);
    }
  }
  console.log('Images optimized.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
