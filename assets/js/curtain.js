// curtain.js - Splash screen curtain animation

export function initCurtain() {
  console.log('🎬 Showing curtain animation');
  
  // Add curtain to page
  const curtain = document.createElement('div');
  curtain.className = 'curtain-overlay';
  curtain.innerHTML = `
    <div class="curtain-text">
      <span class="curtain-word">Istanbul</span>
      <span class="curtain-word">Bremen</span>
      <span class="curtain-word">Worldwide</span>
    </div>
  `;
  
  document.body.prepend(curtain);
  document.body.classList.add('curtain-active');
  
  // Remove curtain and enable scrolling after animation
  setTimeout(() => {
    curtain.classList.add('hide');
    document.body.classList.remove('curtain-active');
    
    // Remove from DOM after transition
    setTimeout(() => {
      curtain.remove();
      console.log('✅ Curtain animation complete');
    }, 600);
  }, 2600); // Total: 2s animation + 0.6s slide up
}