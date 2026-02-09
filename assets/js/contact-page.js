// ==========================================
// CONTACT PAGE - OPTIMIZED
// Royal Bronze Theme
// ==========================================

(function() {
  'use strict';
  
  console.log('📧 Contact Page Loading...');
  
  // ==========================================
  // 1. FORM VALIDATION & SUBMISSION
  // ==========================================
  
  function initForm() {
    const form = document.querySelector('.contact-form-main');
    const successMsg = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic validation
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Check required fields
      if (!data.vorname || !data.nachname || !data.email || !data.nachricht || !data.betreff) {
        alert('Bitte fülle alle Pflichtfelder (*) aus.');
        return;
      }
      
      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }
      
      // Check privacy checkbox
      if (!data.datenschutz) {
        alert('Bitte akzeptiere die Datenschutzerklärung.');
        return;
      }
      
      try {
        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
          // Show success message
          successMsg.classList.add('show');
          form.reset();
          
          // Scroll to success message
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Hide after 5 seconds
          setTimeout(() => {
            successMsg.classList.remove('show');
          }, 5000);
          
          console.log('✅ Form submitted successfully');
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Es gab einen Fehler beim Senden. Bitte versuche es später erneut oder kontaktiere uns direkt per Telefon.');
      }
    });
    
    console.log('✅ Form initialized');
  }
  
  // ==========================================
  // 2. SMOOTH SCROLL TO FORM
  // ==========================================
  
  function initSmoothScroll() {
    // If URL has #form, scroll to form
    if (window.location.hash === '#form') {
      setTimeout(() => {
        const form = document.querySelector('.contact-form-wrapper');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }
  
  // ==========================================
  // 3. CARD HOVER EFFECTS
  // ==========================================
  
  function initCardEffects() {
    const cards = document.querySelectorAll('.contact-info-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => {
          if (c !== card) {
            c.style.opacity = '0.7';
            c.style.transform = 'scale(0.98)';
          }
        });
      });
      
      card.addEventListener('mouseleave', () => {
        cards.forEach(c => {
          c.style.opacity = '1';
          c.style.transform = 'scale(1)';
        });
      });
    });
  }
  
  // ==========================================
  // 4. CURSOR FIX (Nuclear Option)
  // ==========================================
  
  function forceCursorFix() {
    const style = document.createElement('style');
    style.textContent = `
      /* CONTACT PAGE CURSOR FIX */
      a, button, select,
      .form-submit-btn,
      .form-checkbox,
      .form-cta-link,
      .contact-faq-question,
      .contact-social-links a {
        cursor: pointer !important;
      }
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      textarea {
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.querySelectorAll('a, button, select').forEach(el => {
        el.style.cursor = 'pointer';
      });
    }, 100);
    
    console.log('✅ Cursor fix applied');
  }
  
  // ==========================================
  // 5. INITIALIZE ALL
  // ==========================================
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInit);
    } else {
      runInit();
    }
  }
  
  function runInit() {
    forceCursorFix();      // First!
    initForm();            // Form validation
    initSmoothScroll();    // Scroll to form
    initCardEffects();     // Card interactions
    
    console.log('🎉 Contact Page Ready!');
  }
  
  init();
  
})();