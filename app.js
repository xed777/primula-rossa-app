/* ─────────────────────────────────────────────────
   App — SPA Router & Controller
───────────────────────────────────────────────── */
window.App = (() => {
  let _currentRoute = null;
  let _deferredInstall = null;
  let _transitioning = false;

  const routes = {
    '/onboarding': { screen: 'onboarding', module: () => Screens.Onboarding, hasNav: false },
    '/home': { screen: 'home', module: () => Screens.Home, hasNav: true },
    '/prenota': { screen: 'prenota', module: () => Screens.Prenota, hasNav: true },
    '/galleria': { screen: 'galleria', module: () => Screens.Portfolio, hasNav: true },
    '/artisti': { screen: 'artisti', module: () => Screens.Artisti, hasNav: true },
    '/shop': { screen: 'shop', module: () => Screens.Shop, hasNav: true },
    '/fidelity': { screen: 'fidelity', module: () => Screens.Fidelity, hasNav: true },
    '/chat': { screen: 'chat', module: () => Screens.Chat, hasNav: true },
    '/profilo': { screen: 'profilo', module: () => Screens.Profilo, hasNav: true },
    '/storia': { screen: 'storia', module: () => Screens.Storia, hasNav: true },
    '/login': { screen: 'login', module: () => Screens.Login, hasNav: false },
    '/register': { screen: 'register', module: () => Screens.Register, hasNav: false },
  };

  const navOrder = ['/home', '/prenota', '/galleria', '/profilo'];

  function init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      _deferredInstall = e;
    });

    // Service worker — corretto per GitHub Pages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch((error) => {
        console.warn('Service Worker non registrato:', error);
      });
    }

    window.addEventListener('popstate', () => {
      const hash = location.hash.replace('#', '') || '/home';
      _navigate(hash, false, true);
    });

    const hash = location.hash.replace('#', '');
    const onboardingDone = State.get('onboardingDone');

    if (!onboardingDone) {
      _navigate('/onboarding', true, false);
    } else if (hash && routes[hash.split('/').slice(0, 2).join('/')]) {
      _navigate(hash, true, false);
    } else {
      _navigate('/home', true, false);
    }
  }

  function navigate(route) {
    if (_transitioning && route === _currentRoute) return;

    const base = route.split('/').slice(0, 2).join('/') || '/home';

    if (routes[base]) {
      location.hash = route;
      _navigate(route, false, false);
    }
  }

  function _navigate(fullRoute, initial, isPop) {
    const base = '/' + (fullRoute.replace(/^\//, '').split('/')[0] || 'home');
    const param = fullRoute.replace(/^\//, '').split('/')[1] || null;
    const config = routes[base];

    if (!config) {
      navigate('/home');
      return;
    }

    const forward = _getDirection(base);
    _currentRoute = base;

    const mod = config.module();
    const html = param ? mod.render(param) : mod.render();

    renderScreen(
      config.screen,
      html,
      !initial && !isPop && forward,
      !initial && !isPop && !forward
    );

    setTimeout(() => {
      if (mod.init) mod.init(param);
      if (window.Navbar && Navbar.update) Navbar.update(base);
    }, 50);
  }

  function _getDirection(newRoute) {
    const prev = navOrder.indexOf(_currentRoute);
    const next = navOrder.indexOf(newRoute);

    if (prev === -1 || next === -1) return true;

    return next >= prev;
  }

  function renderScreen(id, html, forward = true, back = false) {
    const app = document.getElementById('app');
    if (!app) return;

    const existing = app.querySelector('.screen-wrapper.active');

    const wrapper = document.createElement('div');
    wrapper.className = 'screen-wrapper';
    wrapper.innerHTML = html;

    app.appendChild(wrapper);

    if (existing) {
      _transitioning = true;

      const outClass = back ? 'slideOutForward' : 'slideOutBack';
      const inClass = back ? 'slideInBack' : 'slideIn';

      if (forward !== false || back !== false) {
        existing.style.animation = `${outClass} 0.28s ease forwards`;
        wrapper.style.animation = `${inClass} 0.28s ease forwards`;
      } else {
        existing.remove();
        wrapper.classList.add('active');
        _transitioning = false;
        return;
      }

      wrapper.classList.add('active');

      setTimeout(() => {
        existing.remove();
        _transitioning = false;
      }, 300);
    } else {
      wrapper.classList.add('active');
    }
  }

  function startBookingWith(artistId) {
    navigate('/prenota');

    setTimeout(() => {
      if (Screens.Prenota && Screens.Prenota.startWith) {
        Screens.Prenota.startWith(artistId);
      }
    }, 100);
  }

  function startBookingWithStyle(styleTag) {
    navigate('/prenota');

    setTimeout(() => {
      State.set('booking.styleRef', styleTag);
    }, 100);
  }

  function showProductDetail(productId) {
    const product = MockData.products.find((p) => p.id === productId);
    if (!product) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'product-modal';

    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };

    overlay.innerHTML = `
      <div class="modal-sheet product-detail-sheet">
        <div class="modal-handle"></div>

        <div style="padding:20px 24px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
            <div style="width:72px;height:72px;background:var(--surface-2);border-radius:var(--r-lg);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${Cards.productIcon(product.svg, 32)}
            </div>

            <div style="flex:1">
              <div style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:2px">${product.name}</div>
              <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">${product.category}</div>
              <div style="font-size:18px;font-weight:800;color:var(--accent);font-family:var(--font-mono)">${product.price}</div>
            </div>
          </div>

          <p style="font-size:13px;color:var(--text-2);line-height:1.65;margin-bottom:20px">
            ${product.desc || 'Prodotto di alta qualità disponibile presso il nostro studio.'}
          </p>

          <button class="btn btn-primary btn-full" onclick="App.navigate('/chat');document.getElementById('product-modal')?.remove()">
            Chiedi disponibilità via chat
          </button>

          <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="document.getElementById('product-modal').remove()">
            Chiudi
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(overlay);
  }

  function showNewsDetail(newsId) {
    const item = MockData.news.find((n) => n.id === newsId);
    if (!item) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'news-modal';

    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };

    overlay.innerHTML = `
      <div class="modal-sheet" style="max-height:85vh;overflow-y:auto">
        <div class="modal-handle"></div>

        <div style="padding:20px 24px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);margin-bottom:8px">
            ${item.tag}
          </div>

          <h2 style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--text-1);margin-bottom:8px;line-height:1.3">
            ${item.title}
          </h2>

          <p style="font-size:12px;color:var(--text-3);margin-bottom:16px">
            ${item.date}
          </p>

          <p style="font-size:14px;color:var(--text-2);line-height:1.7;margin-bottom:20px">
            ${item.body || item.preview}
          </p>

          ${
            item.cta
              ? `<button class="btn btn-outline btn-full" onclick="${item.cta.action};document.getElementById('news-modal').remove()">${item.cta.label}</button>`
              : ''
          }

          <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="document.getElementById('news-modal').remove()">
            Chiudi
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(overlay);
  }

  function showInstallPrompt() {
    if (_deferredInstall) {
      _deferredInstall.prompt();

      _deferredInstall.userChoice.then(() => {
        _deferredInstall = null;
      });

      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const msg = isIOS
     const msg = isIOS
  ? "Su Safari: tocca Condividi → \"Aggiungi alla Home\". In pochi secondi l'app sarà sul tuo schermo!"
  : "Apri il menu del browser e seleziona \"Installa app\" o \"Aggiungi alla schermata Home\".";
      : 'Apri il menu del browser e seleziona "Installa app" o "Aggiungi alla schermata Home".';

    Cards.showToast(msg, 'info', 5000);
  }

  function navigate_lingua() {
    Cards.showToast('Lingua: italiano (unica lingua disponibile).', 'info');
  }

  return {
    init,
    navigate,
    renderScreen,
    startBookingWith,
    startBookingWithStyle,
    showProductDetail,
    showNewsDetail,
    showInstallPrompt,
    navigate_lingua,
  };
})();