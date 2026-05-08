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
        '<button class="lightbox-close" id="lightboxClose" aria-label="Close">&times;</button>' +
        '<button class="lightbox-nav lightbox-prev" id="lightboxPrev" aria-label="Previous">&#8249;</button>' +
        '<img src="" alt="Gallery image" id="lightboxImg">' +
        '<button class="lightbox-nav lightbox-next" id="lightboxNext" aria-label="Next">&#8250;</button>' +
        '<div class="lightbox-counter" id="lightboxCounter"></div>' +
        '<div class="lightbox-toolbar" id="lightboxToolbar" role="toolbar" aria-label="Image controls">' +
          '<button type="button" class="lightbox-tool" id="lbZoomOut" aria-label="Zoom out" title="Zoom out (or scroll wheel)">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
            '<span>Zoom Out</span>' +
          '</button>' +
          '<button type="button" class="lightbox-tool lightbox-tool-reset" id="lbZoomReset" aria-label="Reset zoom" title="Reset zoom">' +
            '<span class="lightbox-zoom-pct" id="lbZoomPct">100%</span>' +
          '</button>' +
          '<button type="button" class="lightbox-tool" id="lbZoomIn" aria-label="Zoom in" title="Zoom in (or scroll wheel)">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
            '<span>Zoom In</span>' +
          '</button>' +
          '<button type="button" class="lightbox-tool lightbox-tool-print" id="lbPrint" aria-label="Print image" title="Print this image">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>' +
            '<span>Print</span>' +
          '</button>' +
        '</div>' +
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
    var zoomInBtn = document.getElementById('lbZoomIn');
    var zoomOutBtn = document.getElementById('lbZoomOut');
    var zoomResetBtn = document.getElementById('lbZoomReset');
    var zoomPct = document.getElementById('lbZoomPct');
    var printBtn = document.getElementById('lbPrint');
    var images = [], current = 0;

    /* ---- Zoom + pan state ---- */
    var ZOOM_MIN = 1, ZOOM_MAX = 5, ZOOM_STEP = 0.4;
    var scale = 1, panX = 0, panY = 0;
    var dragStart = null;

    function applyTransform() {
      lbImg.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + scale + ')';
      lbImg.style.cursor = scale > 1 ? (dragStart ? 'grabbing' : 'grab') : '';
      if (zoomPct) zoomPct.textContent = Math.round(scale * 100) + '%';
      if (zoomOutBtn) zoomOutBtn.disabled = scale <= ZOOM_MIN + 0.001;
      if (zoomInBtn) zoomInBtn.disabled = scale >= ZOOM_MAX - 0.001;
    }
    function resetZoom() { scale = 1; panX = 0; panY = 0; applyTransform(); }
    function zoomIn() { scale = Math.min(ZOOM_MAX, +(scale + ZOOM_STEP).toFixed(2)); applyTransform(); }
    function zoomOut() {
      scale = Math.max(ZOOM_MIN, +(scale - ZOOM_STEP).toFixed(2));
      if (scale === 1) { panX = 0; panY = 0; }
      applyTransform();
    }

    function open(srcs, idx) {
      images = srcs; current = idx || 0; show();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      prevBtn.style.display = images.length > 1 ? '' : 'none';
      nextBtn.style.display = images.length > 1 ? '' : 'none';
      counter.style.display = images.length > 1 ? '' : 'none';
      resetZoom();
    }
    function show() {
      lbImg.src = images[current];
      counter.textContent = (current + 1) + ' / ' + images.length;
      resetZoom();
    }
    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      resetZoom();
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
      if (e.key === '+' || e.key === '=') { zoomIn(); e.preventDefault(); }
      if (e.key === '-' || e.key === '_') { zoomOut(); e.preventDefault(); }
      if (e.key === '0') { resetZoom(); e.preventDefault(); }
    });

    /* ---- Toolbar buttons ---- */
    if (zoomInBtn) zoomInBtn.addEventListener('click', function(e) { e.stopPropagation(); zoomIn(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', function(e) { e.stopPropagation(); zoomOut(); });
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', function(e) { e.stopPropagation(); resetZoom(); });
    if (printBtn) printBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      window.printImage(lbImg.src, lbImg.alt || 'Mermaid Festival');
    });

    /* ---- Wheel zoom ---- */
    overlay.addEventListener('wheel', function(e) {
      if (!overlay.classList.contains('active')) return;
      e.preventDefault();
      if (e.deltaY < 0) zoomIn(); else zoomOut();
    }, { passive: false });

    /* ---- Mouse drag pan ---- */
    lbImg.addEventListener('mousedown', function(e) {
      if (scale <= 1) return;
      dragStart = { x: e.clientX - panX, y: e.clientY - panY };
      applyTransform();
      e.preventDefault();
    });
    document.addEventListener('mousemove', function(e) {
      if (!dragStart) return;
      panX = e.clientX - dragStart.x;
      panY = e.clientY - dragStart.y;
      applyTransform();
    });
    document.addEventListener('mouseup', function() {
      if (!dragStart) return;
      dragStart = null;
      applyTransform();
    });

    /* ---- Touch drag pan (single finger when zoomed) ---- */
    lbImg.addEventListener('touchstart', function(e) {
      if (scale <= 1 || e.touches.length !== 1) return;
      dragStart = { x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY };
    }, { passive: true });
    lbImg.addEventListener('touchmove', function(e) {
      if (!dragStart || e.touches.length !== 1) return;
      panX = e.touches[0].clientX - dragStart.x;
      panY = e.touches[0].clientY - dragStart.y;
      applyTransform();
      e.preventDefault();
    }, { passive: false });
    lbImg.addEventListener('touchend', function() { dragStart = null; });

    /* ---- Double-click to toggle zoom ---- */
    lbImg.addEventListener('dblclick', function(e) {
      e.preventDefault();
      if (scale > 1) resetZoom(); else { scale = 2.4; applyTransform(); }
    });

    /* ---- Print helper (used by lightbox + standalone buttons) ---- */
    window.printImage = function(src, title) {
      var w = window.open('', '_blank', 'width=900,height=700');
      if (!w) { alert('Please allow popups to print this image.'); return; }
      var safeTitle = String(title || 'Print').replace(/[<>"&]/g, '');
      w.document.write(
        '<!DOCTYPE html><html><head><title>' + safeTitle + '</title>' +
        '<style>' +
          '@page { size: landscape; margin: 0.35in; }' +
          'html, body { margin: 0; padding: 0; height: 100%; width: 100%; background: #fff; }' +
          'body { display: flex; align-items: center; justify-content: center; }' +
          /* Fit image fully within the page on screen and in print */
          'img { max-width: 100%; max-height: 100%; width: auto; height: auto; display: block; object-fit: contain; }' +
          '@media print {' +
            'html, body { height: 100vh; }' +
            /* Force image to fit within printable area without overflow */
            'img { max-width: 100%; max-height: 100vh; width: auto; height: auto; }' +
          '}' +
        '</style></head><body>' +
        '<img id="printImg" src="' + src + '" alt="' + safeTitle + '">' +
        '<script>' +
          'var img = document.getElementById("printImg");' +
          'function go(){ try { window.focus(); window.print(); } catch(e){} }' +
          'if (img.complete) { setTimeout(go, 150); } else { img.onload = function(){ setTimeout(go, 150); }; }' +
          'window.onafterprint = function(){ window.close(); };' +
        '<\/script>' +
        '</body></html>'
      );
      w.document.close();
    };

    /* ---- Reset zoom when overlay opens/closes via any code path
           (e.g. main.js opens the lightbox by toggling .active directly) ---- */
    var wasActive = overlay.classList.contains('active');
    new MutationObserver(function() {
      var nowActive = overlay.classList.contains('active');
      if (nowActive !== wasActive) { resetZoom(); wasActive = nowActive; }
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });

    // Expose globally for page-specific scripts
    window.lightboxOpen = open;
    window.lightboxResetZoom = resetZoom;

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
