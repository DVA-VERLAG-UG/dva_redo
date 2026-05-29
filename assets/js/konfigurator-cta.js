// konfigurator-cta.js - Scroll-triggered CTA overlay

export function initKonfiguratorCTA() {
  
  const ctaSection = document.querySelector('.konfigurator-cta');
  if (!ctaSection) {
    return;
  }
  
  // Intersection Observer for scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully in view
  });
  
  observer.observe(ctaSection);
  
}