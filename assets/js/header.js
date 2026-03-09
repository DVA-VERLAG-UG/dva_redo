// header.js - Header behavior, language switcher, search

const ROUTES = {
  de: {
    home:     "/de/",
    about:    "/de/ueber-uns.html",
    contact:  "/de/kontakt.html",
    projects: "/de/projekte.html",
    packages: "/de/pakete.html",
    config:   "/de/konfigurator-page.html"
  },
  en: {
    home:     "/en/",
    about:    "/en/about.html",
    contact:  "/en/contact.html",
    projects: "/en/projects.html",
    packages: "/en/packages.html",
    config:   "/en/configurator-page.html"
  },
  tr: {
    home:     "/tr/",
    about:    "/tr/hakkimizda.html",
    contact:  "/tr/iletisim.html",
    projects: "/tr/projeler.html",
    packages: "/tr/paketler.html",
    config:   "/tr/yapilandirma.html"
  },
  fr: {
    home:     "/fr/",
    about:    "/fr/a-propos.html",
    contact:  "/fr/contact.html",
    projects: "/fr/projets.html",
    packages: "/fr/forfaits.html",
    config:   "/fr/configuration.html"
  }
};

function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/de/')) return 'de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/tr/')) return 'tr';
  if (path.startsWith('/fr/')) return 'fr';
  return 'de';
}

function getCurrentPageKey() {
  const path = window.location.pathname;
  const lang = getCurrentLanguage();
  const routes = ROUTES[lang];
  for (const [key, route] of Object.entries(routes)) {
    if (path === route || path.startsWith(route)) return key;
  }
  return 'home';
}

// ── INIT ──────────────────────────────────────────────────
export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  setupScroll(header);
  setupMobileMenu(header);
  setupLanguageSwitcher();
  setupSearch();
}

// ── SCROLL BEHAVIOR ───────────────────────────────────────
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
    lastY = y;
    ticking = false;
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

  menuToggle?.addEventListener('click', () => {
    menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  menuOverlay?.addEventListener('click', closeMenu);
  drawerClose?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuDrawer?.classList.contains('is-open')) closeMenu();
  });
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────
function setupLanguageSwitcher() {
  const currentLang    = getCurrentLanguage();
  const currentPageKey = getCurrentPageKey();

  document.querySelectorAll('[data-lang]').forEach(link => {
    const targetLang = link.getAttribute('data-lang');
    link.href = ROUTES[targetLang]?.[currentPageKey] || ROUTES[targetLang]?.home || '/';
    link.classList.toggle('is-active', targetLang === currentLang);
  });
}

// ── SEARCH ────────────────────────────────────────────────
// Suchindex wird einmalig geladen und gecacht
let searchIndex = null;

async function loadSearchIndex() {
  if (searchIndex) return searchIndex;
  try {
    // Pfad relativ zur Domain-Root
    const res = await fetch('/assets/data/search-index.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Index not found');
    searchIndex = await res.json();
    return searchIndex;
  } catch (e) {
    console.warn('Search index not available:', e.message);
    return [];
  }
}

function scoreEntry(entry, words) {
  let score = 0;
  const titleLow = entry.title.toLowerCase();
  const descLow  = (entry.description || '').toLowerCase();
  const kwLow    = (entry.keywords || []).join(' ').toLowerCase();
  const sectLow  = (entry.sections || []).map(s => s.text + ' ' + s.label).join(' ').toLowerCase();

  words.forEach(w => {
    if (titleLow.includes(w))  score += 10;
    if (kwLow.includes(w))     score += 6;
    if (sectLow.includes(w))   score += 4;
    if (descLow.includes(w))   score += 2;
  });
  return score;
}

function buildResultUrl(entry, query) {
  // Hängt ?q=... an die URL damit search-highlight.js es aufnehmen kann
  const url = new URL(entry.url, window.location.origin);
  url.searchParams.set('q', query);

  // Falls ein passender Abschnitt gefunden wurde, Seiten-Anker setzen
  if (entry._matchSection) {
    url.hash = entry._matchSection;
  }
  return url.toString();
}

function highlightTitle(title, words) {
  const regex = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return title.replace(regex, '<em style="color:#B08D57;font-style:normal;font-weight:700;">$1</em>');
}

function setupSearch() {
  const searchInput    = document.getElementById('headerSearchInput');
  const searchForm     = document.querySelector('.search-form');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchForm || !searchDropdown) return;

  // Suchindex sofort laden (silent)
  loadSearchIndex();

  let timer;

  async function performSearch(rawQuery) {
    const query = rawQuery.trim();
    if (!query) {
      searchDropdown.classList.remove('is-open');
      searchDropdown.innerHTML = '';
      return;
    }

    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const index = await loadSearchIndex();

    // Jede Seite bewerten
    const results = index
      .map(entry => {
        // Passenden Abschnitt finden
        let matchSection = null;
        if (entry.sections) {
          for (const sec of entry.sections) {
            const hay = (sec.text + ' ' + sec.label).toLowerCase();
            if (words.some(w => hay.includes(w))) {
              matchSection = sec.id;
              break;
            }
          }
        }
        return { ...entry, _matchSection: matchSection, _score: scoreEntry(entry, words) };
      })
      .filter(e => e._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 6); // Max 6 Ergebnisse

    if (!results.length) {
      searchDropdown.innerHTML = `
        <div class="search-result search-no-result">
          <div class="search-result-title">Keine Ergebnisse für „${query}"</div>
          <div class="search-result-excerpt">Versuch einen anderen Suchbegriff.</div>
        </div>`;
      searchDropdown.classList.add('is-open');
      return;
    }

    searchDropdown.innerHTML = results.map(entry => {
      const url     = buildResultUrl(entry, query);
      const title   = highlightTitle(entry.title, words);
      const excerpt = entry._matchSection
        ? entry.sections.find(s => s.id === entry._matchSection)?.label
          ? `→ Abschnitt: ${entry.sections.find(s => s.id === entry._matchSection).label}`
          : entry.description
        : entry.description;

      return `
        <a class="search-result" href="${url}">
          <div class="search-result-title">${title}</div>
          <div class="search-result-excerpt">${excerpt || ''}</div>
        </a>`;
    }).join('');

    searchDropdown.classList.add('is-open');
  }

  // Debounced Input
  searchInput.addEventListener('input', e => {
    clearTimeout(timer);
    timer = setTimeout(() => performSearch(e.target.value), 250);
  });

  // Form Submit → erste Ergebnis-URL aufrufen
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

  // Schließen beim Klick außerhalb
  document.addEventListener('click', e => {
    if (!searchForm.contains(e.target)) searchDropdown.classList.remove('is-open');
  });

  // Tastaturnavigation (↑ ↓ Enter)
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

  console.log('✅ Search initialized');
}