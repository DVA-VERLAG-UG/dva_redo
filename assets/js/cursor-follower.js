// cursor-follower.js - Simple cursor follower (doesn't hide default cursor)

export function initCursorFollower() {
  // Completely wrapped in try-catch so it can NEVER break other code
  try {
    console.log('🔵 Initializing cursor follower...');
    
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      console.log('⏭️ Touch device - skipping cursor follower');
      return;
    }
    
    // Create follower element
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse - use passive for performance
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Show follower on first move
      if (!follower.classList.contains('active')) {
        follower.classList.add('active');
      }
    }, { passive: true });
    
    // Smooth animation loop
    function animate() {
      // Smooth lerp
      followerX += (mouseX - followerX) * 0.3;
      followerY += (mouseY - followerY) * 0.3;
      
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Detect hoverable elements
    const hoverables = 'a, button, [role="button"], input[type="submit"], input[type="button"]';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(hoverables) || e.target.closest(hoverables)) {
        follower.classList.add('hover');
      }
    }, { passive: true });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(hoverables) || e.target.closest(hoverables)) {
        follower.classList.remove('hover');
      }
    }, { passive: true });
    
    console.log('✅ Cursor follower ready');
    
  } catch (error) {
    // Silent fail - won't break anything else
    console.warn('Cursor follower failed (non-critical):', error);
  }
}