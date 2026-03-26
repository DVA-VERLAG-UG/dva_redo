// header.js - Header behavior, language switcher, search with blog + sections

const ROUTES = {
  de: {
    home:     "/de/",
    about:    "/de/ueber-uns.html",
    contact:  "/de/kontakt.html",
    projects: "/de/projekte.html",
    packages: "/de/pakete.html",
    config:   "/de/konfigurator-page.html",
    blog:     "/de/blog-index.html"
  },
  en: {
    home:     "/en/",
    about:    "/en/about.html",
    contact:  "/en/contact.html",
    projects: "/en/projects.html",
    packages: "/en/packages.html",
    config:   "/en/configurator-page.html",
    blog:     "/en/blog-index.html"
  },
  tr: {
    home:     "/tr/",
    about:    "/tr/hakkimizda.html",
    contact:  "/tr/iletisim.html",
    projects: "/tr/projeler.html",
    packages: "/tr/paketler.html",
    config:   "/tr/yapilandirma.html",
    blog:     "/tr/blog-index.html"
  },
  fr: {
    home:     "/fr/",
    about:    "/fr/a-propos.html",
    contact:  "/fr/contact.html",
    projects: "/fr/projets.html",
    packages: "/fr/forfaits.html",
    config:   "/fr/configuration.html",
    blog:     "/fr/blog-index.html"
  }
};

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4g1gNsiyY4k2A052LR7EaVUYFqrWGWNITOPqw5bGG_PTogiP84C44VQJpKn-HC2vxHin4fTy_puU0/pub?output=csv";

function getCurrentLanguage() {
  const p = window.location.pathname;
  if (p.startsWith('/de/')) return 'de';
  if (p.startsWith('/en/')) return 'en';
  if (p.startsWith('/tr/')) return 'tr';
  if (p.startsWith('/fr/')) return 'fr';
  return 'de';
}

function getCurrentPageKey() {
  const path = window.location.pathname;
  const lang = getCurrentLanguage();
  for (const [key, route] of Object.entries(ROUTES[lang])) {
    if (path === route || path.startsWith(route)) return key;
  }
  return 'home';
}

// ── EXPORTS ───────────────────────────────────────────────
export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  setupScroll(header);
  setupMobileMenu(header);
  setupLanguageSwitcher();
  setupSearch();
}

// ── SCROLL ────────────────────────────────────────────────
function setupScroll(header) {
  let lastY = window.scrollY, ticking = false;
  function update() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    if (y > 100) {
      header.classList.toggle('is-hidden', y > lastY);
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

// ── MOBILE MENU ───────────────────────────────────────────
function setupMobileMenu(header) {
  const menuToggle  = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuDrawer  = document.getElementById('menuDrawer');
  const drawerClose = document.getElementById('drawerClose');

  function openMenu() {
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuOverlay?.classList.add('is-open');
    menuDrawer?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    header.classList.remove('is-hidden');
  }
  function closeMenu() {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuOverlay?.classList.remove('is-open');
    menuDrawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  menuToggle?.addEventListener('click', () =>
    menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  menuOverlay?.addEventListener('click', closeMenu);
  drawerClose?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuDrawer?.classList.contains('is-open')) closeMenu();
  });
}

// ── LANGUAGE ──────────────────────────────────────────────
function setupLanguageSwitcher() {
  const lang = getCurrentLanguage();
  const key  = getCurrentPageKey();
  document.querySelectorAll('[data-lang]').forEach(link => {
    const t = link.getAttribute('data-lang');
    link.href = ROUTES[t]?.[key] || ROUTES[t]?.home || '/';
    link.classList.toggle('is-active', t === lang);
  });
}

// ══════════════════════════════════════════════════════════
//   SEARCH ENGINE
// ══════════════════════════════════════════════════════════

// Cache
let staticIndex  = null;   // aus search-index.json
let blogCache    = null;   // aus Google Sheet

// ── 1. Static Index laden ─────────────────────────────────
async function loadStaticIndex() {
  if (staticIndex) return staticIndex;
  try {
    const res = await fetch('/assets/data/search-index.json', { cache: 'no-store' });
    if (!res.ok) throw new Error();
    staticIndex = await res.json();
  } catch {
    staticIndex = [];
  }
  return staticIndex;
}

// ── 2. Blog-Beiträge aus Sheet laden ─────────────────────
function parseCSV(text) {
  const rows = []; let row = [], cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i+1];
    if (inQ) {
      if (c==='"'&&n==='"') { cur+='"'; i++; }
      else if (c==='"') { inQ=false; }
      else cur+=c;
    } else {
      if (c==='"') inQ=true;
      else if (c===',') { row.push(cur); cur=''; }
      else if (c==='\n') { row.push(cur); rows.push(row); row=[]; cur=''; }
      else if (c!=='\r') cur+=c;
    }
  }
  row.push(cur); rows.push(row);
  return rows.filter(r => r.some(c => c.trim()));
}

