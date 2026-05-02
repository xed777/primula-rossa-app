/* ─────────────────────────────────────────────────
   Schermata: Prenotazione (flusso 6 step)
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Prenota = (() => {
  const TOTAL_STEPS = 6;

  const services = [
    { id: 'tattoo',   icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 19c-4 0-7-3-7-7a7 7 0 0114 0"/><path d="M12 19v3"/><path d="M9 22h6"/><circle cx="12" cy="12" r="3"/><path d="M3 12h2M19 12h2M12 3v2M12 19v-4"/></svg>`,
      name: 'Tatuaggio', sub: 'Da €80 · Tutti gli stili', color: 'var(--accent)', artists: ['marco','sara','luca'] },
    { id: 'piercing', icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="5" r="1.5" fill="currentColor"/></svg>`,
      name: 'Piercing', sub: 'Da €35 · Titanio & Acciaio', color: 'var(--gold)', artists: ['marta'] },
    { id: 'dermopigm',icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 20h4l10.5-10.5a1.5 1.5 0 000-2.12l-1.88-1.88a1.5 1.5 0 00-2.12 0L4 16v4z"/><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"/></svg>`,
      name: 'Dermopigmentazione', sub: 'Da €120 · Solo su appuntamento', color: 'var(--error)', artists: ['elena'] },
  ];

  let booking = {};

  function resetBooking() {
    booking = State.get('booking') || { step: 1, service: null, artistId: null, description: '', date: null, time: null };
    booking.step = 1;
    State.resetBooking();
  }

  function stepBar(current) {
    const labels = ['Servizio','Artista','Idea','Data','Riepilogo','Conferma'];
    return `
      <div style="padding:12px 24px 0">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:11px;color:var(--text-2);font-weight:500">Step ${current} di ${TOTAL_STEPS}</span>
          <span style="font-size:11px;color:var(--accent);font-weight:600">${labels[current-1]}</span>
        </div>
        <div class="progress-track" style="margin-bottom:0">
          <div class="progress-fill" style="width:${(current/TOTAL_STEPS)*100}%"></div>
        </div>
      </div>`;
  }

  function stepFooter(nextLabel='Avanti', canNext=true, showBack=true) {
    return `
      <div style="padding:20px 24px calc(20px + var(--nav-h) + var(--safe-bottom));position:sticky;bottom:0;background:linear-gradient(to top,var(--bg) 80%,transparent)">
        <button class="btn btn-primary btn-full btn-lg" id="btn-next" ${canNext?'':'disabled'} onclick="Screens.Prenota.nextStep()">
          ${nextLabel}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>`;
  }

  // ── STEP 1: Servizio ──
  function renderStep1() {
    return `
      ${stepBar(1)}
      <div style="padding:24px 24px 0">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:6px">Di cosa hai bisogno?</h2>
        <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:24px">Scegli il tipo di servizio per iniziare.</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${services.map(s => `
            <button class="svc-btn" id="svc-${s.id}" onclick="Screens.Prenota.selectService('${s.id}')"
              style="display:flex;align-items:center;gap:16px;background:var(--surface);border:2px solid ${booking.service===s.id?s.color:'var(--border)'};border-radius:var(--r-xl);padding:18px;cursor:pointer;text-align:left;transition:all 0.15s;width:100%">
              <div style="width:52px;height:52px;border-radius:var(--r-md);background:${booking.service===s.id?s.color+'22':'var(--surface-2)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${s.color}">
                ${s.icon}
              </div>
              <div style="flex:1">
                <div style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:3px">${s.name}</div>
                <div style="font-size:12px;color:var(--text-2)">${s.sub}</div>
              </div>
              <div style="width:22px;height:22px;border-radius:50%;border:2px solid ${booking.service===s.id?s.color:'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                ${booking.service===s.id?`<div style="width:10px;height:10px;border-radius:50%;background:${s.color}"></div>`:''}
              </div>
            </button>`).join('')}
        </div>
      </div>
      ${stepFooter('Avanti', !!booking.service)}`;
  }

  // ── STEP 2: Artista ──
  function renderStep2() {
    const svc = services.find(s => s.id === booking.service);
    const availableArtists = MockData.artists.filter(a => svc?.artists.includes(a.id));

    return `
      ${stepBar(2)}
      <div style="padding:24px 24px 0">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:6px">Scegli il tuo artista</h2>
        <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:20px">Ogni artista ha il suo stile. Sfoglia il portfolio per trovare quello giusto per te.</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${availableArtists.map(a => `
            <button onclick="Screens.Prenota.selectArtist('${a.id}')"
              style="display:flex;align-items:flex-start;gap:14px;background:var(--surface);border:2px solid ${booking.artistId===a.id?'var(--accent)':'var(--border)'};border-radius:var(--r-xl);padding:16px;text-align:left;cursor:pointer;transition:all 0.15s;width:100%">
              <div style="width:56px;height:56px;border-radius:var(--r-md);overflow:hidden;flex-shrink:0">${Cards.artistAvatar(a,56)}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <span style="font-size:15px;font-weight:700;color:var(--text-1)">${a.name}</span>
                  ${a.available?`<span class="badge badge-success" style="font-size:10px">● Disponibile</span>`:`<span class="badge badge-neutral" style="font-size:10px">Da ${a.availableFrom}</span>`}
                </div>
                <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">${a.specialization}</div>
                <div style="display:flex;gap:5px;flex-wrap:wrap">
                  ${a.styles.slice(0,3).map(s=>`<span style="font-size:10px;padding:2px 7px;background:var(--surface-2);border:1px solid var(--border);border-radius:20px;color:var(--text-2)">${s}</span>`).join('')}
                </div>
                <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
                  <span style="font-size:11px;color:var(--text-3)">★ ${a.rating} · ${a.reviewCount} recensioni</span>
                  <button onclick="event.stopPropagation();App.navigate('/artisti/${a.id}')" style="font-size:11px;color:var(--accent);cursor:pointer;background:none;border:none">Portfolio →</button>
                </div>
              </div>
            </button>`).join('')}
        </div>
      </div>
      ${stepFooter('Avanti', !!booking.artistId)}`;
  }

  // ── STEP 3: Descrivi l'idea ──
  function renderStep3() {
    return `
      ${stepBar(3)}
      <div style="padding:24px 24px 0">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:6px">Racconta la tua idea</h2>
        <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:20px">Più dettagli ci dai, meglio il tuo artista potrà prepararsi. Niente è troppo vago o troppo preciso.</p>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="form-group">
            <label class="form-label">Descrivi la tua idea *</label>
            <textarea class="form-input form-textarea" id="desc-input" placeholder="Es: Voglio un tatuaggio floreale sul polso sinistro, fiori selvatici in stile acquerello, palette colori pastello..." rows="5">${booking.description||''}</textarea>
          </div>

          ${booking.service === 'tattoo' ? `
          <div class="form-group">
            <label class="form-label">Zona del corpo</label>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
              ${['Braccio','Avambraccio','Polso','Spalla','Petto','Costole','Schiena','Coscia','Caviglia'].map(z=>`
                <button onclick="Screens.Prenota.selectZone('${z}',this)"
                  class="zone-btn" data-zone="${z}"
                  style="padding:10px 6px;background:${booking.zone===z?'var(--accent-dim)':'var(--surface-2)'};border:1.5px solid ${booking.zone===z?'var(--accent-border)':'var(--border)'};border-radius:var(--r-md);font-size:12px;font-weight:500;color:${booking.zone===z?'var(--accent)':'var(--text-2)'};cursor:pointer;transition:all 0.15s">
                  ${z}
                </button>`).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Dimensione indicativa</label>
            <div style="display:flex;gap:8px">
              ${[{l:'XS',s:'2–4cm'},{l:'S',s:'5–7cm'},{l:'M',s:'8–12cm'},{l:'L',s:'13–20cm'},{l:'XL',s:'20cm+'}].map(d=>`
                <button onclick="Screens.Prenota.selectSize('${d.l}',this)"
                  style="flex:1;padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:3px;background:${booking.size===d.l?'var(--accent-dim)':'var(--surface-2)'};border:1.5px solid ${booking.size===d.l?'var(--accent-border)':'var(--border)'};border-radius:var(--r-md);cursor:pointer;transition:all 0.15s">
                  <span style="font-size:15px;font-weight:800;color:${booking.size===d.l?'var(--accent)':'var(--text-1)'};font-family:var(--font-mono)">${d.l}</span>
                  <span style="font-size:9px;color:var(--text-3)">${d.s}</span>
                </button>`).join('')}
            </div>
          </div>` : ''}

          <!-- Upload reference -->
          <div class="form-group">
            <label class="form-label">Immagini di riferimento <span style="color:var(--text-3)">(opzionale)</span></label>
            <div id="upload-area"
                 onclick="Screens.Prenota.simulateUpload()"
                 style="border:2px dashed var(--border);border-radius:var(--r-lg);padding:28px 20px;text-align:center;cursor:pointer;transition:border-color 0.2s;background:var(--surface-2)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5" stroke-linecap="round" style="margin:0 auto 10px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <p style="font-size:13px;color:var(--text-2);margin:0">Tocca per aggiungere foto o immagini di riferimento</p>
              <p style="font-size:11px;color:var(--text-3);margin-top:4px">JPG, PNG · Max 10MB</p>
            </div>
            <div id="upload-preview" style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"></div>
          </div>
        </div>
      </div>
      ${stepFooter('Avanti', true)}`;
  }

  // ── STEP 4: Data e Ora ──
  function renderStep4() {
    const today = new Date();
    const year  = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay() || 7; // lun=1
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const monthName = today.toLocaleString('it-IT', { month:'long', year:'numeric' });
    const slots = MockData.slots;

    // Trovo primo giorno con slot disponibili
    if (!booking.date) {
      const firstAvail = Object.keys(slots).sort()[0];
      if (firstAvail) booking.date = firstAvail;
    }

    const selectedDay = booking.date ? new Date(booking.date).getDate() : null;
    const selectedSlots = booking.date ? (slots[booking.date] || []) : [];

    const days = ['L','M','M','G','V','S','D'];

    return `
      ${stepBar(4)}
      <div style="padding:24px 24px 0">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:6px">Quando vieni da noi?</h2>
        <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:20px">I giorni evidenziati hanno slot disponibili.</p>

        <!-- Calendario -->
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:16px;margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <span style="font-size:15px;font-weight:600;color:var(--text-1);text-transform:capitalize">${monthName}</span>
            <div style="display:flex;gap:4px">
              <button style="width:32px;height:32px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);color:var(--text-2);cursor:pointer;display:flex;align-items:center;justify-content:center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button style="width:32px;height:32px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);color:var(--text-2);cursor:pointer;display:flex;align-items:center;justify-content:center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <!-- Intestazione giorni -->
          <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:8px">
            ${days.map(d=>`<div style="text-align:center;font-size:11px;font-weight:600;color:var(--text-3);padding:4px 0">${d}</div>`).join('')}
          </div>

          <!-- Griglia giorni -->
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">
            ${Array(firstDay-1).fill('').map(()=>`<div></div>`).join('')}
            ${Array.from({length:daysInMonth},(_,i)=>{
              const d = i+1;
              const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
              const hasSlots = slots[dateKey]?.some(s=>s.available);
              const isPast = new Date(dateKey) < new Date(today.toDateString());
              const isSelected = d === selectedDay;
              const isToday = d === today.getDate();
              let bg = 'transparent', color = 'var(--text-3)', border = 'transparent';
              if (isSelected) { bg='var(--accent)'; color='#000'; }
              else if (hasSlots) { bg='var(--surface-2)'; color='var(--text-1)'; border='var(--border)'; }
              else if (isPast)  { color='var(--text-3)'; }
              return `<button onclick="${hasSlots&&!isPast?`Screens.Prenota.selectDate('${dateKey}')`:''}"
                style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:${isSelected||isToday?700:500};color:${color};background:${bg};border:1px solid ${border};border-radius:50%;cursor:${hasSlots&&!isPast?'pointer':'default'};position:relative;transition:all 0.15s">
                ${d}
                ${hasSlots&&!isPast&&!isSelected?`<span style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--accent)"></span>`:''}
              </button>`;
            }).join('')}
          </div>
        </div>

        <!-- Slot orari -->
        ${booking.date ? `
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--text-2);margin-bottom:12px">
            Orari disponibili — ${new Date(booking.date+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'})}
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
            ${selectedSlots.map(s=>`
              <button onclick="${s.available?`Screens.Prenota.selectTime('${s.time}')`:''}"
                style="padding:12px;text-align:center;background:${booking.time===s.time?'var(--accent-dim)':s.available?'var(--surface)':'var(--surface-2)'};border:1.5px solid ${booking.time===s.time?'var(--accent-border)':s.available?'var(--border)':'var(--border)'};border-radius:var(--r-md);font-size:14px;font-weight:600;color:${booking.time===s.time?'var(--accent)':s.available?'var(--text-1)':'var(--text-3)'};cursor:${s.available?'pointer':'default'};${!s.available?'text-decoration:line-through':''};transition:all 0.15s;font-family:var(--font-mono)">
                ${s.time}
              </button>`).join('')}
          </div>
        </div>` : ''}
      </div>
      ${stepFooter('Avanti', !!(booking.date && booking.time))}`;
  }

  // ── STEP 5: Riepilogo ──
  function renderStep5() {
    const artist = MockData.artists.find(a => a.id === booking.artistId);
    const svc = services.find(s => s.id === booking.service);
    const dateStr = booking.date ? new Date(booking.date+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) : '—';

    return `
      ${stepBar(5)}
      <div style="padding:24px 24px 0">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:6px">Tutto a posto?</h2>
        <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:20px">Rivedi i dettagli prima di confermare.</p>

        <div class="card" style="margin-bottom:16px">
          ${[
            ['Servizio', svc?.name || '—'],
            ['Artista',  artist?.name || '—'],
            ['Zona',     booking.zone || (booking.service!=='tattoo'?'—':'Non specificata')],
            ['Dimensione', booking.size || (booking.service!=='tattoo'?'—':'Non specificata')],
            ['Data',     dateStr],
            ['Ora',      booking.time || '—'],
            ['Sede',     'Via Recchi 3, 22100 Como'],
          ].map(([k,v],i,arr)=>`
            <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:13px 16px;${i<arr.length-1?'border-bottom:1px solid var(--border)':''}">
              <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-2)">${k}</span>
              <span style="font-size:14px;font-weight:600;color:var(--text-1);text-align:right;max-width:55%">${v}</span>
            </div>`).join('')}
        </div>

        ${booking.description ? `
        <div class="card" style="margin-bottom:16px">
          <div class="card-body">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:8px">La tua idea</div>
            <p style="font-size:13px;color:var(--text-1);margin:0;line-height:1.5">${booking.description}</p>
          </div>
        </div>` : ''}

        <div style="background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:8px;display:flex;gap:10px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="var(--accent)"/></svg>
          <p style="font-size:12px;color:var(--text-2);margin:0;line-height:1.5">Riceverai un reminder 24h prima. Per modifiche o annullamenti, contattaci almeno 48h prima.</p>
        </div>

        <div style="background:var(--gold-dim);border:1px solid var(--gold-border);border-radius:var(--r-lg);padding:12px 16px;display:flex;align-items:center;gap:10px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
          <p style="font-size:12px;color:var(--gold);margin:0;font-weight:600">Questa prenotazione ti vale <strong>+100 punti fedeltà</strong></p>
        </div>
      </div>
      ${stepFooter('Conferma prenotazione', true)}`;
  }

  // ── STEP 6: Conferma + QR ──
  function renderStep6() {
    const artist = MockData.artists.find(a => a.id === booking.artistId);
    const svc = services.find(s => s.id === booking.service);
    const dateStr = booking.date ? new Date(booking.date+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'}) : '—';
    const bookingCode = 'PR-' + Math.random().toString(36).substr(2,6).toUpperCase();

    return `
      <div class="screen screen--no-nav" id="prenota-screen" style="padding:0;display:flex;flex-direction:column;align-items:center">
        <div style="width:100%;padding:48px 32px 32px;text-align:center;background:linear-gradient(180deg,#0a1a1a,var(--bg))">
          <div style="width:72px;height:72px;border-radius:50%;background:var(--success-dim);border:2px solid var(--success);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg>
          </div>
          <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:var(--text-1);margin-bottom:8px">Sei in lista.</h1>
          <p style="font-size:var(--text-md);color:var(--text-2);margin-bottom:4px">A presto in studio.</p>
          <p style="font-size:13px;color:var(--text-3)">${dateStr} · ore ${booking.time}</p>
        </div>

        <div style="padding:0 24px 32px;width:100%">
          <!-- QR Code -->
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:24px;text-align:center;margin-bottom:16px">
            <div class="qr-container" style="margin-bottom:14px">
              ${Cards.qrSvg(bookingCode)}
            </div>
            <div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:var(--text-1);letter-spacing:0.12em;margin-bottom:4px">${bookingCode}</div>
            <div style="font-size:11px;color:var(--text-3)">Mostra questo QR all\'arrivo in studio</div>
          </div>

          <!-- Riepilogo compatto -->
          <div class="card" style="margin-bottom:16px">
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:44px;height:44px;border-radius:var(--r-md);overflow:hidden;flex-shrink:0">${artist?Cards.artistAvatar(artist,44):''}</div>
                <div>
                  <div style="font-size:14px;font-weight:700;color:var(--text-1)">${svc?.name}</div>
                  <div style="font-size:12px;color:var(--text-2)">${artist?.name} · ${booking.time}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Punti guadagnati -->
          <div style="background:var(--gold-dim);border:1px solid var(--gold-border);border-radius:var(--r-lg);padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:24px">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--gold)">+100 punti aggiunti!</div>
              <div style="font-size:12px;color:var(--text-2)">Totale: ${State.get('fidelityPoints')} punti</div>
            </div>
          </div>

          <button class="btn btn-primary btn-full btn-lg" onclick="App.navigate('/home')">
            Torna alla Home
          </button>
          <button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="App.navigate('/profilo')">
            Vedi i tuoi appuntamenti
          </button>
        </div>
      </div>`;
  }

  function render() {
    const step = booking.step || 1;
    const steps = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6];
    const header = step < 6 ? `
      <div class="app-header" style="position:sticky;top:0;z-index:50">
        <button class="header-back" onclick="Screens.Prenota.prevStep()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span class="app-header-title">Prenotazione</span>
        <button onclick="Screens.Prenota.saveDraft()" style="font-size:12px;color:var(--text-2);background:none;border:none;cursor:pointer;padding:4px">Salva bozza</button>
      </div>` : '';

    return `
      <div class="screen" id="prenota-screen">
        ${header}
        ${steps[step-1]()}
      </div>
      ${step < 6 ? Navbar.render('/prenota') : ''}`;
  }

  function init() {
    const descInput = document.getElementById('desc-input');
    if (descInput) {
      descInput.addEventListener('input', e => { booking.description = e.target.value; });
      // Fix: tastiera non copre il campo
      descInput.addEventListener('focus', () => {
        setTimeout(() => descInput.scrollIntoView({ behavior:'smooth', block:'center' }), 300);
      });
    }
  }

  function nextStep() {
    if (booking.step === 3) {
      const d = document.getElementById('desc-input');
      if (d) booking.description = d.value;
    }
    if (booking.step === 5) {
      // Conferma: crea appuntamento
      const artist = MockData.artists.find(a => a.id === booking.artistId);
      const svc = services.find(s => s.id === booking.service);
      State.addAppointment({
        id: 'apt-' + Date.now(),
        service: svc?.name || booking.service,
        artist: artist?.name || booking.artistId,
        artistId: booking.artistId,
        date: booking.date,
        time: booking.time,
        status: 'confermato',
        duration: '~2h',
        studio: 'Via Recchi 3, Como',
      });
      booking.step = 6;
    } else {
      booking.step = Math.min(booking.step + 1, TOTAL_STEPS);
    }
    App.renderScreen('prenota', render(), true, false);
    setTimeout(init, 50);
    window.scrollTo(0,0);
  }

  function prevStep() {
    if (booking.step <= 1) { App.navigate('/home'); return; }
    booking.step--;
    App.renderScreen('prenota', render(), false, true);
    setTimeout(init, 50);
  }

  function selectService(id) {
    booking.service = id;
    document.querySelectorAll('.svc-btn').forEach(btn => {
      const isSelected = btn.id === 'svc-' + id;
      const svc = services.find(s => s.id === btn.id.replace('svc-',''));
      if (svc) {
        btn.style.borderColor = isSelected ? svc.color : 'var(--border)';
        const ico = btn.querySelector('div:first-child');
        if (ico) ico.style.background = isSelected ? svc.color+'22' : 'var(--surface-2)';
      }
    });
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.disabled = false;
  }

  function selectArtist(id) {
    booking.artistId = id;
    document.querySelectorAll('button[onclick*="selectArtist"]').forEach(btn => {
      const sel = btn.getAttribute('onclick').includes(`'${id}'`);
      btn.style.borderColor = sel ? 'var(--accent)' : 'var(--border)';
    });
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.disabled = false;
  }

  function selectZone(zone, btn) {
    booking.zone = zone;
    document.querySelectorAll('.zone-btn').forEach(b => {
      const sel = b.dataset.zone === zone;
      b.style.background = sel ? 'var(--accent-dim)' : 'var(--surface-2)';
      b.style.borderColor = sel ? 'var(--accent-border)' : 'var(--border)';
      b.style.color = sel ? 'var(--accent)' : 'var(--text-2)';
    });
  }

  function selectSize(size, btn) {
    booking.size = size;
    document.querySelectorAll('button[onclick*="selectSize"]').forEach(b => {
      const sel = b.getAttribute('onclick')?.includes(`'${size}'`);
      b.style.background = sel ? 'var(--accent-dim)' : 'var(--surface-2)';
      b.style.borderColor = sel ? 'var(--accent-border)' : 'var(--border)';
      const num = b.querySelector('span:first-child');
      if (num) num.style.color = sel ? 'var(--accent)' : 'var(--text-1)';
    });
  }

  function selectDate(dateKey) {
    booking.date = dateKey;
    booking.time = null;
    App.renderScreen('prenota', render(), false, false);
    setTimeout(init, 50);
  }

  function selectTime(time) {
    booking.time = time;
    document.querySelectorAll('button[onclick*="selectTime"]').forEach(btn => {
      const sel = btn.getAttribute('onclick')?.includes(`'${time}'`);
      btn.style.background = sel ? 'var(--accent-dim)' : 'var(--surface)';
      btn.style.borderColor = sel ? 'var(--accent-border)' : 'var(--border)';
      btn.style.color = sel ? 'var(--accent)' : 'var(--text-1)';
    });
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.disabled = false;
  }

  function simulateUpload() {
    const preview = document.getElementById('upload-preview');
    const area = document.getElementById('upload-area');
    if (!preview) return;
    const colors = ['#1a0f0f','#0f1a0f','#0f0f1a'];
    const idx = preview.children.length;
    if (idx >= 4) { Cards.showToast('Massimo 4 immagini', 'info'); return; }
    const item = document.createElement('div');
    item.style.cssText = `width:72px;height:72px;border-radius:var(--r-md);background:${colors[idx%3]};border:1px solid var(--border);display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0`;
    item.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg><button onclick="this.parentElement.remove()" style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:var(--error);color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none">×</button>`;
    preview.appendChild(item);
    area.style.borderColor = 'var(--accent-border)';
    Cards.showToast('Immagine aggiunta!', 'success', 1500);
  }

  function saveDraft() {
    State.set('booking', { ...booking });
    Cards.showToast('Bozza salvata! Puoi riprendere da dove hai lasciato.', 'success');
  }

  function startWith(artistId) {
    resetBooking();
    booking.service = 'tattoo';
    booking.artistId = artistId;
    booking.step = 3;
    App.renderScreen('prenota', render(), true, false);
    setTimeout(init, 50);
    Navbar.update('/prenota');
  }

  return { render, init, nextStep, prevStep, selectService, selectArtist, selectZone, selectSize, selectDate, selectTime, simulateUpload, saveDraft, startWith, resetBooking };
})();
