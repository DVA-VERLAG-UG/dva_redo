// footer.js - Footer functionality

const FOOTER_CONTENT = {
  de: {
    cta:          'Lass uns sprechen',
    nav:          'DVAYD',
    services:     'Leistungen',
    knowledge:    'Wissen',
    contact:      'Kontakt',
    tagline:      'Deutschland \u2194 T\u00fcrkei \u00b7 Pers\u00f6nliche Betreuung \u00b7 100% Autorenrechte',
    configurator: 'Konfigurator',
    privacy:      'Datenschutz',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Impressum',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     'Widerruf',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/de/',               label: 'Start'         },
      { href: '/de/ueber-uns.html', label: '\u00dcber uns' },
      { href: '/de/projekte.html',  label: 'Projekte'      },
      { href: '/de/pakete.html',    label: 'Pakete'        },
      { href: '/de/kontakt.html',   label: 'Kontakt'       },
    ],
    serviceLinks: [
      'Manuskript-Check',
      'Lektorat & Korrektorat',
      'Cover & Layout',
      'ISBN & Listing',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/de/blog/',          label: 'Blog'       },
      { href: '/de/faq/',           label: 'FAQ'        },
      { href: '/de/prozess/',       label: 'Ablauf'     },
      { href: '/de/projekte.html',  label: 'Referenzen' },
    ],
  },
  en: {
    cta:          "Let's talk",
    nav:          'DVAYD',
    services:     'Services',
    knowledge:    'Resources',
    contact:      'Contact',
    tagline:      'Germany \u2194 Turkey \u00b7 Personal support \u00b7 100% author rights',
    configurator: 'Configurator',
    privacy:      'Privacy Policy',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Imprint',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     'Cancellation Policy',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/en/',               label: 'Home'      },
      { href: '/en/about.html',     label: 'About Us'  },
      { href: '/en/projects.html',  label: 'Projects'  },
      { href: '/en/packages.html',  label: 'Packages'  },
      { href: '/en/contact.html',   label: 'Contact'   },
    ],
    serviceLinks: [
      'Manuscript Review',
      'Editing & Proofreading',
      'Cover & Layout',
      'ISBN & Listing',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/en/blog/',          label: 'Blog'       },
      { href: '/en/faq/',           label: 'FAQ'        },
      { href: '/en/process/',       label: 'Process'    },
      { href: '/en/projects.html',  label: 'References' },
    ],
  },
  tr: {
    cta:          'Konu\u015falım',
    nav:          'DVAYD',
    services:     'Hizmetler',
    knowledge:    'Kaynaklar',
    contact:      '\u0130leti\u015fim',
    tagline:      'Almanya \u2194 T\u00fcrkiye \u00b7 Ki\u015fisel destek \u00b7 %100 yazar haklar\u0131',
    configurator: 'Konfigurat\u00f6r',
    privacy:      'Gizlilik Politikas\u0131',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'K\u00fcnye',
    imprintHref:  '/de/impressum.html',
    agb:          'AGB',
    agbHref:      '/de/agb.html',
    widerruf:     'İptal Politikası',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/tr/',                label: 'Ana Sayfa'               },
      { href: '/tr/hakkimizda.html', label: 'Hakk\u0131m\u0131zda'   },
      { href: '/tr/projeler.html',   label: 'Projeler'                },
      { href: '/tr/paketler.html',   label: 'Paketler'                },
      { href: '/tr/iletisim.html',   label: '\u0130leti\u015fim'      },
    ],
    serviceLinks: [
      'El Yazmas\u0131 \u0130ncelemesi',
      'D\u00fczenleme & Redaksiyon',
      'Kapak & Mizanpaj',
      'ISBN & Listeleme',
      'Pazarlama',
    ],
    knowledgeLinks: [
      { href: '/tr/blog/',           label: 'Blog'              },
      { href: '/tr/faq/',            label: 'SSS'               },
      { href: '/tr/surec/',          label: 'S\u00fcre\u00e7'  },
      { href: '/tr/projeler.html',   label: 'Referanslar'       },
    ],
  },
  fr: {
    cta:          'Parlons-en',
    nav:          'DVAYD',
    services:     'Services',
    knowledge:    'Ressources',
    contact:      'Contact',
    tagline:      "Allemagne \u2194 Turquie \u00b7 Suivi personnalis\u00e9 \u00b7 100% droits d'auteur",
    configurator: 'Configurateur',
    privacy:      'Politique de confidentialit\u00e9',
    privacyHref:  '/de/datenschutzerklarung.html',
    imprint:      'Mentions l\u00e9gales',
    imprintHref:  '/de/impressum.html',
    agb:          'CGV',
    agbHref:      '/de/agb.html',
    widerruf:     'R\u00e9tractation',
    widerrufHref: '/de/widerrufsbelehrung.html',
    navLinks: [
      { href: '/fr/',               label: 'Accueil'       },
      { href: '/fr/a-propos.html',  label: '\u00c0 propos' },
      { href: '/fr/projets.html',   label: 'Projets'       },
      { href: '/fr/forfaits.html',  label: 'Forfaits'      },
      { href: '/fr/contact.html',   label: 'Contact'       },
    ],
    serviceLinks: [
      '\u00c9valuation manuscrit',
      '\u00c9dition & Correction',
      'Couverture & Mise en page',
      'ISBN & R\u00e9f\u00e9rencement',
      'Marketing',
    ],
    knowledgeLinks: [
      { href: '/fr/blog/',          label: 'Blog'                  },
      { href: '/fr/faq/',           label: 'FAQ'                   },
      { href: '/fr/processus/',     label: 'Processus'             },
      { href: '/fr/projets.html',   label: 'R\u00e9f\u00e9rences' },
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

  // CTA button
  const ctaBtn = document.getElementById('footerConfigBtn');
  if (ctaBtn) ctaBtn.textContent = t.cta;

  // Col 1: Nav links
  const colMain = document.getElementById('footer-col-main');
  if (colMain) {
    colMain.innerHTML = `<div class="dv-ftitle">${t.nav}</div>`
      + t.navLinks.map(l => `<a class="dv-flink" href="${l.href}">${l.label}</a>`).join('');
  }

  // Col 2: Services
  const colServices = document.getElementById('footer-col-services');
  if (colServices) {
    colServices.innerHTML = `<div class="dv-ftitle">${t.services}</div>`
      + `<button class="dv-flink footer-config-btn" id="footerConfiguratorBtn" type="button"
           style="background:none;border:none;cursor:pointer;text-align:left;padding:6px 0;width:100%;">
           ${t.configurator}
         </button>`
      + t.serviceLinks.map(s => `<span class="dv-flink">${s}</span>`).join('');
  }

  // Col 3: Knowledge
  const colKnowledge = document.getElementById('footer-col-knowledge');
  if (colKnowledge) {
    colKnowledge.innerHTML = `<div class="dv-ftitle">${t.knowledge}</div>`
      + t.knowledgeLinks.map(l => `<a class="dv-flink" href="${l.href}">${l.label}</a>`).join('');
  }

  // Contact column
  const contactTitle = document.getElementById('footer-contact-title');
  if (contactTitle) contactTitle.textContent = t.contact;

  const tagline = document.getElementById('footer-tagline');
  if (tagline) tagline.textContent = t.tagline;

  // Bottom bar — year + alle 4 Legal-Links
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
  const ids = ['footerConfigBtn', 'footerContactBtn', 'footerConfiguratorBtn'];

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