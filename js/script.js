/**
 * HOC Super App — script.js
 * Author : Hossein Sadeghghol Moghadam
 * Description: Main JavaScript — Loader, Navbar, Particles,
 *              Counter, Scroll Reveal, Back-to-Top, Form UX
 */

'use strict';

/* ─────────────────────────────────────────────
   1. DOM Ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initParticles();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initContactForm();
  initActiveNavLinks();
});

/* ─────────────────────────────────────────────
   2. Loader
───────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  });

  // Fallback: hide after 3s regardless
  setTimeout(() => loader.classList.add('hidden'), 3000);
}

/* ─────────────────────────────────────────────
   3. Navbar — Scroll Shrink + Mobile Toggle
───────────────────────────────────────────── */
function initNavbar() {
  const header    = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (!header) return;

  // Scroll shrink
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navList.classList.contains('open')) {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ─────────────────────────────────────────────
   4. Active Nav Links on Scroll
───────────────────────────────────────────── */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ─────────────────────────────────────────────
   5. Particle Canvas
───────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  const CONFIG = {
    count:       80,
    speed:       0.4,
    maxRadius:   2.5,
    minRadius:   0.5,
    lineDistance: 120,
    colors: ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(99,179,237,'],
  };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x      = Math.random() * canvas.width;
      this.y      = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.vx     = (Math.random() - 0.5) * CONFIG.speed;
      this.vy     = -(Math.random() * CONFIG.speed + 0.1);
      this.radius = Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius;
      this.alpha  = Math.random() * 0.5 + 0.2;
      this.color  = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  function buildParticles() {
    particles = Array.from({ length: CONFIG.count }, () => new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.lineDistance) {
          const alpha = (1 - dist / CONFIG.lineDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animId = requestAnimationFrame(animate);
  }

  // Init
  resize();
  buildParticles();
  animate();

  // Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      buildParticles();
      animate();
    }, 200);
  });
}

/* ─────────────────────────────────────────────
   6. Scroll Reveal
───────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid children
          const delay = entry.target.closest('.features__grid, .projects__grid, .about__info')
            ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100
            : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   7. Animated Counters
───────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = 16;
  const steps    = duration / step;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, step);
}

/* ─────────────────────────────────────────────
   8. Back to Top
───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   9. Contact Form UX
───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    const originalText = span.textContent;

    // Loading state
    btn.disabled = true;
    span.textContent = 'Sending...';
    btn.style.opacity = '0.7';

    // Simulate async send (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success state
    span.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.opacity = '1';

    // Show success toast
    showToast('Your message has been sent successfully!', 'success');

    // Reset after 3s
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      span.textContent = originalText;
      btn.style.background = '';
      btn.style.opacity = '';
    }, 3000);
  });

  // Real-time validation feedback
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      const isValid = input.checkValidity();
      input.style.borderColor = isValid
        ? 'rgba(16,185,129,0.5)'
        : 'rgba(239,68,68,0.5)';
    });
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
    });
  });
}

/* ─────────────────────────────────────────────
   10. Toast Notification
───────────────────────────────────────────── */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    left:         '50%',
    transform:    'translateX(-50%) translateY(20px)',
    background:   type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(0,212,255,0.95)',
    color:        '#fff',
    padding:      '0.85rem 1.75rem',
    borderRadius: '0.5rem',
    fontSize:     '0.9rem',
    fontWeight:   '600',
    zIndex:       '9999',
    opacity:      '0',
    transition:   'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    boxShadow:    '0 4px 20px rgba(0,0,0,0.3)',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
