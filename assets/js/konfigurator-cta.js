// konfigurator-cta.js - Scroll-triggered CTA overlay

export function initKonfiguratorCTA() {
  console.log('📋 Initializing Konfigurator CTA...');
  
  const ctaSection = document.querySelector('.konfigurator-cta');
  if (!ctaSection) {
    console.warn('Konfigurator CTA section not found');
    return;
  }
  
  // Intersection Observer for scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        console.log('✅ Konfigurator CTA visible');
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully in view
  });
  
  observer.observe(ctaSection);
  
  console.log('✅ Konfigurator CTA initialized');
}