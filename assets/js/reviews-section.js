// reviews-section.js - Native horizontal scrolling with Google Sheets

export function initReviews() {
  console.log('⭐ Initializing reviews section...');
  
  const section = document.querySelector('.reviews-section');
  if (!section) {
    console.warn('Reviews section not found');
    return;
  }
  
  // Initialize reviews carousel
  initReviewsCarousel();
  
  console.log('✅ Reviews section initialized');
}

// Reviews carousel with native scrolling
function initReviewsCarousel() {
  const stack = document.getElementById('reviewsStack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const progressFill = document.querySelector('.reviews-progress-fill');
  const progressText = document.querySelector('.reviews-progress-text');
  
  const c1 = document.getElementById('reviewCard1');
  const c2 = document.getElementById('reviewCard2');
  const c3 = document.getElementById('reviewCard3');
  
  if (!stack || !prevBtn || !nextBtn || !c1 || !c2 || !c3) {
    console.warn('Reviews carousel elements not found');
    return;
  }
  
  // Get all available cards
  const allCards = [c1, c2, c3].filter(Boolean);
  
  // Google Sheets CSV URL
  const SHEET_CSV_URL = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRfz-kgH7uOy4miA8uCWcsGkWH6g5ZJedSxk5SxFSD_nCGLRqjjbAvI25-OhrsDXu2x6kNuMTGuygR/pub?output=csv";
  
  // Fallback reviews - 5 cards
  const FALLBACK_REVIEWS = [
    {
      author: "Max Mustermann",
      bookTitle: "Mein Erfolgsroman",
      rating: 5,
      text: "Bitte ersetze die SHEET_CSV_URL in reviews-section.js mit deinem Google Sheets Link.",
      date: "2024-01-15",
      badge: "Amazon Bestseller"
    },
    {
      author: "Sarah Klein",
      bookTitle: "Die verlorene Zeit",
      rating: 5,
      text: "DVAYD hat meinen Traum wahr gemacht. Innerhalb von 3 Monaten war mein Buch auf Amazon verfügbar.",
      date: "2024-02-20",
      badge: "Bestseller"
    },
    {
      author: "Michael Bauer",
      bookTitle: "Zwischen zwei Welten",
      rating: 5,
      text: "Transparente Preise, schnelle Umsetzung und ein Team das wirklich versteht was Autoren brauchen.",
      date: "2024-03-10",
      badge: "Verifiziert"
    },
    {
      author: "Anna Lehmann",
      bookTitle: "Stille Schatten",
      rating: 5,
      text: "Von der ersten Beratung bis zur Veröffentlichung fühlte ich mich bestens betreut.",
      date: "2024-04-05",
      badge: "Top-Rated"
    },
    {
      author: "Thomas Weber",
      bookTitle: "Im Licht der Sterne",
      rating: 5,
      text: "Professionell, zuverlässig und mit Leidenschaft für gute Bücher. Absolute Empfehlung!",
      date: "2024-05-15",
      badge: "Empfohlen"
    }
  ];
  
  const esc = (str) => String(str ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
  
  const norm = (s) => String(s ?? "").trim().toLowerCase();
  
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cur = "";
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const n = text[i + 1];
      
      if (inQuotes) {
        if (c === '"' && n === '"') { cur += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { cur += c; }
      } else {
        if (c === '"') { inQuotes = true; }
        else if (c === ",") { row.push(cur); cur = ""; }
        else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
        else if (c === "\r") { /* ignore */ }
        else { cur += c; }
      }
    }
    row.push(cur);
    rows.push(row);
    return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
  }
  
  function getInitials(name) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  
  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  }
  
  function cardMarkup(review) {
    let avatarSrc = review.avatar;
    
    if (avatarSrc && !avatarSrc.startsWith('http')) {
      avatarSrc = `../assets/images/profiles/${avatarSrc}`;
    }
    
    const avatarContent = avatarSrc
      ? `<img src="${esc(avatarSrc)}" alt="${esc(review.author)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` 
      : getInitials(review.author);
    
    return `
      <div class="review-top">
        <div class="review-author">
          <div class="review-avatar">${avatarContent}</div>
          <div class="review-author-info">
            <h3>${esc(review.author)}</h3>
            <div class="review-book-title">${esc(review.bookTitle)}</div>
          </div>
        </div>
        <div class="review-stars">${renderStars(review.rating)}</div>
      </div>
      
      <div class="review-text">
        "${esc(review.text)}"
      </div>
      
      <div class="review-meta">
        <span>${esc(review.date)}</span>
        ${review.badge ? `
          <span class="review-badge">
            <span class="review-dot"></span>
            ${esc(review.badge)}
          </span>
        ` : ''}
      </div>
    `;
  }
  
  async function loadReviewsFromSheet() {
    try {
      const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Reviews CSV fetch failed");
      const csv = await res.text();
      
      const rows = parseCSV(csv);
      if (rows.length < 2) throw new Error("CSV has no data rows");
      
      const header = rows[0].map(h => norm(h));
      const idx = (name) => header.indexOf(norm(name));
      const val = (r, name) => {
        const i = idx(name);
        return i >= 0 ? String(r[i] ?? "").trim() : "";
      };
      
      const reviews = rows.slice(1).map(r => ({
        author: val(r, "author"),
        bookTitle: val(r, "booktitle") || val(r, "book_title"),
        rating: parseInt(val(r, "rating")) || 5,
        text: val(r, "review") || val(r, "text"),
        date: val(r, "date"),
        badge: val(r, "badge") || val(r, "achievement"),
        active: val(r, "active"),
        avatar: val(r, "avatar") || val(r, "photo") || val(r, "image")
      }))
      .filter(r => r.author && r.text)
      .filter(r => !r.active || norm(r.active) === "true");
      
      reviews.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      
      return reviews.length ? reviews : FALLBACK_REVIEWS;
    } catch (err) {
      console.warn("Reviews: CSV load failed, using fallback.", err);
      return FALLBACK_REVIEWS;
    }
  }
  
  let reviews = [...FALLBACK_REVIEWS];
  
  // Create dot indicators
  function createDots() {
    // Create dots container if it doesn't exist
    let dotsContainer = document.querySelector('.reviews-dots');
    if (!dotsContainer) {
      dotsContainer = document.createElement('div');
      dotsContainer.className = 'reviews-dots';
      stack.parentElement.appendChild(dotsContainer);
    }
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots based on number of "pages" (2 cards visible at once)
    const visibleCards = window.innerWidth > 1024 ? 2 : 1;
    const totalPages = Math.max(1, reviews.length - visibleCards + 1);
    
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = 'reviews-dot';
      dot.dataset.page = i;
      
      // Click to scroll to page
      dot.addEventListener('click', () => {
        const cardWidth = c1.offsetWidth + 30;
        stack.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Update active dot based on scroll position
  function updateDots() {
    const dots = document.querySelectorAll('.reviews-dot');
    if (dots.length === 0) return;
    
    const cardWidth = c1.offsetWidth + 30;
    const currentPage = Math.round(stack.scrollLeft / cardWidth);
    
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Render all cards - dynamically add more if needed
  function renderAllCards() {
    if (reviews.length === 0) return;
    
    // Render first 3 cards
    if (c1) c1.innerHTML = cardMarkup(reviews[0] || reviews[0]);
    if (c2) c2.innerHTML = cardMarkup(reviews[1] || reviews[0]);
    if (c3) c3.innerHTML = cardMarkup(reviews[2] || reviews[0]);
    
    // Add more cards if we have more reviews
    if (reviews.length > 3) {
      for (let i = 3; i < Math.min(reviews.length, 10); i++) {
        const existingCard = document.getElementById(`reviewCard${i + 1}`);
        
        if (!existingCard) {
          // Create new card
          const newCard = document.createElement('div');
          newCard.className = 'review-card';
          newCard.id = `reviewCard${i + 1}`;
          newCard.innerHTML = cardMarkup(reviews[i]);
          stack.appendChild(newCard);
        } else {
          // Update existing card
          existingCard.innerHTML = cardMarkup(reviews[i]);
        }
      }
    }
  }
  
  // Update progress bar based on scroll position
  function updateProgress() {
    const scrollLeft = stack.scrollLeft;
    const scrollWidth = stack.scrollWidth - stack.clientWidth;
    const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    
    // Calculate which card is most visible
    const cardWidth = c1.offsetWidth + 30; // card width + gap
    const currentCard = Math.round(scrollLeft / cardWidth) + 1;
    
    if (progressText) {
      progressText.textContent = `${Math.min(currentCard, reviews.length)} / ${reviews.length}`;
    }
    
    // Update button states
    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= scrollWidth - 5; // -5 for tolerance
    
    // Update dots
    updateDots();
  }
  
  // Scroll to specific card
  function scrollToCard(index) {
    const cardWidth = c1.offsetWidth + 30; // card width + gap
    stack.scrollLeft = index * cardWidth;
  }
  
  // Button navigation
  prevBtn.addEventListener('click', () => {
    const cardWidth = c1.offsetWidth + 30;
    const currentScroll = stack.scrollLeft;
    const targetScroll = Math.max(0, currentScroll - cardWidth);
    stack.scrollTo({ left: targetScroll, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    const cardWidth = c1.offsetWidth + 30;
    const currentScroll = stack.scrollLeft;
    const maxScroll = stack.scrollWidth - stack.clientWidth;
    const targetScroll = Math.min(maxScroll, currentScroll + cardWidth);
    stack.scrollTo({ left: targetScroll, behavior: 'smooth' });
  });
  
  // Update progress on scroll (including trackpad/mouse scroll)
  stack.addEventListener('scroll', updateProgress);
  
  // Update progress on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createDots(); // Recreate dots for new layout
      updateProgress();
    }, 250);
  });
  
  // Auto-scroll every 8 seconds
  let autoScrollTimer;
  let isUserScrolling = false;
  
  function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
      if (isUserScrolling) return;
      
      const cardWidth = c1.offsetWidth + 30;
      const currentScroll = stack.scrollLeft;
      const maxScroll = stack.scrollWidth - stack.clientWidth;
      
      if (currentScroll >= maxScroll - 5) {
        stack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        stack.scrollTo({ left: currentScroll + cardWidth, behavior: 'smooth' });
      }
    }, 8000);
  }
  
  function stopAutoScroll() {
    clearInterval(autoScrollTimer);
  }
  
  // Pause auto-scroll on user interaction
  stack.addEventListener('mouseenter', () => {
    isUserScrolling = true;
    stopAutoScroll();
  });
  
  stack.addEventListener('mouseleave', () => {
    isUserScrolling = false;
    startAutoScroll();
  });
  
  stack.addEventListener('touchstart', () => {
    isUserScrolling = true;
    stopAutoScroll();
  });
  
  // Initial setup
  renderAllCards();
  createDots(); // Create dots
  updateProgress();
  startAutoScroll();
  
  // Load from Google Sheets
  loadReviewsFromSheet()
    .then((loaded) => {
      reviews = loaded;
      renderAllCards();
      createDots(); // Recreate dots with correct count
      updateProgress();
    })
    .catch((err) => {
      console.warn("Reviews: Failed to load, using fallback.", err);
    });
}