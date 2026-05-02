/* ─────────────────────────────────────────────────
   Schermata: Shop (vetrina, non ecommerce)
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Shop = (() => {
  let activeCategory = 'all';

  const categories = [
    { id: 'all',     label: 'Tutti'         },
    { id: 'piercing',label: 'Gioielli'      },
    { id: 'sullen',  label: 'Sullen'        },
    { id: 'cura',    label: 'Cura tatuaggio'},
  ];

  function render() {
    const products = MockData.products.filter(p =>
      activeCategory === 'all' || p.category === activeCategory
    );

    return `
      <div class="screen" id="shop-screen">
        <!-- Header -->
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <span style="font-family:var(--font-display);font-size:17px;font-weight:700;color:var(--text-1)">Shop</span>
          <button class="header-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>

        <!-- Banner promo -->
        <div style="margin:16px 24px 0;background:linear-gradient(135deg,#0a1a14,#0a1a1a);border:1px solid var(--accent-border);border-radius:var(--r-xl);padding:16px 18px;display:flex;align-items:center;gap:14px">
          <div style="width:44px;height:44px;background:var(--accent-dim);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7" stroke-width="2.5"/></svg>
          </div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:2px">PROMOZIONE ATTIVA</div>
            <div style="font-size:14px;font-weight:600;color:var(--text-1)">–10% su tutti gli acquisti in studio</div>
            <div style="font-size:11px;color:var(--text-3)">Mostra l'app alla cassa · fino al 31 Mag</div>
          </div>
        </div>

        <!-- Filtri -->
        <div class="scroll-row" style="padding-top:14px;padding-bottom:4px">
          ${categories.map(c=>`
            <button class="chip ${activeCategory===c.id?'active':''}" onclick="Screens.Shop.setCategory('${c.id}')">${c.label}</button>
          `).join('')}
        </div>

        <!-- Sezione Gioielli -->
        ${(activeCategory === 'all' || activeCategory === 'piercing') ? `
        <div class="section-header" style="padding-top:16px">
          <span class="section-title">Gioielli per piercing</span>
        </div>
        <div style="padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${products.filter(p=>p.category==='piercing').map(p=>Cards.productCard(p)).join('')}
        </div>` : ''}

        <!-- Sezione Sullen -->
        ${(activeCategory === 'all' || activeCategory === 'sullen') ? `
        <div class="section-header" style="padding-top:16px">
          <span class="section-title">Sullen Art Collective</span>
          <span class="section-link">sullenclothing.com ↗</span>
        </div>
        <div style="padding:0 16px 0;display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${products.filter(p=>p.category==='sullen').map(p=>Cards.productCard(p)).join('')}
        </div>
        <div style="padding:12px 24px 0">
          <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 16px;display:flex;gap:10px;align-items:flex-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.8" stroke-linecap="round" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="var(--text-3)"/></svg>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.5">I prodotti Sullen si acquistano in studio o sul sito ufficiale. Contattaci per disponibilità.</p>
          </div>
        </div>` : ''}

        <!-- Sezione Cura tatuaggio -->
        ${(activeCategory === 'all' || activeCategory === 'cura') ? `
        <div class="section-header" style="padding-top:16px">
          <span class="section-title">Cura del tatuaggio</span>
        </div>
        <div style="padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${products.filter(p=>p.category==='cura').map(p=>Cards.productCard(p)).join('')}
        </div>` : ''}

        <!-- Footer info -->
        <div style="padding:24px 24px">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:20px">
            <div style="font-size:14px;font-weight:700;color:var(--text-1);margin-bottom:8px">Come acquistare</div>
            ${[
              '📍 Vieni in studio — Via Recchi 3, Como',
              '📱 Contattaci via chat per disponibilità',
              '🎁 Gift card disponibili in studio e via app',
            ].map(t=>`<p style="font-size:13px;color:var(--text-2);margin:6px 0">${t}</p>`).join('')}
            <button class="btn btn-outline btn-full" style="margin-top:12px" onclick="App.navigate('/chat')">
              Contattaci via chat
            </button>
          </div>
        </div>

      </div>
      ${Navbar.render('/shop')}`;
  }

  function init() {}

  function setCategory(cat) {
    activeCategory = cat;
    App.renderScreen('shop', render(), false, false);
  }

  return { render, init, setCategory };
})();
