// /assets/js/news-section.js
// Merged: data loading + scroll animation + card clipping — all in one file.
// news-card-clip.js is no longer needed separately.

export function initNews() {
  console.log("📰 initNews() fired");

  const PUB_BASE =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4g1gNsiyY4k2A052LR7EaVUYFqrWGWNITOPqw5bGG_PTogiP84C44VQJpKn-HC2vxHin4fTy_puU0/pub";

  const SHEET_URLS = {
    de: PUB_BASE + "?gid=0&single=true&output=csv",
    en: PUB_BASE + "?gid=536083623&single=true&output=csv",
    tr: PUB_BASE + "?gid=164684917&single=true&output=csv",
    fr: PUB_BASE + "?gid=1855248514&single=true&output=csv",
  };

  const FALLBACK = [
    {
      href: "blog-index.html",
      tag: "Update",
      date: "Gerade eben",
      cover:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70",
      title: "Blog lädt gerade nicht",
      text: "Bitte prüfe ob der Google Sheet Link veröffentlicht ist und ob die Spalten slug,title,excerpt,date,author,cover,tags existieren.",
    },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────

  function getLang() {
    const p = window.location.pathname;
    if (p.startsWith("/en/")) return "en";
    if (p.startsWith("/tr/")) return "tr";
    if (p.startsWith("/fr/")) return "fr";
    return "de";
  }

  const norm = (s) => String(s ?? "").trim().toLowerCase();

  function splitTags(s) {
    return String(s ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  function parseCSV(text) {
    const rows = [];
    let row = [],
      cur = "",
      inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i],
        n = text[i + 1];
      if (inQuotes) {
        if (c === '"' && n === '"') {
          cur += '"';
          i++;
        } else if (c === '"') {
          inQuotes = false;
        } else {
          cur += c;
        }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ",") {
          row.push(cur);
          cur = "";
        } else if (c === "\n") {
          row.push(cur);
          rows.push(row);
          row = [];
          cur = "";
        } else if (c !== "\r") {
          cur += c;
        }
      }
    }
    row.push(cur);
    rows.push(row);
    return rows.filter((r) => r.some((cell) => String(cell).trim() !== ""));
  }

  function setCtaLink(ctaEl, href) {
    if (!ctaEl) return;
    if (ctaEl.tagName === "A") {
      ctaEl.setAttribute("href", href);
      return;
    }
    ctaEl.setAttribute("role", "link");
    ctaEl.style.cursor = "pointer";
    ctaEl.tabIndex = 0;
    ctaEl.onclick = () => (window.location.href = href);
    ctaEl.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = href;
      }
    };
  }

  function applyRow(i, item) {
    const n = i + 1;
    const link  = document.getElementById(`lp${n}Link`);
    const img   = document.getElementById(`lp${n}Img`);
    const date  = document.getElementById(`lp${n}Date`);
    const tag   = document.getElementById(`lp${n}Tag`);
    const title = document.getElementById(`lp${n}Title`);
    const text  = document.getElementById(`lp${n}Text`);
    const cta   = document.getElementById(`lp${n}Cta`);

    if (!link || !img || !date || !tag || !title || !text) {
      console.warn(`🟡 Missing DOM nodes for lp${n}…`);
      return;
    }

    const href = item.href || "#";
    link.setAttribute("href", href);
    date.textContent  = item.date  || "";
    tag.textContent   = item.tag   || "Update";
    title.textContent = item.title || "";
    text.textContent  = item.text  || "";
    img.style.backgroundImage = item.cover ? `url("${item.cover}")` : "none";
    setCtaLink(cta, href);
  }

  // ── CSV / Sheet loading ───────────────────────────────────────────────────

  async function loadLatest4() {
    const lang = getLang();
    const url  = SHEET_URLS[lang];
    console.log(`🔗 Fetching CSV for [${lang}]:`, url);

    const res = await fetch(url, { cache: "no-store" });
    console.log("📡 Response:", res.status, res.statusText);

    const raw = await res.text();
    console.log("📄 First 200 chars:", raw.slice(0, 200));

    if (raw.trim().startsWith("<")) {
      throw new Error("Got HTML instead of CSV. Sheet not published or wrong URL.");
    }

    const rows = parseCSV(raw);
    if (rows.length < 2) throw new Error("CSV has no data rows");

    const header = rows[0].map((h) => norm(h));
    const idx    = (name) => header.indexOf(norm(name));
    const val    = (r, name) => {
      const i = idx(name);
      return i >= 0 ? String(r[i] ?? "").trim() : "";
    };

    const posts = rows
      .slice(1)
      .map((r) => ({
        slug:    val(r, "slug"),
        title:   val(r, "title"),
        excerpt: val(r, "excerpt") || val(r, "content"),
        date:    val(r, "date"),
        cover:   val(r, "cover"),
        tags:    splitTags(val(r, "tags")),
      }))
      .filter((p) => p.slug && p.title);

    console.log(`🧩 Parsed posts [${lang}]:`, posts.length);

    posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const latest = posts.slice(0, 4);
    if (!latest.length) return FALLBACK;

    return latest.map((p) => ({
      href:  `/${lang}/blog/post.html?slug=${encodeURIComponent(p.slug)}`,
      tag:   p.tags?.[0] || "Update",
      date:  p.date || "",
      cover: p.cover
        ? p.cover.split("?")[0] + "?auto=format&fit=crop&w=1200&q=70"
        : "",
      title: p.title || "",
      text:  p.excerpt || "",
    }));
  }

  // ── Scroll animation (enter / stack / exit) ───────────────────────────────

  function initScrollAnimation() {
    const header   = document.querySelector(".news-header");
    const wrappers = document.querySelectorAll(".news-card-wrapper");
    if (!header || !wrappers.length) return;

    // Read the card's CSS `top` value so we stay in sync with the stylesheet.
    function getStickyTop() {
      const firstCard = wrappers[0]?.querySelector(".news-card");
      if (!firstCard) return 340;
      return parseInt(getComputedStyle(firstCard).top, 10) || 340;
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function clamp01(v) {
      return Math.min(Math.max(v, 0), 1);
    }

    function lerp(a, b, t) {
      return a + (b - a) * clamp01(t);
    }

    let cachedStickyTop = getStickyTop();
    window.addEventListener("resize", () => { cachedStickyTop = getStickyTop(); }, { passive: true });

    function update() {
      if (cachedStickyTop <= 0) cachedStickyTop = getStickyTop();

      const headerBottom = header.getBoundingClientRect().bottom;
      const vh           = window.innerHeight;
      const stickyTop    = cachedStickyTop;

      wrappers.forEach((wrapper) => {
        const card = wrapper.querySelector(".news-card");
        if (!card) return;

        const wRect   = wrapper.getBoundingClientRect();
        const cRect   = card.getBoundingClientRect();
        const cardH   = cRect.height;
        const cardTop = cRect.top;

        let scale   = 1.0;
        let opacity = 1.0;

        // ── 1. ENTER from below
        const enterEnd = stickyTop + 40;
        if (cardTop > enterEnd) {
          const t     = 1 - (cardTop - enterEnd) / (vh - enterEnd);
          const eased = easeInOutCubic(clamp01(t));
          scale   = lerp(1.06, 1.0, eased);
          opacity = lerp(0.4,  1.0, eased);
        }

        // ── 2. Stacking compression (very subtle)
        const wrapperScrolled = 1 - wRect.bottom / (wRect.height + vh);
        const stackCompress   = lerp(0, 0.018, clamp01(wrapperScrolled));
        scale -= stackCompress;

        // ── 3. EXIT behind header  (clip-path + slight scale bump)
        const overlap = headerBottom - cardTop;

        // A card exits only once it has actually been in its sticky position
        // (its wrapper top is above the mid-viewport).
        const hasBeenSticky = wRect.top < vh * 0.5;

        if (overlap > 0 && hasBeenSticky) {
          const exitT = easeInOutCubic(clamp01((overlap / cardH) * 1.4));
          scale = lerp(1.0 - stackCompress, 1.03, exitT);

          const clipPct = clamp01(overlap / cardH) * 100;
          card.style.clipPath =
            clipPct >= 100
              ? "inset(100% 0 0 0)"
              : `inset(${clipPct.toFixed(2)}% 0 0 0 round 18px)`;
        } else {
          card.style.clipPath = "none";
        }

        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.opacity   = opacity.toFixed(4);
      });
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update,   { passive: true });
    update();
  }

  // ── Boot ─────────────────────────────────────────────────────────────────

  // Show fallback cards immediately, then swap in real data.
  const placeholder = [...FALLBACK, ...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0, 4);
  placeholder.forEach((it, i) => applyRow(i, it));

  loadLatest4()
    .then((items) => {
      console.log("✅ Using items:", items);
      const list = [...items, ...FALLBACK, ...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0, 4);
      list.forEach((it, i) => applyRow(i, it));
    })
    .catch((err) => {
      console.error("❌ News load failed:", err);
      placeholder.forEach((it, i) => applyRow(i, it));
    });

  // Init animation after first paint.
  requestAnimationFrame(() => initScrollAnimation());
}