// carousel.js - Add-ons infinite carousel

const ADDONS = [
  {
    badge: "Add-on",
    ico: "✍️",
    title: "Lektorat (1–2 Runden)",
    desc: "Stilsicheres Lektorat für besseren Lesefluss – ideal vor Print & eBook.",
    for: "Plus / Premium"
  },
  {
    badge: "Add-on",
    ico: "🧩",
    title: "Print-Upgrade",
    desc: "Wenn du zunächst als eBook startest und Print später nachziehen willst.",
    for: "Starter"
  },
  {
    badge: "Design",
    ico: "🎨",
    title: "Custom Cover Design",
    desc: "Recherche + Entwürfe + Feedback – stärkerer Look und bessere Marktwirkung.",
    for: "Plus / Premium"
  },
  {
    badge: "Alle",
    ico: "🧾",
    title: "ISBN (Eigen / Verlag)",
    desc: "Eigen-ISBN oder Verlags-ISBN – je nach Ziel, Shops und Branding.",
    for: "Alle"
  },
  {
    badge: "Add-on",
    ico: "📝",
    title: "Klappentext / Copy",
    desc: "Verkaufsstark, passend zu Genre & Zielgruppe – klare Struktur als Leitplanke.",
    for: "Alle"
  },
  {
    badge: "Optional",
    ico: "📣",
    title: "Marketing-Bausteine",
    desc: "Kampagnen-Setup & Beratung – je nach Budget und Ziel sauber skalierbar.",
    for: "Optional"
  },
  {
    badge: "Optional",
    ico: "📰",
    title: "PR / Social Media",
    desc: "Erweiterbar je nach Launch-Plan: Posts, Presse-Text, Medien-Ansprache.",
    for: "Optional"
  }
];

function createAddonCard(addon) {
  return `
    <div class="addon-card">
      <div class="addon-badge">${addon.badge}</div>
      <span class="addon-icon">${addon.ico}</span>
      <h3 class="addon-title">${addon.title}</h3>
      <p class="addon-desc">${addon.desc}</p>
      <span class="addon-for">${addon.for}</span>
    </div>
  `;
}

export function initCarousel() {
  console.log('🎠 Initializing add-ons carousel...');
  
  const carouselContainer = document.getElementById('addons-carousel');
  if (!carouselContainer) {
    console.warn('Carousel container not found');
    return;
  }
  
  // Create carousel HTML
  const carouselHTML = `
    <div class="carousel-track" id="carousel-track">
      ${ADDONS.map(addon => createAddonCard(addon)).join('')}
      ${ADDONS.map(addon => createAddonCard(addon)).join('')}
    </div>
  `;
  
  carouselContainer.innerHTML = carouselHTML;
  
  // Add mouse tracking for glow effect
  const cards = carouselContainer.querySelectorAll('.addon-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
  
  console.log('✅ Carousel initialized with', ADDONS.length, 'add-ons (duplicated for loop)');
}