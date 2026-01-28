/**
 * Konfigurator Showcase Parallax Effect
 * Adds smooth parallax scrolling to video and text sections
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    videoSpeed: 0.3,        // Video moves slower (30% of scroll speed)
    textSpeed: 0.15,        // Text moves even slower (15% of scroll speed)
    accentTopSpeed: 0.5,    // Top accent image moves faster
    accentBottomSpeed: 0.4, // Bottom accent image moves medium speed
    threshold: 0.1          // When to trigger animations
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const showcase = document.querySelector('.konfig-showcase');
    if (!showcase) return;

    const media = showcase.querySelector('.konfig-showcase-media');
    const content = showcase.querySelector('.konfig-showcase-content');
    const accentTop = showcase.querySelector('.konfig-accent-top');
    const accentBottom = showcase.querySelector('.konfig-accent-bottom');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Add in-view class immediately for animations
      showcase.classList.add('in-view');
      return;
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
      threshold: CONFIG.threshold,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    observer.observe(showcase);

    // Parallax scroll effect
    let ticking = false;

    function updateParallax() {
      const showcaseRect = showcase.getBoundingClientRect();
      const showcaseTop = showcaseRect.top;
      const showcaseHeight = showcaseRect.height;
      const windowHeight = window.innerHeight;

      // Only apply parallax when section is visible
      if (showcaseTop < windowHeight && showcaseTop + showcaseHeight > 0) {
        // Calculate scroll progress (0 to 1)
        const scrollProgress = (windowHeight - showcaseTop) / (windowHeight + showcaseHeight);
        
        // Calculate parallax offsets
        const videoOffset = (scrollProgress - 0.5) * 100 * CONFIG.videoSpeed;
        const textOffset = (scrollProgress - 0.5) * 100 * CONFIG.textSpeed;
        const accentTopOffset = (scrollProgress - 0.5) * 100 * CONFIG.accentTopSpeed;
        const accentBottomOffset = (scrollProgress - 0.5) * 100 * CONFIG.accentBottomSpeed;

        // Apply transforms
        if (media) {
          media.style.transform = `translateY(${-videoOffset}px)`;
        }

        if (content) {
          content.style.transform = `translateY(${textOffset}px)`;
        }

        if (accentTop) {
          const currentRotation = -8; // Original rotation
          accentTop.style.transform = `translateY(${-accentTopOffset}px) rotate(${currentRotation}deg)`;
        }

        if (accentBottom) {
          const currentRotation = 6; // Original rotation
          accentBottom.style.transform = `translateY(${accentBottomOffset}px) rotate(${currentRotation}deg)`;
        }
      }

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial update
    updateParallax();

    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateParallax();
      }, 250);
    }, { passive: true });

    // Optional: Add floating animation to feature icons
    addFloatingAnimation(showcase);
  }

  /**
   * Add subtle floating animation to feature icons
   */
  function addFloatingAnimation(showcase) {
    const featureIcons = showcase.querySelectorAll('.konfig-feature-icon');
    
    featureIcons.forEach((icon, index) => {
      // Stagger the animation start
      const delay = index * 0.2;
      const duration = 2 + (index * 0.3); // Vary duration slightly
      
      icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });

    // Add the float keyframe if it doesn't exist
    if (!document.querySelector('#konfig-float-animation')) {
      const style = document.createElement('style');
      style.id = 'konfig-float-animation';
      style.textContent = `
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Optional: Add mouse move parallax effect (subtle)
   */
  function addMouseParallax(showcase) {
    const media = showcase.querySelector('.konfig-showcase-media');
    const content = showcase.querySelector('.konfig-showcase-content');

    if (!media || !content) return;

    showcase.addEventListener('mousemove', (e) => {
      const rect = showcase.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Apply subtle movement based on mouse position
      const mediaX = x * 20;
      const mediaY = y * 20;
      const contentX = x * -10;
      const contentY = y * -10;

      media.style.transform = `translate(${mediaX}px, ${mediaY}px)`;
      content.style.transform = `translate(${contentX}px, ${contentY}px)`;
    });

    // Reset on mouse leave
    showcase.addEventListener('mouseleave', () => {
      media.style.transform = '';
      content.style.transform = '';
    });
  }

  // Uncomment to enable mouse parallax:
  // setTimeout(() => {
  //   const showcase = document.querySelector('.konfig-showcase');
  //   if (showcase) addMouseParallax(showcase);
  // }, 1000);

})();