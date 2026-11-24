/* Caramelly · continuous scroll
   One rAF loop reads the scroll position and writes transforms only.
   Stage: hero → a circle opens from the Jasmine Kiss tin → the wheel turns through five roasts.
   A copy of the hero sits at the end so the page runs back into itself. */
(() => {
  'use strict';

  const ALL = window.COFFEES;
  const C = window.LINEUP.map(id => ALL.find(c => c.id === id));
  const PODS = window.PODS;
  const ROASTS = window.ROASTS;
  const byId = Object.fromEntries(C.map((c, i) => [c.id, i]));
  const N = C.length;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const dwell = x => x - (Math.sin(2 * Math.PI * x) / (2 * Math.PI)) * 0.82; // slows near each whole step
  const inr = n => '₹' + n.toLocaleString('en-IN');
  const grams = g => (g >= 1000 ? g / 1000 + ' kg' : g + ' g');
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const amazonUrl = asin => `https://www.amazon.in/dp/${asin}`;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const isMobile = () => innerWidth < 768;

  const roastDots = level =>
    `<span class="roast" role="img" aria-label="Roast level ${level + 1} of 5, ${ROASTS[level].toLowerCase()}">` +
    ROASTS.map((_, i) => `<i class="${i === level ? 'on' : ''}"></i>`).join('') + '</span>';
  const roastRow = c => `<div class="roast-row" style="color:${c.ink}">${roastDots(c.roast)}<span class="roast-label">${ROASTS[c.roast]} roast</span></div>`;
  const sizesOf = c => c.amazon || c.sizes;

  /* ------------------------------------------------------------------ build */

  // Wheel: ten slots round the dial, the five tins twice, so the ring always looks full
  const SLOTS = N * 2, STEP = 360 / SLOTS;
  const ring = $('#ring');
  ring.innerHTML = Array.from({ length: SLOTS }, (_, j) => {
    const c = C[j % N];
    return `<button class="wheel__tin" type="button" data-i="${j % N}" ${j >= N ? 'tabindex="-1" aria-hidden="true"' : ''} aria-label="${esc(c.name)}, ${ROASTS[c.roast].toLowerCase()} roast">
      <img src="assets/tins/${c.id}.webp" alt="" width="871" height="768" decoding="async">
    </button>`;
  }).join('');
  const wheelTins = $$('.wheel__tin', ring);

  // Lineup cards
  $('#lineupGrid').innerHTML = C.map(c => {
    const s = sizesOf(c);
    return `
    <button class="card" type="button" data-read="${c.id}" style="--c:${c.color}">
      <span class="card__plate"><img src="assets/tins/${c.id}.webp" alt="" width="871" height="768" loading="lazy" decoding="async"></span>
      <span class="card__body">
        <span class="card__roast"><span style="color:${c.ink}">${roastDots(c.roast)}</span>${ROASTS[c.roast]} roast</span>
        <span class="card__name">${esc(c.name)}</span>
        <span class="card__notes">${c.notes.slice(0, 3).map(esc).join(' · ')}</span>
        <span class="card__meta"><span>From <span class="figure">${inr(s[0][1])}</span></span><span>${c.amazon ? 'Amazon' : 'caramelly.in'}</span></span>
      </span>
    </button>`;
  }).join('');

  // Pods, strongest first
  const podShelf = $('#podShelf');
  podShelf.innerHTML = PODS.map(p => `
    <a class="pod" href="${p.amazon ? amazonUrl(p.amazon) : p.url}" target="_blank" rel="noopener" data-intensity="${p.intensity}">
      <span class="pod__plate"><img src="assets/pods/${p.id}.webp" alt="${esc(p.name)} capsule box with two capsules" loading="lazy" decoding="async"></span>
      <span class="pod__name">${esc(p.name)}</span>
      <span class="meter" aria-label="Intensity ${p.intensity} of 13">
        <span class="meter__ticks">${Array.from({ length: 13 }, (_, k) => `<i class="${k < p.intensity ? 'on' : ''}"></i>`).join('')}</span>
        <span><span class="figure">${p.intensity}</span> / 13</span>
      </span>
      <span class="pod__notes">${p.notes.map(esc).join(' · ')}</span>
      <span class="pod__desc">${esc(p.desc)}</span>
      <span class="pod__price"><span class="figure">${inr(p.price)}</span> · 10 capsules · ${p.amazon ? 'on Amazon' : 'on caramelly.in'}</span>
    </a>`).join('');

  // Intensity dial
  const dial = $('#intensity'), dialOut = $('#intensityOut'), dialHint = $('#intensityHint');
  const pods = $$('.pod', podShelf);
  function onDial() {
    const v = +dial.value;
    dialOut.textContent = v;
    let n = 0;
    pods.forEach(el => {
      const ok = Math.abs(+el.dataset.intensity - v) <= 1;
      el.classList.toggle('is-dim', !ok);
      if (ok) n++;
    });
    dialHint.textContent = `${n} of ${pods.length} boxes sit within one step of ${v}`;
  }
  dial.addEventListener('input', onDial);
  onDial();

  function setupTabs(list, onSelect) {
    const tabs = $$('[role="tab"]', list);
    const select = (i, focus) => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      onSelect(i);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          select((i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true);
        }
      });
    });
  }

  // Grind guide
  const GR = window.GRINDS;
  const grindTabs = $('#grindTabs'), grindInfo = $('#grindInfo'), canvas = $('#grindCanvas');
  grindTabs.innerHTML = GR.map((g, i) =>
    `<button class="tab" role="tab" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}" aria-controls="grindInfo">${esc(g.name)}</button>`).join('');
  const microns = GR.filter(g => g.micron).map(g => g.micron);
  const mMin = Math.min(...microns), mMax = Math.max(...microns);
  let grindIdx = 1;
  function showGrind(i) {
    grindIdx = i;
    const g = GR[i];
    const pos = g.micron ? ((g.micron - mMin) / (mMax - mMin)) * 100 : 100;
    grindInfo.innerHTML = `
      <h3>${esc(g.name)}</h3>
      <p class="grind__size">${esc(g.size)}${g.micron ? ` · about <span class="figure">${g.micron.toLocaleString('en-IN')} µm</span>` : ''}</p>
      <dl class="grind__facts">
        <div><dt>Ratio</dt><dd>${esc(g.ratio)}</dd></div>
        <div><dt>Time</dt><dd>${esc(g.time)}</dd></div>
        <div><dt>Water</dt><dd>${g.id === 'coldbrew' ? 'Cold, filtered' : g.id === 'whole' ? 'Grinder needed' : '92–96 °C'}</dd></div>
      </dl>
      <p class="grind__text">${esc(g.text)}</p>
      ${g.micron ? `<div class="grind__scale" aria-hidden="true">
        <div class="grind__scale-track"><span class="grind__scale-dot" style="left:${pos}%"></span></div>
        <div class="grind__scale-labels"><span>Fine</span><span>Coarse</span></div>
      </div>` : ''}`;
    drawGrounds(canvas, g);
  }
  setupTabs(grindTabs, showGrind);

  /* Coffee grounds, drawn once per selection. Seeded random so a size always looks the same. */
  function rng(seed) {
    return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function drawGrounds(cv, g) {
    const size = cv.clientWidth || 480;
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.round(size * dpr); cv.height = Math.round(size * dpr);
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = rng(g.micron || 7);
    ctx.fillStyle = '#2c190e';
    ctx.fillRect(0, 0, size, size);
    const shade = (l, a = 1) => `hsla(${22 + r() * 10}, ${38 + r() * 18}%, ${l}%, ${a})`;

    if (!g.micron) {
      const n = Math.round((size * size) / 1500);
      for (let k = 0; k < n; k++) bean(ctx, r() * size, r() * size, size / 30 * (0.85 + r() * 0.3), r() * Math.PI, r);
    } else {
      const rad = (g.micron / 1300) * (size / 62);
      const count = Math.min(30000, Math.round(((size * size) / (Math.PI * rad * rad)) * 1.25));
      for (let k = 0; k < count; k++) {
        const x = r() * size, y = r() * size;
        const s = rad * (0.55 + r() * 0.95);
        const l = 12 + r() * 22;
        if (s < 2) {
          ctx.fillStyle = shade(l);
          ctx.fillRect(x, y, s * 1.6, s * 1.6);
        } else {
          const sides = 5 + Math.floor(r() * 3), rot = r() * Math.PI;
          ctx.beginPath();
          for (let v = 0; v < sides; v++) {
            const a = rot + (v / sides) * Math.PI * 2, d = s * (0.7 + r() * 0.45);
            v ? ctx.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d) : ctx.moveTo(x + Math.cos(a) * d, y + Math.sin(a) * d);
          }
          ctx.closePath();
          ctx.fillStyle = shade(l);
          ctx.fill();
          if (s > 3) {
            ctx.beginPath();
            ctx.ellipse(x - s * 0.25, y - s * 0.3, s * 0.38, s * 0.22, rot, 0, Math.PI * 2);
            ctx.fillStyle = shade(l + 14, 0.55);
            ctx.fill();
          }
        }
      }
    }
    const lg = ctx.createRadialGradient(size * 0.32, size * 0.28, size * 0.05, size * 0.5, size * 0.5, size * 0.72);
    lg.addColorStop(0, 'rgba(255, 236, 210, 0.10)');
    lg.addColorStop(1, 'rgba(0, 0, 0, 0.32)');
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, size, size);
  }
  function bean(ctx, x, y, s, rot, r) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    const w = s, h = s * 0.72;
    ctx.beginPath(); ctx.ellipse(1.5, 2.5, w, h, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fill();
    const gr = ctx.createRadialGradient(-w * 0.35, -h * 0.4, 1, 0, 0, w * 1.05);
    const l = 22 + r() * 10;
    gr.addColorStop(0, `hsl(24, 45%, ${l + 16}%)`);
    gr.addColorStop(0.55, `hsl(22, 48%, ${l}%)`);
    gr.addColorStop(1, `hsl(20, 50%, ${l - 12}%)`);
    ctx.beginPath(); ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-w * 0.82, 0);
    ctx.bezierCurveTo(-w * 0.3, -h * 0.35, w * 0.3, h * 0.35, w * 0.82, 0);
    ctx.lineWidth = Math.max(1, s * 0.1); ctx.strokeStyle = `hsl(20, 45%, ${l - 14}%)`; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-w * 0.35, -h * 0.45, w * 0.32, h * 0.14, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 230, 200, 0.18)'; ctx.fill();
    ctx.restore();
  }

  /* ------------------------------------------------------------- the tin */
  const tinSec = $('#tin');
  const F = name => $(`[data-f="${name}"]`, tinSec);
  let current = -1, swapTimer = 0, size = 0, grind = 0;
  const GRIND_NAMES = ['Whole beans', 'Espresso', 'Aeropress', 'French press', 'Moka pot', 'Pour over', 'Cold brew'];

  function renderTin(i) {
    const c = C[i];
    tinSec.style.setProperty('--c', c.color);
    tinSec.style.setProperty('--c-ink', c.ink);
    F('kind').textContent = c.kind + (c.sub ? ' · ' + c.sub : '');
    F('family').textContent = c.family;
    F('name').textContent = c.name;
    F('place').textContent = `${c.region}, ${c.country}`;
    F('elev').textContent = c.elevNote ? `${c.elev}, ${c.elevNote}` : `${c.elev} above sea level`;
    const img = F('tin'); img.src = `assets/tins/${c.id}.webp`; img.alt = `${c.name} tin, front`;
    F('taste').textContent = c.taste;
    F('notes').textContent = c.notes.join(' · ');
    const ph = F('photo'); ph.src = `assets/photos/${c.id}.webp`; ph.alt = `${c.name} tin on a table with a small pile of roasted beans`;
    F('caption').textContent = `${c.name}, ${grams(sizesOf(c)[0][0])} tin`;
    const row = (k, v) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;
    F('specs').innerHTML = `
      <div class="specs__group"><h3>Grown</h3><dl>
        ${row('Country', esc(c.country))}${row('Region', esc(c.region))}
        ${row('Elevation', esc(c.elev) + (c.elevNote ? `<span class="muted">${esc(c.elevNote)}</span>` : ''))}
      </dl></div>
      <div class="specs__group"><h3>Processed</h3><dl>
        ${row('Process', esc(c.process))}${row('Variety', esc(c.variety))}${row('Cup profile', esc(c.profile))}
      </dl></div>
      <div class="specs__group"><h3>Roasted</h3><dl>
        ${row('Roast level', `<span class="roast-row" style="color:${c.ink}">${roastDots(c.roast)}<span class="roast-label">${ROASTS[c.roast]}</span></span>`)}
        ${row('Roasted at', 'Caramelly, Gurgaon')}${row('Species', c.variety.includes('C×R') ? 'Arabica with C×R' : '100% arabica')}
      </dl></div>
      <div class="specs__group"><h3>Brew it</h3><dl>
        ${row('Best brewed in', c.brewIn.map(esc).join(', '))}${row('Best for', c.bestFor.map(esc).join(', '))}
      </dl></div>`;
    const sizes = sizesOf(c);
    size = Math.min(size, sizes.length - 1);
    F('sizes').innerHTML = sizes.map(([g, p], k) => `
      <label class="chip"><input type="radio" name="size" value="${k}" ${k === size ? 'checked' : ''}><span>${grams(g)} <small>${inr(p)}</small></span></label>`).join('');
    // Amazon sells these whole bean only; caramelly.in grinds to order
    F('grinds').innerHTML = c.amazon
      ? `<p class="buy__note">Whole beans on Amazon. For a ground tin, <a class="link" href="${c.url}" target="_blank" rel="noopener">order on caramelly.in</a>, which grinds to order for seven brew methods.</p>`
      : GRIND_NAMES.map((n, k) => `
      <label class="chip"><input type="radio" name="grind" value="${k}" ${k === grind ? 'checked' : ''}><span>${n}</span></label>`).join('');
    F('url').textContent = c.amazon ? 'Buy on Amazon' : 'Buy on caramelly.in';
    updatePrice();
  }
  function updatePrice() {
    const c = C[current];
    const [g, p, asin] = sizesOf(c)[size];
    F('price').textContent = inr(p);
    F('url').href = asin ? amazonUrl(asin) : c.url;
    F('member').textContent = asin
      ? `${grams(g)} tin, whole beans · price as listed on amazon.in`
      : `${grams(g)}, ${GRIND_NAMES[grind].toLowerCase()} · not sold on Amazon yet`;
  }
  $('#buy').addEventListener('change', e => {
    if (e.target.name === 'size') size = +e.target.value;
    if (e.target.name === 'grind') grind = +e.target.value;
    updatePrice();
  });

  function setCoffee(i, instant) {
    if (i === current) return;
    const first = current === -1;
    current = i;
    clearTimeout(swapTimer);
    if (first || instant || reduceMotion) { renderTin(i); tinSec.classList.remove('is-swapping'); return; }
    tinSec.classList.add('is-swapping');
    swapTimer = setTimeout(() => {
      renderTin(i);
      requestAnimationFrame(() => tinSec.classList.remove('is-swapping'));
    }, 220);
  }

  const wInfo = name => $(`[data-w="${name}"]`, $('#wheelInfo'));
  function setWheelInfo(i) {
    const c = C[i];
    wInfo('kind').textContent = `${i + 1} of ${N} · ${c.kind}`;
    wInfo('name').textContent = c.name;
    wInfo('roast').innerHTML = roastRow(c);
    wInfo('notes').textContent = c.notes.join(' · ');
  }

  /* ------------------------------------------------------------ scrolling */
  let lenis = null;
  if (window.Lenis && !reduceMotion && !coarse) {
    lenis = new window.Lenis({ infinite: true, lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
  }
  const scrollToY = (y, immediate) => {
    if (lenis) lenis.scrollTo(y, { immediate: !!immediate, duration: 1.4, force: true });
    else window.scrollTo({ top: y, behavior: immediate || reduceMotion ? 'auto' : 'smooth' });
  };
  const goTo = target => {
    const el = typeof target === 'string' ? $(target) : target;
    if (el) scrollToY(el.getBoundingClientRect().top + scrollY);
  };

  let wheelLock = 0;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-read]');
    if (b) { e.preventDefault(); wheelLock = performance.now() + 2400; setCoffee(byId[b.dataset.read]); goTo('#tin'); return; }
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1) {
      e.preventDefault();
      closeMenu();
      const id = a.getAttribute('href');
      if (id === '#top') scrollToY(0); else goTo(id);
    }
  });
  // Tap the tin at the top to read it; tap another to turn the wheel to it
  wheelTins.forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const i = +b.dataset.i;
    if (i === M.wheelActive) { wheelLock = performance.now() + 2400; setCoffee(i); goTo('#tin'); return; }
    scrollToY(M.stage.top + (T.wheel + i * T.per) * vh);
  }));

  const menuBtn = $('#navMenu'), links = $('#navLinks');
  function closeMenu() { links.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = !links.classList.contains('is-open');
    links.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Cursor tag on the lineup cards
  const tag = $('#cursorTag'), grid = $('#lineupGrid');
  if (!coarse) {
    grid.addEventListener('pointermove', e => {
      const on = !!e.target.closest('.card');
      tag.classList.toggle('is-on', on);
      if (on) tag.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
    });
    grid.addEventListener('pointerleave', () => tag.classList.remove('is-on'));
  }

  /* ------------------------------------------------------------- measure */
  const M = {};
  let vw = innerWidth, vh = innerHeight;
  const stage = $('#stage'), anchor = $('#choose');
  const hero = $('#hero'), heroMedia = $('#heroMedia'), heroCopy = $('#heroCopy'), heroCue = $('#heroCue');
  const wheel = $('#wheel'), scene = $('#wheelScene'), wheelText = $('#wheelText');
  const tinDrop = $('#tinDrop');
  const nav = $('#nav');

  // Stage timeline, in viewport heights of scroll
  const T = { hold: 0.3, iris: 0.85, per: 0.5, tail: 0.35 };
  T.wheel = T.hold + T.iris + 0.1;              // the wheel starts turning here
  const STAGE_LEN = T.wheel + (N - 1) * T.per + T.tail;

  function measure() {
    vw = innerWidth; vh = innerHeight;
    const mob = isMobile();
    stage.style.height = (STAGE_LEN + 1) * vh + 'px';
    anchor.style.top = T.wheel * vh + 'px';
    const top = el => el.getBoundingClientRect().top + scrollY;

    // iris origin: the Jasmine Kiss tin in the banner, which is also the first tin on the wheel
    const iw = mob ? 615 : 2000, ih = mob ? 1200 : 1019;
    const sc = Math.max(vw / iw, vh / ih);
    const dw = iw * sc, dh = ih * sc;
    const ox = mob ? (vw - dw) * 0.5 : vw - dw, oy = mob ? vh - dh : (vh - dh) * 0.5;
    const fx = mob ? 0.33 : 0.565, fy = mob ? 0.68 : 0.46;
    M.iris = { x: ox + fx * dw, y: oy + fy * dh };
    M.iris.r = Math.hypot(Math.max(M.iris.x, vw - M.iris.x), Math.max(M.iris.y, vh - M.iris.y)) + 40;
    heroMedia.style.transformOrigin = `${M.iris.x}px ${M.iris.y}px`;

    // wheel geometry
    const rd = mob ? vw * 0.78 : clamp(vw * 0.4, 360, 640);
    const tw = mob ? clamp(vw * 0.3, 110, 150) : clamp(vw * 0.145, 150, 230);
    const cy = (mob ? 0.6 : 0.56) * vh + rd;
    wheel.style.setProperty('--rd', rd + 'px');
    wheel.style.setProperty('--cy', cy + 'px');
    wheel.style.setProperty('--tw', tw + 'px');
    M.wheel = { cx: vw / 2, cy, rr: rd + tw * 0.4, tw, th: tw * 0.88 };
    scene.style.transformOrigin = `50% ${cy - M.wheel.rr}px`;

    // tin: drop it onto the lower part of the name, and leave room under it
    const head = $('.tin__head', tinSec), nameEl = F('name');
    head.style.paddingBottom = '0px';
    const tinTop = nameEl.offsetTop + nameEl.offsetHeight * (mob ? 0.9 : 0.8);
    tinDrop.style.top = tinTop + 'px';
    const need = tinTop + tinDrop.offsetHeight - head.clientHeight + (mob ? 8 : 24);
    head.style.paddingBottom = Math.max(0, need) + 'px';

    M.stage = { top: top(stage) };
    M.tin = { top: top(tinSec) };
    M.dark = $$('[data-theme="dark"]').map(el => ({ top: top(el), bottom: top(el) + el.offsetHeight }));
    M.loop = top($('#loop'));
    if (lenis) lenis.resize();
    dirty = true;
  }

  /* -------------------------------------------------------------- update */
  function updateStage(y) {
    const s = (y - M.stage.top) / vh;
    if (s < -1 || s > STAGE_LEN + 1) return;

    // the circle opens from the tin in the photo
    const ip = easeInOut(clamp((s - T.hold) / T.iris));
    if (ip <= 0) {
      wheel.style.visibility = 'hidden';
      hero.style.visibility = '';
    } else {
      wheel.style.visibility = 'visible';
      wheel.style.clipPath = ip >= 1 ? 'none' : `circle(${(ip * M.iris.r).toFixed(1)}px at ${M.iris.x}px ${M.iris.y}px)`;
      hero.style.visibility = ip >= 1 ? 'hidden' : '';
    }
    heroMedia.style.transform = `scale(${1 + ip * 0.22})`;
    const hc = clamp(1 - ip * 2.4);
    heroCopy.style.opacity = hc;
    heroCopy.style.visibility = hc ? '' : 'hidden';
    heroCue.style.opacity = clamp(1 - s * 4);
    scene.style.transform = `scale(${(1.08 - 0.08 * ip).toFixed(4)})`;
    if (ip <= 0) return;

    // then the wheel turns, settling on each roast
    const f = clamp((s - T.wheel) / T.per, 0, N - 1);
    const k = Math.floor(f), fr = f - k;
    const steps = k + (k < N - 1 ? dwell(fr) : 0);
    const rot = steps * STEP;
    wheelText.style.transform = `rotate(${(-rot * 0.6).toFixed(2)}deg)`;
    const W = M.wheel, rad = Math.PI / 180;
    wheelTins.forEach((el, j) => {
      const a = ((((j * STEP - rot) % 360) + 540) % 360) - 180;
      if (Math.abs(a) > 84) { el.style.visibility = 'hidden'; return; }
      el.style.visibility = 'visible';
      const x = W.cx + W.rr * Math.sin(a * rad) - W.tw / 2;
      const yy = W.cy - W.rr * Math.cos(a * rad) - W.th / 2;
      const near = 1 - clamp(Math.abs(a) / STEP);
      const sc = 0.8 + 0.38 * near * near;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${yy.toFixed(1)}px, 0) rotate(${(a * 0.9).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      el.style.zIndex = 10 + Math.round(near * 10);
    });
    const act = Math.round(steps) % N;
    if (act !== M.wheelActive) {
      M.wheelActive = act;
      setWheelInfo(act);
      if (performance.now() > wheelLock) setCoffee(act);
    }
  }

  function updateTin(y) {
    const r = (y + vh - M.tin.top) / vh;
    if (r < -0.2 || r > 3) return;
    const d = easeOut(clamp((r - 0.15) / 0.8));
    tinDrop.style.transform = `translate(-50%, ${((1 - d) * -0.42 * vh).toFixed(1)}px) rotate(${((1 - d) * -12).toFixed(2)}deg)`;
  }

  function updateNav(y) {
    const mid = y + 32;
    nav.classList.toggle('on-dark', M.dark.some(d => mid >= d.top && mid < d.bottom));
  }

  let lastY = -1, dirty = true;
  function update(y) {
    updateStage(y);
    updateTin(y);
    updateNav(y);
  }
  function frame(t) {
    if (lenis) lenis.raf(t);
    const y = scrollY;
    if (y !== lastY || dirty) { lastY = y; dirty = false; update(y); }
    requestAnimationFrame(frame);
  }

  // Native scroll fallback for the loop (touch, reduced motion, or no Lenis)
  if (!lenis) {
    addEventListener('scroll', () => {
      if (M.loop && scrollY >= M.loop - 1) window.scrollTo(0, scrollY - M.loop);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- init */
  setCoffee(0, true);
  setWheelInfo(0);
  M.wheelActive = 0;
  showGrind(1);
  measure();
  requestAnimationFrame(frame);

  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { measure(); drawGrounds(canvas, GR[grindIdx]); }, 150); });
  addEventListener('load', measure);
  if (document.fonts) document.fonts.ready.then(measure);
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(measure, 120); }).observe(tinSec);
})();
