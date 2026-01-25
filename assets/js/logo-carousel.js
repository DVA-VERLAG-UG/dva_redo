// logo-carousel.js - Auto-scrolling logo carousel

export function initLogoCarousel() {
  console.log('🎨 Initializing logo carousel...');
  
  const section = document.querySelector('.logo-carousel-section');
  if (!section) {
    console.warn('Logo carousel section not found');
    return;
  }
  
  const track = section.querySelector('.logo-carousel-track');
  if (!track) {
    console.warn('Logo carousel track not found');
    return;
  }
  
  // Logo filenames (add all your logos here)
  const logos = [
    'amazon.png',
    'google-books.png',
    'hugendubel.png',
    'kobo.png',
    'thalia.png'
  ];
  
  // Create logo items
  logos.forEach(logoFile => {
    const logoItem = document.createElement('div');
    logoItem.className = 'logo-item';
    
    const img = document.createElement('img');
    img.src = `../assets/images/index/logos/${logoFile}`;
    img.alt = logoFile.replace('.png', '').replace('-', ' ');
    img.loading = 'lazy';
    
    logoItem.appendChild(img);
    track.appendChild(logoItem);
  });
  
  // Duplicate logos for infinite scroll effect
  const originalLogos = track.innerHTML;
  track.innerHTML = originalLogos + originalLogos;
  
  // Animate header on scroll
  const header = section.querySelector('.logo-carousel-header');
  if (header) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(header);
  }
  
  console.log('✅ Logo carousel initialized with', logos.length, 'logos');
}