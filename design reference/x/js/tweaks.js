/* ============================================================
   THE WARDROBE — TWEAKS (mood / type / rhythm)
   Vanilla JS impl matching the site's aesthetic.
   ============================================================ */

(function() {
  'use strict';

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "mood": "atelier",
    "type": "editorial",
    "rhythm": "gallery"
  }/*EDITMODE-END*/;

  let state = { ...TWEAK_DEFAULTS };
  // Pull persisted state from data-attrs already applied (if reload-from-saved):
  try {
    if (document.documentElement.dataset.mood)   state.mood   = document.documentElement.dataset.mood;
    if (document.documentElement.dataset.type)   state.type   = document.documentElement.dataset.type;
    if (document.documentElement.dataset.rhythm) state.rhythm = document.documentElement.dataset.rhythm;
  } catch(e) {}

  // ── Apply state to DOM ──────────────────────────────────────
  function apply() {
    document.documentElement.dataset.mood   = state.mood;
    document.documentElement.dataset.type   = state.type;
    document.documentElement.dataset.rhythm = state.rhythm;
  }
  apply();

  function persist() {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
    } catch(e) {}
  }

  // ── Panel UI ────────────────────────────────────────────────
  const MOODS = [
    { id: 'atelier',   label: 'Atelier',   sub: 'Cream · Gold',     swatch: ['#F9F7F4', '#C5A059', '#2C2C2C'] },
    { id: 'noir',      label: 'Noir',      sub: 'Smoke · Brass',    swatch: ['#1A1816', '#B8924A', '#E8DFCD'] },
    { id: 'aperol',    label: 'Aperol',    sub: 'Apricot · Rust',   swatch: ['#FBEFDE', '#D4663C', '#3A2418'] },
    { id: 'foliage',   label: 'Foliage',   sub: 'Moss · Bone',      swatch: ['#F2EFE5', '#3D5C42', '#1F2A1E'] },
    { id: 'porcelain', label: 'Porcelain', sub: 'Mono · Ink',       swatch: ['#FAFAFA', '#9A9A9A', '#0F0F0F'] }
  ];

  const TYPES = [
    { id: 'editorial',  label: 'Editorial',  sub: 'Cormorant · Inter',         family: "'Cormorant Garamond', Georgia, serif" },
    { id: 'modern',     label: 'Modern',     sub: 'Playfair · Manrope',        family: "'Playfair Display', Georgia, serif" },
    { id: 'brutalist',  label: 'Brutalist',  sub: 'Space Grotesk · DM Mono',   family: "'Space Grotesk', sans-serif" },
    { id: 'couture',    label: 'Couture',    sub: 'Italiana · Geist',          family: "'Italiana', serif" }
  ];

  const RHYTHMS = [
    { id: 'gallery',    label: 'Gallery',   sub: '2-up · spacious' },
    { id: 'catalog',    label: 'Catalog',   sub: '4-up · tight' },
    { id: 'editorial',  label: 'Editorial', sub: 'hero + stack' }
  ];

  // ── Styles ──────────────────────────────────────────────────
  const css = `
  .twk-panel {
    position: fixed; right: 16px; bottom: 16px; z-index: 2147483646;
    width: 304px; max-height: calc(100vh - 32px);
    background: rgba(249,247,244,0.94);
    color: #2C2C2C;
    -webkit-backdrop-filter: blur(28px) saturate(140%);
    backdrop-filter: blur(28px) saturate(140%);
    border: 1px solid rgba(197,160,89,0.3);
    border-radius: 4px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 50px rgba(28,27,24,0.18), 0 4px 14px rgba(28,27,24,0.08);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    overflow: hidden;
    display: none;
    flex-direction: column;
    transform: translateY(8px);
    opacity: 0;
    transition: transform 220ms cubic-bezier(0.16,1,0.3,1), opacity 220ms;
  }
  .twk-panel.twk-open { display: flex; opacity: 1; transform: translateY(0); }
  .twk-hd {
    display: flex; align-items: baseline; justify-content: space-between;
    padding: 16px 16px 14px;
    border-bottom: 1px solid rgba(197,160,89,0.25);
    cursor: move; user-select: none;
  }
  .twk-hd-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px; font-weight: 400; letter-spacing: -0.005em;
    color: #2C2C2C;
  }
  .twk-hd-eyebrow {
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #C5A059; font-weight: 500; margin-bottom: 2px;
    font-family: 'Inter', sans-serif;
  }
  .twk-x {
    appearance: none; border: 0; background: transparent;
    color: rgba(44,44,44,0.5); width: 24px; height: 24px;
    font-size: 16px; line-height: 1; cursor: pointer;
    align-self: flex-start;
  }
  .twk-x:hover { color: #2C2C2C; }
  .twk-body {
    overflow-y: auto; padding: 14px 16px 18px;
    display: flex; flex-direction: column; gap: 18px;
    scrollbar-width: thin;
  }
  .twk-section {
    display: flex; flex-direction: column; gap: 8px;
  }
  .twk-sect-label {
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #C5A059; font-weight: 500;
  }

  /* Mood swatch grid */
  .twk-mood-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;
  }
  .twk-mood {
    appearance: none; border: 1px solid rgba(44,44,44,0.1);
    background: transparent; padding: 0;
    cursor: pointer; border-radius: 2px; overflow: hidden;
    aspect-ratio: 1; display: flex; flex-direction: column;
    transition: border-color 0.2s, transform 0.2s;
  }
  .twk-mood:hover { transform: translateY(-1px); border-color: rgba(197,160,89,0.5); }
  .twk-mood.is-active { border-color: #C5A059; border-width: 1.5px; box-shadow: 0 0 0 1px rgba(197,160,89,0.25); }
  .twk-mood-swatch { flex: 1; display: flex; }
  .twk-mood-swatch span { flex: 1; }
  .twk-mood-name {
    font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 0 3px; text-align: center; font-weight: 500;
    background: rgba(255,255,255,0.85); color: #2C2C2C;
  }
  .twk-mood-meta {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 11px;
  }
  .twk-mood-meta strong { font-weight: 500; color: #2C2C2C; }
  .twk-mood-meta span { color: rgba(44,44,44,0.5); font-size: 10px; letter-spacing: 0.04em; }

  /* Stacked option list (type & rhythm) */
  .twk-stack { display: flex; flex-direction: column; gap: 4px; }
  .twk-opt {
    appearance: none; border: 1px solid rgba(44,44,44,0.1);
    background: transparent;
    padding: 9px 12px; border-radius: 2px; cursor: pointer;
    display: flex; justify-content: space-between; align-items: baseline;
    text-align: left; transition: border-color 0.2s, background 0.2s;
  }
  .twk-opt:hover { border-color: rgba(197,160,89,0.4); background: rgba(255,255,255,0.4); }
  .twk-opt.is-active {
    border-color: #C5A059; background: rgba(255,255,255,0.7);
    box-shadow: inset 3px 0 0 #C5A059;
  }
  .twk-opt-label { font-size: 13px; font-weight: 500; color: #2C2C2C; }
  .twk-opt-sub { font-size: 10px; color: rgba(44,44,44,0.5); letter-spacing: 0.04em; }
  .twk-opt-preview {
    font-size: 17px; line-height: 1; color: #2C2C2C;
  }

  /* Toggle indicator */
  .twk-foot {
    padding: 10px 16px; border-top: 1px solid rgba(197,160,89,0.2);
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(44,44,44,0.4); text-align: center;
  }
  `;

  // ── Build panel ─────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.id = 'twk-panel-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const panel = document.createElement('div');
  panel.className = 'twk-panel';
  panel.innerHTML = `
    <div class="twk-hd" id="twk-hd">
      <div>
        <div class="twk-hd-eyebrow">Tweaks</div>
        <div class="twk-hd-title">Reshape the Feel</div>
      </div>
      <button class="twk-x" id="twk-x" aria-label="Close">✕</button>
    </div>
    <div class="twk-body">
      <div class="twk-section">
        <div class="twk-mood-meta"><strong class="twk-sect-label">Mood</strong><span id="twk-mood-sub"></span></div>
        <div class="twk-mood-grid" id="twk-mood-grid"></div>
      </div>
      <div class="twk-section">
        <div class="twk-sect-label">Typography</div>
        <div class="twk-stack" id="twk-type-stack"></div>
      </div>
      <div class="twk-section">
        <div class="twk-sect-label">Rhythm</div>
        <div class="twk-stack" id="twk-rhythm-stack"></div>
      </div>
    </div>
    <div class="twk-foot">Police Bazar · Shillong</div>
  `;
  document.body.appendChild(panel);

  function renderMoods() {
    const grid = document.getElementById('twk-mood-grid');
    grid.innerHTML = MOODS.map(m => `
      <button class="twk-mood ${m.id === state.mood ? 'is-active' : ''}" data-mood="${m.id}" title="${m.label} — ${m.sub}">
        <div class="twk-mood-swatch">
          ${m.swatch.map(c => `<span style="background:${c};"></span>`).join('')}
        </div>
        <div class="twk-mood-name">${m.label}</div>
      </button>
    `).join('');
    grid.querySelectorAll('.twk-mood').forEach(btn => {
      btn.addEventListener('click', () => {
        state.mood = btn.dataset.mood;
        apply(); renderMoods(); updateMoodSub(); persist();
      });
    });
  }

  function updateMoodSub() {
    const m = MOODS.find(x => x.id === state.mood);
    document.getElementById('twk-mood-sub').textContent = m ? m.sub : '';
  }

  function renderType() {
    const stack = document.getElementById('twk-type-stack');
    stack.innerHTML = TYPES.map(t => `
      <button class="twk-opt ${t.id === state.type ? 'is-active' : ''}" data-type="${t.id}">
        <div>
          <div class="twk-opt-label">${t.label}</div>
          <div class="twk-opt-sub">${t.sub}</div>
        </div>
        <div class="twk-opt-preview" style="font-family:${t.family}; font-style:italic; font-weight:400;">Aa</div>
      </button>
    `).join('');
    stack.querySelectorAll('.twk-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        state.type = btn.dataset.type;
        apply(); renderType(); persist();
      });
    });
  }

  function renderRhythm() {
    const stack = document.getElementById('twk-rhythm-stack');
    stack.innerHTML = RHYTHMS.map(r => `
      <button class="twk-opt ${r.id === state.rhythm ? 'is-active' : ''}" data-rhythm="${r.id}">
        <div>
          <div class="twk-opt-label">${r.label}</div>
          <div class="twk-opt-sub">${r.sub}</div>
        </div>
      </button>
    `).join('');
    stack.querySelectorAll('.twk-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        state.rhythm = btn.dataset.rhythm;
        apply(); renderRhythm(); persist();
      });
    });
  }

  function renderAll() {
    renderMoods(); updateMoodSub(); renderType(); renderRhythm();
  }
  renderAll();

  // ── Drag header ─────────────────────────────────────────────
  (function makeDraggable() {
    const hd = document.getElementById('twk-hd');
    let dragging = false, startX, startY, startRight, startBottom;
    hd.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.twk-x')) return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      startRight = window.innerWidth - rect.right;
      startBottom = window.innerHeight - rect.bottom;
      hd.setPointerCapture(e.pointerId);
    });
    hd.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      panel.style.right  = Math.max(8, startRight  - dx) + 'px';
      panel.style.bottom = Math.max(8, startBottom - dy) + 'px';
    });
    hd.addEventListener('pointerup', () => { dragging = false; });
  })();

  // ── Close button ────────────────────────────────────────────
  document.getElementById('twk-x').addEventListener('click', () => {
    panel.classList.remove('twk-open');
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch(e) {}
  });

  // ── Host protocol ───────────────────────────────────────────
  window.addEventListener('message', (e) => {
    const data = e.data || {};
    if (data.type === '__activate_edit_mode')   panel.classList.add('twk-open');
    if (data.type === '__deactivate_edit_mode') panel.classList.remove('twk-open');
  });
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch(e) {}
})();
