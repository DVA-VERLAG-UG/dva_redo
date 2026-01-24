// main.js - Main entry point that orchestrates everything

import { initTheme, getStoredTheme, applyTheme } from './theme.js';
import { initHeader } from './header.js';
import { initSocialBar } from './social-bar.js';
import { initFooter } from './footer.js';
import { initBackground } from './background.js';

// Detect base path for GitHub Pages vs local
const BASE_PATH = window.location.hostname.includes('github.io') ? '/dva_redo' : '';

// Load header component
async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  
  try {
    const response = await fetch(`${BASE_PATH}/components/header.html`);
    if (!response.ok) throw new Error('Failed to load header');
    
    const html = await response.text();
    placeholder.innerHTML = html;
    
    // Initialize header functionality after loading
    initHeader();
  } catch (error) {
    console.error('Error loading header:', error);
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