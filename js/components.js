/* ============================================
   MERMAID FESTIVAL 2026 — SHARED COMPONENTS
   Injects nav & footer so changes only need
   to be made in one place.
   ============================================ */

(function () {

  /* ---------- Navigation ---------- */
  var nav = document.getElementById('nav-placeholder');
  if (nav) {
    nav.outerHTML =
      '<nav class="navbar" id="navbar">' +
        '<div class="nav-container">' +
          '<a href="index.html" class="nav-logo">' +
            '<img src="images/logos/mermaid-gold.png" alt="Mermaid Festival Logo" class="logo-img">' +
            '<span class="logo-text-group">' +
              '<span class="logo-text">Mermaid Festival</span>' +
              '<span class="logo-year">80th Annual &bull; North Webster, IN</span>' +
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
              '<img src="images/logos/mermaid-gold.png" alt="Mermaid Festival Logo" class="footer-logo">' +
            '</div>' +
            '<div class="footer-section">' +
              '<h3>Mermaid Festival</h3>' +
              '<p>80th Annual North Webster Mermaid Festival, proudly hosted by the North Webster Lions Club since 1946.</p>' +
              '<p>410 W. Washington St, North Webster, IN 46555</p>' +
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
              '<p>North Webster Lions Club</p>' +
              '<p>410 W. Washington St, North Webster, IN 46555</p>' +
              '<p style="margin-top: 0.5rem;"><a href="contact.html" style="color: var(--gold);">Get in Touch &rarr;</a></p>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>&copy; 2026 North Webster Mermaid Festival. All rights reserved. Hosted by the North Webster Lions Club.</p>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button class="back-to-top" id="backToTop" aria-label="Back to top">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="18 15 12 9 6 15"/>' +
        '</svg>' +
      '</button>';
  }

})();
