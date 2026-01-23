// header.js - Header behavior and interactions

// Language routes for all pages
const ROUTES = {
  de: {
    home: "/de/",
    about: "/de/ueber-uns.html",
    contact: "/de/kontakt.html",
    projects: "/de/projekte.html",
    packages: "/de/pakete.html",
    config: "/de/konfig.html"
  },
  en: {
    home: "/en/",
    about: "/en/about.html",
    contact: "/en/contact.html",
    projects: "/en/projects.html",
    packages: "/en/packages.html",
    config: "/en/config.html"
  },
  tr: {
    home: "/tr/",
    about: "/tr/hakkimizda.html",
    contact: "/tr/iletisim.html",
    projects: "/tr/projeler.html",
    packages: "/tr/paketler.html",
    config: "/tr/yapilandirma.html"
  },
  fr: {
    home: "/fr/",
    about: "/fr/a-propos.html",
    contact: "/fr/contact.html",
    projects: "/fr/projets.html",
    packages: "/fr/forfaits.html",
    config: "/fr/configuration.html"
  }
};

// Detect current language from URL
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/de/')) return 'de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/tr/')) return 'tr';
  if (path.startsWith('/fr/')) return 'fr';
  return 'de'; // default
}

// Get current page key
function getCurrentPageKey() {
  const path = window.location.pathname;
  const lang = getCurrentLanguage();
  const routes = ROUTES[lang];
  
  for (const [key, route] of Object.entries(routes)) {
    if (path === route || path.startsWith(route)) {
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
        // Scrolling down
        header.classList.add('is-hidden');
      } else {
        // Scrolling up
        header.classList.remove('is-hidden');
      }
    } else {
      // Always show near top
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
    header.classList.remove('is-hidden'); // Always show header when menu is open
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
    
    // Set the correct URL for this language
    if (ROUTES[targetLang] && ROUTES[targetLang][currentPageKey]) {
      link.href = ROUTES[targetLang][currentPageKey];
    } else {
      link.href = ROUTES[targetLang]?.home || '/';
    }
    
    // Mark active language
    if (targetLang === currentLang) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

// Simple search functionality
function setupSearch() {
  const searchInput = document.getElementById('headerSearchInput');
  const searchForm = document.querySelector('.search-form');
  const searchDropdown = document.getElementById('searchDropdown');
  
  if (!searchInput || !searchForm || !searchDropdown) return;
  
  let searchTimeout;
  
  function performSearch(query) {
    query = query.trim();
    
    if (!query) {
      searchDropdown.classList.remove('is-open');
      searchDropdown.innerHTML = '';
      return;
    }
    
    // TODO: Implement actual search logic
    // For now, show a placeholder message
    searchDropdown.innerHTML = `
      <div class="search-result">
        <div class="search-result-title">Suche nach "${query}"</div>
        <div class="search-result-excerpt">Suchfunktion wird implementiert...</div>
      </div>
    `;
    
    searchDropdown.classList.add('is-open');
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
}