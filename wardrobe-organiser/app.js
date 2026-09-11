const DB_NAME = 'cloth-and-form-local';
const DB_VERSION = 1;
const ITEM_STORE = 'items';
const SETTINGS_STORE = 'settings';

const COLOR_META = {
  ivory: { label: 'Ivory', hex: '#e8dfcf', hue: 42, family: 'neutral', ink: '#5d574e' },
  navy: { label: 'Navy', hex: '#283a55', hue: 216, family: 'blue', ink: '#fff' },
  sage: { label: 'Sage', hex: '#91a28d', hue: 108, family: 'green', ink: '#243126' },
  terracotta: { label: 'Terracotta', hex: '#b9654e', hue: 11, family: 'red', ink: '#fff' },
  ochre: { label: 'Ochre', hex: '#c4943c', hue: 40, family: 'yellow', ink: '#332516' },
  black: { label: 'Black', hex: '#2a2b29', hue: 0, family: 'neutral', ink: '#fff' },
  denim: { label: 'Denim', hex: '#6f88a2', hue: 211, family: 'blue', ink: '#fff' },
  rose: { label: 'Rose', hex: '#c98e8b', hue: 2, family: 'red', ink: '#fff' }
};

const CATEGORY_LABELS = { top: 'Top', bottom: 'Bottom', dress: 'Dress', outerwear: 'Outerwear' };
const FIT_PROFILES = {
  hourglass: { name: 'Hourglass', short: 'Hourglass', description: 'Shoulders and hips feel balanced, with a visible waist.', tip: 'Selected for balanced proportions and gentle waist definition.' },
  pear: { name: 'Pear', short: 'Pear', description: 'Hips feel fuller than the shoulders.', tip: 'Selected for easy balance through the shoulder and hip line.' },
  rectangle: { name: 'Rectangle', short: 'Rectangle', description: 'Shoulders, waist, and hips feel more even.', tip: 'Selected for clean lines, light structure, and flexible layers.' },
  inverted: { name: 'Inverted triangle', short: 'Inverted triangle', description: 'Shoulders feel broader than the hips.', tip: 'Selected for relaxed lower lines and balanced layering.' },
  apple: { name: 'Apple', short: 'Apple', description: 'You carry more shape through the middle.', tip: 'Selected for soft structure, movement, and comfortable drape.' }
};
const LEGACY_PROFILE_MAP = { balanced: 'rectangle', defined: 'hourglass', curve: 'pear', longline: 'rectangle' };

const SAMPLE_ITEMS = [
  { id: 'sample-1', name: 'Linen weekend shirt', category: 'top', color: 'ivory', fit: 'relaxed', pattern: 'solid', sample: true, createdAt: 1 },
  { id: 'sample-2', name: 'Everyday navy tee', category: 'top', color: 'navy', fit: 'regular', pattern: 'solid', sample: true, createdAt: 2 },
  { id: 'sample-3', name: 'Soft sage knit', category: 'top', color: 'sage', fit: 'relaxed', pattern: 'solid', sample: true, createdAt: 3 },
  { id: 'sample-4', name: 'Terracotta midi dress', category: 'dress', color: 'terracotta', fit: 'regular', pattern: 'solid', sample: true, createdAt: 4 },
  { id: 'sample-5', name: 'Straight-leg denim', category: 'bottom', color: 'denim', fit: 'regular', pattern: 'solid', sample: true, createdAt: 5 },
  { id: 'sample-6', name: 'Ochre wide-leg trouser', category: 'bottom', color: 'ochre', fit: 'relaxed', pattern: 'solid', sample: true, createdAt: 6 },
  { id: 'sample-7', name: 'Ink chore jacket', category: 'outerwear', color: 'black', fit: 'relaxed', pattern: 'solid', sample: true, createdAt: 7 },
  { id: 'sample-8', name: 'Rose cotton jacket', category: 'outerwear', color: 'rose', fit: 'tailored', pattern: 'solid', sample: true, createdAt: 8 }
];

