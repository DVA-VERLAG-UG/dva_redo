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
        
        // Only animate when wrapper is in viewport
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
          // Calculate scroll progress through wrapper
          const scrollStart = Math.abs(rect.top);
          const scrollEnd = wrapperHeight - viewportHeight;
          const scrollFraction = Math.max(0, Math.min(1, scrollStart / scrollEnd));
          
          // Map to horizontal position
          const maxScroll = getMaxScroll();
          scrollProgress = scrollFraction * maxScroll;
          
          track.style.transform = `translateX(-${scrollProgress}px)`;
          
          // Trigger Panel 3 animation when it comes into view
          // Panel 3 is visible when scroll is > 66% through
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
    
    // Only handle when section is sticky (in view)
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      // Check if horizontal scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        
        const maxScroll = getMaxScroll();
        scrollProgress = Math.max(0, Math.min(maxScroll, scrollProgress + e.deltaX));
        track.style.transform = `translateX(-${scrollProgress}px)`;
      }
    }
  }
  
  // Detect mobile
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) {
    // Desktop: Enable scroll-jacking
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleHorizontalScroll, { passive: false });
    
    // Initial calculation
    handleScroll();
    
    console.log('✅ Horizontal scroll initialized (desktop)');
  } else {
    // Mobile: Normal vertical scroll (CSS handles layout)
    console.log('✅ Horizontal scroll initialized (mobile - vertical layout)');
  }
  
  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const nowMobile = window.innerWidth <= 768;
      if (nowMobile !== isMobile) {
        // Reload page on mobile/desktop switch
        window.location.reload();
      }
    }, 250);
  });
}