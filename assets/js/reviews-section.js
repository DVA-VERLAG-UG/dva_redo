// reviews-section.js - Native horizontal scrolling with Google Sheets (multilingual)

export function initReviews() {
  console.log('⭐ Initializing reviews section...');
  
  const section = document.querySelector('.reviews-section');
  if (!section) {
    console.warn('Reviews section not found');
    return;
  }
  
  initReviewsCarousel();
  
  console.log('✅ Reviews section initialized');
}

function initReviewsCarousel() {
  const stack   = document.getElementById('reviewsStack');
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

  // ── Per-language Sheet URLs ──────────────────────────────────────────────
  const PUB_BASE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRfz-kgH7uOy4miA8uCWcsGkWH6g5ZJedSxk5SxFSD_nCGLRqjjbAvI25-OhrsDXu2x6kNuMTGuygR/pub";
  const SHEET_URLS = {
    de: PUB_BASE + "?gid=0&single=true&output=csv",
    en: PUB_BASE + "?gid=2114324987&single=true&output=csv",
    tr: PUB_BASE + "?gid=1559604986&single=true&output=csv",
    fr: PUB_BASE + "?gid=772301406&single=true&output=csv",
  };

  function getLang() {
    const p = window.location.pathname;
    if (p.startsWith('/en/')) return 'en';
    if (p.startsWith('/tr/')) return 'tr';
    if (p.startsWith('/fr/')) return 'fr';
    return 'de';
  }

  // ── Fallback reviews ─────────────────────────────────────────────────────
  const FALLBACK_REVIEWS = [
    { author: "Sarah Klein",    bookTitle: "Die verlorene Zeit",    rating: 5, text: "DVAYD hat meinen Traum wahr gemacht. Innerhalb von 3 Monaten war mein Buch auf Amazon verfügbar.", date: "2024-02-20", badge: "Bestseller" },
    { author: "Michael Bauer",  bookTitle: "Zwischen zwei Welten",  rating: 5, text: "Transparente Preise, schnelle Umsetzung und ein Team das wirklich versteht was Autoren brauchen.", date: "2024-03-10", badge: "Verifiziert" },
    { author: "Anna Lehmann",   bookTitle: "Stille Schatten",       rating: 5, text: "Von der ersten Beratung bis zur Veröffentlichung fühlte ich mich bestens betreut.", date: "2024-04-05", badge: "Top-Rated" },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  const esc  = (s) => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  const norm = (s) => String(s ?? "").trim().toLowerCase();

  function parseCSV(text) {
    const rows = [];
    let row = [], cur = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i+1];
      if (inQuotes) {
        if (c === '"' && n === '"') { cur += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { cur += c; }
      } else {
        if (c === '"') { inQuotes = true; }
        else if (c === ',') { row.push(cur); cur = ""; }
        else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ""; }
        else if (c !== '\r') { cur += c; }
      }
    }
    row.push(cur); rows.push(row);
    return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
  }

  function getInitials(name) {
    return String(name ?? "?").split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function renderStars(rating) {
    return Array.from({length: 5}, (_, i) => i < rating ? '★' : '☆').join('');
  }

  function cardMarkup(review) {
    let avatarSrc = review.avatar;
    if (avatarSrc && !avatarSrc.startsWith('http')) {
      avatarSrc = `../assets/images/profiles/${avatarSrc}`;
    }
    const avatarContent = avatarSrc
      ? `<img src="${esc(avatarSrc)}" alt="${esc(review.author)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
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
      <div class="review-text">"${esc(review.text)}"</div>
      <div class="review-meta">
        <span>${esc(review.date)}</span>
        ${review.badge ? `<span class="review-badge"><span class="review-dot"></span>${esc(review.badge)}</span>` : ''}
      </div>`;
  }

  async function loadReviewsFromSheet() {
    const lang = getLang();
    const url  = SHEET_URLS[lang];
    console.log(`⭐ Fetching reviews [${lang}]:`, url);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Reviews CSV fetch failed: " + res.status);
    const csv = await res.text();

    if (csv.trim().startsWith('<')) throw new Error("Got HTML instead of CSV");

    const rows = parseCSV(csv);
    if (rows.length < 2) throw new Error("CSV has no data rows");

    const header = rows[0].map(h => norm(h));
    const idx = (name) => header.indexOf(norm(name));
    const val = (r, name) => { const i = idx(name); return i >= 0 ? String(r[i] ?? "").trim() : ""; };

    const reviews = rows.slice(1)
      .map(r => ({
        author:    val(r, "author"),
        bookTitle: val(r, "booktitle") || val(r, "book_title"),
        rating:    parseInt(val(r, "rating")) || 5,
        text:      val(r, "review") || val(r, "text"),
        date:      val(r, "date"),
        badge:     val(r, "badge") || val(r, "achievement"),
        active:    val(r, "active"),
        avatar:    val(r, "avatar") || val(r, "photo") || val(r, "image"),
      }))
      .filter(r => r.author && r.text)
      .filter(r => !r.active || norm(r.active) === "true");

    reviews.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return reviews.length ? reviews : FALLBACK_REVIEWS;
  }

  // ── Render ────────────────────────────────────────────────────────────────
  let reviews = [...FALLBACK_REVIEWS];

  function renderAllCards() {
    if (!reviews.length) return;
    [c1, c2, c3].forEach((card, i) => {
      if (card) card.innerHTML = cardMarkup(reviews[i] || reviews[0]);
    });
    // Extra cards
    for (let i = 3; i < Math.min(reviews.length, 10); i++) {
      let card = document.getElementById(`reviewCard${i+1}`);
      if (!card) {
        card = document.createElement('div');
        card.className = 'review-card';
        card.id = `reviewCard${i+1}`;
        stack.appendChild(card);
      }
      card.innerHTML = cardMarkup(reviews[i]);
    }
  }

  // ── Dots ──────────────────────────────────────────────────────────────────
  function createDots() {
    let dotsContainer = document.querySelector('.reviews-dots');
    if (!dotsContainer) {
      dotsContainer = document.createElement('div');
      dotsContainer.className = 'reviews-dots';
      stack.parentElement.appendChild(dotsContainer);
    }
    dotsContainer.innerHTML = '';
    const visibleCards = window.innerWidth > 1024 ? 2 : 1;
    const totalPages   = Math.max(1, reviews.length - visibleCards + 1);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className   = 'reviews-dot';
      dot.dataset.page = i;
      dot.addEventListener('click', () => {
        const cardWidth = c1.offsetWidth + 30;
        stack.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots      = document.querySelectorAll('.reviews-dot');
    const cardWidth = c1.offsetWidth + 30;
    const current   = Math.round(stack.scrollLeft / cardWidth);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  // ── Progress / nav ────────────────────────────────────────────────────────
  function updateProgress() {
    const scrollLeft  = stack.scrollLeft;
    const scrollWidth = stack.scrollWidth - stack.clientWidth;
    const progress    = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    if (progressFill) progressFill.style.width = `${progress}%`;
    const cardWidth   = c1.offsetWidth + 30;
    const currentCard = Math.round(scrollLeft / cardWidth) + 1;
    if (progressText) progressText.textContent = `${Math.min(currentCard, reviews.length)} / ${reviews.length}`;
    prevBtn.disabled  = scrollLeft <= 0;
    nextBtn.disabled  = scrollLeft >= scrollWidth - 5;
    updateDots();
  }

  prevBtn.addEventListener('click', () => {
    const cw = c1.offsetWidth + 30;
    stack.scrollTo({ left: Math.max(0, stack.scrollLeft - cw), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    const cw  = c1.offsetWidth + 30;
    const max = stack.scrollWidth - stack.clientWidth;
    stack.scrollTo({ left: Math.min(max, stack.scrollLeft + cw), behavior: 'smooth' });
  });
  stack.addEventListener('scroll', updateProgress);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { createDots(); updateProgress(); }, 250);
  });

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  let autoScrollTimer, isUserScrolling = false;
  function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
      if (isUserScrolling) return;
      const cw  = c1.offsetWidth + 30;
      const max = stack.scrollWidth - stack.clientWidth;
      stack.scrollTo({ left: stack.scrollLeft >= max - 5 ? 0 : stack.scrollLeft + cw, behavior: 'smooth' });
    }, 8000);
  }
  stack.addEventListener('mouseenter', () => { isUserScrolling = true;  clearInterval(autoScrollTimer); });
  stack.addEventListener('mouseleave', () => { isUserScrolling = false; startAutoScroll(); });
  stack.addEventListener('touchstart', () => { isUserScrolling = true;  clearInterval(autoScrollTimer); });

  // ── Init ──────────────────────────────────────────────────────────────────
  renderAllCards();
  createDots();
  updateProgress();
  startAutoScroll();

  loadReviewsFromSheet()
    .then(loaded => {
      reviews = loaded;
      renderAllCards();
      createDots();
      updateProgress();
    })
    .catch(err => console.warn("Reviews: Failed to load, using fallback.", err));
}