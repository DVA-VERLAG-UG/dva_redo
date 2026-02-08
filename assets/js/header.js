// header.js - Header behavior and interactions (UPDATED: GitHub Pages base-path + logo fix)

// --- Detect base path (GitHub Pages project site vs local) ---
const isGitHubPages = window.location.hostname.includes('github.io');

// If your repo name is NOT "dva_redo", change it here:
const REPO_NAME = 'dva_redo';

const BASE = isGitHubPages ? `/${REPO_NAME}` : '';

// --- Language routes for all pages (now base-path aware) ---
const ROUTES = {
  de: {
    home: `${BASE}/de/`,
    about: `${BASE}/de/ueber-uns.html`,
    contact: `${BASE}/de/kontakt.html`,
    projects: `${BASE}/de/projekte.html`,
    packages: `${BASE}/de/pakete.html`,
    config: `${BASE}/de/konfigurator-page.html`
  },
  en: {
    home: `${BASE}/en/`,
    about: `${BASE}/en/about.html`,
    contact: `${BASE}/en/contact.html`,
    projects: `${BASE}/en/projects.html`,
    packages: `${BASE}/en/packages.html`,
    config: `${BASE}/en/configurator-page.html`
  },
  tr: {
    home: `${BASE}/tr/`,
    about: `${BASE}/tr/hakkimizda.html`,
    contact: `${BASE}/tr/iletisim.html`,
    projects: `${BASE}/tr/projeler.html`,
    packages: `${BASE}/tr/paketler.html`,
    config: `${BASE}/tr/yapilandirma.html`
  },
  fr: {
    home: `${BASE}/fr/`,
    about: `${BASE}/fr/a-propos.html`,
    contact: `${BASE}/fr/contact.html`,
    projects: `${BASE}/fr/projets.html`,
    packages: `${BASE}/fr/forfaits.html`,
    config: `${BASE}/fr/configuration.html`
  }
};

// Normalize path (strip /<repo> prefix on GitHub Pages)
function getNormalizedPathname() {
  const path = window.location.pathname || '/';
  if (BASE && path.startsWith(BASE + '/')) return path.slice(BASE.length);
  if (BASE && path === BASE) return '/';
  return path;
}

// Detect current language from URL (base-path aware)
function getCurrentLanguage() {
  const path = getNormalizedPathname();
  if (path.startsWith('/de/')) return 'de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/tr/')) return 'tr';
  if (path.startsWith('/fr/')) return 'fr';
  return 'de';
}

// Get current page key (base-path aware)
function getCurrentPageKey() {
  const normalized = getNormalizedPathname();
  const lang = getCurrentLanguage();
  const routes = ROUTES[lang];

  // Compare against normalized routes (strip BASE from route before matching)
  for (const [key, route] of Object.entries(routes)) {
    const normalizedRoute = BASE ? route.replace(BASE, '') : route;
    if (normalized === normalizedRoute || normalized.startsWith(normalizedRoute)) {
      return key;
    }
  }
  return 'home';
}

// --- FIX: Ensure floating logo src + link are correct on GitHub Pages ---
function fixFloatingLogo() {
  const brandLink = document.querySelector('.floating-brand');
  const brandImg = document.querySelector('.floating-brand-logo');

  // If you have the floating logo on the page, make it base-path safe
  if (brandLink) {
    // Keep any existing hash/query intact if needed
    brandLink.setAttribute('href', ROUTES[getCurrentLanguage()].home);
  }

  if (brandImg) {
    // Force the correct logo path regardless of what HTML had
    brandImg.src = `${BASE}/assets/images/branding/dva-logo.png`;

    // Helpful: fallback if missing
    brandImg.onerror = () => {
      // Hide broken icon if the path is still wrong
      brandImg.style.display = 'none';
      if (brandLink) {
        // Optional text fallback
        const fallback = document.createElement('span');
        fallback.className = 'floating-brand-name';
        fallback.textContent = 'DVAYD Publishing';
        // Ensure not duplicated
        if (!brandLink.querySelector('.floating-brand-name')) {
          brandLink.appendChild(fallback);
        }
      }
      console.error('❌ Floating logo not found:', `${BASE}/assets/images/branding/dva-logo.png`);
    };
  }
}

// Initialize header
export function initHeader() {
  // Always fix the floating logo first (independent of header injection)
  fixFloatingLogo();

  const header = document.getElementById('site-header');
  if (!header) return;

  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerClose = document.getElementById('drawerClose');

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
      link.href = ROUTES[targetLang]?.home || `${BASE}/`;
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

  // Debounced search on input
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  // Search on form submit
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      searchDropdown.classList.remove('is-open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchDropdown.classList.remove('is-open');
    }
  });

  console.log('✅ Search initialized');
}