async function loadBlogEntries() {
  if (blogCache) return blogCache;
  try {
    const res  = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
    const csv  = await res.text();
    const rows = parseCSV(csv);
    if (rows.length < 2) throw new Error();

    const hdr = rows[0].map(h => h.toLowerCase().trim());
    const idx = n => hdr.indexOf(n.toLowerCase().trim());

    blogCache = rows.slice(1).map(r => ({
      title:       r[idx('title')]   || '',
      description: r[idx('excerpt')] || r[idx('content')] || '',
      url:         '/' + getCurrentLanguage() + '/post.html?slug=' + encodeURIComponent(r[idx('slug')] || ''),
      keywords:    (r[idx('tags')] || '').split(',').map(t => t.trim()).filter(Boolean),
      type:        'blog',
      date:        r[idx('date')] || '',
      slug:        r[idx('slug')] || '',
    })).filter(e => e.slug && e.title);
  } catch {
    blogCache = [];
  }
  return blogCache;
}

// ── 3. Alles zusammenführen ───────────────────────────────
// Rohdaten zusammenführen — gecacht damit Sheet nur 1x geladen wird
async function getAllEntries() {
  const [pages, blog] = await Promise.all([loadStaticIndex(), loadBlogEntries()]);
  return [...pages, ...blog];
}


// ── 4. Scoring ────────────────────────────────────────────
function score(entry, words) {
  let s = 0;
  const title  = entry.title.toLowerCase();
  const desc   = (entry.description || '').toLowerCase();
  const kw     = (entry.keywords || []).join(' ').toLowerCase();
  const sects  = (entry.sections  || []).map(x => x.text + ' ' + x.label).join(' ').toLowerCase();

  words.forEach(w => {
    if (title.startsWith(w))  s += 15;  // exakter Prefix → stärker
    if (title.includes(w))    s += 10;
    if (kw.includes(w))       s += 6;
    if (sects.includes(w))    s += 4;
    if (desc.includes(w))     s += 2;
  });
  return s;
}

// Passenden Seiten-Abschnitt finden
function findSection(entry, words) {
  if (!entry.sections) return null;
  for (const sec of entry.sections) {
    const hay = (sec.text + ' ' + sec.label).toLowerCase();
    if (words.some(w => hay.includes(w))) return sec;
  }
  return null;
}

// ── 5. URL bauen (mit ?q= + #anchor) ─────────────────────
function buildUrl(entry, query, section) {
  // Blog-Posts haben slug direkt in der URL, kein Anker nötig
  const base = entry.type === 'blog'
    ? '/' + getCurrentLanguage() + '/post.html?slug=' + encodeURIComponent(entry.slug) + '&q=' + encodeURIComponent(query)
    : (() => {
        const u = new URL(entry.url, window.location.origin);
        u.searchParams.set('q', query);
        if (section?.id) u.hash = section.id;
        return u.toString();
      })();
  return base;
}

