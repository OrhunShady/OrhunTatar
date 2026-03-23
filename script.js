/* ===========================
   script.js — Orhun Tatar Blog
   =========================== */

// ── Hamburger Menu ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});


// ── Header scroll effect ────────────────────────────────
const siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    siteHeader.style.borderBottomColor = '#333';
  } else {
    siteHeader.style.borderBottomColor = '';
  }
}, { passive: true });


// ── Scroll-reveal for post cards ────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = (parseInt(el.dataset.index) || 0) * 100;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.post-card').forEach(card => observer.observe(card));


// ── Stat counter animation ──────────────────────────────
function animateCount(el, target, duration = 1000) {
  if (isNaN(target)) return; // skip non-numeric like "∞" or "B1"
  let start = 0;
  const step = (timestamp) => {
    if (!step.start) step.start = timestamp;
    const progress = Math.min((timestamp - step.start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEls = document.querySelectorAll('.stat-num');
        numEls.forEach(el => {
          const raw = el.textContent.trim();
          const num = parseInt(raw);
          if (!isNaN(num) && !el.dataset.animated) {
            el.dataset.animated = 'true';
            animateCount(el, num);
          }
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);


// ── Terminal typing effect ──────────────────────────────
const terminalLines = document.querySelectorAll('.terminal-body p');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s ease';
    line.style.opacity = '1';
  }, 800 + i * 350);
});


// ── Active nav highlight on scroll ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));


// ── Keyboard shortcut: press G to go to GitHub ──────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'g' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
    window.open('https://github.com/OrhunShady', '_blank');
  }
});

console.log('%c[OT] Blog yüklendi.', 'color:#e8ff47; font-family:monospace; font-size:14px;');
console.log('%cGitHub: https://github.com/OrhunShady', 'color:#888; font-family:monospace;');