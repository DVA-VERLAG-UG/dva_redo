// footer.js - Footer functionality

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

  // Setup Let's Talk button to open contact popup
  setupFooterContact();
}

function setupFooterContact() {
  const footerContactBtn = document.getElementById('footerContactBtn');
  const contactOverlay = document.getElementById('contactOverlay');
  
  if (!footerContactBtn || !contactOverlay) {
    console.warn('Footer contact button or overlay not found');
    return;
  }
  
  footerContactBtn.addEventListener('click', () => {
    contactOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
  
  console.log('✅ Footer contact button initialized');
}