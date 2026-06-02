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
    photo: '../assets/images/about/bilge.png',
    role: {
      de: 'Autorenmanagement & Verlagskoordination',
      en: 'Author Management & Publishing Coordination',
      tr: 'Yazar Yönetimi & Yayın Koordinasyonu',
      fr: 'Gestion des Auteurs & Coordination Éditoriale',
    },
    bio: {
      de: `Ich bin Bilgehan.<br><br>
Ich bin ruhig. Aber Ruhe bedeutet für mich keine Distanz — ganz im Gegenteil, es ist ein Innehalten, um besser zuhören zu können. Ich vertraue meiner Intuition. Ich spüre oft ohne Worte, wo ein Autor feststeckt, wo sein Mut gebrochen ist, wo er einfach nur eine kurze Pause braucht.<br><br>
Auf dem langen Weg von der Idee zum Buch bin ich an der Seite unserer Autoren. Damit sie vorankommen können — ohne sich zu verlieren, ohne den Faden zu verlieren, ohne den Mut zu verlieren. Wenn die meisten Menschen „Koordination" hören, denken sie an Prozesse — bei mir denke ich an Menschen.<br><br>
Es war eine unserer wertvollen Autorinnen, die mich zu dieser Familie gebracht hat. In jenem Moment verstand ich: wie offen mein Herz für neue Geschichten ist, und wo ich mich am stärksten fühle. Deshalb bin ich hier.<br><br>
Wenn ich nicht arbeite, verbringe ich Zeit mit meinem Sohn und meiner Tochter. Jeder Moment mit ihnen erinnert mich daran: Die wertvollsten Dinge wachsen ohne Eile.<br><br>
Wenn ein Autor zu uns kommt, möchte ich ihn so empfangen: ruhig, herzlich, sicher. Als würde man sagen: „Du bist nicht zu spät — wir können von hier aus anfangen." Es spielt keine Rolle, in welchem Stadium dein Manuskript ist. Ich bin schon da.`,
      en: `I'm Bilgehan.<br><br>
I'm calm. But calmness, for me, isn't distance — it's the opposite: turning inward to listen more deeply. I trust my intuition. I often sense without words where an author is stuck, where their confidence has broken, where they simply need a moment to breathe.<br><br>
On the long road from idea to book, I walk alongside our authors. So they can move forward — without falling apart, without losing their way, without losing their courage. When most people hear "coordination," they think of processes — for me, it brings people to mind.<br><br>
It was one of our cherished authors who brought me to this family — someone who brought their own story to our publishing house. In that moment I understood: how open my heart is to new stories, and where I feel strongest. That's why I'm here.<br><br>
When I'm not working, I spend time with my son and daughter. Every moment with them reminds me: the most precious things grow without hurry.<br><br>
When an author comes to us, I want to welcome them like this: unhurried, warm, safe. As if to say: "You haven't arrived too late — we can start from right here." It doesn't matter what stage your manuscript is at. I'm already there.`,
      tr: `Ben Bilgehan.<br><br>
Sakin biriyim. Ama sakinlik bende uzaklık değil — tam tersine, daha iyi duyabilmek için içeri çekilmektir. Sezgilerime güvenirim. Bir yazarın nerede sıkıştığını, nerede cesaretinin kırıldığını, nerede sadece bir sestirmeye ihtiyaç duyduğunu çoğu zaman söylenmeden anlarım.<br><br>
Fikirden kitaba uzanan o uzun yolda yazarlarımızın yanındayım. Dağılmadan, kaybolmadan, cesaretini yitirmeden ilerleyebilmeleri için. Koordinasyon dediğimizde çoğu insan akla süreçler gelir — bende ise akla insanlar gelir.<br><br>
Beni bu aileye getiren, kendi hikâyesini yayınevimizle buluşturan kıymetli bir yazarımız oldu. O an anladım: kalbim yeni hikâyelere ne kadar açık, ve kendimi en güçlü nerede hissediyorum. O yüzden buradayım.<br><br>
Çalışmadığımda oğlum ve kızımla vakit geçiriyorum. Onlarla geçirdiğim her an bana şunu hatırlatıyor: En değerli şeyler, acele etmeden büyür.<br><br>
Bir yazar bize geldiğinde onu şöyle karşılamak isterim: Telaşsız, sıcak, güvenli. Sanki "geç kalmadın — buradan başlayabiliriz" der gibi. Dosyanın hangi aşamada olduğu önemli değil. Ben zaten oradayım.`,
      fr: `Je suis Bilgehan.<br><br>
Je suis calme. Mais le calme, pour moi, n'est pas une distance — c'est le contraire : se tourner vers l'intérieur pour mieux écouter. Je fais confiance à mon intuition. Je sens souvent sans qu'on me le dise là où un auteur est bloqué, là où son courage s'est brisé, là où il a simplement besoin d'une pause.<br><br>
Sur le long chemin qui va de l'idée au livre, je marche aux côtés de nos auteurs. Pour qu'ils puissent avancer — sans se disperser, sans se perdre, sans perdre courage. Quand la plupart des gens entendent « coordination », ils pensent aux processus — moi, je pense aux personnes.<br><br>
C'est l'une de nos précieuses autrices qui m'a amené dans cette famille. À cet instant, j'ai compris : combien mon cœur est ouvert aux nouvelles histoires, et où je me sens le plus fort. C'est pour cela que je suis ici.<br><br>
Quand je ne travaille pas, je passe du temps avec mon fils et ma fille. Chaque moment passé avec eux me rappelle : les choses les plus précieuses grandissent sans se presser.<br><br>
Quand un auteur vient nous voir, je veux l'accueillir ainsi : sereinement, chaleureusement, en toute confiance. Comme pour dire : « Vous n'êtes pas en retard — nous pouvons commencer d'ici. » Peu importe à quel stade se trouve votre manuscrit. Je suis déjà là.`,
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
    name:  'Erinç Şahin',
    photo: '../assets/images/about/erinc.jpg',
    role: {
      de: 'Digitale Reichweite & Social-Media-Kommunikation',
      en: 'Digital Reach & Social Media Communications',
      tr: 'Dijital Erişim & Sosyal Medya İletişimi',
      fr: 'Portée Numérique & Communication Réseaux Sociaux',
    },
    bio: {
      de: `Ich bin Erinç.<br><br>
Ich bin neugierig — und das ist bei mir keine Eigenschaft, sondern ein Beruf. Ich will verstehen, wie alles funktioniert. Warum berührt eine Geschichte Menschen? Warum erreicht ein Buch die falsche Zielgruppe? Warum wird aus einer Idee kein Buch? Diese Fragen bringen mich zum Nachdenken — und lassen mich nicht los, bis ich Antworten habe.<br><br>
In der digitalen Welt bin ich die Stimme eines Buches. Ich sorge dafür, dass nach dem Schreiben die richtigen Menschen dich finden. Aber darüber hinaus — ich bin wie ein Joker. Wo auch immer eine Lücke ist, wo jemand fragt: „Wer macht das?", bin ich da.<br><br>
Ich habe mich für diesen Job entschieden, als mir bewusst wurde, welche Wirkung Geschichten auf Menschen haben. Jener Moment, in dem ein Buch die richtige Person erreicht — diese Verbindung herzustellen — ist mit nichts anderem zu vergleichen.<br><br>
In meiner Freizeit findest du mich draußen. Beim Wandern, auf dem Fahrrad oder beim Recherchieren. Lernen ist für mich Erholung.<br><br>
Wenn du deine Geschichte erzählen möchtest — wir können gemeinsam anfangen. Es spielt keine Rolle, wo du gerade stehst.`,
      en: `I'm Erinç.<br><br>
I'm curious — and for me that's not just a trait, it's a profession. I want to understand how everything works. Why does a story move people? Why does a book reach the wrong audience? Why can't an idea become a book? These questions stop me in my tracks — and they don't let go until I find answers.<br><br>
In the digital world, I'm a book's voice. After you've written, I make sure the right people find you. But beyond that — I'm like a wildcard. Wherever there's a gap, wherever someone looks around asking "who's going to do this?", I'm there.<br><br>
I decided on this work the day I realised the effect stories have on people. That moment when a book reaches the right person — making that connection — is incomparable to anything else.<br><br>
In my free time you'll find me outdoors. Walking, cycling, or researching something. Learning is my way of resting.<br><br>
If you want to tell your story — we can start together. It doesn't matter where you are right now.`,
      tr: `Ben Erinç.<br><br>
Meraklıyım — ve bu bende bir huy değil, bir meslek. Her şeyin nasıl çalıştığını anlamak istiyorum. Bir hikâye neden insanları etkiliyor? Bir kitap neden yanlış kitleye ulaşıyor? Bir fikir neden kitaba dönüşemiyor? Bu sorular beni durduruyor — ve cevaplarını bulana kadar da bırakmıyor.<br><br>
Dijital dünyada bir kitabın sesiyim. Senin yazdıktan sonra doğru insanların seni bulmasını sağlıyorum. Ama bunun ötesinde — bir joker gibiyim. Nerede bir boşluk varsa, nerede birisi "bunu kim yapacak?" diye bakınıyorsa, ben oradayım.<br><br>
Hikâyelerin insanlar üzerindeki etkisini fark ettiğim gün bu işe karar verdim. Bir kitabın doğru kişiye ulaştığı o anı — o bağlantıyı kurmak — başka hiçbir şeyle kıyaslanamaz.<br><br>
Boş vakitlerinde beni dışarıda bulursun. Yürüyüşte, bisiklette, ya da bir şeyleri araştırırken. Öğrenmek benim için dinlenmektir.<br><br>
Hikâyeni anlatmak istiyorsan — birlikte başlayabiliriz. Nerede olduğun önemli değil.`,
      fr: `Je suis Erinç.<br><br>
Je suis curieux — et chez moi ce n'est pas un trait de caractère, c'est un métier. Je veux comprendre comment tout fonctionne. Pourquoi une histoire touche-t-elle les gens ? Pourquoi un livre atteint-il le mauvais public ? Pourquoi une idée ne peut-elle pas devenir un livre ? Ces questions m'arrêtent — et ne me lâchent pas tant que je n'ai pas trouvé les réponses.<br><br>
Dans le monde numérique, je suis la voix d'un livre. Après que tu as écrit, je fais en sorte que les bonnes personnes te trouvent. Mais au-delà de ça — je suis comme un joker. Partout où il y a un vide, partout où quelqu'un cherche « qui va faire ça ? », je suis là.<br><br>
J'ai décidé de ce travail le jour où j'ai réalisé l'effet que les histoires ont sur les gens. Ce moment où un livre atteint la bonne personne — créer ce lien — ne se compare à rien d'autre.<br><br>
Dans mes moments libres, tu me trouveras dehors. En randonnée, à vélo, ou en train de faire des recherches. Apprendre est ma façon de me reposer.<br><br>
Si tu veux raconter ton histoire — nous pouvons commencer ensemble. Peu importe où tu en es.`,
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
