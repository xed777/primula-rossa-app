/* ─────────────────────────────────────────────────
   Schermata: Login
───────────────────────────────────────────────── */
window.Screens = window.Screens || {};

window.Screens.Login = (() => {

  let loading = false;

  function render() {
    return `
      <div class="screen" id="login-screen" style="display:flex;flex-direction:column;justify-content:space-between;min-height:100%">

        <!-- Header -->
        <div style="padding:16px 20px 0;display:flex;align-items:center">
          <button onclick="App.navigate('/profilo')" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-md);cursor:pointer;color:var(--text-2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
        </div>

        <!-- Body -->
        <div style="padding:0 28px;flex:1;display:flex;flex-direction:column;justify-content:center">

          <!-- Logo / brand -->
          <div style="text-align:center;margin-bottom:36px">
            <div style="display:inline-flex;width:72px;height:72px;align-items:center;justify-content:center;background:var(--surface-2);border:1px solid var(--accent-border);border-radius:50%;margin-bottom:16px">
              <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                <ellipse cx="32" cy="20" rx="6" ry="10" fill="var(--accent)" opacity="0.85"/>
                <ellipse cx="44" cy="26" rx="6" ry="10" fill="var(--accent)" opacity="0.85" transform="rotate(72 44 26)"/>
                <ellipse cx="40" cy="40" rx="6" ry="10" fill="var(--accent)" opacity="0.85" transform="rotate(144 40 40)"/>
                <ellipse cx="24" cy="40" rx="6" ry="10" fill="var(--accent)" opacity="0.85" transform="rotate(216 24 40)"/>
                <ellipse cx="20" cy="26" rx="6" ry="10" fill="var(--accent)" opacity="0.85" transform="rotate(288 20 26)"/>
                <circle cx="32" cy="32" r="7" fill="var(--gold)"/>
                <circle cx="32" cy="32" r="3" fill="#0A0A0A"/>
              </svg>
            </div>
            <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--text-1);margin-bottom:4px">Bentornato</h1>
            <p style="font-size:var(--text-sm);color:var(--text-2)">Accedi al tuo profilo</p>
          </div>

          <!-- Form -->
          <form id="login-form" onsubmit="event.preventDefault(); Screens.Login.submit()">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                id="login-email"
                type="email"
                class="form-input"
                placeholder="la@tua.email"
                autocomplete="email"
                inputmode="email"
                onfocus="this.parentElement.querySelector('label').style.color='var(--accent)'"
                onblur="this.parentElement.querySelector('label').style.color=''"
              />
            </div>
            <div class="form-group" style="margin-top:16px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <label class="form-label" style="margin-bottom:0">Password</label>
                <button type="button" onclick="Screens.Login.forgotPassword()" style="font-size:12px;color:var(--accent);background:none;border:none;cursor:pointer">Dimenticata?</button>
              </div>
              <div style="position:relative">
                <input
                  id="login-password"
                  type="password"
                  class="form-input"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  style="padding-right:48px"
                  onfocus="this.closest('.form-group') && this.closest('.form-group').querySelector('label') && (this.closest('.form-group').querySelector('label').style.color='var(--accent)')"
                  onblur="this.closest('.form-group') && this.closest('.form-group').querySelector('label') && (this.closest('.form-group').querySelector('label').style.color='')"
                />
                <button type="button" onclick="Screens.Login.togglePassword('login-password',this)"
                  style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-3);cursor:pointer;display:flex;align-items:center">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            <!-- Error msg -->
            <div id="login-error" style="display:none;margin-top:12px;padding:10px 14px;background:var(--error-dim);border:1px solid var(--error);border-radius:var(--r-md);font-size:12px;color:var(--error)"></div>

            <button id="login-submit" type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:24px">
              Accedi
            </button>
          </form>

          <!-- Divider -->
          <div style="display:flex;align-items:center;gap:12px;margin:20px 0">
            <div style="flex:1;height:1px;background:var(--border)"></div>
            <span style="font-size:12px;color:var(--text-3)">oppure</span>
            <div style="flex:1;height:1px;background:var(--border)"></div>
          </div>

          <!-- Demo login -->
          <button onclick="Screens.Login.demoLogin()" class="btn btn-outline btn-full" style="font-size:13px">
            Prova con account demo
          </button>

        </div>

        <!-- Footer -->
        <div style="padding:20px 28px;text-align:center">
          <p style="font-size:13px;color:var(--text-2)">Non hai un account?
            <button onclick="App.navigate('/register')" style="color:var(--accent);background:none;border:none;font-size:13px;font-weight:600;cursor:pointer">Registrati gratis</button>
          </p>
        </div>

      </div>`;
  }

  function init() {
    setTimeout(() => {
      const email = document.getElementById('login-email');
      if (email) email.focus();
    }, 200);
  }

  function submit() {
    if (loading) return;
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-submit');

    errEl.style.display = 'none';

    if (!email || !email.includes('@')) {
      showError('Inserisci un indirizzo email valido.');
      return;
    }
    if (!password || password.length < 4) {
      showError('Inserisci la password.');
      return;
    }

    loading = true;
    btn.disabled = true;
    btn.innerHTML = `<span style="opacity:0.6">Accesso in corso…</span>`;

    setTimeout(() => {
      loading = false;
      btn.disabled = false;
      btn.innerHTML = 'Accedi';

      // Mock auth — accetta qualsiasi email/password
      const nome = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      State.login({
        email,
        nome: nome.split(' ')[0] || 'Utente',
        cognome: nome.split(' ')[1] || '',
        avatar: null,
      });
      App.navigate('/profilo');
      setTimeout(() => Cards.showToast('Accesso effettuato. Benvenuto!', 'success'), 300);
    }, 1000);
  }

  function demoLogin() {
    State.login({
      email: 'demo@laprimularossa.it',
      nome: 'Marco',
      cognome: 'Rossi',
      avatar: null,
    });
    App.navigate('/profilo');
    setTimeout(() => Cards.showToast('Account demo attivato.', 'success'), 300);
  }

  function forgotPassword() {
    Cards.showToast('Controlla la tua email per il reset della password.', 'info');
  }

  function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.style.color = 'var(--accent)';
    } else {
      input.type = 'password';
      btn.style.color = 'var(--text-3)';
    }
  }

  function showError(msg) {
    const errEl = document.getElementById('login-error');
    if (!errEl) return;
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }

  return { render, init, submit, demoLogin, forgotPassword, togglePassword };
})();
