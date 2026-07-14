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
  let brushStrokes = [];
  let geoShapes = [];
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
    const count = Math.floor((w * h) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15 - 0.06,
        size: Math.random() * 2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        life: Math.random() * 1000,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function createBrushStrokes() {
    brushStrokes = [];
    const count = Math.min(5, Math.floor(w / 300));
    for (let i = 0; i < count; i++) {
      brushStrokes.push({
        points: generateBrushPath(),
        progress: Math.random(),
        speed: 0.0008 + Math.random() * 0.0012,
        opacity: 0.03 + Math.random() * 0.04,
        width: 1 + Math.random() * 2
      });
    }
  }

  function generateBrushPath() {
    const points = [];
    const segs = 6 + Math.floor(Math.random() * 5);
    let x = Math.random() * w * 0.6 + w * 0.2;
    let y = Math.random() * h * 0.6 + h * 0.2;
    for (let i = 0; i < segs; i++) {
      const angle = Math.random() * Math.PI * 2;
      const len = 40 + Math.random() * 120;
      points.push({ x, y });
      x += Math.cos(angle) * len;
      y += Math.sin(angle) * len;
    }
    return points;
  }

  function createGeoShapes() {
    geoShapes = [];
    const count = Math.min(4, Math.floor(w / 400));
    for (let i = 0; i < count; i++) {
      geoShapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 20 + Math.random() * 50,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        sides: 3 + Math.floor(Math.random() * 4),
        opacity: 0,
        maxOpacity: 0.02 + Math.random() * 0.03,
        fadeIn: Math.random() > 0.5,
        life: Math.random() * 1000
      });
    }
  }

  function drawPolygon(cx, cy, radius, sides, rotation) {
    ctx.beginPath();
    for (let i = 0; i <= sides; i++) {
      const angle = (i * 2 * Math.PI / sides) + rotation;
      const px = cx + radius * Math.cos(angle);
      const py = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function draw() {
    if (isPaused) return;

    ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
    ctx.fillRect(0, 0, w, h);

    const time = Date.now() * 0.0003;

    // Ambient gold glow orbs
    for (let i = 0; i < 3; i++) {
      const x = w * 0.5 + Math.sin(time + i * 2.1) * w * 0.3;
      const y = h * 0.5 + Math.cos(time * 0.7 + i * 1.5) * h * 0.25;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 250);
      gradient.addColorStop(0, 'rgba(201, 169, 110, 0.018)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // Golden particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 1;
      p.pulse += 0.015;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const pulseAlpha = 0.6 + 0.4 * Math.sin(p.pulse);
      const alpha = p.opacity * pulseAlpha;
      ctx.fillStyle = `rgba(201, 169, 110, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Flowing brush strokes
    brushStrokes.forEach(s => {
      s.progress += s.speed;
      if (s.progress > 1) {
        s.progress = 0;
        s.points = generateBrushPath();
      }

      const pts = s.points;
      const drawCount = Math.floor(pts.length * s.progress);
      if (drawCount < 2) return;

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < drawCount; i++) {
        const cp1x = (pts[i - 1].x + pts[i].x) / 2;
        const cp1y = (pts[i - 1].y + pts[i].y) / 2;
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, cp1x, cp1y);
      }
      ctx.strokeStyle = `rgba(201, 169, 110, ${s.opacity})`;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // Geometric shapes fading in/out
    geoShapes.forEach(g => {
      g.rotation += g.rotSpeed;
      g.life += 1;

      const cycle = Math.sin(g.life * 0.004);
      g.opacity = g.maxOpacity * Math.max(0, cycle);

      if (g.opacity > 0.001) {
        ctx.save();
        drawPolygon(g.x, g.y, g.size, g.sides, g.rotation);
        ctx.strokeStyle = `rgba(201, 169, 110, ${g.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }
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
  createBrushStrokes();
  createGeoShapes();
  draw();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      createParticles();
      createBrushStrokes();
      createGeoShapes();
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

    return `
      <div class="gallery-item ${layoutClass}">
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
          <p data-en="${art.en.objective}" data-ar="${art.ar.objective}">${art.en.objective}</p>
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

// ==================== GALLERY SCROLL DEPTH ====================
function initGalleryScrollDepth() {
  if (prefersReducedMotion.matches) return;

  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const depthObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(item => depthObserver.observe(item));
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  buildContent();
  initLangToggle();
  initScrollReveal();
  initHeroCanvas();
  initGalleryEffects();
  initGalleryScrollDepth();

  setLang('en');
});
