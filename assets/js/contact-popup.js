/* ==========================================
   CONTACT POPUP - Wiederverwendbar
   Einbinden via footer.html auf jeder Seite
   ========================================== */

(function(){

  // ── HTML INS DOM INJIZIEREN ──────────────────────────────
  function injectHTML(){
    if(document.getElementById('contact-overlay')) return;

    const html = `
      <div class="contact-overlay" id="contact-overlay">
        <div class="contact-popup">
          <button class="contact-close" id="contact-close" aria-label="Schließen">✕</button>
          <div class="contact-header">
            <h2>Lass uns sprechen</h2>
            <p>Wir melden uns innerhalb von 24 Stunden bei dir.</p>
          </div>
          <form class="contact-form" id="contact-form" novalidate>
            <input type="hidden" name="form-name" value="contact"/>
            <input type="text" name="bot-field" style="display:none"/>
            <div class="form-row">
              <div class="form-group">
                <label for="cpf-vorname">Vorname *</label>
                <input type="text" id="cpf-vorname" name="vorname" placeholder="Dein Vorname" required/>
              </div>
              <div class="form-group">
                <label for="cpf-nachname">Nachname *</label>
                <input type="text" id="cpf-nachname" name="nachname" placeholder="Dein Nachname" required/>
              </div>
            </div>
            <div class="form-group">
              <label for="cpf-email">E-Mail *</label>
              <input type="email" id="cpf-email" name="email" placeholder="deine@email.de" required/>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cpf-telefon">Telefon <span style="font-weight:400;font-size:0.8em;opacity:0.6;">(optional)</span></label>
                <input type="tel" id="cpf-telefon" name="telefon" placeholder="+49 ..."/>
              </div>
              <div class="form-group">
                <label for="cpf-betreff">Betreff <span style="font-weight:400;font-size:0.8em;opacity:0.6;">(optional)</span></label>
                <input type="text" id="cpf-betreff" name="betreff" placeholder="Worum geht es?"/>
              </div>
            </div>
            <div class="form-group">
              <label for="cpf-nachricht">Nachricht *</label>
              <textarea id="cpf-nachricht" name="nachricht" placeholder="Erzähl uns von deinem Projekt..." required></textarea>
            </div>
            <button type="submit" class="form-submit" id="cpf-submit">Nachricht senden →</button>
            <div class="form-message" id="cpf-message" style="display:none;"></div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ── OPEN / CLOSE ─────────────────────────────────────────
  function openContact(){
    const overlay = document.getElementById('contact-overlay');
    if(overlay){ overlay.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  }
  function closeContact(){
    const overlay = document.getElementById('contact-overlay');
    if(overlay){ overlay.classList.remove('is-open'); document.body.style.overflow = ''; }
  }

  // ── FORM SUBMIT ──────────────────────────────────────────
  function handleSubmit(e){
    e.preventDefault();
    const vorname   = document.getElementById('cpf-vorname');
    const nachname  = document.getElementById('cpf-nachname');
    const email     = document.getElementById('cpf-email');
    const nachricht = document.getElementById('cpf-nachricht');
    const submitBtn = document.getElementById('cpf-submit');
    const msgBox    = document.getElementById('cpf-message');

    let valid = true;
    [vorname, nachname, email, nachricht].forEach(el => {
      el.style.borderColor = '';
      if(!el.value.trim()){ el.style.borderColor = '#c0392b'; valid = false; }
    });
    if(email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
      email.style.borderColor = '#c0392b'; valid = false;
    }
    if(!valid){ showMessage('Bitte fülle alle Pflichtfelder korrekt aus.', 'error'); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';
    msgBox.style.display = 'none';

    const params = new URLSearchParams();
    params.append('form-name', 'contact');
    params.append('vorname',   vorname.value.trim());
    params.append('nachname',  nachname.value.trim());
    params.append('email',     email.value.trim());
    params.append('telefon',   document.getElementById('cpf-telefon').value.trim());
    params.append('betreff',   document.getElementById('cpf-betreff').value.trim());
    params.append('nachricht', nachricht.value.trim());

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
    const box = document.getElementById('cpf-message');
    if(!box) return;
    box.textContent = text;
    box.className = 'form-message ' + type;
    box.style.display = 'block';
  }


  // ── PUBLIC API — sofort verfügbar, noch vor init() ──────
  // Damit onclick="ContactPopup.open()" funktioniert
  window.ContactPopup = {
    open: function(){
      if(!document.getElementById('contact-overlay')) init();
      openContact();
    },
    close: closeContact
  };

  // ── INIT ─────────────────────────────────────────────────
  function init(){ injectHTML(); bindEvents(); }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();