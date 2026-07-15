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

// ==================== GALLERY TILT EFFECT ====================
// (removed — replaced by 3D carousel)

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
  const ring = document.getElementById('carouselRing');
  if (!ring) return;

  carouselCount = artworks.length;
  cardAngle = 360 / carouselCount;

  ring.innerHTML = artworks.map((art, i) => `
    <div class="carousel-card" data-index="${i}" role="button" tabindex="0" aria-label="${art.en.title}">
      <picture>
        <source srcset="assets/optimized/${art.id}-sm.webp 800w, assets/optimized/${art.id}-md.webp 1400w" type="image/webp">
        <source srcset="assets/optimized/${art.id}-sm.jpg 800w, assets/optimized/${art.id}-md.jpg 1400w" type="image/jpeg">
        <img src="assets/optimized/${art.id}-sm.webp" alt="${art.en.title}" loading="lazy" width="800" height="540">
      </picture>
      <div class="carousel-card-label">
        <h3>${art.en.title}</h3>
        <span>${art.en.techniques.split(',')[0]}</span>
      </div>
    </div>
  `).join('');
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

// ==================== 3D CAROUSEL ====================
let carouselAngle = 0;
let carouselSpeed = 0.12;
let carouselPaused = false;
let isDragging = false;
let dragStartX = 0;
let dragStartAngle = 0;
let lastDragX = 0;
let dragVelocity = 0;
let carouselCount = 0;
let cardAngle = 0;
let highlightedIndex = -1;
let carouselAnimId = null;
let dragMoved = false;

function updateCarouselRadius() {
  const scene = document.getElementById('carouselScene');
  const ring = document.getElementById('carouselRing');
  if (!scene || !ring || !carouselCount) return;

  const w = window.innerWidth;
  const cardW = ring.offsetWidth || 260;
  const radius = Math.round((cardW / 2) / Math.tan(Math.PI / carouselCount));

  ring.style.setProperty('--carousel-radius', radius + 'px');

  ring.querySelectorAll('.carousel-card').forEach((card, i) => {
    card.style.transform = `rotateY(${i * cardAngle}deg) translateZ(${radius}px)`;
  });
}

function tickCarousel() {
  if (!carouselPaused && !isDragging) {
    carouselAngle += carouselSpeed;
  }

  const ring = document.getElementById('carouselRing');
  if (ring) {
    ring.style.transform = `rotateY(${carouselAngle}deg)`;
  }

  updateHighlight();
  carouselAnimId = requestAnimationFrame(tickCarousel);
}

function updateHighlight() {
  const cards = document.querySelectorAll('.carousel-card');
  if (!cards.length) return;

  const normalized = ((carouselAngle % 360) + 360) % 360;
  const frontIdx = Math.round(normalized / cardAngle) % carouselCount;

  if (frontIdx !== highlightedIndex) {
    if (highlightedIndex >= 0 && cards[highlightedIndex]) {
      cards[highlightedIndex].classList.remove('highlighted');
    }
    if (cards[frontIdx]) {
      cards[frontIdx].classList.add('highlighted');
    }
    highlightedIndex = frontIdx;
  }
}

function initCarousel() {
  const scene = document.getElementById('carouselScene');
  if (!scene) return;

  updateCarouselRadius();

  if (prefersReducedMotion.matches) return;

  // Pause on hover (desktop)
  scene.addEventListener('pointerenter', () => {
    if (!isDragging) carouselPaused = true;
  });
  scene.addEventListener('pointerleave', () => {
    if (!isDragging) carouselPaused = false;
  });

  // Drag to spin
  scene.addEventListener('pointerdown', onDragStart);
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);

  // Click/tap to open detail
  scene.addEventListener('click', (e) => {
    if (dragMoved) return;
    const card = e.target.closest('.carousel-card');
    if (card) {
      openDetail(parseInt(card.dataset.index, 10));
    }
  });

  // Keyboard: Enter/Space to open detail
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.carousel-card');
      if (card) {
        e.preventDefault();
        openDetail(parseInt(card.dataset.index, 10));
      }
    }
  });

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateCarouselRadius, 150);
  });

  // Close detail handlers
  const closeBtn = document.getElementById('carouselDetailClose');
  const backdrop = document.getElementById('carouselDetailBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeDetail);
  if (backdrop) backdrop.addEventListener('click', closeDetail);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });

  // Swipe down to close detail (mobile)
  let detailTouchStartY = 0;
  const detail = document.getElementById('carouselDetail');
  if (detail) {
    detail.addEventListener('touchstart', (e) => {
      detailTouchStartY = e.touches[0].clientY;
    }, { passive: true });
    detail.addEventListener('touchend', (e) => {
      const dy = e.changedTouches[0].clientY - detailTouchStartY;
      if (dy > 80) closeDetail();
    }, { passive: true });
  }

  // Start animation loop
  tickCarousel();
}

function onDragStart(e) {
  isDragging = true;
  dragMoved = false;
  dragStartX = e.clientX;
  dragStartAngle = carouselAngle;
  lastDragX = e.clientX;
  dragVelocity = 0;
  carouselPaused = true;
  try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
}

function onDragMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  if (Math.abs(dx) > 5) dragMoved = true;
  carouselAngle = dragStartAngle + dx * 0.3;
  dragVelocity = e.clientX - lastDragX;
  lastDragX = e.clientX;
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  carouselAngle += dragVelocity * 2;
  carouselPaused = false;
}

function openDetail(index) {
  const art = SITE_DATA.artworks[index];
  if (!art) return;

  const detail = document.getElementById('carouselDetail');
  const imageContainer = document.getElementById('carouselDetailImage');
  const infoContainer = document.getElementById('carouselDetailInfo');
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

  carouselPaused = true;

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      detail.classList.add('open');
      detail.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    });
  } else {
    detail.classList.add('open');
    detail.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
}

function closeDetail() {
  const detail = document.getElementById('carouselDetail');
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

  setTimeout(() => { carouselPaused = false; }, 500);
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
  initCarousel();

  setLang('en');
});
