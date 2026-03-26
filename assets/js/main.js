// main.js - Main entry point that orchestrates everything

import { initTheme, getStoredTheme, applyTheme } from './theme.js';
import { initHeader } from './header.js';
import { initSocialBar } from './social-bar.js';
import { initFooter } from './footer.js';
import { initBackground } from './background.js';
import { initCurtain } from './curtain.js';
import { initCarousel } from './carousel.js';
import { initKonfiguratorCTA } from './konfigurator-cta.js';
import { initHorizontalScroll } from './horizontal-scroll-section.js';
import { initProcessSteps } from './process-steps.js';
import { initLogoCarousel } from './logo-carousel.js';
import { initReviews } from './reviews-section.js';
import { initBridge } from './bridge-section.js';
import { initNews } from './news-section.js';

const isGitHubPages = window.location.hostname.includes('github.io');
const BASE_PATH = isGitHubPages ? '/dva_redo' : '';

console.log('🌍 Environment Detection:');
console.log('  - Hostname:', window.location.hostname);
console.log('  - Is GitHub Pages:', isGitHubPages);
console.log('  - BASE_PATH:', BASE_PATH || '(empty - local)');
console.log('  - Full URL:', window.location.href);

function safeInit(name, fn) {
  try {
    fn();
    console.log(`✅ ${name} initialized`);
  } catch (err) {
    console.error(`❌ ${name} failed:`, err);
  }
}

// ── Nav data ──────────────────────────────────────────────
// disabled: true  → ausgegraut, nicht klickbar, zeigt "(bald)" Label
const NAV = {
  de: [
    { href: '/de/',                       label: 'Startseite'                    },
    { href: '/de/ueber-uns.html',         label: 'Über uns'                      },
    { href: '/de/projekte.html',          label: 'Projekte',   disabled: true    },
    { href: '/de/konfigurator-page.html', label: 'Konfigurator'                  },
    { href: '/de/kontakt.html',           label: 'Kontakt'                       },
    { href: '/de/blog-index.html',        label: 'Blog'                          },
  ],
  en: [
    { href: '/en/',                       label: 'Home'                          },
    { href: '/en/about.html',             label: 'About Us'                      },
    { href: '/en/projects.html',          label: 'Projects',   disabled: true    },
    { href: '/en/configurator-page.html', label: 'Configurator'                  },
    { href: '/en/contact.html',           label: 'Contact'                       },
    { href: '/en/blog-index.html',        label: 'Blog'                          },
  ],
  tr: [
    { href: '/tr/',                       label: 'Ana Sayfa'                     },
    { href: '/tr/hakkimizda.html',        label: 'Hakkımızda'                    },
    { href: '/tr/projeler.html',          label: 'Projeler',   disabled: true    },
    { href: '/tr/yapilandirma.html',      label: 'Konfiguratör'                  },
    { href: '/tr/iletisim.html',          label: 'İletişim'                      },
    { href: '/tr/blog-index.html',        label: 'Blog'                          },
  ],
  fr: [
    { href: '/fr/',                       label: 'Accueil'                       },
    { href: '/fr/a-propos.html',          label: 'À propos'                      },
    { href: '/fr/projets.html',           label: 'Projets',    disabled: true    },
    { href: '/fr/configuration.html',     label: 'Configurateur'                 },
    { href: '/fr/contact.html',           label: 'Contact'                       },
    { href: '/fr/blog-index.html',        label: 'Blog'                          },
  ]
};

// "Coming soon" label per language
const COMING_SOON = { de: 'bald', en: 'soon', tr: 'yakında', fr: 'bientôt' };

const DRAWER_TITLES      = { de: 'Menü', en: 'Menu', tr: 'Menü', fr: 'Menu' };
const SEARCH_PLACEHOLDER = { de: 'Suchbegriff eingeben', en: 'Search…', tr: 'Ara…', fr: 'Rechercher…' };

function getHeaderLang() {
  const p = window.location.pathname;
  if (p.startsWith('/en/')) return 'en';
  if (p.startsWith('/tr/')) return 'tr';
  if (p.startsWith('/fr/')) return 'fr';
  return 'de';
}

function initHeaderContent() {
  const lang        = getHeaderLang();
  const currentPath = window.location.pathname;
  const soon        = COMING_SOON[lang] || 'soon';

  const drawerNav   = document.getElementById('drawerNav');
  const drawerTitle = document.getElementById('drawerTitle');
  const searchInput = document.getElementById('headerSearchInput');

  if (drawerTitle) drawerTitle.textContent = DRAWER_TITLES[lang] || 'Menu';

  if (drawerNav) {
    drawerNav.innerHTML = (NAV[lang] || NAV.de).map(item => {
      if (item.disabled) {
        // Ausgegraut, nicht klickbar, mit "bald/soon/yakında" Badge
        return `<span class="drawer-link drawer-link--disabled">
          ${item.label}
          <span class="drawer-link-soon">${soon}</span>
        </span>`;
      }
      const isActive = currentPath === item.href ||
        (currentPath.startsWith(item.href) && item.href !== '/' + lang + '/');
      return `<a href="${item.href}" class="drawer-link${isActive ? ' is-active' : ''}">${item.label}</a>`;
    }).join('');
  }

  if (searchInput) {
    searchInput.placeholder = SEARCH_PLACEHOLDER[lang] || 'Search…';
    searchInput.setAttribute('aria-label', SEARCH_PLACEHOLDER[lang] || 'Search');
  }

  document.querySelectorAll('[data-lang]').forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('data-lang') === lang);
  });
}

async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) {
    console.error('❌ Header placeholder not found!');
    return;
  }
  try {
    const response = await fetch(`${BASE_PATH}/components/header.html`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load header (${response.status})`);
    const html = await response.text();
    placeholder.innerHTML = html;
    initHeaderContent();
    safeInit('Header', initHeader);
  } catch (error) {
    console.error('❌ Error loading header:', error);
  }
}

async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;
  try {
    const response = await fetch(`${BASE_PATH}/components/footer.html`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load footer (${response.status})`);
    const html = await response.text();
    placeholder.innerHTML = html;
    safeInit('Footer', initFooter);
  } catch (error) {
    console.error('❌ Error loading footer:', error);
  }
}

async function init() {
  console.log('🚀 Starting initialization...');

  if (!document.body.classList.contains('no-curtain')) {
    safeInit('Curtain', initCurtain);
  }

  try {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
  } catch (e) {
    console.error('❌ Theme apply failed:', e);
  }

  await Promise.allSettled([loadHeader(), loadFooter()]);

  safeInit('Theme Toggle', initTheme);
  safeInit('Social Bar', initSocialBar);
  safeInit('Background', initBackground);
  safeInit('Carousel', initCarousel);
  safeInit('Konfigurator CTA', initKonfiguratorCTA);
  safeInit('Horizontal Scroll', initHorizontalScroll);
  safeInit('Process Steps', initProcessSteps);
  safeInit('Logo Carousel', initLogoCarousel);
  safeInit('Bridge', initBridge);
  safeInit('Reviews', initReviews);
  safeInit('News', initNews);

  document.documentElement.classList.add('page-loaded');
  console.log('✅ All initialization complete!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}