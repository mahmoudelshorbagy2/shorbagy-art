// ==================== REDUCED MOTION DETECTION ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ==================== LANGUAGE TOGGLE ====================
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-en-alt]').forEach(el => {
    el.alt = el.getAttribute(`data-${lang}-alt`);
  });

  const toggle = document.querySelector('.lang-toggle');
  if (toggle) {
    toggle.querySelector('.toggle-text').textContent = lang === 'en' ? 'AR' : 'EN';
  }
}

function initLangToggle() {
  const toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.add('flipping');
    setTimeout(() => {
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      setLang(newLang);
      buildSkills(SITE_DATA.skillsMatrix);
      toggle.classList.remove('flipping');
    }, 200);
  });
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==================== HERO CANVAS ANIMATION ====================
function initHeroCanvas() {
  if (prefersReducedMotion.matches) return;

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  let particles = [];
  let animId;
  let isPaused = false;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    w = canvas.width = parent.offsetWidth;
    h = canvas.height = parent.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((w * h) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.12 - 0.08,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.25 + 0.04,
        life: Math.random() * 1000
      });
    }
  }

  function draw() {
    if (isPaused) return;

    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, w, h);

    const time = Date.now() * 0.0003;
    for (let i = 0; i < 3; i++) {
      const x = w * 0.5 + Math.sin(time + i * 2.1) * w * 0.3;
      const y = h * 0.5 + Math.cos(time * 0.7 + i * 1.5) * h * 0.2;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      gradient.addColorStop(0, 'rgba(201, 169, 110, 0.015)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 1;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.life * 0.01));
      ctx.fillStyle = `rgba(201, 169, 110, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  function startCanvas() {
    if (isPaused) {
      isPaused = false;
      draw();
    }
  }

  function stopCanvas() {
    isPaused = true;
    if (animId) cancelAnimationFrame(animId);
  }

  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      startCanvas();
    } else {
      stopCanvas();
    }
  }, { threshold: 0 });

  const hero = canvas.closest('.hero');
  if (hero) heroObserver.observe(hero);

  resize();
  createParticles();
  draw();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      createParticles();
    }, 150);
  });
}

// ==================== GALLERY TILT EFFECT ====================
function initGalleryEffects() {
  if (prefersReducedMotion.matches) return;

  document.querySelectorAll('.gallery-frame').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px) scale(1.01)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  });
}

// ==================== BUILD DYNAMIC CONTENT ====================
function buildContent() {
  const d = SITE_DATA;

  setText('heroName', d.hero.en.name, d.hero.ar.name);
  setText('heroSubtitle', d.hero.en.subtitle, d.hero.ar.subtitle);
  setText('heroTagline', d.hero.en.tagline, d.hero.ar.tagline);

  setText('aboutTitle', d.about.en.title, d.about.ar.title);
  setText('aboutBody', d.about.en.body, d.about.ar.body);

  setText('visionTitle', d.vision.en.title, d.vision.ar.title);
  setText('visionSubtitle', d.vision.en.subtitle, d.vision.ar.subtitle);
  setText('visionBody', d.vision.en.body, d.vision.ar.body);

  buildGallery(d.artworks);

  setText('matrixTitle', d.skillsMatrix.en.title, d.skillsMatrix.ar.title);
  setText('matrixClosing', d.skillsMatrix.en.closing, d.skillsMatrix.ar.closing);
  buildSkills(d.skillsMatrix);

  setText('contactTitle', d.contact.en.title, d.contact.ar.title);
}

function setText(id, en, ar) {
  const el = document.getElementById(id);
  if (el) {
    el.setAttribute('data-en', en);
    el.setAttribute('data-ar', ar);
    el.textContent = currentLang === 'en' ? en : ar;
  }
}

// Gallery layout patterns for variety (breaking zigzag repetition)
const LAYOUT_CLASSES = ['', 'layout-full', 'layout-reverse', '', 'layout-full'];

function buildGallery(artworks) {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  container.innerHTML = artworks.map((art, i) => {
    const layoutClass = LAYOUT_CLASSES[i % LAYOUT_CLASSES.length];
    const delayClass = i % 2 === 0 ? '' : 'reveal-delay-1';

    return `
      <div class="gallery-item ${layoutClass} reveal ${delayClass}">
        <div class="gallery-frame-wrapper">
          <div class="gallery-spotlight"></div>
          <div class="gallery-frame">
            <picture>
              <source srcset="assets/optimized/${art.id}-sm.webp 800w, assets/optimized/${art.id}-md.webp 1400w, assets/optimized/${art.id}.webp 2600w" type="image/webp">
              <source srcset="assets/optimized/${art.id}-sm.jpg 800w, assets/optimized/${art.id}-md.jpg 1400w, assets/optimized/${art.id}.jpg 2600w" type="image/jpeg">
              <img src="assets/optimized/${art.id}.webp" alt="${art.en.title}" data-en-alt="${art.en.title}" data-ar-alt="${art.ar.title}" loading="lazy" width="2600" height="1800">
            </picture>
          </div>
        </div>
        <div class="gallery-info">
          <h3 data-en="${art.en.title}" data-ar="${art.ar.title}">${art.en.title}</h3>

          <span class="gallery-info-label" data-en="Objective" data-ar="الهدف">Objective</span>
          <p data-en="${art.en.objective}" data-ar="${art.ar.objective}">${art.en.objective}</p>

          <span class="gallery-info-label" data-en="Techniques Taught" data-ar="التقنيات المستخدمة">Techniques Taught</span>
          <p data-en="${art.en.techniques}" data-ar="${art.ar.techniques}">${art.en.techniques}</p>

          <span class="gallery-info-label" data-en="Student Benefit" data-ar="فائدة الطالب">Student Benefit</span>
          <p data-en="${art.en.benefit}" data-ar="${art.ar.benefit}">${art.en.benefit}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Skills section: Card grid instead of table
function buildSkills(matrix) {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  const rows = currentLang === 'en' ? matrix.en.rows : matrix.ar.rows;
  container.innerHTML = rows.map(row => `
    <div class="skill-card">
      <div class="skill-card-domain">${row.domain}</div>
      <div class="skill-card-skills">${row.skills}</div>
    </div>
  `).join('');
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  buildContent();
  initLangToggle();
  initScrollReveal();
  initHeroCanvas();
  initGalleryEffects();

  setLang('en');
});
