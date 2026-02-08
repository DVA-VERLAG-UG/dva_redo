// ==========================================
// ABOUT PAGE - OPTIMIZED VERSION
// NO LAG - HIGH PERFORMANCE
// ==========================================

(function() {
  'use strict';
  
  console.log('🎨 About Page Optimized - Loading...');
  
  // Performance settings
  const ENABLE_PARALLAX = window.innerWidth > 768; // Disable on mobile
  const USE_RAF = true; // Use requestAnimationFrame
  
  // ==========================================
  // 1. SIMPLE PARALLAX (Optimized)
  // ==========================================
  
  function initParallax() {
    if (!ENABLE_PARALLAX) {
      console.log('📱 Parallax disabled on mobile');
      return;
    }
    
    const parallaxElements = document.querySelectorAll('[data-scroll]');
    if (!parallaxElements.length) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-scroll-speed') || 0);
        if (speed === 0) return;
        
        const yPos = scrolled * speed * 0.5; // Reduced multiplier for smoother effect
        el.style.willChange = 'transform';
        el.style.transform = `translate3d(0, ${yPos}px, 0)`; // Use 3D for GPU acceleration
      });
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        if (USE_RAF) {
          window.requestAnimationFrame(updateParallax);
        } else {
          updateParallax();
        }
        ticking = true;
      }
    }, { passive: true });
    
    updateParallax();
    console.log('✅ Parallax initialized (optimized)');
  }
  
  // ==========================================
  // 2. COUNTER ANIMATIONS (Lightweight)
  // ==========================================
  
  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, {
      threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-count'));
      const duration = 1500; // Reduced from 2000ms
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeOutQuad * target);
        
        element.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target + '+';
        }
      }
      
      requestAnimationFrame(update);
    }
    
    console.log('✅ Counters initialized');
  }
  
  // ==========================================
  // 3. SCROLL REVEAL (Simplified)
  // ==========================================
  
  function initScrollReveal() {
    const elements = document.querySelectorAll('.about-value-card, .about-team-card, .about-location-card');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Stop observing
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
      el.classList.add('reveal'); // Add class for CSS animation
      observer.observe(el);
    });
    
    console.log('✅ Scroll reveal initialized');
  }
  
  // ==========================================
  // 4. HORIZONTAL SCROLL (Touch-friendly)
  // ==========================================
  
  function initHorizontalScroll() {
    const container = document.querySelector('.about-values-scroll');
    if (!container) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Mouse events
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
      container.style.userSelect = 'auto';
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
    
    container.style.cursor = 'grab';
    
    console.log('✅ Horizontal scroll initialized');
  }
  
  // ==========================================
  // 5. SCROLL INDICATOR (Simple)
  // ==========================================
  
  function initScrollIndicator() {
    const indicator = document.querySelector('.about-hero-scroll-indicator');
    if (!indicator) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const opacity = Math.max(0, 1 - (scrolled / 200));
          indicator.style.opacity = opacity;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    console.log('✅ Scroll indicator initialized');
  }
  
  // ==========================================
  // 6. LAZY LOAD BACKGROUNDS (Performance)
  // ==========================================
  
  function initLazyBackgrounds() {
    const elements = document.querySelectorAll('[style*="background-image"]');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('bg-loaded');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px'
    });
    
    elements.forEach(el => observer.observe(el));
    
    console.log('✅ Lazy backgrounds initialized');
  }
  
  // ==========================================
  // 7. INITIALIZE ALL
  // ==========================================
  
  function init() {
    // Don't wait for full load, use DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInit);
    } else {
      runInit();
    }
  }
  
  function runInit() {
    // Initialize in order of importance
    initScrollReveal();       // CSS-based, lightweight
    initCounterAnimations();  // Only runs when visible
    initScrollIndicator();    // Simple opacity change
    initHorizontalScroll();   // Only if needed
    initLazyBackgrounds();    // Performance boost
    
    // Parallax last (most expensive)
    if (ENABLE_PARALLAX) {
      setTimeout(() => {
        initParallax();
      }, 100);
    }
    
    console.log('🎉 About Page Ready (Optimized)');
  }
  
  init();
  
  // ==========================================
  // 8. CLEANUP & OPTIMIZATION
  // ==========================================
  
  // Pause animations when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause animations
      document.querySelectorAll('[data-scroll]').forEach(el => {
        el.style.willChange = 'auto';
      });
    } else {
      // Resume
      if (ENABLE_PARALLAX) {
        document.querySelectorAll('[data-scroll]').forEach(el => {
          el.style.willChange = 'transform';
        });
      }
    }
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    document.querySelectorAll('[data-scroll]').forEach(el => {
      el.style.willChange = 'auto';
      el.style.transform = 'none';
    });
  });
  
})();