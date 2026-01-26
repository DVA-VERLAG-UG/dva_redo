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

// Detect base path for GitHub Pages vs local
const isGitHubPages = window.location.hostname.includes('github.io');
const BASE_PATH = isGitHubPages ? '/dva_redo' : '';

// ✅ Make BASE_PATH available to other modules (header.js, etc.)
window.BASE_PATH = BASE_PATH;

// ✅ Optional helper: build URLs safely everywhere (assets, routes, fetches)
window.withBase = (p = '') => {
  if (!p) return BASE_PATH || '/';
  return `${BASE_PATH}${p.startsWith('/') ? p : '/' + p}`;
};

console.log('🌍 Environment Detection:');
console.log('  - Hostname:', window.location.hostname);
console.log('  - Is GitHub Pages:', isGitHubPages);
console.log('  - BASE_PATH:', BASE_PATH || '(empty - local)');
console.log('  - Full URL:', window.location.href);
console.log('  - withBase("/de/") =>', window.withBase('/de/'));
console.log('  - withBase("/assets/...") =>', window.withBase('/assets/images/branding/dva-logo.png'));

// ---- helper: never let one module crash the whole page
function safeInit(name, fn) {
  try {
    fn();
    console.log(`✅ ${name} initialized`);
  } catch (err) {
    console.error(`❌ ${name} failed:`, err);
  }
}

// Load header component
async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) {
    console.error('❌ Header placeholder not found!');
    return;
  }

  console.log('📍 Header placeholder found');
  console.log('🌐 BASE_PATH:', BASE_PATH);
  console.log('🔗 Fetching:', `${BASE_PATH}/components/header.html`);

  try {
    const response = await fetch(`${BASE_PATH}/components/header.html`, { cache: 'no-store' });
    console.log('📡 Fetch response:', response.status, response.statusText);

    if (!response.ok) throw new Error(`Failed to load header (${response.status})`);

    const html = await response.text();
    console.log('✅ Header HTML loaded, length:', html.length);
    placeholder.innerHTML = html;

    // Initialize header functionality after loading (safe)
    safeInit('Header', initHeader);
  } catch (error) {
    console.error('❌ Error loading header:', error);
  }
}

// Load footer component
async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch(`${BASE_PATH}/components/footer.html`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load footer (${response.status})`);

    const html = await response.text();
    placeholder.innerHTML = html;

    // Initialize footer functionality after loading (safe)
    safeInit('Footer', initFooter);
  } catch (error) {
    console.error('❌ Error loading footer:', error);
  }
}

// Initialize everything
async function init() {
  console.log('🚀 Starting initialization...');

  // Curtain first (safe)
  safeInit('Curtain', initCurtain);

  // Apply stored theme immediately to prevent flash (safe)
  console.log('1️⃣ Applying stored theme...');
  try {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
    console.log('✅ Theme applied:', storedTheme);
  } catch (e) {
    console.error('❌ Theme apply failed:', e);
  }

  // Load components in parallel but don't die if one fails
  console.log('2️⃣ Loading components...');
  await Promise.allSettled([loadHeader(), loadFooter()]);

  // Initialize modules (each is isolated)
  console.log('3️⃣ Setting up theme toggle...');
  safeInit('Theme Toggle', initTheme);

  console.log('4️⃣ Initializing social bar...');
  safeInit('Social Bar', initSocialBar);

  console.log('5️⃣ Initializing background particles...');
  safeInit('Background', initBackground);

  console.log('6️⃣ Initializing carousel...');
  safeInit('Carousel', initCarousel);

  console.log('7️⃣ Initializing konfigurator CTA...');
  safeInit('Konfigurator CTA', initKonfiguratorCTA);

  console.log('8️⃣ Initializing horizontal scroll...');
  safeInit('Horizontal Scroll', initHorizontalScroll);

  console.log('9️⃣ Initializing process steps...');
  safeInit('Process Steps', initProcessSteps);

  console.log('🔟 Initializing logo carousel...');
  safeInit('Logo Carousel', initLogoCarousel);

  console.log('1️⃣1️⃣ Initializing bridge...');
  safeInit('Bridge', initBridge);

  console.log('1️⃣2️⃣ Initializing reviews...');
  safeInit('Reviews', initReviews);

  console.log('1️⃣3️⃣ Initializing news...');
  safeInit('News', initNews);

  // Mark page as ready
  document.documentElement.classList.add('page-loaded');
  console.log('✅ All initialization complete!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
