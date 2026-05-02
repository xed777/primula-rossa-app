/* ─────────────────────────────────────────────────
   Schermata: Portfolio / Galleria
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Portfolio = (() => {
  let activeFilter = 'all';
  let activeArtist = 'all';

  const filters = [
    { id: 'all',       label: 'Tutti'           },
    { id: 'tattoo',    label: 'Tatuaggi'        },
    { id: 'piercing',  label: 'Piercing'        },
    { id: 'dermopigm', label: 'Dermopigm.'     },
  ];

  function render() {
    const items = MockData.portfolioItems.filter(item => {
      const catMatch = activeFilter === 'all' || item.category === activeFilter;
      const artMatch = activeArtist === 'all' || item.artist === activeArtist;
      return catMatch && artMatch;
    });

    return `
      <div class="screen" id="portfolio-screen">
        <!-- Header -->
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <span style="font-family:var(--font-display);font-size:17px;font-weight:700;color:var(--text-1)">Portfolio</span>
          <button class="header-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>

        <!-- Filtri categoria -->
        <div class="scroll-row" style="padding-top:16px;padding-bottom:4px">
          ${filters.map(f => `
            <button class="chip ${activeFilter===f.id?'active':''}"
                    onclick="Screens.Portfolio.setFilter('${f.id}')">${f.label}</button>
          `).join('')}
        </div>

        <!-- Filtro artista -->
        <div class="scroll-row" style="padding-top:10px;padding-bottom:0">
          <button class="chip ${activeArtist==='all'?'active':''}" onclick="Screens.Portfolio.setArtist('all')" style="font-size:11px;padding:5px 10px">Tutti gli artisti</button>
          ${MockData.artists.map(a=>`
            <button class="chip ${activeArtist===a.name?'active':''}"
                    onclick="Screens.Portfolio.setArtist('${a.name}')"
                    style="font-size:11px;padding:5px 10px">${a.name.split(' ')[0]}</button>
          `).join('')}
        </div>

        <!-- Gallery masonry (2 col) -->
        <div style="padding:16px 16px 0;columns:2;column-gap:10px;${items.length===0?'display:flex;align-items:center;justify-content:center;min-height:200px':''}">
          ${items.length ? items.map((item, i) => `
            <div onclick="Screens.Portfolio.openDetail(${item.id})"
                 style="break-inside:avoid;margin-bottom:10px;border-radius:var(--r-lg);overflow:hidden;position:relative;cursor:pointer;background:var(--surface-2)">
              <div style="aspect-ratio:${i%3===0?'3/4':'1/1'};overflow:hidden;width:100%">
                ${Cards.portfolioSvg(item, i)}
              </div>
              <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));padding:24px 10px 10px">
                <div style="font-size:10px;color:rgba(255,255,255,0.6);margin-bottom:2px">${item.artist.split(' ')[0]}</div>
                <div style="font-size:13px;font-weight:700;color:#fff">${item.style}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.5)">~${item.duration}</div>
              </div>
              <!-- Like btn -->
              <button onclick="event.stopPropagation();Screens.Portfolio.toggleLike(this)"
                      style="position:absolute;top:8px;right:8px;width:30px;height:30px;background:rgba(0,0,0,0.5);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;backdrop-filter:blur(4px);transition:all 0.15s"
                      data-liked="false">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
          `).join('') : `
            <div class="empty-state" style="min-height:240px">
              <div class="empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
              </div>
              <p style="font-size:14px;color:var(--text-2)">Nessun lavoro per questo filtro.</p>
            </div>`}
        </div>

        <div style="height:16px"></div>
      </div>
      ${Navbar.render('/galleria')}`;
  }

  function init() {}

  function setFilter(f) {
    activeFilter = f;
    App.renderScreen('portfolio', render(), false, false);
  }

  function setArtist(name) {
    activeArtist = name;
    App.renderScreen('portfolio', render(), false, false);
  }

  function openDetail(id) {
    const item = MockData.portfolioItems.find(p => p.id === id);
    if (!item) return;
    const artist = MockData.artists.find(a => a.name === item.artist);
    const idx = MockData.portfolioItems.indexOf(item);

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'portfolio-modal';
    overlay.innerHTML = `
      <div style="width:100%;max-width:var(--max-w);background:var(--surface);border-radius:var(--r-2xl) var(--r-2xl) 0 0;overflow:hidden;max-height:90dvh;overflow-y:auto">
        <!-- Image full -->
        <div style="width:100%;aspect-ratio:4/3;position:relative">
          ${Cards.portfolioSvg(item, idx)}
          <button onclick="document.getElementById('portfolio-modal').remove()"
                  style="position:absolute;top:14px;right:14px;width:36px;height:36px;background:rgba(0,0,0,0.7);border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;backdrop-filter:blur(4px)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <!-- Info -->
        <div style="padding:20px 20px 32px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
            <div>
              <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin-bottom:4px">${item.style}</h3>
              <span class="badge badge-accent">${item.style_tag}</span>
            </div>
            <div style="text-align:right">
              <div style="font-size:12px;color:var(--text-3)">Durata</div>
              <div style="font-size:15px;font-weight:700;color:var(--text-1);font-family:var(--font-mono)">~${item.duration}</div>
            </div>
          </div>

          ${artist ? `
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--surface-2);border-radius:var(--r-lg);margin-bottom:16px">
            <div style="width:44px;height:44px;border-radius:var(--r-md);overflow:hidden;flex-shrink:0">${Cards.artistAvatar(artist,44)}</div>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:600;color:var(--text-1)">${artist.name}</div>
              <div style="font-size:12px;color:var(--text-2)">${artist.specialization}</div>
            </div>
            <button onclick="App.navigate('/artisti/${artist.id}');document.getElementById('portfolio-modal').remove()" style="font-size:12px;color:var(--accent);cursor:pointer;background:none;border:none">Profilo →</button>
          </div>` : ''}

          <button class="btn btn-primary btn-full" onclick="App.startBookingWithStyle('${item.style_tag}');document.getElementById('portfolio-modal').remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Voglio qualcosa di simile
          </button>
        </div>
      </div>`;

    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  function toggleLike(btn) {
    const liked = btn.dataset.liked === 'true';
    btn.dataset.liked = (!liked).toString();
    const svg = btn.querySelector('svg');
    svg.style.fill = liked ? 'none' : '#c8102e';
    svg.style.stroke = liked ? 'white' : '#c8102e';
    if (!liked) Cards.showToast('Salvato nei preferiti!', 'success', 1500);
  }

  return { render, init, setFilter, setArtist, openDetail, toggleLike };
})();
