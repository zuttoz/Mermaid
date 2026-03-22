#!/usr/bin/env node
/**
 * Scans image folders and updates data-gallery attributes in HTML files.
 * Handles images/events/ subfolders in events.html and
 * images/tradition/ in index.html.
 *
 * Usage:  node build-galleries.js
 * Run this whenever you add/remove photos from image folders.
 */

const fs = require('fs');
const path = require('path');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getImages(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs.readdirSync(dir)
    .filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .sort();
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateGalleries(htmlPath, baseDir, prefix) {
  if (!fs.existsSync(htmlPath)) return 0;
  let html = fs.readFileSync(htmlPath, 'utf8');
  let updated = 0;

  // Check if baseDir has subfolders or is a flat image folder
  const entries = fs.readdirSync(baseDir);
  const hasSubfolders = entries.some(e => fs.statSync(path.join(baseDir, e)).isDirectory());

  if (hasSubfolders) {
    // Process each subfolder (e.g. images/events/festival-parade/)
    const folders = entries.filter(e => fs.statSync(path.join(baseDir, e)).isDirectory());

    for (const folder of folders) {
      const fullPath = path.join(baseDir, folder);
      const imgs = getImages(fullPath).map(f => `${prefix}/${folder}/${f}`);
      if (imgs.length === 0) continue;

      const galleryRegex = new RegExp(
        `data-gallery="${escapeRegex(prefix)}/${escapeRegex(folder)}[^"]*"`, 'g'
      );

      if (galleryRegex.test(html)) {
        // Reset lastIndex after test
        galleryRegex.lastIndex = 0;
        html = html.replace(galleryRegex, `data-gallery="${imgs.join(',')}"`);

        const srcRegex = new RegExp(
          `<img src="${escapeRegex(prefix)}/${escapeRegex(folder)}/[^"]*"`, 'g'
        );
        html = html.replace(srcRegex, `<img src="${imgs[0]}"`);

        updated++;
        console.log(`  ${folder}: ${imgs.length} image(s)`);
      }
    }
  } else {
    // Flat folder (e.g. images/tradition/)
    const imgs = getImages(baseDir).map(f => `${prefix}/${f}`);
    if (imgs.length === 0) return 0;

    const galleryRegex = new RegExp(
      `data-gallery="${escapeRegex(prefix)}[^"]*"`, 'g'
    );

    if (galleryRegex.test(html)) {
      galleryRegex.lastIndex = 0;
      html = html.replace(galleryRegex, `data-gallery="${imgs.join(',')}"`);

      const srcRegex = new RegExp(
        `<img src="${escapeRegex(prefix)}/[^"]*"`, 'g'
      );
      html = html.replace(srcRegex, `<img src="${imgs[0]}"`);

      updated++;
      console.log(`  tradition: ${imgs.length} image(s)`);
    }
  }

  fs.writeFileSync(htmlPath, html, 'utf8');
  return updated;
}

// Process events
console.log('Events (events.html):');
const eventsUpdated = updateGalleries(
  path.join(__dirname, 'events.html'),
  path.join(__dirname, 'images', 'events'),
  'images/events'
);

// Process tradition
console.log('\nTradition (index.html):');
const traditionUpdated = updateGalleries(
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'images', 'tradition'),
  'images/tradition'
);

console.log(`\nDone! Updated ${eventsUpdated + traditionUpdated} gallery(s).`);
