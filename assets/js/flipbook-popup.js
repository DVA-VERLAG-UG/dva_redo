/* Flipbook Popup Handler */
(function() {
  'use strict';

  // ── Language detection ──────────────────────────────────────────────────────
  function getLang() {
    const p = window.location.pathname;
    if (p.includes('/en/')) return 'en';
    if (p.includes('/tr/')) return 'tr';
    if (p.includes('/fr/')) return 'fr';
    return 'de';
  }

  // ── Flipbook src per language ───────────────────────────────────────────────
  const FLIPBOOK_URLS = {
    de: '../book_effekt/index.html',
    en: '../book_effekt/en/index.html',
    tr: '../book_effekt/tr/index.html',
    fr: '../book_effekt/fr/index.html',
  };

  // ── localStorage key per language (prevents cross-language contamination) ──
  const STORAGE_KEY = {
    de: 'buchkonfig_selections_de',
    en: 'buchkonfig_selections_en',
    tr: 'buchkonfig_selections_tr',
    fr: 'buchkonfig_selections_fr',
  };

  // ── UI strings per language ─────────────────────────────────────────────────
  const STRINGS = {
    de: {
      close:       'Schließen',
      title:       'Buchkonfigurator',
      countPlural: (n) => `${n} Service${n !== 1 ? 's' : ''} ausgewählt`,
      edit:        'Bearbeiten →',
      emptyMsg:    'Noch keine Services ausgewählt',
      emptyHint:   'Klicke auf "Jetzt konfigurieren" um zu starten',
    },
    en: {
      close:       'Close',
      title:       'Book Configurator',
      countPlural: (n) => `${n} service${n !== 1 ? 's' : ''} selected`,
      edit:        'Edit →',
      emptyMsg:    'No services selected yet',
      emptyHint:   'Click "Configure Now" to get started',
    },
    tr: {
      close:       'Kapat',
      title:       'Yayın Konfigüratörü',
      countPlural: (n) => `${n} hizmet seçildi`,
      edit:        'Düzenle →',
      emptyMsg:    'Henüz bir seçim yapılmadı',
      emptyHint:   'Başlamak için \'Şimdi başlayın\' seçeneğini kullanın',
    },
    fr: {
      close:       'Fermer',
      title:       'Configurateur de Livre',
      countPlural: (n) => `${n} service${n !== 1 ? 's' : ''} sélectionné${n !== 1 ? 's' : ''}`,
      edit:        'Modifier →',
      emptyMsg:    'Aucun service sélectionné',
      emptyHint:   'Cliquez sur "Configurer Maintenant" pour commencer',
    },
  };

  window.FlipbookPopup = {
    init: function(triggerSelector) {
      this.lang       = getLang();
      this.s          = STRINGS[this.lang] || STRINGS.de;
      this.src        = FLIPBOOK_URLS[this.lang] || FLIPBOOK_URLS.de;
      this.storageKey = STORAGE_KEY[this.lang] || STORAGE_KEY.de;

      this.buildHTML();

      document.querySelectorAll(triggerSelector).forEach(trigger => {
        trigger.addEventListener('click', () => this.open());
      });

      window.addEventListener('message', (e) => this.handleMessage(e));
      this.displaySelections();
    },

    buildHTML: function() {
      if (document.getElementById('flipbook-overlay')) return;

      const html = `
<div class="flipbook-overlay" id="flipbook-overlay">
  <div class="flipbook-container">
    <button class="flipbook-close" id="flipbook-close" aria-label="${this.s.close}">✕</button>
    <iframe
      src="${this.src}"
      class="flipbook-iframe"
      id="flipbook-iframe"
      title="${this.s.title}"
    ></iframe>
  </div>
</div>`;

      document.body.insertAdjacentHTML('beforeend', html);
      this.bindEvents();
    },

    bindEvents: function() {
      const overlay  = document.getElementById('flipbook-overlay');
      const closeBtn = document.getElementById('flipbook-close');

      if (closeBtn) closeBtn.addEventListener('click', () => this.close());

      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) this.close();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
          this.close();
        }
      });
    },

    open: function() {
      const overlay = document.getElementById('flipbook-overlay');
      if (!overlay) return;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    },

    close: function() {
      const overlay = document.getElementById('flipbook-overlay');
      if (!overlay) return;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => this.displaySelections(), 300);
    },

    handleMessage: function(event) {
      if (event.data && event.data.type === 'selectionUpdate') {
        // Sprachspezifischen Key verwenden — verhindert DE/TR Überschneidung
        localStorage.setItem(this.storageKey, JSON.stringify(event.data.selections));
        this.displaySelections();
      }
      if (event.data && event.data.type === 'closePopup') {
        this.close();
      }
    },

    displaySelections: function() {
      const container = document.getElementById('custom-config-display');
      if (!container) return;

      try {
        const data = localStorage.getItem(this.storageKey);
        if (!data) { this._showEmpty(container); return; }

        const selections = JSON.parse(data);
        const keys = Object.keys(selections);

        let totalCount = 0;
        keys.forEach(key => {
          if (Array.isArray(selections[key])) totalCount += selections[key].length;
        });

        if (totalCount === 0) { this._showEmpty(container); return; }

        let html = `<div class="config-summary">
          <p class="config-count"><strong>${this.s.countPlural(totalCount)}</strong></p>
          <div class="config-categories">`;

        keys.forEach(category => {
          const items = selections[category];
          if (items && items.length > 0) {
            html += `<div class="config-cat"><h4>${category}</h4><ul>`;
            items.forEach(item => { html += `<li>${item}</li>`; });
            html += `</ul></div>`;
          }
        });

        html += `</div>
          <button class="btn-edit-config" onclick="FlipbookPopup.open()">
            ${this.s.edit}
          </button>
        </div>`;

        container.innerHTML = html;
        container.classList.remove('custom-config-empty');
        container.classList.add('custom-config-filled');

      } catch (e) {
        console.error('FlipbookPopup: Error displaying selections:', e);
        this._showEmpty(container);
      }
    },

    _showEmpty: function(container) {
      if (!container.classList.contains('custom-config-empty')) {
        container.className = 'custom-config-empty';
        container.innerHTML = `
          <p class="empty-message">${this.s.emptyMsg}</p>
          <p class="empty-hint">${this.s.emptyHint}</p>
        `;
      }
    }
  };

})();