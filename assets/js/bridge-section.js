// bridge-section.js - Connect sections with animated text

export function initBridge() {
  console.log('🌉 Initializing bridge section...');
  
  const bridge = document.querySelector('.bridge-content');
  if (!bridge) {
    console.warn('Bridge section not found');
    return;
  }
  
  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  observer.observe(bridge);
  
  console.log('✅ Bridge section initialized');
}