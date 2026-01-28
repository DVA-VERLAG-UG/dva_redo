// stats-combined-section.js - Animated counters with parallax effect

(function() {
  console.log('📊 Initializing stats combined section...');
  
  const section = document.querySelector('.stats-combined-section');
  if (!section) {
    console.warn('Stats combined section not found');
    return;
  }
  
  const counters = section.querySelectorAll('.stats-panel-counter');
  const panels = section.querySelectorAll('.stats-panel-left, .stats-panel-right');
  
  if (counters.length === 0) {
    console.warn('No stat counters found');
    return;
  }
  
  let animated = false;
  let ticking = false;
  
  // Set counters to 0 initially
  counters.forEach(counter => {
    counter.textContent = '0+';
  });
  
  // Animate counter function
  function animateCounter(element, targetNumber) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        current = targetNumber;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + '+';
    }, duration / steps);
  }
  
  // Parallax effect - panels move faster on scroll
  function updateParallax() {
    const sectionRect = section.getBoundingClientRect();
    const sectionCenter = sectionRect.top + sectionRect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distanceFromCenter = sectionCenter - viewportCenter;
    
    // Parallax factor: 0.2 = 20% faster (reduced for smoother effect)
    const parallaxOffset = distanceFromCenter * 0.2;
    
    panels.forEach((panel, index) => {
      // Slight variation between left and right panel
      const variation = index === 0 ? 1 : 1.05;
      const finalOffset = parallaxOffset * variation;
      
      // Use transform with will-change for better performance
      panel.style.transform = `translateY(${finalOffset}px) translateZ(0)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Debounced scroll end detection
  let scrollEndTimer = null;
  function handleScrollEnd() {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      // Smooth return to natural position when scroll stops
      panels.forEach(panel => {
        panel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      // Re-enable fast transition after animation
      setTimeout(() => {
        panels.forEach(panel => {
          panel.style.transition = 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.1s linear';
        });
      }, 300);
    }, 150);
  }
  
  // Intersection Observer - triggers counter animation when section enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        // Animate first counter (200+)
        if (counters[0]) {
          animateCounter(counters[0], 220);
        }
        
        // Animate second counter (20+)
        if (counters[1]) {
          setTimeout(() => {
            animateCounter(counters[1], 10);
          }, 200); // Slight delay for stagger effect
        }
        
        console.log('✅ Stats counters animated');
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '0px 0px -100px 0px'
  });
  
  observer.observe(section);
  
  // Listen to scroll for parallax
  window.addEventListener('scroll', () => {
    requestTick();
    handleScrollEnd();
  }, { passive: true });
  
  // Initial parallax position
  updateParallax();
  
  console.log('✅ Stats combined section with parallax initialized');
})();