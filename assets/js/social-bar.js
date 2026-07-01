// social-bar.js - Floating social media bar

// Social media links configuration
const SOCIAL_LINKS = {
  instagram: {
    href: 'https://www.instagram.com/dvayd_verlag',
    label: 'Instagram',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>`,
  },
  tiktok: {
    href: 'https://www.tiktok.com/@dvayd.verlag',
    label: 'TikTok',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-1.05-1.11-1.65-2.55-1.65-4.07h-3.03v14.79c0 1.79-1.45 3.24-3.24 3.24-1.79 0-3.24-1.45-3.24-3.24 0-1.79 1.45-3.24 3.24-3.24.29 0 .58.04.85.11V10.3c-.28-.04-.56-.06-.85-.06-3.48 0-6.29 2.81-6.29 6.29 0 3.48 2.81 6.29 6.29 6.29 3.48 0 6.29-2.81 6.29-6.29V9.28a9.13 9.13 0 0 0 5.3 1.7V7.94a5.85 5.85 0 0 1-3.67-2.12z"/>
    </svg>`,
  },
  facebook: {
    href: 'https://www.facebook.com/profile.php?id=61581852607603',
    label: 'Facebook',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>`,
  },
  email: {
    href: 'mailto:info@dva-yd.com',
    label: 'Email',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>`,
  }
};

// Language routes
const ROUTES = {
  de: { home: '/de/', about: '/de/ueber-uns.html', contact: '/de/kontakt.html', projects: '/de/projekte.html', packages: '/de/pakete.html', config: '/de/konfigurator-page.html' },
  en: { home: '/en/', about: '/en/about.html',      contact: '/en/contact.html', projects: '/en/projects.html', packages: '/en/packages.html', config: '/en/configurator-page.html' },
  tr: { home: '/tr/', about: '/tr/hakkimizda.html', contact: '/tr/iletisim.html', projects: '/tr/projeler.html', packages: '/tr/paketler.html', config: '/tr/yapilandirma.html' },
  fr: { home: '/fr/', about: '/fr/a-propos.html',   contact: '/fr/contact.html', projects: '/fr/projets.html',  packages: '/fr/forfaits.html',  config: '/fr/configuration.html' },
};

function getCurrentLang() {
  const p = window.location.pathname;
  if (p.startsWith('/en/')) return 'en';
  if (p.startsWith('/tr/')) return 'tr';
  if (p.startsWith('/fr/')) return 'fr';
  return 'de';
}

function getCurrentPageKey() {
  const path = window.location.pathname;
  const lang = getCurrentLang();
  for (const [key, route] of Object.entries(ROUTES[lang])) {
    if (path === route || path.startsWith(route)) return key;
  }
  return 'home';
}

function getLangHref(targetLang) {
  const key = getCurrentPageKey();
  return ROUTES[targetLang]?.[key] || ROUTES[targetLang]?.home || '/';
}

// ── Build HTML ────────────────────────────────────────────
function createSocialBar() {
  const lang = getCurrentLang();

  const socialLinksHTML = Object.entries(SOCIAL_LINKS)
    .map(([, { href, label, icon }]) => {
      const isMailto = href.startsWith('mailto:');
      const linkAttrs = isMailto ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `
      <a href="${href}"${linkAttrs}
         class="social-link" aria-label="${label}" title="${label}">
        ${icon}
      </a>`;
    })
    .join('');

  const globeIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>`;

  const langOptionsHTML = ['de', 'en', 'tr', 'fr'].map(l => `
    <a href="${getLangHref(l)}"
       class="sb-lang-option${l === lang ? ' is-active' : ''}"
       role="menuitem">
      ${l.toUpperCase()}
    </a>`).join('');

  return `
    <div class="social-bar" id="socialBar">
      <div class="social-label">FOLLOW</div>
      ${socialLinksHTML}
      <div class="sb-lang-wrapper" id="sbLangWrapper">
        <button class="sb-lang-btn" id="sbLangBtn" aria-label="Select language" aria-expanded="false">
          ${globeIcon}
        </button>
        <div class="sb-lang-popup" id="sbLangPopup" role="menu">
          ${langOptionsHTML}
        </div>
      </div>
    </div>`;
}

// ── Init ──────────────────────────────────────────────────
export function initSocialBar() {
  if (document.getElementById('socialBar')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = createSocialBar();
  document.body.appendChild(wrapper.firstElementChild);

  setupLangButton();
  setupScrollBehavior();
}

// ── Lang button ───────────────────────────────────────────
function setupLangButton() {
  const btn   = document.getElementById('sbLangBtn');
  const popup = document.getElementById('sbLangPopup');
  if (!btn || !popup) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = popup.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', e => {
    if (!document.getElementById('sbLangWrapper')?.contains(e.target)) {
      popup.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Scroll behavior ───────────────────────────────────────
function setupScrollBehavior() {
  const bar = document.getElementById('socialBar');
  if (!bar) return;

  let lastY   = window.scrollY;
  let ticking = false;

  function update() {
    const y = window.scrollY;
    if (y < 10) {
      bar.classList.remove('is-hidden');
    } else if (y > lastY) {
      bar.classList.add('is-hidden');
    } else {
      bar.classList.remove('is-hidden');
    }
    lastY   = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}