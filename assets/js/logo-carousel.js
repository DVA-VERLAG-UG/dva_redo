// logo-carousel.js

const LOGOS = [
  { name: 'Libri',        file: 'libri.png' },
  { name: 'Amazon',       file: 'amazon.png' },
  { name: 'Google Books', file: 'google-books.png' },
  { name: 'Thalia',       file: 'thalia.png' },
  { name: 'Hugendubel',   file: 'hugendubel.png' },
  { name: 'Kobo',         file: 'kobo.png' },
];

function buildCarousel(track, imagePath) {
  if (track.dataset.built) return;
  track.dataset.built = '1';

  // Duplicate for seamless CSS loop
  [...LOGOS, ...LOGOS].forEach(logo => {
    const item = document.createElement('div');
    item.className = 'logo-carousel-item';

    const img = document.createElement('img');
    img.src = `${imagePath}${logo.file}`;
    img.alt = logo.name;
    // No loading="lazy" — we're already deferring via IntersectionObserver
    item.appendChild(img);
    track.appendChild(item);
  });
}

export function initLogoCarousel() {
  const section = document.querySelector('.logo-carousel-section');
  if (!section) return;

  const track  = section.querySelector('.logo-carousel-track');
  const header = section.querySelector('.logo-carousel-header');
  if (!track) return;

  const isGitHubPages = window.location.hostname.includes('github.io');
  const imagePath = isGitHubPages
    ? '/dva_redo/assets/images/index/logos/'
    : '../assets/images/index/logos/';

  // Build the carousel 500px before it enters the viewport so images
  // are already loaded by the time the user scrolls to this section.
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      buildCarousel(track, imagePath);
      observer.disconnect();
    }
  }, { rootMargin: '500px 0px' });

  observer.observe(section);

  // Header reveal animation
  if (header) {
    const headerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        header.classList.add('logo-visible');
        headerObserver.disconnect();
      }
    }, { threshold: 0.2 });
    headerObserver.observe(header);
  }
}