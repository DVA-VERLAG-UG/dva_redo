// news-section.js - Latest news/updates from Google Sheets

export function initNews() {
  console.log('📰 Initializing news section...');
  
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4g1gNsiyY4k2A052LR7EaVUYFqrWGWNITOPqw5bGG_PTogiP84C44VQJpKn-HC2vxHin4fTy_puU0/pubhtml?gid=0&single=true";

  const FALLBACK = [
    {
      href: "/de/blog/",
      tag: "Update",
      date: "Gerade eben",
      cover: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70",
      title: "Blog lädt gerade nicht",
      text: "Bitte prüfe ob der Google Sheet Link veröffentlicht ist und ob die Spalten slug,title,excerpt,date,author,cover,tags existieren."
    }
  ];

  const esc = (str) => String(str ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));

  const norm = (s) => String(s ?? "").trim().toLowerCase();

  function splitTags(s){
    return String(s ?? "")
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);
  }

  function parseCSV(text){
    const rows = [];
    let row = [];
    let cur = "";
    let inQuotes = false;

    for(let i=0;i<text.length;i++){
      const c = text[i];
      const n = text[i+1];

      if(inQuotes){
        if(c === '"' && n === '"'){ cur += '"'; i++; }
        else if(c === '"'){ inQuotes = false; }
        else { cur += c; }
      } else {
        if(c === '"'){ inQuotes = true; }
        else if(c === ","){ row.push(cur); cur=""; }
        else if(c === "\n"){ row.push(cur); rows.push(row); row=[]; cur=""; }
        else if(c === "\r"){ /* ignore */ }
        else { cur += c; }
      }
    }
    row.push(cur);
    rows.push(row);
    return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
  }

  async function loadLatest3(){
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if(!res.ok) throw new Error("Blog CSV fetch failed");
    const csv = await res.text();

    const rows = parseCSV(csv);
    if(rows.length < 2) throw new Error("CSV has no data rows");

    const header = rows[0].map(h => norm(h));
    const idx = (name) => header.indexOf(norm(name));
    const val = (r, name) => {
      const i = idx(name);
      return i >= 0 ? String(r[i] ?? "").trim() : "";
    };

    const posts = rows.slice(1).map(r => ({
      slug:    val(r, "slug"),
      title:   val(r, "title"),
      excerpt: val(r, "excerpt") || val(r, "content"),
      date:    val(r, "date"),
      cover:   val(r, "cover"),
      tags:    splitTags(val(r, "tags"))
    }))
    .filter(p => p.slug && p.title);

    posts.sort((a,b) => (b.date || "").localeCompare(a.date || ""));
    const latest = posts.slice(0, 3);
    if(!latest.length) return FALLBACK;

    return latest.map(p => ({
      href: `/de/blog/post.html?slug=${encodeURIComponent(p.slug)}`,
      tag: (p.tags?.[0] || "Update"),
      date: (p.date || ""),
      cover: (p.cover || ""),
      title: (p.title || ""),
      text: (p.excerpt || "")
    }));
  }

  function applyRow(i, item){
    const n = i + 1;

    const link = document.getElementById(`lp${n}Link`);
    const img  = document.getElementById(`lp${n}Img`);
    const date = document.getElementById(`lp${n}Date`);
    const tag  = document.getElementById(`lp${n}Tag`);
    const title= document.getElementById(`lp${n}Title`);
    const text = document.getElementById(`lp${n}Text`);
    const cta  = document.getElementById(`lp${n}Cta`);

    if(!link || !img || !date || !tag || !title || !text || !cta) return;

    const href = item.href || "#";
    link.href = href;
    cta.href = href;

    date.textContent = item.date || "";
    tag.textContent = item.tag || "Update";
    title.textContent = item.title || "";
    text.textContent = item.text || "";

    // Use background-image for easy "cover" styling
    const cover = item.cover ? esc(item.cover) : "";
    img.style.backgroundImage = cover ? `url('${cover}')` : "none";
    img.setAttribute("aria-label", item.title ? esc(item.title) : "");
  }

  // Initial placeholders
  const starter = [...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0,3);
  starter.forEach((it, i) => applyRow(i, it));

  loadLatest3()
    .then(items => {
      const list = [...items, ...FALLBACK, ...FALLBACK].slice(0,3);
      list.forEach((it, i) => applyRow(i, it));
      console.log('✅ News loaded:', items.length, 'posts');
    })
    .catch(err => {
      console.warn("Latest posts load failed, using fallback.", err);
      const list = [...FALLBACK, ...FALLBACK, ...FALLBACK].slice(0,3);
      list.forEach((it, i) => applyRow(i, it));
    });
}