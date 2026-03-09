/* ==========================================
   SEARCH HIGHLIGHT + SCROLL + PREFILL
   - Liest ?q= aus URL
   - Füllt Suchleiste mit dem Suchbegriff vor
   - Markiert alle Treffer in <main> in Bronze
   - Springt zum #anchor (Abschnitt) oder erstem Treffer
   - Bereinigt ?q= aus URL nach dem Highlight
   ========================================== */
(function () {
  const params = new URLSearchParams(window.location.search);
  const query  = (params.get('q') || '').trim();
  if (!query) return;

  const CLS = 'search-highlight';

  // ── 1. CSS injizieren ──────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .${CLS} {
      background: rgba(176, 141, 87, 0.32);
      border-radius: 3px;
      padding: 0 2px;
      box-shadow: 0 0 0 1px rgba(176, 141, 87, 0.55);
      font-weight: inherit;
      color: inherit;
    }
    html[data-theme="dim"] .${CLS} {
      background: rgba(176, 141, 87, 0.42);
      box-shadow: 0 0 0 1px rgba(176, 141, 87, 0.75);
    }
    /* Inline-Match im Dropdown-Titel */
    .sh-match {
      color: #B08D57;
      font-style: normal;
      font-weight: 700;
    }
    /* Abschnitt-Aufleuchten beim Landen */
    .search-section-flash {
      animation: sectionFlash 1.6s ease forwards;
      border-radius: 12px;
    }
    @keyframes sectionFlash {
      0%   { background: rgba(176, 141, 87, 0.14); }
      60%  { background: rgba(176, 141, 87, 0.10); }
      100% { background: transparent; }
    }
  `;
  document.head.appendChild(style);

  // ── 2. Suchleiste vorausfüllen ─────────────────────────
  // Läuft sofort + nochmal nach DOMContentLoaded (falls Header
  // noch nicht geladen ist, weil er per fetch() injiziert wird)
  function prefillSearch() {
    const input = document.getElementById('headerSearchInput');
    if (input && !input.value) {
      input.value = query;
    }
  }
  prefillSearch();
  document.addEventListener('DOMContentLoaded', prefillSearch);
  // Nochmal nach kurzer Verzögerung für dynamisch geladenen Header
  setTimeout(prefillSearch, 600);

  // ── 3. Highlight + Scroll ──────────────────────────────
  function run() {
    const words = query.split(/\s+/).filter(Boolean);
    const regex = new RegExp(
      `(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );

    const root = document.querySelector('main') || document.body;

    // TreeWalker: alle TextNodes die den Begriff enthalten
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT','STYLE','INPUT','TEXTAREA','SELECT','NOSCRIPT'].includes(p.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest(`.${CLS}`)) return NodeFilter.FILTER_REJECT;
        return regex.test(node.textContent)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      }
    });

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(textNode => {
      regex.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let last = 0, m;
      const text = textNode.textContent;
      while ((m = regex.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mark = document.createElement('mark');
        mark.className = CLS;
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = regex.lastIndex;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });

    // ── 4. Scrollen ────────────────────────────────────────
    // Prio 1: Hash-Anker (#section-id) aus URL → zum Abschnitt
    // Prio 2: Erstes <mark> Element
    const anchorId = window.location.hash?.slice(1);
    const anchor   = anchorId ? document.getElementById(anchorId) : null;
    const firstMark = document.querySelector(`.${CLS}`);
    const target   = anchor || firstMark;

    if (target) {
      setTimeout(() => {
        // Header-Höhe berücksichtigen (Header ist fixed, 72px Desktop / 60px Mobile)
        const headerH = document.getElementById('site-header')?.offsetHeight || 80;
        const rect    = target.getBoundingClientRect();
        const top     = rect.top + window.scrollY - headerH - 32;

        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

        // Abschnitt kurz aufleuchten lassen
        if (anchor) {
          anchor.classList.add('search-section-flash');
          anchor.addEventListener('animationend', () => {
            anchor.classList.remove('search-section-flash');
          }, { once: true });
        }
      }, 400);
    }

    // ── 5. URL bereinigen (?q= weg, Hash bleibt) ──────────
    const clean = new URL(window.location.href);
    clean.searchParams.delete('q');
    // Hash behalten damit Browser-Back funktioniert
    history.replaceState(null, '', clean.pathname + clean.search + (window.location.hash || ''));
  }

  // Warten bis DOM + dynamischer Footer geladen
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(run, 150));
  } else {
    setTimeout(run, 150);
  }
})();