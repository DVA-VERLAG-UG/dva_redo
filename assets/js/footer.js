// footer.js - Footer functionality

const FOOTER_CONTENT = {
  de: {
    cta:          'Lass uns sprechen',
    nav:          'DVAYD',
    services:     'Leistungen',
    knowledge:    'Wissen',
    contact:      'Kontakt',
    tagline:      'Deutschland \u2194 T\u00fcrkei \u00b7 Pers\u00f6nliche Betreuung \u00b7 100% Autorenrechte',
    privacy:      'Datenschutz',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Impressum',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     'Widerruf',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/de/',                       label: 'Start'         },
      { href: '/de/ueber-uns.html',         label: '\u00dcber uns' },
      { href: '/de/konfigurator-page.html', label: 'Konfigurator'  },
      { href: '/de/kontakt.html',           label: 'Kontakt'       },
      { href: '/de/blog-index.html',        label: 'Blog'          },
    ],
    serviceLinks: [
      'Manuskript-Check',
      'Lektorat & Korrektorat',
      'Cover & Layout',
      'ISBN & Listing',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/de/blog-index.html', label: 'Blog'       },
      { href: '/de/kontakt.html',    label: 'Kontakt'    },
      { href: '/de/impressum.html',  label: 'Impressum'  },
      { href: '/de/agb.html',        label: 'AGB'        },
    ],
  },
  en: {
    cta:          "Let's talk",
    nav:          'DVAYD',
    services:     'Services',
    knowledge:    'Resources',
    contact:      'Contact',
    tagline:      'Germany \u2194 Turkey \u00b7 Personal support \u00b7 100% author rights',
    privacy:      'Privacy Policy',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Imprint',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     'Cancellation Policy',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/en/',                       label: 'Home'          },
      { href: '/en/about.html',             label: 'About Us'      },
      { href: '/en/configurator-page.html', label: 'Configurator'  },
      { href: '/en/contact.html',           label: 'Contact'       },
      { href: '/en/blog-index.html',        label: 'Blog'          },
    ],
    serviceLinks: [
      'Manuscript Review',
      'Editing & Proofreading',
      'Cover & Layout',
      'ISBN & Listing',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/en/blog-index.html', label: 'Blog'    },
      { href: '/en/contact.html',    label: 'Contact' },
      { href: '/de/impressum.html',  label: 'Imprint' },
      { href: '/de/agb.html',        label: 'AGB'     },
    ],
  },
  tr: {
    cta:          'Konu\u015falım',
    nav:          'DVAYD',
    services:     'Hizmetler',
    knowledge:    'Kaynaklar',
    contact:      '\u0130leti\u015fim',
    tagline:      'Almanya \u2194 T\u00fcrkiye \u00b7 Ki\u015fisel destek \u00b7 %100 yazar haklar\u0131',
    privacy:      'Gizlilik Politikas\u0131',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'K\u00fcnye',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     '\u0130ptal Politikas\u0131',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/tr/',                  label: 'Ana Sayfa'             },
      { href: '/tr/hakkimizda.html',   label: 'Hakk\u0131m\u0131zda' },
      { href: '/tr/yapilandirma.html', label: 'Konfigurat\u00f6r'    },
      { href: '/tr/iletisim.html',     label: '\u0130leti\u015fim'   },
      { href: '/tr/blog-index.html',   label: 'Blog'                 },
    ],
    serviceLinks: [
      'El Yazmas\u0131 \u0130ncelemesi',
      'D\u00fczenleme & Redaksiyon',
      'Kapak & Mizanpaj',
      'ISBN & Listeleme',
      'Pazarlama',
    ],
    knowledgeLinks: [
      { href: '/tr/blog-index.html', label: 'Blog'               },
      { href: '/tr/iletisim.html',   label: '\u0130leti\u015fim'  },
      { href: '/de/impressum.html',  label: 'K\u00fcnye'         },
      { href: '/de/agb.html',        label: 'AGB'                },
    ],
  },
  fr: {
    cta:          'Parlons-en',
    nav:          'DVAYD',
    services:     'Services',
    knowledge:    'Ressources',
    contact:      'Contact',
    tagline:      "Allemagne \u2194 Turquie \u00b7 Suivi personnalis\u00e9 \u00b7 100% droits d'auteur",
    privacy:      'Politique de confidentialit\u00e9',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Mentions l\u00e9gales',
    imprintHref:  '/de/impressum.html',
    agb:          'CGV',
    agbHref:      '/de/agb.html',
    widerruf:     'R\u00e9tractation',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/fr/',                   label: 'Accueil'       },
      { href: '/fr/a-propos.html',      label: '\u00c0 propos' },
      { href: '/fr/configuration.html', label: 'Configurateur' },
      { href: '/fr/contact.html',       label: 'Contact'       },
      { href: '/fr/blog-index.html',    label: 'Blog'          },
    ],
    serviceLinks: [
      '\u00c9valuation manuscrit',
      '\u00c9dition & Correction',
      'Couverture & Mise en page',
      'ISBN & R\u00e9f\u00e9rencement',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/fr/blog-index.html', label: 'Blog'                    },
      { href: '/fr/contact.html',    label: 'Contact'                 },
      { href: '/de/impressum.html',  label: 'Mentions l\u00e9gales'  },
      { href: '/de/agb.html',        label: 'CGV'                     },
    ],
  },
};

