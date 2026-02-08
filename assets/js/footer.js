// footer.js - Footer functionality
// Simple inline script style - matches index.html behavior

export function initFooter() {
  // Update year dynamically
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML = `
      © ${year} DVAYD ·
      <a href="/de/datenschutz.html">Privacy Policy</a> ·
      <a href="/de/impressum.html">Impressum</a>
    `;
  }

  // Setup footer contact buttons (simple approach)
  setupFooterContactButtons();
  
  console.log('✅ Footer initialized');
}

function setupFooterContactButtons() {
  const contactOverlay = document.getElementById('contactOverlay');
  const contactClose = document.querySelector('.contact-close');
  
  if (!contactOverlay) {
    console.warn('⚠️ Contact overlay not found');
    return;
  }
  
  // Find all footer buttons that should open contact
  const footerButtons = [
    document.getElementById('footerConfigBtn'),
    document.getElementById('footerContactBtn'),
    document.getElementById('footerConfiguratorBtn')
  ].filter(Boolean);
  
  if (footerButtons.length === 0) {
    console.warn('⚠️ No footer buttons found');
    return;
  }
  
  // Add click handlers to all footer buttons
  footerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      contactOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      console.log('✅ Contact popup opened from footer');
    });
  });
  
  // Close button
  if (contactClose) {
    contactClose.addEventListener('click', () => {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed');
    });
  }
  
  // Close on overlay click
  contactOverlay.addEventListener('click', (e) => {
    if (e.target === contactOverlay) {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed (overlay)');
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactOverlay.classList.contains('is-open')) {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed (ESC)');
    }
  });
  
  console.log(`✅ ${footerButtons.length} footer button(s) connected to contact popup`);
}