const PHOTO_SAMPLE_ITEMS = [
  { id: 'photo-sample-1', name: 'White cotton tee', category: 'top', color: 'ivory', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/shirt-ivory.jpg', source: 'Unsplash', createdAt: 1001 },
  { id: 'photo-sample-2', name: 'Forest green jersey', category: 'top', color: 'sage', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/shirt-sage.jpg', source: 'Unsplash', createdAt: 1002 },
  { id: 'photo-sample-3', name: 'Colour-block tee set', category: 'top', color: 'ochre', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/shirt-ochre.jpg', source: 'Unsplash', createdAt: 1003 },
  { id: 'photo-sample-4', name: 'Red graphic tee', category: 'top', color: 'terracotta', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/candidate-3.jpg', source: 'Unsplash', createdAt: 1004 },
  { id: 'photo-sample-5', name: 'Textured neutral knit', category: 'top', color: 'ivory', fit: 'relaxed', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/shirt-rose.jpg', source: 'Unsplash', createdAt: 1005 },
  { id: 'photo-sample-6', name: 'Light-wash jeans', category: 'bottom', color: 'denim', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/denim-light.jpg', source: 'Unsplash', createdAt: 1006 },
  { id: 'photo-sample-7', name: 'Dark denim trio', category: 'bottom', color: 'black', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/denim-dark.jpg', source: 'Unsplash', createdAt: 1007 },
  { id: 'photo-sample-8', name: 'Khaki tapered trousers', category: 'bottom', color: 'ochre', fit: 'tailored', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/candidate-1.jpg', source: 'Unsplash', createdAt: 1008 },
  { id: 'photo-sample-9', name: 'Soft pink joggers', category: 'bottom', color: 'rose', fit: 'relaxed', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/trouser-cream.jpg', source: 'Unsplash', createdAt: 1009 },
  { id: 'photo-sample-10', name: 'Floral wrap dress', category: 'dress', color: 'rose', fit: 'regular', pattern: 'floral', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/dress-terracotta.jpg', source: 'Unsplash', createdAt: 1010 },
  { id: 'photo-sample-11', name: 'White summer dress', category: 'dress', color: 'ivory', fit: 'regular', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/dress-black.jpg', source: 'Unsplash', createdAt: 1011 },
  { id: 'photo-sample-12', name: 'Sunlit cropped hoodie', category: 'top', color: 'ochre', fit: 'relaxed', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/dress-sage.jpg', source: 'Unsplash', createdAt: 1012 },
  { id: 'photo-sample-13', name: 'Black leather jacket', category: 'outerwear', color: 'black', fit: 'tailored', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/jacket-leather.jpg', source: 'Unsplash', createdAt: 1013 },
  { id: 'photo-sample-14', name: 'Camel wrap coat', category: 'outerwear', color: 'ochre', fit: 'tailored', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/coat-camel.jpg', source: 'Unsplash', createdAt: 1014 },
  { id: 'photo-sample-15', name: 'Denim jacket layer', category: 'outerwear', color: 'denim', fit: 'relaxed', pattern: 'solid', sample: true, sampleType: 'photo', imageSrc: 'assets/sample-clothes/candidate-2.jpg', source: 'Unsplash', createdAt: 1015 }
];

const state = {
  items: [],
  profile: 'hourglass',
  activeView: 'wardrobe',
  activeCategory: 'all',
  search: '',
  colorFilter: 'all',
  sort: 'recent',
  selectedAnchor: null,
  outfit: [],
  savedIds: new Set(),
  uploadedImage: null,
  sampleColorIndex: 0
};

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ITEM_STORE)) db.createObjectStore(ITEM_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGetAll(storeName) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readonly').objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbPut(storeName, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readwrite').objectStore(storeName).put(value);
    request.onsuccess = () => resolve(value);
    request.onerror = () => reject(request.error);
  });
}

async function dbDelete(storeName, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readwrite').objectStore(storeName).delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function loadState() {
  let items = await dbGetAll(ITEM_STORE);
  if (!items.length) {
    for (const item of SAMPLE_ITEMS) await dbPut(ITEM_STORE, item);
    items = await dbGetAll(ITEM_STORE);
  }
  const existingIds = new Set(items.map((item) => item.id));
  for (const item of PHOTO_SAMPLE_ITEMS) {
    if (!existingIds.has(item.id)) await dbPut(ITEM_STORE, item);
  }
  state.items = await dbGetAll(ITEM_STORE);
  const settings = await dbGetAll(SETTINGS_STORE);
  const profileSetting = settings.find((setting) => setting.key === 'profile');
  const savedSetting = settings.find((setting) => setting.key === 'savedIds');
  const storedProfile = profileSetting?.value;
  if (storedProfile && FIT_PROFILES[storedProfile]) state.profile = storedProfile;
  else if (storedProfile && LEGACY_PROFILE_MAP[storedProfile]) state.profile = LEGACY_PROFILE_MAP[storedProfile];
  if (savedSetting?.value) state.savedIds = new Set(savedSetting.value);
  state.selectedAnchor = state.items[0]?.id || null;
  chooseOutfit();
}

function colorMeta(color) { return COLOR_META[color] || COLOR_META.ivory; }
function categoryLabel(category) { return CATEGORY_LABELS[category] || category; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }

function itemColorDot(item) {
  const meta = colorMeta(item.color);
  return `<span class="color-dot" style="background:${meta.hex}"></span>`;
}

function garmentSvg(item, small = false) {
  const meta = colorMeta(item.color);
  const stroke = 'rgba(35,38,31,.18)';
  const pattern = item.pattern === 'stripe' ? `<path d="M25 24 L68 93 M42 20 L83 87" stroke="rgba(255,255,255,.35)" stroke-width="5"/>` : item.pattern === 'check' ? `<path d="M25 38 H82 M21 57 H86 M36 17 V91 M57 16 V93" stroke="rgba(255,255,255,.25)" stroke-width="4"/>` : item.pattern === 'floral' ? `<g fill="rgba(255,255,255,.34)"><circle cx="39" cy="45" r="5"/><circle cx="66" cy="62" r="5"/><circle cx="52" cy="77" r="4"/></g>` : '';
  let shape = '';
  if (item.category === 'top') shape = `<path d="M30 18 L46 12 L56 21 L66 12 L82 18 L91 53 L73 57 L70 94 L31 94 L28 57 L10 53 Z" fill="${meta.hex}" stroke="${stroke}" stroke-width="1.5"/><path d="M45 13 Q51 27 57 21" fill="none" stroke="${stroke}" stroke-width="1.5"/>`;
  if (item.category === 'bottom') shape = `<path d="M29 10 Q50 16 71 10 L82 96 L56 96 L50 48 L44 96 L18 96 Z" fill="${meta.hex}" stroke="${stroke}" stroke-width="1.5"/><path d="M32 28 H72" stroke="rgba(255,255,255,.3)" stroke-width="2"/>`;
  if (item.category === 'dress') shape = `<path d="M39 10 Q50 18 61 10 L63 37 L88 96 H12 L37 37 Z" fill="${meta.hex}" stroke="${stroke}" stroke-width="1.5"/><path d="M38 11 Q50 28 62 11" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="2"/>`;
  if (item.category === 'outerwear') shape = `<path d="M29 15 L45 10 L50 24 L55 10 L72 15 L87 94 L56 94 L50 50 L44 94 L13 94 Z" fill="${meta.hex}" stroke="${stroke}" stroke-width="1.5"/><path d="M50 24 V92 M28 33 L44 38 M72 33 L56 38" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="2"/>`;
  return `<svg class="clothing-svg" viewBox="0 0 100 105" aria-hidden="true">${shape}${pattern}</svg>`;
}

function renderCard(item) {
  const meta = colorMeta(item.color);
  const saved = state.savedIds.has(item.id);
  const imageSource = item.imageData || item.imageSrc;
  const image = imageSource ? `<img src="${escapeHtml(imageSource)}" alt="${escapeHtml(item.name)}" />` : '';
  const sampleLabel = item.sampleType === 'photo' ? 'photo sample' : item.sample ? 'sample' : '';
  return `<article class="clothing-card ${state.selectedAnchor === item.id ? 'selected' : ''}" data-id="${item.id}" tabindex="0" aria-label="${escapeHtml(item.name)}">
    <div class="clothing-thumb" style="background:linear-gradient(145deg, ${meta.hex}55, #f1eee4)">${garmentSvg(item)}${image}${sampleLabel ? `<span class="sample-label">${sampleLabel}</span>` : ''}<button class="card-heart ${saved ? 'saved' : ''}" data-heart="${item.id}" aria-label="${saved ? 'Remove from saved' : 'Save'}">${saved ? '♥' : '♡'}</button></div>
    <div class="card-meta"><div class="card-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div><div class="card-sub">${itemColorDot(item)}${meta.label} · ${categoryLabel(item.category)}</div></div>
  </article>`;
}

function filteredItems() {
  let list = state.items.filter((item) => {
    const matchesCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
    const matchesSearch = !state.search || `${item.name} ${item.category} ${colorMeta(item.color).label}`.toLowerCase().includes(state.search.toLowerCase());
    const matchesColor = state.colorFilter === 'all' || colorMeta(item.color).family === state.colorFilter;
    return matchesCategory && matchesSearch && matchesColor;
  });
  if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === 'color') list.sort((a, b) => colorMeta(a.color).label.localeCompare(colorMeta(b.color).label));
  if (state.sort === 'recent') list.sort((a, b) => b.createdAt - a.createdAt);
  return list;
}

function renderGrid() {
  const list = filteredItems();
  document.querySelector('#clothingGrid').innerHTML = list.map(renderCard).join('');
  document.querySelector('#emptyState').hidden = list.length > 0;
  document.querySelector('#pieceCount').textContent = state.items.length;
  document.querySelector('#navCount').textContent = state.items.length;
  document.querySelector('#allCount').textContent = state.items.length;
  ['top', 'bottom', 'dress', 'outerwear'].forEach((category) => {
    document.querySelector(`#${category}Count`).textContent = state.items.filter((item) => item.category === category).length;
  });
  document.querySelectorAll('.clothing-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-heart]')) return;
      state.selectedAnchor = card.dataset.id;
      chooseOutfit();
      renderGrid();
    });
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter') { state.selectedAnchor = card.dataset.id; chooseOutfit(); renderGrid(); } });
  });
  document.querySelectorAll('[data-heart]').forEach((button) => button.addEventListener('click', async (event) => {
    event.stopPropagation();
    const id = button.dataset.heart;
    if (state.savedIds.has(id)) state.savedIds.delete(id); else state.savedIds.add(id);
    await dbPut(SETTINGS_STORE, { key: 'savedIds', value: [...state.savedIds] });
    renderGrid();
    showToast(state.savedIds.has(id) ? 'Saved to your edit' : 'Removed from saved');
  }));
}

function hueDistance(a, b) {
  const diff = Math.abs(a - b);
  return Math.min(diff, 360 - diff);
}

function colorScore(items) {
  const colors = items.map((item) => colorMeta(item.color));
  if (colors.length < 2) return 72;
  let score = 76;
  for (let i = 0; i < colors.length; i += 1) for (let j = i + 1; j < colors.length; j += 1) {
    const a = colors[i]; const b = colors[j];
    if (a.family === 'neutral' || b.family === 'neutral') score += 8;
    else if (a.family === b.family) score += 4;
    else if (hueDistance(a.hue, b.hue) > 135) score += 6;
    else if (hueDistance(a.hue, b.hue) < 35) score += 1;
    else score -= 2;
  }
  return Math.max(61, Math.min(98, Math.round(score)));
}

function compatibilityNote(score, items) {
  if (items.some((item) => item.pattern && item.pattern !== 'solid')) return 'Pattern-led, with a steady base';
  if (score >= 88) return 'Clear harmony with a confident accent';
  if (score >= 80) return 'Soft contrast, easy to repeat';
  return 'A fresh contrast worth trying';
}

function chooseOutfit(offset = 0) {
  const items = state.items;
  if (!items.length) { state.outfit = []; renderPairing(); return; }
  const anchor = items.find((item) => item.id === state.selectedAnchor) || items[0];
  const findCategory = (category, exclude = []) => {
    const candidates = items.filter((item) => item.category === category && !exclude.includes(item.id));
    if (!candidates.length) return null;
    const ranked = [...candidates].sort((a, b) => {
      const aScore = colorScore([anchor, a]); const bScore = colorScore([anchor, b]);
      return bScore - aScore;
    });
    return ranked[offset % ranked.length];
  };
  let outfit = [];
  if (anchor.category === 'dress') {
    outfit = [anchor];
    const layer = findCategory('outerwear', [anchor.id]);
    if (layer) outfit.push(layer);
  } else {
    const top = anchor.category === 'top' ? anchor : findCategory('top', [anchor.id]);
    const bottom = anchor.category === 'bottom' ? anchor : findCategory('bottom', [anchor.id]);
    if (top) outfit.push(top);
    if (bottom) outfit.push(bottom);
    const outerwear = findCategory('outerwear', outfit.map((item) => item.id));
    if (outerwear && outfit.length >= 2 && state.items.length > 4) outfit.push(outerwear);
  }
  state.outfit = outfit;
  renderPairing();
}

function mannequinSvg(outfit) {
  const top = outfit.find((item) => item.category === 'top');
  const bottom = outfit.find((item) => item.category === 'bottom');
  const dress = outfit.find((item) => item.category === 'dress');
  const outerwear = outfit.find((item) => item.category === 'outerwear');
  const fill = (item, fallback) => colorMeta(item?.color || fallback).hex;
  const topFill = fill(top, 'ivory'); const bottomFill = fill(bottom, 'denim'); const dressFill = fill(dress, 'terracotta'); const outerFill = fill(outerwear, 'black');
  return `<svg viewBox="0 0 260 520" role="img" aria-label="Illustrated mannequin wearing your selected outfit">
    <defs><linearGradient id="skin" x1="0" x2="1"><stop offset="0" stop-color="#ceb69f"/><stop offset="1" stop-color="#b89c85"/></linearGradient><linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".5" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".12"/></linearGradient></defs>
    <ellipse cx="130" cy="491" rx="69" ry="8" fill="rgba(56,69,54,.14)"/>
    <path d="M102 465 L110 375 L150 375 L159 465" fill="#76806f" opacity=".2"/>
    <path d="M117 382 L115 468 M143 382 L146 468" stroke="#9c9d8d" stroke-width="13" stroke-linecap="round"/>
    <path d="M111 464 L100 478 L118 480 L129 468 M147 464 L162 478 L143 480 L130 468" fill="#777b70"/>
    <ellipse cx="130" cy="78" rx="34" ry="41" fill="url(#skin)"/><path d="M99 74 Q103 34 131 35 Q162 34 164 74 Q148 55 99 74" fill="#52564c"/><path d="M121 114 H139 V139 H121Z" fill="url(#skin)"/>
    ${dress ? `<path d="M111 135 L149 135 L156 245 L194 384 Q130 405 66 384 L104 245 Z" fill="${dressFill}" stroke="#30352d" stroke-opacity=".14"/><path d="M111 136 Q130 160 149 136" fill="none" stroke="rgba(255,255,255,.36)" stroke-width="3"/><path d="M83 308 Q130 323 177 308" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="3"/>` : `<path d="M105 135 L122 130 L130 149 L138 130 L155 135 L174 246 L151 252 L147 194 L148 274 L112 274 L112 194 L109 252 L86 246 Z" fill="${topFill}" stroke="#30352d" stroke-opacity=".14"/><path d="M112 274 L148 274 L167 381 L131 384 L126 310 L119 384 L83 381 Z" fill="${bottomFill}" stroke="#30352d" stroke-opacity=".14"/><path d="M114 145 Q130 172 146 145" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="3"/>`}
    ${outerwear ? `<path d="M98 134 L114 128 L130 159 L146 128 L162 134 L184 265 L155 270 L148 194 L149 293 L111 293 L112 194 L105 270 L76 265 Z" fill="${outerFill}" fill-opacity=".92" stroke="#30352d" stroke-opacity=".16"/><path d="M130 160 V291 M101 165 L112 177 M159 165 L148 177" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>` : ''}
    <path d="M105 140 L88 246 M155 140 L172 246" stroke="#b99f88" stroke-width="12" stroke-linecap="round" opacity=".94"/><circle cx="87" cy="248" r="7" fill="url(#skin)"/><circle cx="173" cy="248" r="7" fill="url(#skin)"/>
    <path d="M130 156 L130 268" stroke="url(#cloth)" stroke-width="7" opacity=".28"/>
  </svg>`;
}

function renderPairing() {
  const stage = document.querySelector('#mannequinStage');
  const studioStage = document.querySelector('#studioMannequinStage');
  stage.innerHTML = state.outfit.length ? mannequinSvg(state.outfit) : '<div class="empty-icon">＋</div>';
  studioStage.innerHTML = state.outfit.length ? mannequinSvg(state.outfit) : '<div class="empty-icon">＋</div>';
  document.querySelector('#pairingItems').innerHTML = state.outfit.map((item) => `<span class="item-chip">${itemColorDot(item)}${escapeHtml(item.name)}</span>`).join('');
  const score = colorScore(state.outfit);
  document.querySelector('#compatibilityScore').innerHTML = `${score}<span>%</span>`;
  document.querySelector('#compatibilityNote').textContent = compatibilityNote(score, state.outfit);
  document.querySelector('#profileTip').innerHTML = `<span>◒</span> ${FIT_PROFILES[state.profile].tip}`;
  document.querySelector('#pairingProfileLabel').textContent = FIT_PROFILES[state.profile].short;
  document.querySelector('#profileStat').textContent = FIT_PROFILES[state.profile].short;
  document.querySelector('#outfitCount').textContent = Math.max(0, Math.min(24, state.items.length + 4));
  renderStudioControls();
}

function renderStudioControls() {
  const categories = ['top', 'bottom', 'dress', 'outerwear'];
  const selected = Object.fromEntries(categories.map((category) => [category, state.outfit.find((item) => item.category === category)?.id || '']));
  document.querySelector('#studioSelectList').innerHTML = categories.map((category) => `<div class="studio-select-row"><label>${categoryLabel(category)} <span class="color-dot" style="background:${selected[category] ? colorMeta(state.items.find((item) => item.id === selected[category]).color).hex : '#d7d8d0'}"></span></label><select data-studio-category="${category}"><option value="">No ${categoryLabel(category).toLowerCase()}</option>${state.items.filter((item) => item.category === category).map((item) => `<option value="${item.id}" ${selected[category] === item.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}</select></div>`).join('');
  document.querySelectorAll('[data-studio-category]').forEach((select) => select.addEventListener('change', () => {
    const values = [...document.querySelectorAll('[data-studio-category]')].map((element) => element.value).filter(Boolean);
    state.outfit = values.map((id) => state.items.find((item) => item.id === id)).filter(Boolean);
    renderPairing();
  }));
}

function profileFigure(profile) {
  const bodies = {
    hourglass: '<path d="M30 36 Q40 24 50 36 L53 56 Q59 66 51 73 Q58 84 50 93 L44 108 H36 L30 93 Q22 84 29 73 Q21 66 27 56Z" fill="#9aab91"/><path d="M34 64 L27 111 M46 64 L53 111" stroke="#71836c" stroke-width="5" stroke-linecap="round"/>',
    pear: '<path d="M32 36 Q40 24 48 36 L49 57 Q55 70 59 82 L48 108 H32 L21 82 Q26 69 31 57Z" fill="#9aab91"/><path d="M35 64 L28 111 M45 64 L52 111" stroke="#71836c" stroke-width="5" stroke-linecap="round"/>',
    rectangle: '<path d="M32 36 Q40 24 48 36 L50 64 L49 108 H31 L30 64Z" fill="#9aab91"/><path d="M35 64 L30 111 M45 64 L50 111" stroke="#71836c" stroke-width="5" stroke-linecap="round"/>',
    inverted: '<path d="M28 36 Q40 24 52 36 L56 57 L48 72 L50 108 H30 L32 72 L24 57Z" fill="#9aab91"/><path d="M35 64 L28 111 M45 64 L52 111" stroke="#71836c" stroke-width="5" stroke-linecap="round"/>',
    apple: '<path d="M31 36 Q40 24 49 36 Q57 47 54 63 Q61 76 50 91 L44 108 H36 L30 91 Q19 76 26 63 Q23 47 31 36Z" fill="#9aab91"/><path d="M35 64 L28 111 M45 64 L52 111" stroke="#71836c" stroke-width="5" stroke-linecap="round"/>'
  };
  return `<svg viewBox="0 0 80 125" aria-hidden="true"><circle cx="40" cy="16" r="10" fill="#c6ad95"/><path d="M30 15 Q31 3 41 5 Q50 5 50 16" fill="#575c4f"/>${bodies[profile]}</svg>`;
}

function renderProfiles() {
  document.querySelector('#profileOptions').innerHTML = Object.entries(FIT_PROFILES).map(([key, profile]) => `<button class="profile-option ${state.profile === key ? 'active' : ''}" data-profile="${key}"><div class="profile-figure">${profileFigure(key)}</div><h3>${profile.name}</h3><p>${profile.description}</p></button>`).join('');
  document.querySelectorAll('[data-profile]').forEach((button) => button.addEventListener('click', () => {
    state.profile = button.dataset.profile;
    renderProfiles();
    renderPairing();
  }));
}

function showView(viewName) {
  state.activeView = viewName;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('hidden-view', view.id !== `${viewName}View`));
  if (viewName === 'profile') renderProfiles();
  if (viewName === 'studio') renderPairing();
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2400);
}

function openModal() { document.querySelector('#itemModal').hidden = false; document.querySelector('#itemName').focus(); }
function closeModal() { document.querySelector('#itemModal').hidden = true; state.uploadedImage = null; document.querySelector('#capturePreview').className = 'capture-preview'; }

function makeId() { return `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

async function addItem(event) {
  event.preventDefault();
  const item = { id: makeId(), name: document.querySelector('#itemName').value.trim(), category: document.querySelector('#itemCategory').value, color: document.querySelector('#itemColor').value, fit: document.querySelector('#itemFit').value, pattern: document.querySelector('#itemPattern').value, createdAt: Date.now(), imageData: state.uploadedImage || null, sample: !state.uploadedImage };
  if (!item.name) return;
  await dbPut(ITEM_STORE, item);
  state.items.push(item); state.selectedAnchor = item.id; chooseOutfit(); renderGrid(); closeModal(); document.querySelector('#itemForm').reset(); showToast(`${item.name} added to your wardrobe`);
}

function useSamplePlaceholder() {
  const names = ['Soft cotton layer', 'Weekend colour study', 'Easy everyday piece', 'A new wardrobe note'];
  const colors = Object.keys(COLOR_META);
  const color = colors[state.sampleColorIndex % colors.length]; state.sampleColorIndex += 1;
  document.querySelector('#itemName').value = names[state.sampleColorIndex % names.length];
  document.querySelector('#itemColor').value = color;
  document.querySelector('#capturePreview').className = 'capture-preview';
  showToast('Placeholder selected — choose a category and add it');
}

function readImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { state.uploadedImage = reader.result; const preview = document.querySelector('#capturePreview'); preview.className = 'capture-preview has-image'; preview.style.backgroundImage = `url("${reader.result}")`; };
  reader.readAsDataURL(file);
}

async function saveCurrentOutfit() {
  const saved = state.outfit.map((item) => item.name).join(' + ');
  if (!saved) return showToast('Add a few pieces before saving');
  const savedOutfits = (await dbGetAll(SETTINGS_STORE)).find((setting) => setting.key === 'outfits')?.value || [];
  savedOutfits.push({ id: makeId(), itemIds: state.outfit.map((item) => item.id), createdAt: Date.now() });
  await dbPut(SETTINGS_STORE, { key: 'outfits', value: savedOutfits });
  showToast('Outfit saved to your local edit');
}

function exportWardrobe() {
  const payload = { app: 'cloth-and-form', version: 1, exportedAt: new Date().toISOString(), profile: state.profile, items: state.items, savedIds: [...state.savedIds] };
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })); link.download = `cloth-and-form-wardrobe-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(link.href); showToast('Wardrobe backup exported');
}

async function importWardrobe(event) {
  const file = event.target.files?.[0]; if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (!Array.isArray(payload.items)) throw new Error('Invalid wardrobe file');
    for (const item of payload.items) await dbPut(ITEM_STORE, item);
    state.items = await dbGetAll(ITEM_STORE);
    if (payload.profile && FIT_PROFILES[payload.profile]) state.profile = payload.profile;
    if (Array.isArray(payload.savedIds)) state.savedIds = new Set(payload.savedIds);
    await dbPut(SETTINGS_STORE, { key: 'profile', value: state.profile });
    await dbPut(SETTINGS_STORE, { key: 'savedIds', value: [...state.savedIds] });
    state.selectedAnchor = state.items[0]?.id || null; chooseOutfit(); renderGrid(); showToast('Wardrobe backup imported');
  } catch (error) { showToast('That file could not be imported'); }
  event.target.value = '';
}

function setupEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
  document.querySelector('#addItemButton').addEventListener('click', openModal);
  document.querySelector('#emptyAddButton').addEventListener('click', openModal);
  document.querySelector('#closeModalButton').addEventListener('click', closeModal);
  document.querySelector('#itemModal').addEventListener('click', (event) => { if (event.target.id === 'itemModal') closeModal(); });
  document.querySelector('#itemForm').addEventListener('submit', addItem);
  document.querySelector('#useSampleButton').addEventListener('click', useSamplePlaceholder);
  document.querySelector('#imageInput').addEventListener('change', readImage);
  document.querySelector('#searchInput').addEventListener('input', (event) => { state.search = event.target.value; renderGrid(); });
  document.querySelectorAll('.category-tab').forEach((button) => button.addEventListener('click', () => { state.activeCategory = button.dataset.category; document.querySelectorAll('.category-tab').forEach((tab) => tab.classList.toggle('active', tab === button)); renderGrid(); }));
  document.querySelector('#filterButton').addEventListener('click', () => { const drawer = document.querySelector('#filterDrawer'); drawer.hidden = !drawer.hidden; });
  document.querySelector('#colorFilter').addEventListener('change', (event) => { state.colorFilter = event.target.value; renderGrid(); });
  document.querySelector('#sortFilter').addEventListener('change', (event) => { state.sort = event.target.value; renderGrid(); });
  document.querySelector('#clearFilters').addEventListener('click', () => { state.colorFilter = 'all'; state.sort = 'recent'; document.querySelector('#colorFilter').value = 'all'; document.querySelector('#sortFilter').value = 'recent'; renderGrid(); });
  document.querySelector('#shuffleButton').addEventListener('click', () => { state.selectedAnchor = state.items[Math.floor(Math.random() * state.items.length)]?.id; chooseOutfit(Math.floor(Math.random() * 3)); renderGrid(); showToast('A new pairing is ready'); });
  document.querySelector('#studioShuffleButton').addEventListener('click', () => { state.selectedAnchor = state.items[Math.floor(Math.random() * state.items.length)]?.id; chooseOutfit(Math.floor(Math.random() * 3)); renderGrid(); showToast('A new pairing is ready'); });
  document.querySelector('#saveOutfitButton').addEventListener('click', saveCurrentOutfit);
  document.querySelector('#profileShortcut').addEventListener('click', () => showView('profile'));
  document.querySelector('#saveProfileButton').addEventListener('click', async () => { await dbPut(SETTINGS_STORE, { key: 'profile', value: state.profile }); showToast('Fit profile saved locally'); });
  document.querySelector('#helpButton').addEventListener('click', () => showToast('Prototype mode: manual tagging, local storage, and color pairing'));
  document.querySelector('#exportButton').addEventListener('click', exportWardrobe);
  document.querySelector('#importInput').addEventListener('change', importWardrobe);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !document.querySelector('#itemModal').hidden) closeModal(); });
}

async function init() {
  setupEvents();
  await loadState();
  renderGrid(); renderPairing(); renderProfiles();
}

init().catch((error) => { console.error(error); showToast(`Local wardrobe storage could not start: ${error?.message || 'unknown error'}`); });
