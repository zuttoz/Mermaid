/* ============================================
   MERMAID FESTIVAL — SHARED COMPONENTS
   Injects nav & footer so changes only need
   to be made in one place.

   Reads from SITE_CONFIG (js/site-config.js)
   which must be loaded before this file.
   ============================================ */

(function () {

  var C = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {};

  /* ---------- Apple / Theme Meta ---------- */
  var metaTags = [
    { name: 'theme-color', content: '#001d3d', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#001d3d', media: '(prefers-color-scheme: dark)' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ];
  metaTags.forEach(function (t) {
    if (!document.querySelector('meta[name="' + t.name + '"]' + (t.media ? '[media]' : ''))) {
      var m = document.createElement('meta');
      m.name = t.name;
      m.content = t.content;
      if (t.media) m.setAttribute('media', t.media);
      document.head.appendChild(m);
    }
  });

  /* ---------- Favicon ---------- */
  if (!document.querySelector('link[rel="icon"]')) {
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'images/logos/mermaid-logo.png';
    document.head.appendChild(link);
  }

  /* ---------- Navigation ---------- */
  var nav = document.getElementById('nav-placeholder');
  if (nav) {
    nav.outerHTML =
      '<nav class="navbar" id="navbar">' +
        '<div class="nav-container">' +
          '<a href="index.html" class="nav-logo">' +
            '<img src="images/logos/mermaid-logo.png" alt="Mermaid Festival Logo" class="logo-img">' +
            '<span class="logo-text-group">' +
              '<span class="logo-text">Mermaid Festival</span>' +
              '<span class="logo-year">' + (C.edition || '80th') + ' Annual &bull; North Webster, IN</span>' +
            '</span>' +
          '</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">' +
            '<span class="hamburger"></span>' +
          '</button>' +
          '<ul class="nav-menu" id="navMenu">' +
            '<li><a href="index.html" class="nav-link">Home</a></li>' +
            '<li><a href="events.html" class="nav-link">Events</a></li>' +
            '<li><a href="applications.html" class="nav-link">Applications</a></li>' +
            '<li><a href="sponsors.html" class="nav-link">Sponsors</a></li>' +
            '<li><a href="lions-club.html" class="nav-link">Lions Club</a></li>' +
            '<li><a href="contact.html" class="nav-link">Contact</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>';
  }

  /* ---------- Footer + Back-to-Top ---------- */
  var footer = document.getElementById('footer-placeholder');
  if (footer) {
    footer.outerHTML =
      '<footer class="footer">' +
        '<div class="footer-wave">' +
          '<svg viewBox="0 0 1440 120" preserveAspectRatio="none">' +
            '<path fill="#001d3d" d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,50 1440,60 L1440,120 L0,120 Z"/>' +
          '</svg>' +
        '</div>' +
        '<div class="footer-content">' +
          '<div class="footer-grid">' +
            '<div class="footer-section footer-logo-section">' +
              '<img src="images/logos/mermaid-logo.png" alt="Mermaid Festival Logo" class="footer-logo">' +
            '</div>' +
            '<div class="footer-section">' +
              '<h3>Mermaid Festival</h3>' +
              '<p>' + (C.edition || '80th') + ' Annual ' + (C.festivalName || 'North Webster Mermaid Festival') + ', proudly hosted by the ' + (C.orgName || 'North Webster Lions Club') + ' since ' + (C.foundedYear || 1946) + '.</p>' +
              '<p>' + (C.address || '410 W. Washington St, North Webster, IN 46555') + '</p>' +
            '</div>' +
            '<div class="footer-section">' +
              '<h3>Quick Links</h3>' +
              '<div class="footer-links">' +
                '<a href="events.html">Events</a>' +
                '<a href="applications.html">Applications</a>' +
                '<a href="sponsors.html">Sponsors</a>' +
                '<a href="lions-club.html">Lions Club</a>' +
                '<a href="contact.html">Contact</a>' +
              '</div>' +
            '</div>' +
            '<div class="footer-section">' +
              '<h3>Contact</h3>' +
              '<p>' + (C.orgName || 'North Webster Lions Club') + '</p>' +
              '<p>' + (C.address || '410 W. Washington St, North Webster, IN 46555') + '</p>' +
              '<p style="margin-top: 0.5rem;"><a href="contact.html" style="color: var(--gold);">Get in Touch &rarr;</a></p>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>&copy; ' + (C.year || 2026) + ' ' + (C.festivalName || 'North Webster Mermaid Festival') + '. All rights reserved. Hosted by the ' + (C.orgName || 'North Webster Lions Club') + '.</p>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button class="back-to-top" id="backToTop" aria-label="Back to top">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="18 15 12 9 6 15"/>' +
        '</svg>' +
      '</button>';
  }

  /* ---------- Lightbox ---------- */
  if (!document.getElementById('lightbox')) {
    var lb = document.createElement('div');
    lb.className = 'lightbox-overlay';
    lb.id = 'lightbox';
    lb.innerHTML =
      '<div class="lightbox-content">' +
        '<button class="lightbox-close" id="lightboxClose">&times;</button>' +
        '<button class="lightbox-nav lightbox-prev" id="lightboxPrev">&#8249;</button>' +
        '<img src="" alt="Gallery image" id="lightboxImg">' +
        '<button class="lightbox-nav lightbox-next" id="lightboxNext">&#8250;</button>' +
        '<div class="lightbox-counter" id="lightboxCounter"></div>' +
      '</div>';
    document.body.appendChild(lb);
  }

  // Lightbox core logic
  (function() {
    var overlay = document.getElementById('lightbox');
    if (!overlay) return;
    var lbImg = document.getElementById('lightboxImg');
    var counter = document.getElementById('lightboxCounter');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    var images = [], current = 0;

    function open(srcs, idx) {
      images = srcs; current = idx || 0; show();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      prevBtn.style.display = images.length > 1 ? '' : 'none';
      nextBtn.style.display = images.length > 1 ? '' : 'none';
      counter.style.display = images.length > 1 ? '' : 'none';
    }
    function show() {
      lbImg.src = images[current];
      counter.textContent = (current + 1) + ' / ' + images.length;
    }
    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.getElementById('lightboxClose').addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    prevBtn.addEventListener('click', function() { current = (current - 1 + images.length) % images.length; show(); });
    nextBtn.addEventListener('click', function() { current = (current + 1) % images.length; show(); });
    document.addEventListener('keydown', function(e) {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { current = (current - 1 + images.length) % images.length; show(); }
      if (e.key === 'ArrowRight') { current = (current + 1) % images.length; show(); }
    });

    // Expose globally for page-specific scripts
    window.lightboxOpen = open;

    // Auto-wire [data-gallery] elements
    document.querySelectorAll('[data-gallery]').forEach(function(el) {
      var srcs = el.getAttribute('data-gallery').split(',');
      var indicator = el.querySelector('.gallery-indicator');
      var imgEl = el.querySelector('.img-wrapper img');
      var hoverIndex = 0, hoverInterval = null;

      if (indicator) {
        var isMultiple = srcs.length > 1;
        if (isMultiple) indicator.classList.add('has-multiple');

        var label = srcs.length > 1
          ? '<span class="gallery-indicator-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg> ' + srcs.length + ' Photos &mdash; Click to explore</span>'
          : '<span class="gallery-indicator-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg> View Photo</span>';

        var dots = '';
        if (srcs.length > 1) {
          var dotCount = Math.min(srcs.length, 8);
          dots = '<span class="gallery-dots">';
          for (var i = 0; i < dotCount; i++) {
            dots += '<span class="gallery-dot' + (i === 0 ? ' active' : '') + '"></span>';
          }
          if (srcs.length > 8) dots += '<span class="gallery-dot-more">+</span>';
          dots += '</span>';
        }
        indicator.innerHTML = label + dots;
      }

      // Hover slideshow
      if (srcs.length > 1 && imgEl) {
        srcs.forEach(function(s) { var i = new Image(); i.src = s; });
        var imgEl2 = document.createElement('img');
        imgEl2.alt = imgEl.alt;
        imgEl2.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.6s ease;z-index:1;';
        imgEl.parentNode.style.position = 'relative';
        imgEl.parentNode.appendChild(imgEl2);
        var showingSecond = false;

        el.addEventListener('mouseenter', function() {
          hoverIndex = 0;
          hoverInterval = setInterval(function() {
            hoverIndex = (hoverIndex + 1) % srcs.length;
            if (showingSecond) { imgEl.src = srcs[hoverIndex]; imgEl2.style.opacity = '0'; }
            else { imgEl2.src = srcs[hoverIndex]; imgEl2.style.opacity = '1'; }
            showingSecond = !showingSecond;
            var allDots = el.querySelectorAll('.gallery-dot');
            allDots.forEach(function(d, idx) { d.classList.toggle('active', idx === hoverIndex); });
          }, 2500);
        });

        el.addEventListener('mouseleave', function() {
          clearInterval(hoverInterval);
          hoverIndex = 0; showingSecond = false;
          imgEl.src = srcs[0]; imgEl2.style.opacity = '0';
          var allDots = el.querySelectorAll('.gallery-dot');
          allDots.forEach(function(d, idx) { d.classList.toggle('active', idx === 0); });
        });
      }

      el.addEventListener('click', function() { open(srcs, 0); });
    });
  })();

})();
