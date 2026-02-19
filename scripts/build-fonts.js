#!/usr/bin/env node
/**
 * Copies font files from @fontsource to src/assets/fonts/
 * Run: node scripts/build-fonts.js
 */
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '../src/assets/fonts');
const PKG = path.join(__dirname, '../node_modules');

const FONTS = [
  {
    pkg: '@fontsource/cormorant-garamond',
    files: [
      'cormorant-garamond-latin-400-normal.woff2',
      'cormorant-garamond-latin-700-normal.woff2',
      'cormorant-garamond-latin-ext-400-normal.woff2',
      'cormorant-garamond-latin-ext-700-normal.woff2',
    ],
  },
  {
    pkg: '@fontsource/dm-sans',
    files: [
      'dm-sans-latin-400-normal.woff2',
      'dm-sans-latin-700-normal.woff2',
      'dm-sans-latin-ext-400-normal.woff2',
      'dm-sans-latin-ext-700-normal.woff2',
    ],
  },
];

function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  } else {
    // Remove obsolete files – keep only those in the list
    const keep = new Set(FONTS.flatMap((f) => f.files));
    for (const name of fs.readdirSync(FONTS_DIR)) {
      if (!keep.has(name)) {
        fs.unlinkSync(path.join(FONTS_DIR, name));
      }
    }
  }

  let count = 0;
  for (const { pkg, files } of FONTS) {
    const srcDir = path.join(PKG, pkg, 'files');
    if (!fs.existsSync(srcDir)) {
      console.warn(`Skip ${pkg}: files not found`);
      continue;
    }
    for (const file of files) {
      const src = path.join(srcDir, file);
      const dest = path.join(FONTS_DIR, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        count++;
      }
    }
  }
  console.log(`Fonts: ${count} files copied to src/assets/fonts/`);
}

main();
