// logo-carousel.js - FIXED paths for both local and GitHub Pages

export function initLogoCarousel() {
  const section = document.querySelector('.logo-carousel-section');
  if (!section) return;
 
  const track = section.querySelector('.logo-carousel-track');
  const header = section.querySelector('.logo-carousel-header');
  
  if (!track) {
    console.error('Logo carousel track not found');
    return;
  }
 
  // Logo data
  const logos = [
    { name: 'Amazon', file: 'amazon.png' },
    { name: 'Google Books', file: 'google-books.png' },
    { name: 'Thalia', file: 'thalia.png' },
    { name: 'Hugendubel', file: 'hugendubel.png' },
    { name: 'Kobo', file: 'kobo.png' }
  ];

  // Detect current path and build correct base path
  const currentPath = window.location.pathname;
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // Build correct path based on environment
  let imagePath;
  if (isGitHubPages) {
    // GitHub Pages: /dva_redo/de/index.html → /dva_redo/assets/images/...
    imagePath = '/dva_redo/assets/images/index/logos/';
  } else {
    // Local: /de/index.html → ../assets/images/...
    imagePath = '../assets/images/index/logos/';
  }

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  // Create logo elements
  allLogos.forEach(logo => {
    const logoItem = document.createElement('div');
    logoItem.className = 'logo-carousel-item';
    
    const img = document.createElement('img');
    img.src = `${imagePath}${logo.file}`;
    img.alt = logo.name;
    img.loading = 'lazy';
    
    // Fallback if image doesn't load
    img.onerror = () => {
      console.error(`Failed to load logo: ${img.src}`);
      logoItem.innerHTML = `<span style="font-size: 1.5rem; font-weight: 700; opacity: 0.5;">${logo.name}</span>`;
    };
    
    logoItem.appendChild(img);
    track.appendChild(logoItem);
  });

  // Intersection Observer for header animation (optional)
  if (header) {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('logo-visible');
        }
      });
    }, observerOptions);

    observer.observe(header);
  }

  console.log('✅ Logo carousel initialized');
  console.log('Image path:', imagePath);
}