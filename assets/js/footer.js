// footer.js - Footer functionality
// Royal Bronze Theme - Opens Contact Popup

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

  // Setup footer buttons to open contact popup
  setupFooterContact();
}

function setupFooterContact() {
  // Find all buttons that should open the contact popup
  const contactButtons = [
    document.getElementById('footerConfigBtn'),      // "Lass uns sprechen" Button
    document.getElementById('footerContactBtn'),     // Falls noch vorhanden
    document.getElementById('footerConfiguratorBtn'), // "Konfigurator" Button
    ...document.querySelectorAll('[data-open-contact]'),
    ...document.querySelectorAll('.footer-contact-btn')
  ].filter(Boolean);
  
  const contactOverlay = document.getElementById('contactOverlay');
  
  if (!contactOverlay) {
    console.warn('⚠️ Contact overlay not found - make sure #contactOverlay exists in HTML');
    return;
  }
  
  if (contactButtons.length === 0) {
    console.warn('⚠️ No contact buttons found in footer');
    return;
  }
  
  // Add click event to all buttons
  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      console.log('✅ Contact popup opened');
    });
  });
  
  // Setup close button
  const closeBtn = contactOverlay.querySelector('.contact-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed');
    });
  }
  
  // Close on overlay click (outside popup)
  contactOverlay.addEventListener('click', (e) => {
    if (e.target === contactOverlay) {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed (overlay click)');
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactOverlay.classList.contains('is-open')) {
      contactOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      console.log('✅ Contact popup closed (ESC key)');
    }
  });
  
  console.log(`✅ ${contactButtons.length} contact button(s) initialized`);
}