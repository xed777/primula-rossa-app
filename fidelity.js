/* ─────────────────────────────────────────────────
   Schermata: Fidelity & Reward
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Fidelity = (() => {

  function getLevelInfo(pts) {
    if (pts >= 1000) return { label: 'Platinum', next: null,  nextPts: 0,    color: '#818cf8', nextLabel: '' };
    if (pts >= 500)  return { label: 'Gold',     next: 'Platinum', nextPts: 1000, color: '#C9A84C', nextLabel: 'Platinum' };
    if (pts >= 200)  return { label: 'Silver',   next: 'Gold',     nextPts: 500,  color: '#9ea3a8', nextLabel: 'Gold' };
    return              { label: 'Bronze',   next: 'Silver',   nextPts: 200,  color: '#cd7f32', nextLabel: 'Silver' };
  }

  function render() {
    const pts = State.get('fidelityPoints');
    const history = State.get('pointsHistory');
    const rewards = MockData.rewards;
    const level = getLevelInfo(pts);
    const progress = level.next ? Math.min(100, (pts / level.nextPts) * 100) : 100;

    return `
      <div class="screen" id="fidelity-screen">
        <div class="app-header" style="position:sticky;top:0;z-index:50">
          <button class="header-back" onclick="App.navigate('/profilo')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span class="app-header-title">La mia Fidelity</span>
          <div style="width:40px"></div>
        </div>

        <!-- Fidelity Card digitale -->
        <div style="padding:20px 24px 0">
          <div style="background:linear-gradient(135deg,#0a1a1a 0%,#0f0f14 60%,#0a1a0f 100%);border:1px solid var(--accent-border);border-radius:var(--r-2xl);padding:24px;position:relative;overflow:hidden">
            <!-- Glow bg -->
            <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,${level.color}20,transparent 70%);border-radius:50%;pointer-events:none"></div>
            <div style="position:absolute;bottom:-40px;left:-40px;width:140px;height:140px;background:radial-gradient(circle,var(--accent)10,transparent 70%);border-radius:50%;pointer-events:none"></div>

            <!-- Top row -->
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;position:relative">
              <div>
                <div style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-2);margin-bottom:3px">La Primula Rossa</div>
                <div style="font-size:11px;color:var(--text-3)">Dal 1991 · Como</div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;background:${level.color}22;border:1px solid ${level.color}44;border-radius:20px;padding:5px 12px">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${level.color}" stroke-width="2"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
                <span style="font-size:12px;font-weight:700;color:${level.color};letter-spacing:0.06em">${level.label}</span>
              </div>
            </div>

            <!-- Punti -->
            <div style="margin-bottom:20px;position:relative">
              <div style="font-size:52px;font-weight:900;color:var(--text-1);line-height:1;letter-spacing:-0.03em;font-family:var(--font-mono)">${pts}</div>
              <div style="font-size:14px;color:var(--text-2);margin-top:4px">punti fedeltà</div>
            </div>

            <!-- Barra progresso -->
            <div style="position:relative">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-3);margin-bottom:6px">
                <span>${level.label}</span>
                ${level.next ? `<span style="color:${level.color}">${level.nextLabel} → ${level.nextPts} pt</span>` : `<span style="color:${level.color}">Livello massimo 🎉</span>`}
              </div>
              <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${progress}%;background:linear-gradient(90deg,var(--accent),${level.color});border-radius:3px;transition:width 0.8s ease;position:relative">
                  ${progress < 100 ? `<div style="position:absolute;right:-2px;top:50%;transform:translateY(-50%);width:10px;height:10px;border-radius:50%;background:${level.color};box-shadow:0 0 8px ${level.color}88"></div>` : ''}
                </div>
              </div>
              ${level.next ? `<div style="font-size:11px;color:var(--text-2);margin-top:6px">Ancora <strong style="color:${level.color}">${level.nextPts - pts} punti</strong> per raggiungere ${level.nextLabel}</div>` : ''}
            </div>

            <!-- Numero carta -->
            <div style="margin-top:20px;position:relative">
              <div style="font-family:var(--font-mono);font-size:13px;color:var(--text-3);letter-spacing:0.2em">•••• •••• ${pts.toString().padStart(4,'0')}</div>
            </div>
          </div>
        </div>

        <!-- Come guadagnare punti -->
        <div style="padding:20px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Come guadagnare punti</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[
              { icon:'🖋', label:'Tatuaggio',         pts:'+100–300' },
              { icon:'💎', label:'Piercing',           pts:'+50–80'  },
              { icon:'✦',  label:'Touch-up',           pts:'+40'     },
              { icon:'🎁', label:'Porta un amico',     pts:'+150'    },
            ].map(r=>`
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:12px">
                <div style="font-size:22px;margin-bottom:6px">${r.icon}</div>
                <div style="font-size:12px;font-weight:600;color:var(--text-1);margin-bottom:2px">${r.label}</div>
                <div style="font-size:13px;font-weight:700;color:var(--accent);font-family:var(--font-mono)">${r.pts}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Premi disponibili -->
        <div style="padding:20px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Premi disponibili</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${rewards.map(r => {
              const canRedeem = pts >= r.points;
              return `
                <div class="card" style="border-color:${canRedeem?'var(--accent-border)':'var(--border)'}">
                  <div class="card-body" style="display:flex;align-items:center;gap:14px">
                    <div style="width:48px;height:48px;border-radius:var(--r-md);background:${canRedeem?'var(--accent-dim)':'var(--surface-2)'};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${r.icon}</div>
                    <div style="flex:1;min-width:0">
                      <div style="font-size:14px;font-weight:600;color:var(--text-1);margin-bottom:2px">${r.title}</div>
                      <div style="font-size:11px;color:var(--text-2);margin-bottom:6px;line-height:1.4">${r.description}</div>
                      <div style="font-size:13px;font-weight:700;color:${canRedeem?'var(--accent)':'var(--text-3)'};font-family:var(--font-mono)">${r.points} pt ${canRedeem?'· Riscattabile':''}</div>
                    </div>
                    <button onclick="Screens.Fidelity.redeem('${r.id}')" ${canRedeem?'':'disabled'}
                      class="btn btn-sm ${canRedeem?'btn-outline':'btn-ghost'}"
                      style="${!canRedeem?'opacity:0.3':''};flex-shrink:0">
                      ${canRedeem?'Usa':'Blocca'}
                    </button>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Gift Card -->
        <div style="padding:20px 24px 0">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Gift Card</div>
          <div style="background:linear-gradient(135deg,#0f1a0a,#0a0f1a);border:1px solid var(--gold-border);border-radius:var(--r-xl);padding:20px;display:flex;align-items:center;gap:16px">
            <div style="width:52px;height:52px;background:var(--gold-dim);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">🎁</div>
            <div style="flex:1">
              <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:3px">Regala un'esperienza</div>
              <div style="font-size:12px;color:var(--text-2);margin-bottom:12px">Disponibili da €50, €100 e €200</div>
              <button class="btn btn-gold btn-sm" onclick="Screens.Fidelity.buyGiftCard()">Acquista Gift Card</button>
            </div>
          </div>
        </div>

        <!-- Storico punti -->
        <div style="padding:20px 24px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-2);margin-bottom:12px">Storico punti</div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden">
            ${(history || []).slice(0,6).map((h,i,arr)=>`
              <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;${i<arr.length-1?'border-bottom:1px solid var(--border)':''}">
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-1)">${h.label}</div>
                  <div style="font-size:11px;color:var(--text-3)">${h.date}</div>
                </div>
                <div style="font-size:14px;font-weight:700;color:${h.points>0?'var(--success)':'var(--error)'};font-family:var(--font-mono)">${h.points>0?'+':''}${h.points}</div>
              </div>`).join('')}
          </div>
        </div>

      </div>
      ${Navbar.render('/fidelity')}`;
  }

  function init() {
    // Animazione barra punti
    setTimeout(() => {
      const fills = document.querySelectorAll('.progress-fill');
      fills.forEach(f => { f.style.transition = 'width 1s ease'; });
    }, 100);
  }

  function redeem(id) {
    const reward = MockData.rewards.find(r => r.id === id);
    if (!reward) return;
    const pts = State.get('fidelityPoints');
    if (pts < reward.points) return;
    if (!confirm(`Riscattare "${reward.title}" per ${reward.points} punti?`)) return;
    State.set('fidelityPoints', pts - reward.points);
    State.get('pointsHistory').unshift({ date: new Date().toLocaleDateString('it-IT'), label: `Premio: ${reward.title}`, points: -reward.points });
    App.renderScreen('fidelity', render(), false, false);
    setTimeout(init, 100);
    Cards.showToast(`"${reward.title}" riscattato! 🎉`, 'success');
  }

  function buyGiftCard() {
    Cards.showToast('Gift Card disponibili in studio o tramite chat.', 'info');
    setTimeout(() => App.navigate('/chat'), 1500);
  }

  return { render, init, redeem, buyGiftCard };
})();
