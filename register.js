/* ─────────────────────────────────────────────────
   Schermata: Registrazione
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Register = (() => {

  let loading = false;

  function render() {
    return `
      <div class="screen" id="register-screen">

        <!-- Header -->
        <div style="padding:16px 20px 0;display:flex;align-items:center">
          <button onclick="App.navigate('/profilo')" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-md);cursor:pointer;color:var(--text-2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
        </div>

        <!-- Titolo -->
        <div style="padding:24px 28px 0">
          <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--text-1);margin-bottom:6px">Crea il tuo account</h1>
          <p style="font-size:var(--text-sm);color:var(--text-2);margin-bottom:28px">Prenota, accumula punti, ricevi offerte esclusive.</p>
        </div>

        <!-- Form -->
        <form id="register-form" onsubmit="event.preventDefault(); Screens.Register.submit()" style="padding:0 28px">

          <!-- Nome + Cognome -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div class="form-group" style="margin:0">
              <label class="form-label">Nome *</label>
              <input id="reg-nome" type="text" class="form-input" placeholder="Luca" autocomplete="given-name"/>
            </div>
            <div class="form-group" style="margin:0">
              <label class="form-label">Cognome</label>
              <input id="reg-cognome" type="text" class="form-input" placeholder="Bianchi" autocomplete="family-name"/>
            </div>
          </div>

          <!-- Email -->
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Email *</label>
            <input id="reg-email" type="email" class="form-input" placeholder="la@tua.email" autocomplete="email" inputmode="email"/>
          </div>

          <!-- Telefono -->
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Telefono</label>
            <input id="reg-tel" type="tel" class="form-input" placeholder="+39 333 000 0000" autocomplete="tel" inputmode="tel"/>
          </div>

          <!-- Data di nascita -->
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Data di nascita</label>
            <input id="reg-dob" type="date" class="form-input" style="color-scheme:dark"/>
          </div>

          <!-- Password -->
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Password *</label>
            <div style="position:relative">
              <input id="reg-password" type="password" class="form-input" placeholder="Almeno 8 caratteri" autocomplete="new-password" style="padding-right:48px"/>
              <button type="button" onclick="Screens.Login.togglePassword('reg-password',this)"
                style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-3);cursor:pointer;display:flex;align-items:center">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <!-- Password strength indicator -->
            <div id="reg-strength" style="display:flex;gap:4px;margin-top:6px">
              <div class="strength-bar" style="height:3px;flex:1;background:var(--border);border-radius:2px;transition:background 0.2s"></div>
              <div class="strength-bar" style="height:3px;flex:1;background:var(--border);border-radius:2px;transition:background 0.2s"></div>
              <div class="strength-bar" style="height:3px;flex:1;background:var(--border);border-radius:2px;transition:background 0.2s"></div>
            </div>
          </div>

          <!-- Privacy -->
          <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:24px">
            <div style="position:relative;flex-shrink:0;margin-top:2px">
              <input id="reg-privacy" type="checkbox" style="width:18px;height:18px;accent-color:var(--accent);cursor:pointer"/>
            </div>
            <label for="reg-privacy" style="font-size:12px;color:var(--text-2);line-height:1.5;cursor:pointer">
              Accetto i <button type="button" style="color:var(--accent);background:none;border:none;font-size:12px;cursor:pointer;font-weight:500">Termini di servizio</button> e la <button type="button" style="color:var(--accent);background:none;border:none;font-size:12px;cursor:pointer;font-weight:500">Privacy Policy</button>. I dati sono salvati localmente sul dispositivo. *
            </label>
          </div>

          <!-- Error -->
          <div id="reg-error" style="display:none;margin-bottom:16px;padding:10px 14px;background:var(--error-dim);border:1px solid var(--error);border-radius:var(--r-md);font-size:12px;color:var(--error)"></div>

          <!-- Benefits banner -->
          <div style="background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:var(--r-lg);padding:14px;margin-bottom:20px">
            <div style="font-size:12px;font-weight:600;color:var(--accent);margin-bottom:8px">Cosa ottieni registrandoti</div>
            ${['🎁 50 punti di benvenuto nel programma fedeltà','📅 Prenotazioni rapide con i tuoi dati salvati','🔔 Notifiche per le tue sessioni e offerte esclusive'].map(t=>`
              <div style="font-size:11px;color:var(--text-2);margin-bottom:4px">${t}</div>`).join('')}
          </div>

          <button id="reg-submit" type="submit" class="btn btn-primary btn-full btn-lg" style="margin-bottom:8px">
            Crea account gratuito
          </button>
          <button type="button" onclick="App.navigate('/login')" class="btn btn-ghost btn-full">
            Hai già un account? Accedi
          </button>

        </form>
        <div style="height:32px"></div>
      </div>`;
  }

  function init() {
    const pwdInput = document.getElementById('reg-password');
    if (pwdInput) {
      pwdInput.addEventListener('input', updateStrength);
    }
    setTimeout(() => {
      const nome = document.getElementById('reg-nome');
      if (nome) nome.focus();
    }, 200);
  }

  function updateStrength() {
    const val = document.getElementById('reg-password')?.value || '';
    const bars = document.querySelectorAll('.strength-bar');
    const score = (val.length >= 8 ? 1 : 0) + (/[A-Z]/.test(val) ? 1 : 0) + (/[0-9!@#$%^&*]/.test(val) ? 1 : 0);
    const colors = ['var(--error)', 'var(--gold)', 'var(--success)'];
    bars.forEach((b, i) => {
      b.style.background = i < score ? colors[score - 1] : 'var(--border)';
    });
  }

  function submit() {
    if (loading) return;
    const nome = document.getElementById('reg-nome')?.value.trim();
    const cognome = document.getElementById('reg-cognome')?.value.trim() || '';
    const email = document.getElementById('reg-email')?.value.trim();
    const password = document.getElementById('reg-password')?.value;
    const privacy = document.getElementById('reg-privacy')?.checked;

    if (!nome) return showError('Inserisci il tuo nome.');
    if (!email || !email.includes('@')) return showError('Inserisci un indirizzo email valido.');
    if (!password || password.length < 8) return showError('La password deve essere di almeno 8 caratteri.');
    if (!privacy) return showError('Devi accettare la Privacy Policy per registrarti.');

    const btn = document.getElementById('reg-submit');
    loading = true;
    btn.disabled = true;
    btn.innerHTML = '<span style="opacity:0.6">Creazione account…</span>';

    setTimeout(() => {
      loading = false;
      btn.disabled = false;
      btn.innerHTML = 'Crea account gratuito';

      State.register({ email, nome, cognome, avatar: null });
      App.navigate('/profilo');
      setTimeout(() => Cards.showToast('Account creato! Hai ricevuto 50 punti di benvenuto. 🎉', 'success', 4000), 300);
    }, 1200);
  }

  function showError(msg) {
    const el = document.getElementById('reg-error');
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return { render, init, submit, updateStrength };
})();
