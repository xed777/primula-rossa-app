/* ─────────────────────────────────────────────────
   Mock Data — La Primula Rossa
   Simula il backend. In produzione sostituire con API.
───────────────────────────────────────────────── */
window.MockData = {

  studio: {
    name: 'La Primula Rossa',
    address: 'Via Recchi 3, 22100 Como CO',
    phone: '+39 031 26 86 47',
    email: 'info@laprimularossa.it',
    instagram: '@laprimularossa',
    foundedYear: 1991,
    openHours: 'Mar–Sab 10:00–19:00',
    about: 'Studio di tatuaggi e piercing storico di Como, attivo dal 1991. Esperienza, qualità e un approccio su misura per ogni cliente.',
  },

  // ── Artisti ────────────────────────────────────
  artists: [
    {
      id: 'marco',
      name: 'Marco Rossi',
      role: 'Tatuatore Senior',
      specialization: 'Realismo · Blackwork',
      bio: 'Marco è con La Primula Rossa dal 2003. Specializzato in realismo fotografico e blackwork, ha partecipato a oltre 40 convention internazionali. Ogni suo lavoro racconta una storia.',
      styles: ['Realismo', 'Blackwork', 'Ritratti', 'Natura morta'],
      experience: '20+ anni',
      available: true,
      availableFrom: null,
      rating: 4.9,
      reviewCount: 186,
      portfolioCount: 243,
      color: '#1a1a2e',
      accent: '#2ABFBF',
      initials: 'MR',
    },
    {
      id: 'sara',
      name: 'Sara Conti',
      role: 'Tatuatrice',
      specialization: 'Acquerello · Floreale',
      bio: 'Sara ha trasformato la sua passione per la botanica in un linguaggio visivo unico. I suoi tatuaggi floreali ad acquerello sono riconoscibili per la leggerezza e la profondità cromatica.',
      styles: ['Acquerello', 'Floreale', 'Fine Line', 'Boho'],
      experience: '8 anni',
      available: true,
      availableFrom: null,
      rating: 4.8,
      reviewCount: 124,
      portfolioCount: 178,
      color: '#1a0e1e',
      accent: '#C9A84C',
      initials: 'SC',
    },
    {
      id: 'luca',
      name: 'Luca Ferrari',
      role: 'Tatuatore',
      specialization: 'Traditional · Neo-Traditional',
      bio: 'Luca è cresciuto con il rock e i fumetti anni \'80. Il suo stile traditional americano ha un tocco contemporaneo che lo rende unico. Disponibile da giovedì per sessioni fino a 5 ore.',
      styles: ['Traditional', 'Neo-Traditional', 'Old School', 'Illustrativo'],
      experience: '12 anni',
      available: false,
      availableFrom: 'Gio 29 Mag',
      rating: 4.7,
      reviewCount: 98,
      portfolioCount: 156,
      color: '#1a1200',
      accent: '#E0A050',
      initials: 'LF',
    },
    {
      id: 'elena',
      name: 'Elena Moretti',
      role: 'Dermopigmentatrice',
      specialization: 'Dermopigmentazione',
      bio: 'Elena è specializzata esclusivamente in dermopigmentazione: sopracciglia, eyeliner, labbra. Tecnica microblading e powder brows. Certificata con i migliori brand europei.',
      styles: ['Sopracciglia', 'Eyeliner', 'Labbra', 'Microblading'],
      experience: '6 anni',
      available: true,
      availableFrom: null,
      rating: 5.0,
      reviewCount: 67,
      portfolioCount: 89,
      color: '#1a0808',
      accent: '#E05252',
      initials: 'EM',
    },
    {
      id: 'marta',
      name: 'Marta Costa',
      role: 'Piercer',
      specialization: 'Piercing · Jewelry',
      bio: 'Marta lavora con noi dal 2018. Ha frequentato corsi di APP (Association of Professional Piercers) in USA. Specializzata in orecchie curated, septum e superficiali.',
      styles: ['Lobo', 'Helix', 'Septum', 'Daith', 'Superficiali'],
      experience: '7 anni',
      available: true,
      availableFrom: null,
      rating: 4.9,
      reviewCount: 203,
      portfolioCount: 312,
      color: '#0e1a16',
      accent: '#4CAF7D',
      initials: 'MC',
    },
  ],

  // ── Slot prenotazione (prossime 3 settimane) ───
  generateSlots() {
    const slots = {};
    const morning = ['09:00', '10:30', '12:00'];
    const afternoon = ['14:00', '15:30', '17:00'];
    const today = new Date();
    const busyPattern = [false, true, false, false, true, false, false, true, true, false, false, false, true, false, false, true, false, false, true, false, false];
    let busyIdx = 0;
    for (let i = 2; i <= 23; i++) {
      const d = new Date(today); d.setDate(today.getDate() + i);
      if (d.getDay() === 0) continue; // domenica chiusa
      const key = d.toISOString().split('T')[0];
      const allTimes = [...morning, ...afternoon];
      slots[key] = allTimes.map(t => ({
        time: t,
        available: !busyPattern[busyIdx++ % busyPattern.length],
      }));
    }
    return slots;
  },

  // ── Prodotti shop ──────────────────────────────
  products: [
    {
      id: 'p1', category: 'piercing',
      name: 'Anello Clicker Titanio G23',
      description: 'Anello a scatto in titanio G23 anodizzato. Ipoallergenico, ideale per naso, helix, daith.',
      price: 28, material: 'Titanio G23', sizes: ['8mm', '10mm', '12mm'],
      colors: ['Silver', 'Gold', 'Rose Gold', 'Black'],
      badge: 'Bestseller',
      svg: 'ring',
    },
    {
      id: 'p2', category: 'piercing',
      name: 'Labret Flat Back Acciaio',
      description: 'Labret con chiusura flat back in acciaio chirurgico 316L. Comodo per uso quotidiano.',
      price: 18, material: 'Acciaio 316L', sizes: ['6mm', '8mm', '10mm'],
      colors: ['Silver', 'Gold'],
      badge: null,
      svg: 'stud',
    },
    {
      id: 'p3', category: 'piercing',
      name: 'Helix Curved Barbell',
      description: 'Curved barbell con sfere filettate. Perfetto per helix e industrial.',
      price: 22, material: 'Titanio G23', sizes: ['10mm', '12mm', '14mm'],
      colors: ['Silver', 'Black', 'Rose Gold'],
      badge: 'Nuovo',
      svg: 'curved',
    },
    {
      id: 'p4', category: 'piercing',
      name: 'Nostril Bone Titanio',
      description: 'Bone per naso in titanio. Design minimal, massima discrezione.',
      price: 16, material: 'Titanio G23', sizes: ['8mm'],
      colors: ['Silver', 'Gold', 'Black'],
      badge: null,
      svg: 'bone',
    },
    {
      id: 'p5', category: 'piercing',
      name: 'Opal Gem Threadless',
      description: 'Top threadless con opale sintetico. Compatibile con tutti i pin threadless.',
      price: 34, material: 'Titanio + Opale', sizes: ['3mm', '4mm', '5mm'],
      colors: ['Opal Blue', 'Opal Pink', 'Opal White'],
      badge: 'Premium',
      svg: 'gem',
    },
    {
      id: 's1', category: 'sullen',
      name: 'Sullen T-Shirt "Art Collective"',
      description: 'T-shirt ufficiale Sullen Art Collective. 100% cotone pesante, stampa diretta a inchiostro.',
      price: 39, material: 'Cotone 100%', sizes: ['S','M','L','XL','XXL'],
      colors: ['Black', 'White', 'Charcoal'],
      badge: 'Sullen',
      svg: 'shirt',
      external: true,
    },
    {
      id: 's2', category: 'sullen',
      name: 'Sullen Hoodie "Skull Rose"',
      description: 'Felpa con cappuccio Sullen. Ricamo frontale, tessuto felpato pesante.',
      price: 79, material: 'Cotone+Poliestere', sizes: ['S','M','L','XL'],
      colors: ['Black', 'Deep Navy'],
      badge: 'Sullen',
      svg: 'hoodie',
      external: true,
    },
    {
      id: 's3', category: 'sullen',
      name: 'Sullen Cap "Flash Panel"',
      description: 'Cappellino 5-panel Sullen, visiera piatta, logo ricamato.',
      price: 32, material: 'Twill', sizes: ['Unica'],
      colors: ['Black', 'Olive'],
      badge: 'Sullen',
      svg: 'cap',
      external: true,
    },
    {
      id: 'c1', category: 'cura',
      name: 'Hustle Butter Deluxe',
      description: 'Crema professionale per la cura del tatuaggio nelle prime settimane. 100% naturale, senza vaselina.',
      price: 22, material: 'Naturale', sizes: ['30ml', '150ml'],
      colors: [],
      badge: 'Consigliato',
      svg: 'cream',
    },
    {
      id: 'c2', category: 'cura',
      name: 'Tattoo Goo Lotion',
      description: 'Lozione leggera per la cura quotidiana. Ideale dalla seconda settimana in poi.',
      price: 14, material: 'Naturale', sizes: ['60ml'],
      colors: [],
      badge: null,
      svg: 'lotion',
    },
  ],

  // ── Portfolio lavori ───────────────────────────
  portfolioItems: [
    { id: 1, artist: 'Marco Rossi',  style: 'Realismo',     category: 'tattoo',  duration: '4h',   style_tag: 'Realismo' },
    { id: 2, artist: 'Sara Conti',   style: 'Acquerello',   category: 'tattoo',  duration: '3h',   style_tag: 'Acquerello' },
    { id: 3, artist: 'Luca Ferrari', style: 'Traditional',  category: 'tattoo',  duration: '2h',   style_tag: 'Traditional' },
    { id: 4, artist: 'Marta Costa',  style: 'Helix Curated',category: 'piercing',duration: '30min',style_tag: 'Piercing' },
    { id: 5, artist: 'Marco Rossi',  style: 'Blackwork',    category: 'tattoo',  duration: '5h',   style_tag: 'Blackwork' },
    { id: 6, artist: 'Elena Moretti',style: 'Sopracciglia', category: 'dermopigm',duration:'1.5h', style_tag: 'Dermopigm.' },
    { id: 7, artist: 'Sara Conti',   style: 'Fine Line',    category: 'tattoo',  duration: '2h',   style_tag: 'Fine Line' },
    { id: 8, artist: 'Luca Ferrari', style: 'Neo-Traditional',category:'tattoo', duration: '3.5h', style_tag: 'Neo-Trad' },
    { id: 9, artist: 'Marta Costa',  style: 'Septum',       category: 'piercing',duration: '20min',style_tag: 'Piercing' },
    { id:10, artist: 'Marco Rossi',  style: 'Ritratto',     category: 'tattoo',  duration: '6h',   style_tag: 'Realismo' },
    { id:11, artist: 'Sara Conti',   style: 'Boho Floreale',category: 'tattoo',  duration: '3h',   style_tag: 'Acquerello' },
    { id:12, artist: 'Elena Moretti',style: 'Eyeliner',     category: 'dermopigm',duration:'1h',   style_tag: 'Dermopigm.' },
  ],

  // ── Premi fedeltà ──────────────────────────────
  rewards: [
    { id: 'r1', points: 200, title: 'Consulenza gratuita',    description: '30 minuti con il tuo artista preferito per progettare insieme.', icon: '💬' },
    { id: 'r2', points: 350, title: 'Sconto 10% su piercing', description: 'Sconto del 10% su qualsiasi servizio di piercing.', icon: '💎' },
    { id: 'r3', points: 500, title: 'Touch-up gratuito',      description: 'Un ritocco gratuito su un tatuaggio eseguito da noi.', icon: '✦' },
    { id: 'r4', points: 700, title: 'Sconto 15% su tatuaggio',description: 'Sconto del 15% sulla prossima sessione di tatuaggio.', icon: '🖋' },
    { id: 'r5', points:1000, title: 'Gift Card €50',           description: 'Gift card da €50 spendibile per qualsiasi servizio in studio.', icon: '🎁' },
    { id: 'r6', points:1500, title: 'Sessione VIP',            description: 'Una sessione di 3 ore con Marco Rossi, fuori lista d\'attesa.', icon: '⭐' },
  ],

  // ── News dallo studio ──────────────────────────
  news: [
    {
      id: 1,
      tag: 'Artista Ospite',
      title: 'Kevin Bouchard da Montreal — 12–14 Giugno',
      preview: 'Tre giorni con il maestro del realismo canadese. Pochi slot disponibili.',
      date: '15 Mag 2025',
    },
    {
      id: 2,
      tag: 'Promozione',
      title: 'Sconto 15% su tutti i piercing fino al 31 Maggio',
      preview: 'Per celebrare i nostri 34 anni di attività. Non serve codice, basta mostrare l\'app.',
      date: '1 Mag 2025',
    },
    {
      id: 3,
      tag: 'Evento',
      title: 'Siamo alla Tattoo Convention di Milano — 7–8 Giugno',
      preview: 'Vieni a trovarci allo stand 34 al MiCo di Milano. Prenotazioni in loco.',
      date: '28 Apr 2025',
    },
  ],

  // ── Storia / Timeline ──────────────────────────
  timeline: [
    { year: '1991', title: 'La nascita',         text: 'Lo studio apre in Via Recchi 3. Primo tatuaggio: un\'ancora sul braccio di un marinaio comasco.' },
    { year: '1998', title: 'Il secondo artista',  text: 'Arriva Marco Rossi, oggi pilastro dello studio. Inizia l\'era del realismo.' },
    { year: '2004', title: 'Piercing e gioielli', text: 'Apriamo il reparto piercing. Prima ad adottare il titanio G23 nella provincia di Como.' },
    { year: '2010', title: 'La gallery',          text: 'Inauguriamo lo spazio gallery al piano superiore. Mostre mensili di artisti locali e internazionali.' },
    { year: '2015', title: 'Convention e mondo',  text: 'Partecipiamo per la prima volta all\'Amsterdam Tattoo Convention. 1° posto categoria realismo.' },
    { year: '2019', title: 'Dermopigmentazione',  text: 'Elena Moretti porta la dermopigmentazione in studio. Tecnica microblading certificata AAP.' },
    { year: '2023', title: 'Sullen Authorized',   text: 'Diventiamo rivenditori autorizzati Sullen Clothing in Lombardia.' },
    { year: '2025', title: 'Oggi',                text: '34 anni. 5 artisti. Migliaia di clienti. E ancora la stessa passione del primo giorno.' },
  ],

  // ── Conversazione mock chat ────────────────────
  chatMessages: [
    { from: 'studio', text: 'Ciao! Benvenuto alla Primula Rossa 🌺 Come possiamo aiutarti?', time: '10:23' },
    { from: 'user',   text: 'Ciao! Vorrei sapere se avete disponibilità per un tatuaggio old school sul braccio.',  time: '10:25' },
    { from: 'studio', text: 'Certo! Luca Ferrari è il nostro specialist in Traditional e Old School. Ha disponibilità da giovedì 29 maggio. Vuoi che ti metto in lista?', time: '10:26' },
    { from: 'user',   text: 'Sì, perfetto. Quanto tempo ci vuole circa per un tatuaggio 10x8 cm?',  time: '10:28' },
    { from: 'studio', text: 'Per un lavoro di quella dimensione, con linee bold e colori pieni, stimiamo 2–3 ore. Consigliamo di venire con un\'idea chiara o delle reference. Lo puoi fare direttamente dall\'app 🙂', time: '10:29' },
  ],
};

// Genera gli slot al caricamento
window.MockData.slots = window.MockData.generateSlots();
