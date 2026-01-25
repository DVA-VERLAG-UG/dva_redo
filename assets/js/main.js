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

console.log('🌍 Environment Detection:');
console.log('  - Hostname:', window.location.hostname);
console.log('  - Is GitHub Pages:', isGitHubPages);
console.log('  - BASE_PATH:', BASE_PATH || '(empty - local)');
console.log('  - Full URL:', window.location.href);

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
    const response = await fetch(`${BASE_PATH}/components/header.html`);
    console.log('📡 Fetch response:', response.status, response.statusText);
    
    if (!response.ok) throw new Error('Failed to load header');
    
    const html = await response.text();
    console.log('✅ Header HTML loaded, length:', html.length);
    placeholder.innerHTML = html;
    
    // Initialize header functionality after loading
    initHeader();
  } catch (error) {
    console.error('❌ Error loading header:', error);
  }
}

// Load footer component
async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;
  
  try {
    const response = await fetch(`${BASE_PATH}/components/footer.html`);
    if (!response.ok) throw new Error('Failed to load footer');
    
    const html = await response.text();
    placeholder.innerHTML = html;
    
    // Initialize footer functionality after loading
    initFooter();
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

// Initialize everything
async function init() {
  console.log('🚀 Starting initialization...');
  
  // Show curtain first (only on first visit in session)
  initCurtain();
  
  // Apply stored theme immediately to prevent flash (but don't setup button yet)
  console.log('1️⃣ Applying stored theme...');
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  
  // Load components in parallel
  console.log('2️⃣ Loading components...');
  await Promise.all([
    loadHeader(),
    loadFooter()
  ]);
  
  // NOW initialize theme toggle button (after header is loaded)
  console.log('3️⃣ Setting up theme toggle...');
  initTheme();
  
  console.log('4️⃣ Initializing social bar...');
  // Initialize social bar
  initSocialBar();
  
  console.log('5️⃣ Initializing background particles...');
  // Initialize animated background
  initBackground();
  
  console.log('6️⃣ Initializing carousel...');
  // Initialize add-ons carousel
  initCarousel();
  
  console.log('7️⃣ Initializing konfigurator CTA...');
  // Initialize konfigurator CTA overlay
  initKonfiguratorCTA();
  
  console.log('8️⃣ Initializing horizontal scroll...');
  // Initialize horizontal scroll section
  initHorizontalScroll();
  
  console.log('9️⃣ Initializing process steps...');
  // Initialize process steps timeline
  initProcessSteps();
  
  console.log('🔟 Initializing logo carousel...');
  // Initialize logo carousel
  initLogoCarousel();
  
  console.log('1️⃣1️⃣ Initializing bridge...');
  // Initialize bridge section
  initBridge();
  
  console.log('1️⃣2️⃣ Initializing reviews...');
  // Initialize reviews section
  initReviews();
  
  console.log('1️⃣3️⃣ Initializing news...');
  // Initialize news section
  initNews();
  
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