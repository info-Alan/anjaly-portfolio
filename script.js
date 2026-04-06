/* ═══════════════════════════════════════════════════
   script.js — Anjali PA Portfolio — Interactions
   ═══════════════════════════════════════════════════ */

'use strict';

// ── Cursor Glow ──────────────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Mobile Menu Toggle ────────────────────────────────
const menuToggle  = document.getElementById('menu-toggle');
const navLinks    = document.getElementById('nav-links');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
// Close on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === id);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── Scroll-triggered animations ───────────────────────
const animatedEls = document.querySelectorAll('[data-aos], .skill-card, .timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => observer.observe(el));


// ── Portfolio Filter ──────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── Lightbox ──────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbTitle  = document.getElementById('lb-title');
const lbClose  = document.getElementById('lb-close');
const lbPrev   = document.getElementById('lb-prev');
const lbNext   = document.getElementById('lb-next');

let visibleZoomBtns = [];
let currentLbIdx = 0;

function buildZoomList() {
  visibleZoomBtns = Array.from(document.querySelectorAll('.portfolio-item:not(.hidden) .pi-zoom'));
}

function openLightbox(btn) {
  buildZoomList();
  currentLbIdx = visibleZoomBtns.indexOf(btn);
  showLbImage(currentLbIdx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbImage(idx) {
  const btn = visibleZoomBtns[idx];
  if (!btn) return;
  lbImg.src        = btn.dataset.src;
  lbTitle.textContent = btn.dataset.title || '';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

document.addEventListener('click', (e) => {
  const zoomBtn = e.target.closest('.pi-zoom');
  if (zoomBtn) openLightbox(zoomBtn);
});

lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

lbPrev?.addEventListener('click', () => {
  currentLbIdx = (currentLbIdx - 1 + visibleZoomBtns.length) % visibleZoomBtns.length;
  showLbImage(currentLbIdx);
});
lbNext?.addEventListener('click', () => {
  currentLbIdx = (currentLbIdx + 1) % visibleZoomBtns.length;
  showLbImage(currentLbIdx);
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev?.click();
  if (e.key === 'ArrowRight') lbNext?.click();
});


// ── Scroll To Top ─────────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Smooth scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
