// bridge-section.js - Connect sections with animated text

export function initBridge() {
  
  const bridge = document.querySelector('.bridge-content');
  if (!bridge) {
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
  
}