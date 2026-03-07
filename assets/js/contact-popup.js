/* ==========================================
   CONTACT POPUP - Wiederverwendbar
   Einbinden auf jeder Seite die das Formular braucht
   ========================================== */

(function(){

  // ── HTML INS DOM INJIZIEREN ──────────────────────────────
  function injectHTML(){
    if(document.getElementById('contact-overlay')) return; // bereits vorhanden

    const html = `
      <!-- Netlify Form Detection (hidden) -->
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text"  name="name"/>
        <input type="email" name="email"/>
        <input type="tel"   name="telefon"/>
        <input type="text"  name="betreff"/>
        <textarea           name="nachricht"></textarea>
      </form>

      <!-- Popup Overlay -->
      <div class="contact-overlay" id="contact-overlay">
        <div class="contact-popup">
          <button class="contact-close" id="contact-close" aria-label="Schließen">✕</button>

          <div class="contact-header">
            <h2>Lass uns sprechen</h2>
            <p>Wir melden uns innerhalb von 24 Stunden bei dir.</p>
          </div>

          <form class="contact-form" id="contact-form" novalidate>
            <input type="hidden" name="form-name" value="contact"/>
            <!-- Honeypot -->
            <input type="text" name="bot-field" style="display:none"/>

            <div class="form-row">
              <div class="form-group">
                <label for="cf-name">Name *</label>
                <input type="text" id="cf-name" name="name" placeholder="Dein Name" required/>
              </div>
              <div class="form-group">
                <label for="cf-email">E-Mail *</label>
                <input type="email" id="cf-email" name="email" placeholder="deine@email.de" required/>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="cf-telefon">Telefon <span style="font-weight:400;font-size:0.8em;opacity:0.6;">(optional)</span></label>
                <input type="tel" id="cf-telefon" name="telefon" placeholder="+49 ..."/>
              </div>
              <div class="form-group">
                <label for="cf-betreff">Betreff <span style="font-weight:400;font-size:0.8em;opacity:0.6;">(optional)</span></label>
                <input type="text" id="cf-betreff" name="betreff" placeholder="Worum geht es?"/>
              </div>
            </div>

            <div class="form-group">
              <label for="cf-nachricht">Nachricht *</label>
              <textarea id="cf-nachricht" name="nachricht" placeholder="Erzähl uns von deinem Projekt..." required></textarea>
            </div>

            <button type="submit" class="form-submit" id="cf-submit">Nachricht senden →</button>

            <div class="form-message" id="cf-message" style="display:none;"></div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ── OPEN / CLOSE ─────────────────────────────────────────
  function openContact(){
    const overlay = document.getElementById('contact-overlay');
    if(overlay) overlay.classList.add('is-open');
  }

  function closeContact(){
    const overlay = document.getElementById('contact-overlay');
    if(overlay) overlay.classList.remove('is-open');
  }

  // ── FORM SUBMIT ──────────────────────────────────────────
  function handleSubmit(e){
    e.preventDefault();

    const nameEl    = document.getElementById('cf-name');
    const emailEl   = document.getElementById('cf-email');
    const msgEl     = document.getElementById('cf-nachricht');
    const submitBtn = document.getElementById('cf-submit');
    const msgBox    = document.getElementById('cf-message');

    // Validierung
    let valid = true;
    [nameEl, emailEl, msgEl].forEach(el => {
      el.style.borderColor = '';
      if(!el.value.trim()){
        el.style.borderColor = '#c0392b';
        valid = false;
      }
    });
    if(emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){
      emailEl.style.borderColor = '#c0392b';
      valid = false;
    }
    if(!valid){
      showMessage('Bitte fülle alle Pflichtfelder korrekt aus.', 'error');
      return;
    }

    // Submit
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';

    const params = new URLSearchParams();
    params.append('form-name', 'contact');
    params.append('name',      nameEl.value.trim());
    params.append('email',     emailEl.value.trim());
    params.append('telefon',   document.getElementById('cf-telefon').value.trim());
    params.append('betreff',   document.getElementById('cf-betreff').value.trim());
    params.append('nachricht', msgEl.value.trim());

    fetch('/', {
      method:  'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body:    params.toString()
    })
    .then(res => {
      if(!res.ok) throw new Error('HTTP ' + res.status);
      submitBtn.textContent = '✓ Gesendet!';
      submitBtn.style.background = '#4a7c59';
      showMessage('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.', 'success');
      document.getElementById('contact-form').reset();
      setTimeout(closeContact, 3000);
    })
    .catch(err => {
      console.error('Contact form error:', err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Nachricht senden →';
      showMessage('Fehler beim Senden. Bitte versuche es erneut.', 'error');
    });
  }

  function showMessage(text, type){
    const box = document.getElementById('cf-message');
    if(!box) return;
    box.textContent = text;
    box.className = 'form-message ' + type;
    box.style.display = 'block';
  }

  // ── EVENT LISTENERS ──────────────────────────────────────
  function bindEvents(){
    // Overlay-Close
    const overlay = document.getElementById('contact-overlay');
    overlay.addEventListener('click', function(e){
      if(e.target === this) closeContact();
    });

    // X-Button
    document.getElementById('contact-close').addEventListener('click', closeContact);

    // ESC-Taste
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeContact();
    });

    // Form Submit
    document.getElementById('contact-form').addEventListener('submit', handleSubmit);

    // Alle Trigger-Buttons auf der Seite verbinden
    // Funktioniert für: id="footerConfigBtn", id="footerContactBtn",
    // class="open-contact", data-action="contact" usw.
    const triggers = document.querySelectorAll(
      '#footerConfigBtn, #footerContactBtn, .open-contact, [data-action="contact"]'
    );
    triggers.forEach(btn => {
      btn.addEventListener('click', openContact);
    });
  }

  // ── INIT ─────────────────────────────────────────────────
  function init(){
    injectHTML();
    bindEvents();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── PUBLIC API ───────────────────────────────────────────
  window.ContactPopup = { open: openContact, close: closeContact };

})();