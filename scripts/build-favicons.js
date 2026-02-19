#!/usr/bin/env node
/**
 * Generates favicon PNG and ICO from favicon.svg
 * Run: node scripts/build-favicons.js
 */
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../src/assets/icons');
const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.error('Install sharp: npm install --save-dev sharp');
    process.exit(1);
  }

  const svgPath = path.join(ICONS_DIR, 'favicon.svg');
  if (!fs.existsSync(svgPath)) {
    console.error('Missing favicon.svg in src/assets/icons/');
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(svgPath);

  for (const { name, size } of SIZES) {
    const dest = path.join(ICONS_DIR, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(dest);
    const stats = fs.statSync(dest);
    console.log(`  ${name}: ${(stats.size / 1024).toFixed(1)} KiB`);
  }

  // favicon.ico (16 + 32) – wymaga to-ico
  try {
    const toIco = require('to-ico');
    const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
    const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
    const ico = await toIco([png16, png32]);
    fs.writeFileSync(path.join(ICONS_DIR, 'favicon.ico'), ico);
    console.log('  favicon.ico: created');
  } catch (e) {
    console.warn('  favicon.ico: skip (install to-ico for ICO support)');
  }

  console.log('Favicons built.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
