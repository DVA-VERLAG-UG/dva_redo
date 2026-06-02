import { TEAM } from '../data/team.js';

const PLACEHOLDER_SVG = `
<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="30" r="18" fill="white"/>
  <ellipse cx="40" cy="72" rx="28" ry="18" fill="white"/>
</svg>`;

function buildOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'team-popup-overlay';
  overlay.id = 'teamPopupOverlay';
  overlay.innerHTML = `
    <div class="team-popup" id="teamPopup" role="dialog" aria-modal="true" aria-labelledby="teamPopupName">
      <div class="team-popup-photo" id="teamPopupPhoto">
        <div class="team-popup-photo-placeholder" id="teamPopupPlaceholder">${PLACEHOLDER_SVG}</div>
      </div>
      <div class="team-popup-content">
        <button class="team-popup-close" id="teamPopupClose" aria-label="Schließen">✕</button>
        <span class="team-popup-role"  id="teamPopupRole"></span>
        <h2  class="team-popup-name"   id="teamPopupName"></h2>
        <hr  class="team-popup-divider">
        <p   class="team-popup-bio"    id="teamPopupBio"></p>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

function openPopup(overlay, member) {
  const photo       = document.getElementById('teamPopupPhoto');
  const placeholder = document.getElementById('teamPopupPlaceholder');

  document.getElementById('teamPopupRole').textContent    = member.role;
  document.getElementById('teamPopupName').textContent    = member.name;
  document.getElementById('teamPopupBio').innerHTML       = member.bio;

  if (member.photo) {
    photo.style.backgroundImage = `url('${member.photo}')`;
    placeholder.style.display   = 'none';
  } else {
    photo.style.backgroundImage = '';
    placeholder.style.display   = 'flex';
  }

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('teamPopupClose').focus();
}

function closePopup(overlay) {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function initTeamPopup() {
  const grid = document.querySelector('.about-team-grid');
  if (!grid) return;

  // Build index by id for O(1) lookup
  const byId = Object.fromEntries(TEAM.map(m => [m.id, m]));

  // Wire up each card
  grid.querySelectorAll('.about-team-card-wrapper').forEach(wrapper => {
    const id = wrapper.dataset.teamId;
    if (!id || !byId[id]) return;

    const card = wrapper.querySelector('.about-team-card');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${byId[id].name} – mehr erfahren`);
  });

  const overlay = buildOverlay();

  // Click handler on the grid (event delegation)
  grid.addEventListener('click', e => {
    const wrapper = e.target.closest('.about-team-card-wrapper[data-team-id]');
    if (!wrapper) return;
    const member = byId[wrapper.dataset.teamId];
    if (member) openPopup(overlay, member);
  });

  // Keyboard: Enter / Space on focused card
  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const wrapper = e.target.closest('.about-team-card-wrapper[data-team-id]');
    if (!wrapper) return;
    e.preventDefault();
    const member = byId[wrapper.dataset.teamId];
    if (member) openPopup(overlay, member);
  });

  document.getElementById('teamPopupClose').addEventListener('click', () => closePopup(overlay));
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(overlay); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(overlay); });
}
