/* ─────────────────────────────────────────────────
   Cards — Componenti riutilizzabili
───────────────────────────────────────────────── */
window.Cards = (() => {

  /* ── SVG Avatar artista ── */
  function artistAvatar(artist, size = 64) {
    const r = size / 2;
    const fontSize = size * 0.32;
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="clip-${artist.id}"><circle cx="${r}" cy="${r}" r="${r}"/></clipPath>
        </defs>
        <circle cx="${r}" cy="${r}" r="${r}" fill="${artist.color || '#1a1a1a'}"/>
        <!-- Silhouette -->
        <ellipse cx="${r}" cy="${r * 1.1}" rx="${r * 0.42}" ry="${r * 0.46}" fill="${artist.accent || '#2ABFBF'}" opacity="0.25"/>
        <path d="M${r * 0.25},${size} Q${r * 0.3},${r * 1.6} ${r},${r * 1.52} Q${r * 1.7},${r * 1.6} ${r * 1.75},${size}Z" fill="${artist.accent || '#2ABFBF'}" opacity="0.15"/>
        <!-- Iniziali -->
        <text x="${r}" y="${r + fontSize * 0.38}" font-family="'Playfair Display',Georgia,serif" font-size="${fontSize}" font-weight="700" fill="${artist.accent || '#2ABFBF'}" text-anchor="middle" opacity="0.9">${artist.initials}</text>
      </svg>`;
  }

  /* ── Card artista (lista) ── */
  function artistCard(artist, showBook = true) {
    const avail = artist.available
      ? `<span class="badge badge-success">● Disponibile</span>`
      : `<span class="badge badge-neutral">Da ${artist.availableFrom}</span>`;

    return `
      <div class="artist-card card" data-id="${artist.id}" onclick="App.navigate('/artisti/${artist.id}')">
        <div class="artist-card-inner">
          <div class="artist-avatar" style="width:64px;height:64px;border-radius:var(--r-lg);overflow:hidden;flex-shrink:0">
            ${artistAvatar(artist, 64)}
          </div>
          <div class="artist-card-info" style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
              <span style="font-weight:600;font-size:var(--text-md);color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${artist.name}</span>
              ${avail}
            </div>
            <p style="font-size:var(--text-sm);color:var(--text-2);margin:0 0 8px">${artist.specialization}</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${artist.styles.slice(0,3).map(s => `<span class="chip" style="padding:3px 8px;font-size:11px;height:auto">${s}</span>`).join('')}
            </div>
          </div>
        </div>
        ${showBook ? `
        <div style="padding:12px 16px 0;border-top:1px solid var(--border);margin-top:12px">
          <button class="btn btn-outline btn-sm w-full" onclick="event.stopPropagation();App.startBookingWith('${artist.id}')">
            Prenota con ${artist.name.split(' ')[0]}
          </button>
        </div>` : ''}
      </div>`;
  }

  /* ── SVG Portfolio placeholder ── */
  function portfolioSvg(item, index) {
    const palettes = [
      { bg: '#0f0a0a', c1: '#c8102e', c2: '#a07830', c3: '#1e3a1e' },
      { bg: '#0a0a14', c1: '#2ABFBF', c2: '#6366f1', c3: '#0e1a10' },
      { bg: '#0a100a', c1: '#4CAF7D', c2: '#2ABFBF', c3: '#1a0f0f' },
      { bg: '#100a0a', c1: '#C9A84C', c2: '#c8102e', c3: '#0a0a14' },
      { bg: '#0a0a0a', c1: '#F5F5F0', c2: '#888888', c3: '#1e1e1e' },
      { bg: '#0e0e1a', c1: '#818cf8', c2: '#2ABFBF', c3: '#0a0f0a' },
    ];
    const p = palettes[index % palettes.length];
    const shapes = [
      // Realismo: cerchi concentrici + linee
      `<circle cx="90" cy="90" r="70" fill="none" stroke="${p.c1}" stroke-width="0.5" opacity="0.3"/>
       <circle cx="90" cy="90" r="50" fill="none" stroke="${p.c1}" stroke-width="1" opacity="0.5"/>
       <circle cx="90" cy="90" r="30" fill="${p.c1}" opacity="0.15"/>
       <circle cx="90" cy="90" r="12" fill="${p.c1}" opacity="0.7"/>
       <line x1="20" y1="90" x2="160" y2="90" stroke="${p.c2}" stroke-width="0.8" opacity="0.4"/>
       <line x1="90" y1="20" x2="90" y2="160" stroke="${p.c2}" stroke-width="0.8" opacity="0.4"/>`,
      // Acquerello: blob fluido
      `<ellipse cx="80" cy="85" rx="55" ry="60" fill="${p.c1}" opacity="0.3" transform="rotate(-15,80,85)"/>
       <ellipse cx="100" cy="95" rx="50" ry="45" fill="${p.c2}" opacity="0.25" transform="rotate(20,100,95)"/>
       <ellipse cx="90" cy="80" rx="30" ry="35" fill="${p.c3}" opacity="0.4"/>
       <circle cx="70" cy="70" r="18" fill="${p.c1}" opacity="0.5"/>`,
      // Traditional: stella + fiori geometrici
      `<polygon points="90,20 100,70 150,70 110,100 125,150 90,120 55,150 70,100 30,70 80,70" stroke="${p.c1}" stroke-width="1.5" fill="${p.c1}" opacity="0.2"/>
       <polygon points="90,35 97,62 126,62 103,79 111,106 90,90 69,106 77,79 54,62 83,62" fill="${p.c1}" opacity="0.5"/>
       <circle cx="90" cy="90" r="8" fill="${p.c2}"/>`,
      // Piercing: cerchio + dettagli gioiello
      `<circle cx="90" cy="90" r="55" fill="none" stroke="${p.c1}" stroke-width="3" opacity="0.6"/>
       <circle cx="90" cy="35" r="8" fill="${p.c2}"/>
       <circle cx="90" cy="145" r="8" fill="${p.c2}"/>
       <rect x="85" y="82" width="10" height="16" rx="3" fill="${p.c1}" opacity="0.8"/>
       <circle cx="90" cy="90" r="15" fill="none" stroke="${p.c2}" stroke-width="1.5" opacity="0.7"/>`,
      // Blackwork: geometria sacra
      `<rect x="55" y="55" width="70" height="70" fill="none" stroke="${p.c1}" stroke-width="1" opacity="0.4" transform="rotate(45,90,90)"/>
       <rect x="65" y="65" width="50" height="50" fill="none" stroke="${p.c1}" stroke-width="1.5" opacity="0.6" transform="rotate(45,90,90)"/>
       <circle cx="90" cy="90" r="28" fill="none" stroke="${p.c2}" stroke-width="2" opacity="0.7"/>
       <circle cx="90" cy="90" r="8" fill="${p.c1}" opacity="0.9"/>`,
      // Dermopigmentazione: arco sopracciglio stilizzato
      `<path d="M50,100 Q70,60 90,58 Q110,60 130,100" stroke="${p.c1}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
       <path d="M55,108 Q73,72 90,70 Q107,72 125,108" stroke="${p.c2}" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
       <circle cx="90" cy="130" r="6" fill="${p.c1}" opacity="0.7"/>`,
    ];

    return `
      <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" style="background:${p.bg};width:100%;height:100%;display:block">
        <defs>
          <radialGradient id="rg${index}" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="${p.c1}" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="${p.bg}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="180" height="180" fill="url(#rg${index})"/>
        ${shapes[index % shapes.length]}
        <!-- Style label -->
        <text x="12" y="168" font-family="'Space Mono',monospace" font-size="10" fill="${p.c1}" opacity="0.6" letter-spacing="1">${item.style_tag.toUpperCase()}</text>
      </svg>`;
  }

  /* ── Card prodotto shop ── */
  function productCard(product) {
    const svgs = {
      ring:   `<circle cx="32" cy="32" r="18" fill="none" stroke="var(--accent)" stroke-width="3"/><circle cx="32" cy="14" r="4" fill="var(--gold)"/>`,
      stud:   `<circle cx="32" cy="24" r="8" fill="var(--accent)" opacity="0.8"/><line x1="32" y1="32" x2="32" y2="52" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>`,
      curved: `<path d="M16,44 Q20,16 48,16" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/><circle cx="16" cy="44" r="5" fill="var(--gold)"/><circle cx="48" cy="16" r="5" fill="var(--gold)"/>`,
      bone:   `<line x1="32" y1="16" x2="32" y2="48" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="12" r="5" fill="var(--gold)"/><circle cx="32" cy="52" r="5" fill="var(--gold)"/>`,
      gem:    `<polygon points="32,12 44,28 32,52 20,28" fill="var(--accent)" opacity="0.7"/><polygon points="32,12 44,28 32,28" fill="var(--accent)"/>`,
      shirt:  `<path d="M20,16 L10,26 L18,30 L18,52 L46,52 L46,30 L54,26 L44,16 Q38,22 32,22 Q26,22 20,16Z" stroke="var(--text-2)" stroke-width="1.5" fill="var(--surface-3)"/>`,
      hoodie: `<path d="M20,16 L10,28 L18,32 L18,52 L46,52 L46,32 L54,28 L44,16 Q38,24 32,24 Q26,24 20,16Z" stroke="var(--text-2)" stroke-width="1.5" fill="var(--surface-3)"/><path d="M28,24 L28,32 Q32,35 36,32 L36,24" stroke="var(--text-2)" stroke-width="1.2" fill="none"/>`,
      cap:    `<path d="M10,36 Q10,18 32,16 Q54,18 54,36 L46,38 Q44,28 32,27 Q20,28 18,38Z" fill="var(--surface-3)" stroke="var(--text-2)" stroke-width="1.2"/><line x1="8" y1="38" x2="24" y2="38" stroke="var(--text-2)" stroke-width="2" stroke-linecap="round"/>`,
      cream:  `<rect x="22" y="20" width="20" height="28" rx="4" fill="var(--surface-3)" stroke="var(--accent)" stroke-width="1.5"/><rect x="26" y="14" width="12" height="10" rx="2" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="1"/>`,
      lotion: `<ellipse cx="32" cy="36" rx="14" ry="18" fill="var(--surface-3)" stroke="var(--accent)" stroke-width="1.5"/><rect x="28" y="14" width="8" height="10" rx="2" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="1"/>`,
    };

    return `
      <div class="product-card card" onclick="App.showProductDetail('${product.id}')">
        <div style="height:120px;background:var(--surface-2);display:flex;align-items:center;justify-content:center;border-radius:var(--r-lg) var(--r-lg) 0 0;overflow:hidden">
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            ${svgs[product.svg] || svgs.ring}
          </svg>
        </div>
        <div class="card-body" style="padding:12px">
          ${product.badge ? `<span class="badge badge-accent" style="margin-bottom:6px;font-size:10px">${product.badge}</span>` : ''}
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--text-1);margin-bottom:3px;line-height:1.3">${product.name}</div>
          <div style="font-size:var(--text-xs);color:var(--text-2);margin-bottom:8px">${product.material}</div>
          <div style="font-size:var(--text-md);font-weight:700;color:var(--accent);font-family:var(--font-mono)">€${product.price}</div>
        </div>
      </div>`;
  }

  /* ── Product icon (standalone) ── */
  const _productSvgs = {
    ring:   `<circle cx="50%" cy="50%" r="28%" fill="none" stroke="var(--accent)" stroke-width="3"/><circle cx="50%" cy="22%" r="6%" fill="var(--gold)"/>`,
    stud:   `<circle cx="50%" cy="38%" r="12%" fill="var(--accent)" opacity="0.8"/><line x1="50%" y1="50%" x2="50%" y2="82%" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>`,
    curved: `<path d="M25,69 Q31,25 75,25" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/><circle cx="25" cy="69" r="7" fill="var(--gold)"/><circle cx="75" cy="25" r="7" fill="var(--gold)"/>`,
    bone:   `<line x1="50%" y1="20%" x2="50%" y2="80%" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><circle cx="50%" cy="15%" r="8%" fill="var(--gold)"/><circle cx="50%" cy="85%" r="8%" fill="var(--gold)"/>`,
    gem:    `<polygon points="50,12 69,38 50,82 31,38" fill="var(--accent)" opacity="0.7"/><polygon points="50,12 69,38 50,38" fill="var(--accent)"/>`,
    shirt:  `<path d="M31,25 L16,41 L28,47 L28,81 L72,81 L72,47 L84,41 L69,25 Q59,34 50,34 Q41,34 31,25Z" stroke="var(--text-2)" stroke-width="1.5" fill="var(--surface-3)"/>`,
    hoodie: `<path d="M31,25 L16,44 L28,50 L28,81 L72,81 L72,50 L84,44 L69,25 Q59,38 50,38 Q41,38 31,25Z" stroke="var(--text-2)" stroke-width="1.5" fill="var(--surface-3)"/><path d="M44,38 L44,50 Q50,55 56,50 L56,38" stroke="var(--text-2)" stroke-width="1.2" fill="none"/>`,
    cap:    `<path d="M16,56 Q16,28 50,25 Q84,28 84,56 L72,59 Q69,44 50,42 Q31,44 28,59Z" fill="var(--surface-3)" stroke="var(--text-2)" stroke-width="1.2"/><line x1="12" y1="59" x2="38" y2="59" stroke="var(--text-2)" stroke-width="2" stroke-linecap="round"/>`,
    cream:  `<rect x="34" y="31" width="31" height="44" rx="6" fill="var(--surface-3)" stroke="var(--accent)" stroke-width="1.5"/><rect x="40" y="22" width="19" height="16" rx="3" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="1"/>`,
    lotion: `<ellipse cx="50" cy="56" rx="22" ry="28" fill="var(--surface-3)" stroke="var(--accent)" stroke-width="1.5"/><rect x="44" y="22" width="12" height="16" rx="3" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="1"/>`,
  };

  function productIcon(svgKey, size = 40) {
    const content = _productSvgs[svgKey] || _productSvgs.ring;
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  /* ── Toast notification ── */
  function showToast(message, type = 'success', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const colors = { success: 'var(--success)', error: 'var(--error)', info: 'var(--accent)' };
    const icons  = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg>`,
      error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--error)"   stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"  stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="var(--accent)"/></svg>`,
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${icons[type] || icons.info}<span style="font-size:var(--text-sm);font-weight:500;flex:1">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  }

  /* ── QR decorativo ── */
  function qrSvg(text) {
    // Pattern QR decorativo, non funzionale
    const cells = [];
    const grid = 21;
    const seed = text.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        // Angoli fissi (finder pattern)
        const corner = (r < 7 && c < 7) || (r < 7 && c >= 14) || (r >= 14 && c < 7);
        const border = corner && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 14 && (r === 14 || r === 20 || c === 0 || c === 6)) || (c >= 14 && (r === 0 || r === 6 || c === 14 || c === 20)));
        const inner = corner && r >= 2 && r <= 4 && c >= 2 && c <= 4;
        const inner2 = corner && r >= 16 && r <= 18 && c >= 2 && c <= 4;
        const inner3 = corner && r >= 2 && r <= 4 && c >= 16 && c <= 18;
        let filled = border || inner || inner2 || inner3;
        if (!corner) {
          filled = ((seed * (r * 21 + c) * 2654435761) >>> 0) % 2 === 0;
        }
        if (filled) {
          cells.push(`<rect x="${c * 8 + 4}" y="${r * 8 + 4}" width="7" height="7" fill="#000"/>`);
        }
      }
    }
    return `
      <svg viewBox="0 0 176 176" xmlns="http://www.w3.org/2000/svg">
        <rect width="176" height="176" fill="#fff"/>
        ${cells.join('')}
      </svg>`;
  }

  return { artistAvatar, artistCard, portfolioSvg, productCard, productIcon, showToast, qrSvg };
})();
