// Horizontal Scroll Parallax Effect
(function() {
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    const container = document.querySelector('.horizontal-scroll-container');
    const track = document.querySelector('.horizontal-scroll-track');
    const panels = document.querySelectorAll('.scroll-panel');
    
    if (!wrapper || !track) return;
    
    let ticking = false;
    
    function updateParallax() {
        const wrapperRect = wrapper.getBoundingClientRect();
        const scrollProgress = -wrapperRect.top / (wrapper.offsetHeight - window.innerHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Main horizontal scroll
        const maxScroll = track.scrollWidth - window.innerWidth;
        const scrollAmount = clampedProgress * maxScroll;
        
        // Apply main scroll
        track.style.transform = `translateX(-${scrollAmount}px)`;
        
        // Parallax effect on text - moves at different speed
        panels.forEach((panel, index) => {
            const panelText = panel.querySelector('.panel-text');
            if (!panelText) return;
            
            // Calculate panel position relative to viewport
            const panelRect = panel.getBoundingClientRect();
            const panelCenter = panelRect.left + panelRect.width / 2;
            const viewportCenter = window.innerWidth / 2;
            const distanceFromCenter = panelCenter - viewportCenter;
            
            // Parallax offset - text moves slower (0.3 = 30% of normal speed)
            const parallaxOffset = distanceFromCenter * 0.3;
            
            panelText.style.transform = `translateX(${parallaxOffset}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Listen to scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial update
    updateParallax();
})();