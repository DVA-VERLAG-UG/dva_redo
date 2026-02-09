// /assets/js/news-section.js

export function initNews() {
  console.log("📰 initNews() fired");

  // ✅ IMPORTANT: must be the CSV endpoint (not pubhtml)
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4g1gNsiyY4k2A052LR7EaVUYFqrWGWNITOPqw5bGG_PTogiP84C44VQJpKn-HC2vxHin4fTy_puU0/pub?gid=0&single=true&output=csv";

  const FALLBACK = [
    {
      href: "blog-index.html", 
      tag: "Update",
      date: "Gerade eben",
      cover:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70",
      title: "Blog lädt gerade nicht",
      text:
        "Bitte prüfe ob der Google Sheet Link veröffentlicht ist und ob die Spalten slug,title,excerpt,date,author,cover,tags existieren."
    }
  ];

  const norm = (s) => String(s ?? "").trim().toLowerCase();

  function splitTags(s) {
    return String(s ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

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
        if (c === '"') inQuotes = true;
        else if (c === ",") { row.push(cur); cur = ""; }
        else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
        else if (c === "\r") { /* ignore */ }
        else { cur += c; }
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

    const link = document.getElementById(`lp${n}Link`);
    const img  = document.getElementById(`lp${n}Img`);
    const date = document.getElementById(`lp${n}Date`);
    const tag  = document.getElementById(`lp${n}Tag`);
    const title= document.getElementById(`lp${n}Title`);
    const text = document.getElementById(`lp${n}Text`);
    const cta  = document.getElementById(`lp${n}Cta`);

    if (!link || !img || !date || !tag || !title || !text) {
      console.warn(`🟡 Missing DOM nodes for lp${n}...`);
      return;
    }

    const href = item.href || "#";
    link.setAttribute("href", href);

    date.textContent  = item.date || "";
    tag.textContent   = item.tag || "Update";
    title.textContent = item.title || "";
    text.textContent  = item.text || "";

    const cover = item.cover || "";
    img.style.backgroundImage = cover ? `url("${cover}")` : "none";

    setCtaLink(cta, href);
  }

  async function loadLatest4() {
    console.log("🔗 Fetching CSV:", SHEET_CSV_URL);

    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    console.log("📡 Response:", res.status, res.statusText, "type:", res.type);

    const raw = await res.text();
    console.log("📄 First 200 chars:", raw.slice(0, 200));

    // If Google returns HTML (error/login page), we detect it
    if (raw.trim().startsWith("<")) {
      throw new Error("Got HTML instead of CSV. Sheet not published or wrong URL.");
    }

    const rows = parseCSV(raw);
    console.log("🧾 Rows:", rows.length);

    if (rows.length < 2) throw new Error("CSV has no data rows");

    const header = rows[0].map((h) => norm(h));
    console.log("🏷️ Header:", header);

    const idx = (name) => header.indexOf(norm(name));
    const val = (r, name) => {
      const i = idx(name);
      return i >= 0 ? String(r[i] ?? "").trim() : "";
    };

    const posts = rows.slice(1)
      .map((r) => ({
        slug:    val(r, "slug"),
        title:   val(r, "title"),
        excerpt: val(r, "excerpt") || val(r, "content"),
        date:    val(r, "date"),
        cover:   val(r, "cover"),
        tags:    splitTags(val(r, "tags")),
      }))
      .filter((p) => p.slug && p.title);

    console.log("🧩 Parsed posts:", posts.length);

    posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const latest = posts.slice(0, 4);
    if (!latest.length) return FALLBACK;

    return latest.map((p) => ({
      href: `post.html?slug=${encodeURIComponent(p.slug)}`,
      tag: p.tags?.[0] || "Update",
      date: p.date || "",
      cover: p.cover || "",
      title: p.title || "",
      text: p.excerpt || "",
    }));
  }

  // placeholders first (4 cards now)
  const starter = [...FALLBACK, ...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0, 4);
  starter.forEach((it, i) => applyRow(i, it));

  loadLatest4()
    .then((items) => {
      console.log("✅ Using items:", items);
      const list = [...items, ...FALLBACK, ...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0, 4);
      list.forEach((it, i) => applyRow(i, it));
    })
    .catch((err) => {
      console.error("❌ News load failed:", err);
      const list = [...FALLBACK, ...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0, 4);
      list.forEach((it, i) => applyRow(i, it));
    });
}