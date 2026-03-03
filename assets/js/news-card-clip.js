// news-card-clip.js
// Schneidet die sticky Karten von oben ab sobald sie hinter den Header scrollen.
// Wird nach dem DOM-Load eingebunden: <script src="../assets/js/news-card-clip.js"></script>

export function initNewsCardClip() {
  const header = document.querySelector('.news-header');
  const cards  = document.querySelectorAll('.news-card');

  if (!header || !cards.length) return;

  function update() {
    const headerBottom = header.getBoundingClientRect().bottom;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();

      // Wie viele Pixel der Karte sind bereits hinter dem Header verschwunden?
      const overlap = headerBottom - cardRect.top;

      if (overlap <= 0) {
        // Karte vollständig sichtbar – kein Clip nötig
        card.style.clipPath = 'none';
      } else if (overlap >= cardRect.height) {
        // Karte vollständig hinter dem Header – unsichtbar
        card.style.clipPath = 'inset(100% 0 0 0)';
      } else {
        // Karte teilweise hinter dem Header – Clip von oben
        // inset(top right bottom left) – wir clippen von oben
        const pct = (overlap / cardRect.height) * 100;
        // Leichter border-radius Erhalt beim Clippen
        card.style.clipPath = `inset(${pct}% 0 0 0 round 16px)`;
      }
    });
  }

  // Scroll & Resize listener
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });

  // Einmal initial ausführen
  update();
}