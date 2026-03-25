# Mermaid Festival Website — Editing Guide

No coding experience needed — just a text editor (like Notepad, VS Code, or GitHub's web editor).

---

## Yearly Update Checklist

At the start of each festival year, open **one file**: `js/site-config.js`

1. Update `year` (e.g. 2027)
2. Update `edition` (e.g. "81st")
3. Update `dates` (e.g. "June 16-19, 2027")
4. Update `theme` and `themeDescription`
5. Update contact info if it changed
6. Save and commit

That's it! The navigation, footer, contact page, theme section, and page titles all pull from this file automatically.

Then update page-specific content as needed:
- `index.html` — Hero text, stats, about section
- `events.html` — Event cards and schedule image
- `applications.html` — New PDF forms in the `forms/` folder
- `sponsors.html` — Sponsor logos and tiers
- `photos.html` — New gallery photos
- `lions-club.html` — Officer names and photos

---

## How Photo Galleries Work

Photo galleries are managed in **one file**: `js/galleries.js`

Each event has a list of image filenames:

```js
"festival-parade": [
  "parade_1.jpg",
  "parade_2.jpeg"
],
```

**To add a photo:**
1. Drop the image file into the right folder (e.g. `images/events/festival-parade/`)
2. Open `js/galleries.js`
3. Add the filename to that event's list
4. Save

**To remove a photo:**
1. Delete the filename from the list in `js/galleries.js`
2. Optionally delete the image file from the folder

**Tradition photos** (homepage slideshow) work the same way — they're listed under `"tradition"` in the same file, and the images go in `images/tradition/`.

---

## How to Update Images

All images live in the `images/` folder:

```
images/
├── heroes/      — Full-width banner images (1920x1080 recommended)
├── events/      — Event photos, organized by event folder
├── tradition/   — Homepage slideshow photos
├── sponsors/    — Sponsor logos (PNG with transparent background)
├── gallery/     — Past event photos
├── logos/       — Festival and Lions Club logos
├── club/        — Lions Club photos
└── hero/        — Main homepage hero image
```

**To replace an image:** name your file the same as the existing one and drop it in.

**To use a different filename:** update the `src="images/..."` path in the HTML file.

**Image tips:**
- JPG for photos, PNG for logos/graphics with transparency
- Hero images should be at least 1920px wide
- Compress images before uploading (use tinypng.com)

---

## How to Edit Each Page

### Home Page (index.html)
- **Hero section**: Update the title, subtitle, and call-to-action buttons
- **Theme callout**: Automatically pulls from `site-config.js` — no editing needed here
- **Feature cards**: Edit the 4 highlight cards (text only)
- **About section**: Update the festival story text
- **Stats**: Change the numbers and labels
- **Parking**: Update parking info and directions

### Events Page (events.html)
- **Schedule overview image**: Replace `images/events/schedule-overview.jpg`
- **Event cards**: Each event has a name, description, image, and free/paid badge

**To add a new event**, copy this block and paste it inside the events list:

```html
<div class="event-card fade-in">
  <div class="event-card-image">
    <div class="img-wrapper">
      <img src="images/events/your-event-image.jpg" alt="Event Name">
      <div class="img-placeholder"><span>Event Photo</span></div>
    </div>
  </div>
  <div class="event-card-content">
    <div class="event-badge free">Free</div>
    <h3>Event Name Here</h3>
    <p>Event description goes here.</p>
  </div>
</div>
```

Change `class="event-badge free"` to `class="event-badge paid"` and text to "$ Tickets" for paid events.

### Applications Page (applications.html)
- Each form/link is an `app-item` block
- Update the `href` with PDF paths or Google Form URLs

### Sponsors Page (sponsors.html)
- Organized by tier: Platinum, Gold, Silver, Bronze
- Each sponsor is a `sponsor-card` with a logo image
- Move cards between tiers by cutting/pasting

### Lions Club Page (lions-club.html)
- **About text**: Update the club description
- **Officers**: Update names, titles, and photos
- **Members list**: Update the member names

### Photos Page (photos.html)
- Organized in sections (Queen of Lakes, Cutie King & Queen, etc.)
- Each photo is a `gallery-item` block

### Contact Page (contact.html)
- Phone and email automatically pull from `site-config.js`
- Update address and social media links in the HTML if they change
- Map shows North Webster, IN automatically

---

## Navigation & Footer

The navigation bar and footer are shared across all pages. They live in `js/components.js` and are injected automatically.

- **Navigation links** — edit in `components.js` if you need to add/remove a page
- **Footer text** — automatically uses values from `site-config.js`
- **Copyright year** — automatically uses the year from `site-config.js`

You should rarely need to touch `components.js`.

---

## File Overview

```
js/
├── site-config.js   — UPDATE YEARLY: dates, theme, contact info
├── galleries.js     — UPDATE AS NEEDED: photo gallery lists
├── components.js    — Navigation and footer (rarely needs changes)
└── main.js          — Site functionality (don't touch)

css/
└── styles.css       — All styling

images/              — All photos, logos, and graphics
```

---

## Colors

The site uses these colors (defined at the top of `css/styles.css`):
- **Navy Blue**: `#003478` (primary)
- **Dark Navy**: `#001d3d` (footer, dark sections)
- **Gold**: `#C5972C` (accents, badges)
- **Light Blue**: `#E8F0FE` (alternate section backgrounds)

To change colors, edit the values in the `:root` section at the very top of `styles.css`.

---

## Hosting

The site works with any static hosting. Recommended: **Netlify** or **Cloudflare Pages**.

1. Connect your GitHub repository
2. Set your custom domain in the hosting dashboard
3. Point your domain's DNS to the host
4. Every time you push changes to GitHub, the site updates automatically

You can also test locally by opening any `.html` file directly in a browser.

---

## Tips

- Always test changes locally before pushing (open the HTML file in a browser)
- Keep image file sizes under 500KB for fast loading
- The site is fully responsive — test on both desktop and mobile
- When in doubt, copy an existing element and modify it rather than writing from scratch
