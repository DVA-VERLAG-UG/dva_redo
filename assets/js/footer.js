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

  // Footer-Buttons verbinden — mit Retry falls contact-popup.js
  // das Overlay noch nicht ins DOM injiziert hat
  connectFooterButtons();

  console.log('✅ Footer initialized');
}

function connectFooterButtons() {
  const buttonIds = ['footerConfigBtn', 'footerContactBtn', 'footerConfiguratorBtn'];

  function tryConnect(attempts = 0) {
    const overlay = document.getElementById('contact-overlay');

    if (!overlay) {
      // contact-popup.js noch nicht fertig — nochmal in 100ms versuchen
      if (attempts < 20) {
        setTimeout(() => tryConnect(attempts + 1), 100);
      } else {
        console.warn('⚠️ contact-overlay nicht gefunden nach 2s');
      }
      return;
    }

    const buttons = buttonIds.map(id => document.getElementById(id)).filter(Boolean);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // contact-popup.js public API nutzen falls verfügbar
        if (window.ContactPopup) {
          window.ContactPopup.open();
        } else {
          overlay.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    console.log(`✅ ${buttons.length} Footer-Button(s) mit Contact-Popup verbunden`);
  }

  tryConnect();
}