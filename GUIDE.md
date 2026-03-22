# Mermaid Festival Website — Editing Guide

This guide explains how to update content on the Mermaid Festival website. No coding experience needed — just a text editor (like Notepad, VS Code, or even GitHub's web editor).

---

## Quick Start

1. Open any `.html` file in a text editor
2. Look for `<!-- EDIT: ... -->` comments — these mark editable content
3. Change the text between the HTML tags
4. Save the file
5. If using GitHub Pages, push/commit your changes and the site updates automatically

---

## How to Update Images

All images live in the `images/` folder, organized by type:

```
images/
├── heroes/      ← Full-width banner images (1920x1080 recommended)
├── events/      ← Event photos (800x600 recommended)
├── sponsors/    ← Sponsor logos (PNG with transparent background, any size)
├── gallery/     ← Past event photos (any size, auto-cropped)
├── officers/    ← Officer headshots (square, 400x400 recommended)
└── food/        ← Food vendor photos (800x600 recommended)
```

**To replace a placeholder image:**
1. Name your image to match the placeholder filename (e.g., `hero-home.jpg`)
2. Drop it into the correct folder
3. The website automatically picks it up — no code changes needed!

**To use a different filename:**
1. Place your image in the appropriate folder
2. In the HTML file, find the `<img src="images/...">` tag
3. Change the `src` to match your filename
4. Update the `alt` text to describe the image

**Image tips:**
- JPG for photos, PNG for logos/graphics with transparency
- Hero images should be at least 1920px wide for best quality
- The site automatically handles different image sizes with cropping
- Compress images before uploading for faster page loads (use tinypng.com)

---

## How to Edit Each Page

### Home Page (index.html)
- **Hero section**: Update the title, subtitle, and call-to-action buttons
- **Feature cards**: Edit the 4 highlight cards (text only)
- **About section**: Update the festival story text
- **Stats**: Change the numbers and labels
- **Parking**: Update parking info and directions
- **Food**: Update food vendor cards

### Events Page (events.html)
- **Schedule overview image**: Replace with your full schedule graphic
- **Event cards**: Each event has a name, description, image, and free/paid badge

**To add a new event**, copy this block and paste it inside the `<div class="events-list">`:

```html
<div class="event-card fade-in">
  <div class="event-card-image">
    <div class="img-wrapper">
      <img src="images/events/your-event-image.jpg" alt="Event Name">
      <div class="img-placeholder">
        <span>Event Photo</span>
      </div>
    </div>
  </div>
  <div class="event-card-content">
    <div class="event-badge free">Free</div>  <!-- Change to: class="event-badge paid" and text to "$ Tickets" for paid events -->
    <h3>Event Name Here</h3>
    <p>Event description goes here.</p>
  </div>
</div>
```

### Applications Page (applications.html)
- Each form/link is an `app-item` block
- Change badge class to `pdf` or `form`
- Update the `href` with actual PDF paths or Google Form URLs

**To add a new application**, copy this block:

```html
<div class="app-item fade-in">
  <div class="app-item-info">
    <h3>Form Name</h3>
    <p>Short description of what this form is for.</p>
    <div class="app-item-type pdf">PDF Download</div>  <!-- or class="app-item-type form" for online forms -->
  </div>
  <a href="YOUR-LINK-HERE" class="btn btn-primary" target="_blank" rel="noopener">Download</a>
</div>
```

### Sponsors Page (sponsors.html)
- Organized by tier: Gold, Silver, Bronze
- Each sponsor is a `sponsor-card` with a logo image
- Move cards between tiers by cutting/pasting

### Lions Club Page (lions-club.html)
- **About text**: Update the club description
- **Community impact cards**: Update the 4 program descriptions
- **Officers**: Update names, titles, and photos
- **Members list**: Update the member names

### Photos Page (photos.html)
- Organized in sections: Queen of Lakes, Cutie King & Queen, Committee, Festival Memories
- Each photo is a `gallery-item` block
- Click any photo to see it full-size (lightbox)

**To add a new photo:**

```html
<div class="gallery-item fade-in">
  <div class="img-wrapper">
    <img src="images/gallery/your-photo.jpg" alt="Description">
    <div class="img-placeholder"><span>Photo Description</span></div>
  </div>
  <div class="gallery-caption">Caption Text Here</div>
</div>
```

### Contact Page (contact.html)
- Update address, phone, email
- Update social media links
- Map automatically shows North Webster, IN

---

## Hosting on GitHub Pages

1. Push all files to your GitHub repository
2. Go to repository **Settings** → **Pages**
3. Under "Source", select **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be live at `https://yourusername.github.io/repository-name/`

To update the site, just push new commits — GitHub Pages rebuilds automatically.

---

## Colors

The site uses these colors (defined in `css/styles.css`):
- **Navy Blue**: `#003478` (primary color)
- **Dark Navy**: `#001d3d` (footer, dark sections)
- **Gold**: `#C5972C` (accents, badges)
- **White/Off-white**: backgrounds
- **Light Blue**: `#E8F0FE` (alternate section backgrounds)
- **Light Gold**: `#F5EDD6` (warm alternate sections)

To change colors, open `css/styles.css` and edit the values in the `:root` section at the very top.

---

## Tips

- Always test changes locally before pushing (just open the HTML file in a browser)
- Keep image file sizes under 500KB for fast loading
- The site is fully responsive — test on both desktop and mobile
- When in doubt, copy an existing element and modify it rather than writing from scratch