// ── 6. Titel mit Bronze-Highlight ────────────────────────
function hlTitle(title, words) {
  const re = new RegExp(
    `(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );
  return title.replace(re, '<em class="sh-match">$1</em>');
}

// ── 7. Kontext-Snippet ───────────────────────────────────
// Zeigt ~50 Zeichen VOR und NACH dem Treffer im Quelltext
function buildSnippet(text, words, ctxLen) {
  ctxLen = ctxLen || 52;
  if (!text) return '';
  const re = new RegExp(
    '(' + words.map(function(w){ return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')',
    'i'
  );
  const m = re.exec(text);
  if (!m) return text.slice(0, ctxLen * 2) + (text.length > ctxLen * 2 ? '…' : '');

  const start  = Math.max(0, m.index - ctxLen);
  const end    = Math.min(text.length, m.index + m[0].length + ctxLen);
  const before = (start > 0 ? '…' : '') + text.slice(start, m.index);
  const match  = '<em class="sh-match">' + m[0] + '</em>';
  const after  = text.slice(m.index + m[0].length, end) + (end < text.length ? '…' : '');
  return before + match + after;
}

// ── 8. Ergebnis-HTML ──────────────────────────────────────
function buildResultHTML(entry, query, words, section) {
  const url   = buildUrl(entry, query, section);
  const title = hlTitle(entry.title, words);
  const badge = entry.type === 'blog'
    ? '<span class="sr-badge sr-badge--blog">Blog</span>'
    : section
      ? '<span class="sr-badge sr-badge--section">→ ' + section.label + '</span>'
      : '';

  // Besten Kontext bestimmen: Abschnitt > Beschreibung > Keywords
  const sourceText = section
    ? section.text
    : (entry.description || (entry.keywords || []).join(', ') || '');

  const snippet = buildSnippet(sourceText, words, 52);
  const meta    = (entry.type === 'blog' && entry.date)
    ? '<span class="sr-meta-date">' + entry.date + '</span> · '
    : '';

  return '<a class="search-result" href="' + url + '">'
    + '<div class="search-result-title">' + title + ' ' + badge + '</div>'
    + '<div class="search-result-excerpt">' + meta + snippet + '</div>'
    + '</a>';
}

// ── 8. Search Setup ───────────────────────────────────────
function setupSearch() {
  const searchInput    = document.getElementById('headerSearchInput');
  const searchForm     = document.querySelector('.search-form');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchForm || !searchDropdown) return;

  // Index + Blog schon im Hintergrund laden
  getAllEntries();

  let timer;

  async function performSearch(rawQuery) {
    const query = rawQuery.trim();
    if (!query) {
      searchDropdown.classList.remove('is-open');
      searchDropdown.innerHTML = '';
      return;
    }

    const words  = query.toLowerCase().split(/\s+/).filter(Boolean);
    const index  = await getAllEntries();

    const results = index
      .map(entry => {
        const sec = findSection(entry, words);
        return { entry, sec, _score: score(entry, words) };
      })
      .filter(r => r._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 8);

    if (!results.length) {
      const noResultMsg = {
        de: ['Keine Ergebnisse für', 'Versuch einen anderen Suchbegriff.'],
        en: ['No results for', 'Try a different search term.'],
        tr: ['Sonuç bulunamadı:', 'Farklı bir arama terimi deneyin.'],
        fr: ['Aucun résultat pour', 'Essayez un autre terme de recherche.']
      }[getCurrentLanguage()] || ['No results for', 'Try a different search term.'];
      searchDropdown.innerHTML = '<div class="search-result search-no-result">'
        + '<div class="search-result-title">' + noResultMsg[0] + ' „' + query + '“</div>'
        + '<div class="search-result-excerpt">' + noResultMsg[1] + '</div>'
        + '</div>';
      searchDropdown.classList.add('is-open');
      return;
    }

    searchDropdown.innerHTML = results
      .map(({ entry, sec }) => buildResultHTML(entry, query, words, sec))
      .join('');
    searchDropdown.classList.add('is-open');
  }

  // Debounced input
  searchInput.addEventListener('input', e => {
    clearTimeout(timer);
    timer = setTimeout(() => performSearch(e.target.value), 250);
  });

  // Submit → erstes Ergebnis navigieren
  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    const first = searchDropdown.querySelector('.search-result[href]');
    if (first) {
      window.location.href = first.getAttribute('href');
    } else {
      await performSearch(query);
    }
  });

  // Schließen außerhalb
  document.addEventListener('click', e => {
    if (!searchForm.contains(e.target)) searchDropdown.classList.remove('is-open');
  });

  // Tastaturnavigation ↑ ↓ Enter Esc
  searchInput.addEventListener('keydown', e => {
    const items = [...searchDropdown.querySelectorAll('.search-result[href]')];
    const active = searchDropdown.querySelector('.search-result.is-focused');
    let idx = items.indexOf(active);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active?.classList.remove('is-focused');
      items[Math.min(idx + 1, items.length - 1)]?.classList.add('is-focused');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active?.classList.remove('is-focused');
      items[Math.max(idx - 1, 0)]?.classList.add('is-focused');
    } else if (e.key === 'Enter' && active) {
      e.preventDefault();
      window.location.href = active.getAttribute('href');
    } else if (e.key === 'Escape') {
      searchDropdown.classList.remove('is-open');
    }
  });

  console.log('✅ Search initialized (pages + blog)');
}