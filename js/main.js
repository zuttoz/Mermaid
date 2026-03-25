/* ============================================
   MERMAID FESTIVAL 2026 — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation ----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ---- Scroll Reveal Animations ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Parallax Hero Background ----
  const heroBg = document.querySelector('.hero-bg.parallax');

  if (heroBg && window.matchMedia('(min-width: 769px)').matches) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Lightbox (Gallery) ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && img.src) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ---- Image Placeholder Fallback ----
  // When an image fails to load, the placeholder behind it shows through
  document.querySelectorAll('.img-wrapper img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
    // Check if already failed (cached result)
    if (img.complete && img.naturalWidth === 0 && img.src) {
      img.style.display = 'none';
    }
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ---- Site Config Population ----
  // Fills in elements with data-config="key" using values from SITE_CONFIG
  if (typeof SITE_CONFIG !== 'undefined') {
    document.querySelectorAll('[data-config]').forEach(function(el) {
      var key = el.getAttribute('data-config');
      if (SITE_CONFIG[key] !== undefined) {
        if (el.tagName === 'A' && key === 'email') {
          el.textContent = SITE_CONFIG[key];
          el.href = 'mailto:' + SITE_CONFIG[key];
        } else if (el.tagName === 'A' && key === 'phone') {
          el.textContent = SITE_CONFIG[key];
          el.href = SITE_CONFIG.phoneLink || '';
        } else {
          el.textContent = SITE_CONFIG[key];
        }
      }
    });
  }

});
