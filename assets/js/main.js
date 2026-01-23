// main.js - Main entry point that orchestrates everything

import { initTheme } from './theme.js';
import { initHeader } from './header.js';
import { initSocialBar } from './social-bar.js';
import { initFooter } from './footer.js';

// Load header component
async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  
  try {
    const response = await fetch('/components/header.html');
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
    const response = await fetch('/components/footer.html');
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
  // Apply theme immediately to prevent flash
  initTheme();
  
  // Load components in parallel
  await Promise.all([
    loadHeader(),
    loadFooter()
  ]);
  
  // Initialize social bar
  initSocialBar();
  
  // Mark page as ready
  document.documentElement.classList.add('page-loaded');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}