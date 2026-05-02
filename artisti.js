/* ─────────────────────────────────────────────────
   Schermata: Artisti (lista + dettaglio)
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Artisti = (() => {

  function render(artistId) {
    if (artistId) return renderDetail(artistId);
    return renderList();
  }

  function renderList() {
    return `
      <div class="screen" id="artisti-screen">
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <span style="font-family:var(--font-display);font-size:17px;font-weight:700;color:var(--text-1)">Il nostro team</span>
        </div>
        <div style="padding:16px 24px 0">
          <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:20px">Cinque artisti, cinque personalità. Tutti con un'unica passione.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${MockData.artists.map(a => Cards.artistCard(a, true)).join('')}
          </div>
          <div style="height:16px"></div>
        </div>
      </div>
      ${Navbar.render('/artisti')}`;
  }

  function renderDetail(id) {
    const artist = MockData.artists.find(a => a.id === id);
    if (!artist) return renderList();

    const items = MockData.portfolioItems.filter(p => p.artist === artist.name);

    return `
      <div class="screen" id="artisti-screen">
        <!-- Header -->
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <button class="header-back" onclick="App.navigate('/artisti')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span class="app-header-title">${artist.name}</span>
          <div style="width:40px"></div>
        </div>

        <!-- Hero artista -->
        <div style="padding:24px 24px 0;text-align:center">
          <div style="width:96px;height:96px;border-radius:var(--r-xl);overflow:hidden;margin:0 auto 16px;border:2px solid ${artist.available?'var(--accent-border)':'var(--border)'}">
            ${Cards.artistAvatar(artist, 96)}
          </div>
          <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--text-1);margin-bottom:4px">${artist.name}</h1>
          <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:10px">${artist.role}</p>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px">
            ${artist.available
              ? `<span class="badge badge-success">● Disponibile questa settimana</span>`
              : `<span class="badge badge-neutral">Disponibile da ${artist.availableFrom}</span>`}
            <span style="font-size:12px;color:var(--text-3)">★ ${artist.rating} (${artist.reviewCount} rec.)</span>
          </div>
        </div>

        <!-- Stats -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 24px 20px">
          ${[
            { n: artist.portfolioCount+'+', l: 'Lavori' },
            { n: artist.experience,         l: 'Esperienza' },
            { n: artist.reviewCount,        l: 'Recensioni' },
          ].map(s=>`
            <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 10px;text-align:center">
              <div style="font-size:18px;font-weight:800;color:var(--text-1);font-family:var(--font-mono);letter-spacing:-0.02em">${s.n}</div>
              <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.08em;margin-top:3px">${s.l}</div>
            </div>`).join('')}
        </div>

        <!-- Bio -->
        <div style="padding:0 24px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:8px">Chi sono</div>
          <p style="font-size:var(--text-base);color:var(--text-2);line-height:1.65;margin:0">${artist.bio}</p>
        </div>

        <!-- Stili -->
        <div style="padding:0 24px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:10px">Stili</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${artist.styles.map(s=>`<span class="chip active" style="font-size:12px;cursor:default">${s}</span>`).join('')}
          </div>
        </div>

        <!-- Disponibilità prossime 2 settimane -->
        <div style="padding:0 24px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:10px">Prossimi slot disponibili</div>
          <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px">
            ${generateNextSlots(artist).map(s=>`
              <div style="flex-shrink:0;background:${s.avail?'var(--surface)':'var(--surface-2)'};border:1px solid ${s.avail?'var(--accent-border)':'var(--border)'};border-radius:var(--r-lg);padding:10px 14px;text-align:center;opacity:${s.avail?1:0.4}">
                <div style="font-size:11px;color:var(--text-2);margin-bottom:4px">${s.day}</div>
                <div style="font-size:13px;font-weight:700;color:${s.avail?'var(--text-1)':'var(--text-3)'};font-family:var(--font-mono)">${s.time}</div>
                ${s.avail?`<div style="font-size:9px;color:var(--accent);margin-top:3px">Libero</div>`:`<div style="font-size:9px;color:var(--text-3);margin-top:3px">Occupato</div>`}
              </div>`).join('')}
          </div>
        </div>

        <!-- Portfolio personale -->
        ${items.length ? `
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);padding:0 24px;margin-bottom:10px">Portfolio</div>
          <div style="padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${items.slice(0,4).map((item,i)=>`
              <div onclick="Screens.Portfolio.openDetail(${item.id})" style="aspect-ratio:1;border-radius:var(--r-md);overflow:hidden;cursor:pointer;position:relative">
                ${Cards.portfolioSvg(item,i)}
                <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.8));padding:16px 8px 8px">
                  <div style="font-size:11px;font-weight:700;color:#fff">${item.style}</div>
                </div>
              </div>`).join('')}
          </div>
          <div style="text-align:center;padding:14px">
            <button onclick="App.navigate('/galleria')" style="font-size:13px;color:var(--accent);cursor:pointer;background:none;border:none;font-weight:500">
              Vedi tutto il portfolio →
            </button>
          </div>
        </div>` : ''}

        <!-- CTA -->
        <div style="padding:8px 24px 24px">
          <button class="btn btn-primary btn-full btn-lg" onclick="App.startBookingWith('${artist.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Prenota con ${artist.name.split(' ')[0]}
          </button>
        </div>
      </div>
      ${Navbar.render('/artisti')}`;
  }

  function generateNextSlots(artist) {
    const days = ['Lun','Mar','Mer','Gio','Ven','Sab'];
    const times = ['10:30','14:00','15:30','17:00'];
    return Array.from({length:6},(_,i)=>({
      day: days[i],
      time: times[i%4],
      avail: !artist.available && i < 3 ? false : Math.random() > 0.3,
    }));
  }

  function init() {}

  return { render, init };
})();
