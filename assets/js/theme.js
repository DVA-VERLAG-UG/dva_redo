// theme.js - Theme toggle functionality - Royal Bronze Theme

const THEME_KEY = 'dvayd_theme';
const THEME_DARK = 'dim';
const THEME_ATTR = 'data-theme';

// Get stored theme preference
export function getStoredTheme() {
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
export function applyTheme(theme) {
  if (theme === THEME_DARK) {
    document.documentElement.setAttribute(THEME_ATTR, THEME_DARK);
    console.log('🌙 Dark mode activated - Deep Blue Library');
  } else {
    document.documentElement.removeAttribute(THEME_ATTR);
    console.log('☀️ Light mode activated - Warm Cream Paper');
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
  
  // Log theme change with colors
  const themeName = isDarkMode() 
    ? 'Dark Mode (Deep Blue #2C3E50 + Bronze #B08D57)' 
    : 'Light Mode (Cream #faf8f5 + Bronze #B08D57)';
  console.log(`🎨 Theme switched to: ${themeName}`);
  
  return isDarkMode();
}

// Initialize theme on page load
export function initTheme() {
  console.log('🎨 Initializing Royal Bronze Theme...');
  
  // Apply stored theme immediately (before page renders)
  const storedTheme = getStoredTheme();
  console.log('📦 Stored theme:', storedTheme || 'default (light)');
  applyTheme(storedTheme);
  
  // Setup theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) {
    console.error('❌ Theme toggle button NOT found! Check if header loaded.');
    return;
  }
  
  console.log('✅ Theme toggle button found');
  
  // Sync button state
  function syncButtonState() {
    const isDark = isDarkMode();
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    
    const themeInfo = isDark 
      ? 'Dark (Deep Blue + Bronze)' 
      : 'Light (Cream + Bronze)';
    console.log(`🌓 Theme synced: ${themeInfo}`);
  }
  
  syncButtonState();
  
  themeToggle.addEventListener('click', () => {
    console.log('🖱️ Theme button clicked!');
    toggleTheme();
    syncButtonState();
  });
  
  console.log('✅ Royal Bronze Theme initialized successfully');
  console.log('🎨 Color Palette:');
  console.log('   Light: Cream (#faf8f5) + Bronze (#B08D57)');
  console.log('   Dark: Deep Blue (#2C3E50) + Bronze (#B08D57)');
}

// Apply theme early (call this in <head> if possible to prevent flash)
export function applyThemeEarly() {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
}

/* ==========================================
   ROYAL BRONZE THEME COLORS
   ========================================== 
   
   🎨 LIGHT MODE:
   Background:      #faf8f5 → #f0ece5 (Warm Cream/Beige)
   Text:            #2C3E50 (Deep Blue)
   Accent:          #B08D57 (Bronze/Gold)
   
   🎨 DARK MODE:
   Background:      #2C3E50 → #1a2631 (Deep Blue)
   Text:            #f5f2ed (Cream)
   Accent:          #B08D57 (Bronze/Gold)
   
   🔤 TYPOGRAPHY:
   Body:            Georgia, Times New Roman
   Headings:        Playfair Display, Georgia
   
   ========================================== */