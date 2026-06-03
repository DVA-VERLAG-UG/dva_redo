// ─────────────────────────────────────────────────────────────────────────────
//  TEAM DATA  —  hier Text, Rolle und Foto pro Person eintragen
//
//  photo:  Bildpfad relativ zur HTML-Seite, z.B.:
//          '../assets/images/about/bihter.png'
//          Leer lassen ('') = Silhouetten-Platzhalter wird angezeigt.
//
//  role / bio:  Pro Sprache ein eigener Text (de / en / tr / fr).
//               Fehlt eine Übersetzung, wird 'de' als Fallback genutzt.
//               HTML ist erlaubt (z.B. <br>, <strong>).
//
//  id: NICHT ändern — verknüpft den Eintrag mit der Karte auf der Seite.
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM = [
  {
    id:    'bihter-sahin',
    name:  'Bihter Şahin',
    photo: '../assets/images/about/bihter.png',
    role: {
      de: 'Inhaberin · Allgemeine Koordinatorin',
      en: 'Owner · General Coordinator',
      tr: 'Sahibi · Genel Koordinatör',
      fr: 'Propriétaire · Coordinatrice Générale',
    },
    bio: {
      de: `Ich bin Bihter.<br><br>
Für mich war diese Arbeit nie nur Verleger sein. Wenn jemand etwas, das aus seinem Inneren kommt, zu dir streckt, hat mich das immer wie etwas Ernstes berührt. Wenn jemand uns schreibt, richte ich meine Aufmerksamkeit deshalb nicht zuerst auf den Text — sondern auf den Menschen hinter diesem Text.<br><br>
Genau das hat mich vor Jahren gestört. Die Menschen kommen mit etwas, das aus ihrem Herzen kommt, und werden an so vielen Orten nur wie eine Datei behandelt. Bei mir hat dieses Gefühl immer anders gewirkt. Wenn jemand mir etwas bringt, spüre ich darin zuerst ein Vertrauen — ein Anvertrauen.<br><br>
Ich bin offen. Ich komme schnell in Nähe. Künstliche Distanzen mag ich nicht. Zu meinem Leben wie zu den Menschen baue ich keine hohen Mauern. Vielleicht kann ich deshalb nicht anders, als jemanden ernst zu nehmen, wenn er ein Stück von sich mitbringt.<br><br>
Ein Autor ist für uns nicht einfach jemand, der schreibt. Manchmal steckt hinter einem Buch ein Schmerz, den niemand kennt. Manchmal ein Mut, der jahrelang aufgeschoben wurde. Manchmal die Version von jemandem, der zur eigenen Stimme zu spät gekommen ist.<br><br>
Wenn du uns schreibst, möchte ich, dass du das spürst: Hier bekommt man nicht einfach eine Antwort. Hier bekommt man wirklich eine Resonanz.`,
      en: `I'm Bihter.<br><br>
For me, this work has never been just publishing. When a person reaches out to you with something that comes from inside them, that has always felt serious to me. So when someone writes to us, I don't focus on the text first — I focus on the person behind that text.<br><br>
That's exactly what bothered me years ago. People come with something that comes from their heart, yet in many places they're treated like just another file. Something in me has always worked the opposite way. When someone brings me something, I first feel a sense of trust — a sense of having been entrusted with something.<br><br>
I'm genuine. I warm up quickly. I don't like artificial distance. I don't put up many walls between myself and life, or between myself and people. Maybe that's why I can't look at someone the same way when they bring a piece of themselves to me.<br><br>
For us, an author isn't just someone who writes. Sometimes behind a book there's a heartbreak no one knows about. Sometimes a courage that was postponed for years. Sometimes a person who arrived late to their own voice.<br><br>
When you write to us, I want you to feel this: You don't just get a response here. You get a real answer.`,
      tr: `Ben Bihter.<br><br>
Benim için bu iş hiçbir zaman sadece yayıncılık olmadı. Bir insanın içinden çıkan bir şeyi sana uzatması, bana hep ciddi bir şey gibi geldi. O yüzden biri bize yazdığında ben önce metne değil, o metnin arkasındaki insana dikkat kesilirim.<br><br>
Yıllar önce beni rahatsız eden şey tam da buydu. İnsanlar kalplerinden gelen bir şeyle geliyor, ama birçok yerde yalnızca dosya gibi görülüyor. Bende bu duygu hep ters çalıştı. Ben bir insan bana bir şey getiriyorsa, orada önce emanet duygusu hissediyorum.<br><br>
Ben samimi biriyim. Hızlı yakınlaşırım. Yapay mesafeleri sevmem. Hayatla da, insanlarla da arama fazla duvar koymam. Belki bu yüzden biri kendinden bir parça getirdiğinde, onu sıradan bir evrak gibi göremem.<br><br>
Bizim için yazar dediğin kişi sadece yazan biri değildir. Bazen bir kitabın arkasında kimsenin bilmediği bir kırgınlık vardır. Bazen yıllarca ertelenmiş bir cesaret. Bazen de insanın kendi sesine geç kalmış hali.<br><br>
Bize yazdığında şunu hissetmeni isterim: Burada sadece cevap verilmez. Burada gerçekten karşılık vardır.`,
      fr: `Je suis Bihter.<br><br>
Pour moi, ce travail n'a jamais été seulement de l'édition. Quand quelqu'un vous tend quelque chose qui vient de son intérieur, ça m'a toujours semblé sérieux. Quand quelqu'un nous écrit, je ne me concentre donc pas d'abord sur le texte — mais sur la personne derrière ce texte.<br><br>
C'est exactement ce qui me dérangeait il y a des années. Les gens arrivent avec quelque chose qui vient de leur cœur, mais dans de nombreux endroits, ils ne sont traités que comme un fichier. En moi, ce sentiment a toujours fonctionné à l'envers. Quand quelqu'un m'apporte quelque chose, je ressens d'abord une confiance — une forme de dépôt.<br><br>
Je suis sincère. Je me rapproche vite. Je n'aime pas les distances artificielles. Je ne mets pas trop de murs entre moi et la vie, ni entre moi et les gens. C'est peut-être pour ça que je ne peux pas regarder quelqu'un de la même façon quand il m'apporte un morceau de lui-même.<br><br>
Pour nous, un auteur n'est pas simplement quelqu'un qui écrit. Parfois, derrière un livre, il y a une blessure que personne ne connaît. Parfois un courage différé pendant des années. Parfois quelqu'un qui est arrivé tard à sa propre voix.<br><br>
Quand tu nous écris, je veux que tu ressentes ceci : Ici, on ne te donne pas seulement une réponse. Ici, il y a une vraie résonance.`,
    },
  },
  {
    id:    'busra-sahin',
    name:  'Büşra Şahin',
    photo: '../assets/images/about/büsrasahin-ekip.png',
    role: {
      de: 'Chefredakteurin',
      en: 'Editor-in-Chief',
      tr: 'Baş Editör',
      fr: 'Rédactrice en Chef',
    },
    bio: {
      de: `Ich bin Büşra.<br><br>
Ich arbeite mit Texten, ja. Aber eigentlich arbeite ich mehr mit Stimmen. Ob die Stimme eines Autors wirklich an ihrem Platz ist, ob jene innere Schwingung verloren geht, während der Satz stärker wird — dorthin richte ich meinen Blick mehr.<br><br>
Denn manche Texte werden technisch besser, aber ihre Seele bleibt zurück. Genau das geht mir nicht rein. Ein Text kann sich sammeln, stärker werden, klarer werden; aber wenn er am Ende immer noch nicht seinem Besitzer gehört — dann fehlt dort etwas.<br><br>
Ich bin nicht leicht ablenkbar. Ich schaue still. Manchmal hänge ich in einem Satz am meisten an dem, was nie geschrieben wurde. Wo der Atem abgebrochen ist, wo das Gefühl sich zurückgezogen hat, wo die Stimme verletzt wurde... Ich glaube, meine Lektüre beginnt auch ein bisschen dort.<br><br>
Wir versuchen hier nicht nur, einen Text „korrekt" zu machen. Wir versuchen, ihn zu stärken — nicht gegen seinen Besitzer, sondern gemeinsam mit ihm.<br><br>
Wenn dein Manuskript zu uns kommt, soll es sich nicht durchgegangen fühlen — sondern verstanden.`,
      en: `I'm Büşra.<br><br>
I work with texts, yes. But actually I work more with voices. Whether an author's voice is truly in its right place, whether that inner resonance is being lost as the sentence grows stronger — that's where I look more closely.<br><br>
Because some texts are technically corrected but their soul stays behind. That's exactly what doesn't sit right with me. A text can gather itself, grow stronger, become clearer; but if in the end it still doesn't belong to its author — something is missing there.<br><br>
My attention doesn't scatter easily. I look quietly. Sometimes in a sentence I get caught most on what was never written. Where the breath was cut off, where the emotion pulled back, where the voice was hurt… I think my editing begins a little there too.<br><br>
We're not just trying to make a text "correct" here. We're trying to make it stronger — not against its author, but together with them.<br><br>
When your manuscript comes to us, I want it to feel not processed — but understood.`,
      tr: `Ben Büşra.<br><br>
Ben metinle uğraşıyorum, evet. Ama aslında daha çok sesle uğraşıyorum. Bir yazarın sesi yerli yerinde mi, cümle güçlenirken o iç titreşim kayboluyor mu, ben daha çok oralara bakıyorum.<br><br>
Çünkü bazı metinler teknik olarak düzelir ama ruhu geride kalır. Benim içime sinmeyen şey tam da bu. Bir metin toparlanabilir, güçlenebilir, daha berrak hâle gelebilir; ama sonunda hâlâ sahibine ait durmuyorsa, orada bir şey eksik kalmıştır.<br><br>
Ben dikkatimi kolay dağıtmam. Sessizce bakarım. Bazen bir cümlede en çok, hiç yazılmamış yere takılırım. Nefes nerede kesilmiş, duygu nerede geri çekilmiş, ses nerede incinmiş… Sanırım benim editörlüğüm biraz da orada başlıyor.<br><br>
Biz burada bir metni "düzgün" hâle getirmeye çalışmıyoruz sadece. Onu, sahibine rağmen değil; sahibiyle birlikte güçlendirmeye çalışıyoruz.<br><br>
Dosyan bize geldiğinde, üzerinden geçilmiş değil; anlaşılmış hissetsin isterim.`,
      fr: `Je suis Büşra.<br><br>
Je travaille avec des textes, oui. Mais en réalité, je travaille davantage avec des voix. Est-ce que la voix d'un auteur est vraiment à sa place, est-ce que cette vibration intérieure se perd à mesure que la phrase se renforce — c'est là que je regarde davantage.<br><br>
Car certains textes s'améliorent techniquement mais leur âme reste en retrait. C'est exactement ce qui ne me convient pas. Un texte peut se rassembler, se renforcer, devenir plus clair ; mais s'il n'appartient toujours pas à son auteur à la fin — il manque quelque chose là.<br><br>
Mon attention ne se disperse pas facilement. Je regarde silencieusement. Parfois dans une phrase, ce qui me retient le plus, c'est ce qui n'a jamais été écrit. Là où le souffle s'est coupé, là où l'émotion s'est retirée, là où la voix a été blessée… Je pense que mon travail éditorial commence aussi un peu là.<br><br>
Nous n'essayons pas seulement de rendre un texte « correct » ici. Nous essayons de le renforcer — non pas contre son auteur, mais avec lui.<br><br>
Quand ton manuscrit vient chez nous, je veux qu'il se sente non pas parcouru — mais compris.`,
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
It was one of our cherished authors who brought me to this family. In that moment I understood: how open my heart is to new stories, and where I feel strongest. That's why I'm here.<br><br>
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
    photo: '../assets/images/about/sibelcaglar.png',
    role: {
      de: 'Autorenberaterin',
      en: 'Author Consultant',
      tr: 'Yazar Danışmanı',
      fr: 'Conseillère Auteurs',
    },
    bio: {
      de: `Ich bin Sibel.<br><br>
Ich bin meistens dann an der Seite von Menschen, wenn sie am verletzlichsten sind. Wenn noch nichts klar ist. Wenn jemand noch nicht weiß, wie er selbst auf das schauen soll, was er geschrieben hat. Wenn er noch hin- und hergeht zwischen „Soll ich es schicken oder noch warten?"<br><br>
Diesen Moment nehme ich sehr ernst. Denn meistens geht es nicht nur ums Buch. Manchmal entscheidet jemand eigentlich, ob er sich zeigen will oder nicht. Ein Text zu teilen kann manchmal persönlicher sein, als wir denken.<br><br>
Ich bin keine, die drängt. Ich versuche nicht, jemanden durch Druck zum Öffnen zu bringen. Ich weiß, dass jemand erst entspannen muss, um wirklich sprechen zu können. Manchmal ist das Größte, was man für jemanden tun kann, nicht, ihm Tempo zu geben — sondern Raum.<br><br>
Ein Autor wird bei uns nicht mit „Schauen wir mal, was er geschickt hat" empfangen. Besonders beim ersten Schritt nicht. Denn der erste Schritt ist manchmal schwerer als der Text selbst.<br><br>
Wenn du dich bei uns meldest, möchte ich, dass du das nicht wie eine Bewerbung empfindest — sondern als wäre dir jemand still einen Platz freigehalten.`,
      en: `I'm Sibel.<br><br>
I'm usually alongside people at their most vulnerable moment. When nothing is clear yet. When someone doesn't even know how to look at what they've written. When they're still going back and forth between "should I send it or wait?"<br><br>
I take that moment very seriously. Because most of the time it's not just about the book. Sometimes a person is actually deciding whether to show themselves or not. Sharing a text can sometimes be far more personal than we think.<br><br>
I'm not someone who rushes. I don't try to get someone to open up by pressuring them. I know that to really speak, someone first needs to feel at ease. Sometimes the greatest thing you can do for someone isn't to give them speed — it's to give them space.<br><br>
For us, an author isn't someone greeted with "let's see what they sent." Especially not at the first step. Because the first step is sometimes heavier than the text itself.<br><br>
When you reach out to us, I want you to feel not like you've applied somewhere — but like someone has quietly made room for you.`,
      tr: `Ben Sibel.<br><br>
Ben genelde insanların en hassas olduğu anda yanındayım. Daha hiçbir şey netleşmemişken. Daha insan kendi yazdığına bile tam nasıl bakacağını bilemezken. Daha "göndereyim mi, bekleteyim mi?" arasında gidip gelirken.<br><br>
Ben o anı çok önemsiyorum. Çünkü çoğu zaman mesele sadece kitap değildir. İnsan bazen aslında kendini gösterip göstermemeye karar veriyordur. Bir metni paylaşmak, bazen sandığımızdan çok daha kişisel bir şeydir.<br><br>
Ben acele ettiren biri değilim. İnsanı zorlayarak açtırmaya çalışmam. Birinin gerçekten konuşabilmesi için önce rahatlaması gerektiğini bilirim. Bazen bir insana yapılabilecek en büyük iyilik, ona hız vermek değil, alan vermektir.<br><br>
Bizim için bir yazar, "bakalım ne göndermiş" diye karşılanan biri değildir. Özellikle ilk adımda, hiç değildir. Çünkü ilk adım bazen metinden daha ağırdır.<br><br>
Bize ulaştığında, sanki bir yere başvurmuş gibi değil; sanki biri sana sessizce yer açmış gibi hissetmeni isterim.`,
      fr: `Je suis Sibel.<br><br>
Je suis généralement aux côtés des gens au moment où ils sont le plus vulnérables. Quand rien n'est encore clair. Quand quelqu'un ne sait même pas encore comment regarder ce qu'il a écrit. Quand il hésite encore entre « Dois-je l'envoyer ou attendre ? »<br><br>
Je prends ce moment très au sérieux. Parce que la plupart du temps, il ne s'agit pas que du livre. Parfois, quelqu'un est en train de décider s'il veut se montrer ou non. Partager un texte peut parfois être bien plus personnel qu'on ne le pense.<br><br>
Je ne suis pas quelqu'un qui presse. Je n'essaie pas d'amener quelqu'un à s'ouvrir sous pression. Je sais que pour vraiment parler, quelqu'un doit d'abord se détendre. Parfois la plus grande chose qu'on puisse faire pour quelqu'un n'est pas de lui donner de la vitesse — c'est de lui donner de l'espace.<br><br>
Un auteur n'est pas accueilli chez nous par un « Voyons ce qu'il a envoyé ». Surtout pas à la première étape. Car la première étape est parfois plus lourde que le texte lui-même.<br><br>
Quand tu nous contactes, je veux que tu ne te sentes pas comme si tu avais postulé quelque part — mais comme si quelqu'un t'avait silencieusement fait de la place.`,
    },
  },
  {
    id:    'nilay-karaduman',
    name:  'Nilay Karaduman',
    photo: '',  // ← Bildpfad eintragen wenn vorhanden
    role: {
      de: 'Autorenberaterin · Content & Social Media Managerin',
      en: 'Author Consultant · Content & Social Media Manager',
      tr: 'Yazar Danışmanı · İçerik ve Sosyal Medya Sorumlusu',
      fr: 'Conseillère Auteurs · Responsable Contenu & Réseaux Sociaux',
    },
    bio: {
      de: `Ich bin Nilay.<br><br>
Ich arbeite sowohl direkt mit Autoren als auch eng daran, wie unser Verlag nach außen hin erscheint. Was das für dich bedeutet: Es gibt jemanden, der auf der einen Seite an deiner Seite auf deiner Reise als Autor steht, und auf der anderen Seite die Sichtbarkeit und Darstellung deines Werkes ernst nimmt.<br><br>
Ich liebe die Arbeit mit Autoren, weil ich glaube, dass hinter jedem Text eine eigene Welt steckt. Einen Autor zu verstehen beginnt für mich nicht nur damit, sein Manuskript zu lesen — sondern auch zu spüren, was er ausdrücken will, woher er kommt und wie er sich selbst ausdrückt.<br><br>
Gleichzeitig arbeite ich in den Bereichen Content, Social Media und visuelle Produktion. Ich übernehme an vielen Punkten aktive Rollen — von Buchvorstellungsfotos bis hin zur Vorbereitung digitaler Inhalte. Das gibt mir die Möglichkeit, nicht nur den Schreibprozess eines Buches, sondern auch seinen Weg zum Leser ganzheitlich zu sehen.<br><br>
Ich habe am Müjdat Gezen Kunstzentrum eine Ausbildung in Kreativem Schreiben absolviert und schließe das Autor-Coaching-Programm ab. Aber das Wertvollste für mich ist, dass ein Autor sich verstanden fühlt.<br><br>
Wenn du dich bei uns meldest, möchte ich, dass du dich nicht nur als jemand fühlst, der weitergeleitet wurde — sondern als jemand, für den man sich wirklich interessiert.`,
      en: `I'm Nilay.<br><br>
I work both directly with authors and closely on how our publishing house appears to the outside world. What that means for you: there's someone who, on one hand, stands by your side on your journey as an author, and on the other hand, cares about the visibility and presentation of your work.<br><br>
I love working with authors because I believe there's a separate world behind every text. Understanding an author, for me, starts not just with reading their manuscript — but with feeling what they want to express, where they come from, and how they express themselves.<br><br>
At the same time, I work in content, social media and visual production. I take active roles at many points — from book promotional photography to preparing digital content. This gives me the opportunity to see not only the writing process of a book, but also how it reaches readers, holistically.<br><br>
I completed Creative Writing training at the Müjdat Gezen Arts Centre and am completing the Author Coaching programme. But the most precious thing for me is when an author feels understood.<br><br>
When you reach out to us, I want you to feel not just directed somewhere — but genuinely cared for.`,
      tr: `Ben Nilay.<br><br>
Ben hem yazarlarla birebir ilgileniyor hem de yayınevimizin dışarıya nasıl göründüğüyle yakından çalışıyorum. Senin için bunun anlamı şu: Bir yandan yazarlık yolculuğunda yanında duran, bir yandan da eserinin görünürlüğünü ve anlatımını önemseyen bir insan var.<br><br>
Yazarlarla çalışmayı seviyorum çünkü her metnin arkasında ayrı bir dünya olduğuna inanıyorum. Bana göre bir yazarı anlamak, sadece dosyasını okumakla değil; ne anlatmak istediğini, nasıl bir yerden geldiğini ve kendini nasıl ifade ettiğini de hissetmekle başlar.<br><br>
Aynı zamanda içerik, sosyal medya ve görsel üretim alanlarında çalışıyorum. Kitap tanıtım fotoğraflarından dijital içeriklerin hazırlanmasına kadar birçok noktada aktif rol alıyorum. Bu da bana bir kitabın sadece yazılma sürecini değil, okura nasıl ulaştığını da bütünlüklü görme imkânı veriyor.<br><br>
Müjdat Gezen Sanat Merkezi'nde Yaratıcı Yazarlık eğitimi aldım ve Yazar Koçluğu programını tamamlıyorum. Ama benim için en kıymetli şey, bir yazarın kendini anlaşılmış hissetmesi.<br><br>
Bize ulaştığında, yalnızca yönlendirilen değil; gerçekten ilgilenilen biri olduğunu hissetmeni isterim.`,
      fr: `Je suis Nilay.<br><br>
Je travaille à la fois directement avec les auteurs et étroitement sur la façon dont notre maison d'édition apparaît au monde extérieur. Ce que cela signifie pour toi : il y a quelqu'un qui, d'un côté, se tient à tes côtés dans ton parcours d'auteur, et de l'autre, prend au sérieux la visibilité et la présentation de ton œuvre.<br><br>
J'aime travailler avec les auteurs parce que je crois qu'il y a un monde séparé derrière chaque texte. Comprendre un auteur, pour moi, commence non seulement par lire son manuscrit — mais aussi par ressentir ce qu'il veut exprimer, d'où il vient et comment il s'exprime.<br><br>
Je travaille également dans les domaines du contenu, des réseaux sociaux et de la production visuelle. Je joue un rôle actif à de nombreux points — de la photographie de présentation de livres à la préparation de contenus numériques. Cela me donne la possibilité de voir non seulement le processus d'écriture d'un livre, mais aussi comment il atteint les lecteurs, de manière globale.<br><br>
J'ai suivi une formation en Écriture Créative au Centre d'Art Müjdat Gezen et je termine le programme de Coaching d'Auteurs. Mais la chose la plus précieuse pour moi, c'est qu'un auteur se sente compris.<br><br>
Quand tu nous contactes, je veux que tu te sentes non seulement orienté — mais vraiment pris en charge.`,
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
    photo: '../assets/images/about/nesesiyamoglu-ekip.png',
    role: {
      de: 'Lektorat & Verlagsgestaltung',
      en: 'Editing & Publishing Design',
      tr: 'Yayın Hazırlık & Yayın Tasarım Sorumlusu',
      fr: 'Édition & Mise en Page',
    },
    bio: {
      de: `Ich bin Neşe.<br><br>
Ich bin meistens an dem Ort, der unsichtbar ist. Wenn etwas nicht zu sehen ist und trotzdem alles an seinem Platz ist — dann steckt dort meistens gute Arbeit drin.<br><br>
Ich arbeite daran, dass dein Manuskript auf seinem Weg zum Buch nicht auseinanderfällt, nicht abnimmt, nicht nachlässig wird. Denn das Endresultat eines Buches hängt nicht nur davon ab, was es erzählt — sondern auch davon, wie es getragen wird. Und manchmal bekommt jemand genau an diesem unsichtbaren Ort Respekt zu spüren.<br><br>
Ich bin sorgfältig. Aber nicht von dieser harten, erdrückenden Art. Eher von der Art, die das Innere eines Menschen beruhigt. Wenn alles an seinem Platz ist, entsteht manchmal ein sehr stilles, aber sehr starkes Gefühl von Vertrauen.<br><br>
Wir unterschätzen hier keine Details. Denn manchmal ist ein Detail das Stillste, was man einem Autor sagen kann: „Deine Arbeit ist mir wichtig."<br><br>
Du musst nicht jeden Schritt einzeln verfolgen. Aber ich möchte, dass du eines weißt: Dein Werk geht hier nicht unter.`,
      en: `I'm Neşe.<br><br>
I'm mostly in the invisible place. When something can't be seen and yet everything is in its right place — that's usually where good work lives.<br><br>
I work to make sure your manuscript doesn't fall apart, doesn't diminish, doesn't become careless on its way to becoming a book. Because a book's final form is not just about what it tells — it's also about how it's carried. And sometimes a person receives the most respect precisely in this invisible place.<br><br>
I'm meticulous. But not in that harsh, suffocating way. More in the kind that puts a person at ease. When everything is in its place, it sometimes creates a very quiet but very powerful sense of trust.<br><br>
We don't underestimate details here. Because sometimes what you call a detail is the quietest way to tell an author: "Your work matters to me."<br><br>
You don't have to follow every stage one by one. But I want you to know this: Your work doesn't get lost here.`,
      tr: `Ben Neşe.<br><br>
Ben daha çok görünmeyen yerdeyim. Zaten çoğu zaman bir şey görünmüyorsa ve yine de her şey yerli yerindeyse, orada iyi bir emek vardır.<br><br>
Dosyanın kitaba dönüşürken dağılmaması, eksilmemesi, özensizleşmemesi için çalışıyorum. Çünkü bir kitabın son hâli sadece ne anlattığıyla değil, nasıl taşındığıyla da ilgilidir. Ve bazen insan tam da bu görünmeyen yerde saygı görür.<br><br>
Ben titiz biriyim. Ama o sert, boğucu titizlikten değil. Daha çok, insanın içini rahatlatan türden. Her şeyin yerli yerinde olması, bazen çok sessiz ama çok güçlü bir güven duygusu yaratır.<br><br>
Biz burada detayı küçümsemiyoruz. Çünkü bazen detay dediğin şey, bir yazara "senin emeğin benim için önemli" demenin en sessiz yoludur.<br><br>
Sen her aşamayı tek tek takip etmek zorunda değilsin. Ama şunu bilmeni isterim: Eserin burada gözden kaçmaz.`,
      fr: `Je suis Neşe.<br><br>
Je suis surtout dans l'endroit invisible. Quand quelque chose ne se voit pas et que pourtant tout est à sa place — c'est là qu'il y a généralement un bon travail.<br><br>
Je travaille pour que ton manuscrit ne se disperse pas, ne diminue pas, ne devienne pas négligé sur son chemin vers le livre. Car la forme finale d'un livre ne dépend pas seulement de ce qu'il raconte — mais aussi de la façon dont il est porté. Et parfois quelqu'un reçoit le plus de respect précisément à cet endroit invisible.<br><br>
Je suis méticuleuse. Mais pas de cette manière dure et suffocante. Plutôt de la sorte qui apaise l'intérieur d'une personne. Quand tout est à sa place, cela crée parfois un sentiment de confiance très silencieux mais très fort.<br><br>
Nous ne sous-estimons pas les détails ici. Parce que parfois ce qu'on appelle un détail, c'est la façon la plus silencieuse de dire à un auteur : « Ton travail m'importe. »<br><br>
Tu n'as pas à suivre chaque étape une par une. Mais je veux que tu saches ceci : Ton œuvre ne passe pas inaperçue ici.`,
    },
  },
  {
    id:    'zekeriya-avci',
    name:  'Zekeriya Avcı',
    photo: '',  // ← Bildpfad eintragen wenn vorhanden
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
    photo: '../assets/images/about/arzucakır.png',
    role: {
      de: 'Finanzen & Buchhaltung',
      en: 'Finance & Accounting',
      tr: 'Mali İşler ve Muhasebe Sorumlusu',
      fr: 'Finance & Comptabilité',
    },
    bio: {
      de: `Ich bin Arzu.<br><br>
Mein Bereich sind hauptsächlich Zahlen, Aufzeichnungen, Ordnung. Von außen betrachtet mag das weit entfernt von Gefühlen wirken. Aber wenn du mich fragst, wird die tiefste Seite des Vertrauens ein wenig auch hier aufgebaut.<br><br>
Denn der Mensch liebt schöne Worte, ja. Aber um sich wirklich entspannen zu können, müssen die Dinge an einem Ort sauber laufen. Unordnung erschöpft. Unklarheit engt das Innere eines Menschen ein. Klarheit hingegen beruhigt meistens still und leise.<br><br>
Ich mag Klarheit. Nicht Dinge, die im Nachhinein zusammengestückelt werden, sondern Dinge, die von Anfang an offen sind. Eine Ordnung, in der jeder weiß, wie was funktioniert, und sich innerlich wohlfühlt.<br><br>
Wir bauen hier Vertrauen nicht nur durch Wärme auf. Auch durch Korrektheit. Auch durch Transparenz. Auch durch Solidität.<br><br>
Selbst dort, wo Zahlen sind, kann sich ein Mensch geschützt fühlen. Genau das ist für mich wertvoll.`,
      en: `I'm Arzu.<br><br>
My area is mostly numbers, records, order. From the outside it may look distant from emotion. But if you ask me, the deepest side of trust is built a little here too.<br><br>
Because people love beautiful words, yes. But to truly relax, things need to run cleanly somewhere. Disorder is tiring. Uncertainty constricts a person's inner world. Clarity, on the other hand, usually soothes quietly.<br><br>
I like clarity. Not things that are patched together afterwards, but things that are clear from the start. An order where everyone knows how things work, and feels at ease inside.<br><br>
We don't build trust here only with warmth. We build it with correctness too. With transparency. With solidity.<br><br>
Even where there are numbers, a person can feel protected. That's exactly what is precious to me.`,
      tr: `Ben Arzu.<br><br>
Benim alanım daha çok rakamlar, kayıtlar, düzen. Dışarıdan bakınca duygudan uzak gibi görünebilir. Ama bana sorarsan güvenin en derin tarafı biraz da burada kurulur.<br><br>
Çünkü insan güzel sözleri sever, evet. Ama gerçekten rahatlaması için bir yerde işlerin temiz yürümesi gerekir. Karışıklık yorar. Belirsizlik insanın içini daraltır. Netlik ise çoğu zaman sessizce rahatlatır.<br><br>
Ben netliği severim. Sonradan toparlanan şeyleri değil, baştan açık olan şeyleri. Herkesin neyin nasıl yürüdüğünü bilebildiği, içi rahat bir düzeni.<br><br>
Biz burada güveni sadece sıcaklıkla kurmuyoruz. Düzgünlükle de kuruyoruz. Şeffaflıkla da. Sağlamlıkla da.<br><br>
Rakamların olduğu yerde bile insan kendini korunmuş hissedebilir. Benim için kıymetli olan tam da bu.`,
      fr: `Je suis Arzu.<br><br>
Mon domaine, c'est surtout les chiffres, les registres, l'ordre. Vu de l'extérieur, ça peut sembler loin des émotions. Mais si tu me demandes, le côté le plus profond de la confiance se construit un peu ici aussi.<br><br>
Car les gens aiment les beaux mots, oui. Mais pour vraiment se détendre, il faut que les choses fonctionnent proprement quelque part. Le désordre épuise. L'incertitude resserre l'intérieur d'une personne. La clarté, en revanche, apaise généralement en silence.<br><br>
J'aime la clarté. Pas les choses rattrapées après coup, mais les choses claires dès le départ. Un ordre où tout le monde sait comment les choses fonctionnent et se sent à l'aise intérieurement.<br><br>
Nous ne construisons pas la confiance ici seulement avec de la chaleur. Nous la construisons aussi avec la rigueur. Avec la transparence. Avec la solidité.<br><br>
Même là où il y a des chiffres, une personne peut se sentir protégée. C'est précisément cela qui est précieux pour moi.`,
    },
  },
];
