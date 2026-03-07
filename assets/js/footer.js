// footer.js - Footer functionality
export function initFooter() {
  // Jahr dynamisch setzen
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML = `
      © ${year} DVAYD ·
      <a href="/de/datenschutz.html">Privacy Policy</a> ·
      <a href="/de/impressum.html">Impressum</a>
    `;
  }

  bindFooterButtons();
  console.log('✅ Footer initialized');
}

function bindFooterButtons() {
  const ids = ['footerConfigBtn', 'footerContactBtn', 'footerConfiguratorBtn'];

  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (window.ContactPopup) {
        // contact-popup.js wurde dynamisch geladen (andere Seiten)
        window.ContactPopup.open();
      } else if (window.openContact) {
        // index.html hat eigene globale openContact()
        window.openContact();
      } else {
        // Letzter Fallback: Overlay direkt ansprechen
        const overlay = document.getElementById('contactOverlay') ||
                        document.getElementById('contact-overlay');
        if (overlay) {
          overlay.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  console.log('✅ Footer-Buttons verbunden');
}