#!/usr/bin/env node
/**
 * Scans images/events/ subfolders and updates data-gallery attributes
 * in events.html automatically. Also sets the first image as the card's
 * <img> src and updates the gallery indicator count.
 *
 * Usage:  node build-galleries.js
 * Run this whenever you add/remove photos from images/events/ folders.
 */

const fs = require('fs');
const path = require('path');

const EVENTS_DIR = path.join(__dirname, 'images', 'events');
const HTML_FILE = path.join(__dirname, 'events.html');
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Map folder names to data-event-name values (for matching)
function getFolderImages(folder) {
  const fullPath = path.join(EVENTS_DIR, folder);
  if (!fs.statSync(fullPath).isDirectory()) return [];
  return fs.readdirSync(fullPath)
    .filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => `images/events/${folder}/${f}`);
}

// Read HTML
let html = fs.readFileSync(HTML_FILE, 'utf8');

// Get all event folders
const folders = fs.readdirSync(EVENTS_DIR)
  .filter(f => {
    const full = path.join(EVENTS_DIR, f);
    return fs.statSync(full).isDirectory();
  });

let updated = 0;

for (const folder of folders) {
  const images = getFolderImages(folder);
  if (images.length === 0) continue;

  // Build regex to find data-gallery attributes that reference this folder
  // Match: data-gallery="images/events/<folder>/..."
  const galleryRegex = new RegExp(
    `data-gallery="images/events/${folder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"`,
    'g'
  );

  const newGallery = `data-gallery="${images.join(',')}"`;

  if (galleryRegex.test(html)) {
    html = html.replace(galleryRegex, newGallery);

    // Update the img src to first image in folder
    const srcRegex = new RegExp(
      `<img src="images/events/${folder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"`,
      'g'
    );
    html = html.replace(srcRegex, `<img src="${images[0]}"`);

    // Update gallery indicator text
    const countText = images.length > 1
      ? `${images.length} Photos`
      : 'View Photos';

    // Find the gallery indicator near this folder's data-gallery and update its text
    const indicatorRegex = new RegExp(
      `(data-gallery="${images.join(',').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?<div class="gallery-indicator">.*?</svg>)\\s*[^<]+</div>`,
      'g'
    );
    html = html.replace(indicatorRegex, `$1 ${countText}</div>`);

    updated++;
    console.log(`  ${folder}: ${images.length} image(s)`);
  }
}

fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log(`\nDone! Updated ${updated} event(s) in events.html`);
