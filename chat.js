/* ─────────────────────────────────────────────────
   Schermata: Chat / Consulenza
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Chat = (() => {
  const STUDIO_OPEN = true; // simula orario apertura

  function render() {
    let messages = State.get('chatMessages');
    if (!messages || !messages.length) {
      messages = [...MockData.chatMessages];
      State.set('chatMessages', messages);
    }

    return `
      <div class="screen" id="chat-screen" style="display:flex;flex-direction:column;padding-bottom:0">

        <!-- Header -->
        <div class="app-header" style="position:sticky;top:0;z-index:50;flex-shrink:0">
          <button class="header-back" onclick="App.navigate('/home')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="position:relative">
              <div style="width:36px;height:36px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:16px">🌺</div>
              <div style="position:absolute;bottom:1px;right:1px;width:9px;height:9px;border-radius:50%;background:${STUDIO_OPEN?'var(--success)':'var(--text-3)'};border:2px solid var(--bg)"></div>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text-1)">La Primula Rossa</div>
              <div style="font-size:11px;color:${STUDIO_OPEN?'var(--success)':'var(--text-3)'}">
                ${STUDIO_OPEN ? '● Online · risponde entro pochi min' : '○ Fuori orario · risponde entro 24h'}
              </div>
            </div>
          </div>
          <div style="width:40px"></div>
        </div>

        <!-- Orario info banner -->
        ${!STUDIO_OPEN ? `
        <div style="padding:10px 16px;background:var(--surface-2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;flex-shrink:0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span style="font-size:12px;color:var(--text-2)">Siamo aperti Mar–Sab 10:00–19:00. Ti risponderemo entro 24h.</span>
        </div>` : ''}

        <!-- Messaggi -->
        <div id="chat-messages"
             style="flex:1;overflow-y:auto;padding:16px 16px;display:flex;flex-direction:column;gap:10px;min-height:0;padding-bottom:calc(80px + var(--nav-h) + var(--safe-bottom))">
          ${messages.map(m => renderMessage(m)).join('')}
        </div>

        <!-- Quick replies -->
        <div id="quick-replies"
             style="display:flex;gap:8px;padding:8px 16px;overflow-x:auto;scrollbar-width:none;flex-shrink:0;position:fixed;bottom:calc(var(--nav-h) + var(--safe-bottom) + 64px);left:50%;transform:translateX(-50%);width:100%;max-width:var(--max-w);pointer-events:auto">
          ${['Disponibilità questa settimana','Prezzi tatuaggi','Come prepararmi','Dove siete?'].map(t=>`
            <button onclick="Screens.Chat.sendQuick('${t}')" class="chip" style="white-space:nowrap;font-size:12px">${t}</button>
          `).join('')}
        </div>

        <!-- Input -->
        <div style="position:fixed;bottom:calc(var(--nav-h) + var(--safe-bottom));left:50%;transform:translateX(-50%);width:100%;max-width:var(--max-w);background:rgba(10,10,10,0.98);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:10px 16px;display:flex;gap:10px;align-items:center">
          <button onclick="Screens.Chat.attachPhoto()"
                  style="width:40px;height:40px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;color:var(--text-2)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
          </button>
          <input id="chat-input"
                 type="text"
                 placeholder="Scrivi un messaggio..."
                 style="flex:1;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-pill);padding:10px 16px;font-size:14px;color:var(--text-1);outline:none;min-height:44px"
                 onkeydown="if(event.key==='Enter')Screens.Chat.sendMessage()"/>
          <button onclick="Screens.Chat.sendMessage()"
                  style="width:44px;height:44px;background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:opacity 0.15s">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
          </button>
        </div>

      </div>
      ${Navbar.render('/chat')}`;
  }

  function renderMessage(msg) {
    const isUser = msg.from === 'user';
    return `
      <div style="display:flex;flex-direction:column;align-items:${isUser?'flex-end':'flex-start'};gap:3px">
        ${!isUser ? `<div style="font-size:10px;font-weight:600;color:var(--text-3);padding:0 12px">La Primula Rossa · Studio</div>` : ''}
        <div style="max-width:78%;background:${isUser?'var(--accent)':'var(--surface-2)'};color:${isUser?'#000':'var(--text-1)'};padding:10px 14px;border-radius:${isUser?'18px 18px 4px 18px':'18px 18px 18px 4px'};font-size:14px;line-height:1.5">
          ${msg.text}
          ${msg.image ? `<div style="margin-top:8px;border-radius:10px;overflow:hidden;width:160px;height:120px;background:var(--surface-3);display:flex;align-items:center;justify-content:center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
          </div>` : ''}
        </div>
        <div style="font-size:10px;color:var(--text-3);padding:0 12px">${msg.time}</div>
      </div>`;
  }

  function init() {
    scrollToBottom();
  }

  function scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) setTimeout(() => container.scrollTop = container.scrollHeight, 50);
  }

  function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = '';

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    State.addChatMessage({ from: 'user', text, time });

    // Aggiorna UI
    const container = document.getElementById('chat-messages');
    if (container) {
      const el = document.createElement('div');
      el.innerHTML = renderMessage({ from: 'user', text, time });
      el.firstElementChild.classList.add('fade-in');
      container.appendChild(el.firstElementChild);
      scrollToBottom();
    }

    // Auto-risposta dopo 1.5s
    setTimeout(() => {
      const reply = getAutoReply(text);
      const replyTime = new Date();
      const rTime = `${replyTime.getHours()}:${String(replyTime.getMinutes()).padStart(2,'0')}`;
      State.addChatMessage({ from: 'studio', text: reply, time: rTime });
      if (container) {
        const el = document.createElement('div');
        el.innerHTML = renderMessage({ from: 'studio', text: reply, time: rTime });
        el.firstElementChild.classList.add('fade-in');
        container.appendChild(el.firstElementChild);
        scrollToBottom();
      }
    }, 1500);
  }

  function sendQuick(text) {
    const input = document.getElementById('chat-input');
    if (input) { input.value = text; sendMessage(); }
  }

  function attachPhoto() {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    State.addChatMessage({ from: 'user', text: 'Ho allegato un\'immagine di riferimento.', time, image: true });
    const container = document.getElementById('chat-messages');
    if (container) {
      const el = document.createElement('div');
      el.innerHTML = renderMessage({ from: 'user', text: 'Ho allegato un\'immagine di riferimento.', time, image: true });
      el.firstElementChild.classList.add('fade-in');
      container.appendChild(el.firstElementChild);
      scrollToBottom();
    }
    setTimeout(() => {
      const t = new Date(); const rt = `${t.getHours()}:${String(t.getMinutes()).padStart(2,'0')}`;
      const msg = { from:'studio', text:'Ottima riferimento! È molto utile per il tuo artista. Vuoi procedere con la prenotazione? 🙂', time:rt };
      State.addChatMessage(msg);
      if (container) {
        const el = document.createElement('div');
        el.innerHTML = renderMessage(msg);
        el.firstElementChild.classList.add('fade-in');
        container.appendChild(el.firstElementChild);
        scrollToBottom();
      }
    }, 1800);
  }

  function getAutoReply(text) {
    const t = text.toLowerCase();
    if (t.includes('prezzo') || t.includes('costo') || t.includes('quanto')) return 'I prezzi partono da €80 per tatuaggi piccoli e da €35 per piercing. Per un preventivo preciso ti serve una consulenza con il tuo artista. Vuoi prenotarla?';
    if (t.includes('disponib') || t.includes('quando') || t.includes('appuntamento')) return 'Marco e Sara hanno disponibilità già questa settimana! Luca è disponibile da giovedì 29. Posso farti vedere gli slot nell\'app se vuoi 📅';
    if (t.includes('dove') || t.includes('indirizzo') || t.includes('come arrivare')) return 'Siamo in Via Recchi 3, 22100 Como CO. A due passi dalla Porta Torre. Parcheggio in Via Plinio. Apriamo Martedì–Sabato 10:00–19:00 🗺';
    if (t.includes('prepara') || t.includes('prima di')) return 'Per il giorno del tatuaggio: mangia bene, idrata la pelle nei giorni precedenti, indossa vestiti comodi. Per i piercing: niente aspirina le 24h prima. Hai altre domande?';
    if (t.includes('cura') || t.includes('dopo') || t.includes('guarigione')) return 'Dopo il tatuaggio: tieni la pellicola 4-6h, poi lava con acqua e sapone neutro, applica Hustle Butter 2x al giorno per 2 settimane. Te ne diamo un tester gratuitamente in studio!';
    return 'Grazie per il messaggio! Ti rispondo il prima possibile. Se vuoi prenotare subito, puoi farlo direttamente dall\'app in pochi tap 🌺';
  }

  return { render, init, sendMessage, sendQuick, attachPhoto };
})();
