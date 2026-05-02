/* ─────────────────────────────────────────────────
   Schermata: Profilo Utente
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Profilo = (() => {

  function render() {
    const user = State.get('user');
    if (!user) return renderGuest();
    return renderLoggedIn(user);
  }

  function renderGuest() {
    return `
      <div class="screen" id="profilo-screen">
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <span class="app-header-title">Profilo</span>
        </div>
        <div class="empty-state" style="padding-top:60px">
          <div style="width:80px;height:80px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;margin-bottom:8px;border:2px solid var(--border)">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <h2 style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-1);margin-bottom:8px">Accedi o registrati</h2>
          <p style="font-size:var(--text-sm);color:var(--text-2);max-width:260px;margin-bottom:28px">Tieni traccia dei tuoi appuntamenti, accumula punti e ricevi offerte riservate.</p>
          <button class="btn btn-primary btn-lg btn-full" style="max-width:280px" onclick="App.navigate('/login')">
            Accedi
          </button>
          <button class="btn btn-ghost btn-full" style="max-width:280px;margin-top:10px" onclick="App.navigate('/register')">
            Crea account gratuito
          </button>
        </div>
      </div>
      ${Navbar.render('/profilo')}`;
  }

  function renderLoggedIn(user) {
    const appointments = State.get('appointments') || [];
    const pts = State.get('fidelityPoints');
    const notifs = State.get('notifications');
    const now = new Date();
    const future = appointments.filter(a => new Date(a.date) >= now);
    const past   = appointments.filter(a => new Date(a.date) <  now);

    return `
      <div class="screen" id="profilo-screen">
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <span class="app-header-title">Profilo</span>
          <button class="header-btn" onclick="Screens.Profilo.editProfile()">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>

        <!-- Hero profilo -->
        <div style="padding:24px 24px 20px;display:flex;align-items:center;gap:16px">
          <div style="width:72px;height:72px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:30px;border:2px solid var(--accent-border);flex-shrink:0">
            ${user.avatar || '🧑'}
          </div>
          <div style="flex:1">
            <h2 style="font-size:var(--text-lg);font-weight:700;color:var(--text-1);margin-bottom:3px">${user.nome} ${user.cognome||''}</h2>
            <p style="font-size:12px;color:var(--text-2);margin:0">${user.email}</p>
            <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
              <span style="font-size:12px;color:var(--gold);font-family:var(--font-mono);font-weight:600">${pts} punti</span>
              <button onclick="App.navigate('/fidelity')" style="font-size:11px;color:var(--accent);cursor:pointer;background:none;border:none">Vedi premi →</button>
            </div>
          </div>
        </div>

        <div class="divider-sm"></div>

        <!-- Appuntamenti futuri -->
        <div style="padding:16px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Appuntamenti in programma (${future.length})</div>
          ${future.length ? future.map(a=>`
            <div class="card" style="margin-bottom:10px;border-left:3px solid var(--accent)">
              <div class="card-body">
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-md);padding:8px 10px;text-align:center;min-width:46px;flex-shrink:0">
                    <div style="font-size:20px;font-weight:900;color:var(--text-1);line-height:1">${new Date(a.date).getDate()}</div>
                    <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:var(--text-2)">${new Date(a.date).toLocaleString('it-IT',{month:'short'})}</div>
                  </div>
                  <div style="flex:1">
                    <div style="font-size:14px;font-weight:700;color:var(--text-1);margin-bottom:3px">${a.service}</div>
                    <div style="font-size:12px;color:var(--text-2)">${a.artist} · ${a.time}</div>
                  </div>
                  <span class="badge badge-success" style="font-size:10px">✓</span>
                </div>
              </div>
            </div>`).join('') : `
            <div style="text-align:center;padding:20px;background:var(--surface-2);border-radius:var(--r-lg);border:1px dashed var(--border)">
              <p style="font-size:13px;color:var(--text-2);margin-bottom:12px">Nessun appuntamento in programma.</p>
              <button class="btn btn-outline btn-sm" onclick="App.navigate('/prenota')">Prenota ora</button>
            </div>`}
        </div>

        <!-- Storico visite -->
        ${past.length ? `
        <div style="padding:16px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Storico visite</div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden">
            ${past.slice(0,4).map((a,i,arr)=>`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;${i<arr.length-1?'border-bottom:1px solid var(--border)':''}">
                <div style="font-size:22px;">🖋</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:var(--text-1)">${a.service}</div>
                  <div style="font-size:11px;color:var(--text-3)">${a.artist} · ${new Date(a.date).toLocaleDateString('it-IT')}</div>
                </div>
                <span class="badge badge-neutral" style="font-size:10px">Completato</span>
              </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Documenti -->
        <div style="padding:16px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Documenti</div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden">
            ${[
              { icon:'📋', label:'Consenso informato — Giu 2024',   status:'Firmato' },
              { icon:'📋', label:'Modulo piercing — Nov 2024',       status:'Firmato' },
            ].map((d,i,arr)=>`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;${i<arr.length-1?'border-bottom:1px solid var(--border)':''}">
                <div style="font-size:20px">${d.icon}</div>
                <div style="flex:1;font-size:13px;color:var(--text-1)">${d.label}</div>
                <span class="badge badge-success" style="font-size:10px">${d.status}</span>
              </div>`).join('')}
            <div style="padding:12px 16px;border-top:1px solid var(--border)">
              <button style="font-size:12px;color:var(--accent);cursor:pointer;background:none;border:none;font-weight:500">+ Aggiungi documento</button>
            </div>
          </div>
        </div>

        <!-- Notifiche -->
        <div style="padding:16px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Notifiche</div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden">
            ${[
              { key:'reminders', label:'Reminder appuntamento',   sub:'24h e 1h prima'      },
              { key:'promos',    label:'Promozioni e offerte',    sub:'Coupon riservati'     },
              { key:'news',      label:'Novità dallo studio',     sub:'Artisti ospiti, eventi' },
            ].map((n,i,arr)=>`
              <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;${i<arr.length-1?'border-bottom:1px solid var(--border)':''}">
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-1)">${n.label}</div>
                  <div style="font-size:11px;color:var(--text-3)">${n.sub}</div>
                </div>
                <label class="switch" onclick="Screens.Profilo.toggleNotif('${n.key}')">
                  <input type="checkbox" ${(notifs||{})[n.key]!==false?'checked':''} onclick="event.stopPropagation()">
                  <span class="switch-track"></span>
                </label>
              </div>`).join('')}
          </div>
        </div>

        <!-- Impostazioni -->
        <div style="padding:16px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Impostazioni</div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden">
            ${[
              { icon:'🌐', label:'Lingua',          sub:'Italiano',       action:`App.navigate('/lingua')` },
              { icon:'🔒', label:'Privacy e dati',  sub:'',               action:`Screens.Profilo.privacy()` },
              { icon:'💬', label:'Contattaci',      sub:'chat · tel',     action:`App.navigate('/chat')` },
              { icon:'⭐', label:'Lascia una recensione', sub:'',         action:`Screens.Profilo.review()` },
              { icon:'📲', label:'Installa l\'app', sub:'Aggiungi alla Home Screen', action:`App.showInstallPrompt()` },
            ].map((s,i,arr)=>`
              <button onclick="${s.action}" style="display:flex;align-items:center;gap:12px;padding:13px 16px;width:100%;text-align:left;${i<arr.length-1?'border-bottom:1px solid var(--border)':''};background:none;cursor:pointer">
                <div style="width:34px;height:34px;background:var(--surface-2);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${s.icon}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:var(--text-1)">${s.label}</div>
                  ${s.sub?`<div style="font-size:11px;color:var(--text-3)">${s.sub}</div>`:''}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>`).join('')}
          </div>
        </div>

        <!-- Logout -->
        <div style="padding:16px 24px 24px">
          <button class="btn btn-danger btn-full" onclick="Screens.Profilo.logout()">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Esci dall'account
          </button>
          <p style="font-size:11px;color:var(--text-3);text-align:center;margin-top:16px">
            App sviluppata da <a href="https://xed.agency" style="color:var(--text-3)">Xed</a> — <a href="https://xed.agency" style="color:var(--accent)">xed.agency</a>
          </p>
        </div>

      </div>
      ${Navbar.render('/profilo')}`;
  }

  function init() {}

  function editProfile() {
    Cards.showToast('Modifica profilo — disponibile prossimamente.', 'info');
  }

  function toggleNotif(key) {
    const notifs = State.get('notifications') || {};
    notifs[key] = !notifs[key];
    State.set('notifications', notifs);
  }

  function privacy() {
    Cards.showToast('Privacy & Dati: tutti i tuoi dati sono salvati localmente.', 'info');
  }

  function review() {
    Cards.showToast('Grazie! Ci trovi su Google Maps come "La Primula Rossa Como".', 'success');
  }

  function logout() {
    if (confirm('Sei sicuro di voler uscire?')) {
      State.logout();
      App.navigate('/login');
      setTimeout(() => Cards.showToast('Uscita effettuata.', 'info'), 300);
    }
  }

  return { render, init, editProfile, toggleNotif, privacy, review, logout };
})();
