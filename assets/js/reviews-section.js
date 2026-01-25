// reviews-section.js - Animated counter and Google Sheets reviews

export function initReviews() {
  console.log('⭐ Initializing reviews section...');
  
  const section = document.querySelector('.reviews-section');
  if (!section) {
    console.warn('Reviews section not found');
    return;
  }
  
  // Initialize animated counter
  initCounter();
  
  // Initialize reviews carousel
  initReviewsCarousel();
  
  console.log('✅ Reviews section initialized');
}

// Animated counter that counts up to 200+
function initCounter() {
  const counter = document.querySelector('.reviews-counter');
  if (!counter) return;
  
  const targetNumber = 200;
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  let hasAnimated = false;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * targetNumber);
    
    counter.textContent = current + '+';
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  // Trigger animation when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animate();
      }
    });
  }, {
    threshold: 0.5
  });
  
  observer.observe(counter);
}

// Reviews carousel with Google Sheets integration
function initReviewsCarousel() {
  const stack = document.getElementById('reviewsStack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  
  const c1 = document.getElementById('reviewCard1');
  const c2 = document.getElementById('reviewCard2');
  const c3 = document.getElementById('reviewCard3');
  
  if (!stack || !prevBtn || !nextBtn || !c1 || !c2 || !c3) {
    console.warn('Reviews carousel elements not found');
    return;
  }
  
  // Google Sheets CSV URL
  const SHEET_CSV_URL = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRfz-kgH7uOy4miA8uCWcsGkWH6g5ZJedSxk5SxFSD_nCGLRqjjbAvI25-OhrsDXu2x6kNuMTGuygR/pub?output=csv";
  
  // Fallback reviews if Google Sheets fails
  const FALLBACK_REVIEWS = [
    {
      author: "Max Mustermann",
      bookTitle: "Mein Erfolgsroman",
      rating: 5,
      text: "Bitte ersetze die SHEET_CSV_URL in reviews-section.js mit deinem Google Sheets Link. Stelle sicher, dass die Spalten author, book_title, rating, review, date existieren.",
      date: "2024-01-15",
      badge: "Amazon Bestseller"
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
    // Support both full URLs and local filenames
    let avatarSrc = review.avatar;
    
    // If avatar is just a filename (no http), use local path
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
      .filter(r => !r.active || norm(r.active) === "true"); // Only show active reviews
      
      // Sort by date (newest first)
      reviews.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      
      return reviews.length ? reviews : FALLBACK_REVIEWS;
    } catch (err) {
      console.warn("Reviews: CSV load failed, using fallback.", err);
      return FALLBACK_REVIEWS;
    }
  }
  
  let reviews = [...FALLBACK_REVIEWS];
  let index = 0;
  
  const clampIndex = (i) => ((i % reviews.length) + reviews.length) % reviews.length;
  
  function render() {
    if (!reviews.length) return;
    
    const a = reviews[clampIndex(index)];
    const b = reviews[clampIndex(index + 1)];
    const c = reviews[clampIndex(index + 2)];
    
    c1.innerHTML = cardMarkup(a);
    c2.innerHTML = cardMarkup(b);
    c3.innerHTML = cardMarkup(c);
    
    const disabled = reviews.length <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
  }
  
  let isAnimating = false;
  function switchTo(newIndex) {
    if (isAnimating || reviews.length <= 1) return;
    isAnimating = true;
    
    stack.classList.add('is-switching');
    setTimeout(() => {
      index = clampIndex(newIndex);
      render();
      requestAnimationFrame(() => {
        stack.classList.remove('is-switching');
        setTimeout(() => { isAnimating = false; }, 520);
      });
    }, 180);
  }
  
  prevBtn.addEventListener('click', () => switchTo(index - 1));
  nextBtn.addEventListener('click', () => switchTo(index + 1));
  
  // Auto-rotate reviews every 5 seconds
  let autoRotateInterval;
  
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (reviews.length > 1) {
        switchTo(index + 1);
      }
    }, 5000); // 5 seconds
  }
  
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }
  
  // Pause auto-rotate on hover
  stack.addEventListener('mouseenter', stopAutoRotate);
  stack.addEventListener('mouseleave', startAutoRotate);
  
  // Initial render
  render();
  
  // Start auto-rotation
  startAutoRotate();
  
  // Load from Google Sheets
  loadReviewsFromSheet()
    .then((loaded) => {
      reviews = loaded;
      index = 0;
      render();
    })
    .catch((err) => {
      console.warn("Reviews: Failed to load, using fallback.", err);
    });
  
  // Animate header on scroll
  const header = section.querySelector('.reviews-header');
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
}