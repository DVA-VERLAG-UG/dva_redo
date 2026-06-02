// ─────────────────────────────────────────────────────────────────────────────
//  TEAM DATA  —  hier Text, Rolle und Foto pro Person eintragen
//
//  photo:
//    Bildpfad relativ zur HTML-Seite, z.B.:
//    '../assets/images/about/team/bihter.jpg'
//    Leer lassen ('') = Silhouetten-Platzhalter wird angezeigt.
//
//  role / bio:
//    Pro Sprache ein eigener Text (de / en / tr / fr).
//    Fehlt eine Übersetzung, wird automatisch 'de' als Fallback genutzt.
//    HTML ist erlaubt (z.B. <br>, <strong>).
//
//  id: NICHT ändern — verknüpft den Eintrag mit der Karte auf der Seite.
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM = [
  {
    id:    'bihter-sahin',
    name:  'Bihter Şahin',
    photo: '',  // ← z.B. '../assets/images/about/team/bihter.jpg'
    role: {
      de: 'Inhaberin · Allgemeine Koordinatorin',
      en: 'Owner · General Coordinator',
      tr: 'Sahibi · Genel Koordinatör',
      fr: 'Propriétaire · Coordinatrice Générale',
    },
    bio: {
      de: 'Hier kommt der Text über Bihter Şahin auf Deutsch.',
      en: 'Text about Bihter Şahin in English.',
      tr: 'Bihter Şahin hakkında Türkçe metin.',
      fr: 'Texte sur Bihter Şahin en français.',
    },
  },
  {
    id:    'busra-sahin',
    name:  'Büşra Şahin',
    photo: '',
    role: {
      de: 'Chefredakteurin',
      en: 'Editor-in-Chief',
      tr: 'Genel Yayın Yönetmeni',
      fr: 'Rédactrice en Chef',
    },
    bio: {
      de: 'Hier kommt der Text über Büşra Şahin auf Deutsch.',
      en: 'Text about Büşra Şahin in English.',
      tr: 'Büşra Şahin hakkında Türkçe metin.',
      fr: 'Texte sur Büşra Şahin en français.',
    },
  },
  {
    id:    'bilgehan-pullukcu',
    name:  'Bilgehan Pullukcu',
    photo: '',
    role: {
      de: 'Verlagskoordination & Autorenmanagement',
      en: 'Publishing Coordination & Author Management',
      tr: 'Yayın Koordinasyonu & Yazar Yönetimi',
      fr: 'Coordination Éditoriale & Gestion des Auteurs',
    },
    bio: {
      de: 'Hier kommt der Text über Bilgehan Pullukcu auf Deutsch.',
      en: 'Text about Bilgehan Pullukcu in English.',
      tr: 'Bilgehan Pullukcu hakkında Türkçe metin.',
      fr: 'Texte sur Bilgehan Pullukcu en français.',
    },
  },
  {
    id:    'sibel-caglar',
    name:  'Sibel Çağlar',
    photo: '',
    role: {
      de: 'Autorenberaterin',
      en: 'Author Consultant',
      tr: 'Yazar Danışmanı',
      fr: 'Conseillère Auteurs',
    },
    bio: {
      de: 'Hier kommt der Text über Sibel Çağlar auf Deutsch.',
      en: 'Text about Sibel Çağlar in English.',
      tr: 'Sibel Çağlar hakkında Türkçe metin.',
      fr: 'Texte sur Sibel Çağlar en français.',
    },
  },
  {
    id:    'nilay-karaduman',
    name:  'Nilay Karaduman',
    photo: '',
    role: {
      de: 'Autorenberaterin · Content & Social Media Managerin',
      en: 'Author Consultant · Content & Social Media Manager',
      tr: 'Yazar Danışmanı · İçerik & Sosyal Medya Yöneticisi',
      fr: 'Conseillère Auteurs · Responsable Contenu & Réseaux Sociaux',
    },
    bio: {
      de: 'Hier kommt der Text über Nilay Karaduman auf Deutsch.',
      en: 'Text about Nilay Karaduman in English.',
      tr: 'Nilay Karaduman hakkında Türkçe metin.',
      fr: 'Texte sur Nilay Karaduman en français.',
    },
  },
  {
    id:    'erinc-sahin',
    name:  'Erinc Şahin',
    photo: '',
    role: {
      de: 'Content & Social Media Manager',
      en: 'Content & Social Media Manager',
      tr: 'İçerik & Sosyal Medya Yöneticisi',
      fr: 'Responsable Contenu & Réseaux Sociaux',
    },
    bio: {
      de: 'Hier kommt der Text über Erinc Şahin auf Deutsch.',
      en: 'Text about Erinc Şahin in English.',
      tr: 'Erinc Şahin hakkında Türkçe metin.',
      fr: 'Texte sur Erinc Şahin en français.',
    },
  },
  {
    id:    'nese-siyamoglu',
    name:  'Neşe Siyamoğlu',
    photo: '',
    role: {
      de: 'Lektorat & Verlagsgestaltung',
      en: 'Editing & Publishing Design',
      tr: 'Redaksiyon & Yayın Tasarımı',
      fr: 'Édition & Mise en Page',
    },
    bio: {
      de: 'Hier kommt der Text über Neşe Siyamoğlu auf Deutsch.',
      en: 'Text about Neşe Siyamoğlu in English.',
      tr: 'Neşe Siyamoğlu hakkında Türkçe metin.',
      fr: 'Texte sur Neşe Siyamoğlu en français.',
    },
  },
  {
    id:    'zekeriya-avci',
    name:  'Zekeriya Avcı',
    photo: '',
    role: {
      de: 'Finanz- & Buchhaltungskoordination',
      en: 'Finance & Accounting Coordination',
      tr: 'Finans & Muhasebe Koordinasyonu',
      fr: 'Coordination Finance & Comptabilité',
    },
    bio: {
      de: 'Hier kommt der Text über Zekeriya Avcı auf Deutsch.',
      en: 'Text about Zekeriya Avcı in English.',
      tr: 'Zekeriya Avcı hakkında Türkçe metin.',
      fr: 'Texte sur Zekeriya Avcı en français.',
    },
  },
  {
    id:    'arzu-ozen-cakir',
    name:  'Arzu Özen Çakır',
    photo: '',
    role: {
      de: 'Finanzen & Buchhaltung',
      en: 'Finance & Accounting',
      tr: 'Finans & Muhasebe',
      fr: 'Finance & Comptabilité',
    },
    bio: {
      de: 'Hier kommt der Text über Arzu Özen Çakır auf Deutsch.',
      en: 'Text about Arzu Özen Çakır in English.',
      tr: 'Arzu Özen Çakır hakkında Türkçe metin.',
      fr: 'Texte sur Arzu Özen Çakır en français.',
    },
  },
];
