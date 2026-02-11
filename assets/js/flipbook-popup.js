/* Flipbook Popup Handler */
(function() {
  'use strict';
  
  window.FlipbookPopup = {
    init: function(triggerSelector) {
      // Build HTML
      this.buildHTML();
      
      // Bind triggers
      const triggers = document.querySelectorAll(triggerSelector);
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => this.open());
      });
      
      // Listen for messages from iframe
      window.addEventListener('message', (e) => this.handleMessage(e));
      
      // Display existing selections on page load
      this.displaySelections();
    },
    
    buildHTML: function() {
      if (document.getElementById('flipbook-overlay')) return;
      
      const html = `
<div class="flipbook-overlay" id="flipbook-overlay">
  <div class="flipbook-container">
    <button class="flipbook-close" id="flipbook-close" aria-label="Schließen">✕</button>
    <iframe 
      src="../book_effekt/index.html" 
      class="flipbook-iframe" 
      id="flipbook-iframe"
      title="Buchkonfigurator"
    ></iframe>
  </div>
</div>
`;
      
      document.body.insertAdjacentHTML('beforeend', html);
      this.bindEvents();
    },
    
    bindEvents: function() {
      const overlay = document.getElementById('flipbook-overlay');
      const closeBtn = document.getElementById('flipbook-close');
      
      // Close button
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }
      
      // Backdrop click
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) this.close();
        });
      }
      
      // ESC key
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
      
      // Refresh display when closing
      setTimeout(() => this.displaySelections(), 300);
    },
    
    handleMessage: function(event) {
      // ✅ Listen for selection updates from iframe
      if (event.data && event.data.type === 'selectionUpdate') {
        localStorage.setItem('buchkonfig_selections', JSON.stringify(event.data.selections));
        this.displaySelections();
      }
      
      // ✅ Listen for closePopup command from iframe
      if (event.data && event.data.type === 'closePopup') {
        this.close();
      }
    },
    
    displaySelections: function() {
      const container = document.getElementById('custom-config-display');
      if (!container) {
        console.log('Container #custom-config-display not found');
        return;
      }
      
      try {
        const data = localStorage.getItem('buchkonfig_selections');
        if (!data) {
          console.log('No selection data in localStorage');
          return;
        }
        
        const selections = JSON.parse(data);
        const keys = Object.keys(selections);
        
        if (keys.length === 0) {
          console.log('Selection data is empty');
          return;
        }
        
        // Count total selections
        let totalCount = 0;
        keys.forEach(key => {
          if (Array.isArray(selections[key])) {
            totalCount += selections[key].length;
          }
        });
        
        if (totalCount === 0) {
          console.log('No items selected');
          return;
        }
        
        console.log('Displaying selections:', selections);
        
        // Build display HTML
        let html = `<div class="config-summary">
          <p class="config-count"><strong>${totalCount} Services ausgewählt</strong></p>
          <div class="config-categories">`;
        
        keys.forEach(category => {
          const items = selections[category];
          if (items && items.length > 0) {
            html += `<div class="config-cat">
              <h4>${category}</h4>
              <ul>`;
            items.forEach(item => {
              html += `<li>${item}</li>`;
            });
            html += `</ul></div>`;
          }
        });
        
        html += `</div>
          <button class="btn-edit-config" onclick="document.querySelector('#openConfigBtn').click()">
            Bearbeiten →
          </button>
        </div>`;
        
        container.innerHTML = html;
        container.classList.remove('custom-config-empty');
        
      } catch (e) {
        console.error('Error displaying selections:', e);
      }
    }
  };
  
})();