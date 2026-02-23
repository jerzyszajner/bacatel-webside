#!/usr/bin/env node
/**
 * Converts images to WebP and creates responsive variants.
 * Run: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "../src/assets/images");
const images = [
  { name: "hero", width: 1024, height: 589, sizes: [900, 1024] },
  { name: "gallery-1", width: 1024, height: 768, sizes: [756, 1024] },
  { name: "gallery-2", width: 1024, height: 768, sizes: [756, 1024] },
  { name: "gallery-3", width: 1024, height: 768, sizes: [756, 1024] },
];

async function main() {
  for (const img of images) {
    const src = path.join(IMAGES_DIR, `${img.name}.jpg`);
    if (!fs.existsSync(src)) {
      console.warn(`Skipping (file not found): ${img.name}.jpg`);
      continue;
    }

    for (const w of img.sizes) {
      const dest = path.join(IMAGES_DIR, `${img.name}-${w}w.webp`);
      await sharp(src).resize(w).webp({ quality: 82 }).toFile(dest);
      const stats = fs.statSync(dest);
      console.log(
        `  ${img.name}-${w}w.webp: ${(stats.size / 1024).toFixed(1)} KiB`,
      );
    }
  }
  console.log("Images optimized.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
