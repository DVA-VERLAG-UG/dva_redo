// theme.js - Theme toggle functionality

const THEME_KEY = 'dvayd_theme';
const THEME_DARK = 'dim';
const THEME_ATTR = 'data-theme';

// Get stored theme preference
function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || '';
  } catch {
    return '';
  }
}

// Save theme preference
function saveTheme(theme) {
  try {
    if (theme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  } catch {
    // Silently fail if localStorage is not available
  }
}

// Apply theme to document
function applyTheme(theme) {
  if (theme === THEME_DARK) {
    document.documentElement.setAttribute(THEME_ATTR, THEME_DARK);
  } else {
    document.documentElement.removeAttribute(THEME_ATTR);
  }
}

// Check if dark mode is currently active
function isDarkMode() {
  return document.documentElement.getAttribute(THEME_ATTR) === THEME_DARK;
}

// Toggle theme
function toggleTheme() {
  const newTheme = isDarkMode() ? '' : THEME_DARK;
  applyTheme(newTheme);
  saveTheme(newTheme);
  return isDarkMode();
}

// Initialize theme on page load
export function initTheme() {
  // Apply stored theme immediately (before page renders)
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  
  // Setup theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }
  
  // Sync button state
  function syncButtonState() {
    themeToggle.setAttribute('aria-pressed', isDarkMode() ? 'true' : 'false');
    console.log('Theme is now:', isDarkMode() ? 'dark' : 'light');
  }
  
  syncButtonState();
  
  themeToggle.addEventListener('click', () => {
    toggleTheme();
    syncButtonState();
  });
}

// Apply theme early (call this in <head> if possible to prevent flash)
export function applyThemeEarly() {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
}