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

  // Hero name always stays English
  const heroName = document.getElementById('heroName');
  if (heroName) heroName.textContent = SITE_DATA.hero.en.name;

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
    const count = Math.floor((w * h) / 7000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.18 - 0.07,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
        life: Math.random() * 1000,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function createBrushStrokes() {
    brushStrokes = [];
    const count = Math.min(8, Math.floor(w / 200));
    for (let i = 0; i < count; i++) {
      brushStrokes.push({
        points: generateBrushPath(),
        progress: Math.random(),
        speed: 0.0006 + Math.random() * 0.001,
        opacity: 0.04 + Math.random() * 0.05,
        width: 1.5 + Math.random() * 3
      });
    }
  }

  function generateBrushPath() {
    const points = [];
    const segs = 7 + Math.floor(Math.random() * 6);
    let x = Math.random() * w * 0.7 + w * 0.15;
    let y = Math.random() * h * 0.7 + h * 0.15;
    for (let i = 0; i < segs; i++) {
      const angle = Math.random() * Math.PI * 2;
      const len = 60 + Math.random() * 160;
      points.push({ x, y });
      x += Math.cos(angle) * len;
      y += Math.sin(angle) * len;
    }
    return points;
  }

  function createGeoShapes() {
    geoShapes = [];
    const count = Math.min(6, Math.floor(w / 300));
    for (let i = 0; i < count; i++) {
      geoShapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 30 + Math.random() * 80,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        sides: 3 + Math.floor(Math.random() * 4),
        opacity: 0,
        maxOpacity: 0.03 + Math.random() * 0.04,
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
    for (let i = 0; i < 4; i++) {
      const x = w * 0.5 + Math.sin(time + i * 2.1) * w * 0.35;
      const y = h * 0.5 + Math.cos(time * 0.7 + i * 1.5) * h * 0.3;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 350);
      gradient.addColorStop(0, 'rgba(201, 169, 110, 0.025)');
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

// ==================== BUILD DYNAMIC CONTENT ====================
function buildContent() {
  const d = SITE_DATA;

  // Hero name — always English, set directly on h1
  const heroName = document.getElementById('heroName');
  if (heroName) {
    heroName.textContent = d.hero.en.name;
    heroName.setAttribute('aria-label', d.hero.en.name);
  }

  setText('heroSubtitle', d.hero.en.subtitle, d.hero.ar.subtitle);

  setText('aboutTitle', d.about.en.title, d.about.ar.title);
  setText('aboutBody', d.about.en.body, d.about.ar.body);

  setText('visionTitle', d.vision.en.title, d.vision.ar.title);
  setText('visionSubtitle', d.vision.en.subtitle, d.vision.ar.subtitle);
  setText('visionBody', d.vision.en.body, d.vision.ar.body);

  buildCarousel(d.artworks);

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

function buildCarousel(artworks) {
  const ring = document.getElementById('mosaicRing');
  if (!ring) return;

  const isMobile = window.innerWidth <= 768;
  const isTiny = window.innerWidth <= 480;

  const positions = [
    { angle: 5,    dist: 0.34, w: 170, h: 225, rot: -4 },
    { angle: 30,   dist: 0.41, w: 140, h: 185, rot: 3 },
    { angle: 55,   dist: 0.36, w: 190, h: 250, rot: -2 },
    { angle: 82,   dist: 0.44, w: 150, h: 200, rot: 6 },
    { angle: 108,  dist: 0.35, w: 180, h: 240, rot: -5 },
    { angle: 133,  dist: 0.42, w: 160, h: 210, rot: 2 },
    { angle: 158,  dist: 0.38, w: 200, h: 260, rot: -3 },
    { angle: 185,  dist: 0.43, w: 145, h: 195, rot: 7 },
    { angle: 210,  dist: 0.36, w: 175, h: 230, rot: -6 },
    { angle: 237,  dist: 0.40, w: 155, h: 205, rot: 4 },
    { angle: 262,  dist: 0.45, w: 185, h: 245, rot: -7 },
    { angle: 290,  dist: 0.37, w: 165, h: 215, rot: 1 },
    { angle: 315,  dist: 0.42, w: 135, h: 180, rot: -8 },
    { angle: 342,  dist: 0.39, w: 195, h: 255, rot: 5 },
  ];

  const scale = isTiny ? 0.55 : isMobile ? 0.7 : 1;

  ring.innerHTML = artworks.map((art, i) => {
    const p = positions[i % positions.length];
    const rad = (p.angle * Math.PI) / 180;
    const distFactor = isTiny ? 110 : isMobile ? 140 : 200;
    const x = Math.cos(rad) * p.dist * distFactor;
    const y = Math.sin(rad) * p.dist * distFactor * 0.85;
    const w = Math.round(p.w * scale);
    const h = Math.round(p.h * scale);

    return `
      <div class="mosaic-item" data-index="${i}" role="button" tabindex="0"
           aria-label="${art.en.title}"
           style="--item-x:${x}px;--item-y:${y}px;--item-w:${w}px;--item-h:${h}px;--item-rot:${p.rot}deg;--item-w-m:${Math.round(w * 0.75)}px;--item-h-m:${Math.round(h * 0.75)}px;">
        <picture>
          <source srcset="assets/optimized/${art.id}-sm.webp 800w, assets/optimized/${art.id}-md.webp 1400w" type="image/webp">
          <source srcset="assets/optimized/${art.id}-sm.jpg 800w, assets/optimized/${art.id}-md.jpg 1400w" type="image/jpeg">
          <img src="assets/optimized/${art.id}-sm.webp" alt="${art.en.title}" loading="lazy" width="${w}" height="${Math.round(h * 0.72)}">
        </picture>
        <div class="mosaic-item-label">
          <h3>${art.en.title}</h3>
          <span>${art.en.techniques.split(',')[0]}</span>
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

// ==================== SCATTERED MOSAIC ====================
let mosaicPaused = false;
let dragMoved = false;

function initMosaic() {
  const viewport = document.getElementById('mosaicViewport');
  if (!viewport) return;

  if (prefersReducedMotion.matches) return;

  let touchTimeout;

  // Pause on hover (desktop)
  viewport.addEventListener('pointerenter', () => {
    mosaicPaused = true;
  });
  viewport.addEventListener('pointerleave', () => {
    mosaicPaused = false;
    viewport.classList.remove('touch-active');
  });

  // Touch support (mobile): tap to activate, tap elsewhere to deactivate
  viewport.addEventListener('touchstart', () => {
    viewport.classList.add('touch-active');
    clearTimeout(touchTimeout);
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    touchTimeout = setTimeout(() => {
      viewport.classList.remove('touch-active');
    }, 2000);
  }, { passive: true });

  // Click/tap to open detail
  viewport.addEventListener('click', (e) => {
    if (dragMoved) { dragMoved = false; return; }
    const item = e.target.closest('.mosaic-item');
    if (item) {
      openDetail(parseInt(item.dataset.index, 10));
    }
  });

  // Keyboard: Enter/Space to open detail
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.mosaic-item');
      if (item) {
        e.preventDefault();
        openDetail(parseInt(item.dataset.index, 10));
      }
    }
  });

  // Close detail handlers
  const closeBtn = document.getElementById('mosaicDetailClose');
  const backdrop = document.getElementById('mosaicDetailBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeDetail);
  if (backdrop) backdrop.addEventListener('click', closeDetail);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });

  // Swipe down to close detail (mobile)
  let detailTouchStartY = 0;
  const detail = document.getElementById('mosaicDetail');
  if (detail) {
    detail.addEventListener('touchstart', (e) => {
      detailTouchStartY = e.touches[0].clientY;
    }, { passive: true });
    detail.addEventListener('touchend', (e) => {
      const dy = e.changedTouches[0].clientY - detailTouchStartY;
      if (dy > 80) closeDetail();
    }, { passive: true });
  }

  // Rebuild on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => buildCarousel(SITE_DATA.artworks), 200);
  });
}

function openDetail(index) {
  const art = SITE_DATA.artworks[index];
  if (!art) return;

  const detail = document.getElementById('mosaicDetail');
  const imageContainer = document.getElementById('mosaicDetailImage');
  const infoContainer = document.getElementById('mosaicDetailInfo');
  const closeBtn = document.getElementById('mosaicDetailClose');
  if (!detail || !imageContainer || !infoContainer) return;

  const lang = currentLang === 'ar' ? 'ar' : 'en';
  const d = art[lang];

  imageContainer.innerHTML = `
    <picture>
      <source srcset="assets/optimized/${art.id}-sm.webp 800w, assets/optimized/${art.id}-md.webp 1400w, assets/optimized/${art.id}.webp 2600w" type="image/webp">
      <source srcset="assets/optimized/${art.id}-sm.jpg 800w, assets/optimized/${art.id}-md.jpg 1400w, assets/optimized/${art.id}.jpg 2600w" type="image/jpeg">
      <img src="assets/optimized/${art.id}.webp" alt="${d.title}" width="2600" height="1800">
    </picture>
  `;

  const mediumLabel = lang === 'ar' ? 'الوسيلة' : 'Medium';
  const objectiveLabel = lang === 'ar' ? 'الهدف' : 'Objective';
  const techniquesLabel = lang === 'ar' ? 'التقنيات' : 'Techniques';
  const outcomeLabel = lang === 'ar' ? 'نتيجة التعلم' : 'Learning Outcome';

  infoContainer.innerHTML = `
    <h2 class="detail-title">${d.title}</h2>
    <div class="detail-meta">
      <span class="detail-tag">${mediumLabel}: ${d.techniques.split(',')[0].trim()}</span>
      <span class="detail-tag">${index + 1} / ${SITE_DATA.artworks.length}</span>
    </div>
    <div class="detail-section">
      <h4>${objectiveLabel}</h4>
      <p>${d.objective}</p>
    </div>
    <div class="detail-section">
      <h4>${techniquesLabel}</h4>
      <p>${d.techniques}</p>
    </div>
    <div class="detail-section">
      <h4>${outcomeLabel}</h4>
      <p>${d.benefit}</p>
    </div>
  `;

  mosaicPaused = true;

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      detail.classList.add('open');
      detail.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    });
  } else {
    detail.classList.add('open');
    detail.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }
}

function closeDetail() {
  const detail = document.getElementById('mosaicDetail');
  if (!detail || !detail.classList.contains('open')) return;

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      detail.classList.remove('open');
      detail.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  } else {
    detail.classList.remove('open');
    detail.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  setTimeout(() => { mosaicPaused = false; }, 500);
}

// ==================== BRUSH WRITING ANIMATION ====================
function initBrushWriting() {
  const el = document.getElementById('heroName');
  if (!el) return;

  if (prefersReducedMotion.matches) {
    el.classList.add('filled');
    return;
  }

  // After the CSS reveal animation completes, fill the text with gold
  setTimeout(() => {
    el.classList.add('filled');
  }, 1300);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  buildContent();
  initLangToggle();
  initScrollReveal();
  initHeroCanvas();
  initBrushWriting();
  initMosaic();

  setLang('en');
});
