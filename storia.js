/* ─────────────────────────────────────────────────
   Schermata: La Nostra Storia
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Storia = (() => {

  function render() {
    const timeline = MockData.timeline;

    return `
      <div class="screen" id="storia-screen">
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <button class="header-back" onclick="App.navigate('/home')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span class="app-header-title">La nostra storia</span>
          <div style="width:40px"></div>
        </div>

        <!-- Hero intro -->
        <div style="padding:32px 24px 24px;text-align:center;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center top,var(--accent)08,transparent 70%);pointer-events:none"></div>
          <!-- Primula SVG decorativa -->
          <div style="display:flex;justify-content:center;margin-bottom:16px">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="31" fill="var(--surface-2)" stroke="var(--accent-border)" stroke-width="1"/>
              <g opacity="0.9">
                <ellipse cx="32" cy="20" rx="6" ry="10" fill="var(--accent)" opacity="0.8"/>
                <ellipse cx="44" cy="26" rx="6" ry="10" fill="var(--accent)" opacity="0.8" transform="rotate(72 44 26)"/>
                <ellipse cx="40" cy="40" rx="6" ry="10" fill="var(--accent)" opacity="0.8" transform="rotate(144 40 40)"/>
                <ellipse cx="24" cy="40" rx="6" ry="10" fill="var(--accent)" opacity="0.8" transform="rotate(216 24 40)"/>
                <ellipse cx="20" cy="26" rx="6" ry="10" fill="var(--accent)" opacity="0.8" transform="rotate(288 20 26)"/>
                <circle cx="32" cy="32" r="7" fill="var(--gold)"/>
                <circle cx="32" cy="32" r="3" fill="#0A0A0A"/>
              </g>
            </svg>
          </div>
          <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:var(--text-1);margin-bottom:8px;line-height:1.2">Trent'anni<br>di arte sulla pelle</h1>
          <p style="font-size:var(--text-sm);color:var(--text-2);max-width:280px;margin:0 auto;line-height:1.65">Dal 1991, La Primula Rossa è un punto di riferimento per chi vuole raccontare la propria storia attraverso l'arte.</p>
        </div>

        <!-- Stats veloci -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);margin:0 24px;border-radius:var(--r-lg);overflow:hidden;margin-bottom:32px">
          ${[
            { n: '1991', l: 'Fondato' },
            { n: '30k+', l: 'Tatuaggi' },
            { n: '5',    l: 'Artisti' },
          ].map(s=>`
            <div style="background:var(--surface);padding:16px 8px;text-align:center">
              <div style="font-size:20px;font-weight:900;color:var(--text-1);font-family:var(--font-mono);letter-spacing:-0.03em">${s.n}</div>
              <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.1em;margin-top:2px">${s.l}</div>
            </div>`).join('')}
        </div>

        <!-- Timeline -->
        <div style="padding:0 24px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:20px">Timeline</div>

          <div style="position:relative">
            <!-- Linea verticale -->
            <div style="position:absolute;left:19px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,var(--accent),var(--accent)60,var(--border));border-radius:1px"></div>

            <div style="display:flex;flex-direction:column;gap:0">
              ${timeline.map((entry, i) => { entry = {...entry, highlight: i === timeline.length - 1}; return `
                <div class="timeline-entry" style="display:flex;gap:16px;padding-bottom:${i < timeline.length-1 ? '28px' : '0'}">
                  <!-- Dot -->
                  <div style="flex-shrink:0;width:40px;display:flex;justify-content:center;padding-top:2px">
                    <div style="width:10px;height:10px;border-radius:50%;background:${entry.highlight ? 'var(--accent)' : 'var(--surface-3)'};border:2px solid ${entry.highlight ? 'var(--accent)' : 'var(--border)'};box-shadow:${entry.highlight ? '0 0 12px var(--accent)60' : 'none'};margin-top:4px;z-index:1;position:relative"></div>
                  </div>
                  <!-- Content -->
                  <div style="flex:1;padding-top:0">
                    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:6px">
                      <span style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:${entry.highlight ? 'var(--accent)' : 'var(--text-3)'}">${entry.year}</span>
                      <span style="font-size:14px;font-weight:700;color:var(--text-1)">${entry.title}</span>
                    </div>
                    <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin:0">${entry.text}</p>
                  </div>
                </div>`; }).join('')}
            </div>
          </div>
        </div>

        <!-- Sezione valori -->
        <div style="padding:32px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:16px">I nostri valori</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, title: 'Sicurezza prima di tutto', desc: 'Materiali certificati CE, sterilizzazione a vapore, monouso garantito. Ogni sessione segue protocolli medici rigorosi.' },
              { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`, title: 'Arte senza compromessi', desc: 'Ogni tatuaggio è un progetto unico. Non copiamo, non affrettiamo. Prendiamo il tempo necessario per farlo bene.' },
              { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`, title: 'Comunità autentica', desc: 'Siamo un luogo di incontro oltre che uno studio. Artisti ospiti, serate di presentazione, eventi di cultura tattoo.' },
            ].map(v=>`
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:16px;display:flex;gap:14px;align-items:flex-start">
                <div style="width:40px;height:40px;background:var(--surface-2);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0">${v.icon}</div>
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:4px">${v.title}</div>
                  <p style="font-size:12px;color:var(--text-2);line-height:1.6;margin:0">${v.desc}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Team -->
        <div style="padding:32px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:16px">Chi siamo oggi</div>
          <div style="display:flex;gap:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px">
            ${MockData.artists.map(a=>`
              <div onclick="App.navigate('/artisti/${a.id}')" style="flex-shrink:0;width:100px;text-align:center;cursor:pointer">
                <div style="width:72px;height:72px;margin:0 auto 8px;border-radius:var(--r-lg);overflow:hidden;border:2px solid ${a.available?'var(--accent-border)':'var(--border)'}">
                  ${Cards.artistAvatar(a, 72)}
                </div>
                <div style="font-size:12px;font-weight:600;color:var(--text-1);white-space:nowrap">${a.name.split(' ')[0]}</div>
                <div style="font-size:10px;color:var(--text-3)">${a.role.split('/')[0]}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- CTA finale -->
        <div style="padding:32px 24px">
          <div style="background:linear-gradient(135deg,var(--surface),var(--surface-2));border:1px solid var(--accent-border);border-radius:var(--r-xl);padding:24px;text-align:center">
            <div style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--text-1);margin-bottom:8px">Inizia il tuo progetto</div>
            <p style="font-size:13px;color:var(--text-2);margin-bottom:20px;line-height:1.6">Fai parte di questa storia. Ogni tatuaggio che realizziamo è un capitolo nuovo.</p>
            <button class="btn btn-primary btn-full" onclick="App.navigate('/prenota')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Prenota una consulenza
            </button>
            <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="App.navigate('/chat')">Parlaci via chat</button>
          </div>
        </div>

      </div>
      ${Navbar.render('/storia')}`;
  }

  function timelineSvgPlaceholder(entry, index) {
    const palettes = [
      ['#2ABFBF','#1a8080'],
      ['#C9A84C','#8a6a20'],
      ['#6366f1','#4338ca'],
      ['#ec4899','#be185d'],
      ['#2ABFBF','#C9A84C'],
    ];
    const [c1, c2] = palettes[index % palettes.length];
    return `
      <svg width="100%" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="120" fill="var(--surface-2)"/>
        <rect x="0" y="0" width="300" height="120" fill="url(#tg${index})"/>
        <defs>
          <linearGradient id="tg${index}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${c1}" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="${c2}" stop-opacity="0.06"/>
          </linearGradient>
        </defs>
        <text x="150" y="52" text-anchor="middle" font-family="serif" font-size="28" font-weight="700" fill="${c1}" opacity="0.5">${entry.year}</text>
        <text x="150" y="76" text-anchor="middle" font-family="sans-serif" font-size="11" fill="var(--text-3)" opacity="0.7">${entry.title}</text>
        <!-- decorative lines -->
        <line x1="60" y1="90" x2="240" y2="90" stroke="${c1}" stroke-width="1" stroke-opacity="0.2"/>
      </svg>`;
  }

  function init() {
    // Intersection Observer per animare le timeline entries
    if ('IntersectionObserver' in window) {
      const entries = document.querySelectorAll('.timeline-entry');
      const obs = new IntersectionObserver((els) => {
        els.forEach(el => {
          if (el.isIntersecting) {
            el.target.style.opacity = '1';
            el.target.style.transform = 'translateX(0)';
            obs.unobserve(el.target);
          }
        });
      }, { threshold: 0.1 });
      entries.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-16px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        obs.observe(el);
      });
    }
  }

  return { render, init };
})();
