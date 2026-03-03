// horizontal-scroll-section.js - Horizontal scroll with vertical/horizontal input

export function initHorizontalScroll() {
  console.log('↔️  Initializing horizontal scroll section...');
  
  const wrapper = document.querySelector('.horizontal-scroll-wrapper');
  if (!wrapper) {
    console.warn('Horizontal scroll wrapper not found');
    return;
  }
  
  const container = wrapper.querySelector('.horizontal-scroll-container');
  const track = wrapper.querySelector('.horizontal-scroll-track');
  
  if (!container || !track) {
    console.warn('Horizontal scroll elements not found');
    return;
  } 
  
  // Calculate max scroll distance
  const getMaxScroll = () => {
    return track.scrollWidth - container.clientWidth;
  };
  
  let scrollProgress = 0;
  let ticking = false;
  
  // Handle scroll
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const wrapperHeight = wrapper.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
          const scrollStart = Math.abs(rect.top);
          const scrollEnd = wrapperHeight - viewportHeight;
          const scrollFraction = Math.max(0, Math.min(1, scrollStart / scrollEnd));
          
          const maxScroll = getMaxScroll();
          scrollProgress = scrollFraction * maxScroll;
          
          track.style.transform = `translateX(-${scrollProgress}px)`;
          
          const panel3 = track.querySelector('.scroll-panel:nth-child(3)');
          if (panel3 && scrollFraction > 0.66) {
            panel3.classList.add('panel-visible');
          }
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  }
  
  // Handle horizontal scroll (trackpad, mouse wheel horizontal)
  function handleHorizontalScroll(e) {
    const rect = wrapper.getBoundingClientRect();
    
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        
        const maxScroll = getMaxScroll();
        scrollProgress = Math.max(0, Math.min(maxScroll, scrollProgress + e.deltaX));
        track.style.transform = `translateX(-${scrollProgress}px)`;
      }
    }
  }
  
  // ─────────────────────────────────────────────
  // MOBILE: IntersectionObserver parallax
  // Text card floats up over image as panel scrolls in
  // ─────────────────────────────────────────────
  function initMobileParallax() {
    const panels = wrapper.querySelectorAll('.scroll-panel');
    if (!panels.length) return;

    // Step 1: reveal animation via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mobile-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    panels.forEach((panel) => {
      // Text-only panels: show immediately, no animation needed
      if (panel.classList.contains('scroll-panel-text-only')) {
        panel.classList.add('mobile-visible');
        panel.classList.add('panel-visible'); // also set desktop class
      } else {
        observer.observe(panel);
      }
    });

    // Step 2: subtle scroll parallax on the text card
    // As panel scrolls up, text card gets a slight upward nudge
    function updateMobileParallax() {
      const vh = window.innerHeight;

      panels.forEach((panel) => {
        const text = panel.querySelector('.panel-text');
        if (!text) return;

        // Skip text-only panels (no image to overlap)
        if (panel.classList.contains('scroll-panel-text-only')) return;

        const rect = panel.getBoundingClientRect();
        // Progress: 0 = panel just entered bottom, 1 = panel at top of viewport
        const progress = 1 - (rect.bottom / (rect.height + vh));
        const clamped = Math.max(0, Math.min(1, progress));

        // Subtle vertical parallax: text moves up slightly faster than panel
        // Only applies once panel is visible (after reveal animation)
        if (panel.classList.contains('mobile-visible')) {
          const nudge = clamped * -18; // max -18px upward nudge
          text.style.transform = `translateY(${nudge}px)`;
        }
      });
    }

    let mobileTicking = false;
    window.addEventListener('scroll', () => {
      if (!mobileTicking) {
        requestAnimationFrame(() => {
          updateMobileParallax();
          mobileTicking = false;
        });
        mobileTicking = true;
      }
    }, { passive: true });

    updateMobileParallax();
    console.log('✅ Mobile parallax initialized');
  }

  // ─────────────────────────────────────────────
  // Detect mobile
  // ─────────────────────────────────────────────
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) {
    // Desktop: Enable scroll-jacking (unchanged)
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleHorizontalScroll, { passive: false });
    handleScroll();
    console.log('✅ Horizontal scroll initialized (desktop)');
  } else {
    // Mobile: vertical layout + parallax reveal
    initMobileParallax();
    console.log('✅ Horizontal scroll initialized (mobile - vertical layout)');
  }
  
  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const nowMobile = window.innerWidth <= 768;
      if (nowMobile !== isMobile) {
        window.location.reload();
      }
    }, 250);
  });
}