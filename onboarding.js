/* ─────────────────────────────────────────────────
   Schermata: Onboarding (3 slide, solo primo accesso)
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Onboarding = (() => {

  const slides = [
    {
      bg: 'linear-gradient(160deg, #0A0A0A 0%, #0f1a1a 100%)',
      art: `
        <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:180px">
          <defs>
            <radialGradient id="og1" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#2ABFBF" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#2ABFBF" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="120" cy="120" r="100" fill="url(#og1)"/>
          <!-- Primula flower -->
          <g transform="translate(120,112)">
            <ellipse cx="0" cy="-38" rx="16" ry="28" fill="#2ABFBF" opacity="0.85" transform="rotate(0)"/>
            <ellipse cx="0" cy="-38" rx="16" ry="28" fill="#2ABFBF" opacity="0.85" transform="rotate(72)"/>
            <ellipse cx="0" cy="-38" rx="16" ry="28" fill="#2ABFBF" opacity="0.85" transform="rotate(144)"/>
            <ellipse cx="0" cy="-38" rx="16" ry="28" fill="#2ABFBF" opacity="0.85" transform="rotate(216)"/>
            <ellipse cx="0" cy="-38" rx="16" ry="28" fill="#2ABFBF" opacity="0.85" transform="rotate(288)"/>
            <circle cx="0" cy="0" r="16" fill="#C9A84C"/>
            <circle cx="0" cy="0" r="8"  fill="#0A0A0A"/>
          </g>
          <!-- Anno -->
          <text x="120" y="210" font-family="'Space Mono',monospace" font-size="13" fill="#2ABFBF" text-anchor="middle" opacity="0.7" letter-spacing="3">DAL 1991</text>
        </svg>`,
      tag: 'Como, Italia',
      title: 'Benvenuto alla\nPrimula Rossa',
      subtitle: 'Studio tattoo e piercing storico di Como. Trent\'anni di arte, qualità e storie sulla pelle.',
    },
    {
      bg: 'linear-gradient(160deg, #0A0A0A 0%, #0a1a0f 100%)',
      art: `
        <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:180px">
          <defs>
            <radialGradient id="og2" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#C9A84C" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="120" cy="120" r="100" fill="url(#og2)"/>
          <!-- Steps icons -->
          <g transform="translate(40,80)">
            <circle cx="0" cy="0" r="22" fill="#1E1E1E" stroke="#2ABFBF" stroke-width="1.5"/>
            <text x="0" y="6" font-size="18" text-anchor="middle" fill="#2ABFBF">🎨</text>
          </g>
          <line x1="70" y1="80" x2="110" y2="80" stroke="#2A2A2A" stroke-width="1.5" stroke-dasharray="4 3"/>
          <g transform="translate(120,80)">
            <circle cx="0" cy="0" r="22" fill="#1E1E1E" stroke="#C9A84C" stroke-width="1.5"/>
            <text x="0" y="6" font-size="18" text-anchor="middle" fill="#C9A84C">🖋</text>
          </g>
          <line x1="150" y1="80" x2="190" y2="80" stroke="#2A2A2A" stroke-width="1.5" stroke-dasharray="4 3"/>
          <g transform="translate(200,80)">
            <circle cx="0" cy="0" r="22" fill="#1E1E1E" stroke="#4CAF7D" stroke-width="1.5"/>
            <text x="0" y="6" font-size="18" text-anchor="middle" fill="#4CAF7D">✓</text>
          </g>
          <text x="40"  y="116" font-size="10" fill="#888" text-anchor="middle" font-family="Inter,sans-serif">Artista</text>
          <text x="120" y="116" font-size="10" fill="#888" text-anchor="middle" font-family="Inter,sans-serif">Idea</text>
          <text x="200" y="116" font-size="10" fill="#888" text-anchor="middle" font-family="Inter,sans-serif">Prenota</text>
          <!-- Decorative lines -->
          <line x1="60" y1="148" x2="180" y2="148" stroke="#2A2A2A" stroke-width="1" opacity="0.6"/>
          <text x="120" y="168" font-size="12" fill="#555" text-anchor="middle" font-family="Inter,sans-serif">3 semplici passi</text>
        </svg>`,
      tag: 'Come funziona',
      title: 'Scegli l\'artista,\nracconta la tua idea',
      subtitle: 'Sfoglia il portfolio, trova lo stile che ti rappresenta e prenota in pochi tap. Ci pensiamo noi al resto.',
    },
    {
      bg: 'linear-gradient(160deg, #0A0A0A 0%, #1a0a0a 100%)',
      art: `
        <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:180px">
          <defs>
            <radialGradient id="og3" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#2ABFBF" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="#2ABFBF" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="120" cy="120" r="100" fill="url(#og3)"/>
          <!-- Fidelity card mock -->
          <rect x="30" y="70" width="180" height="110" rx="14" fill="#141414" stroke="#2A2A2A" stroke-width="1"/>
          <rect x="30" y="70" width="180" height="110" rx="14" fill="url(#og3)"/>
          <circle cx="60" cy="108" r="14" fill="#2ABFBF" opacity="0.25"/>
          <circle cx="60" cy="108" r="8"  fill="#2ABFBF" opacity="0.5"/>
          <text x="84" y="104" font-size="11" fill="#888" font-family="Inter,sans-serif">Punti fedeltà</text>
          <text x="84" y="120" font-size="20" fill="#F5F5F0" font-weight="700" font-family="'Space Mono',monospace">340 pt</text>
          <rect x="46" y="148" width="148" height="5" rx="3" fill="#2A2A2A"/>
          <rect x="46" y="148" width="90"  height="5" rx="3" fill="#2ABFBF"/>
          <text x="46"  y="168" font-size="10" fill="#555" font-family="Inter,sans-serif">Gold</text>
          <text x="194" y="168" font-size="10" fill="#2ABFBF" font-family="Inter,sans-serif" text-anchor="end">Platinum</text>
        </svg>`,
      tag: 'Per te',
      title: 'Premi e offerte\nriservati a te',
      subtitle: 'Accumula punti ad ogni visita. Scala i livelli, sblocca premi esclusivi e ricevi offerte su misura.',
    },
  ];

  let currentSlide = 0;
  let touchStartX = 0;
  let autoTimer = null;

  function render() {
    const s = slides[currentSlide];
    return `
      <div class="screen screen--no-nav" id="onboarding-screen"
           style="background:${s.bg};display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:48px 32px 40px;min-height:100dvh;overflow:hidden">

        <!-- Skip -->
        <div style="width:100%;display:flex;justify-content:flex-end">
          <button onclick="Screens.Onboarding.skip()" style="font-size:14px;color:var(--text-2);padding:8px 0;cursor:pointer;background:none;border:none">
            Salta
          </button>
        </div>

        <!-- Art -->
        <div style="flex:1;display:flex;align-items:center;justify-content:center;width:100%">
          <div class="fade-in">${s.art}</div>
        </div>

        <!-- Text -->
        <div style="width:100%;text-align:center;margin-bottom:32px" class="fade-in">
          <span class="badge badge-accent" style="margin-bottom:14px">${s.tag}</span>
          <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:var(--text-1);line-height:1.2;margin-bottom:14px;white-space:pre-line">${s.title}</h1>
          <p style="font-size:var(--text-base);color:var(--text-2);line-height:1.6;max-width:320px;margin:0 auto">${s.subtitle}</p>
        </div>

        <!-- Dots -->
        <div style="display:flex;gap:8px;margin-bottom:28px">
          ${slides.map((_,i) => `
            <div onclick="Screens.Onboarding.goTo(${i})"
                 style="width:${i===currentSlide?'24px':'8px'};height:8px;border-radius:99px;background:${i===currentSlide?'var(--accent)':'var(--border-light)'};transition:all 0.3s ease;cursor:pointer"></div>
          `).join('')}
        </div>

        <!-- CTA -->
        ${currentSlide < slides.length - 1
          ? `<button class="btn btn-primary btn-lg btn-full" onclick="Screens.Onboarding.next()">
               Avanti
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </button>`
          : `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
               <button class="btn btn-primary btn-lg btn-full" onclick="Screens.Onboarding.finish()">
                 Inizia
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </button>
               <button class="btn btn-ghost btn-full" onclick="Screens.Onboarding.showLogin()">
                 Hai già un account? Accedi
               </button>
             </div>`
        }
      </div>`;
  }

  function init() {
    const el = document.getElementById('onboarding-screen');
    if (!el) return;
    el.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (diff > 50 && currentSlide < slides.length - 1) next();
      if (diff < -50 && currentSlide > 0) goTo(currentSlide - 1);
    });
  }

  function goTo(i) {
    currentSlide = i;
    App.renderScreen('onboarding', render(), false, false);
    setTimeout(init, 50);
  }

  function next() { goTo(Math.min(currentSlide + 1, slides.length - 1)); }

  function skip()   { finish(); }
  function finish() {
    State.set('onboardingDone', true);
    App.navigate('/home');
  }

  function showLogin() {
    State.set('onboardingDone', true);
    App.navigate('/login');
  }

  return { render, init, goTo, next, skip, finish, showLogin };
})();
