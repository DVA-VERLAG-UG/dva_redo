// curtain.js - Curtain is rendered in HTML on first paint; this just handles cleanup.

export function initCurtain() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;

  setTimeout(() => {
    curtain.classList.add('hide');
    document.body.classList.remove('curtain-active');
    setTimeout(() => curtain.remove(), 600);
  }, 2600); // matches CSS: 2s word animations + 0.6s slide-up
}
