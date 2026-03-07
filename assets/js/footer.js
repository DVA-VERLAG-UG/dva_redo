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

  // Hinweis: Footer-Buttons werden von contact-popup.js gebunden,
  // das via footer.html geladen wird. Kein separates Binding nötig.

  console.log('✅ Footer initialized');
}