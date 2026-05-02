/* ─────────────────────────────────────────────────
   State — Stato globale + persistenza localStorage
───────────────────────────────────────────────── */
window.State = (() => {
  const STORAGE_KEY = 'pr_state_v1';

  const defaults = {
    user: null,              // null = non loggato
    onboardingDone: false,
    visitCount: 0,
    booking: {              // bozza prenotazione in corso
      step: 1,
      service: null,        // 'tattoo' | 'piercing' | 'dermopigm'
      artistId: null,
      description: '',
      date: null,
      time: null,
      referenceNote: '',
    },
    appointments: [
      {
        id: 'apt-001',
        service: 'Tatuaggio Old School',
        artist: 'Luca Ferrari',
        artistId: 'luca',
        date: '2025-06-07',
        time: '15:00',
        status: 'confermato',
        duration: '3h',
        studio: 'Via Recchi 3, Como',
      }
    ],
    fidelityPoints: 340,
    pointsHistory: [
      { date: '14 Apr 2025', label: 'Tatuaggio realismo',   points: +120 },
      { date: '22 Feb 2025', label: 'Piercing Helix',       points: +60  },
      { date: '10 Gen 2025', label: 'Acquisto in studio',   points: +40  },
      { date: '5  Nov 2024', label: 'Tatuaggio floreale',   points: +180 },
      { date: '3  Ago 2024', label: 'Touch-up',             points: +30  },
    ],
    chatMessages: [],
    filters: {
      portfolio: 'all',
      shop: 'all',
    },
    notifications: {
      promos: true,
      reminders: true,
      news: true,
    },
  };

  // Carica da localStorage
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...defaults };
      return { ...defaults, ...JSON.parse(saved) };
    } catch {
      return { ...defaults };
    }
  }

  let _state = load();

  // Salva su localStorage
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_state)); } catch {}
  }

  // Leggi valore
  function get(key) {
    if (!key) return _state;
    return key.split('.').reduce((o, k) => o?.[k], _state);
  }

  // Aggiorna valore (shallow merge per oggetti)
  function set(key, value) {
    const keys = key.split('.');
    let target = _state;
    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]];
    }
    const last = keys[keys.length - 1];
    if (typeof target[last] === 'object' && !Array.isArray(target[last]) && target[last] !== null && typeof value === 'object') {
      target[last] = { ...target[last], ...value };
    } else {
      target[last] = value;
    }
    save();
    _notify(key);
  }

  // Login utente
  function login(userData) {
    _state.user = userData;
    save();
    _notify('user');
  }

  // Logout
  function logout() {
    _state.user = null;
    _state.booking = { ...defaults.booking };
    save();
    _notify('user');
  }

  // Registrazione
  function register(userData) {
    _state.user = { ...userData, createdAt: new Date().toISOString() };
    save();
    _notify('user');
  }

  // Aggiungi prenotazione
  function addAppointment(apt) {
    _state.appointments.push(apt);
    // +100 punti per ogni prenotazione
    _state.fidelityPoints += 100;
    _state.pointsHistory.unshift({ date: new Date().toLocaleDateString('it-IT'), label: apt.service, points: +100 });
    save();
    _notify('appointments');
  }

  // Reset booking draft
  function resetBooking() {
    _state.booking = { ...defaults.booking };
    save();
  }

  // Aggiungi messaggio chat
  function addChatMessage(msg) {
    if (!_state.chatMessages.length) {
      // Inizializza con messaggi mock
      _state.chatMessages = [...(MockData?.chatMessages || [])];
    }
    _state.chatMessages.push(msg);
    save();
    _notify('chatMessages');
  }

  // Prossimo appuntamento (futuro più vicino)
  function nextAppointment() {
    const today = new Date();
    return _state.appointments
      .filter(a => new Date(a.date) >= today)
      .sort((a,b) => new Date(a.date) - new Date(b.date))[0] || null;
  }

  // Listeners semplici
  const _listeners = {};
  function on(key, fn) {
    if (!_listeners[key]) _listeners[key] = [];
    _listeners[key].push(fn);
  }
  function _notify(key) {
    (_listeners[key] || []).forEach(fn => fn(get(key)));
    (_listeners['*'] || []).forEach(fn => fn(key, get(key)));
  }

  // Incrementa visite
  function incrementVisit() {
    _state.visitCount++;
    save();
  }

  return { get, set, login, logout, register, addAppointment, resetBooking,
           addChatMessage, nextAppointment, incrementVisit, on };
})();
