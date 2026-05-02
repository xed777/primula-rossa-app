/* ─────────────────────────────────────────────────
   Schermata: Home Dashboard
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Home = (() => {
  let bannerIdx = 0;
  let bannerTimer = null;

  const banners = [
    {
      tag: '🗓 Artista Ospite',
      title: 'Kevin Bouchard\nda Montreal',
      sub: '12–14 Giugno · Pochi slot disponibili',
      cta: 'Prenota ora',
      color: '#0a1a1a',
      accent: '#2ABFBF',
      route: '/prenota',
    },
    {
      tag: '🎉 Promozione',
      title: '–15% su tutti\ni piercing',
      sub: 'Fino al 31 Maggio · Solo con l\'app',
      cta: 'Scopri l\'offerta',
      color: '#1a0a1a',
      accent: '#C9A84C',
      route: '/shop',
    },
    {
      tag: '📍 Studio',
      title: 'La Primula Rossa\ndal 1991',
      sub: 'Via Recchi 3, Como · Mar–Sab 10–19',
      cta: 'La nostra storia',
      color: '#0a0a14',
      accent: '#4CAF7D',
      route: '/storia',
    },
  ];

  const quickActions = [
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="8" y2="14" stroke-width="2.5"/><line x1="12" y1="14" x2="12" y2="14" stroke-width="2.5"/><line x1="16" y1="14" x2="16" y2="14" stroke-width="2.5"/></svg>`, label: 'Prenota', route: '/prenota', accent: true },
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`, label: 'Portfolio', route: '/galleria', accent: false },
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.71L22 6H6"/></svg>`, label: 'Shop', route: '/shop', accent: false },
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`, label: 'Fidelity', route: '/fidelity', accent: false },
  ];

  function renderBanner(b) {
    return `
      <div style="background:${b.color};border:1px solid var(--border);border-radius:var(--r-xl);padding:24px;position:relative;overflow:hidden;min-height:140px;display:flex;flex-direction:column;justify-content:space-between">
        <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:radial-gradient(circle,${b.accent}22,transparent 70%);border-radius:50%;pointer-events:none"></div>
        <span class="badge" style="background:${b.accent}20;color:${b.accent};border:1px solid ${b.accent}30;width:fit-content">${b.tag}</span>
        <div>
          <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--text-1);line-height:1.2;margin-bottom:4px;white-space:pre-line">${b.title}</h2>
          <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:14px">${b.sub}</p>
          <button class="btn btn-sm" onclick="App.navigate('${b.route}')"
                  style="background:${b.accent};color:#000;border-radius:var(--r-pill);font-weight:600;font-size:13px;padding:0 16px;min-height:34px">
            ${b.cta}
          </button>
        </div>
      </div>`;
  }

  function render() {
    const user = State.get('user');
    const nextAppt = State.nextAppointment();
    const points = State.get('fidelityPoints');
    const news = MockData.news;
    const b = banners[bannerIdx];

    return `
      <div class="screen" id="home-screen" style="padding-top:0">

        <!-- ── Header ── -->
        <header style="position:sticky;top:0;z-index:50;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 24px">
          <div style="display:flex;align-items:center;justify-content:space-between;height:56px">
            <!-- Logo -->
            <div style="display:flex;align-items:center;gap:10px">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <rect width="28" height="28" rx="7" fill="var(--surface-2)"/>
                <g transform="translate(14,12)">
                  <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="var(--accent)" transform="rotate(0)" opacity="0.9"/>
                  <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="var(--accent)" transform="rotate(72)" opacity="0.9"/>
                  <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="var(--accent)" transform="rotate(144)" opacity="0.9"/>
                  <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="var(--accent)" transform="rotate(216)" opacity="0.9"/>
                  <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="var(--accent)" transform="rotate(288)" opacity="0.9"/>
                  <circle cx="0" cy="0" r="3.5" fill="var(--gold)"/>
                </g>
              </svg>
              <span style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--text-1);letter-spacing:-0.01em">La Primula Rossa</span>
            </div>
            <!-- Actions -->
            <div style="display:flex;gap:8px">
              <button class="header-btn" onclick="App.navigate('/chat')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                <span class="badge"></span>
              </button>
              <button class="header-btn" onclick="App.navigate('/profilo')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </button>
            </div>
          </div>
          <!-- Greeting -->
          <div style="padding-bottom:12px">
            <p style="font-size:var(--text-sm);color:var(--text-2);margin:0">
              ${user ? `Ciao, <strong style="color:var(--text-1)">${user.nome}</strong> 👋` : 'Benvenuto 👋'}
            </p>
            ${user ? `<div style="display:flex;align-items:center;gap:6px;margin-top:4px">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
              <span style="font-size:12px;color:var(--gold);font-family:var(--font-mono)">${points} punti · </span>
              <span class="badge badge-gold" style="font-size:10px;padding:2px 7px">${points >= 700 ? 'Platinum' : points >= 400 ? 'Gold' : 'Silver'}</span>
            </div>` : ''}
          </div>
        </header>

        <div style="padding:20px 24px 0">

          <!-- ── Banner rotante ── -->
          <div id="home-banner">${renderBanner(b)}</div>
          <!-- Dots banner -->
          <div style="display:flex;justify-content:center;gap:6px;margin-top:10px;margin-bottom:20px">
            ${banners.map((_,i) => `<div id="bdot-${i}" style="width:${i===bannerIdx?'18px':'6px'};height:6px;border-radius:99px;background:${i===bannerIdx?'var(--accent)':'var(--border-light)'};transition:all 0.3s;cursor:pointer" onclick="Screens.Home.setBanner(${i})"></div>`).join('')}
          </div>

          <!-- ── Quick Actions ── -->
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px">
            ${quickActions.map(a => `
              <button onclick="App.navigate('${a.route}')"
                style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--surface);border:1px solid ${a.accent?'var(--accent-border)':'var(--border)'};border-radius:var(--r-lg);padding:16px 8px;cursor:pointer;transition:all 0.15s;min-height:80px;color:${a.accent?'var(--accent)':'var(--text-2)'}">
                ${a.icon}
                <span style="font-size:11px;font-weight:600;color:${a.accent?'var(--accent)':'var(--text-1)'}">${a.label}</span>
              </button>`).join('')}
          </div>

          <!-- ── Prossimo appuntamento ── -->
          ${nextAppt ? `
          <div class="section-header" style="padding:0 0 12px">
            <span class="section-title">Prossimo appuntamento</span>
            <span class="section-link" onclick="App.navigate('/profilo')">Storico</span>
          </div>
          <div class="card" style="margin-bottom:24px;border-left:3px solid var(--accent)">
            <div class="card-body">
              <div style="display:flex;align-items:flex-start;gap:14px">
                <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-md);padding:10px 12px;text-align:center;min-width:52px;flex-shrink:0">
                  <div style="font-size:24px;font-weight:900;color:var(--text-1);line-height:1;letter-spacing:-0.05em">${new Date(nextAppt.date).getDate()}</div>
                  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-2);margin-top:2px">${new Date(nextAppt.date).toLocaleString('it-IT',{month:'short'})}</div>
                </div>
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                    <span style="font-size:15px;font-weight:600;color:var(--text-1)">${nextAppt.service}</span>
                    <span class="badge badge-success">✓ Confermato</span>
                  </div>
                  <p style="font-size:12px;color:var(--text-2);margin:0 0 3px;display:flex;align-items:center;gap:4px">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    ${nextAppt.time} · ${nextAppt.duration}
                  </p>
                  <p style="font-size:12px;color:var(--text-2);margin:0;display:flex;align-items:center;gap:4px">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${nextAppt.studio}
                  </p>
                </div>
              </div>
              <div style="display:flex;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
                <button class="btn btn-outline btn-sm" style="flex:1;border-radius:var(--r-sm)" onclick="Screens.Home.modifyAppt()">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Modifica
                </button>
                <button class="btn btn-ghost btn-sm" style="flex:1;border-radius:var(--r-sm);color:var(--text-2)" onclick="Screens.Home.cancelAppt()">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                  Annulla
                </button>
              </div>
            </div>
          </div>` : `
          <div class="card" style="margin-bottom:24px;text-align:center;padding:28px 20px;border-style:dashed">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5" stroke-linecap="round" style="margin:0 auto 12px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <p style="font-size:14px;color:var(--text-2);margin-bottom:14px">Nessun appuntamento in programma.<br>Quando prenoti, lo trovi qui.</p>
            <button class="btn btn-primary btn-sm" onclick="App.navigate('/prenota')">Prenota ora</button>
          </div>`}

          <!-- ── Novità dallo studio ── -->
          <div class="section-header" style="padding:0 0 12px">
            <span class="section-title">Novità dallo studio</span>
          </div>
          ${news.map(n => `
          <div class="card" style="margin-bottom:10px;cursor:pointer" onclick="App.showNewsDetail(${n.id})">
            <div class="card-body">
              <div style="display:flex;align-items:flex-start;gap:12px">
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                    <span class="badge badge-accent" style="font-size:10px">${n.tag}</span>
                    <span style="font-size:11px;color:var(--text-3)">${n.date}</span>
                  </div>
                  <h3 style="font-size:14px;font-weight:600;color:var(--text-1);margin-bottom:4px;line-height:1.35">${n.title}</h3>
                  <p style="font-size:12px;color:var(--text-2);margin:0;line-height:1.5">${n.preview}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:4px"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          </div>`).join('')}

          <!-- Artisti in evidenza -->
          <div class="section-header" style="padding:16px 0 12px">
            <span class="section-title">I nostri artisti</span>
            <span class="section-link" onclick="App.navigate('/artisti')">Vedi tutti</span>
          </div>
        </div>

        <!-- scroll orizzontale artisti -->
        <div class="scroll-row" style="padding-bottom:12px">
          ${MockData.artists.slice(0,4).map(a => `
            <div onclick="App.navigate('/artisti/${a.id}')"
                 style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0">
              <div style="width:64px;height:64px;border-radius:var(--r-lg);overflow:hidden;border:2px solid ${a.available?'var(--accent-border)':'var(--border)'}">
                ${Cards.artistAvatar(a, 64)}
              </div>
              <span style="font-size:11px;font-weight:600;color:var(--text-2);text-align:center;max-width:72px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.name.split(' ')[0]}</span>
              <span style="font-size:10px;color:var(--text-3);text-align:center">${a.styles[0]}</span>
            </div>
          `).join('')}
        </div>

        <!-- Credits -->
        <div style="text-align:center;padding:24px 0 8px">
          <p style="font-size:11px;color:var(--text-3)">App sviluppata da <a href="https://xed.agency" style="color:var(--text-3)">Xed</a> — <a href="https://xed.agency" style="color:var(--accent)">xed.agency</a></p>
        </div>

      </div>
      ${Navbar.render('/home')}`;
  }

  function init() {
    // Auto-rotate banner ogni 4s
    clearInterval(bannerTimer);
    bannerTimer = setInterval(() => {
      setBanner((bannerIdx + 1) % banners.length);
    }, 4000);

    // Button micro-feedback
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('touchstart', () => btn.style.transform='scale(0.97)', { passive:true });
      btn.addEventListener('touchend', () => btn.style.transform='', { passive:true });
    });
  }

  function setBanner(i) {
    bannerIdx = i;
    const wrap = document.getElementById('home-banner');
    if (wrap) {
      wrap.innerHTML = renderBanner(banners[i]);
      wrap.querySelector('div').classList.add('fade-in');
    }
    banners.forEach((_,j) => {
      const dot = document.getElementById(`bdot-${j}`);
      if (dot) {
        dot.style.width = j===i ? '18px' : '6px';
        dot.style.background = j===i ? 'var(--accent)' : 'var(--border-light)';
      }
    });
  }

  function modifyAppt() {
    Cards.showToast('Modifica appuntamento — funzione disponibile prossimamente.', 'info');
  }
  function cancelAppt() {
    if (confirm('Annullare l\'appuntamento? Ci serve almeno 48h di preavviso.')) {
      State.set('appointments', []);
      App.navigate('/home');
      setTimeout(() => Cards.showToast('Appuntamento annullato.', 'success'), 300);
    }
  }

  function destroy() {
    clearInterval(bannerTimer);
  }

  return { render, init, setBanner, modifyAppt, cancelAppt, destroy };
})();
