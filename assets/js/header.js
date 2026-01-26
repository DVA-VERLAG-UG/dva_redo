// header.js - Header behavior and interactions

// ---- Base path helper (GitHub Pages project: /dva_redo) ----
const BASE_PATH = window.BASE_PATH || '';
const withBase = window.withBase || ((p = '') => {
  if (!p) return BASE_PATH || '/';
  return `${BASE_PATH}${p.startsWith('/') ? p : '/' + p}`;
});

// ---- Language routes for all pages (ALWAYS use withBase) ----
const ROUTES = {
  de: {
    home: withBase("/de/"),
    about: withBase("/de/ueber-uns.html"),
    contact: withBase("/de/kontakt.html"),
    projects: withBase("/de/projekte.html"),
    packages: withBase("/de/pakete.html"),
    config: withBase("/de/konfigurator-page.html")
  },
  en: {
    home: withBase("/en/"),
    about: withBase("/en/about.html"),
    contact: withBase("/en/contact.html"),
    projects: withBase("/en/projects.html"),
    packages: withBase("/en/packages.html"),
    config: withBase("/en/configurator-page.html")
  },
  tr: {
    home: withBase("/tr/"),
    about: withBase("/tr/hakkimizda.html"),
    contact: withBase("/tr/iletisim.html"),
    projects: withBase("/tr/projeler.html"),
    packages: withBase("/tr/paketler.html"),
    config: withBase("/tr/yapilandirma.html")
  },
  fr: {
    home: withBase("/fr/"),
    about: withBase("/fr/a-propos.html"),
    contact: withBase("/fr/contact.html"),
    projects: withBase("/fr/projets.html"),
    packages: withBase("/fr/forfaits.html"),
    config: withBase("/fr/configuration.html")
  }
};

// Detect current language from URL (works with /dva_redo/de/... too)
function getCurrentLanguage() {
  // Normalize: remove BASE_PATH prefix if present
  const rawPath = window.location.pathname || '/';
  const path = BASE_PATH && rawPath.startsWith(BASE_PATH)
    ? rawPath.slice(BASE_PATH.length) || '/'
    : rawPath;

  if (path.startsWith('/de/')) return 'de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/tr/')) return 'tr';
  if (path.startsWith('/fr/')) return 'fr';
  return 'de';
}

// Get current page key
function getCurrentPageKey() {
  // Normalize: remove BASE_PATH prefix if present
  const rawPath = window.location.pathname || '/';
  const path = BASE_PATH && rawPath.startsWith(BASE_PATH)
    ? rawPath.slice(BASE_PATH.length) || '/'
    : rawPath;

  const lang = getCurrentLanguage();
  const routes = ROUTES[lang];

  // Compare against ROUTES paths WITHOUT base, so strip base from route too
  const stripBase = (url) =>
    (BASE_PATH && url.startsWith(BASE_PATH)) ? url.slice(BASE_PATH.length) : url;

  for (const [key, route] of Object.entries(routes)) {
    const r = stripBase(route);
    if (path === r || (r !== '/' && path.startsWith(r))) {
      return key;
    }
  }

  return 'home';
}

// Initialize header
export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerClose = document.getElementById('drawerClose');

  // ✅ set logo link/src if your header.html has these IDs
  const brandHomeLink = document.getElementById('brandHomeLink');
  const brandLogo = document.getElementById('brandLogo');

  const lang = getCurrentLanguage();
  if (brandHomeLink) brandHomeLink.href = ROUTES[lang].home;
  if (brandLogo) brandLogo.src = withBase("/assets/images/branding/dva-logo.png");

  // ✅ set drawer links if you use data-route="home|about|projects|config|contact|packages"
  document.querySelectorAll('.drawer-link[data-route]').forEach(a => {
    const key = a.getAttribute('data-route');
    a.href = ROUTES[lang][key] || ROUTES[lang].home;
  });

  // Scroll behavior
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeaderOnScroll() {
    const currentScrollY = window.scrollY;

    // Add blur effect when scrolled past 10px
    if (currentScrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderOnScroll);
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
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
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  menuOverlay?.addEventListener('click', closeMenu);
  drawerClose?.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuDrawer?.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Language switcher
  setupLanguageSwitcher();

  // Search functionality
  setupSearch();
}

// Setup language links
function setupLanguageSwitcher() {
  const currentLang = getCurrentLanguage();
  const currentPageKey = getCurrentPageKey();

  document.querySelectorAll('[data-lang]').forEach(link => {
    const targetLang = link.getAttribute('data-lang');

    if (ROUTES[targetLang] && ROUTES[targetLang][currentPageKey]) {
      link.href = ROUTES[targetLang][currentPageKey];
    } else {
      link.href = ROUTES[targetLang]?.home || withBase('/');
    }

    if (targetLang === currentLang) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

// Simple search functionality
function setupSearch() {
  console.log('🔍 Setting up search...');

  const searchInput = document.getElementById('headerSearchInput');
  const searchForm = document.querySelector('.search-form');
  const searchDropdown = document.getElementById('searchDropdown');

  if (!searchInput || !searchForm || !searchDropdown) {
    console.error('❌ Search elements not found:', {
      searchInput: !!searchInput,
      searchForm: !!searchForm,
      searchDropdown: !!searchDropdown
    });
    return;
  }

  console.log('✅ Search elements found');

  let searchTimeout;

  function performSearch(query) {
    query = query.trim();

    console.log('🔎 Searching for:', query);

    if (!query) {
      searchDropdown.classList.remove('is-open');
      searchDropdown.innerHTML = '';
      return;
    }

    searchDropdown.innerHTML = `
      <div class="search-result">
        <div class="search-result-title">Suche nach "${query}"</div>
        <div class="search-result-excerpt">Suchfunktion wird implementiert...</div>
      </div>
    `;

    searchDropdown.classList.add('is-open');
    console.log('✅ Search dropdown opened');
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      searchDropdown.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchDropdown.classList.remove('is-open');
    }
  });

  console.log('✅ Search initialized');
}