function getFooterLang() {
  const p = window.location.pathname;
  if (p.startsWith('/en/')) return 'en';
  if (p.startsWith('/tr/')) return 'tr';
  if (p.startsWith('/fr/')) return 'fr';
  return 'de';
}

export function initFooter() {
  const lang = getFooterLang();
  const t    = FOOTER_CONTENT[lang] || FOOTER_CONTENT.de;

  const ctaBtn = document.getElementById('footerConfigBtn');
  if (ctaBtn) ctaBtn.textContent = t.cta;

  const colMain = document.getElementById('footer-col-main');
  if (colMain) {
    colMain.innerHTML = `<div class="dv-ftitle">${t.nav}</div>`
      + t.navLinks.map(l => `<a class="dv-flink" href="${l.href}">${l.label}</a>`).join('');
  }

  // Konfigurator-Button entfernt
  const colServices = document.getElementById('footer-col-services');
  if (colServices) {
    colServices.innerHTML = `<div class="dv-ftitle">${t.services}</div>`
      + t.serviceLinks.map(s => `<span class="dv-flink">${s}</span>`).join('');
  }

  const colKnowledge = document.getElementById('footer-col-knowledge');
  if (colKnowledge) {
    colKnowledge.innerHTML = `<div class="dv-ftitle">${t.knowledge}</div>`
      + t.knowledgeLinks.map(l => `<a class="dv-flink" href="${l.href}">${l.label}</a>`).join('');
  }

  const contactTitle = document.getElementById('footer-contact-title');
  if (contactTitle) contactTitle.textContent = t.contact;

  const tagline = document.getElementById('footer-tagline');
  if (tagline) tagline.textContent = t.tagline;

  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.innerHTML =
      `© ${year} DVAYD`
      + ` · <a href="${t.privacyHref}">${t.privacy}</a>`
      + ` · <a href="${t.imprintHref}">${t.imprint}</a>`
      + ` · <a href="${t.agbHref}">${t.agb}</a>`
      + ` · <a href="${t.widerrufHref}">${t.widerruf}</a>`;
  }

  bindFooterButtons();
  console.log(`✅ Footer initialized (${lang.toUpperCase()})`);
}

function bindFooterButtons() {
  const ids = ['footerConfigBtn', 'footerContactBtn'];

  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (window.ContactPopup) {
        window.ContactPopup.open();
      } else if (window.openContact) {
        window.openContact();
      } else {
        const overlay = document.getElementById('contactOverlay')
                     || document.getElementById('contact-overlay');
        if (overlay) {
          overlay.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  console.log('✅ Footer-Buttons verbunden');
}